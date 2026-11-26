# D-HUB FIELD CASE LAB
2026-11-26 / Editorial and QA record

## Purpose
D-HUB COACH LAB existing members gain eight reusable field cases, distinct from the 48-week curriculum, member articles and existing weekly HOMECOURT PLUS loop (PR #550). The eight cases are RBA-authored practice design proposals, not Torsten Loibl's recorded lecture, quoted material, evidence of effectiveness, or an accredited course.

Each case contains context, age guidance, approximate duration, three stages, observable behaviors, adaptive difficulty/safety, a coaching prompt, player/parent perspectives and a review question. No mandatory load, medical advice, fixed spacing distance, universal competition rules or claims of guaranteed improvement. Stop for safety concerns; individual medical advice is outside this material.

## Operation
- The existing server-side member page renders the component only after auth.getUser() and has_dhub_coach_access. No new DB, public route, checkout, tracking, or permissions.
- Notes remain in the member's own notebook. No children’s identifying information or health information is collected, no progress auto-awarded.
- For the next 4 weeks, recommend one case each week; do not require all eight. Review usefulness, whether the coach tried a case and what they changed through existing opt-in member feedback only. No new email automation or forced payment.
- Do not copy the paid cases wholesale to public JOURNAL; free educational explanations remain free. Sharing player/parent perspectives does not require a new subscription.
- PR #434 also edits the member page; preserve its optional topic-request link on integration. Do not overwrite existing member articles, toolkit, 48-week lessons or PR #550 HOMECOURT PLUS.
## QA
Run node --test tests/dhub-coach-case-lab.test.mjs, existing preflight TypeScript/ESLint, then verify entitled, unentitled and logged-out sessions on the approved preview. Check keyboard disclosure, narrow mobile layout, privacy, all eight content cards. DEPLOYMENT.md one-preview policy; no automatic production release.
