import assert from "node:assert/strict";
import {test} from "node:test";
import {readFileSync,existsSync} from "node:fs";
const read=path=>readFileSync(new URL("../"+path,import.meta.url),"utf8");

test("RBA GLOBAL has reciprocal English and Japanese pages",()=>{
 for(const path of ["app/international/services/page.tsx","app/ja/international/services/page.tsx"])assert.ok(existsSync(new URL("../"+path,import.meta.url)),path);
 for(const data of [read("app/international/services/page.tsx"),read("app/ja/international/services/page.tsx")]){
  assert.match(data,/canonical/);assert.match(data,/\/international\/services/);assert.match(data,/\/ja\/international\/services/);
 }
 assert.match(read("app/sitemap.ts"),/\/ja\/international\/services/);
 assert.match(read("components/international-platform.tsx"),/RBA GLOBAL SERVICES|Global services/);
});
test("Free qualification never creates an unapproved payment",()=>{
 const en=read("components/global-services-landing.tsx");
 const ja=read("components/global-services-landing-ja.tsx");
 for(const src of [en,ja]){
  assert.match(src,/263221936704052/);
  assert.match(src,/263218488425060/);
  assert.doesNotMatch(src,/createCheckoutSession|stripe\.checkout|\/api\/commerce\/checkout/);
 }
 assert.match(en,/NO CHILDREN'S PERSONAL DETAILS/);
 assert.match(ja,/未成年/);
 assert.match(ja,/書面/);
});
test("Operational planning separates coaching from travel, and RIZEHOPE fee from service fees",()=>{
 const ops=read("docs/business/rba-global-sales-operations-2027.md");
 const pricing=read("docs/business/rba-global-pricing-scenarios-2027.md");
 for(const text of ["JBA","旅行","書面","未成年","INVOICED"]) assert.ok(ops.includes(text),text);
 assert.match(pricing,/RIZEHOPE/);
 assert.match(pricing,/仮説/);
 assert.match(pricing,/127000/);
});
