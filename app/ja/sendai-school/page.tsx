import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "仙台バスケットボールスクール｜体験相談｜RBA",
  description: "仙台の育成年代向けRBAバスケットボールスクール。所属チームを続けながら、判断・技術・ゲーム理解を学ぶ。徳洲会看護専門学校体育館を基本利用会場とし、体験日程は個別にご案内します。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/sendai-school" },
};

const email = "riot.training.base@gmail.com";
const trial = "mailto:" + email + "?subject=" + encodeURIComponent("【RBA仙台スクール】体験参加の相談") +
  "&body=" + encodeURIComponent("保護者のお名前：\n選手の学年：\n現在の所属チーム（任意）：\n希望する曜日・時間帯：\n体験参加についての質問：\n\n※このメールで入会・決済は確定しません。");
const sponsor = "mailto:" + email + "?subject=" + encodeURIComponent("【RBA仙台スクール】地域育成協賛の相談") +
  "&body=" + encodeURIComponent("企業・団体名：\nご担当者名：\n希望する支援内容：\nご連絡事項：\n");
const dark = "#10233f";

export default function SendaiSchoolPage() {
  return <SiteFrame locale="ja">
    <main lang="ja" style={{color:dark,background:"#f5f7fa"}}>
      <section style={{background:dark,color:"white",padding:"clamp(48px,7vw,90px) 6vw"}}>
        <div style={{maxWidth:1000,margin:"auto"}}>
          <p style={{letterSpacing:2,fontSize:13,color:"#ffbf87",fontWeight:800}}>RBA SENDAI / BASKETBALL SCHOOL</p>
          <h1 style={{fontSize:"clamp(34px,5vw,60px)",lineHeight:1.2,margin:"18px 0"}}>チームはそのまま。<br/>プレーの選択肢を増やす。</h1>
          <p style={{fontSize:"clamp(16px,2vw,20px)",lineHeight:1.9,maxWidth:740}}>シュート、ドライブ、パス、守備。技術を練習だけで終わらせず、試合で「見る・判断する・実行する」力につなげます。所属チームの活動を尊重しながら学べる、仙台の育成スクールです。</p>
          <a href={trial} style={{display:"inline-block",padding:"15px 25px",background:"#fff",color:dark,fontWeight:800,textDecoration:"none",marginTop:20}}>体験日程を問い合わせる →</a>
          <p style={{fontSize:13,opacity:.85,marginTop:15}}>問い合わせ無料・体験日と体験料金は個別案内。問い合わせだけで入会・決済は確定しません。</p>
        </div>
      </section>
      <section style={{padding:"clamp(36px,6vw,70px) 6vw"}}>
        <div style={{maxWidth:1000,margin:"auto"}}>
          <h2 style={{fontSize:"clamp(26px,3vw,38px)"}}>スクール概要</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:14,marginTop:22}}>
            {[
              ["基本会場","徳洲会看護専門学校 体育館（学校の利用許可・行事を優先）"],
              ["対象","育成年代の選手。学年別の受入可否は体験相談時に確認します。"],
              ["学び","個人技術、状況判断、スペーシング、少人数ゲーム、振り返り"],
              ["体験","実施日・定員・料金・持ち物は個別案内。無断来場はご遠慮ください。"],
            ].map(([name,value])=><article key={name} style={{padding:24,background:"#fff",border:"1px solid #dfe5ec",borderRadius:12}}><h3 style={{fontSize:16,margin:"0 0 10px"}}>{name}</h3><p style={{lineHeight:1.85,margin:0}}>{value}</p></article>)}
          </div>
          <p style={{lineHeight:1.9,marginTop:20}}>月会費は契約・入会時期・クラスにより異なります。既存会員向けの個別料金を一般募集の標準料金として表示することはありません。新規入会の正式料金・開催日・決済方法は、受入条件を確認してからご案内します。</p>
        </div>
      </section>
      <section style={{padding:"clamp(36px,6vw,70px) 6vw",background:"#fff"}}>
        <div style={{maxWidth:1000,margin:"auto"}}>
          <h2 style={{fontSize:"clamp(26px,3vw,38px)"}}>体験から入会まで</h2>
          <ol style={{lineHeight:2.1,fontSize:17,paddingLeft:24}}>
            <li>メールで学年・希望曜日を相談</li>
            <li>RBAから実施日、会場、体験料金、参加条件を返信</li>
            <li>体験参加・振り返り</li>
            <li>希望する方に正式な会費・規約・決済方法をご案内</li>
          </ol>
          <a href={trial} style={{display:"inline-block",padding:"16px 26px",background:dark,color:"#fff",fontWeight:800,textDecoration:"none",marginTop:14}}>体験を相談する →</a>
        </div>
      </section>
      <section style={{padding:"clamp(36px,6vw,70px) 6vw",background:"#e9eef5"}}>
        <div style={{maxWidth:1000,margin:"auto"}}>
          <p style={{fontSize:12,letterSpacing:2,fontWeight:800}}>COMMUNITY PARTNERS</p>
          <h2 style={{fontSize:"clamp(26px,3vw,38px)"}}>仙台の子どもたちの学びを、一緒に。</h2>
          <p style={{fontSize:17,lineHeight:1.9,maxWidth:750}}>体験機会、体育館利用、指導環境の整備、海外との交流など、地域企業・団体の協賛や協力を相談しています。内容・使途・掲載条件は個別に合意し、未確定の特典は約束しません。</p>
          <a href={sponsor} style={{display:"inline-block",padding:"16px 26px",background:dark,color:"#fff",fontWeight:800,textDecoration:"none",marginTop:14}}>企業・団体の協賛相談 →</a>
          <p style={{fontSize:14,marginTop:20}}>RBAの育成方針や他の活動は <a href="/ja/partners">パートナー案内</a> からもご覧いただけます。</p>
        </div>
      </section>
    </main>
  </SiteFrame>;
}
