import {createHash} from "node:crypto";
import {NextResponse} from "next/server";
import {getAichiPayment,aichiEvent,aichiPaymentPath,aichiTermsVersion} from "@/lib/aichi-clinic-payments";
import {aichiAccount,aichiAdmin,aichiOrigin,aichiStripe} from "@/lib/aichi-clinic-server";

export const dynamic="force-dynamic";
function fail(message:string,status=400){return new NextResponse(message,{status,headers:{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"no-store"}});}
export async function POST(request:Request){
 const origin=request.headers.get("origin");
 if(!origin||origin!==new URL(request.url).origin)return fail("申込ページからやり直してください。",403);
 const form=await request.formData().catch(()=>null);
 if(!form)return fail("入力内容を確認してください。");
 const field=(key:string,max:number)=>{const value=form.get(key);return typeof value==="string"&&value.length<=max?value.trim():"";};
 const plan=field("plan",20), p=getAichiPayment(plan);
 if(!p?.payable)return fail("受付準備中です。",423);
 if(field("amount",10)!==String(p.amount)||field("termsVersion",50)!==aichiTermsVersion||field("accepted",5)!=="yes")return fail("料金・参加条件をご確認のうえ再度お申し込みください。",409);
 const guardian=field("guardian",100),email=field("email",254).toLowerCase(),phone=field("phone",32),player=field("player",100),grade=field("grade",5),team=field("team",100);
 if(!guardian||!player||!/^\S+@[^\s@]+\.[^\s@]+$/.test(email)||!/^\+?[0-9() \-]{8,32}$/.test(phone)||!p.grades.includes(grade))return fail("保護者情報・対象学年を確認してください。");
 const stripe=aichiStripe(),admin=aichiAdmin();
 if(!stripe||!admin)return fail("申込受付の準備中です。",503);
 try{const response=await fetch("https://api.stripe.com/v1/account",{headers:{Authorization:`Bearer ${process.env.STRIPE_SECRET_KEY}`},cache:"no-store"});if(!response.ok)return fail("決済アカウントを確認できません。",503);const account=await response.json() as {id?:string};if(account.id!==aichiAccount)return fail("決済アカウントを確認できません。",503);}catch{return fail("決済アカウントを確認できません。",503);}
 const identity=createHash("sha256").update(email+"\n"+player.normalize("NFKC").replace(/\s/g,"")).digest("hex");
 const {data:id,error}=await admin.rpc("reserve_aichi_clinic",{p_plan:plan,p_identity:identity,p_guardian:guardian,p_email:email,p_phone:phone,p_player:player,p_grade:grade,p_team:team,p_amount:p.amount,p_terms:aichiTermsVersion,p_capacity:p.capacity});
 if(error)return fail("受付状況を確認できません。RBAへお問い合わせください。",503);
 if(!id)return fail("満席または同じ選手のお申し込みがあります。重複決済せずRBAへご確認ください。",409);
 const metadata={event:aichiEvent,plan,terms_version:aichiTermsVersion};
 try{
  const session=await stripe.checkout.sessions.create({mode:"payment",locale:"ja",adaptive_pricing:{enabled:false},customer_email:email,client_reference_id:id,metadata,payment_intent_data:{metadata,receipt_email:email},line_items:[{quantity:1,price_data:{currency:"jpy",unit_amount:p.amount,product_data:{name:`RBA 愛知クリニック ${p.title}（選手1名・税込）`}}}],success_url:aichiOrigin+aichiPaymentPath+"/complete",cancel_url:aichiOrigin+aichiPaymentPath+"?status=cancelled",expires_at:Math.floor(Date.now()/1000)+3600},{idempotencyKey:`aichi-clinic-${id}`});
  if(!session.livemode||!session.url||new URL(session.url).hostname!=="checkout.stripe.com")return fail("決済画面を確認できません。RBAへお問い合わせください。",503);
  const {data:updated,error:saveError}=await admin.from("aichi_clinic_applications").update({status:"open",stripe_session_id:session.id}).eq("id",id).eq("status","creating").select("id").maybeSingle();
  if(saveError||!updated){try{await stripe.checkout.sessions.expire(session.id);}catch{}return fail("決済状態を確認できません。再決済せずRBAへお問い合わせください。",503);}
  const response=NextResponse.redirect(session.url,303);response.headers.set("Cache-Control","no-store");response.headers.set("Referrer-Policy","no-referrer");return response;
 }catch{return fail("決済の開始を確認できませんでした。重複決済せずRBAへお問い合わせください。",503);}
}
