# RTB Revenue Architecture — 2026-10-02

## Objective
Build RTB into a performance business platform without speculative inventory or new fixed overhead.

## Revenue streams

1. TRAIN — personal training / coaching
2. ASSESS — movement/performance assessments
3. MEMBER — recurring RTB membership
4. SELECT — third-party retail gross profit
5. CONSIGN — consignment commissions
6. TEAM — team S&C contracts
7. CORPORATE — corporate performance/wellness contracts
8. TEST — brand product-test fees
9. NETWORK — multi-city product tests via suitable RBA events
10. ORIGINAL — RTB-owned OEM after demand proof
11. REFERRAL — affiliate/referral commissions on products RTB should not stock
12. POP-UP — temporary in-facility retail/event collaborations

## Pilot offer architecture

### B2C
- RTB Movement Check 30 — target ¥3,300
- RTB Performance Assessment — target ¥6,600
- RTB BASE — target ¥1,980/month
- RTB PERFORMANCE — target ¥4,980/month
- RTB SELECT — product-specific pricing

Pricing above is pilot pricing and must be reviewed before public production launch.

### B2B
- Corporate Performance — quote
- Team S&C — quote
- RTB 30-Day Product Test — from ¥55,000 pilot
- RTB Select Pop-up — commercial terms by partner
- Multi-City Product Test — quote
- OEM / Collaboration — quote

## Zero-capital priority
1. Consignment
2. Affiliate/referral
3. Demo → manufacturer/direct ecommerce
4. Preorder
5. One-unit / small-lot wholesale
6. Micro-stock only after paid proof
7. OEM only from retained gross profit

## Product-test deliverable template
Before accepting a paid brand test, define:
- test duration
- sample quantity
- target user group
- approved claims/content
- display/demo location
- staff briefing
- feedback questions
- sales attribution method
- photo/content permissions
- final report scope
- whether product remains, is returned, or is consumed
- no guarantee of positive review or sales

RTB must never sell a favorable evaluation. Payment is for execution and reporting, not endorsement.

## Commercial scorecard
For each partner:
- upfront cash
- landed gross margin
- repeat purchase potential
- size/color complexity
- demo value
- Sendai differentiation
- return/defect burden
- ecommerce/event restrictions
- supplier lead time
- data/reporting opportunity

## Go/no-go
GO if:
- zero/low upfront cash, OR paid preorder covers purchase
- gross margin target met
- clear RTB use story
- operational burden reasonable

NO-GO if:
- broad speculative size inventory
- margin <30% without strong repeat/referral economics
- supplier requires misleading claims
- paid partnership requires positive review
- unclear returns/defect responsibility
- product category creates disproportionate compliance risk

## Payments / bookkeeping
Use metadata/tagging so RTB can be separated from RBA:
- brand=RTB
- revenue_stream=assessment|membership|select|team|corporate|product_test|referral|oem
- offer_code=<stable identifier>

For pilot, prefer hosted payment links and hosted invoices over custom checkout code.
B2B invoices should state scope and payment terms clearly.

## Current implementation
- /rtb-select — demand-led retail preview
- /rtb-business — B2B monetization preview
- Consumer demand form — live
- Brand retail partner form — live
- Performance Partner B2B form — live
- Partner outreach — active
- Production deployment — intentionally not performed
