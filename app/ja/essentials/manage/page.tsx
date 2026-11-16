import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { SiteFrame } from "@/components/site-frame";

export const dynamic="force-dynamic";
export const metadata:Metadata={
  title:"RBA ESSENTIALS｜注文管理（運営限定）",
  robots:{index:false,follow:false},
};
type Order={
 order_id:string;stripe_checkout_session_id:string;stripe_payment_intent_id:string|null;
 amount_total_jpy:number;tee_quantity:number;tee_size:string|null;setup_quantity:number;
 hoodie_size:string|null;pants_size:string|null;terms_version:string;
 dispatch_by:string;paid_at:string;fulfillment_status:string;payment_status:string;
};
export default async function EssentialsOrdersManage(){
 const userDb=await createClient();
 const {data:{user},error}=await userDb.auth.getUser();
 if(error||!user)notFound();
 const profile=await userDb.from("profiles").select("role").eq("id",user.id).maybeSingle();
 if(profile.error||profile.data?.role!=="admin")notFound();
 const service=process.env.SUPABASE_SERVICE_ROLE_KEY;
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
 if(!service||!url)notFound();
 if(new URL(url).hostname!=="ctngdzzorhzpdxswahzl.supabase.co")notFound();
 const admin=createServiceClient(url,service,{auth:{persistSession:false,autoRefreshToken:false}});
 const result=await admin.from("rba_essentials_orders")
 .select("order_id,stripe_checkout_session_id,stripe_payment_intent_id,amount_total_jpy,tee_quantity,tee_size,setup_quantity,hoodie_size,pants_size,terms_version,dispatch_by,paid_at,fulfillment_status,payment_status")
 .order("paid_at",{ascending:false}).limit(100);
 const orders=(result.data||[]) as Order[];
 return <SiteFrame locale="ja"><main style={{padding:"45px clamp(20px,5vw,70px) 100px",background:"#f4f3f0",color:"#222"}}>
   <p style={{fontSize:11,letterSpacing:".15em"}}>RBA OPERATIONS / RESTRICTED ACCESS</p>
   <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(36px,6vw,70px)",fontWeight:400}}>Essentials orders.</h1>
   <p>お支払いが確認された先行購入の一覧です。注文詳細・配送先はStripe管理画面で確認し、発送記録を照合してください。注文情報は機密情報として扱ってください。</p>
   {result.error?<p role="alert">注文データを取得できませんでした。DBマイグレーションと権限を確認してください。</p>:<div style={{overflowX:"auto",marginTop:35}}>
    <table style={{borderCollapse:"collapse",minWidth:850,width:"100%",fontSize:12}}>
     <thead><tr>{["入金日時","注文番号","商品・サイズ","税込金額","発送期限","状態","Stripe"].map(h=><th key={h} style={{textAlign:"left",padding:"16px 11px",borderBottom:"1px solid #aaa"}}>{h}</th>)}</tr></thead>
     <tbody>{orders.map(o=><tr key={o.order_id}>
       <td style={{padding:"17px 10px",borderBottom:"1px solid #ddd"}}>{new Date(o.paid_at).toLocaleString("ja-JP",{timeZone:"Asia/Tokyo"})}</td>
       <td style={{padding:"17px 10px",borderBottom:"1px solid #ddd",fontFamily:"monospace"}}>{o.order_id.slice(0,8)}</td>
       <td style={{padding:"17px 10px",borderBottom:"1px solid #ddd"}}>{o.tee_quantity>0?<div>TEE {o.tee_size} × {o.tee_quantity}</div>:null}{o.setup_quantity>0?<div>SETUP {o.hoodie_size}/{o.pants_size} × {o.setup_quantity}</div>:null}</td>
       <td style={{padding:"17px 10px",borderBottom:"1px solid #ddd"}}>{o.amount_total_jpy.toLocaleString("ja-JP")}円</td>
       <td style={{padding:"17px 10px",borderBottom:"1px solid #ddd"}}>{o.dispatch_by}</td>
       <td style={{padding:"17px 10px",borderBottom:"1px solid #ddd"}}>{o.payment_status} / {o.fulfillment_status}</td>
       <td style={{padding:"17px 10px",borderBottom:"1px solid #ddd"}}>{o.stripe_payment_intent_id?<a href={`https://dashboard.stripe.com/payments/${encodeURIComponent(o.stripe_payment_intent_id)}`} rel="noopener noreferrer" target="_blank">決済を開く ↗</a>:<span>照合中</span>}</td>
     </tr>)}</tbody>
    </table>
    {!orders.length&&<p>入金済みの注文はまだありません。</p>}
   </div>}
   <p style={{fontSize:12,color:"#555",marginTop:28,lineHeight:1.9}}>この画面はRBAの管理権限を持つユーザーに限定されています。メールでの受注承諾通知・発送通知・返品対応は別途運用確認が必要です。</p>
   <Link href="/ja/essentials">← RBA ESSENTIALSに戻る</Link>
  </main></SiteFrame>;
}
