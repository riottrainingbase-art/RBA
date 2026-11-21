import type { Metadata } from "next";
import Stripe from "stripe";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import { verifyEssentialsStripeAccount } from "@/lib/essentials-stripe";

export const dynamic="force-dynamic";
export const metadata:Metadata={title:"RBA ESSENTIALS｜お支払い確認",robots:{index:false,follow:false}};
type Query={session_id?:string};
export default async function EssentialsPaymentComplete({searchParams}:{searchParams:Promise<Query>}){
  const {session_id}=await searchParams;
  let paid=false;
  let orderRef="";
  let deadline="";
  if(session_id && /^cs_(test_|live_)[A-Za-z0-9]{20,220}$/.test(session_id) && process.env.STRIPE_SECRET_KEY){
    try{
      const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);
      if(await verifyEssentialsStripeAccount(process.env.STRIPE_SECRET_KEY)){
        const s=await stripe.checkout.sessions.retrieve(session_id);
        paid=s.payment_status==="paid"&&s.mode==="payment"&&s.livemode&&s.metadata?.program==="rba_essentials_presale"&&s.currency==="jpy";
        if(paid){orderRef=s.metadata?.order_id||"";deadline=s.metadata?.deliver_by||s.metadata?.dispatch_by||"";}
      }
    }catch{/* Never claim success without Stripe server-side confirmation. */}
  }
  return <SiteFrame locale="ja"><main style={{background:"#f5f4f0",color:"#181817",minHeight:"75vh",padding:"100px 24px",fontFamily:"Arial,sans-serif"}}>
    <section style={{maxWidth:790,margin:"auto",textAlign:"center"}}>
      <p style={{fontSize:11,letterSpacing:".17em"}}>RBA ESSENTIALS / PAYMENT STATUS</p>
      <h1 style={{fontFamily:"Georgia,serif",fontWeight:400,letterSpacing:"-.07em",fontSize:"clamp(40px,7vw,84px)",margin:"35px 0"}}>{paid?"Thank you.":"Payment status."}</h1>
      {paid?<div><p style={{fontSize:19,lineHeight:1.9}}>お支払いを確認しました。</p><p style={{color:"#62615d",fontSize:14,lineHeight:2}}>RBA ESSENTIALS 先行販売へのお申込みありがとうございます。決済情報をもとに制作・発送の準備を進めます。お届け期限は <strong>{deadline}</strong> です。</p><p style={{fontSize:12,marginTop:35}}>ご注文照会番号：{orderRef}</p><p style={{fontSize:12,lineHeight:2,color:"#777"}}>決済明細はStripeからの通知等でご確認ください。注文確認や発送に関するお問い合わせは照会番号を添えてください。</p></div>:
      <div><p style={{fontSize:16,lineHeight:2}}>こちらの画面では、お支払い完了を確認できませんでした。</p><p style={{color:"#706d68",fontSize:13,lineHeight:2}}>お支払い方法によっては確認に時間がかかる場合があります。二重決済を避けるため、再度お支払いされる前にRBAへお問い合わせください。</p></div>}
      <div style={{display:"flex",justifyContent:"center",gap:25,flexWrap:"wrap",marginTop:45,fontSize:13}}><Link href="/ja/essentials">コレクションへ戻る ↗</Link><a href="mailto:riot.training.base@gmail.com?subject=RBA%20ESSENTIALS%20ORDER">お問い合わせ ↗</a></div>
    </section>
  </main></SiteFrame>;
}
