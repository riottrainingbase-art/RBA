# RBA UNITED 2027｜事業・安全・運営統合台帳（運用設計 v1）

Updated: 2026-11-23 JST | Owner: Riot Basketball Academy | Status: **source implemented / public build and commercial launch NOT approved**

## 0. Positioning and rules that cannot be waived

- **Mission**: 子どもたちが所属チームを変更せず、地域・国・所属の枠を越え、安心して仲間と学び試合で挑戦する機会を持つ。
- **NOT**: JBA常設チームの代替、二重加盟チーム登録、移籍不要の公式大会出場権、全員の海外遠征・選考の保証、いじめ/ハラスメントの有料相談窓口。
- **Age**: U12/U14/U15 etc is programme-specific. No child full names, health, school, address or birthdate in first interest survey. Formal application must use separate guardian consent with legally needed safeguarding data.
- **Separation**: RBA CLINIC (coaching) ≠ DEVELOPMENT CAMP (development) ≠ RBA UNITED (temporary playing group) ≠ RIZEHOPE JAPAN (organizer/tournament) ≠ GREAM (registered regional club) ≠ MY HOME COURT (member record) ≠ apparel. Price, payer, cancellation and invoice for each are separate.
- No sponsor, uniform supplier, accommodation provider, travel operator, referee or venue is described as "confirmed partner" without dated written acceptance and scope. No photos/minor information to sponsors.

## 1. Official links (truth hierarchy)

Public intro (code): https://riotbasketballacademy.com/ja/united (GitHub source merged to preview-rba; deployment required before live)
Parent's **FREE interest registration**: https://form.jotform.com/263263903074052
Korea IYIBS interest: https://form.jotform.com/263207310187047
Kobe/Guam interest: https://form.jotform.com/263188088558069
RIZEHOPE / sixth-grade interest: https://form.jotform.com/263243952545057
Shenzhen/Kanto U12 interest: https://form.jotform.com/263237260217048
Corporate / regional event support interest: https://form.jotform.com/263222129730046
MY HOME COURT: /ja/my-homecourt; apparel /ja/store; sponsor directory /ja/sponsors.
**Do not migrate existing applicants or collect duplicate payments** simply because new generic intake exists.

## 2. Single price architecture / preserve existing prices

| Product/role | Published/confirmed reference | Next commercial action | Scope |
|---|---|---|---|
| RBA clinic | Per event; examples ¥3,300–¥6,600 incl tax | Keep existing | Coaching hours only unless event-specific |
| DEVELOPMENT CAMP | Chiba Mar 27–28, 2027: **¥24,200 (2 days)** (Japan pricing; event-specific) | Keep existing; disclose meals/hotel/transport inclusions | Development training, not UNITED team membership |
| RBA UNITED | 2027 national/international participating-player fee **UNCONFIRMED** | Model only, quote when release gates pass | Coaching/coordinating for named match/temporary team; separate tournament entry/transport etc |
| RIZEHOPE JAPAN | U12 domestic **team fee ¥66,000 for 2 days**, deposit ¥33,000 + balance ¥33,000 | Keep existing team terms; do not apply to individuals | Team entry; not flight, lodging, UNITED player fee |
| RBA ID/MY HOME COURT | Base RBA ID registration free | Reuse, no duplicate membership | Passport/learning history |
| RBA note supporters | ¥500/month support, ¥1,000/month article access (note provider terms) | Keep separate | Not UNITED participation/priority |
| RBA corporate advertising | ¥11,000/month (incl tax), existing web/report scope | Keep separate | NOT automatic jersey logo, naming, event sponsorship |
| RBA UNITED GAME UNIFORM | Shopify DRAFT, no approved price or sale | Dark/light distinct competition-approved design, supplier sample and SKU plan | Separate product from RBA PERFORMANCE TEE / AUTHENTICS |

**Pricing for unconfirmed new offers is exploratory, NOT live**:
- Day festival/game & skills: test ¥6,600–¥9,900 per player, only after minimum-player and venue budget validates.
- 2-day non-residential programme: reference Chiba ¥24,200 to avoid new premium pricing without differentiation, but not a cross-event price promise.
- Temporary UNITED representative event, domestic tour, global trip: event-by-event transparent full cost and a published RBA *basketball programme fee* independent of regulated travel products.
- No mandatory UNITED PASS at ¥990/month. Stop any old spreadsheet suggesting a new permanent 990-yen membership.

## 3. Operations state machine

Each opportunity is one **event_id**, not a free-text "UNITED event" label. It has:
- New idea -> **DEVELOPMENT / INTERNAL** -> local inquiry **VENUE_REQUESTED** -> **VENUE_PROVISIONAL** -> **SAFETY_REVIEW** -> **FINAL_CONDITIONS_APPROVED** -> **PUBLISHED_INTEREST** -> **REGISTRATION_OPEN** -> **PAID / VERIFIED** -> **EVENT_HELD** -> **SETTLED** -> **REPORT_PUBLISHED**.
- An interest list NEVER constitutes booking, paid order or team selection.
- Paid checkout only after **all** release gates are true (see `lib/united-system.ts`): written venue authorization, entry eligibility, named staff/child-safe ratio, legal travel structure, hours/hotel/transport/food confirmed, actual price and cancellation policy, guardian consent, verification of existing payments.
- If sports facility advertises only reservations 3 months in advance, no earlier "secured" claim.
- Evidence fields: `event_id`, `programme_type`, `status`, `age_group`, `venue_confirmation_at`, `venue_authority`, `staff_owner`, `safety_review_at`, `pricing_revision`, `travel_vendor_registration`, `refund_policy_revision`, `payment_product_id`, `published_at`, `owner`, `updated_at`.
- Public status can be "開催予定/先行希望受付/正式募集/定員/終了", derived from verified record, never arbitrary marketing text.

## 4. Seven mandatory pre-sale documents

1. programme schedule with gym(s), meal/rest/night arrangements and independent unsupervised time;
2. fixed price and *included/excluded* itemized matrix; verified payment links and no double billing;
3. venue written approval for paid usage, insurance, and emergency access;
4. role-specific adult staffing, chaperone roster, separate accommodation/supervision rules and two-adult accountability; no private 1-on-1 contact with minors;
5. parent legal consent / photo consent / emergency contact / allergy and medication handling through private access-controlled channel only after acceptance;
6. cancellation, weather disruption, flight/hotel changes, incident and refund rules and owner;
7. JBA registration, domestic/international event approval, age/gender/roster and uniform advertisement compliance, documented for each tournament.

**Policy**: By 30 days before departure, all critical items above must be confirmed; if not, *do not open or continue collecting payment*, offer rescheduling/refund in line with agreed conditions. For overseas or airfare-driven events, allow more than 30 days. Changes require individual confirmation; no unilateral substantial downgrade in staffing, transfer or hotel.

## 5. Sponsor model: existing RBA contracts first

Three mutually distinct products:
- **Corporate digital advertising**, existing ¥11,000/month including tax. Web/report only. This is not an event sponsor.
- **Local event programme partner** ¥50,000–¥100,000 *proposal range* as a one-time use-of-funds campaign; no guaranteed logo rights; contracts and product codes for each.
- **Regional/year sponsor** baseline ¥300,000/year Stripe historical reference, plus negotiated ¥1,000,000 strategic title rights *only on written agreement*; neither is an active UNITED sponsorship.
- In-kind: approved practice court hours, lodging room discounts, sports tape, food, transport, sports medicine, uniforms. Assign fair value but don't count barter as cash revenue.
- Jersey logo rights are NOT bundled, and may be prohibited by tournament regulations; obtain organizer pre-clearance and direct supplier proof.
- Public directory `/ja/sponsors` publishes only sponsor contract + payment + wording and logo authorization. Keep prospects and promises private; never expose minor contacts to sponsors.
- Approve sponsor industries consistent with youth safety. No youth-targeted alcohol, gambling, nicotine or predatory products.

Sponsor pipeline: Target -> Researched -> Verified contact -> Outreach drafted -> Outreach sent with authorization -> Intro call -> Written benefits scope -> Contract -> Invoice paid -> Logo permission -> Public listing -> Deliverable verified -> Renewal. Respect contact preferences and do not spam old partners.

## 6. Facility / lodging candidate desk (NOT partner/booking)

| Candidate | Public evidence | Key checks |
|---|---|---|
| ベルサンピアみやぎ泉, 宮城県大和町 | https://bellsunpia.jp/facilities/ ; https://bellsunpia.jp/lodging/ | Basketball gym 24×36m Sat/Sun 9-23 ¥7,700/hour; camp plan sports 20% discount; elementary ≤1night2meals ¥6,800; **10 people min**, lodging contract, paid event permission, insurance, room availability and age curfew (≤middle school 18:00) |
| 宮城県総合運動公園合宿所／グランディ21, 利府 | https://grande-21.or.jp/ | Gym, lodging, event use and exclusive-court reservation separate; obtain actual quote and verify availability |
| 本山製作所青葉アリーナ, 仙台 | 仙台市スポーツ施設の正式ページで要確認 | Day-clinic pilot possible; accommodation handled separately |

Best first experiment: **day-only in Sendai/Taiwa**, 16–24 players. Use confirmed court and named coaches before selling. Only propose overnight after local one-day performance data and lodging/travel compliance.

## 7. Uniform commercialization, SKU and sponsor rights

As of 2026-11-23, Shopify is TRIAL, USD currency, and **not retail ready**. Draft product `gid://shopify/Product/9787650801921` is now titled "RBA UNITED｜OFFICIAL GAME UNIFORM（濃色・淡色セット／企画・試作中）" and DRAFT. There is NO real price, no order, no approved sample.
- Competition first: 2 independent versions (light and dark), tops + shorts, official logo usage and roster numbering. Reversible remains **training-only option** and cannot be marketed as universally JBA competition-approved.
- Source: https://www.japanbasketball.jp/jba/kitei/ and JBA Uniform FAQ (reversible generally not permitted at JBA-organized tournaments); particular tournament's rules may be stricter, including jersey sponsor ban.
- Obtain three written factory quotes (fabric, technical spec, MOQ, colors, name/number, sizes, manufacturer mark, sample quality, defects, shipping, lead time). Target landed COGS under 50% of tested retail price; do not promise this margin before quote.
- Size expansion and child growth: rental/loaner competition kit for short-term UNITED events, optional personal replica/jersey sale once viable; NEVER force merchandise purchase to access eligible development activity.
- No payment links until tax, shipping, returns and Japanese storefront legally ready, plus successful fulfillment test.

## 8. Data/privacy design (to build; NOT yet deployed DB)

Web form intake -> manual consent-verified import or trusted integration -> RBA ID guardian record -> immutable event ID -> category interest -> approval -> named event-specific contract -> Stripe transaction -> check-in and incident record -> private parent after-action report -> voluntary RBA passport log. Use role-based access. Segregate restricted child safety records from sponsor CRM and event marketing.
- Avoid duplicate identity and cross-use of guardian data between RBA partners without separate consent.
- Delete or archive declined/abandoned records with a published retention schedule; configure opt-out.
- Required dashboards: first-time inquiries, event consented leads, converted paid, canceled/refunded, fixed and variable cost, contribution, parent satisfaction, recurrence, incident and near-miss reporting, coach coverage, sponsor deliverables.
- Historical 2026 YAIMA parent reviews show *promise and a logistics weakness*. Use prior written publication choices; keep anonymized review anonymous.

## 9. KPI and go/no-go thresholds

- Day trial: parent consented leads ≥ 40, interest → registration rate ≥20% test target, min paid players from confirmed actual budget, and named qualified coaches (go only after facility contract).
- Satisfaction: post-event survey with actual response count, child-reported fun and friendships, parent trust, willingness to return, actual complaints and safety incidents, fairness of opportunities.
- Finance: charge only when total price/revenue/variable cost/fixed cost/refunds/fees are known. 20% operating contingency on event direct cost as a planning rule (adjust on actual risk).
- Publish 30-day schedule completeness score. Major undisclosed change is a NO-GO.

## 10. Pending actions, NOT accomplished in this update

- Facility contracts, sponsor commitments, travel agency agreement, qualified chaperone roster, shirt sample, USD→JPY Shopify paid-plan conversion, Stripe new product checkout, release date.
- Live site release: GitHub source is updated on `preview-rba`; verify Vercel READY deployment and custom-domain route, which may be blocked by deployment quota.
- Controlled integration to Supabase and Stripe event-ledger remains a future implementation; don't pretend database tables or webhook ingestion exist.

## Sources

- JBA 2026 Team Registration: https://www.japanbasketball.jp/news/85654
- JBA uniform and event procedures: https://www.japanbasketball.jp/jba/kitei/
- Tourist travel agency law: https://www.mlit.go.jp/kankocho/seisaku_seido/ryokogyoho/ryokogyohogaiyo.html
- Bell Sunpia facilities/lodging: https://bellsunpia.jp/facilities/ ; https://bellsunpia.jp/lodging/
- Existing public RBA paths: `/ja/united`, `/ja/opportunities`, `/ja/camp`, `/ja/sponsors`, `/ja/support`, `/ja/store`.

## 11. NEXT COURT TOUR and CONNECT mapping

- **NEXT COURT TOUR** is the 2027 geographically distributed clinic programme (6 regions, 12 event days and 480 session places are *targets*, NOT reserved events). It serves as discovery and development entry, not a UNITED entry-team price or player selection fee. https://riotbasketballacademy.com/ja/national-tour
- **RBA CONNECT** handles B2B outreach to domestic/overseas clubs, venues and tournament organizers; it cannot collect individual UNITED player fees by default.
- **RBA UNITED** provides the individually enrolled, temporary group/team challenge; **RIZEHOPE** is a separate host/event owner. Event-level contracts and staff/insurance obligations remain separate.
- Facility outreach: drafts only were prepared in Primary Gmail for Bell Sunpia Miyagi Izumi and Grandy 21. **Neither has been sent or accepted** as of this version.
- First-day pilot at ¥9,900*20 is **loss-making by ~¥16,056** under the current conservative 8-hour staffing/venue cost budget; do not treat ¥9,900 as a launch-approved price. Refer to RBA_UNITED_Operating_System_2027.xlsx for editable assumptions.
