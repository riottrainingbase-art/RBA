import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {computeApparelEconomics,scenarios} from "../lib/apparel-business-economics.ts";

const store=readFileSync("app/ja/store/page.tsx","utf8");
const lineup=readFileSync("components/apparel-interest-path.tsx","utf8");
const admin=readFileSync("app/ja/store/manage/page.tsx","utf8");
const desk=readFileSync("components/apparel-business-desk.tsx","utf8");
const econ=readFileSync("lib/apparel-business-economics.ts","utf8");
const gate=readFileSync("lib/performance-tee-launch.ts","utf8");
const css=readFileSync("components/apparel-interest-path.module.css","utf8");
const adminCss=readFileSync("components/apparel-business-desk.module.css","utf8");

test("The original store release gate remains fail-closed",()=>{
  assert.match(store,/const checkoutUrl = ready/);
  assert.match(gate,/phase: "preparation"/);
  assert.match(gate,/confirmedShopifyProductUrl: null/);
  assert.match(gate,/approvedPrice: null/);
  assert.match(gate,/paidStorePlanConfirmed: false/);
  assert.match(gate,/successfulFulfillmentTestOrder: false/);
  assert.doesNotMatch(lineup,/checkout\.stripe\.com|buy\.stripe\.com|square\.link\/u\//);
});

test("The existing free interest form is reused without a new checkout",()=>{
  assert.match(store,/import \{ ApparelInterestPath \}/);
  assert.match(store,/<ApparelInterestPath \/>/);
  assert.match(lineup,/PERFORMANCE_TEE_INTEREST_FORM/);
  assert.match(lineup,/購入予約ではなく/);
  assert.match(lineup,/無料アンケートに回答する/);
  assert.match(lineup,/data-growth-id="store-apparel-interest"/);
});

test("No unapproved product or agency status is represented as a sale",()=>{
  assert.match(lineup,/正規販売条件を確認中/);
  assert.match(lineup,/日本販売権や代理店資格を取得したとの表示はしません/);
  assert.match(lineup,/製品検証中/);
  assert.match(lineup,/小ロット条件を照会中/);
  assert.match(lineup,/商品・価格・納期は未確定/);
});

test("Admin-only apparel economics does not enable checkout",()=>{
  assert.match(admin,/profile\.data\?\.role!=="admin"/);
  assert.match(admin,/ApparelBusinessDesk/);
  assert.match(desk,/ZERO NEW SUBSCRIPTION/);
  assert.match(desk,/実際の見積・注文・販売実績ではありません/);
  assert.match(desk,/販売許可・承認・決済有効化にはなりません/);
  assert.match(econ,/extraMonthlyFixedJpy:0/);
  assert.match(econ,/processingPercent>=100/);
  assert.match(econ,/contribution= revenue|contribution=revenue-procurement-fee/);
});

test("Free additions are mobile-friendly and accessible",()=>{
  assert.match(lineup,/aria-labelledby="rba-apparel-lineup"/);
  assert.match(lineup,/target="_blank" rel="noopener noreferrer"/);
  assert.match(css,/@media\(max-width:800px\)/);
  assert.match(css,/:focus-visible/);
  assert.match(adminCss,/@media\(max-width:620px\)/);
  assert.match(desk,/htmlFor="apparel-scenario"/);
});

test("Apparel unit economics includes per-order cost, payment fee and zero incremental subscription",()=>{
  const input=scenarios.tee.values;
  const actual=computeApparelEconomics(input);
  assert.equal(actual.revenue,4950);
  assert.equal(actual.monthlyContribution,actual.contribution*20);
  assert.equal(actual.breakEvenUnits,0);
  assert.ok(Math.abs(actual.contribution-(actual.revenue-actual.procurement-actual.fee))<0.000001);
  assert.ok(actual.suggestedRetailJpy>=0);
});

test("Apparel loss/invalid assumptions never appear profitable",()=>{
  const i=scenarios.shorts.values;
  const bad=computeApparelEconomics({...i,supplierJpy:100000});
  assert.ok(bad.contribution<0);
  assert.equal(bad.breakEvenUnits,null);
  assert.throws(()=>computeApparelEconomics({...i,processingPercent:100}));
  assert.throws(()=>computeApparelEconomics({...i,monthlyUnits:0.5}));
  assert.throws(()=>computeApparelEconomics({...i,importJpy:-1}));
});
