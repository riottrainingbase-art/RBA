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
  assert.match(webhook, /manualReview\("unapproved_contract_terms"\)/);
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

test("a paid but nonconforming Stripe session goes to private exception inbox",()=>{
 const webhook=read("app/api/commerce/essentials-payment-link-webhook/route.ts");
 const queue=read("lib/essentials-payment-exceptions.ts");
 const screen=read("app/ja/essentials/manage/payment-exceptions/page.tsx");
 const migration=read("supabase/migrations/20261121115844_rba_essentials_paid_session_exception_inbox_20261121.sql");
 assert.match(webhook,/quarantinePaidEssentialsSession\(event,session,reason\)/);
 assert.match(webhook,/manualReview\("unsupported_payment_link"\)/);
 assert.match(webhook,/manualReview\("unapproved_contract_terms"\)/);
 assert.match(webhook,/manualReview\("invalid_garment_sizes"\)/);
 assert.match(webhook,/paid_exception_record_failed/);
 assert.match(queue,/ignoreDuplicates:true/);
 assert.match(queue,/payment_status!=="paid"/);
 assert.match(queue,/checkout_session_id:session\.id/);
 assert.match(queue,/rba_essentials_payment_exceptions/);
 assert.match(migration,/ENABLE ROW LEVEL SECURITY/);
 assert.match(migration,/REVOKE ALL ON public\.rba_essentials_payment_exceptions FROM PUBLIC,anon,authenticated/);
 assert.match(migration,/GRANT SELECT,INSERT,UPDATE ON public\.rba_essentials_payment_exceptions TO service_role/);
 assert.match(screen,/isRbaStoreOwner\(user\.id\)/);
 assert.match(screen,/review_state/);
 assert.doesNotMatch(screen, /refunds\.create|upsert\(/);
});
