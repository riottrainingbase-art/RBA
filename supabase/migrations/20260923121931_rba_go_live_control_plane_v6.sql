
-- RBA Go-Live Control Plane v6
create table if not exists public.go_live_checks (
  id uuid primary key default gen_random_uuid(),
  check_key text not null unique,
  category text not null check (category in (
    'commerce','routing','security','data_quality','operations','legal','international','observability'
  )),
  severity text not null default 'high' check (severity in ('low','medium','high','critical')),
  title text not null,
  description text,
  status text not null default 'pending' check (status in ('pass','fail','warning','pending','blocked')),
  automated boolean not null default true,
  last_checked_at timestamptz,
  evidence jsonb not null default '{}'::jsonb,
  owner_role text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.go_live_checks enable row level security;
create policy "go_live_checks_admin_all" on public.go_live_checks
for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());

insert into public.go_live_checks(check_key,category,severity,title,description,automated,owner_role)
values
 ('published_offers_have_routes','commerce','critical','公開商品に有効な決済ルートがある','公開中service_offerは原則として決済/問い合わせルートを持つ',true,'admin'),
 ('no_direct_payment_urls','commerce','critical','公開商品に直Stripe URLがない','Checkout Gatewayを迂回するURLをservice_offersに置かない',true,'admin'),
 ('capacity_configured','data_quality','high','定員管理商品のcapacityが設定済み','capacity_controlled商品は定員未設定のまま公開しない',true,'operations'),
 ('no_high_critical_exceptions','operations','high','重大な未解決例外がない','operations_exceptionsのHIGH/CRITICALを公開前に解消',true,'operations'),
 ('governance_approved','legal','high','主要ガバナンス文書が承認済み','利用規約・プライバシー・返金・安全・国際遠征等',true,'admin'),
 ('safeguarding_lead_assigned','security','high','Safeguarding責任者が登録済み','primary_contactのactive officerが最低1名必要',true,'admin'),
 ('published_standards_present','international','medium','公開可能な組織標準がある','対外説明用Standardsをapproved/publishedへ',true,'admin'),
 ('runtime_observability_ready','observability','medium','本番監視系が稼働','Vercel/Supabaseログと例外監視を運用可能な状態にする',false,'admin')
on conflict(check_key) do nothing;

create or replace function public.rba_refresh_go_live_checks()
returns jsonb
language plpgsql
security definer
set search_path=''
as $$
declare
  v_missing_routes int;
  v_direct_urls int;
  v_capacity_missing int;
  v_high_ex int;
  v_gov_missing int;
  v_sg_leads int;
  v_standards int;
begin
  select count(*) into v_missing_routes
  from public.service_offers s
  left join public.payment_routes pr on pr.service_offer_id=s.id and pr.active=true
  where s.publication_status='published' and pr.id is null;

  update public.go_live_checks set
    status=case when v_missing_routes=0 then 'pass' else 'fail' end,
    last_checked_at=now(),
    evidence=jsonb_build_object('published_without_active_route',v_missing_routes),
    updated_at=now()
  where check_key='published_offers_have_routes';

  select count(*) into v_direct_urls
  from public.service_offers
  where publication_status='published' and external_payment_url is not null;

  update public.go_live_checks set
    status=case when v_direct_urls=0 then 'pass' else 'fail' end,
    last_checked_at=now(),
    evidence=jsonb_build_object('published_with_direct_payment_url',v_direct_urls),
    updated_at=now()
  where check_key='no_direct_payment_urls';

  select count(*) into v_capacity_missing
  from public.service_offers s
  left join public.events e on e.slug=s.metadata->>'source_event_slug'
  where s.publication_status='published'
    and coalesce((s.metadata->>'capacity_controlled')::boolean,false)=true
    and coalesce(s.capacity,e.capacity) is null;

  update public.go_live_checks set
    status=case when v_capacity_missing=0 then 'pass' else 'fail' end,
    last_checked_at=now(),
    evidence=jsonb_build_object('capacity_missing',v_capacity_missing),
    updated_at=now()
  where check_key='capacity_configured';

  select count(*) into v_high_ex
  from public.operations_exceptions
  where status in ('open','acknowledged') and severity in ('high','critical');

  update public.go_live_checks set
    status=case when v_high_ex=0 then 'pass' else 'fail' end,
    last_checked_at=now(),
    evidence=jsonb_build_object('high_critical_open',v_high_ex),
    updated_at=now()
  where check_key='no_high_critical_exceptions';

  select count(*) into v_gov_missing
  from (values
    ('terms_of_service'),('privacy_policy'),('refund_policy'),
    ('safeguarding_policy'),('international_travel_terms')
  ) req(doc_type)
  where not exists (
    select 1 from public.governance_documents g
    where g.document_type=req.doc_type and g.status in ('approved','published','active')
  );

  update public.go_live_checks set
    status=case when v_gov_missing=0 then 'pass' else 'blocked' end,
    last_checked_at=now(),
    evidence=jsonb_build_object('required_documents_not_approved',v_gov_missing),
    updated_at=now()
  where check_key='governance_approved';

  select count(*) into v_sg_leads
  from public.safeguarding_officers
  where active=true and primary_contact=true;

  update public.go_live_checks set
    status=case when v_sg_leads>0 then 'pass' else 'blocked' end,
    last_checked_at=now(),
    evidence=jsonb_build_object('active_primary_safeguarding_officers',v_sg_leads),
    updated_at=now()
  where check_key='safeguarding_lead_assigned';

  select count(*) into v_standards
  from public.organization_standards
  where status in ('approved','published');

  update public.go_live_checks set
    status=case when v_standards>0 then 'pass' else 'warning' end,
    last_checked_at=now(),
    evidence=jsonb_build_object('approved_or_published_standards',v_standards),
    updated_at=now()
  where check_key='published_standards_present';

  return jsonb_build_object(
    'missing_routes',v_missing_routes,
    'direct_urls',v_direct_urls,
    'capacity_missing',v_capacity_missing,
    'high_critical_exceptions',v_high_ex,
    'required_governance_missing',v_gov_missing,
    'safeguarding_primary',v_sg_leads,
    'published_standards',v_standards,
    'checked_at',now()
  );
end;
$$;
revoke all on function public.rba_refresh_go_live_checks() from public,anon,authenticated;

create or replace view public.management_go_live_dashboard
with (security_invoker=true)
as
select
  category,severity,title,status,automated,last_checked_at,evidence,owner_role
from public.go_live_checks
order by
  case status when 'fail' then 1 when 'blocked' then 2 when 'warning' then 3 when 'pending' then 4 else 5 end,
  case severity when 'critical' then 1 when 'high' then 2 when 'medium' then 3 else 4 end,
  title;

revoke all on public.management_go_live_dashboard from anon,authenticated;
grant select on public.management_go_live_dashboard to authenticated;

