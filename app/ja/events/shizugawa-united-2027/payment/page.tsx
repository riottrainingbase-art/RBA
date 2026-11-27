import { SiteFrame } from "@/components/site-frame";
import styles from "../../shizugawa-development-camp-2026/page.module.css";

export const metadata = { title: "志津川育成合宿｜申込・お支払いのご案内" };
const inquiry = "mailto:riot.training.base@gmail.com?subject=" + encodeURIComponent("2027年2月 志津川育成合宿の参加相談");

export default function Page() {
  return <SiteFrame locale="ja"><section className={styles.section}>
    <a href="/ja/events/shizugawa-united-2027">← 日程・合宿の内容に戻る</a>
    <p className={styles.eyebrow}>RBA UNITED｜2027年2月・志津川</p>
    <h1>申込・お支払い</h1><p className={styles.notice}>正式申込・決済は受付前です。会場が希望日を調整中のため、現時点でのお支払いは不要です。</p>
    <ol className={styles.steps}><li><strong>募集条件の発表</strong><span>開催日・定員・総額・含まれる費用・取消条件を確認できます。</span></li>
    <li><strong>保護者による申込</strong><span>事前に参加意向をお知らせいただいたご家庭も、正式募集時に参加条件をご確認ください。</span></li>
    <li><strong>受入枠の確認とお支払い</strong><span>RBAが参加枠を確認後、この日程専用のお支払い方法をご案内します。</span></li></ol>
    <a className={styles.primary} href={inquiry}>参加についてメールで相談する</a><p>メールの宛先　riot.training.base@gmail.com</p>
  </section></SiteFrame>;
}
