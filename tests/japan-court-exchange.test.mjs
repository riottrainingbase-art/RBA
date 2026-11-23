import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
const component = fs.readFileSync(new URL("../components/japan-court-exchange.tsx", import.meta.url), "utf8");
const international = fs.readFileSync(new URL("../components/international-platform.tsx", import.meta.url), "utf8");
const inbound = fs.readFileSync(new URL("../components/japan-experience-landing.tsx", import.meta.url), "utf8");
const siteFrame = fs.readFileSync(new URL("../components/site-frame.tsx", import.meta.url), "utf8");
const sitemap = fs.readFileSync(new URL("../app/sitemap.ts", import.meta.url), "utf8");

test("localized pages are present, use canonical metadata and link to shared product", () => {
  for (const [locale, prefix] of Object.entries({en: "", ja: "/ja", "zh-tw": "/zh-tw", ko: "/ko"})) {
    const path = prefix + "/international/japan-court-exchange";
    const route = fs.readFileSync(new URL("../app" + path + "/page.tsx", import.meta.url), "utf8");
    assert.ok(route.includes('JapanCourtExchange locale="' + locale + '"'));
    assert.ok(route.includes("https://riotbasketballacademy.com" + path));
  }
  assert.ok(sitemap.includes("japanCourtExchangePages"));
  assert.ok(international.includes("/international/japan-court-exchange"));
  assert.ok(inbound.includes("/international/japan-court-exchange"));
  assert.ok(siteFrame.includes('"international/japan-court-exchange"'));
});

test("site discloses sports-only pricing and avoids immediate or bundled checkout", () => {
  for (const expected of ["¥165,000", "¥330,000", "¥440,000", "50%", "https://form.jotform.com/263084520901047", "No payment is taken on this page", "not a completed case study"]) {
    assert.ok(component.includes(expected), "missing public service requirement: " + expected);
  }
  for (const forbidden of ["buy.stripe.com", "checkout.stripe.com", "plink_", "329486613", "Ciroo Basketball Academy", "transfer passenger data", "guaranteed opponent"]) {
    assert.equal(component.includes(forbidden), false, "prohibited content: " + forbidden);
  }
});

test("explicit warnings distinguish travel providers, approvals and advance payment", () => {
  for (const fragment of ["Travel is arranged separately", "International games remain subject", "initial payment is part of", "appropriate refund", "No opposing team", "no child or parent lists"]) {
    assert.ok(component.includes(fragment), "missing safeguard: " + fragment);
  }
});