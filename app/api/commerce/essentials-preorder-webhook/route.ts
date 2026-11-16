import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { verifyEssentialsStripeAccount } from "@/lib/essentials-stripe";

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
 if(!order||!/^[0-9a-f-]{36}$/.test(order)||
 !terms||!/^[A-Za-z0-9_-]{5,60}$/.test(terms)||
 !deadline||!/^20\d{2}-\d{2}-\d{2}$/.test(deadline)||
 tee===null||setup===null||tee+setup<1||tee+setup>3||
 (tee>0&&!teeSize)||(setup>0&&(!hoodie||!pants))||
 !session.amount_total||session.amount_total<1000||session.amount_total>300000||
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
    tee_quantity:tee,
    tee_size:tee>0?teeSize:null,
    setup_quantity:setup,
    hoodie_size:setup>0?hoodie:null,
    pants_size:setup>0?pants:null,
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
