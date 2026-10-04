import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  BookOpen,
  CalendarDays,
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
import sagaContent from "@/content/saga.json";

const totalApplications = sagaContent.history.reduce((sum, item) => sum + item.applications, 0);
const registrationUrl: string | null = sagaContent.nextEvent.registrationUrl;

export const metadata: Metadata = {
  title: { absolute: sagaContent.seo.title },
  description: sagaContent.seo.description,
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
    title: sagaContent.seo.ogTitle,
    description: sagaContent.seo.ogDescription,
    url: "https://riotbasketballacademy.com/ja/saga",
    siteName: "Riot Basketball Academy",
    locale: "ja_JP",
    type: "website",
    images: ["https://riotbasketballacademy.com/rba-court-hero.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: sagaContent.seo.ogTitle,
    description: sagaContent.seo.ogDescription,
    images: ["https://riotbasketballacademy.com/rba-court-hero.png"],
  },
};

const audiences = [
  {
    label: "PLAYER / FAMILY",
    title: "選手・保護者",
    body: "今のチームを続けながら、普段とは違う仲間やコーチから学びたい。",
    href: "/ja/opportunities",
    cta: "参加できる活動を見る",
  },
  {
    label: "COACH",
    title: "指導者",
    body: "選手の様子を見ながら、練習設計や育成年代への関わり方も学びたい。",
    href: "/ja/coaches",
    cta: "指導者向け情報を見る",
  },
  {
    label: "LOCAL HOST",
    title: "地域で支えてくださる方",
    body: "体育館や地域のつながりを生かして、佐賀で開催を続ける力になりたい。",
    href: "/ja/regional-host",
    cta: "地域開催について見る",
  },
  {
    label: "PARTNER",
    title: "企業・団体",
    body: "地域の子どもたちが新しい経験に出会える機会を、継続的に支えたい。",
    href: "/ja/partners",
    cta: "協賛・連携を見る",
  },
];

export default function SagaPage() {
  const pageJson = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "RBA佐賀",
    url: "https://riotbasketballacademy.com/ja/saga",
    inLanguage: "ja",
    description: sagaContent.seo.description,
    dateModified: sagaContent.updatedAt,
    isPartOf: {
      "@type": "WebSite",
      name: "Riot Basketball Academy",
      url: "https://riotbasketballacademy.com/",
    },
    mainEntity: {
      "@type": "ItemList",
      name: "RBA佐賀の開催記録",
      itemListElement: sagaContent.history.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${item.date} ${item.title}`,
      })),
    },
  };

  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: sagaContent.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }} />

        <section className="journal-cms-hero section-pad">
          <p className="section-index">{sagaContent.hero.eyebrow}</p>
          <h1>
            {sagaContent.hero.titleLine1}<br />
            {sagaContent.hero.titleLine2}
          </h1>
          <p>{sagaContent.hero.body}</p>
          <div className="saga-status-row" aria-label="次回開催のお知らせ">
            <span>UPDATED {sagaContent.updatedAt.replaceAll("-", ".")}</span>
            <strong>{sagaContent.hero.status}</strong>
          </div>
          <div className="homecourt-launch-actions">
            <Link className="button button-dark" href="#next">
              次回の予定を見る <ArrowRight size={17} />
            </Link>
            <Link className="button button-light" href="#history">
              これまでの開催を見る <ArrowRight size={17} />
            </Link>
            <a className="button button-light" href="https://lin.ee/5l1YG8N" target="_blank" rel="noreferrer">
              公式LINE <BellRing size={17} />
            </a>
          </div>
        </section>

        <nav className="saga-section-nav" aria-label="RBA佐賀 ページ内メニュー">
          <a href="#about">RBA佐賀とは</a>
          <a href="#history">これまで</a>
          <a href="#development">育成内容</a>
          <a href="#next">次回予定</a>
          <a href="#future">これから</a>
          <a href="#faq">FAQ</a>
        </nav>

        <section className="homecourt-product-preview section-pad">
          <div className="section-head">
            <div>
              <p className="section-index">SAGA IN NUMBERS</p>
              <h2>2025年9月から、少しずつ。</h2>
            </div>
            <p>
              これまでの申込記録は延べ{totalApplications}名分。
              複数回参加してくれる選手も少しずつ増え、佐賀で続ける活動になってきました。
            </p>
          </div>
          <div className="homecourt-preview-grid">
            <article>
              <Repeat2 />
              <span>CONTINUITY</span>
              <h3>2025 → 2026</h3>
              <p>一度きりではなく、季節をまたいで佐賀へ戻っています。</p>
            </article>
            <article>
              <UsersRound />
              <span>APPLICATION RECORDS</span>
              <h3>{totalApplications}+</h3>
              <p>過去4回の申込記録を開催ごとに整理した数字です。</p>
            </article>
            <article>
              <UserRoundCheck />
              <span>AGE RANGE</span>
              <h3>U8 → U15</h3>
              <p>低学年から中学生まで。年代や経験に合わせて内容を変えています。</p>
            </article>
            <article>
              <MapPin />
              <span>AREA</span>
              <h3>SAGA / KYUSHU</h3>
              <p>佐賀県内外から、所属や地域を越えて選手が集まっています。</p>
            </article>
          </div>
          <p className="saga-data-note">
            ※人数は申込フォームの記録を開催ごとに整理したものです。当日の実参加人数とは異なる場合があります。
          </p>
        </section>

        <section className="journal-evidence-standard section-pad" id="about">
          <div className="section-head">
            <div>
              <p className="section-index">WHAT RBA SAGA IS</p>
              <h2>
                今のチームのまま、<br />
                外の学びを足していく。
              </h2>
            </div>
            <p>
              RBA佐賀は固定チームでも、移籍先でもありません。
              普段の活動を続けながら、違う環境で新しい気づきを持ち帰るための場所です。
            </p>
          </div>
          <div className="journal-evidence-grid">
            {sagaContent.principles.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")} / PRINCIPLE</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <div className="homecourt-private-note">
            <ShieldCheck />
            <div>
              <strong>所属を変える必要はありません</strong>
              <p>
                RBA佐賀は、佐賀で行うクリニックやキャンプをまとめた地域ページです。
                対象、会場、参加費、申込方法は開催ごとにお知らせします。
              </p>
            </div>
          </div>
        </section>

        <section className="journal-cms-index section-pad" id="history">
          <div className="section-head">
            <div>
              <p className="section-index">HISTORY / 2025–2026</p>
              <h2>これまでの佐賀。</h2>
            </div>
            <p>{sagaContent.historyIntro}</p>
          </div>
          <div className="journal-cms-grid saga-grid-four">
            {sagaContent.history.map((item, index) => (
              <article key={`${item.date}-${item.title}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p className="note-tag">{item.date}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="journal-evidence-standard section-pad" id="development">
          <div className="section-head">
            <div>
              <p className="section-index">DEVELOPMENT DESIGN</p>
              <h2>{sagaContent.development.title}</h2>
            </div>
            <p>{sagaContent.development.intro}</p>
          </div>
          <div className="journal-evidence-grid">
            {sagaContent.development.items.map((item, index) => (
              <article key={item.label}>
                <span>{String(index + 1).padStart(2, "0")} / {item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <div className="homecourt-launch-actions">
            <Link className="button button-light" href="/ja/approach">
              RBAの育成方針を見る <BookOpen size={16} />
            </Link>
            <Link className="button button-light" href="/ja/development">
              育成ガイドを見る <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section className="homecourt-product-preview section-pad">
          <div className="section-head">
            <div>
              <p className="section-index">JOIN / SUPPORT</p>
              <h2>いろいろな関わり方があります。</h2>
            </div>
            <p>
              選手として参加するだけでなく、指導者として学ぶ、地域で開催を支える、企業として応援する。
              佐賀で活動を続けるための入り口を分けています。
            </p>
          </div>
          <div className="homecourt-preview-grid">
            {audiences.map((item) => (
              <article key={item.label}>
                <HeartHandshake />
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <Link className="text-link" href={item.href}>
                  {item.cta} <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="homecourt-plan-separation section-pad" id="next">
          <div className="homecourt-plan-intro">
            <p className="section-index">{sagaContent.nextEvent.eyebrow}</p>
            <h2>
              {sagaContent.nextEvent.titleLine1}<br />
              {sagaContent.nextEvent.titleLine2}
            </h2>
            <p>{sagaContent.nextEvent.body}</p>
          </div>
          <div className="homecourt-plan-grid">
            {sagaContent.nextEvent.dates.map((item, index) => (
              <article className="homecourt-plan-card" key={item.date}>
                <CalendarDays />
                <span>{item.date} / {item.day}</span>
                <h3>DAY {index + 1} / PLANNED</h3>
                <p>
                  {item.sessions.map((session) => (
                    <span className="saga-session-time" key={session}>{session}</span>
                  ))}
                </p>
              </article>
            ))}
          </div>
          <div className="homecourt-private-note">
            <BellRing />
            <div>
              <strong>詳しい内容は、もう少しお待ちください</strong>
              <p>{sagaContent.nextEvent.notice}</p>
            </div>
          </div>
          <div className="homecourt-launch-actions">
            {registrationUrl ? (
              <a className="button button-dark" href={registrationUrl} target="_blank" rel="noreferrer">
                申込・詳細を見る <ArrowRight size={16} />
              </a>
            ) : (
              <a className="button button-dark" href="https://lin.ee/5l1YG8N" target="_blank" rel="noreferrer">
                詳細が決まったらLINEで受け取る <BellRing size={16} />
              </a>
            )}
            <Link className="button button-light" href="/ja/my-homecourt">
              無料でRBA IDをつくる <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section className="journal-cms-index section-pad" id="future">
          <div className="section-head">
            <div>
              <p className="section-index">WHAT’S NEXT</p>
              <h2>{sagaContent.roadmap.title}</h2>
            </div>
            <p>{sagaContent.roadmap.intro}</p>
          </div>
          <div className="journal-cms-grid saga-grid-four">
            {sagaContent.roadmap.items.map((item, index) => (
              <article key={item.phase}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p className="note-tag">{item.phase}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="journal-evidence-standard section-pad">
          <div className="section-head">
            <div>
              <p className="section-index">RBA SAGA STANDARD</p>
              <h2>昔からのやり方ではなく、今のゲームから考える。</h2>
            </div>
            <p>
              勝つことを否定するわけではありません。
              ただ、育成年代では結果だけでなく、見て、考えて、選んで、実行する経験を増やすことを大切にします。
            </p>
          </div>
          <div className="journal-evidence-grid">
            <article>
              <Target />
              <span>01 / MODERN GAME</span>
              <h3>今のゲームから逆算する</h3>
              <p>スペーシング、シュート、1on1、判断、トランジション。今のバスケットボールで必要なことから練習を考えます。</p>
            </article>
            <article>
              <Compass />
              <span>02 / DECISION</span>
              <h3>答えを教えすぎない</h3>
              <p>選手が自分で見て、考えて、選べる余白を残します。失敗も、次の判断につながる大事な経験です。</p>
            </article>
            <article>
              <UsersRound />
              <span>03 / EXPERIENCE</span>
              <h3>プレーする時間を大切にする</h3>
              <p>育成年代では、実際にプレーすること自体が学びです。練習でもゲームでも、関わる時間を増やします。</p>
            </article>
            <article>
              <ShieldCheck />
              <span>04 / LONG TERM</span>
              <h3>長く続けられる身体へ</h3>
              <p>年齢や成長段階、疲労、回復も見ながら、必要に応じてS&amp;Cの考え方も取り入れます。</p>
            </article>
          </div>
        </section>

        <section className="journal-cms-index section-pad" id="faq">
          <div className="section-head">
            <div>
              <p className="section-index">FAQ</p>
              <h2>よくある質問。</h2>
            </div>
            <p>会場や参加条件などは開催ごとに変わるため、正式募集時の最新情報をご確認ください。</p>
          </div>
          <div className="journal-cms-grid saga-faq-grid">
            {sagaContent.faq.map((item, index) => (
              <article key={item.question}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
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
            <p className="section-index">RBA SAGA</p>
            <h2>
              また佐賀で、<br />
              一緒にバスケをしましょう。
            </h2>
            <p>
              今のチームを大切にしながら、外の環境で学ぶこともできる。
              RBA佐賀は、その選択肢を少しずつ増やしていきます。
            </p>
          </div>
          <div>
            <Link className="button button-member" href="/ja/contact">
              RBA佐賀について相談する <ArrowRight size={16} />
            </Link>
            <Link className="text-link light-link" href="/ja/regions">
              全国の活動拠点を見る <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
