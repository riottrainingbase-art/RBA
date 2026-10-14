"use client";
import {useState} from "react";
import {ClipboardCopy,Check,ArrowUpRight} from "lucide-react";
import {TorstenTrackedLink} from "@/components/torsten-tracked-link";

const landing="https://riotbasketballacademy.com/ja/events/torsten-loibl-online-clinic";
const quiz="https://riotbasketballacademy.com/ja/coach/shooting-check";
const shortCopy="【指導者向け／11月25日（水）20:00–21:30】RBA主催・トーステン・ロイブル氏オンライン講習。テーマは「現代バスケットボールにおけるシューターの育成と活用」。シュート技術、練習設計、スペーシング、試合での判断を学びます。Zoom・日本語逐次通訳付き。LIVE 3,300円／録画30日4,400円（税込）。詳細："+landing;
const mediumCopy="シュート練習では入るのに、試合では打てない。RBAでは11月25日（水）20:00〜21:30、日本代表の育成年代や3x3の指導経験を持つトーステン・ロイブル氏を迎え、シューターの育成と活用についてオンラインで学びます。フォームだけでなく、打つ前の判断、スペーシング、練習設計を考える90分。ライブ3,300円・30日録画4,400円（税込）。Zoom／日本語逐次通訳。指導者資格不要。主催はRiot Basketball Academyです。詳細と申込："+landing;
export function TorstenSharingToolkit({registrationUrl}:{registrationUrl:string}){
 const[copied,setCopied]=useState<""|"short"|"medium">("");
 async function copy(text:string,which:"short"|"medium"){try{await navigator.clipboard.writeText(text);setCopied(which)}catch{setCopied("")}}
 return <div style={{background:"#f4f2ed",color:"#171717",padding:"65px 16px 100px"}}>
 <div style={{maxWidth:850,margin:"0 auto"}}>
 <p style={{fontSize:12,letterSpacing:2,fontWeight:900,color:"#b65b22"}}>RBA COACH EDUCATION / OFFICIAL SHARE KIT</p>
 <h1 style={{fontSize:"clamp(33px,6vw,64px)",lineHeight:1.2,letterSpacing:"-.045em",fontWeight:900,margin:"15px 0"}}>必要な指導者へ、<br/>正確な情報を届ける。</h1>
 <p style={{fontSize:17,lineHeight:1.9,maxWidth:730}}>勉強会、育成クラブ、指導者コミュニティ、メディアの方が、講習を紹介しやすいように開催概要とそのまま使える文章をまとめました。掲載・共有は自由なご判断にお任せします。</p>
 <section style={{background:"#161718",color:"white",padding:"28px",margin:"32px 0"}}>
 <p style={{color:"#e69c6e",fontWeight:800,fontSize:12}}>WED 25 NOV 2026 / 20:00–21:30 JST</p>
 <h2 style={{fontSize:27,lineHeight:1.4,margin:"16px 0"}}>現代バスケットボールにおける<br/>シューターの育成と活用</h2>
 <p>講師：Torsten Loibl（トーステン・ロイブル）</p>
 <p>主催：Riot Basketball Academy</p>
 <p>Zoom／英語講義・日本語逐次通訳</p>
 <p style={{fontWeight:800}}>LIVE 税込3,300円　／　録画30日 税込4,400円</p>
 <TorstenTrackedLink className="tc-btn" href={registrationUrl} placement="footer" kind="form_click" external>公式申込フォーム <ArrowUpRight size={17}/></TorstenTrackedLink>
 </section>
 {([{id:"short",title:"短文：LINE・SNSでの共有",content:shortCopy},{id:"medium",title:"紹介文：指導者勉強会・クラブ・メディア",content:mediumCopy}] as const).map(x=><section key={x.id} style={{background:"white",border:"1px solid #d7d3cb",padding:"26px",marginBottom:16}}>
 <h2 style={{fontSize:20,fontWeight:850,margin:"0 0 15px"}}>{x.title}</h2>
 <p style={{whiteSpace:"pre-wrap",fontSize:14,lineHeight:2,color:"#343434"}}>{x.content}</p>
 <button type="button" onClick={()=>copy(x.content,x.id)} style={{border:0,background:"#e86925",color:"#111",padding:"14px 20px",fontWeight:850,display:"inline-flex",gap:8,alignItems:"center",cursor:"pointer"}}>{copied===x.id?<Check size={17}/>:<ClipboardCopy size={17}/>} {copied===x.id?"コピーしました":"文章をコピーする"}</button>
 </section>)}
 <section style={{padding:"20px 0"}}>
 <h2 style={{fontSize:23,fontWeight:850}}>関連資料</h2>
 <p><a href={landing} style={{color:"#ad5423",fontWeight:750}}>講習の公式詳細ページ ↗</a></p>
 <p><a href={quiz} style={{color:"#ad5423",fontWeight:750}}>無料・2分のシュート練習チェック ↗</a></p>
 <p><a href="/resources/shooting-observation.pdf" style={{color:"#ad5423",fontWeight:750}}>RBA作成の観察ワークシート ↗</a></p>
 <p style={{fontSize:12,color:"#555",lineHeight:1.8}}>講習はJBA公認リフレッシュ研修とは案内していません。無料チェックと観察ワークはRBA独自制作で、講師監修の教材ではありません。講師・他団体による公式な後援、共同主催、認定を示唆しないでください。講師の写真・動画・第三者のロゴは権利確認なしに転載しないでください。</p>
 </section>
 </div></div>;
}
