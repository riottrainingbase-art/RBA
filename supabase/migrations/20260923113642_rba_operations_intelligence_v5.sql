
-- RBA Operations Intelligence v5
-- Exception-first operations, hub scoring, partner scoring and executive work queue.

create table if not exists public.operations_exceptions (
  id uuid primary key default gen_random_uuid(),
  exception_key text not null unique,
  exception_type text not null check (exception_type in (
    'payment','refund','capacity','waitlist','safeguarding','event_margin',
    'founder_dependency','partner_followup','data_quality','credential','other'
  )),
  severity text not null default 'medium' check (severity in ('low','medium','high','critical')),
  status text not null default 'open' check (status in ('open','acknowledged','resolved','dismissed')),
  title text not null,
  description text,
  user_id uuid references auth.users(id) on delete set null,
  event_id uuid references public.events(id) on delete cascade,
  service_offer_id uuid references public.service_offers(id) on delete cascade,
  partner_id uuid references public.global_partners(id) on delete cascade,
  due_at timestamptz,
  source_table text,
  source_id text,
  metadata jsonb not null default '{}'::jsonb,
  detected_at timestamptz not null default now(),
  acknowledged_at timestamptz,
  resolved_at timestamptz,
  updated_at timestamptz not null default now()
);
create index if not exists operations_exceptions_open_idx
  on public.operations_exceptions(status,severity,due_at);
create index if not exists operations_exceptions_event_idx
  on public.operations_exceptions(event_id,status);
create index if not exists operations_exceptions_partner_idx
  on public.operations_exceptions(partner_id,status);

alter table public.operations_exceptions enable row level security;
create policy "operations_exceptions_admin_all" on public.operations_exceptions
for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());

create table if not exists public.hub_performance_snapshots (
  id uuid primary key default gen_random_uuid(),
  hub_key text not null,
  hub_name text not null,
  region text,
  period_start date not null,
  period_end date not null,
  events_count integer not null default 0,
  participants_count integer not null default 0,
  repeat_rate numeric,
  revenue_jpy bigint not null default 0,
  operating_profit_jpy bigint not null default 0,
  margin_pct numeric,
  program_quality_score numeric,
  safeguarding_open_count integer not null default 0,
  approved_coaches_count integer not null default 0,
  founder_dependency_pct numeric,
  score numeric,
  score_version text not null default 'v1',
  generated_at timestamptz not null default now(),
  unique(hub_key,period_start,period_end)
);
alter table public.hub_performance_snapshots enable row level security;
create policy "hub_performance_admin_read" on public.hub_performance_snapshots
for select to authenticated using (private.is_global_admin());
create policy "hub_performance_admin_write" on public.hub_performance_snapshots
for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());

create table if not exists public.partner_health_snapshots (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.global_partners(id) on delete cascade,
  period_start date not null,
  period_end date not null,
  relationship_status text,
  active_agreements integer not null default 0,
  confirmed_programs integer not null default 0,
  completed_programs integer not null default 0,
  participant_reach integer not null default 0,
  last_activity_at timestamptz,
  safeguarding_ready boolean not null default false,
  score numeric,
  score_version text not null default 'v1',
  generated_at timestamptz not null default now(),
  unique(partner_id,period_start,period_end)
);
create index if not exists partner_health_partner_idx
  on public.partner_health_snapshots(partner_id,period_end desc);
alter table public.partner_health_snapshots enable row level security;
create policy "partner_health_admin_read" on public.partner_health_snapshots
for select to authenticated using (private.is_global_admin());
create policy "partner_health_admin_write" on public.partner_health_snapshots
for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());

create or replace view public.management_exception_queue
with (security_invoker=true)
as
select
  x.id,
  x.exception_type,
  x.severity,
  x.status,
  x.title,
  x.description,
  x.due_at,
  x.detected_at,
  e.event_code,
  e.title as event_title,
  s.offer_code,
  s.title as offer_title,
  gp.name as partner_name,
  x.metadata
from public.operations_exceptions x
left join public.events e on e.id=x.event_id
left join public.service_offers s on s.id=x.service_offer_id
left join public.global_partners gp on gp.id=x.partner_id
where x.status in ('open','acknowledged')
order by
  case x.severity when 'critical' then 1 when 'high' then 2 when 'medium' then 3 else 4 end,
  x.due_at nulls last,
  x.detected_at;

revoke all on public.management_exception_queue from anon,authenticated;
grant select on public.management_exception_queue to authenticated;

create or replace function public.rba_refresh_operations_exceptions()
returns jsonb
language plpgsql
security definer
set search_path=''
as $$
declare
  v_added int:=0;
  v_resolved int:=0;
  rec record;
  key text;
begin
  -- resolve stale auto-generated exceptions before recalculation
  update public.operations_exceptions
  set status='resolved',resolved_at=now(),updated_at=now()
  where status in ('open','acknowledged')
    and metadata->>'auto_generated'='true'
    and exception_type in ('payment','capacity','event_margin','founder_dependency','partner_followup','data_quality');
  get diagnostics v_resolved = row_count;

  -- payment: accepted applications with no paid order after 18h
  for rec in
    select a.id,a.applicant_user_id,a.service_offer_id,s.title
    from public.program_applications a
    join public.service_offers s on s.id=a.service_offer_id
    where a.status='accepted'
      and coalesce(a.reviewed_at,a.submitted_at)<now()-interval '18 hours'
      and not exists(
        select 1 from public.platform_orders o
        where o.application_id=a.id and o.status in ('paid','confirmed','fulfilled','refunded')
      )
  loop
    key:='payment:'||rec.id::text;
    insert into public.operations_exceptions(
      exception_key,exception_type,severity,title,description,user_id,service_offer_id,due_at,
      source_table,source_id,metadata
    ) values(
      key,'payment','medium','未決済の承認済み申込',
      rec.title||' の承認済み申込が未決済です。',
      rec.applicant_user_id,rec.service_offer_id,now()+interval '6 hours',
      'program_applications',rec.id::text,'{"auto_generated":true}'::jsonb
    )
    on conflict(exception_key) do update set
      status='open',resolved_at=null,updated_at=now(),due_at=excluded.due_at;
    v_added:=v_added+1;
  end loop;

  -- data quality: capacity controlled but no capacity set
  for rec in
    select s.id,s.title
    from public.service_offers s
    left join public.events e on e.slug=s.metadata->>'source_event_slug'
    where s.publication_status='published'
      and coalesce((s.metadata->>'capacity_controlled')::boolean,false)=true
      and coalesce(s.capacity,e.capacity) is null
  loop
    key:='capacity_missing:'||rec.id::text;
    insert into public.operations_exceptions(
      exception_key,exception_type,severity,title,description,service_offer_id,
      source_table,source_id,metadata
    ) values(
      key,'data_quality','high','定員未設定',
      rec.title||' は定員管理対象ですがcapacityが未設定です。',
      rec.id,'service_offers',rec.id::text,'{"auto_generated":true}'::jsonb
    )
    on conflict(exception_key) do update set
      status='open',resolved_at=null,updated_at=now();
    v_added:=v_added+1;
  end loop;

  -- event margin: completed/recent event with negative operating profit
  for rec in
    select ef.event_id,e.title,
      (ef.actual_revenue_jpy-ef.actual_cost_jpy-ef.refunds_jpy) as profit
    from public.event_financials ef
    join public.events e on e.id=ef.event_id
    where ef.actual_revenue_jpy>0
      and (ef.actual_revenue_jpy-ef.actual_cost_jpy-ef.refunds_jpy)<0
  loop
    key:='negative_margin:'||rec.event_id::text;
    insert into public.operations_exceptions(
      exception_key,exception_type,severity,title,description,event_id,
      source_table,source_id,metadata
    ) values(
      key,'event_margin','high','イベント赤字',
      rec.title||' の実績利益がマイナスです。',
      rec.event_id,'event_financials',rec.event_id::text,
      jsonb_build_object('auto_generated',true,'profit_jpy',rec.profit)
    )
    on conflict(exception_key) do update set
      status='open',resolved_at=null,updated_at=now(),metadata=excluded.metadata;
    v_added:=v_added+1;
  end loop;

  -- founder dependency: profitable event marked founder-required
  for rec in
    select ef.event_id,e.title,ef.actual_revenue_jpy
    from public.event_financials ef
    join public.events e on e.id=ef.event_id
    where ef.founder_required=true and ef.actual_revenue_jpy>0
  loop
    key:='founder_dependency:'||rec.event_id::text;
    insert into public.operations_exceptions(
      exception_key,exception_type,severity,title,description,event_id,
      source_table,source_id,metadata
    ) values(
      key,'founder_dependency','low','Founder依存イベント',
      rec.title||' はFounder必須として売上計上されています。',
      rec.event_id,'event_financials',rec.event_id::text,
      jsonb_build_object('auto_generated',true,'revenue_jpy',rec.actual_revenue_jpy)
    )
    on conflict(exception_key) do update set
      status='open',resolved_at=null,updated_at=now(),metadata=excluded.metadata;
    v_added:=v_added+1;
  end loop;

  -- partner follow-up: discussion/contacted with no update for 14 days
  for rec in
    select id,name,relationship_status,updated_at
    from public.global_partners
    where relationship_status in ('contacted','discussion','mou_drafting')
      and updated_at<now()-interval '14 days'
  loop
    key:='partner_followup:'||rec.id::text;
    insert into public.operations_exceptions(
      exception_key,exception_type,severity,title,description,partner_id,due_at,
      source_table,source_id,metadata
    ) values(
      key,'partner_followup','medium','海外パートナー要フォロー',
      rec.name||' との案件が14日以上更新されていません。',
      rec.id,now()+interval '3 days','global_partners',rec.id::text,'{"auto_generated":true}'::jsonb
    )
    on conflict(exception_key) do update set
      status='open',resolved_at=null,updated_at=now(),due_at=excluded.due_at;
    v_added:=v_added+1;
  end loop;

  return jsonb_build_object('exceptions_refreshed',v_added,'auto_resolved',v_resolved,'ran_at',now());
end;
$$;
revoke all on function public.rba_refresh_operations_exceptions() from public,anon,authenticated;

-- attach exception refresh to existing hourly automation without rewriting it
create or replace function public.rba_operations_tick()
returns jsonb
language plpgsql
security definer
set search_path=''
as $$
declare
  base jsonb;
  exceptions jsonb;
begin
  base:=public.rba_automation_tick();
  exceptions:=public.rba_refresh_operations_exceptions();
  return jsonb_build_object('automation',base,'exceptions',exceptions);
end;
$$;
revoke all on function public.rba_operations_tick() from public,anon,authenticated;

do $$
begin
  perform cron.unschedule('rba-platform-hourly-automation');
exception when others then null;
end $$;

select cron.schedule(
  'rba-platform-hourly-automation',
  '7 * * * *',
  'select public.rba_operations_tick();'
);

