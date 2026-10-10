import type { Metadata } from "next";
import Link from "next/link";
import "../backbone.css";

export const metadata: Metadata = {
  title: "BACKBONE 千葉チャプター | 次回開催情報",
  description: "BACKBONE 3×3 千葉チャプターの次回開催情報。日時・会場・対象年代・申込方法は正式決定後にお知らせします。",
  alternates: { canonical: "https://riotbasketballacademy.com/backbone/chiba" },
};

export default function ChibaChapter() {
  return <main className="bb" lang="ja">
    <header className="bb-header"><Link href="/backbone" className="bb-logo">BACKBONE <span>3×3</span></Link><nav><Link href="/backbone">BACKBONEへ戻る</Link><Link href="/ja/opportunities">RBAのイベント一覧</Link></nav></header>
    <section className="bb-hero" style={{minHeight:520,height:"auto"}}>
      <div className="bb-hero-inner"><small>BACKBONE 3×3 / CHIBA CHAPTER</small><h1 style={{fontSize:"clamp(100px,17vw,230px)"}}>CHIBA.</h1><h2>次の挑戦を、千葉から。</h2><p>BACKBONE 千葉チャプターの次回開催情報を、こちらでご案内します。現在、開催日時・会場・募集対象・申込方法は正式確認中です。</p><a className="bb-btn" href="https://www.instagram.com/backbone3x3/" target="_blank" rel="noopener noreferrer">公式Instagramで最新情報を確認 ↗</a></div>
    </section>
    <section><h2>NEXT ROUND.</h2><div className="bb-grid"><article><b>01</b><h3>日程・会場</h3><p>正式決定後に公開します。</p></article><article><b>02</b><h3>対象・参加方法</h3><p>募集要項の確定後にお知らせします。</p></article><article><b>03</b><h3>参加費</h3><p>BACKBONEの基本参加費は1日6,600円（税込）。今回の開催条件は募集要項でご確認ください。</p></article></div>
    <div className="bb-notice"><strong>参加をご検討中の皆さまへ</strong><p>このページは開催情報の予告です。現在、選手の申込受付・決済は開始していません。正式な開催要項を公開した後に、申込先をご案内します。</p><Link className="bb-btn secondary" href="/ja/opportunities">RBAの今後のイベントを見る ↗</Link></div></section>
    <footer className="bb-footer">BACKBONE 3×3 / RIOT BASKETBALL ACADEMY <Link href="/backbone">BACKBONE公式ページへ ↗</Link></footer>
  </main>;
}
