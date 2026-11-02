import { OKINAWA_DOMESTIC_APPLICATION_URL, OKINAWA_RESIDENT_CHECKOUT_URLS, OKINAWA_DOMESTIC_CHECKOUT_URLS } from "@/lib/okinawa-camp-registration";
import { OKINAWA_CAMP_LOGISTICS_COPY } from "@/lib/okinawa-camp-logistics";
import { OKINAWA_RESIDENT_PRICES, OKINAWA_DOMESTIC_PRICES } from "@/lib/okinawa-camp-pricing";
import styles from "./okinawa-resident-prices.module.css";

export function OkinawaResidentPrices({ residence = "okinawa" }: { residence?: "okinawa" | "japan" }) {
  const resident = residence === "okinawa";
  const prices = resident ? OKINAWA_RESIDENT_PRICES : OKINAWA_DOMESTIC_PRICES;
  const checkout = resident ? OKINAWA_RESIDENT_CHECKOUT_URLS : OKINAWA_DOMESTIC_CHECKOUT_URLS;
  const headingId = resident ? "okinawa-resident-discount" : "okinawa-domestic-prices";
  return <section className={styles.section} aria-labelledby={headingId}>
    <div className={styles.inner}>
      <p className={styles.kicker}>{resident ? "OKINAWA RESIDENTS" : "JAPAN / DOMESTIC"} / 2026.12.22–24</p>
      <h2 id={headingId}>{resident ? "沖縄県民割引で申込・決済" : "県外からの国内参加・申込・決済"}</h2>
      <p className={styles.lead}>{resident ? "沖縄に住む子どもたちに、世界の仲間と学ぶ機会を。" : "全国から、沖縄での3日間へ。"}</p>
      <p>{resident ? "沖縄県内にお住まいの7〜18歳の選手が対象です。県民割引の税込料金です。" : "沖縄県外の日本国内にお住まいの7〜18歳の選手が対象です。表示料金は税込・1名分です。"}下のボタンから、選手情報の入力とお支払いをまとめて行えます。事前のメール申込は不要です。</p>
      <div className={styles.grid}>
        <article className={styles.card}><p className={styles.plan}>通いプラン / 3日間</p><p className={styles.price}><strong>{prices.day.toLocaleString("ja-JP")}</strong><span>円</span></p><p className={styles.unit}>税込・1名 / 12月22〜24日</p><ul><li>キャンプの練習・ゲーム・国際交流プログラム</li><li>指導・運営費、参加者向け保険料</li><li>宿泊なし・現地集合／現地解散</li></ul><p className={styles.note}>昼食・夕食・送迎は含みません。施設の食事利用が必要な場合は、手配内容・追加費用を申込確定前にご案内します。</p><a className={styles.checkout} href={checkout.day}>通い{prices.day.toLocaleString("ja-JP")}円で申込・決済へ →</a></article>
        <article className={styles.card}><p className={styles.plan}>宿泊プラン / 2泊3日</p><p className={styles.price}><strong>{prices.housing.toLocaleString("ja-JP")}</strong><span>円</span></p><p className={styles.unit}>税込・1名 / 12月22〜24日</p><ul><li>通いプランの練習・ゲーム・国際交流プログラム</li><li>2泊の宿泊・期間中の所定の食事・リネン</li><li>指導・運営費、保険料・宿泊中の見守り</li></ul><p className={styles.note}>食事回数・提供時刻は最終参加案内でお知らせします。会場までの交通費・空港送迎・12月21日の前泊は含みません。</p><a className={styles.checkout} href={checkout.housing}>宿泊{prices.housing.toLocaleString("ja-JP")}円で申込・決済へ →</a></article>
      </div>
      <div className={styles.conditions}><h3>対象・適用条件</h3><ul><li>申込時に参加者のお住まいを確認します。保護者と異なる場合は、決済画面の学年等の欄に参加者の居住地を追記してください。</li><li>{resident ? "上記は県民割引適用後の料金です。" : "上記は県外からの国内参加料金です。"}海外向け早割・複数名割引との併用はありません。</li><li>{OKINAWA_CAMP_LOGISTICS_COPY.ja.departure}3日間とも終日練習が確定した日程ではありません。</li><li>糸満青少年の家での開催について施設側の了承を得ています（RBA確認）。宿泊利用の正式手続き、体育館の時間、安全な受入人数・追加スタッフ・送迎は調整中です。お支払いは仮予約です。主催者都合の中止・会場確保不可、最終確定前の辞退、最終条件に同意できない場合は全額返金します。最終案内前に返金不可の航空券を予約しないでください。</li></ul></div>
      <h3>申込・お支払いは同じ画面で完了します</h3><p>Stripeの決済画面で選手情報・保護者の連絡先を入力し、対象条件・仮予約条件に同意してお支払いください。1回の決済で選手1名のお申し込みとなります。きょうだいは1名ずつお手続きください。</p>
      <p className={styles.note}>お支払い後、RBAから参加案内をお送りします。支払い済みの方は重複して決済せず、ご連絡ください。参加の最終確定は、調整中の条件をご確認いただいた後となります。</p>
      <div className={styles.actions}><a href={resident ? "#okinawa-domestic-prices" : "#okinawa-resident-discount"}>{resident ? "県外からの国内参加はこちら" : "沖縄県民割引はこちら"}</a><a href={OKINAWA_DOMESTIC_APPLICATION_URL}>参加・送迎について相談する</a><a href="https://www.instagram.com/riot.basketball.academy/" target="_blank" rel="noopener noreferrer">Instagramで相談する ↗</a></div>
    </div>
  </section>;
}
