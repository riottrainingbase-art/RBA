import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient as createAdmin } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { isRbaStoreOwner } from "@/lib/essentials-store-owner";
import { essentialsHaveFinalSpecifications, getEssentialsPresaleConfig } from "@/lib/essentials-commerce";
import { essentialsFulfillmentCanAcceptOrders } from "@/lib/essentials-fulfillment-readiness";
import { verifyEssentialsStripeAccount, verifyEssentialsStripePublicBranding, verifyEssentialsStripeWebhookDestinations } from "@/lib/essentials-stripe";
import { SiteFrame } from "@/components/site-frame";
import { getEssentialsNoticeConfig } from "@/lib/essentials-notice-config";

export const dynamic="force-dynamic";
export const metadata:Metadata={title:"RBA ESSENTIALS｜販売前の確認（管理者限定）",robots:{index:false,follow:false}};
const gates=[
 ["RBA_ESSENTIALS_MANUFACTURING_CONFIRMED","りささんの製造・工程・品質管理体制"],
 ["RBA_ESSENTIALS_RISA_FULFILLMENT_AGREEMENT_APPROVED","りささんとの製作・発送・個人情報の委託契約"],
 ["RBA_ESSENTIALS_SAMPLES_APPROVED","現物サンプルを検品"],
 ["RBA_ESSENTIALS_PHOTOS_APPROVED","掲載画像（CGを含む）の権利・表示内容の承認"],
 ["RBA_ESSENTIALS_PUBLIC_LISTING_APPROVED","公開ページの商品写真・名称・説明・サイズの最終承認"],
 ["RBA_ESSENTIALS_SIZE_CHART_APPROVED","サイズ実寸表"],
 ["RBA_ESSENTIALS_LOGO_RIGHTS_APPROVED","公式ロゴの商用版下"],
 ["RBA_ESSENTIALS_PRICING_APPROVED","価格・原価・利益"],
 ["RBA_ESSENTIALS_TAX_APPROVED","税の取り扱い"],
 ["RBA_ESSENTIALS_SHIPPING_APPROVED","送料・配送条件"],
 ["RBA_ESSENTIALS_RETURNS_APPROVED","返品・キャンセル条件"],
 ["RBA_ESSENTIALS_SELLER_DISCLOSURE_APPROVED","法定の販売者表示"],
 ["RBA_ESSENTIALS_STRIPE_ACCOUNT_APPROVED","RBA Stripeの承認"],
 ["RBA_ESSENTIALS_STRIPE_PUBLIC_BRANDING_VERIFIED","RBAカード明細名・公開事業サイトの修正・検証"],
 ["RBA_ESSENTIALS_ORDER_OPERATIONS_READY","受注・発送担当の確認"],
 ["RBA_ESSENTIALS_LEDGER_MIGRATED","入金済み注文の記録"],
 ["RBA_ESSENTIALS_WEBHOOK_READY","Stripe署名通知のテスト"],
 ["RBA_ESSENTIALS_CONFIRMATION_NOTICE_READY","前払いの承諾・注文案内"],
 ["RBA_ESSENTIALS_ONE_MONTH_LEAD_TIME_APPROVED","約1か月納期の裏付け"],
 ["RBA_ESSENTIALS_PREORDER_ENABLED","最終受付スイッチ"],
] as const;
const itemStyle={display:"flex",gap:16,alignItems:"center",borderBottom:"1px solid #cbc6bd",padding:"16px 0",fontSize:13,lineHeight:1.7} as const;
export default async function EssentialsReadiness(){
  const db=await createClient();
  const {data:{user},error}=await db.auth.getUser();
  if(error||!user)notFound();
  const profile=await db.from("profiles").select("role").eq("id",user.id).maybeSingle();
  if(profile.error||(profile.data?.role!=="admin" && !await isRbaStoreOwner(user.id)))notFound();
  const cfg=getEssentialsPresaleConfig();
  const transactionalMailReady=getEssentialsNoticeConfig().configured;
  const env=process.env;
  const rbaManaged = env.RBA_ESSENTIALS_FULFILLMENT_MODE === "rba_managed";
  const rbaStripe=env.STRIPE_SECRET_KEY?await verifyEssentialsStripeAccount(env.STRIPE_SECRET_KEY):false;
  const rbaPublicBrand=env.STRIPE_SECRET_KEY?await verifyEssentialsStripePublicBranding(env.STRIPE_SECRET_KEY):false;
  const rbaWebhookDestinations=env.STRIPE_SECRET_KEY?await verifyEssentialsStripeWebhookDestinations(env.STRIPE_SECRET_KEY):false;
  const operatorHandoffReady=await essentialsFulfillmentCanAcceptOrders();
  const url=env.NEXT_PUBLIC_SUPABASE_URL,secret=env.SUPABASE_SERVICE_ROLE_KEY;
  let validDB=false;
  try{validDB=Boolean(url&&secret&&new URL(url).hostname==="ctngdzzorhzpdxswahzl.supabase.co");}
  catch{validDB=false;}
  const dbAdmin=validDB?createAdmin(url!,secret!,{auth:{persistSession:false,autoRefreshToken:false}}):null;
  const count=dbAdmin?await dbAdmin.from("rba_essentials_orders").select("order_id",{head:true,count:"exact"}):null;
  const checks=[
   {name:"Tシャツの税込価格",ok:cfg.unitPrices.tee!==null},
   {name:"上下セットの税込価格",ok:cfg.unitPrices.setup!==null},
   {name:"FIRST DROP限定・国内送料無料：0円",ok:cfg.shippingJPY===0},
   {name:"商品画像の権利・掲載内容の確認",ok:env.RBA_ESSENTIALS_PHOTOS_APPROVED==="true"},
   {name:"サイズ・素材・仕様から未確定の表記を解消",ok:essentialsHaveFinalSpecifications},
   {name:"申込受付期限",ok:Boolean(cfg.orderDeadline)},
   {name:"明示する発送期限",ok:Boolean(cfg.dispatchDeadline)},
   {name:"法定の販売事業者情報",ok:cfg.merchant.name.length>1&&cfg.merchant.address.length>8&&cfg.merchant.email.includes("@")&&cfg.merchant.phone.length>=8},
   {name:"返品・キャンセルの明示",ok:cfg.returns.length>=15&&cfg.cancellation.length>=15},
   {name:"承認済み規約バージョン",ok:Boolean(cfg.termsVersion)},
   {name:"RBA Stripeの実接続",ok:rbaStripe},
   {name:"RBA Stripeの事業サイト・カード明細名（実設定）",ok:rbaPublicBrand},
   {name:"Stripeが実際に署名付きWebhookへ配信する設定",ok:rbaWebhookDestinations},
   {name:"受注台帳への実接続",ok:Boolean(count&&!count.error)},
   {name:"注文承諾・発送通知の送信元ドメインとメールAPI",ok:transactionalMailReady},
   {name:rbaManaged?"RBA管理者の本人確認・製造委託先への引渡テスト":"製造担当ログインの実登録・権限",ok:operatorHandoffReady},
   {name:"Instagramカタログの公開承認（商品タグの審査とは別）",ok:env.RBA_ESSENTIALS_META_FEED_APPROVED==="true"},
  ];
  const operationGates = rbaManaged
    ? [
       ["RBA_ESSENTIALS_RBA_OPERATOR_ACCOUNT_VERIFIED","RBA管理者アカウントの本人確認"],
       ["RBA_ESSENTIALS_RBA_SUPPLIER_HANDOFF_VERIFIED","RBAによる外部製造先への安全な引渡しと報告のテスト"],
      ]
    : [
       ["RBA_ESSENTIALS_RISA_FULFILLMENT_ACCESS_VERIFIED","外部製造担当者の本人確認・ログイン権限"],
       ["RBA_ESSENTIALS_RISA_ORDER_HANDOFF_VERIFIED","入金から製造・発送情報の引渡しテスト"],
      ];
  const flags = [...gates, ...operationGates].map(([key,name])=>({key,name,ok:env[key]==="true"}));
  const total=checks.length+flags.length;
  const completed=checks.filter(x=>x.ok).length+flags.filter(x=>x.ok).length;
  return <SiteFrame locale="ja"><main style={{background:"#f2f0eb",color:"#191919",padding:"65px clamp(20px,5vw,90px) 105px",fontFamily:"Arial,sans-serif"}}>
   <div style={{maxWidth:1180,margin:"auto"}}>
    <header style={{borderBottom:"1px solid #aaa",paddingBottom:40}}>
     <p style={{fontSize:10,letterSpacing:".17em"}}>RBA ESSENTIALS / PRIVATE OPERATIONS</p>
     <h1 style={{fontFamily:"Georgia,serif",fontWeight:400,letterSpacing:"-.065em",lineHeight:1.05,fontSize:"clamp(48px,8vw,100px)",margin:"28px 0"}}>Release readiness.</h1>
     <p style={{fontSize:14,lineHeight:2,maxWidth:700,color:"#615b54"}}>実際の有料注文を開く前に、製造・品質・価格・法定表示・決済の確認項目を照合します。ステータスは運用環境の自己承認フラグであり、外部による品質認証ではありません。</p>
     <div style={{marginTop:27,display:"flex",alignItems:"center",gap:26,flexWrap:"wrap"}}>
       <strong style={{fontFamily:"Georgia,serif",fontSize:50,fontWeight:400}}>{completed} / {total}</strong>
       <span style={{fontSize:13}}>{cfg.ready?"設定上は受付可能。最終実注文テストと表示確認が必要です。":"現在の有料注文受付は停止中です。"}</span>
     </div>
    </header>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,400px),1fr))",gap:50,margin:"55px 0"}}>
     <section><h2 style={{fontFamily:"Georgia,serif",fontWeight:400,fontSize:36}}>Commercial terms.</h2>{checks.map(x=><div key={x.name} style={itemStyle}><span style={{minWidth:38,color:x.ok?"#36604d":"#8a6d3c"}}>{x.ok?"OK":"未了"}</span>{x.name}</div>)}</section>
     <section><h2 style={{fontFamily:"Georgia,serif",fontWeight:400,fontSize:36}}>Approval records.</h2>{flags.map(x=><div key={x.key} style={itemStyle}><span style={{minWidth:38,color:x.ok?"#36604d":"#8a6d3c"}}>{x.ok?"OK":"未了"}</span>{x.name}</div>)}</section>
    </div>
    <section style={{background:"#e0ddd5",padding:35,fontSize:13,lineHeight:2}}>
     <h2 style={{fontFamily:"Georgia,serif",fontWeight:400,fontSize:34}}>Order operations.</h2>
     <p><strong>運営方式：</strong>{rbaManaged?"RBAが販売・入金・注文管理・製造依頼・発送記録を一元管理。製造委託先のRBA IDログインは不要です。":"認証済み製造担当のアカウントで製作・発送工程を更新する方式です。"}</p>
     <p>受注台帳：{count&&!count.error?"接続済み・入金済み注文 "+String(count.count??0)+" 件":"接続の再確認が必要"}</p>
     <p>この画面は秘密鍵・顧客情報を表示しません。前払いの注文承諾メールと発送通知は、認証済み送信元・決済済み注文・送信状態を確認して処理します。送信サービスのAPI受理と実際の受信は別に検証してください。</p>
     <div style={{display:"flex",gap:22,flexWrap:"wrap",marginTop:26}}>
      <Link href="/ja/essentials/manage">注文管理 ↗</Link>
      <Link href="/ja/essentials/manage/reconciliation">Stripe入金・受注・製造タスクの照合 ↗</Link>
      <Link href="/ja/essentials/production">製作・発送管理 ↗</Link>
      <Link href="/ja/essentials/manage/fulfillment-access">外部スタッフにログイン権限を付与する場合（任意） ↗</Link>
      <Link href="/ja/essentials/manage/atelier">手書き試作・価格検証 ↗</Link>
      <Link href="/ja/essentials/legal">購入者向け表示 ↗</Link>
     </div>
    </section>
   </div>
  </main></SiteFrame>;
}
