/** COLLECTION 001 is the approved RBA-managed domestic preorder; it is not the legacy Shopify Performance Tee. */
export const collectionRelease = {
  approvedOn: "2026-11-27",
  stripeAccount: "acct_1UGdxZRXDnnSs6XN",
  currency: "jpy",
  shippingCountry: "JP",
  shippingYen: 0,
  dispatchWeeks: 3,
  returnDays: 8,
  evidence: { ownerApprovedTerms: true, ownerConfirmedFulfilment: true, stripeLiveLinksVerified: true },
  products: {
    tee: { name: "WHITE TEE", amount: 6600, link: "https://buy.stripe.com/aFa7sN6ab8vy1Mp9gr7EQ1Q", sizes: ["S","M","L","XL"] },
    setup: { name: "BLACK SETUP", amount: 19800, link: "https://buy.stripe.com/bJe4gB1TVh241Mp3W77EQ1P", sizes: ["S","M","L","XL","XXL"], pants: ["M","L","XL"] },
  },
} as const;

const allowed = {tee:"https://buy.stripe.com/aFa7sN6ab8vy1Mp9gr7EQ1Q",setup:"https://buy.stripe.com/bJe4gB1TVh241Mp3W77EQ1P"} as const;
type CollectionProduct = keyof typeof allowed;
type ReleaseEvidence = Record<keyof typeof collectionRelease.evidence, boolean>;
export function collectionCheckout(product: CollectionProduct, evidence: ReleaseEvidence = collectionRelease.evidence, link: string = collectionRelease.products[product].link): string | null {
  if(!Object.values(evidence).every(Boolean)) return null;
  return link === allowed[product] ? link : null;
}
