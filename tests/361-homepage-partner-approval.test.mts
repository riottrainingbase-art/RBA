import assert from "node:assert/strict";
import { test } from "node:test";
import { mayPublishProductSupport, support361Japan } from "../lib/brand-partner-361.ts";

test("361° logo is not publicly published before brand consent and official asset", () => {
  assert.equal(mayPublishProductSupport(support361Japan), false);
  assert.equal(support361Japan.officialLogoPath, null);
  assert.equal(support361Japan.publishedLogoUseApproved, false);
  assert.equal(support361Japan.publicSupportWordingApproved, false);
});
test("product-support listing requires all independent brand approvals", () => {
  const valid = {
    ...support361Japan,
    officialLogoPath: "/brand-logos/361-official.svg",
    officialLogoProvidedByBrand: true,
    publishedLogoUseApproved: true,
    publicSupportWordingApproved: true,
    projectScopeConfirmed: true,
    approvalReference: "written-permission-reference",
  };
  assert.equal(mayPublishProductSupport(valid), true);
  for (const key of ["officialLogoProvidedByBrand","publishedLogoUseApproved","publicSupportWordingApproved","projectScopeConfirmed"] as const) {
    assert.equal(mayPublishProductSupport({ ...valid, [key]: false }), false);
  }
  assert.equal(mayPublishProductSupport({ ...valid, officialLogoPath: "https://other.example/361.svg" }), false);
  assert.equal(mayPublishProductSupport({ ...valid, approvalReference: null }), false);
  assert.equal(mayPublishProductSupport({ ...valid, relationship: "financial_support" as unknown as "product_support" }), false);
});
