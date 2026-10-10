# Taiwan Pilot — Unit Economics & Release Gates
**Internal only; not an offer or quote.**

## Price and cost inputs
| Variable | Meaning | Example hypothesis (JPY) | Evidence required |
|---|---|---:|---|
| P | Programme fee per participant, excluding flights/hotel | 44,000 | Written customer willingness-to-pay / approved pricing |
| N | Paid participants | 16 | Confirmed enrolment / provider success |
| F | Fixed direct event costs | 385,000 | Venue, coaches, interpreter, insurance and admin quotes |
| V | Variable direct costs per participant | 12,500 | Consumables, meal/transport if actually in programme scope, payment fee |
| R | Revenue | P × N = 704,000 | Paid invoices, provider transactions |
| C | Direct cost | F + V × N = 585,000 | Invoices / verified quotations |
| G | Contribution before overhead and tax | R - C = 119,000 | Reconciled actuals |
| B | Break-even participant count | CEILING(F / (P - V)) = 13 | All cost inputs evidenced |

**Warning:** Numbers above are illustrative, not verified. Do not populate Airtable 'Quoted Revenue JPY', 'Verified Direct Cost JPY' or 'Expected Contribution JPY' from these assumptions.

## Three-case decision model
| Case | N | Revenue | Direct cost | Contribution |
|---|---:|---:|---:|---:|
| Downside | 10 | 440,000 | 510,000 | -70,000 |
| Base | 16 | 704,000 | 585,000 | 119,000 |
| Upside | 20 | 880,000 | 635,000 | 245,000 |

**Stress test:** evaluate no-show/refund rate, FX, venue cancellation, local staff replacement, flight disruptions, emergency medical transport and refunds before approving deposits.

## Minimum operational release criteria
1. **Demand:** named buyer/academy; actual count and budget evidence.
2. **Delivery:** written venue availability and coaching/interpretation coverage.
3. **Legal:** confirm the travel/teaching/tax arrangement with qualified providers as necessary.
4. **Safety:** named supervising adults, emergency plan, insurance, parental consent and media permission.
5. **Commercial:** signed scope, minimum number, cancellation/refund policy, partner payment and margin floor.
6. **Payments:** approved seller identity, canonical payment route, settlement reconciliation and refund reserves.
7. **Marketing:** consented partner brand use, fact-checked translations, canonical RBA site, no child image without permission.
8. **Technical:** TypeScript, ESLint, build, accessibility, language routing and real form routing verified.
9. **Governance:** one opportunity per programme; DNC and send ledger before external messages; change log entry.
10. **Release:** single controlled preview, QA, promote verified preview artifact; no automatic feature-branch deployment.

## Weekly metrics
- Qualified organisational enquiries (not generic site views)
- Reply within agreed business-day SLA
- Written pilot scopes accepted
- Paid enrolments verified by provider
- Contribution after verified direct costs
- Delivery incidents and safeguarding compliance
- Repeat interest / signed next-event intent

## Separation of business lines
RBA: programme service. RTB: B2B S&C education. JPNentry: sourcing/verification. No shared customer list without consent; no cross-company payments or double counting.
