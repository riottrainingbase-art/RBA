# RBA Site Release Audit — 2026-10-23

## Scope
Combined release PR #208. Sources reviewed: actual Japanese homepage component (app/ja/page.tsx -> components/simple-japanese-home.tsx), localized EN/ZH-TW/KO homepage, MY HOME COURT landing/login, four new post-clinic landing pages, RBA deployment policy, Vercel project metadata and public pages.

## Confirmed code changes
- Japanese home: 3 top-level destinations (find programmes / MY HOME COURT / about), maximum six current programme cards, all programmes via dedicated listing.
- EN/ZH-TW/KO home: 2 primary hero actions instead of 3.
- Torsten homepage claims: removed named club affiliations and titles in localized promotional achievements; uses JBA sports director and appropriately attributed 2019 3x3 contribution.
- Overseas alumni: 4 localized pages with RBA official logo, clinic reflection, seven-day follow-through, guardian/consent notes, RBA ID information and free-vs-optional-paid distinction.
- RBA_AUTH_EMAIL_READY gate: direct registration only when flag is true. Otherwise JA points to official LINE; overseas locales to localized contact pages.
- No payment flow, auth backend, participant data import or Supabase schema changes.

## CI
GitHub Actions RBA Preflight QA run #698 (run ID 39884341789), jobs static-checks and deployment-policy both completed successfully, including TypeScript, ESLint changed files, Japanese regression audits, member onboarding and safe-return audits.

## Remaining before production (HOLD)
1. Exact RBA Preview deployment with full mobile QA, not an unrelated Vercel project.
2. Verify auth emails and callbacks on iOS Instagram in-app browser and Safari before enabling RBA ID email registration.
3. Confirm analytics/UTM end-to-end, consent, event names, and actual signup metrics.
4. Confirm marketing copy in final rendered pages, including any Torsten text outside the homepage.
5. Publish Story link stickers only after production routes are confirmed live.

## Preview branch conflict
The only deployment-enabled Git branch `preview-rba` currently points to commit `f5aa004b90c912b753ba076206f24a72ab422db0`, message `[preview] Verify RBA Performance Tee prelaunch storefront` (2026-10-22). It is associated with another release. **Do not overwrite this branch** without completing or explicitly coordinating that release. No new preview or production deployment was triggered by this audit.

## Decision
Release candidate is code-preflight clean but **NOT production-ready** until dedicated Preview and auth UX testing. Keep PR #208 draft and leave production untouched.
