import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const lib = read("lib/okinawa-day-pass-payment.ts");
const checkout = read("app/api/camps/okinawa-2026/day-pass/payment/route.ts");
const webhook = read("app/api/camps/okinawa-2026/day-pass/webhook/route.ts");
const page = read("app/ja/events/okinawa-international-camp-2026/day-pass/payment/page.tsx");
const event = read("app/ja/events/okinawa-international-camp-2026/page.tsx");
const application = read("app/ja/events/okinawa-international-camp-2026/apply/page.tsx");

test("day pass pricing is server-side, disabled until explicitly enabled and approved", () => {
  assert.match(lib, /OKINAWA_2026_DAY_PASS_PAYMENTS_ENABLED/);
  assert.match(lib, /=== "true"/);
  assert.match(lib, /OKINAWA_2026_DAY_PASS_APPROVED_AMOUNTS_JPY/);
  assert.match(lib, /guardian_verified_at/);
  assert.match(lib, /venue_verified_at/);
  assert.match(lib, /terms_version/);
  assert.match(lib, /invite_expires_at/);
  assert.match(checkout, /row.status !== "approved"/);
  assert.match(checkout, /dayPassInviteValid\(row\)/);
});

test("checkout is 100% prepaid, private invite only, account-verified and atomic", () => {
  assert.match(checkout, /request.headers.get\("origin"\)/);
  assert.match(checkout, /terms_accepted/);
  assert.match(checkout, /adult_consent/);
  assert.match(checkout, /stripe.checkout.sessions.create/);
  assert.match(checkout, /unit_amount: row.amount_jpy/);
  assert.match(checkout, /mode: "payment"/);
  assert.match(checkout, /payment_method_types: \["card"\]/);
  assert.match(checkout, /"checkout_creating"/);
  assert.match(checkout, /idempotencyKey/);
  assert.match(checkout, /DAY_PASS_STRIPE_ACCOUNT/);
  assert.doesNotMatch(checkout, /unit_amount:\s*\d{4,}/);
});

test("signed webhook checks full paid amount and session identity", () => {
  assert.match(webhook, /webhooks.constructEvent/);
  assert.match(webhook, /session.payment_status !== "paid"/);
  assert.match(webhook, /record.amount_jpy !== session.amount_total/);
  assert.match(webhook, /checkout_session_id/);
  assert.match(webhook, /payment_intent_id/);
  assert.match(webhook, /record.status === "paid"/);
  assert.match(page, /全額前払い/);
  assert.match(page, /支払うことに同意します/);
  assert.match(page, /canPay/);
});

test("one-day enquiry remains free and 3-day checkout untouched", () => {
  assert.match(event, /form.jotform.com\/263095015591053/);
  assert.match(application, /OkinawaCampCheckout/);
  assert.match(application, /OkinawaResidentPrices/);
  assert.doesNotMatch(event, /https:\/\/checkout\.stripe\.com/);
});
