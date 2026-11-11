import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const manifest=readFileSync("lib/performance-tee-launch.ts","utf8");
const store=readFileSync("app/ja/store/page.tsx","utf8");
const css=readFileSync("app/ja/store/store.module.css","utf8");
const bio=readFileSync("app/ja/links/page.tsx","utf8");
const home=readFileSync("components/simple-japanese-home.tsx","utf8");

test("sale readiness defaults fail-closed, not active on trial / draft / placeholders",()=>{
  assert.match(manifest,/phase: "preparation"/);
  assert.match(manifest,/confirmedShopifyProductUrl: null/);
  assert.match(manifest,/approvedPrice: null/);
  assert.match(manifest,/approvedSizes: \[\]/);
  assert.match(manifest,/paidStorePlanConfirmed: false/);
  assert.match(manifest,/supplierFulfillmentVerified: false/);
  assert.match(manifest,/physicalSampleApproved: false/);
  assert.match(manifest,/actualSizesAndRetailPriceApproved: false/);
  assert.match(manifest,/taxShippingReturnsAndSellerDisclosuresConfirmed: false/);
  assert.match(manifest,/successfulFulfillmentTestOrder: false/);
  assert.match(manifest,/Object\.values\(state\.evidence\)\.every\(Boolean\)/);
  assert.match(manifest,/safePerformanceTeeProductUrl\(state\.confirmedShopifyProductUrl\)/);
  assert.match(manifest,/approvedPrice \?\? 0\) > 0/);
  assert.match(manifest,/approvedSizes\.length > 0/);
});

test("checkout is restricted to the verified RBA Shopify product URL",()=>{
  assert.match(manifest,/url\.protocol !== "https:"/);
  assert.match(manifest,/hqg7dh-wp\.myshopify\.com/);
  assert.match(manifest,/url\.search \|\| url\.hash \|\| url\.username \|\| url\.password/);
  assert.ok(manifest.includes("products") && manifest.includes("[a-z0-9]"),"Shopify product URL must use a controlled product path");
  assert.doesNotMatch(store,/buy\.stripe\.com|checkout\.stripe\.com|69\.00/);
  assert.match(store,/const checkoutUrl = ready/);
  assert.match(store,/checkoutUrl \? <a className=\{styles\.button\}/);
  assert.match(store,/store-performance-buy/);
  assert.match(store,/checkoutUrl \? <a className=\{styles\.button\}[\s\S]*?: <>/);
});

test("waiting users see only the real non-binding survey and clear caveats",()=>{
  assert.match(manifest,/https:\/\/form\.jotform\.com\/262947168647069/);
  assert.match(store,/発売前アンケートに回答する/);
  assert.match(store,/無料・購入予約ではありません/);
  assert.match(store,/実際の商品写真ではありません/);
  assert.match(store,/XS・3XLを含む登録内容は旧案の仮設定/);
  assert.match(store,/国・地域のみで販売/);
  assert.match(store,/返品・サイズ交換の条件/);
  assert.match(store,/Riot Basketball Academy公式/);
});

test("Instagram and official site link to the single verified RBA store destination",()=>{
  assert.match(bio,/href:"\/ja\/store",id:"store"/);
  assert.match(home,/href="\/ja\/store" data-growth-id="home-performance-tee"/);
  assert.match(store,/data-growth-id="store-performance-survey"/);
  assert.match(store,/data-growth-id="store-buy-bottom"/);
});

test("mobile and accessible product page design",()=>{
  assert.match(store,/aria-labelledby="store-title"/);
  assert.match(store,/aria-labelledby="faq-title"/);
  assert.match(store,/target="_blank" rel="noopener noreferrer"/);
  assert.match(css,/@media\(max-width:820px\)/);
  assert.match(css,/@media\(max-width:420px\)/);
  assert.match(css,/:focus-visible/);
  assert.match(css,/prefers-reduced-motion/);
});
