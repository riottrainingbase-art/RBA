# RBA STORE — BRAND & COMMERCE SYSTEM

**Working specification · 2026-11-17 · Not a sales release approval**

## One official shop, one unmistakable founder identity

- Public shop: **RBA STORE** — the clearly descriptive official online store of **Riot Basketball Academy**.
- Official mark: use the verified asset `/rba-logo-original.jpg`; do not invent a lookalike crest, repaint the letters, or replace the original identity with a fashion-brand monogram.
- Purpose: "勝敗の先に、残るものを。" The central reference is RBA's long-term work in youth development and international basketball exchange, not a supposed luxury pedigree.
- Primary web gateway: `/ja/store`.
- Everyday collection: `/ja/essentials` remains the **technical route** for COLLECTION 001, with `/ja/essentials/tee`, `/ja/essentials/setup`, and `/ja/essentials/story`. Existing links must not be broken.
- Performance initiative: the RBA Performance Tee remains on the same official shop page, with its **independent** Shopify and sample-readiness gates. Avoid presenting it as part of the first-drop TEE/SETUP Stripe offer.

## Naming rules

1. The apparel brand is **Riot Basketball Academy**; the store is **RBA STORE**. This is a descriptive presentation hierarchy, not an unsupported assertion of a separately registered clothing trademark.
2. `OFF COURT` means daily wear outside practice **as editorial taxonomy only**. Do not present it as an independent line or graphic wordmark: OFFCOURT Clothing Co. and OFF THE COURT by NBA already operate in basketball apparel.
3. Do not use `ESSENTIALS` as the public collection brand in the new presentation. The technical route, database names, Stripe payment link IDs, env names and historical commercial documents remain unchanged until a separate audited migration, if one is ever needed.
4. Product labels: **RBA WHITE TEE** and **RBA BLACK SETUP** (public-facing, unambiguous). The number `COLLECTION 001` is an internal editorial series order, **not** a fabricated limit of production quantity or exclusive numbered edition.
5. For operational integrity, before releasing a purchase flow verify that legal disclosures, Stripe line-item names, checkout screens, acknowledgement emails, and Supabase order records consistently identify the same products.

## Identity and presentation

- Visual foundation: official RBA logo + black, warm off-white and court-grey; no ornamental luxury-gold treatment.
- Hierarchy: official RBA logo / RBA STORE / story / garments / buyer conditions / performance.
- Edit the page like an exhibition, not a discount marketplace: high-quality imagery, open space, editorial rhythm, explicit product-specific detail.
- Copy is in natural Japanese. English headings may support the layout, but do not hide essential sale information behind English.
- Product assets linked in `lib/rba-essentials.ts` are **CG design references**, not physical samples. Never imply verified manufacture, material, color accuracy or photography.
- Avoid product scarcity timers, fake customer testimonials, invented rankings, unjustified "limited" claims, and invented brand founding dates.
- Use the official logo in `/ja/store`; do not replace it with an AI-made logo.

## History and philosophy — source integrity

Story anchors: German S&C/basketball experience, Sendai / Riot Training Base, youth development, clinics across Japan, and cross-cultural basketball exchange. Describe the actual philosophy rather than invent a precise founding year or mythic origin.
The 2026-2036 internal brand research distinguishes:
- **Long wear**: repeatable, well-verified garment patterns; sell only after sampling.
- **Human mark**: future artist-led work with consent, credit, rights, fair pay, real physical wash and safety checks; no handpaint claim when printed.
- **Archive**: maintain records of creation, community, work, and improvements rather than permanent new-drop pressure.
These are directions, **not currently available products**.

## Product pathways

### COLLECTION 001 / daily wear

| Item | Retail reference | Status |
| --- | ---: | --- |
| RBA WHITE TEE | JPY 4,900 tax included | Product concept; not live |
| RBA BLACK SETUP | JPY 19,800 tax included | Product concept; not live |

First-drop domestic shipping is intended to be JPY 0. Do not promise inventory, delivery or actual samples before approval. Interest registration is free and **not** a reservation or paid order.

### Performance Tee

Continue to use `canSellPerformanceTee` and `safePerformanceTeeProductUrl` with original evidence gates. Do not flip readiness to true, invent sizes or prices, or mix Shopify with the first-drop Stripe reconciliation workflow.

## Unchanged financial and privacy contracts

Do not modify the live account `acct_1UGdxZRXDnnSs6XN`, TEE link `plink_1UcRBCRXDnnSs6XNEW4xN93M`, SETUP link `plink_1UcRBHRXDnnSs6XNoHlBdpSQ`, the HOMECOURT Supabase tables `public.rba_essentials_orders` and `public.rba_essentials_fulfillment_tasks`, or customer personal data.

The front-end editorial rebrand **never** authorizes actual sales or payments. Keep `RBA_ESSENTIALS_PREORDER_ENABLED` and all manufacturing, samples, seller disclosure, warranty/returns, delivery, Stripe branding, webhook, acknowledgement, ledger, shipping and one-month arrival controls as mandatory fail-closed requirements.

RBA's youth activities must not condition participation on buying merchandise. Merchandise sales should not be represented as donations or tax-deductible gifts.

## Quality and future release

- Verify `pnpm exec tsc --noEmit --pretty false`, existing RBA Preflight QA, checkout/handpaint gates, store performance-tee gates, buyer disclosures, SEO canonical, and mobile 375px / 390px / 768px / desktop layouts.
- Audit headings, image alt text, links, contrast, reduced motion, focus indicators, and accurate Japanese.
- Private review of Stripe/live order reconciliation and Supabase fulfillment remains separate from design review.
- A passing CI on a draft PR does **not** authorize production merge or sales. Keep this project draft until approved.
- Check formal product name availability and distinctiveness (e.g. J-PlatPat, equivalent markets) before ever attempting separate apparel-mark registration.

## Sources consulted

- RBA's internal 2026-11-13 ten-year apparel market/brand foundation and deep research studies (working papers).
- OFFCOURT Clothing Co. (https://offcourtco.com/).
- OFF THE COURT by NBA official site (https://offthecourtbynba.jp/).
- J-PlatPat trademark search (https://www.j-platpat.inpit.go.jp/).
