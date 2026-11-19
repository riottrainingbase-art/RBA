import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";
import { rizehopeProject } from "@/lib/rizehope-2027";

export const runtime="nodejs";
export const dynamic="force-dynamic";
const headers={"Cache-Control":"private, no-store","X-Content-Type-Options":"nosniff"};
const LOCK_FLAGS=[
  "RIZEHOPE_2027_CHECKOUT_ENABLED","RIZEHOPE_2027_ORGANIZER_APPROVED",
  "RIZEHOPE_2027_TERMS_PUBLISHED","RIZEHOPE_2027_TAX_REVIEW_APPROVED",
  "RIZEHOPE_2027_STRIPE_WEBHOOK_READY"
] as const;

function deny(code:string,status:number) {
  return NextResponse.json({ok:false,error:code},{status,headers});
}
export async function POST(req:Request) {
  const origin=new URL(req.url).origin;
  if(req.headers.get("origin")!==origin)return deny("invalid_origin",403);
  if(req.headers.get("content-type")?.split(";")[0]!=="application/json")return deny("invalid_content_type",415);
  const raw=await req.text();
  if(raw.length>1500)return deny("invalid_payload",413);
  let body:{team_id?:string,stage?:string};
  try{body=JSON.parse(raw) as typeof body}catch{return deny("invalid_payload",400)}
  if(typeof body.team_id!=="string"||!/^[0-9a-f-]{36}$/i.test(body.team_id)||
    !["deposit","balance"].includes(body.stage??""))return deny("invalid_request",400);

  const db=await createClient();
  const {data:{user}}=await db.auth.getUser();
  if(!user)return deny("login_required",401);
  const {data:profile}=await db.from("profiles").select("role").eq("id",user.id).maybeSingle();
  if(profile?.role!=="admin")return deny("admin_required",403);

  // Explicit configuration is required before even attempting to create a live session.
  if(!LOCK_FLAGS.every(flag=>process.env[flag]==="true"))return deny("financial_release_not_approved",423);
  const secret=process.env.STRIPE_SECRET_KEY;
  if(!secret||!secret.startsWith("sk_live_"))return deny("stripe_live_not_configured",503);

  const {data:team,error}=await db.from("rizehope_2027_team_entries")
    .select("id,category,representative_email,status,terms_version,terms_accepted_at,stripe_deposit_checkout_session_id,stripe_balance_checkout_session_id")
    .eq("id",body.team_id).maybeSingle();
  if(error||!team||team.category!=="japan")return deny("team_not_found",404);
  if(!team.terms_version||!team.terms_accepted_at)return deny("written_terms_consent_missing",423);
  const stage=body.stage as "deposit"|"balance";
  if(stage==="deposit"&&team.status!=="approved_pending_deposit")return deny("deposit_not_due",409);
  if(stage==="balance"&&!["deposit_paid","balance_requested"].includes(team.status))return deny("balance_not_due",409);
  if(team.stripe_deposit_checkout_session_id&&stage==="deposit")return deny("deposit_session_already_exists",409);
  if(team.stripe_balance_checkout_session_id&&stage==="balance")return deny("balance_session_already_exists",409);

  // A server-side per-team checkout, not a public 10-use payment link.
  const price=stage==="deposit"?
    rizehopeProject.intake.stripeDepositPriceId:rizehopeProject.intake.stripeBalancePriceId;
  const stripe=new Stripe(secret);
  let session:Stripe.Checkout.Session;
  try{
    session=await stripe.checkout.sessions.create({
      mode:"payment",
      payment_method_types:["card"],
      locale:"ja",
      billing_address_collection:"required",
      customer_email:team.representative_email,
      client_reference_id:team.id,
      line_items:[{price,quantity:1}],
      automatic_tax:{enabled:true},
      metadata:{event:"rizehope_japan_2027",team_entry_id:team.id,stage,terms_version:team.terms_version},
      payment_intent_data:{metadata:{event:"rizehope_japan_2027",team_entry_id:team.id,stage}},
      success_url:"https://riotbasketballacademy.com/ja/international/rizehope-japan-2027/payment?checkout=returned",
      cancel_url:"https://riotbasketballacademy.com/ja/international/rizehope-japan-2027/payment?checkout=cancelled",
      expires_at:Math.floor(Date.now()/1000)+31*60,
    },{idempotencyKey:`rizehope-2027-${team.id}-${stage}-${team.terms_version}`});
  }catch{
    return deny("stripe_checkout_unavailable",502);
  }
  const {error:claimError}=await db.rpc("rizehope_2027_record_checkout_session",{
    p_entry_id:team.id,p_stage:stage,p_session_id:session.id
  });
  if(claimError){
    try{await stripe.checkout.sessions.expire(session.id)}catch{/* Operator must reconcile checkout if expiry failed. */}
    return deny("unable_to_record_checkout_contact_operator",409);
  }
  if(!session.url)return deny("stripe_checkout_url_missing",502);
  return NextResponse.json({ok:true,team_id:team.id,stage,amount_jpy:33000,
    checkout_url:session.url,expires_at:session.expires_at},{headers});
}
