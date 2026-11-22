import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const base = "app/ja/events/kobe-boys-u14-exchange-2027/";
test("Kobe U14 public landing pages accept interest only", () => {
  const ja = read(base + "page.tsx");
  const en = read("app/events/kobe-boys-u14-exchange-2027/page.tsx");
  assert.match(ja, /263188088558069/);
  assert.match(ja, /263188782905066/);
  assert.match(ja, /263187713938065/);
  assert.match(en, /263187713938065/);
  assert.match(ja, /無料の参加意向登録のみ/);
  assert.match(en, /non-binding expressions of interest only/);
});
test("Kobe U14 payment buttons are code-locked independent of environment", () => {
  assert.match(read(base + "checkout/page.tsx"), /const active = false;/);
  const united = read(base + "united/page.tsx");
  assert.match(united, /const checkoutReady = false;/);
  assert.match(united, /100,000円/);
  assert.match(united, /50,000円/);
});
test("All Kobe U14 payment endpoints fail closed, with no Stripe or DB calls", () => {
  for (const path of [
    "app/api/commerce/kobe-u14-checkout/route.ts",
    "app/api/commerce/kobe-u14-united-payment/route.ts",
    "app/api/commerce/kobe-u14-united-webhook/route.ts"
  ]) {
    const src = read(path);
    assert.doesNotMatch(src, /from ["']stripe["']|checkout\.sessions\.create|createClient\(/);
    assert.match(src, /async function POST\(\)/);
    assert.match(src, /status: (423|503)/);
  }
});
test("Payment success URL cannot claim paid status", () => {
  const src = read(base + "complete/page.tsx");
  assert.match(src, /決済受付は行っていません/);
  assert.doesNotMatch(src, /from ["']stripe["']/);
});
