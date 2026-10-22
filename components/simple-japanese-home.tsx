import { SiteFrame, localePath } from "./site-frame";
import { isProgrammeActive, programmes } from "./programme-data";
import { tr } from "./network-data";
import { RegionalSchoolCallout } from "./regional-school-callout";
import styles from "./simple-japanese-home.module.css";

const routes = [
  ["選手・保護者", "参加できる活動を探す", "/ja/opportunities"],
  ["指導者", "講習・教材で学ぶ", "/ja/coaches"],
  ["主催者・企業", "開催・協賛を相談する", "/ja/organizer"],
] as const;
const learning = [
  ["育成記事", "チーム選び、出場機会、練習の悩みから。", "/ja/journal"],
  ["MY HOME COURT", "RBA IDは無料。活動と学びを自分のページに。", "/ja/my-homecourt"],
  ["S&C・身体づくり", "成長期のトレーニング、負荷と回復を学ぶ。", "/ja/development"],
  ["海外交流", "日本とアジアのキャンプ・チーム交流を相談。", "/ja/international"],
] as const;

export function SimpleJapaneseHome() {
  const active = programmes.filter(p => isProgrammeActive(p)).sort((a, b) => Number(Boolean(a.ongoing)) - Number(Boolean(b.ongoing)) || a.startDate.localeCompare(b.startDate));
  return <div className={styles.page} lang="ja"><SiteFrame locale="ja">
    <div className={styles.container}>
      <section className={styles.hero} aria-labelledby="rba-home-title">
        <div>
          <p className={styles.label}>RIOT BASKETBALL ACADEMY</p>
          <h1 id="rba-home-title"><span>今のチームの外にも、</span><span>育つチャンスを。</span></h1>
          <p className={styles.intro}>全国のクリニック、指導者の学び、海外との交流。<br/>RBAは、所属を変えずに学びと挑戦を広げる場所です。</p>
          <div className={styles.actions}><a className={styles.primary} href="#home-programmes">参加できる活動を見る →</a><a className={styles.textLink} href="/ja/about">RBAについて →</a></div>
        </div>
        <div className={styles.heroImage} role="img" aria-label="バスケットボールコート"/>
      </section>

      <nav className={styles.routes} aria-label="目的から探す">{routes.map(([who, action, href]) => <a href={href} key={href}><span>{who}</span><strong>{action}<span aria-hidden="true">↗</span></strong></a>)}</nav>

      <section className={styles.section} id="home-programmes" aria-labelledby="home-programme-title">
        <div className={styles.heading}><div><p className={styles.label}>参加する</p><h2 id="home-programme-title">次の予定を、ここから。</h2></div><a className={styles.textLink} href="/ja/opportunities">すべての活動を見る →</a></div>
        <div className={styles.programmes}>{active.map(p => <article key={p.id}>
          <p className={styles.date}>{tr(p.date, "ja")}</p><h3>{tr(p.title, "ja")}</h3>
          <p className={styles.place}>{tr(p.place, "ja")}</p>
          <dl><div><dt>対象</dt><dd>{tr(p.audience, "ja")}</dd></div><div><dt>費用</dt><dd>{tr(p.price, "ja")}</dd></div></dl>
          <a href={p.detailPath ? localePath("ja", p.detailPath) : p.applicationUrl} target={p.detailPath ? undefined : "_blank"} rel={p.detailPath ? undefined : "noopener noreferrer"}>内容・申し込みを確認 →</a>
        </article>)}</div>
        {active.length === 0 ? <p className={styles.note}>次回の募集は活動一覧でお知らせします。</p> : <p className={styles.note}>会場・持ち物・支払い方法・申込確定の条件は、各活動の公式案内をご確認ください。</p>}
      </section>

      <RegionalSchoolCallout compact/>

      <section className={styles.section} aria-labelledby="home-learning-title">
        <div className={styles.heading}><div><p className={styles.label}>学ぶ・つながる</p><h2 id="home-learning-title">コートの外でも、成長を。</h2></div></div>
        <div className={styles.learning}>{learning.map(([title, body, href]) => <a href={href} key={href}><h3>{title}<span aria-hidden="true">↗</span></h3><p>{body}</p></a>)}</div>
      </section>

      <section className={styles.about} aria-labelledby="home-about-title"><div><p className={styles.label}>RBAの考え方</p><h2 id="home-about-title">勝つことも、その先の成長も。</h2><p>見る、選ぶ、実行する。自分で判断する力と、長く競技を続けるための身体を育てます。全国の現場と海外での交流を、日々の指導につなげています。</p><div className={styles.aboutLinks}><a className={styles.textLink} href="/ja/approach">育成方針 →</a><a className={styles.textLink} href="/ja/regions">全国の活動実績 →</a><a className={styles.textLink} href="/ja/contact">お問い合わせ →</a></div></div></section>
    </div>
  </SiteFrame></div>;
}
