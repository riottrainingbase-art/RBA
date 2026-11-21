"use client";

import {useMemo,useState} from "react";
import {computeApparelEconomics,scenarios,type ApparelEconomicsInput} from "@/lib/apparel-business-economics";
import styles from "./apparel-business-desk.module.css";

const fields:{key:keyof ApparelEconomicsInput;label:string;hint:string;step?:number}[]=[
  {key:"retailJpy",label:"商品販売予定価格",hint:"送料別・仮の税込金額"},
  {key:"buyerShippingJpy",label:"顧客が支払う送料",hint:"購入時に別途表示する想定"},
  {key:"supplierJpy",label:"商品仕入れ・製造単価",hint:"業者見積が届いたら置き換える"},
  {key:"freightJpy",label:"輸入・配送コスト配賦",hint:"海外→日本／1点あたり"},
  {key:"importJpy",label:"税・通関費の配賦",hint:"該当条件は業者・税関に確認"},
  {key:"labellingJpy",label:"日本語品質表示",hint:"縫付・下げ札等を想定"},
  {key:"packagingJpy",label:"梱包・出荷作業",hint:"国内配送費と混同しない"},
  {key:"replacementReserveJpy",label:"不良・交換費引当",hint:"不良率と実績で調整"},
  {key:"processingPercent",label:"決済手数料（%）",hint:"サービス未確定につき仮率",step:.1},
  {key:"processingFixedJpy",label:"決済固定手数料",hint:"1件あたり"},
  {key:"extraMonthlyFixedJpy",label:"今回追加する月額固定費",hint:"既存サービス費用を含む全体損益ではない"},
  {key:"monthlyUnits",label:"月間販売想定点数",hint:"目標であり受注実績ではない"},
  {key:"targetContributionJpy",label:"目標の1点あたり限界利益",hint:"推奨売価の逆算に使用"}
];

const vendors=[
  {name:"SLEEFS",category:"海外ブランド卸",note:"日本向け卸価格・正規販売権・最低発注額を照会",state:"回答待ち"},
  {name:"Indigo Wolf",category:"オリジナル／チームウェア",note:"20セットと50セットの見積条件を照会",state:"回答待ち"},
  {name:"VETO Sports",category:"チームウェア",note:"15〜25セットの条件を照会",state:"回答待ち"},
  {name:"RISE Sportswear",category:"小ロットOEM",note:"10・20・50セットの日本向け単価を照会",state:"回答待ち"},
  {name:"F3 Custom",category:"米国製プライベートブランド",note:"12・24・50着と国際送料を照会",state:"回答待ち"}
] as const;

const yen=(value:number)=>new Intl.NumberFormat("ja-JP",{maximumFractionDigits:0}).format(Math.round(value))+"円";

export function ApparelBusinessDesk(){
  const [scenario,setScenario]=useState("tee");
  const [values,setValues]=useState<ApparelEconomicsInput>({...scenarios.tee.values});
  const [reviewed,setReviewed]=useState(false);
  const result=useMemo(()=>computeApparelEconomics(values),[values]);
  const setField=(key:keyof ApparelEconomicsInput,next:string)=>{
    const value=Number(next);
    if(!Number.isFinite(value)||value<0)return;
    setValues(v=>({...v,[key]:key==="monthlyUnits"?Math.floor(value):value}));
  };
  const switchScenario=(code:string)=>{
    if(!scenarios[code])return;
    setScenario(code);
    setValues({...scenarios[code].values});
    setReviewed(false);
  };
  return <section className={styles.root} aria-labelledby="apparel-operating-title">
    <div className={styles.head}>
      <p className={styles.overline}>RBA APPAREL / ZERO NEW SUBSCRIPTION</p>
      <h2 id="apparel-operating-title">アパレル事業の試算と仕入先判断</h2>
      <p>この画面はRBA管理者専用です。新たな月額ツール契約なしで計画を組み立てます。下記の金額はすべて編集可能な例示であり、実際の見積・注文・販売実績ではありません。</p>
    </div>
    <div className={styles.controls}>
      <label htmlFor="apparel-scenario">試算する商品</label>
      <select id="apparel-scenario" value={scenario} onChange={e=>switchScenario(e.target.value)}>
        {Object.entries(scenarios).map(([key,s])=><option key={key} value={key}>{s.name}</option>)}
      </select>
      <button type="button" onClick={()=>switchScenario(scenario)}>仮定値を初期状態に戻す</button>
    </div>
    <div className={styles.layout}>
      <div className={styles.inputs}>
        {fields.map(field=><label key={field.key}>
          <span><strong>{field.label}</strong><small>{field.hint}</small></span>
          <input inputMode="decimal" type="number" min="0" step={field.step||1}
            value={values[field.key]} onChange={e=>setField(field.key,e.target.value)}/>
        </label>)}
      </div>
      <div className={styles.results}>
        <p className={styles.overline}>SIMULATED CONTRIBUTION / 1 UNIT</p>
        <strong className={styles.money}>{yen(result.contribution)}</strong>
        <p className={styles.rate}>限界利益率 {(result.rate*100).toFixed(1)}%</p>
        <dl>
          <div><dt>入金総額（送料込）</dt><dd>{yen(result.revenue)}</dd></div>
          <div><dt>原価・配送・税・引当</dt><dd>{yen(result.procurement)}</dd></div>
          <div><dt>決済手数料</dt><dd>{yen(result.fee)}</dd></div>
          <div><dt>月間限界利益 − 今回追加の固定費</dt><dd>{yen(result.monthlyContribution)}</dd></div>
          <div><dt>追加固定費のみ回収する必要点数</dt><dd>{result.breakEvenUnits===null?"算出不可":result.breakEvenUnits+"点"}</dd></div>
          <div><dt>目標限界利益を満たす商品価格目安</dt><dd>{yen(result.suggestedRetailJpy)}</dd></div>
        </dl>
        <div className={styles.caution}>
          {result.contribution<=0?<strong>この仮定では販売点数が増えるほど赤字です。</strong>:null}
          <p>売価は正式決定ではありません。既存事業の人件費・交通費・固定費、税務上の取扱い、決済費・実際の配送額などは別途確認してください。月額固定費0円は新たなサブスクリプションを契約しない方針であり、完全無費用という意味ではありません。</p>
        </div>
      </div>
    </div>
    <div className={styles.vendorHead}>
      <h3>問い合わせ済みメーカー</h3>
      <p>2026年11月12日時点の初回営業記録。新しい返信や正式見積を取得したら、この一覧と単価を更新すること。代理店権や販売許可は未取得です。</p>
    </div>
    <div className={styles.vendors}>
      {vendors.map(x=><div key={x.name} className={styles.vendor}>
        <span>{x.category}</span><strong>{x.name}</strong><p>{x.note}</p><small>{x.state}</small>
      </div>)}
    </div>
    <div className={styles.release}>
      <h3>発売前ゲート</h3>
      <label><input type="checkbox" checked={reviewed} onChange={e=>setReviewed(e.target.checked)}/> 見積・生産体制・配送・返品・品質表示・ロゴ使用許諾の確認項目を確認した</label>
      <p>{reviewed?"チェックはローカル表示のみです。販売許可・承認・決済有効化にはなりません。":"未承認の商品・価格をサイトやShopifyで公開せず、先に無料アンケートで需要を確認してください。"}</p>
    </div>
  </section>;
}
