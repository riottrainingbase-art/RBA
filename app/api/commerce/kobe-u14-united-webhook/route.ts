import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
const PROGRAM="rba_kobe_boys_u14_2027";

export async function POST(request:Request){
 const webhookSecret=process.env.KOBE_U14_STRIPE_WEBHOOK_SECRET;
 const stripeSecret=process.env.STRIPE_SECRET_KEY;
 const serviceKey=process.env.SUPABASE_SERVICE_ROLE_KEY;
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
 if(!webhookSecret||!stripeSecret||!serviceKey||!url)return NextResponse.json({error:"not_configured"},{status:503});
 try{if(new URL(url).hostname!=="ctngdzzorhzpdxswahzl.supabase.co")return NextResponse.json({error:"project_mismatch"},{status:503});}
 catch{return NextResponse.json({error:"invalid_project"},{status:503});}
 const signature=request.headers.get("stripe-signature");
 if(!signature)return NextResponse.json({error:"signature_required"},{status:400});
 let event:Stripe.Event;
 const stripe=new Stripe(stripeSecret);
 try{event=stripe.webhooks.constructEvent(await request.text(),signature,webhookSecret);}
 catch{return NextResponse.json({error:"invalid_signature"},{status:400});}
 if(event.type!=="checkout.session.completed"&&event.type!=="checkout.session.async_payment_succeeded"){
  return NextResponse.json({received:true});
 }
 const session=event.data.object as Stripe.Checkout.Session;
 if(session.metadata?.event!==PROGRAM)return NextResponse.json({received:true});
 const stage=session.metadata.stage;
 if(stage!=="united_deposit"&&stage!=="united_balance")return NextResponse.json({received:true});
 if(!session.livemode||session.mode!=="payment"||session.payment_status!=="paid"||session.amount_total!==50000||session.currency!=="jpy"||!session.client_reference_id){
  return NextResponse.json({error:"unexpected_checkout_values"},{status:422});
 }
 const isDeposit=stage==="united_deposit";
 const existingStatus=isDeposit?"deposit_checkout_open":"balance_checkout_open";
 const paidStatus=isDeposit?"deposit_paid":"fully_paid";
 const sessionCol=isDeposit?"deposit_checkout_session_id":"balance_checkout_session_id";
 const piCol=isDeposit?"deposit_payment_intent_id":"balance_payment_intent_id";
 const paidCol=isDeposit?"deposit_paid_at":"balance_paid_at";
 const admin=createClient(url,serviceKey,{auth:{persistSession:false,autoRefreshToken:false}});
 const {data:row,error:fetchError}=await admin.from("kobe_u14_united_payments")
  .select("id,status,terms_version").eq("id",session.client_reference_id).eq(sessionCol,session.id).maybeSingle();
 if(fetchError)return NextResponse.json({error:"lookup_failed"},{status:503});
 if(!row)return NextResponse.json({error:"payment_not_matched"},{status:503});
 if(row.status===paidStatus)return NextResponse.json({received:true,duplicate:true});
 if(row.status!==existingStatus||row.terms_version!==session.metadata.terms_version){
  return NextResponse.json({error:"payment_state_conflict"},{status:503});
 }
 const paymentIntent=typeof session.payment_intent==="string"?session.payment_intent:null;
 const now=new Date().toISOString();
 const {data:updated,error:updateError}=await admin.from("kobe_u14_united_payments")
  .update({status:paidStatus,[paidCol]:now,[piCol]:paymentIntent,updated_at:now})
  .eq("id",row.id).eq("status",existingStatus).eq(sessionCol,session.id)
  .select("id").maybeSingle();
 if(updateError||!updated)return NextResponse.json({error:"payment_update_failed"},{status:503});
 return NextResponse.json({received:true});
}
export async function GET(){return NextResponse.json({error:"method_not_allowed"},{status:405});}
