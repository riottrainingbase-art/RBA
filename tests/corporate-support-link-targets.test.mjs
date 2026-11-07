import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../components/corporate-support-strip.tsx", import.meta.url), "utf8");
const styles = readFileSync(new URL("../components/corporate-support-strip.module.css", import.meta.url), "utf8");

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

test("each external destination is a clear, keyboard accessible action", () => {
  assert.match(source, /aria-label=\{t\.websiteLabel\}/);
  assert.match(source, /aria-label=\{t\.instagramLabel\}/);
  assert.match(source, /data-growth-id="home-nakagami-official-site"/);
  assert.match(source, /data-growth-id="home-ourplace-instagram"/);
  assert.match(source, /target="_blank"/);
  assert.match(source, /rel="noopener noreferrer"/);
  assert.match(source, /data-sponsor-status=\{company\.status\}/);
  assert.match(styles, /\.companyLinks a:focus-visible/);
  assert.match(styles, /min-height: 50px/);
  assert.match(styles, /@media \(max-width: 360px\)/);
});

test("partner labels are localized for every public homepage", () => {
  for (const locale of ['ja:', 'en:', '"zh-tw":', 'ko:']) {
    assert.ok(source.includes(locale), `Missing ${locale} locale`);
  }
  assert.equal((source.match(/websiteLabel:/g) ?? []).length, 4);
  assert.equal((source.match(/instagramLabel:/g) ?? []).length, 4);
  assert.equal((source.match(/linkGroupLabel:/g) ?? []).length, 4);
});
