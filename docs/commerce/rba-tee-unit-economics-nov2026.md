# RBA PERFORMANCE TEE — unit economics and 1-product launch gates
2026-11-12 JST / Internal operations, not published buyer pricing.

## Verified live merchant facts

- Store: `hqg7dh-wp.myshopify.com`. Plan is **trial**, store currency **USD**. Owner must review a paid Shopify plan and payout/payment configuration; no upgrade billed by this task.
- Shopify app installations read via Shopify Admin GraphQL on Nov 12: **Printful is installed**. This corrects an outdated Oct 23 record that lacked it.
- Product: `gid://shopify/Product/9709290946817`, **DRAFT**, 7 legacy variants XS–3XL all priced USD69 and at zero stock, inventoryPolicy DENY.
- Critically, all seven inventory variants are at the general "ストアのロケーション" location with `fulfillmentService: null`. Therefore **Printful product/SKU synchronization is NOT complete**. An installed app alone does not establish automatic fulfillment.
- All sizes and USD69 were provisional. The selected candidate **SOL'S 11939** has adult sizes S/M/L/XL/2XL. Manufacturer says breathable polyester mesh 140g/m², relaxed fit, raglan sleeves; print sample not yet approved.
- No Printful product-specific Japan manufacturing quote or Japanese shipping order total was accessible from Shopify. The public Printful US-facing product card says **USD14.77 starting price with one print**; its generic Japan T-shirts/tops shipping table shows **USD4.95 for first item**. These are illustrations only; sizing, placement, fulfilment location and country may change amounts.
- The site and Shopify descriptions remain truthful: announced intent to sell but NO accepting payments or promises before end-to-end verification.
- Trial-shop public notice (Shopify connector): "Plan: trial — you'll need to upgrade before you can start selling and unlock full features"

## Official sources

- Shopify pricing: https://www.shopify.com/jp/pricing (Basic monthly approx JPY4,850, standard domestic online payments 3.55%, as of 2026-11).
- Shopify Japan support Starter: https://help.shopify.com/ja/manual/intro-to-shopify/pricing-plans/plans-features/shopify-starter-plan (Starter unavailable to newly created shops; **do not** recommend as switch option for this shop without an in-admin availability check).
- Product: https://www.printful.com/custom/womens/t-shirts/unisex-sports-jersey-sols-11939
- Shipping: https://www.printful.com/jp/shipping
- Printful dashboard: https://www.printful.com/dashboard

## Illustrative financial model only

Inputs used in the private admin calculator: product retail JPY4,400, US-page product cost USD14.77, public category shipping USD4.95, **hypothetical** FX JPY155/USD, Japan domestic-card Shopify Payments 3.55%, and JPY300 total allowance per transaction (support + replacements). Taxes, shipping surcharges, platform FX, payment fixed fees, duties and actual Printful quotes need explicit inputs; ZERO in the demo does not mean truly zero.

### Scenario A — Seller offers free Japan shipping
- Customer total: JPY4,400.
- Printful illustration: (USD14.77 + USD4.95) x 155 = JPY3,056.60.
- Payment fee: JPY156.20.
- Other assumed variable costs: JPY300.
- **Contribution before fixed costs/tax corrections:** JPY887.20 per unit.
- Basic monthly JPY4,850 breakeven: 6 units.
- 15 units hypothetical: JPY8,458 after the JPY4,850 monthly fee but before real tax etc.

### Scenario B — Hypothetical 550 yen shipping paid by customer
- Customer total JPY4,950; processing fee applies **to whole gross**: JPY175.725.
- Same illustrative supplier cost JPY3,056.60; support buffer JPY300.
- Contribution JPY1,417.675 / unit.
- Basic monthly breakeven: 4 units. This does not establish that shipping 550 yen is adequate or permitted; supplier cost in example is USD4.95 ≈ JPY767 at hypothetical FX.

### Actual decision rule
Only set retail price and shipping after Shopify domestic pricing/tax treatment, Printful quote **per intended size and Japan destination**, card fees, import taxes, return/defect provisions, platform FX and customer-communicated delivery windows are measured. Use an explicit safety margin for USD/JPY volatility. Never blindly convert the USD69 legacy listing or assume USD14.77 is the final Printful Japan cost.

## Private simulation tool (added in PR)
- Path `/ja/store/manage`, **only RBA admin with authenticated Supabase session**; unprivileged or signed-out visitors get notFound.
- Inputs retail, separately charged shipping, Printful supplier product/shipping in USD, hypothetical FX, card rate, tax/FX/refund/support buffers, monthly fixed fee, sales quantity, target contribution.
- Outputs gross, total variable cost, per-unit contribution, monthly projected net, break-even units, and a suggested price to reach the target under **current user assumptions**.
- Includes scenario price comparison and six visible release checks. Neither calculator nor changes to its fields mutate Shopify product/price or process payments.
- Numbers are transient client-state, not stored in the database. Any sharing of the output must be described as an illustration, not a verified supplier quotation.

## Launch path with low operating burden
1. Keep just ONE black performance tee; no XS/3XL until manufacturer actually offers them; avoid on-demand personalization or multiple colors.
2. In Shopify Admin pick the paid selling plan/payment and storefront currency after verifying the impact on **all existing products**. This needs the merchant's explicit action. Do not change USD store-wide currency via a blind mutation.
3. In the already installed Printful app select SOL'S 11939 and actual left-chest print/embroidery technique, then provide print-ready official logo (do not upscale the low-res web JPG as if it were original vector).
4. Approve a single sample and verify color, comfort/sweat, logo fidelity, print, dimensions, laundry and shipping to Japan.
5. Use Printful sync, not just matching SKUs. Inspect that Shopify variant inventory location is Printful fulfillment and correct sizes are actual, no legacy dummy.
6. Configure exact product/supplier costs, real store price, shipping profile, fulfilment rules, legal returns/cancellations, Japan seller disclosures, restricted country/market list. Do not enable international countries before shipping validation.
7. Conduct one controlled paid order plus declined/cancelled/unpaid tests with paid fulfillment held until valid, avoid duplicate prints, verify fulfillment and tracking. Do not charge real buyers until done.
8. Obtain buyer-facing Shopify product URL from published verified product and change the source-controlled **fail-closed release manifest** only after all checks. QA and release site without rebuilding production outside branch policy.
9. Track monthly: store visits, anonymous interest, opted-in launch email demand, orders paid, per-order contribution, return/defect rate, fulfillment failures and owner support minutes.
10. Expand items only after actual margin and shipping support cost prove sustainable. No affiliate/information-product expansion needed.

## Lead capture / privacy
Existing no-obligation survey: https://form.jotform.com/262947168647069 . On Nov 12 before editing, it showed 0 responses and quoted an illustrative JPY4,400 tee + JPY550 shipping. An optional email address with a separate unchecked permission is under edit/review; **do not send email automatically or assume that edit published without read-back**. Never market to children; request parent input only and honor opt-out. A request is NOT a reservation.

## Release safety
Main PR #426 was fully tested and merged as 141db457. PR #427 staged exactly five files on preview-rba with no [preview] build token. The actual production deployment is still the older commit ef0a5b4b. This profit-calc change is not automatically production, and no customer checkout has been opened.
