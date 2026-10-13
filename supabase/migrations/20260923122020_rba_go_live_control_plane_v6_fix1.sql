
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
  ) req(document_key)
  where not exists (
    select 1 from public.governance_documents g
    where g.document_key=req.document_key
      and g.status in ('approved','published','active')
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

