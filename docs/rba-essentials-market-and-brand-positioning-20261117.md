# RBA ESSENTIALS | Market research + brand positioning
**Review date:** 2026-11-17 (Japan)  
**Scope:** First Drop official white tee and black hoodie + trousers. This is a merchandising/design review, **not** approval to launch. No live Stripe toggles, redirects, catalog feeds, refunds, production, or shipping are authorized by this document.

## Decision in one sentence
Build an accessible **basketball-born editorial apparel** label, not an imitation of a luxury house or an ordinary logo-merchandise page: a visibly RBA black/off-white/court-grey system, grounded in Sendai and the academy's player-centred mission.

## Verified price observations (official direct-to-consumer listed prices)
These are **examples**, not fabric/specification-matched quotations. Retail prices and availability may change.

| Reference | Observed Japan listed retail example | Evidence |
|---|---|---|
| EGOZARU basic graphic T-shirts | ¥4,400; some oversized T-shirts ¥5,500 | https://egozaru.jp/collections/t-shirts (2026-11-17 review) |
| EGOZARU sweatshirt separates | hooded sweatshirt ¥9,900 + sweatpants ¥9,900 = ¥19,800 for one listed pair of separates | https://egozaru.jp/collections/setup |
| ballaholic Logo Tee | ¥4,950 | https://ballaholic.jp/collections/all |
| ballaholic Small Logo Sweat Pants | ¥19,800 for bottoms alone | https://ballaholic.jp/collections/pants |
| Fear of God ESSENTIALS 2026 classic tee | ¥13,800 | https://fearofgod.com/en-jp/collections/all-essentials |
| Fear of God ESSENTIALS 2026 classic hoodie | ¥29,300 | https://fearofgod.com/en-jp/collections/all-essentials |
| **RBA FIRST DROP listed proposal** | **T-shirt ¥4,900; setup ¥19,800**, Japan presale shipping included | RBA internal first-drop site and checkout specification |

**Price implication:** The RBA proposal is broadly aligned with specialist Japanese basketball apparel; price alone does not create luxury positioning. Do **not** raise or activate either price without signed-off sample fabric quality, landed cost, producer compensation, buyer returns, fulfilment and legal review. Fear of God is a visual/positioning benchmark, not a product-equivalent competitor; do not imply quality parity.

## Design and editorial benchmarks
- **The Row**: restraint, typography and attention to materials; its official About text stresses exceptional fabrics, precise tailoring and simple shapes. Inspiration only; no brand/trademark/layout duplication. https://www.therow.com/en-jp/pages/about-us/1000
- **Fear of God ESSENTIALS**: apparel as everyday cultural identity, loose shapes and minimal wardrobe; study visual rhythm and product clarity, not logos or copy. https://fearofgod.com/en-jp/collections/all-essentials
- **RBA official identity**: black/white/grey, direct and credible field practice; its existing official site presents player development, evidence-informed physical preparation and international connection. https://riotbasketballacademy.com/ ; https://riotbasketballacademy.com/about
- **Conversion trust**: Shopify 2026 product-page guides prioritize clear price/CTAs, multiple accurate product angles, material and size details, delivery and return information. Do not bury the checkout terms under editorial storytelling. https://www.shopify.com/blog/product-page ; https://www.shopify.com/blog/expert-advice-improve-product-pages

## Buyer segments and jobs to be done (hypotheses; not proven sales data)
1. RBA families/participants: discreet logo clothing to use in daily life and on travel days; need genuine sizing and fulfilment confidence.
2. Coaches and basketball community: the philosophy matters more than team merchandise; want minimal and durable styling.
3. Non-basketball customers drawn to black/white editorial design: need standalone garment quality and styling proof without knowing RBA in advance.

Do not state that these segments convert at any assumed rate. Test via consent-based site analytics and voluntary buyer feedback after approved launch.

## RBA brand system for First Drop
- **Primary:** RBA near-black #111111; **secondary:** off-white #F4F2EC; **third:** court-grey #858585; optional muted warm paper #E9E7E0 for editorial chapters. These are an **online shop palette proposal**, not an assertion that RBA has formally adopted new trademark colors.
- Official RBA logo must be used exactly as approved. Never recolor, fake-stamp, alter proportions, or replace the trademark with a designer imitation.
- Editorial motifs: bold RBA name, page/chapter numbers, spacious narrow rules suggesting court geometry, serif contrast for the story, restrained motion; do not create high-fashion counterfeit look.
- Tone: confidence without invented brand antiquity. Verifiable origin: representative's Germany S&C experience, Sendai operating base, nationwide development clinics and international collaboration direction; keep planned projects separate from completed facts.
- No model shots. Use verified existing flat-lay/garment images and mark current digital images as **design references / not physical samples** until professional physical product photos exist.
- Product experience must foreground size dimensions, material composition, fabric thickness only when verified, wash care, maker, shipping deadline, legal seller and returns. First Drop shipping free **Japan only**.
- Handpaint/artist edition remains separate and gated; no unapproved surcharge or order acceptance.

## Site architecture (readiness-gated)
1. `/ja/essentials`: editorial collection, black-white design references, prices, explicit presale status, story entry.
2. `/ja/essentials/story`: **real** RBA history, development philosophy, Germany → Sendai → Japan/Asia framing (not fabricated dates or luxury credentials).
3. `/ja/essentials/tee` and `/ja/essentials/setup`: quick commercial information, product specifics, explicit unverified samples, story crosslink.
4. `/ja/essentials/legal`: legal disclosures, terms and conditions before any charge.
5. `/ja/essentials/checkout`: protected by existing commerce readiness conditions. Never bypass the gate for design convenience.

## Required launch gates
- Physical samples with measured fabric, garment chart, washing/colour-fastness/sizing and official logo accuracy.
- Actual landed cost budget with production, labels, packaging, payment fees, allocated shipping and returns; contribution margin `price - variable cost` and break-even `fixed spend / contribution per unit` (test mix for two SKUs; do not assume either cost).
- Written fulfilment/artist responsibility, customer-service owner, one-month deadline capacity, privacy and consumer-return policies.
- Stripe account/site brand coherence, exact price IDs and live link metadata, webhook signature, Supabase order write, idempotency, private delivery handoff and acceptance-notice tests.
- Responsive/mobile Safari product pages and accessibility/readability; measure product clicks → checkout starts → successful paid orders, refund/return rates and delivery SLA.
- **No production release / no Stripe activation** solely because this editorial code was committed.

## Implementation record
- Added an editorial RBA mission strip and authentic origin section to First Drop shop.
- New `/ja/essentials/story` editorial chapter with no invented founding chronology.
- Mobile-first styling added without introducing metallic gold, model photography, fake craftsmanship claims or checkout changes.
- The current branch and PR remain **draft / not launched** until reviewed.
