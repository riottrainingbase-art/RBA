# RBA clinic LP automation — operator runbook

## Purpose
Generate a **draft-only** regional clinic LP from confirmed venue information. A GitHub pull request is the review gate. The generator never charges a customer, creates Stripe links, sends outreach, or posts on social media.

## Start
After this feature is merged to the repository default branch, open **GitHub → Actions → Clinic Draft Generator → Run workflow**. Enter a JSON object, for example:

```json
{
  "slug": "iwate-kitakami-2027-02-20",
  "area": "IWATE",
  "title": "岩手・北上クリニック",
  "eventDate": "2027-02-20",
  "date": "2027年2月20日（土）",
  "venue": "正式利用許可を得た体育館名",
  "audience": "U12・U15男女",
  "intro": "練習した技術を実戦で使えるようにする地域クリニック。",
  "venueConfirmed": true,
  "venueEvidenceUrl": "https://example.org/verified-venue-document"
}
```

Replace all example values with genuine evidence. The generator requires venueConfirmed=true and an HTTPS evidence URL, but it **cannot independently verify that the URL proves the booking**. A human reviewer must inspect the booking evidence and match venue, date, organiser, and conditions. Do not put private booking correspondence or participant data in a public URL.

The generated record is always **planning**, with fee **未確定**, and without an application or payment link. A draft PR is opened; do not merge until factual review and QA pass.

## Publish gate
1. Verify booking permission and paid-event / out-of-prefecture organiser rules.
2. Verify date and tournament conflicts, U12 basket height, emergency plan, capacity, insurance, age eligibility, price, refund policy and consent.
3. Verify RBA owns or has permission for every image and testimonial.
4. Verify official registration destination and eligibility; **never reuse resident-only Stripe links for ineligible users**.
5. Run GitHub checks and review mobile and desktop preview, link behavior, Japanese wording and metadata.
6. Approve and merge the PR only after the above are satisfied. A merge can trigger the site's existing deployment pipeline; publication is not controlled by the generator.

## State transitions
- Draft generator: planning only; no payment or application.
- Registration open: a separate reviewed edit must confirm venue, price, capacity, registration, payment and refund terms.
- Completed: remove live sales links, keep an accurate event record.
- Cancelled: mark cancellation explicitly and disable links separately after checking paid registrations.

## Failure behavior
Validation errors stop without modifying the generated file. Duplicated slugs and injected or placeholder strings are rejected. Workflow errors must be investigated; do not circumvent permission or safety failures by using other accounts or routes.

## Scope
The current automation uses **GitHub Actions**, not Google Sheets. A Sheets-to-PR adapter is a future enhancement requiring authentication, a trusted source sheet and independent verification of the venue evidence. No unattended marketing or payments are enabled.
