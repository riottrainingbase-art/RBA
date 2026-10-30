import styles from "./kyushu-contact.module.css";

export function KyushuContact({ region = "福岡・佐賀" }: { region?: string }) {
  const email = "mailto:riot.training.base@gmail.com?" + new URLSearchParams({ subject: `RBA ${region}｜活動・開催・協力の相談`, body: `RBA 西尾様\n\n${region}での活動について相談したいです。\nお名前：\nお住まい・活動地域：\n相談したいこと：\n` }).toString().replace(/\+/g, "%20");
  return <section className={styles.contact} aria-label={`${region}の相談窓口`}>
    <p className={styles.eyebrow}>FUKUOKA × SAGA / CONTACT</p>
    <h2>「{region}で一緒に活動したい」でOK。</h2>
    <p>参加、開催、運営のお手伝い、指導、通訳、会場の紹介、企業連携。まだ具体的に決まっていなくても、気軽にお声がけください。</p>
    <div className={styles.actions}>
      <a href="https://www.instagram.com/riot.basketball.academy/" target="_blank" rel="noopener noreferrer">InstagramでDMを送る ↗</a>
      <a href="https://lin.ee/5l1YG8N" target="_blank" rel="noopener noreferrer">公式LINEで相談する ↗</a>
      <a href={email}>件名入りメールで相談する →</a>
      <a href="https://form.jotform.com/262590542634055" target="_blank" rel="noopener noreferrer">ブラウザのフォームから相談 ↗</a>
    </div>
    <p className={styles.note}>DM・LINEでは「福岡」または「佐賀」と一言お送りください。フォームには希望地域をご記入ください。</p>
    <p className={styles.email}><a href={email}>riot.training.base@gmail.com</a></p>
    <nav className={styles.regions} aria-label="九州の地域ページ"><a href="/ja/fukuoka">RBA福岡 →</a><a href="/ja/saga">RBA佐賀 →</a></nav>
  </section>;
}
