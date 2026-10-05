
create table if not exists public.homecourt_schedule_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  schedule_item_id uuid null references public.homecourt_schedule_items(id) on delete cascade,
  team_event_id uuid null references public.team_events(id) on delete cascade,
  title text not null check (char_length(trim(title)) between 1 and 180),
  category text not null default 'prepare' check (category in ('prepare','travel','equipment','recovery','study','other')),
  due_at timestamptz null,
  completed_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (schedule_item_id is not null or team_event_id is not null)
);
create index if not exists homecourt_schedule_tasks_user_due_idx on public.homecourt_schedule_tasks(user_id,due_at);
create index if not exists homecourt_schedule_tasks_schedule_idx on public.homecourt_schedule_tasks(schedule_item_id) where schedule_item_id is not null;
create index if not exists homecourt_schedule_tasks_team_event_idx on public.homecourt_schedule_tasks(team_event_id) where team_event_id is not null;
alter table public.homecourt_schedule_tasks enable row level security;
grant select,insert,update,delete on public.homecourt_schedule_tasks to authenticated;
drop policy if exists "schedule tasks owner reads" on public.homecourt_schedule_tasks;
drop policy if exists "schedule tasks owner inserts" on public.homecourt_schedule_tasks;
drop policy if exists "schedule tasks owner updates" on public.homecourt_schedule_tasks;
drop policy if exists "schedule tasks owner deletes" on public.homecourt_schedule_tasks;
create policy "schedule tasks owner reads" on public.homecourt_schedule_tasks for select to authenticated
using ((select auth.uid()) = user_id);
create policy "schedule tasks owner inserts" on public.homecourt_schedule_tasks for insert to authenticated
with check ((select auth.uid()) = user_id);
create policy "schedule tasks owner updates" on public.homecourt_schedule_tasks for update to authenticated
using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "schedule tasks owner deletes" on public.homecourt_schedule_tasks for delete to authenticated
using ((select auth.uid()) = user_id);

