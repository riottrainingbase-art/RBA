import { OkinawaCampGrowthPanel } from "./okinawa-camp-growth-panel";
import { CorporateSupportStrip } from "./corporate-support-strip";
import { GrowthClickTracking } from "./growth-click-tracking";
import { SiteFrame, localePath } from "./site-frame";
import { isProgrammeActive, programmes } from "./programme-data";
import { tr } from "./network-data";
import styles from "./simple-japanese-home-refresh.module.css";

const entryPoints = [
  {
    id: "players",
    number: "01",
    label: "選手・保護者",
    title: "クリニック・キャンプに参加",
    body: "日程・対象年代・費用を見て、参加できる活動を探します。",
    href: "#activities",
    action: "募集中の活動を見る",
  },
  {
    id: "gream",
    number: "02",
    label: "U15育成チーム",
    title: "GREAMを探す",
    body: "仙台・秋田・沖縄。継続して活動するチームの情報はこちら。",
    href: "#gream",
    action: "地域のチームを見る",
  },
  {
    id: "coaches",
    number: "03",
    label: "指導者・スタッフ",
    title: "指導と育成を学ぶ",
    body: "オンライン講習、D-HUB、育成記事から学びを深めます。",
    href: "#coach-learning",
    action: "指導者向けの学びへ",
  },
  {
    id: "partners",
    number: "04",
    label: "企業・主催者・団体",
    title: "開催・協賛を相談",
    body: "地域でのクリニック開催、チーム支援、企業協賛のご相談。",
    href: "#partner",
    action: "開催・協賛の方法を見る",
  },
] as const;

const greamRegions = [
  {
    name: "GREAM SENDAI",
    location: "宮城・仙台",
    detail: "U15育成チーム。体験・入団について相談できます。",
    href: "/ja/gream-sendai",
  },
  {
    name: "DSM GREAM AKITA",
    location: "秋田",
    detail: "秋田エリアのチーム活動・体験情報を確認。",
    href: "/ja/gream-akita",
  },
  {
    name: "GREAM OKINAWA",
    location: "沖縄",
    detail: "地域の活動案内と、新体制・指導者募集について。",
    href: "/ja/gream-okinawa",
  },
] as const;

export function SimpleJapaneseHome() {
  const active = programmes
    .filter((programme) => programme.id !== "torsten" && isProgrammeActive(programme))
    .sort((a, b) =>
      Number(Boolean(a.ongoing)) - Number(Boolean(b.ongoing)) ||
      a.startDate.localeCompare(b.startDate)
    )
    .slice(0, 4);

  return (
    <div className={styles.page} lang="ja">
      <SiteFrame locale="ja" compact>
        <GrowthClickTracking />
        <div className={styles.container}>
          <section className={styles.hero} aria-labelledby="rba-home-title">
            <p className={styles.eyebrow}>RIOT BASKETBALL ACADEMY / 仙台から全国・アジアへ</p>
            <h1 id="rba-home-title">バスケの次の一歩を、<br />ここから。</h1>
            <p className={styles.lead}>
              RBAは選手・保護者・指導者のために、クリニック、育成チーム、学び、国際交流の機会をつくっています。
              <br className={styles.desktopOnly} />今、探していることからお選びください。
            </p>
            <div className={styles.heroActions}>
              <a className={styles.buttonPrimary} href="#activities" data-growth-id="home-clear-activities">募集中の活動を見る <span aria-hidden="true">→</span></a>
              <a className={styles.buttonOutline} href="#coach-learning" data-growth-id="home-clear-coaches">11/25 指導者講習 <span aria-hidden="true">→</span></a>
            </div>
          </section>

          <section className={styles.section} aria-labelledby="home-choose-heading">
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>START HERE / 目的から選ぶ</p>
              <h2 id="home-choose-heading">何をお探しですか？</h2>
              <p>入口は4つ。迷ったら「募集中の活動」から。</p>
            </div>
            <nav className={styles.entryGrid} aria-label="RBAの4つの目的別入口">
              {entryPoints.map((entry) => (
                <a className={styles.entryCard} key={entry.id} href={entry.href} data-growth-id={"home-clear-entry-" + entry.id}>
                  <span className={styles.entryMeta}><span>{entry.number}</span>{entry.label}</span>
                  <strong>{entry.title}</strong>
                  <span className={styles.entryDescription}>{entry.body}</span>
                  <span className={styles.entryAction}>{entry.action} <span aria-hidden="true">→</span></span>
                </a>
              ))}
            </nav>
            <nav className={styles.quickAges} aria-label="年代から探す">
              <span>年代から探す</span>
              <a href="/ja/u12" data-growth-id="home-clear-u12">小学生（U12） →</a>
              <a href="/ja/u15" data-growth-id="home-clear-u15">中学生（U15） →</a>
              <a href="/ja/gream" data-growth-id="home-clear-gream-all">GREAM U15チーム →</a>
            </nav>
          </section>

          <section className={styles.featured} id="coach-learning" aria-labelledby="home-torsten-title">
            <div className={styles.featuredContent}>
              <p className={styles.featuredEyebrow}>指導者向けオンライン講習 / 11月25日（水）</p>
              <h2 id="home-torsten-title">練習のシュートを、<br />試合で使える力へ。</h2>
              <p>トーステン・ロイブル氏と、シュート技術・スペーシング・オフボール・試合での判断をつなぐ育成を考えます。</p>
              <div className={styles.facts} aria-label="講習の日時と料金">
                <div><span>日時</span><strong>11/25（水）20:00〜21:30</strong></div>
                <div><span>形式</span><strong>Zoom／英語講義＋日本語逐次通訳</strong></div>
                <div><span>LIVE</span><strong>3,300円（税込）</strong></div>
                <div><span>録画30日</span><strong>4,400円（税込・別申込）</strong></div>
              </div>
              <a className={styles.buttonLight} href="/ja/events/torsten-loibl-online-clinic" data-growth-id="home-clear-torsten-details">
                内容・料金を確認して申し込む <span aria-hidden="true">→</span>
              </a>
              <p className={styles.featuredNote}>
                国内の申込は「詳細ページ → Googleフォーム → Square決済」。フォーム送信だけでは支払完了になりません。
                LIVEに録画視聴は含まれません。RBA独立主催・公認資格講習ではありません。
              </p>
            </div>
          </section>

          <section className={styles.section} id="activities" aria-labelledby="home-events-heading">
            <div className={styles.sectionHeadRow}>
              <div className={styles.sectionHead}>
                <p className={styles.eyebrow}>JOIN / 募集中</p>
                <h2 id="home-events-heading">今、参加できる活動</h2>
                <p>気になる活動を選ぶと、日程・料金・申込方法を確認できます。</p>
              </div>
              <a className={styles.quietLink} href="/ja/opportunities" data-growth-id="home-clear-all-activities">すべての活動・日程を見る →</a>
            </div>
            {active.length > 0 ? (
              <div className={styles.activityGrid}>
                {active.map((programme) => {
                  const href = programme.japaneseInfoPath || (
                    programme.detailPath ? localePath("ja", programme.detailPath) : programme.applicationUrl
                  );
                  const external = /^https?:\/\//.test(href);
                  return (
                    <article className={styles.activityCard} key={programme.id}>
                      <p className={styles.activityDate}>{tr(programme.date, "ja")}</p>
                      <h3>{tr(programme.title, "ja")}</h3>
                      <p className={styles.activityPlace}>{tr(programme.place, "ja")}</p>
                      <dl>
                        <div><dt>対象</dt><dd>{tr(programme.audience, "ja")}</dd></div>
                        <div><dt>料金</dt><dd>{tr(programme.price, "ja")}</dd></div>
                      </dl>
                      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} data-growth-id={"home-clear-activity-" + programme.id}>
                        詳細・申込方法を見る <span aria-hidden="true">→</span>
                      </a>
                    </article>
                  );
                })}
              </div>
            ) : <p className={styles.empty}>新しい募集は活動一覧でお知らせします。</p>}
            <p className={styles.smallNote}>開催・会場・支払条件は各活動の詳細ページを優先してください。問い合わせだけで参加は確定しません。</p>
            <details className={styles.optionalCamp}>
              <summary>沖縄国際キャンプの参加・宿泊について相談する <span aria-hidden="true">＋</span></summary>
              <OkinawaCampGrowthPanel placement="home" />
            </details>
          </section>

          <section className={styles.section} id="gream" aria-labelledby="home-gream-title">
            <div className={styles.sectionHeadRow}>
              <div className={styles.sectionHead}>
                <p className={styles.eyebrow}>GREAM / U15 DEVELOPMENT TEAMS</p>
                <h2 id="home-gream-title">U15チームを探す</h2>
                <p>GREAMはU15の育成チームプロジェクトです。単発クリニックやスクールとは別にご案内します。</p>
              </div>
              <a className={styles.quietLink} href="/ja/gream" data-growth-id="home-clear-gream-overview">GREAMについて →</a>
            </div>
            <div className={styles.regionGrid}>
              {greamRegions.map((region) => (
                <a className={styles.regionCard} href={region.href} key={region.name} data-growth-id={"home-clear-" + region.name.toLowerCase().replaceAll(" ", "-")}>
                  <span>{region.location}</span>
                  <strong>{region.name}</strong>
                  <p>{region.detail}</p>
                  <span className={styles.regionAction}>活動・体験情報を見る →</span>
                </a>
              ))}
            </div>
          </section>

          <section className={styles.partners} id="partner" aria-labelledby="home-partner-heading">
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>PARTNER / 地域の育成を支える</p>
              <h2 id="home-partner-heading">RBAと一緒に、育成機会をつくる。</h2>
              <p>地域で開催したい方、企業として子どもの育成を応援したい方へ。</p>
            </div>
            <div className={styles.partnerLinks}>
              <a href="/ja/clinic-request" data-growth-id="home-clear-clinic-request">クリニックの開催を相談する →</a>
              <a href="/ja/partners" data-growth-id="home-clear-partners">企業協賛・連携の方法を見る →</a>
            </div>
            <CorporateSupportStrip locale="ja" />
          </section>

          <section className={styles.more} aria-label="RBAの学びとその他の案内">
            <a href="/ja/journal" data-growth-id="home-clear-journal"><strong>育成記事を読む</strong><span>RBA JOURNALで無料の育成記事を探す →</span></a>
            <a href="/ja/d-hub" data-growth-id="home-clear-dhub"><strong>指導者として学び続ける</strong><span>D-HUBの学習コンテンツを見る →</span></a>
            <a href="/ja/international" data-growth-id="home-clear-international"><strong>海外交流を相談する</strong><span>Japan × Asiaのチーム・指導者交流へ →</span></a>
            <a href="/ja/about" data-growth-id="home-clear-about"><strong>RBAについて知る</strong><span>育成方針・活動内容を確認 →</span></a>
          </section>
        </div>
      </SiteFrame>
    </div>
  );
}
