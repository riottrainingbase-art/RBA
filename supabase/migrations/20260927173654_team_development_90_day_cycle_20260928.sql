-- Move TEAM DEVELOPMENT standard cycle from 30 days to 90 days.
-- Existing clinic_30 values remain valid for backwards compatibility.

alter table public.team_development_cycles
  drop constraint if exists team_development_cycle_package_check;

alter table public.team_development_cycles
  add constraint team_development_cycle_package_check
  check (package_key in ('clinic','clinic_30','clinic_90','partner','custom'));

alter table public.team_development_cycles
  alter column package_key set default 'clinic_90';

alter table public.team_development_plan_weeks
  drop constraint if exists team_development_week_no_check;

alter table public.team_development_plan_weeks
  add constraint team_development_week_no_check
  check (week_no between 1 and 12);

alter table public.team_development_checkins
  drop constraint if exists team_development_checkin_week_check;

alter table public.team_development_checkins
  add constraint team_development_checkin_week_check
  check (week_no is null or week_no between 1 and 12);

create table if not exists public.team_development_phase_reviews (
  id uuid primary key default gen_random_uuid(),
  cycle_id uuid not null references public.team_development_cycles(id) on delete cascade,
  phase_no integer not null check (phase_no between 1 and 3),
  review_on date not null default current_date,
  submitted_by uuid not null references public.profiles(id) on delete restrict,
  progress_state text not null default 'trying'
    check (progress_state in ('not_started','trying','more_consistent','embedded')),
  what_changed text not null default '',
  evidence text not null default '',
  next_priority text not null default '',
  rba_note text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(cycle_id,phase_no)
);

create index if not exists team_development_phase_reviews_cycle_idx
  on public.team_development_phase_reviews(cycle_id,phase_no);
create index if not exists team_development_phase_reviews_submitted_by_idx
  on public.team_development_phase_reviews(submitted_by);

alter table public.team_development_phase_reviews enable row level security;

drop policy if exists "team development phase reviews read" on public.team_development_phase_reviews;
create policy "team development phase reviews read"
on public.team_development_phase_reviews for select
to authenticated
using (private.can_manage_team_development(cycle_id));

drop policy if exists "team development phase reviews insert" on public.team_development_phase_reviews;
create policy "team development phase reviews insert"
on public.team_development_phase_reviews for insert
to authenticated
with check (
  submitted_by=(select auth.uid())
  and private.can_manage_team_development(cycle_id)
);

drop policy if exists "team development phase reviews update" on public.team_development_phase_reviews;
create policy "team development phase reviews update"
on public.team_development_phase_reviews for update
to authenticated
using (
  (submitted_by=(select auth.uid()) and private.can_manage_team_development(cycle_id))
  or private.is_global_admin()
)
with check (
  (submitted_by=(select auth.uid()) and private.can_manage_team_development(cycle_id))
  or private.is_global_admin()
);

comment on table public.team_development_phase_reviews is
'Day 30, Day 60 and Day 90 team-level review checkpoints for the 90-day RBA TEAM DEVELOPMENT cycle.';
