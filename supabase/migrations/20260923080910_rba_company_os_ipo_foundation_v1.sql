
-- RBA Company OS / IPO-readiness operating layer v1
create table if not exists public.business_units (
  id uuid primary key default gen_random_uuid(),
  code text not null unique check (code ~ '^[A-Z0-9_]{2,32}$'),
  name text not null,
  description text,
  status text not null default 'active' check (status in ('active','paused','retired')),
  display_order integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.business_units (code,name,description,display_order)
values
 ('ACADEMY','RBA Academy','育成年代のスクール・クリニック・現場指導',10),
 ('EVENTS','RBA Events','大会・キャンプ・イベント運営',20),
 ('UNITED','RBA United','選抜・交流・代表活動',30),
 ('DHUB','D-HUB','強化・エリート育成ライン',40),
 ('HOMECOURT','My Home Court','会員基盤・活動管理・継続支援',50),
 ('GLOBAL','RBA Global','海外遠征・受入・国際提携',60),
 ('PARTNERS','RBA Partners','スポンサー・法人・地域連携',70)
on conflict (code) do update
set name=excluded.name, description=excluded.description, display_order=excluded.display_order, updated_at=now();

alter table public.events
  add column if not exists event_code text,
  add column if not exists business_unit_id uuid references public.business_units(id),
  add column if not exists capacity integer check (capacity is null or capacity >= 0),
  add column if not exists owner_user_id uuid references auth.users(id);

create unique index if not exists events_event_code_uq
  on public.events(event_code) where event_code is not null;
create index if not exists events_business_unit_idx
  on public.events(business_unit_id);

alter table public.service_offers
  add column if not exists offer_code text,
  add column if not exists business_unit_id uuid references public.business_units(id),
  add column if not exists revenue_recognition_mode text not null default 'on_fulfillment'
    check (revenue_recognition_mode in ('on_payment','on_fulfillment','monthly','manual'));

create unique index if not exists service_offers_offer_code_uq
  on public.service_offers(offer_code) where offer_code is not null;
create index if not exists service_offers_business_unit_idx
  on public.service_offers(business_unit_id);

create table if not exists public.event_financials (
  event_id uuid primary key references public.events(id) on delete cascade,
  business_unit_id uuid references public.business_units(id),
  budget_revenue_jpy bigint not null default 0 check (budget_revenue_jpy >= 0),
  budget_cost_jpy bigint not null default 0 check (budget_cost_jpy >= 0),
  actual_revenue_jpy bigint not null default 0 check (actual_revenue_jpy >= 0),
  actual_cost_jpy bigint not null default 0 check (actual_cost_jpy >= 0),
  paid_participants integer not null default 0 check (paid_participants >= 0),
  complimentary_participants integer not null default 0 check (complimentary_participants >= 0),
  cancellations integer not null default 0 check (cancellations >= 0),
  refunds_jpy bigint not null default 0 check (refunds_jpy >= 0),
  founder_required boolean not null default true,
  close_status text not null default 'open' check (close_status in ('open','provisional','closed')),
  closed_at timestamptz,
  notes text,
  updated_at timestamptz not null default now()
);

create index if not exists event_financials_business_unit_idx
  on public.event_financials(business_unit_id);

create table if not exists public.operating_costs (
  id uuid primary key default gen_random_uuid(),
  business_unit_id uuid references public.business_units(id),
  event_id uuid references public.events(id) on delete set null,
  category text not null check (category in (
    'venue','travel','lodging','staff','equipment','insurance','payment_fee',
    'marketing','food','transport','professional_fee','software','other'
  )),
  amount_jpy bigint not null check (amount_jpy >= 0),
  vendor_name text,
  incurred_on date not null default current_date,
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid','scheduled','paid','refunded','void')),
  receipt_reference text,
  approved_by uuid references auth.users(id),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists operating_costs_event_idx on public.operating_costs(event_id);
create index if not exists operating_costs_bu_date_idx on public.operating_costs(business_unit_id, incurred_on);

create table if not exists public.governance_documents (
  id uuid primary key default gen_random_uuid(),
  document_key text not null,
  version text not null,
  locale text not null default 'ja',
  title text not null,
  status text not null default 'draft' check (status in ('draft','approved','published','retired')),
  effective_at timestamptz,
  published_at timestamptz,
  review_due_at date,
  owner_role text,
  source_url text,
  checksum text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(document_key, version, locale)
);

create table if not exists public.governance_acceptances (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.governance_documents(id) on delete restrict,
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_user_id uuid references auth.users(id) on delete cascade,
  accepted_at timestamptz not null default now(),
  revoked_at timestamptz,
  acceptance_source text not null default 'web',
  metadata jsonb not null default '{}'::jsonb,
  unique(document_id, user_id, subject_user_id)
);

create index if not exists governance_acceptances_user_idx
  on public.governance_acceptances(user_id);

create table if not exists public.safety_report_actions (
  id uuid primary key default gen_random_uuid(),
  safety_report_id uuid not null references public.safety_reports(id) on delete cascade,
  action_type text not null check (action_type in (
    'triage','guardian_contact','medical_referral','staff_review','suspension',
    'corrective_action','closure','other'
  )),
  action_note text not null,
  action_by uuid references auth.users(id),
  action_at timestamptz not null default now(),
  follow_up_due_at timestamptz,
  completed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists safety_report_actions_report_idx
  on public.safety_report_actions(safety_report_id, action_at);

create table if not exists public.monthly_kpi_snapshots (
  month date not null check (date_trunc('month', month)::date = month),
  business_unit_id uuid references public.business_units(id),
  revenue_jpy bigint not null default 0,
  gross_profit_jpy bigint not null default 0,
  operating_profit_jpy bigint not null default 0,
  active_customers integer not null default 0,
  new_customers integer not null default 0,
  repeat_customers integer not null default 0,
  events_held integer not null default 0,
  participants integer not null default 0,
  refunds_jpy bigint not null default 0,
  founder_dependent_revenue_jpy bigint not null default 0,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (month, business_unit_id)
);

create or replace view public.management_event_pnl as
select
  e.id as event_id,
  e.event_code,
  e.title,
  e.starts_at,
  e.city,
  e.region,
  bu.code as business_unit_code,
  bu.name as business_unit_name,
  ef.budget_revenue_jpy,
  ef.budget_cost_jpy,
  (ef.budget_revenue_jpy - ef.budget_cost_jpy) as budget_profit_jpy,
  ef.actual_revenue_jpy,
  ef.actual_cost_jpy,
  ef.refunds_jpy,
  (ef.actual_revenue_jpy - ef.actual_cost_jpy - ef.refunds_jpy) as actual_profit_jpy,
  case
    when ef.actual_revenue_jpy > 0
    then round(((ef.actual_revenue_jpy - ef.actual_cost_jpy - ef.refunds_jpy)::numeric / ef.actual_revenue_jpy::numeric) * 100, 1)
    else null
  end as operating_margin_pct,
  ef.paid_participants,
  ef.complimentary_participants,
  ef.cancellations,
  ef.founder_required,
  ef.close_status
from public.events e
left join public.event_financials ef on ef.event_id=e.id
left join public.business_units bu on bu.id=coalesce(ef.business_unit_id,e.business_unit_id);

create or replace view public.management_monthly_kpis as
select
  month,
  bu.code as business_unit_code,
  bu.name as business_unit_name,
  revenue_jpy,
  gross_profit_jpy,
  operating_profit_jpy,
  active_customers,
  new_customers,
  repeat_customers,
  events_held,
  participants,
  refunds_jpy,
  founder_dependent_revenue_jpy,
  case when revenue_jpy > 0
    then round((founder_dependent_revenue_jpy::numeric / revenue_jpy::numeric) * 100, 1)
    else null
  end as founder_dependency_pct
from public.monthly_kpi_snapshots k
left join public.business_units bu on bu.id=k.business_unit_id;

alter table public.business_units enable row level security;
alter table public.event_financials enable row level security;
alter table public.operating_costs enable row level security;
alter table public.governance_documents enable row level security;
alter table public.governance_acceptances enable row level security;
alter table public.safety_report_actions enable row level security;
alter table public.monthly_kpi_snapshots enable row level security;

drop policy if exists "business_units_read" on public.business_units;
create policy "business_units_read" on public.business_units
for select to authenticated using (true);

drop policy if exists "business_units_admin_write" on public.business_units;
create policy "business_units_admin_write" on public.business_units
for all to authenticated
using (private.is_global_admin())
with check (private.is_global_admin());

drop policy if exists "event_financials_admin_all" on public.event_financials;
create policy "event_financials_admin_all" on public.event_financials
for all to authenticated
using (private.is_global_admin())
with check (private.is_global_admin());

drop policy if exists "operating_costs_admin_all" on public.operating_costs;
create policy "operating_costs_admin_all" on public.operating_costs
for all to authenticated
using (private.is_global_admin())
with check (private.is_global_admin());

drop policy if exists "governance_documents_published_read" on public.governance_documents;
create policy "governance_documents_published_read" on public.governance_documents
for select to authenticated
using (status='published' or private.is_global_admin());

drop policy if exists "governance_documents_admin_write" on public.governance_documents;
create policy "governance_documents_admin_write" on public.governance_documents
for all to authenticated
using (private.is_global_admin())
with check (private.is_global_admin());

drop policy if exists "governance_acceptances_self_read" on public.governance_acceptances;
create policy "governance_acceptances_self_read" on public.governance_acceptances
for select to authenticated
using (user_id=auth.uid() or subject_user_id=auth.uid() or private.is_global_admin());

drop policy if exists "governance_acceptances_self_insert" on public.governance_acceptances;
create policy "governance_acceptances_self_insert" on public.governance_acceptances
for insert to authenticated
with check (user_id=auth.uid());

drop policy if exists "safety_report_actions_admin_all" on public.safety_report_actions;
create policy "safety_report_actions_admin_all" on public.safety_report_actions
for all to authenticated
using (private.is_global_admin())
with check (private.is_global_admin());

drop policy if exists "monthly_kpi_admin_all" on public.monthly_kpi_snapshots;
create policy "monthly_kpi_admin_all" on public.monthly_kpi_snapshots
for all to authenticated
using (private.is_global_admin())
with check (private.is_global_admin());

revoke all on public.management_event_pnl from anon, authenticated;
revoke all on public.management_monthly_kpis from anon, authenticated;
grant select on public.management_event_pnl to authenticated;
grant select on public.management_monthly_kpis to authenticated;

