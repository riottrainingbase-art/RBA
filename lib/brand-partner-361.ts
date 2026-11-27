/**
 * 361° Japan / RBA public-facing homepage support placement.
 *
 * Source of current discussion: 2026-11-05 correspondence with
 * 株式会社ジェリービーンズグループ／361°Japan (益子様).
 * Products for selected players and a participant coupon were proposed;
 * product quantities, eligibility, timing and coupon terms remain pending.
 * There is no agreed cash sponsorship for this period.
 *
 * The brand has not yet supplied an approved official logo asset or confirmed
 * that the logo and display wording may be published on the RBA homepage.
 * Do not promote this record to the public without the brand's written approval.
 * A private design mockup is maintained separately, not served from /public.
 */

export type ProductSupportPlacement = {
  id: string;
  brandName: string;
  link: string;
  relationship: "product_support";
  officialLogoPath: string | null;
  officialLogoProvidedByBrand: boolean;
  publishedLogoUseApproved: boolean;
  publicSupportWordingApproved: boolean;
  projectScopeConfirmed: boolean;
  approvalReference: string | null;
};

export const support361Japan: ProductSupportPlacement = {
  id: "361-japan-2026",
  brandName: "361°",
  link: "https://361sports.jp/",
  relationship: "product_support",
  officialLogoPath: null,
  officialLogoProvidedByBrand: false,
  publishedLogoUseApproved: false,
  publicSupportWordingApproved: false,
  projectScopeConfirmed: false,
  approvalReference: null,
};

export function mayPublishProductSupport(placement: ProductSupportPlacement): boolean {
  return placement.relationship === "product_support"
    && placement.officialLogoPath !== null
    && placement.officialLogoPath.startsWith("/brand-logos/")
    && placement.officialLogoProvidedByBrand
    && placement.publishedLogoUseApproved
    && placement.publicSupportWordingApproved
    && placement.projectScopeConfirmed
    && Boolean(placement.approvalReference);
}
