# MY HOME COURT article publishing

## Current collection
The library now contains 38 original Japanese practical guides: 2 for players, 34 for parents and 2 for coaches. Parent content is intentionally separated into dedicated catalogue files so the parent library can grow without editing player/coach content. Not transcripts, medical guidance or claimed clinic observations. No guest quotes, private participant data, images or third-party course material.

## Add an article
- Player/coach: edit `lib/member-articles.ts`.
- Parent: add to `lib/member-parent-articles.ts` or the next numbered parent catalogue file and include that catalogue in the server route.
- Every article needs a unique slug, role, title, summary, at least 3 sections, one practical action and at least 3 reflection questions.
- Parent articles should include a category and useful search tags. Reuse existing category names when possible instead of creating near-duplicates.
- The server-rendered list, role groups, parent search/category filters and same-role related links are generated from the combined catalogue.
- Keep catalogue modules server-side; do not import member article bodies into client components.
- The catalogue is in the repository; repository access must be restricted if source text is intended to remain private.

## Review and release
1. Check topic duplication and Japanese wording; keep paragraphs short.
2. Verify factual claims from primary sources; distinguish proposals from observations. Confirm rights for any guest material.
3. Run `node audit/member-learning/check.mjs`, TypeScript, lint and build.
4. Check preview at 320, 375, 390 and 430 pixels; check links and both authorised and unauthorised responses.
5. Merge a reviewed branch, verify Vercel READY and inspect the production route.

## Access
The new Japanese route is `/ja/my-homecourt/app/learn` and `/ja/my-homecourt/app/learn/<slug>`. It validates the user using the existing server Supabase client and reads only that user's `homecourt_monthly` subscriptions. Only active/trialing subscriptions with a valid future paid-through timestamp release article bodies. Missing timestamps fail closed with a pending notice; do not ask those users to pay again. Database errors fail closed and offer retry. No changes to Stripe settings, authentication architecture or DB schema.

## Known release checks
Checkout completion can create a subscription without current_period_end before the subscription webhook synchronises it. Real subscriber access and live RLS remain deployment checks; mocked tests do not prove production webhook delivery. Articles must not be announced as accessible to paying members until a real current subscription can open a body.

## Continuing publication
Parent topics are organized around recurring needs such as 出場・役割, 移籍・環境, 指導者との対話, 安全・安心, 親子コミュニケーション, 遠征・費用, チーム選び, 練習・休養 and 進路・選択. Add new articles when a recurring question deserves a reusable answer. Prefer one clear problem per article, concrete examples, a practical next action and questions that preserve the player's agency. Publish when reviewed, not to meet an arbitrary volume target. No automatic customer messages or scheduled publishing is enabled by this change.
