import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import styles from "./trial.module.css";

const pageUrl = "https://riotbasketballacademy.com/ja/gream-akita";
const formUrl = "https://form.jotform.com/263100516738049";
const title = "DSM GREAM 秋田｜男子U15 練習体験募集｜RBA";
const description = "大仙市・仙北市・美郷町を中心に活動する男子U15バスケットボールクラブ、DSM GREAM。ヘッドコーチは高橋優作、アドバイザーはRBA代表の西尾優人。保護者用フォームで練習体験を受付中。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: { title, description, url: pageUrl, siteName: "Riot Basketball Academy", type: "website" },
};

const coaches = [
  { role: "ヘッドコーチ", name: "高橋 優作", bio: "JBA公認A級コーチ・JBA公認ジュニアエキスパート" },
  { role: "アドバイザー", name: "西尾 優人", bio: "Riot Basketball Academy 代表。育成面をサポートします。" },
];

const steps = [
  "保護者の方が体験申込フォームを送信",
  "運営からのメールで日時・会場・参加費の有無・持ち物を確認",
  "案内された日時・会場で練習を体験",
];

const faqs = [
  { question: "対象は誰ですか？", answer: "中学年代の男子を対象とした練習体験です。対象学年に当てはまるか迷う場合は、フォームからご相談ください。" },
  { question: "日時・会場・体験の参加費は？", answer: "開催日時と会場、参加費の有無、持ち物を、受付後に運営からメールでご案内します。" },
  { question: "送信したら参加や入団は確定しますか？", answer: "体験の参加枠は運営からの案内で確定します。入団・チーム登録に関する条件は要確認です。希望する方は体験時にご相談ください。" },
];

export default function Page() {
  return (
    <SiteFrame locale="ja">
      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.inner}>
            <a className={styles.back} href="/ja/gream">← GREAMの地域一覧</a>
            <p className={styles.kicker}>AKITA / BOYS U15 / BASKETBALL</p>
            <h1><span>DSM GREAM</span>男子U15 練習体験募集</h1>
            <p className={styles.lead}>秋田で、仲間と強くなる。大仙市・仙北市・美郷町を中心に活動する男子U15クラブです。</p>
            <a className={styles.cta} href={formUrl}>保護者用フォームで体験を申し込む <span aria-hidden="true">→</span></a>
            <p className={styles.micro}>日時・会場・参加費の有無は、受付後にメールでご案内します。</p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="coaches">
          <p className={styles.kicker}>COACHING STAFF</p>
          <h2 id="coaches">指導体制</h2>
          <div className={styles.grid}>
            {coaches.map(({ role, name, bio }) => (
              <article className={styles.card} key={role}>
                <p className={styles.kicker}>{role}</p>
                <h3>{name}</h3>
                <p>{bio}</p>
              </article>
            ))}
          </div>
          <p className={styles.development}>相手の位置や味方の動きを見て、どこを攻めるかを自分で選ぶ。DSM GREAMは、試合で使える技術と判断力を育てます。体験では、仲間の声かけやコーチの伝え方もぜひ見てください。</p>
        </section>

        <section className={styles.dark} aria-labelledby="trial-flow">
          <div className={styles.inner}>
            <p className={styles.kicker}>HOW TO APPLY</p>
            <h2 id="trial-flow">申込から体験まで</h2>
            <ol className={styles.steps}>{steps.map(step => <li key={step}>{step}</li>)}</ol>
            <a className={styles.cta} href={formUrl}>体験を申し込む <span aria-hidden="true">→</span></a>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="trial-faq">
          <p className={styles.kicker}>FOR PARENTS</p>
          <h2 id="trial-faq">保護者の方へ</h2>
          {faqs.map(({ question, answer }) => (
            <details className={styles.faq} key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
          <a className={styles.policy} href="/ja/policies">プライバシー・参加規約・安全方針 →</a>
        </section>
      </div>
    </SiteFrame>
  );
}
