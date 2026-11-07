import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../components/corporate-support-strip.tsx", import.meta.url), "utf8");

test("Nakagami company and OURPLACE link to the supplied destinations", () => {
  assert.match(source, /website: "https:\/\/nakagamiandco\.com\/",/);
  assert.match(source, /instagram: "https:\/\/www\.instagram\.com\/ourplace_official\/",/);
  assert.doesNotMatch(source, /www\.nakagami-co\.com/);
});

test("historical sponsorship is not inaccurately presented as current", () => {
  assert.match(source, /period: "2026\.03–08"/);
  assert.match(source, /status: "past"/);
  assert.match(source, /href=\{company\.website\}/);
  assert.match(source, /href=\{company\.instagram\}/);
});
