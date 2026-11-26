import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const route = readFileSync("app/ja/events/torsten-loibl-online-clinic/page.tsx", "utf8");
const landing = readFileSync("components/torsten-japan-landing.tsx", "utf8");
const css = readFileSync("components/torsten-japan-landing.module.css", "utf8");
const programmes = readFileSync("components/programme-data.ts", "utf8");
const international = readFileSync("app/events/torsten-loibl-online-clinic/page.tsx", "utf8");

const has = (source, value, label) => assert.ok(source.includes(value), label);
const count = (source, re) => [...source.matchAll(re)].length;

has(route, 'TorstenJapanLanding', "Japanese route must use the concise page");
assert.ok(!route.includes('LocalizedTorsten'), "Japanese route should not load the old multi-section page");
has(landing, '<SiteFrame locale="ja"', "SiteFrame must retain common header and language navigation");
assert.ok(!landing.includes("<main className"), "SiteFrame already provides the main landmark; avoid nested main");
has(landing, "GrowthClickTracking", "Retain click tracking identifiers");
for (const id of ["torsten-simple-hero", "torsten-simple-book", "torsten-simple-mobile"]) {
  has(landing, id, "Required CTA missing: " + id);
}
assert.equal(count(landing, /<RegisterLink\b/g), 3, "Use three visible, consistent registration CTAs");
has(landing, "href={clinicHelpUrl(", "CTAs must use the recording enquiry route after LIVE closes");
assert.ok(!landing.includes("torstenRegistrationUrl"), "The completed event must not link to the old payment form");
has(programmes, 'applicationUrl: "https://forms.gle/fy4etmavBtw1s7FQ8"', "Expected official Google Form URL changed - verify before release");
has(landing, "2026-11-25T20:00:00+09:00", "Event start time mismatch");
has(landing, "2026-11-25T21:30:00+09:00", "Event end time mismatch");
for (const value of ["4,400", "Level 3 Coach Instructor", "Executive Committee", "2019", "RPL", "受付終了", "録画", "再決済不要"]) {
  has(landing, value, "Required fact or payment note missing: " + value);
}
has(landing, "本講習はRiot Basketball Academyの独立主催", "Avoid implying club or FIBA endorsement");
assert.ok(!/book\.stripe\.com|checkout\.stripe\.com/.test(landing), "Do not introduce unverified direct Stripe checkout links");
has(css, "min-height:62px", "Primary CTA tap target must remain generous");
has(css, "min-height:46px", "Sticky CTA tap target must remain accessible");
has(css, "@media(max-width:600px)", "Mobile layout missing");
assert.ok(international.includes("TorstenInternational"), "International page should retain USD checkout route");
console.log("[torsten-japan-landing] OK: Japanese landing copy, 3 direct CTAs, form, fees, achievements, mobile affordances and international separation");
