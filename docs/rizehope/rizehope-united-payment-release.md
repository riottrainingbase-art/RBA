# RIZEHOPE JAPAN 2027 — RBA UNITED individual payment launch gate

Status as of 2026-11-20: free guardian EOI enabled, paid checkout disabled.

The existing parent form is https://form.jotform.com/263221266794057. Do not lose existing responses. The general domestic U12 team fee is 66,000 JPY per TEAM, not one UNITED player's fee. The financial worksheet dated 2026-11-19 proposes **JPY 36,000 / individual**, with **JPY 15,000 deposit** and **JPY 21,000 balance**, and uses 14 paid participants as its viability target (maximum 15 pending tournament rules). This is PROPOSED ONLY: neither tax-inclusive treatment nor the binding individual price has been approved. The domestic tournament team registration cost in that worksheet was JPY 70,000 as a placeholder; the 2026-11-20 reconciled model uses the published domestic two-day team proposal JPY 66,000 (subject to UNITED inclusion and organizer/accounting approval), increasing the 14-person modeled operating surplus by JPY 4,000 to JPY 108,840 before tax and unfinalized costs. **No Stripe customer can be charged under this proposed price.**

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

## Stripe Tax live verification (2026-11-20)
- Riot Basketball Academy live merchant: acct_1UGdxZRXDnnSs6XN, no alternate connected Stripe merchant accounts.
- GetTaxSettings: status active; default product tax code txcd_20030000, inferred_by_currency. This generic default has NOT been validated for tournament entry vs development coaching.
- GetTaxRegistrations: 0 registered jurisdictions; do not treat automatic tax as confirmed tax collection or guess a registration.
- Existing domestic Price pair is JPY 33,000 inclusive + JPY 33,000 inclusive on prod_VeqgtQekecgw2W. Public Payment Links are inactive.
- RBA UNITED has no finalized tax-inclusive fee, therefore no live product/Price or customer payment link is issued at this time.
- Before financially binding payments: verify tax liability and the right product category with a qualified accountant; confirm actual legal seller and invoice particulars, child safeguarding and entry approval, individual cancellation/refund policy, verified escrow/cancellation handling, and signed guardian terms.
- The total 10-team event cap includes ONE UNITED team (not one slot per selected player). Zero preferential team slots are reserved.
