# RBA Taiwan official-domain release — verified infrastructure findings
Date: 2026-10-12 | Owner: Masato Nishio | Status: BLOCKED / DO NOT CHANGE DNS OR PROMOTE YET

## Confirmed facts
1. The current public official site at https://riotbasketballacademy.com/zh-tw loads; https://riotbasketballacademy.com/international describes SPARTANS Academy as a verified Taiwan youth-basketball collaboration.
2. The newly implemented routes /zh-tw/taiwan and /zh-tw/taiwan/exchange were not publicly accessible in the last check.
3. PR #136 was merged into `preview-rba` (merge commit b3c348fa6faa2ad228d234d7bdc8a187e29e327d). The [preview] checkpoint d3115b400110175bf4b0d51613ed9de168bd7b6d produced Vercel deployment dpl_6DeYcn7DXZNeLf56bvKj2CHVEY2p (READY).
4. Taiwan static QA #2 PASS (TypeScript, changed-file ESLint, deployment policy). Full RBA preflight #579 FAILS on existing Japanese content in localized-home, opportunity-explorer, programme-data, localized-policies and definitive-content. Do not claim full-site QA pass.
5. Current active preview project: Vercel team `riottrainingbase-1212`, project `prj_ToviFjFURKMeQe7Gci5K4XLAfwAE`; project domains are vercel.app only.
6. Another connected Vercel team `riot-basketball-academy` has project `prj_CzpW8iFFiPmDpilFPcb6K5QF6Ad6`. Its project-domain entries include apex `riotbasketballacademy.com` (308 redirect to www) and `www.riotbasketballacademy.com`, but BOTH are reported `verified:false` with pending TXT challenges.
7. Vercel domain registry in that team lists `riotbasketballacademy.com` as `serviceType:external`, not a Vercel-bought registration, and nameservers `ns13.wixdns.net`, `ns12.wixdns.net`. This does not prove the domain was purchased at Wix; it means the current authoritative DNS is delegated to Wix.
8. Vercel domain configuration reports A routing and no configuration conflict, but a project-domain verification attempt returned `existing_project_domain`. No DNS changes or project moves were made.
9. Owner attested that the October Taiwan clinic photos have academy/guardian publication permission. The two JPEG binaries are still not in GitHub `public/taiwan/2026/`; `RBA_TAIWAN_MEDIA_APPROVED` is not enabled. Do not display broken images.
10. Official Jotform `262590542634055` is enabled, with adult consent and optional exchange direction, but receipt/notification test remains unverified.

## Production strategy — choose after confirming live routing
**Preferred: keep the existing live domain stable.** First identify which Vercel project currently receives the actual apex/www HTTP requests and which account can edit the Wix-managed DNS zone. Verify with Vercel domain/project mapping and HTTP routing evidence, not assumptions.
- If official live domain is intentionally served by legacy team project `prj_Czp...`, prepare an explicit deployment migration or promote an approved build in that SAME project only after confirming repository, environment, form, content, custom-domain verification, and rollback.
- If the intended long-term project is `prj_Tovi...`, do not simply attach or transfer the live domain; first complete Vercel TXT verification, stage and test the new project, preserve all DNS records including MX/SPF/DKIM/DMARC, plan low-risk cutover and rollback.
- Never change nameservers or A/CNAME records merely because the old nameserver says Wix. This could interrupt web and email.
- Never claim that promoting a Vercel preview in `prj_Tovi...` publishes `riotbasketballacademy.com` until the domain is associated and verified.

## Exact release sequence
1. Identify domain registrar/account and authoritative DNS zone access. Capture apex/www DNS and all email-related records before changing anything.
2. Confirm public live project by comparing production response with deployed artifact, domain association and environment; obtain an approved rollback target.
3. Add two approved photos as binaries to exact repo paths: `public/taiwan/2026/spartans-clinic-action.jpg` and `public/taiwan/2026/spartans-clinic-circle.jpg`; compare against checksums in `docs/taiwan-media-release-2026-10-12.md`.
4. Enable photo gallery ONLY in an authorized test environment after both files load and permission scope is documented.
5. Test all four locale routes, mobile layout, image alt text, navigation, canonical/hreflang/sitemap, and external links.
6. Test Jotform with a consented non-personal test enquiry and verify actual RBA inbox notification; avoid a fake lead in the live pipeline.
7. Resolve or explicitly review site-wide Japanese audit failures before full production promotion.
8. Deploy to the verified official project/domain via established one-preview/one-promotion policy, verify apex/www routes, and keep a rollback plan.
9. Once live, send the prepared Elton/SPARTANS co-post request (only after explicit send approval), then publish partner-approved Traditional Chinese content.
10. Track verified Taiwan sessions, adult organisation enquiries, qualified calls, signed scopes and paid revenue separately. No projected sales represented as confirmed.

## Status
NO production promotion or DNS changes performed. Do not send partner email automatically. This document is the release handoff and factual record.
