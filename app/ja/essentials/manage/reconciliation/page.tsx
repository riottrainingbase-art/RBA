import type { Metadata } from "next";
import Stripe from "stripe";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { isRbaStoreOwner } from "@/lib/essentials-store-owner";
import { SiteFrame } from "@/components/site-frame";
import { verifyEssentialsStripeAccount } from "@/lib/essentials-stripe";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "RBA STORE｜Stripe入金と受注台帳の照合（運営限定）",
  robots: { index: false, follow: false },
};

type Row = {
  id: string;
  orderRef: string;
  created: number;
  amount: number;
  state: "recorded" | "task_missing" | "not_recorded" | "not_paid_in_ledger";
  paymentIntent: string | null;
};

const storefrontProgram = new Set(["rba_essentials_presale", "rba_essentials_first_drop"]);
const expectedDatabase = "ctngdzzorhzpdxswahzl.supabase.co";

export default async function StoreReconciliation() {
  const session = await createClient();
  const {data:{user},error} = await session.auth.getUser();
  if(error || !user) notFound();
  const {data:profile,error:profileError} = await session
    .from("profiles").select("role").eq("id",user.id).maybeSingle();
  if(profileError || (profile?.role !== "admin" && !await isRbaStoreOwner(user.id)))
    notFound();

  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const databaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const databaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  let errorMessage = "";
  let rows: Row[] = [];
  let scanned = 0;
  let matchingPaid = 0;
  let morePages = false;

  if(!stripeSecret || !databaseUrl || !databaseKey) {
    errorMessage = "RBA専用のStripe・Supabase管理接続が未設定です。入金や注文は照合できません。";
  } else {
    try {
      const database = new URL(databaseUrl);
      if(database.protocol !== "https:" || database.hostname !== expectedDatabase ||
          database.username || database.password) throw Error("unexpected_database");
      if(!await verifyEssentialsStripeAccount(stripeSecret)) throw Error("unexpected_stripe_account");
      const stripe = new Stripe(stripeSecret);
      const admin = createServiceClient(databaseUrl,databaseKey,{
        auth:{persistSession:false,autoRefreshToken:false}
      });
      // Read-only inspection: list the latest 100 account-wide Checkout Sessions.
      // The result is NOT a complete history if Stripe has more than one page.
      const fetched = await stripe.checkout.sessions.list({limit:100});
      scanned = fetched.data.length;
      morePages = fetched.has_more;
      const paid = fetched.data.filter(s =>
        s.livemode && s.mode === "payment" && s.currency === "jpy" &&
        s.payment_status === "paid" &&
        storefrontProgram.has(s.metadata?.program || "")
      );
      matchingPaid = paid.length;
      const ids = paid.map(s=>s.id);
      if(ids.length) {
        const recorded = await admin.from("rba_essentials_orders")
          .select("order_id,stripe_checkout_session_id,payment_status")
          .in("stripe_checkout_session_id",ids);
        if(recorded.error) throw Error("ledger_read_failed");

        const lookup = new Map((recorded.data||[]).map(row=>[row.stripe_checkout_session_id,row]));
        const orderIds = (recorded.data||[]).filter(row=>row.payment_status==="paid").map(row=>row.order_id);
        let tasks = new Set<string>();
        if(orderIds.length) {
          const existing = await admin.from("rba_essentials_fulfillment_tasks")
            .select("order_id").in("order_id",orderIds);
          if(existing.error) throw Error("task_read_failed");
          tasks = new Set((existing.data||[]).map(row=>row.order_id));
        }
        rows = paid.map(s=>{
          const order = lookup.get(s.id);
          const state:Row["state"] = !order ? "not_recorded"
            : order.payment_status!=="paid" ? "not_paid_in_ledger"
            : !tasks.has(order.order_id) ? "task_missing" : "recorded";
          return {
            id:s.id,
            orderRef:s.metadata?.order_id || "",
            created:s.created,
            amount: s.amount_total || 0,
            state,
            paymentIntent:typeof s.payment_intent==="string"?s.payment_intent:null,
          };
        });
      }
    } catch {
      errorMessage = "Stripeまたは注文台帳の照合に失敗しました。欠落なしとは判定せず、設定と管理ログを確認してください。";
      rows = [];
    }
  }

  const mismatches=rows.filter(r=>r.state!=="recorded");
  const statuses:Record<Row["state"],string>={
    recorded:"入金・受注・製造タスク一致",
    not_recorded:"入金済／台帳未登録・要対応",
    not_paid_in_ledger:"支払状態不一致・要対応",
    task_missing:"受注あり／製造タスク未作成・要対応",
  };

  return <SiteFrame locale="ja"><main style={{
    minHeight:"75vh",background:"#f6f4ee",color:"#191919",
    padding:"55px clamp(20px,5vw,88px) 100px"
  }}>
    <div style={{maxWidth:1140,margin:"auto"}}>
      <p style={{fontSize:11,letterSpacing:".15em"}}>RBA STORE / PRIVATE PAYMENT RECONCILIATION</p>
      <h1 style={{fontFamily:"Georgia,serif",fontWeight:400,
        fontSize:"clamp(36px,5vw,66px)",lineHeight:1.1}}>
        入金と注文台帳の照合
      </h1>
      <p style={{maxWidth:860,lineHeight:2,fontSize:14}}>
        RBA名義Stripeの最近のCheckout Sessionを読み取り、実際の支払いがRBAの注文台帳と製造タスクに記録されているか照合します。
        データの自動補完・返金・再請求はしません。決済済みなのに注文がない場合は必ずRBAが個別に調査してください。
      </p>
      {errorMessage ? <p role="alert" style={{padding:20,background:"#eee2d9"}}>{errorMessage}</p> : <>
        <div style={{display:"flex",gap:35,flexWrap:"wrap",padding:"25px 0",borderBlock:"1px solid #bbb"}}>
          <p><strong>{scanned}</strong> 件 <small>Stripe直近取得セッション</small></p>
          <p><strong>{matchingPaid}</strong> 件 <small>アパレル入金済み</small></p>
          <p><strong>{mismatches.length}</strong> 件 <small>照合上の未整合</small></p>
        </div>
        {morePages ? <p role="status" style={{padding:15,background:"#eee7db"}}>
          Stripeの記録が100件を超えています。これは最新100セッションのみの部分照合です。
          未整合0件でも全期間の照合完了とは判定しないでください。
        </p> : null}
        {mismatches.length ? <p role="alert" style={{padding:18,background:"#eee2d9"}}>
          入金済みの未整合が検出されました。Stripe取引と署名Webhookの失敗履歴、台帳の登録内容を照合してください。
          購入者へ再購入を促したり、注文が記録される前に製造依頼を確定したりしないでください。
        </p> : null}
        <div style={{overflowX:"auto",marginTop:30}}>
          <table style={{borderCollapse:"collapse",width:"100%",minWidth:740,fontSize:13}}>
            <thead><tr>{["Stripe作成日時（日本時間）","Stripeセッション","税込支払額","注文照会番号","照合状態","決済明細"].map(label=>
              <th key={label} style={{textAlign:"left",padding:"14px 10px",borderBottom:"1px solid #999"}}>{label}</th>)}</tr></thead>
            <tbody>{rows.map(row=><tr key={row.id}>
              <td style={{padding:"14px 10px",borderBottom:"1px solid #ccc"}}>
                {new Date(row.created*1000).toLocaleString("ja-JP",{timeZone:"Asia/Tokyo"})}
              </td>
              <td style={{padding:"14px 10px",borderBottom:"1px solid #ccc",fontFamily:"monospace"}}>
                {row.id.slice(0,16)}…
              </td>
              <td style={{padding:"14px 10px",borderBottom:"1px solid #ccc"}}>
                {row.amount.toLocaleString("ja-JP")}円
              </td>
              <td style={{padding:"14px 10px",borderBottom:"1px solid #ccc"}}>
                {row.orderRef.slice(0,8)||"未付番"}
              </td>
              <td style={{padding:"14px 10px",borderBottom:"1px solid #ccc",
                fontWeight:row.state==="recorded"?400:700,
                color:row.state==="recorded"?"#355b48":"#8b3e29"}}>{statuses[row.state]}</td>
              <td style={{padding:"14px 10px",borderBottom:"1px solid #ccc"}}>
                {row.paymentIntent ? <a target="_blank" rel="noopener noreferrer"
                  href={`https://dashboard.stripe.com/payments/${encodeURIComponent(row.paymentIntent)}`}>
                  Stripeで確認
                </a> : "Stripeで照合"}
              </td>
            </tr>)}</tbody>
          </table>
          {!rows.length && <p style={{lineHeight:2}}>
            検索対象の最新セッションにはアパレルの入金記録がありません。
            期間外の決済や別経路の決済が存在しないことを保証しません。
          </p>}
        </div>
      </>}
      <p style={{fontSize:12,color:"#62615d",lineHeight:2,marginTop:25}}>
        本画面は注文者の氏名・住所・電話番号・メールアドレス、決済秘密鍵を表示しません。
        お支払い完了はStripeが正本です。注文台帳への反映、製造の受理、発送はそれぞれ別の証拠で確認します。
      </p>
      <div style={{display:"flex",gap:25,flexWrap:"wrap",marginTop:35}}>
        <Link href="/ja/essentials/manage">注文管理へ戻る</Link>
        <Link href="/ja/essentials/manage/payment-exceptions">入金済み・要確認案件へ</Link>
        <Link href="/ja/essentials/manage/readiness">販売準備の監査へ</Link>
      </div>
    </div>
  </main></SiteFrame>;
}
