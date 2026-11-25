import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
const home=read("components/simple-japanese-home.tsx");
const css=read("components/simple-japanese-home.module.css");
test("three distinct first-screen destinations",()=>{
  const nav=home.split('aria-label="目的を選ぶ"')[1].split("</nav>")[0];
  const links=[...nav.matchAll(/href="#([^"]+)"/g)].map(m=>m[1]);
  assert.deepEqual(links,["home-programmes","home-learning","home-supporters"]);
  for(const id of links)assert.ok(home.includes('id="'+id+'"'));
});
test("only established service pages and explicitly verified advertising checkout",()=>{
  for(const path of ["/ja/materials/u12-fundamentals","/ja/d-hub/coaches","/ja/homecourt-plus","/ja/supporters","/ja/support/terms","/ja/opportunities"])assert.ok(home.includes(path));
  assert.doesNotMatch(home,/\/api\/commerce\/checkout|\/ja\/24h|\/ja\/learning|\/ja\/store|torstenRegistrationUrl/);
  assert.deepEqual([...home.matchAll(/https:\/\/buy\.stripe\.com\/[^"]+/g)].map(m=>m[0]),["https://buy.stripe.com/cNibJ35678vy0Il64f7EQ1u?locale=ja"]);
  assert.match(home,/https:\/\/form\.jotform\.com\/262498803883068/);
  assert.match(home,/\/ja\/my-homecourt\/app\/plus/);
  assert.match(home,/note\.com\/rba_official\/membership\/join/);
  assert.match(home,/263243557140049/);
  assert.match(home,/再購入せず/);
  assert.match(home,/無料希望登録や相談は参加確定・決済ではありません/);
});
test("event dates and unresolved projects are guarded",()=>{
  assert.match(home,/Asia\/Tokyo/);
  assert.match(home,/!p.registrationClosed && p.startDate>today && isProgrammeActive\(p\)/);
  assert.doesNotMatch(home,/chiba-development-camp-2027|nikaho-clinic-2027|saga-winter-20261228/);
  assert.match(home,/佐賀の年末開催予定/);
  assert.match(home,/href="\/ja\/business"/);
  assert.doesNotMatch(home,/<main\b/);
});
test("brand, mobile and focus are explicit",()=>{
  assert.match(css,/#2454d8/);
  assert.match(css,/-webkit-text-fill-color:#fff/);
  assert.match(css,/:focus-visible/);
  assert.match(css,/@media\(max-width:760px\)/);
});

test("founder is prominent without replacing the three primary actions",()=>{
  assert.ok(home.indexOf('id="home-organisation"') < home.indexOf('id="home-programmes"'));
  assert.match(home,/masato-nishio-on-court\.webp/);
  assert.match(home,/東北選抜・国体/);
  assert.match(home,/2026年9月 RBA公式資料/);
  const profile=read("components/founder-profile.tsx");
  assert.match(profile,/現行の資格登録・更新状況/);
  assert.match(profile,/RBA International Profile 2026/);
});

test("sponsor checkout and fulfilment remain separate from enquiry",()=>{
  const partner=read("components/sponsor-partner-page.tsx");
  const support=read("app/ja/support/page.tsx");
  for(const page of [partner,support]){
    assert.match(page,/cNibJ35678vy0Il64f7EQ1u/);
    assert.match(page,/263243206556051/);
    assert.match(page,/毎月自動更新/);
    assert.match(page,/\/ja\/support\/terms/);
  }
  assert.match(partner,/263089038431054/);
  assert.match(partner,/相談時点では課金しません/);
  assert.match(partner,/原則14営業日以内/);
  assert.match(support,/再度お支払い不要/);
});
