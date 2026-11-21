# RBA always-on sales: verified Preview checkpoint — 2026-11-21

Release scope: add the Japanese `/ja/learning` comparison/purchase gateway, stable links from six pre-existing pages, sitemap entry, conversion safety assertions, and no new charges.

**Live-source baseline:** Production deployment `dpl_7cZN7Ri3LK8ZzfiRkWKgBZz2V3xx`, SHA `3a0dfa3a8fb319ca84fd9068bdfbf365dc55355c`, attached to `riotbasketballacademy.com` on 2026-11-21.

**Source backport:** Original feature PR #524, static CI green. Exactly 11 files changed from the current production SHA; all original hunks matched the production files, except sitemap where the learning list was inserted without removing regional pages.

**Check before promotion:**
- Next.js build and preview HTTP 200 for `/ja/learning`.
- Existing `/ja/materials/u12-fundamentals`, `/ja/homecourt-plus`, `/ja/d-hub/coaches`, `/ja/support` remain accessible and priced correctly.
- No new Stripe payment links, live checkout manipulation, or price change. Existing user entitlements stay unchanged.
- Main is Git-deploy-disabled. Promote only tested RBA Preview, not jpnentry-official.
- The MailerLite drip remains draft; do not send until double opt-in and purchase exclusion are verified.

**No claim of sale, receipt or new subscriber from this release.**
