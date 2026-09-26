import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA U15 SKILL UP SCHOOL｜仙台",
  description: "毎週木曜日・原則月3回。仙台市太白区で開催するU15年代向け定期育成スクール。技術と判断をゲームの中で育てます。定員25名。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/u15-skill-up" },
  openGraph: {
    title: "RBA U15 SKILL UP SCHOOL｜仙台",
    description: "現代バスケットボールを学ぶ90分。SEE / DECIDE / ACT。毎週木曜日、仙台市太白区。月3回7,700円、定員25名。",
    url: "https://riotbasketballacademy.com/ja/u15-skill-up",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RBA U15 SKILL UP SCHOOL｜仙台",
    description: "現代バスケットボールを学ぶ90分。毎週木曜日・原則月3回、定員25名。",
    images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"],
  },
};

const months = [
  ["4月","OBSERVE & DECIDE","見る・認知する・判断する"],
  ["5月","CREATE ADVANTAGE","1on1で優位性をつくる"],
  ["6月","USE ADVANTAGE","ズレを使い、次へつなぐ"],
  ["7月","FINISHING","リング周辺の解決力"],
  ["8月","SHOOTING IN CONTEXT","ゲーム状況からシュートを選ぶ"],
  ["9月","SPACING","距離・角度・スペースを理解する"],
  ["10月","OFF-BALL PLAY","カット・リロケート・リアクション"],
  ["11月","PASSING & CONNECTING","優位性をパスでつなぐ"],
  ["12月","TRANSITION","切り替えと数的優位の判断"],
  ["1月","DEFENSIVE FUNDAMENTALS","1on1・クローズアウト・リカバリー"],
  ["2月","TEAM DEFENCE","ヘルプ・ローテーション・判断"],
  ["3月","COMPLETE PLAYER","年間の学びをゲームで統合する"],
] as const;

const focus = [
  ["SEE","相手・味方・スペースを観る"],
  ["DECIDE","状況に応じて選択する"],
  ["ACT","技術をゲームの中で実行する"],
  ["ADAPT","失敗から修正し、次へつなぐ"],
] as const;

export default function Page(){
  return <SiteFrame locale="ja" languagePage="opportunities">
    <main style={{background:"#f5f5f2",color:"#111"}}>
      <section style={{padding:"72px 6vw 56px",borderBottom:"1px solid #d6d6d0",background:"#fff"}}>
        <p style={{fontSize:13,letterSpacing:3,fontWeight:700,margin:"0 0 20px"}}>RIOT BASKETBALL ACADEMY · SENDAI</p>
        <h1 style={{fontSize:"clamp(42px,8vw,92px)",lineHeight:.92,letterSpacing:-3,margin:"0 0 24px",fontWeight:900}}>RBA U15<br/>SKILL UP SCHOOL</h1>
        <p style={{fontSize:"clamp(22px,3vw,34px)",fontWeight:800,margin:"0 0 14px"}}>現代バスケットボールを学ぶ90分。</p>
        <p style={{maxWidth:760,fontSize:17,lineHeight:1.8,margin:"0 0 30px",color:"#3f3f3a"}}>技術を覚えるだけで終わらせない。見る、判断する、実行する。1on1、スペーシング、フィニッシュ、オフボール、ディフェンス、スモールサイドゲームを年間でつなぎ、ゲームで使えるFundamentalsを育てます。</p>
        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          <a href="#apply" style={{display:"inline-block",background:"#111",color:"#fff",padding:"15px 22px",fontWeight:800,textDecoration:"none"}}>申込フォームへ ↓</a>
          <a href="https://form.jotform.com/262678369675074" target="_blank" rel="noreferrer" style={{display:"inline-block",border:"1px solid #111",color:"#111",padding:"14px 22px",fontWeight:800,textDecoration:"none",background:"#fff"}}>フォームを別画面で開く ↗</a>
        </div>
      </section>

      <section style={{padding:"48px 6vw",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:1,background:"#cfcfc9"}}>
        {[
          ["対象","U15年代"],
          ["定員","25名"],
          ["開催","毎週木曜日・原則月3回"],
          ["時間","18:00〜19:30"],
          ["会場","仙台市太白区"],
          ["月会費","7,700円（税込）"],
        ].map(([k,v])=><div key={k} style={{background:"#fff",padding:"26px 24px"}}><div style={{fontSize:12,letterSpacing:2,color:"#6b6b65",marginBottom:8}}>{k}</div><strong style={{fontSize:22}}>{v}</strong></div>)}
      </section>

      <section style={{padding:"72px 6vw",background:"#111",color:"#fff"}}>
        <p style={{fontSize:12,letterSpacing:3,color:"#aaa",fontWeight:700}}>DEVELOPMENT PRINCIPLE</p>
        <h2 style={{fontSize:"clamp(34px,5vw,60px)",lineHeight:1.05,margin:"12px 0 18px"}}>SKILL × PERCEPTION × DECISION × GAME</h2>
        <p style={{maxWidth:780,fontSize:18,lineHeight:1.8,color:"#d8d8d3"}}>チームで決められた役割だけではなく、一人のバスケットボール選手としてできることを増やす。技術と判断を切り離さず、ゲームの中で学びます。</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:12,marginTop:34}}>
          {focus.map(([a,b])=><div key={a} style={{border:"1px solid #3e3e3a",padding:22}}><div style={{fontSize:28,fontWeight:900,marginBottom:9}}>{a}</div><div style={{color:"#d7d7d1",lineHeight:1.6}}>{b}</div></div>)}
        </div>
      </section>

      <section style={{padding:"72px 6vw",background:"#f5f5f2"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:700,color:"#666"}}>ANNUAL DEVELOPMENT PLAN · 36 SESSIONS</p>
        <h2 style={{fontSize:"clamp(34px,5vw,58px)",lineHeight:1.08,margin:"12px 0 34px"}}>年間36回を、一つの成長ストーリーに。</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:12}}>
          {months.map(([m,e,j],i)=><article key={m} style={{background:"#fff",padding:"24px 22px",border:"1px solid #dddcd6"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:12}}><strong style={{fontSize:26}}>{m}</strong><span style={{fontSize:11,letterSpacing:2,color:"#777"}}>{String(i+1).padStart(2,"0")}/12</span></div>
            <h3 style={{fontSize:17,letterSpacing:1,margin:"18px 0 8px"}}>{e}</h3>
            <p style={{margin:0,lineHeight:1.65,color:"#4b4b47"}}>{j}</p>
          </article>)}
        </div>
      </section>

      <section style={{padding:"64px 6vw",background:"#fff"}}>
        <h2 style={{fontSize:"clamp(30px,4vw,48px)",margin:"0 0 24px"}}>1回90分の基本構成</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:1,background:"#d3d3cd"}}>
          {[["15分","INDIVIDUAL FUNDAMENTALS"],["20分","DECISION SKILL"],["20分","2on2 / 3on3"],["25分","GAME APPLICATION"],["10分","REFLECTION"]].map(([t,n])=><div key={n} style={{background:"#f8f8f5",padding:24}}><strong style={{fontSize:30}}>{t}</strong><div style={{marginTop:10,fontSize:12,letterSpacing:1.5}}>{n}</div></div>)}
        </div>
        <p style={{margin:"24px 0 0",fontSize:16,lineHeight:1.8,color:"#4d4d48"}}>最後は「何が見えた？」「なぜそのプレーを選んだ？」「次は何を変える？」まで振り返ります。正解を覚えるのではなく、自分でゲームを理解する力を育てます。</p>
      </section>

      <section style={{padding:"54px 6vw",background:"#ecece7"}}>
        <h2 style={{fontSize:"clamp(28px,4vw,44px)",margin:"0 0 18px"}}>お申込み前に</h2>
        <ul style={{lineHeight:1.9,fontSize:16,paddingLeft:22,margin:0,maxWidth:900}}>
          <li>定員は25名です。定員到達後は受付停止またはキャンセル待ちとなります。</li>
          <li>フォーム送信だけでは参加確定ではありません。RBAからの申込確認メールをもって受付確定となります。</li>
          <li>会場詳細は、申込確認メール内でご案内します。</li>
          <li>未成年者のため、保護者の方が内容をご確認のうえお申込みください。</li>
          <li>痛みや体調不良がある場合は無理に参加せず、事前にご相談ください。</li>
        </ul>
      </section>

      <section id="apply" style={{padding:"72px 4vw 88px",background:"#fff"}}>
        <div style={{maxWidth:980,margin:"0 auto"}}>
          <p style={{fontSize:12,letterSpacing:3,fontWeight:700}}>APPLICATION</p>
          <h2 style={{fontSize:"clamp(34px,5vw,56px)",margin:"10px 0 12px"}}>申込フォーム</h2>
          <p style={{lineHeight:1.8,color:"#555",margin:"0 0 28px"}}>入力内容を確認後、RBAより申込確認メールをお送りします。会場詳細も確認メールでご案内します。</p>
          <div style={{border:"1px solid #d6d6d0",background:"#fafafa",minHeight:1180}}>
            <iframe
              title="RBA U15 SKILL UP SCHOOL 申込フォーム"
              src="https://form.jotform.com/262678369675074"
              width="100%"
              height="1180"
              style={{border:0,display:"block"}}
              loading="lazy"
            />
          </div>
          <p style={{fontSize:13,color:"#777",marginTop:14}}>フォームが表示されない場合は <a href="https://form.jotform.com/262678369675074" target="_blank" rel="noreferrer" style={{color:"#111",fontWeight:700}}>こちらから直接開いてください ↗</a></p>
        </div>
      </section>
    </main>
  </SiteFrame>;
}
