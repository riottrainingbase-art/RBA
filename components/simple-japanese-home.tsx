import Image from "next/image";
import { TorstenRecordingOffer } from "./torsten-recording-offer";
import { RbaProjectDirectory } from "./rba-project-directory";
import { GrowthClickTracking } from "./growth-click-tracking";
import { CorporateSupportStrip } from "./corporate-support-strip";
import { SendaiCommunity } from "./sendai-community";
import { SiteFrame, localePath } from "./site-frame";
import { isProgrammeActive, programmes } from "./programme-data";
import { tr } from "./network-data";
import styles from "./simple-japanese-home.module.css";

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
              <h1 id="rba-home-title"><span>今のチームの外にも、</span><span>育つチャンスを。</span></h1>
              <p className={styles.intro}>仙台を拠点に、全国のクリニック、3x3、国内外の交流を通じて、選手が自分で見て、考え、仲間とプレーする力を育てます。</p>
              <nav className={styles.actions} aria-label="RBA公式サイトの主な入口">
                <a className={styles.primary} data-growth-id="home-primary-events" href="#home-programmes">参加・開催予定を見る <span aria-hidden="true">↗</span></a>
                <a className={styles.secondary} data-growth-id="home-primary-role" href="#rba-project-directory">事業一覧を見る <span aria-hidden="true">↗</span></a>
                <a className={styles.secondary} data-growth-id="home-revenue-services" href="/ja/my-homecourt">会員ページに入る <span aria-hidden="true">↗</span></a>
              </nav>

            </div>
            <div className={styles.heroBaseline}>
              <span>RBA / DEVELOPMENT BEFORE RESULTS</span>
            </div>
          </section>

          <a className={styles.founderFeature} href="/ja/about#founder">
            <Image src="/media/founder/masato-nishio-on-court.webp" alt="コートに立つRBA代表・西尾優人" width={874} height={860} sizes="(max-width: 600px) 38vw, 250px" />
            <div>
              <p>RBA代表・仙台</p>
              <h2>西尾 優人</h2>
              <span>経歴と育成への思いを見る →</span>
            </div>
          </a>



          <nav id="rba-for-you" className={styles.aboutLinks} aria-label="立場から探す">
            <a className={styles.textLink} href="/ja/families">選手・保護者 →</a>
            <a className={styles.textLink} href="/ja/coaches">指導者・チーム →</a>
            <a className={styles.textLink} href="/ja/business">企業・主催者 →</a>
          </nav>

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
          <nav id="home-age-categories" className={styles.aboutLinks} aria-label="年代・スクール">
            <a className={styles.textLink} href="/ja/u12">U12 →</a>
            <a className={styles.textLink} href="/ja/u15">U15 →</a>
            <a className={styles.textLink} href="/ja/sendai-school" data-growth-id="home-hero-school-trial">仙台スクール・体験相談 →</a>
          </nav>
          <SendaiCommunity />

          <nav className={styles.aboutLinks} aria-label="オンライン受付・交流・個人支援">
            {steps.map(item=><a className={styles.textLink} key={item.id} href={item.href} data-growth-id={"home-path-"+item.id}>{item.title} →</a>)}
          </nav>

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
            <a className={styles.textLink} href="/ja/book">申込・支払いの流れ →</a>
            <a className={styles.textLink} href="/ja/services">教材・会員料金 →</a>
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
