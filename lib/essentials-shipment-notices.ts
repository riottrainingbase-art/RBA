import "server-only";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { getEssentialsNoticeConfig } from "@/lib/essentials-notice-config";
import { verifyEssentialsStripeAccount } from "@/lib/essentials-stripe";

type Outcome="sent"|"not_configured"|"already_processed"|"failed";
type Result={outcome:Outcome;code?:string};
type ShippedOrder={
 order_id:string;stripe_checkout_session_id:string;payment_status:string;
 fulfillment_status:string;shipment_notice_status:string;
 tee_quantity:number;tee_size:string|null;setup_quantity:number;
 hoodie_size:string|null;pants_size:string|null;deliver_by:string|null;
};
type ShipmentTask={
 order_id:string;stage:string;tracking_reference:string|null;carrier:string|null;dispatch_date:string|null;
};

/** Send only after shipment is actually recorded; never store email/address in HOMECOURT. */
export async function sendEssentialsShipmentNotice(orderId:string):Promise<Result>{
 const mail=getEssentialsNoticeConfig();
 if(!mail.configured)return {outcome:"not_configured"};
 if(!/^[0-9a-f]{8}-[0-9a-f-]{28}$/i.test(orderId))return {outcome:"failed",code:"invalid_order_id"};
 const dbUrl=process.env.NEXT_PUBLIC_SUPABASE_URL;
 const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 const stripeKey=process.env.STRIPE_SECRET_KEY;
 if(!dbUrl||!key||!stripeKey)return {outcome:"not_configured"};
 try{if(new URL(dbUrl).origin!=="https://ctngdzzorhzpdxswahzl.supabase.co")return {outcome:"failed",code:"invalid_database"};}
 catch{return {outcome:"failed",code:"invalid_database"};}
 if(!await verifyEssentialsStripeAccount(stripeKey))return {outcome:"failed",code:"stripe_account_mismatch"};
 const db=createClient(dbUrl,key,{auth:{persistSession:false,autoRefreshToken:false}});
 const [rOrder,rTask]=await Promise.all([
  db.from("rba_essentials_orders")
   .select("order_id,stripe_checkout_session_id,payment_status,fulfillment_status,shipment_notice_status,tee_quantity,tee_size,setup_quantity,hoodie_size,pants_size,deliver_by")
   .eq("order_id",orderId).maybeSingle(),
  db.from("rba_essentials_fulfillment_tasks")
   .select("order_id,stage,tracking_reference,carrier,dispatch_date")
   .eq("order_id",orderId).maybeSingle(),
 ]);
 if(rOrder.error||rTask.error||!rOrder.data||!rTask.data)return {outcome:"failed",code:"shipment_unavailable"};
 const row=rOrder.data as ShippedOrder;
 const task=rTask.data as ShipmentTask;
 if(row.payment_status!=="paid"||
    !["shipped","delivered"].includes(row.fulfillment_status)||
    !["shipped","delivered"].includes(task.stage)||
    !task.dispatch_date||!/^20\d{2}-\d{2}-\d{2}$/.test(task.dispatch_date)||
    !task.carrier||task.carrier.length<2||/[\r\n<>]/.test(task.carrier)||
    !task.tracking_reference||task.tracking_reference.length<5||/[\r\n<>]/.test(task.tracking_reference))
    return {outcome:"failed",code:"shipment_not_verified"};
 if(row.shipment_notice_status!=="pending")return {outcome:"already_processed"};
 const merchantEmail=process.env.RBA_ESSENTIALS_SELLER_EMAIL?.trim()||"";
 const sellerName=process.env.RBA_ESSENTIALS_SELLER_NAME?.trim()||"";
 if(!sellerName||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(merchantEmail))return {outcome:"not_configured"};

 // Exclusive claim: other workers may not send the same notice. Failed/ambiguous
 // sends must be reviewed by the operator before another attempt.
 const claim=await db.from("rba_essentials_orders")
   .update({shipment_notice_status:"failed"})
   .eq("order_id",orderId).eq("shipment_notice_status","pending")
   .select("order_id").maybeSingle();
 if(claim.error)return {outcome:"failed",code:"claim_failed"};
 if(!claim.data)return {outcome:"already_processed"};

 try{
   const stripe=new Stripe(stripeKey);
   const session=await stripe.checkout.sessions.retrieve(row.stripe_checkout_session_id);
   if(!session.livemode||session.payment_status!=="paid"||
      session.currency!=="jpy"||session.mode!=="payment")return {outcome:"failed",code:"unverified_payment"};
   const to=session.customer_details?.email||session.customer_email;
   if(!to||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to))return {outcome:"failed",code:"missing_buyer_email"};
   const lines=[
     "RBA STORE｜商品発送のお知らせ","","RBA STOREをご利用いただきありがとうございます。",
     "次のご注文について、発送を確認しました。","","注文番号："+row.order_id.slice(0,8).toUpperCase(),
     ...(row.tee_quantity>0?["RBA WHITE TEE / "+row.tee_size+" × "+row.tee_quantity]:[]),
     ...(row.setup_quantity>0?["RBA BLACK SETUP / 上 "+row.hoodie_size+"・下 "+row.pants_size+" × "+row.setup_quantity]:[]),
     "発送日："+task.dispatch_date,
     "配送会社："+task.carrier,
     "お問い合わせ番号："+task.tracking_reference,
     "お届け期限："+(row.deliver_by||"購入時の販売条件をご参照ください"),
     "",
     "到着まで、配送会社の追跡サービス等で状況をご確認ください。",
     "配送や商品に関するお問い合わせ："+merchantEmail,
     "販売者："+sellerName,
     "https://riotbasketballacademy.com/ja/store",
   ];
   const response=await fetch("https://api.resend.com/emails",{
     method:"POST",
     headers:{
       "Authorization":"Bearer "+mail.apiKey,
       "Content-Type":"application/json",
       "Idempotency-Key":"rba-store-shipment-"+row.order_id,
     },
     body:JSON.stringify({
       from:mail.from,to:[to],reply_to:mail.replyTo,
       subject:"【RBA STORE】商品を発送しました（"+row.order_id.slice(0,8).toUpperCase()+"）",
       text:lines.join("\n"),
     }),
     cache:"no-store",signal:AbortSignal.timeout(12000),
   });
   if(!response.ok)return {outcome:"failed",code:"email_provider_rejected"};
   const payload=(await response.json()) as {id?:string};
   if(!payload.id)return {outcome:"failed",code:"email_provider_missing_id"};
   const saved=await db.from("rba_essentials_orders")
    .update({shipment_notice_status:"sent",shipment_notice_sent_at:new Date().toISOString()})
    .eq("order_id",orderId).eq("shipment_notice_status","failed")
    .select("order_id").maybeSingle();
   if(saved.error||!saved.data)return {outcome:"failed",code:"provider_accepted_db_update_failed"};
   return {outcome:"sent"};
 }catch{return {outcome:"failed",code:"delivery_uncertain_review_required"};}
}
