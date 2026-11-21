import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = path => readFileSync(new URL("../"+path, import.meta.url), "utf8");

test("RBA-managed operational mode never requires a supplier login", () => {
  const fulfillment = read("lib/essentials-fulfillment-readiness.ts");
  const config = read("lib/essentials-commerce.ts");
  assert.match(fulfillment, /mode === "rba_managed"/);
  assert.match(fulfillment, /RBA_ESSENTIALS_RBA_OPERATOR_USER_ID/);
  assert.match(fulfillment, /getUserById\(operatorId\)/);
  assert.match(fulfillment, /data\.user\.id === operatorId/);
  assert.match(fulfillment, /RBA_ESSENTIALS_RBA_OPERATOR_EMAIL/);
  assert.match(fulfillment, /email_confirmed_at/);
  assert.match(fulfillment, /RBA_ESSENTIALS_RBA_SUPPLIER_HANDOFF_VERIFIED/);
  assert.match(fulfillment, /mode === "supplier_login"/);
  assert.match(fulfillment, /return false;/);
  assert.match(config, /fulfillmentMode === "rba_managed"/);
  assert.match(config, /fulfillmentGateApproved/);
  assert.match(config, /RBA_ESSENTIALS_RBA_OPERATOR_ACCOUNT_VERIFIED/);
  assert.match(config, /RBA_ESSENTIALS_RBA_SUPPLIER_HANDOFF_VERIFIED/);
});

test("commercial safeguards survive the RBA-managed switch", () => {
  const config = read("lib/essentials-commerce.ts");
  const checkout = read("app/api/commerce/essentials-preorder/route.ts");
  const stripe = read("lib/essentials-stripe.ts");
  assert.match(config, /"RBA_ESSENTIALS_PREORDER_ENABLED"/);
  assert.match(config, /"RBA_ESSENTIALS_RISA_FULFILLMENT_AGREEMENT_APPROVED"/);
  assert.match(config, /"RBA_ESSENTIALS_WEBHOOK_READY"/);
  assert.match(config, /"RBA_ESSENTIALS_RETURNS_APPROVED"/);
  assert.match(config, /"RBA_ESSENTIALS_ONE_MONTH_LEAD_TIME_APPROVED"/);
  assert.match(checkout, /verifyEssentialsStripeAccount/);
  assert.match(checkout, /verifyEssentialsStripeWebhookDestinations/);
  assert.match(checkout, /essentialsFulfillmentCanAcceptOrders/);
  assert.match(checkout, /423/);
  assert.match(stripe, /riotbasketballacademy\.com\/api\/commerce\/essentials-preorder-webhook/);
});

test("RBA administrator may manage manufacturing and shipping statuses", () => {
  const page = read("app/ja/essentials/production/page.tsx");
  const action = read("app/ja/essentials/production/actions.ts");
  const orderPage = read("app/ja/essentials/manage/page.tsx");
  const reference = read("docs/RBA_STORE_RBA_MANAGED_OPERATIONS_20261121.md");
  assert.match(page, /const isAdmin=profile\.data\?\.role==="admin"/);
  assert.match(action, /profile\.data\?\.role!=="admin"/);
  assert.match(action, /paid\.data\?\.payment_status!=="paid"/);
  assert.match(action, /tracking_reference/);
  assert.match(orderPage, /Stripe管理画面で確認/);
  assert.match(reference, /りささんのSupabase \/ RBA HOMECOURTアカウントは、\*\*RBA管理方式では不要\*\*/);
});

test("RBA STORE owner is narrowly pinned and cannot gain global HOMECOURT admin", () => {
  const owner = read("lib/essentials-store-owner.ts");
  const routeNames = [
    "app/ja/essentials/manage/page.tsx",
    "app/ja/essentials/manage/readiness/page.tsx",
    "app/ja/essentials/manage/notice-actions.ts",
    "app/ja/essentials/production/page.tsx",
    "app/ja/essentials/production/actions.ts",
    "app/ja/essentials/production/[orderId]/shipping/page.tsx",
  ];
  assert.match(owner, /RBA_ESSENTIALS_RBA_OPERATOR_USER_ID/);
  assert.match(owner, /RBA_ESSENTIALS_RBA_OPERATOR_EMAIL/);
  assert.match(owner, /data\.user\.id === userId|owner\.id === userId/);
  assert.match(owner, /email_confirmed_at/);
  assert.match(owner, /getUserById\(userId\)/);
  assert.doesNotMatch(owner, /update\(\{\s*role/);
  for (const p of routeNames) assert.match(read(p), /isRbaStoreOwner\(user\.id\)/, p);
});

test("store-only identity binding keeps Supabase member roles unchanged", () => {
  const owner = read("lib/essentials-store-owner.ts");
  const readiness = read("lib/essentials-fulfillment-readiness.ts");
  const config = read("lib/essentials-commerce.ts");
  assert.match(owner, /isRbaStoreOwner\(userId/);
  assert.match(owner, /RBA_ESSENTIALS_RBA_OPERATOR_EMAIL/);
  assert.match(owner, /RBA_ESSENTIALS_RBA_OPERATOR_USER_ID/);
  assert.match(owner, /email_confirmed_at/);
  assert.match(readiness, /RBA_ESSENTIALS_RBA_OPERATOR_EMAIL/);
  assert.match(config, /RBA_ESSENTIALS_RBA_OPERATOR_EMAIL/);
  assert.doesNotMatch(owner, /from\("profiles"\)\.update/);
  assert.doesNotMatch(readiness, /from\("profiles"\)\.update/);
});
