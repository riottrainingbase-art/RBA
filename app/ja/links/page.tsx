import type { Metadata } from "next";
import Image from "next/image";
import { GrowthClickTracking } from "@/components/growth-click-tracking";
import styles from "./links.module.css";

export const metadata: Metadata = {
  title: "RBA公式案内｜参加・学び・公式ウェア",
  description: "RBA公式の申込・購入先と育成の情報を一つに。クリニック、指導者の学び、公式ウェア、保護者・選手向けの案内。",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://riotbasketballacademy.com/ja/links" },
  openGraph: {
    title: "RBA｜可能性は、ひとつのコートに収まらない。",
    description: "RBAの活動・申込・公式ウェアを、目的から探せる公式案内。",
    url: "https://riotbasketballacademy.com/ja/links",
    type: "website",
    images: [{url:"https://riotbasketballacademy.com/rba-logo-original.jpg"}],
  },
};

const featured = [
  {
    id: "families",
    label: "01 / FOR PARENTS",
    title: "保護者・選手の方",
    description: "チーム選びや出場機会、育成の記事と参加できる活動へ。",
    href: "/ja/families",
    action: "保護者向けの入口へ",
    style: "primary",
  },
  {
    id: "coaches",
    label: "02 / FOR COACHES",
    title: "指導者・チームの方",
    description: "練習設計・育成記事・オンライン講習を探す。",
    href: "/ja/coaches",
    action: "指導者の学びへ",
    style: "standard",
  },
  {
    id: "events",
    label: "03 / JOIN RBA",
    title: "クリニック・キャンプを探す",
    description: "募集日程・対象・費用を公式ページで確認できます。",
    href: "/ja/opportunities",
    action: "参加できる活動を見る",
    style: "standard",
  },
] as const;

const more = [
  {title: "仙台のU12・U15スクール",href:"/ja/sendai-school",id:"school"},
  {title: "GREAM｜U15クラブ",href:"/ja/gream",id:"gream"},
  {title: "月500円のRBA応援メンバー",href:"/ja/supporters",id:"supporter"},
  {title: "RBA ESSENTIALS｜公式アパレル",href:"/ja/essentials/shop",id:"store"},
  {title: "企業・地域の協賛と共同開催",href:"/ja/partners",id:"partners"},
  {title: "RBA公式サイト",href:"/ja",id:"home"},
] as const;

export default function RbaLinkInBioPage() {
  return <main id="main-content" lang="ja" className={styles.page}>
    <GrowthClickTracking />
    <div className={styles.container}>
      <header className={styles.hero}>
        <a href="/ja" aria-label="Riot Basketball Academy公式サイトに戻る" data-growth-id="bio-logo-home">
          <Image src="/rba-logo-original.jpg" alt="RBA公式ロゴ" width={66} height={92} priority className={styles.logo} />
        </a>
        <p className={styles.brand}>RIOT BASKETBALL ACADEMY</p>
        <h1>育成の可能性を、<br/>もっと広く。</h1>
        <p className={styles.lead}>選手・保護者、指導者、地域の皆さまへ。<br/>必要な情報と申込先を、こちらからご案内します。</p>
        <span className={styles.region}>仙台から、全国・アジアへ。</span>
      </header>
      <nav aria-label="RBAの公式案内リンク" className={styles.links}>
        {featured.map(item=><a key={item.id} className={item.style==="primary"?styles.featured:styles.card} href={item.href} data-growth-id={`bio-${item.id}`}>
          <span className={styles.eyebrow}>{item.label}</span>
          <strong>{item.title}</strong>
          <span className={styles.description}>{item.description}</span>
          <span className={styles.action}>{item.action} <span aria-hidden="true">→</span></span>
        </a>)}
      </nav>
      <nav className={styles.more} aria-label="その他の公式窓口">
        {more.map(item=><a href={item.href} key={item.id} data-growth-id={`bio-${item.id}`}>{item.title}<span aria-hidden="true">↗</span></a>)}
      </nav>
      <p className={styles.notice}>無料相談の送信と、体験・入会・決済の確定は別です。開催日・参加費・会場・安全上の条件は、各公式ページでご確認ください。未成年者の参加相談は保護者の方からお願いいたします。</p>
      <footer>© 2026 Riot Basketball Academy <a href="/ja/policies">プライバシー・安全方針</a></footer>
    </div>
  </main>;
}
