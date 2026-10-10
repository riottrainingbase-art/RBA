import type { Metadata } from "next";
import Link from "next/link";
import "../backbone.css";

export const metadata: Metadata = {
  title: "BACKBONE 千葉 CHAPTER Round 3 | 2026年10月25日",
  description: "2026年10月25日（日）BACKBONE 3×3 千葉 CHAPTER Round 3。9:00〜16:00、育成クリニックと3x3ゲーム。参加費6,600円（税込）。",
  alternates: { canonical: "https://riotbasketballacademy.com/backbone/chiba" },
};

export default function ChibaChapter() {
  return <main className="bb" lang="ja">
    <header className="bb-header"><Link href="/backbone" className="bb-logo">BACKBONE <span>3×3</span></Link><nav><Link href="/backbone">BACKBONEへ戻る</Link><Link href="/ja/opportunities">RBAのイベント一覧</Link></nav></header>
    <section className="bb-hero" style={{minHeight:520,height:"auto"}}>
      <div className="bb-hero-inner"><small>BACKBONE 3×3 / CHIBA CHAPTER</small><h1 style={{fontSize:"clamp(100px,17vw,230px)"}}>CHIBA.</h1><h2>10月25日、千葉でプレーしよう。</h2><p>2026年10月25日（日）開催。午前は育成クリニック、午後は3x3ゲーム。チームは当日編成するため、お一人での参加も歓迎です。</p><a className="bb-btn" href="https://docs.google.com/forms/d/e/1FAIpQLScP3NPWCVgySjcP1TyqMdXQ4Cw9CUBhMk78DJPP1dlLl3hShw/viewform" target="_blank" rel="noopener noreferrer">参加申込はこちら ↗</a></div>
    </section>
    <section><h2>NEXT ROUND.</h2><div className="bb-grid"><article><b>01</b><h3>日時・会場</h3><p>2026年10月25日（日）8:40受付、9:00〜16:00。会場の住所は申込先でご確認ください。</p></article><article><b>02</b><h3>内容・参加方法</h3><p>9:00〜11:30 育成クリニック／13:30〜15:50 3x3ゲーム。チームは当日編成します。対象年代は主催者にご確認ください。</p></article><article><b>03</b><h3>参加費</h3><p>6,600円（税込）／1名。兄弟姉妹など複数名の場合は、人数分のお申し込みをお願いします。</p></article></div>
    <div className="bb-notice"><strong>参加をご検討中の皆さまへ</strong><p>主催：HBC Wolves／指導・監修：Riot Basketball Academy／協賛：GLEAM® by Nobumitsu Tabata。申込先は上記の公式Googleフォームです。</p><Link className="bb-btn secondary" href="/ja/opportunities">RBAの今後のイベントも見る ↗</Link></div></section>
    <footer className="bb-footer">BACKBONE 3×3 / RIOT BASKETBALL ACADEMY <Link href="/backbone">BACKBONE公式ページへ ↗</Link></footer>
  </main>;
}
