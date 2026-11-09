import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
const read=(path)=>readFileSync(path,"utf8");

test("U12 and U15 pages keep schools distinct from GREAM teams",()=>{
  const u12=read("app/ja/u12/page.tsx");
  const u15=read("app/ja/u15/page.tsx");
  assert.match(u12,/\/ja\/u12-school/);
  assert.match(u12,/GREAMはU15/);
  assert.match(u15,/\/ja\/gream/);
  assert.match(u15,/\/ja\/u15-skill-up/);
});

test("GREAM regional hub links Sendai Okinawa and Akita",()=>{
  const hub=read("app/ja/gream/page.tsx");
  for(const route of ["/ja/gream-sendai","/ja/gream-okinawa","/ja/gream-akita"]){
    assert.ok(hub.includes(route),route);
    assert.ok(existsSync(`app${route}/page.tsx`),route);
  }
});

test("regional pages do not invent registration or payment conditions",()=>{
  const okinawa=read("app/ja/gream-okinawa/page.tsx");
  const akita=read("app/ja/gream-akita/page.tsx");
  assert.match(okinawa,/運営体制を整備/);
  assert.match(akita,/DSM/);
  assert.match(akita,/要確認/);
  assert.doesNotMatch(akita,/決済はこちら|今すぐ入団/);
});

test("navigation, simplified homepage and sitemap provide clear routes",()=>{
  const nav=read("components/site-frame.tsx");
  const home=read("components/simple-japanese-home.tsx");
  const css=read("components/simple-japanese-home-refresh.module.css");
  const sitemap=read("app/sitemap.ts");
  for(const route of ["/ja/u12","/ja/u15","/ja/gream"]){
    assert.ok(home.includes(route),"home missing "+route);
    assert.ok(sitemap.includes(route),"sitemap missing "+route);
  }
  for(const route of ["/ja/opportunities","/ja/gream","/ja/events/torsten-loibl-online-clinic"]){
    assert.ok(nav.includes(route),"nav missing "+route);
  }
  for(const route of ["/ja/gream-okinawa","/ja/gream-akita"]){
    assert.ok(sitemap.includes(route),"sitemap missing "+route);
    assert.ok(home.includes(route),"home missing team "+route);
  }
  for(const marker of ["home-clear-activities","home-clear-torsten-details","home-clear-u12","home-clear-u15","home-clear-gream-overview"]){
    assert.ok(home.includes(marker),"missing primary conversion marker "+marker);
  }
  assert.ok(home.includes("<CorporateSupportStrip locale=\"ja\" />"),"home must keep permanent sponsor placement");
  assert.ok(home.includes("Googleフォーム → Square決済"),"home must clarify domestic Torsten checkout");
  assert.ok(home.includes("programme.id !== \"torsten\""),"featured clinic must not duplicate in events grid");
  for(const klass of ["entryGrid","entryCard","quickAges","featured","activityGrid","regionGrid"]){
    assert.ok(css.includes("."+klass),"missing responsive style "+klass);
  }
});

test("Sendai remains a separate full club site and CTAs stay unchanged",()=>{
  const sendai=read("app/ja/gream-sendai/page.tsx");
  assert.match(sendai,/GREAM/);
  assert.match(sendai,/gream-sendai-club-hero-intake/);
  assert.match(sendai,/gream-sendai\/partners/);
  assert.match(sendai,/gream-sendai\/monthly-trial/);
});
