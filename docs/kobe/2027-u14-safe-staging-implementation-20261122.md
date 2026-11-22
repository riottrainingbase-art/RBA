# RBA Kobe × Guam U14 / safe staging implementation (internal)
Date: 2026-11-22 (JST). This is a non-production release candidate and NOT a venue or payment authorization.

## Scope
- Preserve the existing `preview-rba` branch by staging on `feature/kobe-u14-safe-staging-20261122`; avoid merging entire divergent historical branch.
- Restore the Japanese event overview, English overview, selected UNITED programme explainer, general price explainer, closed payment-result page.
- Restore all three API paths as unconditional fail-closed responses, rather than payment creators. No Stripe calls or Supabase administrative database access.
- Expose only nonbinding Jotform interest registration: domestic 263188088558069, D-HUB helpers 263188782905066, overseas 263187713938065.
- A separate old domestic form 263226381671054 contains an existing enquiry; track it in internal read-only reconciliation; do not promote two domestic forms on public site.

## Grounded business status
- Guam visit 2027-01-05 to 2027-01-10. Main 5v5 January 6/7 is proposed, venue not approved.
- 2027-01-06 HOOP7 Higashiosaka 10:00–14:00 full two-court *free temporary hold requested*, no written acceptance or term. Previously quoted JPY 70,000 inclusive for paid four-hour hire, subject to confirmation.
- minatojima basketball club offered provisional home-gym discussion for Jan 6, 15:00–17:00 and Jan 7, 16:00–18:00; no school permission, court specs, final roster or participation promise.
- Comista Kobe and B-GROUND venues do not confirm a regulation full-size 5v5 main court; do not present them as confirmed.
- RBA UNITED selected programme total JPY 100,000 tax inclusive: deposit JPY 50,000 + balance JPY 50,000. Zero charges now.

## Release gates (require independent written approvals)
1. Venue owner approval, permitted event category, court dimensions, safety and cost terms.
2. Formal host/guest agreements and 2027 U14 date-of-birth eligibility.
3. Written selection criteria, child safeguarding, medical/emergency plans, adult supervision and insurance.
4. Guardian consent and programme deliverables, refunds, cancellation conditions, due dates.
5. Approved budget, confirmed accommodation and buses if advertised.
6. Independent technical review of runtime flags, Stripe account, database membership/guardian records, webhook idempotency and access control.
7. Explicit separate approval of code diff, exact SHA, preview QA, production deployment and payment checkout. Environment flags alone are *not sufficient*.

## Validation
Run `node --test tests/kobe-u14-safe-staging.test.mjs`, `pnpm exec tsc --noEmit` and the existing preflight QA before any merge. This implementation intentionally has no production promotion or payment capability.
