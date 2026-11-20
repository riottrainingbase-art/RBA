# RIZEHOPE JAPAN 2027 — RBA UNITED individual payment launch gate

Status as of 2026-11-20: free guardian EOI enabled, paid checkout disabled.

The existing parent form is https://form.jotform.com/263221266794057. Do not lose existing responses. The general domestic U12 team fee is 66,000 JPY per TEAM, not one UNITED player's fee. The individual per-player total, deposit and balance have not been finalized.

A single RBA UNITED roster may be formed if age rules, sufficient eligible players, adult coaching, safeguarding, and remaining space within the combined ten-team tournament cap are all verified. RBA UNITED has no preferential reserved team slot.

Payment architecture must:
1. review applications separately from payments and obtain clear guardian consent;
2. determine formal organizer, individual price, Japanese tax treatment, payment collector, insurance, refund/cancellation terms, and balance due date before collecting funds;
3. link a selected player to an approved guardian application identifier; no anonymous public deposit payment link;
4. make the deposit part of the quoted individual total, not an extra fee; prevent double payment; keep balance blocked until deposit success;
5. associate each approved checkout with the correct applicant and Stripe Checkout Session / PaymentIntent; verify signed webhook, idempotency, and paid status before marking paid;
6. issue receipts, refunds, cancellation approvals and balance reminders only after an operator verifies relevant terms and status.

Production account: acct_1UGdxZRXDnnSs6XN (Riot Basketball Academy). Do NOT use other connected merchant accounts.

Current site gate in lib/rizehope-2027.ts: unitedIndividual.individualCheckoutEnabled false, all monetary values null and underlying payments.unitedPlayer not-open; isRizehopeUnitedIndividualPaymentReady checks total == deposit + balance and necessary approvals.

Public page: /ja/international/rizehope-japan-2027/united . It contains only free interest, not checkout. Do not merge/deploy live until build, accessibility, mobile and links are tested. Do not send paid messages or activate any price/Payment Link until tax/refund/consent are complete.
