import {NextResponse} from "next/server";
import type Stripe from "stripe";
import {aichiEvent,aichiTermsVersion} from "@/lib/aichi-clinic-payments";
import {aichiAdmin,aichiStripe} from "@/lib/aichi-clinic-server";

export const dynamic="force-dynamic";
export async function POST(request:Request){
 const stripe=aichiStripe(),admin=aichiAdmin(),secret=process.env.AICHI_CLINIC_WEBHOOK_SECRET,signature=request.headers.get("stripe-signature");
 if(!stripe||!admin||!secret)return NextResponse.json({error:"not_configured"},{status:503});
 if(!signature)return NextResponse.json({error:"signature_required"},{status:400});
 let event:Stripe.Event;try{event=stripe.webhooks.constructEvent(await request.text(),signature,secret);}catch{return NextResponse.json({error:"invalid_signature"},{status:400});}
 if(!["checkout.session.completed","checkout.session.async_payment_succeeded","checkout.session.async_payment_failed","checkout.session.expired"].includes(event.type))return NextResponse.json({received:true});
 const session=event.data.object as Stripe.Checkout.Session;
 if(session.metadata?.event!==aichiEvent)return NextResponse.json({received:true});
 if(!session.livemode||session.mode!=="payment"||session.currency!=="jpy"||!session.client_reference_id||session.metadata.terms_version!==aichiTermsVersion)return NextResponse.json({error:"unexpected_session"},{status:422});
 const {data:row,error}=await admin.from("aichi_clinic_applications").select("id,plan,amount,status,terms_version").eq("id",session.client_reference_id).eq("stripe_session_id",session.id).maybeSingle();
 if(error||!row)return NextResponse.json({error:"unmatched"},{status:503});
 if(row.amount!==session.amount_total||row.plan!==session.metadata.plan||row.terms_version!==session.metadata.terms_version)return NextResponse.json({error:"mismatch"},{status:422});
 if(row.status==="paid")return NextResponse.json({received:true});
 const paid=session.payment_status==="paid"&&(event.type==="checkout.session.completed"||event.type==="checkout.session.async_payment_succeeded");
 const terminal=event.type==="checkout.session.expired"?"expired":event.type==="checkout.session.async_payment_failed"?"failed":null;
 if(!paid&&!terminal)return NextResponse.json({received:true});
 if(paid&&row.status!=="open")return NextResponse.json({error:"state_conflict"},{status:503});
 if(!paid&&row.status!=="open")return NextResponse.json({received:true});
 const update=paid?{status:"paid",paid_at:new Date().toISOString(),stripe_payment_intent_id:typeof session.payment_intent==="string"?session.payment_intent:null}:{status:terminal};
 const {error:saveError}=await admin.from("aichi_clinic_applications").update(update).eq("id",row.id).eq("status","open");
 return saveError?NextResponse.json({error:"save_failed"},{status:503}):NextResponse.json({received:true});
}
