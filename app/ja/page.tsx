import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: { absolute: "RBA｜今いるチームを大切に。学びは、地域の外へ。" },
  description: "所属を変えなくても、全国・アジアの学びと挑戦へ。RBAは、クリニック、キャンプ、指導者の学び、地域開催、国際交流をつなぐ育成年代バスケットボール・プラットフォームです。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/", languages: { "en": "https://riotbasketballacademy.com/", "ja": "https://riotbasketballacademy.com/ja/", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/", "ko": "https://riotbasketballacademy.com/ko/", "x-default": "https://riotbasketballacademy.com/" } },
  openGraph: {
    title: "RBA｜今いるチームを大切に。学びは、地域の外へ。",
    description: "所属を変えなくても、全国・アジアの学びと挑戦へ。現在募集中の活動、RBA ID、指導者の学び、Japan × Asiaの連携を一つのサイトから確認できます。",
    url: "https://riotbasketballacademy.com/ja/",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA｜今いるチームを大切に。学びは、地域の外へ。", description: "所属を変えなくても、全国・アジアの活動や学びに参加できる育成プラットフォーム。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  const destinations = [
    { no: "01", label: "参加する", en: "FIND YOUR NEXT STEP", description: "全国のクリニック・キャンプ", href: "/ja/opportunities" },
    { no: "02", label: "学ぶ", en: "LEARN & GROW", description: "無料JOURNAL・育成ガイド", href: "/ja/journal" },
    { no: "03", label: "指導者", en: "FOR COACHES", description: "実践に役立つ学び", href: "/ja/coaches" },
    { no: "04", label: "チーム・企業", en: "WORK WITH RBA", description: "訪問指導・協賛・地域開催", href: "/ja/organizer" },
    { no: "05", label: "国際交流", en: "GLOBAL CONNECTION", description: "日本とアジアをつなぐ", href: "/ja/international" },
  ] as const;
  return <main className="min-h-screen bg-[#f4f1eb] text-[#171717]" style={{backgroundColor:"#f4f1eb",color:"#171717"}}>
    <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
      <header className="flex items-center justify-between border-b border-[#c9c6c0] py-5">
        <a href="/ja" aria-label="Riot Basketball Academy トップ" className="flex items-center gap-3" style={{color:"#171717"}}><Image src="/rba-logo-original.jpg" alt="RBA公式ロゴ" width={45} height={63} priority className="h-[59px] w-auto object-contain" /><span className="text-[10px] font-semibold leading-[1.6] tracking-[0.2em]">RIOT BASKETBALL<br/>ACADEMY</span></a>
        <nav aria-label="メインメニュー" className="flex items-center gap-5 text-[12px] font-semibold">
          <a href="/ja/opportunities" style={{color:"#171717"}}>活動を探す</a>
          <a href="/ja/contact" style={{color:"#171717"}}>相談する ↗</a>
        </nav>
      </header>
      <section className="border-b border-[#c9c6c0] pb-20 pt-24 sm:pb-36 sm:pt-40">
        <p className="text-xs font-semibold tracking-[0.18em] text-[#666]">RIOT BASKETBALL ACADEMY — EST. SENDAI, JAPAN</p>
        <h1 className="mt-9 text-[clamp(42px,8.5vw,108px)] font-semibold leading-[1.24] tracking-[-0.075em]">可能性は、<br/>その先に。</h1>
        <p className="mt-8 max-w-lg text-base leading-8 text-[#555]">今いる場所から、世界へ。<br/>育成の選択肢を、すべての子どもたちに。</p>
        <a href="/ja/opportunities" className="mt-9 inline-flex min-h-12 items-center gap-5 border-b-2 border-[#171717] text-sm font-bold" style={{color:"#171717"}}>募集中の活動を見る <span aria-hidden="true">↗</span></a>
      </section>
      <section className="py-14 sm:py-20" aria-labelledby="choose-heading">
        <div className="mb-9 flex items-end justify-between gap-3"><div><p className="text-[11px] font-semibold tracking-[0.2em] text-[#666]">EXPLORE RBA</p><h2 id="choose-heading" className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">目的から探す。</h2></div></div>
        <div className="grid grid-cols-1 border-t border-[#bab7b0] sm:grid-cols-2">
          {destinations.map((item,index)=><a key={item.no} href={item.href} className="group flex min-h-40 flex-col justify-between border-b border-[#bab7b0] py-7 pr-5 transition-colors hover:bg-[#eae6de] sm:px-7" style={{color:"#171717"}}>
            <div className="flex items-center justify-between"><span className="text-xs font-semibold text-[#888]">{item.no} / {item.en}</span><span aria-hidden="true" className="text-lg">↗</span></div>
            <div><h3 className="mt-5 text-2xl font-bold">{item.label}</h3><p className="mt-2 text-sm text-[#666]">{item.description}</p></div>
          </a>)}
        </div>
      </section>
      <section className="border-y border-[#d6d6d2] py-12 sm:py-16">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-[#666]">MY HOME COURT</p>
        <div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div><h2 className="text-2xl font-bold">学びを、日々の成長へ。</h2><p className="mt-3 text-sm text-[#666]">RBAの育成資料と記録のための場所。</p></div>
          <div className="flex flex-wrap items-center gap-5"><a href="/ja/my-homecourt" className="inline-flex min-h-11 items-center gap-3 border-b border-[#171717] text-sm font-bold" style={{color:"#171717"}}>無料で始める ↗</a><a href="/ja/homecourt-plus" className="inline-flex min-h-11 items-center gap-3 border-b border-[#999] text-sm font-semibold" style={{color:"#171717"}}>PLUSについて ↗</a></div>
        </div>
      </section>
      <footer className="flex flex-wrap items-center justify-between gap-5 py-12 text-xs text-[#666]">
        <span>© Riot Basketball Academy</span>
        <div className="flex flex-wrap gap-5"><a href="/ja/about" style={{color:"#555"}}>RBAについて</a><a href="/ja/policies" style={{color:"#555"}}>規約・安全方針</a><a href="/ja/contact" style={{color:"#555"}}>お問い合わせ</a><a href="/" style={{color:"#555"}}>EN</a></div>
      </footer>
    </div>
  </main>;
}
