import type { Metadata } from "next";
import { ArrowRight, Building2, Globe2, Handshake, MapPinned, Trophy, Users } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "RBAと一緒に活動をつくる｜開催・地域連携・協賛",
  description: "クリニック、Development Camp、RBA UNITED、地域開催、海外交流、協賛・連携。RBAと一緒に実際の活動を行いたいチーム・主催者・企業向けの案内です。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/work-with-rba" },
  openGraph: {
    title: "RBAと一緒に活動をつくる",
    description: "クリニックやキャンプ、交流などを、実際に一緒に開催するための窓口です。",
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
    title: "ミニバスの練習やチームづくりを一緒に見直す",
    body: "今いるチームを大切にしながら、練習設計、映像レビュー、指導者相談、オンコート支援まで。どのサービスが必要か決まっていなくても、チーム育成診断から始められます。",
    href: "/ja/minibasket-support",
    cta: "ミニバス育成支援を見る",
  },
  {
    icon: Users,
    tag: "TEAM TRAINING",
    title: "普段のチーム練習を設計する",
    body: "テーマ、判断、Small-Sided Game、振り返りまでを一つの流れで整理します。HOMECOURTのTEAM HOMEに、練習計画や振り返りを記録できます。",
    href: "/ja/team-training",
    cta: "TEAM TRAININGを見る",
  },
  {
    icon: Trophy,
    tag: "VISIT TRAINING",
    title: "普段の練習に、RBAを呼ぶ",
    body: "RBAがチームの体育館へ伺い、普段の練習を観察しながら、必要なテーマを実際の練習で試します。オンコート指導、ゲーム観察、指導者フィードバック、継続訪問まで目的に合わせて組み立てます。",
    href: "/ja/team-visit-clinic",
    cta: "VISIT TRAININGを見る",
  },
  {
    icon: Users,
    tag: "DEVELOPMENT CAMP",
    title: "練習・ゲーム・振り返りを組み合わせたキャンプをつくる",
    body: "練習、ゲーム、身体づくり、振り返りを組み合わせ、参加後も普段の練習で続けたいことを見つけます。",
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
    title: "国内外のチームと交流する",
    body: "交流試合、キャンプ、指導者交流などを、年代と目的に合わせて組み立てます。参加条件や実施体制を確認できたものだけを具体的な企画として扱います。",
    href: "/ja/international",
    cta: "海外連携を相談する",
  },
  {
    icon: Handshake,
    tag: "PARTNERSHIP",
    title: "企業・地域パートナーとして支える",
    body: "広告掲載だけでなく、地域開催、参加支援、安全な運営、海外交流など、支援を何に使うかが分かる形で連携します。",
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
      <h1>情報だけで終わらず、<br/>実際の活動を一緒につくる。</h1>
      <p>クリニックやキャンプ、チーム支援、海外交流など、実際に選手や指導者が参加できる活動を一緒につくります。教材や情報提供だけで終わらないことを大切にしています。</p>
      <div className="closing-actions">
        <a className="button button-orange" href="/ja/clinic-request">RBAを地域に呼ぶ<ArrowRight size={17}/></a>
        <a className="button button-dark" href="/ja/contact">まず相談する<ArrowRight size={17}/></a>
      </div>
    </section>

    <section className="homecourt-product-preview section-pad">
      <div className="section-head">
        <div><p className="section-index">REAL PROGRAMMES / REAL PLACES</p><h2>実際に開催できる形まで、一緒に考える。</h2></div>
        <p>参加費、開催費、協賛、地域連携など、それぞれの活動に合う運営方法を整理します。</p>
      </div>
      <div className="homecourt-preview-grid">
        <article><Users/><span>01</span><h3>参加する</h3><p>クリニック、キャンプ、大会、交流など、実際にコートへ出る機会をつくる。</p></article>
        <article><Trophy/><span>02</span><h3>開催する</h3><p>クラブや地域がRBAを呼び、必要な育成テーマに合わせてプログラムを実施する。</p></article>
        <article><MapPinned/><span>03</span><h3>地域で続ける</h3><p>一度の開催で終わらず、地域の指導者や会場と継続できる形にする。</p></article>
        <article><Handshake/><span>04</span><h3>支える</h3><p>企業や地域の支援を、会場費、参加支援、安全な運営などに具体的に使う。</p></article>
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
        <h2>RBAの収益は、<br/>次の活動に使います。</h2>
        <p>参加費や協賛金などの収益は、会場、移動、運営、指導者教育、新しい開催地域の開拓など、次の活動に使います。使い道はできるだけ分かりやすく示していきます。</p>
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