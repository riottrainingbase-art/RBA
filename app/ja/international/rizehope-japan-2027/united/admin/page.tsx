import type {Metadata} from "next";
import {redirect} from "next/navigation";
import {createClient} from "@/lib/supabase/server";
import {isRizehopeUnitedIndividualPaymentReady} from "@/lib/rizehope-2027";
import {importUnitedInterest,recordUnitedGuardianTerms,selectUnitedPlayer} from "./actions";
import {UnitedCheckoutControl} from "./checkout-control";

export const dynamic="force-dynamic";
export const metadata:Metadata={title:"RIZEHOPE RBA UNITED｜保護者別の非公開決済台帳",robots:{index:false,follow:false,noarchive:true}};

export default async function Page(){
 const db=await createClient();
 const {data:{user}}=await db.auth.getUser();
 if(!user)redirect("/ja/my-homecourt/login?next=%2Fja%2Finternational%2Frizehope-japan-2027%2Funited%2Fadmin");
 const {data:profile}=await db.from("profiles").select("role").eq("id",user.id).maybeSingle();
 if(profile?.role!=="admin")redirect("/ja/international/rizehope-japan-2027/united");
 const [a,t]=await Promise.all([
  db.from("rizehope_2027_united_players")
   .select("id,team_entry_id,guardian_name,guardian_email,region,source_form_id,source_submission_id,source_submitted_at,status,total_jpy,deposit_jpy,balance_jpy,terms_version,terms_accepted_at,deposit_paid_at,balance_paid_at")
   .order("source_submitted_at",{ascending:true}),
  db.from("rizehope_2027_team_entries").select("id,team_name,status").eq("category","united")
 ]);
 const players=a.data??[];
 const teams=(t.data??[]).filter(x=>["approved_pending_deposit","deposit_paid","balance_requested","confirmed"].includes(x.status));
 const selectionOpen=process.env.RIZEHOPE_2027_UNITED_APPROVAL_ENABLED==="true";
 const paymentOpen=selectionOpen&&isRizehopeUnitedIndividualPaymentReady()&&[
  "RIZEHOPE_2027_UNITED_CHECKOUT_ENABLED","RIZEHOPE_2027_UNITED_ORGANIZER_APPROVED",
  "RIZEHOPE_2027_UNITED_TERMS_PUBLISHED","RIZEHOPE_2027_UNITED_TAX_REVIEW_APPROVED",
  "RIZEHOPE_2027_UNITED_STRIPE_WEBHOOK_READY","RIZEHOPE_2027_UNITED_ROSTER_CONFIRMED"
 ].every(k=>process.env[k]==="true");
 return <main className="min-h-screen bg-[#f8f5f0] px-5 py-12 text-[#111]">
  <div className="mx-auto max-w-6xl">
   <a href="/ja/international/rizehope-japan-2027/united" className="text-sm underline">← RBA UNITED 案内ページ</a>
   <p className="mt-7 text-xs font-black tracking-widest text-orange-700">AUTHORIZED RBA STAFF ONLY</p>
   <h1 className="mt-3 text-3xl font-black">RBA UNITED｜個人別の受付・前金・残金</h1>
   <p className="mt-4 text-sm leading-8">国内U12チームの1チーム66,000円とは独立した非公開台帳です。選手の氏名・健康情報は保存せず、保護者の申込原票と支払いを厳密に照合します。</p>
   <div className="mt-7 border-l-4 border-[#f7842c] bg-white p-6">
    <strong>現在の決済状態：{paymentOpen?"承認済み保護者のみ発行可":"実課金停止"}</strong>
    <p className="mt-2 text-sm leading-7">登録：{players.length}件　／　RBA UNITEDの出場承認済みチーム：{teams.length}件　／　選考操作：{selectionOpen?"運営承認後のみ":"停止中"}</p>
    <p className="mt-2 text-sm leading-7">個人参加費と前金額、徴収主体、返金規定、税務、保護者同意、Stripe入金照合が確認できるまで決済は解除されません。</p>
   </div>
   <section className="mt-10 bg-white p-6">
    <h2 className="text-xl font-black">既存無料Jotformの原票を照合して取り込む</h2>
    <p className="mt-3 text-sm leading-7">Jotform申込ID 263221266794057。正確な送信日時と成人保護者の連絡先のみを転記してください。重複原票は二重登録しません。</p>
    <form action={importUnitedInterest} className="mt-5 grid gap-4 sm:grid-cols-2">
      {([["Jotform submission ID","submission_id"],["申込日時（ISO 8601・時差つき）","submitted_at"],["成人保護者氏名","guardian_name"],["保護者のメールアドレス","guardian_email"],["都道府県・地域","region"]] as const).map(([label,key])=><label className="text-sm font-bold" key={key}>{label}<input name={key} required className="mt-2 block w-full border border-neutral-300 p-3"/></label>)}
      <button type="submit" className="min-h-12 bg-black px-5 py-3 font-black text-white">確認済み原票を登録</button>
    </form>
   </section>
   <section className="mt-10">
    <h2 className="text-xl font-black">保護者ごとの状態</h2>
    {a.error?<p className="mt-4 bg-white p-6">台帳のマイグレーション未適用、権限または接続エラー。公開・決済はできません。</p>:players.length===0?<p className="mt-4 bg-white p-6">個人台帳の登録はまだありません。無料Jotformの回答は別に確認します。</p>:<div className="mt-5 grid gap-4">
     {players.map(p=><article key={p.id} className="border bg-white p-5">
      <div className="flex flex-wrap justify-between gap-3"><h3 className="text-lg font-black">{p.guardian_name}（{p.region}）</h3><span className="border px-3 py-1 text-xs">{p.status}</span></div>
      <p className="mt-2 text-sm">{p.guardian_email}</p><p className="mt-2 text-xs">原票：{p.source_form_id} / {p.source_submission_id}</p>
      <p className="mt-3 text-sm">総額：{p.total_jpy===null?"未確定":p.total_jpy+"円"} ／ 前金：{p.deposit_jpy===null?"未確定":p.deposit_jpy+"円"} ／ 残金：{p.balance_jpy===null?"未確定":p.balance_jpy+"円"}</p>
      <p className="mt-2 text-sm">前金：{p.deposit_paid_at?"Stripe照合済":"未入金"} ／ 残金：{p.balance_paid_at?"Stripe照合済":"未入金"}</p>
      {["interest","reviewing"].includes(p.status)&&<form action={selectUnitedPlayer} className="mt-4 grid gap-3 border-t pt-4 sm:grid-cols-3">
       <input type="hidden" name="player_id" value={p.id}/>
       <label className="text-xs font-bold">正式なUNITEDチーム枠<select name="team_id" required className="mt-2 block w-full border p-3" disabled={!selectionOpen||!teams.length}><option value="">承認済みチームを選択</option>{teams.map(team=><option key={team.id} value={team.id}>{team.team_name}</option>)}</select></label>
       {(["terms_version","total_jpy","deposit_jpy","balance_jpy"] as const).map(key=><label key={key} className="text-xs font-bold">{key}<input name={key} required className="mt-2 block w-full border p-3" disabled={!selectionOpen||!teams.length}/></label>)}
       <button type="submit" className="border bg-[#ff8a35] px-5 py-3 font-black disabled:opacity-30" disabled={!selectionOpen||!teams.length}>選考・個人料金を正式登録</button>
      </form>}
      {p.status==="selected"&&!p.terms_accepted_at&&<form action={recordUnitedGuardianTerms} className="mt-4 flex flex-wrap gap-3 border-t pt-4">
       <input type="hidden" name="player_id" value={p.id}/>
       <input type="hidden" name="terms_version" value={p.terms_version??""}/>
       <input name="evidence" required placeholder="保護者規約同意の原票ID" className="min-w-56 border p-3" disabled={!selectionOpen}/>
       <button type="submit" className="border px-5 py-3 font-bold disabled:opacity-30" disabled={!selectionOpen}>保護者の書面同意を照合</button>
      </form>}
      {["approved_pending_deposit","deposit_paid","balance_requested"].includes(p.status)&&
       <UnitedCheckoutControl playerId={p.id} stage={p.status==="approved_pending_deposit"?"deposit":"balance"} enabled={paymentOpen&&Boolean(p.terms_accepted_at)}/>}
     </article>)}</div>}
   </section>
  </div>
 </main>;
}
