"use client";

import { useMemo, useState } from "react";

type Scenario = "signature" | "artist";
type Assumptions = {
  price: number;
  minutes: number;
  hourlyPay: number;
  materials: number;
  careAndProof: number;
  failedUnitReserve: number;
  overhead: number;
  royalty: number;
  cardRatePct: number;
  taxPct: number;
  targetMarginPct: number;
};
const defaultScenarios:Record<Scenario,Assumptions>={
  signature:{price:4400,minutes:45,hourlyPay:2500,materials:300,careAndProof:250,failedUnitReserve:350,overhead:400,royalty:0,cardRatePct:3.6,taxPct:10,targetMarginPct:20},
  artist:{price:8800,minutes:100,hourlyPay:2800,materials:500,careAndProof:350,failedUnitReserve:700,overhead:800,royalty:0,cardRatePct:3.6,taxPct:10,targetMarginPct:20},
};
const money=(n:number)=>Math.round(n).toLocaleString("ja-JP")+"円";
const fields:{id:keyof Assumptions;label:string;max:number;step:number;note:string}[]=[
 {id:"price",label:"追加販売価格（税込・円）",max:50000,step:100,note:"購入者に請求する予定額。未承認"},
 {id:"minutes",label:"制作時間（分）",max:360,step:5,note:"書き入れ、乾燥・作業準備を含む実測目安"},
 {id:"hourlyPay",label:"作家報酬の時間単価（円）",max:15000,step:100,note:"合意前の試算。支払金額ではない"},
 {id:"materials",label:"塗料・資材（円）",max:5000,step:50,note:"生地用インク、消耗品など"},
 {id:"careAndProof",label:"検品・証拠写真・梱包追加（円）",max:5000,step:50,note:"通常商品の原価には含めない追加分"},
 {id:"failedUnitReserve",label:"失敗・再製作引当（円）",max:10000,step:50,note:"実際の試作品で見直す"},
 {id:"overhead",label:"個別対応・管理費（円）",max:10000,step:50,note:"購入者との確認・注文管理など"},
 {id:"royalty",label:"著作物使用料・販売連動報酬（円）",max:10000,step:50,note:"作家の合意に従う"},
 {id:"cardRatePct",label:"決済手数料率（%）",max:15,step:.1,note:"Stripeの実際の契約料率で要確認"},
 {id:"taxPct",label:"税率の仮定（%）",max:20,step:.5,note:"販売者の税区分と税務処理を専門家が確認"},
 {id:"targetMarginPct",label:"目標貢献率（%）",max:50,step:1,note:"この比率の前提は税抜売上高。純利益とは異なる"},
];
const labelStyle={fontSize:12,lineHeight:1.6,fontWeight:600} as const;

export function EssentialsAtelierLab(){
  const [scenario,setScenario]=useState<Scenario>("signature");
  const [values,setValues]=useState<Record<Scenario,Assumptions>>(()=>({
    signature:{...defaultScenarios.signature},artist:{...defaultScenarios.artist},
  }));
  const a=values[scenario];
  const calc=useMemo(()=>{
    const exTax=a.price/(1+a.taxPct/100);
    const labor=a.minutes/60*a.hourlyPay;
    const card=a.price*a.cardRatePct/100;
    const costsExcludingCard=labor+a.materials+a.careAndProof+a.failedUnitReserve+a.overhead+a.royalty;
    const totalCosts=costsExcludingCard+card;
    const contribution=exTax-totalCosts;
    const contributionPct=exTax>0?100*contribution/exTax:0;
    const denom=(1-a.targetMarginPct/100)/(1+a.taxPct/100)-a.cardRatePct/100;
    const minimumPrice=denom>0?Math.ceil((costsExcludingCard/denom)/100)*100:null;
    return{exTax,labor,card,totalCosts,contribution,contributionPct,minimumPrice,costsExcludingCard};
  },[a]);
  const set=(k:keyof Assumptions,n:number)=>{
    if(!Number.isFinite(n)||n<0)return;
    const limit=fields.find(x=>x.id===k)?.max??100000;
    setValues(prev=>({...prev,[scenario]:{...prev[scenario],[k]:Math.min(limit,n)}}));
  };
  return <div className="lab">
    <header className="hero">
      <p className="kicker">RBA / PRODUCT DEVELOPMENT / PRIVATE</p>
      <h1>Personal<br/><em>Edition.</em></h1>
      <p>手書き加工の価格設計ラボ。仕入先・作家との正式契約前の数字を検証します。<strong> 商品販売、請求、価格の公開は行いません。</strong></p>
      <nav className="switcher" aria-label="価格検討する加工仕様">
        <button type="button" className={scenario==="signature"?"on":""} onClick={()=>setScenario("signature")}>01 / SIGNATURE LETTERING</button>
        <button type="button" className={scenario==="artist"?"on":""} onClick={()=>setScenario("artist")}>02 / ARTIST ONE-OF-ONE</button>
      </nav>
    </header>
    <main className="layout">
      <section className="inputs">
        <div className="sectionTitle"><span>01 / INPUTS</span><span>可変シミュレーション</span></div>
        <div className="fields">
          {fields.map(f=><label key={f.id}>
            <span style={labelStyle}>{f.label}</span>
            <small>{f.note}</small>
            <input type="number" min="0" max={f.max} step={f.step} value={a[f.id]} onChange={e=>set(f.id,Number(e.target.value))} inputMode="decimal"/>
          </label>)}
        </div>
        <button type="button" className="reset" onClick={()=>setValues(prev=>({...prev,[scenario]:{...defaultScenarios[scenario]}}))}>初期の仮定に戻す</button>
      </section>
      <aside className="results">
        <div className="sectionTitle"><span>02 / MARGIN MODEL</span><span>税・手数料は仮定</span></div>
        <p className="resultName">{scenario==="signature"?"SIGNATURE LETTERING":"ARTIST ONE-OF-ONE"}</p>
        <strong className="big">{money(a.price)}</strong>
        <p className="sub">追加料金（税込）・試算上の仮価格</p>
        <div className="ledger">
          <div><span>税抜換算の追加売上</span><b>{money(calc.exTax)}</b></div>
          <div><span>作家へ支払う想定作業報酬</span><b>{money(calc.labor)}</b></div>
          <div><span>材料・検品・再製作・管理・ロイヤリティ</span><b>{money(calc.costsExcludingCard-calc.labor)}</b></div>
          <div><span>決済手数料の仮定</span><b>{money(calc.card)}</b></div>
          <div className="total"><span>追加加工の貢献額（概算）</span><b className={calc.contribution<0?"bad":"ok"}>{money(calc.contribution)}</b></div>
          <div><span>税抜追加売上に対する貢献率</span><b>{calc.contributionPct.toFixed(1)}%</b></div>
        </div>
        <div className="floor">
          <small>目標貢献率 {a.targetMarginPct}% を満たす試算価格の目安</small>
          <p>{calc.minimumPrice!==null?money(calc.minimumPrice):"算定できません"}</p>
        </div>
        <div className="runway"><p>1着の作業時間：{a.minutes}分</p><p>5着の作業時間：{(5*a.minutes/60).toFixed(1)}時間</p><p>20着の作業時間：{(20*a.minutes/60).toFixed(1)}時間</p><p>現物検証・注文対応・不良再製作・作家の制作スケジュールを別途確保してください。</p></div>
      </aside>
    </main>
    <footer className="footer"><p>この計算は利益確約や税務助言ではありません。完成した服本体の原価・通常商品の採算・輸送・消費税の適用条件を別途確認してください。</p><p>公開前チェック：作家との契約 → 試作品 → 洗濯耐久 → 報酬・価格 → 納期 → 返品対応 → Stripe/受注テスト。</p><p><a href="/ja/essentials/manage">受注管理に戻る</a> / <a href="/ja/essentials">コレクションへ</a></p></footer>
    <style jsx>{`
    .lab{background:#f3f1eb;color:#151515;font-family:Arial,"Helvetica Neue",sans-serif;min-height:100vh}
    *{box-sizing:border-box}
    .hero{background:#151515;color:#f6f4ee;padding:60px clamp(20px,5vw,80px) 54px}
    .kicker,.sectionTitle,.resultName{font-size:10px;letter-spacing:.16em;font-weight:600}
    .hero h1{font-family:Georgia,"Times New Roman",serif!important;font-size:clamp(56px,8vw,117px)!important;font-weight:400!important;line-height:1!important;letter-spacing:-.06em!important;margin:24px 0!important}
    .hero h1 em{font-weight:400;color:#bab4aa}
    .hero>p:not(.kicker){max-width:800px;font-size:14px;line-height:2;color:#cbc7bf}
    .switcher{display:flex;gap:9px;flex-wrap:wrap;margin-top:30px}
    .switcher button{background:transparent;color:#ddd;border:1px solid #777;padding:14px 19px;font-size:10px;letter-spacing:.09em;cursor:pointer}
    .switcher button.on{background:#f3f1eb;color:#161616;border-color:#f3f1eb}
    .layout{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,.85fr);gap:clamp(25px,5vw,80px);padding:55px clamp(20px,5vw,80px) 80px;max-width:1500px;margin:auto}
    .sectionTitle{display:flex;gap:10px;justify-content:space-between;border-bottom:1px solid #8f8b84;padding-bottom:20px}
    .fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:28px 25px;padding-top:28px}
    .fields label{display:flex;flex-direction:column;gap:7px;min-width:0}
    .fields small{color:#68635c;font-size:11px;line-height:1.7;min-height:35px}
    .fields input{font-size:17px;padding:11px 12px;color:#151515;border:1px solid #b7b2ab;background:#fff;width:100%;border-radius:0}
    .reset{border:1px solid #aaa7a0;background:transparent;font-size:12px;padding:13px 20px;margin-top:30px;cursor:pointer}
    .results{align-self:start;background:#e5e2db;padding:30px}
    .resultName{margin:25px 0 12px}
    .big{font-family:Georgia,serif;font-size:clamp(38px,4.7vw,73px);font-weight:400;letter-spacing:-.06em}
    .sub{font-size:12px;color:#66615a;margin:4px 0 23px}
    .ledger{border-top:1px solid #a8a49b}
    .ledger>div{border-bottom:1px solid #c3bfb6;padding:15px 0;display:flex;justify-content:space-between;gap:15px;align-items:center}
    .ledger span{font-size:11px;line-height:1.7;color:#59544f}
    .ledger b{font-size:13px;white-space:nowrap}
    .ledger .total{margin-top:10px;border-top:1px solid #9f9a91;padding-top:22px}
    .ok{color:#22452e}.bad{color:#9e2828}
    .floor{background:#181818;color:#f1efe8;padding:27px;margin-top:30px}
    .floor small{font-size:11px;line-height:1.9;color:#c2beb6}
    .floor p{font-family:Georgia,serif;font-size:38px;line-height:1.1;margin:15px 0 0}
    .runway{border-top:1px solid #bcb7af;margin-top:27px;padding-top:15px}
    .runway p{font-size:12px;line-height:1.9;color:#534f49}
    .footer{background:#e1dfd8;padding:30px clamp(20px,5vw,80px);font-size:11px;line-height:2;color:#59554f}
    .footer a{color:inherit}
    .lab input:focus-visible,.lab button:focus-visible{outline:3px solid #8c8a7f;outline-offset:2px}
    @media(max-width:900px){.layout{grid-template-columns:1fr}.results{width:100%}}
    @media(max-width:480px){.fields{grid-template-columns:1fr}.results{padding:22px}.hero{padding-top:42px}}
    `}</style>
  </div>;
}
