"use client";
import { useMemo, useState } from "react";
import { ArrowUpRight, CheckCircle2, CircleAlert, ExternalLink, LockKeyhole, ShieldCheck } from "lucide-react";
import {
  computeTeeEconomics, defaultTeeEconomics,
  type TeeEconomicsInput
} from "@/lib/performance-tee-economics";
import styles from "./tee-economics-desk.module.css";

const fields:ReadonlyArray<{
  label:string;key:keyof TeeEconomicsInput;unit:string;step:number;hint?:string;
}>=[
  {label:"商品販売価格",key:"retailJpy",unit:"円",step:100},
  {label:"購入者から徴収する送料",key:"customerShippingJpy",unit:"円",step:100},
  {label:"Printfulの商品＋印刷",key:"baseProductUsd",unit:"USD",step:0.01,hint:"14.77米ドルはPrintfulの米国向け掲載下限。日本向けの確定見積ではありません。"},
  {label:"Printfulが請求する送料",key:"supplierShippingUsd",unit:"USD",step:0.01,hint:"4.95米ドルは公式Tシャツ送料表の日本向け参考値。製品個別の確定送料ではありません。"},
  {label:"想定為替レート",key:"usdToJpy",unit:"円/USD",step:1,hint:"155円は試算用の入力値で、現在の為替レートを示すものではありません。"},
  {label:"Shopify Paymentsカード手数料",key:"paymentPercent",unit:"%",step:0.05,hint:"国内カード3.55%を仮定。海外カード等では異なる場合があります。"},
  {label:"決済手数料の固定額",key:"paymentFixedJpy",unit:"円",step:1},
  {label:"輸入税・追加関税等の引当",key:"importTaxAndDutiesJpy",unit:"円",step:10},
  {label:"為替差額・仕入時の追加費用",key:"fxAndSupplierSurchargeJpy",unit:"円",step:10},
  {label:"不良交換等の期待コスト",key:"expectedReplacementJpy",unit:"円",step:10},
  {label:"その他の1注文あたり対応費",key:"packagingAndSupportJpy",unit:"円",step:10},
  {label:"売上に係る税等の引当（別途税理士確認）",key:"salesTaxReserveJpy",unit:"円",step:10},
  {label:"Shopify月額利用料",key:"monthlyPlatformJpy",unit:"円",step:50,hint:"Basic月払い4,850円の仮定。実プラン・請求通貨を要確認。"},
  {label:"その他の固定費（月額）",key:"monthlyOtherFixedJpy",unit:"円",step:100},
  {label:"月間販売数の仮定",key:"plannedOrders",unit:"着",step:1},
  {label:"目指す1着あたりの貢献利益",key:"desiredContributionJpy",unit:"円",step:100},
];
const yen=(num:number)=>Math.round(num).toLocaleString("ja-JP")+"円";

const launch=[
  ["Shopify有料プラン・決済", "現在はtrial。プラン選択とShopify Paymentsの審査・有効化が必要。"],
  ["商品・印刷の正式な見積", "SOL’S 11939のカラー・S〜2XL各サイズ・胸ロゴ位置ごとの価格をPrintfulで確認。"],
  ["Shopify × Printful商品同期", "アプリはインストール済み。ただし既存の仮SKUはPrintfulに接続されていません。正式商品との同期が必要。"],
  ["公式の印刷用ロゴ・実物サンプル", "高解像度の公式データを使用し、仕上がり・着用・洗濯を検品。"],
  ["送料・返品・税金・法定表示", "発送可能国、配送方法、返品・不良品対応、特定商取引法の表示を確定。"],
  ["決済から発送までの実注文テスト", "購入→自動製造発注→追跡番号→返品対応の一連をテスト。"],
] as const;

export function TeeEconomicsDesk(){
  const [data,setData]=useState<TeeEconomicsInput>(defaultTeeEconomics);
  const [openDetails,setOpenDetails]=useState(false);
  const outcome=useMemo(()=>{try{return computeTeeEconomics(data)}catch{return null}},[data]);
  const set=(key:keyof TeeEconomicsInput,value:string)=>{
    const n=Number(value);
    if(!Number.isFinite(n))return;
    setData(previous=>({...previous,[key]:Math.min(1000000,Math.max(0,n))}));
  };
  const scenarios=useMemo(()=>
    [3900,4400,4900,5500,5900].map(retail=>{
      const result=computeTeeEconomics({...data,retailJpy:retail});
      return {price:retail,...result};
    }),[data]);

  return <main className={styles.page}>
    <header className={styles.hero}>
      <a href="/ja/store" className={styles.back}>← RBA公式ストア</a>
      <p className={styles.kicker}><LockKeyhole size={14}/>RBA MANAGEMENT / INTERNAL ONLY</p>
      <h1>売ってから赤字にしない。<br/>RBA Performance Tee</h1>
      <p>この画面は管理者専用の利益シミュレーターです。入力結果はShopifyの価格や在庫へ反映されず、実際の注文・決済を開始しません。</p>
      <div className={styles.heroLinks}>
        <a href="https://admin.shopify.com/store/hqg7dh-wp/products/9709290946817" target="_blank" rel="noopener noreferrer">Shopifyの商品管理 <ExternalLink size={15}/></a>
        <a href="https://www.printful.com/dashboard" target="_blank" rel="noopener noreferrer">Printfulの商品管理 <ExternalLink size={15}/></a>
      </div>
    </header>

    <section className={styles.summary} aria-labelledby="summary-title">
      <div className={styles.heading}><p className={styles.kicker}>UNIT ECONOMICS</p><h2 id="summary-title">販売単価と利益を試算</h2><p>商品1着を国内に受注生産した場合の参考計算。為替・製造・送料は編集して精査してください。</p></div>
      {outcome?<div className={styles.stats}>
        <article><span>購入者の支払総額（仮定）</span><strong>{yen(outcome.grossCollectedJpy)}</strong></article>
        <article><span>製造＋Printful送料</span><strong>{yen(outcome.supplierCostJpy)}</strong></article>
        <article><span>カード手数料</span><strong>{yen(outcome.paymentFeeJpy)}</strong></article>
        <article data-negative={outcome.contributionJpy<=0}><span>1着あたり貢献利益</span><strong>{yen(outcome.contributionJpy)}</strong></article>
        <article data-negative={outcome.monthlyOperatingProfitJpy<=0}><span>月間営業利益（固定費控除後）</span><strong>{yen(outcome.monthlyOperatingProfitJpy)}</strong></article>
        <article><span>月額固定費を回収する数量</span><strong>{outcome.breakEvenOrders===null?"算出不可":outcome.breakEvenOrders+"着"}</strong></article>
      </div>:<p className={styles.error} role="alert">計算条件が不正です。数値を確認してください。</p>}
      {outcome?<div className={styles.recommendation}><div><strong>1着 {yen(data.desiredContributionJpy)} の貢献利益を目指す場合</strong><span>送料・税・決済・期待交換費用を上記仮定で計算</span></div><strong>{yen(outcome.suggestedRetailForTargetJpy)}〜</strong></div>:null}
    </section>

    <section className={styles.inputPanel} aria-labelledby="simulator-title">
      <div className={styles.heading}><p className={styles.kicker}>EDIT ASSUMPTIONS</p><h2 id="simulator-title">金額を変えて採算を確認</h2><p>以下の値は保存されません。正式な取引条件を仕入先やShopify管理画面で確認してから入力してください。</p></div>
      <div className={styles.fields}>
        {fields.slice(0,6).map(item=><label key={item.key}>
          <span>{item.label}</span>
          <div className={styles.numberInput}><input type="number" step={item.step} min="0" value={data[item.key]} onChange={e=>set(item.key,e.target.value)}/><small>{item.unit}</small></div>
          {item.hint?<em>{item.hint}</em>:null}
        </label>)}
      </div>
      <button className={styles.expand} type="button" aria-expanded={openDetails} onClick={()=>setOpenDetails(!openDetails)}>{openDetails?"詳細費用を閉じる":"税金・返品・月額費用などの詳細を編集"} <span aria-hidden="true">{openDetails?"−":"＋"}</span></button>
      {openDetails?<div className={styles.fields}>
        {fields.slice(6).map(item=><label key={item.key}>
          <span>{item.label}</span>
          <div className={styles.numberInput}><input type="number" step={item.step} min="0" value={data[item.key]} onChange={e=>set(item.key,e.target.value)}/><small>{item.unit}</small></div>
          {item.hint?<em>{item.hint}</em>:null}
        </label>)}
      </div>:null}
      <button className={styles.reset} type="button" onClick={()=>{setData(defaultTeeEconomics);setOpenDetails(false)}}>試算条件を初期値に戻す</button>
    </section>

    <section className={styles.compare} aria-labelledby="compare-title">
      <div className={styles.heading}><p className={styles.kicker}>PRICE OPTIONS</p><h2 id="compare-title">販売価格ごとの比較</h2><p>変更するのは商品価格のみ。購入者送料・製造費・為替などは共通条件です。</p></div>
      <div className={styles.tableScroll}>
        <table><thead><tr><th scope="col">商品価格</th><th scope="col">1着の貢献利益</th><th scope="col">貢献利益率</th><th scope="col">月{data.plannedOrders}着の営業利益</th><th scope="col">固定費回収</th></tr></thead><tbody>
          {scenarios.map(row=><tr key={row.price} data-selected={row.price===data.retailJpy} data-negative={row.contributionJpy<=0}>
            <th scope="row">{yen(row.price)}</th><td>{yen(row.contributionJpy)}</td><td>{(row.contributionRate*100).toFixed(1)}%</td><td>{yen(row.monthlyOperatingProfitJpy)}</td><td>{row.breakEvenOrders===null?"不可":row.breakEvenOrders+"着"}</td>
          </tr>)}
        </tbody></table>
      </div>
      <p className={styles.small}>貢献利益は「売価＋送料収入 − Printful製造費・実送料 − 決済手数料 − 追加費用等」。固定費は月額会費等です。法人税・最終的な消費税納税額や実際の返金額を保証する数字ではありません。</p>
    </section>

    <section className={styles.launch} aria-labelledby="launch-title">
      <div className={styles.heading}><p className={styles.kicker}>GO-LIVE CHECKLIST</p><h2 id="launch-title">発売前に完了する6項目</h2><p>アプリがあるだけでは自動発送は成立しません。商品ごとの紐付けと実注文テストが必要です。</p></div>
      <ol className={styles.gates}>{launch.map(([title,description],i)=><li key={title}>
        <span>{String(i+1).padStart(2,"0")}</span><div><strong>{title}</strong><p>{description}</p></div><CircleAlert aria-label="未確認" size={18}/>
      </li>)}</ol>
      <div className={styles.security}><ShieldCheck size={22}/><p>現在のShopify商品はDRAFT・在庫0・USD69の旧仮価格です。顧客へ販売可能な商品として案内せず、すべての要件が整った後に正しいサイズ・価格へ更新します。</p></div>
      <div className={styles.links}><a href="/ja/store" target="_blank" rel="noopener noreferrer">RBA販売ページ <ArrowUpRight size={16}/></a><a href="https://www.printful.com/jp/shipping" target="_blank" rel="noopener noreferrer">Printful送料表 <ArrowUpRight size={16}/></a><a href="https://www.shopify.com/jp/pricing" target="_blank" rel="noopener noreferrer">Shopify料金表 <ArrowUpRight size={16}/></a></div>
    </section>
  </main>;
}
