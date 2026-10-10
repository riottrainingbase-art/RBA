import type { CSSProperties } from "react";
const phases=[
 {months:"4–6月",title:"基礎形成",desc:"止まる・動く・1対1",tone:"#d9e8e7"},
 {months:"7–9月",title:"発展",desc:"2対1・2対2・3対3",tone:"#bed6d6"},
 {months:"10–12月",title:"実戦への応用",desc:"攻守の切り替え・連係",tone:"#9fc1c5"},
 {months:"1–3月",title:"定着と評価",desc:"5対5・振り返り",tone:"#789ea6"}
];
const weeks=[
 {n:"1",name:"導入",sub:"現在地を確認",h:34},
 {n:"2",name:"発展",sub:"条件を変える",h:55},
 {n:"3",name:"応用",sub:"ゲームで試す",h:70},
 {n:"4",name:"調整・評価",sub:"回復と振り返り",h:32}
];
const panel:CSSProperties={border:"1px solid #cbd5d7",borderRadius:12,padding:"clamp(16px,3vw,30px)",margin:"20px 0 28px",background:"#f6f8f8",color:"#14252b"};
export function GreamPeriodizationFigures(){
 return <section aria-label="GREAM沖縄U13 ピリオダイゼーションの図解" style={{margin:"0 0 36px"}}>
 <div style={{fontWeight:900,letterSpacing:".12em",fontSize:12,color:"#3b6570"}}>GREAM OKINAWA U13 / PERIODIZATION</div>
 <h2 style={{fontSize:"clamp(23px,3vw,34px)",lineHeight:1.45,margin:"12px 0 14px"}}>年間・月間・週間の計画を、ひとつにつなぐ。</h2>
 <p style={{fontSize:14,lineHeight:1.9}}>練習のテーマだけでなく、試合、疲労、回復も含めて考えるための図です。数字は練習負荷の測定値ではなく、構成を理解するための例を示しています。</p>
 <figure style={panel}>
 <figcaption style={{fontWeight:900,fontSize:15,marginBottom:14}}>図1｜年間の4つの時期（マクロサイクル）</figcaption>
 <div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:5}}>
 {phases.map((p,i)=><div key={p.months} style={{padding:"13px 7px",background:p.tone,borderTop:"4px solid #244852",minWidth:0}}>
 <div style={{fontSize:10,fontWeight:800}}>第{i+1}期</div><div style={{fontSize:"clamp(11px,1.8vw,15px)",fontWeight:900,margin:"4px 0"}}>{p.months}</div>
 <div style={{fontSize:"clamp(10px,1.6vw,13px)",fontWeight:800}}>{p.title}</div><div style={{fontSize:"clamp(9px,1.3vw,11px)",lineHeight:1.55,marginTop:8}}>{p.desc}</div></div>)}
 </div>
 <div style={{padding:"11px 8px",marginTop:8,background:"#e7ecec",fontSize:12,textAlign:"center",fontWeight:700}}>年間を通じて継続：個人技術 ／ 判断 ／ S&amp;C ／ 安全と回復</div>
 <p style={{fontSize:11,lineHeight:1.75,marginTop:12}}>各期は重点を示すもので、ほかの能力を練習しない期間ではありません。</p>
 </figure>
 <figure style={panel}>
 <figcaption style={{fontWeight:900,fontSize:15,marginBottom:10}}>図2｜4週間の組み立て（メゾサイクル）</figcaption>
 <div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:8,alignItems:"end",height:160,borderBottom:"2px solid #47616a",padding:"0 3px"}}>
 {weeks.map(w=><div key={w.n} style={{height:"100%",display:"flex",flexDirection:"column",justifyContent:"end",alignItems:"center",gap:5}}>
 <div style={{width:"100%",maxWidth:100,height:w.h+18,background:w.n==="4"?"#a8bec1":"#355c68",borderRadius:"4px 4px 0 0"}}/>
 </div>)}
 </div>
 <div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:8,marginTop:10}}>
 {weeks.map(w=><div key={w.n} style={{textAlign:"center"}}><b style={{display:"block",fontSize:12}}>第{w.n}週</b><span style={{display:"block",fontSize:12,fontWeight:800}}>{w.name}</span><span style={{display:"block",fontSize:10}}>{w.sub}</span></div>)}
 </div>
 <p style={{fontSize:11,lineHeight:1.75,marginTop:14}}>棒の高さは負荷の実測値ではありません。学習の進め方を示す模式図です。大会や疲労状況に応じて順番・強度を変えます。「3週増やして4週下げる」を義務づけるものではありません。</p>
 </figure>
 <figure style={panel}>
 <figcaption style={{fontWeight:900,fontSize:15,marginBottom:12}}>図3｜1週間の配置例（ミクロサイクル）</figcaption>
 <div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:7}}>
 {[
 ["練習A","技術と新しい課題"],
 ["練習B","少人数ゲーム"],
 ["試合・交流","実戦で試す"],
 ["休養・調整","回復を確保"]
 ].map((x,i)=><div key={x[0]} style={{background:i===3?"#dbe6e5":"#e7ecec",padding:"12px 7px",borderTop:i===3?"4px solid #7c9b9e":"4px solid #345b65",minWidth:0}}><b style={{display:"block",fontSize:"clamp(10px,1.5vw,13px)"}}>{x[0]}</b><span style={{fontSize:"clamp(9px,1.3vw,11px)"}}>{x[1]}</span></div>)}
 </div>
 <p style={{fontSize:11,lineHeight:1.75,marginTop:13}}>実際の曜日を示すものではありません。週1回なら1回の練習内で学習をつなぎ、試合が続く週は練習量を抑えます。学校や他団体での活動も合わせて確認します。</p>
 </figure>
 </section>;
}
