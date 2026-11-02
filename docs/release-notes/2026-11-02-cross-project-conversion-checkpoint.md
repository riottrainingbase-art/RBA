# 2026-11-02 RBA/RTB growth conversion checkpoint

This is the first, explicit preview build after merging the audience-first conversion hub in PR #302.

## Candidate scope
- New `/ja/start` page: separate audience routes to five current dated event pages, ongoing Sendai U12/U15 schools, RTB experience and business requests, coach support, RBA UNITED, local hosts, sponsors, international activity and a separate JPNentry RFQ.
- Front-page quick paths and CTA tracking for those audiences, without collecting private form fields in analytics.
- Okinawa event index updated to distinguish venue's written approval from final accommodation paperwork/supervision/transfer arrangements in Japanese, English, Traditional Chinese and Korean.

## Review gates
- Confirm the new page renders at the Preview URL and on mobile.
- Verify each official form/CTA destination, and ensure no personal details are sent in click analytics.
- Preserve existing payment/refund flows; do not start a checkout while testing.
- Confirm latest live site is not updated until a verified preview has been promoted to production.
- `main` and `preview-rba` have diverged, so reconcile the release scope and run static CI before promotion.

This checkpoint is not an assertion of release or a commitment to spend additional marketing budget.
