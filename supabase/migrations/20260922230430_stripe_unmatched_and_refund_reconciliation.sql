
create table if not exists public.unmatched_stripe_payments (
  id uuid primary key default gen_random_uuid(),
  checkout_session_id text unique,
  stripe_event_id text,
  customer_email text,
  customer_id text,
  payment_intent_id text,
  subscription_id text,
  amount_total integer,
  currency text,
  programme_key text,
  event_key text,
  plan_key text,
  reason text not null default 'rba_user_not_resolved',
  status text not null default 'unresolved'
    check (status in ('unresolved','resolved','ignored')),
  resolved_user_id uuid references auth.users(id),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

alter table public.unmatched_stripe_payments enable row level security;
revoke all on public.unmatched_stripe_payments from anon, authenticated;

create index if not exists unmatched_stripe_payments_status_created_idx
  on public.unmatched_stripe_payments(status, created_at desc);

create table if not exists public.payment_reconciliation_actions (
  id bigint generated always as identity primary key,
  action_type text not null
    check (action_type in ('payment_matched','payment_unmatched','refund_recorded','subscription_updated','payment_failed')),
  stripe_object_id text,
  user_id uuid references auth.users(id),
  order_id uuid references public.platform_orders(id),
  detail jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.payment_reconciliation_actions enable row level security;
revoke all on public.payment_reconciliation_actions from anon, authenticated;

create index if not exists payment_reconciliation_actions_created_idx
  on public.payment_reconciliation_actions(created_at desc);

create or replace function public.resolve_unmatched_stripe_payment(
  p_checkout_session_id text,
  p_user_id uuid
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.role() <> 'service_role' then
    raise exception 'not authorized';
  end if;

  update public.unmatched_stripe_payments
  set status='resolved',
      resolved_user_id=p_user_id,
      resolved_at=now()
  where checkout_session_id=p_checkout_session_id
    and status='unresolved';
end;
$$;

revoke all on function public.resolve_unmatched_stripe_payment(text, uuid) from public, anon, authenticated;
grant execute on function public.resolve_unmatched_stripe_payment(text, uuid) to service_role;

