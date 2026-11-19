import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync, existsSync } from "node:fs";

const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const supporters = read("app/ja/supporters/page.tsx");
const clinicSupport = read("components/clinic-support-invitation.tsx");
const application = read("app/ja/after-application/page.tsx");
const feedback = read("app/ja/after-clinic/page.tsx");
const kagoshima = read("app/ja/events/kagoshima-clinic-2026-11-29/page.tsx");
const business = read("app/ja/support/page.tsx");
const guide = read("app/ja/development-check/page.tsx");
const noteBridge = read("components/note-bridge.tsx");
const journal = read("components/public-journal.tsx");

test("verified note prices and separate paths are visible, never disguised as checkout", () => {
  assert.match(supporters, /<strong>500<\/strong>円\s*<span>\/ 月<\/span>/);
  assert.match(supporters, /<strong>1,000<\/strong>円\s*<span>\/ 月<\/span>/);
  assert.match(supporters, /note\.com\/rba_official\/membership\/join/);
  assert.match(supporters, /月1回/);
  assert.match(supporters, /月2本/);
  assert.match(supporters, /重複した加入・課金/);
  assert.doesNotMatch(supporters, /Stripe|Square|createCheckoutSession/);
  assert.match(noteBridge, /JOURNALとnote、何が違う？/);
  assert.match(noteBridge, /note\.com\/rba_official\/membership\/join/);
  assert.match(noteBridge, /href="\/ja\/reading-guide"/);
});

test("free 7-day guide is fully accessible and leaves support voluntary", () => {
  assert.ok(existsSync(new URL("../app/ja/development-check/development-check.module.css", import.meta.url)));
  for (const i of ["01", "02", "03", "04", "05", "06", "07"]) {
    assert.ok(guide.includes('day: "' + i + '"'), i);
  }
  assert.match(guide, /メンバーシップ加入は不要/);
  assert.match(guide, /登録も求めません/);
  assert.match(guide, /href="\/ja\/supporters"/);
  assert.match(guide, /joinUrl = "https:\/\/note\.com\/rba_official\/membership\/join"/);
  assert.doesNotMatch(guide, /Stripe|Square|\/api\/commerce\/checkout/);
  assert.match(supporters, /href="\/ja\/development-check"/);
  assert.match(noteBridge, /href="\/ja\/development-check"/);
});

test("clinic and feedback support is optional and never interrupts enrollment", () => {
  assert.match(clinicSupport, /stage: "application" \| "feedback"/);
  assert.match(clinicSupport, /参加・フィードバックへの回答は、応援会員への加入とは無関係/);
  assert.match(clinicSupport, /重複してお申し込みいただく必要はありません/);
  assert.doesNotMatch(clinicSupport, /Stripe|Square|決済リンクを作成/);
  assert.match(application, /ClinicSupportInvitation stage="application"/);
  assert.match(feedback, /ClinicSupportInvitation stage="feedback"/);
  assert.match(kagoshima, /ClinicSupportInvitation stage="application"/);
  assert.match(kagoshima, /action="\/api\/clinics\/kagoshima-20261129\/checkout"/);
  assert.ok(kagoshima.indexOf("ClinicSupportInvitation stage") > kagoshima.indexOf("</form>"));
});

test("corporate payments stay separate from personal note subscriptions", () => {
  assert.match(business, /企業広告パートナー/);
  assert.match(business, /\/ja\/supporters/);
  assert.match(business, /support-personal-note/);
  assert.match(business, /buy\.stripe\.com/);
  assert.doesNotMatch(clinicSupport, /buy\.stripe\.com/);
  assert.match(journal, /<NoteBridge variant="journal"/);
  assert.match(journal, /<GrowthClickTracking \/>/);
});
