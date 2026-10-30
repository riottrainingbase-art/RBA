import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "仙台バスケットボールスクール｜体験相談｜RBA",
  description: "所属チームを続けながら、技術と判断を磨くRBA仙台スクール。徳洲会看護専門学校体育館を基本会場に、体験相談を受付中。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/sendai-school" },
};

const inquiry = "mailto:riot.training.base@gmail.com?subject=" +
  encodeURIComponent("【RBA仙台スクール】体験相談") +
  "&body=" + encodeURIComponent("保護者のお名前：\n選手の学年：\n希望する曜日：\nご質問：\n");
const navy = "#10233f";

export default function SendaiSchoolPage() {
  return <SiteFrame locale="ja">
    <main lang="ja" style={{background:"#fff",color:navy}}>
      <section style={{maxWidth:820,margin:"0 auto",padding:"clamp(64px,9vw,112px) 24px 56px"}}>
        <p style={{fontSize:12,fontWeight:700,letterSpacing:2,color:"#65758b"}}>RBA SENDAI SCHOOL</p>
        <h1 style={{fontSize:"clamp(36px,6vw,64px)",lineHeight:1.2,letterSpacing:"-.025em",margin:"20px 0 24px"}}>
          チームはそのまま。<br/>もっと、上手くなる。
        </h1>
        <p style={{fontSize:"clamp(16px,2vw,19px)",lineHeight:1.9,maxWidth:630,margin:"0 0 32px"}}>
          技術を磨き、試合での判断につなげる。<br/>
          所属チームを続けながら通える、仙台のバスケットボールスクールです。
        </p>
        <a href={inquiry} style={{display:"inline-block",background:navy,color:"#fff",fontWeight:700,padding:"16px 28px",borderRadius:6,textDecoration:"none"}}>
          体験を相談する →
        </a>
      </section>
      <section style={{background:"#f5f7fa",padding:"48px 24px 60px"}}>
        <div style={{maxWidth:820,margin:"0 auto"}}>
          <h2 style={{fontSize:"clamp(24px,3vw,32px)",margin:"0 0 24px"}}>スクール案内</h2>
          <dl style={{margin:0,display:"grid",gridTemplateColumns:"90px minmax(0,1fr)",gap:"16px 20px",fontSize:16,lineHeight:1.8}}>
            <dt style={{fontWeight:700}}>会場</dt><dd style={{margin:0}}>徳洲会看護専門学校 体育館（基本会場）</dd>
            <dt style={{fontWeight:700}}>内容</dt><dd style={{margin:0}}>技術・判断・ゲーム形式の練習</dd>
            <dt style={{fontWeight:700}}>対象</dt><dd style={{margin:0}}>育成年代の選手（学年は個別確認）</dd>
            <dt style={{fontWeight:700}}>日時・料金</dt><dd style={{margin:0}}>体験日と条件はお問い合わせ後にご案内</dd>
          </dl>
          <p style={{fontSize:13,color:"#596779",lineHeight:1.8,margin:"28px 0 0"}}>学校の利用条件により日時が変わる場合があります。問い合わせのみで予約・入会・決済は確定しません。</p>
        </div>
      </section>
      <section style={{maxWidth:820,margin:"0 auto",padding:"48px 24px 80px"}}>
        <h2 style={{fontSize:"clamp(24px,3vw,32px)",margin:"0 0 12px"}}>まずは体験から。</h2>
        <p style={{lineHeight:1.9,margin:"0 0 24px"}}>学年と希望曜日をお知らせください。参加可能な日程をご案内します。</p>
        <a href={inquiry} style={{display:"inline-block",background:navy,color:"#fff",fontWeight:700,padding:"16px 28px",borderRadius:6,textDecoration:"none"}}>体験を相談する →</a>
        <p style={{fontSize:14,color:"#596779",marginTop:28}}>企業・団体の方は <a href="/ja/partners">協賛・連携のご案内</a> へ。</p>
      </section>
    </main>
  </SiteFrame>;
}
