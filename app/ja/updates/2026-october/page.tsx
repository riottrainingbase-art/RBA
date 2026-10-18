import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "2026年10月 活動報告と今後の予定｜Riot Basketball Academy",
  description: "台湾での育成交流、マレーシア・ペナンでの指導者講習、11月25日のオンライン講習。実施した活動と、協議中の計画を区別してお知らせします。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/updates/2026-october" },
  openGraph: {
    title: "RBA活動報告｜台湾・マレーシア・指導者の学び",
    description: "2026年10月の現場報告と次の活動。実施済みと計画段階を分けてご案内します。",
    url: "https://riotbasketballacademy.com/ja/updates/2026-october",
    type: "article",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
};

const sections = [
  {
    id: "taiwan", status: "実施した活動", date: "2026年10月", title: "台湾｜育成年代の交流",
    body: "台湾で現地の選手・指導者と交流し、異なる環境でプレーし、学ぶ機会をつくりました。海外に行くこと自体を目的にせず、子どもたちがコートで何を経験したか、帰国後の育成に何を残せるかを大切にしています。",
    links: [{href:"/ja/taiwan",label:"台湾での活動を見る"},{href:"/ja/journal/japan-taiwan-development-exchange-2027",label:"2027年の構想を読む"}],
    note: "2027年の日台交流は準備・協議段階です。日程、会場、参加費、募集枠は確定していません。",
  },
  {
    id: "malaysia", status: "実施した活動", date: "2026年10月", title: "マレーシア・ペナン｜指導者講習",
    body: "ペナンでは現地のCoach Tan氏の協力を得て、バスケットボールの指導者講習を実施しました。遠方から参加してくださった方もおり、国や地域が違っても育成について対話できることを実感しています。現場のつながりを、今後の学びの機会へ育てていきます。",
    links: [{href:"/ja/international",label:"国際交流について"},{href:"/ja/contact",label:"指導者交流を相談する"}],
    note: "次回訪問や現地団体との協業条件は調整中です。開催決定や契約締結を意味するものではありません。",
  },
  {
    id: "torsten", status: "申込受付中", date: "2026年11月25日（水）20:00–21:30 JST", title: "Torsten Loibl ONLINE CLINIC Vol.2",
    body: "シュートフォームだけでなく、シュートを打つ前の状況認知、練習設計、試合で良いシュート機会を生み出す考え方を学びます。Zoomで開催し、日本語逐次通訳が入ります。LIVEは税込3,300円、30日間のオンデマンド視聴は税込4,400円です。",
    links: [{href:"/ja/events/torsten-loibl-online-clinic",label:"講習詳細・公式申込"},{href:"/ja/coach/shooting-check",label:"RBA制作・無料5問チェック"}],
    note: "申込フォームの送信後、案内に従って決済が必要です。フォーム送信のみでは受講確定となりません。無料チェックはRBA独自制作で、講師監修教材ではありません。",
  },
] as const;

export default function OctoberUpdatesPage() {
  return <SiteFrame locale="ja">
    <div className="bg-[#f4f1eb] text-[#171717]">
      <main className="mx-auto max-w-[980px] px-6 py-14 sm:px-10 sm:py-20">
        <p className="text-xs font-bold tracking-[0.16em] text-[#555]">RBA FIELD NOTES / 2026.10</p>
        <h1 className="mt-5 text-[clamp(34px,5vw,58px)] font-bold leading-[1.25] tracking-tight">日本とアジアの現場から。<br/>2026年10月の活動報告。</h1>
        <p className="mt-6 max-w-[780px] text-base leading-8 text-[#444]">Riot Basketball Academyは、全国の育成活動に加えて、台湾・マレーシアの指導者や選手との交流を続けています。実際に行ったことと、これから実現を目指すことを分けてお伝えします。</p>
        <p className="mt-4 text-xs text-[#666]">更新：2026年10月18日 / 活動記録・今後の予定</p>
        <div className="mt-10 border-t border-[#bbb]">
          {sections.map((item, index) => <section id={item.id} key={item.id} className="border-b border-[#bbb] py-10 sm:py-12" aria-labelledby={item.id+"-title"}>
            <div className="flex flex-wrap items-center gap-3 text-xs"><span className="border border-[#888] px-3 py-1 font-bold">{item.status}</span><span className="text-[#666]">{item.date}</span></div>
            <h2 id={item.id+"-title"} className="mt-4 text-2xl font-bold leading-snug sm:text-3xl">{String(index+1).padStart(2,"0")} / {item.title}</h2>
            <p className="mt-5 max-w-[800px] text-sm leading-8 text-[#444]">{item.body}</p>
            <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3">{item.links.map(link=><a key={link.href} href={link.href} className="border-b border-[#222] pb-1 text-sm font-bold hover:opacity-70">{link.label} ↗</a>)}</div>
            <p className="mt-6 border-l-2 border-[#aaa] pl-4 text-xs leading-6 text-[#666]">{item.note}</p>
          </section>)}
        </div>
        <section className="py-12" aria-labelledby="next-steps-title">
          <h2 id="next-steps-title" className="text-2xl font-bold">RBAが大切にしていること</h2>
          <p className="mt-4 max-w-[800px] text-sm leading-8 text-[#444]">子どもたちの出場機会、主体的な判断、発達に応じた負荷と回復、指導者の学び。国内でも海外でも、活動の規模より、現場でどんな経験を残せるかを基準に取り組みます。</p>
          <div className="mt-6 flex flex-wrap gap-6 text-sm font-bold"><a href="/ja/opportunities" className="border-b border-[#222] pb-1">募集中の活動を見る ↗</a><a href="/ja/journal" className="border-b border-[#222] pb-1">育成記事を読む ↗</a><a href="/ja/partners" className="border-b border-[#222] pb-1">協賛・連携について ↗</a></div>
        </section>
      </main>
    </div>
  </SiteFrame>;
}
