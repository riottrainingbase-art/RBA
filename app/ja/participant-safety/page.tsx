import type { Metadata } from "next";
import { ArrowRight, CalendarDays, CheckCircle2, ClipboardList, ShieldCheck, Users } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "参加前の確認事項・安全案内｜RBA",
  description: "クリニック・キャンプ・遠征の開催内容、費用、送迎、引率、アレルギー対応など、保護者が参加判断前に確認する項目をご案内します。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/participant-safety" },
};

const checks = [
  { icon: CalendarDays, title: "日程と実施場所", text: "開催日と開始・終了予定、会場住所、集合・解散場所、会場変更時の連絡方法。宿泊付きの場合は宿泊先と宿泊日数を確認してください。" },
  { icon: ClipboardList, title: "料金・申込・変更条件", text: "参加費と含まれる内容、追加費用、申込期限、参加条件、支払い方法、取消・返金の適用条件をお支払い前に確認してください。" },
  { icon: Users, title: "引率・移動・送迎", text: "引率者の担当範囲、集合から解散までの監督体制、保護者自身で手配する移動、主催側で手配する送迎の有無・区間を確認してください。" },
  { icon: ShieldCheck, title: "健康・アレルギー・緊急時", text: "体調やけがへの対応、緊急連絡先、医療機関への連絡、食物アレルギーの申告方法・期限、食事提供者との確認方法を確認してください。" },
];
const steps = [
  ["募集前", "開催概要・費用・対象・会場・引率や送迎の確保状況・宿泊・取消条件を整理。重大な安全条件が未確定なら「確定済み」と表示しません。"],
  ["開催約1か月前を目安", "宿泊・遠征を伴う企画では、参加判断に必要な情報をできる限りまとめて案内。調整中の事項は未確定であることと確認予定日を明示します。"],
  ["開催前の再確認", "集合・解散、持ち物、責任者への連絡方法、健康・アレルギー申告期限、悪天候や変更時の連絡を改めて共有します。"],
  ["変更・中止が必要な場合", "確認できた事実、参加者への影響、選べる対応、返金・振替の条件を可能な限り速やかにお伝えします。"],
];

export default function Page() {
  return <SiteFrame locale="ja">
    <section className="inner-hero section-pad">
      <a className="back-link" href="/ja">← RBA</a>
      <p className="section-index"><ShieldCheck size={16}/> PARTICIPANT SAFETY / FAMILY FIRST</p>
      <h1>挑戦できる機会と、<br/>安心して送り出せる準備を。</h1>
      <p>Riot Basketball Academyは、子どもたちの成長に加え、ご家庭が内容を理解し、納得して参加を判断できることを大切にします。ご意見を受け、事前案内と運営確認の基準を見直しています。</p>
      <div className="closing-actions">
        <a className="button button-dark" href="/ja/opportunities">開催・募集状況を見る<ArrowRight size={17}/></a>
        <a className="button button-light" href="/ja/contact">確認したいことを相談する<ArrowRight size={17}/></a>
      </div>
    </section>
    <section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">BEFORE APPLYING</p><h2>参加を決める前に確認したい4つのこと</h2></div><p>「詳細は後日」だけでなく、何が確定し、何が調整中かを区別してお伝えすることを目指します。</p></div>
      <div className="homecourt-preview-grid">
        {checks.map(({icon:Icon,title,text}) => <article key={title}><Icon/><h3>{title}</h3><p>{text}</p></article>)}
      </div>
    </section>
    <section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">OPERATING STANDARD</p><h2>事前案内の改善方針</h2></div><p>現在見直している運営目標です。各企画の実施条件や最終確定状況を保証するものではありません。</p></div>
      <div className="homecourt-preview-grid">
        {steps.map(([title,text],index)=><article key={title}><span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></article>)}
      </div>
      <div className="homecourt-private-note"><CheckCircle2/><div><strong>未確定事項を「確定」とは案内しません。</strong><p>会場・宿泊・送迎・引率・安全体制は企画ごとに異なります。掲載情報と個別の参加確定案内を確認し、不明点は申込・お支払い前にお問い合わせください。既に成立した参加契約の条件を、このページだけで不利に変更するものではありません。</p></div></div>
    </section>
    <section className="network-release section-pad">
      <ShieldCheck/><div><p className="section-index">ASK BEFORE YOU PAY</p><h2>「確認したい」は、遠慮なく。</h2><p>お子さまの健康・移動・宿泊・安全について、曖昧なままお申し込みを進める必要はありません。個別企画の詳細をお尋ねください。健康情報やアレルギー情報を公開フォームの自由記入欄などに不用意に書かず、主催者が案内する適切な連絡手段をご利用ください。</p><p><a className="text-link" href="/ja/cancellation">キャンセル・中止・返金方針を確認する →</a></p></div>
      <a className="button button-member" href="/ja/contact">RBAに問い合わせる<ArrowRight size={17}/></a>
    </section>
  </SiteFrame>;
}
