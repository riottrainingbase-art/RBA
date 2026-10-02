import type { Metadata } from "next";
import Link from "next/link";

const partnerForm="https://form.jotform.com/262743093043050";

export const metadata: Metadata = {
  title:{absolute:"RTB PERFORMANCE BUSINESS｜Riot Training Base"},
  description:"RTBのトレーニング環境とRBAのイベントネットワークを活用した、法人・チーム・ブランド向け実施型パートナーシップ。",
  robots:{index:false,follow:false},
};

const offers=[
 {tag:"CORPORATE",title:"Corporate Performance",price:"個別見積",text:"企業向けの運動・コンディショニング支援。単発イベントから継続契約まで。"},
 {tag:"TEAM",title:"Team S&C",price:"個別見積",text:"競技チーム向けS&C。バスケットボールに限定せず、トレーニング設計と現場実施を支援。"},
 {tag:"TEST",title:"30-Day Product Test",price:"¥55,000〜",text:"RTBで展示・実使用・利用者反応・販売検証を行うメーカー／ブランド向けテスト。内容は事前合意制。"},
 {tag:"POP-UP",title:"RTB Select Pop-up",price:"相談",text:"委託・サンプル・受注販売を中心に、RTBの小スペースで短期販売を検証。"},
 {tag:"NETWORK",title:"Multi-City Test",price:"個別見積",text:"適合する案件はRBAのイベント接点を活用し、複数地域での商品体験・サンプリングを設計。"},
 {tag:"ORIGINAL",title:"OEM / Collaboration",price:"相談",text:"実売データが確認できたカテゴリーのみ、別注・共同商品・RTB ORIGINALを検討。"},
];

export default function Page(){
 return <main style={{background:"#0d0e0f",color:"#f5f3ed",minHeight:"100vh",fontFamily:"Arial,Helvetica,sans-serif"}}>
  <section style={{maxWidth:1180,margin:"0 auto",padding:"28px 22px 96px"}}>
   <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #3b3d3f",paddingBottom:22}}>
    <strong style={{letterSpacing:2}}>RIOT TRAINING BASE</strong>
    <Link href="/rtb-select" style={{color:"#f5f3ed",textDecoration:"none",fontSize:12}}>RTB SELECT →</Link>
   </div>
   <div style={{padding:"88px 0 72px",maxWidth:920}}>
    <p style={{fontSize:12,letterSpacing:3,fontWeight:800}}>PERFORMANCE BUSINESS / SENDAI</p>
    <h1 style={{fontSize:"clamp(48px,9vw,116px)",lineHeight:.88,letterSpacing:"-.07em",margin:"22px 0 30px"}}>THE FACILITY<br/>IS THE MEDIA.</h1>
    <p style={{fontSize:"clamp(18px,2vw,27px)",lineHeight:1.55,maxWidth:760}}>広告枠ではなく、実際に試す。トレーニングする。売る。測る。RTBの現場とRBAの接点を、企業・チーム・ブランドの実施環境として提供します。</p>
    <a href={partnerForm} target="_blank" rel="noreferrer" style={{display:"inline-block",marginTop:28,background:"#f5f3ed",color:"#111",padding:"16px 22px",fontWeight:800,textDecoration:"none"}}>法人・チーム・ブランド相談 →</a>
   </div>
  </section>

  <section style={{background:"#f2efe7",color:"#111",padding:"82px 22px"}}>
   <div style={{maxWidth:1180,margin:"0 auto"}}>
    <p style={{fontSize:12,letterSpacing:3,fontWeight:800}}>WHAT RTB SELLS</p>
    <h2 style={{fontSize:"clamp(38px,6vw,78px)",lineHeight:.95,letterSpacing:"-.05em",maxWidth:900}}>商品だけではなく、<br/>実施できる環境を売る。</h2>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:1,background:"#bbb",marginTop:48}}>
     {offers.map(o=><article key={o.tag} style={{background:"#f2efe7",padding:30,minHeight:270,display:"flex",flexDirection:"column"}}>
      <span style={{fontSize:11,letterSpacing:2,fontWeight:900}}>{o.tag}</span>
      <h3 style={{fontSize:27,letterSpacing:"-.03em",margin:"32px 0 12px"}}>{o.title}</h3>
      <p style={{fontSize:14,lineHeight:1.7,color:"#4b4d4f"}}>{o.text}</p>
      <strong style={{marginTop:"auto",paddingTop:28}}>{o.price}</strong>
     </article>)}
    </div>
   </div>
  </section>

  <section style={{padding:"84px 22px",maxWidth:1180,margin:"0 auto"}}>
   <p style={{fontSize:12,letterSpacing:3,fontWeight:800}}>OPERATING RULE</p>
   <h2 style={{fontSize:"clamp(36px,5vw,68px)",lineHeight:1,letterSpacing:"-.045em"}}>売上ではなく、<br/>検証可能な結果を返す。</h2>
   <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:24,marginTop:42}}>
    {["実使用","顧客反応","購入率","継続意向"].map((x,i)=><div key={x} style={{borderTop:"3px solid #f5f3ed",paddingTop:18}}><small>0{i+1}</small><h3>{x}</h3></div>)}
   </div>
   <a href={partnerForm} target="_blank" rel="noreferrer" style={{display:"inline-block",marginTop:52,border:"1px solid #f5f3ed",color:"#f5f3ed",padding:"16px 22px",fontWeight:800,textDecoration:"none"}}>商談を相談する →</a>
  </section>
 </main>
}