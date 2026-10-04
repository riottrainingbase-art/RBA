import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, MapPin, Repeat2, UsersRound } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: { absolute: "RBA 佐賀｜育成年代バスケットボールの継続クリニック・キャンプ" },
  description: "Riot Basketball Academy（RBA）の佐賀エリア活動ページ。2025年からのクリニック・2DAYS CAMPの歩み、育成内容、2026年12月28日・29日の年末クリニック予定、今後の育成構想をまとめています。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/saga" },
  openGraph: {
    title: "RBA 佐賀｜単発で終わらない育成機会を",
    description: "佐賀で継続してきたRBAの育成年代クリニック・キャンプと、これからの見通し。",
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
    body: "複数日で育成年代の選手が集まり、RBAの佐賀での継続活動がスタート。申込記録では22名の選手が参加枠へエントリーしました。",
  },
  {
    index: "02",
    date: "2026 / JAN",
    title: "佐賀 2DAYS CAMP",
    body: "1月24日・25日に開催。小学生を中心に中学生まで参加し、各年代の課題に合わせて学ぶ2日間へ。申込記録では28名の選手が参加枠へエントリーしました。",
  },
  {
    index: "03",
    date: "2026 / JUL",
    title: "SUMMER DEVELOPMENT",
    body: "7月4日・5日に開催。1日参加や午前のみなど参加方法を広げ、より多くの家庭が育成機会へアクセスできる形を試しました。申込記録では42名の選手が参加枠へエントリーしました。",
  },
  {
    index: "04",
    date: "2026 / OCT",
    title: "SAGA × FUKUOKA 2DAYS",
    body: "U8・U10・U12・U15を対象に、基礎から小局面、3x3、5on5へつなぐDevelopment Campを実施。申込記録では17名の選手が参加枠へエントリーしました。",
  },
];

const programme = [
  ["01", "FOUNDATION", "フットワーク、ボールハンドリング、パス、フィニッシュ、シュート。動作を覚えることだけでなく、ゲームで使うための土台をつくります。"],
  ["02", "1ON1 → SMALL SIDED GAME", "1on1から2on2・3on3へ。相手、味方、スペースを見ながら、自分で選ぶ回数を増やします。"],
  ["03", "SPACING & DECISION MAKING", "どこへ動くか、いつ攻めるか、いつパスするか。決められた形を再現するだけではなく、状況から判断することを重視します。"],
  ["04", "GAME TRANSFER", "3x3、アドバンテージゲーム、5on5へ。練習でできたことを試合の中で使える状態へ移していきます。"],
];

const outlook = [
  ["01", "年数回の継続開催へ", "単発イベントではなく、春・夏・秋・冬など定期的に戻ってこられる育成機会を目指します。会場確保と地域日程を確認しながら開催します。"],
  ["02", "年代・発達段階で分ける", "U8・U10・U12・U15を一括りにせず、身体・認知・競技経験に合わせて内容と負荷を調整します。"],
  ["03", "試合につながる練習へ", "ドリルの完成度だけではなく、見る・判断する・実行する・振り返るまでを一つの学習として設計します。"],
  ["04", "佐賀から次の挑戦へ", "希望する選手には、RBAの全国キャンプ、県外交流、Japan × Asiaの国際交流など、所属を変えずに次の経験へ進める導線をつくります。"],
];

export default function SagaPage() {
  const pageJson = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "RBA 佐賀",
    url: "https://riotbasketballacademy.com/ja/saga",
    inLanguage: "ja",
    description: "Riot Basketball Academyの佐賀エリアにおける育成年代バスケットボールの継続クリニック・キャンプ情報。",
    isPartOf: {
      "@type": "WebSite",
      name: "Riot Basketball Academy",
      url: "https://riotbasketballacademy.com/",
    },
    about: ["佐賀 バスケットボール", "ミニバス", "U12", "U15", "育成クリニック", "バスケットボールキャンプ"],
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
      <main className="journal-hub journal-cms">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJson) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }} />

        <section className="journal-cms-hero section-pad">
          <p className="section-index">RBA SAGA / REGIONAL DEVELOPMENT</p>
          <h1>RBA 佐賀。<br />単発で終わらない育成機会を。</h1>
          <p>
            Riot Basketball Academyは、2025年から佐賀で育成年代のクリニック・キャンプを継続しています。
            目指しているのは、強い選手だけを集めることでも、所属チームを変えてもらうことでもありません。
            今いる環境のまま、学び直し、試し、次の挑戦へ進める場所を佐賀に残していくことです。
          </p>
          <div className="homecourt-launch-actions">
            <Link className="button button-dark" href="#next">年末予定を見る <ArrowRight size={17} /></Link>
            <Link className="button button-light" href="/ja/opportunities">現在募集中の活動 <ArrowRight size={17} /></Link>
          </div>
        </section>

        <section className="homecourt-product-preview section-pad">
          <div className="section-head">
            <div>
              <p className="section-index">SAGA IN NUMBERS</p>
              <h2>佐賀で、継続して積み上げる。</h2>
            </div>
            <p>参加申込フォームを各期内で重複整理すると、2025年9月から2026年10月までの4期で延べ100名を超える選手が参加枠へエントリーしています。</p>
          </div>
          <div className="homecourt-preview-grid">
            <article><Repeat2 /><span>CONTINUITY</span><h3>2025 → 2026</h3><p>1回で終わらず、季節をまたいで開催を継続。</p></article>
            <article><UsersRound /><span>PLAYER ENTRIES</span><h3>100+</h3><p>4期の申込記録で延べ100名超。複数回参加する選手もいます。</p></article>
            <article><CheckCircle2 /><span>AGE RANGE</span><h3>U8 → U15</h3><p>小学生低学年から中学生まで、発達段階に合わせて設計。</p></article>
            <article><MapPin /><span>AREA</span><h3>SAGA / KYUSHU</h3><p>佐賀を軸に、九州の選手がつながれる育成機会へ。</p></article>
          </div>
        </section>

        <section className="journal-cms-index section-pad">
          <div className="section-head">
            <div><p className="section-index">HISTORY</p><h2>これまでの佐賀開催。</h2></div>
            <p>開催ごとに同じ内容を繰り返すのではなく、参加年代や日程に合わせて形式を更新してきました。</p>
          </div>
          <div className="journal-cms-grid">
            {history.map(item => (
              <article key={item.index}>
                <span>{item.index}</span>
                <p className="note-tag">{item.date}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <div className="homecourt-launch-actions">
            <Link className="button button-light" href="/ja/camp/saga-fukuoka-2026">2026年10月のプログラムを見る <ArrowRight size={16} /></Link>
          </div>
        </section>

        <section className="journal-evidence-standard section-pad">
          <div className="section-head">
            <div><p className="section-index">WHAT WE TRAIN</p><h2>「できた」で終わらず、<br />「試合で使える」まで。</h2></div>
            <p>最近の佐賀・九州開催で軸にしているのは、技術を単独で反復するだけではなく、小局面からゲームへ接続することです。</p>
          </div>
          <div className="journal-evidence-grid">
            {programme.map(([n, title, body]) => (
              <article key={n}><span>{n} / {title}</span><h3>{title}</h3><p>{body}</p></article>
            ))}
          </div>
        </section>

        <section className="homecourt-plan-separation section-pad" id="next">
          <div className="homecourt-plan-intro">
            <p className="section-index">NEXT / YEAR END 2026</p>
            <h2>12月28日・29日、<br />佐賀 年末クリニックを予定。</h2>
            <p>
              現在は日程と時間帯の先行案内段階です。会場、対象カテゴリー、参加費、申込方法は確定後に正式発表します。
            </p>
          </div>
          <div className="homecourt-plan-grid">
            <article className="homecourt-plan-card">
              <CalendarDays />
              <span>2026.12.28 / MON</span>
              <h3>DAY 1</h3>
              <p>9:00〜11:30<br />13:30〜16:30<br />19:00〜20:30</p>
            </article>
            <article className="homecourt-plan-card">
              <CalendarDays />
              <span>2026.12.29 / TUE</span>
              <h3>DAY 2</h3>
              <p>9:00〜11:30<br />13:30〜16:30<br />19:00〜20:30</p>
            </article>
          </div>
          <div className="homecourt-launch-actions">
            <Link className="button button-dark" href="/ja/my-homecourt">RBA ID / MY HOME COURT <ArrowRight size={16} /></Link>
            <Link className="button button-light" href="/ja/schedule">開催日程を見る <ArrowRight size={16} /></Link>
          </div>
        </section>

        <section className="journal-cms-index section-pad">
          <div className="section-head">
            <div><p className="section-index">NEXT STAGE</p><h2>佐賀で、これからつくりたいもの。</h2></div>
            <p>開催回数を増やすこと自体が目的ではありません。地域の選手が、必要な時に良い学びへ戻ってこられる仕組みを育てます。</p>
          </div>
          <div className="journal-cms-grid">
            {outlook.map(([n, title, body]) => (
              <article key={n}><span>{n}</span><h3>{title}</h3><p>{body}</p></article>
            ))}
          </div>
        </section>

        <section className="network-release section-pad">
          <UsersRound />
          <div>
            <p className="section-index">OPEN REGIONAL PLATFORM</p>
            <h2>所属を変えなくても、<br />育成の選択肢は増やせる。</h2>
            <p>
              RBA佐賀は特定チームへの勧誘を目的とした活動ではありません。ミニバス、クラブ、部活動など今の所属を続けながら参加できます。
              選手・保護者・指導者、そして地域で開催を支えてくださる方と一緒に、継続できる育成環境をつくっていきます。
            </p>
          </div>
          <Link className="button button-member" href="/ja/contact">佐賀開催について相談する <ArrowRight size={16} /></Link>
        </section>
      </main>
    </SiteFrame>
  );
}
