import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CarFront, CheckCircle2, CircleHelp, ClipboardCheck, Handshake, ShieldCheck, Wrench } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";

const ENQUIRY = "https://form.jotform.com/263216681163052";

export const metadata: Metadata = {
  title: "全国募集｜RBA公式プリウス車両パートナー｜子どもたちの挑戦を支える1台",
  description: "Riot Basketball Academyは全国の中古車販売店・リース会社・整備工場・企業から活動用中古プリウス1台の車両協賛・30日試行・一部費用協賛を募集しています。仙台を拠点に代表の移動と指導用品運搬に利用。企業向け無料相談受付。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/mobility-partner" },
  openGraph: { title: "この1台が、次のコートにつながる。｜RBA公式車両パートナー全国募集", description: "日本全国の自動車関連企業・地域企業へ。中古プリウス1台の12か月協賛貸与・30日試行・費用一部協賛・整備協力を募集します。" },
};

const ways = [
  { icon: CarFront, number:"01", title:"車両1台の12か月協賛貸与", text:"中古トヨタ・プリウス30系・50系などを想定。年式・色・グレードは柔軟。利用料を広報協力と相殺する可能性を含め、契約条件を個別に協議します。" },
  { icon: Handshake, number:"02", title:"30日間の実証・短期貸与", text:"まず試行し、走行状況・燃費・用途・実際の広報成果を双方で確認。その結果を踏まえて長期契約の可否を判断します。" },
  { icon: Wrench, number:"03", title:"購入・リース・整備費用の支援", text:"車両本体の一部協賛、良質な中古車の紹介・調達、メンテナンス、冬用タイヤ、保険等の条件相談も受け付けます。全国からの陸送費は個別確認します。" },
];

const returnValue = [
 "許諾を受けた企業名・ロゴ・公式リンクを、合意したRBA公式媒体に掲出",
 "実際の車両使用を記録したSNS・Web紹介の制作（媒体・本数・時期は書面で合意）",
 "国内の活動地域、車両活用状況、公開した発信URLの月次または四半期報告",
 "協賛広告であることを明示。閲覧数・問い合わせ・売上・競技結果は保証しません",
];

const safety = [
 "運転は原則代表本人。児童・生徒の送迎や有償運送には使用しません",
 "業務使用・県外走行・走行距離・保管場所・登録運転者と任意保険の適用範囲を確認",
 "車検・整備・駆動用バッテリー・冬用タイヤ・故障時の代車・免責を契約前に確認",
 "車体への企業ロゴ使用・写真利用・原状回復は事前承認。子どもの個人情報は企業へ提供しません",
 "名義・契約主体・広告対価・消費税・返却条件を文書化。フォーム送信だけでは契約・発注・決済は生じません",
];

export default function MobilityPartnerPage() {
  return <SiteFrame locale="ja">
    <section className="inner-hero section-pad">
      <Link className="back-link" href="/ja/work-with-rba">← RBA / PARTNERS</Link>
      <p className="section-index"><CarFront size={17}/> NATIONAL CALL / OFFICIAL MOBILITY PARTNER</p>
      <h1>この1台が、<br/>次のコートにつながる。</h1>
      <p>日本全国の中古車販売店・ディーラー・リース会社・整備工場・企業の皆さまへ。Riot Basketball Academy（RBA）は、仙台から全国の子どもたちが学ぶ現場へ向かうための<b>中古プリウス1台</b>について、車両パートナーを募集しています。これは特定の企業による支援が決定したという告知ではありません。</p>
      <div className="closing-actions">
        <a className="button button-dark" href={ENQUIRY} target="_blank" rel="noopener noreferrer" data-growth-id="mobility-national-enquiry-primary">車両協賛・協力を相談する <ArrowUpRight size={17}/></a>
        <Link className="button button-light" href="/ja">RBAの活動を知る <ArrowUpRight size={17}/></Link>
      </div>
      <p>年式・色・グレード柔軟 ／ 仙台保管 ／ 全国での活動移動・指導用品搬送 ／ ご相談無料</p>
    </section>

    <section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">WHY A CAR?</p><h2>クリニックの前に、たどり着くための足が要ります。</h2></div><p>子どもたちが所属や地域を越えて挑戦できるよう、バスケットボール教育・指導者研修・交流活動を各地で進めています。</p></div>
      <p>会場までの長距離移動、ボールや教材等の持ち運び、指導者との打ち合わせなどに使う、実務上の移動手段を確保したいと考えています。高額な車種ではなく、扱いやすく燃費のよい中古プリウスを第一希望としています。県外走行や車両の状態など実務条件に適合することを優先します。</p>
    </section>

    <section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">THREE WAYS TO HELP</p><h2>支援方法は、一つに限定しません。</h2></div><p>12か月協賛貸与が第一希望ですが、企業の在庫状況・費用負担に応じて現実的な方法を一緒に検討します。</p></div>
      <div className="homecourt-preview-grid">
        {ways.map(({icon:Icon,number,title,text}) => <article key={number}>
          <Icon size={25} aria-hidden="true"/><span>{number} / PARTNERSHIP</span><h3>{title}</h3><p>{text}</p>
          <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="text-link" data-growth-id={`mobility-way-${number}`}>この方法を相談する <ArrowUpRight size={16}/></a>
        </article>)}
      </div>
    </section>

    <section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">WHAT PARTNERS RECEIVE</p><h2>企業の協力を、記録に残る成果物へ。</h2></div><p>広告の価値や運営負担を曖昧にせず、広報役務と車両提供の対価を事前に確認します。</p></div>
      <ul>{returnValue.map(x=><li key={x}><CheckCircle2 size={18} aria-hidden="true"/> {x}</li>)}</ul>
    </section>

    <section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">CONDITIONS / SAFEGUARDING</p><h2>車両も、子どもたちも、安全第一。</h2></div><p>全国募集だからこそ、車検・任意保険・名義・県外走行・事故時の責任を明確にします。</p></div>
      <ul>{safety.map(x=><li key={x}><ShieldCheck size={18} aria-hidden="true"/> {x}</li>)}</ul>
    </section>

    <section className="network-release section-pad">
      <CircleHelp size={30} aria-hidden="true"/>
      <div>
        <p className="section-index">OPEN TO JAPAN-WIDE OFFERS</p>
        <h2>一台の提供が難しくても、情報だけで構いません。</h2>
        <p>車両を扱う企業、整備事業者、支援を検討される全国の企業、適切な中古プリウスを紹介できる方からのご連絡を受け付けています。車両の正式契約や費用負担は個別協議後に決定します。協賛の税制優遇や広告効果は約束しません。</p>
        <p>受付窓口：riot.training.base@gmail.com</p>
      </div>
      <a className="button button-member" href={ENQUIRY} target="_blank" rel="noopener noreferrer" data-growth-id="mobility-national-enquiry-bottom"><ClipboardCheck size={17}/>無料相談フォームへ <ArrowUpRight size={17}/></a>
    </section>
  </SiteFrame>;
}
