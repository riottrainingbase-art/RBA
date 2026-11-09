import type { Metadata } from "next";
import Image from "next/image";
import { GrowthClickTracking } from "@/components/growth-click-tracking";
import styles from "./links.module.css";

export const metadata: Metadata = {
  title: "RBA公式リンク集｜スクール体験・GREAM・クリニック",
  description: "Riot Basketball Academy公式。仙台U12・U15スクール、GREAMクラブ、全国の育成クリニック、指導者の学びへ。保護者が迷わず公式ページへ進めるリンク集です。",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://riotbasketballacademy.com/ja/links" },
  openGraph: {
    title: "RBA｜スクール体験・U15クラブ・全国の育成機会",
    description: "体験したい。チームを探したい。育成を学びたい。目的別に公式の窓口を選べます。",
    url: "https://riotbasketballacademy.com/ja/links",
    type: "website",
    images: [{url:"https://riotbasketballacademy.com/rba-logo-original.jpg"}],
  },
};

const featured = [
  {
    id: "school",
    label: "01 / SENDAI SCHOOL",
    title: "仙台 U12・U15 スクール",
    description: "チームはそのまま。小学生・中学生の保護者向け無料体験相談。U12金曜・U15木曜を基本にご案内。",
    href: "/ja/sendai-school",
    action: "スクール内容・体験相談へ",
    style: "primary",
  },
  {
    id: "gream",
    label: "02 / U15 CLUB",
    title: "GREAM｜U15育成チーム",
    description: "仙台・秋田・沖縄。スクールとは異なるクラブの活動・料金・募集状況をご案内。",
    href: "/ja/gream",
    action: "地域のチームを選ぶ",
    style: "standard",
  },
  {
    id: "events",
    label: "03 / CLINICS & CAMPS",
    title: "全国のクリニック・キャンプ",
    description: "募集日程・対象年代・費用を確認。参加可能な活動からお選びください。",
    href: "/ja/opportunities",
    action: "開催中の募集を確認",
    style: "standard",
  },
  {
    id: "learn",
    label: "04 / COACH EDUCATION",
    title: "指導者の学び・D-HUB",
    description: "練習設計、選手育成、オンライン講習、育成記事を探す入口です。",
    href: "/ja/d-hub",
    action: "学びの内容を見る",
    style: "standard",
  },
] as const;

const more = [
  {title: "RBAを地域に呼ぶ",href:"/ja/clinic-request",id:"host"},
  {title: "企業・地域の協賛",href:"/ja/partners",id:"partners"},
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
        <h1>バスケットボールの<br/>次の一歩を。</h1>
        <p className={styles.lead}>体験・チーム・クリニック・指導者の学び。<br/>目的に合う公式窓口を選べます。</p>
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
