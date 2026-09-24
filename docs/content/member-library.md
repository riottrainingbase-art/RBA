# MY HOME COURT article publishing

## Current collection
76 original Japanese practical guides: 39 for players, 35 for parents and 2 for coaches. Parent material is organized around recurring needs rather than a chronological feed. Not transcripts, medical guidance or claimed clinic observations. No guest quotes, private participant data, images or third-party course material.

## Add an article
Edit `lib/member-articles.ts` for public-safe slug, role, title, summary and—when useful for parent discovery—category/tags only. Store sections, practical action and reflection questions in `public.member_article_bodies` using the authorised database editor. Insert drafts with `published=false`, review, then set `published=true` and `published_at`. Never commit article bodies to Git. Parent search and category filters read only public-safe catalogue metadata. Do not import this server-only module into client components. The repository is public. Initial introductory drafts appeared in earlier branch history; do not claim those paragraphs are exclusive. New parent article bodies are stored only in the database.

## Review and release
1. Check topic duplication and Japanese wording; keep paragraphs short.
2. Verify factual claims from primary sources; distinguish proposals from observations. Confirm rights for any guest material.
3. Run `node audit/member-learning/check.mjs`, TypeScript, lint and build.
4. Check preview at 320, 375, 390 and 430 pixels; check links and both authorised and unauthorised responses.
5. Merge a reviewed branch, verify Vercel READY and inspect the production route.

## Access
The new Japanese route is `/ja/my-homecourt/app/learn` and `/ja/my-homecourt/app/learn/<slug>`. It validates the user using the existing server Supabase client and reads only that user's `homecourt_monthly` subscriptions. Only active/trialing subscriptions with a valid future paid-through timestamp release article bodies. Missing timestamps fail closed with a pending notice; do not ask those users to pay again. Database errors fail closed and offer retry. An additive member_article_bodies table uses RLS: authenticated SELECT requires a current subscription; anonymous reads and authenticated writes are denied. No changes to Stripe settings, existing authentication architecture or existing tables.

## Known release checks
Checkout completion can create a subscription without current_period_end before the subscription webhook synchronises it. Real subscriber access and live RLS remain deployment checks; mocked tests do not prove production webhook delivery. Articles must not be announced as accessible to paying members until a real current subscription can open a body.

## Continuing publication
Player categories include 判断・認知, 1on1, シュート, 試合・メンタル, オフボール, ディフェンス, チーム・コミュニケーション, 練習・振り返り and 身体・コンディショニング. Parent categories currently include 親子コミュニケーション, 進路・選択, 出場・役割, 移籍・環境, 指導者との対話, 安全・安心, 遠征・費用, チーム選び and 練習・休養. Reuse existing category names before inventing a near-duplicate. Prefer one clear problem per article, concrete examples, one practical next action and reflection questions that preserve the player's agency. Publish when reviewed, not to meet an arbitrary volume target. No automatic customer messages or scheduled publishing is enabled by this change.

## Storage verification (2026-09-24)
Supabase migration member_article_bodies_private_storage applied. Real database RLS checks passed for denied anonymous read, denied member writes, unsubscribed read denial, current subscription access to six rows and expired access denial. Fixtures and temporary publication changes were rolled back. No billing provider calls or real subscription changes persisted. At verification there were no homecourt_monthly subscription records, so a real purchaser end-to-end test remains outstanding. Existing security advisor warnings concern join_team_with_code and password protection, not the new article table.
