"use client";

import { useState } from "react";

type Offer={tag:string;title:string;price:string;body:string;href:string;cta:string};

const consumerForm="https://form.jotform.com/262738772653065";
const businessForm="https://form.jotform.com/262743093043050";

const offers:Offer[]=[
 {tag:"ASSESS",title:"Movement Check",price:"¥3,300〜",body:"トレーニングを始める前に、基本動作と目標を整理。医療診断ではなく、運動・トレーニング設計のための入口です。",href:consumerForm,cta:"先行案内を受け取る"},
 {tag:"MEMBER",title:"RTB Membership",price:"準備中",body:"トレーニング相談、SELECT先行案内などを組み合わせる継続サービス。内容と価格は需要確認後に正式公開します。",href:consumerForm,cta:"興味を登録する"},
 {tag:"SELECT",title:"RTB Select",price:"商品別",body:"大量在庫を持たず、実際に試し、必要性を説明できる商品だけを予約・小ロット中心で販売します。",href:"/rtb-select",cta:"RTB SELECTを見る"},
 {tag:"TEAM",title:"Team S&C",price:"個別見積",body:"競技チーム向けのS&C支援。競技、頻度、人数、目的に合わせて設計します。",href:businessForm,cta:"チーム相談"},
 {tag:"CORPORATE",title:"Corporate Performance",price:"個別見積",body:"企業向け運動・コンディショニング支援。単発イベントから継続実施まで相談できます。",href:businessForm,cta:"法人相談"},
 {tag:"BRAND",title:"Product Test / Pop-up",price:"個別設計",body:"ブランド・メーカー向け。RTBでの実使用、顧客反応、販売検証。評価や売上を保証せず、実施と結果を返します。",href:businessForm,cta:"ブランド相談"},
];

export default function RTBRevenueClient(){
 const [segment,setSegment]=useState<"all"|"personal"|"business">("all");
 const visible=offers.filter(o=>segment==="all"||segment==="personal"?segment==="all"||["ASSESS","MEMBER","SELECT"].includes(o.tag):["TEAM","CORPORATE","BRAND"].includes(o.tag));
 return <main style={{background:"#0d0e0f",color:"#f5f3ed",minHeight:"100vh",fontFamily:"Arial,Helvetica,sans-serif"}}>
  <section style={{maxWidth:1180,margin:"0 auto",padding:"28px 22px 90px"}}>
   <header style={{display:"flex",justifyContent:"space-between",gap:20,borderBottom:"1px solid #343638",paddingBottom:20}}>
    <a href="/" style={{color:"inherit",textDecoration:"none",fontWeight:900,letterSpacing:2}}>RIOT TRAINING BASE</a>
    <a href="/rtb-select" style={{color:"inherit",textDecoration:"none",fontSize:12}}>RTB SELECT →</a>
   </header>
   <div style={{padding:"86px 0 42px",maxWidth:920}}>
    <p style={{fontSize:12,letterSpacing:3,fontWeight:900}}>TRAIN / ASSESS / SELECT / PARTNER</p>
    <h1 style={{fontSize:"clamp(48px,9vw,112px)",lineHeight:.88,letterSpacing:"-.065em",margin:"22px 0 30px"}}>TRAINING<br/>IS THE ENTRY.</h1>
    <p style={{fontSize:"clamp(18px,2vw,26px)",lineHeight:1.55,maxWidth:760}}>RTBはトレーニングだけを売る場所ではありません。評価、継続支援、商品体験、チーム・法人・ブランド連携まで、現場から収益を積み上げます。</p>
   </div>
   <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
    {[["all","ALL"],["personal","PERSONAL"],["business","BUSINESS"]].map(([v,l])=><button key={v} onClick={()=>setSegment(v as typeof segment)} style={{border:"1px solid #777",background:segment===v?"#f5f3ed":"transparent",color:segment===v?"#111":"#f5f3ed",padding:"11px 16px",fontWeight:800,cursor:"pointer"}}>{l}</button>)}
   </div>
  </section>

  <section style={{background:"#f2efe7",color:"#111",padding:"72px 22px 92px"}}>
   <div style={{maxWidth:1180,margin:"0 auto"}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(285px,1fr))",gap:1,background:"#bbb"}}>
     {visible.map(o=><article key={o.tag} style={{background:"#f2efe7",padding:30,minHeight:330,display:"flex",flexDirection:"column"}}>
      <small style={{fontWeight:900,letterSpacing:2}}>{o.tag}</small>
      <h2 style={{fontSize:30,letterSpacing:"-.035em",margin:"32px 0 12px"}}>{o.title}</h2>
      <p style={{fontSize:14,lineHeight:1.75,color:"#4a4c4e"}}>{o.body}</p>
      <strong style={{marginTop:"auto",fontSize:18,paddingTop:24}}>{o.price}</strong>
      <a href={o.href} target={o.href.startsWith("http")?"_blank":undefined} rel="noreferrer" style={{marginTop:18,color:"#111",fontWeight:900,textDecoration:"none"}}>{o.cta} →</a>
     </article>)}
    </div>
   </div>
  </section>

  <section style={{maxWidth:1180,margin:"0 auto",padding:"84px 22px"}}>
   <p style={{fontSize:12,letterSpacing:3,fontWeight:900}}>RULE</p>
   <h2 style={{fontSize:"clamp(36px,5vw,70px)",lineHeight:1,letterSpacing:"-.05em",maxWidth:900}}>在庫より先に、<br/>需要と契約を作る。</h2>
   <p style={{fontSize:17,lineHeight:1.8,maxWidth:720,color:"#c9c7c1"}}>新しい商品もサービスも、最初から大きく作りません。相談・予約・委託・小ロットで検証し、数字が出たものだけ残します。</p>
   <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:34}}>
    <a href={consumerForm} target="_blank" rel="noreferrer" style={{background:"#f5f3ed",color:"#111",padding:"15px 20px",fontWeight:900,textDecoration:"none"}}>個人向け先行案内 →</a>
    <a href={businessForm} target="_blank" rel="noreferrer" style={{border:"1px solid #f5f3ed",color:"#f5f3ed",padding:"15px 20px",fontWeight:900,textDecoration:"none"}}>法人・チーム・ブランド相談 →</a>
   </div>
  </section>
 </main>
}