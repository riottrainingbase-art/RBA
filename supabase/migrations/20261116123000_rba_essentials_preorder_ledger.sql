-- RBA ESSENTIALS paid-preorder ledger.
-- Apply only after the release checklist has been approved, before enabling the checkout.
-- Stripe remains the authoritative payment + delivery-address source.
create table if not exists public.rba_essentials_orders (
  order_id uuid primary key,
  stripe_checkout_session_id text not null unique,
  stripe_payment_intent_id text unique,
  stripe_event_id text not null,
  currency text not null default 'jpy' check (currency = 'jpy'),
  amount_total_jpy integer not null check (amount_total_jpy > 0),
  terms_version text not null,
  dispatch_by date not null,
  tee_quantity integer not null default 0 check (tee_quantity between 0 and 3),
  tee_size text check (tee_size in ('S','M','L','XL')),
  setup_quantity integer not null default 0 check (setup_quantity between 0 and 3),
  hoodie_size text check (hoodie_size in ('S','M','L','XL')),
  pants_size text check (pants_size in ('S','M','L','XL')),
  payment_status text not null default 'paid' check (payment_status in ('paid','refunded','partially_refunded','disputed')),
  fulfillment_status text not null default 'preparing' check (fulfillment_status in ('preparing','shipped','delivered','cancelled')),
  paid_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint items_positive check (tee_quantity + setup_quantity between 1 and 3),
  constraint tee_size_present check (tee_quantity = 0 or tee_size is not null),
  constraint setup_sizes_present check (setup_quantity = 0 or (hoodie_size is not null and pants_size is not null))
);
create index if not exists rba_essentials_orders_paid_at_idx on public.rba_essentials_orders(paid_at desc);
create index if not exists rba_essentials_orders_fulfillment_idx on public.rba_essentials_orders(fulfillment_status,paid_at desc);
alter table public.rba_essentials_orders enable row level security;
revoke all on table public.rba_essentials_orders from anon, authenticated;
grant select,insert,update on table public.rba_essentials_orders to service_role;
-- No public/client policies. Only the backend service role may query or mutate this ledger.
comment on table public.rba_essentials_orders is 'RBA ESSENTIALS official apparel paid preorders; no public/client access; Stripe session is source of truth.';
