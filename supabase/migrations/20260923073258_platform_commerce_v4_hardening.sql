create index if not exists payment_reconciliation_actions_order_idx on public.payment_reconciliation_actions(order_id);
create index if not exists payment_reconciliation_actions_user_idx on public.payment_reconciliation_actions(user_id);
create index if not exists unmatched_stripe_payments_resolved_user_idx on public.unmatched_stripe_payments(resolved_user_id);
create index if not exists platform_orders_status_offer_idx on public.platform_orders(service_offer_id,status);

create or replace function public.rba_reserve_platform_order_slot(p_order_id uuid, p_hold_minutes integer default 30)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_offer_id uuid;
  v_capacity integer;
  v_availability text;
  v_used integer;
  v_hold_until timestamptz;
begin
  select po.service_offer_id, so.capacity, so.availability_status
    into v_offer_id, v_capacity, v_availability
  from public.platform_orders po
  join public.service_offers so on so.id=po.service_offer_id
  where po.id=p_order_id
  for update of so;

  if v_offer_id is null then raise exception 'ORDER_NOT_FOUND'; end if;
  if v_availability='closed' then raise exception 'OFFER_CLOSED'; end if;
  if v_capacity is null then return jsonb_build_object('capacity',null,'controlled',false); end if;

  select count(*) into v_used
  from public.platform_orders po
  where po.service_offer_id=v_offer_id
    and po.id<>p_order_id
    and (
      po.status in ('paid','confirmed','fulfilled')
      or (
        po.status='awaiting_payment'
        and nullif(po.metadata->>'seat_hold_until','')::timestamptz > now()
      )
    );
  if v_used>=v_capacity then raise exception 'OFFER_FULL'; end if;

  v_hold_until := now()+make_interval(mins=>greatest(1,least(coalesce(p_hold_minutes,30),60)));
  update public.platform_orders
  set status='awaiting_payment',
      metadata=jsonb_set(coalesce(metadata,'{}'::jsonb),'{seat_hold_until}',to_jsonb(v_hold_until::text),true),
      updated_at=now()
  where id=p_order_id;

  return jsonb_build_object('capacity',v_capacity,'controlled',true,'used',v_used,'remaining_after_hold',v_capacity-v_used-1,'hold_until',v_hold_until);
end;
$$;
revoke all on function public.rba_reserve_platform_order_slot(uuid,integer) from public, anon, authenticated;
grant execute on function public.rba_reserve_platform_order_slot(uuid,integer) to service_role;
