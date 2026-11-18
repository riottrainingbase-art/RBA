import Stripe from "stripe";
import { NextResponse } from "next/server";
import {
  DAY_PASS_LABELS, DAY_PASS_PROGRAM, DAY_PASS_SITE_URL, DAY_PASS_STRIPE_ACCOUNT,
  DAY_PASS_TABLE, dayPassAdmin, dayPassInviteValid, dayPassPaymentsEnabled,
  findDayPassInvite,
} from "@/lib/okinawa-day-pass-payment";

export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "private, no-store", "Referrer-Policy": "no-referrer", "X-Content-Type-Options": "nosniff" };

function fail(message: string, status = 400) {
  return new NextResponse(message, { status, headers: { ...headers, "Content-Type": "text/plain; charset=utf-8" } });
}
function redirect(url: string) {
  return NextResponse.redirect(url, { status: 303, headers });
}
export async function GET() {
  return fail("正式申込者向けの決済は、保護者による確認操作が必要です。", 405);
}
export async function POST(request: Request) {
  // No anonymous checkout. RBA must first approve a guardian's individual invite.
  if (request.headers.get("origin") !== new URL(request.url).origin) return fail("Invalid origin.", 403);
  if (!dayPassPaymentsEnabled()) return fail("1日・放課後の決済受付はまだ開始していません。", 423);
  if (Number(request.headers.get("content-length") || 0) > 4096) return fail("Too large.", 413);
  const body = await request.formData().catch(() => null);
  if (!body) return fail("Invalid application.", 400);
  const token = body.get("token");
  if (typeof token !== "string" || !/^[a-f0-9]{64}$/.test(token)) return fail("有効な正式申込案内が必要です。", 403);
  if (body.get("terms_accepted") !== "yes" || body.get("adult_consent") !== "yes")
    return fail("保護者・成人本人による利用条件の確認が必要です。");

  const row = await findDayPassInvite(token);
  if (!row || !dayPassInviteValid(row)) return fail("申込案内の条件を確認できません。RBAにご相談ください。", 423);
  if (row.status === "paid" || row.status === "refunded" || row.status === "cancelled")
    return fail("この受付番号では再決済できません。支払済みの場合は二重払いをしないでください。", 409);
  if (row.status !== "approved" && row.status !== "checkout_open")
    return fail("申込内容の審査または決済処理中です。繰り返し操作せずRBAにご確認ください。", 409);

  const secret = process.env.STRIPE_SECRET_KEY!;
  const stripe = new Stripe(secret);
  const admin = dayPassAdmin();
  if (!admin) return fail("予約データに接続できません。", 503);
  try {
    // Prevent use of the other connected business's Stripe account.
    const result = await fetch("https://api.stripe.com/v1/account", {
      headers: { Authorization: "Bearer " + secret }, cache: "no-store",
    });
    const account: { id?: string } = result.ok ? await result.json() : {};
    if (account.id !== DAY_PASS_STRIPE_ACCOUNT) return fail("RBAの決済アカウントを確認できません。", 503);

    if (row.status === "checkout_open") {
      if (!row.checkout_session_id) return fail("既存の決済処理が確認できません。", 409);
      const prior = await stripe.checkout.sessions.retrieve(row.checkout_session_id);
      if (prior.status === "open" && prior.url && prior.payment_status !== "paid")
        return redirect(prior.url);
      return fail("以前の決済状態を確認中です。二重払いを避けるためRBAにお問い合わせください。", 409);
    }

    // Atomic claim blocks concurrent POSTs from creating two payable sessions.
    const now = new Date().toISOString();
    const claim = await admin.from(DAY_PASS_TABLE).update({
      status: "checkout_creating", terms_accepted_at: now, updated_at: now,
    }).eq("id", row.id).eq("status", "approved").select("id").maybeSingle();
    if (claim.error || !claim.data) return fail("申込状態が変更されています。二重決済せずRBAにご連絡ください。", 409);

    const metadata = {
      event: DAY_PASS_PROGRAM, plan: row.plan_code, application_ref: row.application_ref,
      selection_id: row.id, payment_stage: "full_prepay", terms_version: row.terms_version!,
    };
    // The DB and server config determine the exact 100% price; client cannot change it.
    const session = await stripe.checkout.sessions.create({
      mode: "payment", locale: "ja", customer_email: row.guardian_email,
      customer_creation: "always", client_reference_id: row.id,
      // Leave payment methods dynamic; Stripe determines eligible methods.
      line_items: [{ price_data: {
        currency: "jpy", unit_amount: row.amount_jpy, tax_behavior: "inclusive",
        product_data: { name: "RBA沖縄国際ユースキャンプ2026｜" + DAY_PASS_LABELS[row.plan_code as keyof typeof DAY_PASS_LABELS],
          description: "確認済み日帰り・放課後参加枠。参加費全額の事前一括払い。食事・宿泊・送迎は含みません。" },
      }, quantity: 1 }],
      metadata, payment_intent_data: { metadata },
      success_url: DAY_PASS_SITE_URL + "/ja/events/okinawa-international-camp-2026/day-pass/complete?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: DAY_PASS_SITE_URL + "/ja/events/okinawa-international-camp-2026/day-pass/payment?token=" + token,
      expires_at: Math.floor(Date.now() / 1000) + 3600,
    }, { idempotencyKey: "okinawa-2026-day-pass-" + row.id + "-full-v1" });
    if (!session.id || !session.url || new URL(session.url).hostname !== "checkout.stripe.com")
      return fail("決済画面を生成できません。", 503);
    const saved = await admin.from(DAY_PASS_TABLE).update({
      checkout_session_id: session.id, status: "checkout_open", updated_at: new Date().toISOString(),
    }).eq("id", row.id).eq("status", "checkout_creating").select("id").maybeSingle();
    if (saved.error || !saved.data) {
      try { await stripe.checkout.sessions.expire(session.id); } catch {/* no charge */ }
      return fail("お支払い情報の保存に失敗しました。RBAへお問い合わせください。", 503);
    }
    return redirect(session.url);
  } catch {
    // Never make a second session automatically after an uncertain network failure.
    return fail("決済処理を確認できませんでした。再決済せず、受付番号を添えてRBAへご連絡ください。", 503);
  }
}
