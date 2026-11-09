import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import { GrowthClickTracking } from "@/components/growth-click-tracking";

const pageUrl = "https://riotbasketballacademy.com/ja/sendai";
const schoolForm = "https://form.jotform.com/263053122067044";
const boysForm = "https://form.jotform.com/263082418714053";
const girlsForm = "https://form.jotform.com/263083176331050";
const ink = "#0b1a2c";
const subdued = "#42546a";
const primary = {display:"inline-flex",alignItems:"center",justifyContent:"center",minHeight:52,padding:"14px 22px",background:ink,color:"#fff",textDecoration:"none",fontWeight:800,borderRadius:7,fontSize:15} as const;
const outline = {...primary,background:"#fff",color:ink,border:"1px solid #b9c9d8"} as const;

export const metadata: Metadata = {
  title: "仙台のバスケットボールスクール・U15クラブ｜RBA・太白区",
  description: "仙台市太白区のRBA。U12スクール、U15 SKILL UP、男子U15クラブGREAM SENDAI、2027年女子U15準備。活動・料金・申込先を比較して保護者から無料相談できます。相談だけで入会・決済は成立しません。",
  alternates: {canonical: pageUrl},
  openGraph: {title:"仙台で、自分に合うバスケの学びを。｜RBA",description:"U12スクール・U15 SKILL UP・GREAM仙台クラブを一つのページで比較。相談無料・入会は条件確認後。",url:pageUrl,type:"website",siteName:"Riot Basketball Academy"}
};

const routes = [
  {
    tag:"U12 / SCHOOL", title:"小学生のスクール", who:"小学生・今のチームに所属したまま",
    info:"茂庭台小学校を基本会場に、金曜18:00〜19:30・月3回を基本として調整中。",
    cost:"11月の新規案内：月7,700円／入会金10,000円。12月以降は月8,900円・入会金11,500円を予定。",
    status:"体験日・会場の使用条件は個別確認",
    url:"/ja/u12-school", cta:"U12の詳細を見る"
  },
  {
    tag:"U15 / SKILL UP", title:"中学生のスキルアップ", who:"小学6年生〜中学生・所属変更不要",
    info:"木曜18:00〜19:30・原則月3回。1対1・少人数ゲームを通じて見る・判断する力を育成。",
    cost:"月7,700円（税込）／入会金5,500円（税込）・定員25名",
    status:"参加日の会場・受入可否は個別案内",
    url:"/ja/u15-skill-up", cta:"U15スクールの詳細を見る"
  },
  {
    tag:"GREAM / BOYS U15", title:"男子U15クラブ", who:"中学生年代・クラブへの参加を検討中",
    info:"2026年に発足した仙台市太白区の男子U15育成チーム。スクールとは活動・登録・料金が別。",
    cost:"2027年度月会費9,900円（税込）。初期費用・遠征費などは個別確認。",
    status:"会場は確保済み。実際の練習曜日・参加資格は個別案内",
    url:"/ja/gream-sendai", cta:"男子クラブの詳細を見る"
  },
  {
    tag:"GREAM / GIRLS U15", title:"女子U15チーム準備", who:"小6・中学生女子の保護者の事前相談",
    info:"2027年の活動開始に向け指導体制・練習枠を調整中。身体づくりと判断力の育成を一体で考えます。",
    cost:"2027年度の月会費9,900円（税込）は決定。設立・その他の費用・日時は未確定。",
    status:"女子チームの正式設立・JBA登録・活動開始日は未確定",
    url:"/ja/gream-sendai/girls", cta:"女子チーム準備と相談を見る"
  }
] as const;

const faq = [
  ["現在のチームを辞める必要がありますか？","U12・U15 SKILL UPのスクールは所属を変える必要はありません。GREAMのクラブ参加・大会登録は別途条件を確認します。"],
  ["体験は無料ですか？","フォームからの体験・参加相談は無料です。実際に参加する体験の料金、日時、場所、受入可否はRBAの確認メールでご案内します。"],
  ["小学6年生はどちらが合っていますか？","U12かU15 SKILL UP、クラブへの参加検討を、経験・曜日・本人の希望から相談できます。どの活動もフォーム送信だけでは入会確定になりません。"],
  ["女子のスクール・チームはありますか？","U12・U15スクールの参加条件は個別にご相談ください。女子U15クラブは2027年度に向けて準備中で、正式な始動日は決まっていません。"],
  ["月会費以外にかかる費用は？","各クラスの入会金のほか、クラブ活動では大会・遠征・用具などの別途費用が発生する場合があります。正式手続き前に対象・金額・決済方法を説明します。"]
] as const;

export default function RbaSendaiPage() {
  return <SiteFrame locale="ja"><div lang="ja" style={{background:"#f6f8fb",color:ink}}>
    <GrowthClickTracking />
    <section style={{background:"linear-gradient(145deg,#0b1a2c 0%,#17345b 100%)",color:"#fff",padding:"clamp(64px,9vw,100px) 22px 65px"}}>
      <div style={{maxWidth:1100,margin:"auto"}}>
        <p style={{fontSize:12,letterSpacing:3,color:"#bfd6f2",fontWeight:800}}>RIOT BASKETBALL ACADEMY / SENDAI · TAIHAKU</p>
        <h1 style={{fontSize:"clamp(37px,6vw,74px)",lineHeight:1.12,letterSpacing:"-.045em",margin:"22px 0"}}>仙台で、自分に合う<br/>バスケの学びを。</h1>
        <p style={{maxWidth:740,fontSize:"clamp(16px,2vw,21px)",lineHeight:1.9,color:"#deebf9"}}>小学生のスクールから、中学生のスキルアップ、U15クラブまで。所属と活動の違いを分かりやすく。まずは学年・通いやすい曜日から無料で相談できます。</p>
        <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:28}}>
          <a href={schoolForm} data-growth-id="sendai-hub-school-trial" target="_blank" rel="noopener noreferrer" style={{...primary,background:"#fff",color:ink}}>U12・U15スクールを無料相談 ↗</a>
          <a href="#programmes" style={{...outline,background:"transparent",color:"#fff",borderColor:"#819ab4"}}>クラスを比較する ↓</a>
        </div>
        <p style={{fontSize:13,color:"#c1d1e5",maxWidth:770,lineHeight:1.8,marginTop:18}}>相談フォームの送信は無料です。体験・入会・決済は、受入日・会場・費用等の条件をご案内してからご判断いただけます。</p>
      </div>
    </section>

    <section style={{maxWidth:1100,margin:"auto",padding:"55px 22px 58px"}} id="programmes">
      <p style={{fontSize:12,fontWeight:800,letterSpacing:2,color:"#53657a"}}>CHOOSE BY PURPOSE / 4 OPTIONS</p>
      <h2 style={{fontSize:"clamp(28px,4vw,44px)",lineHeight:1.3,margin:"12px 0 12px"}}>4つの活動を、目的から選ぶ。</h2>
      <p style={{fontSize:16,lineHeight:1.8,color:subdued,maxWidth:800,marginBottom:28}}>RBAスクールは「所属を変えずに学ぶ」活動。GREAMはU15クラブチームです。入団・月謝・チーム登録の条件は別々にご案内します。</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,440px),1fr))",gap:15}}>
        {routes.map((r,i)=><article key={r.tag} style={{background:"#fff",border:"1px solid #d8e0e8",borderRadius:10,padding:"clamp(23px,3vw,32px)"}}>
          <p style={{color:"#315d86",fontSize:12,letterSpacing:2,fontWeight:900,margin:"0 0 9px"}}>0{i+1} / {r.tag}</p>
          <h3 style={{fontSize:"clamp(24px,3vw,31px)",lineHeight:1.3,margin:"0 0 10px"}}>{r.title}</h3>
          <p style={{fontWeight:800,fontSize:14,color:"#294866",margin:"0 0 13px"}}>{r.who}</p>
          <p style={{fontSize:15,lineHeight:1.9,color:subdued}}>{r.info}</p>
          <p style={{fontSize:14,lineHeight:1.75,padding:"14px 16px",background:"#eef3f8",color:ink}}><strong>料金目安・条件</strong><br/>{r.cost}</p>
          <p style={{fontSize:13,lineHeight:1.75,color:subdued}}>{r.status}</p>
          <a href={r.url} data-growth-id={`sendai-hub-option-${i+1}`} style={{...outline,width:"100%"}}>{r.cta} →</a>
        </article>)}
      </div>
    </section>

    <section style={{padding:"57px 22px",background:"#e8edf3"}}>
      <div style={{maxWidth:1100,margin:"auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:36,alignItems:"center"}}>
        <div>
          <p style={{fontSize:12,letterSpacing:2,fontWeight:900,color:"#50647c"}}>NOT SURE WHICH CLASS?</p>
          <h2 style={{fontSize:"clamp(28px,4vw,43px)",lineHeight:1.3,margin:"10px 0"}}>まずは希望を教えてください。</h2>
          <p style={{color:subdued,lineHeight:1.9,fontSize:16}}>保護者の方から学年、希望クラス、通える曜日を送信するだけ。無理な入会勧誘や、同意前の月謝請求をしません。</p>
        </div>
        <div style={{display:"grid",gap:12}}>
          {([["01","無料の参加・体験相談"],["02","RBAから日程・会場・料金をご案内"],["03","体験後に継続するか判断"]] as const).map(([n,t])=><div key={n} style={{background:"#fff",padding:"17px 20px",borderRadius:7,display:"flex",alignItems:"center",gap:15}}><strong style={{fontSize:21,color:"#315d86"}}>{n}</strong><span style={{fontWeight:800}}>{t}</span></div>)}
          <a href={schoolForm} target="_blank" rel="noopener noreferrer" data-growth-id="sendai-hub-second-school-intake" style={primary}>U12・U15スクールの相談フォーム ↗</a>
        </div>
      </div>
    </section>

    <section style={{maxWidth:1100,margin:"auto",padding:"63px 22px"}}>
      <p style={{fontSize:12,letterSpacing:2,color:"#526880",fontWeight:800}}>LOCAL DEVELOPMENT / TAIHAKU</p>
      <h2 style={{fontSize:"clamp(28px,4vw,42px)",lineHeight:1.25}}>太白区から、バスケットボールの選択肢を。</h2>
      <p style={{fontSize:16,lineHeight:1.9,color:subdued,maxWidth:920}}>茂庭台・長町・富沢・八木山など仙台市太白区とその周辺から参加を検討するご家庭へ。学校・所属チームと無理なく両立できるか、実際の曜日や会場を確認してからお申し込みください。女子選手の着地・減速・筋力づくりなども、年齢や体調に配慮した育成の一部として考えています。けがを完全に予防できるという保証ではありません。</p>
      <div style={{display:"flex",flexWrap:"wrap",gap:12,marginTop:20}}>
        <a href={boysForm} target="_blank" rel="noopener noreferrer" data-growth-id="sendai-hub-boys-club-intake" style={outline}>男子GREAM参加相談 ↗</a>
        <a href={girlsForm} target="_blank" rel="noopener noreferrer" data-growth-id="sendai-hub-girls-2027-intake" style={outline}>女子U15準備・参加希望 ↗</a>
        <a href="/ja/team-development" data-growth-id="sendai-hub-team-development" style={outline}>チーム・指導者向け育成支援 →</a>
      </div>
    </section>

    <section style={{background:"#fff",padding:"55px 22px 66px",borderTop:"1px solid #d8e0e8"}}>
      <div style={{maxWidth:1100,margin:"auto"}}>
        <h2 style={{fontSize:"clamp(28px,4vw,42px)",margin:"0 0 25px"}}>保護者からよくある質問</h2>
        <div style={{display:"grid",gap:9}}>{faq.map(([q,a])=><details key={q} style={{padding:"19px 20px",border:"1px solid #dce2e8",background:"#fafbfd",borderRadius:6}}><summary style={{fontSize:16,fontWeight:800,cursor:"pointer"}}>{q}</summary><p style={{color:subdued,fontSize:15,lineHeight:1.85}}>{a}</p></details>)}</div>
      </div>
    </section>

    <section style={{background:ink,color:"#fff",padding:"48px 22px 70px"}}>
      <div style={{maxWidth:1100,margin:"auto"}}>
        <h2 style={{fontSize:"clamp(27px,4vw,40px)",margin:"0 0 14px"}}>次の練習を、仙台で。</h2>
        <p style={{lineHeight:1.9,maxWidth:790,color:"#d7e5f4"}}>入会を決める前に、通いやすさ、目指すこと、必要な費用を相談できます。無料相談の回答が、そのまま正式申込・課金になることはありません。</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:12,marginTop:23}}>
          <a href={schoolForm} target="_blank" rel="noopener noreferrer" data-growth-id="sendai-hub-final-school-form" style={{...primary,color:ink,background:"#fff"}}>保護者の無料相談フォーム ↗</a>
          <a href="mailto:riot.training.base@gmail.com?subject=RBA%E4%BB%99%E5%8F%B0%E3%82%B9%E3%82%AF%E3%83%BC%E3%83%AB%E7%9B%B8%E8%AB%87" data-growth-id="sendai-hub-mail-contact" style={{...outline,background:"transparent",borderColor:"#90a8c1",color:"#fff"}}>メールで相談する ↗</a>
        </div>
      </div>
    </section>
  </div></SiteFrame>;
}
