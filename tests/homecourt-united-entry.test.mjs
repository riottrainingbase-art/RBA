import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const guide = read("app/ja/my-homecourt/united/page.tsx");
const publicHome = read("components/my-homecourt.tsx");
const membersHome = read("components/member-app.tsx");
const united = read("components/platform-business-pages.tsx");

test("MY HOME COURT offers a visible RBA UNITED entry from public and signed-in screens", () => {
  for (const source of [publicHome, membersHome, united]) {
    assert.match(source, /\/ja\/my-homecourt\/united/);
  }
});

test("programme choices have separate verified form IDs", () => {
  for (const formId of ["263188088558069", "263207310187047", "263217708013047"]) {
    assert.match(guide, new RegExp(formId));
  }
});

test("free-interest gates cannot be mistaken for a paid reservation", () => {
  assert.match(guide, /無料の事前登録/);
  assert.match(guide, /参加確定・決済はまだ行いません/);
  assert.match(guide, /前金50,000円/);
  assert.match(guide, /会場・競技時間・資格・保険/);
  assert.doesNotMatch(guide, /api\/commerce|stripe\.com|checkout\.sessions/);
});

test("distinct programmes and roles remain unambiguous", () => {
  assert.match(guide, /神戸・関西/);
  assert.match(guide, /韓国・仁川/);
  assert.match(guide, /深圳U12/);
  assert.match(guide, /選抜プログラムと一般交流は別の参加区分/);
  assert.match(guide, /指導者・代表者のみ/);
});
