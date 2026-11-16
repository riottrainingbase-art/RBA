import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import { getEssentialsPresaleConfig } from "@/lib/essentials-commerce";

export const dynamic="force-dynamic";
export const metadata:Metadata={
  title:"RBA ESSENTIALS｜特定商取引法に基づく表記・先行販売条件",
  description:"RBA ESSENTIALS公式アパレルの販売事業者・価格・支払・発送・キャンセル・返品条件。",
  robots:{index:false,follow:true},
};
export default function EssentialsLegalPage(){
  const c=getEssentialsPresaleConfig();
  const details=c.ready?[
    ["販売事業者",c.merchant.name],
    ["事業者の所在地",c.merchant.address],
    ["電話番号",c.merchant.phone],
    ["連絡先メール",c.merchant.email],
    ["販売する商品","RBA ESSENTIAL TEE（白）／RBA ESSENTIAL SETUP（黒・パーカー上下）"],
    ["価格","Tシャツ："+Number(c.unitPrices.tee).toLocaleString("ja-JP")+"円（税込）／セットアップ："+Number(c.unitPrices.setup).toLocaleString("ja-JP")+"円（税込）"],
    ["商品代金以外の費用","FIRST DROP先行販売の日本国内送料は無料（0円）です。通常販売の送料は別途告知します。総額は注文確認画面で表示します。"],
    ["申込受付期間","受付期限："+c.orderDeadline+"。期間外の注文は受け付けません。"],
    ["支払方法・時期","Stripeによるオンライン決済。購入時に1回のみ全額前払いとなります。"],
    ["商品の引渡時期","発送期限："+c.dispatchDeadline+"、お届け期限："+c.deliveryDeadline+"。この期限までの履行が困難になった場合は速やかにご連絡し、対応をご相談します。"],
    ["キャンセル・注文変更",c.cancellation],
    ["返品・交換",c.returns],
    ["先行販売について",c.note],
    ...(c.handwrittenAvailable ? [["手書き加工の追加価格と返品条件",`税込追加料金：${Number(c.handwrittenJPY).toLocaleString("ja-JP")}円。${c.handwrittenTerms}`]] : []),
  ]:[];
  return <SiteFrame locale="ja">
    <main style={{background:"#f5f4f0",color:"#171715",padding:"65px clamp(24px,5vw,90px) 110px",fontFamily:"Arial,sans-serif"}}>
      <div style={{maxWidth:1050,margin:"auto"}}>
        <p style={{fontSize:11,letterSpacing:".15em",borderBottom:"1px solid #aaa",paddingBottom:18}}>RBA ESSENTIALS / LEGAL INFORMATION</p>
        <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(37px,5.8vw,76px)",fontWeight:400,letterSpacing:"-.06em",lineHeight:1.24,margin:"55px 0 24px"}}>特定商取引法に<br/>基づく表記</h1>
        <p style={{lineHeight:2,fontSize:14,color:"#5f5b54",maxWidth:700}}>RBA公式アパレルに関する販売条件です。団体の育成事業と物品販売は区別して管理し、商品の販売による利益はRBAの育成活動に活用する方針です。商品の購入は税制上の寄附金控除を意味しません。</p>
        {!c.ready?<div style={{background:"#e7e5df",padding:"30px",margin:"35px 0",lineHeight:2}}><strong>現在、公式アパレルの先行販売は開始していません。</strong><p>税込価格はTシャツ4,900円、ブラック上下セット19,800円で確定しています。先行販売の日本国内送料は無料です。事業者の販売者表示・サイズ表・受注期間・発送期限・キャンセル及び返品条件を確定し、販売条件を公開した後に決済を有効化します。以下は販売開始前のご案内です。</p></div>:
        <div style={{borderTop:"1px solid #999",margin:"45px 0 60px"}}>{details.map(([key,value])=><div key={key} style={{display:"grid",gridTemplateColumns:"minmax(125px,1fr) minmax(0,2.5fr)",gap:20,padding:"25px 0",borderBottom:"1px solid #d1cec7",fontSize:13,lineHeight:2}}><strong>{key}</strong><span>{value}</span></div>)}</div>}
        <h2 style={{fontFamily:"Georgia,serif",fontWeight:400,fontSize:34,margin:"60px 0 20px"}}>About the first drop.</h2>
        <p style={{fontSize:13,lineHeight:2,maxWidth:800}}>RBA ESSENTIALSはホワイトTシャツとブラックのセットアップを揃える公式アパレル企画です。掲載中の画像は実物の撮影写真ではなくデザイン検討用イメージです。素材・サイズ・ロゴワッペン・写真は量産仕様と相違する場合があるため、正式な商品説明を確認してからお申込みください。</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:25,marginTop:50,fontSize:12}}><Link href="/ja/essentials">コレクションへ戻る ↗</Link><Link href="/ja/essentials/checkout">先行購入ページ ↗</Link><Link href="/ja/policies">RBAの参加規約等 ↗</Link></div>
      </div>
    </main>
  </SiteFrame>;
}
