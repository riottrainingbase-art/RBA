import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
const root = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");

test("compact homepage keeps official camp discovery while the event page retains the parent-first enquiry", () => {
  const home = root("components/simple-japanese-home.tsx");
  const catalogue = root("components/programme-data.ts");
  const explorer = root("components/opportunity-explorer.tsx");
  const event = root("app/ja/events/okinawa-international-camp-2026/page.tsx");
  assert.match(home, /id="home-programmes"/);
  assert.match(home, /href="\/ja\/opportunities"/);
  assert.match(home, /programmes\s*\.filter\(p => isProgrammeActive\(p\)\)/);
  assert.match(catalogue, /japaneseInfoPath:"\/ja\/events\/okinawa-international-camp-2026"/);
  assert.match(explorer, /programmes/);
  assert.doesNotMatch(home, /<OkinawaCampGrowthPanel placement="home"/);
  assert.doesNotMatch(home, /<OkinawaDecemberCampCallout/);
  assert.match(event, /<OkinawaCampGrowthPanel placement="event"/);
});
test("camp conversion panel uses RBA official logo and verified domestic prices", () => {
  const panel = root("components/okinawa-camp-growth-panel.tsx");
  assert.match(panel, /\/rba-logo-original\.jpg/);
  for(const token of ["27,500", "39,600", "30,250", "43,560", "7〜18歳", "無料で参加相談"]) assert.ok(panel.includes(token));
  assert.match(panel, /https:\/\/form\.jotform\.com\/263095015591053/);
  assert.match(panel, /https:\/\/www\.instagram\.com\/riot\.basketball\.academy/);
  assert.match(panel, /宿泊の正式手続き/);
});
test("Instagram live panel automatically expires after 22:00 JST on 7 November", () => {
  const panel = root("components/okinawa-camp-growth-panel.tsx");
  assert.match(panel, /const liveStarts = Date\.parse\("2026-11-07T21:00:00\+09:00"\)/);
  assert.match(panel, /const liveEnds = Date\.parse\("2026-11-07T22:00:00\+09:00"\)/);
  assert.match(panel, /now < liveEnds \? "live" : "off"/);
});
test("no payment, false guaranteed transport, old earlybird deadline or fabricated capacity in callout", () => {
  const panel = root("components/okinawa-camp-growth-panel.tsx");
  for(const forbidden of ["送迎無料", "先着限定", "満席間近", "11月10日まで", "10月31日まで", "今すぐ支払い"]) assert.ok(!panel.includes(forbidden));
});
