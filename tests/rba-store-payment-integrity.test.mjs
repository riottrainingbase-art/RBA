import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const read = path => readFileSync(new URL("../"+path, import.meta.url),"utf8");

test("Stripe payment status and RBA order creation are separate verified facts",()=>{
  const done = read("app/ja/essentials/complete/page.tsx");
  assert.match(done,/verifyEssentialsStripeAccount/);
  assert.match(done,/session\.payment_status !== "paid"/);
  assert.match(done,/metadata\?\.program !== "rba_essentials_presale"/);
  assert.match(done,/stripe_checkout_session_id/);
  assert.match(done,/data\.payment_status === "paid"/);
  assert.match(done,/result\.paid && result\.recorded/);
  assert.match(done,/追加の決済・再注文は行わないでください/);
  assert.match(done,/Ledger failures must not erase that fact/);
});

test("private Stripe reconciliation reads paid sessions, ledger, and production tickets",()=>{
  const page=read("app/ja/essentials/manage/reconciliation/page.tsx");
  assert.match(page,/session\.auth\.getUser\(\)/);
  assert.match(page,/isRbaStoreOwner\(user\.id\)/);
  assert.match(page,/verifyEssentialsStripeAccount/);
  assert.match(page,/stripe\.checkout\.sessions\.list\(\{limit:100\}\)/);
  assert.match(page,/payment_status === "paid"/);
  assert.match(page,/stripe_checkout_session_id/);
  assert.match(page,/rba_essentials_fulfillment_tasks/);
  assert.match(page,/not_recorded/);
  assert.match(page,/task_missing/);
  assert.match(page,/100セッションのみの部分照合/);
  assert.doesNotMatch(page,/refunds\.create|paymentIntents\.create|upsert\(/);
});

test("official checkout only requires its own dedicated signed webhook",()=>{
  const stripe=read("lib/essentials-stripe.ts");
  const start=stripe.indexOf("export async function verifyEssentialsStripeWebhookDestinations");
  assert.ok(start>=0);
  const fn=stripe.slice(start);
  assert.match(fn,/essentials-preorder-webhook/);
  assert.doesNotMatch(fn,/"https:\/\/riotbasketballacademy\.com\/api\/commerce\/essentials-payment-link-webhook"/);
  assert.match(fn,/checkout\.session\.completed/);
  assert.match(fn,/checkout\.session\.async_payment_succeeded/);
});

test("apparel database manufacturer sizes align with checkout + signed webhook",()=>{
  const migration=read("supabase/migrations/20261121113401_rba_essentials_checkout_size_integrity_20261121.sql");
  const sizes=read("lib/essentials-size-options.ts");
  const form=read("components/essentials-preorder-form.tsx");
  const route=read("app/api/commerce/essentials-preorder/route.ts");
  const webhook=read("app/api/commerce/essentials-preorder-webhook/route.ts");
  assert.match(migration,/hoodie_size IN \('S','M','L','XL','XXL'\)/);
  assert.match(migration,/pants_size IN \('M','L','XL'\)/);
  assert.match(sizes,/ESSENTIALS_HOODIE_SIZES = \["S", "M", "L", "XL", "XXL"\]/);
  assert.match(sizes,/ESSENTIALS_PANTS_SIZES = \["M", "L", "XL"\]/);
  assert.match(form,/ESSENTIALS_HOODIE_SIZES\.map/);
  assert.match(form,/ESSENTIALS_PANTS_SIZES\.map/);
  assert.match(route,/essentialsSizeIsAllowed/);
  assert.match(webhook,/essentialsSizeIsAllowed/);
});

test("checkout protects terms consent and browser double submission",()=>{
  const form=read("components/essentials-preorder-form.tsx");
  const route=read("app/api/commerce/essentials-preorder/route.ts");
  assert.match(form,/submissionStarted\.current/);
  assert.match(form,/preventDuplicateSubmission/);
  assert.match(form,/onSubmit=\{preventDuplicateSubmission\}/);
  assert.match(form,/accept_preorder/);
  assert.match(form,/accept_terms/);
  assert.doesNotMatch(form,/name="accept_development_use"/);
  assert.match(route,/form\.get\("accept_preorder"\)!=="yes"/);
  assert.match(route,/form\.get\("accept_terms"\)!=="yes"/);
  assert.doesNotMatch(route,/form\.get\("accept_development_use"\)/);
  assert.match(route,/getEssentialsPresaleConfig/);
  assert.match(route,/verifyEssentialsStripeWebhookDestinations/);
  assert.match(route,/essentialsFulfillmentCanAcceptOrders/);
});
