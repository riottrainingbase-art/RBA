# RBA ESSENTIALS — launch / Instagram commerce checklist

## Current scope (2026-11-16)

- **Collection**: white RBA ESSENTIAL TEE; black RBA ESSENTIAL SETUP (pullover hoodie + wide sweatpants).
- **Visual direction**: luxury-editorial minimalism, generous whitespace, paper/charcoal palette, oversized serif headings, no invented badges, discounts or scarcity.
- **Current state**: DESIGN CONCEPT ONLY. Generated visuals are not photographs of manufactured merchandise. No confirmed factory order, retail price, size chart, delivery estimate or returns policy. Do not collect payments or advertise in stock.
- **Stable product URLs**: `/ja/essentials/tee` and `/ja/essentials/setup`. These are reserved for eventual Meta catalog landing destinations. Collection: `/ja/essentials`.
- **Photo hosting**: current mockups are on the existing connected Shopify CDN. Transfer approved final photography to durable RBA-controlled asset storage before depending on it for a permanent live store.

## Manufacturing + brand approval (launch blockers)

- [ ] Confirm RBA logo master and rights for use on goods. Match complete official RBA mark exactly; do not substitute AI-generated approximations in production art.
- [ ] Confirm patch construction and dimensions. Compare 4 cm and 5 cm, with **4 cm currently a preference, not a final specification**.
- [ ] Receive and inspect physical T-shirt and full black hoodie/pants samples (collar print/label, hems, pocket, seams, material, colorfastness, wash/dry behavior).
- [ ] Verify supplier quotes, minimum orders, rework terms, delivery lead times, payment terms and fulfillment workflow.
- [ ] Confirm fiber content, care labels and any mandatory Japanese clothing quality labeling; produce accurate size charts from physical garments.
- [ ] Take original product photos (front/back/label/fit/texture) and replace generated **concept** imagery.
- [ ] Finalize sellable variants and SKU inventory rules: T-shirt size; setup size (and whether hoodie/pants may need different sizes).
- [ ] Decide preorder vs made-to-order with firm consumer-facing delivery estimates and fulfillment capacity.

## Commerce readiness (before any BUY button)

- [ ] Confirm tax treatment, tax-inclusive JPY prices, payment processing fees, shipping/packing cost and contribution margin.
- [ ] Publish current legal merchant identity and legally required Japan `特定商取引法に基づく表記` / communication-commerce disclosures; verify privacy policy and contact address.
- [ ] Publish clear delivery, cancellation, return/refund, incorrect-size, defects, overseas customs/fees and order-change terms. Do not claim all made-to-order returns are automatically nonrefundable.
- [ ] Use the RBA-approved Stripe live account **only after** owner approval of the commercial terms. Never reuse unrelated event/clinic Payment Links.
- [ ] Build a real item/size/quantity checkout with accurate total incl. shipping, success & cancel states, signed webhook/order reconciliation, email confirmation, inventory/production order and refund flow.
- [ ] Test successful purchase, declined payment, duplicate click, wrong/empty address, refund, webhook retry and order-email delivery in a sandbox. Validate mobile Safari and Chrome.
- [ ] Record approval evidence and enable purchase UI via a separate reviewed change. Do not silently convert the current free interest survey into an order form.

## Instagram / Meta commerce

- [ ] Ensure @riot.basketball.academy is a professional account with required Facebook page, verified domain/ownership and relevant Commerce Manager permissions.
- [ ] Verify up-to-date Meta eligibility and commerce policies for Japan. Approval and product tagging are not guaranteed.
- [ ] Create catalog entries using **confirmed** price, stock/preorder policy, variants, images and the individual stable product URLs (not this concept page with no price).
- [ ] Connect the shop/catalog to the Instagram account. Submit for review and check status before claiming shopping tags work.
- [ ] Once approved, tag products in relevant posts/reels and put the collection or product links in Stories and bio. Checkout may open an external website.
- [ ] Add campaign tracking (e.g., UTM) to Instagram launch links and measure product views, checkout starts, completed purchases and return rate. Preserve privacy settings.
- [ ] Keep a Stories link fallback to the official RBA site if product tagging is unavailable.

## Review before merging collection page

- [ ] CI, typecheck, mobile 390px + desktop 1440px, screenshot, keyboard focus and external image loading.
- [ ] Confirm existing /ja/store Performance Tee and /authentics are unchanged and that new collection is labeled pre-launch.
- [ ] Confirm content/brand photo permissions and no false manufacturing or shipping claims.
- [ ] Merge design separately from eventual payment launch; verify linked deployment for live release only after review.
