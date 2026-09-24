# V6 public-site release — 2026-09-24

## Scope

The user requested completion and production publication of the latest RBA site.
This release publishes the V6 public website. It does not declare membership email authentication or live payment E2E complete.

## Verified blockers and containment

- Supabase Authentication > SMTP shows custom SMTP disabled. Confirmation templates are still the provider defaults.
- The available Resend browser session now displays “You're not a member of any team”. The previously visible RBA domain had unverified DNS records. No team, key, DNS, or credential was created, deleted or changed.
- Four localized login pages now show a clear temporary-unavailability message plus working schedule/contact routes. The sending form is enabled only when server-side `RBA_AUTH_EMAIL_READY=true` is deliberately configured after real delivery and callback verification. Existing sessions and backend authorization are unchanged.
- Public payment-option links route to localized contact while that flag is unset. Existing official event application forms remain available. This is individual payment guidance, not completed online checkout.
- YAIMA CUP is removed from current registration/payment listings because the site's own listed dates have passed. Historical source data is retained.
- The V6 contact pages had only mailto links. Restored the existing enabled Jotform (262590542634055, status ENABLED confirmed via connector) and official LINE on all four localized contact pages.

## Verification

- Frozen-lockfile dependency installation succeeded; no dependencies changed.
- Next production build and TypeScript checks succeeded.
- App/component/library ESLint succeeded.
- Public HTTP route/link audit rerun; results are in http-local.json.
- 52 simulated authentication cases, 23 simulated checkout-gateway cases, 6 mocked onboarding submissions, 12 member render cases with 96 localized links passed.
- 20 new email-entry flag/locale cases verify the unavailable state never renders an email form; exact `true` enables the existing login component.
- Existing webhook structural checks passed; these do not simulate a signed live Stripe event.
- Browser verified Preview JA home, member overview, contact, opportunities filter (TRAIN shows only two TRAIN entries; ALL restores entries), and payment page. Actual mobile-device and signed-in end-to-end checks remain unverified.

## Remaining work for full membership launch

1. Restore access to the Resend team owning the RBA sender domain (user account action).
2. Verify sender DNS and configure Supabase SMTP using a scoped sending key; apply committed RBA email templates.
3. Verify real receipt and callback in the same browser for the intended user roles.
4. Verify checkout → signed webhook → member/order reflection in a test environment; keep unapproved capacity and safeguarding settings closed.
5. Set `RBA_AUTH_EMAIL_READY=true` and rebuild production only after these checks succeed.

Rollback target before this release: dpl_FHWvoShxQHDzcxJgR14WbtNaRefJ.
Production ID and post-deploy checks will be recorded after publication.
