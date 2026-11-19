import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime="nodejs";
export const dynamic="force-dynamic";
const headers={"Cache-Control":"no-store","X-Content-Type-Options":"nosniff"};
function fail(code:string,status:number){return NextResponse.json({ok:false,error:code},{status,headers})}

export async function POST(req:Request) {
  const secret=process.env.STRIPE_SECRET_KEY;
  const signingSecret=process.env.RIZEHOPE_2027_STRIPE_WEBHOOK_SECRET;
  const signature=req.headers.get("stripe-signature");
  if(!secret||!secret.startsWith("sk_live_")||!signingSecret||!signature) {
    return fail("webhook_not_configured",503);
  }
  const stripe=new Stripe(secret);
  let event:Stripe.Event;
  try{event=stripe.webhooks.constructEvent(await req.text(),signature,signingSecret)}
  catch{return fail("signature_invalid",400)}
  if(event.type!=="checkout.session.completed")return NextResponse.json({ok:true,ignored:true},{headers});
  const session=event.data.object as Stripe.Checkout.Session;
  if(!event.livemode||!session.livemode||session.payment_status!=="paid"){
    return NextResponse.json({ok:true,ignored:true},{headers});
  }
  const metadata=session.metadata??{};
  if(metadata.event!=="rizehope_japan_2027")return NextResponse.json({ok:true,ignored:true},{headers});
  const teamId=metadata.team_entry_id;
  const stage=metadata.stage;
  const paymentIntent=typeof session.payment_intent==="string"?session.payment_intent:null;
  if(!teamId||!/^[0-9a-f-]{36}$/i.test(teamId)||!["deposit","balance"].includes(stage??"")||
    session.amount_total!==33000||session.currency?.toLowerCase()!=="jpy"||!paymentIntent) {
    return fail("unmatched_event_requires_reconciliation",500);
  }
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!url||!serviceKey)return fail("database_not_configured",503);
  const db=createClient(url,serviceKey,{auth:{persistSession:false,autoRefreshToken:false}});
  const {data:team,error:lookupError}=await db.from("rizehope_2027_team_entries")
    .select("id,status,stripe_deposit_checkout_session_id,stripe_balance_checkout_session_id")
    .eq("id",teamId).maybeSingle();
  if(lookupError||!team)return fail("unknown_team_for_signed_event",500);
  const knownSession=stage==="deposit"?
    team.stripe_deposit_checkout_session_id:team.stripe_balance_checkout_session_id;
  if(session.id!==knownSession)return fail("session_not_issued_to_team",500);
  const {error}=await db.rpc("rizehope_2027_record_verified_payment",{
    p_entry_id:teamId,p_stage:stage,p_session_id:session.id,
    p_payment_intent_id:paymentIntent,p_stripe_event_id:event.id,
    p_amount_jpy:session.amount_total,p_currency:session.currency,p_livemode:true
  });
  if(error)return fail("payment_reconciliation_failed",500); // Stripe retries; never silently mark paid.
  return NextResponse.json({ok:true},{headers});
}
