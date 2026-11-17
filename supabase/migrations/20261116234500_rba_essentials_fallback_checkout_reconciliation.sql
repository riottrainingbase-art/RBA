-- Fallback Stripe-hosted FIRST DROP payment link reconciliation and buyer notice workflow.
-- These columns do not enable checkout or relax RLS.
alter table public.rba_essentials_orders
  add column if not exists checkout_source text not null default 'rba_website'
    check (checkout_source in ('rba_website','stripe_payment_link')),
  add column if not exists stripe_payment_link_id text,
  add column if not exists buyer_notice_status text not null default 'pending'
    check (buyer_notice_status in ('pending','sent','failed')),
  add column if not exists buyer_notice_sent_at timestamptz;
alter table public.rba_essentials_orders
  add constraint rba_essentials_notice_time_integrity check (
    buyer_notice_status <> 'sent' or buyer_notice_sent_at is not null
  );
comment on column public.rba_essentials_orders.stripe_payment_link_id is
 'Fallback Stripe-hosted payment link ID (RBA TEE or SETUP), no public access.';
comment on column public.rba_essentials_orders.buyer_notice_status is
 'Operational acceptance/confirmation email state. Stripe payment status alone does NOT mean accepted order notice was sent.';
