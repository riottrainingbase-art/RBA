import { GrowthClickTracking } from "./growth-click-tracking";
import { MiyagiUnitedEntry } from "./united-miyagi";
import { CorporateSupportStrip } from "./corporate-support-strip";
import { SiteFrame, localePath } from "./site-frame";
import { isProgrammeActive, programmes } from "./programme-data";
import { tr } from "./network-data";
import styles from "./simple-japanese-home.module.css";

export async function SimpleJapaneseHome() {
  const active = programmes
    .filter(p => isProgrammeActive(p))
    .sort((a, b) => Number(Boolean(a.ongoing)) - Number(Boolean(b.ongoing)) || a.startDate.localeCompare(b.startDate))
    .slice(0, 3);

  return (
    <div className={styles.page} lang="ja">
      <SiteFrame locale="ja" compact>
        <div className={styles.container}>
          <GrowthClickTracking />


          <header className={styles.heading}>
            <div>
              <p className={styles.label}>Riot Basketball Academy</p>
              <h1>開催予定・参加申込</h1>
              <p>全国のクリニック、キャンプ、国際交流の日程と参加費をご案内します。</p>
            </div>
          </header>
          <section className={styles.section} id="home-programmes" aria-label="直近の開催予定">
            {active.length ? (
              <div className={styles.programmes}>
                {active.map(p => {
                  const href = p.japaneseInfoPath || (p.detailPath ? localePath("ja", p.detailPath) : p.applicationUrl);
                  const external = /^https?:\/\//.test(href);
                  return <article key={p.id}>
                    <div className={styles.programmeMeta}><p className={styles.date}>{tr(p.date, "ja")}</p><span className={styles.programmeCategory}>{p.id === "okinawa-december-camp" ? "仮予約受付" : "開催予定"}</span></div>
                    <h3>{tr(p.title, "ja")}</h3>
                    <p className={styles.place}>{tr(p.place, "ja")}</p>
                    <dl>
                      <div><dt>対象</dt><dd>{tr(p.audience, "ja")}</dd></div>
                      <div><dt>費用</dt><dd>{tr(p.price, "ja")}</dd></div>
                    </dl>
                    <a data-growth-id={"home-programme-" + p.id} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>日程・参加費・申込方法を見る <span aria-hidden="true">↗</span></a>
                  </article>;
                })}
              </div>
            ) : <p className={styles.note}>次回の募集は開催予定のページでご案内します。</p>}

            <a className={styles.textLink} href="/ja/opportunities">開催予定をすべて見る →</a>
            <MiyagiUnitedEntry/>
            <p><a href="/ja/events/chiba-development-camp-2027">3月27・28日｜千葉県神崎町｜U12・U15育成キャンプ</a></p>
            <p><a href="/ja/events/nikaho-clinic-2027">4月11日｜秋田県にかほ市｜小学生クリニック（会場・参加費調整中）</a></p>
          </section>

          <section className={styles.schoolSpotlight} id="rba-for-you" aria-labelledby="home-sendai-school">
            <div className={styles.schoolSpotlightIntro}>
              <h2 id="home-sendai-school">仙台のスクール・チーム</h2>
              <p>太白区のU15スクールは木曜・月3回。U12スクールは日程調整中です。</p>
            </div>
            <nav className={styles.schoolSpotlightActions} aria-label="仙台の体験・年代別案内">
              <a href="/ja/sendai-school">スクールの日程・体験</a>
              <a href="/ja/gream-sendai">GREAM仙台 U15の活動・参加相談</a>
              <a href="/ja/gream">各地域のGREAMクラブ</a>
              <a href="/ja/u12">小学生の活動</a>
              <a href="/ja/u15">中学生の活動</a>
            </nav>
          </section>

          <section className={styles.section}>
            <h2>指導者向け講習</h2>
            <nav className={styles.aboutLinks} aria-label="講習・教材">
              <a href="/ja/events/torsten-loibl-online-clinic">トーステン・ロイブル氏の講習・録画案内</a>
              <a href="/ja/d-hub/coaches">D-HUB COACH LABの内容・料金</a>
              <a href="/ja/services" data-growth-id="home-revenue-services">教材・会員サービスの料金</a>
              <a href="/ja/journal">育成記事を読む</a>
            </nav>
          </section>

          <section className={styles.section} id="home-host">
            <h2>RBAについて</h2>
            <p>仙台を拠点に、小中学生の練習会、指導者講習、海外チームとの交流試合を企画しています。</p>
            <nav className={styles.aboutLinks} aria-label="団体・開催相談">
              <a href="/ja/about">代表・西尾優人の経歴と指導方針</a>
              <a href="/ja/clinic-request">地域でのクリニック開催を相談する</a>
              <a href="/ja/international/japan-experience">海外チームの来日相談</a>
              <a href="/ja/store" data-growth-id="home-performance-tee">RBA公式ウェア</a>
              <a href="/ja/updates">開催状況・運営からのお知らせ</a>
              <a href="/ja/about/governance">運営体制・会則</a>
            </nav>
          </section>
          <div id="home-partners" className={styles.sponsorAnchor}>
            <CorporateSupportStrip locale="ja" directoryOnly />
          </div>
        </div>
      </SiteFrame>
    </div>
  );
}
