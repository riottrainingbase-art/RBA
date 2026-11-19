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

test("clinic application and feedback surfaces include optional supporter invitation", () => {
  const component = source("components/clinic-support-invitation.tsx");
  const application = source("app/ja/after-application/page.tsx");
  const afterClinic = source("app/ja/after-clinic/page.tsx");
  const kagoshima = source("app/ja/events/kagoshima-clinic-2026-11-29/page.tsx");

  assert.match(application, /ClinicSupportInvitation stage="application"/);
  assert.match(afterClinic, /ClinicSupportInvitation stage="feedback"/);
  assert.match(kagoshima, /ClinicSupportInvitation stage="application"/);
  assert.match(component, /\/ja\/supporters/);
  assert.match(component, /月500円/);
  assert.match(component, /月1,000円/);
  assert.match(component, /任意の月額/);
  assert.match(component, /参加条件・選手の評価/);
  assert.match(component, /重複してお申し込みいただく必要はありません/);
  assert.doesNotMatch(component, /<input|<form|type="submit"|stripe\.com|buy\.stripe/);
  assert.match(component, /data-growth-id=\{c\.growthId\}/);
});
