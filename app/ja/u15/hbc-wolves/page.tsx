import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import styles from "./hbc.module.css";

const canonical = "https://riotbasketballacademy.com/ja/u15/hbc-wolves";
const instagram = "https://www.instagram.com/hbcwolves/";
const website = "https://kozaki-hbc.jimdosite.com/";

export const metadata: Metadata = {
  title: "HBC WOLVES｜千葉・神崎のU12/U15バスケットボール｜RBA連携クラブ",
  description: "千葉県神崎町のHBC WOLVESをRiot Basketball Academyが紹介。小学生・中学生のバスケットボール、体験・見学の相談はHBC公式Instagramへ。",
  alternates: { canonical },
  openGraph: {
    title: "HBC WOLVES｜千葉・神崎から、次の挑戦へ。",
    description: "小中学生のバスケットボール。HBC WOLVESの活動紹介と体験・見学への入口。RBA連携クラブとしてご案内します。",
    url: canonical,
    siteName: "Riot Basketball Academy",
    type: "website",
  },
};

const highlights = [
  { number: "01", title: "地域の育成", text: "千葉県神崎町を拠点に、小学生・中学生の成長を支えるバスケットボールクラブ。" },
  { number: "02", title: "挑戦する経験", text: "日々の練習に加え、BACKBONE千葉などRBAと接点のある交流・イベントにも取り組んでいます。" },
  { number: "03", title: "体験・見学", text: "参加を検討しているご家庭は、HBC公式InstagramのDMから直接相談できます。" },
];

export default function HbcWolvesPage() {
  return <SiteFrame locale="ja">
    <main className={styles.page} lang="ja">
      <section className={styles.hero} aria-labelledby="hbc-title">
        <div className={styles.container}>
          <p className={styles.kicker}>RBA × LOCAL BASKETBALL / CHIBA</p>
          <p className={styles.overline}>INDEPENDENT PARTNER CLUB</p>
          <h1 id="hbc-title">HBC <span>WOLVES</span></h1>
          <p className={styles.heroTitle}>千葉・神崎から、<br/>次の挑戦へ。</p>
          <p className={styles.lead}>小学生・中学生の「もっとやってみたい」を、地域のコートから。Riot Basketball Academyは、千葉県神崎町でHBCが主体となって続ける育成活動を尊重し、体験・見学の入口を応援します。</p>
          <div className={styles.actions}>
            <a href={instagram} target="_blank" rel="noopener noreferrer" className={styles.primary} data-growth-id="hbc-wolves-trial-instagram">体験・見学をDMで相談 ↗</a>
            <a href={website} target="_blank" rel="noopener noreferrer" className={styles.secondary} data-growth-id="hbc-wolves-official-site">HBC公式サイトを見る ↗</a>
          </div>
          <p className={styles.heroNote}>運営・入会判断・活動条件のご案内はHBC WOLVESが行います。GREAMとは別の独立した地域クラブです。</p>
        </div>
        <div className={styles.heroNumber} aria-hidden="true">15</div>
      </section>

      <section className={styles.info} aria-labelledby="hbc-about">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div><p className={styles.sectionLabel}>MEET HBC WOLVES</p><h2 id="hbc-about">一人ひとりの成長を、<br/>地域で支える。</h2></div>
            <p>HBC WOLVESは千葉県神崎町で活動するバスケットボールチームです。代表は周浦智美コーチ。小学生・中学生の男女を対象とした活動を紹介しています。</p>
          </div>
          <div className={styles.factGrid}>
            <div><span>HOME</span><strong>千葉県 神崎町</strong><p>KOZAKI / CHIBA</p></div>
            <div><span>AGE GROUP</span><strong>U12 / U15</strong><p>小学生・中学生年代</p></div>
            <div><span>CONTACT</span><strong>@hbcwolves</strong><p>公式InstagramのDMへ</p></div>
          </div>
          <div className={styles.features}>
            {highlights.map(item => <article key={item.number}>
              <span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section className={styles.join} aria-labelledby="hbc-join">
        <div className={styles.container}>
          <p className={styles.sectionLabel}>FIRST STEP / TRY & VISIT</p>
          <h2 id="hbc-join">まずは、見に来てください。</h2>
          <p>体験や見学をご希望の場合は、HBC WOLVESの公式Instagramへ、お子さまの学年と参加希望日を添えてDMでお問い合わせください。練習日・会場・費用・受入状況などは、チームからの最新案内でご確認ください。</p>
          <a href={instagram} target="_blank" rel="noopener noreferrer" className={styles.primary} data-growth-id="hbc-wolves-contact-bottom">HBC公式Instagramへ ↗</a>
        </div>
      </section>
      <section className={styles.related} aria-label="関連する育成活動">
        <div className={styles.container}>
          <p className={styles.sectionLabel}>RBA / U15 NETWORK</p>
          <h2>所属と運営を尊重し、育成でつながる。</h2>
          <p>HBC WOLVESの活動はHBCが運営します。RBAのGREAM U15チームとは別の枠組みとしてご紹介しています。</p>
          <div className={styles.relatedLinks}>
            <a href="/ja/u15">RBA U15の入口へ →</a>
            <a href="/ja/gream">GREAM各地域を見る →</a>
          </div>
        </div>
      </section>
    </main>
  </SiteFrame>;
}
