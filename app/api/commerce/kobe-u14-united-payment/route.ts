import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
const PROGRAM = "rba_kobe_boys_u14_2027";
const ACCOUNT = "acct_1UGdxZRXDnnSs6XN";
const PRICE = {
 deposit: "price_1UcIAoRXDnnSs6XNiM7yW6dT",
 balance: "price_1UcIBCRXDnnSs6XNOwSgPp2q",
} as const;
const origin = "https://riotbasketballacademy.com";
type Stage = "deposit" | "balance";
const expectedStatus = {deposit:"approved",balance:"balance_approved"} as const;
const creatingStatus = {deposit:"deposit_creating",balance:"balance_creating"} as const;
const checkoutStatus = {deposit:"deposit_checkout_open",balance:"balance_checkout_open"} as const;
const sessionColumn = {deposit:"deposit_checkout_session_id",balance:"balance_checkout_session_id"} as const;

function fail(text:string,status=400){
 return new NextResponse(text,{status,headers:{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"no-store"}});
}
function safeHost(request:Request){
 const actual=request.headers.get("origin");
 if(!actual)return true;
 try {return new URL(actual).host===new URL(request.url).host;}catch{return false;}
}
async function hashToken(token:string){
 const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(token));
 return Array.from(new Uint8Array(b)).map(x=>x.toString(16).padStart(2,"0")).join("");
}
function makeAdmin(){
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
 const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key)return null;
 try {
  // Fail closed if the application points to a different Supabase project.
  if(new URL(url).hostname!=="ctngdzzorhzpdxswahzl.supabase.co")return null;
 }catch{return null;}
 return createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
}
async function activeRbaStripe(secret:string){
 try{
  const r=await fetch("https://api.stripe.com/v1/account",{headers:{Authorization:`Bearer ${secret}`},cache:"no-store"});
  if(!r.ok)return false;
  const j=await r.json() as {id?:string};
  return j.id===ACCOUNT;
 }catch{return false;}
}
function redirect(url:string){
 const res=NextResponse.redirect(url,303);
 res.headers.set("Cache-Control","private, no-store");
 res.headers.set("Referrer-Policy","no-referrer");
 return res;
}
export async function GET(){return fail("Selected guardian checkout is POST only.",405);}
export async function POST(request:Request){
 if(!safeHost(request))return fail("Invalid origin.",403);
 const secret=process.env.STRIPE_SECRET_KEY;
 const webhook=process.env.KOBE_U14_STRIPE_WEBHOOK_SECRET;
 const agreedVersion=process.env.KOBE_U14_TERMS_VERSION;
 const admin=makeAdmin();
 if(!secret||!webhook||!agreedVersion||!admin)return fail("選考者向け決済はまだ準備中です。",423);
 const form=await request.formData().catch(()=>null);
 if(!form)return fail("Form not understood.");
 const token=form.get("token");
 if(typeof token!=="string"||!/^[a-f0-9]{64}$/.test(token))return fail("有効な選考案内が必要です。",403);
 if(form.get("terms_accepted")!=="yes")return fail("保護者による正式条件への同意が必要です。",400);
 const sha=await hashToken(token);
 const {data:entry,error}=await admin.from("kobe_u14_united_payments").select("*").eq("invite_token_sha256",sha).maybeSingle();
 if(error||!entry)return fail("選考案内を確認できません。",403);
 if(entry.program_code!==PROGRAM||entry.total_jpy!==100000||entry.deposit_jpy!==50000||entry.balance_jpy!==50000)return fail("料金設定を確認できません。",503);
 if(!entry.eligibility_verified_at||entry.terms_version!==agreedVersion)return fail("参加資格・正式条件の確認が未完了です。",423);
 if(!entry.invite_expires_at||new Date(entry.invite_expires_at).getTime()<=Date.now())return fail("案内の有効期限が切れています。",410);
 let stage:Stage;
 if(entry.status==="approved"||entry.status==="deposit_checkout_open"){stage="deposit";}
 else if(entry.status==="balance_approved"||entry.status==="balance_checkout_open"){stage="balance";}
 else return fail("この参加枠の新規決済はできません。支払済みの場合は再決済しないでください。",409);
 if(stage==="balance"&&!entry.deposit_paid_at)return fail("前金の確認が完了していません。",423);
 if((stage==="deposit"&&process.env.KOBE_U14_DEPOSIT_ENABLED!=="true")||(stage==="balance"&&process.env.KOBE_U14_BALANCE_ENABLED!=="true")){
  return fail("この段階の決済はまだ開始していません。",423);
 }
 if(!await activeRbaStripe(secret))return fail("RBA決済アカウントを確認できません。",503);
 const stripe=new Stripe(secret);
 const currentSession=entry[sessionColumn[stage]];
 if(entry.status===checkoutStatus[stage]){
  if(typeof currentSession!=="string"||!currentSession)return fail("重複決済防止のため担当者にご確認ください。",409);
  try{
   const last=await stripe.checkout.sessions.retrieve(currentSession);
   if(last.status==="open"&&last.url&&last.payment_status!=="paid")return redirect(last.url);
  }catch{/* Fail closed and refer to organizer. */}
  return fail("過去のお支払い画面があります。二重請求を避けるためRBAへご連絡ください。",409);
 }
 // An atomic state claim ensures two parallel requests cannot create two payable sessions.
 const claim=await admin.from("kobe_u14_united_payments")
  .update({status:creatingStatus[stage],terms_accepted_at:new Date().toISOString(),updated_at:new Date().toISOString()})
  .eq("id",entry.id).eq("status",expectedStatus[stage]).select("id").maybeSingle();
 if(claim.error||!claim.data)return fail("申込状態が変更されました。再決済せずRBAへお問い合わせください。",409);
 try{
  const price=await stripe.prices.retrieve(PRICE[stage],{expand:["product"]});
  const product=price.product;
  if(!price.active||price.unit_amount!==50000||price.currency!=="jpy"||!product||typeof product==="string"||!("active" in product)||product.active!==true){
   return fail("価格商品はまだ決済可能な状態ではありません。",423);
  }
  const meta={event:PROGRAM,stage:stage==="deposit"?"united_deposit":"united_balance",application_ref:entry.application_ref,selection_id:entry.id,terms_version:agreedVersion};
  const session=await stripe.checkout.sessions.create({
    mode:"payment",
    customer_email:entry.guardian_email,
    customer_creation:"always",
    client_reference_id:entry.id,
    locale:"ja",
    line_items:[{price:PRICE[stage],quantity:1}],
    metadata:meta,
    payment_intent_data:{metadata:meta},
    success_url:origin+"/ja/events/kobe-boys-u14-exchange-2027/complete?session_id={CHECKOUT_SESSION_ID}",
    cancel_url:origin+"/ja/events/kobe-boys-u14-exchange-2027/united",
    expires_at:Math.floor(Date.now()/1000)+3600,
  },{idempotencyKey:`kobe-u14-${entry.id}-${stage}-v1`});
  if(!session.id||!session.url||new URL(session.url).hostname!=="checkout.stripe.com")return fail("Stripeの決済ページを作成できません。",503);
  const saved=await admin.from("kobe_u14_united_payments").update({
    status:checkoutStatus[stage],[sessionColumn[stage]]:session.id,updated_at:new Date().toISOString(),
  }).eq("id",entry.id).eq("status",creatingStatus[stage]).select("id").maybeSingle();
  if(saved.error||!saved.data){
   try{await stripe.checkout.sessions.expire(session.id);}catch{/* Keep failure closed. */}
   return fail("決済状態の保存に失敗しました。RBAにご連絡ください。",503);
  }
  return redirect(session.url);
 }catch{
  return fail("決済を開始できませんでした。二重決済を避けるためRBAへお問い合わせください。",503);
 }
}
