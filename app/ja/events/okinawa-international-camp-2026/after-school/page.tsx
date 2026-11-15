import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import styles from "../../kagoshima-clinic-2026-11-29/page.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "沖縄国際ユースキャンプ｜放課後・1日参加",
};

const eventPage = "/ja/events/okinawa-international-camp-2026";

type HostedLink = {
  active?: boolean;
  livemode?: boolean;
  url?: string;
  metadata?: Record<string, string>;
  custom_fields?: Array<{ key?: string; optional?: boolean }>;
  phone_number_collection?: { enabled?: boolean };
  consent_collection?: { terms_of_service?: string };
  restrictions?: { completed_sessions?: { limit?: number } };
  allow_promotion_codes?: boolean;
  automatic_tax?: { enabled?: boolean };
  line_items?: {
    has_more?: boolean;
    data?: Array<{
      quantity?: number;
      adjustable_quantity?: { enabled?: boolean };
      price?: { currency?: string; unit_amount?: number; type?: string };
    }>;
  };
};

async function approvedCheckout(): Promise<{ href: string; price: number } | null> {
  if (process.env.OKINAWA_AFTER_SCHOOL_OPEN !== "true") return null;
  if (Date.now() >= Date.parse("2026-12-22T16:15:00+09:00")) return null;

  const linkId = process.env.OKINAWA_AFTER_SCHOOL_STRIPE_LINK_ID;
  const priceText = process.env.OKINAWA_AFTER_SCHOOL_PRICE_JPY;
  const capacityText = process.env.OKINAWA_AFTER_SCHOOL_CAPACITY;
  const stripeKey = process.env.OKINAWA_AFTER_SCHOOL_STRIPE_READ_KEY;
  if (!linkId || !/^plink_[A-Za-z0-9]+$/.test(linkId) ||
      !priceText || !/^[1-9][0-9]{0,5}$/.test(priceText) ||
      !capacityText || !/^[1-9][0-9]{0,2}$/.test(capacityText) || !stripeKey) return null;

  try {
    const url = new URL("https://api.stripe.com/v1/payment_links/" + linkId);
    url.searchParams.append("expand[]", "line_items");
    const response = await fetch(url, {
      headers: { Authorization: "Bearer " + stripeKey },
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    const link: HostedLink = await response.json();
    const items = link.line_items;
    const item = items?.data?.[0];
    const price = Number(priceText);
    const requiredFields = ["player_name", "player_age_grade", "guardian_name"];
    if (!link.active || link.livemode !== true ||
        link.metadata?.rba_program !== "okinawa-after-school-2026-12-22" ||
        !link.url || !/^https:\/\/book\.stripe\.com\/[A-Za-z0-9]+$/.test(link.url) ||
        !link.phone_number_collection?.enabled ||
        link.consent_collection?.terms_of_service !== "required" ||
        !requiredFields.every(key => link.custom_fields?.some(field =>
          field.key === key && field.optional === false)) ||
        link.restrictions?.completed_sessions?.limit !== Number(capacityText) ||
        link.allow_promotion_codes !== false || link.automatic_tax?.enabled !== false ||
        items?.has_more || items?.data?.length !== 1 || item?.quantity !== 1 ||
        item.adjustable_quantity?.enabled ||
        item.price?.currency !== "jpy" || item.price.type !== "one_time" ||
        item.price.unit_amount !== price) return null;

    return { href: link.url, price };
  } catch {
    return null;
  }
}

export default async function Page() {
  const checkout = await approvedCheckout();

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
            <a className={styles.primary} href="https://form.jotform.com/263182267951059">無料で参加希望を登録する →</a><p className={styles.small}>希望登録で席や支払いは確定しません。</p>
          </>}
        </article>
      </div>
      <p>お問い合わせ <a href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a></p>
    </section>
  </div></SiteFrame>;
}
