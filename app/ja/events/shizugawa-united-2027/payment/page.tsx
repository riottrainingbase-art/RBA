import { SiteFrame } from "@/components/site-frame";
import styles from "../../shizugawa-development-camp-2026/page.module.css";

export const metadata = {
  title: "志津川育成合宿｜参加意向・申込・お支払い",
  description: "保護者向けの事前案内です。参加意向の連絡方法、正式募集の流れ、お支払いの受付状況を確認できます。",
  alternates: { canonical: "/ja/events/shizugawa-united-2027/payment" },
};

const email = "riot.training.base@gmail.com";
const interest = new URLSearchParams({
  subject: "2027年2月 志津川育成合宿｜参加意向",
  body: "志津川育成合宿に関心があります。\n参加希望人数：\n学年：\n質問・相談（任意）：",
}).toString().replaceAll("+", "%20");

export default function Page() {
  return <SiteFrame locale="ja"><div className={styles.page}><section className={styles.section}>
    <a href="/ja/events/shizugawa-united-2027">← 合宿の内容に戻る</a>
    <p className={styles.eyebrow}>RBA UNITED｜2027年2月・志津川</p>
    <h1>参加意向・お支払い</h1>
    <p className={styles.notice}>2月6日（土）〜7日（日）の日程を施設と調整しています。現在は参加意向とご質問を受け付けています。正式申込・決済は受付前です。</p>
    <h2>参加を検討中のご家庭へ</h2>
    <p className={styles.intro}>保護者の方から、希望人数とお子さまの学年をお知らせください。ご相談だけでも構いません。すでにメールやチームを通じて意向をお伝えいただいた方は、変更があるときだけご連絡ください。</p>
    <a className={styles.primary} href={`mailto:${email}?${interest}`}>参加意向をメールで伝える</a>
    <p className={styles.small}>メールアプリが開かない場合は、普段お使いのメールから {email} へ「2月の志津川合宿」とお送りください。</p>
    <h2>正式募集から参加まで</h2>
    <ol className={styles.steps}>
      <li><strong>1．募集条件を確認</strong><span>開催日・受入人数・総額・費用に含まれるもの・取消条件を、正式案内でご確認ください。</span></li>
      <li><strong>2．保護者が正式申込</strong><span>参加意向のメールに費用はかかりません。参加枠は正式募集後にRBAが確認します。</span></li>
      <li><strong>3．参加枠の案内後にお支払い</strong><span>対象の日程と金額を確認してお手続きください。すでにお支払いの心当たりがある方は、再度手続きする前にRBAへご相談ください。</span></li>
    </ol>
  </section></div></SiteFrame>;
}
