import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import { rizehopeProject } from "@/lib/rizehope-2027";

export const metadata: Metadata = {
  title: "RIZEHOPE JAPAN 2027｜国内U12チーム前金33,000円・残金33,000円｜ご案内",
  description: "2027年2月27・28日、国内U12チームの2日間参加料金は税込総額66,000円。申込後に前金33,000円のオンライン決済受付中。後日残金33,000円。前金支払後に参加資格・最大10チームの枠を審査し、出場不承認などは前金全額返金。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/international/rizehope-japan-2027/payment" },
};

const stages = [
  ["01 / APPLY", "成人代表者が申込", "申込フォームにチーム名・責任者・希望区分を入力。送信だけでは支払いは発生せず、参加枠も確定しません。"],
  ["02 / DEPOSIT", "前金33,000円の決済", "フォーム完了画面のStripeで前金をお支払いください。税込総額66,000円の一部に充当し、追加料金ではありません。前金だけで出場は確定しません。"],
  ["03 / REVIEW", "資格・募集枠・安全条件の審査", "前金入金と申込情報を照合し、出場資格・国内海外RBA UNITED合計10チーム上限・安全体制を確認。参加不承認、満枠、主催都合の中止、最終条件不同意、正式確定前の辞退は前金全額返金です。"],
  ["04 / CONFIRM", "正式承認・残金の後日精算", "承認チームに最終要項・残金期日を個別書面で通知し、残金33,000円を精算。前金と合わせた総額は66,000円（税込）です。"],
] as const;

export default function Page() {
  const { intake, outreach } = rizehopeProject;
  return <SiteFrame locale="ja">
    <div className="bg-[#f7f4ed] text-[#151515]">
      <header className="bg-[#141414] text-white">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
          <a href="/ja/international/rizehope-japan-2027" className="text-sm font-bold underline underline-offset-4">← RIZEHOPE JAPAN 2027の概要</a>
          <p className="mt-11 text-xs font-black tracking-[.2em] text-[#ff984b]">RIZEHOPE 2027 / JAPAN U12 TEAMS</p>
          <h1 className="mt-4 text-[clamp(2.5rem,6vw,5rem)] font-black leading-tight tracking-[-.04em]">参加費は、<br/><span className="text-[#ff8a41]">前金50%制。</span></h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/85">2027年2月27日（土）・28日（日）／柴田町総合体育館。国内U12チーム・2日間の料金と参加確定までの手順をご案内します。</p>
          <div className="mt-8 border-l-4 border-[#ff984b] bg-white/10 p-5">
            <p className="font-black">国内U12チーム・前金決済受付中</p>
            <p className="mt-2 text-sm leading-7 text-white/80">申込後に前金をお支払いいただき、その後で資格・募集枠を審査します。入金のみでは出場を保証しません。資格不適合・満枠・主催都合中止・最終条件不同意・正式確定前の辞退は前金全額返金です。</p>
          </div>
        </div>
      </header>
      <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-20">
        <p className="text-xs font-black tracking-[.18em] text-[#ad501c]">TEAM FEE / TAX INCLUDED</p>
        <h2 className="mt-3 text-3xl font-black">2日間・1チームの料金</h2>
        <div className="mt-7 border border-black/15 bg-white">
          <div className="border-b border-black/15 px-5 py-6 sm:px-8"><p className="text-sm font-bold text-neutral-600">参加費（税込総額）</p><p className="mt-1 text-[clamp(2.4rem,6vw,4rem)] font-black">66,000円</p></div>
          <div className="grid gap-px bg-black/10 sm:grid-cols-2">
            <div className="bg-white px-5 py-6 sm:px-8"><p className="text-sm font-black text-neutral-600">前金・50%（申込後）</p><p className="mt-3 text-3xl font-black">33,000円</p><p className="mt-3 text-sm leading-7">参加費へ充当。入金確認後、資格・チーム枠を審査します。</p></div>
            <div className="bg-white px-5 py-6 sm:px-8"><p className="text-sm font-black text-neutral-600">残金・50%（後日）</p><p className="mt-3 text-3xl font-black">33,000円</p><p className="mt-3 text-sm leading-7">正式案内で示す期限までにお支払いください。</p></div>
          </div>
        </div>
        <p className="mt-4 text-sm leading-7 text-neutral-700">税を含むお支払い総額は66,000円です。税務上の最終区分は確認中です。交通・宿泊・食費は含まれません。海外チームとRBA UNITED個人選手の料金は別途調整します。</p>
        <div className="mt-9 border-l-4 border-[#e86f2c] bg-[#fff4e4] p-5">
          <p className="text-lg font-black">重要：前金は「返金不可」の意味ではありません。</p>
          <p className="mt-3 text-sm leading-8">資格不適合、定員満了、主催者都合の開催中止、安全体制不成立、最終条件への不同意、個別の参加確定前の辞退は前金を全額返金します。正式参加承認後のキャンセル・延期・未入金時の取扱い、残金期日は個別書面で案内します。前金を一律没収するものではありません。</p>
          <a href="/ja/cancellation" className="mt-3 inline-block text-sm font-bold underline underline-offset-4">RBAの一般的なキャンセル・返金方針 →</a>
        </div>
      </section>
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="text-3xl font-black">申込から参加確定まで</h2>
          <ol className="mt-7 grid gap-4 sm:grid-cols-2">{stages.map(([step,title,body])=><li key={step} className="border border-black/15 bg-[#f7f4ed] p-6"><p className="text-xs font-black tracking-widest text-[#b7551c]">{step}</p><h3 className="mt-3 text-lg font-black">{title}</h3><p className="mt-3 text-sm leading-7 text-neutral-700">{body}</p></li>)}</ol>
          <p className="mt-6 text-sm leading-7">チーム名・代表者・申込受付番号・支払い状況を1チームごとに照合します。入金済みの場合は再決済せずRBAへご連絡ください。</p>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
        <h2 className="text-3xl font-black">前金制の参加申込を受け付けています</h2>
        <p className="mt-5 text-sm leading-8">総上限{intake.maximumTeamCount}チーム（国内・海外・RBA UNITEDを含む）。申込後に前金33,000円をお支払いください。受付順と入金を照合し、出場資格と運営体制の審査を経て正式承認するため、送信・入金時点では出場確約となりません。</p>
        <a href={outreach.japanTeam} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-14 items-center bg-[#ff802b] px-7 py-4 font-black text-black">① 国内U12チーム｜参加申込 ↗</a>
        <a href={rizehopeProject.intake.stripeDepositPaymentUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-14 items-center border-2 border-black bg-white px-7 py-4 font-black text-black">② 申込後の前金33,000円・Stripe決済 ↗</a>
        <p className="mt-4 text-sm leading-7 text-neutral-700">前金だけでは参加確定となりません。申込情報と同じチーム名・代表者メールでお支払いください。二重払いはしないでください。残金決済は承認後、個別案内です。</p>
        <p className="mt-5 text-sm">お問い合わせ：<a href="mailto:riot.training.base@gmail.com" className="underline">riot.training.base@gmail.com</a></p>
      </section>
    </div>
  </SiteFrame>;
}
