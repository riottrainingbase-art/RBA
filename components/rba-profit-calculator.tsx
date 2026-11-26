"use client";

import {useMemo,useState} from "react";
import {evaluateRbaMargin, type MarginInputs, type RevenueGate} from "@/lib/rba-margin-model";

type NumericKey=Exclude<keyof MarginInputs,"gates">;
const initial:MarginInputs={
  paidParticipants:0,verifiedPaidParticipants:0,minimumParticipants:0,capacityParticipants:0,sportsFeePerParticipant:0,confirmedSponsorship:0,
  fixedVenueAndEventCosts:0,coachesAndStaffCosts:0,variableCostPerParticipant:0,
  rbaTravelAndAccommodation:0,contingency:0,paymentFeePct:3.6,targetMarginPct:25,
  gates:{sportingRulesApproved:false,venueConfirmed:false,safeguardingAndInsuranceConfirmed:false,termsAndRefundsApproved:false,deliverablesAndCapacityConfirmed:false,travelHandledSeparately:false},
};
const fields:{key:NumericKey;label:string;help:string}[]=[
  {key:"paidParticipants",label:"有料参加の見込人数（予測）",help:"計画上の人数です。無料意向・仮登録・実際の入金を同一視しない"},
  {key:"verifiedPaidParticipants",label:"入金照合済み人数（ユニーク）",help:"Stripe・Square・銀行振込等と申込記録が一致した人数だけ"},
  {key:"minimumParticipants",label:"損益上・運営上の最低参加人数",help:"未設定（0）のままでは販売前レビュー候補にしない"},
  {key:"capacityParticipants",label:"安全上の最大受入人数",help:"会場・スタッフ・年齢別安全基準から確定。0は未確認"},
  {key:"sportsFeePerParticipant",label:"RBAスポーツ参加費（1人・円）",help:"正式承認前は社外に提示しない"},
  {key:"confirmedSponsorship",label:"入金確認済み協賛金（円）",help:"契約内諾・提案額・未入金は計上しない。銀行入金の想定"},
  {key:"fixedVenueAndEventCosts",label:"施設・運営固定費（円）",help:"会場、備品、審判、救護など"},
  {key:"coachesAndStaffCosts",label:"指導者・スタッフ費（円）",help:"代表本人の拘束時間・準備作業も原価に入れる"},
  {key:"variableCostPerParticipant",label:"参加者1人あたり変動費（円）",help:"保険・用具・飲料・イベント提供物など"},
  {key:"rbaTravelAndAccommodation",label:"RBA側の旅費・宿泊（円）",help:"講師や運営者の出張費。海外チームの旅行代金は計上しない"},
  {key:"contingency",label:"予備費・返金対応原資（円）",help:"天候や追加運営・変更対応の余力"},
  {key:"paymentFeePct",label:"参加費の決済手数料率（%）",help:"参加費にだけ適用。協賛金には一律適用しない"},
  {key:"targetMarginPct",label:"目標限界利益率（%）",help:"既存Clinic運営SOPの内部目安25%に整合。全社の純利益率ではない"},
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
            <dt>見込のRBA売上</dt><dd style={{margin:0,fontWeight:800}}>{yen(quote.revenue)}</dd>
            <dt>うち参加費売上見込</dt><dd style={{margin:0}}>{yen(quote.sportsRevenue)}</dd>
            <dt>入金照合済み売上（協賛含む）</dt><dd style={{margin:0,fontWeight:800}}>{yen(quote.verifiedRevenue)}</dd>
            <dt>直接費用・予備費</dt><dd style={{margin:0}}>{yen(quote.directCosts)}</dd>
            <dt>決済手数料試算</dt><dd style={{margin:0}}>{yen(quote.paymentFees)}</dd>
            <dt>残る限界利益</dt><dd style={{margin:0,fontWeight:800}}>{yen(quote.contribution)}</dd>
            <dt>限界利益率</dt><dd style={{margin:0,fontWeight:800}}>{quote.revenue>0?quote.marginPct.toFixed(1)+"%":"－"}</dd>
            <dt>損益分岐人数</dt><dd style={{margin:0}}>{quote.breakEvenPlayers===null?"算出不可":quote.breakEvenPlayers+"人"}</dd>
            <dt>目標利益率に必要な1人単価</dt><dd style={{margin:0}}>{yen(quote.suggestedPrice)}</dd>
            <dt>直接費に対する資金不足（参考）</dt><dd style={{margin:0,fontWeight:750}}>{yen(quote.cashCoverageGap)}</dd>
          </dl>
          <p style={{padding:12,background:"#f0f3f5",fontSize:13,lineHeight:1.8}}>協賛金は入金確認済み金額のみ算入します。資金不足は見込の直接費と照合済入金からの保守的試算で、銀行残高や実現利益ではありません。旅行会社が海外チームへ直接請求する宿泊・バス等はRBAの売上・原価に含めません。</p>
        </section>
        <section style={{padding:22,marginTop:16,background:"#fff",border:"1px solid #d5d8d9"}}>
          <h2 style={{fontSize:21,marginTop:0}}>3. 販売開始の確認</h2>
          <p style={{fontSize:13,color:"#52667b",lineHeight:1.8}}>チェックは担当者の手動申告です。実際の許可・契約の記録を照合したことにはなりません。</p>
          {gateLabels.map(({key,label})=><label key={key} style={{display:"flex",gap:10,margin:"14px 0",lineHeight:1.6,fontSize:14,alignItems:"flex-start"}}>
            <input type="checkbox" checked={values.gates[key]} onChange={e=>toggle(key,e.target.checked)} style={{marginTop:5}}/><span>{label}</span>
          </label>)}
          <div role="status" aria-live="polite" style={{borderTop:"1px solid #d8dce0",paddingTop:15,fontWeight:800}}>
            {!quote.capacityOk?"最低人数・受入定員・入金数の整合未確認":!quote.financiallyReady?"採算条件未達・販売不可":!quote.operationallyReady?"書類・運営条件未確認・販売不可":!quote.deliveryReady?"見積・販売前レビュー候補／実施時の入金要件未達":"実施前レビュー候補（書面承認・実入金照合は別途必要）"}
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
