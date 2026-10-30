import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import { KyushuContact } from "@/components/kyushu-contact";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: { absolute: "RBA福岡 始動｜アジアとつながる育成・国際ユースキャンプ・地域連携" },
  description: "福岡をアジアの育成ハブへ。RBAは福岡・佐賀で継続的な育成、国際ユースキャンプ、国際試合、指導者交流を企画します。指導・運営・通訳・会場・企業連携の協力者を募集。DM・LINE・メールで気軽にご相談ください。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/fukuoka" },
};
const projects = [
  ["国際ユースキャンプ", "海外のオーガナイザーと連携し、国や言葉を越えて一緒に学ぶキャンプを企画します。"],
  ["国際試合・チーム交流", "試合を通じて異なるバスケットボールに触れ、交流が次の挑戦へ続く機会をつくります。"],
  ["日常につながる育成", "クリニックやキャンプの学びを、保護者・指導者と一緒に普段の活動へつなげます。"],
  ["指導者の学びと交流", "国内外の指導者が学び合い、地域の育成環境を共につくる機会を広げます。"],
];
export default function FukuokaPage() {
  return <SiteFrame locale="ja"><article className={styles.page}>
    <header className={styles.hero}>
      <p className={styles.eyebrow}>RIOT BASKETBALL ACADEMY / FUKUOKA</p>
      <h1>福岡、始動。</h1><h2>福岡から、アジアの育成をつなぐ。</h2>
      <p>RBAは福岡を、アジアとの継続的な育成・交流を育む重点地域として展開していきます。海外のオーガナイザー、地域の指導者・保護者・協力者とともに、子どもたちの次の可能性をつくります。</p>
      <div className={styles.actions}><a href="#contact">福岡で一緒に活動する・相談する →</a><a href="/ja/saga">佐賀の活動を見る →</a></div>
    </header>
    <section className={styles.section}><p className={styles.eyebrow}>FUKUOKA × ASIA</p><h2>国際交流を、一度きりで終わらせない。</h2><div className={styles.grid}>{projects.map(([title,text])=><article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><p className={styles.note}>今後の展開として企画する内容です。各イベントの日程・会場・対象・料金・参加条件は、決定後に個別の開催案内でお知らせします。</p></section>
    <section className={styles.section}><p className={styles.eyebrow}>BUILD IT TOGETHER</p><h2>福岡・佐賀で、一緒に活動する仲間を募集。</h2><p>指導者、トレーナー、運営協力者、地域の主催者、通訳、海外交流のサポート、会場をご紹介いただける方、企業・団体の皆さま。役割や企画が決まる前のご相談も歓迎します。</p><p>保護者・指導者・地域の皆さんと共に、学びが日常へ戻り、また次の挑戦へ続く育成のつながりを育てていきます。</p><p className={styles.note}>関わり方、役割、活動条件は、ご希望や対応できる範囲を伺いながら個別に相談します。</p></section>
    <div id="contact" className={styles.anchor}><KyushuContact region="福岡" /></div>
  </article></SiteFrame>;
}
