
create table if not exists public.dhub_memberships (
  id uuid primary key default gen_random_uuid(),
  member_name text,
  email_normalized text not null unique,
  alternate_emails text[] not null default '{}'::text[],
  linked_user_id uuid null references public.profiles(id) on delete set null,
  provider text not null default 'square' check (provider in ('square','manual')),
  plan_key text not null default 'dhub_coach_lab_monthly',
  status text not null default 'active' check (status in ('active','grace','inactive','cancelled')),
  amount_jpy integer not null default 3300 check (amount_jpy >= 0),
  last_payment_at timestamptz,
  access_until timestamptz,
  source_reference text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.dhub_memberships enable row level security;

drop policy if exists "dhub member self read" on public.dhub_memberships;
create policy "dhub member self read"
on public.dhub_memberships
for select
to authenticated
using (
  linked_user_id = auth.uid()
  or lower(email_normalized) = lower(coalesce(auth.jwt()->>'email',''))
  or lower(coalesce(auth.jwt()->>'email','')) = any(alternate_emails)
  or exists (
    select 1 from public.profiles me
    where me.id=auth.uid() and me.role='admin'
  )
);

create or replace function public.has_dhub_access()
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select exists (
    select 1
    from public.dhub_memberships d
    where d.status in ('active','grace')
      and (d.access_until is null or d.access_until >= now())
      and (
        d.linked_user_id = auth.uid()
        or lower(d.email_normalized) = lower(coalesce(auth.jwt()->>'email',''))
        or lower(coalesce(auth.jwt()->>'email','')) = any(d.alternate_emails)
      )
  );
$$;

revoke all on function public.has_dhub_access() from public;
grant execute on function public.has_dhub_access() to authenticated;

create index if not exists dhub_memberships_linked_user_id_idx
  on public.dhub_memberships(linked_user_id);
create index if not exists dhub_memberships_access_until_idx
  on public.dhub_memberships(access_until);

