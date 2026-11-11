/**
 * RBA Performance Tee commercial release contract.
 *
 * Buyer checkout is intentionally disabled until EVERY real-world prerequisite
 * has been verified. These are records of facts, never flags to flip simply to
 * make the UI display a purchase button.
 *
 * Keep the official Shopify GID stable; do not reuse legacy USD69/XS/3XL
 * placeholders as product variants. Shopify is currently trial / USD / DRAFT.
 */
export const RBA_PERFORMANCE_TEE_PRODUCT_ID =
  "gid://shopify/Product/9709290946817" as const;

export type TeeReleaseGate =
  | "paidStorePlanConfirmed"
  | "supplierFulfillmentVerified"
  | "physicalSampleApproved"
  | "actualSizesAndRetailPriceApproved"
  | "taxShippingReturnsAndSellerDisclosuresConfirmed"
  | "successfulFulfillmentTestOrder";

export type TeeReleaseEvidence = Record<TeeReleaseGate, boolean>;

export const performanceTeeRelease: {
  phase: "preparation" | "live";
  confirmedShopifyProductUrl: string | null;
  currencyCode: "USD" | "JPY";
  approvedPrice: number | null;
  approvedSizes: readonly string[];
  evidence: TeeReleaseEvidence;
} = {
  phase: "preparation",
  // Add ONLY the exact published Shopify product URL from a tested listing.
  // Do not derive a handle from the draft title.
  confirmedShopifyProductUrl: null,
  currencyCode: "USD",
  approvedPrice: null,
  approvedSizes: [],
  evidence: {
    paidStorePlanConfirmed: false,
    supplierFulfillmentVerified: false,
    physicalSampleApproved: false,
    actualSizesAndRetailPriceApproved: false,
    taxShippingReturnsAndSellerDisclosuresConfirmed: false,
    successfulFulfillmentTestOrder: false,
  },
};

export function safePerformanceTeeProductUrl(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" ||
        !["hqg7dh-wp.myshopify.com"].includes(url.hostname) ||
        !/^\/products\/[a-z0-9][a-z0-9-]*\/?$/.test(url.pathname) ||
        url.search || url.hash || url.username || url.password) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function canSellPerformanceTee(
  state: typeof performanceTeeRelease = performanceTeeRelease,
): boolean {
  return state.phase === "live" &&
    Number.isFinite(state.approvedPrice) && (state.approvedPrice ?? 0) > 0 &&
    state.approvedSizes.length > 0 &&
    Object.values(state.evidence).every(Boolean) &&
    Boolean(safePerformanceTeeProductUrl(state.confirmedShopifyProductUrl));
}

export const PERFORMANCE_TEE_INTEREST_FORM = "https://form.jotform.com/262947168647069" as const;
