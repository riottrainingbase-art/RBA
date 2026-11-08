// GREAM SENDAI U12-to-U15 family guide release checkpoint: 2026-11-06.
import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";

const pageUrl = "https://riotbasketballacademy.com/ja/gream-sendai/u12-pathway";
const boysForm = "https://form.jotform.com/263082418714053";
const girlsForm = "https://form.jotform.com/263083176331050";
const mainPage = "/ja/gream-sendai";
const ink = "#131619";
const muted = "#50585c";
const light = "#f4f5f3";

export const metadata: Metadata = {
  title: "小6から考える中学バスケの選択肢｜GREAM仙台 U15｜RBA",
  description: "小学6年生と保護者のための進路・参加相談ガイド。GREAM仙台は2026年発足の男子U15クラブ。主な活動拠点は仙台市太白区。2027年度男子月会費は9,900円（税込）。女子U15は準備中。相談のみは無料、入団・費用の確約はありません。",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "中学でも、バスケを続けたい。｜GREAM仙台U15",
    description: "小学6年生・保護者向け。2027年度、仙台市太白区を中心にバスケを続ける選択肢を考えよう。",
    url: pageUrl,
    type: "website",
    siteName: "Riot Basketball Academy",
  },
};

const btn = { display: "inline-flex", justifyContent: "center", alignItems: "center", minHeight: 50, padding: "13px 22px", border: "1px solid #131619", borderRadius: 3, fontSize: 15, fontWeight: 800, color: "#fff", background: ink, textDecoration: "none" } as const;

const faqs = [
  ["6年生のうちから相談してもいいですか？", "はい。卒団や進学までの予定が決まっていなくても構いません。保護者の方から、体験や活動条件についてご相談いただけます。実際の参加・登録資格は個別に確認します。"],
  ["今のミニバスを辞める必要がありますか？", "ありません。今のミニバスでの活動を大切にしてください。GREAMへの相談は卒団後の進路検討のためのものです。現在の所属団体の意向や各家庭の希望を尊重します。"],
  ["中学校の部活動とクラブの両方に所属できますか？", "練習参加の可否と、JBAの競技者登録・大会参加資格は別の話です。公式大会への参加には登録先や大会ごとの条件があるため、入団前に学校・クラブ・最新のJBA規程を確認し、個別にご案内します。"],
  ["練習はいつ、どこでありますか？", "活動の中心は仙台市太白区です。練習会場は確保しています。週3回・各90分を基本に計画していますが、確定した曜日、時間、場所、送迎条件は参加相談後にご説明します。"],
  ["体験練習会はいつですか？", "現在、指導スタッフと開催枠を調整しています。日時は未決定です。参加相談フォームから希望曜日・時間帯をお知らせください。相談自体は無料で、体験実施時の条件は事前にご案内します。"],
  ["費用はいくらですか？", "2027年度の男子U15クラブ月会費は9,900円（税込）です。初期費用や合宿・遠征など別途生じる可能性のある費用は、正式入団を決める前に個別にご案内します。相談フォームの送信だけで料金は発生しません。"],
  ["女子も参加できますか？", "2027年から女子選手への指導を始める準備をしています。現段階では正式な女子チーム募集ではありません。女子専用の無料事前相談フォームをご利用ください。2027年度女子月会費は9,900円（税込）に決定しています。活動日・正式設立時期・その他費用は未決定です。"],
  ["茂庭台ミニバスの関係者しか相談できませんか？", "いいえ。太白区を中心に、仙台市内および近隣にお住まいの方から広く相談を受け付けています。特定チームへの所属や紹介は不要です。"],
] as const;

export default function U12PathwayPage() {
  return <SiteFrame locale="ja"><main lang="ja" style={{background:"#fff",color:ink}}>
    <section style={{background:ink,color:"#fff",padding:"clamp(58px,7vw,105px) max(20px,6vw) 65px"}}>
      <div style={{maxWidth:1120,margin:"0 auto"}}>
        <p style={{fontSize:12,fontWeight:850,letterSpacing:3,color:"#c8d0d1",margin:"0 0 23px"}}>GREAM SENDAI / U12 → U15 / 2027</p>
        <h1 style={{fontSize:"clamp(40px,7.4vw,83px)",letterSpacing:"-.045em",lineHeight:1.12,margin:"0 0 22px",fontWeight:900}}>中学でも、<br/>バスケを続けたい。</h1>
        <p style={{maxWidth:780,fontSize:"clamp(17px,2.2vw,22px)",lineHeight:1.85,color:"#d4dce0",margin:"0 0 30px"}}>小学6年生と保護者の皆さまへ。進学後のバスケをどう続けるか、今から少しずつ考えてみませんか。GREAM仙台は、仲間と楽しみ、挑戦しながら成長できる場を目指しています。</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:12}}>
          <a href={boysForm} target="_blank" rel="noopener noreferrer" style={{...btn,background:"#fff",color:ink,borderColor:"#fff"}}>男子U15・無料で参加相談する ↗</a>
          <a href="#girls" style={{...btn,background:"transparent",borderColor:"#818b90",color:"#fff"}}>女子U15の準備状況を見る ↓</a>
        </div>
        <p style={{fontSize:13,lineHeight:1.8,color:"#c8d0d1",marginTop:22}}>相談だけで入団・参加確定・課金は生じません。体験の日時や条件は個別にご案内します。</p>
      </div>
    </section>
    <section style={{padding:"25px max(20px,6vw)",background:"#e8ebe9",borderBottom:"1px solid #d4dada"}}>
      <div style={{maxWidth:1120,margin:"auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:22}}>
        {[["対象","小学6年生の進路相談・中学生の参加相談"],["活動の中心","仙台市太白区／会場確保済み"],["2027年度 男子U15","月会費 9,900円（税込）"],["女子U15","2027年準備中／月額9,900円（税込）"]].map(([k,v])=><div key={k}><p style={{fontSize:12,fontWeight:800,color:muted,margin:"0 0 7px"}}>{k}</p><strong style={{fontSize:19,lineHeight:1.55}}>{v}</strong></div>)}
      </div>
    </section>
    <section style={{padding:"65px max(20px,6vw)"}}>
      <div style={{maxWidth:1120,margin:"auto"}}>
        <p style={{fontWeight:900,fontSize:12,letterSpacing:3,color:muted}}>FOR GUARDIANS</p>
        <h2 style={{fontSize:"clamp(29px,4.5vw,52px)",lineHeight:1.2,margin:"12px 0 20px"}}>今のチームも、<br/>これからの選択も大切に。</h2>
        <p style={{color:muted,maxWidth:890,fontSize:17,lineHeight:1.9}}>私たちは、どこかのチームからの移籍を前提に募集しているわけではありません。まずは今のミニバスを楽しみ、仲間との時間を大切にしてほしい。そのうえで中学進学後の選択肢としてGREAM仙台の活動を知っていただけたら嬉しいです。</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:14,marginTop:30}}>
          {[
            ["01","まず、バスケを楽しむ","上手な子だけが楽しむチームにはしません。一人ひとりの成長と挑戦を大切にします。"],
            ["02","見る・判断する・プレーする","1対1や少人数ゲームを通して、自分でプレーを選べる力を育てます。"],
            ["03","進路は家庭が決める","学校の部活動、他クラブ、GREAM。それぞれを比較し、納得して選べるように説明します。"]
          ].map(([n,t,d])=><article key={n} style={{background:light,border:"1px solid #d8dcdc",padding:25}}><span style={{fontWeight:900,color:muted,fontSize:12}}>{n}</span><h3 style={{fontSize:23,margin:"17px 0 12px"}}>{t}</h3><p style={{color:muted,lineHeight:1.85,margin:0}}>{d}</p></article>)}
        </div>
      </div>
    </section>
    <section style={{padding:"62px max(20px,6vw)",background:light}}>
      <div style={{maxWidth:1120,margin:"auto"}}>
        <p style={{fontSize:12,fontWeight:900,letterSpacing:3,color:muted}}>FIRST CONTACT → TRIAL → MEMBERSHIP</p>
        <h2 style={{fontSize:"clamp(30px,4vw,50px)",margin:"12px 0 26px"}}>参加までの流れ</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:15}}>
          {[
            ["STEP 1","保護者から無料相談","学年・希望する曜日・参加への不安をフォームで教えてください。相談の時点で契約や支払いは不要です。"],
            ["STEP 2","練習条件を確認し、体験を検討","RBAが練習枠・会場・指導体制・体験条件をご案内。本人と保護者が納得してから体験を検討します。"],
            ["STEP 3","入団・登録の条件を確認","会費、必要な規約、学校・JBAの登録条件を確認し、双方合意のうえ別途正式手続きを行います。"]
          ].map(([n,t,d])=><article key={n} style={{background:"#fff",border:"1px solid #d5dada",padding:26}}><strong style={{fontSize:12,color:muted,letterSpacing:2}}>{n}</strong><h3 style={{fontSize:22,margin:"16px 0 12px"}}>{t}</h3><p style={{lineHeight:1.85,color:muted}}>{d}</p></article>)}
        </div>
      </div>
    </section>
    <section id="girls" style={{padding:"70px max(20px,6vw)",background:ink,color:"#fff"}}>
      <div style={{maxWidth:1120,margin:"auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:35,alignItems:"center"}}>
        <div><p style={{letterSpacing:3,color:"#bfc8cc",fontSize:12,fontWeight:900}}>GIRLS U15 / 2027</p><h2 style={{fontSize:"clamp(31px,4.4vw,50px)",lineHeight:1.18,margin:"10px 0 19px"}}>女子の育成も、<br/>2027年から準備を進めます。</h2><p style={{color:"#cbd3d8",lineHeight:1.9}}>女子選手からの関心・参加希望を伺っています。2027年度女子月会費は9,900円（税込）に決定しています。正式なチーム設立、練習日、担当、定員、初期費用等はまだ決まっていません。男子クラブへの申込とは別の受付です。</p></div>
        <div style={{border:"1px solid #758083",padding:27}}><h3 style={{fontSize:24,margin:"0 0 12px"}}>女子U15 事前相談</h3><p style={{lineHeight:1.85,color:"#d8dddf"}}>まずは保護者の方から、ご希望や活動可能な時間帯をお知らせください。無料でご相談いただけます。</p><a href={girlsForm} target="_blank" rel="noopener noreferrer" style={{...btn,background:"#fff",color:ink,borderColor:"#fff"}}>女子U15の無料事前相談 ↗</a></div>
      </div>
    </section>
    <section style={{padding:"65px max(20px,6vw)"}}>
      <div style={{maxWidth:1120,margin:"auto"}}>
        <p style={{fontSize:12,fontWeight:900,letterSpacing:3,color:muted}}>QUESTIONS FROM FAMILIES</p>
        <h2 style={{fontSize:"clamp(30px,4vw,50px)",margin:"10px 0 24px"}}>保護者の方からよくある質問</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14}}>
          {faqs.map(([q,a])=><article key={q} style={{background:light,padding:"23px 24px",border:"1px solid #e0e3e3"}}><h3 style={{fontSize:18,lineHeight:1.55,margin:"0 0 11px"}}>{q}</h3><p style={{fontSize:15,lineHeight:1.85,color:muted,margin:0}}>{a}</p></article>)}
        </div>
        <p style={{fontSize:13,color:muted,lineHeight:1.9,marginTop:26}}>登録・大会参加に関しては、<a style={{color:ink,textDecoration:"underline"}} href="https://www.japanbasketball.jp/news/90330" target="_blank" rel="noopener noreferrer">JBAのU15登録・移籍に関する最新案内</a>もご確認ください。掲載内容は個別の大会出場資格を保証するものではありません。</p>
      </div>
    </section>
    <section style={{padding:"75px max(20px,6vw)",background:light,textAlign:"center"}}>
      <div style={{maxWidth:850,margin:"auto"}}><p style={{fontSize:12,letterSpacing:3,fontWeight:900,color:muted}}>GREAM SENDAI / YOUR NEXT STEP</p><h2 style={{fontSize:"clamp(35px,5.5vw,67px)",lineHeight:1.12,margin:"12px 0 23px"}}>まずは、話を聞いてみよう。</h2><p style={{fontSize:17,lineHeight:1.85,color:muted,marginBottom:26}}>進路を今すぐ決める必要はありません。参加を迷っている方も、活動内容や体験について保護者からご相談いただけます。</p><div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center"}}><a href={boysForm} target="_blank" rel="noopener noreferrer" style={btn}>男子U15・参加相談する ↗</a><a href={mainPage} style={{...btn,background:"transparent",color:ink}}>GREAM仙台の公式紹介を見る →</a></div><p style={{fontSize:13,color:muted,marginTop:25,lineHeight:1.8}}>問い合わせ：<a style={{color:ink}} href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a> ／ <a style={{color:ink}} href="/ja/policies">参加・安全・個人情報の方針</a></p></div>
    </section>
  </main></SiteFrame>;
}
