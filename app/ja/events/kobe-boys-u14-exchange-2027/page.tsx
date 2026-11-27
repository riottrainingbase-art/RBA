import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";

const path = "/ja/events/kobe-boys-u14-exchange-2027";
const forms = {
  domestic: "https://form.jotform.com/263188088558069",
  overseas: "https://form.jotform.com/263187713938065",
  support: "https://form.jotform.com/263188782905066",
} as const;
export const metadata: Metadata = {
  title: "RBA UNITED KANSAI 2027｜関西国際育成交流・参加意向受付",
  description: "2027年1月6〜8日を候補に関西で計画中の日・グアム・豪州の青少年バスケットボール交流。無料の参加意向・協力相談を受付。開催・会場・参加費は未確定。",
  alternates: { canonical: path },
};
const days = [
  ["1/5（火）", "来日・休養", "グアム訪日団の移動と休養を想定。"],
  ["1/6（水）", "日本 × グアム U14", "同年代の合同練習・親善交流を調整中。"],
  ["1/7（木）", "国際育成交流", "豪州U11・U13との年代別交流の第一候補日。"],
  ["1/8（金）", "育成・交流", "グアム育成交流、豪州の代替候補日。"],
  ["1/9（土）", "予備日", "交流・文化体験等を検討。競技開催は未定。"],
  ["1/10（日）", "帰国", "グアム訪日団の帰国予定。"],
] as const;
const pillars = [
  ["01", "全員にプレー機会を", "勝敗や固定起用に偏らず、全員が攻守で判断し、学べる環境を目指します。"],
  ["02", "年代と経験に応じた交流", "U11・U13・男子U14は原則として年代・経験別に編成。少人数ゲームや合同練習を活用します。"],
  ["03", "安全と尊重", "保護者同意、保険、救護、成人スタッフ、施設安全条件を確認してから実施します。"],
] as const;
const faq = [
  ["参加意向を登録すると参加が確定しますか？", "いいえ。無料の意向確認であり、参加枠、選考、開催を保証しません。正式な案内後に参加を判断できます。"],
  ["会場と費用は決まっていますか？", "神戸・阪神間・大阪で調整中です。会場利用の正式承認、安全確認、費用・取消条件の合意が必要です。現時点で請求や決済はありません。"],
  ["国内の個人選手も参加できますか？", "国内男子U14の個人・クラブから意向を受け付けています。一般交流とUNITED選抜は別の企画区分です。対象年齢・選考・引率条件は正式案内で確認します。U11・U13チームはお問い合わせからご相談ください。"],
  ["宿泊や交通を予約してもよいですか？", "会場・日程が正式に決まる前の返金不可の手配はお控えください。宿泊・交通・食事と競技参加料は別に条件を確認します。"],
  ["指導者・企業も協力できますか？", "審判、指導者、通訳、救護、施設、地域連携、協賛のご相談を歓迎します。役割、費用、掲載条件は個別に書面で確認します。"],
] as const;
const primary = "inline-flex items-center justify-center rounded-lg bg-[#C54D18] px-5 py-3 font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C54D18]";
const secondary = "inline-flex items-center justify-center rounded-lg border border-black/25 bg-white px-5 py-3 font-bold text-[#111211] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C54D18]";
export default function KobeU14InterestPage() {
  return <SiteFrame locale="ja"><article className="mx-auto max-w-5xl space-y-10 px-5 py-10 text-[#111211]">
    <header className="rounded-xl bg-[#111211] p-7 text-white sm:p-10">
      <p className="text-sm font-bold tracking-widest text-[#ffb28a]">RBA UNITED / INTERNATIONAL YOUTH EXCHANGE</p>
      <p className="mt-5 inline-block rounded-full border border-white/40 px-3 py-1 text-sm font-bold">開催条件調整中 / PLANNING</p>
      <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">RBA UNITED<br/>KANSAI 2027</h1>
      <p className="mt-4 text-2xl font-bold">今のチームのまま、世界と学ぶ。</p>
      <p className="mt-4 max-w-2xl leading-8">日本・グアム・オーストラリアの育成年代の選手が、バスケットボールを通じて互いを知り、学び合う国際育成交流を計画しています。</p>
      <p className="mt-4 font-bold">2027年1月5〜10日 訪日期間／1月6〜8日 交流候補日</p>
      <p className="mt-2 text-sm text-white/80">開催地：神戸・阪神間・大阪で調整中。会場、参加チーム、日程、参加資格・費用は未確定です。</p>
      <div className="mt-6 flex flex-wrap gap-3"><a className={primary} href="#interest">無料の参加意向を伝える</a><a className="rounded-lg border border-white/50 px-5 py-3 font-bold text-white" href="#english" lang="en">English overview</a></div>
    </header>
    <section aria-labelledby="categories" className="space-y-4"><p className="text-xs font-bold tracking-widest text-[#A63E13]">AGE GROUPS / PLANNING</p><h2 id="categories" className="text-2xl font-black">年代別に、学べる環境を。</h2>
      <div className="grid gap-3 sm:grid-cols-3">{[["JAPAN","国内クラブ・個人選手","男子U14を中心に、U11・U13の交流相手も調整。"],["GUAM","男子U14","1月6〜8日の交流を調整中。"],["AUSTRALIA","U11 / U13","1月7日または8日の1日を調整中。"]].map(([country,age,body])=><article key={country} className="rounded-lg border border-black/15 bg-white p-5"><p className="text-sm font-black text-[#A63E13]">{country}</p><h3 className="mt-2 text-lg font-black">{age}</h3><p className="mt-2 text-sm leading-7">{body}</p></article>)}</div>
      <p className="text-sm leading-7">各国・地域の参加は調整段階です。参加枠、チーム名、人数、正式な対戦カードを確約するものではありません。</p>
    </section>
    <section aria-labelledby="interest" className="rounded-xl border border-black/15 bg-[#f7f5f1] p-6 sm:p-8"><p className="text-xs font-bold tracking-widest text-[#A63E13]">FREE EXPRESSION OF INTEREST</p><h2 id="interest" className="mt-2 text-2xl font-black">参加意向・協力相談</h2><p className="mt-3 leading-8">登録は無料で、正式申込・参加確約ではありません。開催条件をご案内するまで参加費のお支払いは不要です。</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <article className="rounded-lg border border-black/10 bg-white p-5"><h3 className="text-lg font-black">国内男子U14の選手・クラブ</h3><p className="my-3 text-sm leading-7">現在の所属を維持したまま参加意向を登録できます。保護者とご確認ください。</p><a className={primary} href={forms.domestic} target="_blank" rel="noopener noreferrer">国内の参加意向 ↗</a></article>
        <article className="rounded-lg border border-black/10 bg-white p-5"><h3 className="text-lg font-black">海外男子U14チーム</h3><p className="my-3 text-sm leading-7">Team enquiries for boys U14. Other age groups can contact RBA directly.</p><a className={secondary} href={forms.overseas} target="_blank" rel="noopener noreferrer">Overseas U14 team ↗</a></article>
        <article className="rounded-lg border border-black/10 bg-white p-5"><h3 className="text-lg font-black">U11・U13の国内外チーム</h3><p className="my-3 text-sm leading-7">年代・人数・希望時間・競技経験をお知らせください。既存のU14専用フォームとは分けてご相談ください。</p><Link className={secondary} href="/ja/contact">チーム交流を相談する</Link></article>
        <article className="rounded-lg border border-black/10 bg-white p-5"><h3 className="text-lg font-black">指導者・運営協力者</h3><p className="my-3 text-sm leading-7">D-HUBを通じた指導、審判、通訳、運営などの協力意向をお聞かせください。</p><a className={secondary} href={forms.support} target="_blank" rel="noopener noreferrer">協力意向を伝える ↗</a></article>
      </div><p className="mt-5 text-sm font-bold">重要：会場利用の正式承認、必要な国際交流手続き、年齢資格、選考、保護者の書面同意、保険、取消・返金条件の確認前に決済は受け付けません。</p>
    </section>
    <section aria-labelledby="schedule"><p className="text-xs font-bold tracking-widest text-[#A63E13]">TENTATIVE SCHEDULE</p><h2 id="schedule" className="mt-2 text-2xl font-black">予定プログラム</h2><p className="mt-2 leading-7">以下は検討案です。正式な競技日・時間・会場ではありません。</p><div className="mt-4 divide-y divide-black/10 rounded-lg border border-black/15 bg-white">{days.map(([date,title,body])=><div key={date} className="grid gap-1 p-4 sm:grid-cols-[7rem_1fr]"><p className="font-black text-[#A63E13]">{date}</p><div><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm leading-7">{body}</p></div></div>)}</div></section>
    <section aria-labelledby="principles"><p className="text-xs font-bold tracking-widest text-[#A63E13]">DEVELOPMENT FIRST</p><h2 id="principles" className="mt-2 text-2xl font-black">RBAが大切にすること</h2><div className="mt-4 grid gap-3 sm:grid-cols-3">{pillars.map(([n,title,body])=><article key={n} className="rounded-lg border border-black/15 p-5"><span className="font-black text-[#A63E13]">{n}</span><h3 className="mt-2 text-lg font-black">{title}</h3><p className="mt-2 text-sm leading-7">{body}</p></article>)}</div><p className="mt-3 text-sm leading-7">本企画はRBAの育成交流計画であり、現段階でJBA・FIBA等の公認や自治体後援を表示するものではありません。</p></section>
    <section aria-labelledby="partners" className="rounded-xl bg-[#111211] p-6 text-white sm:p-8"><p className="text-xs font-bold tracking-widest text-[#ffb28a]">COMMUNITY / PARTNERS</p><h2 id="partners" className="mt-2 text-2xl font-black">地域とともに、子どもたちの国際交流を。</h2><p className="mt-3 leading-8">体育館、救護、通訳、審判、用具、交通などの協力や企業協賛を相談できます。支援の用途、実施条件、企業紹介は個別に確認し、未承認の企業・自治体名は掲載しません。</p><div className="mt-5 flex flex-wrap gap-3"><Link className={primary} href="/ja/international/partner-with-us">企業・地域連携の相談</Link><Link className="rounded-lg border border-white/50 px-5 py-3 font-bold text-white" href="/ja/contact">RBAへのお問い合わせ</Link></div></section>
    <section aria-labelledby="faq"><h2 id="faq" className="text-2xl font-black">よくある質問</h2><div className="mt-4 divide-y divide-black/10 rounded-lg border border-black/15">{faq.map(([q,a])=><details key={q} className="p-4"><summary className="cursor-pointer font-bold">{q}</summary><p className="mt-3 leading-7">{a}</p></details>)}</div></section>
    <section lang="en" aria-labelledby="english" className="rounded-xl border border-black/15 bg-white p-6 sm:p-8"><p className="text-xs font-bold tracking-widest text-[#A63E13]">ENGLISH / PROGRAMME OVERVIEW</p><h2 id="english" className="mt-2 text-2xl font-black">International youth basketball exchange</h2><p className="mt-3 leading-7">RBA is planning age-appropriate basketball exchanges in the Kansai area (Kobe / Hyogo / Osaka) for January 6–8, 2027. A visiting Guam boys U14 team and Australian U11 and U13 teams are being coordinated with local participants. The Australian programme is being considered for January 7 or 8 only.</p><p className="mt-3 leading-7">All venues, schedules, opponents, eligibility, fees and safeguarding arrangements remain subject to written confirmation. Expressions of interest are free and non-binding. No payment is due. Please avoid non-refundable travel arrangements before confirmation. Accommodation, transport and meals are separate from basketball participation arrangements.</p><div className="mt-5 flex flex-wrap gap-3"><a className={primary} href={forms.overseas} target="_blank" rel="noopener noreferrer">Boys U14 team interest ↗</a><Link className={secondary} href="/contact">Other ages / enquiries</Link><Link className={secondary} href="/international/partner-with-us">Partner enquiries</Link></div></section>
    <nav aria-label="RBA related pages" className="flex flex-wrap gap-5 text-sm font-bold"><Link href="/ja/united" className="underline">RBA UNITED</Link><Link href="/ja/international" className="underline">RBA INTERNATIONAL</Link><Link href="/ja/my-homecourt" className="underline">MY HOME COURT</Link></nav>
  </article></SiteFrame>;
}
