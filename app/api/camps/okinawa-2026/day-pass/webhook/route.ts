import Stripe from "stripe";
import { NextResponse } from "next/server";
import {
  DAY_PASS_PROGRAM, DAY_PASS_TABLE, dayPassAdmin, approvedAmount,
} from "@/lib/okinawa-day-pass-payment";

export const dynamic = "force-dynamic";
const safeHeaders = { "Cache-Control": "no-store" };
const respond = (payload: object, status = 200) => NextResponse.json(payload, { status, headers: safeHeaders });

export async function POST(request: Request) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.OKINAWA_2026_DAY_PASS_WEBHOOK_SECRET;
  const admin = dayPassAdmin();
  if (!stripeSecret || !webhookSecret || !admin) return respond({ error: "not_configured" }, 503);
  const signature = request.headers.get("stripe-signature");
  if (!signature) return respond({ error: "signature_missing" }, 400);
  const stripe = new Stripe(stripeSecret);
  let event: Stripe.Event;
  try { event = stripe.webhooks.constructEvent(await request.text(), signature, webhookSecret); }
  catch { return respond({ error: "signature_invalid" }, 400); }

  const allowed = ["checkout.session.completed", "checkout.session.async_payment_succeeded",
    "checkout.session.async_payment_failed", "checkout.session.expired"];
  if (!allowed.includes(event.type)) return respond({ received: true });
  const session = event.data.object as Stripe.Checkout.Session;
  if (session.metadata?.event !== DAY_PASS_PROGRAM) return respond({ received: true });

  // A failed asynchronous payment or an expired session is NOT a participant confirmation.
  // Place the invitation on hold instead of automatically starting a second charge.
  if (event.type === "checkout.session.async_payment_failed" || event.type === "checkout.session.expired") {
    if (!event.livemode || !session.livemode || !session.client_reference_id || !session.id)
      return respond({ error: "unexpected_payment_failure" }, 422);
    const { error } = await admin.from(DAY_PASS_TABLE)
      .update({ status: "hold", updated_at: new Date().toISOString() })
      .eq("id", session.client_reference_id)
      .eq("checkout_session_id", session.id)
      .eq("status", "checkout_open");
    return error ? respond({ error: "payment_hold_update_failed" }, 503) : respond({ received: true });
  }
  if (!event.livemode || !session.livemode || session.mode !== "payment" || session.payment_status !== "paid"
      || session.currency !== "jpy" || session.metadata.payment_stage !== "full_prepay"
      || !session.client_reference_id || typeof session.amount_total !== "number")
    return respond({ error: "unexpected_payment" }, 422);

  const { data: record, error: lookupError } = await admin.from(DAY_PASS_TABLE)
    .select("id,program_code,application_ref,plan_code,amount_jpy,status,terms_version,checkout_session_id,guardian_email,paid_at")
    .eq("id", session.client_reference_id)
    .eq("checkout_session_id", session.id)
    .maybeSingle();
  if (lookupError || !record) return respond({ error: "payment_reference_unmatched" }, 503);
  if (record.status === "paid" && record.paid_at) return respond({ received: true, duplicate: true });
  if (record.status !== "checkout_open" || record.program_code !== DAY_PASS_PROGRAM
      || record.plan_code !== session.metadata.plan
      || record.application_ref !== session.metadata.application_ref
      || record.terms_version !== session.metadata.terms_version
      || record.amount_jpy !== session.amount_total
      || approvedAmount(record.plan_code) !== record.amount_jpy)
    return respond({ error: "payment_details_conflict" }, 503);

  const paidAt = new Date().toISOString();
  const { data: updated, error: updateError } = await admin.from(DAY_PASS_TABLE)
    .update({
      status: "paid", paid_at: paidAt, updated_at: paidAt,
      payment_intent_id: typeof session.payment_intent === "string" ? session.payment_intent : null,
    })
    .eq("id", record.id).eq("status", "checkout_open")
    .eq("checkout_session_id", session.id).select("id").maybeSingle();
  if (updateError || !updated) return respond({ error: "payment_status_update_failed" }, 503);
  // No automatic "confirmed participant" email here: organizer must still validate the paid record
  // against the Jotform enquiry and guardian consent, and send one confirmation.
  return respond({ received: true });
}
export async function GET() { return respond({ error: "method_not_allowed" }, 405); }
