import "server-only";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { getEssentialsNoticeConfig } from "@/lib/essentials-notice-config";
import { verifyEssentialsStripeAccount } from "@/lib/essentials-stripe";

type PaidRow={
 order_id:string;
 stripe_checkout_session_id:string;
 checkout_source:"rba_website"|"stripe_payment_link";
 stripe_payment_link_id:string|null;
 payment_status:string;
 amount_total_jpy:number;
 tee_quantity:number;tee_size:string|null;
 setup_quantity:number;hoodie_size:string|null;pants_size:string|null;
 dispatch_by:string;deliver_by:string|null;paid_at:string;
 terms_version:string;buyer_notice_status:string;
};
type Outcome="sent"|"pending"|"already_processed"|"not_configured"|"failed";
type Result={outcome:Outcome;code?:string};

/** Never store the buyer's email/address in Supabase or reveal it in logs. */
export async function sendEssentialsBuyerAcceptance(orderId:string):Promise<Result>{
 const mail=getEssentialsNoticeConfig();
 if(!mail.configured)return {outcome:"not_configured"};
 if(!/^[a-f0-9-]{36}$/i.test(orderId))return {outcome:"failed",code:"invalid_order_id"};
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
 const service=process.env.SUPABASE_SERVICE_ROLE_KEY;
 const stripeSecret=process.env.STRIPE_SECRET_KEY;
 if(!url||!service||!stripeSecret)return {outcome:"not_configured"};
 try{if(new URL(url).origin!=="https://ctngdzzorhzpdxswahzl.supabase.co")return {outcome:"failed",code:"invalid_database"};}
 catch{return {outcome:"failed",code:"invalid_database"};}
 if(!await verifyEssentialsStripeAccount(stripeSecret))return {outcome:"failed",code:"stripe_account_mismatch"};
 const db=createClient(url,service,{auth:{persistSession:false,autoRefreshToken:false}});
 const {data:order,error:readError}=await db.from("rba_essentials_orders")
   .select("order_id,stripe_checkout_session_id,checkout_source,stripe_payment_link_id,payment_status,amount_total_jpy,tee_quantity,tee_size,setup_quantity,hoodie_size,pants_size,dispatch_by,deliver_by,paid_at,terms_version,buyer_notice_status")
   .eq("order_id",orderId).maybeSingle();
 if(readError||!order)return {outcome:"failed",code:"order_unavailable"};
 const row=order as PaidRow;
 if(row.payment_status!=="paid")return {outcome:"failed",code:"unpaid_order"};
 if(row.buyer_notice_status!=="pending")return {outcome:"already_processed"};
 if(!row.deliver_by)return {outcome:"failed",code:"delivery_terms_missing"};
 const merchantEmail=process.env.RBA_ESSENTIALS_SELLER_EMAIL?.trim()||"";
 const sellerName=process.env.RBA_ESSENTIALS_SELLER_NAME?.trim()||"";
 if(!sellerName||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(merchantEmail))return {outcome:"not_configured"};

 // Atomic compare-and-swap. 'failed' is a deliberate in-flight sentinel, not
 // automatically retried. A crash or uncertain provider response is reviewed
 // by an operator before resetting it; automatic retry may duplicate email.
 const {data:claimed,error:claimError}=await db.from("rba_essentials_orders")
   .update({buyer_notice_status:"failed"})
   .eq("order_id",orderId).eq("buyer_notice_status","pending")
   .select("order_id").maybeSingle();
 if(claimError)return {outcome:"failed",code:"claim_failed"};
 if(!claimed)return {outcome:"already_processed"};

 try{
   const stripe=new Stripe(stripeSecret);
   const session=await stripe.checkout.sessions.retrieve(row.stripe_checkout_session_id);
   const link=typeof session.payment_link==="string"?session.payment_link:null;
   const isSite=row.checkout_source==="rba_website" &&
       session.metadata?.program==="rba_essentials_presale" && !link;
   const expectedLink=row.stripe_payment_link_id;
   const isLink=row.checkout_source==="stripe_payment_link" &&
       session.metadata?.program==="rba_essentials_first_drop" &&
       (expectedLink==="plink_1UcRBCRXDnnSs6XNEW4xN93M"||expectedLink==="plink_1UcRBHRXDnnSs6XNoHlBdpSQ") &&
       link===expectedLink;
   if(!session.livemode||session.mode!=="payment"||session.payment_status!=="paid"||
      session.currency!=="jpy"||session.amount_total!==row.amount_total_jpy||
      (!isSite&&!isLink))return {outcome:"failed",code:"stripe_order_mismatch"};
   const email=session.customer_details?.email||session.customer_email;
   if(!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return {outcome:"failed",code:"missing_buyer_email"};
   const yen=(v:number)=>v.toLocaleString("ja-JP")+"円";
   const lines=[
     "RBA STORE｜お支払い・ご注文受付のご案内",
     "",
     "Riot Basketball Academy（RBA）公式ストアをご利用いただきありがとうございます。",
     "Stripeでお支払いを確認し、次の内容でご注文を受け付けました。",
     "",
     "注文番号："+row.order_id.slice(0,8).toUpperCase(),
     ...(row.tee_quantity>0?["RBA WHITE TEE / "+row.tee_size+" × "+row.tee_quantity]:[]),
     ...(row.setup_quantity>0?["RBA BLACK SETUP / 上 "+row.hoodie_size+"・下 "+row.pants_size+" × "+row.setup_quantity]:[]),
     "お支払金額（税込・国内送料込み）："+yen(row.amount_total_jpy),
     "入金日："+new Intl.DateTimeFormat("ja-JP",{timeZone:"Asia/Tokyo",year:"numeric",month:"long",day:"numeric"}).format(new Date(row.paid_at)),
     "発送期限："+row.dispatch_by,
     "お届け期限："+row.deliver_by,
     "適用販売条件："+row.terms_version,
     "",
     "商品画像はイメージです。確定した素材・サイズ、キャンセル・返品条件などはご購入時の販売条件をご参照ください。",
     "販売条件：https://riotbasketballacademy.com/ja/essentials/legal",
     "RBA STORE：https://riotbasketballacademy.com/ja/store",
     "",
     "お問い合わせ："+merchantEmail,
     "販売者："+sellerName,
     "※こちらは商品購入のご案内であり、寄附金控除の対象となる寄付の領収書ではありません。",
   ];
   const response=await fetch("https://api.resend.com/emails",{
      method:"POST",
      headers:{
        "Authorization":"Bearer "+mail.apiKey,
        "Content-Type":"application/json",
        "Idempotency-Key":"rba-store-acceptance-"+row.order_id,
      },
      body:JSON.stringify({
        from:mail.from,
        to:[email],
        reply_to:mail.replyTo,
        subject:"【RBA STORE】お支払い・ご注文受付のご案内（"+row.order_id.slice(0,8).toUpperCase()+"）",
        text:lines.join("\n"),
      }),
      cache:"no-store",
      signal:AbortSignal.timeout(12000),
   });
   if(!response.ok)return {outcome:"failed",code:"email_provider_rejected"};
   const payload=(await response.json()) as {id?:string};
   if(!payload.id)return {outcome:"failed",code:"email_provider_missing_id"};
   const {data:saved,error:updateError}=await db.from("rba_essentials_orders")
     .update({buyer_notice_status:"sent",buyer_notice_sent_at:new Date().toISOString()})
     .eq("order_id",row.order_id).eq("buyer_notice_status","failed").select("order_id").maybeSingle();
   if(updateError||!saved)return {outcome:"failed",code:"provider_accepted_db_update_failed"};
   return {outcome:"sent"};
 }catch{
   // Failed is a terminal review state, never blindly auto-retry an ambiguous send.
   return {outcome:"failed",code:"delivery_uncertain_review_required"};
 }
}
