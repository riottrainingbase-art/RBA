import { NextResponse } from "next/server";
import Stripe from "stripe";
import {createClient} from "@supabase/supabase-js";

export const runtime="nodejs";
export const dynamic="force-dynamic";
const headers={"Cache-Control":"no-store","X-Content-Type-Options":"nosniff"};
function deny(error:string,status:number){return NextResponse.json({ok:false,error},{status,headers})}
export async function POST(req:Request){
 const secret=process.env.STRIPE_SECRET_KEY;
 const signingSecret=process.env.RIZEHOPE_2027_UNITED_STRIPE_WEBHOOK_SECRET;
 const signature=req.headers.get("stripe-signature");
 if(!secret?.startsWith("sk_live_")||!signingSecret||!signature)return deny("webhook_not_configured",503);
 const stripe=new Stripe(secret);
 let event:Stripe.Event;
 try{event=stripe.webhooks.constructEvent(await req.text(),signature,signingSecret)}
 catch{return deny("invalid_signature",400)}
 if(event.type!=="checkout.session.completed")return NextResponse.json({ok:true,ignored:true},{headers});
 const session=event.data.object as Stripe.Checkout.Session;
 if(!event.livemode||!session.livemode||session.payment_status!=="paid")
  return NextResponse.json({ok:true,ignored:true},{headers});
 const meta=session.metadata??{};
 if(meta.event!=="rizehope_japan_2027_united_individual")
  return NextResponse.json({ok:true,ignored:true},{headers});
 const playerId=meta.player_entry_id;
 const stage=meta.stage;
 const piId=typeof session.payment_intent==="string"?session.payment_intent:null;
 if(!playerId||!/^[0-9a-f-]{36}$/i.test(playerId)||!["deposit","balance"].includes(stage??"")||
    !piId||session.currency?.toLowerCase()!=="jpy"||!session.amount_total||
    session.amount_total<=0)return deny("unmatched_stripe_event",500);
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
 const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key)return deny("db_not_configured",503);
 const db=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
 const {data:player,error}=await db.from("rizehope_2027_united_players")
  .select("id,team_entry_id,terms_version,deposit_jpy,balance_jpy,status,stripe_deposit_checkout_session_id,stripe_balance_checkout_session_id")
  .eq("id",playerId).maybeSingle();
 if(error||!player||!player.team_entry_id)return deny("player_not_found",500);
 if(meta.team_entry_id!==player.team_entry_id||meta.terms_version!==player.terms_version)
  return deny("signed_terms_or_team_mismatch",500);
 const expectedAmount=stage==="deposit"?player.deposit_jpy:player.balance_jpy;
 const expectedSession=stage==="deposit"?player.stripe_deposit_checkout_session_id:player.stripe_balance_checkout_session_id;
 if(session.amount_total!==expectedAmount||session.id!==expectedSession)
  return deny("paid_amount_or_session_mismatch",500);
 const {error:saveError}=await db.rpc("rizehope_2027_united_record_verified_payment",{
  p_player_id:playerId,p_stage:stage,p_session_id:session.id,
  p_payment_intent_id:piId,p_stripe_event_id:event.id,
  p_amount_jpy:session.amount_total,p_currency:session.currency,p_livemode:true
 });
 if(saveError)return deny("signed_payment_reconciliation_failed",500);
 return NextResponse.json({ok:true},{headers});
}
