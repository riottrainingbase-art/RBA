import type {Metadata} from "next";
import {SiteFrame} from "@/components/site-frame";
import {GrowthClickTracking} from "@/components/growth-click-tracking";
import styles from "./school-growth.module.css";

export const metadata:Metadata={
  title:"仙台U12・U15バスケットボールスクール｜体験・参加相談｜RBA",
  description:"仙台市太白区のRBAスクール。U12は茂庭台小学校を会場候補に金曜夕方、U15は木曜18:00〜19:30・月3回。所属チームを変えずに学べます。無料の体験相談フォームから学年・希望曜日を登録できます。実際の体験日、会場、体験費用は個別案内。",
  alternates:{canonical:"https://riotbasketballacademy.com/ja/sendai-school"},
  openGraph:{title:"チームはそのまま。もっと、上手くなる。｜RBA仙台スクール",description:"小学生・中学生のための育成スクール。U12・U15の学年・希望曜日から、無料で体験・参加相談ができます。",url:"https://riotbasketballacademy.com/ja/sendai-school",type:"website"}
};
const intake="https://form.jotform.com/263053122067044";
const u15="https://form.jotform.com/262678369675074";
const navy="#10233f";
const muted="#52627a";
const basicButton={display:"inline-flex",alignItems:"center",justifyContent:"center",minHeight:52,padding:"13px 20px",background:navy,color:"#fff",fontSize:15,fontWeight:800,textDecoration:"none",borderRadius:4} as const;
const secondary={...basicButton,background:"#fff",border:"1px solid #bbc7d3",color:navy} as const;

const steps = [
  ["01", "保護者が無料で相談", "学年・希望クラス・通いやすい曜日とお住まいのエリアを送信します。相談のみで入会・決済は発生しません。"],
  ["02", "RBAから条件をご案内", "体験可能日、会場、体験費用、持ち物などを確認して保護者へご連絡します。受入れ条件が整っていない場合は、その旨もお知らせします。"],
  ["03", "体験後に継続を検討", "本人とご家庭の希望を確認し、入会金・月会費・活動条件を理解した上で継続するか決められます。"],
] as const;
const questions = [
  ["今のチームを辞める必要がありますか？", "ありません。U12・U15 SKILL UPは所属チームを続けながら学ぶスクールです。対外試合やチーム登録を前提とするGREAM仙台U15クラブとは別の活動です。"],
  ["小学6年生はどこへ相談すればいいですか？", "U12とU15 SKILL UPのどちらが適しているか、学年・経験・通える曜日からご相談ください。クラブチームへの入団を検討する場合はGREAM仙台の別窓口をご案内します。"],
  ["体験は無料ですか？", "このページの相談フォームの送信は無料です。実際の体験参加費、体験日、受入可否はRBAからご案内するまで未確定です。"],
  ["いつ、どこで活動していますか？", "U12は茂庭台小学校を基本会場とし、原則金曜18:00〜19:30・月3回を基本に調整中です。U15 SKILL UPは木曜18:00〜19:30・原則月3回で、参加日の会場を個別にご案内します。"],
  ["月謝と入会金はどこで確認できますか？", "U12は11月30日までの新規入会で入会金10,000円・月7,700円、12月1日以降の新規入会で入会金11,500円・月8,900円（税込）の案内です。U15 SKILL UPは入会金5,500円・月7,700円（税込）。受入条件と正式な適用額を体験後に書面でご案内します。"],
  ["経験が浅くても大丈夫ですか？", "ご相談いただけます。学年だけでなく、経験や運動状況、所属チームの練習負担を確認し、無理のない参加方法を一緒に検討します。"],
  ["子ども本人だけで申し込めますか？", "安全管理と連絡のため、フォームは保護者など成人の方からお送りください。選手本人の詳しい健康情報を最初の相談フォームへ記載する必要はありません。"],
] as const;

const parentNeeds = [
  ["はじめてのバスケ", "ボールに触れる経験が少なくても、現在の学年・経験に合うクラスを相談できます。受け入れ状況を確認してご案内します。"],
  ["ミニバスと両立", "今のチームを辞める必要はありません。チーム練習量とのバランスを考えながら、ゲームで使う技術と判断を学びます。"],
  ["小学6年生の次の一歩", "U12・U15 SKILL UP・U15クラブの違いを確認し、ご本人が希望する形を相談できます。"],
] as const;

const pillars=[
  ["SEE","味方・相手・スペースを観る"],
  ["DECIDE","状況に応じて次のプレーを選ぶ"],
  ["ACT","実際のゲームで技術を試す"],
] as const;

export default function SendaiSchoolPage(){
  return <SiteFrame locale="ja">
    <main id="main-content" lang="ja" style={{background:"#fcfbf8",color:navy}}>
      <GrowthClickTracking />
      <section style={{maxWidth:1080,margin:"0 auto",padding:"clamp(46px,7vw,92px) 22px 45px"}}>
        <p style={{fontSize:12,letterSpacing:2.3,fontWeight:800,color:"#9f754d",margin:"0 0 18px"}}>RBA SENDAI SCHOOL / U12 & U15</p>
        <h1 style={{fontSize:"clamp(34px,5.3vw,64px)",letterSpacing:"-.045em",lineHeight:1.21,margin:"0 0 22px"}}>チームはそのまま。<br/>もっと、上手くなる。</h1>
        <p style={{fontSize:"clamp(16px,1.9vw,19px)",lineHeight:1.9,maxWidth:745,color:"#344a62",margin:"0 0 28px"}}>覚えた技術を試合で使えるように。<br/>相手を見る、判断する、実行する。所属チームを続けながら、個人の成長に向き合う仙台のバスケットボールスクールです。</p>
        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          <a href={intake} target="_blank" rel="noopener noreferrer" data-growth-id="sendai-school-hero-interest" style={basicButton}>体験・参加を無料相談する →</a>
          <a href="#classes" style={secondary}>U12・U15を比較する ↓</a>
        </div>
        <p style={{fontSize:12,color:muted,lineHeight:1.85,marginTop:16}}>相談は無料です。体験日・会場・体験費用・入会条件は確認後にご案内します。送信だけで体験予約・入会・決済は成立しません。</p>
        <p className={styles.localSearch}>仙台市太白区｜茂庭台・長町・八木山・富沢などから通える活動をお探しのご家庭へ。希望曜日が合わない場合もまずはご相談ください。</p>
      </section>

      <section style={{padding:"48px 22px",background:"#fff",borderTop:"1px solid #e1e5e9"}} aria-labelledby="school-who-for">
        <div style={{maxWidth:1080,margin:"0 auto"}}>
          <p style={{fontSize:12,letterSpacing:2,color:"#8d6946",fontWeight:800}}>FOR SENDAI FAMILIES</p>
          <h2 id="school-who-for" style={{fontSize:"clamp(25px,3.6vw,38px)",margin:"9px 0 12px"}}>こんなご家庭から相談できます。</h2>
          <p style={{fontSize:14,color:"#42556d",lineHeight:1.85,maxWidth:790}}>入会を決める前に、学年・現在の活動・ご家庭で無理なく通える曜日を確認します。最初から競技経験や入団意思を問うものではありません。</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:13,marginTop:22}}>
            {parentNeeds.map(([title,desc])=><article key={title} style={{padding:"22px 20px",background:"#f3f5f7",borderTop:"3px solid #10233f"}}><h3 style={{fontSize:19,margin:"0 0 10px"}}>{title}</h3><p style={{fontSize:14,color:"#42556d",lineHeight:1.85,margin:0}}>{desc}</p></article>)}
          </div>
          <a href={intake} target="_blank" rel="noopener noreferrer" data-growth-id="sendai-school-audience-interest" style={{...basicButton,marginTop:24}}>自分に合うクラスを無料で相談する →</a>
        </div>
      </section>

      <section id="classes" style={{background:"#f2f4f6",padding:"54px 22px 60px"}}>
        <div style={{maxWidth:1080,margin:"0 auto"}}>
          <p style={{fontSize:12,letterSpacing:2,color:"#8d6946",fontWeight:800}}>CHOOSE YOUR CLASS</p>
          <h2 style={{fontSize:"clamp(26px,3.5vw,39px)",letterSpacing:"-.035em",margin:"8px 0 22px"}}>学年と通える曜日から選ぶ。</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:14}}>
            <article style={{background:"#fff",border:"1px solid #d9e0e6",padding:"clamp(22px,2.9vw,32px)"}}>
              <p style={{fontSize:12,letterSpacing:2,fontWeight:800,color:"#8e6945"}}>ELEMENTARY / U12</p>
              <h3 style={{fontSize:30,margin:"4px 0 12px"}}>U12 スクール</h3>
              <p style={{lineHeight:1.85,color:"#344a62",fontSize:15}}>小学生向け。技術と判断を少人数ゲームで結びつける学びの場として準備しています。</p>
              <dl style={{fontSize:15,lineHeight:1.8,display:"grid",gridTemplateColumns:"84px 1fr",gap:"9px 13px",margin:"20px 0 25px"}}>
                <dt style={{fontWeight:800}}>予定会場</dt><dd style={{margin:0}}>茂庭台小学校（太白区）</dd>
                <dt style={{fontWeight:800}}>基本曜日</dt><dd style={{margin:0}}>金曜18:00〜19:30／月3回を基本</dd>
                <dt style={{fontWeight:800}}>料金</dt><dd style={{margin:0}}>11/30までの新規入会：入会金10,000円・月7,700円／12/1以降の新規入会：入会金11,500円・月8,900円（税込）。適用条件は個別案内。</dd>
                <dt style={{fontWeight:800}}>受付状況</dt><dd style={{margin:0}}>定期開催日・体験受入条件を調整中</dd>
              </dl>
              <a href={intake} target="_blank" rel="noopener noreferrer" data-growth-id="sendai-school-u12-interest" style={basicButton}>U12の体験を相談 →</a>
              <p style={{fontSize:13,margin:"17px 0 0"}}><a href="/ja/u12-school" style={{color:navy}}>U12の詳細を見る →</a></p>
            </article>
            <article style={{background:"#fff",border:"1px solid #d9e0e6",padding:"clamp(22px,2.9vw,32px)"}}>
              <p style={{fontSize:12,letterSpacing:2,fontWeight:800,color:"#8e6945"}}>GRADE 6–U15</p>
              <h3 style={{fontSize:30,margin:"4px 0 12px"}}>U15 SKILL UP</h3>
              <p style={{lineHeight:1.85,color:"#344a62",fontSize:15}}>小学6年生から中学生まで。1on1、判断、オフボール、ゲームで使えるFundamentalsを年間でつなぎます。</p>
              <dl style={{fontSize:15,lineHeight:1.8,display:"grid",gridTemplateColumns:"84px 1fr",gap:"9px 13px",margin:"20px 0 25px"}}>
                <dt style={{fontWeight:800}}>対象</dt><dd style={{margin:0}}>小6・中学生、定員25名</dd>
                <dt style={{fontWeight:800}}>基本曜日</dt><dd style={{margin:0}}>木曜18:00〜19:30／原則月3回</dd>
                <dt style={{fontWeight:800}}>開催地域</dt><dd style={{margin:0}}>仙台市太白区。参加日の体育館は個別案内</dd>
                <dt style={{fontWeight:800}}>料金</dt><dd style={{margin:0}}>入会金5,500円／月7,700円（税込）</dd>
              </dl>
              <a href={intake} target="_blank" rel="noopener noreferrer" data-growth-id="sendai-school-u15-interest" style={basicButton}>U15の体験を相談 →</a>
              <p style={{fontSize:13,margin:"17px 0 0"}}><a href="/ja/u15-skill-up" style={{color:navy}}>U15の育成内容を見る →</a></p>
            </article>
          </div>
          <p style={{fontSize:13,color:muted,lineHeight:1.9,margin:"20px 0 0"}}>どちらのクラスも、チームや学校部活動への所属変更は不要です。金曜日が難しい方も、土日など参加しやすい曜日の希望を相談フォームからお知らせください。ただし、土日の定期開催は現時点で確定していません。</p>
          <p style={{fontSize:13,color:muted,lineHeight:1.9,margin:"10px 0 0"}}>※新しい曜日・学年別の枠は、会場、指導者、安全管理、定員を確認してから募集します。お問い合わせ数だけで開講や参加を確約しません。</p>
        </div>
      </section>

      <section style={{padding:"48px 22px",background:"#eaf0f3",borderTop:"1px solid #d4dde3"}} aria-labelledby="school-parent-check">
        <div style={{maxWidth:1080,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(265px,1fr))",gap:28,alignItems:"start"}}>
          <div>
            <p style={{fontSize:12,fontWeight:800,letterSpacing:2,color:"#7d603f"}}>BEFORE YOU DECIDE</p>
            <h2 id="school-parent-check" style={{fontSize:"clamp(26px,3.7vw,37px)",margin:"10px 0 16px"}}>体験する前に、知ってほしいこと。</h2>
            <p style={{fontSize:15,lineHeight:1.9,color:"#354b62"}}>クラスの雰囲気、指導の考え方、通える曜日、実際の会場・費用。本人が楽しく続けられるかを、ご家庭と一緒に確認します。</p>
          </div>
          <div style={{background:"#fff",padding:"22px 25px",border:"1px solid #d5dee5"}}>
            <p style={{fontSize:13,fontWeight:850,margin:"0 0 12px"}}>体験相談で確認する4項目</p>
            <ol style={{paddingLeft:22,margin:0,color:"#354b62",lineHeight:2,fontSize:15}}>
              <li>学年・これまでのバスケ経験</li>
              <li>普段のチーム活動・希望曜日</li>
              <li>参加できる体験日と会場</li>
              <li>体験費用・入会後の会費と規約</li>
            </ol>
            <a href={intake} target="_blank" rel="noopener noreferrer" data-growth-id="sendai-school-checklist-interest" style={{...basicButton,marginTop:18}}>無料相談フォームへ →</a>
          </div>
        </div>
      </section>

      <section className={styles.process} aria-labelledby="school-how-to-join">
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>START WITH A CONVERSATION</p>
          <h2 id="school-how-to-join">体験・入会まで、3つのステップ。</h2>
          <div className={styles.steps}>
            {steps.map(([num,title,description])=><article key={num}>
              <span aria-hidden="true">{num}</span><h3>{title}</h3><p>{description}</p>
            </article>)}
          </div>
          <a className={styles.inlineCta} href={intake} target="_blank" rel="noopener noreferrer" data-growth-id="sendai-school-steps-interest">保護者の方はこちらから無料相談 →</a>
        </div>
      </section>

      <section style={{maxWidth:1080,margin:"0 auto",padding:"60px 22px 54px"}}>
        <p style={{fontSize:12,letterSpacing:2,color:"#8d6946",fontWeight:800}}>SEE · DECIDE · ACT</p>
        <h2 style={{fontSize:"clamp(26px,3.5vw,39px)",margin:"10px 0 22px"}}>技術だけで終わらない。</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(215px,1fr))",gap:16}}>
          {pillars.map(([title,description],i)=><article key={title} style={{borderTop:"3px solid #10233f",padding:"15px 3px"}}><p style={{fontSize:13,color:"#9f754d",fontWeight:800}}>0{i+1}</p><h3 style={{fontSize:25,margin:"8px 0"}}>{title}</h3><p style={{lineHeight:1.85,margin:0,color:"#465a70"}}>{description}</p></article>)}
        </div>
      </section>

      <section style={{padding:"45px 22px",background:"#e6e7e5",borderTop:"1px solid #d2d8dc"}}>
        <div style={{maxWidth:1080,margin:"0 auto"}}>
          <p style={{fontSize:12,letterSpacing:2,color:"#52627a",fontWeight:800}}>CLUB TEAM / DIFFERENT PROGRAMME</p>
          <h2 style={{fontSize:"clamp(26px,3.8vw,40px)",margin:"8px 0 12px",color:navy}}>U15男子クラブチームを探している方へ。</h2>
          <p style={{lineHeight:1.9,maxWidth:850,color:"#344a62"}}>GREAM仙台は2026年に発足したU15男子クラブで、仙台市太白区を中心に活動します。皆でバスケを楽しみながら練習・試合・交流に取り組むチームです。こちらのU15 SKILL UP SCHOOLとは料金・申込先・練習枠が別です。クラブの曜日と会場は参加相談後にご案内します。</p>
          <a href="/ja/gream-sendai" data-growth-id="sendai-school-to-gream-club" style={basicButton}>GREAM仙台U15クラブの詳細・参加相談 →</a>
        </div>
      </section>

      <section className={styles.faq} aria-labelledby="sendai-school-faq">
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>FOR PARENTS</p>
          <h2 id="sendai-school-faq">体験前によくあるご質問。</h2>
          <div className={styles.faqList}>
            {questions.map(([question,answer])=><details key={question}>
              <summary>{question}</summary><p>{answer}</p>
            </details>)}
          </div>
          <p className={styles.programmeChoice}>GREAM仙台はスクールではなくU15男子クラブチームです。クラブを希望する場合は <a href="/ja/gream-sendai" data-growth-id="sendai-school-faq-gream">GREAM仙台の参加相談</a>へお進みください。</p>
        </div>
      </section>
      <section style={{background:navy,color:"#fff",padding:"50px 22px 68px"}}>
        <div style={{maxWidth:1080,margin:"0 auto"}}>
          <h2 style={{fontSize:"clamp(26px,3.5vw,38px)",lineHeight:1.35,margin:"0 0 13px"}}>まずは、通えるか相談する。</h2>
          <p style={{fontSize:15,color:"#d7e1eb",lineHeight:1.9,maxWidth:755}}>学年、希望する曜日、お住まいのおおよそのエリアを入力すれば十分です。保護者のメールアドレスへ開催条件をご案内します。今すぐ入会や決済をする必要はありません。</p>
          <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:23}}>
            <a href={intake} target="_blank" rel="noopener noreferrer" data-growth-id="sendai-school-final-interest" style={{...basicButton,background:"#fff",color:navy}}>体験・参加相談フォーム →</a>
            <a href={u15} target="_blank" rel="noopener noreferrer" data-growth-id="sendai-school-u15-form" style={{...secondary,background:"transparent",color:"#fff",borderColor:"#9cacc0"}}>U15の正式申込について確認する →</a>
          </div>
          <p style={{fontSize:12,color:"#c4cfdb",lineHeight:1.8,marginTop:18}}>体験の受入日・会場と参加条件をご確認いただく前に、月額決済を繰り返す必要はありません。決済でお困りの場合は <a style={{color:"#fff"}} href="mailto:riot.training.base@gmail.com">RBAへお問い合わせ</a>ください。</p>
        </div>
      </section>
      <div className={styles.mobileCta} role="region" aria-label="体験相談へ進む">
        <span>仙台U12・U15スクール<br/><strong>保護者の無料相談</strong></span>
        <a href={intake} target="_blank" rel="noopener noreferrer" data-growth-id="sendai-school-mobile-interest">体験を相談 →</a>
      </div>
    </main>
  </SiteFrame>;
}
