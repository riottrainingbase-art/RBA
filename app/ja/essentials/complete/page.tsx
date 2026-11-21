import type { Metadata } from "next";
import Stripe from "stripe";
import Link from "next/link";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { SiteFrame } from "@/components/site-frame";
import { verifyEssentialsStripeAccount } from "@/lib/essentials-stripe";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "RBA STORE｜Stripe決済と注文記録の照合",
  robots: { index: false, follow: false },
};
type Query = { session_id?: string };
type PaymentResult = {
  paid: boolean;
  recorded: boolean;
  orderRef: string;
  deadline: string;
};
const HOST = "ctngdzzorhzpdxswahzl.supabase.co";

/**
 * A paid Stripe Checkout Session is evidence of payment, not of webhook delivery.
 * Never tell a buyer that production is underway before the RBA order ledger
 * contains a matching paid row. Duplicate payment attempts must be discouraged.
 */
async function verifyPaymentAndLedger(sessionId: string): Promise<PaymentResult> {
  const empty: PaymentResult = { paid: false, recorded: false, orderRef: "", deadline: "" };
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!/^cs_live_[A-Za-z0-9]{20,220}$/.test(sessionId) || !secret) return empty;
  try {
    if (!await verifyEssentialsStripeAccount(secret)) return empty;
    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid" || session.mode !== "payment" ||
        !session.livemode || session.currency !== "jpy" ||
        session.metadata?.program !== "rba_essentials_presale") return empty;

    const orderRef = session.metadata?.order_id || "";
    const deadline = session.metadata?.deliver_by || session.metadata?.dispatch_by || "";
    const paid: PaymentResult = { paid: true, recorded: false, orderRef, deadline };
    const dbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const dbKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!dbUrl || !dbKey || !/^[0-9a-f-]{36}$/i.test(orderRef)) return paid;

    try {
      const url = new URL(dbUrl);
      if (url.protocol !== "https:" || url.hostname !== HOST || url.username || url.password)
        return paid;

      const db = createServiceClient(dbUrl, dbKey, {auth:{persistSession:false,autoRefreshToken:false}});
      const {data,error} = await db.from("rba_essentials_orders")
        .select("order_id,stripe_checkout_session_id,payment_status")
        .eq("stripe_checkout_session_id",sessionId)
        .maybeSingle();

      // A missing/mismatched row must not be displayed as a completed order.
      paid.recorded = !error && !!data &&
        data.order_id === orderRef && data.stripe_checkout_session_id === sessionId &&
        data.payment_status === "paid";
      return paid;
    } catch {
      // The payment is proven. Ledger failures must not erase that fact.
      return paid;
    }
  } catch {
    // If Stripe or the ledger cannot be verified, never infer a paid/recorded state.
    return empty;
  }
}

export default async function EssentialsPaymentComplete({searchParams}:{searchParams:Promise<Query>}) {
  const {session_id} = await searchParams;
  const result = await verifyPaymentAndLedger(typeof session_id === "string" ? session_id : "");

  return <SiteFrame locale="ja"><main style={{
    background:"#f5f4f0",color:"#181817",minHeight:"75vh",
    padding:"100px 24px",fontFamily:"Arial,sans-serif"
  }}>
    <section style={{maxWidth:790,margin:"auto",textAlign:"center"}}>
      <p style={{fontSize:11,letterSpacing:".17em"}}>RBA STORE / PAYMENT & ORDER RECONCILIATION</p>
      <h1 style={{fontFamily:"Georgia,serif",fontWeight:400,letterSpacing:"-.07em",
        fontSize:"clamp(40px,7vw,84px)",margin:"35px 0"}}>
        {result.paid ? (result.recorded ? "Thank you." : "Payment verified.") : "Payment status."}
      </h1>
      {result.paid && result.recorded ? <div>
        <p style={{fontSize:19,lineHeight:1.9}}>Stripeでのお支払いと、RBAの注文台帳への登録を確認しました。</p>
        <p style={{color:"#62615d",fontSize:14,lineHeight:2}}>
          注文内容をRBAが確認した後、製造・検品・発送を手配します。
          お届け期限は <strong>{result.deadline}</strong> です。
          製造や発送の開始・完了をこの画面だけで保証するものではありません。
        </p>
        <p style={{fontSize:12,marginTop:35}}>ご注文照会番号：{result.orderRef}</p>
        <p style={{fontSize:12,lineHeight:2,color:"#777"}}>
          決済明細はStripeからの通知等でご確認ください。発送状況はRBAの正式な案内をご確認ください。
        </p>
      </div> : result.paid ? <div>
        <p style={{fontSize:19,lineHeight:1.9}}>Stripeでのお支払いを確認しました。</p>
        <p role="status" style={{fontSize:14,lineHeight:2,color:"#6a4833"}}>
          RBAの注文台帳への登録は現在照合中です。
          <strong>追加の決済・再注文は行わないでください。</strong>
          決済済みの情報をRBAが調査し、注文内容を確認します。
        </p>
        {result.orderRef ? <p style={{fontSize:12,marginTop:35}}>
          決済照会番号：{result.orderRef}
        </p> : null}
      </div> : <div>
        <p style={{fontSize:16,lineHeight:2}}>この画面では、お支払い状態を確認できませんでした。</p>
        <p style={{color:"#706d68",fontSize:13,lineHeight:2}}>
          反映までに時間がかかる場合や、一時的に照合できない場合があります。
          二重決済を避けるため、再度お支払いになる前にRBAへお問い合わせください。
        </p>
      </div>}
      <div style={{display:"flex",justifyContent:"center",gap:25,flexWrap:"wrap",
        marginTop:45,fontSize:13}}>
        <Link href="/ja/essentials">コレクションへ戻る</Link>
        <a href="mailto:riot.training.base@gmail.com?subject=RBA%20STORE%20Payment%20Verification">
          支払・注文照合のお問い合わせ
        </a>
      </div>
    </section>
  </main></SiteFrame>;
}
