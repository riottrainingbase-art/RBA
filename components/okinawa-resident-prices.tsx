import { OKINAWA_CAMP_LOGISTICS_COPY } from "@/lib/okinawa-camp-logistics";
import { CAMP_OKINAWA_CONTACT, OKINAWA_RESIDENT_PRICES } from "@/lib/okinawa-camp-pricing";
import styles from "./okinawa-resident-prices.module.css";

export function OkinawaResidentPrices() {
  return <section className={styles.section} aria-labelledby="okinawa-resident-discount">
    <div className={styles.inner}>
      <p className={styles.kicker}>OKINAWA RESIDENTS / 2026.12.22–24</p>
      <h2 id="okinawa-resident-discount">沖縄県民割引</h2>
      <p className={styles.lead}>沖縄に住む子どもたちに、世界の仲間と学ぶ機会を。</p>
      <p>沖縄県内にお住まいの7〜18歳の選手が対象です。県民向けの日本円固定料金でご案内します。</p>
      <div className={styles.grid}>
        <article className={styles.card}><p className={styles.plan}>通いプラン / 3日間</p><p className={styles.price}><strong>{OKINAWA_RESIDENT_PRICES.day.toLocaleString("ja-JP")}</strong><span>円</span></p><p className={styles.unit}>税込・1名 / 12月22〜24日</p><ul><li>キャンプの練習・ゲーム・国際交流プログラム</li><li>指導・運営費、参加者向け保険料</li><li>宿泊なし・現地集合／現地解散</li></ul><p className={styles.note}>昼食・夕食・送迎は含みません。施設の食事利用が必要な場合は、手配内容・追加費用を申込確定前にご案内します。</p></article>
        <article className={styles.card}><p className={styles.plan}>宿泊プラン / 2泊3日</p><p className={styles.price}><strong>{OKINAWA_RESIDENT_PRICES.housing.toLocaleString("ja-JP")}</strong><span>円</span></p><p className={styles.unit}>税込・1名 / 12月22〜24日</p><ul><li>通いプランの練習・ゲーム・国際交流プログラム</li><li>2泊の宿泊・期間中の所定の食事・リネン</li><li>指導・運営費、保険料・宿泊中の見守り</li></ul><p className={styles.note}>食事回数・提供時刻は最終参加案内でお知らせします。会場までの交通費・空港送迎・12月21日の前泊は含みません。</p></article>
      </div>
      <div className={styles.conditions}><h3>対象・適用条件</h3><ul><li>申込時に参加者のお住まいの市町村を確認します。</li><li>上記は県民割引適用後の料金です。海外向け早割・複数名割引との併用はありません。</li><li>{OKINAWA_CAMP_LOGISTICS_COPY.ja.departure}3日間とも終日練習が確定した日程ではありません。</li><li>糸満青少年の家での宿泊先は確保済みです。体育館の時間・追加スタッフ・送迎は調整中です。宿泊中の見守り体制を含む最終条件に同意いただいた後に申込・支払いをご案内します。</li></ul></div>
      <h3>県民割引での参加相談</h3><p>希望プラン・氏名・学年（年齢）・性別・連絡先・お住まいの市町村・参加人数をお知らせください。受入状況と参加条件を確認し、RBAから手続き方法をご案内します。</p>
      <div className={styles.actions}><a href={CAMP_OKINAWA_CONTACT}>沖縄県民割引で参加を相談する ↗</a><a href="https://www.instagram.com/riot.basketball.academy/" target="_blank" rel="noopener noreferrer">InstagramのDMで相談する ↗</a></div>
      <p className={styles.note}>DMは「沖縄県民割引」とお送りください。問い合わせのみで参加は確定しません。日本円の県民料金をご希望の方は、海外向け米ドル決済を利用せずRBAへご相談ください。</p>
    </div>
  </section>;
}
