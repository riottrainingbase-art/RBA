import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";

const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const config=read("lib/rizehope-2027.ts");
const component=read("components/rizehope-international.tsx");
const css=read("components/rizehope-international.module.css");
const hub=read("components/international-platform.tsx");
const ja=read("app/ja/international/rizehope-japan-2027/page.tsx");
const en=read("app/international/rizehope-japan-2027/page.tsx");

test("RIZEHOPE appears in RBA International without replacing other programmes",()=>{
 assert.match(hub,/RizehopeInternationalTeaser locale=\{locale\}/);
 assert.match(hub,/RBA JAPAN EXPERIENCE/);
 assert.match(hub,/JAPAN BASKETBALL VISITS/);
 assert.match(component,/\/ja\/international\/rizehope-japan-2027/);
 assert.match(component,/\/international\/rizehope-japan-2027/);
});

test("dedicated pages support Japanese and English SEO and accessibility",()=>{
 assert.match(ja,/lang="ja"/);
 assert.match(en,/lang="en"/);
 assert.match(ja,/canonical:/);
 assert.match(en,/canonical:/);
 assert.match(ja,/RizehopeInternationalPage/);
 assert.match(en,/RizehopeInternationalPage/);
 assert.match(component,/aria-labelledby="rizehope-entry-title"/);
 assert.match(component,/aria-labelledby="rizehope-faq-title"/);
 assert.match(css,/:focus-visible/);
 assert.match(css,/@media\(max-width:650px\)/);
});

test("venue booking and event presentation permissions correctly represent user-confirmed facts",()=>{
 assert.match(config,/reservedForBothDays: true/);
 assert.match(config,/presentationPermitsObtained: true/);
 assert.match(component,/両日予約済み/);
 assert.match(component,/入場演出の許可は取得済み/);
 assert.match(component,/Venue reserved for both dates/);
 assert.match(component,/presentation permits obtained/i);
 assert.match(config,/courtAllocationFinal: false/);
 assert.match(config,/sessionHoursFinal: false/);
 assert.doesNotMatch(component,/体育館.*未予約|会場の予約待ち|not booked/);
});

test("three free interest routes do not promise paid or confirmed tournament admission",()=>{
 assert.match(config,/263221234159047/);
 assert.match(config,/263220855042046/);
 assert.match(config,/263221266794057/);
 assert.match(component,/無料の先行参加意向受付/);
 assert.match(component,/RBA UNITED/);
 assert.match(component,/Free expressions of interest are open/);
 assert.doesNotMatch(component,/RBA UNITED.*参加確定|必ず出場|guaranteed games/);
});

test("payments default closed and require price, organiser confirmation, policy and checkout URL",()=>{
 assert.match(config,/status: "not-open"/);
 assert.match(config,/overseasTeam: \{/);
 assert.match(config,/japanTeam: \{/);
 assert.match(config,/unitedPlayer: \{/);
 assert.match(config,/verifiedCheckoutUrl: null/);
 assert.match(config,/displayPrice: null/);
 assert.match(config,/officialEntryTermsUrl: null/);
 assert.match(config,/officialRefundTermsUrl: null/);
 assert.match(config,/&& p\.organiserApprovedPaidRegistration/);
 assert.match(config,/&& programme\.finalAgeRulesPublished/);
 assert.match(config,/&& p\.cancellationAndRefundTermsPublished/);
 assert.match(component,/isRizehopePaymentOpen\(track\.key\)/);
 assert.match(component,/決済の受付は行っていません/);
 assert.match(component,/payment\.displayPrice/);
 assert.match(component,/payment\.officialRefundTermsUrl/);
 assert.doesNotMatch(component,/createCheckoutSession|\/api\/commerce\/checkout|stripe\.checkout/);
});

test("future gallery requires rights and photos of minors consent; no synthetic attendance record",()=>{
 assert.match(config,/gallery: \[/);
 assert.match(config,/usageRightsConfirmed: true/);
 assert.match(config,/childrensPhotoConsentConfirmed: true/);
 assert.match(config,/imageFilePresentAndVerified: false/);
 assert.match(config,/sourceEventVerified: false/);
 assert.match(config,/creditVerified: false/);
 assert.match(config,/photo\.creditVerified/);
 assert.match(config,/photo\.imageFilePresentAndVerified/);
 assert.match(config,/photo\.sourceEventVerified/);
 assert.match(config,/01-rizehope-banner\.webp/);
 assert.match(config,/09-team-celebration\.webp/);
 assert.match(config,/usageRightsConfirmed/);
 assert.match(config,/childrensPhotoConsentConfirmed/);
 assert.match(config,/photo\.src\.startsWith\("\/media\/rizehope-2027\/"\)/);
 assert.match(component,/approvedRizehopeGallery/);
 assert.match(component,/写真は後日掲載予定/);
 assert.match(component,/Images of other events will never be presented as this event/);
});

test("local partners are a contact route only until sponsors and supporters sign up",()=>{
 assert.match(component,/sponsorFoot/);
 assert.match(component,/後援・共催/);
 assert.match(component,/mailto:/);
 assert.match(component,/not claimed before a separate agreement/);
});
