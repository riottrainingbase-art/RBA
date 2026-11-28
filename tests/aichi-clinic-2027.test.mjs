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
