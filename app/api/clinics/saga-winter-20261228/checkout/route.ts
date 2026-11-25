import Stripe from "stripe";
import { NextResponse } from "next/server";
import { sagaWinterOffers, sagaWinterGrades } from "@/lib/saga-winter-2026";
export const dynamic = "force-dynamic";
const site = "https://riotbasketballacademy.com";
const page = "/ja/saga#next";
const headers = {"Cache-Control":"private, no-store","Content-Type":"text/plain; charset=utf-8","Referrer-Policy":"no-referrer"};
const fail = (message:string,status:number) => new NextResponse(message,{status,headers});
export async function GET(){return fail("申込フォームからお手続きください。",405);}
export async function POST(request:Request){
  if(request.headers.get("origin")!==new URL(request.url).origin) return fail("不正なアクセスです。",403);
  if(!request.headers.get("content-type")?.startsWith("application/x-www-form-urlencoded")) return fail("フォーム形式を確認してください。",415);
  if(Number(request.headers.get("content-length")||0)>8192) return fail("入力内容が長すぎます。",413);
  const raw=await request.text(); if(raw.length>8192) return fail("入力内容が長すぎます。",413);
  const form=new URLSearchParams(raw);
  const get=(key:string,max:number)=> (form.get(key)||"").trim().slice(0,max);
  const choice=get("plan",30);
  if(!Object.hasOwn(sagaWinterOffers,choice)) return fail("12月28日の参加プランを選択してください。",400);
  const plan=sagaWinterOffers[choice as keyof typeof sagaWinterOffers];
  if(Date.now()>=Date.parse(plan.starts)-60*60*1000) return fail("このプランの受付は終了しました。",409);
  const email=get("email",200).toLowerCase(), guardian=get("guardian",100), player=get("player",100), grade=get("grade",10), phone=get("phone",30);
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!guardian||!player||!sagaWinterGrades.some(g=>g===grade)||!/^[-+0-9 ()]{9,30}$/.test(phone)||get("consent",5)!=="yes"||get("terms",5)!=="yes") return fail("保護者情報・参加者情報・規約同意をご確認ください。",400);
  // A code is optional. Never accept a client-supplied discount amount.
  const couponCode=(form.get("coupon")||"").trim();
  if(couponCode && !/^[A-Za-z0-9-]{1,64}$/.test(couponCode)) return fail("クーポンコードの形式をご確認ください。決済は作成されていません。",400);
  const secret=process.env.STRIPE_SECRET_KEY;
  if(!secret||!secret.startsWith("sk_live_")) return fail("決済設定を確認中です。RBAへお問い合わせください。",503);
  try{
    const reply=await fetch("https://api.stripe.com/v1/account",{headers:{Authorization:"Bearer "+secret},cache:"no-store"});
    const account=reply.ok?await reply.json():{};
    if(typeof account !== "object" || account === null || !("id" in account) || account.id!=="acct_1UGdxZRXDnnSs6XN") return fail("決済アカウント確認中です。RBAへお問い合わせください。",503);
    const stripe=new Stripe(secret);
    let promotionCodeId: string | undefined;
    if(couponCode){
      // Only codes expressly approved and tagged for this event are eligible.
      // Do not expose or apply promotions created for other RBA programmes.
      const promotions=await stripe.promotionCodes.list({code:couponCode,active:true,limit:100});
      const promotion=promotions.data.find(item=>item.active && item.livemode && item.code.toLowerCase()===couponCode.toLowerCase() && item.metadata?.event==="rba_saga_fukuoka_winter_2026" && item.metadata?.rba_approved==="true" && !item.customer && (!item.expires_at || item.expires_at>Math.floor(Date.now()/1000)) && (item.max_redemptions===null || item.times_redeemed<item.max_redemptions));
      if(!promotion)return fail("このクーポンは佐賀12月28日の申込に利用できません。コード・有効期限をご確認ください。決済は作成されていません。",400);
      promotionCodeId=promotion.id;
    }

    const hash=await crypto.subtle.digest("SHA-256",new TextEncoder().encode([email,guardian,player,grade,choice].join("|").toLowerCase()));
    const ref="saga-winter-"+Array.from(new Uint8Array(hash)).map(x=>x.toString(16).padStart(2,"0")).join("").slice(0,32);
    const metadata={event:"rba_saga_fukuoka_winter_2026",date:"2026-12-28",plan:choice,player,grade,guardian,guardian_phone:phone,registration_ref:ref};
    const session=await stripe.checkout.sessions.create({mode:"payment",locale:"ja",customer_email:email,customer_creation:"always",client_reference_id:ref,
      line_items:[{quantity:1,price_data:{currency:"jpy",unit_amount:plan.amount,tax_behavior:"inclusive",product_data:{name:"RBA 佐賀・福岡 WINTER CLINIC｜12月28日｜"+plan.label,description:"選手1名・税込。宿泊、食事、交通費は含みません。会場詳細は受付確認後にご案内。29日は対象外。"}}}],
      ...(promotionCodeId ? {discounts:[{promotion_code:promotionCodeId}]} : {}),
      metadata,payment_intent_data:{metadata},success_url:site+"/ja/saga?checkout=returned#next",cancel_url:site+page,
    },{idempotencyKey:ref});
    if(!session.url||!session.url.startsWith("https://checkout.stripe.com/")) return fail("決済先を確認できません。",503);
    const response=NextResponse.redirect(session.url,303);response.headers.set("Cache-Control","no-store");response.headers.set("Referrer-Policy","no-referrer");return response;
  }catch{return fail(couponCode?"クーポンの適用条件または決済の状態を確認できませんでした。再決済はせずRBAへお問い合わせください。":"決済画面へ接続できませんでした。重複決済を避けるため、RBAへお問い合わせください。",503);}
}
