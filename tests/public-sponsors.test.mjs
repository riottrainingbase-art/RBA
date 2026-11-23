import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {
  mayPublishSponsor,
  publishedSponsorRecords,
  sponsorLogoForPublic,
} from "../lib/public-sponsors.ts";

test("public sponsor directory does not include sales prospects or unapproved brands", () => {
  const current = publishedSponsorRecords();
  assert.deepEqual(current.map(p => p.id).sort(), [
    "khm-existing-profile",
    "nakagami-completed-2026",
  ]);
  assert.equal(current.some(p => /361|サン食品/.test(p.legalName)), false);
  assert.equal(current.every(p => p.logoPath === null), true);
});

test("new sponsor fails closed without all agreement, copy and publication approvals", () => {
  const base = {
    ...publishedSponsorRecords()[0],
    id: "candidate-not-public",
    previouslyPublished: false,
    newEntryAgreementVerified: true,
    newEntryWordingApproved: true,
    newEntryPublicationConsentVerified: false,
  };
  assert.equal(mayPublishSponsor(base), false);
  assert.equal(mayPublishSponsor({...base,newEntryPublicationConsentVerified:true}), true);
  assert.equal(mayPublishSponsor({...base,newEntryAgreementVerified:false,newEntryPublicationConsentVerified:true}), false);
  assert.equal(mayPublishSponsor({...base,newEntryWordingApproved:false,newEntryPublicationConsentVerified:true}), false);
});

test("logo must be from approved brand-logos directory and separately licensed", () => {
  const base = publishedSponsorRecords()[0];
  assert.equal(sponsorLogoForPublic({...base,logoPath:"/brand-logos/test.png"}),null);
  assert.equal(sponsorLogoForPublic({...base,logoPath:"https://cdn.example/logo.png",logoUsageApproved:true}),null);
  assert.equal(sponsorLogoForPublic({...base,logoPath:"/brand-logos/test.png",logoUsageApproved:true}),"/brand-logos/test.png");
});

test("database advertiser directory has payment, consent, publication and expiry gates", () => {
  const source = fs.readFileSync(new URL("../lib/advertisers.ts",import.meta.url),"utf8");
  for(const expected of [
    ".eq('published',true)",
    ".eq('paid_verified',true)",
    ".not('consent_confirmed_at','is',null)",
    ".gte('display_until',now)",
  ]) assert.ok(source.includes(expected), `missing advertiser gate: ${expected}`);
});
