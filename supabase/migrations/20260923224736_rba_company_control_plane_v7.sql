
create table if not exists public.strategic_priorities (
  id uuid primary key default gen_random_uuid(),
  priority_key text not null unique,
  title text not null,
  pillar text not null check (pillar in ('development','growth','platform','finance','governance','safeguarding','people','global','ipo_readiness')),
  priority_rank integer not null check (priority_rank between 1 and 100),
  status text not null default 'not_started' check (status in ('not_started','in_progress','blocked','done','deferred')),
  owner_role text,
  target_date date,
  success_metric text,
  current_blocker text,
  evidence jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.enterprise_risks (
  id uuid primary key default gen_random_uuid(),
  risk_key text not null unique,
  title text not null,
  category text not null check (category in ('safeguarding','legal','finance','security','operations','commercial','people','reputation','technology','international')),
  likelihood integer not null default 3 check (likelihood between 1 and 5),
  impact integer not null default 3 check (impact between 1 and 5),
  status text not null default 'open' check (status in ('open','mitigating','accepted','closed')),
  owner_role text,
  mitigation text,
  next_review_on date,
  evidence jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.management_decisions (
  id uuid primary key default gen_random_uuid(),
  decision_date date not null default current_date,
  decision_key text not null unique,
  title text not null,
  decision_text text not null,
  rationale text,
  scope text,
  status text not null default 'active' check (status in ('active','superseded','withdrawn')),
  owner_role text,
  related_priority_key text references public.strategic_priorities(priority_key) on update cascade on delete set null,
  evidence jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.monthly_close_controls (
  month date primary key check (date_trunc('month', month::timestamptz)::date = month),
  financial_close_status text not null default 'open' check (financial_close_status in ('open','review','closed')),
  kpi_close_status text not null default 'open' check (kpi_close_status in ('open','review','closed')),
  safety_review_status text not null default 'open' check (safety_review_status in ('open','review','closed')),
  governance_review_status text not null default 'open' check (governance_review_status in ('open','review','closed')),
  exception_review_status text not null default 'open' check (exception_review_status in ('open','review','closed')),
  closed_by uuid references auth.users(id) on delete set null,
  closed_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.strategic_priorities enable row level security;
alter table public.enterprise_risks enable row level security;
alter table public.management_decisions enable row level security;
alter table public.monthly_close_controls enable row level security;

drop policy if exists strategic_priorities_admin_all on public.strategic_priorities;
create policy strategic_priorities_admin_all on public.strategic_priorities
for all to authenticated
using (exists (
  select 1 from public.profile_roles pr
  where pr.user_id = auth.uid() and pr.role='admin' and pr.status='active'
))
with check (exists (
  select 1 from public.profile_roles pr
  where pr.user_id = auth.uid() and pr.role='admin' and pr.status='active'
));

drop policy if exists enterprise_risks_admin_all on public.enterprise_risks;
create policy enterprise_risks_admin_all on public.enterprise_risks
for all to authenticated
using (exists (
  select 1 from public.profile_roles pr
  where pr.user_id = auth.uid() and pr.role='admin' and pr.status='active'
))
with check (exists (
  select 1 from public.profile_roles pr
  where pr.user_id = auth.uid() and pr.role='admin' and pr.status='active'
));

drop policy if exists management_decisions_admin_all on public.management_decisions;
create policy management_decisions_admin_all on public.management_decisions
for all to authenticated
using (exists (
  select 1 from public.profile_roles pr
  where pr.user_id = auth.uid() and pr.role='admin' and pr.status='active'
))
with check (exists (
  select 1 from public.profile_roles pr
  where pr.user_id = auth.uid() and pr.role='admin' and pr.status='active'
));

drop policy if exists monthly_close_controls_admin_all on public.monthly_close_controls;
create policy monthly_close_controls_admin_all on public.monthly_close_controls
for all to authenticated
using (exists (
  select 1 from public.profile_roles pr
  where pr.user_id = auth.uid() and pr.role='admin' and pr.status='active'
))
with check (exists (
  select 1 from public.profile_roles pr
  where pr.user_id = auth.uid() and pr.role='admin' and pr.status='active'
));

insert into public.strategic_priorities
(priority_key,title,pillar,priority_rank,status,owner_role,success_metric,current_blocker,evidence)
values
('PROD_SOURCE_CONTROL','Production source control baseline','platform',1,'in_progress','platform_owner','Current production source recovered to GitHub main; all future changes through branch/preview/PR flow','Vercel production source recovery not yet completed','{"repo":"riottrainingbase-art/RBA","branch":"main"}'),
('SAFEGUARDING_OFFICER','Appoint and operationalize primary safeguarding officer','safeguarding',2,'blocked','executive','At least one active primary safeguarding officer with documented contact and training record','No primary safeguarding officer registered','{}'),
('AUTHORITATIVE_CAPACITY','Set authoritative capacity for every capacity-controlled published offer','platform',3,'blocked','operations','Zero capacity-controlled published offers/events with unknown capacity','Authoritative capacity values not yet entered for all relevant events','{}'),
('GOVERNANCE_APPROVAL','Approve and publish core governance documents','governance',4,'blocked','executive','Core governance documents approved, versioned, effective-dated and published','Core governance documents remain draft pending professional review','{}'),
('ORG_STANDARDS_APPROVAL','Approve RBA organization standards','development',5,'blocked','executive','Organization standards approved/published with effective and review dates','Standards remain draft','{}'),
('MONTHLY_MANAGEMENT_CLOSE','Run monthly 7-business-unit management close','finance',6,'in_progress','finance','Monthly revenue, gross profit, operating profit, customers, participants, refunds and founder dependency closed for all 7 business units',null,'{}'),
('FOUNDER_DEPENDENCY','Reduce founder dependency with role and operating standardization','people',7,'in_progress','executive','Founder-dependent revenue measured monthly and reduced over time',null,'{}'),
('HOMECOURT_OS','Build MY HOME COURT as the operating and member system of record','platform',8,'in_progress','platform_owner','Member, development, consent, participation, payment and coach records use a single governed platform flow',null,'{}'),
('DHUB_COACH_INFRA','Establish D-HUB as coach development infrastructure','development',9,'in_progress','coach_education','48-week learn-practice-observe-reflect pathway operational with coach development records',null,'{}'),
('NATIONAL_HUB_MODEL','Standardize POP-UP to RECURRING to PARTNER to HUB expansion model','growth',10,'not_started','growth','Every active market assigned a documented stage, owner and unit economics',null,'{}'),
('GLOBAL_EXCHANGE_OS','Standardize international exchange governance and operations','global',11,'in_progress','global','Every exchange has agreement, owner, safeguarding, financial and operational records',null,'{}'),
('IPO_CONTROL_ENVIRONMENT','Build audit-ready decision, risk, close and change-control evidence','ipo_readiness',12,'in_progress','executive','Monthly close, material decisions, risks, permissions and production changes are auditable',null,'{}')
on conflict (priority_key) do update set
  title=excluded.title,
  pillar=excluded.pillar,
  priority_rank=excluded.priority_rank,
  owner_role=excluded.owner_role,
  success_metric=excluded.success_metric,
  current_blocker=excluded.current_blocker,
  evidence=public.strategic_priorities.evidence || excluded.evidence,
  updated_at=now();

insert into public.enterprise_risks
(risk_key,title,category,likelihood,impact,status,owner_role,mitigation,next_review_on)
values
('RISK_NO_SOURCE_BASELINE','Production source not yet fully established in Git version control','technology',4,5,'mitigating','platform_owner','Recover current Vercel production source, commit baseline to main, and require Preview/PR before production',current_date + 7),
('RISK_SAFEGUARDING_OWNER','No active primary safeguarding officer recorded','safeguarding',4,5,'open','executive','Appoint accountable officer and deputy; document reporting, escalation, training and access control',current_date + 3),
('RISK_UNKNOWN_CAPACITY','Published capacity-controlled offers have unknown authoritative capacity','operations',4,4,'mitigating','operations','Keep checkout fail-closed until capacity is confirmed and entered',current_date + 3),
('RISK_GOVERNANCE_DRAFT','Core governance documents are not yet formally approved','legal',4,5,'open','executive','Professional review, version approval, effective dates, publication and acceptance tracking',current_date + 14),
('RISK_FOUNDER_DEPENDENCY','Material operations and revenue remain founder-dependent','people',4,4,'mitigating','executive','Measure founder-dependent revenue monthly and transfer repeatable work into roles, standards and automation',current_date + 30),
('RISK_AUTH_PASSWORD_PROTECTION','Supabase leaked-password protection remains disabled','security',3,4,'open','platform_owner','Enable leaked-password protection in Supabase Auth settings and verify authentication regression tests',current_date + 7)
on conflict (risk_key) do update set
  title=excluded.title,
  category=excluded.category,
  likelihood=excluded.likelihood,
  impact=excluded.impact,
  owner_role=excluded.owner_role,
  mitigation=excluded.mitigation,
  next_review_on=excluded.next_review_on,
  updated_at=now();

insert into public.management_decisions
(decision_key,title,decision_text,rationale,scope,status,owner_role,related_priority_key,evidence)
values
('DEC_PLATFORM_COMPANY_MODEL','Operate RBA as a scalable development platform company',
 'RBA operating decisions will be evaluated against development value, recurring economics, national scalability, data asset creation, founder-dependency reduction, safeguarding, governance and auditability.',
 'This creates a consistent decision standard for growth without degrading development quality or control environment.',
 'company','active','executive','IPO_CONTROL_ENVIRONMENT',
 '{"principles":["development_value","recurring_economics","national_scalability","data_asset","founder_dependency","safeguarding","governance","auditability"]}'),
('DEC_GIT_PREVIEW_PROD','Require Git and Preview before Production changes',
 'Production changes must originate from source control and pass a Preview review before merge/deployment, except documented emergency procedures.',
 'Reduces production risk and creates an auditable change history.',
 'technology','active','platform_owner','PROD_SOURCE_CONTROL',
 '{"repo":"riottrainingbase-art/RBA"}'),
('DEC_COMMERCE_SINGLE_SOURCE','Maintain one governed commerce architecture',
 'Do not introduce a second checkout/order/payment architecture. Existing governed payment routing and ledger structures remain the single source of truth.',
 'Prevents reconciliation errors, duplicate flows and uncontrolled payment links.',
 'commerce','active','finance','HOMECOURT_OS','{}')
on conflict (decision_key) do update set
  title=excluded.title,
  decision_text=excluded.decision_text,
  rationale=excluded.rationale,
  scope=excluded.scope,
  status=excluded.status,
  owner_role=excluded.owner_role,
  related_priority_key=excluded.related_priority_key,
  evidence=excluded.evidence;

insert into public.monthly_close_controls(month)
values (date_trunc('month', current_date)::date)
on conflict (month) do nothing;

create or replace view public.management_company_control_plane as
select
  p.priority_key,
  p.priority_rank,
  p.title,
  p.pillar,
  p.status,
  p.owner_role,
  p.target_date,
  p.success_metric,
  p.current_blocker,
  coalesce(r.open_risk_count,0) as open_risk_count,
  p.updated_at
from public.strategic_priorities p
left join lateral (
  select count(*)::int as open_risk_count
  from public.enterprise_risks er
  where er.status in ('open','mitigating')
    and (
      (p.pillar='safeguarding' and er.category='safeguarding') or
      (p.pillar='governance' and er.category='legal') or
      (p.pillar='finance' and er.category='finance') or
      (p.pillar='people' and er.category='people') or
      (p.pillar='platform' and er.category in ('technology','security','operations')) or
      (p.pillar='ipo_readiness' and er.category in ('technology','security','legal','finance','operations','people'))
    )
) r on true;

grant select on public.management_company_control_plane to authenticated;

