-- D-HUB partner organization access
-- Keeps partner seats separate from Square paid memberships while sharing the same COACH LAB access gate.

create table if not exists public.dhub_partner_organizations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  status text not null default 'active' check (status in ('active','paused','ended')),
  program_type text not null default 'coach_lab' check (program_type in ('coach_lab','players')),
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  seat_limit integer check (seat_limit is null or seat_limit > 0),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.dhub_partner_access (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  organization_id uuid not null references public.dhub_partner_organizations(id) on delete cascade,
  rba_email text not null,
  display_name text not null,
  role_title text not null,
  age_groups text[] not null default '{}',
  learning_goal text not null default '',
  status text not null default 'pending' check (status in ('pending','approved','rejected','revoked')),
  terms_accepted_at timestamptz not null default now(),
  reviewed_by uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, organization_id)
);

create index if not exists dhub_partner_access_user_status_idx
  on public.dhub_partner_access(user_id,status);

create index if not exists dhub_partner_access_org_status_idx
  on public.dhub_partner_access(organization_id,status,created_at desc);

alter table public.dhub_partner_organizations enable row level security;
alter table public.dhub_partner_access enable row level security;

drop policy if exists "dhub partner organizations public read" on public.dhub_partner_organizations;
create policy "dhub partner organizations public read"
on public.dhub_partner_organizations
for select
to anon, authenticated
using (status='active');

drop policy if exists "dhub partner organizations admin read" on public.dhub_partner_organizations;
create policy "dhub partner organizations admin read"
on public.dhub_partner_organizations
for select
to authenticated
using (
  exists (
    select 1 from public.profiles me
    where me.id=auth.uid() and me.role='admin'::public.rba_role
  )
);

drop policy if exists "dhub partner organizations admin update" on public.dhub_partner_organizations;
create policy "dhub partner organizations admin update"
on public.dhub_partner_organizations
for update
to authenticated
using (
  exists (
    select 1 from public.profiles me
    where me.id=auth.uid() and me.role='admin'::public.rba_role
  )
)
with check (
  exists (
    select 1 from public.profiles me
    where me.id=auth.uid() and me.role='admin'::public.rba_role
  )
);

drop policy if exists "dhub partner access self read" on public.dhub_partner_access;
create policy "dhub partner access self read"
on public.dhub_partner_access
for select
to authenticated
using (
  user_id=auth.uid()
  or exists (
    select 1 from public.profiles me
    where me.id=auth.uid() and me.role='admin'::public.rba_role
  )
);

drop policy if exists "dhub partner access self insert" on public.dhub_partner_access;
create policy "dhub partner access self insert"
on public.dhub_partner_access
for insert
to authenticated
with check (
  user_id=auth.uid()
  and status='pending'
  and reviewed_by is null
  and reviewed_at is null
  and revoked_at is null
);

drop policy if exists "dhub partner access self update pending" on public.dhub_partner_access;
create policy "dhub partner access self update pending"
on public.dhub_partner_access
for update
to authenticated
using (
  user_id=auth.uid()
  and status in ('pending','rejected')
)
with check (
  user_id=auth.uid()
  and status='pending'
  and reviewed_by is null
  and reviewed_at is null
  and revoked_at is null
);

drop policy if exists "dhub partner access admin update" on public.dhub_partner_access;
create policy "dhub partner access admin update"
on public.dhub_partner_access
for update
to authenticated
using (
  exists (
    select 1 from public.profiles me
    where me.id=auth.uid() and me.role='admin'::public.rba_role
  )
)
with check (
  exists (
    select 1 from public.profiles me
    where me.id=auth.uid() and me.role='admin'::public.rba_role
  )
);

create or replace function public.has_dhub_partner_access(p_program_type text default 'coach_lab')
returns boolean
language sql
stable
security definer
set search_path to 'public','auth'
as $$
  select exists (
    select 1
    from public.dhub_partner_access a
    join public.dhub_partner_organizations o on o.id=a.organization_id
    where a.user_id=auth.uid()
      and a.status='approved'
      and o.status='active'
      and o.program_type=p_program_type
      and o.starts_at<=now()
      and (o.ends_at is null or o.ends_at>=now())
  );
$$;

create or replace function public.has_dhub_program_access(p_program_type text)
returns boolean
language sql
stable
security definer
set search_path to 'public','auth'
as $$
  select
    exists (
      select 1
      from public.dhub_memberships d
      where d.program_type=p_program_type
        and d.status in ('active','grace')
        and (d.access_until is null or d.access_until>=now())
        and (
          d.linked_user_id=auth.uid()
          or lower(d.email_normalized)=lower(coalesce(auth.jwt()->>'email',''))
          or lower(coalesce(auth.jwt()->>'email',''))=any(d.alternate_emails)
        )
    )
    or public.has_dhub_partner_access(p_program_type);
$$;

grant select on public.dhub_partner_organizations to anon, authenticated;
grant select,insert,update on public.dhub_partner_access to authenticated;
grant execute on function public.has_dhub_partner_access(text) to authenticated;
grant execute on function public.has_dhub_program_access(text) to authenticated;

insert into public.dhub_partner_organizations(slug,name,program_type,status,notes)
values
  ('gream-sendai','Gream仙台','coach_lab','active','RBA DEVELOPMENT NETWORK / launch partner'),
  ('gream-okinawa','Gream沖縄','coach_lab','active','RBA DEVELOPMENT NETWORK / launch partner'),
  ('dsm','DSM','coach_lab','active','RBA DEVELOPMENT NETWORK / launch partner')
on conflict (slug) do update
set name=excluded.name,
    program_type=excluded.program_type,
    notes=excluded.notes,
    updated_at=now();
