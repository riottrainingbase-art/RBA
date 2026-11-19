import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";

const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const page = read("app/ja/my-homecourt/nationwide/page.tsx");
const css = read("app/ja/my-homecourt/nationwide/page.module.css");
const publicHome = read("components/my-homecourt.tsx");
const member = read("components/member-app.tsx");

test("national interest has a publicly accessible SEO landing and verified form URL", () => {
  assert.match(page, /export default function NationwideHomecourtPage/);
  assert.match(page, /SiteFrame locale="ja"/);
  assert.match(page, /alternates: \{ canonical: "https:\/\/riotbasketballacademy\.com\/ja\/my-homecourt\/nationwide" \}/);
  assert.match(page, /https:\/\/form\.jotform\.com\/263217942684061/);
  assert.match(page, /\/ja\/policies/);
});
test("homecourt navigation makes the national program visible without authentication", () => {
  assert.match(publicHome, /href="\/ja\/my-homecourt\/nationwide"/);
  assert.match(publicHome, /全国開催・無料先行案内/);
  assert.match(publicHome, /https:\/\/form\.jotform\.com\/263217942684061/);
  assert.match(member, /RBA全国開催・無料先行案内/);
  assert.match(member, /https:\/\/form\.jotform\.com\/263217942684061/);
});
test("the interest stage never promises participation, stock or payment", () => {
  assert.match(page, /先行受付人数の上限なし|希望登録は人数無制限/);
  assert.match(page, /47都道府県すべての開催決定を意味しません/);
  assert.match(page, /日時・会場・費用・安全条件を明示/);
  assert.match(page, /予約・正式申込・前金・決済は発生しません/);
  assert.match(page, /未成年の選手については保護者が登録してください/);
  assert.doesNotMatch(page, /先着順で参加確定|全都道府県で開催決定|残り[0-9]+枠/);
  assert.doesNotMatch(page, /\/api\/commerce\/checkout|stripe\.checkout|createCheckoutSession/);
});
test("nationwide leads stay distinct from international-event eligibility", () => {
  assert.match(publicHome, /韓国2027の無料先行エントリー/);
  assert.match(publicHome, /https:\/\/form\.jotform\.com\/263207310187047/);
  assert.match(publicHome, /大会の出場資格・チーム編成・参加費・安全管理/);
  assert.doesNotMatch(page, /選考応募/);
});
test("mobile, keyboard focus and reduced-motion affordances exist", () => {
  assert.match(css, /@media\(max-width:600px\)/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)/);
  assert.match(page, /aria-labelledby="faq-heading"/);
  assert.match(page, /aria-labelledby="how-it-works"/);
});
