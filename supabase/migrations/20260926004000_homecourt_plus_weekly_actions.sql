-- HOMECOURT PLUS: private weekly development loop for PLAYER / PARENT / COACH.
create table if not exists public.homecourt_weekly_actions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  week_start date not null,
  role text not null check (role in ('player','parent','coach')),
  theme text not null default '' check (char_length(theme) <= 500),
  action text not null default '' check (char_length(action) <= 1200),
  evidence text not null default '' check (char_length(evidence) <= 1200),
  reflection text not null default '' check (char_length(reflection) <= 2000),
  next_action text not null default '' check (char_length(next_action) <= 1200),
  status text not null default 'active' check (status in ('active','completed','skipped')),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, week_start, role)
);
create index if not exists homecourt_weekly_actions_owner_week
  on public.homecourt_weekly_actions(user_id, week_start desc);
alter table public.homecourt_weekly_actions enable row level security;
revoke all on public.homecourt_weekly_actions from anon, authenticated;
grant select, insert, update, delete on public.homecourt_weekly_actions to authenticated;
create policy "weekly action owner reads" on public.homecourt_weekly_actions for select to authenticated using ((select auth.uid())=user_id);
create policy "weekly action owner inserts" on public.homecourt_weekly_actions for insert to authenticated with check ((select auth.uid())=user_id);
create policy "weekly action owner updates" on public.homecourt_weekly_actions for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy "weekly action owner deletes" on public.homecourt_weekly_actions for delete to authenticated using ((select auth.uid())=user_id);