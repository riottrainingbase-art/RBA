import Image from "next/image";
import { GrowthClickTracking } from "./growth-click-tracking";
import { CorporateSupportStrip } from "./corporate-support-strip";
import { SendaiCommunity } from "./sendai-community";
import { SiteFrame, localePath } from "./site-frame";
import { isProgrammeActive, programmeById, programmes } from "./programme-data";
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
    title: "企業・地域",
    description: "次の育成環境をつくる。開催支援や協賛・連携を相談する。",
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
              <p className={styles.label}>RIOT BASKETBALL ACADEMY / SENDAI · JAPAN · ASIA</p>
            </div>
            <div className={styles.heroBody}>
              <p className={styles.heroEyebrow}>RBA UNITED / DEVELOPMENT BEFORE RESULTS</p>
              <h1 id="rba-home-title"><span>今のチームのまま、</span><span>世界へ。</span></h1>
              <p className={styles.intro}>RBAは仙台を拠点とする非営利のバスケットボール育成活動です。全国クリニック、国際交流、指導者教育を通して、子どもたちの成長機会を広げます。</p>
              <nav className={styles.actions} aria-label="RBA公式サイトの主な入口">
                <a className={styles.primary} data-growth-id="home-primary-events" href="#home-programmes">クリニック・参加する <span aria-hidden="true">↗</span></a>
                <a className={styles.secondary} data-growth-id="home-primary-support" href="#home-supporters">月500円から応援・企業協賛 <span aria-hidden="true">↗</span></a>
                <a className={styles.secondary} data-growth-id="home-primary-founder" href="#home-organisation">RBAとは・代表紹介 <span aria-hidden="true">↗</span></a>
              </nav>
            </div>
            <div className={styles.heroBaseline}><span>Different Teams. Different Countries. One Future.</span></div>
          </section>
          <section className={styles.homeQuick} id="home-organisation" aria-labelledby="home-organisation-title">
            <div className={styles.quickHeading}><p className={styles.quickKicker}>01 / ABOUT RBA</p><h2 id="home-organisation-title">何をしている団体？</h2><p>子どもと指導者が、所属・地域・国を越えて学び続けられる環境をつくります。</p></div>
            <div className={styles.orgGrid}>
              {[
                ["クリニック・キャンプ","全国の育成年代向けの練習・ゲーム・判断を学ぶ機会","/ja/opportunities"],
                ["RBA UNITED","所属を変えず、個人で国内・国際交流に参加","/ja/united"],
                ["BACKBONE 3x3","3人制バスケに特化した育成・実践","/ja/opportunities"],
                ["RBA CONNECT","チーム・団体同士の交流をつなぐ","/ja/connect"],
                ["RIZEHOPE","育成年代の大会・競技機会","/ja/opportunities"],
                ["D-HUB","指導者・保護者・選手の継続的な育成教育","/ja/d-hub"],
                ["MY HOME COURT","活動・学び・参加履歴をつなぐ統合プラットフォーム","/ja/my-homecourt"],
                ["仙台スクール・GREAM","地域での日常的な育成・クラブ活動","/ja/sendai-school"],
              ].map(([title,desc,href])=><a key={title} href={href} className={styles.orgCard}><strong>{title}</strong><span>{desc}</span><span aria-hidden="true">→</span></a>)}
            </div>
            <div className={styles.founderCard}>
              <Image src="/media/founder/masato-nishio-on-court.webp" alt="コートで指導するRBA代表 西尾優人" width={874} height={860} sizes="(max-width: 650px) 90vw, 240px"/>
              <div><p className={styles.quickKicker}>FOUNDER / 代表</p><h3>西尾 優人</h3><p>Riot Basketball Academy 創設者・代表。仙台を拠点に選手育成、身体づくり、指導者教育をつなぎ、全国・アジアで育成機会をつくります。</p><a className={styles.quickLink} href="/ja/about#founder">代表紹介・ミッションを読む →</a><a className={styles.quickLink} href="/ja/about/governance">団体概要・会則 →</a></div>
            </div>
          </section>
          <section className={styles.homeQuick} id="home-supporters" aria-labelledby="home-supporters-title">
            <div className={styles.quickHeading}><p className={styles.quickKicker}>02 / SUPPORT RBA</p><h2 id="home-supporters-title">子どもたちの次の挑戦を支える。</h2><p>個人の応援会員・企業協賛。無理のない方法で、育成機会を一緒に広げませんか。</p></div>
            <div className={styles.supportGrid}>
              <article><span>個人 / 応援メンバー</span><strong>月500円</strong><p>活動を継続して応援する入口。</p><a href="/ja/supporters#supporters-500" data-growth-id="home-support-500">月500円プランを見る →</a></article>
              <article><span>個人 / 育成記事プラン</span><strong>月1,000円</strong><p>育成を深く学びながら活動を応援。</p><a href="/ja/supporters#supporters-1000" data-growth-id="home-support-1000">月1,000円プランを見る →</a></article>
              <article><span>企業 / 協賛・連携</span><strong>企業パートナー</strong><p>参加機会・安全な運営・国際交流を支援。</p><a href="/ja/partners" data-growth-id="home-support-company">協賛・パートナーを相談 →</a></article>
            </div><p className={styles.note}>個人会員はnoteの公式プランです。料金・特典・更新条件は申込画面を確認してください。クリニック参加費は別です。</p>
          </section>

          <nav className={styles.sectionNavigator} aria-label="このページの目次">
            <span className={styles.indexLabel}>INDEX</span>
            <a href="#rba-for-you" data-growth-id="home-primary-role">01　目的から探す</a>
            <a href="#home-programmes">02　現在の活動</a>
            <a href="#home-supporters">03　応援・協賛</a>
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
            <p className={styles.note}>スクール・クリニックへの参加、指導者の学習、企業協賛は、それぞれ別の手続きです。<a href="/ja/services" data-growth-id="home-revenue-services">公式サービス一覧と料金の比較を見る →</a></p>
          </section>

          <section className={styles.section} id="home-programmes" aria-labelledby="home-programme-title">
            <div className={styles.heading}>
              <div><p className={styles.label}>JOIN / 現在の活動</p><h2 id="home-programme-title">次のコートが、<span className={styles.headingEmphasis}>ここにある。</span></h2></div>
              <a className={styles.textLink} href="/ja/opportunities" data-growth-id="home-all-opportunities">開催予定をすべて見る →</a>
            </div>
            <div className={styles.programmes}>
              {isProgrammeActive(programmeById["saga-winter-20261228"])&&<article id="saga-winter-20261228">
                <div className={styles.programmeMeta}><p className={styles.date}>2026.12.28 MON｜9:00〜19:00（3部制）</p><span className={styles.programmeCategory}>12月28日 開催決定</span></div>
                <h3>佐賀・福岡 WINTER CLINIC</h3><p className={styles.place}>佐賀市内／会場詳細は受付確認後に案内</p><dl><div><dt>対象</dt><dd>小学1年〜中学3年・男女</dd></div><div><dt>費用</dt><dd>4,400円〜12,100円（税込・選手1名）</dd></div></dl>
                <a href="/ja/saga#entry" data-growth-id="home-saga-winter-entry">12月28日 申込・事前決済へ ↗</a>
              </article>}
              <article id="chiba-development-camp-2027">
                <div className={styles.programmeMeta}><p className={styles.date}>2027.03.27–28</p><span className={styles.programmeCategory}>申込受付</span></div><h3>千葉育成キャンプ｜U12・U15</h3><p className={styles.place}>千葉県神崎町</p><dl><div><dt>対象</dt><dd>国内・海外選手</dd></div><div><dt>費用</dt><dd>2日24,200円／1日14,300円（税込）</dd></div></dl><a href="/ja/events/chiba-development-camp-2027">詳細・申込へ ↗</a>
              </article>
              <article id="nikaho-elementary-2027">
                <div className={styles.programmeMeta}>
                  <p className={styles.date}>2027.04.11 SUN｜13:30〜16:30</p>
                  <span className={styles.programmeCategory}>開催予定・小学生のみ</span>
                </div>
                <h3>にかほ育成クリニック</h3>
                <p className={styles.place}>秋田県にかほ市／会場調整中</p>
                <dl>
                  <div><dt>対象</dt><dd>小学生のみ（男女）</dd></div>
                  <div><dt>参加費</dt><dd>調整中・正式案内前</dd></div>
                </dl>
                <a href="/ja/events/nikaho-clinic-2027" data-growth-id="home-nikaho-elementary-2027">開催概要・協会への問い合わせ案内を見る ↗</a>
              </article>
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
            <a className={styles.textLink} href="/ja/updates">最新情報・運営状況 →</a>
            <a className={styles.textLink} href="/ja/about">RBAについて →</a>
            <a className={styles.textLink} href="/ja/about/governance">団体概要・会則 →</a>
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
