import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, CheckCircle2, Handshake, ShieldCheck, Users, CalendarDays } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";

const FORM_URL = "https://form.jotform.com/263213962901051";

export const metadata: Metadata = {
  title: "法人・学校向け育成支援｜RBA ORGANISATION PARTNER",
  description: "Riot Basketball Academyの学校・クラブ育成パートナー、企業向けS&C、地域クリニック、指導者教育の参考メニューと無料商談窓口。月次の指導・実施報告を組み合わせます。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/for-organizations" },
};

const offers = [
  {
    no: "01", label: "CLUB / SCHOOL", title: "チームの練習を、次の試合につなぐ。",
    price: "月額165,000円（税込）を参考", icon: Users,
    body: "クラブ・学校に対する月2回×2時間の出張育成指導、指導者30分レビュー、月次の練習設計メモを含む90日実証の提案です。会場・交通・宿泊・保険は案件ごとに別途確認します。",
  },
  {
    no: "02", label: "RTB / CORPORATE", title: "社員の健康を、続く習慣にする。",
    price: "月額165,000円（税込）を参考", icon: Handshake,
    body: "企業・法人向けに月2回の出張運動セッション、運動・健康教育のミニ講座、実施状況の匿名集計レポートを提供する参考モデルです。職場規模・会場・実施時間に応じ個別設計します。",
  },
  {
    no: "03", label: "REGIONAL CLINIC", title: "地域に、1日限りで終わらない学びを。",
    price: "1回220,000円（税込）を参考", icon: CalendarDays,
    body: "地域主催者と育成テーマ・対象年代・指導プログラムを事前に設計。1日実施、指導者へのフィードバック、実施レポートを含む参考案です。会場・集客・送迎・宿泊・中止条件は別途書面化します。",
  },
  {
    no: "04", label: "COACH EDUCATION", title: "指導者が学び続ける仕組みを。",
    price: "月額55,000円（税込）を参考", icon: CheckCircle2,
    body: "クラブ・法人向けのオンライン講習、練習設計レビュー、月次の指導者Q&Aを組み合わせた参考プログラム。既存の会員教材の組織内再配布は自動的には認めず、利用権を個別に取り決めます。",
  },
];

const flow = [
  ["1", "60秒の無料相談", "組織種別・地域・希望時期・課題だけを共有。子どもの氏名や健康情報は不要。"],
  ["2", "個別ヒアリング", "対象人数、目的、予算、会場、指導者とスケジュールを確認。"],
  ["3", "提案・書面合意", "担当者、役務、税込額、移動費、保険、権利、変更・返金条件を確定。"],
  ["4", "実施・受領確認", "指導・開催の実績と次の改善を報告し、発注者の受領確認まで管理。"],
];

export default function ForOrganizationsPage() {
  return <SiteFrame locale="ja">
    <section className="inner-hero section-pad">
      <a className="back-link" href="/ja/work-with-rba">← RBA NETWORK</a>
      <p className="section-index"><Handshake size={16}/> ORGANISATION PARTNER / REAL LEARNING</p>
      <h1>1日の感動を、<br/>1年の育成環境へ。</h1>
      <p>練習を増やすことが目的ではありません。RBAは選手の意思決定、指導者の学び、地域に継続する育成環境を、クラブ・学校・企業の皆さまと共同で設計します。</p>
      <div className="closing-actions">
        <a className="button button-dark" href={FORM_URL} target="_blank" rel="noopener noreferrer" data-growth-id="organization-programmes-main-form">法人・学校向け無料相談<ArrowUpRight size={17}/></a>
        <a className="button button-light" href="/ja/work-with-rba" data-growth-id="organization-programmes-network">地域・企業連携を見る<ArrowRight size={17}/></a>
      </div>
      <p>※このページは提案メニューです。正式募集・申込確定・請求・決済ではありません。</p>
    </section>
    <section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">PRACTICAL PROGRAMMES</p><h2>4つの法人・団体向けサービス</h2></div><p>単価は参考価格であり、法人・学校に対する実際の提供範囲・担当者・日程・費用の確約ではありません。個別のお見積りをご確認ください。</p></div>
      <div className="homecourt-preview-grid">
        {offers.map(({no,label,title,price,icon:Icon,body}) => <article key={no}>
          <Icon size={25}/><span>{no} / {label}</span>
          <h3>{title}</h3><strong>{price}</strong>
          <p>{body}</p>
          <a className="text-link" href={FORM_URL} target="_blank" rel="noopener noreferrer" data-growth-id={`organization-programmes-offer-${no}`}>この内容で相談する <ArrowUpRight size={16}/></a>
        </article>)}
      </div>
    </section>
    <section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">FROM PROPOSAL TO DELIVERY</p><h2>契約ではなく、まず課題から。</h2></div><p>相談から納品まで、ステータスと責任者を明確にすることで、未確定な条件のまま費用や成果を約束しない運営を行います。</p></div>
      <div className="homecourt-preview-grid">{flow.map(([num,heading,body]) => <article key={num}><span>{num}</span><h3>{heading}</h3><p>{body}</p></article>)}</div>
    </section>
    <section className="network-release section-pad">
      <ShieldCheck size={27}/>
      <div>
        <p className="section-index">CHILD FIRST / SAFE FIRST</p>
        <h2>育成年代を扱う以上、安全と説明責任が前提です。</h2>
        <p>指導者の適格性、会場条件、移動・引率、参加者の個人情報、保険・事故時対応、撮影同意を案件ごとに確認します。スポンサー紹介やマーケティングの対価として、未成年者の写真・健康情報・個人情報を無断提供しません。</p>
        <p><a className="text-link" href="/ja/participant-safety">保護者向け事前案内・安全確認 →</a></p>
      </div>
      <a className="button button-member" href={FORM_URL} target="_blank" rel="noopener noreferrer" data-growth-id="organization-programmes-bottom-form">無料相談フォームへ<ArrowUpRight size={17}/></a>
    </section>
  </SiteFrame>;
}
