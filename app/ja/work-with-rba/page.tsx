import type { Metadata } from "next";
import { ArrowRight, Building2, Globe2, Handshake, MapPinned, Trophy, Users } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "RBAと一緒に活動をつくる｜開催・地域連携・協賛",
  description: "クリニック、Development Camp、RBA UNITED、地域開催、海外交流、協賛・連携。RBAと一緒に実際の育成機会をつくりたいチーム・主催者・企業向けの案内です。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/work-with-rba" },
  openGraph: {
    title: "RBAと一緒に活動をつくる",
    description: "情報を売るのではなく、実際のコート、活動、交流、育成機会を一緒につくる。",
    url: "https://riotbasketballacademy.com/ja/work-with-rba",
    siteName: "Riot Basketball Academy",
    locale: "ja_JP",
    type: "website",
    images: ["/rba-court-hero.png"],
  },
};

const routes = [
  {
    icon: Trophy,
    tag: "TEAM VISIT CLINIC",
    title: "普段の練習に、RBAを呼ぶ",
    body: "RBAがチームの体育館へ伺い、普段の練習環境や育成課題を見ながら、そのチームに必要なテーマを組み立てます。選手指導だけでなく、希望に応じて指導者へのフィードバックや継続訪問にも対応します。",
    href: "/ja/team-visit-clinic",
    cta: "TEAM VISIT CLINICを見る",
  },
  {
    icon: Users,
    tag: "DEVELOPMENT CAMP",
    title: "育成を深めるキャンプをつくる",
    body: "練習、ゲーム、身体づくり、振り返りを組み合わせ、参加した選手が日常へ持ち帰れる課題をつくります。単発のイベントで終わらせない設計です。",
    href: "/ja/camp",
    cta: "Development Campを見る",
  },
  {
    icon: MapPinned,
    tag: "REGIONAL HOST",
    title: "地域に継続的な開催拠点をつくる",
    body: "地域の指導者、チーム、会場と連携し、その土地に合った形でRBAの活動を継続開催します。支店やフランチャイズを増やすのではなく、地域ごとの強みを生かします。",
    href: "/ja/regional-host",
    cta: "地域開催について見る",
  },
  {
    icon: Globe2,
    tag: "JAPAN × ASIA",
    title: "国内外の交流機会をつくる",
    body: "交流試合、キャンプ、指導者交流などを、年代と目的に合わせて組み立てます。参加条件や実施体制を確認できたものだけを具体的な企画として扱います。",
    href: "/ja/international",
    cta: "海外連携を相談する",
  },
  {
    icon: Handshake,
    tag: "PARTNERSHIP",
    title: "企業・地域パートナーとして支える",
    body: "広告枠を売るだけではなく、地域開催、参加機会、育成環境、海外交流など、支援がどこに使われるかを明確にした連携をつくります。",
    href: "/ja/partners",
    cta: "協賛・連携について見る",
  },
  {
    icon: Building2,
    tag: "ORGANIZER",
    title: "大会・イベント運営を一緒につくる",
    body: "募集、参加者管理、決済、会場運営、安全管理など、実際の開催に必要な業務を整理します。提供できる機能から段階的に運用します。",
    href: "/ja/organizer",
    cta: "主催者向け案内を見る",
  },
];

export default function Page() {
  return <SiteFrame locale="ja">
    <section className="inner-hero section-pad">
      <a className="back-link" href="/ja">← RBA</a>
      <p className="section-index">WORK WITH RBA</p>
      <h1>情報を売るのではなく、<br/>実際の育成機会をつくる。</h1>
      <p>RBAが一緒につくりたいのは、教材を買って終わる関係ではありません。子どもが実際にプレーできる場、指導者が学びを現場で試せる場、地域や海外とつながる機会を増やしていきます。</p>
      <div className="closing-actions">
        <a className="button button-orange" href="/ja/clinic-request">RBAを地域に呼ぶ<ArrowRight size={17}/></a>
        <a className="button button-dark" href="/ja/contact">まず相談する<ArrowRight size={17}/></a>
      </div>
    </section>

    <section className="homecourt-product-preview section-pad">
      <div className="section-head">
        <div><p className="section-index">REAL PROGRAMMES / REAL PLACES</p><h2>売るのは情報ではなく、実際に動く仕組み。</h2></div>
        <p>参加費、開催費、協賛、地域連携など、実際の活動に価値が生まれる形を中心に事業を組み立てます。</p>
      </div>
      <div className="homecourt-preview-grid">
        <article><Users/><span>01</span><h3>参加する</h3><p>クリニック、キャンプ、大会、交流など、実際にコートへ出る機会をつくる。</p></article>
        <article><Trophy/><span>02</span><h3>開催する</h3><p>クラブや地域がRBAを呼び、必要な育成テーマに合わせてプログラムを実施する。</p></article>
        <article><MapPinned/><span>03</span><h3>地域で続ける</h3><p>一度の開催で終わらず、地域の指導者や会場と継続できる形にする。</p></article>
        <article><Handshake/><span>04</span><h3>支える</h3><p>企業や地域の支援を、参加機会や安全な育成環境へ具体的に還元する。</p></article>
      </div>
    </section>

    <section className="access-promise section-pad">
      <p className="section-index">CHOOSE A ROUTE</p>
      <div><h2>目的に合わせて、RBAとの関わり方を選べます。</h2><p>まだ企画が固まっていなくても構いません。地域、対象年代、人数、やりたいことが分かる範囲から整理します。</p></div>
    </section>
    <section className="access-grid section-pad">
      {routes.map(({icon:Icon,tag,title,body,href,cta}) => <article key={tag}>
        <Icon size={28}/>
        <span>{tag}</span>
        <h2>{title}</h2>
        <p>{body}</p>
        <a className="text-link" href={href}>{cta}<ArrowRight size={16}/></a>
      </article>)}
    </section>

    <section className="statement section-pad">
      <p className="section-index">BUSINESS PRINCIPLE</p>
      <div>
        <h2>RBAの事業は、<br/>コートに戻ってくる。</h2>
        <p>収益をつくることと、育成を良くすることを分けません。参加者が増える、地域開催が増える、指導者が学ぶ、企業支援で新しい機会が生まれる。その循環自体をRBAの事業にしていきます。</p>
        <a className="text-link" href="/ja/impact">RBA IMPACTを見る<ArrowRight size={16}/></a>
      </div>
    </section>

    <section className="closing-cta section-pad">
      <p className="eyebrow">START A REAL PROJECT</p>
      <h2>まず、地域と対象年代、<br/>やりたいことを教えてください。</h2>
      <p>クリニック、キャンプ、地域開催、海外交流、協賛・連携まで。実現できる形を一緒に整理します。</p>
      <div className="closing-actions">
        <a className="button button-orange" href="/ja/clinic-request">開催相談を始める<ArrowRight size={17}/></a>
        <a className="button button-dark" href="/ja/contact">その他の連携を相談する<ArrowRight size={17}/></a>
      </div>
    </section>
  </SiteFrame>;
}