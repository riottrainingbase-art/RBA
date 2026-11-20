import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";
import { isRizehopeUnitedIndividualPaymentReady, rizehopeProject } from "@/lib/rizehope-2027";

export const runtime="nodejs";
export const dynamic="force-dynamic";
const headers={"Cache-Control":"private, no-store","X-Content-Type-Options":"nosniff"};
const flags=[
  "RIZEHOPE_2027_UNITED_CHECKOUT_ENABLED",
  "RIZEHOPE_2027_UNITED_ORGANIZER_APPROVED",
  "RIZEHOPE_2027_UNITED_TERMS_PUBLISHED",
  "RIZEHOPE_2027_UNITED_TAX_REVIEW_APPROVED",
  "RIZEHOPE_2027_UNITED_STRIPE_WEBHOOK_READY",
  "RIZEHOPE_2027_UNITED_ROSTER_CONFIRMED"
] as const;

function deny(error:string,status:number){
 return NextResponse.json({ok:false,error},{status,headers});
}

export async function POST(req:Request){
  const origin=new URL(req.url).origin;
  if(req.headers.get("origin")!==origin)return deny("invalid_origin",403);
  if(req.headers.get("content-type")?.split(";")[0]!=="application/json")return deny("invalid_content_type",415);
  const raw=await req.text();
  if(raw.length>1500)return deny("payload_too_large",413);
  let body:{player_entry_id?:string;stage?:string};
  try{body=JSON.parse(raw) as typeof body;}catch{return deny("invalid_payload",400)}
  if(typeof body.player_entry_id!=="string"||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(body.player_entry_id)||
    !["deposit","balance"].includes(body.stage??""))return deny("invalid_request",400);

  const db=await createClient();
  const {data:{user}}=await db.auth.getUser();
  if(!user)return deny("login_required",401);
  const {data:profile}=await db.from("profiles").select("role").eq("id",user.id).maybeSingle();
  if(profile?.role!=="admin")return deny("admin_required",403);
  // A public URL must never be issued until a formally verified checkout release.
  if(!flags.every(flag=>process.env[flag]==="true")||!isRizehopeUnitedIndividualPaymentReady()){
    return deny("united_financial_release_not_approved",423);
  }
  const stripeSecret=process.env.STRIPE_SECRET_KEY;
  if(!stripeSecret?.startsWith("sk_live_"))return deny("stripe_live_not_configured",503);
  const stage=body.stage as "deposit"|"balance";
  const {data:entry,error}=await db.from("rizehope_2027_united_players")
    .select("id,team_entry_id,guardian_email,status,terms_version,terms_accepted_at,total_jpy,deposit_jpy,balance_jpy,stripe_deposit_checkout_session_id,stripe_balance_checkout_session_id")
    .eq("id",body.player_entry_id).maybeSingle();
  if(error||!entry||!entry.team_entry_id)return deny("approved_player_not_found",404);
  if(!entry.terms_version||!entry.terms_accepted_at)return deny("written_guardian_consent_missing",423);
  if(entry.total_jpy!==entry.deposit_jpy+entry.balance_jpy)return deny("individual_fee_mismatch",423);
  const expected=rizehopeProject.unitedIndividual;
  if(entry.total_jpy!==expected.totalJpy||entry.deposit_jpy!==expected.depositJpy||
     entry.balance_jpy!==expected.balanceJpy)return deny("price_version_mismatch",423);
  if(stage==="deposit"&&entry.status!=="approved_pending_deposit")return deny("deposit_not_due",409);
  if(stage==="balance"&&!["deposit_paid","balance_requested"].includes(entry.status))return deny("balance_not_due",409);
  if(stage==="deposit"&&entry.stripe_deposit_checkout_session_id)return deny("deposit_session_already_exists",409);
  if(stage==="balance"&&entry.stripe_balance_checkout_session_id)return deny("balance_session_already_exists",409);

  const priceId=stage==="deposit"?expected.stripeDepositPriceId:expected.stripeBalancePriceId;
  if(!priceId)return deny("individual_price_not_configured",423);
  const stripe=new Stripe(stripeSecret);
  const amount=stage==="deposit"?entry.deposit_jpy:entry.balance_jpy;
  // Verify Stripe's immutable Price corresponds to the approved individual quote.
  let price:Stripe.Price;
  try{price=await stripe.prices.retrieve(priceId);}catch{return deny("stripe_price_unavailable",502)}
  if(!price.active||price.currency!=="jpy"||price.unit_amount!==amount||price.type!=="one_time"||
     price.tax_behavior!=="inclusive")return deny("stripe_price_or_tax_mismatch",423);
  let session:Stripe.Checkout.Session;
  try{
    session=await stripe.checkout.sessions.create({
      mode:"payment",
      payment_method_types:["card"],
      locale:"ja",
      billing_address_collection:"required",
      customer_email:entry.guardian_email,
      client_reference_id:entry.id,
      line_items:[{price:priceId,quantity:1}],
      automatic_tax:{enabled:true},
      metadata:{event:"rizehope_japan_2027_united_individual",
        player_entry_id:entry.id,team_entry_id:entry.team_entry_id,
        stage,terms_version:entry.terms_version},
      payment_intent_data:{metadata:{event:"rizehope_japan_2027_united_individual",
        player_entry_id:entry.id,stage}},
      success_url:"https://riotbasketballacademy.com/ja/international/rizehope-japan-2027/united?checkout=returned",
      cancel_url:"https://riotbasketballacademy.com/ja/international/rizehope-japan-2027/united?checkout=cancelled",
      expires_at:Math.floor(Date.now()/1000)+31*60,
    },{idempotencyKey:"rizehope-united-2027-"+entry.id+"-"+stage+"-"+entry.terms_version});
  }catch{return deny("stripe_checkout_unavailable",502)}
  const {error:claimError}=await db.rpc("rizehope_2027_united_claim_checkout",{
    p_player_id:entry.id,p_stage:stage,p_session_id:session.id
  });
  if(claimError){
    try{await stripe.checkout.sessions.expire(session.id);}catch{/* Require manual reconciliation. */}
    return deny("checkout_claim_failed_operator_reconciliation",409);
  }
  if(!session.url)return deny("stripe_checkout_url_missing",502);
  return NextResponse.json({ok:true,player_entry_id:entry.id,stage,
      amount_jpy:amount,checkout_url:session.url,expires_at:session.expires_at},{headers});
}
