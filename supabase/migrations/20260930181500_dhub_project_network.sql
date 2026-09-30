create table if not exists public.dhub_project_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  base_region text not null default '',
  travel_ok boolean not null default false,
  specialties text[] not null default '{}',
  age_groups text[] not null default '{}',
  credentials text[] not null default '{}',
  languages text[] not null default '{}',
  bio text not null default '',
  portfolio_url text,
  open_to_projects boolean not null default true,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.dhub_projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null default '',
  category text not null check (category in ('on_court','team_support','regional','international','performance','operations','other')),
  status text not null default 'draft' check (status in ('draft','open','matching','filled','completed','cancelled')),
  visibility text not null default 'members' check (visibility in ('members','direct')),
  region text not null default '',
  venue text,
  starts_at timestamptz,
  ends_at timestamptz,
  application_deadline timestamptz,
  roles_needed integer not null default 1 check (roles_needed > 0),
  target_age_groups text[] not null default '{}',
  required_experience text[] not null default '{}',
  required_credentials text[] not null default '{}',
  required_languages text[] not null default '{}',
  responsibilities text[] not null default '{}',
  compensation_type text not null default 'paid' check (compensation_type in ('paid','expenses_only','volunteer')),
  compensation_jpy_min integer,
  compensation_jpy_max integer,
  expense_terms text not null default '',
  cancellation_terms text not null default '',
  safeguarding_notes text not null default '',
  contact_notes text not null default '',
  created_by uuid references auth.users(id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (compensation_jpy_min is null or compensation_jpy_min >= 0),
  check (compensation_jpy_max is null or compensation_jpy_max >= 0),
  check (compensation_jpy_min is null or compensation_jpy_max is null or compensation_jpy_max >= compensation_jpy_min),
  check (ends_at is null or starts_at is null or ends_at >= starts_at)
);

create table if not exists public.dhub_project_applications (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.dhub_projects(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  proposed_role text not null default '',
  motivation text not null default '',
  availability_note text not null default '',
  member_note text not null default '',
  admin_note text not null default '',
  status text not null default 'submitted' check (status in ('submitted','reviewing','shortlisted','selected','not_selected','withdrawn','completed')),
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(project_id,user_id)
);

create index if not exists dhub_projects_status_deadline_idx on public.dhub_projects(status, application_deadline);
create index if not exists dhub_projects_category_region_idx on public.dhub_projects(category, region);
create index if not exists dhub_project_applications_project_status_idx on public.dhub_project_applications(project_id,status);
create index if not exists dhub_project_applications_user_idx on public.dhub_project_applications(user_id,submitted_at desc);

alter table public.dhub_project_profiles enable row level security;
alter table public.dhub_projects enable row level security;
alter table public.dhub_project_applications enable row level security;

drop policy if exists "dhub project profiles own read" on public.dhub_project_profiles;
create policy "dhub project profiles own read" on public.dhub_project_profiles
for select to authenticated
using (user_id = auth.uid() or private.is_global_admin());

drop policy if exists "dhub project profiles own insert" on public.dhub_project_profiles;
create policy "dhub project profiles own insert" on public.dhub_project_profiles
for insert to authenticated
with check (user_id = auth.uid() and public.has_dhub_coach_access());

drop policy if exists "dhub project profiles own update" on public.dhub_project_profiles;
create policy "dhub project profiles own update" on public.dhub_project_profiles
for update to authenticated
using (user_id = auth.uid() or private.is_global_admin())
with check (user_id = auth.uid() or private.is_global_admin());

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
        and exists (
          select 1 from public.dhub_project_applications a
          where a.project_id=dhub_projects.id and a.user_id=auth.uid()
        )
      )
    )
  )
);

drop policy if exists "dhub projects admin insert" on public.dhub_projects;
create policy "dhub projects admin insert" on public.dhub_projects
for insert to authenticated
with check (private.is_global_admin());

drop policy if exists "dhub projects admin update" on public.dhub_projects;
create policy "dhub projects admin update" on public.dhub_projects
for update to authenticated
using (private.is_global_admin())
with check (private.is_global_admin());

drop policy if exists "dhub projects admin delete" on public.dhub_projects;
create policy "dhub projects admin delete" on public.dhub_projects
for delete to authenticated
using (private.is_global_admin());

drop policy if exists "dhub project applications own read" on public.dhub_project_applications;
create policy "dhub project applications own read" on public.dhub_project_applications
for select to authenticated
using (user_id=auth.uid() or private.is_global_admin());

drop policy if exists "dhub project applications own insert" on public.dhub_project_applications;
create policy "dhub project applications own insert" on public.dhub_project_applications
for insert to authenticated
with check (
  user_id=auth.uid()
  and public.has_dhub_coach_access()
  and exists (
    select 1 from public.dhub_projects p
    where p.id=project_id
      and p.status='open'
      and (p.application_deadline is null or p.application_deadline > now())
  )
);

drop policy if exists "dhub project applications own update" on public.dhub_project_applications;
create policy "dhub project applications own update" on public.dhub_project_applications
for update to authenticated
using (user_id=auth.uid() or private.is_global_admin())
with check (user_id=auth.uid() or private.is_global_admin());

drop policy if exists "dhub project applications admin delete" on public.dhub_project_applications;
create policy "dhub project applications admin delete" on public.dhub_project_applications
for delete to authenticated
using (private.is_global_admin());

grant select, insert, update on public.dhub_project_profiles to authenticated;
grant select, insert, update, delete on public.dhub_projects to authenticated;
grant select, insert, update, delete on public.dhub_project_applications to authenticated;

create or replace function public.is_dhub_project_admin()
returns boolean
language sql
stable
security definer
set search_path=''
as $$
  select private.is_global_admin();
$$;
revoke all on function public.is_dhub_project_admin() from public, anon;
grant execute on function public.is_dhub_project_admin() to authenticated, service_role;

create or replace function public.dhub_apply_to_project(
  p_project_id uuid,
  p_proposed_role text,
  p_motivation text,
  p_availability_note text,
  p_member_note text default ''
)
returns uuid
language plpgsql
security invoker
set search_path='public','auth'
as $$
declare
  application_id uuid;
begin
  if auth.uid() is null or not public.has_dhub_coach_access() then
    raise exception 'D-HUB COACH LAB access required';
  end if;
  if not exists (
    select 1 from public.dhub_projects p
    where p.id=p_project_id
      and p.status='open'
      and (p.application_deadline is null or p.application_deadline > now())
  ) then
    raise exception 'project is not open';
  end if;

  insert into public.dhub_project_applications(project_id,user_id,proposed_role,motivation,availability_note,member_note)
  values(p_project_id,auth.uid(),left(trim(coalesce(p_proposed_role,'')),200),left(trim(coalesce(p_motivation,'')),4000),left(trim(coalesce(p_availability_note,'')),2000),left(trim(coalesce(p_member_note,'')),2000))
  on conflict(project_id,user_id)
  do update set
    proposed_role=excluded.proposed_role,
    motivation=excluded.motivation,
    availability_note=excluded.availability_note,
    member_note=excluded.member_note,
    status=case when public.dhub_project_applications.status='withdrawn' then 'submitted' else public.dhub_project_applications.status end,
    updated_at=now()
  returning id into application_id;

  return application_id;
end;
$$;
revoke all on function public.dhub_apply_to_project(uuid,text,text,text,text) from public, anon;
grant execute on function public.dhub_apply_to_project(uuid,text,text,text,text) to authenticated, service_role;

create or replace function public.dhub_withdraw_project_application(p_project_id uuid)
returns boolean
language plpgsql
security invoker
set search_path='public','auth'
as $$
begin
  update public.dhub_project_applications
  set status='withdrawn', updated_at=now()
  where project_id=p_project_id and user_id=auth.uid() and status in ('submitted','reviewing','shortlisted');
  return found;
end;
$$;
revoke all on function public.dhub_withdraw_project_application(uuid) from public, anon;
grant execute on function public.dhub_withdraw_project_application(uuid) to authenticated, service_role;

comment on table public.dhub_projects is 'D-HUB COACH LAB project board. Membership never guarantees assignment or income.';
comment on table public.dhub_project_applications is 'Member applications to D-HUB projects. Terms and selection remain project-specific.';
comment on table public.dhub_project_profiles is 'Private coach project profile used only for matching; not a public directory or certification.';
