import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
test("Aichi event date and time are consistent",()=>{
 const src=read("lib/aichi-clinic-2027.ts");
 assert.ok(src.includes("2027-02-23"));assert.ok(src.includes("9:00〜17:00"));
 assert.equal(new Date("2027-02-23T00:00:00+09:00").toLocaleDateString("en-US",{weekday:"long",timeZone:"Asia/Tokyo"}),"Tuesday");
});
test("Aichi is discoverable without opening registration",()=>{
 for(const p of ["components/simple-japanese-home.tsx","components/localized-schedule.tsx","components/opportunity-explorer.tsx","components/localized-payments.tsx","app/ja/instagram/page.tsx"]) assert.ok(read(p).includes("AichiClinic"),p);
});
test("registration and payment are explicitly closed",()=>{
 const root="app/ja/events/aichi-clinic-2027/";
 for(const p of ["apply/page.tsx","payment/page.tsx"]){
 const src=read(root+p);assert.ok(src.includes("受付"));assert.ok(!src.includes("buy.stripe.com"));assert.ok(!src.includes("form.jotform.com"));
 }
 const src=read(root+"page.tsx");assert.ok(src.includes("正式募集と決済は開始していません"));assert.ok(src.includes('event.path+"/apply"'));assert.ok(src.includes('event.path+"/payment"'));
});

test("approved early-bird and regular prices have one source",()=>{
 const src=read("lib/aichi-clinic-2027.ts");assert.ok(src.includes("early: 6600, regular: 7700"));assert.ok(src.includes("early: 11000, regular: 13200"));assert.ok(src.includes("2027-01-31T23:59:59+09:00"));
});

test("checkout is server priced and gated; webhook reconciles only paid sessions",()=>{const p=read("lib/aichi-clinic-payments.ts");for(const k of ["AICHI_CLINIC_PAYMENT_ENABLED","AICHI_CLINIC_VENUE_CONFIRMED","AICHI_CLINIC_CAPACITY","AICHI_CLINIC_WEBHOOK_SECRET"])assert.ok(p.includes(k));const checkout=read("app/api/commerce/aichi-clinic-checkout/route.ts");assert.ok(checkout.includes("unit_amount:p.amount"));assert.ok(checkout.includes("reserve_aichi_clinic"));assert.ok(!checkout.includes("payment_method_types"));const hook=read("app/api/commerce/aichi-clinic-webhook/route.ts");assert.ok(hook.includes("constructEvent"));assert.ok(hook.includes("checkout.session.async_payment_succeeded"));assert.ok(hook.includes('session.payment_status==="paid"'));});

test("Aichi single registration form preserves selected price and consent",()=>{const form=read("components/aichi-application-form.tsx");assert.equal((form.match(/<form\b/g)||[]).length,1);assert.ok(form.includes('name="plan"'));assert.ok(form.includes('name="amount" value={choice?.amount??""}'));assert.ok(form.includes('name="accepted"'));assert.ok(form.includes('/ja/cancellation'));assert.ok(read("app/ja/events/aichi-clinic-2027/apply/page.tsx").includes("payable?<AichiApplicationForm"));});
