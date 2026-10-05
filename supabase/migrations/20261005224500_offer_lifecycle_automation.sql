-- Automatically close public offers when their linked event is no longer sellable.
create or replace function public.rba_offer_lifecycle_tick()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_archived int:=0;
begin
  update public.service_offers s
     set publication_status='archived',
         availability_status='closed',
         updated_at=now()
    from public.events e
   where e.slug=s.metadata->>'source_event_slug'
     and e.status in ('completed','cancelled')
     and s.publication_status in ('published','paused');
  get diagnostics v_archived=row_count;

  return jsonb_build_object(
    'offers_archived',v_archived,
    'ran_at',now()
  );
end;
$$;

revoke all on function public.rba_offer_lifecycle_tick() from public, anon, authenticated;
grant execute on function public.rba_offer_lifecycle_tick() to service_role;

create or replace function public.rba_operations_tick()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  base jsonb;
  lifecycle jsonb;
  exceptions jsonb;
begin
  base:=public.rba_automation_tick();
  lifecycle:=public.rba_offer_lifecycle_tick();
  exceptions:=public.rba_refresh_operations_exceptions();
  return jsonb_build_object('automation',base,'lifecycle',lifecycle,'exceptions',exceptions);
end;
$$;

revoke all on function public.rba_operations_tick() from public, anon, authenticated;
grant execute on function public.rba_operations_tick() to service_role;
