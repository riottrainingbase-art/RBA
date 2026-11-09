import type { Metadata } from "next";
import { GreamBrandHeading } from "@/components/gream-brand-heading";
import { SiteFrame } from "@/components/site-frame";
import styles from "./gream.module.css";

const canonical = "https://riotbasketballacademy.com/ja/gream";

export const metadata: Metadata = {
  title: "GREAM U15｜秋田・仙台・沖縄の育成チーム｜RBA",
  description: "GREAMはRiot Basketball AcademyのU15育成チームプロジェクト。秋田・仙台・沖縄の活動、体験相談、地域と全国の企業協賛をひとつの入口からご案内します。",
  alternates: { canonical },
  openGraph: {
    title: "GREAM U15｜地域で育つ。その挑戦を、一緒に。",
    description: "勝敗だけでなく、見る・判断する・実行する・振り返る。GREAMの地域別の活動と支援の入口。",
    url: canonical, siteName: "Riot Basketball Academy", type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
};

const regions = [
  {
    label: "01 / AKITA", name: "DSM GREAM", place: "秋田｜大仙・仙北・美郷", stage: "男子U15・育成連携",
    copy: "高橋雄作HCを中心とした秋田のU15育成プロジェクト。RBA代表がアドバイザーとして関わり、活動条件は確認できたものからご案内します。",
    href: "/ja/gream-akita", cta: "秋田のチームを見る",
  },
  {
    label: "02 / SENDAI", name: "GREAM SENDAI", place: "宮城｜仙台市太白区", stage: "男子U15・活動案内と参加相談",
    copy: "仙台市太白区を中心に2026年から活動する男子U15クラブ。体験・入団に関する相談と、地域企業の広告協賛をご案内しています。",
    href: "/ja/gream-sendai", cta: "仙台のチームを見る",
  },
  {
    label: "03 / OKINAWA", name: "GREAM OKINAWA", place: "沖縄｜運営体制を整備中", stage: "新体制・会場・コーチを調整中",
    copy: "育成を続けるための現地指導・運営体制を整えています。新しい定期活動が確定したという案内ではありません。",
    href: "/ja/gream-okinawa", cta: "沖縄の案内を見る",
  },
] as const;

const steps = [
  { number: "01", title: "見る", text: "相手、仲間、スペースを認知する。" },
  { number: "02", title: "選ぶ", text: "自分の状況から判断する。" },
  { number: "03", title: "試す", text: "技術を実際のゲームにつなげる。" },
  { number: "04", title: "振り返る", text: "次の挑戦へ学びを残す。" },
] as const;

export default function GreamPage() {
  return <SiteFrame locale="ja">
    <div className={styles.shell}>
      <section className={styles.hero} aria-labelledby="gream-heading">
        <div className={styles.wrap}>
          <div className={styles.heroInner}>
            <div>
              <p className={styles.eyebrow}>RIOT BASKETBALL ACADEMY / U15 DEVELOPMENT</p>
              <GreamBrandHeading id="gream-heading" />
              <h2 className={styles.heroSub}>育つ場所は、<br/>一つじゃない。</h2>
              <p className={styles.heroCopy}>秋田・仙台・沖縄。GREAMは、U15年代の選手が自分で考え、試し、成長を続けるためのRBA育成チームプロジェクトです。所属や地域を越えて、次の挑戦につながる環境をつくります。</p>
              <div className={styles.actions}>
                <a className={styles.cta} href="#regions" data-growth-id="gream-region-entry">地域のチームを見る →</a>
                <a className={styles.ghost} href="/ja/gream/support" data-growth-id="gream-support-hero">GREAMを応援する →</a>
              </div>
            </div>
            <aside className={styles.heroAside} aria-label="GREAMの育成理念">
              <p className={styles.eyebrow}>NOT ONLY RESULTS</p>
              <strong>THE NEXT<br/>STEP MATTERS.</strong>
              <p>練習の目的を知る。試合で自分で選ぶ。失敗から学ぶ。その積み重ねを、地域のコーチや企業とともに支えます。</p>
            </aside>
          </div>
        </div>
      </section>
      <div className={styles.accentLine} aria-hidden="true" />
      <section className={styles.section} id="regions" aria-labelledby="gream-regions-title">
        <div className={styles.wrap}>
          <div className={styles.sectionHeader}>
            <div><p className={styles.sectionTag}>THREE LOCAL CHAPTERS</p><h2 id="gream-regions-title">地域から、次の成長へ。</h2>
            <p>チームごとに運営形態や募集状況は異なります。確認できた内容を地域別にご案内します。</p></div>
          </div>
          <div className={styles.regionGrid}>
            {regions.map(region => <article className={styles.regionCard} key={region.name}>
              <p className={styles.regionLabel}>{region.label}</p>
              <h3>{region.name}</h3>
              <p className={styles.place}>{region.place}</p>
              <span className={styles.cardStatus}>{region.stage}</span>
              <p>{region.copy}</p>
              <a href={region.href} data-growth-id={`gream-region-${region.label.slice(5).toLowerCase()}`}>{region.cta} →</a>
            </article>)}
          </div>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="gream-partner-clubs" style={{background:"#eef2f3"}}>
        <div className={styles.wrap}>
          <p className={styles.sectionTag}>RBA PARTNER CLUB / CHIBA</p>
          <h2 id="gream-partner-clubs">千葉の地域クラブとも、育成でつながる。</h2>
          <p className={styles.sectionLead}>HBC WOLVESは千葉県神崎町で2018年から活動するU12・U15バスケットボールクラブ。周浦智美コーチが代表を務め、RBA代表・西尾優人が育成アドバイザーとして参画します。独立した運営を尊重しながら練習・体験・交流をサポートします。GREAMの3チームとは別組織です。</p>
          <div className={styles.actions} style={{marginTop:24}}>
            <a className={styles.linkButton} href="/ja/u15/hbc-wolves" data-growth-id="gream-partner-hbc">HBC WOLVESのチーム・体験案内 →</a>
            <a className={styles.linkButton} href="https://www.instagram.com/hbcwolves/" target="_blank" rel="noopener noreferrer" data-growth-id="gream-partner-hbc-instagram">HBCに体験・見学を相談 ↗</a>
          </div>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="gream-identity">
        <div className={styles.wrap}>
          <p className={styles.sectionTag}>OUR DEVELOPMENT PRINCIPLES</p>
          <h2 id="gream-identity">勝敗の先に、育成を。</h2>
          <p className={styles.sectionLead}>GREAMが届けたいのは、試合の結果だけではなく、次のプレーを自分で選べるようになる経験です。チーム運営の状況にかかわらず、育成の考え方を共有します。</p>
          <div className={styles.pillars} style={{marginTop:28}}>
            {steps.map(step => <div className={styles.pillar} key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></div>)}
          </div>
        </div>
      </section>
      <section className={styles.banner} aria-labelledby="gream-partner-call">
        <div className={`${styles.wrap} ${styles.bannerLayout}`}>
          <div><p className={styles.eyebrow}>GREAM / COMMUNITY PARTNERS</p><h2 id="gream-partner-call">その挑戦を、地域の力で。</h2>
          <p>お店・企業・個人の支援が、練習環境や学ぶ機会につながる仕組みをつくります。まずは希望する地域と支援方法をお選びください。契約や掲載は条件を確認してから進めます。</p></div>
          <a className={styles.cta} href="/ja/gream/support" data-growth-id="gream-support-bottom">GREAMの支援方法を見る →</a>
        </div>
      </section>
    </div>
  </SiteFrame>;
}
