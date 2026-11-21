import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Stripe from "stripe";
import { createClient as adminDbClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { isRbaStoreOwner } from "@/lib/essentials-store-owner";
import { verifyEssentialsStripeAccount } from "@/lib/essentials-stripe";

export const dynamic="force-dynamic";
export const metadata:Metadata={title:"RBA ESSENTIALS｜配送先（制作者専用）",robots:{index:false,follow:false}};
type Props={params:Promise<{orderId:string}>};
type CheckoutDelivery={
  shipping_details?:{name?:string|null;phone?:string|null;address?:{line1?:string|null;line2?:string|null;postal_code?:string|null;city?:string|null;state?:string|null;country?:string|null}|null}|null;
  collected_information?:{shipping_details?:{name?:string|null;phone?:string|null;address?:{line1?:string|null;line2?:string|null;postal_code?:string|null;city?:string|null;state?:string|null;country?:string|null}|null}|null}|null;
};
export default async function EssentialsShippingForMaker({params}:Props){
 const {orderId}=await params;
 if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(orderId))notFound();
 const client=await createClient();
 const {data:{user},error}=await client.auth.getUser();
 if(error||!user)notFound();
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,service=process.env.SUPABASE_SERVICE_ROLE_KEY;
 const stripeSecret=process.env.STRIPE_SECRET_KEY;
 if(!url||!service||!stripeSecret)notFound();
 try{if(new URL(url).hostname!=="ctngdzzorhzpdxswahzl.supabase.co")notFound();}
 catch{notFound();}
 const admin=adminDbClient(url,service,{auth:{persistSession:false,autoRefreshToken:false}});
 const [profile,agent]=await Promise.all([
  client.from("profiles").select("role").eq("id",user.id).maybeSingle(),
  admin.from("rba_essentials_fulfillment_agents").select("active,terms_reference").eq("user_id",user.id).eq("active",true).maybeSingle(),
 ]);
 const isRbaAdmin=profile.data?.role==="admin" || await isRbaStoreOwner(user.id);
 const hasValidProductionMandate=agent.data?.active&&!!agent.data?.terms_reference;
 if(!isRbaAdmin&&!hasValidProductionMandate)notFound();
 const {data:order,error:orderError}=await admin.from("rba_essentials_orders")
 .select("order_id,paid_at,amount_total_jpy,stripe_checkout_session_id,payment_status,fulfillment_status,deliver_by,tee_quantity,tee_size,setup_quantity,hoodie_size,pants_size")
 .eq("order_id",orderId).maybeSingle();
 if(orderError||!order||order.payment_status!=="paid")notFound();
 const stripe=new Stripe(stripeSecret);
 if(!await verifyEssentialsStripeAccount(stripeSecret))notFound();
 let session:Stripe.Checkout.Session;
 try{session=await stripe.checkout.sessions.retrieve(order.stripe_checkout_session_id);}
 catch{notFound();}
 if(!session.livemode||session.payment_status!=="paid"||session.mode!=="payment"||session.currency!=="jpy")notFound();
 const extended=session as Stripe.Checkout.Session&CheckoutDelivery;
 const shipping=extended.collected_information?.shipping_details??extended.shipping_details;
 const address=shipping?.address;
 if(!address||address.country!=="JP")return <main style={{padding:"60px 24px",fontFamily:"Arial,sans-serif"}}><h1>配送先の確認が必要です。</h1><p>Stripe注文に日本国内の配送先を確認できません。RBA販売担当にご連絡ください。</p><Link href="/ja/essentials/production">製作一覧に戻る</Link></main>;
 const line=[address.postal_code?"〒"+address.postal_code:"",address.state,address.city,address.line1,address.line2].filter(Boolean).join(" ");
 return <main style={{background:"#f4f2ed",minHeight:"100vh",padding:"70px 22px",fontFamily:"Arial,sans-serif",color:"#1a1917"}}>
  <section style={{maxWidth:820,margin:"auto",borderTop:"1px solid #444",paddingTop:25}}>
   <p style={{fontSize:11,letterSpacing:".14em"}}>RBA ESSENTIALS / AUTHORIZED FULFILLMENT ONLY</p>
   <h1 style={{fontFamily:"Georgia,serif",fontWeight:400,fontSize:"clamp(43px,7vw,84px)",letterSpacing:"-.05em",margin:"32px 0"}}>Shipping details.</h1>
   <p style={{fontSize:14,lineHeight:2}}>入金が確認された注文の発送実務に必要な情報です。目的外利用、SNSへの転記、第三者共有は禁止します。</p>
   <dl style={{display:"grid",gridTemplateColumns:"minmax(100px,1fr) minmax(0,3fr)",gap:19,borderTop:"1px solid #bbb",paddingTop:26,fontSize:14,lineHeight:1.9}}>
    <dt>注文番号</dt><dd style={{margin:0,overflowWrap:"anywhere"}}>{orderId}</dd>
    <dt>受取人</dt><dd style={{margin:0}}>{shipping?.name||"要確認"}</dd>
    <dt>お届け先</dt><dd style={{margin:0}}>{line||"要確認"}</dd>
    <dt>連絡先電話</dt><dd style={{margin:0}}>{shipping?.phone||session.customer_details?.phone||"未登録"}</dd>
    <dt>商品</dt><dd style={{margin:0}}>{order.tee_quantity?("WHITE TEE "+order.tee_size+" ×"+order.tee_quantity):""} {order.setup_quantity?("BLACK SETUP Hoodie "+order.hoodie_size+" / Pants "+order.pants_size+" ×"+order.setup_quantity):""}</dd>
    <dt>お届け期限</dt><dd style={{margin:0}}>{order.deliver_by||"販売者へ確認"}</dd>
   </dl>
   <p style={{fontSize:12,lineHeight:1.9,color:"#666",marginTop:30}}>配送先が変更された可能性がある場合は、発送前にRBA販売担当へ確認してください。住所を暗号化されていないチャットに貼り付けないでください。</p>
   <Link href="/ja/essentials/production">製作管理に戻る ↗</Link>
  </section>
 </main>;
}
