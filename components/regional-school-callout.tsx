import styles from "./regional-program.module.css";

/** A visible invitation, separate from programmes already open for paid booking. */
export function RegionalSchoolCallout({ compact = false }: { compact?: boolean }) {
  return <section className={`${styles.homeCallout} ${compact ? styles.compactCallout : ""}`} aria-labelledby="regional-school-invitation">
    <p className={styles.eyebrow}>RBA 地域スクール構想</p>
    <p className={styles.homeStatus}>全国から参加希望・協力相談を受付中</p>
    <h2 id="regional-school-invitation">次のRBAは、{compact ? "" : <br/>}あなたの街かもしれない。</h2>
    <p className={styles.homeLead}>{compact ? "地域のコーチと、継続して学べるスクールを。参加希望と、指導・運営・会場・協賛の相談を受け付けています。" : "クリニックでの出会いを、日々の成長へ。地域のコーチや皆さんと、今のチームの活動と両立して通えるスクールをつくりたいと考えています。"}</p>
    <div className={styles.homeChoices}>
      <a href="/ja/regional-program#families"><span>保護者の方へ</span><strong>近くで参加したい <span aria-hidden="true">→</span></strong><p>お住まいの地域・学年・通いやすい曜日を教えてください。</p></a>
      <a href="/ja/regional-program#partners"><span>指導者・地域の皆さん・企業の方へ</span><strong>指導や運営に協力したい <span aria-hidden="true">→</span></strong><p>指導・運営・会場の確保・協賛について相談できます。</p></a>
    </div>
    <div className={styles.homeBottom}><a href="/ja/regional-program">地域スクールの構想・開催までの流れを見る →</a><p>希望の送信・相談は無料です。開催地域・日程・料金は未定です。</p></div>
  </section>;
}
