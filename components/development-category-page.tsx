import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
const dark="#101419",grey="#52606b",line="#dce1e5";
const linkStyle={display:"inline-flex",padding:"15px 20px",background:dark,color:"#fff",fontWeight:800,textDecoration:"none",borderRadius:5,alignItems:"center",minHeight:50} as const;
export type HubCard={title:string;eyebrow:string;body:string;href:string;cta:string;status?:string;imageSrc?:string;imageAlt?:string};
export function CategoryPage({eyebrow,title,lead,cards,note}:{eyebrow:string;title:string;lead:string;cards:HubCard[];note?:string}){
return <SiteFrame locale="ja"><div lang="ja" style={{background:"#fff",color:dark}}>
<section style={{background:dark,color:"#fff",padding:"clamp(60px,8vw,110px) 6vw"}}>
<div style={{maxWidth:1120,margin:"auto"}}><p style={{fontSize:12,letterSpacing:3,fontWeight:900,color:"#b7c3cd"}}>{eyebrow}</p><h1 style={{fontSize:"clamp(40px,7vw,90px)",letterSpacing:"-.055em",lineHeight:1.08,margin:"18px 0 24px"}}>{title}</h1><p style={{fontSize:"clamp(17px,2vw,22px)",lineHeight:1.85,maxWidth:850,color:"#e1e6e9"}}>{lead}</p></div></section>
<section style={{padding:"64px 6vw 80px",maxWidth:1260,margin:"auto"}}>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,290px),1fr))",gap:18}}>
{cards.map(c=><article key={c.href} style={{padding:"clamp(22px,3vw,36px)",border:"1px solid "+line,borderRadius:8,background:"#f8f9f9",display:"flex",flexDirection:"column",alignItems:"flex-start",minHeight:300}}>
<p style={{fontSize:12,letterSpacing:2,color:grey,fontWeight:900,margin:"0 0 18px"}}>{c.eyebrow}</p>{c.imageSrc?<div style={{width:"100%",height:132,display:"flex",alignItems:"center",justifyContent:"center",background:"#fff",border:"1px solid #e1e5e7",margin:"0 0 18px",padding:10}}><img src={c.imageSrc} alt={c.imageAlt||c.title} width={115} height={115} loading="lazy" style={{height:112,width:"auto",maxWidth:"95%",objectFit:"contain"}} /></div>:null}<h2 style={{fontSize:"clamp(25px,3vw,35px)",letterSpacing:"-.03em",margin:"0 0 15px"}}>{c.title}</h2><p style={{fontSize:16,lineHeight:1.85,color:grey,flex:1,margin:"0 0 26px"}}>{c.body}</p>{c.status?<p style={{fontSize:13,fontWeight:750,color:grey,margin:"0 0 16px"}}>{c.status}</p>:null}<a href={c.href} style={linkStyle}>{c.cta} →</a></article>)}
</div>{note?<p style={{fontSize:14,color:grey,lineHeight:1.8,marginTop:25}}>{note}</p>:null}</section></div></SiteFrame>;
}
