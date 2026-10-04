import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Compass,
  HeartHandshake,
  MapPin,
  Repeat2,
  ShieldCheck,
  Target,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: { absolute: "佐賀のバスケットボールクリニック・キャンプ｜U8・U10・U12・U15｜RBA佐賀" },
  description:
    "Riot Basketball Academy（RBA）の佐賀での活動をまとめた公式ページです。2025年から続く育成年代のバスケットボールクリニック・2DAYS CAMPの歩み、育成内容、2026年12月28日・29日に予定している年末クリニック、今後の展開を紹介します。",
  keywords: [
    "佐賀 バスケ",
    "佐賀 バスケットボール",
    "佐賀 バスケ クリニック",
    "佐賀 ミニバス",
    "佐賀 U12 バスケ",
    "佐賀 U15 バスケ",
    "バスケットボール キャンプ 佐賀",
    "Riot Basketball Academy",
    "RBA 佐賀",
  ],
  alternates: { canonical: "https://riotbasketballacademy.com/ja/saga" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "RBA佐賀｜一度きりで終わらない育成機会を",
    description:
      "佐賀で継続してきた育成年代のバスケットボールクリニック・キャンプと、2026年末・その先の育成機会を紹介します。",
    url: "https://riotbasketballacademy.com/ja/saga",
    siteName: "Riot Basketball Academy",
    locale: "ja_JP",
    type: "website",
    images: ["https://riotbasketballacademy.com/rba-court-hero.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "RBA佐賀｜育成年代バスケットボール",
    description: "2025年から続く佐賀での活動と、2026年末・その先の育成機会を紹介します。",
    images: ["https://riotbasketballacademy.com/rba-court-hero.png"],
  },
};

const history = [
  {
    index: "01",
    date: "2025 / SEP",
    title: "佐賀・育成クリニック",
    body:
      "現在確認できる申込記録では、佐賀での開催は2025年9月が最初です。小学生を中心に中学生までを対象とし、22名分の申込みを確認しています。",
  },
  {
    index: "02",
    date: "2026 / JAN",
    title: "佐賀・2DAYS CAMP",
    body:
      "1月24日・25日に開催。単発の技術練習で終わらせず、2日間を通して学びを積み上げる形式で実施しました。申込記録では28名分の申込記録があります。",
  },
  {
    index: "03",
    date: "2026 / JUL",
    title: "SUMMER DEVELOPMENT",
    body:
      "7月4日・5日に開催。1日参加や午前のみの参加枠も設け、家庭の予定や所属チームでの活動と両立しやすい形に広げました。申込記録では42名分の申込記録があります。",
  },
  {
    index: "04",
    date: "2026 / OCT",
    title: "SAGA × FUKUOKA 2DAYS",
    body:
      "U8・U10・U12・U15を対象に、基礎から1on1、2on2・3on3、スペーシング、5on5へつなぐDevelopment Campを実施しました。申込記録では17名分の申込記録があります。",
  },
];

const principles = [
  [
    "01",
    "今の所属のまま参加できる",
    "RBA佐賀は、クラブ移籍やチーム勧誘を目的とした活動ではありません。今いるチームを大切にしながら、普段とは異なる環境で得た学びを日々の活動へ持ち帰れる場をつくります。",
  ],
  [
    "02",
    "現在のレベルだけで参加を決めない",
    "現在の技術レベルだけで参加の可否を決めません。年代、経験、理解度に合わせて、挑戦できる課題やゲームの条件を調整します。",
  ],
  [
    "03",
    "技術と判断を切り離さない",
    "ドリブルやシュートを覚えるだけでなく、相手・味方・スペースを見て、いつ何を使うのかまでゲームの中で学びます。",
  ],
  [
    "04",
    "一度で終わらせない",
    "佐賀で継続して開催し、前回の学びから次の課題へ進めることを大切にします。参加履歴や次の機会も、MY HOME COURTにつなげられる形を整えていきます。",
  ],
];

const programme = [
  [
    "01",
    "FOUNDATION",
    "フットワーク、ボールハンドリング、パス、フィニッシュ、シュート。動作を覚えることだけでなく、ゲームで使うための土台をつくります。",
  ],
  [
    "02",
    "1ON1 → SMALL SIDED GAME",
    "1on1から2on2・3on3へ。相手、味方、スペースを見ながら、自分で判断する回数を増やします。",
  ],
  [
    "03",
    "SPACING & DECISION MAKING",
    "どこへ動くか、いつ攻めるか、いつパスするか。決められた形の再現だけではなく、状況から判断することを重視します。",
  ],
  [
    "04",
    "GAME TRANSFER",
    "3x3、アドバンテージゲーム、5on5へ。練習で身につけたことを、相手の守備や味方との関係がある実戦の中で使える力へつなげます。",
  ],
];

const audiences = [
  [
    "PLAYER / FAMILY",
    "選手・保護者",
    "今の所属を続けながら、普段とは違う環境でも学びたい。試合で使える技術や判断を増やしたい。",
    "/ja/opportunities",
    "募集中の活動を見る",
  ],
  [
    "COACH",
    "指導者",
    "練習設計や育成年代への関わり方を学びたい。選手と一緒に、現場から学びたい。",
    "/ja/coaches",
    "指導者向け情報を見る",
  ],
  [
    "LOCAL HOST",
    "地域開催を支える方",
    "体育館や地域のネットワークを生かして、佐賀で継続的な育成機会を一緒につくりたい。",
    "/ja/regional-host",
    "地域開催について見る",
  ],
  [
    "PARTNER",
    "企業・団体",
    "地域の子どもたちの参加機会を広げ、会場確保や安全な運営、県外・海外交流を支えたい。",
    "/ja/partners",
    "協賛・連携を見る",
  ],
];

const roadmap = [
  [
    "NOW",
    "年末クリニックの準備",
    "2026年12月28日・29日の開催を予定しています。現在は日程と時間帯のみ先行してお知らせしており、会場、対象カテゴリー、参加費、申込方法は確定後に正式にご案内します。",
  ],
  [
    "NEXT",
    "年に数回、また参加できる機会へ",
    "春・夏・秋・冬など、学校行事や大会日程、会場の状況を見ながら継続開催を検討します。毎回ゼロから始めるのではなく、前回からの成長を次の学びへつなげます。",
  ],
  [
    "DEVELOP",
    "実戦の機会と、指導者が学べる場を増やす",
    "クリニックだけでなく、3x3や小局面ゲーム、交流ゲーム、指導者向けの学習機会など、地域に必要な形を段階的に検討します。",
  ],
  [
    "CONNECT",
    "佐賀から県外・アジアへ",
    "希望する選手・指導者が、準備状況に応じてRBAの全国キャンプや県外交流、Japan × Asiaの国際交流に挑戦できるよう、次の選択肢を用意します。",
  ],
];

const faq = [
  [
    "今のチームに所属したまま参加できますか？",
    "はい。RBA佐賀は所属変更を前提とした活動ではありません。普段のミニバス、クラブ、部活動を続けながら参加できます。",
  ],
  [
    "初心者や経験の浅い選手でも参加できますか？",
    "原則として、開催ごとの対象カテゴリーに該当し、定員に空きがあれば参加できます。経験年数や現在の技術レベルだけで線引きせず、年代や経験に応じて課題を調整します。詳細は各回の募集要項をご確認ください。",
  ],
  [
    "U8・U10・U12・U15は同じ内容ですか？",
    "すべてのカテゴリーに同じ内容をそのまま当てはめることはしません。身体の発達や理解度、競技経験を見ながら、扱う課題やゲームの条件を調整します。",
  ],
  [
    "シュートやドリブルなど個人スキルも練習しますか？",
    "行います。ただし、技術を形だけ覚えて終わるのではなく、相手・味方・スペースがある状況で『いつ使うか』までつなげることを重視します。",
  ],
  [
    "保護者や指導者は見学できますか？",
    "開催ごとに会場の条件が異なるため、正式募集時にご案内します。指導者向けの見学・学習機会も今後増やしていく方針です。",
  ],
  [
    "12月28日・29日の申込はもうできますか？",
    "現時点では先行案内の段階です。会場、対象カテゴリー、参加費、申込方法が確定した後、このページとRBAの公式チャンネルでご案内します。",
  ],
];

export default function SagaPage() {
  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(([name, text]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text },
    })),
  };

  const pageJson = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "RBA佐賀",
    url: "https://riotbasketballacademy.com/ja/saga",
    inLanguage: "ja",
    description:
      "Riot Basketball Academyが佐賀で継続して行う、育成年代向けバスケットボールクリニック・キャンプの情報。",
    dateModified: "2026-10-04",
    isPartOf: {
      "@type": "WebSite",
      name: "Riot Basketball Academy",
      url: "https://riotbasketballacademy.com/",
    },
    about: [
      "佐賀 バスケットボール",
      "ミニバス",
      "U8",
      "U10",
      "U12",
      "U15",
      "育成クリニック",
      "バスケットボールキャンプ",
    ],
    mainEntity: {
      "@type": "ItemList",
      name: "RBA佐賀の開催記録",
      itemListElement: history.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${item.date} ${item.title}`,
      })),
    },
  };

  const serviceJson = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "RBA佐賀｜育成年代バスケットボールクリニック・キャンプ",
    serviceType: "Youth basketball development clinics and camps",
    areaServed: { "@type": "AdministrativeArea", name: "佐賀県" },
    audience: [
      { "@type": "Audience", audienceType: "U8" },
      { "@type": "Audience", audienceType: "U10" },
      { "@type": "Audience", audienceType: "U12" },
      { "@type": "Audience", audienceType: "U15" },
      { "@type": "Audience", audienceType: "Parents and coaches" },
    ],
    provider: {
      "@type": "SportsOrganization",
      name: "Riot Basketball Academy",
      url: "https://riotbasketballacademy.com/",
    },
    url: "https://riotbasketballacademy.com/ja/saga",
  };

  const breadcrumbJson = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "RBA", item: "https://riotbasketballacademy.com/ja" },
      { "@type": "ListItem", position: 2, name: "RBA佐賀", item: "https://riotbasketballacademy.com/ja/saga" },
    ],
  };

  return (
    <SiteFrame locale="ja" languagePage="camp">
      <div className="journal-hub journal-cms saga-hub">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJson) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJson) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }} />

        <section className="journal-cms-hero section-pad">
          <p className="section-index">RBA SAGA / REGIONAL DEVELOPMENT</p>
          <h1>
            RBA佐賀。<br />
            一度きりで終わらない、育成の機会を。
          </h1>
          <p>
            現在確認できる申込記録では、Riot Basketball Academyは2025年9月から佐賀で育成年代のクリニック・キャンプを継続しています。
            目指しているのは、強い選手だけを集めることでも、所属チームを変えてもらうことでもありません。
            今いる環境を大切にしながら、普段とは違う環境でも学び、試し、その経験を日々のバスケットボールへ持ち帰れる場所を佐賀で育てていきます。
          </p>
          <div className="saga-status-row" aria-label="ページ更新情報">
            <span>UPDATED 2026.10.04</span>
            <strong>12/28・29は開催予定／会場・対象・参加費・申込方法は未確定</strong>
          </div>
          <div className="homecourt-launch-actions">
            <Link className="button button-dark" href="#next">
              12/28・29の予定を見る <ArrowRight size={17} />
            </Link>
            <Link className="button button-light" href="#history">
              これまでの開催を見る <ArrowRight size={17} />
            </Link>
            <a
              className="button button-light"
              href="https://lin.ee/5l1YG8N"
              target="_blank"
              rel="noreferrer"
            >
              公式LINE <BellRing size={17} />
            </a>
          </div>
        </section>

        <nav className="saga-section-nav" aria-label="RBA佐賀 ページ内メニュー">
          <a href="#concept">RBA佐賀とは</a>
          <a href="#history">これまで</a>
          <a href="#development">育成内容</a>
          <a href="#next">12/28・29</a>
          <a href="#roadmap">今後</a>
          <a href="#faq">FAQ</a>
        </nav>

        <section className="homecourt-product-preview section-pad">
          <div className="section-head">
            <div>
              <p className="section-index">SAGA IN NUMBERS</p>
              <h2>佐賀で、学びを積み重ねる。</h2>
            </div>
            <p>
              過去4回の申込フォームを開催ごとに整理すると、合計で延べ100名を超える申込記録があります。
              複数回の開催に申込みのある選手もおり、一度きりではない継続開催として積み上がっています。
            </p>
          </div>
          <div className="homecourt-preview-grid">
            <article>
              <Repeat2 />
              <span>CONTINUITY</span>
              <h3>2025 → 2026</h3>
              <p>季節をまたいで開催を重ね、学びを積み上げています。</p>
            </article>
            <article>
              <UsersRound />
              <span>PLAYER ENTRIES</span>
              <h3>100+</h3>
              <p>過去4回の申込記録で延べ100名超。実参加人数ではなく、申込フォームを基にした数字です。</p>
            </article>
            <article>
              <UserRoundCheck />
              <span>AGE RANGE</span>
              <h3>U8 → U15</h3>
              <p>低学年から中学生まで。年齢だけでなく、発達段階や競技経験も踏まえて設計します。</p>
            </article>
            <article>
              <MapPin />
              <span>AREA</span>
              <h3>SAGA / KYUSHU</h3>
              <p>佐賀県内外からの申込みがあり、市町村や所属の枠を越えて、九州の選手が学べる機会になっています。</p>
            </article>
          </div>
        </section>

        <section className="journal-evidence-standard section-pad" id="concept">
          <div className="section-head">
            <div>
              <p className="section-index">WHAT RBA SAGA IS</p>
              <h2>
                選抜でも、移籍先でもない。<br />
                普段の活動に、もう一つの学びを。
              </h2>
            </div>
            <p>
              RBA佐賀は、所属チームと競合する場ではありません。普段の活動だけでは得にくい刺激や学びを補い、次の成長につなげる「地域の学びの入口」として育てていきます。
            </p>
          </div>
          <div className="journal-evidence-grid">
            {principles.map(([n, title, body]) => (
              <article key={n}>
                <span>{n} / PRINCIPLE</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <div className="homecourt-private-note">
            <ShieldCheck />
            <div>
              <strong>RBA佐賀は、固定のチームや常設スクールではありません</strong>
              <p>
                RBA佐賀は現在、佐賀エリアで継続して行うクリニック、キャンプ、学習機会をまとめた地域ページです。
                選手登録や移籍を前提とせず、対象、会場、参加費、申込方法・条件は開催ごとの正式募集でご案内します。
              </p>
            </div>
          </div>
        </section>

        <section className="journal-cms-index section-pad" id="history">
          <div className="section-head">
            <div>
              <p className="section-index">HISTORY / 2025–2026</p>
              <h2>これまでの佐賀開催。</h2>
            </div>
            <p>
              開催ごとに同じメニューを繰り返すのではなく、参加する年代や地域の大会日程、選手の課題に合わせて、内容や形式を調整してきました。
            </p>
          </div>
          <div className="journal-cms-grid saga-grid-four">
            {history.map((item) => (
              <article key={item.index}>
                <span>{item.index}</span>
                <p className="note-tag">{item.date}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <div className="homecourt-private-note">
            <ShieldCheck />
            <div>
              <strong>数字の扱いについて</strong>
              <p>
                上記の人数は、各開催の申込フォームに記録された選手名から、同一開催内の明らかな重複申込みを除いて集計した、申込記録上の人数です。
                当日の参加人数や決済人数とは異なる場合があります。キャンセル等を含む可能性があるため、実参加人数としては表示していません。
              </p>
            </div>
          </div>
          <div className="homecourt-launch-actions">
            <Link className="button button-light" href="/ja/approach">
              RBAの育成方針を見る <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section className="journal-evidence-standard section-pad" id="development">
          <div className="section-head">
            <div>
              <p className="section-index">DEVELOPMENT DESIGN</p>
              <h2>
                「できた」で終わらず、<br />
                「試合で使える」まで。
              </h2>
            </div>
            <p>
              直近の佐賀・九州での開催では、技術を単独で反復するだけで終わらせず、基礎から小局面へ、さらにゲームへとつなげることを軸にしています。
            </p>
          </div>
          <div className="journal-evidence-grid">
            {programme.map(([n, title, body]) => (
              <article key={n}>
                <span>
                  {n} / {title}
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <div className="homecourt-launch-actions">
            <Link className="button button-light" href="/ja/approach">
              RBAの育成方針を見る <BookOpen size={16} />
            </Link>
            <Link className="button button-light" href="/ja/development">
              育成ガイド <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section className="homecourt-product-preview section-pad">
          <div className="section-head">
            <div>
              <p className="section-index">WHO THIS IS FOR</p>
              <h2>選手だけでなく、地域の皆さんとつくる。</h2>
            </div>
            <p>
              佐賀でこうした育成機会を続けていくには、選手だけでなく、保護者、指導者、会場を提供してくださる方や運営を支える方、地域の協力者、企業・団体が、それぞれ無理のない形で関われることが大切です。
            </p>
          </div>
          <div className="homecourt-preview-grid">
            {audiences.map(([label, title, body, href, cta]) => (
              <article key={label}>
                <HeartHandshake />
                <span>{label}</span>
                <h3>{title}</h3>
                <p>{body}</p>
                <Link className="text-link" href={href}>
                  {cta} <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="homecourt-plan-separation section-pad" id="next">
          <div className="homecourt-plan-intro">
            <p className="section-index">NEXT / YEAR END 2026</p>
            <h2>
              12月28日・29日、<br />
              佐賀で年末クリニックを開催予定。
            </h2>
            <p>
              現在は、年末の予定を立てていただきやすいよう、日程と時間帯を先にお知らせしている段階です。会場、対象カテゴリー、参加費、定員、申込方法は、確定後に正式にご案内します。
              正式募集までは、申込・決済リンクを公開しません。
            </p>
          </div>
          <div className="homecourt-plan-grid">
            <article className="homecourt-plan-card">
              <CalendarDays />
              <span>2026.12.28 / MON</span>
              <h3>DAY 1 / PLANNED</h3>
              <p>
                9:00〜11:30
                <br />
                13:30〜16:30
                <br />
                19:00〜20:30
              </p>
            </article>
            <article className="homecourt-plan-card">
              <CalendarDays />
              <span>2026.12.29 / TUE</span>
              <h3>DAY 2 / PLANNED</h3>
              <p>
                9:00〜11:30
                <br />
                13:30〜16:30
                <br />
                19:00〜20:30
              </p>
            </article>
          </div>
          <div className="homecourt-private-note">
            <BellRing />
            <div>
              <strong>正式募集が始まったら</strong>
              <p>
                このページを更新し、RBA公式LINE、MY HOME COURT、公式SNSなどで案内します。現時点では申込フォームや決済リンクは公開していません。
              </p>
            </div>
          </div>
          <div className="homecourt-launch-actions">
            <a
              className="button button-dark"
              href="https://lin.ee/5l1YG8N"
              target="_blank"
              rel="noreferrer"
            >
              公式LINEで最新情報を受け取る <BellRing size={16} />
            </a>
            <Link className="button button-light" href="/ja/my-homecourt">
              無料でRBA IDをつくる <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section className="journal-cms-index section-pad" id="roadmap">
          <div className="section-head">
            <div>
              <p className="section-index">ROADMAP / DIRECTION, NOT A PROMISE</p>
              <h2>佐賀で、これからつくりたいこと。</h2>
            </div>
            <p>
              下記は確定した開催予定ではなく、地域のニーズ、会場の確保状況、協力体制、参加状況を見ながら進めていく方向性です。
              無理に広げるのではなく、実際に継続できる形を優先します。
            </p>
          </div>
          <div className="journal-cms-grid saga-grid-four">
            {roadmap.map(([phase, title, body], index) => (
              <article key={phase}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p className="note-tag">{phase}</p>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="journal-evidence-standard section-pad">
          <div className="section-head">
            <div>
              <p className="section-index">RBA SAGA STANDARD</p>
              <h2>増やしたいのは、試合数ではなく学びの機会。</h2>
            </div>
            <p>
              試合をたくさんこなすことや、早い段階で勝つことだけを目的にはしません。
              一部の選手に経験が偏らないようにしながら、年代に必要な学びを練習とゲームの両方から設計します。
            </p>
          </div>
          <div className="journal-evidence-grid">
            <article>
              <Target />
              <span>01 / MODERN GAME</span>
              <h3>現代のゲームから逆算する</h3>
              <p>慣習だけでメニューを決めず、スペーシング、シュート、1on1、判断、トランジションなど、現代バスケットボールで求められる要素から課題を整理します。</p>
            </article>
            <article>
              <Compass />
              <span>02 / DECISION</span>
              <h3>答えを与えすぎない</h3>
              <p>選手が見て、考えて、選べる余白を残します。失敗もフィードバックの材料です。</p>
            </article>
            <article>
              <UsersRound />
              <span>03 / EXPERIENCE</span>
              <h3>経験を一部の選手に偏らせない</h3>
              <p>育成年代では、プレーすること自体が学びになります。練習でもゲームでも、実際にプレーする時間を大切にします。</p>
            </article>
            <article>
              <ShieldCheck />
              <span>04 / LONG TERM</span>
              <h3>長く競技を続けられる身体へ</h3>
              <p>年齢や成長段階、疲労、回復を踏まえ、必要に応じてS&amp;Cの考え方も取り入れます。</p>
            </article>
          </div>
        </section>

        <section className="journal-cms-index section-pad" id="faq">
          <div className="section-head">
            <div>
              <p className="section-index">FAQ</p>
              <h2>RBA佐賀について、よくある質問。</h2>
            </div>
            <p>会場や参加条件など、開催ごとに変わる情報は正式募集時の最新情報をご確認ください。</p>
          </div>
          <div className="journal-cms-grid saga-faq-grid">
            {faq.map(([q, a], index) => (
              <article key={q}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{q}</h3>
                <p>{a}</p>
              </article>
            ))}
          </div>
          <div className="homecourt-private-note">
            <ShieldCheck />
            <div>
              <strong>開催情報は、各回の正式募集ページをご確認ください</strong>
              <p>
                このページは佐賀での活動全体をまとめた地域ページです。日時、会場、参加費、対象、定員、キャンセル条件などについて、
                各開催の正式募集ページと記載が異なる場合は、正式募集ページの最新情報を優先してください。
              </p>
            </div>
          </div>
          <div className="homecourt-launch-actions">
            <Link className="button button-light" href="/ja/policies">
              参加規約・安全方針を見る <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section className="network-release section-pad">
          <UsersRound />
          <div>
            <p className="section-index">OPEN REGIONAL PLATFORM</p>
            <h2>
              所属を変えなくても、<br />
              育成の選択肢は増やせる。
            </h2>
            <p>
              RBA佐賀が目指すのは、RBAだけで選手を育てようとすることではありません。佐賀を中心とした九州の子どもたちが、必要なときに普段とは違う学びの場にも参加できることを大切にします。
              選手、保護者、指導者、そして地域で開催を支えてくださる方々と一緒に、無理なく続けられる形をつくっていきます。
            </p>
          </div>
          <div>
            <Link className="button button-member" href="/ja/contact">
              RBA佐賀について相談する <ArrowRight size={16} />
            </Link>
            <Link className="text-link light-link" href="/ja/regions">
              全国の活動拠点を見る <ArrowRight size={16} />
            </Link>
            <Link className="text-link light-link" href="/ja/regional-host">
              地域開催への協力について見る <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
