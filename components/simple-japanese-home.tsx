import Image from "next/image";
import Link from "next/link";
import { GrowthClickTracking } from "./growth-click-tracking";
import { CorporateSupportStrip } from "./corporate-support-strip";
import { SendaiCommunity } from "./sendai-community";
import { SiteFrame } from "./site-frame";
import { isProgrammeActive, programmes } from "./programme-data";
import { tr } from "./network-data";
import styles from "./simple-japanese-home.module.css";

const learning = [
  { id:"guide", name:"U12指導教材", price:"3,300円", term:"税込・買い切り", copy:"育成年代の基礎と練習設計を体系的に学ぶ。", flow:"RBA IDでログインして購入。購入済みなら教材が開きます。", href:"/ja/materials/u12-fundamentals", action:"3,300円で教材を購入・閲覧", detailHref:"/ja/materials/u12-fundamentals#contents", detailLabel:"教材の詳細" },
  { id:"dhub", name:"D-HUB COACH LAB", price:"3,300円", term:"税込／月", copy:"指導者のための継続学習と現場実践。", flow:"申込フォーム送信後、Square決済をご案内。既存会員は追加決済不要。", href:"https://form.jotform.com/262498803883068", action:"月3,300円｜入会申込", detailHref:"/ja/d-hub/coaches", detailLabel:"内容・条件を確認" },
  { id:"plus", name:"MY HOME COURT PLUS", price:"3,300円", term:"税込／月", copy:"選手・保護者・指導者の育成ライブラリと記録。", flow:"RBA IDでログイン → 会員画面で登録・Stripe決済。", href:"/ja/my-homecourt/app/plus", action:"月3,300円｜PLUS登録へ", detailHref:"/ja/homecourt-plus", detailLabel:"無料版との違い・契約条件" },
] as const;

const support = [
  { id:"individual", name:"個人の応援メンバー", price:"500円 / 1,000円", term:"月額・note", copy:"活動の応援、または育成記事を読むプラン。", flow:"noteでプランを選び、入会・決済・解約を管理。", href:"https://note.com/rba_official/membership/join", action:"noteで入会・決済へ", detailHref:"/ja/supporters", detailLabel:"500円・1,000円の違い" },
  { id:"business", name:"企業広告パートナー", price:"11,000円", term:"税込／月・1口", copy:"公式応援ページ・月次活動レポートへの広告掲載。素材・許諾確認後に掲載します。", flow:"初回11,000円・毎月自動更新。次回請求前の解約で期間末終了。", href:"https://buy.stripe.com/cNibJ35678vy0Il64f7EQ1u?locale=ja", action:"月11,000円｜Stripe決済へ", detailHref:"/ja/support/terms", detailLabel:"広告掲載・契約・解約条件" },
] as const;

const otherLinks = [
  ["選手・保護者","/ja/families"],["指導者・チーム","/ja/coaches"],
  ["仙台スクール","/ja/sendai-school"],["BACKBONE 3x3・RIZEHOPE","/ja/opportunities"],
  ["RBA CONNECT","/ja/connect"],["保護者LINEコミュニティ","https://line.me/ti/g2/8GsWD4iOnyOuoNj60_s24ljg_--cQ7IFMjfDLw?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"],
  ["法人向け運動研修・親子イベント","/ja/business"],["活動地域","/ja/regions"],["沖縄の活動","/ja/okinawa#local-places"],["育成方針","/ja/approach"],["規約・安全方針","/ja/policies"],["Instagramリンク集","/ja/links"],
] as const;

function OfferCard({offer}:{offer:(typeof learning)[number]|(typeof support)[number]}){
  return <article className={styles.card}>
    <h3>{offer.name}</h3>
    <p className={styles.price}>{offer.price}<small>{offer.term}</small></p>
    <p>{offer.copy}</p>
    <p className={styles.flow}>{offer.flow}</p>
    <a className={styles.detailLink} href={offer.detailHref}>{offer.detailLabel} →</a>
    <a className={styles.primary} href={offer.href} data-growth-id={"home-simple-"+offer.id}>{offer.action}<span aria-hidden="true">→</span></a>
  </article>;
}

export async function SimpleJapaneseHome() {
  const dateParts = new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Tokyo",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date());
  const today = ["year","month","day"].map(type=>dateParts.find(part=>part.type===type)?.value).join("-");
  const available = programmes
    .filter(p => isProgrammeActive(p))
    .filter(p => p.startDate > today);
  // Explicit allowlist: only a verified registration route receives a payment CTA.
  const active = available.filter(p => p.id === "kagoshima-nov29");
  const okinawa = available.find(p => p.id === "okinawa-december-camp");

  return <div className={styles.page} lang="ja">
    <SiteFrame locale="ja" compact>
      <div className={styles.container}>
        <GrowthClickTracking />
        <section className={styles.hero} aria-labelledby="rba-home-title">
          <p className={styles.label}>RIOT BASKETBALL ACADEMY / SENDAI · JAPAN · ASIA</p>
          <h1 id="rba-home-title">今のチームのまま、<br/>世界へ。</h1>
          <p className={styles.lead}>全国クリニック、国際交流、指導者教育。子どもたちが所属や地域を越えて学べる環境をつくる、非営利の育成活動です。</p>
          <nav className={styles.heroActions} aria-label="目的を選ぶ">
            <a className={styles.primary} href="#home-programmes" data-growth-id="home-primary-events">参加申込<span aria-hidden="true">→</span></a>
            <a className={styles.secondary} href="#home-learning" data-growth-id="home-primary-learning">教材・入会<span aria-hidden="true">→</span></a>
            <a className={styles.secondary} href="#home-supporters" data-growth-id="home-primary-support">応援・協賛<span aria-hidden="true">→</span></a>
          </nav>
          <div className={styles.quickLinks}>
            <a href="#home-organisation" data-growth-id="home-founder-anchor">代表紹介</a>
            <a href="/ja/my-homecourt" data-growth-id="home-free-id">無料RBA ID・ログイン</a>
            <a href="https://form.jotform.com/263243557140049" data-growth-id="home-paid-help">支払済み・アクセス相談</a>
          </div>
        </section>

        <section className={styles.about} id="home-organisation" aria-labelledby="home-founder-name">
          <figure className={styles.founderPhoto}>
            <Image src="/media/founder/masato-nishio-on-court.webp" alt="コートで指導するRBA代表 西尾優人" width={874} height={860} sizes="(max-width: 760px) 200px, 250px"/>
            <figcaption>RBA / 指導の現場から</figcaption>
          </figure>
          <div className={styles.founderContent}>
            <p className={styles.label}>FOUNDER &amp; DIRECTOR</p>
            <h2 id="home-founder-name">西尾 優人 <span>MASATO NISHIO</span></h2>
            <p className={styles.founderRole}>Riot Basketball Academy 創設者・代表</p>
            <p>東北選抜・国体の競技経験を経て、ドイツでバスケットボールの競技と育成を学ぶ。現在は仙台を拠点に、選手育成・身体づくり・指導者教育・国際交流をつなぐ活動を行っています。</p>
            <ul className={styles.founderFacts}>
              <li><strong>GERMANY</strong><span>Sports Elite Academy・Chemnitz 99ersに関連する研修・育成学習</span></li>
              <li><strong>4,000名以上</strong><span>国内のクリニック等での指導実績（2026年9月 RBA公式資料）</span></li>
            </ul>
            <p className={styles.founderBelief}>勝敗だけで子どもの可能性を決めない。自ら見て、考え、判断できる選手を育てる。</p>
            <a className={styles.textLink} href="/ja/about#founder" data-growth-id="home-primary-founder">代表の経歴・指導理念を見る →</a>
          </div>
        </section>

        <section className={styles.section} id="home-programmes" aria-labelledby="home-programme-title">
          <header className={styles.heading}><div><p className={styles.label}>01 / PARTICIPATE</p><h2 id="home-programme-title">参加する。</h2></div><a href="/ja/opportunities" className={styles.textLink} data-growth-id="home-all-opportunities">開催予定をすべて見る →</a></header>
          <div className={styles.grid}>
            {active.length===0&&<p className={styles.note}>現在の募集は開催予定一覧からご確認ください。</p>}
            {active.map(p=><article key={p.id} className={styles.card}>
              <p className={styles.label}>{tr(p.date,"ja")}</p><h3>{tr(p.title,"ja")}</h3>
              <p>{tr(p.place,"ja")}<br/>{tr(p.audience,"ja")}</p>
              <p className={styles.eventFee}>{tr(p.price,"ja")}</p>
              <p className={styles.flow}>保護者が日程・条件確認 → 申込 → 案内に従って決済</p>
              <a className={styles.primary} href="/ja/events/kagoshima-clinic-2026-11-29#entry" data-growth-id={"home-programme-"+p.id}>参加申込・決済へ<span aria-hidden="true">→</span></a>
            </article>)}

          </div>
          {okinawa && <article className={styles.pendingEvent}>
            <div><p className={styles.label}>{tr(okinawa.date,"ja")} / 条件確認中</p><h3>{tr(okinawa.title,"ja")}</h3><p>施設利用・集合解散・送迎などの最新条件を保護者の方がご確認ください。このページからは決済を案内しません。</p></div>
            <a className={styles.secondary} href="/ja/events/okinawa-international-camp-2026#family-guide" data-growth-id="home-okinawa-info">開催情報・参加条件を確認 →</a>
          </article>}
          <div className={styles.linkRow}>
            <a href="/ja/united" data-growth-id="home-united">RBA UNITED｜国内・国際交流 →</a>
            <a href="/ja/sendai-school" data-growth-id="home-school-consultation">仙台スクール・体験相談 →</a>

          </div>
          {today < "2026-12-28" && <a className={styles.textLink} href="/ja/saga">佐賀の年末開催予定（正式条件の案内を確認） →</a>}
          <p className={styles.note}>会場・定員・取消条件・受付状況は各公式案内を確認してください。無料希望登録や相談は参加確定・決済ではありません。未確定企画は事前決済に誘導しません。</p>
        </section>

        <section className={styles.section} id="home-learning" aria-labelledby="home-learning-title">
          <header className={styles.heading}><div><p className={styles.label}>02 / LEARN</p><h2 id="home-learning-title">学ぶ。</h2></div><Link href="/ja/journal" className={styles.textLink} data-growth-id="home-free-journal">無料の育成記事 →</Link></header>
          <div className={styles.grid}>{learning.map(offer=><OfferCard key={offer.id} offer={offer}/>)}</div>
          <div className={styles.linkRow}><a href="https://form.jotform.com/262542128767059" data-growth-id="home-free-u12">無料U12指導セルフチェック →</a><a href="/ja/services" data-growth-id="home-revenue-services">サービス・料金を比較 →</a></div>
          <p className={styles.note}>月額と買い切りは別契約です。更新・解約・提供内容は各サービスの正式条件を確認してください。すでに決済済みの方は再購入せず、上部のアクセス相談へ。</p>
        </section>

        <section className={styles.section} id="home-supporters" aria-labelledby="home-supporters-title">
          <header className={styles.heading}><div><p className={styles.label}>03 / SUPPORT</p><h2 id="home-supporters-title">支える。</h2></div><a className={styles.textLink} href="/ja/partners" data-growth-id="home-support-company">企業協賛の詳細・相談 →</a></header>
          <div className={styles.gridTwo}>{support.map(offer=><OfferCard key={offer.id} offer={offer}/>)}</div>
          <p className={styles.note}>応援・広告・イベント参加は別契約です。<a href="/ja/partners">企業の協賛・共同企画の詳細</a> ／ <a href="https://form.jotform.com/263243206556051">企業広告の決済済み・素材提出</a>。既存契約への追加決済は不要です。</p>
        </section>

        <section className={styles.host} id="home-business"><div><p className={styles.label}>RBA / RTB FOR BUSINESS</p><h2>法人向けサービス</h2><p>社員向け運動研修・親子イベント。広告・協賛とは別の有償サービスです。相談・初回見積は無料。</p></div><a href="/ja/business" className={styles.secondary} data-growth-id="home-business-services">法人研修・料金を見る →</a></section>
        <div id="home-partners" className={styles.sponsors} aria-label="RBA協賛・パートナー"><CorporateSupportStrip locale="ja" /></div>

        <section id="home-host" className={styles.host}>
          <div><p className={styles.label}>FOR TEAMS &amp; LOCAL ORGANISERS</p><h2>あなたの地域に、RBAを。</h2><p>チーム訪問・地域クリニック・指導者研修の相談・見積は無料です。内容と費用は双方の合意後に確定します。</p></div>
          <a href="/ja/clinic-request" className={styles.primary} data-growth-id="home-host-request">無料で開催相談する<span aria-hidden="true">→</span></a>
        </section>

        <section className={styles.ageHub} id="home-age-categories" aria-labelledby="home-age-title">
          <h2 id="home-age-title">年代・活動から探す</h2>
          <nav className={styles.ageGrid} aria-label="年代と育成クラブ">
            <a className={styles.ageCard} href="/ja/u12"><strong>U12</strong><span>小学生向け活動 →</span></a>
            <a className={styles.ageCard} href="/ja/u15"><strong>U15</strong><span>中学生年代の活動 →</span></a>
            <a className={styles.ageCard} href="/ja/gream"><strong>GREAM</strong><span>U15地域クラブ →</span></a>
          </nav>
        </section>
        <details className={styles.more} id="rba-for-you"><summary>活動・地域・その他の公式情報</summary><nav aria-label="その他の公式情報">{otherLinks.map(([label,href])=><a href={href} key={label}>{label} →</a>)}</nav></details>
        <details className={styles.more}><summary>仙台地域の活動情報</summary><SendaiCommunity /></details>
      </div>
    </SiteFrame>
  </div>;
}
