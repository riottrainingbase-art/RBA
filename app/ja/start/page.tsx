import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import { GrowthClickTracking } from "@/components/growth-click-tracking";
import styles from "./start.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "参加・体験・開催相談の入口｜RBA・RTB",
  description: "全国のRBAクリニック・キャンプ、仙台スクール、指導者向け講習、RTB体験、地域開催と企業・海外連携。あなたの目的に合う公式の申込・無料相談へ進めます。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/start" },
  openGraph: {
    title: "RBA｜次の一歩を選ぶ",
    description: "参加する、学ぶ、体験する、チームに呼ぶ。公式の申込・相談先を目的別に整理しました。",
    url: "https://riotbasketballacademy.com/ja/start",
    type: "website",
  },
};

type Entry = {
  id: string;
  when?: string;
  title: string;
  audience: string;
  price?: string;
  detail: string;
  href: string;
  cta: string;
  note?: string;
  until?: string;
};

const events: Entry[] = [
  {
    id: "okinawa-november",
    when: "11月14日（土）16:00〜19:00 / 沖縄",
    title: "RBA 沖縄クリニック",
    audience: "小学4年〜中学3年",
    price: "1名 3,300円（税込）",
    detail: "身体操作・シュート・少人数ゲーム。会場確保済み・所在地は申込者へ個別案内。決済受付はRBAから開始をご案内します。",
    href: "/ja/events/okinawa-clinic-2026-11-14",
    cta: "内容・先行受付を確認",
    note: "会場の詳細は申込者へ個別案内。",
    until: "2026-11-14",
  },
  {
    id: "tatsuno",
    when: "11月21〜23日 / 兵庫・たつの",
    title: "Development Camp 2026",
    audience: "小学5年〜中学3年",
    price: "半日 6,600円 / 1日 11,000円 / 3日通い 27,500円",
    detail: "対人場面で見る・判断する・修正する。通える日から参加を相談できます。",
    href: "/ja/events/kobe-development-camp-2026",
    cta: "参加できる日を無料相談",
    note: "体育館の利用時間・11月23日の条件・宿泊は最終確認中。確定前の決済を急がせません。",
    until: "2026-11-23",
  },
  {
    id: "torsten",
    when: "11月25日（水）20:00〜21:30 / Zoom",
    title: "Torsten Loibl ONLINE CLINIC Vol.2",
    audience: "指導者・選手・保護者・トレーナー",
    price: "LIVE 3,300円 / 30日間録画 4,400円",
    detail: "現代バスケットボールにおけるシューターの育成と活用。英語講義・日本語逐次通訳。",
    href: "/ja/events/torsten-loibl-online-clinic",
    cta: "LIVE・録画を選んで申し込む",
    note: "日本国内と海外では申込・決済の方法が異なります。公式ページでお選びください。",
    until: "2026-11-24",
  },
  {
    id: "kagoshima",
    when: "11月29日（日）/ 鹿児島",
    title: "BASTET × RBA 鹿児島クリニック",
    audience: "小学生〜高校生・男女",
    price: "1部 3,000円 / 午前午後通し 4,000円",
    detail: "午前9:30〜12:00、午後13:00〜15:30。参加する時間を選び、公式ページでお申し込み。",
    href: "/ja/events/kagoshima-clinic-2026-11-29",
    cta: "参加時間を選ぶ",
    until: "2026-11-29",
  },
  {
    id: "okinawa-international",
    when: "12月22〜24日 / 沖縄・糸満",
    title: "沖縄国際ユースバスケットボールキャンプ",
    audience: "7〜18歳 / 国内・海外",
    price: "沖縄県民：通い 27,500円 / 宿泊 39,600円",
    detail: "日本と海外の選手が、基本技術・ゲーム・国際交流を通して学ぶ2泊3日の企画。",
    href: "/ja/events/okinawa-international-camp-2026",
    cta: "国内・海外の参加条件を確認",
    note: "施設から受入可能との回答あり。宿泊の正式日数・責任者・体育館時間・送迎は最終調整中です。",
    until: "2026-12-24",
  },
];

const ongoing: Entry[] = [
  {
    id: "sendai-school",
    title: "仙台 U12・U15 スクール｜体験相談",
    audience: "小学生・小学6年生・中学生の保護者",
    detail: "U12は金曜、U15 SKILL UPは木曜を基本に活動。所属チームを変えずに参加できるスクールの料金・学年・体験条件を比較できます。",
    href: "/ja/sendai-school",
    cta: "2つのクラスを比較し、無料で体験相談",
    note: "フォーム送信は無料。実際の体験日・費用・受入可否は個別にご案内します。",
  },
  {
    id: "rtb-intro",
    title: "RTB｜見学・15分相談",
    audience: "一般の方・競技者・保護者",
    price: "初回相談・見学の受付",
    detail: "自分に合う運動・トレーニングの入口を相談。日時や有料プランは個別に確認します。",
    href: "https://form.jotform.com/262724288973067",
    cta: "見学・無料相談フォーム",
    note: "Riot Training Baseの受付です。相談送信だけで有料契約にはなりません。",
  },
];

const professionals: Entry[] = [
  {
    id: "d-hub",
    title: "D-HUB｜指導者の学び",
    audience: "ミニバス・U15・育成指導者",
    detail: "練習の設計や指導の考え方を、継続して学ぶプログラム。内容と会員条件を確認してください。",
    href: "/ja/d-hub/coaches",
    cta: "指導者向けプログラムを見る",
  },
  {
    id: "team-support",
    title: "チームの練習・育成支援",
    audience: "クラブ・学校・指導者",
    detail: "個人の課題から、チームの練習設計や訪問指導まで。対象・期間・費用を相談できます。",
    href: "/ja/team-development",
    cta: "チーム支援を相談",
  },
  {
    id: "local-host",
    title: "あなたの地域でRBAを開催",
    audience: "地域の主催者・体育館・保護者会",
    detail: "まずは開催希望地・対象年代・会場候補を無料相談。日程・費用の確約は条件確認後です。",
    href: "/ja/clinic-request",
    cta: "全国開催を無料相談",
  },
  {
    id: "rtb-team",
    title: "RTB｜チームの身体づくり",
    audience: "学校・クラブ・スポーツ団体",
    detail: "トレーニング、コンディショニング、S&C支援を個別に相談できます。",
    href: "https://form.jotform.com/262771319888069",
    cta: "チームS&Cの相談",
  },
];

const partners: Entry[] = [
  {
    id: "sponsor",
    title: "子どもの育成を支える・協賛する",
    audience: "地域企業・団体・個人",
    detail: "地域の育成活動、子どもが挑戦できる機会、企業との共同企画を相談できます。",
    href: "/ja/partners",
    cta: "協賛・パートナーのご相談",
    note: "協賛の掲載条件や提供内容は合意後に確定します。",
  },
  {
    id: "rtb-corporate",
    title: "RTB｜法人向けパフォーマンス",
    audience: "企業・事業所・学校",
    detail: "職場や組織の健康づくり・運動支援を、対象や予算に合わせて個別に相談。",
    href: "https://form.jotform.com/262771366417059",
    cta: "法人向けの無料相談",
  },
  {
    id: "international",
    title: "日本・アジアとの育成交流",
    audience: "海外アカデミー・チーム・オーガナイザー",
    detail: "訪日交流、練習・試合・指導者研修について、人数と希望日程から協議します。",
    href: "/ja/international",
    cta: "国際交流・日本受入を相談",
    note: "施設・旅行・チーム受入の実施条件を確約する窓口ではありません。",
  },
  {
    id: "united",
    title: "RBA UNITED｜海外大会への挑戦",
    audience: "選手・保護者",
    detail: "大会に参加するための期間限定チーム。現在の意向受付と成立条件を確認できます。",
    href: "/ja/united",
    cta: "国際大会の参加条件を見る",
    note: "参加意向の提出だけで遠征の実施やチーム成立は確定しません。",
  },
  {
    id: "jpnentry",
    title: "JPNentry｜日本製品の海外調達",
    audience: "海外バイヤー・法人の調達担当者",
    detail: "部品・日本製品の型番と数量を送付し、在庫・輸出条件・見積の可否を確認します。",
    href: "https://form.jotform.com/262542049350049",
    cta: "JPNentryのRFQを送る",
    note: "RBAとは別のB2B調達窓口です。見積は供給・輸出条件の確認後です。",
  },
];

function tokyoDateKey() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(new Date());
  const value = (type: string) => parts.find(part => part.type === type)?.value ?? "";
  return `${value("year")}-${value("month")}-${value("day")}`;
}

function EntryCards({ items, section }: { items: Entry[]; section: string }) {
  return <div className={styles.cards}>{items.map(item => {
    const external = item.href.startsWith("https://");
    return <article className={styles.card} key={item.id}>
      {item.when ? <p className={styles.when}>{item.when}</p> : null}
      <h3>{item.title}</h3>
      <p className={styles.audience}>{item.audience}</p>
      {item.price ? <p className={styles.price}>{item.price}</p> : null}
      <p className={styles.description}>{item.detail}</p>
      {item.note ? <p className={styles.note}>{item.note}</p> : null}
      <a data-growth-id={`start-${section}-${item.id}`} href={item.href}
         target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
         className={styles.action}>{item.cta} <span aria-hidden="true">→</span></a>
    </article>;
  })}</div>;
}

export default function StartPage() {
  const now = tokyoDateKey();
  const currentEvents = events.filter(item => !item.until || item.until >= now);
  return <SiteFrame locale="ja">
    <main className={styles.page} lang="ja">
      <GrowthClickTracking />
      <div className={styles.wrap}>
        <a className={styles.back} href="/ja">← RBAトップへ</a>
        <header className={styles.hero}>
          <p className={styles.kicker}>RBA / RTB · START HERE</p>
          <h1>今の自分に合う、<br/>次の一歩を。</h1>
          <p className={styles.lead}>参加する。体験する。指導者として学ぶ。チームや地域に呼ぶ。あなたの目的から、正しい公式申込・相談先へ進めます。</p>
          <nav className={styles.chips} aria-label="目的から探す">
            <a href="#events">直近のイベント</a>
            <a href="/ja/sendai-school" data-growth-id="start-school-hero">仙台スクールの無料体験相談</a>
            <a href="#coaches">指導者・開催相談</a>
            <a href="#partners">企業・国際交流</a>
          </nav>
          <p className={styles.disclaimer}>料金の発生・申込確定の条件は、各リンク先でご確認ください。無料の相談だけでは申込や決済は成立しません。</p>
        </header>
        <section className={styles.section} id="events" aria-labelledby="start-events">
          <div className={styles.sectionHead}><div><p className={styles.kicker}>01 / UPCOMING</p><h2 id="start-events">直近のクリニック・キャンプ</h2><p>日程が近いものから確認できます。会場や宿泊が調整中の企画は、その旨を記載しています。</p></div><a className={styles.more} href="/ja/opportunities" data-growth-id="start-all-opportunities">地域・年代から探す →</a></div>
          {currentEvents.length ? <EntryCards items={currentEvents} section="event" /> : <p>現在、この一覧で案内できる直近イベントはありません。<a href="/ja/opportunities">活動一覧をご覧ください。</a></p>}
        </section>
        <section className={styles.section} id="regular" aria-labelledby="start-regular">
          <div className={styles.sectionHead}><div><p className={styles.kicker}>02 / CONTINUE</p><h2 id="start-regular">仙台スクール・身体づくり</h2><p>一日限りの参加ではなく、日常の練習や身体づくりを続けたい方へ。</p></div></div>
          <EntryCards items={ongoing} section="regular" />
        </section>
        <section className={styles.section} id="coaches" aria-labelledby="start-coaches">
          <div className={styles.sectionHead}><div><p className={styles.kicker}>03 / TEAMS & COACHES</p><h2 id="start-coaches">指導者・チーム・地域の主催者</h2><p>育成の課題を共有し、講習・訪問指導・地域開催を相談できます。</p></div></div>
          <EntryCards items={professionals} section="coaches" />
        </section>
        <section className={styles.section} id="partners" aria-labelledby="start-partners">
          <div className={styles.sectionHead}><div><p className={styles.kicker}>04 / PARTNERSHIP</p><h2 id="start-partners">企業・地域・海外の連携</h2><p>法人相談、協賛、国際交流。事業ごとに受付・契約・決済を分けています。</p></div></div>
          <EntryCards items={partners} section="partners" />
        </section>
        <section className={styles.help} aria-labelledby="start-share-help">
          <p className={styles.kicker}>SHARE THE OPPORTUNITY</p>
          <h2 id="start-share-help">紹介できる人がいる方へ。</h2>
          <p>保護者LINE・チームの指導者・SNS向けの案内文を無料で用意しています。未確定事項は明記し、希望者が公式ページから内容と費用を確認できます。</p>
          <div className={styles.helpActions}><a data-growth-id="start-promotion-share" href="/ja/share">活動別の紹介文を選ぶ →</a></div>
        </section>
        <section className={styles.help} aria-labelledby="start-help">
          <p className={styles.kicker}>NOT SURE WHERE TO START?</p>
          <h2 id="start-help">迷ったら、開催地と目的から。</h2>
          <p>「近くに開催がない」「チーム単位で指導を呼びたい」「保護者としてまず相談したい」。まだ日程や料金が決まっていなくても、無料で希望を伝えられます。</p>
          <div className={styles.helpActions}>
            <a href="/ja/clinic-interest" data-growth-id="start-help-interest">近くの開催を希望する →</a>
            <a href="/ja/contact" data-growth-id="start-help-contact">RBAに相談する →</a>
          </div>
        </section>
      </div>
    </main>
  </SiteFrame>;
}
