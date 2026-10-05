
create index if not exists dhub_paid_article_progress_article_idx
on public.dhub_paid_article_progress(article_id);

drop policy if exists "paid_article_progress_select_own" on public.dhub_paid_article_progress;
create policy "paid_article_progress_select_own"
on public.dhub_paid_article_progress
for select
using ((select auth.uid()) = user_id);

drop policy if exists "paid_article_progress_insert_own" on public.dhub_paid_article_progress;
create policy "paid_article_progress_insert_own"
on public.dhub_paid_article_progress
for insert
with check ((select auth.uid()) = user_id);

drop policy if exists "paid_article_progress_update_own" on public.dhub_paid_article_progress;
create policy "paid_article_progress_update_own"
on public.dhub_paid_article_progress
for update
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

