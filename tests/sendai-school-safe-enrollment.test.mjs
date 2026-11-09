import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read = file => readFileSync(file, "utf8");

test("new U15 school leads cannot pay before court approval, but existing member billing remains", () => {
  const page = read("app/ja/u15-skill-up/page.tsx");
  assert.doesNotMatch(page, /buy\.stripe\.com/);
  assert.match(page, /billing\.stripe\.com/);
  assert.match(page, /施設利用許可/);
  assert.match(page, /新規の月額決済/);
  assert.match(page, /263053122067044/);
  assert.doesNotMatch(page, /<iframe/);
  assert.match(page, /GrowthClickTracking/);
});

test("U12 court is labelled as a candidate, not a confirmed school venue", () => {
  const page = read("app/ja/u12-school/page.tsx");
  assert.match(page, /会場候補/);
  assert.match(page, /利用条件を確認中/);
  assert.match(page, /GrowthClickTracking/);
  assert.match(page, /263053122067044/);
});

test("school hub, start page and social copy identify pending venue permissions", () => {
  const pages = [
    read("app/ja/sendai-school/page.tsx"),
    read("app/ja/start/page.tsx"),
    read("components/campaign-share-kit.tsx"),
  ];
  for (const text of pages) {
    assert.match(text, /利用許可/);
    assert.match(text, /無料相談/);
  }
  assert.match(read("app/ja/links/page.tsx"), /会場許可後/);
});

test("joining via free trial consultation never implies a free first coaching session", () => {
  const page = read("app/ja/sendai-school/page.tsx");
  assert.match(page, /相談は無料です/);
  assert.match(page, /体験費用/);
  assert.doesNotMatch(page, /体験無料|無料体験会が確定|残り[0-9]+枠/);
});
