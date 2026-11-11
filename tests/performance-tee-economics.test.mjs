import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {computeTeeEconomics,defaultTeeEconomics} from "../lib/performance-tee-economics.ts";

const page=readFileSync("app/ja/store/manage/page.tsx","utf8");
const client=readFileSync("components/tee-economics-desk.tsx","utf8");
const styles=readFileSync("components/tee-economics-desk.module.css","utf8");

function close(a,b){assert.ok(Math.abs(a-b)<0.000001,"Expected "+a+" to equal "+b)}

test("base scenario includes production, shipping, card fee, allowances and monthly plan",()=>{
  const result=computeTeeEconomics(defaultTeeEconomics);
  close(result.supplierCostJpy,3056.6);
  close(result.paymentFeeJpy,156.2);
  close(result.contributionJpy,887.2);
  close(result.monthlyOperatingProfitJpy,8458);
  assert.equal(result.breakEvenOrders,6);
  assert.equal(result.suggestedRetailForTargetJpy,5000);
});

test("customer-paid shipping raises gross revenue but also incurs payment processing",()=>{
  const updated=computeTeeEconomics({...defaultTeeEconomics,customerShippingJpy:550});
  close(updated.grossCollectedJpy,4950);
  close(updated.paymentFeeJpy,175.725);
  close(updated.contributionJpy,1417.675);
  assert.equal(updated.breakEvenOrders,4);
});

test("large landed costs must not disguise negative margins",()=>{
  const out=computeTeeEconomics({...defaultTeeEconomics,baseProductUsd:100});
  assert.ok(out.contributionJpy<0);
  assert.equal(out.breakEvenOrders,null);
});

test("zero orders or zero prices do not produce fictitious income",()=>{
  const zero=computeTeeEconomics({...defaultTeeEconomics,plannedOrders:0});
  close(zero.monthlyOperatingProfitJpy,-4850);
  const free=computeTeeEconomics({...defaultTeeEconomics,retailJpy:0});
  assert.ok(free.contributionJpy<0);
  assert.equal(free.contributionRate,0);
});

test("reject negative numbers, invalid rates, invalid currency and fractional orders",()=>{
  assert.throws(()=>computeTeeEconomics({...defaultTeeEconomics,customerShippingJpy:-1}));
  assert.throws(()=>computeTeeEconomics({...defaultTeeEconomics,paymentPercent:100}));
  assert.throws(()=>computeTeeEconomics({...defaultTeeEconomics,usdToJpy:0}));
  assert.throws(()=>computeTeeEconomics({...defaultTeeEconomics,plannedOrders:0.5}));
});

test("merchant simulator is restricted by actual server-side RBA role check",()=>{
  assert.match(page,/import \{ createClient \} from "@\/lib\/supabase\/server"/);
  assert.match(page,/db\.auth\.getUser\(\)/);
  assert.match(page,/from\("profiles"\)\.select\("role"\)/);
  assert.match(page,/profile\.data\?\.role!=="admin"\)notFound\(\)/);
  assert.match(page,/robots:\{index:false,follow:false\}/);
  assert.match(page,/dynamic="force-dynamic"/);
  assert.doesNotMatch(client,/process\.env|service_role|SHOPIFY_ADMIN_TOKEN/);
  assert.doesNotMatch(client,/fetch\(|graphql_mutation|update_product/);
});

test("all figures are clearly editable assumptions, not an automatic published price",()=>{
  assert.match(client,/編集して精査/);
  assert.match(client,/入力結果はShopifyの価格や在庫へ反映されず/);
  assert.match(client,/4\.95米ドルは公式Tシャツ送料表/);
  assert.match(client,/SOL’S 11939/);
  assert.match(client,/商品ごとの紐付け/);
  assert.match(client,/反映されず/);
  assert.match(styles,/@media\(max-width:560px\)/);
  assert.match(styles,/:focus-visible/);
});
