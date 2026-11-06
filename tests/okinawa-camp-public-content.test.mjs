import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("homepage links use organizer-owned guidance rather than an unreviewed partner checkout", () => {
  const callout = read("components/okinawa-december-camp-callout.tsx");
  const partner = read("components/okinawa-camp-partner.tsx");
  const programmes = read("components/programme-data.ts");
  assert.match(callout, /\/okinawa-international-guide-2026\.html#traditional-chinese/);
  assert.match(callout, /\/okinawa-international-guide-2026\.html#english/);
  assert.match(callout, /\/ko\/events\/okinawa-international-camp-2026/);
  assert.doesNotMatch(callout, /href\s*=\s*"https:\/\/okinawa\.camp/);
  assert.doesNotMatch(partner, /href\s*=\s*"https:\/\/okinawa\.camp/);
  assert.match(programmes, /applicationUrl:"\/okinawa-international-guide-2026\.html",region:"okinawa"/);
});
test("Korean family page explains live overseas discount, refunds and pending staff/insurance", () => {
  const korean = read("app/ko/events/okinawa-international-camp-2026/page.tsx");
  for (const point of ["US$360", "US$240", "US$324", "US$216", "태풍", "1명당 선수 10명", "/ja/cancellation"]) {
    // Exact ratio wording can vary but the unconfirmed 1-to-10 ratio must be disclosed.
    if (point === "1명당 선수 10명") continue;
    assert.ok(korean.includes(point), "missing Korean content: " + point);
  }
  assert.match(korean, /지도자 1명당 선수 10명 배치를 확정한 것으로 안내하지 않습니다/);
  assert.match(korean, /중복 결제하지 마세요/);
});
test("international HTML guide covers official refund rules in all three languages", () => {
  const guide = read("public/okinawa-international-guide-2026.html");
  for (const s of ["official RBA cancellation policy", "RBA官方退費規定", "RBA 취소·환불 공식 규정", "#korean"]) assert.ok(guide.includes(s), "missing " + s);
});
test("overseas checkout is in enquiry-first mode until payment/refund terms agree", () => {
  const flow = read("components/okinawa-camp-checkout.tsx");
  assert.match(flow, /const OVERSEAS_CHECKOUT_READY = false/);
  assert.match(flow, /&& !OVERSEAS_CHECKOUT_READY &&/);
  assert.match(flow, /&& OVERSEAS_CHECKOUT_READY &&/);
  assert.match(flow, /\/ja\/cancellation/);
});
