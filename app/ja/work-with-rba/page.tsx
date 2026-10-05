import type { Metadata } from "next";
import { ArrowRight, Building2, Globe2, Handshake, MapPinned, Trophy, Users } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "RBAと一緒に活動をつくる｜開催・地域連携・協賛",
  description: "クリニック、Development Camp、RBA UNITED、地域開催、海外交流、協賛・連携。RBAと一緒に実際の活動をつくりたいチーム・主催者・企業向けの案内です。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/work-with-rba" },
  openGraph: {
    title: "RBAと一緒に活動をつくる",
    description: "情報だけで終わらせず、実際のコート、活動、交流を一緒につくる。",
    url: "https://riotbasketballacademy.com/ja/work-with-rba",
    siteName: "Riot Basketball Academy",
    locale: "ja_JP",
    type: "website",
    images: ["/rba-court-hero.png"],
  },
};

const routes = [
  {
    icon: Users,
    tag: "MINIBASKET SUPPORT",
    title: "ミニバスの育成環境を一緒に整える",
    body: "今いるチームを大切にしながら、練習設計、映像レビュー、指導者相談、オンコート支援まで。どのサービスが必要か決まっていなくても、チーム育成診断から始められます。",
    href: "/ja/minibasket-support",
    cta: "ミニバス育成支援を見る",
  },
  {
    icon: Users,
    tag: "TEAM TRAINING",
    title: "普段のチーム練習を設計する",
    body: "テーマ、見る・判断する課題、Small-Sided Game、振り返りまでを一つの流れで組み立てます。TEAM HOMEに練習内容を残し、前回からの変化も確認できます。",
    href: "/ja/team-training",
    cta: "TEAM TRAININGを見る",
  },
  {
    icon: Trophy,
    tag: "VISIT TRAINING",
    title: "普段の練習に、RBAを呼ぶ",
    body: "RBAがチームの体育館へ伺い、普段の練習を観察しながら、必要なテーマを実際の練習で一緒に試します。オンコート指導、ゲーム観察、指導者フィードバック、継続訪問まで目的に合わせて組み立てます。",
    href: "/ja/team-visit-clinic",
    cta: "VISIT TRAININGを見る",
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
    icon: Users,
    tag: "RBA OKINAWA / COACH",
    title: "沖縄で、子どもたちの育成に関わる",
    body: "沖縄で継続的な育成活動を一緒につくる現地コーチを募集しています。まずは月2〜4回程度から。現在の仕事やチームでの活動と両立しながら関わることもできます。",
    href: "/ja/okinawa-coach",
    cta: "沖縄コーチ募集を見る",
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
    body: "広告枠を売るだけではなく、地域開催、参加費の負担軽減、安全な活動環境、海外交流など、支援の使い道が分かる連携を行います。",
    href: "/ja/partners",
    cta: "協賛・連携について見る",
  },
  {
    icon: Building2,
    tag: "ORGANIZER",
    title: "大会・イベント運営を一緒につくる",
    body: "募集、参加者管理、決済、会場運営、安全管理など、開催に必要な業務を確認します。できる範囲から段階的に運用します。",
    href: "/ja/organizer",
    cta: "主催者向け案内を見る",
  },
];

export default function Page() {
  return <SiteFrame locale="ja">
    <section className="inner-hero section-pad">
      <a className="back-link" href="/ja">← RBA</a>
      <p className="section-index">WORK WITH RBA</p>
      <h1>情報だけで終わらせず、<br/>実際に活動できる場をつくる。</h1>
      <p>RBAが一緒につくりたいのは、教材を買って終わる関係ではありません。子どもが実際にプレーできる場、指導者が学んだことを試せる場、地域や海外と交流できる機会を増やします。</p>
      <div className="closing-actions">
        <a className="button button-orange" href="/ja/clinic-request">RBAを地域に呼ぶ<ArrowRight size={17}/></a>
        <a className="button button-dark" href="/ja/contact">まず相談する<ArrowRight size={17}/></a>
      </div>
    </section>

    <section className="homecourt-product-preview section-pad">
      <div className="section-head">
        <div><p className="section-index">REAL PROGRAMMES / REAL PLACES</p><h2>大切にするのは、実際に活動が続くこと。</h2></div>
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
      <div><h2>目的に合わせて、RBAとの関わり方を選べます。</h2><p>まだ企画が固まっていなくても構いません。地域、対象年代、人数、やりたいことなど、分かる範囲から一緒に確認します。</p></div>
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
        <p>RBAは、事業として継続できることと、育成環境を良くすることの両方を大切にします。参加者が増え、地域開催が続き、指導者が学び、企業支援で新しい活動が生まれる形を目指します。</p>
        <a className="text-link" href="/ja/impact">RBA IMPACTを見る<ArrowRight size={16}/></a>
      </div>
    </section>

    <section className="closing-cta section-pad">
      <p className="eyebrow">START A REAL PROJECT</p>
      <h2>まず、地域と対象年代、<br/>やりたいことを教えてください。</h2>
      <p>クリニック、キャンプ、地域開催、海外交流、協賛・連携まで。実施できる形を一緒に考えます。</p>
      <div className="closing-actions">
        <a className="button button-orange" href="/ja/clinic-request">開催相談を始める<ArrowRight size={17}/></a>
        <a className="button button-dark" href="/ja/contact">その他の連携を相談する<ArrowRight size={17}/></a>
      </div>
    </section>
  </SiteFrame>;
}