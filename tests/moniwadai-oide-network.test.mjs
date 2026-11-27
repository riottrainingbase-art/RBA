import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import test from "node:test";

const source = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const sendai = source("app/ja/sendai/page.tsx");
const community = source("components/sendai-community.tsx");
const inbound = source("components/japan-experience-landing.tsx");

test("regional concept uses the existing Sendai hub and preserves enquiry forms", () => {
  assert.equal(sendai.split('id="moniwadai-oide"').length, 2);
  for (const id of ["263053122067044","263082418714053","263083176331050"]) assert.ok(sendai.includes(id));
  assert.ok(community.includes("/ja/sendai#moniwadai-oide"));
  assert.ok(sendai.includes("/ja/international/partner-with-us"));
  assert.ok(sendai.includes("/ja/international/japan-experience"));
});
test("inbound destinations expand without changing the group and business forms", () => {
  assert.ok(inbound.includes("JAPAN / SEVEN REGIONS"));
  assert.ok(!inbound.includes("JAPAN / FOUR REGIONS"));
  for (const label of ["HOKKAIDO","TOHOKU","KANTO","CENTRAL JAPAN","KANSAI","KYUSHU","OKINAWA & ISLANDS","中部・甲信越","沖縄・離島","沖繩與離島"]) assert.ok(inbound.includes(label));
  for (const id of ["263084520901047","263084202642046"]) assert.ok(inbound.includes(id));
  assert.ok(inbound.includes("/ja/sendai#moniwadai-oide"));
});
test("public wording distinguishes proposals from bookings and regulated travel", () => {
  assert.ok(sendai.includes("構想・協議段階"));
  assert.ok(sendai.includes("適格な登録事業者"));
  assert.ok(inbound.includes("not confirmed host sites"));
  assert.ok(inbound.includes("appropriately registered providers"));
});
