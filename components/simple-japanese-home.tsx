import { SiteFrame, localePath } from "./site-frame";
import { isProgrammeActive, programmes } from "./programme-data";
import { tr } from "./network-data";
import styles from "./simple-japanese-home.module.css";

const learning = [
  ["育成記事", "チーム選び、出場機会、練習の悩みから。", "/ja/journal"],
  ["MY HOME COURT", "RBA IDは無料。活動と学びを自分のページに。", "/ja/my-homecourt"],
  ["S&C・身体づくり", "成長期のトレーニング、負荷と回復を学ぶ。", "/ja/development"],
  ["海外交流", "日本とアジアのキャンプ・チーム交流を相談。", "/ja/international"],
] as const;

export function SimpleJapaneseHome() {
  const active = programmes.filter(p => isProgrammeActive(p)).sort((a, b) => Number(Boolean(a.ongoing)) - Number(Boolean(b.ongoing)) || a.startDate.localeCompare(b.startDate));
  return <div className={styles.page} lang="ja"><SiteFrame locale="ja" compact>
    <div className={styles.container}>
      <section className={styles.hero} aria-labelledby="rba-home-title">
        <div>
          <p className={styles.label}>RIOT BASKETBALL ACADEMY</p>
          <h1 id="rba-home-title"><span>今のチームの外にも、</span><span>育つチャンスを。</span></h1>
          <p className={styles.intro}>全国のクリニック、指導者の学び、海外との交流。<br/>RBAは、所属を変えずに学びと挑戦を広げる場所です。</p>
          <nav className={styles.actions} aria-label="目的から選ぶ"><a className={styles.primary} href="#home-programmes">参加する →</a><a className={styles.secondary} href="#home-learning">学ぶ →</a><a className={styles.secondary} href="/ja/contact">相談する →</a></nav>
        </div>
      </section>



      <section className={styles.section} id="home-programmes" aria-labelledby="home-programme-title">
        <div className={styles.heading}><div><p className={styles.label}>参加する</p><h2 id="home-programme-title">募集中の活動</h2></div><a className={styles.textLink} href="/ja/opportunities">すべての活動を見る →</a></div>
        <div className={styles.programmes}>{active.map(p => <article key={p.id}>
          <p className={styles.date}>{tr(p.date, "ja")}</p><h3>{tr(p.title, "ja")}</h3>
          <p className={styles.place}>{tr(p.place, "ja")}</p>
          <dl><div><dt>対象</dt><dd>{tr(p.audience, "ja")}</dd></div><div><dt>費用</dt><dd>{tr(p.price, "ja")}</dd></div></dl>
          <a href={p.detailPath ? localePath("ja", p.detailPath) : p.applicationUrl} target={p.detailPath ? undefined : "_blank"} rel={p.detailPath ? undefined : "noopener noreferrer"}>内容・申し込みを確認 →</a>
        </article>)}</div>
        {active.length === 0 ? <p className={styles.note}>次回の募集は活動一覧でお知らせします。</p> : <p className={styles.note}>会場・持ち物・支払い方法・申込確定の条件は、各活動の公式案内をご確認ください。</p>}
      </section>

      <section className={styles.regional} aria-labelledby="regional-school-invitation">
        <div><p className={styles.label}>地域スクール</p><h2 id="regional-school-invitation">あなたの街にも、RBAを。</h2><p>参加希望・指導・運営・会場・協賛の相談を受け付けています。開催地域・日程・料金は未定。希望の送信・相談は無料です。</p></div>
        <div className={styles.regionalActions}><a href="/ja/regional-program#families">近くで参加したい →</a><a href="/ja/regional-program#partners">指導・運営に協力したい →</a></div>
      </section>

      <section className={styles.section} id="home-learning" aria-labelledby="home-learning-title">
        <div className={styles.heading}><div><p className={styles.label}>学ぶ・つながる</p><h2 id="home-learning-title">学びと交流</h2></div></div>
        <div className={styles.learning}>{learning.map(([title, body, href]) => <a href={href} key={href}><h3>{title}<span aria-hidden="true">↗</span></h3><p>{body}</p></a>)}</div>
      </section>

      <nav className={styles.aboutLinks} aria-label="RBAについて"><a className={styles.textLink} href="/ja/about">RBAについて →</a><a className={styles.textLink} href="/ja/approach">育成方針 →</a><a className={styles.textLink} href="/ja/regions">活動実績 →</a></nav>
    </div>
  </SiteFrame></div>;
}
