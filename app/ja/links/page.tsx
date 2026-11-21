import type { Metadata } from "next";
import Image from "next/image";
import { GrowthClickTracking } from "@/components/growth-click-tracking";
import styles from "./links.module.css";

export const metadata: Metadata = {
  title: "RBA公式リンク集｜保護者・指導者・参加できる活動",
  description: "Riot Basketball Academy公式。保護者・選手、指導者、クリニック参加の3つの入口から、必要な情報に迷わず進める公式リンク集です。",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://riotbasketballacademy.com/ja/links" },
  openGraph: {
    title: "RBA｜保護者・指導者・育成の機会",
    description: "保護者・指導者・参加希望の方へ。最初に選ぶ入口を3つに整理しました。",
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
  {
    id: "korea-free-interest",
    label: "04 / INTERNATIONAL · FREE INTEREST ONLY",
    title: "韓国・仁川2027｜無料先行受付",
    description: "U12・U15・U17の男女。保護者からの参加意向登録です。出場・旅行・支払いは確定しません。",
    href: "https://form.jotform.com/263207310187047",
    action: "保護者から無料で参加意向を登録",
    style: "standard",
  },
] as const;

const more = [
  {title: "仙台のU12・U15スクール",href:"/ja/sendai-school",id:"school"},
  {title: "GREAM SENDAI｜仙台のU15クラブ",href:"/ja/gream",id:"gream"},
  {title: "RBA UNITED｜韓国無料意向登録・RIZEHOPE個人参加相談",href:"/ja/united",id:"united"},
  {title: "MY HOME COURT｜RBA ID・育成の記録",href:"/ja/my-homecourt",id:"homecourt"},
  {title: "月500円のRBA応援メンバー",href:"/ja/supporters",id:"supporter"},
  {title: "RBA PERFORMANCE TEE｜公式ウェア",href:"/ja/store",id:"store"},
  {title: "企業・地域の協賛と共同開催",href:"/ja/partners",id:"partners"},
  {title: "公式SNSアカウント一覧",href:"/ja/social",id:"social"},
  {title: "西尾優人（にしお まさと）の育成note",href:"https://note.com/rba_official",id:"note"},
  {title: "お問い合わせ・公式窓口",href:"/ja/contact",id:"contact"},
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
        <p className={styles.brand}>RIOT BASKETBALL ACADEMY / JAPAN</p>
        <h1>バスケットボールの<br/>次の一歩を。</h1>
        <p className={styles.lead}>保護者、指導者、活動に参加したい方へ。<br/>まずは目的をひとつお選びください。</p>
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
      <p className={styles.notice}>公式サイト：riotbasketballacademy.com。過去のイベント記事や旧リンク集の申込ボタンは、現在の受付を保証しません。韓国2027・RBA UNITEDの「無料参加意向登録」は正式参加・出場確定・旅行予約・決済ではありません。無料相談の送信と、体験・入会・決済の確定は別です。開催日・参加費・会場・安全上の条件は、各公式ページでご確認ください。未成年者の参加相談は保護者の方からお願いいたします。</p>
      <footer>© 2026 Riot Basketball Academy <a href="/ja/policies">プライバシー・安全方針</a></footer>
    </div>
  </main>;
}
