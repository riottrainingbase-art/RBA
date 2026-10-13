
create table if not exists public.dhub_paid_article_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  article_id uuid not null references public.dhub_paid_articles(id) on delete cascade,
  status text not null default 'started' check (status in ('started','completed')),
  reflection text not null default '',
  next_action text not null default '',
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id,article_id)
);

alter table public.dhub_paid_article_progress enable row level security;

drop policy if exists "paid_article_progress_select_own" on public.dhub_paid_article_progress;
create policy "paid_article_progress_select_own"
on public.dhub_paid_article_progress
for select
using (auth.uid() = user_id);

drop policy if exists "paid_article_progress_insert_own" on public.dhub_paid_article_progress;
create policy "paid_article_progress_insert_own"
on public.dhub_paid_article_progress
for insert
with check (auth.uid() = user_id);

drop policy if exists "paid_article_progress_update_own" on public.dhub_paid_article_progress;
create policy "paid_article_progress_update_own"
on public.dhub_paid_article_progress
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create index if not exists dhub_paid_article_progress_user_idx
on public.dhub_paid_article_progress(user_id,updated_at desc);

