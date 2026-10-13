
-- RBA Global Scale Platform v4
-- International partnerships, impact reporting, federation readiness, coach education,
-- safeguarding governance and research/evidence layer.

create table if not exists public.global_partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  organization_type text not null check (organization_type in (
    'national_federation','regional_federation','club','academy','school','university',
    'ngo','government','brand','medical','performance','event_organizer','other'
  )),
  country_code text not null,
  city text,
  website_url text,
  contact_name text,
  contact_email text,
  relationship_status text not null default 'prospect'
    check (relationship_status in ('prospect','contacted','discussion','mou_drafting','active','paused','ended')),
  strategic_fit text,
  safeguarding_contact text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(name,country_code)
);

create table if not exists public.global_partnership_agreements (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.global_partners(id) on delete cascade,
  agreement_type text not null check (agreement_type in (
    'mou','exchange','coach_education','tournament','player_development',
    'research','sponsorship','facility','community_impact','other'
  )),
  title text not null,
  status text not null default 'draft'
    check (status in ('draft','review','signed','active','expired','terminated')),
  starts_on date,
  ends_on date,
  document_reference text,
  owner_user_id uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists global_partnership_agreements_partner_idx
  on public.global_partnership_agreements(partner_id,status);

create table if not exists public.global_exchange_programs (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  partner_id uuid references public.global_partners(id) on delete set null,
  title text not null,
  exchange_type text not null check (exchange_type in (
    'outbound_team','inbound_team','coach_exchange','camp','tournament',
    'study_visit','online_exchange','research_exchange'
  )),
  host_country_code text not null,
  city text,
  target_group text,
  starts_on date,
  ends_on date,
  capacity integer check (capacity is null or capacity>=0),
  status text not null default 'planning'
    check (status in ('planning','recruiting','confirmed','completed','cancelled')),
  event_id uuid references public.events(id) on delete set null,
  created_at timestamptz not null default now()
);
create index if not exists global_exchange_programs_partner_idx
  on public.global_exchange_programs(partner_id,status);

create table if not exists public.impact_metrics (
  id uuid primary key default gen_random_uuid(),
  metric_key text not null unique,
  label_ja text not null,
  label_en text not null,
  unit text not null default 'count',
  category text not null check (category in (
    'participation','development','coach_education','safeguarding',
    'inclusion','community','international','retention','quality'
  )),
  methodology text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

insert into public.impact_metrics(metric_key,label_ja,label_en,unit,category,methodology) values
 ('participants_unique','ユニーク参加者','Unique participants','count','participation','Distinct participants in reporting period'),
 ('girls_participation_rate','女子参加率','Girls participation rate','percent','inclusion','Girls participants / all participants'),
 ('repeat_participation_rate','再参加率','Repeat participation rate','percent','retention','Participants with prior RBA participation / participants'),
 ('coach_learning_hours','コーチ学習時間','Coach learning hours','hours','coach_education','Verified education minutes / 60'),
 ('verified_coaches','確認済みコーチ','Verified coaches','count','coach_education','Coaches with verified credentials or approved RBA status'),
 ('safeguarding_reports','セーフガーディング報告','Safeguarding reports','count','safeguarding','Received safety reports'),
 ('safeguarding_closed_rate','安全案件解決率','Safeguarding case closure rate','percent','safeguarding','Resolved safeguarding cases / received cases'),
 ('international_programs','国際交流プログラム数','International programs','count','international','Confirmed/completed global exchange programs'),
 ('countries_connected','接続国数','Countries connected','count','international','Distinct countries with active partnerships/programs'),
 ('development_assessments','育成評価数','Development assessments','count','development','Completed player assessments'),
 ('goal_achievement_rate','目標達成率','Goal achievement rate','percent','development','Achieved player goals / closed or achieved goals'),
 ('program_quality_score','プログラム品質スコア','Program quality score','score_5','quality','Mean overall feedback score')
on conflict(metric_key) do nothing;

create table if not exists public.impact_snapshots (
  id uuid primary key default gen_random_uuid(),
  reporting_period_start date not null,
  reporting_period_end date not null,
  metric_id uuid not null references public.impact_metrics(id) on delete cascade,
  business_unit_id uuid references public.business_units(id),
  country_code text,
  value_numeric numeric not null,
  numerator numeric,
  denominator numeric,
  notes text,
  generated_at timestamptz not null default now(),
  unique(reporting_period_start,reporting_period_end,metric_id,business_unit_id,country_code)
);

create table if not exists public.coach_education_programs (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  title text not null,
  level text not null check (level in ('foundation','level_1','level_2','advanced','specialist')),
  target_audience text,
  delivery_mode text not null check (delivery_mode in ('online','in_person','hybrid')),
  language_codes text[] not null default ARRAY['ja']::text[],
  learning_outcomes jsonb not null default '[]'::jsonb,
  assessment_required boolean not null default false,
  certificate_issued boolean not null default false,
  status text not null default 'draft' check (status in ('draft','active','paused','retired')),
  created_at timestamptz not null default now()
);

create table if not exists public.coach_education_enrollments (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.coach_education_programs(id) on delete cascade,
  coach_user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'enrolled' check (status in ('enrolled','in_progress','completed','failed','withdrawn')),
  enrolled_at timestamptz not null default now(),
  completed_at timestamptz,
  assessment_score numeric,
  certificate_code text unique,
  unique(program_id,coach_user_id)
);
create index if not exists coach_education_enrollments_coach_idx
  on public.coach_education_enrollments(coach_user_id,status);

create table if not exists public.research_projects (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  title text not null,
  research_type text not null check (research_type in (
    'internal_evaluation','academic_collaboration','survey','longitudinal','program_evaluation','other'
  )),
  partner_id uuid references public.global_partners(id) on delete set null,
  purpose text not null,
  methodology text,
  ethics_review_status text not null default 'not_required'
    check (ethics_review_status in ('not_required','pending','approved','rejected')),
  privacy_basis text,
  status text not null default 'planning'
    check (status in ('planning','collecting','analysis','published','closed')),
  starts_on date,
  ends_on date,
  output_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.public_reports (
  id uuid primary key default gen_random_uuid(),
  report_type text not null check (report_type in (
    'annual_impact','safeguarding','development','coach_education','international','financial_summary','research'
  )),
  title text not null,
  year integer,
  language_code text not null default 'en',
  public_url text,
  status text not null default 'draft' check (status in ('draft','review','published','archived')),
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.safeguarding_officers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  full_name text not null,
  role_title text not null,
  email text,
  country_code text not null default 'JP',
  primary_contact boolean not null default false,
  training_provider text,
  training_name text,
  training_completed_on date,
  training_expires_on date,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.organization_standards (
  id uuid primary key default gen_random_uuid(),
  standard_key text not null unique,
  title text not null,
  area text not null check (area in (
    'coaching','safeguarding','governance','medical','data_privacy','event_operations',
    'international','inclusion','research','finance'
  )),
  version text not null,
  status text not null default 'draft' check (status in ('draft','approved','published','retired')),
  effective_on date,
  review_due_on date,
  public_url text,
  created_at timestamptz not null default now()
);

insert into public.organization_standards(standard_key,title,area,version,status) values
 ('rba_player_development_standard','RBA Player Development Standard','coaching','1.0','draft'),
 ('rba_coach_standard','RBA Coach Standard','coaching','1.0','draft'),
 ('rba_safeguarding_standard','RBA Safeguarding Standard','safeguarding','1.0','draft'),
 ('rba_event_standard','RBA Event Operations Standard','event_operations','1.0','draft'),
 ('rba_international_exchange_standard','RBA International Exchange Standard','international','1.0','draft'),
 ('rba_data_privacy_standard','RBA Youth Data & Privacy Standard','data_privacy','1.0','draft'),
 ('rba_inclusion_standard','RBA Inclusion & Access Standard','inclusion','1.0','draft'),
 ('rba_research_ethics_standard','RBA Research & Evaluation Standard','research','1.0','draft')
on conflict(standard_key) do nothing;

-- RLS
alter table public.global_partners enable row level security;
alter table public.global_partnership_agreements enable row level security;
alter table public.global_exchange_programs enable row level security;
alter table public.impact_metrics enable row level security;
alter table public.impact_snapshots enable row level security;
alter table public.coach_education_programs enable row level security;
alter table public.coach_education_enrollments enable row level security;
alter table public.research_projects enable row level security;
alter table public.public_reports enable row level security;
alter table public.safeguarding_officers enable row level security;
alter table public.organization_standards enable row level security;

-- Public read where appropriate; admin write.
create policy "impact_metrics_public_read" on public.impact_metrics for select to anon,authenticated using (active);
create policy "coach_education_programs_public_read" on public.coach_education_programs for select to anon,authenticated using (status='active');
create policy "public_reports_public_read" on public.public_reports for select to anon,authenticated using (status='published');
create policy "organization_standards_public_read" on public.organization_standards for select to anon,authenticated using (status='published');

create policy "global_partners_admin_all" on public.global_partners for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "global_agreements_admin_all" on public.global_partnership_agreements for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "global_exchange_admin_all" on public.global_exchange_programs for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "impact_metrics_admin_write" on public.impact_metrics for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "impact_snapshots_admin_all" on public.impact_snapshots for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "coach_education_programs_admin_write" on public.coach_education_programs for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());

create policy "coach_education_enrollments_self_read" on public.coach_education_enrollments
for select to authenticated using (coach_user_id=(select auth.uid()) or private.is_global_admin());
create policy "coach_education_enrollments_admin_write" on public.coach_education_enrollments
for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());

create policy "research_projects_admin_all" on public.research_projects for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "public_reports_admin_write" on public.public_reports for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "safeguarding_officers_admin_all" on public.safeguarding_officers for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "organization_standards_admin_write" on public.organization_standards for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());

-- International partner pipeline seed from current known RBA relationships.
insert into public.global_partners(name,organization_type,country_code,relationship_status,strategic_fit)
values
 ('MVP Academy','academy','MY','discussion','Youth curriculum, coach development and Japan exchange'),
 ('Philippines Basketball Delegation','other','PH','discussion','Japan-hosted exchange and delegation collaboration')
on conflict(name,country_code) do nothing;

