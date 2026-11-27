import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const ja = readFileSync(new URL("../components/torsten-japan-landing.tsx", import.meta.url), "utf8");
const en = readFileSync(new URL("../components/torsten-international.tsx", import.meta.url), "utf8");
test("completed Vol.2 pages cannot link to obsolete checkout or calendar", () => {
  for (const page of [ja,en]) {
    assert.doesNotMatch(page, /torstenRegistrationUrl|torstenUsdLive|torstenUsdRecording|buy\.stripe\.com|clinic\.ics|EventScheduled|InStock/);
    assert.doesNotMatch(page, /us06web\.zoom\.us\/rec\//);
  }
});
test("recording duration is not reset on new purchase; no duplicate payment", () => {
  assert.match(ja, /公開から30日間/);
  assert.match(ja, /再決済不要/);
  assert.match(ja, /視聴期限/);
  assert.match(en, /30 days from release, not 30 days from purchase/);
  assert.match(en, /Do not pay again/);
  assert.match(en, /Check availability before paying/);
});
test("separate access support and new enquiries", () => {
  assert.match(ja, /263243557140049/);
  assert.match(ja, /SafariまたはChrome/);
  assert.match(en, /href=\{recordingSupport\}/);
  assert.match(en, /href=\{recordingEnquiry\}/);
  assert.match(en, /Never send card details or passwords/);
});
