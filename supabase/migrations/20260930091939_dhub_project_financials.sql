
create table if not exists public.dhub_project_financials (
  project_id uuid primary key references public.dhub_projects(id) on delete cascade,
  client_fee_jpy integer not null default 0 check (client_fee_jpy >= 0),
  member_compensation_jpy integer not null default 0 check (member_compensation_jpy >= 0),
  travel_budget_jpy integer not null default 0 check (travel_budget_jpy >= 0),
  other_direct_cost_jpy integer not null default 0 check (other_direct_cost_jpy >= 0),
  payment_status text not null default 'unbilled' check (payment_status in ('unbilled','invoiced','partially_paid','paid','refunded','cancelled')),
  invoice_reference text,
  internal_notes text not null default '',
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.dhub_project_financials enable row level security;

drop policy if exists "dhub project financials admin read" on public.dhub_project_financials;
create policy "dhub project financials admin read" on public.dhub_project_financials
for select to authenticated
using (private.is_global_admin());

drop policy if exists "dhub project financials admin insert" on public.dhub_project_financials;
create policy "dhub project financials admin insert" on public.dhub_project_financials
for insert to authenticated
with check (private.is_global_admin());

drop policy if exists "dhub project financials admin update" on public.dhub_project_financials;
create policy "dhub project financials admin update" on public.dhub_project_financials
for update to authenticated
using (private.is_global_admin())
with check (private.is_global_admin());

drop policy if exists "dhub project financials admin delete" on public.dhub_project_financials;
create policy "dhub project financials admin delete" on public.dhub_project_financials
for delete to authenticated
using (private.is_global_admin());

grant select,insert,update,delete on public.dhub_project_financials to authenticated;

comment on table public.dhub_project_financials is 'Admin-only D-HUB project economics. Never exposed to member project listings.';

