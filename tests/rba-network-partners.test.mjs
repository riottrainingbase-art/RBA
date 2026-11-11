import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const page = readFileSync("app/ja/work-with-rba/page.tsx", "utf8");
const css = readFileSync("app/ja/work-with-rba/work-with-rba.module.css", "utf8");
const partner = readFileSync("components/sponsor-partner-page.tsx", "utf8");

test("network offers exactly three distinct real-world models", () => {
  for (const id of ["local", "corporate", "global"]) {
    assert.match(page, new RegExp('id: "' + id + '"'));
  }
  assert.equal((page.match(/\bid: "(?:local|corporate|global)"/g)||[]).length, 3);
  assert.match(page, /教材や加盟店ではありません/);
});

test("all three actions lead to existing official consultation routes", () => {
  for (const route of ["/ja/clinic-request", "/ja/partners", "/ja/contact"]) {
    assert.ok(page.includes(route), "missing network route " + route);
    assert.ok(existsSync("app" + route + "/page.tsx"), "missing destination " + route);
  }
  assert.ok(partner.includes("/ja/work-with-rba"), "corporate page should link to network programme");
});

test("no assumed payment, status or sponsorship guarantees", () => {
  assert.match(page, /収益配分・スポンサー契約が成立したことを意味しません/);
  assert.match(page, /書面で決めます/);
  assert.match(page, /旅行・宿泊等の手配は別途適法/);
  assert.match(page, /個人情報を必要以上に共有しない/);
  assert.doesNotMatch(page, /square\.link|checkout\.stripe|決済はこちら|今すぐ加盟/);
});

test("responsive and accessible presentation", () => {
  for (const cls of [".grid", ".card", ".steps", ".safety", ".bottomLinks"]) {
    assert.ok(css.includes(cls), "missing class " + cls);
  }
  assert.match(css, /@media\(max-width:560px\)/);
  assert.match(page, /aria-labelledby="network-title"/);
  assert.match(page, /aria-label="連携モデルとお問い合わせ"/);
  assert.match(css, /:focus-visible/);
});
