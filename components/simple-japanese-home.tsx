import { TorstenRecordingOffer } from "./torsten-recording-offer";
import { RbaProjectDirectory } from "./rba-project-directory";
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
    description: "練習、出場機会、チーム選び。成長につながる選択肢を探す。",
    href: "/ja/families",
    action: "保護者向けの入口へ",
  },
  {
    id: "coach",
    number: "02 / COACHES",
    title: "指導者・チーム",
    description: "技術を試合へつなぐ。練習設計、講習、育成記事を学ぶ。",
    href: "/ja/coaches",
    action: "指導者の学びへ",
  },
  {
    id: "partner",
    number: "03 / PARTNERS",
    title: "企業・主催者",
    description: "社員研修・親子イベントの発注と、広告・協賛の相談を分けてご案内。",
    href: "/ja/business",
    action: "法人向けサービスを見る",
  },
] as const;

const steps = [
  {
    id: "online",
    label: "いつでも受付",
    title: "オンライン申込",
    copy: "教材・会員プランなど、24時間受付の公式サービス。",
    href: "/ja/24h",
    action: "受付中のサービスを見る",
  },
  {
    id: "join",
    label: "無料でつながる",
    title: "保護者のLINEコミュニティ",
    copy: "子どものバスケについて考える保護者同士の交流の入口。",
    href: "https://line.me/ti/g2/8GsWD4iOnyOuoNj60_s24ljg_--cQ7IFMjfDLw?utm_source=invitation&utm_medium=link_copy&utm_campaign=default",
    action: "保護者の部屋へ",
  },
  {
    id: "support",
    label: "個人で応援する",
    title: "月500円からの個人サポーター",
    copy: "月500円で活動を応援できます。月1,000円のプランでは、保護者・指導者向けの育成記事も読めます。",
    href: "/ja/support#individual",
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
              <p className={styles.heroEyebrow}>育成は、今いる場所だけで決まらない。</p>
              <h1 id="rba-home-title"><span>今のチームの外にも、</span><span>育つチャンスを。</span></h1>
              <p className={styles.intro}>Riot Basketball Academy（RBA）は、仙台を拠点に、子どもたちの育成と参加機会を広げる活動を行っています。所属チームでの活動を大切にしながら、全国のクリニック、3x3、国内外の交流、指導者の学びを通じて、自分で見て、考え、仲間とプレーする力を育てます。</p>
              <a className={styles.textLink} href="/ja/about">代表・西尾優人の経歴と指導方針を見る</a>
              <nav className={styles.actions} aria-label="RBA公式サイトの主な入口">
                <a className={styles.primary} data-growth-id="home-primary-events" href="#home-programmes">参加・開催予定を見る <span aria-hidden="true">↗</span></a>
                <a className={styles.secondary} data-growth-id="home-primary-role" href="#rba-for-you">選手・保護者・指導者の入口 <span aria-hidden="true">↗</span></a>
                <a className={styles.secondary} data-growth-id="home-revenue-services" href="/ja/services">教材・会員・料金を見る <span aria-hidden="true">↗</span></a>
              </nav>
              <p className={styles.heroQuickLinks}><a href="/ja/my-homecourt" data-growth-id="home-free-id">無料RBA ID・ログイン</a>　/　<a href="/ja/support" data-growth-id="home-support">応援・企業協賛</a>　/　<a href="/ja/book" data-growth-id="home-book-guide">申込・支払いの流れ</a></p>
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
            <a href="#rba-project-directory">03　RBAの事業</a>
            <a href="#home-host">04　地域で開催する</a>
          </nav>

          <section className={styles.section} id="rba-for-you" aria-labelledby="rba-for-you-title">
            <div className={styles.heading}>
              <div><p className={styles.label}>START HERE</p><h2 id="rba-for-you-title">あなたに合う、<span className={styles.headingEmphasis}>次の一歩。</span></h2></div>
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
            
          </section>

          <section className={styles.section} id="home-programmes" aria-labelledby="home-programme-title">
            <div className={styles.heading}>
              <div><p className={styles.label}>JOIN / 現在の活動</p><h2 id="home-programme-title">クリニック・キャンプの<span className={styles.headingEmphasis}>開催予定</span></h2></div>
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
                    <a data-growth-id={"home-programme-" + p.id} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>日程・参加費・申込方法を見る <span aria-hidden="true">↗</span></a>
                  </article>;
                })}
              </div>
            ) : <p className={styles.note}>次回の募集は開催予定のページでご案内します。</p>}
            <p className={styles.note}>申込受付・定員・会場・決済方法・キャンセル条件は、各活動の公式ページにある最新情報をご確認ください。</p>
          </section>

          <div id="home-partners" className={styles.sponsorAnchor} aria-label="RBA協賛・パートナー">
            <CorporateSupportStrip locale="ja" />
          </div>

          <TorstenRecordingOffer locale="ja"/>
          <RbaProjectDirectory locale="ja"/>
          <section className={styles.ageHub} aria-labelledby="home-age-categories" id="home-age-categories">
            <p className={styles.label}>PROGRAMMES / 年代と活動形態</p>
            <h2>年齢・活動から探す。</h2>
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
              <a href="/ja/sendai-school" className={styles.ageCard} data-growth-id="home-age-school">
                <span className={styles.ageEyebrow}>SENDAI</span><strong>スクール</strong>
                <span className={styles.ageDescription}>仙台の小・中学生向けスクール</span><span className={styles.ageAction}>体験・日程を見る →</span>
              </a>
            </nav>
          </section>
          <SendaiCommunity />

          <section className={styles.section} aria-labelledby="home-continue-title">
            <div className={styles.heading}>
              <div><p className={styles.label}>DISCOVER → CONNECT → CONTINUE</p><h2 id="home-continue-title">まず無料で知る。必要なら続ける。</h2></div>
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
          </section>

          <section className={styles.hostCallout} id="home-host" aria-labelledby="home-host-cta-title">
            <div className={styles.hostContent}>
              <p className={styles.hostKicker}>FOR TEAMS &amp; LOCAL ORGANISERS</p>
              <h2 id="home-host-cta-title">あなたの地域に、<span>RBAを。</span></h2>
              <p className={styles.hostDescription}>チーム訪問・地域合同クリニック・指導者研修。企業・学校・自治体との協働もご相談ください。</p>
              <ul className={styles.hostFormats} aria-label="連携の例"><li>クリニック開催</li><li>指導者研修</li><li>法人向け有料研修</li></ul>
            </div>
            <div className={styles.hostActions}>
              <a className={styles.hostPrimary} data-growth-id="home-host-request" href="/ja/clinic-request"><span>無料で開催相談する</span><span aria-hidden="true">↗</span></a>
              <p>相談・見積もりは無料。正式な開催・協賛内容は双方の合意後に確定します。</p>
            </div>
          </section>

          <nav className={styles.aboutLinks} aria-label="その他の公式情報">
            <a className={styles.textLink} href="/ja/about">RBAについて →</a>
            <a className={styles.textLink} href="/ja/approach">育成方針 →</a>
            <a className={styles.textLink} href="/ja/regions">活動地域 →</a>
            <a className={styles.textLink} href="/ja/okinawa#local-places">沖縄の活動・地域情報 →</a>
            <a className={styles.textLink} href="/ja/policies">規約・安全方針 →</a>
            <a className={styles.textLink} href="/ja/links">Instagram用リンク集 →</a>
          </nav>
        </div>
      </SiteFrame>
    </div>
  );
}
