import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read = path => readFileSync(new URL("../"+path,import.meta.url),"utf8");
const reg = read("lib/okinawa-camp-registration.ts");
const pricing = read("lib/okinawa-camp-pricing.ts");
const route = read("app/api/camps/okinawa-2026/domestic/route.ts");
const event = read("app/ja/events/okinawa-international-camp-2026/page.tsx");
const apply = read("app/ja/events/okinawa-international-camp-2026/apply/page.tsx");
const cards = read("components/okinawa-resident-prices.tsx");
const flow = read("components/okinawa-camp-checkout.tsx");
const kagoshima = read("app/ja/events/kagoshima-clinic-2026-11-29/page.tsx");
const kagoshimaRoute = read("app/api/clinics/kagoshima-20261129/checkout/route.ts");
test("domestic checkout uses only existing four approved links and published deadline",()=>{
 for(const id of ["14A28t2XZcLO0IlcsD7EQ17","8x27sNbuv5jmezb64f7EQ18","28EeVf5679zCdv71NZ7EQ1n","5kQ7sNgOPcLO8aN1NZ7EQ1o"]) assert.ok(reg.includes(id));
 assert.ok(pricing.includes("2026-12-22T09:00:00+09:00"));
 assert.match(route,/Date\.now\(\) >= Date\.parse\(ONLINE_PAYMENT_END\)/);
 assert.match(route,/residence !== "okinawa" && residence !== "japan"/);
 assert.match(route,/plan !== "day" && plan !== "housing"/);
 assert.match(route,/OKINAWA_RESIDENT_CHECKOUT_URLS : OKINAWA_DOMESTIC_CHECKOUT_URLS/);
 assert.doesNotMatch(route,/stripe\.charges|paymentIntents\.create|checkout\.sessions\.create/);
 assert.match(cards,/domesticCampCheckoutPath\(residence,"day"\)/);
 assert.match(cards,/domesticCampCheckoutPath\(residence,"housing"\)/);
 assert.match(flow,/domesticCampCheckoutPath/);
 assert.match(cards,/日本円（JPY）/);
});
test("mobile dock links to plan selection, never bypasses consent",()=>{
 for(const page of [event,apply]) {assert.equal((page.match(/className=\{styles\.checkoutDock\}/g)||[]).length,1);assert.match(page,/accepting && <aside/);}
 assert.match(kagoshima,/!afternoonClosed && <aside/);
 assert.match(kagoshima,/href="#entry"/);
 assert.match(kagoshima,/action="\/api\/clinics\/kagoshima-20261129\/checkout"/);
 assert.match(kagoshimaRoute,/guardian/);
 assert.match(kagoshimaRoute,/terms/);
});
test("top has four distinct routes and impact reporting is not fabricated",()=>{
 const home=read("components/simple-japanese-home.tsx");
 for(const label of ["参加する","学ぶ","購入する","支援する"]) assert.ok(home.includes(label));
 assert.ok(home.includes('href="/ja/impact"'));
 assert.ok(read("app/ja/sponsors/page.tsx").includes('href="/ja/impact"'));
 assert.ok(read("components/platform-pages.tsx").includes("実際の配分額や比率ではありません"));
});
