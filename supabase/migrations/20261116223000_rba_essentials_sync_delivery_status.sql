-- Keep the RBA seller's existing order ledger in sync with Risa's production queue.
-- No outbound customer notification; keep email readiness separately gated.
create or replace function public.rba_essentials_sync_order_delivery_status()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  if new.stage = 'shipped' then
    update public.rba_essentials_orders
       set fulfillment_status = 'shipped', updated_at = now()
     where order_id = new.order_id
       and payment_status = 'paid'
       and fulfillment_status = 'preparing';
  elsif new.stage = 'delivered' then
    update public.rba_essentials_orders
       set fulfillment_status = 'delivered', updated_at = now()
     where order_id = new.order_id
       and payment_status = 'paid'
       and fulfillment_status in ('preparing','shipped');
  end if;
  return new;
end
$$;
drop trigger if exists rba_essentials_delivery_status_sync_trg on public.rba_essentials_fulfillment_tasks;
create trigger rba_essentials_delivery_status_sync_trg
  after update of stage on public.rba_essentials_fulfillment_tasks
  for each row when (old.stage is distinct from new.stage)
  execute function public.rba_essentials_sync_order_delivery_status();
revoke all on function public.rba_essentials_sync_order_delivery_status() from public,anon,authenticated;
grant execute on function public.rba_essentials_sync_order_delivery_status() to service_role;
