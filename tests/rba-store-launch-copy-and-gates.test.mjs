import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read = path => readFileSync(new URL("../"+path,import.meta.url),"utf8");

test("RBA STORE differentiates confirmed retail prices and uncertain physical specifications",()=>{
 const collection=read("app/ja/essentials/page.tsx");
 const guide=read("app/ja/essentials/guide/page.tsx");
 const products=read("lib/rba-essentials.ts");
 assert.match(collection,/WHITE TEE税込6,600円/);
 assert.match(collection,/BLACK SETUP税込19,800円/);
 assert.match(collection,/実寸・製造品質・納期・返品条件は最終確認中/);
 assert.doesNotMatch(collection,/素材・サイズ・価格・製造・発送時期は検証中/);
 assert.match(guide,/フーディー：S／M／L／XL／XXL/);
 assert.match(guide,/パンツ：M／L／XL/);
 assert.match(products,/CGのパンツはワイド型/);
});

test("free interest registration is prominent while the sale stays locked",()=>{
 const page=read("app/ja/essentials/page.tsx");
 const config=read("lib/essentials-commerce.ts");
 assert.match(page,/無料で発売案内を受け取る/);
 assert.match(page,/ESSENTIALS_INTEREST_FORM/);
 assert.match(page,/commerce\.ready/);
 assert.match(config,/"RBA_ESSENTIALS_PREORDER_ENABLED"/);
 assert.match(config,/"RBA_ESSENTIALS_RISA_FULFILLMENT_AGREEMENT_APPROVED"/);
 assert.match(config,/RBA_ESSENTIALS_WEBHOOK_READY/);
});

test("real operator email is validated with whitespace-safe regex",()=>{
 const owner=read("lib/essentials-store-owner.ts");
 const readiness=read("lib/essentials-fulfillment-readiness.ts");
 const commerce=read("lib/essentials-commerce.ts");
 const validLiteral=String.raw`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`;
 for (const [name,text] of [["owner",owner],["readiness",readiness],["commerce",commerce]]) {
   assert.ok(text.includes(validLiteral),name+" must contain the correct regex");
   assert.ok(!text.includes(String.raw`/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/`),name+" must not contain double-escaped classes");
 }
 const email=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 assert.ok(email.test("riot.training.base@gmail.com"));
 assert.ok(!email.test("some name@invalid.com"));
 assert.ok(!email.test("not-an-email"));
});
