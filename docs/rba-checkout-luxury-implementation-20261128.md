# RBA site protocol implementation candidate — 2026-11-28
Scope: production unchanged until release gates pass. Based on supplied luxury / payment / transparency protocol; separate from overlapping drafts #588, #589, #593, #594. Merge or reconcile overlaps against current main before checkpoint.

## Implemented in this candidate
- Domestic Okinawa: four existing active JPY-priced Stripe links preserved; first-party allowlisted redirect enforces 12/22 09:00 JST and adds Japanese locale hint. It does NOT lock display currency; if displayed currency or amount differs, stop payment and contact RBA. No new link or price.
- Okinawa event page moves domestic pricing immediately after hero; two mobile docks (event and apply, one per page) lead to plan selection; repeated legal bundles reduced. Original provisional booking / refund terms retained.
- Kagoshima: visible tax-inclusive pricing and mobile CTA; keeps existing POST guardian/terms and deadline guard. No new sales or changed capacity.
- Japanese top: four entries plus IMPACT link, restrained color palette. Store: existing 3 products, terms link and transparent image labeling. Sponsor directory: existing monthly advertising ¥11,000, separate project consultation, IMPACT. IMPACT: conceptual sources/uses, no unsupported outcome or ratio.
- No Stripe mutation, tax setting, subscription migration, personal data, sponsor permission or pricing change.

## Not a completed release
- Need live/preview verification of all four domestic hosted Checkout screens, actual initial JPY currency (locale alone is not sufficient), payment methods by device, legal links, iOS/Android/desktop, expired and invalid route, checkout completion/fulfilment on sandbox.
- Confirm live Stripe Adaptive Pricing settings; if necessary obtain explicit approval for exact affected links and settings. Do not regenerate active links merely because a crawler errors.
- D-HUB: #590–592 main versus #588/#594 drafts; reconcile monthly live frequency and existing member access; do not introduce unapproved 3-tier prices. Confirm coach and publication permission. Aichi #593 has independent migration/webhook/terms gates.
- Real photo provenance and permissions; sponsor metrics period/source and actual approved sponsorship evidence; first impact report from actual records; full multilingual review; no fabricated testimonials.
- Existing store and Japanese Instagram route already exist in main; do not create duplicate store. Actual product images must be separately confirmed against supplied real-photo-only protocol.
- Existing global site is mixed CSS and definitive HTML; remaining page-level adoption, analytics instrumentation and successful payment denominators require dedicated follow-through.
- Follow DEPLOYMENT.md: feature branch → static preflight → one authorized preview checkpoint → exact artifact verification → approved production. No production deployment or payment changes before verification. Verify target project/domain, capacity, exact commit, and rollback candidate.
