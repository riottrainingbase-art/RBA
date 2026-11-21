import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { SiteFrame } from "@/components/site-frame";
import { getEssentialsNoticeConfig } from "@/lib/essentials-notice-config";
import { sendPendingEssentialsNotice, sendPendingEssentialsShipmentNotice } from "./notice-actions";

export const dynamic="force-dynamic";
export const metadata:Metadata={
  title:"RBA ESSENTIALS｜注文管理（運営限定）",
  robots:{index:false,follow:false},
};
type Order={
 order_id:string;stripe_checkout_session_id:string;stripe_payment_intent_id:string|null;
 amount_total_jpy:number;tee_quantity:number;tee_size:string|null;setup_quantity:number;
 hoodie_size:string|null;pants_size:string|null;terms_version:string;
 dispatch_by:string;deliver_by:string|null;paid_at:string;fulfillment_status:string;payment_status:string;
 buyer_notice_status:string;buyer_notice_sent_at:string|null;
 shipment_notice_status:string;shipment_notice_sent_at:string|null;
};
export default async function EssentialsOrdersManage({searchParams}:{searchParams:Promise<{notice?:string}>}){
 const userDb=await createClient();
 const {data:{user},error}=await userDb.auth.getUser();
 if(error||!user)notFound();
 const profile=await userDb.from("profiles").select("role").eq("id",user.id).maybeSingle();
 if(profile.error||profile.data?.role!=="admin")notFound();
 const params=await searchParams;
 const emailReady=getEssentialsNoticeConfig().configured;
 const service=process.env.SUPABASE_SERVICE_ROLE_KEY;
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
 if(!service||!url)notFound();
 if(new URL(url).hostname!=="ctngdzzorhzpdxswahzl.supabase.co")notFound();
 const admin=createServiceClient(url,service,{auth:{persistSession:false,autoRefreshToken:false}});
 const result=await admin.from("rba_essentials_orders")
 .select("order_id,stripe_checkout_session_id,stripe_payment_intent_id,amount_total_jpy,tee_quantity,tee_size,setup_quantity,hoodie_size,pants_size,terms_version,dispatch_by,deliver_by,paid_at,fulfillment_status,payment_status,buyer_notice_status,buyer_notice_sent_at,shipment_notice_status,shipment_notice_sent_at")
 .order("paid_at",{ascending:false}).limit(100);
 const orders=(result.data||[]) as Order[];
 return <SiteFrame locale="ja"><main style={{padding:"45px clamp(20px,5vw,70px) 100px",background:"#f4f3f0",color:"#222"}}>
   <p style={{fontSize:11,letterSpacing:".15em"}}>RBA OPERATIONS / RESTRICTED ACCESS</p>
   <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(36px,6vw,70px)",fontWeight:400}}>Essentials orders.</h1>
   <p>お支払いが確認された先行購入の一覧です。注文詳細・配送先はStripe管理画面で確認し、発送記録を照合してください。注文情報は機密情報として扱ってください。</p>
   <p style={{fontSize:12,lineHeight:1.8}}><strong>注文承諾メール：</strong>{emailReady?"確認済みの送信元を使用できます。未送信注文のみ手動で再処理できます。":"送信元とメールサービスの設定が未確認のため、送信できません。"} 失敗した通知の再送は、送信サービスで配信履歴を確認してから別途対応してください。</p>
   {params.notice&&<p role="status" style={{fontSize:13}}>{params.notice==="shipment_sent"?"発送通知の送信依頼が受理されました。配信結果は送信サービス側で確認してください。":params.notice==="sent"?"注文承諾メールの送信依頼が受理されました。配信結果は送信サービス側で確認してください。":params.notice==="processed"?"この注文は既に処理対象外です。":"通知を送れませんでした。送信設定・配信状態をご確認ください。"}</p>}
   {result.error?<p role="alert">注文データを取得できませんでした。DBマイグレーションと権限を確認してください。</p>:<div style={{overflowX:"auto",marginTop:35}}>
    <table style={{borderCollapse:"collapse",minWidth:850,width:"100%",fontSize:12}}>
     <thead><tr>{["入金日時","注文番号","商品・サイズ","税込金額","お届け期限","状態","承諾メール","発送通知","Stripe"].map(h=><th key={h} style={{textAlign:"left",padding:"16px 11px",borderBottom:"1px solid #aaa"}}>{h}</th>)}</tr></thead>
     <tbody>{orders.map(o=><tr key={o.order_id}>
       <td style={{padding:"17px 10px",borderBottom:"1px solid #ddd"}}>{new Date(o.paid_at).toLocaleString("ja-JP",{timeZone:"Asia/Tokyo"})}</td>
       <td style={{padding:"17px 10px",borderBottom:"1px solid #ddd",fontFamily:"monospace"}}>{o.order_id.slice(0,8)}</td>
       <td style={{padding:"17px 10px",borderBottom:"1px solid #ddd"}}>{o.tee_quantity>0?<div>TEE {o.tee_size} × {o.tee_quantity}</div>:null}{o.setup_quantity>0?<div>SETUP {o.hoodie_size}/{o.pants_size} × {o.setup_quantity}</div>:null}</td>
       <td style={{padding:"17px 10px",borderBottom:"1px solid #ddd"}}>{o.amount_total_jpy.toLocaleString("ja-JP")}円</td>
       <td style={{padding:"17px 10px",borderBottom:"1px solid #ddd"}}>{o.deliver_by??o.dispatch_by}</td>
       <td style={{padding:"17px 10px",borderBottom:"1px solid #ddd"}}>{o.payment_status} / {o.fulfillment_status}</td>
       <td style={{padding:"17px 10px",borderBottom:"1px solid #ddd"}}>
         <div>{o.buyer_notice_status==="sent"?"送信依頼済み":o.buyer_notice_status==="failed"?"要確認":"未送信"}</div>
         {o.buyer_notice_status==="sent"&&o.buyer_notice_sent_at?<small>{new Date(o.buyer_notice_sent_at).toLocaleString("ja-JP",{timeZone:"Asia/Tokyo"})}</small>:null}
         {emailReady&&o.payment_status==="paid"&&o.buyer_notice_status==="pending"?<form action={sendPendingEssentialsNotice}><input type="hidden" name="order_id" value={o.order_id}/><button type="submit" style={{fontSize:12,padding:"7px 10px",marginTop:8,border:"1px solid #888"}}>未送信分を送信</button></form>:null}
       </td>
       <td style={{padding:"17px 10px",borderBottom:"1px solid #ddd"}}>
         <div>{o.shipment_notice_status==="sent"?"発送通知依頼済み":o.shipment_notice_status==="failed"?"要確認":o.shipment_notice_status==="pending"?"通知待ち":"未発送"}</div>
         {o.shipment_notice_status==="sent"&&o.shipment_notice_sent_at?<small>{new Date(o.shipment_notice_sent_at).toLocaleString("ja-JP",{timeZone:"Asia/Tokyo"})}</small>:null}
         {emailReady&&o.payment_status==="paid"&&o.shipment_notice_status==="pending"?<form action={sendPendingEssentialsShipmentNotice}><input type="hidden" name="order_id" value={o.order_id}/><button type="submit" style={{fontSize:12,padding:"7px 10px",marginTop:8,border:"1px solid #888"}}>発送通知を送信</button></form>:null}
       </td>
       <td style={{padding:"17px 10px",borderBottom:"1px solid #ddd"}}>{o.stripe_payment_intent_id?<a href={`https://dashboard.stripe.com/payments/${encodeURIComponent(o.stripe_payment_intent_id)}`} rel="noopener noreferrer" target="_blank">決済を開く ↗</a>:<span>照合中</span>}</td>
     </tr>)}</tbody>
    </table>
    {!orders.length&&<p>入金済みの注文はまだありません。</p>}
   </div>}
   <p style={{fontSize:12,color:"#555",marginTop:28,lineHeight:1.9}}>RBAが販売・入金確認・注文管理と製造依頼、発送結果の記録を担当します。りささん側には、合意済みの製作・検品・発送作業のみを委託し、RBA IDやStripe権限は必要ありません。委託先への安全な注文引渡しと、購入者への通知・返品対応は運用テスト後に有効化します。</p>
   <div style={{display:"flex",flexWrap:"wrap",gap:25,marginTop:35,fontSize:13}}><Link href="/ja/essentials/production">製作・発送ステータス ↗</Link><Link href="/ja/essentials/manage/readiness">販売開始の確認一覧 ↗</Link><Link href="/ja/essentials/manage/atelier">手書き加工の価格ラボ（非公開） ↗</Link><Link href="/ja/essentials">← RBA ESSENTIALSに戻る</Link></div>
  </main></SiteFrame>;
}
