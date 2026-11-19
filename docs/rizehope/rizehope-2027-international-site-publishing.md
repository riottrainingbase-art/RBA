# RIZEHOPE JAPAN 2027 | Official Site Publishing Runbook

Maintainer: Riot Basketball Academy (RBA) international exchange coordination
Created: 2026-11-19

## Canonical public entry points

- 日本語: `/ja/international/rizehope-japan-2027`
- English: `/international/rizehope-japan-2027`
- Discoverability: the four-locale RBA International page includes a featured link. Korean and Traditional Chinese intros lead to the English event page (clearly marked EN).
- Event is a RIZEHOPE-branded project. RBA is the overseas-team contact/coordination function. **Do not claim joint-host agreement or confirmed participating clubs without the event operator's written authorization.**

## Confirmed / not confirmed

Operator confirmed: Feb 27–28 2027; Shibata Town Gymnasium reserved for both days; team entrance and planned show permissions have been obtained.
Separate pending work: exact court booking hours; court allocations; local organiser credit/contract; age categories and birthdate rules; competition schedule, referee/TO and medical arrangements; named overseas teams; participation costs; transport, hotels, insurance, visas; fully approved photographs and media.

## Intake links (free expression of interest only)

- Overseas team, English: https://form.jotform.com/263221234159047
- Japan team, Japanese: https://form.jotform.com/263220855042046
- RBA UNITED individual interest, guardian only: https://form.jotform.com/263221266794057

Keep these as distinct audiences with separate consent and contracts. They are NOT paid registrations and do not guarantee a competition slot or admission. RBA UNITED only considers an actual team if enough eligible players and qualified adults/safe operations are available; existing club membership need not be surrendered.

## Adding payment — NEVER activate early

**Source of truth:** `lib/rizehope-2027.ts` -> `payments.overseasTeam`, `payments.japanTeam`, and `payments.unitedPlayer`.

Each track is independent. Do not copy a team's payment link into another programme. For any one track, before changing `status: "not-open"` to `"open"`:

1. Confirm event organizer/collection entity, age eligibility, roster policy and safe operations. Record written approval.
2. Finalize actual tax-inclusive amount and what the plan includes/excludes, separately for each track.
3. Publish participation terms and cancellation/refund terms at stable HTTPS addresses; clearly state who can collect money.
4. Configure a checkout for that exact audience and exact charge, and verify it against Stripe/Jotform using a safe nonproduction checkout or provider evidence.
5. Set `displayPrice`, `verifiedCheckoutUrl`, `officialEntryTermsUrl`, `officialRefundTermsUrl` for that track, set the track's 3 booleans true, and only then switch `status`.
6. Confirm `programme.finalOrganizerCreditsApproved` and `programme.finalAgeRulesPublished`. **RBA UNITED additionally requires `programme.unitedTeamConfirmed`** and its own guardian/roster safeguards.
7. Run `node --test tests/rizehope-international-hub.test.mjs`, TypeScript, lint and real-device preview. Read back production deployment and verify no stale or wrong fee.
8. Never interpret a form EOI submission as permission to charge. No payment has been launched by this change.

## Adding approved photos later

Place image files only in `public/media/rizehope-2027/`. Before adding to `gallery` in `lib/rizehope-2027.ts`, verify:
- Original event/date; don't imply photographs are from RIZEHOPE JAPAN 2027 before this event has occurred.
- Copyright and license to publish / photographer credit.
- Guardian/participant image consent, where minors are identifiable. Do not use a generic sports photo for real participant representation.
- Descriptive Japanese/English alt text; accurate Japanese/English captions.
- `usageRightsConfirmed: true` and `childrensPhotoConsentConfirmed: true` only with actual proof.
- Image path starts with `/media/rizehope-2027/`.

The component will show a neutral placeholder until an approved gallery item is configured; no invented court shots or unconsented faces are shown by default.

## Other content controls

- Sponsor name or logo: add only after sponsor contract and written display permission. Local government endorsements require actual authorizations.
- Hotel/charter bus: RBA is coordination contact; do not sell package travel or guarantee contracted rooms/seats without a separate compliant booking workflow.
- Venue/show: reserved and permitted, but technical equipment, operating hours and staffing need separate arrangements.
- Current committed GitHub code does not itself mean production is deployed. Read back Vercel deployment SHA and production URLs.
