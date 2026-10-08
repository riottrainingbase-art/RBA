
create table if not exists public.stripe_webhook_events (
  id uuid primary key default gen_random_uuid(),
  stripe_event_id text not null unique,
  event_type text not null,
  object_id text,
  livemode boolean not null default true,
  payload_sha256 text,
  processing_status text not null default 'received'
    check (processing_status in ('received','processed','ignored','failed')),
  error_message text,
  received_at timestamptz not null default now(),
  processed_at timestamptz
);

alter table public.stripe_webhook_events enable row level security;
revoke all on public.stripe_webhook_events from anon, authenticated;

create unique index if not exists transaction_ledger_provider_tx_unique
  on public.transaction_ledger(provider, provider_transaction_id);

create or replace function public.resolve_rba_user_id_by_email(input_email text)
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select u.id
  from auth.users u
  where lower(u.email) = lower(input_email)
  order by u.created_at desc
  limit 1
$$;

revoke all on function public.resolve_rba_user_id_by_email(text) from public, anon, authenticated;
grant execute on function public.resolve_rba_user_id_by_email(text) to service_role;

create or replace function public.get_rba_stripe_webhook_secret()
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select ds.decrypted_secret
  from vault.decrypted_secrets ds
  where ds.name = 'rba_stripe_webhook_secret'
  order by ds.created_at desc
  limit 1
$$;

revoke all on function public.get_rba_stripe_webhook_secret() from public, anon, authenticated;
grant execute on function public.get_rba_stripe_webhook_secret() to service_role;

