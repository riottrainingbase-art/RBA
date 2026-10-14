import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import { BackboneShareKit } from "@/components/backbone-share-kit";
import "@/components/backbone-street.css";

export const metadata:Metadata={
 title:"BACKBONE千葉｜紹介・共有用の案内",
 description:"10月25日のBACKBONE千葉開催を保護者・選手・指導者に紹介するための公式案内文とリンク。送信はご自身の判断で。",
 alternates:{canonical:"https://riotbasketballacademy.com/backbone/share"}
};
export default function BackboneSharePage(){
 return <SiteFrame locale="ja">
  <main className="bb-street"><div className="bb-wrap bb-detail">
   <Link className="bb-back" href="/backbone">← BACKBONEへ戻る</Link>
   <p className="bb-eyebrow" style={{marginTop:38}}>SPREAD THE GAME / CHIBA</p>
   <h1 className="bb-detail-title">SHARE<br/><span style={{color:"var(--bb-accent)"}}>THE COURT.</span></h1>
   <h2 style={{fontSize:"clamp(23px,3.2vw,35px)",fontWeight:900}}>千葉開催を紹介したい方へ。</h2>
   <p className="bb-lead">保護者の方やチーム関係者が使える案内文を用意しました。内容を確認して、必要な方にだけ共有してください。コピーしただけでは送信されません。</p>
   <div className="bb-detail-block" style={{marginTop:36}}>
    <p className="bb-eyebrow">READY-TO-SHARE COPY</p>
    <BackboneShareKit/>
   </div>
   <section className="bb-detail-block"><h2>紹介前に確認してください。</h2><p className="bb-lead">10月25日（日）千葉県神崎町／9:00〜16:00／小学1年生〜中学3年生／参加費6,600円（税込）。定員60名ですが、残席は未確認です。募集状況・キャンセル条件・当日の詳細は主催者の最新案内に従ってください。</p><div className="bb-actions"><Link href="/backbone/chiba" className="bb-action">開催詳細・申込を見る ↗</Link></div></section>
   <p className="bb-small">RBAは無断の一斉送信や、許可のない写真・参加者情報の共有を推奨しません。</p>
  </div></main>
 </SiteFrame>;
}
