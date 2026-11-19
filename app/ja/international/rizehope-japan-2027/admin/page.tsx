import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { importRizehopeTeam, acceptRizehopeTeam, recordRizehopeTermsEvidence } from "./actions";
import { RizehopeCheckoutControl } from "./checkout-control";

export const dynamic="force-dynamic";
export const metadata:Metadata={title:"RIZEHOPE 2027｜内部受付・入金台帳",robots:{index:false,follow:false,noarchive:true}};
const held=new Set(["approved_pending_deposit","deposit_paid","balance_requested","confirmed"]);
const format=(value:string)=>new Intl.DateTimeFormat("ja-JP",{timeZone:"Asia/Tokyo",dateStyle:"medium",timeStyle:"short"}).format(new Date(value));
export default async function Page() {
  const db=await createClient();
  const {data:{user}}=await db.auth.getUser();
  if(!user)redirect("/ja/my-homecourt/login?next=%2Fja%2Finternational%2Frizehope-japan-2027%2Fadmin");
  const {data:profile}=await db.from("profiles").select("role").eq("id",user.id).maybeSingle();
  if(profile?.role!=="admin")redirect("/ja/international/rizehope-japan-2027");
  const [list,cap]=await Promise.all([
    db.from("rizehope_2027_team_entries").select("id,team_name,region,category,adult_representative,representative_email,status,source_submitted_at,source_form_id,source_submission_id,terms_version,terms_accepted_at,deposit_paid_at,balance_paid_at").order("source_submitted_at",{ascending:true}),
    db.from("rizehope_2027_capacity").select("max_teams").eq("event_key","rizehope_japan_2027").maybeSingle()
  ]);
  const teams=list.data??[];
  const reserved=teams.filter(t=>held.has(t.status)).length;
  const confirmed=teams.filter(t=>t.status==="confirmed").length;
  const payable=teams.filter(t=>t.status==="approved_pending_deposit").length;
  const max=cap.data?.max_teams??10;
  const approvalEnabled=process.env.RIZEHOPE_2027_APPROVAL_ENABLED==="true";
  const checkoutEnabled=["RIZEHOPE_2027_CHECKOUT_ENABLED","RIZEHOPE_2027_ORGANIZER_APPROVED","RIZEHOPE_2027_TERMS_PUBLISHED","RIZEHOPE_2027_TAX_REVIEW_APPROVED","RIZEHOPE_2027_STRIPE_WEBHOOK_READY"].every(k=>process.env[k]==="true");
  return <main className="min-h-screen bg-[#f7f4ed] px-5 py-12 text-[#1d1d1d]">
    <div className="mx-auto max-w-6xl">
      <a href="/ja/international/rizehope-japan-2027" className="text-sm underline">← RIZEHOPE案内へ</a>
      <p className="mt-8 text-xs font-black tracking-[.2em] text-orange-600">AUTHORIZED RBA STAFF ONLY</p>
      <h1 className="mt-3 text-3xl font-black">RIZEHOPE｜受付・参加枠・支払い台帳</h1>
      <p className="mt-4 text-sm leading-7">国内・海外・RBA UNITEDを通算して最大10チーム。ここへの登録はJotformの申込を自動同期するものではありません。申込原票の時刻・チーム名・代表者を照合して登録してください。</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-4">
        {([["総上限",max],["仮確保・確定",reserved],["最終確定",confirmed],["前金案内待ち",payable]] as const).map(([label,value])=><div key={label} className="border border-neutral-200 bg-white p-5"><p className="text-xs text-neutral-600">{label}</p><p className="mt-2 text-3xl font-black">{value}</p></div>)}
      </div>
      <div className="mt-6 border-l-4 border-orange-600 bg-white p-5 text-sm leading-7">
        <b>決済公開：停止中。</b> チームの正式受諾・参加規約・返金条件・税務/集金主体・受付横断照合が済むまで、前金33,000円・残金33,000円のStripeリンクは無効です。
        <p>正式承認操作：{approvalEnabled?"管理者向け操作可（決済は別途ロック）":"未解禁（安全ゲート）"}</p>
      </div>
      <section className="mt-10 border border-neutral-200 bg-white p-6">
        <h2 className="text-xl font-black">既存Jotform申込の取り込み（管理者のみ）</h2>
        <p className="mt-2 text-xs leading-6">Jotform原票のsubmission IDと実際の送信時刻を転記してください。未確認の時刻を推定・捏造しないでください。同じチーム・原票の重複取り込みは拒否します。</p>
        <form action={importRizehopeTeam} className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-bold">申込元<select name="form_id" required className="mt-1 w-full border p-3"><option value="263223566035050">国内先着申込希望</option><option value="263220855042046">国内旧先行登録</option><option value="263221234159047">海外チーム関心表明</option></select></label>
          <label className="text-sm font-bold">種別<select name="category" required className="mt-1 w-full border p-3"><option value="japan">国内</option><option value="overseas">海外</option></select></label>
          {([["チーム正式名","team"],["地域／都道府県","region"],["成人責任者","adult"],["メールアドレス","email"],["Jotform submission ID","submission_id"],["送信日時（ISO 8601, offset付き）","submitted_at"]] as const).map(([label,name])=><label key={name} className="text-sm font-bold">{label}<input name={name} required className="mt-1 w-full border p-3" placeholder={name==="submitted_at"?"2026-11-19T21:00:00+09:00":undefined}/></label>)}
          <button className="min-h-12 bg-black px-6 py-3 font-black text-white sm:col-span-2" type="submit">原票を確認済みとして台帳に登録</button>
        </form>
      </section>
      <section className="mt-10">
        <h2 className="text-xl font-black">受付順・決済状況</h2>
        {list.error?<p className="mt-4">内部台帳を表示できません。権限と接続を確認してください。</p>:teams.length===0?<p className="mt-4 bg-white p-6">台帳への登録はまだ0件です。Jotform側の応募件数とは異なる場合があります。</p>:<div className="mt-4 grid gap-4">{teams.map(t=><article className="border border-neutral-200 bg-white p-5" key={t.id}>
          <div className="flex flex-wrap items-start justify-between gap-2"><h3 className="text-lg font-black">{t.team_name}</h3><span className="border px-3 py-1 text-xs">{t.status}</span></div>
          <p className="mt-2 text-sm">{t.category}／{t.region}／{t.adult_representative}</p>
          <p className="mt-1 text-xs">{t.representative_email}｜申込：{format(t.source_submitted_at)}</p>
          <p className="mt-1 text-xs">原票：{t.source_form_id} / {t.source_submission_id}</p>
          <p className="mt-2 text-sm">前金：{t.deposit_paid_at?"支払確認済":"未入金"} ／ 残金：{t.balance_paid_at?"支払確認済":"未入金"}</p>
          {["inquiry","reviewing","waitlisted"].includes(t.status)&&<form action={acceptRizehopeTeam} className="mt-4 flex flex-wrap gap-2">
            <input type="hidden" name="team_id" value={t.id}/><input name="terms_version" placeholder="合意済み規約版ID" required className="border p-2" disabled={!approvalEnabled}/>
            <button disabled={!approvalEnabled} className="border bg-orange-500 px-5 py-2 font-bold disabled:opacity-40">正式承認・枠を仮確保</button>
          </form>}
          {t.status==="approved_pending_deposit"&&!t.terms_accepted_at&&<form action={recordRizehopeTermsEvidence} className="mt-4 flex flex-wrap gap-2">
            <input type="hidden" name="team_id" value={t.id}/>
            <input type="hidden" name="terms_version" value={t.terms_version??""}/>
            <input name="evidence_ref" required placeholder="代表者の規約受諾原票ID（10文字以上）" className="min-w-60 border p-2" disabled={!approvalEnabled}/>
            <button disabled={!approvalEnabled} className="border px-5 py-2 font-bold disabled:opacity-40">規約受諾の証拠を記録</button>
          </form>}
          {["approved_pending_deposit","deposit_paid","balance_requested"].includes(t.status)&&
            <RizehopeCheckoutControl teamId={t.id}
              stage={t.status==="approved_pending_deposit"?"deposit":"balance"}
              enabled={checkoutEnabled&&Boolean(t.terms_accepted_at)}/>}
        </article>)}</div>}
      </section>
    </div>
  </main>;
}