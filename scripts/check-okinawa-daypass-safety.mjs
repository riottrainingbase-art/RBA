#!/usr/bin/env node
/**
 * Static safety contract for Okinawa 2026 Day Pass.
 * Does NOT create a Checkout session, charge a card or call Stripe.
 * Release reviewers must also do signed webhook and payment tests in a safe environment.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const file = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const gate = file("lib/okinawa-day-pass-payment.ts");
const checkout = file("app/api/camps/okinawa-2026/day-pass/payment/route.ts");
const webhook = file("app/api/camps/okinawa-2026/day-pass/webhook/route.ts");
const ui = file("app/ja/events/okinawa-international-camp-2026/day-pass/payment/page.tsx");
const confirm = file("app/ja/events/okinawa-international-camp-2026/day-pass/complete/page.tsx");
const interests = file("components/okinawa-day-pass-options.tsx");
const intake = file("app/ja/events/okinawa-international-camp-2026/apply/page.tsx");
const checks = [];
const test = (name, predicate) => {
  assert.ok(predicate, "Okinawa day-pass safety check failed: " + name);
  checks.push(name);
};
test("Exact Stripe account", gate.includes('acct_1UGdxZRXDnnSs6XN'));
test("Explicit payment release switch", gate.includes('OKINAWA_2026_DAY_PASS_PAYMENTS_ENABLED') && gate.includes('=== "true"'));
test("Independent webhook readiness switch", gate.includes('OKINAWA_2026_DAY_PASS_WEBHOOK_READY'));
test("Published terms version gate", gate.includes("OKINAWA_2026_DAY_PASS_TERMS_VERSION"));
test("Live-mode secret key gate", gate.includes('/^(sk|rk)_live_/.test('));
test("Amounts controlled server-side and not by browser", gate.includes("OKINAWA_2026_DAY_PASS_APPROVED_AMOUNTS_JPY") && checkout.includes("unit_amount: row.amount_jpy"));
test("Facility confirmation only after 22 November", gate.includes("2026-11-23T00:00:00+09:00"));
test("Private invitation token hash", gate.includes('crypto.subtle.digest("SHA-256"') && gate.includes("invite_token_sha256"));
test("Reject unsolicited payment POST", checkout.includes('request.headers.get("origin")') && checkout.includes('return fail("Invalid origin.", 403)'));
test("Explicit guardian and refund terms", checkout.includes('body.get("terms_accepted")') && checkout.includes('body.get("adult_consent")'));
test("No anonymous payment link", checkout.includes('return fail("有効な正式申込案内が必要です。"'));
test("No duplicate payment after paid/refunded/cancelled", checkout.includes('row.status === "paid"') && checkout.includes('row.status === "refunded"') && checkout.includes('row.status === "cancelled"'));
test("Atomic checkout lock", checkout.includes('status: "checkout_creating"') && checkout.includes('.eq("status", "approved")'));
test("Stripe idempotency", checkout.includes("idempotencyKey:"));
test("Stripe live-mode checkout only", checkout.includes("!session.livemode"));
test("Prices explicitly tax inclusive", checkout.includes('tax_behavior: "inclusive"'));
test("Only customer-bound payment", checkout.includes("customer_email: row.guardian_email") && checkout.includes("client_reference_id: row.id"));
test("Full prepayment only", checkout.includes('payment_stage: "full_prepay"'));
test("Webhook signed and amount matched", webhook.includes("constructEvent(") && webhook.includes("record.amount_jpy !== session.amount_total"));
test("Webhook only marks paid after Stripe paid", webhook.includes('session.payment_status !== "paid"') && webhook.includes('status: "paid"'));
test("Checkout return verifies live Stripe session and matching ledger amount", confirm.includes('session.payment_status === "paid"') && confirm.includes("row.amount_jpy !== session.amount_total") && confirm.includes("session.metadata?.event !== DAY_PASS_PROGRAM"));
test("Checkout return does not auto-confirm participant", confirm.includes("最終参加確定メールとは別です") && confirm.includes("RBAで入金情報と参加者情報を照合"));
test("Approved net day capacity required", gate.includes("OKINAWA_2026_DAY_PASS_APPROVED_NEW_SLOTS_BY_DATE") && checkout.includes("approvedNewSlotsByDay()") && checkout.includes("DAY_PASS_DATES"));
test("Venue capacity checked on final checkout POST", checkout.includes("現在の受入枠を超えるため") && checkout.includes(".in(\"status\", [\"approved\", \"checkout_creating\", \"checkout_open\", \"paid\"])"));
const issue = file("scripts/okinawa-daypass-issue-invite.mjs");
test("Issue invite requires facility, guardian and existing payments signoff", ["venue_schedule_confirmed","staffing_confirmed","handoff_confirmed","existing_payments_reconciled"].every(flag => issue.includes(flag)));
test("Invite tool only creates atomic DB reservations", issue.includes('db.rpc("reserve_okinawa_2026_daypass"') && !issue.includes("db.from(TABLE).insert("));
test("Operator approval and after-cutoff required", issue.includes('OKINAWA_DAYPASS_OPERATOR_APPROVAL') && issue.includes('Date.now() >= VALID_FROM'));
test("Two-day venues are allocated for both days", issue.includes('PLAN_DAYS') && issue.includes('p_daily_capacity:capacity'));
test("All required safety attestations reach the atomic RPC", issue.includes("...Object.fromEntries(checks.map(check => [check, true]))"));
test("Route remains closed without price, venue capacity and webhook config", gate.includes('OKINAWA_2026_DAY_PASS_APPROVED_AMOUNTS_JPY') && gate.includes('OKINAWA_2026_DAY_PASS_APPROVED_NEW_SLOTS_BY_DATE') && gate.includes('OKINAWA_2026_DAY_PASS_WEBHOOK_READY'));
test("No public payment URL on interest cards", interests.includes("https://form.jotform.com/263217090103041") && !interests.includes("buy.stripe.com") && !interests.includes("checkout.stripe.com"));
test("Existing 3-day plan component preserved", intake.includes("<OkinawaResidentPrices/>") && intake.includes('<OkinawaResidentPrices residence="japan"/>'));
test("Private payment page non-indexed", ui.includes("index: false"));
console.log("PASS: " + checks.length + " Okinawa day-pass static safety checks. No payment created.");
