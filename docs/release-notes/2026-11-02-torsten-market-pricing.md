# Torsten Loibl Online Clinic Vol.2 — pricing and registration routes (2026-11-02)

- **Japan:** LIVE JPY 3,300 (tax included); 30-day recording JPY 4,400 (tax included). Use the existing Japanese Google Form and its post-submission payment path.
- **International:** LIVE USD 29; 30-day recording USD 29. Use the existing direct USD Stripe checkout via `/events/torsten-loibl-online-clinic#register`, without the Japanese Google Form.
- Existing international Stripe payment links were checked as active on the RBA live Stripe account. They were not created or modified as part of this release.
- English, Traditional Chinese and Korean public entrypoints lead to the international USD checkout, with a Japan JPY route available. The Japanese page remains on its original domestic payment flow.
- The user explicitly clarified that international and Japanese pricing are different. Do not globally convert or equalize them.
- Source PRs: #294 (corrected `main`) and #295 (released to `preview-rba`).
