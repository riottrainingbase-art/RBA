import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = path => readFileSync(new URL("../"+path, import.meta.url), "utf8");

test("Stripe hosted fallback restricts to latest audited prices and manufacturer sizes", () => {
  const webhook=read("app/api/commerce/essentials-payment-link-webhook/route.ts");
  assert.match(webhook, /plink_1UeCrqRXDnnSs6XNf9mnO2Te/);
  assert.match(webhook, /price_1UeCqERXDnnSs6XN2re7INMd/);
  assert.match(webhook, /plink_1UcRBHRXDnnSs6XNoHlBdpSQ/);
  assert.match(webhook, /price_1UcQ6jRXDnnSs6XNeJUiq622/);
  assert.doesNotMatch(webhook, /REVISED_TEE_PRICE|link===REVISED_TEE_LINK|amount!==\(link===TEE_LINK\?4900/);
  assert.match(webhook, /essentialsSizeIsAllowed\("tee",teeSize\)/);
  assert.match(webhook, /essentialsSizeIsAllowed\("hoodie",hoodieSize\)/);
  assert.match(webhook, /essentialsSizeIsAllowed\("pants",pantsSize\)/);
});

test("no paid order is committed with fabricated delivery terms or draft seller promises", () => {
  const webhook=read("app/api/commerce/essentials-payment-link-webhook/route.ts");
  assert.match(webhook, /m\?\.terms_state!=="approved"/);
  assert.match(webhook, /approvedDate\(dispatchBy\)/);
  assert.match(webhook, /approvedDate\(deliverBy\)/);
  assert.match(webhook, /deliverBy>latestPermittedArrival/);
  assert.match(webhook, /paid_without_approved_contract_terms_manual_reconciliation_required/);
  assert.match(webhook, /terms_version:termsVersion/);
  assert.match(webhook, /dispatch_by:dispatchBy/);
  assert.match(webhook, /deliver_by:deliverBy/);
  assert.doesNotMatch(webhook, /addDays\(arrivalBy,-4\)/);
  assert.doesNotMatch(webhook, /first_drop_20261116_pending_final_review/);
});

test("order ledger and notification maintain idempotent reconciliation", () => {
  const webhook=read("app/api/commerce/essentials-payment-link-webhook/route.ts");
  assert.match(webhook, /constructEvent\(await request\.text\(\),signature,webhook\)/);
  assert.match(webhook, /verifyEssentialsStripeAccount\(secret\)/);
  assert.match(webhook, /checkout\.session\.async_payment_succeeded/);
  assert.match(webhook, /onConflict:"stripe_checkout_session_id",ignoreDuplicates:true/);
  assert.match(webhook, /sendEssentialsBuyerAcceptance\(recorded\.data\.order_id\)/);
  assert.match(webhook, /session\.amount_total!==amount\*qty/);
});

test("ISO date validation is actual numeric ISO validation, not escaped literal regex",()=>{
  const webhook=read("app/api/commerce/essentials-payment-link-webhook/route.ts");
  const correct=String.raw`/^20\d{2}-\d{2}-\d{2}$/`;
  assert.ok(webhook.includes(correct));
  const date=/^20\d{2}-\d{2}-\d{2}$/;
  assert.ok(date.test("2026-12-20"));
  assert.ok(!date.test("2026-2-20"));
  assert.ok(!date.test("unverified"));
});
