import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const files = {
  plans: readFileSync("lib/homecourt-next-play.ts", "utf8"),
  app: readFileSync("components/homecourt-next-play.tsx", "utf8"),
  styles: readFileSync("components/homecourt-next-play.module.css", "utf8"),
  route: readFileSync("app/ja/my-homecourt/next-play/page.tsx", "utf8"),
  portal: readFileSync("components/my-homecourt.tsx", "utf8"),
  member: readFileSync("components/member-app.tsx", "utf8"),
};

test("NEXT PLAY contains four distinct pathways for each audience", () => {
  const entries = [...files.plans.matchAll(/id:"([^"]+)",role:"(player|parent|coach)"/g)]
    .map(([, id, role]) => ({ id, role }));
  assert.equal(entries.length, 12);
  assert.equal(new Set(entries.map(x => x.id)).size, 12);
  for (const role of ["player", "parent", "coach"]) {
    assert.equal(entries.filter(item => item.role === role).length, 4, role);
  }
});

test("Each pathway points to a named existing RBA Journal article", () => {
  const slugs = [...files.plans.matchAll(/articleSlug:"([^"]+)"/g)].map(x => x[1]);
  assert.equal(slugs.length, 12);
  for (const slug of slugs) {
    assert.match(slug, /^[a-z0-9-]+$/);
  }
  assert.match(files.app, /\/ja\/journal\//);
});

test("Selection is local; user explicitly opts into storage and redirects", () => {
  assert.doesNotMatch(files.app, /history\.replaceState/);
  assert.match(files.app, /async function savePlan\(\)/);
  assert.match(files.app, /\.from\("homecourt_saves"\)\.insert/);
  assert.match(files.app, /\.auth\.getUser\(\)/);
  assert.match(files.app, /error\.code !== "23505"/);
  assert.match(files.app, /login\?next=/);
  assert.doesNotMatch(files.app, /service_role|NEXT_PUBLIC_SUPABASE_SERVICE|supabase\.auth\.admin/);
});

test("Landing page has discoverability and free entry", () => {
  assert.match(files.route, /canonical: "\/ja\/my-homecourt\/next-play"/);
  assert.match(files.portal, /\/ja\/my-homecourt\/next-play/);
  assert.match(files.member, /<HomecourtFirstWeek/);
  assert.match(files.member, /初期設定の手順を10枚で見る/);
  assert.match(files.app, /登録なしで試せる/);
  assert.match(files.app, /課金は発生しません/);
});

test("Mobile, keyboard accessibility, safety and non-diagnostic boundaries", () => {
  assert.match(files.styles, /@media\(max-width:760px\)/);
  assert.match(files.styles, /focus-visible/);
  assert.match(files.app, /aria-pressed/);
  assert.match(files.app, /aria-live="polite"/);
  assert.match(files.app, /未成年の方は保護者と利用してください/);
  assert.match(files.plans, /安全確保/);
  assert.match(files.app, /明示的に「保存」/);
});
