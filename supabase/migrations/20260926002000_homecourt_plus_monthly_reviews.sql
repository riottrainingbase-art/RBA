-- HOMECOURT PLUS: private monthly development reviews.
-- These are account-owned reflections and never create participation, ranking,
-- selection, medical, or safeguarding entitlements.

create table if not exists public.homecourt_monthly_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  period_month date not null,
  role text not null check (role in ('player','parent','coach')),
  focus text not null default '' check (char_length(focus) <= 1000),
  wins text not null default '' check (char_length(wins) <= 2000),
  challenge text not null default '' check (char_length(challenge) <= 2000),
  next_action text not null default '' check (char_length(next_action) <= 1000),
  note text not null default '' check (char_length(note) <= 3000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, period_month, role),
  check (period_month = date_trunc('month', period_month)::date)
);

create index if not exists homecourt_monthly_reviews_owner_period
  on public.homecourt_monthly_reviews(user_id, period_month desc);

alter table public.homecourt_monthly_reviews enable row level security;
revoke all on public.homecourt_monthly_reviews from anon, authenticated;
grant select, insert, update, delete on public.homecourt_monthly_reviews to authenticated;

create policy "monthly review owner reads"
  on public.homecourt_monthly_reviews for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "monthly review owner inserts"
  on public.homecourt_monthly_reviews for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "monthly review owner updates"
  on public.homecourt_monthly_reviews for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "monthly review owner deletes"
  on public.homecourt_monthly_reviews for delete to authenticated
  using ((select auth.uid()) = user_id);
