import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, Building2, CheckCircle2, Globe2, ShieldCheck, Users } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";

export const metadata:Metadata={
  title:{absolute:"運営情報｜Riot Basketball Academy"},
  description:"Riot Basketball Academy（RBA）の運営概要、公開指標の定義、プラットフォーム構造、安全・運営方針、問い合わせ窓口をまとめています。",
  alternates:{canonical:"https://riotbasketballacademy.com/ja/corporate"},
  openGraph:{
    title:"運営情報｜Riot Basketball Academy",
    description:"RBAの運営概要、公開指標の定義、安全・運営方針を確認できます。",
    url:"https://riotbasketballacademy.com/ja/corporate",
    siteName:"Riot Basketball Academy",
    type:"website",
    images:[{url:"https://riotbasketballacademy.com/rba-court-hero.png"}],
  },
  twitter:{card:"summary_large_image",title:"運営情報｜Riot Basketball Academy",description:"RBAの運営概要、公開指標の定義、安全・運営方針を確認できます。",images:["https://riotbasketballacademy.com/rba-court-hero.png"]},
};

const metrics=[
  {
    value:"3,000+",
    label:"延べ参加者",
    definition:"2025年半ば以降にRBAの活動へ参加した回数を合計した延べ値です。同じ方が複数回参加した場合は、その都度1回として数えます。ユニーク人数ではありません。",
  },
  {
    value:"25",
    label:"国内の活動地域",
    definition:"RBAが活動・開催・連携を行ってきた国内地域の数です。常設拠点数や、同時点で稼働している拠点数を示すものではありません。",
  },
  {
    value:"4言語",
    label:"サイト対応",
    definition:"日本語・英語・繁體中文・한국어の入口を用意しています。企画、記事、申込フォームによっては日本語または英語のみの場合があります。",
  },
] as const;

const operatingPrinciples=[
  ["子どもの安全","未成年者を扱う事業として、安全、連絡体制、写真・映像、緊急時対応を運営判断の前提にします。"],
  ["情報の透明性","料金、募集状況、開催条件、キャンセル条件、未確定事項を分けて伝えます。"],
  ["事実と将来像を分ける","現在の実績、準備中・協議中の内容、将来のVisionを同じものとして表示しません。"],
  ["必要な情報だけを扱う","育成と運営に必要な範囲を超えて、個人情報を集めないことを基本にします。"],
  ["問題を改善につなげる","事故やトラブルを隠さず、報告・対応・再発防止が機能する運営を重視します。"],
  ["長期的な育成を優先する","目の前の勝敗や選抜だけでなく、選手が長く成長できる環境を判断軸にします。"],
] as const;

export default function CorporatePage(){
  return <SiteFrame locale="ja">
    <div className="corporate-page">
      <section className="corporate-hero section-pad">
        <p className="section-index inverse">RBA / OPERATING INFORMATION</p>
        <h1>運営情報を、<br/>分かる形で公開する。</h1>
        <p>Riot Basketball Academy（RBA）の運営概要、公開している数字の意味、安全・運営の考え方、問い合わせ先をまとめています。</p>
        <div className="corporate-updated">最終更新：2026年10月2日</div>
      </section>

      <section className="corporate-overview section-pad">
        <div className="section-head">
          <div><p className="section-index">ORGANISATION</p><h2>Riot Basketball Academy</h2></div>
          <p>宮城県仙台市を拠点に、育成年代の選手・保護者・指導者・チーム・地域・海外アカデミーをつなぐ活動とプラットフォームを運営しています。</p>
        </div>
        <div className="corporate-overview-grid">
          <article><Building2/><span>運営名称</span><strong>Riot Basketball Academy / RBA</strong></article>
          <article><Users/><span>代表</span><strong>西尾優人 / Masato Nishio</strong></article>
          <article><Globe2/><span>拠点・活動範囲</span><strong>日本・仙台を拠点に全国・アジアへ</strong></article>
          <article><CheckCircle2/><span>主な領域</span><strong>選手育成 / S&amp;C / 指導者学習 / 地域開催 / 国際交流</strong></article>
        </div>
        <p className="corporate-contact-note">お問い合わせ：<a href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a></p>
      </section>

      <section className="corporate-system section-pad">
        <p className="section-index inverse">BUSINESS / PLATFORM STRUCTURE</p>
        <h2>現場、仕組み、ネットワークをつなぐ。</h2>
        <div>
          <article><span>01 / FIELD</span><h3>現場で育成機会をつくる</h3><p>クリニック、キャンプ、スクール、RBA UNITED、指導者講習など、実際のコートで活動をつくります。</p></article>
          <article><span>02 / PLATFORM</span><h3>参加・学習・記録をつなぐ</h3><p>RBA ID、MY HOME COURT、JOURNAL、D-HUB、申込・決済、安全・運営情報を一つの流れにします。</p></article>
          <article><span>03 / NETWORK</span><h3>地域とアジアへ広げる</h3><p>地域の主催者、チーム、指導者、企業、専門家、海外アカデミーと連携し、育成機会そのものを増やします。</p></article>
        </div>
      </section>

      <section className="corporate-metrics section-pad">
        <div className="section-head">
          <div><p className="section-index">PUBLIC METRICS</p><h2>数字は、定義と一緒に公開する。</h2></div>
          <p>規模を大きく見せるためではなく、何を数えているのかが分かる状態を重視します。数字の更新時には、その定義を変えずに比較できるようにします。</p>
        </div>
        <div className="corporate-metrics-grid">
          {metrics.map(metric=><article key={metric.label}><BarChart3/><strong>{metric.value}</strong><h3>{metric.label}</h3><p>{metric.definition}</p></article>)}
        </div>
      </section>

      <section className="corporate-governance section-pad">
        <div className="section-head">
          <div><p className="section-index inverse">TRUST / GOVERNANCE</p><h2>規模より先に、信頼を仕組みにする。</h2></div>
          <p>育成年代を扱うプラットフォームとして、サービスの利便性だけでなく、安全、情報、料金、責任の所在を確認できる状態を整えます。</p>
        </div>
        <div className="corporate-governance-grid">
          {operatingPrinciples.map(([title,body])=><article key={title}><ShieldCheck/><h3>{title}</h3><p>{body}</p></article>)}
        </div>
      </section>

      <section className="corporate-disclosures section-pad">
        <p className="section-index">PUBLIC INFORMATION</p>
        <h2>詳しい運営情報。</h2>
        <div>
          <Link href="/ja/verified"><span>安全・運営基準</span><strong>RBA VERIFIED</strong><ArrowRight/></Link>
          <Link href="/ja/policies"><span>参加条件・取消し</span><strong>参加規約・キャンセル・返金</strong><ArrowRight/></Link>
          <Link href="/ja/impact"><span>育成への還元</span><strong>RBA IMPACT</strong><ArrowRight/></Link>
          <Link href="/ja/about"><span>Purpose・育成方針</span><strong>RBAについて</strong><ArrowRight/></Link>
          <Link href="/ja/contact"><span>質問・確認</span><strong>お問い合わせ</strong><ArrowRight/></Link>
        </div>
      </section>
    </div>
  </SiteFrame>;
}
