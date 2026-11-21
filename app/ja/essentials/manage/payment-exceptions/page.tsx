import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createClient as createService } from "@supabase/supabase-js";
import { isRbaStoreOwner } from "@/lib/essentials-store-owner";
import { SiteFrame } from "@/components/site-frame";

export const dynamic="force-dynamic";
export const metadata: Metadata={
  title:"RBA STORE｜入金済みの要確認案件（管理者限定）",
  robots:{index:false,follow:false}
};
type ExceptionRecord={
 stripe_checkout_session_id:string;
 stripe_event_id:string;
 stripe_payment_intent_id:string|null;
 stripe_payment_link_id:string|null;
 amount_total_jpy:number;
 reason:string;
 review_state:string;
 first_detected_at:string;
};
const captions:Record<string,string>={
 unsupported_payment_link:"旧・対象外リンクでの入金",
 unapproved_contract_terms:"契約・発送・返品条件が未承認",
 incorrect_line_items_or_amount:"金額・商品明細が一致しない",
 invalid_garment_sizes:"サイズ情報が販売仕様と不一致",
 unexpected_product_metadata:"商品情報・送料設定が不一致",
};

export default async function PaidExceptionsInbox(){
 const client=await createClient();
 const {data:{user},error}=await client.auth.getUser();
 if(error||!user)notFound();
 const {data:profile,error:roleError}=await client.from("profiles")
  .select("role").eq("id",user.id).maybeSingle();
 if(roleError||(profile?.role!=="admin"&&!await isRbaStoreOwner(user.id)))notFound();
 const host="ctngdzzorhzpdxswahzl.supabase.co";
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
 const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 let errorText="";
 let rows:ExceptionRecord[]=[];
 if(!url||!key){
  errorText="RBA専用の受注管理接続が設定されていません。照合できません。";
 }else try{
  const parsed=new URL(url);
  if(parsed.protocol!=="https:"||parsed.hostname!==host||parsed.username||parsed.password)
   throw Error("unexpected_project");
  const db=createService(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
  const response=await db.from("rba_essentials_payment_exceptions")
   .select("stripe_checkout_session_id,stripe_event_id,stripe_payment_intent_id,stripe_payment_link_id,amount_total_jpy,reason,review_state,first_detected_at")
   .order("first_detected_at",{ascending:false})
   .limit(100);
  if(response.error)throw Error("query_failed");
  rows=(response.data||[]) as ExceptionRecord[];
 }catch{
  errorText="入金済み要確認案件の読み込みに失敗しました。欠落なしと判定しないでください。";
 }
 return <SiteFrame locale="ja"><main style={{minHeight:"75vh",background:"#f5f4f0",color:"#191919",padding:"60px clamp(20px,5vw,90px) 110px"}}>
  <div style={{maxWidth:1100,margin:"auto"}}>
   <p style={{fontSize:11,letterSpacing:".16em"}}>RBA STORE / PRIVATE ACCOUNTING</p>
   <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(34px,5vw,64px)",fontWeight:400}}>入金済み・要確認</h1>
   <p style={{lineHeight:2,maxWidth:850}}>
    Stripeでの支払い成功と、RBAでの注文受理は別の事実です。購入済みでも販売条件・金額・サイズが検証できなかった事案を記録します。
    ここにある入金を「注文確定」「発送済み」「返金済み」と自動判定しません。
   </p>
   {errorText?<p role="alert" style={{padding:20,background:"#eee3da"}}>{errorText}</p>:<>
    <p style={{padding:20,background:rows.some(x=>x.review_state==="needs_review")?"#eee3da":"#eae8e2"}}>
      <strong>{rows.filter(x=>x.review_state==="needs_review").length}件</strong> の未解決案件（最新100件内）。
      Stripeの取引詳細、契約条件、顧客連絡履歴をRBA管理者が照合してください。
    </p>
    <div style={{overflowX:"auto"}}>
     <table style={{borderCollapse:"collapse",width:"100%",minWidth:720,fontSize:13}}>
      <thead><tr>{["検出日時（JST）","支払金額","理由","確認状態","取引"].map(x=>
       <th key={x} style={{textAlign:"left",padding:13,borderBottom:"1px solid #aaa"}}>{x}</th>)}</tr></thead>
      <tbody>{rows.map(row=><tr key={row.stripe_checkout_session_id}>
       <td style={{padding:13,borderBottom:"1px solid #d5d2cc"}}>{new Date(row.first_detected_at).toLocaleString("ja-JP",{timeZone:"Asia/Tokyo"})}</td>
       <td style={{padding:13,borderBottom:"1px solid #d5d2cc"}}>{row.amount_total_jpy.toLocaleString("ja-JP")}円</td>
       <td style={{padding:13,borderBottom:"1px solid #d5d2cc"}}>{captions[row.reason]??"内容の確認が必要"}</td>
       <td style={{padding:13,borderBottom:"1px solid #d5d2cc"}}>{row.review_state==="needs_review"?"要確認":"確認記録あり"}</td>
       <td style={{padding:13,borderBottom:"1px solid #d5d2cc"}}>
        <a href={row.stripe_payment_intent_id?
         `https://dashboard.stripe.com/payments/${encodeURIComponent(row.stripe_payment_intent_id)}`:
         `https://dashboard.stripe.com/payments`}
          target="_blank" rel="noopener noreferrer">Stripeで照合</a>
       </td>
      </tr>)}</tbody>
     </table>
    </div>
    {!rows.length?<p>記録されている要確認案件はありません。ただしWebhook未接続の場合、未検出の決済がないことまでは保証できません。</p>:null}
   </>}
   <p style={{fontSize:12,lineHeight:2,marginTop:30}}>
    この管理画面は個人名・配送住所・メールアドレスを表示しません。案件を解決する場合は実際のStripe取引と購入者への対応結果を別途確認します。
    画面から返金、請求、製造発注を実行することはできません。
   </p>
   <p style={{marginTop:26}}><Link href="/ja/essentials/manage/reconciliation">入金と注文の照合へ</Link> ／ <Link href="/ja/essentials/manage">注文管理へ</Link></p>
  </div>
 </main></SiteFrame>;
}
