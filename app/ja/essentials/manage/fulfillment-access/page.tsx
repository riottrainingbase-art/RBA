import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient as createService } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { isRbaStoreOwner } from "@/lib/essentials-store-owner";
import { SiteFrame } from "@/components/site-frame";
import { grantEssentialsMakerAccess, revokeEssentialsMakerAccess } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "RBA STORE｜製造担当アクセス設定（管理者限定）",
  robots: { index: false, follow: false },
};
const messages: Record<string,string> = {
  saved:"本人確認済みアカウントに製作・発送権限を付与しました。",
  revoked:"対象アカウントの製作・発送権限を無効にしました。",
  invalid:"入力内容または署名済み契約の確認を見直してください。",
  identity:"認証済みアカウントのID・確認済みメールが一致しません。権限は付与していません。",
  config:"本番の安全なサービス接続が未設定です。権限を付与していません。",
  error:"権限の保存を検証できませんでした。管理者が接続と記録を確認してください。",
};
const inputStyle = { display:"block", width:"100%", maxWidth:600, padding:"14px", margin:"8px 0 22px", border:"1px solid #aaa", color:"#161616", background:"#fff", fontSize:15 } as const;
const btnStyle = { background:"#191919", color:"#fff", border:0, padding:"16px 23px", cursor:"pointer", marginTop:12 } as const;
export default async function MakerAccessPage({searchParams}:{searchParams:Promise<{state?:string}>}) {
  const session = await createClient();
  const {data:{user},error} = await session.auth.getUser();
  if(error||!user)notFound();
  const {data:profile,error:profileError} = await session.from("profiles").select("role").eq("id",user.id).maybeSingle();
  if(profileError||(profile?.role!=="admin" && !await isRbaStoreOwner(user.id)))notFound();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const expected = "ctngdzzorhzpdxswahzl.supabase.co";
  const connected = Boolean(url&&secret&&url.startsWith("https://"+expected));
  const service=connected?createService(url!,secret!,{auth:{persistSession:false,autoRefreshToken:false}}):null;
  const makerRows=service?await service.from("rba_essentials_fulfillment_agents")
    .select("user_id,active,access_role,granted_at,terms_reference").order("granted_at",{ascending:false}).limit(20):null;
  const q=await searchParams;
  const safeState=q.state&&Object.prototype.hasOwnProperty.call(messages,q.state)?q.state:null;
  return <SiteFrame locale="ja"><main style={{background:"#f5f3ed",color:"#191919",padding:"48px clamp(20px,5vw,80px) 85px"}}>
    <div style={{maxWidth:1050,margin:"0 auto"}}>
      <p style={{fontSize:12,letterSpacing:".14em"}}>RBA STORE / PRIVATE ADMIN / IDENTITY + AGREEMENT</p>
      <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(31px,5vw,57px)",fontWeight:400}}>製造・発送担当者の権限設定</h1>
      <p style={{maxWidth:790,lineHeight:2}}>RBA管理方式では販売・入金・製造依頼・発送記録をRBA管理者が扱うため、製造委託先のログインは不要です。この画面は将来、外部製造担当者に直接操作を委任すると決めた場合だけ利用してください。登録済みSupabaseアカウントの本人確認と、双方署名済み契約の原本確認を済ませた場合に限り権限を付与します。アカウントや契約を自動作成することはありません。</p>
      {safeState?<p role="status" style={{padding:16,background:"#ebe3d5"}}>{messages[safeState]}</p>:null}
      {!connected?<p role="alert">本番管理接続が未設定です。権限付与を停止しています。</p>:null}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,350px),1fr))",gap:30,margin:"40px 0"}}>
      <section style={{background:"#fff",padding:"28px"}}>
        <h2 style={{fontSize:23}}>本人確認後に権限を付与</h2>
        <form action={grantEssentialsMakerAccess}>
          <label>確認済みSupabaseユーザーID（UUID）<input name="user_id" required pattern="[0-9a-fA-F-]{36}" autoComplete="off" style={inputStyle} /></label>
          <label>本人が確認したメールアドレス<input type="email" name="verified_email" required autoComplete="off" style={inputStyle}/></label>
          <label>双方署名済み製造契約の非公開証跡ID<input name="signed_terms_reference" minLength={12} maxLength={160} required autoComplete="off" placeholder="例：社内保管庫の署名済み契約識別子" style={inputStyle}/></label>
          <label style={{display:"flex",gap:12,lineHeight:1.8}}><input name="signed_terms_verified" type="checkbox" value="yes" required/>本人のアカウント・契約名義・署名・権限付与について原本と突合済みであることを確認しました。</label>
          <button type="submit" style={btnStyle} disabled={!connected}>製造担当の権限を付与する</button>
        </form>
      </section>
      <section style={{background:"#e9e7e1",padding:"28px"}}>
        <h2 style={{fontSize:23}}>登録・停止状況</h2>
        <p>登録数 {makerRows?.data?.length??0} 件（表示上限20件）。本番の販売可否は別の審査ゲートで判定します。</p>
        {makerRows?.error?<p role="alert">管理データを読み取れませんでした。</p>:null}
        {makerRows?.data?.map(row=><div key={row.user_id} style={{borderTop:"1px solid #c3c0b8",padding:"15px 0"}}>
          <p style={{margin:"0 0 6px"}}><strong>{row.active?"有効":"停止"}</strong> ／ {row.user_id.slice(0,8)}…</p>
          <p style={{fontSize:12,wordBreak:"break-all"}}>署名資料参照：{row.terms_reference}</p>
          {row.active?<form action={revokeEssentialsMakerAccess}><input type="hidden" name="user_id" value={row.user_id}/><label><input type="checkbox" name="revoke_confirm" value="yes" required/>この担当者の権限を停止する</label><button type="submit" style={{...btnStyle,padding:"10px 15px"}}>権限停止</button></form>:null}
        </div>)}
        <p style={{fontSize:12,lineHeight:1.8}}>製造担当者は注文・梱包・出荷ステータスだけを管理します。住所・メールアドレス・電話番号はこの担当画面に公開しません。</p>
      </section>
      </div>
      <p><Link href="/ja/essentials/manage/readiness">販売準備の確認画面へ戻る</Link> ／ <Link href="/ja/essentials/production">製造タスク管理へ</Link></p>
    </div>
  </main></SiteFrame>;
}
