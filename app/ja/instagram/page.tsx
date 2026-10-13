import type { Metadata } from "next";
export const metadata: Metadata = { title: "Instagramからお越しの方へ | RBA", robots: { index: false, follow: true } };
const categories = [
  { title: "選手・保護者", detail: "参加できる活動と、日々の育成の学びを探す。", links: [["クリニック・キャンプ","/ja"],["HOMECOURT PLUS","/ja/homecourt-plus"],["無料JOURNAL","/ja/journal"]] },
  { title: "指導者", detail: "練習設計、意思決定、育成の考え方を学ぶ。", links: [["指導者向けページ","/ja/coaches"],["指導者JOURNAL","/ja/journal/coaches"]] },
  { title: "チーム・企業", detail: "出張クリニック・研修・地域連携・協賛の相談。", links: [["公式サイト・お問い合わせ","/ja"]] },
] as const;
export default function Page() {
  return <main className="min-h-screen bg-neutral-100 text-neutral-950">
    <div className="mx-auto max-w-2xl px-5 py-12">
      <a href="/ja" className="text-xs font-black tracking-widest">RIOT BASKETBALL ACADEMY</a>
      <p className="mt-12 text-xs font-bold tracking-widest text-neutral-500">FROM INSTAGRAM</p>
      <h1 className="mt-4 text-4xl font-black leading-tight">投稿の続きは、<br/>ここから。</h1>
      <p className="mt-5 leading-8">無料で学ぶ。活動に参加する。必要になったら継続して学ぶ。自分に合う入口を選んでください。</p>
      <div className="mt-9 space-y-5">{categories.map((item,i)=><section key={item.title} className="rounded-lg border border-neutral-300 bg-white p-6">
        <p className="text-xs font-bold text-neutral-500">0{i+1}</p>
        <h2 className="mt-2 text-2xl font-black">{item.title}</h2>
        <p className="mt-2 text-sm leading-7">{item.detail}</p>
        <nav className="mt-5 space-y-3">{item.links.map(([label,path],j)=><a key={label} className={j===0?"block rounded-md bg-black p-4 font-bold text-white":"block rounded-md border p-4 font-bold"} href={path+"?utm_source=instagram&utm_medium=bio&utm_campaign=rba_entry"}>{label} ↗</a>)}</nav>
      </section>)}</div>
      <p className="mt-8 text-sm leading-7 text-neutral-600">料金・日程・受付状況は各公式ページでご確認ください。</p>
    </div>
  </main>;
}
