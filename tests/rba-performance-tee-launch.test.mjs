import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { collectionCheckout, collectionRelease } from "../lib/store-collection-release.ts";

const manifest=readFileSync("lib/performance-tee-launch.ts","utf8");
const store=readFileSync("app/ja/store/page.tsx","utf8");
const bio=readFileSync("app/ja/links/page.tsx","utf8");
const instagram=readFileSync("app/ja/instagram/page.tsx","utf8");
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

test("legacy Shopify remains restricted; approved collection uses only the exact verified RBA Stripe links",()=>{
  assert.match(manifest,/url\.protocol !== "https:"/);
  assert.match(manifest,/hqg7dh-wp\.myshopify\.com/);
  assert.match(manifest,/url\.search \|\| url\.hash \|\| url\.username \|\| url\.password/);
  assert.ok(manifest.includes("products") && manifest.includes("[a-z0-9]"),"Shopify product URL must use a controlled product path");
  assert.equal(collectionRelease.stripeAccount,"acct_1UGdxZRXDnnSs6XN");
  assert.equal(collectionRelease.products.tee.amount,6600);
  assert.equal(collectionRelease.products.setup.amount,19800);
  assert.equal(collectionRelease.shippingCountry,"JP");
  assert.equal(collectionRelease.shippingYen,0);
  assert.equal(collectionCheckout("tee"),"https://buy.stripe.com/aFa7sN6ab8vy1Mp9gr7EQ1Q");
  assert.equal(collectionCheckout("setup"),"https://buy.stripe.com/bJe4gB1TVh241Mp3W77EQ1P");
  for(const key of Object.keys(collectionRelease.evidence)) assert.equal(collectionCheckout("tee",{...collectionRelease.evidence,[key]:false}),null);
  for(const url of ["https://example.com/",collectionRelease.products.setup.link,collectionRelease.products.tee.link+"?x=1"]) assert.equal(collectionCheckout("tee",collectionRelease.evidence,url),null);
  assert.doesNotMatch(store,/buy\.stripe\.com|checkout\.stripe\.com|69\.00/);
  assert.match(store,/teeCheckout\?<a href=\{teeCheckout\}/);
  assert.match(store,/setupCheckout\?<a href=\{setupCheckout\}/);
  assert.match(store,/購入受付準備中/);
});

test("legacy survey remains separate and collection discloses approved preorder terms",()=>{
  assert.match(manifest,/https:\/\/form\.jotform\.com\/262947168647069/);
  assert.doesNotMatch(store,/発売前アンケート|262947168647069/);
  for(const text of ["仕上がりイメージ","日本国内送料は無料","全額前払い","注文から3週間","到着後8日以内","お客様都合の返送料はお客様負担","不良・誤配送はRBA負担","販売者：Riot Basketball Academy"]) assert.ok(store.includes(text));
  assert.deepEqual(collectionRelease.products.tee.sizes,["S","M","L","XL"]);
  assert.deepEqual(collectionRelease.products.setup.pants,["M","L","XL"]);
});

test("Instagram and official site link to the single verified RBA store destination",()=>{
  assert.match(bio,/href:"\/ja\/store",id:"store"/);
  assert.match(home,/href="\/ja\/store" data-growth-id="home-performance-tee"/);
  assert.match(instagram,/path:"\/ja\/store",id:"store"/);
  assert.match(store,/data-growth-id="store-collection-tee-buy"/);
  assert.match(store,/data-growth-id="store-collection-setup-buy"/);
});

test("mobile and accessible product page design",()=>{
  assert.match(store,/aria-labelledby="collection-title"/);
  assert.match(store,/<details><summary>商品・配送・返品について/);
  assert.match(store,/target="_blank" rel="noopener noreferrer"/);
  assert.match(store,/@media\(max-width:680px\)/);
  assert.match(store,/grid-template-columns:1fr/);
  assert.match(store,/:focus-visible/);
});
