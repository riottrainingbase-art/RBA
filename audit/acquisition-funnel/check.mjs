import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const file = (path) => readFileSync(resolve(root, path), "utf8");
const instagram = file("app/ja/instagram/page.tsx");
const torsten = file("components/torsten-japan-landing.tsx");
const css = file("components/torsten-japan-landing.module.css");
const analytics = file("components/growth-click-tracking.tsx");
const programme = file("components/programme-data.ts");

const requiredRoutes = [
  "app/ja/coaches/page.tsx",
  "app/ja/families/page.tsx",
  "app/ja/opportunities/page.tsx",
  "app/ja/clinic-request/page.tsx",
  "app/ja/events/torsten-loibl-online-clinic/page.tsx",
  "app/ja/events/torsten-loibl-online-clinic/share/page.tsx",
];
requiredRoutes.forEach(file);

assert.ok(instagram.includes("instagram-first-visit-title"), "First-visit chooser missing");
const priorityIndex = instagram.indexOf("{showTorsten && (");
const schoolIndex = instagram.indexOf('aria-labelledby="instagram-sendai-school-title"');
assert.ok(priorityIndex >= 0 && schoolIndex >= 0 && priorityIndex < schoolIndex, "Torsten should precede other promos while active");
assert.match(instagram, /torsten:\s*now < Date\.parse\("2026-11-25T20:00:00\+09:00"\)/, "Event expiry guard missing");
for (const id of ["instagram-first-coach", "instagram-first-player", "instagram-first-parent", "instagram-first-team"]) {
  assert.equal(instagram.split(`data-growth-id="${id}"`).length - 1, 1, `Wrong CTA ID count: ${id}`);
}
assert.match(instagram, /rba_first_visit/, "First-visit attribution label missing");
assert.match(instagram, /Googleフォーム.*Square決済案内/, "Domestic checkout guidance missing from featured card");

assert.match(torsten, /こんな課題を、現場で感じていませんか。/, "Audience-first section missing");
assert.match(torsten, /受講方法を選んで申し込む/, "Audience-first CTA missing");
assert.match(torsten, /重複送信・重複決済を避けてください/, "Duplicate-payment guard missing");
assert.match(torsten, /torsten-share-from-lp/, "Share CTA missing");
assert.match(torsten, /日本国内は税込円建て・Square決済/, "Domestic Square explanation changed");
assert.match(torsten, /href=\{torstenRegistrationUrl\}/, "Official registration reference missing");
assert.ok(!/checkout\.stripe\.com|buy\.stripe\.com|squareup\.com\/pay/.test(torsten), "Do not invent checkout links");
assert.match(programme, /https:\/\/forms\.gle\/fy4etmavBtw1s7FQ8/, "Approved domestic Google Form changed");

for (const selector of [".fit{", ".fitGrid{", ".fitActions{", ".shareInvite{", ".shareAction{"]) {
  assert.ok(css.includes(selector), `Missing conversion styling: ${selector}`);
}
assert.match(analytics, /new Set\(\["instagram", "rba_share_kit"\]\)/, "Attribution sources must be allowlisted");
assert.match(analytics, /new Set\(\["torsten_vol2_20261125", "rba_first_visit"\]\)/, "Attribution campaigns must be allowlisted");
assert.ok(!/localStorage|sessionStorage|document\.cookie|sendBeacon/.test(analytics), "Avoid persistent personal tracking");
assert.match(analytics, /event\.target/, "Only explicit CTA click events are tracked");

console.log("PASS: RBA first-visit routes, time-bound campaign, Square safety, and privacy-preserving attribution");
