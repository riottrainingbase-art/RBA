import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: { absolute: "バスケットボール育成｜ミニバス・U12・U15・保護者・指導者｜RBA" },
  description: "ミニバス・U12・U15の育成、出場時間、チーム選び、練習設計、S&C、女子選手の身体づくりまで。RBA JOURNALと全国の育成機会を、悩み・年代・立場から探せます。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/development" },
  openGraph: {
    title: "バスケットボール育成｜ミニバス・U12・U15から考える",
    description: "勝敗だけではなく、子どもの長期的な成長から育成を考えるRBAの入口。ミニバス、U15、出場時間、チーム選び、指導、S&Cを整理します。",
    url: "https://riotbasketballacademy.com/ja/development",
    siteName: "Riot Basketball Academy",
    locale: "ja_JP",
    type: "website",
    images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "バスケットボール育成｜RBA",
    description: "ミニバス・U12・U15・保護者・指導者の悩みから、必要な記事と育成機会へ。",
    images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"],
  },
};

const topics = [
  {
    index: "01",
    title: "ミニバス・U12",
    body: "勝つことと育てること、出場時間、マンツーマン、役割固定。小学生年代で何を残すかを考えます。",
    href: "/ja/journal/paths/u12",
    cta: "U12の育成を読む",
  },
  {
    index: "02",
    title: "U15・進路",
    body: "部活、クラブ、Bユース、登録、移籍、出場機会。名前や戦績だけでなく3年間の環境を整理します。",
    href: "/ja/journal/paths/u15",
    cta: "U15の進路を整理する",
  },
  {
    index: "03",
    title: "出場時間・経験",
    body: "試合に出ることは育成年代の経験そのもの。上手い・下手だけで機会を固定しないための考え方をまとめます。",
    href: "/ja/journal/playing-time-is-experience",
    cta: "出場機会について読む",
  },
  {
    index: "04",
    title: "チーム選び・移籍",
    body: "強い、近い、有名だけでは分からない。体験会、費用、出場機会、指導環境、移籍まで同じ基準で考えます。",
    href: "/ja/journal/paths/team-choice",
    cta: "チーム選びを考える",
  },
  {
    index: "05",
    title: "指導・練習設計",
    body: "説明を増やす前に、選手が見て、考えて、試せる時間をどう残すか。指導者向けの実践テーマです。",
    href: "/ja/journal/paths/coaches",
    cta: "指導者向け記事を読む",
  },
  {
    index: "06",
    title: "S&C・女子選手",
    body: "筋力、負荷、回復、膝の健康、ACL予防、成長期。罰走や根性論と身体づくりを分けて考えます。",
    href: "/ja/journal/paths/girls",
    cta: "身体づくりを読む",
  },
];

const faq = [
  ["ミニバスで勝つことと育成は同じですか？","勝利には価値があります。ただし、育成年代では勝敗だけで育成の成功を判断せず、出場機会、判断経験、役割の幅、長期的な身体づくりまで一緒に見る必要があります。"],
  ["試合に出られない選手はどう考えればいいですか？","出場時間は経験を積む機会です。現在の能力だけで固定せず、どんな場面なら経験を渡せるか、練習と試合をどう接続するかを考えることが重要です。"],
  ["U15のチームは何を基準に選べばいいですか？","戦績だけでなく、登録、大会参加、出場機会、練習量、通学、睡眠、学業、指導方針を同じ基準で比較することを勧めています。"],
  ["RBAの記事を読んだあと、実際に参加できますか？","はい。OPPORTUNITIESではクリニック、キャンプ、スクール、国際交流など現在募集中の活動を確認できます。"],
];

export default function DevelopmentPage() {
  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(([name, text]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text },
    })),
  };
  const collectionJson = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "RBA バスケットボール育成ガイド",
    url: "https://riotbasketballacademy.com/ja/development",
    inLanguage: "ja",
    isPartOf: { "@type": "WebSite", name: "Riot Basketball Academy", url: "https://riotbasketballacademy.com/" },
    about: ["ミニバス","U12","U15","出場時間","チーム選び","バスケットボール指導","S&C"],
    mainEntity: {
      "@type": "ItemList",
      itemListElement: topics.map((topic,index)=>({
        "@type": "ListItem",
        position:index+1,
        name:topic.title,
        url:`https://riotbasketballacademy.com${topic.href}`,
      })),
    },
  };
  const breadcrumbJson = {
    "@context":"https://schema.org",
    "@type":"BreadcrumbList",
    itemListElement:[
      {"@type":"ListItem",position:1,name:"RBA",item:"https://riotbasketballacademy.com/ja"},
      {"@type":"ListItem",position:2,name:"育成ガイド",item:"https://riotbasketballacademy.com/ja/development"},
    ],
  };

  return (
    <SiteFrame locale="ja" languagePage="journal">
      <main className="journal-hub journal-cms">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJson) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }} />
        <section className="journal-cms-hero section-pad">
          <p className="section-index">RBA DEVELOPMENT GUIDE</p>
          <h1>バスケットボール育成を、<br/>悩みから探す。</h1>
          <p>ミニバス・U12・U15、出場時間、チーム選び、指導、身体づくり。記事を増やすことではなく、「いま何に困っているか」から必要な情報と次の行動へつなげる入口です。</p>
          <div className="homecourt-launch-actions">
            <Link className="button button-dark" href="/ja/journal">RBA JOURNALを見る <ArrowRight size={17}/></Link>
            <Link className="button button-light" href="/ja/opportunities">募集中の活動を見る <ArrowRight size={17}/></Link>
          </div>
        </section>

        <section className="journal-cms-index section-pad">
          <div className="section-head">
            <div><p className="section-index">START FROM THE QUESTION</p><h2>検索語ではなく、今の悩みから。</h2></div>
            <p>全部読む必要はありません。年代や立場に近いテーマから進んでください。</p>
          </div>
          <div className="journal-cms-grid">
            {topics.map(topic => (
              <Link href={topic.href} key={topic.index}>
                <span>{topic.index}</span>
                <p className="note-tag">DEVELOPMENT TOPIC</p>
                <h3>{topic.title}</h3>
                <p>{topic.body}</p>
                <strong>{topic.cta} <ArrowRight size={16}/></strong>
              </Link>
            ))}
          </div>
        </section>

        <section className="journal-evidence-standard section-pad">
          <div className="section-head">
            <div><p className="section-index">RBA POSITION</p><h2>勝つことを否定しない。<br/>でも、勝敗だけで育成を決めない。</h2></div>
            <p>見る、判断する、実行する、振り返る。さらに、長く競技を続ける身体と、プレーする機会を守る。RBAは育成年代の現在と将来を同時に考えます。</p>
          </div>
          <div className="journal-evidence-grid">
            <article><span>01 / EXPERIENCE</span><h3>経験を渡す</h3><p>出場、役割、失敗、修正。育成年代では経験そのものが学習機会です。</p></article>
            <article><span>02 / DECISION</span><h3>判断を育てる</h3><p>答えを覚えるだけでなく、相手・味方・スペースから自分で選べる環境をつくります。</p></article>
            <article><span>03 / HEALTH</span><h3>身体を守る</h3><p>S&C、負荷、回復、睡眠、成長期を含め、長く続けられる身体を考えます。</p></article>
            <article><span>04 / ENVIRONMENT</span><h3>環境を見る</h3><p>チームの強さだけでなく、毎週どんな経験を積める場所かを見ます。</p></article>
          </div>
        </section>

        <section className="homecourt-product-preview section-pad">
          <div className="section-head">
            <div><p className="section-index">REGIONAL EXAMPLE / SAGA</p><h2>考え方を、地域の現場へ。</h2></div>
            <p>RBA佐賀では、今の所属を続けながら参加できるクリニック・キャンプを継続し、基礎から小局面、判断を伴うゲームへと学びをつなげています。</p>
          </div>
          <div className="homecourt-preview-grid">
            <article><span>01</span><h3>継続開催</h3><p>2025年から季節をまたいで佐賀で開催を重ね、一度きりで終わらない育成機会をつくっています。</p></article>
            <article><span>02</span><h3>U8 → U15</h3><p>低学年から中学生まで、身体の発達や競技経験に合わせて課題を調整します。</p></article>
            <article><span>03</span><h3>ゲームへつなぐ</h3><p>1on1、2on2、3on3、スペーシング、5on5へ。技術を判断と切り離しません。</p></article>
            <article><span>04</span><h3>次の機会へ</h3><p>地域開催から全国キャンプ、県外交流、Japan × Asiaまで、希望する選手が次の挑戦へ進める導線をつくります。</p></article>
          </div>
          <div className="homecourt-launch-actions"><Link className="button button-dark" href="/ja/saga">RBA佐賀を見る <ArrowRight size={17}/></Link></div>
        </section>

        <section className="journal-cms-index section-pad">
          <div className="section-head"><div><p className="section-index">FAQ</p><h2>よくある育成の問い。</h2></div><p>結論を急がず、確認すべきことを分けます。</p></div>
          <div className="journal-cms-grid">
            {faq.map(([q,a], index) => (
              <article key={q}>
                <span>{String(index+1).padStart(2,"0")}</span>
                <h3>{q}</h3>
                <p>{a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="journal-exchange-cta section-pad">
          <div>
            <p className="section-index inverse">FROM READING TO ACTION</p>
            <h2>読むだけで終わらせず、<br/>次の経験へ。</h2>
            <p>全国のクリニック、キャンプ、スクール、指導者学習、国際交流をRBA OPPORTUNITIESで確認できます。</p>
          </div>
          <div>
            <Link className="button button-light" href="/ja/opportunities">募集中を見る <ArrowRight size={16}/></Link>
            <Link className="button button-dark" href="/ja/my-homecourt/login?source=development-hub">RBA IDを無料でつくる <ArrowRight size={16}/></Link>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
