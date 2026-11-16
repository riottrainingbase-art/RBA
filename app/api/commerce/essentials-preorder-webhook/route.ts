import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { verifyEssentialsStripeAccount } from "@/lib/essentials-stripe";
import { FIRST_DROP_TEE_JPY, FIRST_DROP_SETUP_JPY, oneMonthFromJstDate } from "@/lib/essentials-commerce";

export const dynamic="force-dynamic";
function error(reason:string,status:number){return NextResponse.json({error:reason},{status,headers:{"Cache-Control":"no-store"}});}
function amount(s:string|undefined){if(!s||!/^[0-3]$/.test(s))return null;return Number(s);}
function size(s:string|undefined){return s==="S"||s==="M"||s==="L"||s==="XL"?s:null;}
export async function GET(){return error("method_not_allowed",405);}
export async function POST(request:Request){
 const stripeSecret=process.env.STRIPE_SECRET_KEY;
 const signatureSecret=process.env.RBA_ESSENTIALS_STRIPE_WEBHOOK_SECRET;
 const database=process.env.NEXT_PUBLIC_SUPABASE_URL;
 const service=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!stripeSecret||!signatureSecret||!database||!service)return error("not_configured",503);
 try{if(new URL(database).hostname!=="ctngdzzorhzpdxswahzl.supabase.co")return error("unexpected_database",503);}
 catch{return error("invalid_database",503);}
 const signature=request.headers.get("stripe-signature");
 if(!signature)return error("signature_required",400);
 const stripe=new Stripe(stripeSecret);
 let event:Stripe.Event;
 try{event=stripe.webhooks.constructEvent(await request.text(),signature,signatureSecret);}
 catch{return error("invalid_signature",400);}
 if(event.type!=="checkout.session.completed"&&event.type!=="checkout.session.async_payment_succeeded")
  return NextResponse.json({received:true,ignored:true});
 const session=event.data.object as Stripe.Checkout.Session;
 if(session.metadata?.program!=="rba_essentials_presale")return NextResponse.json({received:true,ignored:true});
 if(!event.livemode||!session.livemode||session.mode!=="payment"||session.currency!=="jpy")
  return error("unexpected_payment_mode",422);
 if(session.payment_status!=="paid")return NextResponse.json({received:true,pending:true});
 if(!await verifyEssentialsStripeAccount(stripeSecret))return error("unexpected_account",503);
 const m=session.metadata;
 const tee=amount(m?.tee_qty),setup=amount(m?.setup_qty),teeSize=size(m?.tee_size),hoodie=size(m?.hoodie_size),pants=size(m?.pants_size);
 const order=m?.order_id,terms=m?.terms_version,deadline=m?.dispatch_by;
 const deliveredBy=m?.deliver_by;
 const stripeCreatedJST=typeof session.created==="number"
   ? new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Tokyo",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(session.created*1000))
   : "";
 const latestArrival=oneMonthFromJstDate(stripeCreatedJST);

 const handmade=m?.handwritten==="yes";
 const handwrittenTarget=m?.handwritten_target;
 const handwrittenMessage=typeof m?.handwritten_message==="string"?m.handwritten_message.trim():null;
 const handwrittenAmount=Number(m?.handwritten_addon_jpy??"0");
 const customIsValid=!handmade
   ? (m?.handwritten==="no"||m?.handwritten===undefined)&&handwrittenAmount===0
   : (
       (handwrittenTarget==="tee"&&tee===1 || handwrittenTarget==="setup"&&setup===1) &&
       !!handwrittenMessage && Array.from(handwrittenMessage).length<=20 &&
       !/[\r\n\t<>]/.test(handwrittenMessage) &&
       Number.isInteger(handwrittenAmount) && handwrittenAmount>=1000 && handwrittenAmount<=200000
     );
 const expectedAmount=(tee??0)*FIRST_DROP_TEE_JPY+(setup??0)*FIRST_DROP_SETUP_JPY+
   (handmade?handwrittenAmount:0);

 if(!order||!/^[0-9a-f-]{36}$/.test(order)||
 !terms||!/^[A-Za-z0-9_-]{5,60}$/.test(terms)||
 !deadline||!/^20\d{2}-\d{2}-\d{2}$/.test(deadline)||
 !deliveredBy || !/^20\d{2}-\d{2}-\d{2}$/.test(deliveredBy) || deliveredBy < deadline || !latestArrival || deliveredBy > latestArrival ||
 tee===null||setup===null||tee+setup<1||tee+setup>3||
 (tee>0&&!teeSize)||(setup>0&&(!hoodie||!pants))||
 !customIsValid || !session.amount_total || session.amount_total!==expectedAmount || session.amount_total>300000||
 !session.client_reference_id||session.client_reference_id!==order||!session.id
 ) return error("unexpected_order_values",422);
 const admin=createClient(database,service,{auth:{persistSession:false,autoRefreshToken:false}});
 const paymentIntent=typeof session.payment_intent==="string"?session.payment_intent:null;
 const row={
    order_id:order,
    stripe_checkout_session_id:session.id,
    stripe_payment_intent_id:paymentIntent,
    stripe_event_id:event.id,
    currency:"jpy",
    amount_total_jpy:session.amount_total,
    terms_version:terms,
    dispatch_by:deadline,
    deliver_by:deliveredBy,
    tee_quantity:tee,
    tee_size:tee>0?teeSize:null,
    setup_quantity:setup,
    hoodie_size:setup>0?hoodie:null,
    pants_size:setup>0?pants:null,
    handwritten:handmade,
    handwritten_target:handmade?String(handwrittenTarget):null,
    handwritten_message:handmade?handwrittenMessage:null,
    handwritten_addon_jpy:handmade?handwrittenAmount:0,
    payment_status:"paid",
    fulfillment_status:"preparing",
  };
  const {error:writeError}=await admin.from("rba_essentials_orders").upsert(row,{
    onConflict:"stripe_checkout_session_id",
    ignoreDuplicates:true,
  });
  if(writeError)return error("ledger_write_failed",503);
  return NextResponse.json({received:true});
}
