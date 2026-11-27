import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const page=readFileSync("components/taipei-development-clinic-2026.tsx","utf8");
const form=readFileSync("components/taipei-clinic-2026-inquiry.tsx","utf8");
const source=readFileSync("components/taipei-clinic-data.ts","utf8");
const overview=readFileSync("components/taiwan-official.tsx","utf8");
const routes=[
 "app/ja/events/taipei-development-clinic-2026/page.tsx",
 "app/zh-tw/events/taipei-development-clinic-2026/page.tsx",
 "app/events/taipei-development-clinic-2026/page.tsx"
];
test("Dec 11–13 venue-booked sessions match latest SPARTANS note",()=>{
 assert.match(source,/date: "2026-12-11", start: "18:30", end: "20:00"/);
 assert.match(source,/date: "2026-12-12", start: "16:00", end: "18:00"/);
 assert.match(source,/date: "2026-12-13", start: "14:00", end: "16:00"/);
 for(const s of ["w3bASjVYfQydDGJUA","weaVAQf3qdHuh4KM8","t8X2yJrcNz5MEhbW7"])assert.ok(page.includes(s));
 for(const s of ["Tianmu","Neihu","Linkou","2026-12-11","2026-12-12","2026-12-13"])assert.ok(page.includes(s));
});
test("SPARTANS solely owns event enquiry; no RBA payment link",()=>{
 assert.match(page,/hi@spartans\.com\.tw/);
 assert.match(form,/mailto:hi@spartans\.com\.tw/);
 assert.match(page,/hbl\.tw\/line/);
 assert.match(overview,/hbl\.tw\/line/);
 assert.doesNotMatch(page,/book\.stripe\.com|riot\.training\.base@gmail\.com/i);
 assert.doesNotMatch(form,/book\.stripe\.com|riot\.training\.base@gmail\.com/i);
 assert.match(page,/NOT confirmed for this special RBA clinic/);
 assert.match(page,/NT\$1,150/);
});
test("Three-language routes have dedicated URLs",()=>{
 for(const path of routes){
  const s=readFileSync(path,"utf8");
  assert.match(s,/TaipeiClinic2026/);
  assert.match(s,/taipei\.riotbasketballacademy\.com/);
 }
 assert.match(page,/繁體中文/);
 assert.match(page,/日本語/);
 assert.match(page,/English/);
});
test("No unconfirmed December payment or registration claim",()=>{
 assert.doesNotMatch(page,/checkout: {enabled: true}/);
 assert.match(page,/special RBA clinic/);
 assert.match(form,/not a confirmed booking or payment/);
 assert.match(page,/SPARTANS/);
});
