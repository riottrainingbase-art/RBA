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
  title: { absolute: "佐賀 バスケ クリニック・キャンプ｜U8・U10・U12・U15｜RBA佐賀" },
  description:
    "Riot Basketball Academy（RBA）の佐賀エリア公式ページ。2025年からの育成年代バスケットボールクリニック・2DAYS CAMPの歩み、育成内容、2026年12月28日・29日の年末クリニック予定、今後の地域育成構想をまとめています。",
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
    title: "RBA 佐賀｜単発で終わらない育成機会を",
    description:
      "佐賀で継続してきた育成年代バスケットボールのクリニック・キャンプと、2026年末・その先の育成機会。",
    url: "https://riotbasketballacademy.com/ja/saga",
    siteName: "Riot Basketball Academy",
    locale: "ja_JP",
    type: "website",
    images: ["https://riotbasketballacademy.com/rba-court-hero.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "RBA 佐賀｜育成年代バスケットボール",
    description: "2025年からの継続開催と、2026年末・その先の育成機会をまとめます。",
    images: ["https://riotbasketballacademy.com/rba-court-hero.png"],
  },
};

const history = [
  {
    index: "01",
    date: "2025 / SEP",
    title: "佐賀 育成クリニック",
    body:
      "確認できる申込記録では、ここから佐賀での継続開催が始まりました。小学生を中心に中学生まで参加枠を用意し、申込フォーム上では22名の選手がエントリーしました。",
  },
  {
    index: "02",
    date: "2026 / JAN",
    title: "佐賀 2DAYS CAMP",
    body:
      "1月24日・25日に開催。単発の技術練習ではなく、2日間を通して学びを積み上げる形式へ。申込フォーム上では28名の選手がエントリーしました。",
  },
  {
    index: "03",
    date: "2026 / JUL",
    title: "SUMMER DEVELOPMENT",
    body:
      "7月4日・5日に実施。1日参加、午前のみなど参加方法を広げ、家庭の予定や所属活動と両立しやすい形を試しました。申込フォーム上では42名の選手がエントリーしました。",
  },
  {
    index: "04",
    date: "2026 / OCT",
    title: "SAGA × FUKUOKA 2DAYS",
    body:
      "U8・U10・U12・U15を対象に、基礎から1on1、2on2・3on3、スペーシング、5on5へつなぐDevelopment Campを実施。申込フォーム上では17名の選手がエントリーしました。",
  },
];

const principles = [
  [
    "01",
    "所属を変えなくていい",
    "RBA佐賀はクラブ移籍やチーム勧誘を目的とした活動ではありません。普段の所属を大切にしながら、外の学びを持ち帰れる場をつくります。",
  ],
  [
    "02",
    "上手い選手だけの場所にしない",
    "現在の完成度だけで参加価値を決めません。年代、経験、理解度を見ながら、挑戦できる課題とゲーム環境を調整します。",
  ],
  [
    "03",
    "技術と判断を切り離さない",
    "ドリブルやシュートを覚えるだけでなく、相手・味方・スペースを見て、いつ何を使うのかまでゲームの中で学びます。",
  ],
  [
    "04",
    "一度で終わらせない",
    "同じ地域へ戻り、前回の学びから次の課題へ進めることを重視します。参加履歴や次の機会はMY HOME COURTにもつなげていきます。",
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
    "1on1から2on2・3on3へ。相手、味方、スペースを見ながら、自分で選ぶ回数を増やします。",
  ],
  [
    "03",
    "SPACING & DECISION MAKING",
    "どこへ動くか、いつ攻めるか、いつパスするか。決められた形の再現だけではなく、状況から判断することを重視します。",
  ],
  [
    "04",
    "GAME TRANSFER",
    "3x3、アドバンテージゲーム、5on5へ。練習でできたことを、守備と味方がいる試合の中で使える状態へ移していきます。",
  ],
];

const audiences = [
  [
    "PLAYER / FAMILY",
    "選手・保護者",
    "今の所属を続けながら、外の環境で学びたい。試合で使える技術や判断を増やしたい。",
    "/ja/opportunities",
    "募集中の活動を見る",
  ],
  [
    "COACH",
    "指導者",
    "練習設計や育成年代への関わり方を学びたい。選手と一緒に現場を見たい。",
    "/ja/coaches",
    "指導者向けを見る",
  ],
  [
    "LOCAL HOST",
    "地域の開催協力者",
    "体育館、チーム、地域ネットワークを生かして、佐賀で継続的な育成機会を一緒につくりたい。",
    "/ja/regional-host",
    "地域開催について見る",
  ],
  [
    "PARTNER",
    "企業・団体",
    "地域の子どもたちの参加機会、会場、安全な運営、県外・海外交流を具体的に支えたい。",
    "/ja/partners",
    "協賛・連携を見る",
  ],
];

const roadmap = [
  [
    "NOW",
    "年末クリニックの準備",
    "2026年12月28日・29日の開催を予定。現在は日程と時間帯のみ先行案内し、会場・カテゴリー・参加費・申込方法は確定後に正式発表します。",
  ],
  [
    "NEXT",
    "年数回、戻ってこられる地域開催へ",
    "春・夏・秋・冬など、学校・大会・会場事情と調整しながら継続開催を検討。毎回ゼロからではなく、前回からの成長を次へつなげます。",
  ],
  [
    "DEVELOP",
    "ゲーム機会と指導者学習を増やす",
    "クリニックだけでなく、3x3、小局面ゲーム、交流ゲーム、指導者向け学習など、地域で必要な形を段階的に検討します。",
  ],
  [
    "CONNECT",
    "佐賀から県外・アジアへ",
    "希望と準備が整った選手・指導者には、RBAの全国キャンプ、県外交流、Japan × Asiaの国際交流へつながる選択肢を用意します。",
  ],
];

const faq = [
  [
    "所属チームに入ったまま参加できますか？",
    "はい。RBA佐賀は所属変更を前提とした活動ではありません。普段のミニバス、クラブ、部活動を続けながら参加できます。",
  ],
  [
    "初心者や経験の浅い選手でも参加できますか？",
    "開催ごとの対象カテゴリーと定員を満たしていれば参加できます。現在の上手さだけで参加価値を決めず、年代・経験に応じて課題を調整します。",
  ],
  [
    "U8・U10・U12・U15は同じ内容ですか？",
    "同じ内容をそのまま当てはめる考えではありません。発達段階、身体、理解度、競技経験を見ながら、扱う課題やゲーム条件を調整します。",
  ],
  [
    "シュートやドリブルなど個人スキルも練習しますか？",
    "行います。ただし、技術の形だけで終わらず、相手・味方・スペースがある状況で『いつ使うか』までつなげることを重視します。",
  ],
  [
    "保護者や指導者は見学できますか？",
    "開催ごとに会場条件が異なるため、正式募集時に案内します。指導者向けの見学・学習機会も今後増やしていく方針です。",
  ],
  [
    "12月28日・29日の申込はもうできますか？",
    "現時点では先行案内段階です。会場、対象カテゴリー、参加費、申込方法が確定後、このページとRBAの公式案内で公開します。",
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
    name: "RBA 佐賀",
    url: "https://riotbasketballacademy.com/ja/saga",
    inLanguage: "ja",
    description:
      "Riot Basketball Academyの佐賀エリアにおける育成年代バスケットボールの継続クリニック・キャンプ情報。",
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
      name: "RBA佐賀 開催記録",
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
    name: "RBA 佐賀｜育成年代バスケットボールクリニック・キャンプ",
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
      { "@type": "ListItem", position: 2, name: "RBA 佐賀", item: "https://riotbasketballacademy.com/ja/saga" },
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
            RBA 佐賀。<br />
            単発で終わらない育成機会を。
          </h1>
          <p>
            Riot Basketball Academyでは、現存する申込記録で確認できる範囲では、2025年9月から佐賀で育成年代のクリニック・キャンプを継続しています。
            目指しているのは、強い選手だけを集めることでも、所属チームを変えてもらうことでもありません。
            今いる環境を大切にしながら、地域の外でも学び、試し、その経験を普段のバスケットボールへ持ち帰れる場所を佐賀につくります。
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
              <h2>佐賀で、継続して積み上げる。</h2>
            </div>
            <p>
              過去4期の参加申込フォームを各期内で重複整理すると、延べ100名を超える選手が参加枠へエントリーしています。
              同じ選手が次の開催にも戻ってくるケースもあり、「一度参加して終わり」ではない地域活動へ育っています。
            </p>
          </div>
          <div className="homecourt-preview-grid">
            <article>
              <Repeat2 />
              <span>CONTINUITY</span>
              <h3>2025 → 2026</h3>
              <p>季節をまたいで開催。地域へ戻りながら、学びを積み上げています。</p>
            </article>
            <article>
              <UsersRound />
              <span>PLAYER ENTRIES</span>
              <h3>100+</h3>
              <p>4期の申込記録で延べ100名超。数は参加実績ではなく申込記録ベースで公開しています。</p>
            </article>
            <article>
              <UserRoundCheck />
              <span>AGE RANGE</span>
              <h3>U8 → U15</h3>
              <p>低学年から中学生まで。年齢だけでなく発達段階と競技経験も見て設計します。</p>
            </article>
            <article>
              <MapPin />
              <span>AREA</span>
              <h3>SAGA / KYUSHU</h3>
              <p>佐賀県内外からの申込もあり、所属や市町を越えて九州の選手が学べる機会へ。</p>
            </article>
          </div>
        </section>

        <section className="journal-evidence-standard section-pad" id="concept">
          <div className="section-head">
            <div>
              <p className="section-index">WHAT RBA SAGA IS</p>
              <h2>
                選抜でも、移籍先でもない。<br />
                「育つための外部環境」です。
              </h2>
            </div>
            <p>
              RBA佐賀は、所属チームと競合する場所ではなく、普段の活動だけでは得にくい刺激や学びを補完する「地域の学びの入口」として設計します。
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
              <strong>「RBA佐賀」は固定チームや常設スクールの名称ではありません</strong>
              <p>
                現時点では、佐賀エリアで継続して行うRBAのクリニック、キャンプ、学習機会をまとめる地域ページです。
                選手登録や移籍を前提とせず、開催ごとの対象・会場・料金・申込条件は正式募集時に個別に案内します。
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
              開催ごとに同じメニューを繰り返すのではなく、参加年代、地域日程、選手の課題に合わせて形式を更新してきました。
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
                上記人数は各開催の申込フォームに記録された選手名を、同一開催内の重複送信を整理して集計した「申込選手枠」です。
                当日の出席人数・決済人数と同義ではありません。キャンセル等を含む可能性があるため、活動規模を誇張しない表現に統一しています。
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
              直近の佐賀・九州開催で軸にしているのは、技術を単独で反復するだけではなく、基礎から小局面、そしてゲームへ接続することです。
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
              RBAの育成方針 <BookOpen size={16} />
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
              <h2>選手だけでなく、地域全体へ。</h2>
            </div>
            <p>
              佐賀で育成環境を継続するには、選手だけでなく、保護者、指導者、会場、地域の協力者、企業・団体がそれぞれ無理のない形で関われることが重要です。
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
              佐賀 年末クリニックを予定。
            </h2>
            <p>
              現在は「日程を先に空けてもらうため」の先行案内段階です。会場、対象カテゴリー、参加費、定員、申込方法は確定後に正式発表します。
              未確定情報を申込可能なイベントとしては表示しません。
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
                このページを更新し、RBA公式LINE・MY HOME COURT・公式SNS等で案内します。現時点では申込フォームや決済リンクはまだ公開しません。
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
              <h2>佐賀で、これから育てたいもの。</h2>
            </div>
            <p>
              下記は確定済みの開催日程ではなく、地域のニーズ、会場、協力者、参加状況を見ながら育てていく方向性です。
              「大きく見せる」より、実際に継続できることを優先します。
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
              <h2>増やしたいのは、試合数ではなく学習機会。</h2>
            </div>
            <p>
              たくさん試合をこなすこと、早く勝つこと、特定の選手だけを長く使うことを地域拠点の目的にはしません。
              年代に必要な経験を、練習とゲームの両方から設計します。
            </p>
          </div>
          <div className="journal-evidence-grid">
            <article>
              <Target />
              <span>01 / MODERN GAME</span>
              <h3>現代のゲームから逆算する</h3>
              <p>「昔からこうしてきた」だけで決めず、スペーシング、シュート、1on1、判断、トランジションなど今のゲームに必要な要素から課題を整理します。</p>
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
              <h3>経験を一部に集中させない</h3>
              <p>育成年代では、プレーすること自体が学習です。練習でもゲームでも関与する時間を大切にします。</p>
            </article>
            <article>
              <ShieldCheck />
              <span>04 / LONG TERM</span>
              <h3>長く続けられる身体へ</h3>
              <p>年齢、疲労、回復、成長期を無視せず、必要に応じてS&amp;Cの考え方も組み込みます。</p>
            </article>
          </div>
        </section>

        <section className="journal-cms-index section-pad" id="faq">
          <div className="section-head">
            <div>
              <p className="section-index">FAQ</p>
              <h2>RBA佐賀について、よくある質問。</h2>
            </div>
            <p>正式募集ごとに条件が変わるものは断定せず、その都度最新情報を案内します。</p>
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
              <strong>開催情報は「正式募集ページ」を優先します</strong>
              <p>
                このページは佐賀での活動全体をまとめる地域ハブです。日時、会場、参加費、対象、定員、キャンセル条件などについて、
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
              RBA佐賀は「RBAのチームを大きくすること」ではなく、佐賀・九州の子どもたちが必要な時に別の学びへアクセスできることを目指します。
              選手・保護者・指導者、そして地域で開催を支えてくださる方と一緒に、継続できる形をつくっていきます。
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
              佐賀で開催を支える <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
