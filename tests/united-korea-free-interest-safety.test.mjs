import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const page = readFileSync(resolve(root, "app/ja/my-homecourt/united-korea-2027/page.tsx"), "utf8");
const style = readFileSync(resolve(root, "app/ja/my-homecourt/united-korea-2027/page.module.css"), "utf8");
const home = readFileSync(resolve(root, "components/my-homecourt.tsx"), "utf8");
const member = readFileSync(resolve(root, "components/member-app.tsx"), "utf8");
const united = readFileSync(resolve(root, "components/platform-business-pages.tsx"), "utf8");

test("Korea page and both MY HOME COURT entry points lead to free-interest page", () => {
  const path = "/ja/my-homecourt/united-korea-2027";
  assert.ok(home.includes(path));
  assert.ok(member.includes(path));
  assert.ok(united.includes(path));
  assert.ok(page.includes("https://form.jotform.com/263207310187047"));
  assert.ok(page.includes("FREE INTEREST ONLY"));
});

test("Korea fee proposal includes full programme cost, but is explicitly provisional and flight-exclusive", () => {
  for(const text of ["¥238,000","¥248,000","航空券別","正式な募集価格ではありません","RBA","PLAYGROUND","宿泊","事前指導","引率"]) {
    assert.ok(page.includes(text), "Missing disclosure: " + text);
  }
  assert.ok(page.includes("過去のRBA JOURNAL"));
  assert.ok(page.includes("228,000"));
});

test("No Korea payment or deposit capability was introduced", () => {
  assert.doesNotMatch(page, /stripe\.com|\/api\/commerce\/checkout|\/api\/commerce\/kobe|payment_intent|checkout\.sessions\.create|price_id_/i);
  assert.ok(page.includes("前金"));
  assert.ok(page.includes("¥119,000"));
  assert.ok(page.includes("¥124,000"));
  assert.ok(page.includes("残金50％"));
  assert.ok(page.includes("保護者が書面で同意"));
  assert.ok(page.includes("現在は無料の参加意向登録のみ"));
  assert.ok(page.includes("決済を行いません"));
});

test("No confidential supplier price, bank detail, or RBA gross margin is hardcoded in public page", () => {
  assert.doesNotMatch(page, /10,910|10910|860\s*USD|US\$860|US\$590|1,897,500|2,503,500|432,500|2936000|19991000548738/i);
});

test("Mobile responsive orange-black display exists", () => {
  assert.ok(style.includes("@media(max-width:700px)"));
  assert.ok(style.includes("#fc690d"));
  assert.ok(style.includes(".priceGrid"));
});
