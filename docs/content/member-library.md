# MY HOME COURT article publishing

## First collection
Six original Japanese practical guides: two each for players, parents and coaches. Not transcripts, medical guidance or claimed clinic observations. No guest quotes, private participant data, images or third-party course material.

## Add an article
Edit `lib/member-articles.ts`, adding a unique slug, role, title, summary, sections, one practical action and reflection questions. The server-rendered list, role groups and same-role related links use this single catalogue. Do not import this server-only module into client components. The catalogue is in the repository; GitHub repository access must be restricted if the source text is intended to remain private.

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
Suggested next sequence (not scheduled): off-ball observation; asking a coach a useful question; comparing a child's progress without ranking; preparing for a first away clinic; reviewing a small-sided game; recording coaching changes over a month. Publish when reviewed, not to meet an arbitrary volume target. No automatic customer messages or scheduled publishing is enabled by this change.
