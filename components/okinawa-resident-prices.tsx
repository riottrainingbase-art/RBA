import { OKINAWA_DOMESTIC_APPLICATION_URL, OKINAWA_RESIDENT_CHECKOUT_URLS } from "@/lib/okinawa-camp-registration";
import { OKINAWA_CAMP_LOGISTICS_COPY } from "@/lib/okinawa-camp-logistics";
import { OKINAWA_RESIDENT_PRICES } from "@/lib/okinawa-camp-pricing";
import styles from "./okinawa-resident-prices.module.css";

export function OkinawaResidentPrices() {
  return <section className={styles.section} aria-labelledby="okinawa-resident-discount">
    <div className={styles.inner}>
      <p className={styles.kicker}>OKINAWA RESIDENTS / 2026.12.22–24</p>
      <h2 id="okinawa-resident-discount">プランを選んで、申込・決済へ</h2>
      <p className={styles.lead}>沖縄に住む子どもたちに、世界の仲間と学ぶ機会を。</p>
      <p>沖縄県内にお住まいの7〜18歳の選手が対象です。県民割引の税込料金です。下のボタンから、選手情報の入力とお支払いをまとめて行えます。事前のメール申込は不要です。</p>
      <div className={styles.grid}>
        <article className={styles.card}><p className={styles.plan}>通いプラン / 3日間</p><p className={styles.price}><strong>{OKINAWA_RESIDENT_PRICES.day.toLocaleString("ja-JP")}</strong><span>円</span></p><p className={styles.unit}>税込・1名 / 12月22〜24日</p><ul><li>キャンプの練習・ゲーム・国際交流プログラム</li><li>指導・運営費、参加者向け保険料</li><li>宿泊なし・現地集合／現地解散</li></ul><p className={styles.note}>昼食・夕食・送迎は含みません。施設の食事利用が必要な場合は、手配内容・追加費用を申込確定前にご案内します。</p><a className={styles.checkout} href={OKINAWA_RESIDENT_CHECKOUT_URLS.day}>通い27,500円で申込・決済へ →</a></article>
        <article className={styles.card}><p className={styles.plan}>宿泊プラン / 2泊3日</p><p className={styles.price}><strong>{OKINAWA_RESIDENT_PRICES.housing.toLocaleString("ja-JP")}</strong><span>円</span></p><p className={styles.unit}>税込・1名 / 12月22〜24日</p><ul><li>通いプランの練習・ゲーム・国際交流プログラム</li><li>2泊の宿泊・期間中の所定の食事・リネン</li><li>指導・運営費、保険料・宿泊中の見守り</li></ul><p className={styles.note}>食事回数・提供時刻は最終参加案内でお知らせします。会場までの交通費・空港送迎・12月21日の前泊は含みません。</p><a className={styles.checkout} href={OKINAWA_RESIDENT_CHECKOUT_URLS.housing}>宿泊39,600円で申込・決済へ →</a></article>
      </div>
      <div className={styles.conditions}><h3>対象・適用条件</h3><ul><li>申込時に参加者のお住まいの市町村を確認します。</li><li>上記は県民割引適用後の料金です。海外向け早割・複数名割引との併用はありません。</li><li>{OKINAWA_CAMP_LOGISTICS_COPY.ja.departure}3日間とも終日練習が確定した日程ではありません。</li><li>糸満青少年の家での宿泊先は確保済みです。体育館の時間・追加スタッフ・送迎は調整中です。お支払いは仮予約です。主催者都合の中止・会場確保不可、最終確定前の辞退、最終条件に同意できない場合は全額返金します。</li></ul></div>
      <h3>申込・お支払いは同じ画面で完了します</h3><p>Stripeの決済画面で選手情報・保護者の連絡先を入力し、対象条件・仮予約条件に同意してお支払いください。1回の決済で選手1名のお申し込みとなります。きょうだいは1名ずつお手続きください。</p>
      <p className={styles.note}>お支払い後、RBAから参加案内をお送りします。支払い済みの方は重複して決済せず、ご連絡ください。参加の最終確定は、調整中の条件をご確認いただいた後となります。</p>
      <div className={styles.actions}><a href={OKINAWA_DOMESTIC_APPLICATION_URL}>県外からの参加・個別相談</a><a href="https://www.instagram.com/riot.basketball.academy/" target="_blank" rel="noopener noreferrer">Instagramで相談する ↗</a></div>
    </div>
  </section>;
}
