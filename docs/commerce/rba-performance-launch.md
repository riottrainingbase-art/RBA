# UPDATE 2026-11-12 — Commercial launch integration (not yet live)

- Owner affirmed that RBA Performance Tee WILL be sold. Do not interpret prior preparation pages as canceling this product.
- Connected Shopify store readback: `hqg7dh-wp.myshopify.com`, currency USD, plan **trial**, requires owner to choose a paid selling plan before customer checkout.
- Existing product `gid://shopify/Product/9709290946817` remains DRAFT, 0 inventory, 7 placeholder variants XS–3XL at internal USD69; these are **not confirmed retail variants or approved prices**.
- Product description **updated directly in Shopify** to clear official performance-wear intent, candidate SOL'S 11939 manufacturer specifications, provisional sizing, customer disclosures and free launch survey. No order capture activated.
- Public page `/ja/store` redesigned as mobile-first official product landing; `/ja/links` and JP homepage other-official-links navigation added.
- `lib/performance-tee-launch.ts` is **fail-closed**. A real Shopify purchase CTA is rendered only when all readiness evidence checks pass, a nonzero price and real sizes are confirmed, `phase='live'`, and the *actual* verified Shopify product URL on the canonical RBA store is explicitly entered. No guessed product handle or unrelated Stripe link.
- Candidate manufacturer product page: https://www.printful.com/custom/collections/sportswear/unisex-sports-jersey-sols-11939 . Printed sample not yet ordered or verified. Supplied logo image is insufficient for production printing at commercial quality.
- Free existing survey: https://form.jotform.com/262947168647069 . This is neither a preorder nor an expression of guaranteed availability; do not treat anonymous interest as a paying customer.
- Before public checkout: owner activates Shopify plan and payments, selects approved retail currency/prices, configures supplier and mapping, uploads genuine print-ready logo, orders and verifies sample, ensures variants match real supplier inventory, configures taxes/shipping/returns/required seller legal disclosures, runs paid/unpaid/canceled end-to-end manufacturing tests, and records exact published Shopify product URL.
- **DO NOT** set Shopify status ACTIVE or change `phase` to live until these are complete. App connector does not provide merchant authorization for the paid plan nor the Printful installation/billing method. A new Stripe link should not bypass supplier readiness.

---
# RBA Performance Tee — release record

Status: preparation only, 2026-10-23 JST. No live checkout or supplier connection.

## Confirmed records

- Store: hqg7dh-wp.myshopify.com, Japan, USD, trial. Only Shopify ChatGPT MCP App returned by appInstallations (all results, no next page). Printful and Meta apps are not installed in that result.
- New draft: gid://shopify/Product/9709290946817. Seven adult size placeholders XS–3XL, inventory tracked, zero units. USD69 is an INTERNAL estimate, NOT an approved sale price. Never publish these placeholder variants directly.
- Existing Authentics by Gleam OKINAWA products and supplier relationship are unchanged.
- Website /ja/store is an explicitly marked prelaunch page. It accepts no orders, reservations, or payments. Instagram link is outbound only; the Instagram profile has NOT been edited.
- The website logo is 203×312px. This source is insufficient for a premium print. Obtain original vector or appropriately sized transparent raster; do not treat interpolated upscaling as restored detail.

## Supplier selection

Preferred candidate: Printful Men's Athletic T-Shirt (all-over print), public product code 103. This is NOT a verified API catalog ID. Current public display USD33 excluding shipping/tax; region, size and other charges may vary. 150g/m² sports mesh; 4-way stretch; US 92% polyester/8% spandex, EU 90% polyester/10% elastane; adult XS–3XL. Manufacturing Mexico/Latvia. Confirm exact catalog and production-region specs in the connected account. Softness/premium quality remain untested.

Alternative: Printify Sport-Tek ST350, public standard price starts USD18.15 (paid Premium price is different). Lower base cost; provider-specific fabric, print, stock, country coverage and freight need checking. Do not mix multiple providers without consistency testing.

Sources:
- https://www.printful.com/custom/collections/all-over-print/all-over-print-mens-athletic-t-shirt
- https://printify.com/app/brand/21/sport-tek
- https://help.printful.com/hc/en-us/articles/50264607936785-How-does-the-Printful-billing-system-work
- https://help.printful.com/hc/en-us/articles/50262260641297-How-do-I-connect-my-Shopify-store-to-Printful
- https://help.printful.com/hc/en-us/articles/50262336933137-How-do-I-manage-order-processing-and-fulfillment-in-Shopify

## Fulfillment setup, in order

1. Owner chooses and activates Shopify selling plan after checking current recurring price. No paid subscription started by this change.
2. Owner signs into Printful, installs the official Printful Shopify app, and authorizes only the RBA store. Add fulfillment billing method inside Printful; never send credentials or card details in chat.
3. Upload official print original to supplier template. Start with one black design, adult sizes, no personalization. Respect safe area and print resolution.
4. Order sample only after item + freight + tax total and delivery address are approved. Evaluate fit/size, comfort under sweat, stretch, opacity, logo fidelity and wash durability. Record result; revise if necessary.
5. Push the supplier-generated product with real size/color variants to Shopify. Preserve real fulfillment mapping. Replace or retire placeholder draft after verifying IDs and SKU mappings; do not assume matching SKUs alone sync products.
6. Quote Japan, Malaysia and Taiwan first. Enable only verified countries. Show product price, freight, taxes, customs handling and manufacturing + delivery estimates before payment. Do not call global delivery universal or promise duty-paid service without evidence.
7. Calculate landed margin: sale proceeds excluding collected taxes − production − shipping subsidy − payment/FX/platform fees − expected refund/replacement cost. Keep customer-paid freight separate. USD69 is not a margin guarantee.
8. Configure payment capture before import, synced paid-order import, automatic confirmation, supplier billing and shipping profile. Confirm declined/pending payments are not manufactured. Printful charges RBA separately; Shopify payouts may arrive later. Maintain fulfillment cash buffer.
9. Keep fulfillment status unfulfilled while production is queued. Shopify shipment/tracking notification follows actual supplier dispatch. Capture order cancellation cutoff and address corrections before irreversible production.
10. Publish final composition, region variation, real size chart, care, manufacture origin, target countries, shipping windows, defective/wrong item remedies, change-of-mind/size conditions, privacy and seller disclosures after factual review. Refund customer through Shopify payment method; supplier reimbursements are a separate process.

## End-to-end acceptance before launch

- A paid controlled sample/test order imports exactly once and maps size/color correctly.
- Unpaid, failed and canceled-before-import orders do not manufacture.
- Retry/import does not duplicate manufacturing.
- Billing failure generates an actionable store alert; no false shipped status.
- Real fulfillment event returns tracking and customer notification.
- Unsupported destinations cannot complete checkout; supported destinations show full costs.
- Refund/cancellation records agree between Shopify and supplier; do not promise automatic supplier refunds.
- Owner approves final sample, selling price, recurring fees and customer policies.

Do not fabricate a successful test or place paid orders without authorization for the actual cost.

## Instagram and site launch

Entry URL: https://riotbasketballacademy.com/ja/store?utm_source=instagram&utm_medium=social&utm_campaign=rba_performance_launch&utm_content=bio

Use one canonical product destination; add profile link and Story highlight after launch details are ready. The profile edit is not done. Install official Facebook & Instagram channel, connect owner's Meta business/catalog/account, verify domain and comply with current channel eligibility. Product tags/shop availability depends on approval and region; profile/Story links remain an alternative. No Meta app, catalog approval, tracking pixel or ad spend has been configured by this change.

Before enabling a buy button on the official website, use the actual published Shopify product URL or verified storefront integration. Never link directly to placeholder variants or an unrelated Stripe clinic checkout. Check mobile Safari and Instagram in-app browser through checkout, confirmation and tracking.

Measure visits and purchases by UTM using configured Shopify analytics; no fabricated GA/Meta conversions. Monitor conversion, order value, net margin per order, country freight and returns. Start with one product; only expand colors/items after sample and contribution margin are proven. No revenue guarantee.
