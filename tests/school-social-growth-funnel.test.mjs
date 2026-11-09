import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
const read=(f)=>readFileSync(f,"utf8");

test("RBA school trial is a top-level choice without replacing corporate sponsor strip",()=>{
  const home=read("components/simple-japanese-home.tsx");
  const nav=read("components/site-frame.tsx");
  assert.match(home,/home-hero-school-trial/);
  assert.match(home,/\/ja\/sendai-school/);
  assert.match(home,/<CorporateSupportStrip locale="ja"\s*\/>/);
  assert.match(home,/schoolSpotlight/);
  assert.match(nav,/スクール・体験/);
  assert.match(nav,/\/ja\/gream/);
});

test("all social hub links resolve to real application routes",()=>{
  const page=read("app/ja/links/page.tsx");
  const css=read("app/ja/links/links.module.css");
  const destinations=["/ja/sendai-school","/ja/gream","/ja/opportunities","/ja/d-hub","/ja/clinic-request","/ja/partners","/ja"];
  for(const dest of destinations){
    assert.ok(page.includes(`href: "${dest}"`),dest);
    assert.ok(existsSync(dest==="/ja"?"app/ja/page.tsx":`app${dest}/page.tsx`),dest);
  }
  assert.match(page,/index:\s*false/);
  assert.match(page,/<GrowthClickTracking/);
  assert.match(css,/@media\(max-width:420px\)/);
  assert.doesNotMatch(page,/stripe\.com|square\.link|checkout\.stripe\.com/);
});

test("school share copy is parent-safe and uses verified route",()=>{
  const kit=read("components/campaign-share-kit.tsx");
  const start=read("app/ja/start/page.tsx");
  assert.match(kit,/id:"sendai-school"/);
  assert.match(kit,/useState\("sendai-school"\)/);
  assert.match(kit,/\/ja\/sendai-school/);
  assert.match(start,/id: "sendai-school"/);
  assert.doesNotMatch(kit,/sendai-school"[\s\S]{0,600}未払い/);
});

test("school sitemap and verified representative name are correct",()=>{
  assert.match(read("app/sitemap.ts"),/\/ja\/sendai-school/);
  assert.match(read("app\/layout.tsx"),/name:"Masato Nishio"/);
  assert.doesNotMatch(read("app\/layout.tsx"),/name:"Yuto Nishio"/);
});
