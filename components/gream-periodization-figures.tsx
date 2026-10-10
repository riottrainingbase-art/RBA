import type { CSSProperties } from "react";
const phases=[
 ["4–6月","基礎形成","停止・1対1"],
 ["7–9月","発展","2対1・3対3"],
 ["10–12月","応用","攻守の連係"],
 ["1–3月","定着・評価","5対5・振り返り"]
] as const;
const monthLabels=["4月","5月","6月","7月","8月","9月","10月","11月","12月","1月","2月","3月"];
const plan=[
 ["低","中","中","調整"],["中","中","中〜高","調整"],
 ["中","中","中〜高","調整"],["低〜中","中","中〜高","調整"],
 ["中","中","中〜高","調整"],["中","中","中〜高","調整"],
 ["中","中","中〜高","調整"],["中","中","中〜高","調整"],
 ["低〜中","中","中〜高","調整"],["中","中","中〜高","調整"],
 ["中","中","試合対応","調整"],["低〜中","中","中","調整"]
] as const;
const panel:CSSProperties={border:"1px solid #cad6d7",borderRadius:12,padding:"clamp(14px,3vw,26px)",margin:"22px 0",background:"#f6f8f8",color:"#14252b"};
export function GreamPeriodizationFigures(){
 return <section aria-label="GREAM沖縄U13の年間・週間計画と実際の負荷の区別" style={{margin:"0 0 36px"}}>
 <p style={{fontSize:12,fontWeight:900,letterSpacing:".12em",color:"#365d65"}}>GREAM OKINAWA U13 / EVIDENCE-INFORMED PERIODIZATION</p>
 <h2 style={{fontSize:"clamp(22px,3vw,34px)",lineHeight:1.45,margin:"10px 0"}}>計画と実測値を、混同しない。</h2>
 <p>以下は指導の重点と計画上の負荷区分です。実際の運動負荷を測定した曲線ではありません。</p>
 <figure style={panel}>
 <figcaption style={{fontWeight:900,marginBottom:12}}>図1｜年間の学習の重点（マクロサイクル）</figcaption>
 <div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:5}}>
 {phases.map((p,i)=><div key={p[0]} style={{padding:"13px 7px",background:["#d9e8e7","#bad5d5","#97bdc0","#769fa6"][i],minWidth:0}}>
 <strong style={{display:"block",fontSize:"clamp(11px,1.6vw,16px)"}}>{p[0]}</strong><b style={{display:"block",fontSize:"clamp(10px,1.4vw,14px)"}}>{p[1]}</b><small style={{fontSize:"clamp(9px,1.1vw,12px)"}}>{p[2]}</small>
 </div>)}
 </div>
 <p style={{fontSize:12,marginTop:12}}>個人技術、判断、S&amp;C、回復は年間を通して継続します。各期は指導の重点を表し、運動強度の増減を表すものではありません。</p>
 </figure>
 <figure style={panel}>
 <figcaption style={{fontWeight:900,marginBottom:12}}>図2｜48週間の計画区分（メゾ・ミクロサイクル）</figcaption>
 <div style={{overflowX:"auto"}}>
 <table style={{borderCollapse:"separate",borderSpacing:4,width:"100%",minWidth:620,textAlign:"center",fontSize:12}}>
 <thead><tr><th style={{textAlign:"left"}}>週</th>{monthLabels.map(m=><th key={m}>{m}</th>)}</tr></thead>
 <tbody>{[0,1,2,3].map(w=><tr key={w}><th style={{textAlign:"left",whiteSpace:"nowrap"}}>第{w+1}週</th>{plan.map((m,i)=><td key={i} style={{background:m[w]==="調整"?"#d5dede":m[w]==="試合対応"?"#eadcc5":"#b6d0d1",padding:"7px 2px",fontSize:11}}>
 <small style={{display:"block"}}>W{String(i*4+w+1).padStart(2,"0")}</small><b>{m[w]}</b>
 </td>)}</tr>)}</tbody>
 </table>
 </div>
 <p style={{fontSize:12,marginTop:12}}>低・中・中〜高・調整・試合対応は本人の通常の活動に対する相対的な運用目安で、実測値ではありません。大会・学校活動・成長・痛み・疲労に応じて変更します。</p>
 </figure>
 <figure style={panel}>
 <figcaption style={{fontWeight:900,marginBottom:12}}>図3｜毎週の判断の流れ</figcaption>
 <div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:5}}>
 {[
 ["計画","技術・試合・休養"],
 ["実施","時間・対人本数"],
 ["確認","RPE・疲労・痛み"],
 ["調整","翌週の負荷と課題"]
 ].map((x,i)=><div key={x[0]} style={{padding:"12px 7px",background:i===3?"#b7d0d1":"#e1e9e8",minWidth:0}}>
 <strong style={{display:"block",fontSize:"clamp(10px,1.5vw,14px)"}}>{x[0]}</strong><small style={{fontSize:"clamp(9px,1.2vw,12px)"}}>{x[1]}</small>
 </div>)}
 </div>
 <p style={{fontSize:12,marginTop:12}}>実測データは未収集です。session-RPE（時間×主観的運動強度）は個人内の変化を見る補助指標であり、傷害リスクを直接予測する値ではありません。実測の負荷曲線は記録が集まってから作成します。</p>
 </figure>
 <p style={{fontSize:12}}>参考：IOC Youth Athletic Development Consensus（2015）、Booth et al.（2017）。年間計画の区分と配色はGREAMの独自設計です。</p>
 </section>;
}
