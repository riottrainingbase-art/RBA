import { SiteFrame } from "@/components/site-frame";

export type RegionAction = { label:string; href:string; primary?:boolean };
export type RegionFact = { label:string; value:string };
export type RegionFaq = { question:string; answer:string };
export type RegionFocus = { en:string; ja:string; description:string };
export type RegionProps = {
  location:"OKINAWA"|"AKITA"; japanese:string; subtitle:string; introduction:string;
  stage:string; stageExplanation:string; actions:RegionAction[];
  facts:RegionFact[]; focuses:RegionFocus[]; faqs:RegionFaq[];
  note:string; otherRegionHref?:string;
};
const ink="#111719",grey="#526169",line="#dce2e4";
const button=(primary:boolean)=>({display:"inline-flex",alignItems:"center",justifyContent:"center",minHeight:50,padding:"12px 21px",borderRadius:4,textDecoration:"none",fontSize:14,fontWeight:850,background:primary?"#fff":"transparent",border:"1px solid #bbc4c9",color:primary?ink:"#fff"} as const);

export function GreamRegionalPage({location,japanese,subtitle,introduction,stage,stageExplanation,actions,facts,focuses,faqs,note,otherRegionHref}:RegionProps){
  return <SiteFrame locale="ja">
    <div lang="ja" style={{color:ink,background:"#fff"}}>
      <section style={{background:location==="OKINAWA"?"linear-gradient(138deg,#0c202c,#142832 55%,#1b4950)":"linear-gradient(138deg,#111719,#292e31 65%,#373f43)",color:"#fff",padding:"clamp(66px,8vw,124px) max(20px,6vw)"}}>
        <div style={{maxWidth:1120,margin:"auto"}}>
          <p style={{fontSize:12,fontWeight:900,letterSpacing:3,color:"#b5c6cf",margin:"0 0 20px"}}>RIOT BASKETBALL ACADEMY / GREAM / U15 DEVELOPMENT TEAM</p>
          <h1 style={{fontSize:"clamp(49px,9vw,112px)",letterSpacing:"-.075em",lineHeight:.93,fontWeight:950,margin:"0 0 22px",overflowWrap:"anywhere"}}>GREAM<br/><span style={{color:"#c3d5de"}}>{location}</span><span style={{fontSize:".38em",verticalAlign:"top",marginLeft:14,letterSpacing:0}}>U15</span></h1>
          <h2 style={{fontSize:"clamp(24px,4vw,44px)",letterSpacing:"-.04em",lineHeight:1.35,maxWidth:840,margin:"0 0 22px"}}>{subtitle}</h2>
          <p style={{fontSize:"clamp(16px,1.8vw,19px)",color:"#dce5ea",lineHeight:1.9,maxWidth:850,margin:"0 0 29px"}}>{introduction}</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:12}}>{actions.map(a=><a key={a.href} href={a.href} style={button(!!a.primary)}>{a.label} →</a>)}</div>
        </div>
      </section>
      <section aria-label="活動状況" style={{background:"#e8edf0",padding:"36px max(20px,6vw)",borderBottom:"1px solid "+line}}>
        <div style={{maxWidth:1120,margin:"auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,290px),1fr))",gap:28,alignItems:"start"}}>
          <div><p style={{margin:"0 0 7px",fontSize:12,fontWeight:900,letterSpacing:2}}>CURRENT STATUS / {japanese}</p><strong style={{fontSize:"clamp(22px,3.2vw,34px)",lineHeight:1.3}}>{stage}</strong></div>
          <p style={{margin:0,fontSize:15,lineHeight:1.9,color:grey}}>{stageExplanation}</p>
        </div>
      </section>
      <section style={{padding:"70px max(20px,6vw)",maxWidth:1260,margin:"auto"}}>
        <p style={{fontSize:12,letterSpacing:3,fontWeight:900,color:grey}}>BASIC INFORMATION / VERIFIED STATUS</p>
        <h2 style={{fontSize:"clamp(29px,4vw,48px)",letterSpacing:"-.045em",margin:"12px 0 30px"}}>活動について、今わかること。</h2>
        <dl style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,250px),1fr))",gap:12,margin:0}}>{facts.map(x=><div key={x.label} style={{padding:24,background:"#f4f6f7",border:"1px solid "+line}}><dt style={{fontSize:12,color:grey,fontWeight:800,marginBottom:9}}>{x.label}</dt><dd style={{fontSize:19,lineHeight:1.65,fontWeight:800,margin:0}}>{x.value}</dd></div>)}</dl>
      </section>
      <section style={{background:ink,color:"#fff",padding:"70px max(20px,6vw)"}}>
        <div style={{maxWidth:1120,margin:"auto"}}>
          <p style={{fontSize:12,letterSpacing:3,color:"#c2d0d4",fontWeight:900}}>GREAM DEVELOPMENT PHILOSOPHY</p>
          <h2 style={{fontSize:"clamp(30px,4.3vw,49px)",letterSpacing:"-.045em",margin:"12px 0 24px"}}>チームのために、個人の成長を置き去りにしない。</h2>
          <p style={{color:"#d5dfe2",fontSize:16,lineHeight:1.9,maxWidth:820,margin:"0 0 30px"}}>選手が見る、判断する、実行する。そして振り返って修正する。GREAMが育成で大切にする基本的な考え方です。各地域の実際の運営・練習内容は確認したものから公開します。</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,230px),1fr))",gap:12}}>{focuses.map(f=><article key={f.en} style={{border:"1px solid #58636a",padding:"26px 22px",minHeight:190}}><p style={{fontWeight:900,color:"#b4cbd6",letterSpacing:2,fontSize:12,margin:"0 0 12px"}}>{f.en}</p><h3 style={{fontSize:24,margin:"0 0 12px"}}>{f.ja}</h3><p style={{fontSize:14,color:"#d8e1e4",lineHeight:1.75,margin:0}}>{f.description}</p></article>)}</div>
        </div>
      </section>
      <section style={{padding:"70px max(20px,6vw)",maxWidth:1200,margin:"auto"}}>
        <p style={{fontWeight:900,fontSize:12,letterSpacing:3,color:grey}}>FAQ / PARENTS & SUPPORTERS</p>
        <h2 style={{fontSize:"clamp(28px,4vw,44px)",letterSpacing:"-.035em",margin:"12px 0 22px"}}>参加前に知っておきたいこと。</h2>
        <div>{faqs.map(x=><details key={x.question} style={{borderTop:"1px solid "+line,padding:"18px 8px"}}><summary style={{cursor:"pointer",fontWeight:850,fontSize:17,lineHeight:1.7}}>{x.question}</summary><p style={{fontSize:15,lineHeight:1.9,color:grey,margin:"14px 0 4px"}}>{x.answer}</p></details>)}</div>
        <p style={{borderTop:"1px solid "+line,paddingTop:23,color:grey,lineHeight:1.8,fontSize:14}}>{note}</p>
        <div style={{display:"flex",gap:16,flexWrap:"wrap",alignItems:"center",marginTop:26}}><a href="/ja/gream" style={{background:ink,color:"#fff",padding:"14px 19px",fontWeight:800,textDecoration:"none",borderRadius:4}}>GREAM 3地域の一覧へ →</a>{otherRegionHref?<a href={otherRegionHref} style={{textDecoration:"underline",fontWeight:750}}>ほかの地域のページを見る →</a>:null}<a href="/ja/policies" style={{textDecoration:"underline",fontWeight:750}}>参加規約・安全・プライバシー →</a></div>
      </section>
    </div>
  </SiteFrame>;
}
