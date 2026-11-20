import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const contains = (contents, literal) => assert.ok(contents.includes(literal), `Missing source text: ${literal}`);
const excludes = (contents, literal) => assert.ok(!contents.includes(literal), `Unexpected source text: ${literal}`);

test("UNITED separates verified formal applications from free interest", () => {
  const page = source("components/platform-business-pages.tsx");
  contains(page, "FORMAL APPLICATION / DATA-LISTED");
  contains(page, "韓国・仁川 IYIBS 2027");
  contains(page, "無料の参加意向登録");
  contains(page, "263207310187047");
  contains(page, "/ja/international/rizehope-japan-2027/united");
  excludes(page, "現在、募集を確認できるRBA UNITED企画はありません。");
});

test("UNITED dates use Japan's calendar date, not UTC's date", () => {
  const page = source("components/platform-business-pages.tsx");
  contains(page, "Date.now()+9*60*60*1000");
  contains(page, "new Date");
});

test("translated UNITED pages do not claim nonexistent below-page registration", () => {
  const page = source("components/platform-business-pages.tsx");
  contains(page, "Japan-only free-interest notices");
  excludes(page, "Free expressions of interest appear separately below");
});

test("RIZEHOPE U12 individual information route exists in release code", () => {
  const page = source("app/ja/international/rizehope-japan-2027/united/page.tsx");
  contains(page, "無料参加意向登録");
  contains(page, "出場");
  contains(page, "保護者");
  contains(page, "isRizehopeUnitedIndividualPaymentReady");
});

test("public social links show true platform-specific handles", () => {
  const page = source("components/localized-social.tsx");
  for (const handle of ["@RBAJapan2025", "@rba_official", "@riot.basketball.academy"]) contains(page, handle);
  contains(page, "{handle}");
});

test("all-language homepage removes the unverified contradictory location/attendance counts", () => {
  const page = source("components/localized-home.tsx");
  for (const value of ["3,000+", "25 activity locations", "国内25地域で活動"]) excludes(page, value);
  contains(page, "International learning and exchange");
});

test("link hub leads to official activities, social directory and founder reading", () => {
  const page = source("app/ja/links/page.tsx");
  for (const value of ["/ja/united", "/ja/social", "/ja/my-homecourt", "/ja/contact", "にしお まさと"]) contains(page, value);
  contains(page, "/ja/supporters");
  excludes(page, "rbaofficialnm2.wixsite.com");
});

test("Instagram landing links to a free, noncontractual Korea interest form", () => {
  const page = source("app/ja/instagram/page.tsx");
  contains(page, "instagram-korea-2027-free-interest");
  contains(page, "https://form.jotform.com/263207310187047");
  contains(page, "保護者から無料で参加意向を登録");
  contains(page, "登録だけで出場、航空券手配、支払いは確定しません");
});

test("site link cards must never send customers to legacy Wix", () => {
  for (const path of ["app/ja/links/page.tsx", "components/localized-social.tsx", "app/ja/instagram/page.tsx"]) {
    excludes(source(path), "rbaofficialnm2.wixsite.com");
  }
});
