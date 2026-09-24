-- Atomically lease Stripe events so concurrent deliveries cannot both fulfill.
alter table public.stripe_webhook_events
  add column if not exists processing_token uuid,
  add column if not exists processing_started_at timestamptz;

alter table public.stripe_webhook_events
  drop constraint if exists stripe_webhook_events_processing_status_check;
alter table public.stripe_webhook_events
  add constraint stripe_webhook_events_processing_status_check
  check (processing_status in ('received','processing','processed','ignored','failed'));

alter table public.platform_notifications
  add column if not exists dedupe_key text;
create unique index if not exists platform_notifications_dedupe_key_key
  on public.platform_notifications(dedupe_key);

alter table public.payment_reconciliation_actions
  add column if not exists dedupe_key text;
create unique index if not exists payment_reconciliation_actions_dedupe_key_key
  on public.payment_reconciliation_actions(dedupe_key);

create or replace function public.claim_stripe_webhook_event(
  p_event_id text,
  p_event_type text,
  p_object_id text,
  p_livemode boolean,
  p_payload_sha256 text,
  p_token uuid
) returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  claimed_id uuid;
begin
  insert into public.stripe_webhook_events(
    stripe_event_id,event_type,object_id,livemode,payload_sha256,
    processing_status,processing_token,processing_started_at,error_message,processed_at
  ) values (
    p_event_id,p_event_type,p_object_id,p_livemode,p_payload_sha256,
    'processing',p_token,now(),null,null
  )
  on conflict (stripe_event_id) do update set
    event_type=excluded.event_type,
    object_id=coalesce(excluded.object_id,public.stripe_webhook_events.object_id),
    livemode=excluded.livemode,
    payload_sha256=excluded.payload_sha256,
    processing_status='processing',
    processing_token=excluded.processing_token,
    processing_started_at=now(),
    error_message=null,
    processed_at=null
  where public.stripe_webhook_events.processing_status='failed'
     or (
       public.stripe_webhook_events.processing_status in ('received','processing')
       and coalesce(public.stripe_webhook_events.processing_started_at,public.stripe_webhook_events.received_at)
         < now() - interval '10 minutes'
     )
  returning id into claimed_id;
  return claimed_id is not null;
end;
$$;

revoke all on function public.claim_stripe_webhook_event(text,text,text,boolean,text,uuid) from public,anon,authenticated;
grant execute on function public.claim_stripe_webhook_event(text,text,text,boolean,text,uuid) to service_role;
