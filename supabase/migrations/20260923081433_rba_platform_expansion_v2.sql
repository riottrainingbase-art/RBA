
-- RBA Platform Expansion v2
-- Youth development platform: player development, applications, waitlists,
-- scholarships, coach credentials, safeguarding, partner/facility discovery and feedback.

create table if not exists public.player_development_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  primary_position text,
  secondary_positions text[] not null default '{}',
  dominant_hand text check (dominant_hand is null or dominant_hand in ('right','left','both','unknown')),
  development_stage text not null default 'foundation'
    check (development_stage in ('foundation','learning','developing','advanced','performance')),
  long_term_goal text,
  current_focus text,
  public_visibility text not null default 'private'
    check (public_visibility in ('private','team','rba_network')),
  updated_at timestamptz not null default now()
);

create table if not exists public.player_goals (
  id uuid primary key default gen_random_uuid(),
  player_user_id uuid not null references auth.users(id) on delete cascade,
  category text not null check (category in ('skill','decision_making','physical','tactical','habit','confidence','other')),
  title text not null,
  description text,
  target_date date,
  status text not null default 'active' check (status in ('active','achieved','paused','cancelled')),
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  achieved_at timestamptz
);

create index if not exists player_goals_player_idx on public.player_goals(player_user_id,status);

create table if not exists public.player_assessments (
  id uuid primary key default gen_random_uuid(),
  player_user_id uuid not null references auth.users(id) on delete cascade,
  assessor_user_id uuid not null references auth.users(id),
  event_id uuid references public.events(id) on delete set null,
  assessment_date date not null default current_date,
  assessment_type text not null default 'development'
    check (assessment_type in ('development','camp','club','combine','self','other')),
  technical jsonb not null default '{}'::jsonb,
  decision_making jsonb not null default '{}'::jsonb,
  tactical jsonb not null default '{}'::jsonb,
  physical jsonb not null default '{}'::jsonb,
  habits jsonb not null default '{}'::jsonb,
  strengths text,
  next_actions text,
  visibility text not null default 'family_and_staff'
    check (visibility in ('staff_only','family_and_staff','player_family_staff')),
  created_at timestamptz not null default now()
);

create index if not exists player_assessments_player_date_idx
  on public.player_assessments(player_user_id,assessment_date desc);
create index if not exists player_assessments_assessor_idx
  on public.player_assessments(assessor_user_id);

create table if not exists public.development_plan_items (
  id uuid primary key default gen_random_uuid(),
  player_user_id uuid not null references auth.users(id) on delete cascade,
  goal_id uuid references public.player_goals(id) on delete set null,
  title text not null,
  instructions text,
  frequency_per_week integer check (frequency_per_week is null or frequency_per_week between 1 and 14),
  starts_on date not null default current_date,
  ends_on date,
  status text not null default 'active' check (status in ('active','completed','paused','cancelled')),
  assigned_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create index if not exists development_plan_player_idx
  on public.development_plan_items(player_user_id,status);

create table if not exists public.player_reflections (
  id uuid primary key default gen_random_uuid(),
  player_user_id uuid not null references auth.users(id) on delete cascade,
  event_id uuid references public.events(id) on delete set null,
  reflection_date date not null default current_date,
  what_went_well text,
  what_was_difficult text,
  next_focus text,
  confidence_score integer check (confidence_score is null or confidence_score between 1 and 5),
  enjoyment_score integer check (enjoyment_score is null or enjoyment_score between 1 and 5),
  created_at timestamptz not null default now()
);

create index if not exists player_reflections_player_idx
  on public.player_reflections(player_user_id,reflection_date desc);

create table if not exists public.program_applications (
  id uuid primary key default gen_random_uuid(),
  applicant_user_id uuid not null references auth.users(id) on delete cascade,
  subject_user_id uuid references auth.users(id) on delete cascade,
  event_id uuid references public.events(id) on delete cascade,
  service_offer_id uuid references public.service_offers(id) on delete cascade,
  application_type text not null default 'standard'
    check (application_type in ('standard','selection','scholarship','international','team')),
  status text not null default 'submitted'
    check (status in ('draft','submitted','under_review','accepted','waitlisted','rejected','withdrawn')),
  answers jsonb not null default '{}'::jsonb,
  reviewed_by uuid references auth.users(id),
  review_note text,
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz,
  unique(applicant_user_id,subject_user_id,event_id,service_offer_id,application_type)
);

create index if not exists program_applications_event_status_idx
  on public.program_applications(event_id,status);
create index if not exists program_applications_subject_idx
  on public.program_applications(subject_user_id);

create table if not exists public.program_waitlist (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  subject_user_id uuid not null references auth.users(id) on delete cascade,
  application_id uuid references public.program_applications(id) on delete set null,
  priority integer not null default 100,
  status text not null default 'waiting'
    check (status in ('waiting','offered','accepted','expired','removed')),
  joined_at timestamptz not null default now(),
  offer_expires_at timestamptz,
  unique(event_id,subject_user_id)
);

create index if not exists program_waitlist_event_idx
  on public.program_waitlist(event_id,status,priority,joined_at);

create table if not exists public.scholarship_programs (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  title text not null,
  description text,
  funding_source text,
  discount_type text not null check (discount_type in ('fixed_jpy','percent','full')),
  discount_value integer not null check (discount_value >= 0),
  starts_on date,
  ends_on date,
  status text not null default 'active' check (status in ('draft','active','paused','closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.scholarship_awards (
  id uuid primary key default gen_random_uuid(),
  scholarship_program_id uuid not null references public.scholarship_programs(id) on delete restrict,
  recipient_user_id uuid not null references auth.users(id) on delete cascade,
  event_id uuid references public.events(id) on delete set null,
  service_offer_id uuid references public.service_offers(id) on delete set null,
  amount_jpy integer check (amount_jpy is null or amount_jpy >= 0),
  status text not null default 'approved' check (status in ('approved','applied','used','revoked','expired')),
  approved_by uuid references auth.users(id),
  approved_at timestamptz not null default now(),
  notes text
);

create index if not exists scholarship_awards_recipient_idx
  on public.scholarship_awards(recipient_user_id,status);

create table if not exists public.coach_credentials (
  id uuid primary key default gen_random_uuid(),
  coach_user_id uuid not null references auth.users(id) on delete cascade,
  credential_type text not null,
  issuer text not null,
  credential_name text not null,
  credential_number text,
  issued_on date,
  expires_on date,
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified','pending','verified','expired','rejected')),
  verified_by uuid references auth.users(id),
  verified_at timestamptz,
  document_reference text,
  unique(coach_user_id,issuer,credential_name,credential_number)
);

create index if not exists coach_credentials_user_idx
  on public.coach_credentials(coach_user_id,verification_status);

create table if not exists public.coach_development_records (
  id uuid primary key default gen_random_uuid(),
  coach_user_id uuid not null references auth.users(id) on delete cascade,
  activity_type text not null check (activity_type in ('clinic','mentoring','observation','course','workshop','self_study','other')),
  title text not null,
  provider text,
  occurred_on date not null,
  minutes integer check (minutes is null or minutes > 0),
  evidence_reference text,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists coach_development_user_idx
  on public.coach_development_records(coach_user_id,occurred_on desc);

create table if not exists public.entity_tags (
  id uuid primary key default gen_random_uuid(),
  tag_key text not null unique,
  label_ja text not null,
  label_en text,
  category text not null default 'general'
);

create table if not exists public.platform_entity_tags (
  entity_id uuid not null references public.platform_entities(id) on delete cascade,
  tag_id uuid not null references public.entity_tags(id) on delete cascade,
  primary key(entity_id,tag_id)
);

create index if not exists platform_entity_tags_tag_idx
  on public.platform_entity_tags(tag_id,entity_id);

create table if not exists public.offer_tags (
  service_offer_id uuid not null references public.service_offers(id) on delete cascade,
  tag_id uuid not null references public.entity_tags(id) on delete cascade,
  primary key(service_offer_id,tag_id)
);

create index if not exists offer_tags_tag_idx
  on public.offer_tags(tag_id,service_offer_id);

insert into public.entity_tags(tag_key,label_ja,label_en,category) values
 ('u8','U8','U8','age'),
 ('u10','U10','U10','age'),
 ('u12','U12','U12','age'),
 ('u15','U15','U15','age'),
 ('girls','女子','Girls','audience'),
 ('boys','男子','Boys','audience'),
 ('mixed','男女','Mixed','audience'),
 ('clinic','クリニック','Clinic','program'),
 ('camp','キャンプ','Camp','program'),
 ('tournament','大会','Tournament','program'),
 ('international','海外・国際交流','International','program'),
 ('coach_education','指導者学習','Coach Education','program'),
 ('strength_conditioning','S&C','Strength & Conditioning','program'),
 ('team_training','チームトレーニング','Team Training','program')
on conflict(tag_key) do nothing;

create table if not exists public.participant_safety_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  emergency_contact_name text,
  emergency_contact_relation text,
  emergency_contact_phone text,
  accommodation_note text,
  allergy_note text,
  medication_note text,
  medical_provider_note text,
  last_confirmed_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.event_checkins (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  participant_user_id uuid not null references auth.users(id) on delete cascade,
  checked_in_at timestamptz,
  checked_out_at timestamptz,
  checked_in_by uuid references auth.users(id),
  status text not null default 'expected'
    check (status in ('expected','checked_in','checked_out','absent','excused')),
  notes text,
  unique(event_id,participant_user_id)
);

create index if not exists event_checkins_event_status_idx
  on public.event_checkins(event_id,status);

create table if not exists public.program_feedback (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete cascade,
  service_offer_id uuid references public.service_offers(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  participant_user_id uuid references auth.users(id) on delete cascade,
  overall_score integer check (overall_score between 1 and 5),
  development_value_score integer check (development_value_score between 1 and 5),
  safety_score integer check (safety_score between 1 and 5),
  communication_score integer check (communication_score between 1 and 5),
  comment text,
  permission_to_quote boolean not null default false,
  created_at timestamptz not null default now(),
  unique(event_id,service_offer_id,user_id,participant_user_id)
);

create index if not exists program_feedback_event_idx
  on public.program_feedback(event_id,created_at desc);

-- RLS
alter table public.player_development_profiles enable row level security;
alter table public.player_goals enable row level security;
alter table public.player_assessments enable row level security;
alter table public.development_plan_items enable row level security;
alter table public.player_reflections enable row level security;
alter table public.program_applications enable row level security;
alter table public.program_waitlist enable row level security;
alter table public.scholarship_programs enable row level security;
alter table public.scholarship_awards enable row level security;
alter table public.coach_credentials enable row level security;
alter table public.coach_development_records enable row level security;
alter table public.entity_tags enable row level security;
alter table public.platform_entity_tags enable row level security;
alter table public.offer_tags enable row level security;
alter table public.participant_safety_profiles enable row level security;
alter table public.event_checkins enable row level security;
alter table public.program_feedback enable row level security;

-- player/family permissions
create policy "player_dev_profile_family_read" on public.player_development_profiles
for select to authenticated using (
  user_id=(select auth.uid())
  or exists(select 1 from public.guardian_links gl where gl.child_user_id=user_id and gl.parent_user_id=(select auth.uid()) and gl.verified_at is not null)
  or private.is_global_admin()
);
create policy "player_dev_profile_self_update" on public.player_development_profiles
for update to authenticated using (user_id=(select auth.uid()) or private.is_global_admin())
with check (user_id=(select auth.uid()) or private.is_global_admin());
create policy "player_dev_profile_self_insert" on public.player_development_profiles
for insert to authenticated with check (user_id=(select auth.uid()) or private.is_global_admin());

create policy "player_goals_family_read" on public.player_goals
for select to authenticated using (
  player_user_id=(select auth.uid())
  or exists(select 1 from public.guardian_links gl where gl.child_user_id=player_user_id and gl.parent_user_id=(select auth.uid()) and gl.verified_at is not null)
  or private.is_global_admin()
);
create policy "player_goals_manage" on public.player_goals
for all to authenticated using (
  player_user_id=(select auth.uid()) or created_by=(select auth.uid()) or private.is_global_admin()
) with check (
  player_user_id=(select auth.uid()) or created_by=(select auth.uid()) or private.is_global_admin()
);

create policy "assessments_family_read" on public.player_assessments
for select to authenticated using (
  player_user_id=(select auth.uid())
  or assessor_user_id=(select auth.uid())
  or exists(select 1 from public.guardian_links gl where gl.child_user_id=player_user_id and gl.parent_user_id=(select auth.uid()) and gl.verified_at is not null)
  or private.is_global_admin()
);
create policy "assessments_staff_insert" on public.player_assessments
for insert to authenticated with check (assessor_user_id=(select auth.uid()) or private.is_global_admin());

create policy "development_plan_family_read" on public.development_plan_items
for select to authenticated using (
  player_user_id=(select auth.uid())
  or assigned_by=(select auth.uid())
  or exists(select 1 from public.guardian_links gl where gl.child_user_id=player_user_id and gl.parent_user_id=(select auth.uid()) and gl.verified_at is not null)
  or private.is_global_admin()
);
create policy "development_plan_assign" on public.development_plan_items
for all to authenticated using (
  assigned_by=(select auth.uid()) or player_user_id=(select auth.uid()) or private.is_global_admin()
) with check (
  assigned_by=(select auth.uid()) or player_user_id=(select auth.uid()) or private.is_global_admin()
);

create policy "reflections_self_family_read" on public.player_reflections
for select to authenticated using (
  player_user_id=(select auth.uid())
  or exists(select 1 from public.guardian_links gl where gl.child_user_id=player_user_id and gl.parent_user_id=(select auth.uid()) and gl.verified_at is not null)
  or private.is_global_admin()
);
create policy "reflections_self_write" on public.player_reflections
for all to authenticated using (player_user_id=(select auth.uid()) or private.is_global_admin())
with check (player_user_id=(select auth.uid()) or private.is_global_admin());

-- applications/waitlists
create policy "applications_self_read" on public.program_applications
for select to authenticated using (
 applicant_user_id=(select auth.uid()) or subject_user_id=(select auth.uid()) or private.is_global_admin()
);
create policy "applications_self_insert" on public.program_applications
for insert to authenticated with check (applicant_user_id=(select auth.uid()));
create policy "applications_self_update_draft" on public.program_applications
for update to authenticated using (
 (applicant_user_id=(select auth.uid()) and status in ('draft','submitted')) or private.is_global_admin()
) with check (
 applicant_user_id=(select auth.uid()) or private.is_global_admin()
);

create policy "waitlist_self_read" on public.program_waitlist
for select to authenticated using (
 subject_user_id=(select auth.uid())
 or exists(select 1 from public.guardian_links gl where gl.child_user_id=subject_user_id and gl.parent_user_id=(select auth.uid()) and gl.verified_at is not null)
 or private.is_global_admin()
);
create policy "waitlist_admin_manage" on public.program_waitlist
for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());

-- scholarships
create policy "scholarships_active_read" on public.scholarship_programs
for select to authenticated using (status='active' or private.is_global_admin());
create policy "scholarships_admin_manage" on public.scholarship_programs
for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());

create policy "awards_recipient_read" on public.scholarship_awards
for select to authenticated using (
 recipient_user_id=(select auth.uid())
 or exists(select 1 from public.guardian_links gl where gl.child_user_id=recipient_user_id and gl.parent_user_id=(select auth.uid()) and gl.verified_at is not null)
 or private.is_global_admin()
);
create policy "awards_admin_manage" on public.scholarship_awards
for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());

-- coach credential development
create policy "coach_credentials_self_read" on public.coach_credentials
for select to authenticated using (coach_user_id=(select auth.uid()) or private.is_global_admin());
create policy "coach_credentials_self_insert" on public.coach_credentials
for insert to authenticated with check (coach_user_id=(select auth.uid()) or private.is_global_admin());
create policy "coach_credentials_self_update" on public.coach_credentials
for update to authenticated using (coach_user_id=(select auth.uid()) or private.is_global_admin())
with check (coach_user_id=(select auth.uid()) or private.is_global_admin());

create policy "coach_dev_self_manage" on public.coach_development_records
for all to authenticated using (coach_user_id=(select auth.uid()) or private.is_global_admin())
with check (coach_user_id=(select auth.uid()) or private.is_global_admin());

-- searchable metadata
create policy "entity_tags_read" on public.entity_tags
for select to anon,authenticated using (true);
create policy "entity_tags_admin_write" on public.entity_tags
for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "platform_entity_tags_read" on public.platform_entity_tags
for select to anon,authenticated using (true);
create policy "platform_entity_tags_admin_write" on public.platform_entity_tags
for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "offer_tags_read" on public.offer_tags
for select to anon,authenticated using (true);
create policy "offer_tags_admin_write" on public.offer_tags
for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());

-- safety profiles
create policy "safety_profile_family_read" on public.participant_safety_profiles
for select to authenticated using (
 user_id=(select auth.uid())
 or exists(select 1 from public.guardian_links gl where gl.child_user_id=user_id and gl.parent_user_id=(select auth.uid()) and gl.verified_at is not null)
 or private.is_global_admin()
);
create policy "safety_profile_self_write" on public.participant_safety_profiles
for all to authenticated using (
 user_id=(select auth.uid())
 or exists(select 1 from public.guardian_links gl where gl.child_user_id=user_id and gl.parent_user_id=(select auth.uid()) and gl.verified_at is not null)
 or private.is_global_admin()
) with check (
 user_id=(select auth.uid())
 or exists(select 1 from public.guardian_links gl where gl.child_user_id=user_id and gl.parent_user_id=(select auth.uid()) and gl.verified_at is not null)
 or private.is_global_admin()
);

create policy "event_checkins_self_read" on public.event_checkins
for select to authenticated using (
 participant_user_id=(select auth.uid())
 or exists(select 1 from public.guardian_links gl where gl.child_user_id=participant_user_id and gl.parent_user_id=(select auth.uid()) and gl.verified_at is not null)
 or private.is_global_admin()
);
create policy "event_checkins_admin_manage" on public.event_checkins
for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());

-- feedback
create policy "program_feedback_self_read" on public.program_feedback
for select to authenticated using (user_id=(select auth.uid()) or private.is_global_admin());
create policy "program_feedback_self_insert" on public.program_feedback
for insert to authenticated with check (user_id=(select auth.uid()));
create policy "program_feedback_admin_read" on public.program_feedback
for select to authenticated using (private.is_global_admin());

-- management read models
create or replace view public.management_program_quality
with (security_invoker=true)
as
select
  e.id as event_id,
  e.event_code,
  e.title,
  count(f.id) as response_count,
  round(avg(f.overall_score)::numeric,2) as avg_overall,
  round(avg(f.development_value_score)::numeric,2) as avg_development_value,
  round(avg(f.safety_score)::numeric,2) as avg_safety,
  round(avg(f.communication_score)::numeric,2) as avg_communication
from public.events e
left join public.program_feedback f on f.event_id=e.id
group by e.id,e.event_code,e.title;

revoke all on public.management_program_quality from anon,authenticated;
grant select on public.management_program_quality to authenticated;

