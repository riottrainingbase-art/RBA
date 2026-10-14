import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import { BackboneTrackedLink } from "@/components/backbone-tracked-link";
import "@/components/backbone-street.css";

const registration="https://docs.google.com/forms/d/e/1FAIpQLScP3NPWCVgySjcP1TyqMdXQ4Cw9CUBhMk78DJPP1dlLl3hShw/viewform";
export const metadata:Metadata={
 title:"BACKBONE CHIBA｜10月25日（日）千葉 Round 3",
 description:"2026年10月25日（日）、千葉県神崎町でBACKBONE育成クリニックと3x3ゲーム。対象は小学1年生〜中学3年生、参加費6,600円（税込）。",
 alternates:{canonical:"https://riotbasketballacademy.com/backbone/chiba"}
};
const shareText="10/25（日）千葉・神崎町でBACKBONE 3x3。小1〜中3対象、午前クリニック＋午後3x3、個人参加歓迎。参加費6,600円（税込）。詳細はこちら： https://riotbasketballacademy.com/backbone/chiba";
const lineShare="https://social-plugins.line.me/lineit/share?url="+encodeURIComponent("https://riotbasketballacademy.com/backbone/chiba");
const xShare="https://twitter.com/intent/tweet?text="+encodeURIComponent(shareText);
const eventStructuredData={
 "@context":"https://schema.org","@type":"SportsEvent",
 name:"BACKBONE 3×3 千葉 CHAPTER Round 3",
 description:"午前は育成クリニック、午後は3x3ゲーム。小学1年生〜中学3年生対象。個人参加歓迎。",
 startDate:"2026-10-25T09:00:00+09:00",endDate:"2026-10-25T16:00:00+09:00",
 eventAttendanceMode:"https://schema.org/OfflineEventAttendanceMode",
 location:{"@type":"Place",name:"神崎中学校体育館",address:{"@type":"PostalAddress",addressLocality:"神崎町",addressRegion:"千葉県",addressCountry:"JP"}},
 organizer:{"@type":"Organization",name:"HBC Wolves"},
 performer:{"@type":"Organization",name:"Riot Basketball Academy"},
 offers:{"@type":"Offer",price:"6600",priceCurrency:"JPY",url:registration},
 url:"https://riotbasketballacademy.com/backbone/chiba"
};
const timeline=[["08:40","受付"],["09:00〜11:30","育成クリニック"],["11:30〜13:00","昼食・休憩"],["13:00〜13:30","チーム発表・準備運動"],["13:30〜15:50","3x3ゲーム"],["16:00","終了予定"]];
export default function ChibaChapter(){
 return <SiteFrame locale="ja">
  <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(eventStructuredData)}} />
  <div className="bb-street"><div className="bb-wrap"><div className="bb-topline"><span>BACKBONE / CHIBA CHAPTER</span><strong>ROUND 03</strong></div></div>
   <main className="bb-detail"><div className="bb-wrap">
    <Link href="/backbone" className="bb-back">← BACKBONEに戻る</Link>
    <p className="bb-eyebrow" style={{marginTop:38}}>OCT 25 / 2026 / CHIBA CHAPTER</p>
    <h1 className="bb-detail-title">CHIBA.<br/><span style={{color:"var(--bb-accent)"}}>ROUND 3.</span></h1>
    <h2 style={{fontSize:"clamp(23px,3.5vw,36px)",fontWeight:900}}>10月25日、千葉でプレーしよう。</h2>
    <p className="bb-lead">午前は育成クリニック、午後は3x3ゲーム。チームは当日編成するため、一人での参加も歓迎しています。</p>
    <div className="bb-actions"><BackboneTrackedLink href={registration} event="backbone_registration_click" placement="chiba_hero" target="_blank" rel="noopener noreferrer" className="bb-action">参加申込フォーム ↗</BackboneTrackedLink><Link href="/backbone" className="bb-action bb-action--outline">BACKBONEについて ↗</Link></div>
    <div className="bb-detail-cards">
     <article><h2>WHEN / WHERE</h2><p>2026年10月25日（日）<br/>8:40受付／9:00〜16:00<br/>神崎中学校体育館（千葉県神崎町）</p></article>
     <article><h2>WHO</h2><p>小学1年生〜中学3年生<br/>定員60名<br/>個人参加歓迎</p></article>
     <article><h2>ENTRY FEE</h2><p>1名 6,600円（税込）<br/>兄弟姉妹など複数名の場合は、人数分のお申し込みが必要です。</p></article>
    </div>
    <section className="bb-detail-block"><p className="bb-eyebrow">DAY SCHEDULE</p><h2>当日の予定</h2><dl className="bb-schedule">{timeline.map(([time,activity])=><div key={time} style={{display:"contents"}}><dt>{time}</dt><dd>{activity}</dd></div>)}</dl><p className="bb-small">進行状況により、時間を調整する場合があります。</p></section>
    <section className="bb-detail-block"><p className="bb-eyebrow">FIRST TIME?</p><h2>一人での参加も歓迎です。</h2><p className="bb-lead">3x3の経験がなくても、まずは開催内容をご確認ください。チームは当日編成します。所属チームを変える必要はありません。</p><p className="bb-small">※当日のグループ編成や安全上の配慮は主催者が行います。募集状況は申込フォームでご確認ください。</p></section>
    <section className="bb-detail-block"><p className="bb-eyebrow">SHARE THE EVENT</p><h2>チームの仲間にも知らせる。</h2><p className="bb-lead">参加を検討している友達や保護者に、この開催ページを共有できます。共有だけで申込は完了しません。</p><div className="bb-actions"><BackboneTrackedLink href={lineShare} event="backbone_share_click" placement="line" target="_blank" rel="noopener noreferrer" className="bb-action">LINEで共有 ↗</BackboneTrackedLink><BackboneTrackedLink href={xShare} event="backbone_share_click" placement="x" target="_blank" rel="noopener noreferrer" className="bb-action bb-action--outline">Xで共有 ↗</BackboneTrackedLink></div></section>
    <p className="bb-small">紹介用の文章が必要な方は <Link href="/backbone/share" style={{textDecoration:"underline",textUnderlineOffset:4}}>公式の共有用案内</Link> をご利用ください。</p>
    <section className="bb-detail-block"><p className="bb-eyebrow">REGISTRATION</p><h2>参加申込</h2><p className="bb-lead">申込フォームで最新の募集状況と参加条件をご確認ください。フォーム送信後の受付や決済については、主催者の案内に従ってください。</p><div className="bb-actions"><BackboneTrackedLink href={registration} event="backbone_registration_click" placement="chiba_bottom" target="_blank" rel="noopener noreferrer" className="bb-action">参加申込フォームを開く ↗</BackboneTrackedLink><Link href="/ja/opportunities" className="bb-action bb-action--outline">RBA活動一覧 ↗</Link></div><p className="bb-small" style={{marginTop:26}}>主催：HBC Wolves／指導・監修：Riot Basketball Academy／協賛：GLEAM® by Nobumitsu Tabata</p></section>
   </div></main>
  </div>
  </>
 </SiteFrame>;
}
