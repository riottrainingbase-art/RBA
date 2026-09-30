import Link from "next/link";
import {ArrowRight,CheckCircle2,Network,ShieldCheck} from "lucide-react";
import {SiteFrame} from "./site-frame";
const principles=[
 ["子どもの安全と尊厳","暴言・体罰を前提にせず、未成年者の安全とプライバシーを優先する。"],
 ["意味のある参加機会","所属人数や競技レベルに応じて、子どもが実際に学べる経験を考える。"],
 ["年代に合った環境","大人の競技をそのまま縮小せず、練習・試合・負荷を発達段階から考える。"],
 ["コーチも学び続ける","資格の有無だけで終わらず、振り返りと継続学習を大切にする。"],
 ["情報を明確にする","対象、費用、日程、責任範囲など、参加判断に必要な情報を分かりやすく示す。"]
] as const;
export function DevelopmentPartnerBeta(){
 return <SiteFrame locale="ja" languagePage="partners"><main className="development-partner-beta">
  <section className="partner-beta-hero section-pad"><p className="section-index inverse"><Network/> RBA DEVELOPMENT PARTNER / BETA</p><h1>チームを変えなくても、<br/>育成の選択肢は広げられる。</h1><p>RBA DEVELOPMENT PARTNERは、クラブをRBAの下部組織にする制度ではありません。それぞれの地域・チームの活動を尊重しながら、指導者の学び、育成機会、地域間・国際交流をつなぐためのネットワーク構想です。</p></section>
  <section className="partner-beta-intro section-pad"><div><p className="section-index">WHAT IT IS / IS NOT</p><h2>認証マークやクラブランキングにはしません。</h2></div><div><p>Partnerという表示だけで、そのクラブの安全性や指導品質をRBAが保証することはできません。公開前に関係性と基本情報を確認し、連携状況も「協議中」「確認済み」「活動中」「過去の活動」に分けます。</p><p>まずは少数のクラブ・団体とβ運用し、申請、確認、更新、相談窓口、連携終了までの運用を固めます。</p></div></section>
  <section className="partner-beta-principles section-pad"><div className="section-head"><div><p className="section-index">SHARED PRINCIPLES</p><h2>最低限、ここは共有したい。</h2></div><p>同じ戦術や指導法を求めるものではありません。育成年代に関わる組織として共有したい土台です。</p></div><div>{principles.map(([title,body],i)=><article key={title}><span>{String(i+1).padStart(2,"0")}</span><CheckCircle2/><h3>{title}</h3><p>{body}</p></article>)}</div></section>
  <section className="partner-beta-flow section-pad"><p className="section-index">BETA FLOW</p><h2>参加までの流れ</h2><ol><li><span>01</span><div><strong>相談</strong><p>地域、カテゴリー、現在の活動、RBAと一緒に取り組みたいことを確認。</p></div></li><li><span>02</span><div><strong>基本確認</strong><p>運営責任者、連絡先、活動実態、共有原則、未成年者への配慮を確認。</p></div></li><li><span>03</span><div><strong>小さく始める</strong><p>D-HUB、クリニック、Development Camp、交流など、目的が合う一つの活動から開始。</p></div></li><li><span>04</span><div><strong>振り返る</strong><p>一定期間ごとに連携内容を確認し、表示内容も更新。</p></div></li></ol></section>
  <section className="partner-beta-guardrail section-pad"><ShieldCheck/><div><span>CHILD SAFETY / GOVERNANCE</span><h2>ネットワークを大きくする前に、運用を固める。</h2><p>苦情・安全上の相談、表示停止、連携終了、ロゴ利用、更新期限を正式運用前に定義します。子どもの情報をPartner間で自由に共有する仕組みは作りません。</p></div></section>
  <section className="partner-beta-cta section-pad"><div><p className="section-index">BETA INTEREST</p><h2>地域の育成を、一緒に考える。</h2><p>まずは連携内容の相談から。Partner登録を約束する申請フォームではありません。</p></div><Link className="button button-member" href="/ja/contact">RBAに相談する <ArrowRight/></Link></section>
 </main></SiteFrame>
}
