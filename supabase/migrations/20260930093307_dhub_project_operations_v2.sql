
create table if not exists public.dhub_client_requests (
  id uuid primary key default gen_random_uuid(),
  source text not null default 'jotform',
  source_submission_id text,
  organization_name text not null default '',
  contact_name text not null default '',
  email text not null default '',
  phone text not null default '',
  request_type text not null default 'other',
  age_groups text[] not null default '{}',
  region_venue text not null default '',
  preferred_schedule text not null default '',
  participant_count integer,
  objective text not null default '',
  roles_requested text not null default '',
  budget_range text not null default '',
  transport_support text not null default '',
  accommodation_support text not null default '',
  required_qualifications text not null default '',
  safeguarding_notes text not null default '',
  other_notes text not null default '',
  status text not null default 'new' check (status in ('new','reviewing','qualified','proposal','converted','declined','archived')),
  raw_payload jsonb not null default '{}'::jsonb,
  converted_project_id uuid references public.dhub_projects(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(source, source_submission_id)
);

alter table public.dhub_projects
  add column if not exists client_request_id uuid references public.dhub_client_requests(id) on delete set null;

create table if not exists public.dhub_project_invites (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.dhub_projects(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role_title text not null default '',
  message text not null default '',
  status text not null default 'pending' check (status in ('pending','accepted','declined','expired','cancelled')),
  invited_by uuid references auth.users(id) on delete set null,
  expires_at timestamptz,
  responded_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(project_id,user_id)
);

create table if not exists public.dhub_project_assignments (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.dhub_projects(id) on delete cascade,
  application_id uuid references public.dhub_project_applications(id) on delete set null,
  user_id uuid not null references auth.users(id) on delete cascade,
  role_title text not null,
  scope_of_work text not null default '',
  compensation_jpy integer not null default 0 check (compensation_jpy >= 0),
  expense_terms text not null default '',
  expected_hours numeric(6,2),
  payment_due_at timestamptz,
  cancellation_terms text not null default '',
  terms_status text not null default 'draft' check (terms_status in ('draft','offered','accepted','declined','ready','active','completed','cancelled')),
  offered_at timestamptz,
  responded_at timestamptz,
  accepted_at timestamptz,
  ready_at timestamptz,
  completed_at timestamptz,
  terms_snapshot jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(project_id,user_id,role_title)
);

create table if not exists public.dhub_project_safety_checks (
  assignment_id uuid primary key references public.dhub_project_assignments(id) on delete cascade,
  minors_involved boolean not null default true,
  identity_verified boolean not null default false,
  credentials_verified boolean not null default false,
  supervision_confirmed boolean not null default false,
  emergency_process_confirmed boolean not null default false,
  media_policy_confirmed boolean not null default false,
  transport_responsibility_confirmed boolean not null default false,
  overnight_responsibility_confirmed boolean not null default false,
  medical_escalation_confirmed boolean not null default false,
  communication_boundaries_confirmed boolean not null default false,
  notes text not null default '',
  checked_by uuid references auth.users(id) on delete set null,
  checked_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.dhub_project_member_reports (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null unique references public.dhub_project_assignments(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  actual_hours numeric(6,2),
  delivery_summary text not null default '',
  reflection text not null default '',
  issues text not null default '',
  next_step text not null default '',
  submitted_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.dhub_project_closeouts (
  project_id uuid primary key references public.dhub_projects(id) on delete cascade,
  participant_count integer,
  client_confirmed boolean not null default false,
  client_feedback text not null default '',
  incident_count integer not null default 0 check (incident_count >= 0),
  safeguarding_incident boolean not null default false,
  delivery_summary text not null default '',
  next_opportunity text not null default '',
  completed_by uuid references auth.users(id) on delete set null,
  completed_at timestamptz,
  updated_at timestamptz not null default now()
);

create index if not exists dhub_client_requests_status_created_idx on public.dhub_client_requests(status,created_at desc);
create index if not exists dhub_project_invites_user_status_idx on public.dhub_project_invites(user_id,status,created_at desc);
create index if not exists dhub_project_assignments_user_status_idx on public.dhub_project_assignments(user_id,terms_status,created_at desc);
create index if not exists dhub_project_assignments_project_idx on public.dhub_project_assignments(project_id);
create index if not exists dhub_project_member_reports_user_idx on public.dhub_project_member_reports(user_id,updated_at desc);

alter table public.dhub_client_requests enable row level security;
alter table public.dhub_project_invites enable row level security;
alter table public.dhub_project_assignments enable row level security;
alter table public.dhub_project_safety_checks enable row level security;
alter table public.dhub_project_member_reports enable row level security;
alter table public.dhub_project_closeouts enable row level security;

create policy "dhub client requests admin read" on public.dhub_client_requests
for select to authenticated using (private.is_global_admin());
create policy "dhub client requests admin insert" on public.dhub_client_requests
for insert to authenticated with check (private.is_global_admin());
create policy "dhub client requests admin update" on public.dhub_client_requests
for update to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "dhub client requests admin delete" on public.dhub_client_requests
for delete to authenticated using (private.is_global_admin());

create policy "dhub project invites own read" on public.dhub_project_invites
for select to authenticated using (user_id=auth.uid() or private.is_global_admin());

create policy "dhub project assignments own read" on public.dhub_project_assignments
for select to authenticated using (user_id=auth.uid() or private.is_global_admin());

create policy "dhub project safety admin read" on public.dhub_project_safety_checks
for select to authenticated using (private.is_global_admin());

create policy "dhub project reports own read" on public.dhub_project_member_reports
for select to authenticated using (user_id=auth.uid() or private.is_global_admin());
create policy "dhub project reports own insert" on public.dhub_project_member_reports
for insert to authenticated with check (
  user_id=auth.uid()
  and exists (
    select 1 from public.dhub_project_assignments a
    where a.id=assignment_id and a.user_id=auth.uid() and a.terms_status in ('ready','active','completed')
  )
);
create policy "dhub project reports own update" on public.dhub_project_member_reports
for update to authenticated
using (user_id=auth.uid())
with check (user_id=auth.uid());

create policy "dhub project closeouts admin read" on public.dhub_project_closeouts
for select to authenticated using (private.is_global_admin());

grant select,insert,update,delete on public.dhub_client_requests to authenticated;
grant select on public.dhub_project_invites to authenticated;
grant select on public.dhub_project_assignments to authenticated;
grant select on public.dhub_project_safety_checks to authenticated;
grant select,insert,update on public.dhub_project_member_reports to authenticated;
grant select on public.dhub_project_closeouts to authenticated;

-- Allow directly invited members to inspect a direct-visibility project before responding.
drop policy if exists "dhub projects member read" on public.dhub_projects;
create policy "dhub projects member read" on public.dhub_projects
for select to authenticated
using (
  private.is_global_admin()
  or (
    public.has_dhub_coach_access()
    and (
      (visibility='members' and status in ('open','matching','filled','completed'))
      or (
        visibility='direct'
        and (
          exists (
            select 1 from public.dhub_project_applications a
            where a.project_id=dhub_projects.id and a.user_id=auth.uid()
          )
          or exists (
            select 1 from public.dhub_project_invites i
            where i.project_id=dhub_projects.id
              and i.user_id=auth.uid()
              and i.status='pending'
              and (i.expires_at is null or i.expires_at > now())
          )
        )
      )
    )
  )
);

create or replace function public.dhub_admin_convert_client_request(
  p_request_id uuid,
  p_slug text,
  p_title text
)
returns uuid
language plpgsql
security definer
set search_path=''
as $$
declare
  r public.dhub_client_requests%rowtype;
  new_project_id uuid;
  mapped_category text;
begin
  if auth.uid() is null or not private.is_global_admin() then
    raise exception 'admin access required';
  end if;

  select * into r from public.dhub_client_requests where id=p_request_id for update;
  if r.id is null then raise exception 'request not found'; end if;
  if r.converted_project_id is not null then return r.converted_project_id; end if;

  mapped_category := case r.request_type
    when 'on_court' then 'on_court'
    when 'team_support' then 'team_support'
    when 'regional' then 'regional'
    when 'international' then 'international'
    when 'performance' then 'performance'
    when 'operations' then 'operations'
    else 'other'
  end;

  insert into public.dhub_projects(
    slug,title,summary,category,status,visibility,region,roles_needed,
    target_age_groups,compensation_type,contact_notes,client_request_id,created_by
  )
  values(
    lower(trim(p_slug)),
    left(trim(p_title),160),
    left(coalesce(nullif(trim(r.objective),''),nullif(trim(r.roles_requested),''),'Client request'),1500),
    mapped_category,
    'draft',
    'members',
    left(trim(r.region_venue),120),
    1,
    r.age_groups,
    'paid',
    left(
      concat_ws(E'\n',
        nullif('Organization: '||r.organization_name,'Organization: '),
        nullif('Contact: '||r.contact_name,'Contact: '),
        nullif('Budget: '||r.budget_range,'Budget: '),
        nullif('Requested roles: '||r.roles_requested,'Requested roles: ')
      ),2000
    ),
    r.id,
    auth.uid()
  )
  returning id into new_project_id;

  update public.dhub_client_requests
  set status='converted',converted_project_id=new_project_id,updated_at=now()
  where id=r.id;

  return new_project_id;
end;
$$;

revoke all on function public.dhub_admin_convert_client_request(uuid,text,text) from public,anon;
grant execute on function public.dhub_admin_convert_client_request(uuid,text,text) to authenticated,service_role;

create or replace function public.dhub_admin_invite_member(
  p_project_id uuid,
  p_user_id uuid,
  p_role_title text,
  p_message text default '',
  p_expires_at timestamptz default null
)
returns uuid
language plpgsql
security definer
set search_path=''
as $$
declare invite_id uuid;
begin
  if auth.uid() is null or not private.is_global_admin() then raise exception 'admin access required'; end if;
  if not exists (select 1 from public.dhub_projects p where p.id=p_project_id and p.visibility='direct') then
    raise exception 'direct project required';
  end if;
  if not public.has_dhub_program_access_for_user(p_user_id,'coach_lab') then
    raise exception 'target user does not have D-HUB COACH LAB access';
  end if;

  insert into public.dhub_project_invites(project_id,user_id,role_title,message,invited_by,expires_at)
  values(p_project_id,p_user_id,left(trim(p_role_title),200),left(trim(coalesce(p_message,'')),2000),auth.uid(),p_expires_at)
  on conflict(project_id,user_id)
  do update set role_title=excluded.role_title,message=excluded.message,status='pending',invited_by=auth.uid(),expires_at=excluded.expires_at,responded_at=null,updated_at=now()
  returning id into invite_id;

  return invite_id;
end;
$$;

-- Helper because has_dhub_program_access() is caller-scoped.
create or replace function public.has_dhub_program_access_for_user(p_user_id uuid,p_program_type text)
returns boolean
language sql
stable
security definer
set search_path=''
as $$
  select exists (
    select 1 from public.dhub_memberships m
    where m.linked_user_id=p_user_id
      and m.program_type=p_program_type
      and m.status in ('active','grace')
      and (m.access_until is null or m.access_until > now())
  );
$$;
revoke all on function public.has_dhub_program_access_for_user(uuid,text) from public,anon;
grant execute on function public.has_dhub_program_access_for_user(uuid,text) to authenticated,service_role;

-- Recreate admin invite after helper exists.
create or replace function public.dhub_admin_invite_member(
  p_project_id uuid,
  p_user_id uuid,
  p_role_title text,
  p_message text default '',
  p_expires_at timestamptz default null
)
returns uuid
language plpgsql
security definer
set search_path=''
as $$
declare invite_id uuid;
begin
  if auth.uid() is null or not private.is_global_admin() then raise exception 'admin access required'; end if;
  if not exists (select 1 from public.dhub_projects p where p.id=p_project_id and p.visibility='direct') then
    raise exception 'direct project required';
  end if;
  if not public.has_dhub_program_access_for_user(p_user_id,'coach_lab') then
    raise exception 'target user does not have D-HUB COACH LAB access';
  end if;

  insert into public.dhub_project_invites(project_id,user_id,role_title,message,invited_by,expires_at)
  values(p_project_id,p_user_id,left(trim(p_role_title),200),left(trim(coalesce(p_message,'')),2000),auth.uid(),p_expires_at)
  on conflict(project_id,user_id)
  do update set role_title=excluded.role_title,message=excluded.message,status='pending',invited_by=auth.uid(),expires_at=excluded.expires_at,responded_at=null,updated_at=now()
  returning id into invite_id;

  insert into public.platform_notifications(user_id,notification_type,title,body,action_url,dedupe_key)
  select p_user_id,'dhub_project','D-HUB PROJECT｜個別相談',
         p.title||'について、RBAから個別に参加・担当相談があります。',
         '/ja/d-hub/coaches/member/projects',
         'dhub-project-invite:'||invite_id::text||':pending'
  from public.dhub_projects p where p.id=p_project_id
  on conflict(dedupe_key) where dedupe_key is not null do nothing;

  return invite_id;
end;
$$;
revoke all on function public.dhub_admin_invite_member(uuid,uuid,text,text,timestamptz) from public,anon;
grant execute on function public.dhub_admin_invite_member(uuid,uuid,text,text,timestamptz) to authenticated,service_role;

create or replace function public.dhub_respond_project_invite(p_invite_id uuid,p_response text)
returns boolean
language plpgsql
security definer
set search_path=''
as $$
declare i public.dhub_project_invites%rowtype;
begin
  if auth.uid() is null then raise exception 'authentication required'; end if;
  if p_response not in ('accepted','declined') then raise exception 'invalid response'; end if;

  select * into i from public.dhub_project_invites
  where id=p_invite_id and user_id=auth.uid() and status='pending'
    and (expires_at is null or expires_at > now())
  for update;
  if i.id is null then raise exception 'invite not available'; end if;

  update public.dhub_project_invites
  set status=p_response,responded_at=now(),updated_at=now()
  where id=i.id;

  if p_response='accepted' then
    insert into public.dhub_project_applications(project_id,user_id,proposed_role,motivation,status)
    values(i.project_id,i.user_id,i.role_title,'RBAからの個別相談を受諾','shortlisted')
    on conflict(project_id,user_id)
    do update set proposed_role=excluded.proposed_role,status='shortlisted',updated_at=now();
  end if;

  return true;
end;
$$;
revoke all on function public.dhub_respond_project_invite(uuid,text) from public,anon;
grant execute on function public.dhub_respond_project_invite(uuid,text) to authenticated,service_role;

create or replace function public.dhub_admin_offer_assignment(
  p_project_id uuid,
  p_user_id uuid,
  p_application_id uuid,
  p_role_title text,
  p_scope_of_work text,
  p_compensation_jpy integer,
  p_expense_terms text,
  p_expected_hours numeric,
  p_payment_due_at timestamptz,
  p_cancellation_terms text
)
returns uuid
language plpgsql
security definer
set search_path=''
as $$
declare assignment_id uuid;
begin
  if auth.uid() is null or not private.is_global_admin() then raise exception 'admin access required'; end if;
  if p_compensation_jpy < 0 then raise exception 'invalid compensation'; end if;
  if p_application_id is not null and not exists (
    select 1 from public.dhub_project_applications a
    where a.id=p_application_id and a.project_id=p_project_id and a.user_id=p_user_id
      and a.status in ('shortlisted','selected')
  ) then raise exception 'application does not match assignment'; end if;

  insert into public.dhub_project_assignments(
    project_id,application_id,user_id,role_title,scope_of_work,compensation_jpy,expense_terms,
    expected_hours,payment_due_at,cancellation_terms,terms_status,offered_at,terms_snapshot,created_by
  )
  values(
    p_project_id,p_application_id,p_user_id,left(trim(p_role_title),200),left(trim(p_scope_of_work),5000),
    p_compensation_jpy,left(trim(coalesce(p_expense_terms,'')),2000),p_expected_hours,p_payment_due_at,
    left(trim(coalesce(p_cancellation_terms,'')),2000),'offered',now(),
    jsonb_build_object(
      'role_title',left(trim(p_role_title),200),
      'scope_of_work',left(trim(p_scope_of_work),5000),
      'compensation_jpy',p_compensation_jpy,
      'expense_terms',left(trim(coalesce(p_expense_terms,'')),2000),
      'expected_hours',p_expected_hours,
      'payment_due_at',p_payment_due_at,
      'cancellation_terms',left(trim(coalesce(p_cancellation_terms,'')),2000),
      'offered_at',now()
    ),
    auth.uid()
  )
  on conflict(project_id,user_id,role_title)
  do update set
    application_id=excluded.application_id,scope_of_work=excluded.scope_of_work,
    compensation_jpy=excluded.compensation_jpy,expense_terms=excluded.expense_terms,
    expected_hours=excluded.expected_hours,payment_due_at=excluded.payment_due_at,
    cancellation_terms=excluded.cancellation_terms,terms_status='offered',offered_at=now(),
    responded_at=null,accepted_at=null,ready_at=null,terms_snapshot=excluded.terms_snapshot,
    updated_at=now()
  returning id into assignment_id;

  insert into public.dhub_project_safety_checks(assignment_id)
  values(assignment_id)
  on conflict(assignment_id) do nothing;

  insert into public.platform_notifications(user_id,notification_type,title,body,action_url,dedupe_key)
  select p_user_id,'dhub_project',p.title||'｜担当条件の確認',
         '役割・報酬・実費・キャンセル条件を確認し、受諾または辞退してください。',
         '/ja/d-hub/coaches/member/projects',
         'dhub-assignment:'||assignment_id::text||':offered'
  from public.dhub_projects p where p.id=p_project_id
  on conflict(dedupe_key) where dedupe_key is not null do nothing;

  return assignment_id;
end;
$$;
revoke all on function public.dhub_admin_offer_assignment(uuid,uuid,uuid,text,text,integer,text,numeric,timestamptz,text) from public,anon;
grant execute on function public.dhub_admin_offer_assignment(uuid,uuid,uuid,text,text,integer,text,numeric,timestamptz,text) to authenticated,service_role;

create or replace function public.dhub_respond_assignment(p_assignment_id uuid,p_response text)
returns boolean
language plpgsql
security definer
set search_path=''
as $$
begin
  if auth.uid() is null then raise exception 'authentication required'; end if;
  if p_response not in ('accepted','declined') then raise exception 'invalid response'; end if;

  update public.dhub_project_assignments
  set terms_status=p_response,
      responded_at=now(),
      accepted_at=case when p_response='accepted' then now() else null end,
      updated_at=now()
  where id=p_assignment_id and user_id=auth.uid() and terms_status='offered';

  if not found then raise exception 'assignment offer not available'; end if;
  return true;
end;
$$;
revoke all on function public.dhub_respond_assignment(uuid,text) from public,anon;
grant execute on function public.dhub_respond_assignment(uuid,text) to authenticated,service_role;

create or replace function public.dhub_admin_update_safety_check(
  p_assignment_id uuid,
  p_minors_involved boolean,
  p_identity_verified boolean,
  p_credentials_verified boolean,
  p_supervision_confirmed boolean,
  p_emergency_process_confirmed boolean,
  p_media_policy_confirmed boolean,
  p_transport_responsibility_confirmed boolean,
  p_overnight_responsibility_confirmed boolean,
  p_medical_escalation_confirmed boolean,
  p_communication_boundaries_confirmed boolean,
  p_notes text default ''
)
returns boolean
language plpgsql
security definer
set search_path=''
as $$
begin
  if auth.uid() is null or not private.is_global_admin() then raise exception 'admin access required'; end if;

  insert into public.dhub_project_safety_checks(
    assignment_id,minors_involved,identity_verified,credentials_verified,supervision_confirmed,
    emergency_process_confirmed,media_policy_confirmed,transport_responsibility_confirmed,
    overnight_responsibility_confirmed,medical_escalation_confirmed,communication_boundaries_confirmed,
    notes,checked_by,checked_at,updated_at
  )
  values(
    p_assignment_id,p_minors_involved,p_identity_verified,p_credentials_verified,p_supervision_confirmed,
    p_emergency_process_confirmed,p_media_policy_confirmed,p_transport_responsibility_confirmed,
    p_overnight_responsibility_confirmed,p_medical_escalation_confirmed,p_communication_boundaries_confirmed,
    left(trim(coalesce(p_notes,'')),4000),auth.uid(),now(),now()
  )
  on conflict(assignment_id)
  do update set
    minors_involved=excluded.minors_involved,identity_verified=excluded.identity_verified,
    credentials_verified=excluded.credentials_verified,supervision_confirmed=excluded.supervision_confirmed,
    emergency_process_confirmed=excluded.emergency_process_confirmed,media_policy_confirmed=excluded.media_policy_confirmed,
    transport_responsibility_confirmed=excluded.transport_responsibility_confirmed,
    overnight_responsibility_confirmed=excluded.overnight_responsibility_confirmed,
    medical_escalation_confirmed=excluded.medical_escalation_confirmed,
    communication_boundaries_confirmed=excluded.communication_boundaries_confirmed,
    notes=excluded.notes,checked_by=auth.uid(),checked_at=now(),updated_at=now();

  return true;
end;
$$;
revoke all on function public.dhub_admin_update_safety_check(uuid,boolean,boolean,boolean,boolean,boolean,boolean,boolean,boolean,boolean,boolean,text) from public,anon;
grant execute on function public.dhub_admin_update_safety_check(uuid,boolean,boolean,boolean,boolean,boolean,boolean,boolean,boolean,boolean,boolean,text) to authenticated,service_role;

create or replace function public.dhub_admin_mark_assignment_ready(p_assignment_id uuid)
returns boolean
language plpgsql
security definer
set search_path=''
as $$
declare a public.dhub_project_assignments%rowtype;
declare s public.dhub_project_safety_checks%rowtype;
begin
  if auth.uid() is null or not private.is_global_admin() then raise exception 'admin access required'; end if;
  select * into a from public.dhub_project_assignments where id=p_assignment_id for update;
  if a.id is null then raise exception 'assignment not found'; end if;
  if a.terms_status<>'accepted' then raise exception 'member must accept assignment terms first'; end if;

  select * into s from public.dhub_project_safety_checks where assignment_id=a.id;
  if s.assignment_id is null then raise exception 'safety check missing'; end if;

  if s.minors_involved and not (
    s.identity_verified and s.credentials_verified and s.supervision_confirmed
    and s.emergency_process_confirmed and s.media_policy_confirmed
    and s.transport_responsibility_confirmed and s.overnight_responsibility_confirmed
    and s.medical_escalation_confirmed and s.communication_boundaries_confirmed
  ) then raise exception 'safeguarding checklist is incomplete'; end if;

  update public.dhub_project_assignments
  set terms_status='ready',ready_at=now(),updated_at=now()
  where id=a.id;

  if a.application_id is not null then
    update public.dhub_project_applications
    set status='selected',updated_at=now()
    where id=a.application_id and status in ('shortlisted','reviewing','submitted');
  end if;

  return true;
end;
$$;
revoke all on function public.dhub_admin_mark_assignment_ready(uuid) from public,anon;
grant execute on function public.dhub_admin_mark_assignment_ready(uuid) to authenticated,service_role;

create or replace function public.dhub_submit_member_project_report(
  p_assignment_id uuid,
  p_actual_hours numeric,
  p_delivery_summary text,
  p_reflection text,
  p_issues text,
  p_next_step text
)
returns uuid
language plpgsql
security definer
set search_path=''
as $$
declare report_id uuid;
begin
  if auth.uid() is null then raise exception 'authentication required'; end if;
  if not exists (
    select 1 from public.dhub_project_assignments a
    where a.id=p_assignment_id and a.user_id=auth.uid() and a.terms_status in ('ready','active','completed')
  ) then raise exception 'assignment not available for report'; end if;

  insert into public.dhub_project_member_reports(
    assignment_id,user_id,actual_hours,delivery_summary,reflection,issues,next_step,submitted_at
  )
  values(
    p_assignment_id,auth.uid(),p_actual_hours,left(trim(coalesce(p_delivery_summary,'')),5000),
    left(trim(coalesce(p_reflection,'')),5000),left(trim(coalesce(p_issues,'')),5000),
    left(trim(coalesce(p_next_step,'')),3000),now()
  )
  on conflict(assignment_id)
  do update set actual_hours=excluded.actual_hours,delivery_summary=excluded.delivery_summary,
    reflection=excluded.reflection,issues=excluded.issues,next_step=excluded.next_step,
    submitted_at=now(),updated_at=now()
  returning id into report_id;

  return report_id;
end;
$$;
revoke all on function public.dhub_submit_member_project_report(uuid,numeric,text,text,text,text) from public,anon;
grant execute on function public.dhub_submit_member_project_report(uuid,numeric,text,text,text,text) to authenticated,service_role;

-- New application and intake alerts for RBA admins.
create or replace function public.notify_admins_dhub_project_application()
returns trigger
language plpgsql
security definer
set search_path=''
as $$
begin
  insert into public.platform_notifications(user_id,notification_type,title,body,action_url,dedupe_key)
  select p.id,'dhub_project_admin','D-HUB PROJECT｜新規応募',
         coalesce(pr.title,'案件')||'に新しい応募が入りました。',
         '/ja/d-hub/coaches/member/projects/admin',
         'dhub-project-admin-application:'||new.id::text
  from public.profiles p
  left join public.dhub_projects pr on pr.id=new.project_id
  where p.role='admin'::public.rba_role
  on conflict(dedupe_key) where dedupe_key is not null do nothing;
  return new;
end;
$$;

drop trigger if exists dhub_project_application_admin_notify on public.dhub_project_applications;
create trigger dhub_project_application_admin_notify
after insert on public.dhub_project_applications
for each row execute function public.notify_admins_dhub_project_application();

create or replace function public.notify_admins_dhub_client_request()
returns trigger
language plpgsql
security definer
set search_path=''
as $$
begin
  insert into public.platform_notifications(user_id,notification_type,title,body,action_url,dedupe_key)
  select p.id,'dhub_project_admin','D-HUB PROJECT REQUEST｜新規依頼',
         coalesce(nullif(new.organization_name,''),'新規依頼')||'から案件相談が届きました。',
         '/ja/d-hub/coaches/member/projects/admin',
         'dhub-project-admin-request:'||new.id::text
  from public.profiles p
  where p.role='admin'::public.rba_role
  on conflict(dedupe_key) where dedupe_key is not null do nothing;
  return new;
end;
$$;

drop trigger if exists dhub_client_request_admin_notify on public.dhub_client_requests;
create trigger dhub_client_request_admin_notify
after insert on public.dhub_client_requests
for each row execute function public.notify_admins_dhub_client_request();

comment on table public.dhub_client_requests is 'Admin-only client demand pipeline. May include PII from project request forms.';
comment on table public.dhub_project_assignments is 'Formal member assignment terms. Offer acceptance and safeguarding gate precede READY.';
comment on table public.dhub_project_safety_checks is 'Admin-only safeguarding readiness checklist for a D-HUB assignment.';
comment on table public.dhub_project_member_reports is 'Member delivery report and reflection after a D-HUB project.';
comment on table public.dhub_project_closeouts is 'Admin closeout and impact record for completed D-HUB projects.';

