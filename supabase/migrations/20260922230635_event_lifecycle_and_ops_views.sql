
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create or replace function private.close_expired_events()
returns integer
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_count integer;
begin
  update public.events
  set status='completed'
  where status='open'
    and ends_at is not null
    and ends_at < now();
  get diagnostics v_count = row_count;
  return v_count;
end;
$$;

revoke all on function private.close_expired_events() from public, anon, authenticated;
grant execute on function private.close_expired_events() to postgres, service_role;

create or replace view private.payment_ops_summary
with (security_invoker=true)
as
select
  (select count(*) from public.unmatched_stripe_payments where status='unresolved') as unmatched_payments,
  (select count(*) from public.stripe_webhook_events where processing_status='failed') as failed_webhooks,
  (select count(*) from public.platform_orders where status='failed') as failed_orders,
  (select count(*) from public.platform_orders where status='refunded') as refunded_orders,
  (select count(*) from public.subscriptions where status='past_due') as past_due_subscriptions,
  (select count(*) from public.subscriptions where status='active') as active_homecourt_subscriptions;

revoke all on private.payment_ops_summary from public, anon, authenticated;
grant select on private.payment_ops_summary to postgres, service_role;

create extension if not exists pg_cron with schema pg_catalog;
grant usage on schema cron to postgres;
grant all privileges on all tables in schema cron to postgres;

select cron.schedule(
  'rba-close-expired-events',
  '17 * * * *',
  $$select private.close_expired_events();$$
);

