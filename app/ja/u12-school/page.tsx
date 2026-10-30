import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";

const url = "https://riotbasketballacademy.com/ja/u12-school";
const inquiry = "mailto:riot.training.base@gmail.com?subject=RBA%20%E4%BB%99%E5%8F%B0U12%20%E8%8C%82%E5%BA%AD%E5%8F%B0%E3%82%B9%E3%82%AF%E3%83%BC%E3%83%AB%E4%BD%93%E9%A8%93%E7%9B%B8%E8%AB%87";

export const metadata: Metadata = {
  title: "仙台U12バスケットボールスクール｜茂庭台小学校｜RBA",
  description: "Riot Basketball Academyが仙台市太白区・茂庭台小学校で準備するU12バスケットボールスクール。小学生向け。原則金曜日18:00〜19:30、月3回を基本とします。入会金10,000円・月会費7,700円。具体的な開催日と体験条件は調整中です。",
  alternates: { canonical: url },
  openGraph: {
    title: "RBA 仙台U12スクール｜茂庭台小学校",
    description: "仙台市太白区・茂庭台小学校。原則金曜18:00〜19:30（月3回）。入会金10,000円、月額7,700円。体験日・開始時期は個別にご案内します。",
    url,
    siteName: "Riot Basketball Academy",
    type: "website",
  },
};

const points = [
  ["見る", "相手、味方、スペースを見て、今何が起きているかを理解します。"],
  ["判断する", "状況に合わせ、運ぶ・パスする・攻める・守るを自分で選びます。"],
  ["ゲームで試す", "少人数のゲームで試し、次のプレーへつなげます。"],
] as const;

export default function SendaiU12SchoolPage() {
  return <SiteFrame locale="ja">
    <section style={{background:"#10233f",color:"#fff",padding:"clamp(48px,7vw,96px) 6vw"}}>
      <div style={{maxWidth:1060,margin:"0 auto"}}>
        <p style={{fontSize:12,fontWeight:800,letterSpacing:3,color:"#ffb473"}}>RIOT BASKETBALL ACADEMY / SENDAI U12</p>
        <h1 style={{fontSize:"clamp(32px,5vw,62px)",lineHeight:1.24,margin:"16px 0 20px"}}>仙台U12スクール<br/>会場は、茂庭台小学校へ。</h1>
        <p style={{fontSize:"clamp(16px,2vw,20px)",lineHeight:1.9,maxWidth:800}}>仙台市太白区の茂庭台小学校で、U12年代の子どもたちが学べるスクールの開催を準備しています。所属チームを変えることを前提とせず、技術と判断をゲームの中で育てます。</p>
        <a href={inquiry} style={{display:"inline-block",background:"#fff",color:"#10233f",padding:"15px 24px",marginTop:20,fontWeight:800,textDecoration:"none"}}>体験・開催情報をメールで問い合わせる →</a>
      </div>
    </section>
    <section style={{padding:"clamp(40px,6vw,76px) 6vw",background:"#f3f5f8",color:"#10233f"}}>
      <div style={{maxWidth:1060,margin:"0 auto"}}>
        <p style={{fontSize:12,letterSpacing:2,fontWeight:800}}>SCHOOL INFORMATION</p>
        <h2 style={{fontSize:"clamp(27px,3vw,38px)",margin:"12px 0 26px"}}>仙台U12スクールのご案内</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:12}}>
          {[
            ["会場","茂庭台小学校（宮城県仙台市太白区）"],
            ["対象","U12年代の小学生（小学5年生も対象）"],
            ["基本スケジュール","原則金曜日 18:00〜19:30（月3回を基本）"],
            ["会費","2026年11月30日までの新規受付：入会金10,000円／月額7,700円。2026年12月1日以降の新規入会：入会金11,500円／月額8,900円（税込）。既存会員は契約に従い別途案内"],
            ["開催状況","具体的な開催日・体験受付の条件は調整中"],
          ].map(([label,value])=><article key={label} style={{padding:24,background:"#fff",border:"1px solid #d8dfe7"}}><p style={{fontSize:12,color:"#526278",fontWeight:800,margin:"0 0 12px"}}>{label}</p><p style={{fontSize:17,fontWeight:700,lineHeight:1.65,margin:0}}>{value}</p></article>)}
        </div>
        <p style={{lineHeight:1.85,color:"#536174",marginTop:24}}>基本の活動枠は金曜日18:00〜19:30です。学校行事や体育館の利用条件によって変更する場合があります。具体的な開催日・体験受入れ・開始時期は確認中です。2026年12月1日以降の新規入会料金は入会金11,500円・月額8,900円（税込）を予定しています。既存会員の月会費を自動的に変更するものではありません。決済システムに新料金が反映されるまでは新規の決済を行わず、受入れ確定後に案内する正式な料金と契約条件をご確認ください。</p>
      </div>
    </section>
    <section style={{padding:"clamp(44px,7vw,84px) 6vw",background:"#fff",color:"#10233f"}}>
      <div style={{maxWidth:1060,margin:"0 auto"}}>
        <p style={{fontSize:12,letterSpacing:2,fontWeight:800}}>SEE · DECIDE · ACT</p>
        <h2 style={{fontSize:"clamp(27px,3vw,38px)",margin:"12px 0 26px"}}>覚えるだけで終わらないバスケットボール。</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16}}>
          {points.map(([title,body],i)=><article key={title} style={{borderTop:"3px solid #10233f",padding:"20px 8px"}}><p style={{fontSize:12,color:"#67758a"}}>0{i+1}</p><h3 style={{fontSize:23,margin:"10px 0"}}>{title}</h3><p style={{lineHeight:1.85,color:"#536174"}}>{body}</p></article>)}
        </div>
      </div>
    </section>
    <section style={{padding:"48px 6vw",background:"#edf1f6",color:"#10233f"}}>
      <div style={{maxWidth:1060,margin:"0 auto"}}>
        <h2 style={{fontSize:"clamp(25px,3vw,36px)",margin:"0 0 14px"}}>茂庭台スクールへの参加・体験をご検討の方へ。</h2>
        <p style={{lineHeight:1.85}}>学年、現在のバスケットボール経験、体験参加のご希望をメールでお知らせください。正式な開催条件が整い次第、RBAからご案内します。</p>
        <a href={inquiry} style={{display:"inline-block",background:"#10233f",color:"#fff",padding:"16px 24px",textDecoration:"none",fontWeight:800,marginTop:12}}>RBAにメールで相談する →</a>
        <p style={{fontSize:13,color:"#536174",lineHeight:1.7,marginTop:16}}>問い合わせは無料です。お問い合わせだけで入会や予約が確定することはありません。</p>
      </div>
    </section>
  </SiteFrame>;
}
