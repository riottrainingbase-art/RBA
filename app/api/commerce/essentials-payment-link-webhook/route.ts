import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { verifyEssentialsStripeAccount } from "@/lib/essentials-stripe";
import { sendEssentialsBuyerAcceptance } from "@/lib/essentials-buyer-notices";
import {
  FIRST_DROP_TEE_JPY,
  FIRST_DROP_SETUP_JPY,
  oneMonthFromJstDate,
} from "@/lib/essentials-commerce";

/**
 * Fallback RBA-hosted Stripe Payment Links webhook.
 * Every paid checkout receives an idempotent private fulfillment ticket.
 * This does not send acceptance mail or enable a payment link.
 */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
const TEE_LINK="plink_1UcRBCRXDnnSs6XNEW4xN93M";
const SETUP_LINK="plink_1UcRBHRXDnnSs6XNoHlBdpSQ";
const TEE_PRICE="price_1UcQ68RXDnnSs6XN5XW1ZMaj";
const SETUP_PRICE="price_1UcQ6jRXDnnSs6XNeJUiq622";
const origin="https://ctngdzzorhzpdxswahzl.supabase.co";
function reply(value:Record<string,unknown>,status=200){
 return NextResponse.json(value,{status,headers:{"Cache-Control":"no-store"}});
}
function textField(s:Stripe.Checkout.Session,key:string){
 const x=s.custom_fields?.find(f=>f.key===key);
 return x?.dropdown?.value??null;
}
function validSize(s:string|null):s is "S"|"M"|"L"|"XL"{
 return s==="S"||s==="M"||s==="L"||s==="XL";
}
function addDays(date:string,delta:number):string{
 const [year,month,day]=date.split("-").map(Number);
 const d=new Date(Date.UTC(year,month-1,day+delta));
 return [d.getUTCFullYear(),String(d.getUTCMonth()+1).padStart(2,"0"),String(d.getUTCDate()).padStart(2,"0")].join("-");
}
export async function GET(){return reply({error:"method_not_allowed"},405);}
export async function POST(request:Request){
 const secret=process.env.STRIPE_SECRET_KEY;
 const webhook=process.env.RBA_ESSENTIALS_PAYMENT_LINK_WEBHOOK_SECRET;
 const database=process.env.NEXT_PUBLIC_SUPABASE_URL;
 const service=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!secret||!webhook||!database||!service)return reply({error:"not_configured"},503);
 try{if(new URL(database).origin!==origin)return reply({error:"unexpected_database"},503);}
 catch{return reply({error:"invalid_database"},503);}
 const signature=request.headers.get("stripe-signature");
 if(!signature)return reply({error:"signature_required"},400);
 const stripe=new Stripe(secret);
 let event:Stripe.Event;
 try{event=stripe.webhooks.constructEvent(await request.text(),signature,webhook);}
 catch{return reply({error:"invalid_signature"},400);}
 if(event.type!=="checkout.session.completed"&&event.type!=="checkout.session.async_payment_succeeded")
   return reply({received:true,ignored:true});
 const session=event.data.object as Stripe.Checkout.Session;
 const m=session.metadata;
 if(m?.program!=="rba_essentials_first_drop")return reply({received:true,ignored:true});
 if(!event.livemode||!session.livemode||session.mode!=="payment"||session.currency!=="jpy")
   return reply({error:"invalid_payment_account_or_mode"},422);
 if(session.payment_status!=="paid")return reply({received:true,pending:true});
 if(!await verifyEssentialsStripeAccount(secret))return reply({error:"invalid_account"},503);
 const link=typeof session.payment_link==="string"?session.payment_link:null;
 if(link!==TEE_LINK&&link!==SETUP_LINK)return reply({error:"unexpected_payment_link"},422);
 if(m?.product!==(link===TEE_LINK?"tee":"setup")||m?.shipping_japan_jpy!=="0")
   return reply({error:"unexpected_product_metadata"},422);
 if(!session.id||!session.id.startsWith("cs_live_")||
    typeof session.created!=="number"||
    typeof session.amount_total!=="number"||
    !Number.isSafeInteger(session.amount_total)||
    session.amount_total<=0)return reply({error:"invalid_checkout"},422);
 const orderDate=new Intl.DateTimeFormat("en-CA",{
   timeZone:"Asia/Tokyo",year:"numeric",month:"2-digit",day:"2-digit",
 }).format(new Date(session.created*1000));
 const arrivalBy=oneMonthFromJstDate(orderDate);
 if(!arrivalBy)return reply({error:"invalid_order_date"},422);
 const shippingAmount=session.total_details?.amount_shipping;
 if(typeof shippingAmount==="number"&&shippingAmount!==0)
   return reply({error:"unexpected_shipping_charge"},422);
 // Never trust the link name alone: check the actual Stripe line item price IDs and charged totals.
 let lineItems:Stripe.ApiList<Stripe.LineItem>;
 try{lineItems=await stripe.checkout.sessions.listLineItems(session.id,{limit:20});}
 catch{return reply({error:"stripe_line_items_unavailable"},503);}
 if(lineItems.has_more||lineItems.data.length!==1)return reply({error:"unexpected_items"},422);
 const line=lineItems.data[0];
 const amount=line?.price?.unit_amount,qty=line?.quantity,priceId=line?.price?.id;
 if(!Number.isInteger(qty)||!qty||qty<1||qty>3||
    typeof amount!=="number"||
    priceId!==(link===TEE_LINK?TEE_PRICE:SETUP_PRICE)||
    amount!==(link===TEE_LINK?FIRST_DROP_TEE_JPY:FIRST_DROP_SETUP_JPY)||
    session.amount_total!==amount*qty)return reply({error:"unexpected_amount_or_quantity"},422);
 const teeSize=link===TEE_LINK?textField(session,"teesize"):null;
 const hoodieSize=link===SETUP_LINK?textField(session,"hoodsize"):null;
 const pantsSize=link===SETUP_LINK?textField(session,"pantssize"):null;
 if((link===TEE_LINK&&!validSize(teeSize))||
    (link===SETUP_LINK&&(!validSize(hoodieSize)||!validSize(pantsSize))))
   return reply({error:"missing_or_invalid_size"},422);
 const createdReference=crypto.randomUUID();
 const row={
    order_id:createdReference,
    stripe_checkout_session_id:session.id,
    stripe_payment_intent_id:typeof session.payment_intent==="string"?session.payment_intent:null,
    stripe_event_id:event.id,
    checkout_source:"stripe_payment_link",
    stripe_payment_link_id:link,
    currency:"jpy",
    amount_total_jpy:session.amount_total,
    terms_version:"first_drop_20261116_pending_final_review",
    dispatch_by:addDays(arrivalBy,-4),
    deliver_by:arrivalBy,
    tee_quantity:link===TEE_LINK?qty:0,
    tee_size:teeSize,
    setup_quantity:link===SETUP_LINK?qty:0,
    hoodie_size:hoodieSize,
    pants_size:pantsSize,
    handwritten:false,
    handwritten_target:null,
    handwritten_message:null,
    handwritten_addon_jpy:0,
    payment_status:"paid",
    fulfillment_status:"preparing",
    buyer_notice_status:"pending",
    paid_at:new Date(session.created*1000).toISOString(),
 };
 const db=createClient(database,service,{auth:{persistSession:false,autoRefreshToken:false}});
 const write=await db.from("rba_essentials_orders").upsert(row,{
   onConflict:"stripe_checkout_session_id",ignoreDuplicates:true,
 });
 if(write.error)return reply({error:"order_not_recorded"},503);
 // Stripe retries carry a new event ID. Resolve the immutable order ID from
 // the unique Checkout Session rather than a fresh fallback UUID.
 const recorded=await db.from("rba_essentials_orders")
   .select("order_id").eq("stripe_checkout_session_id",session.id).maybeSingle();
 if(recorded.error||!recorded.data)return reply({error:"order_lookup_failed"},503);
 const notice=await sendEssentialsBuyerAcceptance(recorded.data.order_id);
 return reply({received:true,reconciled:true,notice:notice.outcome});
}
