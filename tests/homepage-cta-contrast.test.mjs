import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/** CSS Modules declaration order regression for the exact homepage CTA selectors. */
const css = readFileSync(resolve("components/simple-japanese-home.module.css"), "utf8");
const source = readFileSync(resolve("components/simple-japanese-home.tsx"), "utf8");
const withoutComments = css.replace(/\/\*[\s\S]*?\*\//g, "");
const rules = [...withoutComments.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((match) => ({
  selectors: match[1].split(",").map((s) => s.trim()),
  declarations: Object.fromEntries([...match[2].matchAll(/([\w-]+)\s*:\s*([^;]+)\s*;?/g)].map((m) => [m[1], m[2].replace(/\s*!important\s*$/i, "").trim()])),
}));
function computed(selector, property) {
  let value;
  for (const rule of rules) {
    if (rule.selectors.includes(selector) && Object.hasOwn(rule.declarations, property))
      value = rule.declarations[property];
  }
  return value;
}
function luminance(hex) {
  const rgb = hex.replace("#", "").match(/../g).map((v) => {
    const c = parseInt(v, 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}
function contrast(a, b) {
  const [x, y] = [luminance(a), luminance(b)].sort((v, w) => w - v);
  return (x + 0.05) / (y + 0.05);
}

for(const variant of ["primary", "secondary"]) {
  const base = `.page .hero .actions .${variant}`;
  const normalBG = variant === "primary" ? "#ffffff" : "#e9ede8";
  const normalFG = "#171817";
  test(`RBA homepage ${variant} mobile CTA has WCAG AA text in default/link/visited states`, () => {
    for(const selector of [base, `${base}:link`, `${base}:visited`]) {
      assert.equal(computed(selector, "background-color"), normalBG, `${selector} background`);
      assert.equal(computed(selector, "color"), normalFG, `${selector} text`);
      assert.equal(computed(selector, "-webkit-text-fill-color"), normalFG, `${selector} iOS text-fill`);
      assert.ok(contrast(computed(selector, "color"), computed(selector, "background-color")) >= 4.5, `${selector} WCAG AA`);
    }
    assert.equal(computed(`${base} > span`, "color"), normalFG, "CTA arrow/icon contrast");
    assert.equal(computed(`${base} > span`, "-webkit-text-fill-color"), normalFG, "iOS arrow/icon contrast");
  });
}
for(const variant of ["primary", "secondary"]) {
  const base = `.page .hero .actions .${variant}`;
  test(`RBA homepage ${variant} CTA hover and keyboard focus keep WCAG AA contrast`, () => {
    for(const state of [":hover", ":focus-visible"]) {
      const selector = base + state;
      const bg = computed(selector, "background-color");
      const fg = computed(selector, "color");
      assert.ok(/^#[0-9a-fA-F]{6}$/.test(bg));
      assert.ok(/^#[0-9a-fA-F]{6}$/.test(fg));
      assert.equal(computed(selector, "-webkit-text-fill-color"), fg, selector);
      assert.ok(contrast(fg, bg) >= 4.5, selector);
    }
  });
}
test("Both actual homepage CTA labels and their in-page destinations are retained", () => {
  assert.match(source, /開催予定を見る/);
  assert.match(source, /自分に合う入口/);
  assert.match(source, /href="#home-programmes"/);
  assert.match(source, /href="#rba-for-you"/);
});
test("Mobile links are full-width and at least 44px high", () => {
  assert.match(css, /@media\s*\(max-width:\s*700px\)[\s\S]*?\.page \.hero \.actions \.primary,\s*\.page \.hero \.actions \.secondary\s*\{[\s\S]*?width:100%;[\s\S]*?min-height:54px;/);
});
