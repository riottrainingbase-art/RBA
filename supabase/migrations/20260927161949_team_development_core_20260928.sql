-- TEAM DEVELOPMENT core
create table if not exists public.team_development_cycles (
  id uuid primary key default gen_random_uuid(),
  entity_id uuid not null references public.platform_entities(id) on delete cascade,
  team_id uuid references public.teams(id) on delete set null,
  event_id uuid references public.events(id) on delete set null,
  title text not null,
  source_service text not null default 'rba_team_clinic',
  package_key text not null default 'clinic_30',
  status text not null default 'intake',
  clinic_on date,
  plan_start_on date,
  plan_end_on date,
  next_followup_on date,
  commercial_status text not null default 'included',
  access_ends_at timestamptz,
  created_by uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint team_development_cycle_source_check check (source_service in ('rba_team_clinic','rba_visit_training','partner_program','self_started','other')),
  constraint team_development_cycle_package_check check (package_key in ('clinic','clinic_30','partner','custom')),
  constraint team_development_cycle_status_check check (status in ('intake','scheduled','observed','report_ready','plan_active','review_due','completed','paused')),
  constraint team_development_cycle_commercial_check check (commercial_status in ('included','trial','active','partner','expired')),
  constraint team_development_cycle_date_check check (plan_end_on is null or plan_start_on is null or plan_end_on >= plan_start_on)
);
create index if not exists team_development_cycles_entity_idx on public.team_development_cycles(entity_id, created_at desc);
create index if not exists team_development_cycles_status_idx on public.team_development_cycles(status, clinic_on desc);
alter table public.team_development_cycles enable row level security;

create table if not exists public.team_development_briefs (
  cycle_id uuid primary key references public.team_development_cycles(id) on delete cascade,
  submitted_by uuid not null references public.profiles(id) on delete restrict,
  age_group text,
  player_count integer,
  training_days text,
  training_frequency text,
  current_context text,
  team_strength text,
  offense_challenge text,
  defense_challenge text,
  perception_decision_challenge text,
  physical_challenge text,
  coach_goal text,
  desired_change text,
  constraints text,
  notes text,
  updated_at timestamptz not null default now(),
  constraint team_development_brief_player_count_check check (player_count is null or player_count between 1 and 100)
);
alter table public.team_development_briefs enable row level security;

create table if not exists public.team_development_findings (
  id uuid primary key default gen_random_uuid(),
  cycle_id uuid not null references public.team_development_cycles(id) on delete cascade,
  domain text not null,
  finding_type text not null,
  observation text not null,
  evidence text,
  next_action text,
  priority integer,
  created_by uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint team_development_finding_domain_check check (domain in ('spacing','perception','decision','advantage','off_ball','transition','defense','communication','physical','practice_design','other')),
  constraint team_development_finding_type_check check (finding_type in ('strength','observation','priority')),
  constraint team_development_finding_priority_check check (priority is null or priority between 1 and 3)
);
create index if not exists team_development_findings_cycle_idx on public.team_development_findings(cycle_id, finding_type, priority);
alter table public.team_development_findings enable row level security;

create table if not exists public.team_development_reports (
  cycle_id uuid primary key references public.team_development_cycles(id) on delete cascade,
  summary text not null default '',
  strengths text[] not null default '{}',
  priorities text[] not null default '{}',
  coach_focus text not null default '',
  player_message text not null default '',
  family_message text not null default '',
  status text not null default 'draft',
  issued_by uuid references public.profiles(id) on delete set null,
  issued_at timestamptz,
  updated_at timestamptz not null default now(),
  constraint team_development_report_status_check check (status in ('draft','issued'))
);
alter table public.team_development_reports enable row level security;

create table if not exists public.team_development_plan_weeks (
  id uuid primary key default gen_random_uuid(),
  cycle_id uuid not null references public.team_development_cycles(id) on delete cascade,
  week_no integer not null,
  starts_on date,
  ends_on date,
  title text not null,
  focus text not null default '',
  objective text not null default '',
  small_sided_game text not null default '',
  coach_observation text not null default '',
  player_question text not null default '',
  status text not null default 'planned',
  created_by uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(cycle_id, week_no),
  constraint team_development_week_no_check check (week_no between 1 and 8),
  constraint team_development_week_status_check check (status in ('planned','active','complete')),
  constraint team_development_week_date_check check (ends_on is null or starts_on is null or ends_on >= starts_on)
);
alter table public.team_development_plan_weeks enable row level security;

create table if not exists public.team_development_checkins (
  id uuid primary key default gen_random_uuid(),
  cycle_id uuid not null references public.team_development_cycles(id) on delete cascade,
  week_no integer,
  submitted_by uuid not null references public.profiles(id) on delete restrict,
  progress_state text not null default 'trying',
  worked text not null default '',
  evidence text not null default '',
  stuck text not null default '',
  adjustment text not null default '',
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint team_development_checkin_week_check check (week_no is null or week_no between 1 and 8),
  constraint team_development_progress_state_check check (progress_state in ('not_started','trying','more_consistent','embedded'))
);
create index if not exists team_development_checkins_cycle_idx on public.team_development_checkins(cycle_id, week_no, submitted_at desc);
alter table public.team_development_checkins enable row level security;

create or replace function private.can_manage_team_development(target_cycle uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.team_development_cycles c
    where c.id=target_cycle
      and (private.is_entity_manager(c.entity_id) or private.is_global_admin())
  );
$$;
