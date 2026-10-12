# RBA Taiwan — unified source of truth
Date: 2026-10-12 | Owner: Masato Nishio

## ONE brand, ONE website, ONE enquiry system
- Master brand: **Riot Basketball Academy (RBA)**.
- Taiwan activity: **RBA TAIWAN**, an international exchange programme **inside the existing RBA website**, NOT a separate website, company, academy or new standalone domain.
- Official site: https://riotbasketballacademy.com
- Taiwanese landing page (production intended): /zh-tw/taiwan
- Taiwan→Japan and Japan→Taiwan team exchange (production intended): /zh-tw/taiwan/exchange
- Japanese counterpart: /ja/taiwan and /ja/taiwan/exchange
- English counterpart: /taiwan and /taiwan/exchange
- Korean counterpart: /ko/taiwan and /ko/taiwan/exchange
- One canonical contact form for all enquiries: https://form.jotform.com/262590542634055. Its optional exchange direction field identifies the lane.
- No separate Taiwan brand logo: use RBA's official mark. SPARTANS branding only within approved partner attribution.

## Verified relationship and offer
- 2026 October Taiwan clinic with Elton and SPARTANS Academy is past activity evidence.
- Japan→Taiwan: possible friendly games, joint practices, youth clinics, coach learning.
- Taiwan→Japan: same categories in Japan.
- These are **organisation-level non-binding enquiries**, not a confirmed package tour.
- Future SPARTANS hosting, opponents, dates, fee, capacity, travel arrangements, and revenues remain unconfirmed.
- RBA handles basketball programming/coaching/coordination; travel services requiring registration go through authorized travel providers.
- Media permission: owner confirmed permission from SPARTANS and guardians; retain records. Actual original JPEGs not yet uploaded to GitHub and gallery remains OFF.

## Implementation and deployment truth
- PR #136 merged into current `preview-rba`; preview deployment dpl_6DeYcn7DXZNeLf56bvKj2CHVEY2p READY.
- Taiwan static QA passed; full-site Japanese regression QA failed on existing non-Taiwan content.
- Vercel `riottrainingbase-1212` preview project prj_ToviFjFURKMeQe7Gci5K4XLAfwAE: only vercel.app domains, no official domain.
- Vercel `riot-basketball-academy` project prj_CzpW8iFFiPmDpilFPcb6K5QF6Ad6: has apex/www official domain records, both project entries verified:false with pending TXT challenge.
- Official domain is `serviceType:external` in Vercel; authoritative nameservers are `ns13.wixdns.net` and `ns12.wixdns.net`. This does NOT prove registrar or website hosting is Wix. Owner states Vercel is their intended platform.
- Current public RBA site is available; new exchange URL is not confirmed publicly accessible. Do NOT claim published or live conversion metrics.
- Do not move DNS, transfer project, promote an unrelated preview or overwrite production until verified domain routing and rollback.

## Single launch workflow
1. Resolve which live Vercel project/account and DNS authority actually serve riotbasketballacademy.com; verify current apex/www route and rollback.
2. Upload two approved original photos to `public/taiwan/2026/spartans-clinic-action.jpg` and `public/taiwan/2026/spartans-clinic-circle.jpg`; validate hashes in `docs/taiwan-media-release-2026-10-12.md`.
3. Verify photo gallery in preview, Jotform notification with consented test, mobile, locale switching, SEO and accessibility.
4. Resolve/approve site-wide Japanese audit issues.
5. Promote only the verified release artifact to the actual official-domain project and verify both Taiwan URLs.
6. After production is truly live, share with Elton/SPARTANS via approved channels and launch localized organic marketing.

## Retire duplicate/conflicting routes and documents
- PR #133 is a superseded divergent branch. PR #136 is merged; new work starts from `preview-rba`.
- Static standalone HTML/ZIP previews are visual reference assets, NOT a second live RBA site and NOT official publication.
- Old `rbasitev11portalready-*.vercel.app` URLs are preview/test URLs, not official public links.
- Never publish speculative prices, dates, partner commitments or revenue numbers.
- Do not send new messages or paid ads without explicit approval.

## Single immediate next action
Identify and verify the production domain routing/ownership, then release the photo-enabled Taiwan pages using the approved one-preview/one-promotion workflow.
