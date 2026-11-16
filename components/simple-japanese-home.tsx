import { GrowthClickTracking } from "./growth-click-tracking";
import { CorporateSupportStrip } from "./corporate-support-strip";
import { SendaiCommunity } from "./sendai-community";
import { SiteFrame, localePath } from "./site-frame";
import { isProgrammeActive, programmes } from "./programme-data";
import { tr } from "./network-data";
import styles from "./simple-japanese-home.module.css";

const entryPoints = [
  {
    id: "family",
    number: "01 / PARENTS",
    title: "選手・保護者",
    description: "出場機会、練習量、チーム選び。子どもの成長を基準に、必要な情報へ。",
    href: "/ja/families",
    action: "保護者・選手向けの案内",
  },
  {
    id: "coach",
    number: "02 / COACHES",
    title: "指導者・チーム",
    description: "選手が見て、判断し、選べる練習へ。根拠と実践から指導を考える。",
    href: "/ja/coaches",
    action: "指導者の学びへ",
  },
  {
    id: "partner",
    number: "03 / PARTNERS",
    title: "企業・地域",
    description: "地域の子どもたちに、学びを届ける。開催や協賛の可能性を話す。",
    href: "/ja/partners",
    action: "連携・協賛の相談へ",
  },
] as const;

const steps = [
  {
    id: "read",
    label: "無料で読む",
    title: "RBA JOURNAL",
    copy: "チーム選び、出場機会、練習設計。最初は無料の記事から。",
    href: "/ja/journal",
    action: "育成記事を見る",
  },
  {
    id: "join",
    label: "無料でつながる",
    title: "保護者のLINEコミュニティ",
    copy: "子どもの育成を考える保護者が、安心して意見を交わせる場。",
    href: "https://line.me/ti/g2/8GsWD4iOnyOuoNj60_s24ljg_--cQ7IFMjfDLw?utm_source=invitation&utm_medium=link_copy&utm_campaign=default",
    action: "保護者の部屋へ",
  },
  {
    id: "support",
    label: "必要なら継続する",
    title: "月500円のRBA応援メンバー",
    copy: "活動を継続して応援したい方へ。内容と加入条件は公式の案内で確認。",
    href: "/ja/supporters",
    action: "会員案内を見る",
  },
] as const;

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

          <section className={styles.hero} aria-labelledby="rba-home-title">
            <div className={styles.heroTopline}>
              <p className={styles.label}>RIOT BASKETBALL ACADEMY <span aria-hidden="true">/</span> SENDAI · JAPAN · ASIA</p>
              <span className={styles.heroIssue}>PLAYER DEVELOPMENT / 2026</span>
            </div>
            <div className={styles.heroBody}>
              <p className={styles.heroEyebrow}>PLAYER FIRST. DEVELOPMENT ALWAYS.</p>
              <h1 id="rba-home-title"><span>子どもの可能性を、</span><span>所属先で決めない。</span></h1>
              <p className={styles.intro}>勝敗だけでは、成長を測れない。<br />自分で見て、考え、選ぶ経験を。仙台から全国、そしてアジアへ。</p>
              <nav className={styles.actions} aria-label="RBA公式サイトの主な入口">
                <a className={styles.primary} data-growth-id="home-primary-events" href="#home-programmes">クリニック・講習を探す <span aria-hidden="true">↗</span></a>
                <a className={styles.secondary} data-growth-id="home-primary-role" href="#rba-for-you">RBAの活動を知る <span aria-hidden="true">↗</span></a>
              </nav>
            </div>
            <div className={styles.heroBaseline}>
              <span>RBA / DEVELOPMENT BEFORE RESULTS</span>
              <span>SCROLL TO DISCOVER <span aria-hidden="true">↓</span></span>
            </div>
          </section>

          <nav className={styles.sectionNavigator} aria-label="このページの目次">
            <span className={styles.indexLabel}>INDEX</span>
            <a href="#rba-for-you">01　目的から探す</a>
            <a href="#home-programmes">02　現在の活動</a>
            <a href="#home-partners">03　協賛・パートナー</a>
            <a href="#home-host">04　地域で開催する</a>
          </nav>

          <section className={styles.section} id="rba-for-you" aria-labelledby="rba-for-you-title">
            <div className={styles.heading}>
              <div><p className={styles.label}>START HERE</p><h2 id="rba-for-you-title">立場から探す、<span className={styles.headingEmphasis}>学びの選択肢。</span></h2></div>
            </div>
            <nav className={styles.journeyGrid} aria-label="保護者・指導者・企業の目的別入口">
              {entryPoints.map(item => (
                <a className={styles.journeyCard} key={item.id} href={item.href} data-growth-id={"home-audience-" + item.id}>
                  <span className={styles.journeyNumber}>{item.number}</span>
                  <strong>{item.title}</strong>
                  <span className={styles.journeyDescription}>{item.description}</span>
                  <span className={styles.journeyAction}>{item.action} →</span>
                </a>
              ))}
            </nav>
            <p className={styles.note}>選手・保護者、指導者、企業・地域。それぞれに必要な案内をご用意しています。</p>
          </section>

          <section className={styles.section} id="home-programmes" aria-labelledby="home-programme-title">
            <div className={styles.heading}>
              <div><p className={styles.label}>JOIN / 現在の活動</p><h2 id="home-programme-title">各地のコートで、<span className={styles.headingEmphasis}>学びを重ねる。</span></h2></div>
              <a className={styles.textLink} href="/ja/opportunities" data-growth-id="home-all-opportunities">開催予定をすべて見る →</a>
            </div>
            {active.length ? (
              <div className={styles.programmes}>
                {active.map(p => {
                  const href = p.japaneseInfoPath || (p.detailPath ? localePath("ja", p.detailPath) : p.applicationUrl);
                  const external = /^https?:\/\//.test(href);
                  return <article key={p.id}>
                    <div className={styles.programmeMeta}><p className={styles.date}>{tr(p.date, "ja")}</p><span className={styles.programmeCategory}>{p.category === "COACH" ? "COACH LEARNING" : p.category === "TRAVEL" ? "CAMP / EXCHANGE" : "TRAINING"}</span></div>
                    <h3>{tr(p.title, "ja")}</h3>
                    <p className={styles.place}>{tr(p.place, "ja")}</p>
                    <dl>
                      <div><dt>対象</dt><dd>{tr(p.audience, "ja")}</dd></div>
                      <div><dt>費用</dt><dd>{tr(p.price, "ja")}</dd></div>
                    </dl>
                    <a data-growth-id={"home-programme-" + p.id} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>公式案内・参加条件を見る <span aria-hidden="true">↗</span></a>
                  </article>;
                })}
              </div>
            ) : <p className={styles.note}>次回の募集は開催予定のページでご案内します。</p>}
            <p className={styles.note}>申込受付・定員・会場・決済方法・キャンセル条件は、各活動の公式ページにある最新情報をご確認ください。</p>
          </section>


          <div id="home-partners" className={styles.sponsorAnchor} aria-label="RBA協賛・パートナー">
            <CorporateSupportStrip locale="ja" />
          </div>

          <section className={styles.nextStep} id="home-next-step" aria-labelledby="home-next-step-title">
            <div className={styles.nextStepIntro}>
              <p className={styles.label}>FIRST TIME HERE?</p>
              <h2 id="home-next-step-title">RBAを知る、最初のページ。</h2>
              <p>初めての方も、関心のあるテーマからご覧ください。</p>
            </div>
            <nav className={styles.nextStepLinks} aria-label="はじめての方向けの案内">
              <a href="/ja/families" data-growth-id="home-first-family"><span>01</span><strong>選手・保護者の方</strong><span aria-hidden="true">↗</span></a>
              <a href="/ja/sendai-school" data-growth-id="home-first-school"><span>02</span><strong>スクールを探す方</strong><span aria-hidden="true">↗</span></a>
              <a href="/ja/coaches" data-growth-id="home-first-coaches"><span>03</span><strong>指導者・チームの方</strong><span aria-hidden="true">↗</span></a>
              <a href="/ja/clinic-request" data-growth-id="home-first-hosts"><span>04</span><strong>地域の主催者の方</strong><span aria-hidden="true">↗</span></a>
            </nav>
          </section>

          <section className={styles.ageHub} aria-labelledby="home-age-categories" id="home-age-categories">
            <p className={styles.label}>PROGRAMMES / 年代と活動形態</p>
            <h2>年代に合う、育成の機会。</h2>
            <p className={styles.ageIntro}>スクール・クリニック・U15クラブは別の活動です。対象や参加条件を確認してお選びください。</p>
            <nav className={styles.ageGrid} aria-label="年代とU15チームの案内">
              <a href="/ja/u12" className={styles.ageCard} data-growth-id="home-age-u12">
                <span className={styles.ageEyebrow}>ELEMENTARY</span><strong>U12</strong>
                <span className={styles.ageDescription}>小学生向け活動</span><span className={styles.ageAction}>U12を見る →</span>
              </a>
              <a href="/ja/u15" className={styles.ageCard} data-growth-id="home-age-u15">
                <span className={styles.ageEyebrow}>JUNIOR HIGH</span><strong>U15</strong>
                <span className={styles.ageDescription}>中学生年代の育成</span><span className={styles.ageAction}>U15を見る →</span>
              </a>
              <a href="/ja/gream" className={styles.ageCard} data-growth-id="home-age-gream">
                <span className={styles.ageEyebrow}>U15 TEAM</span><strong>GREAM</strong>
                <span className={styles.ageDescription}>地域の育成クラブ</span><span className={styles.ageAction}>GREAMを見る →</span>
              </a>
            </nav>
          </section>
          <SendaiCommunity />

          <section className={styles.schoolSpotlight} aria-labelledby="home-sendai-school">
            <div className={styles.schoolSpotlightIntro}>
              <p className={styles.label}>SENDAI / 太白区</p>
              <h2 id="home-sendai-school">仙台の日常に、質の高い育成を。</h2>
              <p>小学生・中学生向けのスクールと、GREAM仙台のU15クラブを運営しています。スクールとクラブは活動形態が異なります。</p>
              <div className={styles.schoolFacts}><span>U15スクール｜木曜・月3回</span><span>U12スクール｜日程調整中</span></div>
              <small>体験日・費用・受け入れ状況は各公式案内を優先してください。</small>
            </div>
            <div className={styles.schoolSpotlightActions}>
              <a href="/ja/sendai-school" data-growth-id="home-school-consultation">スクール体験を相談する →</a>
              <a href="/ja/gream-sendai" data-growth-id="home-sendai-gream">GREAM仙台 U15を見る →</a>
            </div>
          </section>

          <section className={styles.section} aria-labelledby="home-continue-title">
            <div className={styles.heading}>
              <div><p className={styles.label}>DISCOVER → CONNECT → CONTINUE</p><h2 id="home-continue-title">知ることから、育成を変える。</h2></div>
            </div>
            <div className={styles.pathGrid}>
              {steps.map((item, index) => {
                const external = item.href.startsWith("http");
                return <article className={styles.pathCard} key={item.id}>
                  <span className={styles.pathLabel}>{String(index + 1).padStart(2, "0")} / {item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  <a data-growth-id={"home-path-" + item.id} href={item.href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>{item.action} →</a>
                </article>;
              })}
            </div>
            <p className={styles.note}>指導者向けの学びは <a href="/ja/d-hub" data-growth-id="home-coach-dhub">D-HUB</a>、継続サポートは <a href="/ja/home-court" data-growth-id="home-homecourt">HOMECOURT</a> から確認できます。無料登録と有料プランは別です。</p>
          </section>

          <section className={styles.hostCallout} id="home-host" aria-labelledby="home-host-cta-title">
            <div className={styles.hostContent}>
              <p className={styles.hostKicker}>FOR TEAMS &amp; LOCAL ORGANISERS</p>
              <h2 id="home-host-cta-title">あなたの地域に、<span>RBAを。</span></h2>
              <p className={styles.hostDescription}>チーム訪問・地域合同クリニック・指導者研修。企業・学校・自治体との協働もご相談ください。</p>
              <ul className={styles.hostFormats} aria-label="連携の例"><li>クリニック開催</li><li>指導者研修</li><li>企業協賛</li></ul>
            </div>
            <div className={styles.hostActions}>
              <a className={styles.hostPrimary} data-growth-id="home-host-request" href="/ja/clinic-request"><span>無料で開催相談する</span><span aria-hidden="true">↗</span></a>
              <a className={styles.hostSecondary} data-growth-id="home-partner-details" href="/ja/partners">協賛・法人連携について →</a>
              <p>相談・見積もりは無料。正式な開催・協賛内容は双方の合意後に確定します。</p>
            </div>
          </section>

          <nav className={styles.aboutLinks} aria-label="その他の公式情報">
            <a className={styles.textLink} href="/ja/about">RBAについて →</a>
            <a className={styles.textLink} href="/ja/approach">育成方針 →</a>
            <a className={styles.textLink} href="/ja/regions">活動地域 →</a>
            <a className={styles.textLink} href="/ja/okinawa#local-places">沖縄の活動・地域情報 →</a>
            <a className={styles.textLink} href="/ja/policies">規約・安全方針 →</a>
            <a className={styles.textLink} href="/ja/store" data-growth-id="home-performance-tee">RBA公式ウェア →</a>
            <a className={styles.textLink} href="/ja/links">Instagram用リンク集 →</a>
          </nav>
        </div>
      </SiteFrame>
    </div>
  );
}
