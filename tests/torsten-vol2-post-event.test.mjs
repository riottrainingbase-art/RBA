import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const ja = readFileSync(new URL("../components/torsten-japan-landing.tsx", import.meta.url), "utf8");
const en = readFileSync(new URL("../components/torsten-international.tsx", import.meta.url), "utf8");
const offer = readFileSync(new URL("../components/torsten-recording-offer.tsx", import.meta.url), "utf8");
test("completed Vol.2 pages cannot link to obsolete checkout or calendar", () => {
  for (const page of [ja,en]) {
    assert.doesNotMatch(page, /torstenRegistrationUrl|torstenUsdLive|torstenUsdRecording|buy\.stripe\.com|clinic\.ics|EventScheduled|InStock/);
    assert.doesNotMatch(page, /us06web\.zoom\.us\/rec\//);
  }
});
test("recording duration is not reset on new purchase; no duplicate payment", () => {
  assert.match(ja, /TorstenRecordingOffer locale="ja"/);
  assert.match(en, /TorstenRecordingOffer locale="en"/);
  assert.match(offer, /公開から30日間（購入から30日ではありません）/);
  assert.match(offer, /再決済不要/);
  assert.match(offer, /視聴期限/);
  assert.match(offer, /30 days from release, not purchase/);
  assert.match(offer, /do not pay again/);
  assert.match(offer, /Check the remaining viewing period before paying/);
});
test("separate access support and new enquiries", () => {
  assert.match(offer, /263243557140049/);
  assert.match(offer, /SafariまたはChrome/);
  assert.match(offer, /href=\{checkout\}/);
  assert.match(offer, /Never send card details or passwords/);
  assert.doesNotMatch(offer, /7EQ0b|clinic\.ics|us06web\.zoom\.us\/rec\//);
});
