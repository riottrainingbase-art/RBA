import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import { rizehopeProject } from "@/lib/rizehope-2027";

export const metadata: Metadata = {
  title: "RIZEHOPE JAPAN 2027｜国内U12チーム前金33,000円・残金33,000円｜ご案内",
  description: "2027年2月27・28日、国内U12チームの2日間参加料金は税込総額66,000円。正式承認後に前金33,000円、後日残金33,000円。先着10チームの参加申込希望を無料受付。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/international/rizehope-japan-2027/payment" },
};

const stages = [
  ["01 / REQUEST", "チームから先着申込希望", "成人代表者が無料フォームから申し込みます。募集上限は国内・海外・RBA UNITED合計10チーム。送信時点では料金は請求されず、枠は確定しません。"],
  ["02 / ACCEPTANCE", "参加資格・運営条件を確認", "主催者・競技区分・選手の出場資格・会場の利用時間・救護と指導体制を確認し、参加を正式承認したチームにのみ個別の決済案内を送ります。"],
  ["03 / DEPOSIT", "前金33,000円のお支払い", "税込参加費の50%を前金として受け取り、参加枠を仮確保します。前金は総額66,000円に充当され、追加費用にはなりません。"],
  ["04 / BALANCE", "残金33,000円のお支払い", "参加規約で示した期限内に残金を精算。前金と残金を合わせて66,000円（税込）です。両方の支払いが確認できたら最終確定します。"],
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
            <p className="font-black">決済は現在準備中／先着申込希望は受付中</p>
            <p className="mt-2 text-sm leading-7 text-white/80">正式な出場条件・主催体制・個別返金条件と残金期日をお支払い前にご案内します。未承認チームへの請求や一般公開リンクによる先払いは実施していません。</p>
          </div>
        </div>
      </header>
      <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-20">
        <p className="text-xs font-black tracking-[.18em] text-[#ad501c]">TEAM FEE / TAX INCLUDED</p>
        <h2 className="mt-3 text-3xl font-black">2日間・1チームの料金</h2>
        <div className="mt-7 border border-black/15 bg-white">
          <div className="border-b border-black/15 px-5 py-6 sm:px-8"><p className="text-sm font-bold text-neutral-600">参加費（税込総額）</p><p className="mt-1 text-[clamp(2.4rem,6vw,4rem)] font-black">66,000円</p></div>
          <div className="grid gap-px bg-black/10 sm:grid-cols-2">
            <div className="bg-white px-5 py-6 sm:px-8"><p className="text-sm font-black text-neutral-600">前金・50%（正式承認後）</p><p className="mt-3 text-3xl font-black">33,000円</p><p className="mt-3 text-sm leading-7">参加費へ充当。入金確認後に仮枠を確保します。</p></div>
            <div className="bg-white px-5 py-6 sm:px-8"><p className="text-sm font-black text-neutral-600">残金・50%（後日）</p><p className="mt-3 text-3xl font-black">33,000円</p><p className="mt-3 text-sm leading-7">正式案内で示す期限までにお支払いください。</p></div>
          </div>
        </div>
        <p className="mt-4 text-sm leading-7 text-neutral-700">税を含むお支払い総額は66,000円です。税務上の最終区分は確認中です。交通・宿泊・食費は含まれません。海外チームとRBA UNITED個人選手の料金は別途調整します。</p>
        <div className="mt-9 border-l-4 border-[#e86f2c] bg-[#fff4e4] p-5">
          <p className="text-lg font-black">重要：前金は「返金不可」の意味ではありません。</p>
          <p className="mt-3 text-sm leading-8">参加者都合のキャンセル時の精算、主催者都合の中止、延期、残金支払期限と未入金時の取扱いは、正式な規約として決済前に明示し、チーム代表者にご承諾いただきます。現時点で前金の一律没収や自動的な出場確定を約束しません。</p>
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
        <h2 className="text-3xl font-black">先着申込希望を受け付けています</h2>
        <p className="mt-5 text-sm leading-8">総上限{intake.maximumTeamCount}チーム（国内・海外・RBA UNITEDを含む）。申込送信時間を基に順に確認しますが、出場資格と運営体制の審査を経て正式承認するため、この時点では確定予約となりません。</p>
        <a href={outreach.japanTeam} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-14 items-center bg-[#ff802b] px-7 py-4 font-black text-black">国内U12チーム｜先着申込希望フォーム ↗</a>
        <p className="mt-5 text-sm">お問い合わせ：<a href="mailto:riot.training.base@gmail.com" className="underline">riot.training.base@gmail.com</a></p>
      </section>
    </div>
  </SiteFrame>;
}
