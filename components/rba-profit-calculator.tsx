"use client";

import {useMemo,useState} from "react";
import {evaluateRbaMargin, type MarginInputs, type RevenueGate} from "@/lib/rba-margin-model";

type NumericKey=Exclude<keyof MarginInputs,"gates">;
const initial:MarginInputs={
  paidParticipants:0,minimumParticipants:0,sportsFeePerParticipant:0,confirmedSponsorship:0,
  fixedVenueAndEventCosts:0,coachesAndStaffCosts:0,variableCostPerParticipant:0,
  rbaTravelAndAccommodation:0,contingency:0,paymentFeePct:3.6,targetMarginPct:30,
  gates:{sportingRulesApproved:false,venueConfirmed:false,safeguardingAndInsuranceConfirmed:false,termsAndRefundsApproved:false,deliverablesAndCapacityConfirmed:false,travelHandledSeparately:false},
};
const fields:{key:NumericKey;label:string;help:string}[]=[
  {key:"paidParticipants",label:"有料参加見込人数",help:"無料意向登録や仮申込は含めない"},
  {key:"minimumParticipants",label:"開催に必要な最低人数",help:"安全に受け入れられる範囲で設定"},
  {key:"sportsFeePerParticipant",label:"RBAスポーツ参加費（1人・円）",help:"正式承認前は社外に提示しない"},
  {key:"confirmedSponsorship",label:"契約済み協賛金（円）",help:"協賛希望額・口頭内諾は計上しない"},
  {key:"fixedVenueAndEventCosts",label:"施設・運営固定費（円）",help:"会場、備品、審判、救護など"},
  {key:"coachesAndStaffCosts",label:"指導者・スタッフ費（円）",help:"代表本人の拘束時間・準備作業も原価に入れる"},
  {key:"variableCostPerParticipant",label:"参加者1人あたり変動費（円）",help:"保険・用具・飲料・イベント提供物など"},
  {key:"rbaTravelAndAccommodation",label:"RBA側の旅費・宿泊（円）",help:"講師や運営者の出張費。海外チームの旅行代金は計上しない"},
  {key:"contingency",label:"予備費・返金対応原資（円）",help:"天候や追加運営・変更対応の余力"},
  {key:"paymentFeePct",label:"決済手数料率（%・試算）",help:"実際の契約手数料に合わせて変更"},
  {key:"targetMarginPct",label:"目標限界利益率（%）",help:"初期値30%は試算用の社内目安。承認済みの経営目標ではない"},
];
const gateLabels:{key:keyof RevenueGate;label:string}[]=[
  {key:"sportingRulesApproved",label:"実施要項・対象年齢・スポーツ参加条件が書面で確定"},
  {key:"venueConfirmed",label:"会場利用・実施内容・必要許可が正式に確認済み"},
  {key:"safeguardingAndInsuranceConfirmed",label:"成人責任者・保護者同意・緊急時対応・保険が確定"},
  {key:"termsAndRefundsApproved",label:"料金、支払条件、取消・返金規定が承認済み"},
  {key:"deliverablesAndCapacityConfirmed",label:"人員・備品・定員・提供内容と原価が確定"},
  {key:"travelHandledSeparately",label:"宿泊・移動・観光は適格な旅行業者または直接の事業者契約として分離"},
];
const yen=(n:number|null)=>n===null?"算出不可":new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(n);
export function RbaProfitCalculator(){
 const [values,setValues]=useState<MarginInputs>(initial);
 const quote=useMemo(()=>evaluateRbaMargin(values),[values]);
 const update=(key:NumericKey,v:string)=>setValues(current=>({...current,[key]:Math.max(0,Number(v)||0)}));
 const toggle=(key:keyof RevenueGate,value:boolean)=>setValues(current=>({...current,gates:{...current.gates,[key]:value}}));
 return <main style={{background:"#f7f6f2",color:"#15253c",minHeight:"100vh",padding:"36px 18px 80px"}}>
  <div style={{maxWidth:1120,margin:"0 auto"}}>
    <p style={{fontWeight:800,letterSpacing:".13em",fontSize:12}}>RBA INTERNAL / REVENUE OPERATIONS</p>
    <h1 style={{fontSize:"clamp(27px,4vw,45px)",lineHeight:1.3,margin:"12px 0"}}>申し込みを増やす前に、採算を確かめる。</h1>
    <p style={{maxWidth:820,lineHeight:1.9,color:"#495c71"}}>RBAの指導・大会運営に関する見積シミュレーションです。入力内容はこの画面内だけで計算し、データベースに保存・送信しません。正式料金、予約、請求書、決済リンクは作成しません。</p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:18,marginTop:28}}>
      <section style={{padding:22,background:"#fff",border:"1px solid #d5d8d9"}}>
        <h2 style={{fontSize:21,marginTop:0}}>1. 売上と原価</h2>
        {fields.map(({key,label,help})=><label key={key} style={{display:"block",marginBottom:16}}>
          <span style={{display:"block",fontSize:13,fontWeight:700,marginBottom:5}}>{label}</span>
          <input type="number" inputMode="decimal" min={0} max={key.endsWith("Pct")?100:undefined} step={key.endsWith("Pct")?0.1:1}
            value={values[key]} onChange={e=>update(key,e.target.value)}
            style={{width:"100%",border:"1px solid #aab5bc",borderRadius:3,padding:"10px 12px",fontSize:16,background:"#fff",color:"#15253c"}}/>
          <small style={{display:"block",marginTop:4,color:"#607183",lineHeight:1.5}}>{help}</small>
        </label>)}
      </section>
      <div>
        <section style={{padding:22,background:"#fff",border:"1px solid #d5d8d9"}}>
          <h2 style={{fontSize:21,marginTop:0}}>2. 収支の見通し</h2>
          <dl style={{display:"grid",gridTemplateColumns:"1fr auto",gap:"12px 15px",fontSize:14}}>
            <dt>RBAの売上（仮）</dt><dd style={{margin:0,fontWeight:800}}>{yen(quote.revenue)}</dd>
            <dt>直接費用・予備費</dt><dd style={{margin:0}}>{yen(quote.directCosts)}</dd>
            <dt>決済手数料試算</dt><dd style={{margin:0}}>{yen(quote.paymentFees)}</dd>
            <dt>残る限界利益</dt><dd style={{margin:0,fontWeight:800}}>{yen(quote.contribution)}</dd>
            <dt>限界利益率</dt><dd style={{margin:0,fontWeight:800}}>{quote.revenue>0?quote.marginPct.toFixed(1)+"%":"－"}</dd>
            <dt>損益分岐人数</dt><dd style={{margin:0}}>{quote.breakEvenPlayers===null?"算出不可":quote.breakEvenPlayers+"人"}</dd>
            <dt>目標利益率に必要な1人単価</dt><dd style={{margin:0}}>{yen(quote.suggestedPrice)}</dd>
          </dl>
          <p style={{padding:12,background:"#f0f3f5",fontSize:13,lineHeight:1.8}}>収入には、確定した協賛金のみ算入します。旅行会社が顧客へ直接請求するホテル・貸切バス等の旅行代金は、RBAの売上にも原価にも含めません。</p>
        </section>
        <section style={{padding:22,marginTop:16,background:"#fff",border:"1px solid #d5d8d9"}}>
          <h2 style={{fontSize:21,marginTop:0}}>3. 販売開始の確認</h2>
          <p style={{fontSize:13,color:"#52667b",lineHeight:1.8}}>チェックは担当者の手動申告です。実際の許可・契約の記録を照合したことにはなりません。</p>
          {gateLabels.map(({key,label})=><label key={key} style={{display:"flex",gap:10,margin:"14px 0",lineHeight:1.6,fontSize:14,alignItems:"flex-start"}}>
            <input type="checkbox" checked={values.gates[key]} onChange={e=>toggle(key,e.target.checked)} style={{marginTop:5}}/><span>{label}</span>
          </label>)}
          <div role="status" aria-live="polite" style={{borderTop:"1px solid #d8dce0",paddingTop:15,fontWeight:800}}>
            {!quote.financiallyReady?"採算条件未達・販売不可":!quote.operationallyReady?"書類・運営条件未確認・販売不可":"販売前レビュー候補（正式承認は別途必要）"}
          </div>
        </section>
      </div>
    </div>
    <footer style={{marginTop:32,paddingTop:20,borderTop:"1px solid #cdd3d5",fontSize:13,lineHeight:1.8,color:"#566778"}}>
      この試算はRBA管理者専用です。販売可能判定が出ても、料金公開、申込確定、決済リンク発行、予約・発注は自動化しません。RIZEHOPEの海外チーム参加費は未承認のため、この計算機の初期値に使用していません。
    </footer>
  </div>
 </main>;
}
