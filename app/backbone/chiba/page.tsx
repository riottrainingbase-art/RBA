import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import "@/components/backbone-street.css";

const registration="https://docs.google.com/forms/d/e/1FAIpQLScP3NPWCVgySjcP1TyqMdXQ4Cw9CUBhMk78DJPP1dlLl3hShw/viewform";
export const metadata:Metadata={
 title:"BACKBONE CHIBA｜10月25日（日）千葉 Round 3",
 description:"2026年10月25日（日）、千葉県神崎町でBACKBONE育成クリニックと3x3ゲーム。対象は小学1年生〜中学3年生、参加費6,600円（税込）。",
 alternates:{canonical:"https://riotbasketballacademy.com/backbone/chiba"}
};
const timeline=[["08:40","受付"],["09:00〜11:30","育成クリニック"],["11:30〜13:00","昼食・休憩"],["13:00〜13:30","チーム発表・準備運動"],["13:30〜15:50","3x3ゲーム"],["16:00","終了予定"]];
export default function ChibaChapter(){
 return <SiteFrame locale="ja">
  <div className="bb-street"><div className="bb-wrap"><div className="bb-topline"><span>BACKBONE / CHIBA CHAPTER</span><strong>ROUND 03</strong></div></div>
   <main className="bb-detail"><div className="bb-wrap">
    <Link href="/backbone" className="bb-back">← BACKBONEに戻る</Link>
    <p className="bb-eyebrow" style={{marginTop:38}}>OCT 25 / 2026 / CHIBA CHAPTER</p>
    <h1 className="bb-detail-title">CHIBA.<br/><span style={{color:"var(--bb-accent)"}}>ROUND 3.</span></h1>
    <h2 style={{fontSize:"clamp(23px,3.5vw,36px)",fontWeight:900}}>10月25日、千葉でプレーしよう。</h2>
    <p className="bb-lead">午前は育成クリニック、午後は3x3ゲーム。チームは当日編成するため、一人での参加も歓迎しています。</p>
    <div className="bb-actions"><a href={registration} target="_blank" rel="noopener noreferrer" className="bb-action">参加申込フォーム ↗</a><Link href="/backbone" className="bb-action bb-action--outline">BACKBONEについて ↗</Link></div>
    <div className="bb-detail-cards">
     <article><h2>WHEN / WHERE</h2><p>2026年10月25日（日）<br/>8:40受付／9:00〜16:00<br/>神崎中学校体育館（千葉県神崎町）</p></article>
     <article><h2>WHO</h2><p>小学1年生〜中学3年生<br/>定員60名<br/>個人参加歓迎</p></article>
     <article><h2>ENTRY FEE</h2><p>1名 6,600円（税込）<br/>兄弟姉妹など複数名の場合は、人数分のお申し込みが必要です。</p></article>
    </div>
    <section className="bb-detail-block"><p className="bb-eyebrow">DAY SCHEDULE</p><h2>当日の予定</h2><dl className="bb-schedule">{timeline.map(([time,activity])=><div key={time} style={{display:"contents"}}><dt>{time}</dt><dd>{activity}</dd></div>)}</dl><p className="bb-small">進行状況により、時間を調整する場合があります。</p></section>
    <section className="bb-detail-block"><p className="bb-eyebrow">REGISTRATION</p><h2>参加申込</h2><p className="bb-lead">申込フォームで最新の募集状況と参加条件をご確認ください。フォーム送信後の受付や決済については、主催者の案内に従ってください。</p><div className="bb-actions"><a href={registration} target="_blank" rel="noopener noreferrer" className="bb-action">参加申込フォームを開く ↗</a><Link href="/ja/opportunities" className="bb-action bb-action--outline">RBA活動一覧 ↗</Link></div><p className="bb-small" style={{marginTop:26}}>主催：HBC Wolves／指導・監修：Riot Basketball Academy／協賛：GLEAM® by Nobumitsu Tabata</p></section>
   </div></main>
  </div>
 </SiteFrame>;
}
