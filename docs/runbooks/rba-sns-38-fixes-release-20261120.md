> **Release integration note (2026-11-21):** This file is carried from PR #516 to integration branch `integrate/sns-audit-20261121`, based on existing `preview-rba` commit `92a9696868b01213b7cca160d7371f92ffafeaac`. All 5 changed site files were transplanted by context-verified patch hunks; no changes to billing or participant data. On this integration branch the unavailable `/ja/international/rizehope-japan-2027/united` page is intentionally NOT linked. Use `/ja/contact` for free inquiries until the complete RIZEHOPE feature is separately released. This branch is NOT the live site and does not authorize payment links.

# RBA SNS 38-item release / source-of-truth checklist
Date: 2026-11-20 · **Internal operations only — not a public statement**

## Scope and authoritative material
- Owner-provided `Riot_SNS_check_2026-11-20.xlsx` has 4 sheets and lists 38 issues (11 high, 19 medium, 8 low).
- This PR fixes *only* official-site code within GitHub and adds a CI QA gate.
- Live Linktree/note/Instagram/Threads/X/Wix and partner posts remain separate account edits.
- Never treat a merged PR, draft preview, successful Vercel deployment in a different project, or a successful code search as proof the production site changed.

## Changes included in PR #516
1. `components/platform-business-pages.tsx`: distinguish confirmed formal programmes from free interest, include Korea IYIBS 2027 and a RIZEHOPE U12 information route, and calculate expiry against Japan calendar date.
2. `app/ja/instagram/page.tsx`: direct FREE Korea interest application with visible no-contract, no-travel/no-fee/no-roster guarantee.
3. `app/ja/links/page.tsx`: proper official social, homecourt, member, founder and inquiry links; distinct Korea free-interest featured card.
4. `components/localized-social.tsx`: actual Instagram/Threads, X, note handles and founder-name pronunciation, with no invented account IDs.
5. `components/localized-home.tsx`: avoid presenting incompatible 22/25 locations or 3000/4000 participants as verified public metrics before an evidence-backed definition.
6. `tests/sns-consistency.test.mjs`: nine source regression checks; avoid fragile unescaped regular expressions.
7. `.github/workflows/rba-sns-consistency-qa.yml`: Node 24 source tests, locked dependencies, TypeScript, ESLint, Japanese style checks. Do not deploy from a feature branch.

## Public content commitments
**RBA name:** Riot Basketball Academy (RBA) · Japan / Sendai base, activities nationwide and across Asia.
**Founder:** 西尾優人（にしお まさと） / Masato Nishio.
**Guest coach:** Torsten Loibl / トーステン・ロイブル. Fix `Tosten Loibl` in note, without editing other biographical claims.
**U15 name:** GREAM SENDAI (when referring to Sendai).
**Preferred Japanese:** 子どもたち.
**Public counts:** Hide conflicting attendance and number-of-location claims until source data, counting rules and “as of” date are documented.
**Official homepage:** https://riotbasketballacademy.com/ja/
**Official link hub:** https://riotbasketballacademy.com/ja/links
**Korea 2027:** FREE interest only (2027-01-28 to 31, Incheon); Jotform 263207310187047. Not a paid tour contract, team selection, travel booking or participation confirmation.
**RIZEHOPE U12 individual:** Free preliminary interest; personal price and payments gated. The separate /ja/international/rizehope-japan-2027/united route remains unavailable on this integration baseline; the public CTA must use /ja/contact instead. Only adopt the separate route after its dependencies are released and tested.
**Okinawa:** Do not equate JPY and USD prices until included services, payer, refund terms, tax treatment and exchange basis are verified.
**Torsten:** Do not send to blocked distribution targets or change external participant events unilaterally.

## Linktree implementation (owner-account action)
Replace the `RBA 公式ホームページ` destination (legacy Wix) with https://riotbasketballacademy.com/ja/.
Set order:
1. 【公式】RBAホームページ `/ja/`
2. 【無料意向登録】韓国 IYIBS 2027 `https://form.jotform.com/263207310187047`
3. 全国クリニック・キャンプ `/ja/opportunities`
4. RBA UNITED `/ja/united` **only after production verification**
5. MY HOME COURT `/ja/my-homecourt`
6. 仙台U12/U15 `/ja/sendai-school`
7. D-HUB `/ja/d-hub`
8. 応援会員 `/ja/supporters` (note monthly vs Square may be different)
9. 企業協賛 `/ja/partners`
10. 問い合わせ `/ja/contact`
Hide or label ended 2026-09/10 event forms; preserve participant/payments back-office records.
Correct 2026-10-25 to **Sunday**; separate Nov 20 optional Tatsuno pre-clinic from Nov 21-23 main camp.
Do not claim `月48回` or equivalent training frequency without the D-HUB source.
Do not force a canonical LINE URL until all current shortened URLs resolve to the same official account.

## External content corrections (requires editor ownership)
- note https://note.com/rba_official/n/n95ee14d1c033 : replace two instances of `Tosten Loibl` with `Torsten Loibl`. Preserve purchase, timestamp and discussion data.
- Instagram/Threads/X: use actual handles. X `@RBAJapan2025` and note `@rba_official` are not identical to Instagram.
- Threads RBA ID explanation: name specific features currently available; do not promise an unavailable app/record feature.
- Partner posts: request correction of `できめす` and `GREAMSENDAI`; do not impersonate the partner.
- If events ended: mark "終了"; do not leave old payment links as fresh recruitment.
- Licences/certifications: verify the issuance document before stating FIBA/JBA/DBB qualification status.
- Site counts: do not replace unsourced `3,000+` with equally unsourced `4,000+`; establish a dated methodology.

## Release gate — must pass before merge or production
- [ ] GitHub Actions `RBA SNS and Recruitment Consistency QA` green at the **latest** SHA.
- [ ] Review existing conflicting PRs (notably RIZEHOPE #515) and confirm a known common release baseline.
- [ ] Vercel project, live domain and deployment target are verified to be the RBA official site, not `essential-supporters-web`, `essential-ballers-akita`, or `jpnentry-official`.
- [ ] Assemble **one** `[preview]` checkpoint on `preview-rba` according to `DEPLOYMENT.md`; do not deploy interim commits.
- [ ] Test viewport 375/768/1440; focus, contrast and all cards; watch for overlap and missing fonts.
- [ ] Verify https://riotbasketballacademy.com/ja/united, /ja/instagram, /ja/links and the RIZEHOPE individual route on preview.
- [ ] Verify Korea Jotform opens, accepts Japanese mobile and international numbers, and preserves existing submissions. Submit test data only through controlled QA.
- [ ] Ensure no duplicate Stripe/Square/note billing and no unapproved fee link.
- [ ] Promote only the verified preview artifact; record production commit SHA + read-back.
- [ ] After live rollout, fix Linktree and source account profiles, then click every resulting URL from mobile and desktop.

## Other issue classes and owners
| Issue IDs | Owner / blocker |
|---|---|
| 1,5,11,13-14,19-22,25-27,30-31,34,38 | SNS account owner / partner editor; original post and product entitlements |
| 2,6-8,12,15-18,28,33,35 | Linktree/Wix owner; dated links and cancellation impact |
| 4,29,37 | RBA administrative source records; raw metrics, credentials and plan price definitions |
| 3,9,16,23-24,32 | Current PR and then external account alignment |
| 10 | Operations: resolve India/Torsten Nov 25 overlap before any calendar or advertising changes |
| 36 | Optional YouTube channel verification only |

## Verification record
- Official PR: https://github.com/riottrainingbase-art/RBA/pull/516
- Official site: https://riotbasketballacademy.com/
- Korea form: https://form.jotform.com/263207310187047
- Current public Linktree: https://linktr.ee/riotbasketballacademy
- Initial public finding: RIZEHOPE individual route returned 404 before PR deployment.
- Jotform phone field was changed to optional Japanese/international-friendly format; the legacy US mask was not visible on public read-back; existing one submission remains.

Do not send marketing emails, create travel bookings, change guest invitations or enable payments as part of this PR.


## 2026-11-21 implementation check — source audit workbook
- Re-read all four sheets of `Riot_SNS_check_2026-11-20.xlsx`: 38 issues = 11 high / 19 medium / 8 low. A 38-row execution workbook with owner/account action, ready-to-use wording and a formula-based dashboard was prepared separately for operations.
- GitHub PR #516 remains OPEN / DRAFT / UNMERGED at `f3da3a5c0aa64eacb9f16604b2f77171f62dec1a`; six numbered audit items have changes in code, not in the production site. Never count this as a six-item public fix.
- GitHub Actions `RBA SNS and Recruitment Consistency QA` run `44724655471` completed with success for that SHA. Vercel status checks for other projects still include rate-limit failures; these are not equivalent to the RBA site's official release QA.
- Verified correct official Vercel project: `rba_site_v11_portal_ready` / `prj_ToviFjFURKMeQe7Gci5K4XLAfwAE`, with verified domains `riotbasketballacademy.com` and `www.riotbasketballacademy.com`.
- A scoped STAGING preview attempt for the PR exact SHA was made on the official project: deployment `dpl_3Xjjrm45gKxXWdsiZZrweiXDXeDU`. **Canceled by the intentional ignored-build gate**, log: `[vercel-ignore] skip Git deployment for fix/sns-audit-consistency-20261120; only preview-rba may build`. Do not work around this guard by spoofing a ref or overwriting an unrelated release branch. The next step is reviewed consolidation into the authorised `preview-rba` release checkpoint, followed by browser/form QA.
- Google Calendar `primary` on 2026-11-25 lists Torsten Loibl Vol.2 at **20:00–21:30 JST**, but no second India-themed online clinic on that date. The Instagram-advertised `16:30–18:00 IST` overlaps exactly; responsible organisers must resolve the public claim before sending updated invitations or moving the confirmed event.
- Public indexed English homepage still displayed `3,000+` and `25 activity locations` during the read-back; no source-grounded basis for calling the production correction complete.
- Linktree credentials were not available via a confirmed signed-in browser context. The legacy Wix button and expired event buttons require an authorised Linktree sign-in and editor action, rather than claiming the PR updates them.
- No payments, bookings, messages, subscriptions, external-profile edits, website production release, or customer-data updates were performed in this check.

## Integration status for preview-rba baseline
- The Korean Jotform ID `263207310187047` was fetched from the authenticated form service: ENABLED, 20 questions, 1 submission, verified as free-interest only. Fee proposals in descriptive copy are **not checkout links** and must not be advertised as final.
- The original RIZEHOPE individual route and its dependency `lib/rizehope-2027.ts` are absent from the existing `preview-rba` baseline; their PR is independent. The integrated site uses a working enquiry route until those features are released, rather than linking to a 404.
- The Linktree legacy Wix URL is still present publicly. Owners must replace it in Linktree itself; site code does not control Linktree.
- Re-run GitHub static checks on the integration PR, then create a single reviewed `[preview]` checkpoint using the documented branch release process. No automatic live publication from this branch.

## Reviewed preview checkpoint — 2026-11-21
- Release candidate is the exact `preview-rba` baseline `92a9696868b01213b7cca160d7371f92ffafeaac` plus eight changed files in integration PR #525; no RIZEHOPE payments or cross-project files were added.
- At preflight SHA `c892f8e7052a142aec318107e6a6bf4ba08fa13f`, workflow run `44909733823` completed **success** (source tests, TypeScript, lint and Japanese QA).
- Korea Jotform `263207310187047` is enabled, *only* free-interest; actual signup-submission testing must not be performed with real minors without consent.
- The upcoming preview is a verification environment, **not** a public change. It cannot substitute for external Linktree/note/Instagram edits.
- Do not merge unrelated open PRs or enable payments in this release.
