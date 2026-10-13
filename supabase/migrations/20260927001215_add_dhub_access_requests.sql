
create table if not exists public.dhub_access_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  rba_email text not null,
  square_email text,
  square_invoice_no text,
  note text,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  reviewed_by uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.dhub_access_requests enable row level security;

drop policy if exists "dhub access request self read" on public.dhub_access_requests;
create policy "dhub access request self read"
on public.dhub_access_requests for select to authenticated
using (
  user_id=auth.uid()
  or exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin')
);

drop policy if exists "dhub access request self insert" on public.dhub_access_requests;
create policy "dhub access request self insert"
on public.dhub_access_requests for insert to authenticated
with check(user_id=auth.uid());

drop policy if exists "dhub access request admin update" on public.dhub_access_requests;
create policy "dhub access request admin update"
on public.dhub_access_requests for update to authenticated
using(exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin'))
with check(exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin'));

create index if not exists dhub_access_requests_status_idx on public.dhub_access_requests(status,created_at desc);

