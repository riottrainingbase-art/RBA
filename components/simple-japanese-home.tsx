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
    description: "練習や試合にもっと挑戦したい。子どもに合う育成環境を見つけたい方へ。",
    href: "/ja/families",
    action: "保護者向けの入口へ",
  },
  {
    id: "coach",
    number: "02 / COACHES",
    title: "指導者・チーム",
    description: "練習の組み立て方や指導方法を学び、選手の成長につなげたい方へ。",
    href: "/ja/coaches",
    action: "指導者の学びへ",
  },
  {
    id: "partner",
    number: "03 / PARTNERS",
    title: "企業・主催者",
    description: "社員研修、親子イベントの開催、子どもたちの活動を支える協賛をご検討の方へ。",
    href: "/ja/business",
    action: "法人向けサービスを見る",
  },
] as const;

const steps = [
  {
    id: "read",
    label: "無料で読む",
    title: "RBA JOURNAL",
    copy: "チーム選びや出場機会、練習の組み立て方について、まずは無料の記事から学べます。",
    href: "/ja/journal",
    action: "育成記事を見る",
  },
  {
    id: "join",
    label: "無料でつながる",
    title: "保護者のLINEコミュニティ",
    copy: "子どものバスケットボールについて、保護者同士で情報を共有できる場です。",
    href: "https://line.me/ti/g2/8GsWD4iOnyOuoNj60_s24ljg_--cQ7IFMjfDLw?utm_source=invitation&utm_medium=link_copy&utm_campaign=default",
    action: "保護者の部屋へ",
  },
  {
    id: "support",
    label: "個人で応援する",
    title: "月500円からの個人サポーター",
    copy: "月500円から、子どもたちの育成活動を応援できます。月1,000円のプランでは、保護者や指導者向けの育成記事もお読みいただけます。",
    href: "/ja/support#individual",
    action: "応援会員になる",
  },
] as const;

export async function SimpleJapaneseHome() {
  const active = programmes
    .filter(p => isProgrammeActive(p) && p.id !== "saga-winter-20261228")
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
              <p className={styles.heroEyebrow}>成長の機会は、今いる場所だけで決まらない。</p>
              <h1 id="rba-home-title"><span>今のチームのまま、</span><span>もっと広い世界へ。</span></h1>
              <p className={styles.intro}>Riot Basketball Academy（RBA）は、仙台を拠点に全国・アジアへ活動を広げる非営利のバスケットボール育成団体です。小中学生のクリニック、指導者の学び、国内外の交流を通じて、所属チームを変えずに成長できる機会を届けます。</p>
              <a className={styles.textLink} href="/ja/about">代表・西尾優人の経歴と指導方針を見る</a>
              <nav className={styles.actions} aria-label="RBA公式サイトの主な入口">
                <a className={styles.primary} data-growth-id="home-primary-events" href="#home-programmes">開催予定を見る <span aria-hidden="true">↗</span></a>
                <a className={styles.secondary} data-growth-id="home-primary-role" href="#rba-for-you">目的に合わせて探す <span aria-hidden="true">↗</span></a>
                <a className={styles.secondary} data-growth-id="home-revenue-services" href="/ja/services">サービス・料金を見る <span aria-hidden="true">↗</span></a>
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
            <a href="#home-programmes">02　開催・募集情報</a>
            <a href="#home-organisation">RBAの活動一覧</a>
            <a href="#home-business">03　法人向けサービス</a>
            <a href="#home-host">04　地域で開催する</a>
          </nav>

          <section className={styles.section} id="rba-for-you" aria-labelledby="rba-for-you-title">
            <div className={styles.heading}>
              <div><p className={styles.label}>START HERE</p><h2 id="rba-for-you-title">目的に合わせて、<span className={styles.headingEmphasis}>次の一歩。</span></h2></div>
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
            <p className={styles.note}>参加したい活動や、ご相談の内容に合わせてお進みください。</p>
          </section>

          <section className={styles.section} id="home-organisation" aria-labelledby="home-organisation-title">
            <div className={styles.heading}>
              <div><p className={styles.label}>OUR PROGRAMMES</p><h2 id="home-organisation-title">RBAの活動を知る。</h2></div>
            </div>
            <p className={styles.note}>RBAは、子どもたちの成長を支える非営利の育成活動です。それぞれの取り組みは役割が異なります。</p>
            <div className={styles.pathGrid}>
              <article className={styles.pathCard}><h3>RBA UNITED</h3><p>今のチームに所属したまま、個人で国内外の練習や交流試合に参加できるプロジェクト。</p><a href="/ja/united">国内・国際交流について →</a></article>
              <article className={styles.pathCard}><h3>BACKBONE</h3><p>3人制バスケットボール（3x3）に特化した育成・実践プログラム。</p></article>
              <article className={styles.pathCard}><h3>RBA CONNECT</h3><p>国内外のチーム同士をつなぎ、交流や合同練習の機会をつくる取り組み。</p><a href="/ja/connect">チーム間交流について →</a></article>
              <article className={styles.pathCard}><h3>RIZEHOPE</h3><p>選手が試合を通じて経験を積む機会をつくる大会事業。</p></article>
              <article className={styles.pathCard}><h3>D-HUB</h3><p>選手や指導者が継続して学び、成長できる育成・教育プログラム。</p><a href="/ja/d-hub">学びの場を見る →</a></article>
              <article className={styles.pathCard}><h3>MY HOME COURT</h3><p>RBAの活動情報や参加登録の窓口となる統合プラットフォーム。</p><a href="/ja/home-court">MY HOME COURTへ →</a></article>
            </div>
          </section>

          <section className={styles.section} id="home-programmes" aria-labelledby="home-programme-title">
            <div className={styles.heading}>
              <div><p className={styles.label}>JOIN / 開催・募集情報</p><h2 id="home-programme-title">クリニック・キャンプの<span className={styles.headingEmphasis}>開催予定</span></h2></div>
              <a className={styles.textLink} href="/ja/opportunities" data-growth-id="home-all-opportunities">開催予定をすべて見る →</a>
            </div>
            {programmes.some(p => p.id === "saga-winter-20261228" && isProgrammeActive(p)) && (
              <div className={styles.programmes}>
                <article id="saga-winter-20261228">
                  <div className={styles.programmeMeta}><p className={styles.date}>12月28日（月）9:00〜19:00・3部制</p><span className={styles.programmeCategory}>正式申込受付中</span></div>
                  <h3>佐賀・福岡 WINTER CLINIC</h3>
                  <p className={styles.place}>佐賀市内（会場確保済み・入金確認後に個別案内）</p>
                  <dl><div><dt>対象</dt><dd>小学1年〜中学3年・男女</dd></div><div><dt>費用</dt><dd>4,400円〜12,100円（税込・選手1名）</dd></div></dl>
                  {Date.now() < Date.parse("2026-12-21T00:00:00+09:00") && <p>12月20日（日）23:59までの早割で1,000円引き</p>}
                  <a href="/ja/saga#entry" data-growth-id="home-saga-winter-entry">12月28日の参加を申し込む ↗</a>
                </article>
              </div>
            )}
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

          <section className={styles.businessBridge} id="home-business" aria-labelledby="home-business-title">
            <div className={styles.businessBridgeText}>
              <p>RBA / RTB FOR BUSINESS</p>
              <h2 id="home-business-title">企業の研修も、地域のイベントも。</h2>
              <p>仙台市内での社員向け60分運動研修や親子向けイベント、法人研修事業者との有償連携をご案内します。協賛とは別にお申し込みいただけるサービスです。</p>
            </div>
            <div className={styles.businessBridgeActions}>
              <a href="/ja/business" data-growth-id="home-business-services">法人向けサービスと料金を見る <span aria-hidden="true">↗</span></a>
              <span>初回のご相談・お見積もりは無料です。お問い合わせだけで契約やお支払いが発生することはありません。</span>
            </div>
          </section>

          <div id="home-partners" className={styles.sponsorAnchor} aria-label="RBA協賛・パートナー">
            <CorporateSupportStrip locale="ja" />
          </div>

          <section className={styles.nextStep} id="home-next-step" aria-labelledby="home-next-step-title">
            <div className={styles.nextStepIntro}>
              <p className={styles.label}>FIRST TIME HERE?</p>
              <h2 id="home-next-step-title">はじめてRBAを知った方へ。</h2>
              <p>どの活動に参加するか決まっていない方も、まずは興味のある内容からご覧ください。</p>
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
              <h2 id="home-sendai-school">仙台で、日々の練習を深める。</h2>
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
              <div><p className={styles.label}>DISCOVER → CONNECT → CONTINUE</p><h2 id="home-continue-title">知ることから、応援することへ。</h2></div>
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
            <p className={styles.note}>指導者向けの学びは <a href="/ja/d-hub" data-growth-id="home-coach-dhub">D-HUB</a>、活動情報や参加登録は <a href="/ja/home-court" data-growth-id="home-homecourt">MY HOME COURT</a> へ。無料登録と有料プランは別のお手続きです。</p>
          </section>

          <section className={styles.hostCallout} id="home-host" aria-labelledby="home-host-cta-title">
            <div className={styles.hostContent}>
              <p className={styles.hostKicker}>FOR TEAMS &amp; LOCAL ORGANISERS</p>
              <h2 id="home-host-cta-title">あなたの地域に、<span>RBAを。</span></h2>
              <p className={styles.hostDescription}>チーム訪問・地域合同クリニック・指導者研修。企業、学校、自治体との連携についてもお気軽にご相談ください。</p>
              <ul className={styles.hostFormats} aria-label="連携の例"><li>クリニック開催</li><li>指導者研修</li><li>法人向け有料研修</li></ul>
            </div>
            <div className={styles.hostActions}>
              <a className={styles.hostPrimary} data-growth-id="home-host-request" href="/ja/clinic-request"><span>無料で開催相談する</span><span aria-hidden="true">↗</span></a>
              <a className={styles.hostSecondary} data-growth-id="home-business-details" href="/ja/business">法人研修・企業イベントについて →</a>
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
