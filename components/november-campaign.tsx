import styles from "./november-campaign.module.css";

const clinicUrl = "/ja/events/torsten-loibl-online-clinic?utm_source=rba_site&utm_medium=homepage&utm_campaign=torsten_vol2_20261125&utm_content=priority_card";

export function NovemberCampaign() {
  // End live-registration promotion when the live session begins in Japan.
  if (Date.now() >= Date.parse("2026-11-25T20:00:00+09:00")) return null;

  return (
    <section className={styles.campaign} aria-labelledby="november-clinic-title">
      <div className={styles.copy}>
        <p className={styles.eyebrow}>COACH EDUCATION · 25 NOV 2026</p>
        <h2 id="november-clinic-title">練習では入る。<br/>試合では、なぜ打てない？</h2>
        <p className={styles.lead}>シュート技術だけでなく、状況認知・スペーシング・練習設計をつなぐ90分。Torsten Loibl ONLINE CLINIC Vol.2。</p>
        <p className={styles.details}>11月25日（水）20:00〜21:30 · Zoom · 日本語逐次通訳</p>
        <div className={styles.prices}><span>LIVE <strong>3,300円</strong></span><span>録画30日 <strong>4,400円</strong></span></div>
        <div className={styles.actions}>
          <a className={styles.primary} data-growth-id="home-torsten-priority" href={clinicUrl}>講習内容・申込方法を見る <span aria-hidden="true">→</span></a>
          <a className={styles.secondary} data-growth-id="home-torsten-dhub" href="/ja/d-hub">継続して学ぶ D-HUB <span aria-hidden="true">→</span></a>
        </div>
        <p className={styles.note}>表示金額は税込です。申込フォーム送信後、選択したプランの決済が必要です。フォーム送信のみでは受講確定となりません。</p>
      </div>
      <div className={styles.side} aria-hidden="true">
        <span className={styles.motif}>01</span>
        <span className={styles.large}>THINK<br/>THE<br/>GAME.</span>
        <span className={styles.foot}>RIOT BASKETBALL ACADEMY<br/>DEVELOPMENT / EDUCATION</span>
      </div>
    </section>
  );
}
