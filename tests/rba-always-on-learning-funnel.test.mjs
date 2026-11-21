import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const read = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
const hub = read("app/ja/learning/page.tsx");
const guide = read("app/ja/materials/page.tsx");
const material = read("app/ja/materials/u12-fundamentals/page.tsx");
const plus = read("components/homecourt-plus-page.tsx");
const coach = read("definitive-content/ja/d-hub-coaches.html");
const support = read("app/ja/support/page.tsx");
const after = read("app/ja/after-clinic/page.tsx");
const sitemap = read("app/sitemap.ts");
const homepage = read("components/simple-japanese-home.tsx");
const checkout = read("app/api/commerce/checkout/[option]/route.ts");
const guideAccess = read("lib/digital-material-access.ts");
const materialRls = read("supabase/migrations/20260929153500_add_secure_digital_materials.sql");

test("Japanese 24-hour storefront uses existing routes and official brand only", () => {
  assert.ok(hub.includes("/ja/learning"));
  assert.ok(hub.includes('src="/rba-logo-original.jpg"'));
  assert.ok(hub.includes('<SiteFrame locale="ja">'));
  assert.ok(hub.includes("/ja/materials/u12-fundamentals"));
  assert.ok(hub.includes("/ja/homecourt-plus"));
  assert.ok(hub.includes("/ja/d-hub/coaches"));
  assert.ok(hub.includes("https://note.com/rba_official/membership/join"));
  assert.ok(hub.includes("/ja/support#apply"));
  assert.ok(hub.includes("https://form.jotform.com/263213962901051"));
});

test("Three same-price offers are not conflated or re-billed", () => {
  assert.ok(hub.includes("税込・1回購入"));
  assert.ok(hub.includes("税込・毎月"));
  assert.ok(hub.includes("単品教材は毎月の課金になりません"));
  assert.ok(hub.includes("既存のSquare月額購読"));
  assert.ok(hub.includes("追加決済"));
  assert.ok(hub.includes("別々の月額サービス"));
  assert.ok(hub.includes("毎月自動更新"));
  assert.ok(hub.includes("月11,000円"));
});

test("Free education is optional and does not trigger subscriptions", () => {
  assert.ok(hub.includes("/ja/journal/coaches"));
  assert.ok(hub.includes("/ja/after-clinic"));
  assert.ok(hub.includes("https://form.jotform.com/262858264882068"));
  assert.ok(hub.includes("登録だけで購入・有料会員にはなりません"));
  assert.ok(hub.includes("配信停止"));
  assert.ok(!hub.includes("buy.stripe.com/"));
  assert.ok(!hub.includes("checkout.stripe.com/"));
});

test("One-time material purchase stays gated by login, protected checkout and RLS", () => {
  assert.ok(guide.includes("getDigitalMaterial"));
  assert.ok(material.includes("U12_OFFER_OPTION"));
  assert.ok(checkout.includes("auth.getUser()"));
  assert.ok(checkout.includes('rba-checkout-gateway'));
  assert.ok(checkout.includes('data.decision !== "allowed"'));
  assert.ok(guideAccess.includes('supabase.auth.getUser()'));
  assert.ok(materialRls.includes("private.is_global_admin()"));
  assert.ok(materialRls.includes("po.user_id = (select auth.uid())"));
  assert.ok(materialRls.includes("po.status in ('paid','confirmed','fulfilled')"));
});

test("All existing source entry points and sitemap route to the compare page", () => {
  for (const entry of [guide, plus, coach, after, support, sitemap, homepage]) {
    assert.ok(entry.includes("/ja/learning"), "Missing learning funnel link");
  }
});

test("RBA never promises official certification, unauthorized content or checkout", () => {
  assert.ok(hub.includes("JBA・FIBA等の公認"));
  assert.ok(hub.includes("未成年者"));
  assert.ok(hub.includes("決済額・更新・解約条件"));
  assert.ok(hub.includes("別の有料プランへ自動加入"));
  assert.ok(hub.includes("複数人ライセンスを自動販売・自動許諾"));
});
