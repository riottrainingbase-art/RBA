import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const source = (path) => fs.readFileSync(path, "utf8");
const supporters = source("app/ja/supporters/page.tsx");
const home = source("components/simple-japanese-home.tsx");
const journal = source("components/public-journal.tsx");
const deployment = source("DEPLOYMENT.md");

test("supporters clearly distinguishes monthly 500 and 1000 yen note plans", () => {
  assert.match(supporters, /<strong>500<\/strong>円\s*<span>\/ 月<\/span>/);
  assert.match(supporters, /<strong>1,000<\/strong>円\s*<span>\/ 月<\/span>/);
  assert.match(supporters, /note\.com\/rba_official\/membership\/join/);
  assert.match(supporters, /月2本/);
  assert.match(supporters, /月1回/);
  assert.doesNotMatch(supporters, /Stripe|Square/);
});

test("supporters explains that note is voluntary and not a second clinic checkout", () => {
  assert.match(supporters, /任意の月額/);
  assert.match(supporters, /重複した加入・課金/);
  assert.match(supporters, /クリニック/);
  assert.match(supporters, /HOMECOURT|ホームコート|MY HOME COURT/);
});

test("high-intent calls to action have fixed and separate IDs", () => {
  for (const id of ["supporters-note-join","supporters-500-note","supporters-1000-note","supporters-final-note","supporters-learning-1000"]) {
    assert.ok(supporters.includes('data-growth-id="'+id+'"'), id);
  }
  assert.match(home, /href:\s*"\/ja\/supporters"/);
  assert.match(journal, /data-growth-id="journal-supporters-note-500"/);
});

test("all new literal internal trust links exist in App Router", () => {
  assert.ok(fs.existsSync("app/ja/updates/page.tsx"));
  assert.match(supporters, /href="\/ja\/updates"/);
  assert.doesNotMatch(supporters, /href="\/ja\/updates\/2026-october"/);
});

test("note membership release follows existing preview checkpoint policy", () => {
  assert.match(deployment, /Normal code work must not create a Vercel deployment/);
  assert.match(deployment, /preview-rba/);
  assert.ok(!supporters.includes("500人が参加"));
});
