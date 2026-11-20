import Image from "next/image";
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
    id: "read",
    label: "無料で読む",
    title: "RBA JOURNAL",
    copy: "研究・公式資料とRBAの解釈を分けて読む、無料の育成ライブラリー。",
    href: "/ja/journal",
    action: "育成記事を見る",
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
              <p className={styles.heroEyebrow}>育成は、今いる場所だけで決まらない。</p>
              <h1 id="rba-home-title"><span>今のチームの外にも、</span><span>育つチャンスを。</span></h1>
              <p className={styles.intro}>選手が挑戦し、指導者が学び、地域がつながる。<br />RBAは仙台から全国・アジアへ、次のコートをひらきます。</p>
              <nav className={styles.actions} aria-label="RBA公式サイトの主な入口">
                <a className={styles.primary} data-growth-id="home-primary-events" href="#home-programmes">開催予定を見る <span aria-hidden="true">↗</span></a>
                <a className={styles.secondary} data-growth-id="home-primary-role" href="#rba-for-you">自分に合う入口 <span aria-hidden="true">↗</span></a>
              </nav>
            </div>
            <div className={styles.heroBaseline}>
              <span>RBA / DEVELOPMENT BEFORE RESULTS</span>
              <span>SCROLL TO DISCOVER <span aria-hidden="true">↓</span></span>
            </div>
          </section>

          <nav className={styles.sectionNavigator} aria-label="このページの目次">
            <span className={styles.indexLabel}>INDEX</span>
            <a href="#home-founder">01　代表の自己紹介</a>
            <a href="#rba-for-you">02　目的から探す</a>
            <a href="#home-programmes">03　現在の活動</a>
            <a href="#home-business">04　法人向けサービス</a>
            <a href="#home-host">05　地域で開催する</a>
          </nav>

          <section className={styles.founderIntroduction} id="home-founder" aria-labelledby="home-founder-title">
            <div className={styles.founderIntroductionText}>
              <p className={styles.founderIntroductionKicker}>WHO LEADS RBA / FOUNDER PROFILE</p>
              <h2 id="home-founder-title">誰が、どんな考えで、子どもの育成に向き合っているのか。</h2>
              <p className={styles.founderIntroductionName}>西尾 優人 <span>MASATO NISHIO</span></p>
              <p className={styles.founderIntroductionPosition}>Riot Basketball Academy 創設者・代表 / Riot Training Base 代表</p>
              <p className={styles.founderIntroductionBody}>NSCA-CPT。選手として東北選抜・国体を経験し、ドイツでS&amp;C（ストレングス＆コンディショニング）の指導に携わった後、日本のクラブ指導の現場を経て、仙台から育成年代の活動を広げています。</p>
              <p className={styles.founderIntroductionBody}>試合の結果だけで子どもの可能性を決めない。判断力、身体の発達、休息、そして指導者の学びまでを含め、長く成長できる環境をつくることが私の仕事です。</p>
              <div className={styles.founderIntroductionFacts} aria-label="代表の経歴と専門分野"><span>NSCA-CPT</span><span>ドイツでのS&amp;C指導</span><span>育成年代のバスケットボール</span></div>
              <a className={styles.founderIntroductionLink} href="/ja/about" data-growth-id="home-founder-profile">代表の経歴・理念・活動を詳しく読む <span aria-hidden="true">↗</span></a>
            </div>
            <figure className={styles.founderIntroductionPortrait}>
              <Image src="/media/founder/masato-nishio-on-court.webp" width={874} height={860} sizes="(max-width: 760px) 100vw, 35vw" alt="RBA代表・西尾優人がバスケットボールの指導を行う様子" />
              <figcaption>MASATO NISHIO / THE COACH BEHIND RBA</figcaption>
            </figure>
          </section>

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
            <p className={styles.note}>スクール・クリニックへの参加、指導者の学習、有料の法人研修、広告・協賛は、それぞれ別の手続きです。</p>
          </section>

          <section className={styles.section} id="home-programmes" aria-labelledby="home-programme-title">
            <div className={styles.heading}>
              <div><p className={styles.label}>JOIN / 現在の活動</p><h2 id="home-programme-title">次のコートが、<span className={styles.headingEmphasis}>ここにある。</span></h2></div>
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

          <section className={styles.businessBridge} id="home-business" aria-labelledby="home-business-title">
            <div className={styles.businessBridgeText}>
              <p>RBA / RTB FOR BUSINESS</p>
              <h2 id="home-business-title">企業の研修も、地域のイベントも。</h2>
              <p>仙台市内の社員向け60分運動研修、親子向け運動イベント、法人研修事業者との有償共同提供をご案内します。協賛・広告とは別のサービスです。</p>
            </div>
            <div className={styles.businessBridgeActions}>
              <a href="/ja/business" data-growth-id="home-business-services">法人向けサービスと料金を見る <span aria-hidden="true">↗</span></a>
              <span>相談・初回見積無料／送信だけで契約・決済は発生しません。</span>
            </div>
          </section>

          <div id="home-partners" className={styles.sponsorAnchor} aria-label="RBA協賛・パートナー">
            <CorporateSupportStrip locale="ja" />
          </div>

          <section className={styles.nextStep} id="home-next-step" aria-labelledby="home-next-step-title">
            <div className={styles.nextStepIntro}>
              <p className={styles.label}>FIRST TIME HERE?</p>
              <h2 id="home-next-step-title">はじめてRBAを知った方へ。</h2>
              <p>活動内容が決まっていない方も、必要な情報だけを選べます。</p>
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
            <p className={styles.note}>指導者向けの学びは <a href="/ja/d-hub" data-growth-id="home-coach-dhub">D-HUB</a>、継続サポートは <a href="/ja/home-court" data-growth-id="home-homecourt">HOMECOURT</a> から確認できます。無料登録と有料プランは別です。 <a href="/ja/reading-guide" data-growth-id="home-reading-guide">JOURNALと公式noteの違いを見る →</a></p>
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
