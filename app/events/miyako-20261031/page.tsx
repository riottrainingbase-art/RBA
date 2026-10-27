import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import styles from "./miyako.module.css";

const applicationUrl = "https://docs.google.com/forms/d/e/1FAIpQLScQ8EtCsB7itDZkWebebPLcIRbWtgt4cXioL5DCj3v8RLdr5w/viewform";

export const metadata: Metadata = {
  title: "10/31 宮古 RBA 1DAY CLINIC｜開催詳細・参加申込",
  description: "2026年10月31日（土）岩手県宮古市・千徳地区体育館。小学5年生〜中学3年生対象、定員30名。主催者指定の公式Googleフォームからお申し込みください。",
  alternates: { canonical: "https://riotbasketballacademy.com/events/miyako-20261031" },
  openGraph: {
    title: "宮古で、バスケが変わる。｜RBA 1DAY CLINIC",
    description: "10月31日（土）10:00〜17:00／千徳地区体育館／小学5年〜中学3年／定員30名",
    url: "https://riotbasketballacademy.com/events/miyako-20261031",
    type: "website",
  },
};

export default function MiyakoClinicPage() {
  return <SiteFrame locale="ja" compact>
    <div className={styles.page} lang="ja">
      <section className={styles.hero} aria-labelledby="miyako-title">
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>RIOT BASKETBALL ACADEMY × BiiLDact / IWATE, MIYAKO</p>
          <h1 id="miyako-title" className={styles.title}>宮古で、<br/>バスケが<br/>変わる。</h1>
          <p className={styles.english}>RBA 1DAY CLINIC<br/>IN MIYAKO</p>
          <div className={styles.heroMeta}>
            <div><strong>2026.10.31［土］</strong><span>10:00〜17:00 ／ 受付9:30〜</span></div>
            <div><strong>千徳地区体育館</strong><span>岩手県宮古市</span></div>
          </div>
          <p className={styles.summary}>小学5・6年生〜中学3年生 ／ 定員30名・先着順<br/>練習で身につけた技術を、試合の判断につなげる一日。</p>
          <div className={styles.actions}>
            <a className={styles.button} href={applicationUrl} target="_blank" rel="noopener noreferrer" data-growth-id="miyako-20261031-register-hero">公式フォームから申し込む ↗</a>
            <a className={`${styles.button} ${styles.outline}`} href="#miyako-details">開催概要を見る ↓</a>
          </div>
          <p className={styles.note}>参加費・申込条件は現地主催者の公式フォームが正本です。新しい受付フォームや決済ページは設けていません。</p>
        </div>
      </section>

      <div className={`${styles.body} ${styles.wrap}`}>
        <section id="miyako-details" aria-labelledby="miyako-details-title">
          <p className={styles.sectionLabel}>EVENT INFORMATION</p>
          <h2 id="miyako-details-title" className={styles.sectionTitle}>一日を、次の試合につなげる。</h2>
          <div className={styles.grid}>
            <div className={styles.card}><span className={styles.cardLabel}>DATE & TIME</span><h3 className={styles.cardTitle}>10月31日（土）</h3><p className={styles.cardBody}>10:00〜17:00<br/>受付開始 9:30</p></div>
            <div className={styles.card}><span className={styles.cardLabel}>VENUE</span><h3 className={styles.cardTitle}>千徳地区体育館</h3><p className={styles.cardBody}>岩手県宮古市<br/>交通・駐車場は主催者案内をご確認ください。</p></div>
            <div className={styles.card}><span className={styles.cardLabel}>PLAYERS</span><h3 className={styles.cardTitle}>小学5年〜中学3年</h3><p className={styles.cardBody}>定員30名・先着順<br/>参加費は公式フォームをご確認ください。</p></div>
          </div>
        </section>
        <section className={styles.block} aria-labelledby="miyako-training-title">
          <p className={styles.sectionLabel}>ON COURT</p>
          <h2 id="miyako-training-title" className={styles.sectionTitle}>見る。選ぶ。実行する。</h2>
          <p className={styles.copy}>1対1・2対2・3対3を通して、相手と味方の動きを読み、プレーを選び、試合で使う力を磨きます。決まった形を繰り返すだけでなく、状況に応じた判断を大切にします。内容は当日の状況により調整する場合があります。</p>
        </section>
        <section className={styles.block} aria-labelledby="miyako-apply-title">
          <p className={styles.sectionLabel}>HOW TO JOIN</p>
          <h2 id="miyako-apply-title" className={styles.sectionTitle}>参加申込は、公式フォームから。</h2>
          <div className={styles.steps}>
            <div className={styles.step}><b>STEP 01</b><p>公式Googleフォームで参加費・条件を確認</p></div>
            <div className={styles.step}><b>STEP 02</b><p>必要事項を入力して申込を送信</p></div>
            <div className={styles.step}><b>STEP 03</b><p>主催者からの案内に従って参加準備</p></div>
          </div>
          <a className={`${styles.button} ${styles.finalButton}`} href={applicationUrl} target="_blank" rel="noopener noreferrer" data-growth-id="miyako-20261031-register-footer">参加費・条件を確認して申し込む ↗</a>
          <p className={styles.small}>申込状況により受付を終了する場合があります。募集人数・残席数は固定表示していません。</p>
        </section>
        <section className={styles.block} aria-labelledby="miyako-contact-title">
          <h2 id="miyako-contact-title" className={styles.sectionTitle}>お問い合わせ</h2>
          <p className={styles.copy}>Riot Basketball Academy：<a className={styles.contact} href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a></p>
          <p className={styles.small}>現地主催：BiiLDact Basketball Academy。申込情報は主催者指定のGoogleフォームで受け付けます。このページ自体では参加者の個人情報を収集しません。</p>
        </section>
      </div>
    </div>
  </SiteFrame>;
}
