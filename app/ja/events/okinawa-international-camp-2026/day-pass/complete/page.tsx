import Stripe from "stripe";
import { SiteFrame } from "@/components/site-frame";
import { DAY_PASS_PROGRAM, DAY_PASS_TABLE, dayPassAdmin } from "@/lib/okinawa-day-pass-payment";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = {
  title: "沖縄キャンプ｜Stripe決済の確認",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

type PaymentState = "stripe_paid" | "processing" | "unpaid" | "unknown";

async function readPaymentState(value: unknown): Promise<PaymentState> {
  // A Checkout session ID is a bearer-like secret. Never print it or the parent's data.
  if (typeof value !== "string" || !/^cs_live_[A-Za-z0-9]{20,200}$/.test(value))
    return "unknown";
  const key = process.env.STRIPE_SECRET_KEY;
  const admin = dayPassAdmin();
  if (!key || !admin) return "unknown";

  try {
    const session = await new Stripe(key).checkout.sessions.retrieve(value);
    if (!session.livemode || session.id !== value || session.mode !== "payment" ||
        session.metadata?.event !== DAY_PASS_PROGRAM ||
        session.metadata?.payment_stage !== "full_prepay" ||
        session.currency !== "jpy" || !session.client_reference_id) return "unknown";

    const { data: row, error } = await admin.from(DAY_PASS_TABLE)
      .select("checkout_session_id,program_code,plan_code,amount_jpy,application_ref,terms_version,status,paid_at")
      .eq("id", session.client_reference_id).eq("checkout_session_id", value).maybeSingle();
    if (error || !row ||
        row.checkout_session_id !== session.id ||
        row.program_code !== DAY_PASS_PROGRAM ||
        row.plan_code !== session.metadata.plan ||
        row.application_ref !== session.metadata.application_ref ||
        row.terms_version !== session.metadata.terms_version ||
        row.amount_jpy !== session.amount_total) return "unknown";

    // Stripe is authoritative for whether a card payment has succeeded.
    // The Supabase signed webhook will separately update the internal ledger.
    if (session.payment_status === "paid" && session.status === "complete")
      return "stripe_paid";
    if (row.status === "paid" && row.paid_at) return "processing";
    if (session.status === "open" || session.payment_status === "unpaid")
      return "unpaid";
    return "processing";
  } catch {
    return "unknown";
  }
}

export default async function DayPassComplete({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const state = await readPaymentState(session_id);
  const textByState = {
    stripe_paid: {
      title: "Stripeでのお支払いを確認しました",
      detail: "お支払いはStripe側で成功しています。RBAで入金情報と参加者情報を照合し、会場・保護者引渡しなどの最終条件を確認した後、参加に関するご案内をお送りします。お支払い済みでも、最終参加確定メールとは別です。",
    },
    processing: {
      title: "お支払いの確認を進めています",
      detail: "決済状況を確認中です。現時点では参加の最終確定ではありません。重複してお支払いせず、RBAからの案内をお待ちください。",
    },
    unpaid: {
      title: "お支払いは完了していません",
      detail: "Stripe上で支払い完了が確認されていません。処理中の可能性もあるため、このページから新たな請求は作成しません。RBAに状況をお問い合わせください。",
    },
    unknown: {
      title: "決済情報を安全に確認できませんでした",
      detail: "URLが不完全か、システムの確認が必要です。新たな決済をせず、RBAへお問い合わせください。",
    },
  };
  const copy = textByState[state];

  return <SiteFrame locale="ja"><main style={{maxWidth:650,margin:"0 auto",padding:"48px 24px 96px"}}>
    <p style={{fontSize:12,letterSpacing:"0.14em"}}>RBA / OKINAWA CAMP 2026</p>
    <h1 style={{fontSize:"clamp(24px,4.5vw,38px)",margin:"18px 0"}}>{copy.title}</h1>
    <p style={{lineHeight:1.9}}>{copy.detail}</p>
    <p style={{borderLeft:"4px solid #ad6b13",padding:"12px 16px",background:"#fff8ed",lineHeight:1.85}}>
      <strong>二重決済を防ぐため、同じ参加費を再度支払わないでください。</strong>
      お支払いの確認には、保護者のお名前と申込時のメールアドレスが必要です。カード番号・セキュリティコードは送らないでください。
    </p>
    <p>問い合わせ先：<a href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a></p>
    <p><a href="/ja/events/okinawa-international-camp-2026">キャンプ公式ページへ戻る →</a></p>
  </main></SiteFrame>;
}
