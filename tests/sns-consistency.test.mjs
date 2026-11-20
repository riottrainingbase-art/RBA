import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("UNITED distinguishes formal applications from free interest", () => {
  const source = read("components/platform-business-pages.tsx");
  assert.match(source, /FORMAL APPLICATION \/ DATA-LISTED/);
  assert.match(source, /韓国・仁川 IYIBS 2027/);
  assert.match(source, /無料の参加意向登録/);
  assert.match(source, /263207310187047/);
  assert.match(source, /rizehope-japan-2027\/united/);
  assert.doesNotMatch(source, /現在、募集を確認できるRBA UNITED企画はありません。/);
  assert.match(source, /Asia\\/Tokyo|9\\*60\\*60\\*1000/);
  assert.match(source, /Japan-only free-interest notices/);
  assert.doesNotMatch(source, /Free expressions of interest appear separately below/);
});

test("public social handles are their actual handles", () => {
  const source = read("components/localized-social.tsx");
  assert.match(source, /@RBAJapan2025/);
  assert.match(source, /@rba_official/);
  assert.match(source, /@riot\.basketball\.academy/);
  assert.match(source, /\{handle\}/);
});

test("no contradictory unsourced size counts on four-language home", () => {
  const source = read("components/localized-home.tsx");
  assert.doesNotMatch(source, /3,000\+|25 activity locations|国内25地域で活動/);
  assert.match(source, /International learning and exchange/);
});

test("link hub exposes free Korea interest, social directory and proper name", () => {
  const source = read("app/ja/links/page.tsx");
  assert.match(source, /RBA UNITED｜韓国2027/);
  assert.match(source, /\/ja\/social/);
  assert.match(source, /にしお まさと/);
});

test("Instagram entry links directly to free interest without treating it as paid", () => {
  const source = read("app/ja/instagram/page.tsx");
  assert.match(source, /instagram-korea-2027-free-interest/);
  assert.match(source, /保護者から無料で参加意向を登録/);
  assert.match(source, /登録だけで出場、航空券手配、支払いは確定しません/);
});
