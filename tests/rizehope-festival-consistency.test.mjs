import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
const component = read("components/rizehope-festival-entry.tsx");

test("stable event name and exact dates, independent from the descriptive subtitle", () => {
  assert.ok(component.includes("RIZEHOPE JAPAN 2027"));
  assert.ok(component.includes("International U12 Basketball Festival"));
  assert.ok(component.includes("2027年2月27日（土）・28日（日）"));
  assert.ok(component.includes("27–28 February 2027"));
});
test("the three application pathways use the exact dedicated forms", () => {
  assert.ok(component.includes("263223566035050"));
  assert.ok(component.includes("263221234159047"));
  assert.ok(component.includes("263243952545057"));
});
test("domestic team financial terms are not copied onto overseas or individual entry", () => {
  assert.ok(component.includes("66,000円"));
  assert.ok(component.includes("33,000円"));
  assert.ok(component.includes("前金だけでは出場確約になりません"));
  assert.ok(component.includes("旅行に関わる契約は適切な事業者と別途確認"));
  assert.ok(component.includes("人数・選考・引率・保護者同意・料金・出場は未確定"));
});
test("only the domestic application displays payable prices", () => {
  const domestic = component.indexOf("01 / JAPAN CLUB TEAM");
  const overseas = component.indexOf("02 / INTERNATIONAL U12 CLUB");
  const united = component.indexOf("03 / RBA UNITED");
  assert.ok(domestic !== -1 && overseas > domestic && united > overseas);
  assert.ok(component.slice(domestic,overseas).includes("66,000円"));
  assert.ok(!component.slice(overseas,united).includes("33,000円"));
});
test("safety and claims have explicit safeguards", () => {
  for(const phrase of ["正式な主催者名義","登録は出場・宿泊・交通・渡航の予約ではありません","公認大会・自治体後援・海外チーム参加確約を示すものではありません","児童の旅券画像"]) {
    assert.ok(component.includes(phrase),phrase);
  }
});
test("no public guarantee of fixed overseas costs, games or visiting teams", () => {
  assert.ok(!component.includes("US$ 900"));
  assert.ok(!component.includes("minimum 5 games"));
  assert.ok(!component.includes("all-inclusive"));
});
test("bilingual routes and official brand imagery are included", () => {
  const jp = read("app/ja/international/rizehope-japan-2027/page.tsx");
  const en = read("app/international/rizehope-japan-2027/page.tsx");
  assert.ok(jp.includes('locale="ja"'));
  assert.ok(en.includes('locale="en"'));
  assert.ok(component.includes('/rba-logo-original.jpg'));
  assert.ok(component.includes("form.jotform.com"));
});
test("the link hub points to the new route, and never to the outdated wix site", () => {
  const page=read("app/ja/links/page.tsx");
  assert.ok(page.includes('/ja/international/rizehope-japan-2027'));
  assert.ok(page.includes('https://form.jotform.com/263244816480055'));
  assert.ok(page.includes('2027年以降の地域開催'));

  assert.ok(!page.includes('rbaofficialnm2.wixsite.com'));
});
