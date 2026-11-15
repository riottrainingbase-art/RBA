import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import styles from "../../kagoshima-clinic-2026-11-29/page.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "沖縄国際ユースキャンプ｜放課後・1日参加",
};

const eventPage = "/ja/events/okinawa-international-camp-2026";

function approvedCheckout(): { href: string; price: number } | null {
  if (process.env.OKINAWA_AFTER_SCHOOL_OPEN !== "true") return null;
  const href = process.env.OKINAWA_AFTER_SCHOOL_STRIPE_LINK;
  const priceText = process.env.OKINAWA_AFTER_SCHOOL_PRICE_JPY;
  if (!href || !/^https:\/\/book\.stripe\.com\/[A-Za-z0-9]+$/.test(href) ||
      !priceText || !/^[1-9][0-9]{0,5}$/.test(priceText)) return null;
  if (Date.now() >= Date.parse("2026-12-22T16:15:00+09:00")) return null;
  return { href, price: Number(priceText) };
}

export default function Page() {
  const checkout = approvedCheckout();

  return <SiteFrame locale="ja"><div className={styles.page}>
    <section className={styles.section} aria-labelledby="after-school-application">
      <a className={styles.back} href={eventPage + "#after-school"}>← 放課後・1日参加の概要</a>
      <p className={styles.label}>OKINAWA / AFTER SCHOOL</p>
      <h1 id="after-school-application">放課後・1日参加のお申し込み</h1>
      <p>沖縄県内の7〜18歳対象。海外の選手との少人数ゲームや交流に、宿泊なしで参加できます。</p>
      <div className={styles.columns}>
        <article className={styles.card}>
          <h2>当日の予定</h2>
          <p>12月22日（火）・糸満青少年の家</p>
          <ul>
            <li>16:15ごろ　受付・健康確認</li>
            <li>16:30〜17:30　少人数ゲーム・国際交流</li>
            <li>17:30〜17:45ごろ　振り返り・保護者のお迎え</li>
          </ul>
          <p>体育館シューズ、運動着、飲み物をご持参ください。食事・送迎・宿泊は含まれません。</p>
        </article>
        <article className={styles.card}>
          <h2>参加情報の入力とお支払い</h2>
          {checkout ? <>
            <p><strong>{checkout.price.toLocaleString("ja-JP")}円（税込・選手1名）</strong></p>
            <p>Stripeの申込画面で、選手氏名、年齢・学年、保護者氏名、保護者のメールアドレスと電話番号を入力し、参加条件をご確認のうえお支払いください。</p>
            <p>きょうだいで参加する場合は、選手1名ずつお手続きください。お支払い済みの場合は、重複手続きの前にRBAへお問い合わせください。</p>
            <p>Stripeの支払い控えをご確認ください。RBAが入金と申込内容を照合し、保護者のメールアドレスへ当日の詳細をご案内します。</p>
            <p><a href="/ja/cancellation">キャンセル・返金規定</a></p>
            <a className={styles.primary} href={checkout.href}>Stripeで申込・決済へ →</a>
          </> : <>
            <p><strong>正式受付前です。</strong> 上記は候補日程です。開催条件と参加費の確定後、このページから申込・決済に進めるようになります。</p>
            <a className={styles.primary} href={eventPage + "#after-school"}>参加希望の相談へ →</a>
          </>}
        </article>
      </div>
      <p>お問い合わせ <a href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a></p>
    </section>
  </div></SiteFrame>;
}
