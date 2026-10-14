import type { Metadata } from "next";
import Link from "next/link";

const FORM = "https://form.jotform.com/262859034372058";
const CANONICAL = "https://riotbasketballacademy.com/ja/taiwan/coach-interest";

export const metadata: Metadata = {
  title: "台北コーチ育成｜関心登録・意向登記 | RBA",
  description: "台北・新北でバスケットボールのコーチングを学びたい18歳以上の日本人留学生、日本語を話せる台湾人学生、バスケ経験者向けの関心登録。正式な求人ではありません。",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "RBA TAIPEI COACH DEVELOPMENT | 台北教練培育計畫",
    description: "台北・新北で、次世代のバスケットボール指導を学ぶ仲間を探しています。まずは無料の関心登録から。",
    url: CANONICAL, siteName: "Riot Basketball Academy", type: "website",
  },
  robots: { index: true, follow: true },
};

const panel: React.CSSProperties = {border:"1px solid #34383e",borderRadius:18,padding:"clamp(20px,4vw,36px)",background:"#141619"};
const button: React.CSSProperties = {display:"inline-flex",justifyContent:"center",alignItems:"center",padding:"17px 28px",background:"#e6fa38",color:"#101114",fontWeight:900,textDecoration:"none",borderRadius:8,minHeight:54,letterSpacing:".03em"};
const muted: React.CSSProperties = {color:"#b8bcc4",lineHeight:1.85};

export default function TaipeiCoachInterestPage() {
  return <main style={{background:"#0c0d0f",color:"#f7f7f4",minHeight:"100vh",fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, 'Noto Sans JP', sans-serif"}}>
    <div style={{maxWidth:1060,margin:"0 auto",padding:"28px 22px 88px"}}>
      <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:16,flexWrap:"wrap",borderBottom:"1px solid #303238",paddingBottom:22}}>
        <Link href="/ja/taiwan" style={{fontSize:14,color:"#f7f7f4",textDecoration:"none",fontWeight:900,letterSpacing:".08em"}}>RBA / JAPAN × TAIWAN</Link>
        <a href="#zh" style={{color:"#e6fa38",fontSize:14,textDecoration:"none"}}>繁體中文 ↓</a>
      </header>
      <section style={{padding:"clamp(64px,10vw,120px) 0 64px"}}>
        <p style={{color:"#e6fa38",fontSize:12,letterSpacing:".23em",fontWeight:800,marginBottom:24}}>RIOT BASKETBALL ACADEMY · TAIPEI</p>
        <h1 style={{fontSize:"clamp(39px,7vw,82px)",fontWeight:950,lineHeight:1.13,letterSpacing:"-.055em",maxWidth:950,margin:"0 0 24px"}}>PLAY THE GAME.<br/><span style={{color:"#e6fa38"}}>TEACH THE NEXT.</span></h1>
        <p style={{fontSize:"clamp(21px,3vw,31px)",lineHeight:1.5,fontWeight:800,maxWidth:790,margin:"0 0 24px"}}>台北で、次世代のバスケットボールを育てる仲間を探しています。</p>
        <p style={{...muted,maxWidth:750,fontSize:16,marginBottom:32}}>台湾で暮らす日本人学生、日本語が話せる台湾人学生、バスケットボール経験のある社会人へ。子どもたちの指導を学ぶことに興味はありませんか？まずはあなたの関心を聞かせてください。</p>
        <a href={FORM} target="_blank" rel="noopener noreferrer" style={button}>無料で関心登録する ↗</a>
        <p style={{color:"#9ca1aa",fontSize:12,marginTop:16}}>18歳以上対象 / 応募・雇用を確約するものではありません</p>
      </section>
      <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(245px,1fr))",gap:14,marginBottom:64}}>
        <div style={panel}><span style={{color:"#e6fa38",fontWeight:900,fontSize:12}}>01 / WHO</span><h2 style={{fontSize:21,margin:"14px 0"}}>こんな方へ</h2><p style={muted}>台北・新北にいる18歳以上の学生・社会人。日本語で交流できる方、バスケ経験者、指導未経験でも学ぶ意欲がある方。</p></div>
        <div style={panel}><span style={{color:"#e6fa38",fontWeight:900,fontSize:12}}>02 / WHY</span><h2 style={{fontSize:21,margin:"14px 0"}}>目指していること</h2><p style={muted}>子どもの成長を支えるコーチを育て、日本と台湾の育成現場をつなぐこと。勝敗だけでなく、判断・基礎・楽しさを大切にします。</p></div>
        <div style={panel}><span style={{color:"#e6fa38",fontWeight:900,fontSize:12}}>03 / STATUS</span><h2 style={{fontSize:21,margin:"14px 0"}}>現在は構想段階</h2><p style={muted}>現地アカデミー関係者と協議中。活動日程、場所、研修内容、報酬、採用人数は未定です。正式求人ではありません。</p></div>
      </section>
      <section style={{...panel,marginBottom:60}}>
        <p style={{color:"#e6fa38",fontWeight:900,letterSpacing:".12em",fontSize:12}}>HOW IT WORKS</p>
        <h2 style={{fontSize:"clamp(25px,4vw,38px)",margin:"14px 0 20px"}}>登録から、未来の活動へ。</h2>
        <ol style={{paddingLeft:22,lineHeight:2.2,color:"#e2e4e6"}}>
          <li>無料の関心登録フォームに回答</li>
          <li>RBAが希望や経験を確認（必要な場合のみ連絡）</li>
          <li>現地での受け入れ条件・研修内容・法的要件が整った場合に個別案内</li>
        </ol>
        <p style={{...muted,fontSize:13}}>台湾での有償活動は、必要な就労許可・在留資格等を確認してから実施します。子どもの安全管理や保険も事前に整備します。登録によって参加や採用が保証されることはありません。</p>
      </section>
      <section id="zh" lang="zh-Hant" style={{padding:"54px 0 70px",borderTop:"1px solid #33363a"}}>
        <p style={{color:"#e6fa38",letterSpacing:".2em",fontSize:12,fontWeight:800}}>繁體中文 / TAIPEI COACH DEVELOPMENT</p>
        <h2 style={{fontSize:"clamp(28px,5vw,48px)",lineHeight:1.3,margin:"18px 0 20px"}}>一起培育台北下一代的籃球教練。</h2>
        <p style={{...muted,maxWidth:790,fontSize:17}}>我們正在尋找居住在台北或新北、年滿18歲，對青少年籃球教學有興趣的朋友。歡迎日本留學生、會說日文的台灣學生，以及有籃球經驗的社會人士登記意向。即使尚無教練經驗，也歡迎表達學習意願。</p>
        <p style={{...muted,maxWidth:790}}>本計畫仍在與台灣在地籃球學院相關人士討論中，並非正式徵才。活動地點、時間、培訓、酬勞與名額均尚未確定。未來如涉及有薪工作，須先確認工作許可與居留資格，並完善兒少安全及保險安排。</p>
        <a href={FORM} target="_blank" rel="noopener noreferrer" style={button}>免費填寫意向登記 ↗</a>
      </section>
      <footer style={{borderTop:"1px solid #33363a",paddingTop:28,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:18}}>
        <div><strong>RIOT BASKETBALL ACADEMY</strong><p style={{...muted,fontSize:13}}>お問い合わせ / 聯絡：<a style={{color:"#e6fa38"}} href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a></p></div>
        <div style={{maxWidth:460,color:"#9ca1aa",fontSize:12,lineHeight:1.7}}>登録情報はRBAが本プロジェクトの検討・連絡にのみ使用し、追加の同意なく現地パートナーを含む第三者へ共有しません。訂正・削除はメールでご連絡ください。 / 個人資料僅供本計畫評估與聯繫使用，未經同意不向第三方分享。</div>
      </footer>
    </div>
  </main>;
}
