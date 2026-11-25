import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, CircleHelp } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "RBA UNITED U12｜RIZEHOPE JAPAN 2027｜保護者の無料先行エントリー",
  description: "所属チームを変えずに宮城県で国際育成交流を目指すRBA UNITED。2027年2月27・28日、柴田町総合体育館。保護者による無料意向登録。出場・料金・選考は未確定です。",
  alternates: {
    canonical: "https://riotbasketballacademy.com/ja/international/rizehope-japan-2027/united",
    languages: {ja:"https://riotbasketballacademy.com/ja/international/rizehope-japan-2027/united"}
  },
  openGraph: {
    title: "RBA UNITED U12｜保護者の無料先行エントリー",
    description: "2027年2月27・28日・宮城県柴田町。所属チームはそのまま。無料登録は参加確約・請求ではありません。",
    images: [{url: "/rba-logo-original.jpg"}]
  }
};
const form = "https://form.jotform.com/263221266794057";
const stages = [
  ["01", "保護者が無料で意向を登録", "保護者氏名・メール・居住都道府県・学年などを記入。所属クラブ名や送迎相談は任意。登録時にお支払いはありません。"],
  ["02", "条件・安全体制と編成を確認", "U12の正式年齢条件、希望人数、指導者・引率・保険・救護、大会全体の出場枠を確認します。"],
  ["03", "正式な参加条件を書面でご案内", "編成可能な場合にのみ、正式な参加費・税区分・支払期日・返金規約・旅行費用・保護者同意を提示します。登録料・事務手数料を参加費と別に請求しません。"],
  ["04", "参加費全額の入金後にロスター確定", "選考・保護者の書面同意後に個別の決済案内を行います。前金方式でも残金を含む参加費全額の入金照合前は確定ロスターに登録しません。現在は決済受付を行っていません。"],
] as const;
const facts = [
  ["開催予定", "2027年2月27日（土）・28日（日）"],
  ["会場", "柴田町総合体育館（宮城県）／両日予約済み"],
  ["対象", "RBA UNITED U12の参加を検討する選手の保護者"],
  ["所属", "現在のチームを辞める必要はありません"],
  ["無料先行登録・別途登録料", "どちらも0円／正式参加費に一本化"],
  ["参加・出場", "編成・年齢資格・枠・安全条件の確認後に判断"],
] as const;
function EntryLink({label}:{label:string}) {
  return <a href={form} target="_blank" rel="noopener noreferrer"
    className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#ff8a35] px-5 py-4 text-center text-base font-black text-[#142027] shadow-sm transition hover:brightness-105 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#ff8a35] sm:w-auto">
    {label} <ArrowRight size={19} aria-hidden="true"/>
  </a>;
}
export default function RizehopeUnitedGuardianEntry(){
  return <SiteFrame locale="ja"><main className="bg-[#f7f7f4] text-[#152024]">
    <header className="border-b-8 border-[#ff8a35] bg-[#121c23] px-5 py-10 text-white sm:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <a className="text-sm font-semibold underline underline-offset-4" href="/ja/international/rizehope-japan-2027">← RIZEHOPE JAPAN 2027へ戻る</a>
          <Image src="/rba-logo-original.jpg" alt="Riot Basketball Academy 公式ロゴ" width={54} height={92} className="h-[92px] w-auto rounded-md bg-white object-contain p-1"/>
        </div>
        <p className="text-xs font-black tracking-[.18em] text-[#ffb76d]">RBA UNITED U12 · RIZEHOPE JAPAN 2027</p>
        <h1 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">所属はそのまま。<br/><span className="text-[#ff9a50]">東北で、世界と挑戦する。</span></h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-white/90 sm:text-lg">全国の異なるチームから集まる期間限定の育成チーム構想。試合の中で考える・選ぶ・伝える経験を、普段とは違う仲間との交流につなぎます。</p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold">
          <span className="rounded-full border border-white/35 px-4 py-2">2/27（土）・28（日）</span>
          <span className="rounded-full border border-white/35 px-4 py-2">宮城県・柴田町総合体育館</span>
          <span className="rounded-full border border-[#ffb76d] px-4 py-2 text-[#ffb76d]">保護者から無料登録</span>
        </div>
        <div className="mt-8"><EntryLink label="保護者から無料で先行エントリー"/></div>
        <p className="mt-3 text-sm leading-7 text-white/80">登録は無料・決済なし。参加確定・選考合格・出場枠確保にはなりません。正式ロスター登録は、選考・保護者の書面同意・正式条件の確認後、参加費全額の入金照合が済んでから行います。</p>
      </div>
    </header>
    <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
      <section aria-labelledby="point-title">
        <h2 id="point-title" className="text-2xl font-black sm:text-3xl">最初に知っておきたいこと</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl border border-[#cad5d0] bg-white p-6">
            <CheckCircle2 className="text-[#267b68]" aria-hidden="true"/>
            <h3 className="mt-3 text-xl font-black">無料で参加を検討できます</h3>
            <p className="mt-3 text-sm leading-8">保護者がフォームに登録しても、現在のチームを変更する必要はありません。参加・練習・移動を約束するものでもありません。</p>
          </article>
          <article className="rounded-2xl border border-[#cad5d0] bg-white p-6">
            <ShieldCheck className="text-[#267b68]" aria-hidden="true"/>
            <h3 className="mt-3 text-xl font-black">未成年の安全と同意を優先</h3>
            <p className="mt-3 text-sm leading-8">大会全体の最大10チームは計画値で、UNITEDの出場枠は確保していません。年齢条件・指導者・引率・保険・救護が整ってから正式案内します。</p>
          </article>
        </div>
      </section>
      <section className="mt-12" aria-labelledby="overview-title">
        <h2 id="overview-title" className="text-2xl font-black sm:text-3xl">募集内容を30秒で確認</h2>
        <dl className="mt-6 overflow-hidden rounded-2xl border border-[#d2dad6] bg-white">
          {facts.map(([key,value])=><div key={key} className="grid gap-1 border-b border-[#e4e9e5] px-5 py-4 last:border-0 sm:grid-cols-[150px_1fr] sm:gap-5">
            <dt className="text-sm font-bold text-[#65746d]">{key}</dt>
            <dd className="text-sm font-semibold leading-7">{value}</dd>
          </div>)}
        </dl>
      </section>
      <section className="mt-12" aria-labelledby="steps-title">
        <h2 id="steps-title" className="text-2xl font-black sm:text-3xl">お申し込みは4段階</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2">{stages.map(([num,title,detail])=><li key={num} className="rounded-2xl border border-[#d2dad6] bg-white p-5">
          <span className="text-3xl font-black text-[#bd5a1b]">{num}</span>
          <h3 className="mt-2 text-lg font-black">{title}</h3>
          <p className="mt-3 text-sm leading-8">{detail}</p>
        </li>)}</ol>
      </section>
      <section className="mt-12 rounded-2xl border-l-4 border-[#d47c36] bg-[#fff0e2] p-6" aria-labelledby="fee-title">
        <h2 id="fee-title" className="text-xl font-black">料金について：無料登録と正式参加費は別です</h2>
        <p className="mt-3 text-sm leading-8">国内U12チーム向けの<strong>66,000円／チーム</strong>は、RBA UNITEDの個人参加費ではありません。UNITED個人参加は、先行22,000円または通常24,800円、前金10,000円という<strong>未確定の試算</strong>があります。先行優待の対象・期間・定員・税区分・返金条件はまだ確定していないため、この金額による申込・決済は受け付けていません。交通費・宿泊費・食費は別途となる想定です。</p>
        <p className="mt-3 text-sm font-semibold">登録料・事務手数料は別途徴収しません。前金方式を採用する場合は参加費に充当し、前金だけでロスター確定とはなりません。参加費全額を入金照合してから正式ロスター登録します。確定していない金額での前金請求や一般公開の決済リンクはありません。</p>
      </section>
      <section className="mt-12 rounded-2xl bg-[#152027] px-6 py-9 text-white sm:px-10" aria-labelledby="start-title">
        <h2 id="start-title" className="text-2xl font-black sm:text-3xl">まずは「参加してみたい」をお知らせください。</h2>
        <p className="mt-3 max-w-3xl text-sm leading-8 text-white/90">保護者の氏名・メール・都道府県・学年などを入力します。所属クラブ名・交通や宿泊の相談は任意です。マーケティング情報への同意は任意で、参加相談の同意とは別です。</p>
        <div className="mt-6"><EntryLink label="RBA UNITED 無料参加意向フォームを開く"/></div>
        <p className="mt-4 text-xs leading-7 text-white/70">Jotformが別タブで開きます。送信後すぐに出場が確定したり、代金が請求されたりすることはありません。正式ロスター登録には別途の書面同意と参加費全額の前払いが必要です。</p>
      </section>
      <nav className="mt-8 flex flex-wrap gap-5 text-sm font-bold underline underline-offset-4" aria-label="Other event entry types">
        <a href="/ja/international/rizehope-japan-2027">大会全体の案内</a>
        <a href="https://form.jotform.com/263220855042046" target="_blank" rel="noopener noreferrer">国内チーム単位の無料意向登録</a>
        <a href="https://form.jotform.com/263221234159047" target="_blank" rel="noopener noreferrer">海外チームの無料意向登録</a>
      </nav>
      <footer className="mt-10 text-sm leading-7 text-[#52635a]">
        <CircleHelp className="inline-block" size={16} aria-hidden="true"/> 質問・登録の確認： <a className="font-bold underline underline-offset-4" href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a>
      </footer>
    </div>
  </main></SiteFrame>;
}
