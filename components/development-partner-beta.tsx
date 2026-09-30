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
  <section className="partner-beta-hero section-pad"><p className="section-index inverse"><Network/> RBA DEVELOPMENT PARTNER / BETA</p><h1>今いるチームを大切にしながら、<br/>地域の外ともつながる。</h1><p>RBA DEVELOPMENT PARTNERは、クラブをRBAの傘下に入れる制度ではありません。それぞれの地域やチームの活動を大切にしながら、指導者の学びや合同企画、地域を越えた交流を必要に応じてつなぐためのネットワーク構想です。</p></section>
  <section className="partner-beta-intro section-pad"><div><p className="section-index">WHAT IT IS / IS NOT</p><h2>「RBAが認定した優良クラブ」という制度にはしません。</h2></div><div><p>Partnerという表示だけで、そのクラブの安全性や指導内容までRBAが保証することはできません。公開する場合は関係性と基本情報を確認し、「協議中」「連携確認済み」「共同活動中」「過去に共同活動あり」など、実際の状況が分かる表現にします。</p><p>まずは少数のクラブ・団体と試験的に運用し、申請から確認、情報更新、相談対応、連携終了までの流れを固めます。</p></div></section>
  <section className="partner-beta-principles section-pad"><div className="section-head"><div><p className="section-index">SHARED PRINCIPLES</p><h2>指導法が違っても、共有したいこと。</h2></div><p>同じ戦術や練習方法を求めるものではありません。育成年代に関わる団体として、最低限共有しておきたい考え方です。</p></div><div>{principles.map(([title,body],i)=><article key={title}><span>{String(i+1).padStart(2,"0")}</span><CheckCircle2/><h3>{title}</h3><p>{body}</p></article>)}</div></section>
  <section className="partner-beta-flow section-pad"><p className="section-index">BETA FLOW</p><h2>参加までの流れ</h2><ol><li><span>01</span><div><strong>相談</strong><p>地域、カテゴリー、現在の活動、RBAと一緒に取り組みたいことを確認。</p></div></li><li><span>02</span><div><strong>基本確認</strong><p>運営責任者、連絡先、活動実態、共有原則、未成年者への配慮を確認。</p></div></li><li><span>03</span><div><strong>小さく始める</strong><p>D-HUB、クリニック、Development Camp、交流など、目的が合う一つの活動から開始。</p></div></li><li><span>04</span><div><strong>振り返る</strong><p>一定期間ごとに連携内容を確認し、表示内容も更新。</p></div></li></ol></section>
  <section className="partner-beta-guardrail section-pad"><ShieldCheck/><div><span>CHILD SAFETY / GOVERNANCE</span><h2>広げる前に、責任の所在を明確にする。</h2><p>正式に広げる前に、安全上の相談や苦情を受けた場合の対応、掲載停止、連携終了、ロゴの扱い、情報の更新期限を定めます。子どもの個人情報をPartner同士で自由に共有する仕組みは作りません。</p></div></section>
  <section className="partner-beta-cta section-pad"><div><p className="section-index">BETA INTEREST</p><h2>地域でできることを、一緒に考える。</h2><p>最初は相談から始めます。フォームを送信しただけでPartnerとして登録されることはありません。</p></div><div className="partner-beta-cta-actions"><Link className="button button-member" href="/ja/partners/development-network/apply">RBA IDでβ連携を相談 <ArrowRight/></Link><Link className="button button-light" href="/ja/contact">まず質問する <ArrowRight/></Link></div></section>
 </main></SiteFrame>
}
