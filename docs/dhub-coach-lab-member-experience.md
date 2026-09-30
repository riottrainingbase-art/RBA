# D-HUB COACH LAB paid member experience

The paid Coach Lab is designed as a weekly coaching workspace rather than a content catalogue.

## Member loop

1. Open the next 48-week curriculum lesson.
2. Choose one premium article related to the current coaching problem.
3. Test one change in practice, games, S&C, parent communication, or team operations.
4. Save what happened and the next action on the premium article.
5. Use BAND only when a real case benefits from discussion.

## Paid library

- 70+ Japanese coach articles across 19 current database categories.
- Search by free text.
- Filter by category.
- Filter by progress: not started / in progress / completed.
- Eight curated entry paths reduce the need to browse the full library.

## Progress data

Coach and player article progress both use `dhub_paid_article_progress`.
RLS restricts rows to the authenticated user's own `user_id`.
Before writing progress, the server action verifies:
- the user is authenticated;
- the user has the matching D-HUB entitlement;
- the article belongs to the requested programme and locale;
- the article is published.

The saved fields are:
- status
- reflection
- next_action
- completed_at

## Public positioning

The public Coach Lab page explains the paid value as:
- 48 weekly lessons / 12 modules
- 70+ premium practice articles
- 19 learning areas
- reflection / next-action recording
- BAND case discussion
- RBA ID member access

The free Coach Journal remains the place for public evidence and ideas. Paid D-HUB focuses on implementation, recording, and iteration.
