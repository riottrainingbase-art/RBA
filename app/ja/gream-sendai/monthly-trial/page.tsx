// [preview] GREAM SENDAI monthly trial interest page release checkpoint 2026-11-06.
import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";

const pageUrl = "https://riotbasketballacademy.com/ja/gream-sendai/monthly-trial";
const trialForm = "https://form.jotform.com/263087779635070";
const mainPage = "/ja/gream-sendai";
const pathway = "/ja/gream-sendai/u12-pathway";
const girlsForm = "https://form.jotform.com/263083176331050";
const ink = "#121619";
const muted = "#596269";
const card = "#f2f4f2";

export const metadata: Metadata = {
  title: "GREAM仙台U15｜毎月木曜日の体験希望受付（開催候補）｜RBA",
  description: "仙台市太白区を中心に活動するGREAM仙台男子U15クラブ。毎月第3木曜18:00〜19:30を基本候補に体験練習会を計画中。会場・開催日時・体験費用・担当は未確定です。保護者からの無料事前相談受付中。",
  alternates: { canonical: pageUrl },
};

const candidateDates = [
  ["2026", "11月19日", "木"],
  ["2026", "12月17日", "木"],
  ["2027", "1月21日", "木"],
  ["2027", "2月18日", "木"],
  ["2027", "3月18日", "木"]
] as const;

const button = { display:"inline-flex", alignItems:"center", justifyContent:"center", minHeight:52, padding:"13px 22px", background:"#fff", color:ink, border:"1px solid #fff", borderRadius:3, textDecoration:"none", fontSize:16, fontWeight:800 } as const;

export default function MonthlyTrialPage() {
  return <SiteFrame locale="ja"><main lang="ja" style={{background:"#fff",color:ink}}>
    <section style={{background:ink,color:"#fff",padding:"clamp(60px,7vw,105px) max(20px,6vw) 65px"}}>
      <div style={{maxWidth:1100,margin:"auto"}}>
        <p style={{fontSize:12,fontWeight:900,letterSpacing:3,color:"#bec6ca",margin:"0 0 22px"}}>GREAM SENDAI U15 / MONTHLY THURSDAY TRIAL</p>
        <h1 style={{fontSize:"clamp(40px,7vw,78px)",fontWeight:950,lineHeight:1.12,letterSpacing:"-.045em",margin:"0 0 22px"}}>木曜日、<br/>まずは一緒に<br/>バスケをしよう。</h1>
        <p style={{fontSize:"clamp(17px,2vw,21px)",lineHeight:1.85,color:"#d8dfe2",maxWidth:820,margin:"0 0 28px"}}>GREAM仙台は、2026年に生まれた男子U15クラブです。小学6年生や中学生の選手と保護者に向けて、月1回の体験練習を計画しています。参加希望を先にお聞きし、実施条件が整った回から個別にご案内します。</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:12,alignItems:"center"}}>
          <a href={trialForm} target="_blank" rel="noopener noreferrer" style={button}>無料で体験希望を登録する ↗</a>
          <a href={pathway} style={{...button,background:"transparent",color:"#fff",borderColor:"#79838a"}}>小6・保護者向け進路ガイド →</a>
        </div>
        <p style={{fontSize:13,lineHeight:1.8,color:"#bbc5c9",margin:"22px 0 0"}}>重要：開催日・時間・会場・指導者・体験費用・定員は最終調整中です。フォームは無課金の希望調査で、参加枠の確約・契約・決済は発生しません。</p>
      </div>
    </section>
    <section style={{padding:"34px max(20px,6vw)",background:"#e8ebe9",borderBottom:"1px solid #d7dcdd"}}>
      <div style={{maxWidth:1100,margin:"auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:18}}>
        {[["開催方針","月1回・第3木曜日を基本候補"],["時間帯","18:00〜19:30（候補）"],["対象","U15男子・小学6年生も相談可能"],["活動地域","仙台市太白区中心／今回の会場は未定"]].map(([k,v])=><div key={k}><p style={{color:muted,fontWeight:850,fontSize:12,margin:"0 0 6px"}}>{k}</p><strong style={{fontSize:18,lineHeight:1.55}}>{v}</strong></div>)}
      </div>
    </section>
    <section style={{padding:"60px max(20px,6vw)"}}>
      <div style={{maxWidth:1100,margin:"auto"}}>
        <p style={{fontSize:12,letterSpacing:2.8,color:muted,fontWeight:900}}>PLANNED DATES / NOT YET CONFIRMED</p>
        <h2 style={{fontSize:"clamp(29px,4vw,46px)",margin:"10px 0 13px"}}>毎月の開催候補日</h2>
        <p style={{fontSize:16,lineHeight:1.85,color:muted,maxWidth:900}}>第3木曜日の18:00〜19:30を軸に、会場・指導者・既存練習との調整を行います。下の日付は予約済み・開催確約を意味しません。参加希望のある月をフォームから選んでください。</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:11,margin:"25px 0 0"}}>
          {candidateDates.map(([year,date,day])=><div key={year+date} style={{background:card,border:"1px solid #d7dddd",padding:"22px 20px"}}>
            <p style={{margin:0,fontSize:13,color:muted,fontWeight:800}}>{year}年・候補</p>
            <h3 style={{fontSize:23,margin:"12px 0 8px"}}>{date}（{day}）</h3>
            <p style={{fontSize:14,margin:0,color:muted}}>18:00〜19:30 予定</p>
          </div>)}
        </div>
      </div>
    </section>
    <section style={{background:ink,color:"#fff",padding:"65px max(20px,6vw)"}}>
      <div style={{maxWidth:1100,margin:"auto"}}>
        <p style={{color:"#b6c0c5",fontSize:12,letterSpacing:3,fontWeight:900}}>90 MINUTES / DEVELOPMENT FOCUS</p>
        <h2 style={{fontSize:"clamp(30px,4vw,50px)",margin:"12px 0 25px"}}>体験ではこんなことを大切にします。</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:14}}>
          {[
            ["見る","相手・仲間・スペースを見て、次のプレーにつながる情報を集める。"],
            ["判断する","シュート・ドライブ・パスの選択を、自分で考える。"],
            ["試す","1対1から少人数ゲームへ。うまくいったことと課題を次につなぐ。"]
          ].map(([title,copy])=><article key={title} style={{border:"1px solid #54616a",padding:"25px 23px"}}><h3 style={{fontSize:26,margin:"0 0 14px"}}>{title}</h3><p style={{color:"#d3dce0",lineHeight:1.9,margin:0}}>{copy}</p></article>)}
        </div>
        <p style={{fontSize:14,lineHeight:1.85,color:"#bec8cc",marginTop:26}}>実際の運動内容・時間配分は年齢、人数、指導者、体調と施設条件に合わせて調整します。90分モデルは企画案であり、開催条件確定時に改めて案内します。</p>
      </div>
    </section>
    <section style={{padding:"65px max(20px,6vw)",background:"#f4f5f3"}}>
      <div style={{maxWidth:1100,margin:"auto"}}>
        <p style={{fontSize:12,fontWeight:900,letterSpacing:2.7,color:muted}}>TO GUARDIANS</p>
        <h2 style={{fontSize:"clamp(29px,4vw,48px)",margin:"10px 0 22px"}}>いまのチームも大切にしながら。</h2>
        <p style={{color:muted,lineHeight:1.9,fontSize:17,maxWidth:960}}>体験希望の登録は移籍や入団を約束するものではありません。小学6年生は現在のミニバスを続けながら、中学進学後の選択肢の一つとしてGREAM仙台を検討できます。学校部活動やクラブ登録・大会出場条件は、入団前に個別に確認します。</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:13,marginTop:25}}>
          {[
            ["STEP 1","保護者から希望登録","希望月・参加可能な時間帯・学年をお知らせください。"],
            ["STEP 2","開催条件が整えばご案内","施設利用・指導者・安全管理・体験費用等を決め、RBAから連絡します。"],
            ["STEP 3","内容に納得して参加","正式な参加条件を確認し、同意のうえ体験。入団はさらに別手続きです。"]
          ].map(([n,t,d])=><article key={n} style={{background:"#fff",padding:25,border:"1px solid #dde0e0"}}><strong style={{fontSize:12,color:muted,letterSpacing:2}}>{n}</strong><h3 style={{fontSize:20,margin:"14px 0 10px"}}>{t}</h3><p style={{color:muted,lineHeight:1.85,margin:0}}>{d}</p></article>)}
        </div>
      </div>
    </section>
    <section style={{padding:"70px max(20px,6vw)",textAlign:"center"}}>
      <div style={{maxWidth:850,margin:"auto"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:900,color:muted}}>FIRST STEP / NO CHARGE</p>
        <h2 style={{fontSize:"clamp(32px,5vw,61px)",lineHeight:1.1,margin:"12px 0 20px"}}>まずは希望日を<br/>教えてください。</h2>
        <p style={{fontSize:17,color:muted,lineHeight:1.85,marginBottom:26}}>相談フォームに希望月を登録してください。今すぐ進路を決める必要はありません。</p>
        <a href={trialForm} target="_blank" rel="noopener noreferrer" style={{...button,background:ink,color:"#fff",borderColor:ink}}>GREAM U15 木曜体験・事前登録 ↗</a>
        <div style={{marginTop:33,padding:23,background:card,textAlign:"left",border:"1px solid #d8dddd"}}>
          <h3 style={{fontSize:19,margin:"0 0 11px"}}>募集に関するご案内</h3>
          <p style={{lineHeight:1.8,color:muted,margin:"0 0 12px"}}>男子U15クラブの2027年度月会費は9,900円（税込）と決定しています。体験会の料金は未定です。女子U15は2027年の指導開始へ向けて準備中で、正式な入団募集ではありません。</p>
          <p style={{margin:0,lineHeight:1.8}}><a href={mainPage} style={{color:ink,fontWeight:750}}>男子クラブの詳しい案内 →</a>　／　<a href={girlsForm} style={{color:ink,fontWeight:750}}>女子U15の事前相談 →</a></p>
        </div>
        <p style={{fontSize:14,color:muted,lineHeight:1.9,marginTop:26}}>問い合わせ：<a style={{color:ink}} href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a>　／　<a style={{color:ink}} href="/ja/policies">参加規約・個人情報について</a></p>
      </div>
    </section>
  </main></SiteFrame>;
}