# RBA SNS 38-item release / source-of-truth checklist
Date: 2026-11-20 · **Internal operations only — not a public statement**

## Scope and authoritative material
- Owner-provided six-page `20261120修正箇所等.pdf` lists 38 issues (11 high, 19 medium, 8 low).
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
**RIZEHOPE U12 individual:** Free preliminary interest; personal price and payments gated. The live /ja/international/rizehope-japan-2027/united route previously returned 404; verify preview and final live route before linking from external channels.
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
