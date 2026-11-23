import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, FileText, Handshake, ShieldCheck, ClipboardCheck } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "企業向け90日連携モデル｜RBA",
  description: "Riot Basketball Academyの企業向け地域育成支援・イベント協働を、成果物と条件を明確にした90日の小規模実証から検討します。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/partner-pilot" },
  robots: { index: true, follow: true },
};

const included = [
  ["目的", "子どもたちの育成機会を支えながら、企業の地域貢献を事実に基づき発信する90日間の小規模実証"],
  ["基本モデル", "月額11,000円（税込）を参考とする3か月の協賛相談。実際の対価・請求・掲載先・開始日は個別の書面合意で決定"],
  ["RBA側の予定成果物", "合意した掲載先での協賛企業紹介、協賛期間中の掲載状況確認、期間終了時の活動・発信実績報告"],
  ["企業側のお願い", "掲載承認済みの企業名・ロゴ等の提供、紹介文の確認、担当窓口の設定"],
  ["別途見積", "イベント共同開催、写真・動画制作、賞品提供、移動・宿泊の手配、追加の販促制作は標準協賛とは別に協議"],
  ["禁止する確約", "参加人数・露出・成約等の成果保証、未確定イベントへの協賛名義掲出、未成年者の肖像・個人情報の無許諾利用"],
];
const process = [
  ["01", "15分の相談", "目的・想定成果・協賛の予算感と対象地域を確認。初回連絡だけでは契約成立しません。"],
  ["02", "提案書・見積", "掲載媒体と期間、成果物、料金・税、先方確認フロー、取消・返金条件を案件ごとに書面化。"],
  ["03", "合意・請求", "双方が合意書を確認・承認した後に請求。申込ページや決済リンクだけで契約を確定した扱いにはしません。"],
  ["04", "履行・報告", "掲載・活動を実施し証跡を保存。期末に掲載URL、活動日、提供物、請求・入金・納品確認をまとめます。"],
];
export default function PartnerPilotPage() {
  return <SiteFrame locale="ja">
    <section className="inner-hero section-pad">
      <a className="back-link" href="/ja/work-with-rba">← 企業連携</a>
      <p className="section-index"><Handshake size={16}/> RBA / 90-DAY PARTNERSHIP</p>
      <h1>ロゴを載せるだけでは終わらせない。<br/>地域と子どもたちに残る90日を。</h1>
      <p>RBAは育成年代のバスケットボール・指導者教育・国内外交流を支える企業の皆さまと、実行できる範囲から共同事業を検討しています。まずは小さな試行と、確かめられる成果報告を重視します。</p>
      <div className="closing-actions">
        <a className="button button-dark" href="mailto:riot.training.base@gmail.com?subject=RBA%2090%E6%97%A5%E9%80%A3%E6%90%BA%E3%81%AE%E3%81%94%E7%9B%B8%E8%AB%87">企業連携を相談する<ArrowRight size={17}/></a>
        <a className="button button-light" href="/ja/partners">既存の協賛メニューを見る<ArrowRight size={17}/></a>
      </div>
    </section>
    <section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">EXPLICIT SCOPE</p><h2>最初に、含まれること・含まれないことを明確に。</h2></div><p>以下は提案モデルです。スポンサー契約や掲載枠、イベントの開催が現在成立していることを意味しません。</p></div>
      <div className="homecourt-preview-grid">{included.map(([name,value])=><article key={name}><CheckCircle2 size={22}/><h3>{name}</h3><p>{value}</p></article>)}</div>
    </section>
    <section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">PROPOSAL TO FULFILLMENT</p><h2>営業から履行確認まで、四つの節目で管理します。</h2></div></div>
      <div className="homecourt-preview-grid">{process.map(([no,title,body])=><article key={no}><FileText size={22}/><span>{no}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
    </section>
    <section className="network-release section-pad">
      <ShieldCheck size={30}/>
      <div>
        <p className="section-index">CHILD SAFEGUARDING</p>
        <h2>協賛より先に、子どもたちの安全を。</h2>
        <p>撮影・写真・健康情報・選手の評価に協賛企業が無断で関与することはできません。協賛・広告は明示し、ロゴ・名称の使用は双方の許諾を得てから行います。イベントへの協力や試供品提供も、保護者同意、健康・安全、会場条件の確認を優先します。</p>
        <p><a className="text-link" href="/ja/participant-safety">保護者向けの参加前確認事項 →</a></p>
      </div>
      <a className="button button-member" href="/ja/contact"><ClipboardCheck size={17}/>相談窓口へ</a>
    </section>
  </SiteFrame>;
}
