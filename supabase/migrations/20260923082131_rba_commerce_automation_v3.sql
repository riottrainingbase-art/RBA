
-- RBA Commerce Automation v3
-- Secure payment routing, application gating, order attribution and automatic P&L refresh.

create table if not exists public.payment_routes (
  id uuid primary key default gen_random_uuid(),
  service_offer_id uuid not null unique references public.service_offers(id) on delete cascade,
  provider text not null default 'stripe' check (provider in ('stripe','square','manual')),
  provider_payment_link_id text,
  payment_url text not null,
  checkout_policy text not null default 'instant_after_application'
    check (checkout_policy in ('instant','instant_after_application','manual_after_application','inquiry_only')),
  active boolean not null default true,
  requires_authenticated_user boolean not null default true,
  requires_guardian_for_minor boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists payment_routes_provider_link_uq
  on public.payment_routes(provider,provider_payment_link_id)
  where provider_payment_link_id is not null;
create index if not exists payment_routes_offer_idx on public.payment_routes(service_offer_id);

create table if not exists public.checkout_access_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_user_id uuid not null references auth.users(id) on delete cascade,
  service_offer_id uuid not null references public.service_offers(id) on delete cascade,
  application_id uuid references public.program_applications(id) on delete set null,
  decision text not null check (decision in ('allowed','blocked','inquiry_only','waitlisted')),
  reason text,
  provider_payment_link_id text,
  created_at timestamptz not null default now()
);
create index if not exists checkout_access_logs_user_idx on public.checkout_access_logs(user_id,created_at desc);
create index if not exists checkout_access_logs_subject_idx on public.checkout_access_logs(subject_user_id,created_at desc);
create index if not exists checkout_access_logs_offer_idx on public.checkout_access_logs(service_offer_id,created_at desc);
create index if not exists checkout_access_logs_application_idx on public.checkout_access_logs(application_id);

alter table public.platform_orders
  add column if not exists subject_user_id uuid references auth.users(id),
  add column if not exists application_id uuid references public.program_applications(id),
  add column if not exists event_id uuid references public.events(id);

create index if not exists platform_orders_subject_idx on public.platform_orders(subject_user_id);
create index if not exists platform_orders_application_idx on public.platform_orders(application_id);
create index if not exists platform_orders_event_idx on public.platform_orders(event_id);

alter table public.payment_routes enable row level security;
alter table public.checkout_access_logs enable row level security;

create policy "payment_routes_admin_read" on public.payment_routes
for select to authenticated using (private.is_global_admin());
create policy "payment_routes_admin_insert" on public.payment_routes
for insert to authenticated with check (private.is_global_admin());
create policy "payment_routes_admin_update" on public.payment_routes
for update to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "payment_routes_admin_delete" on public.payment_routes
for delete to authenticated using (private.is_global_admin());

create policy "checkout_access_self_read" on public.checkout_access_logs
for select to authenticated using (
  user_id=(select auth.uid()) or subject_user_id=(select auth.uid()) or private.is_global_admin()
);

-- Payment links already exist in the RBA Stripe account. Keep them in an admin-only routing table,
-- not on the public service-offer row, so approval-gated offers cannot be bypassed from the public API.
insert into public.payment_routes(service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,metadata)
select id,'stripe','plink_1UHWhoRXDnnSs6XNpmKzwSUS','https://book.stripe.com/aFa14p5678vy8aN8cn7EQ0b',
       coalesce(metadata->>'checkout_policy','instant_after_application'),
       jsonb_build_object('event','torsten_loibl_online_clinic_vol2','plan','live')
from public.service_offers where slug='torsten-live-vol2'
on conflict(service_offer_id) do update set provider_payment_link_id=excluded.provider_payment_link_id,payment_url=excluded.payment_url,checkout_policy=excluded.checkout_policy,metadata=excluded.metadata,updated_at=now();

insert into public.payment_routes(service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,metadata)
select id,'stripe','plink_1UHWhoRXDnnSs6XNq0bL3Gsf','https://book.stripe.com/bJebJ3dCD6nq9eR9gr7EQ0c',
       coalesce(metadata->>'checkout_policy','instant_after_application'),
       jsonb_build_object('event','torsten_loibl_online_clinic_vol2','plan','ondemand_30days')
from public.service_offers where slug='torsten-ondemand-vol2'
on conflict(service_offer_id) do update set provider_payment_link_id=excluded.provider_payment_link_id,payment_url=excluded.payment_url,checkout_policy=excluded.checkout_policy,metadata=excluded.metadata,updated_at=now();

insert into public.payment_routes(service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,metadata)
select id,'stripe','plink_1UIg5CRXDnnSs6XNJUGgUgGd','https://book.stripe.com/28EcN77ef27a76J1NZ7EQ0o',
       coalesce(metadata->>'checkout_policy','inquiry_only'), jsonb_build_object('rba_offer','team_training_3h')
from public.service_offers where slug='team-training-3h'
on conflict(service_offer_id) do update set provider_payment_link_id=excluded.provider_payment_link_id,payment_url=excluded.payment_url,checkout_policy=excluded.checkout_policy,metadata=excluded.metadata,updated_at=now();

insert into public.payment_routes(service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,metadata)
select id,'stripe','plink_1UIg5JRXDnnSs6XNRMGJcKY4','https://book.stripe.com/28E00l9mn3begHj0JV7EQ0p',
       coalesce(metadata->>'checkout_policy','inquiry_only'), jsonb_build_object('rba_offer','team_training_halfday')
from public.service_offers where slug='team-training-halfday'
on conflict(service_offer_id) do update set provider_payment_link_id=excluded.provider_payment_link_id,payment_url=excluded.payment_url,checkout_policy=excluded.checkout_policy,metadata=excluded.metadata,updated_at=now();

insert into public.payment_routes(service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,metadata)
select id,'stripe','plink_1UIg5RRXDnnSs6XNHlmybplK','https://book.stripe.com/7sY28t4237ruezbgIT7EQ0q',
       coalesce(metadata->>'checkout_policy','inquiry_only'), jsonb_build_object('rba_offer','team_training_fullday')
from public.service_offers where slug='team-training-fullday'
on conflict(service_offer_id) do update set provider_payment_link_id=excluded.provider_payment_link_id,payment_url=excluded.payment_url,checkout_policy=excluded.checkout_policy,metadata=excluded.metadata,updated_at=now();

insert into public.payment_routes(service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,metadata)
select id,'stripe','plink_1UHWhqRXDnnSs6XNowdmBvZd','https://book.stripe.com/fZu7sN2XZ9zC9eRakv7EQ0e',
       coalesce(metadata->>'checkout_policy','manual_after_application'),
       jsonb_build_object('event','saga_fukuoka_2days_2026','plan','camp_fee')
from public.service_offers where slug='saga-fukuoka-2026'
on conflict(service_offer_id) do update set provider_payment_link_id=excluded.provider_payment_link_id,payment_url=excluded.payment_url,checkout_policy=excluded.checkout_policy,metadata=excluded.metadata,updated_at=now();

insert into public.payment_routes(service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,metadata)
select id,'stripe','plink_1UHWhrRXDnnSs6XN7PeWIRoT','https://book.stripe.com/9B67sN4233be76Jakv7EQ0f',
       coalesce(metadata->>'checkout_policy','instant_after_application'),
       jsonb_build_object('event','yamagata_1day_2026','plan','clinic_fee')
from public.service_offers where slug='yamagata-1day-2026'
on conflict(service_offer_id) do update set provider_payment_link_id=excluded.provider_payment_link_id,payment_url=excluded.payment_url,checkout_policy=excluded.checkout_policy,metadata=excluded.metadata,updated_at=now();

insert into public.payment_routes(service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,metadata)
select id,'stripe','plink_1UHWhuRXDnnSs6XNFVtuDYoQ','https://book.stripe.com/00wdRbeGHh248aN0JV7EQ0i',
       coalesce(metadata->>'checkout_policy','manual_after_application'),
       jsonb_build_object('event','shizugawa_camp_2026','plan','camp_fee')
from public.service_offers where slug='shizugawa-2026'
on conflict(service_offer_id) do update set provider_payment_link_id=excluded.provider_payment_link_id,payment_url=excluded.payment_url,checkout_policy=excluded.checkout_policy,metadata=excluded.metadata,updated_at=now();

insert into public.payment_routes(service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,metadata)
select id,'stripe','plink_1UHWhsRXDnnSs6XNIm0TDCQG','https://book.stripe.com/00w00l5678vyezbakv7EQ0g',
       coalesce(metadata->>'checkout_policy','instant_after_application'),
       jsonb_build_object('event','kobe_camp_2026','plan','half_day_plus_friday')
from public.service_offers where slug='kobe-half-friday-2026'
on conflict(service_offer_id) do update set provider_payment_link_id=excluded.provider_payment_link_id,payment_url=excluded.payment_url,checkout_policy=excluded.checkout_policy,metadata=excluded.metadata,updated_at=now();

insert into public.payment_routes(service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,metadata)
select id,'stripe','plink_1UHWhtRXDnnSs6XNCJECwnxT','https://book.stripe.com/00waEZ423bHKaiVeAL7EQ0h',
       coalesce(metadata->>'checkout_policy','instant_after_application'),
       jsonb_build_object('event','kobe_camp_2026','plan','one_day_plus_friday')
from public.service_offers where slug='kobe-one-friday-2026'
on conflict(service_offer_id) do update set provider_payment_link_id=excluded.provider_payment_link_id,payment_url=excluded.payment_url,checkout_policy=excluded.checkout_policy,metadata=excluded.metadata,updated_at=now();

insert into public.payment_routes(service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,metadata)
select id,'stripe','plink_1UHWhvRXDnnSs6XNMb4sYXTM','https://book.stripe.com/dRmdRb7ef1364YB64f7EQ0j',
       coalesce(metadata->>'checkout_policy','instant_after_application'),
       jsonb_build_object('event','kobe_camp_2026','plan','two_days_plus_friday')
from public.service_offers where slug='kobe-two-friday-2026'
on conflict(service_offer_id) do update set provider_payment_link_id=excluded.provider_payment_link_id,payment_url=excluded.payment_url,checkout_policy=excluded.checkout_policy,metadata=excluded.metadata,updated_at=now();

insert into public.payment_routes(service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,metadata)
select id,'stripe','plink_1UHWhyRXDnnSs6XNCR52DHsL','https://book.stripe.com/bJe8wRgOPfY0cr3dwH7EQ0m',
       coalesce(metadata->>'checkout_policy','instant_after_application'),
       jsonb_build_object('event','kobe_camp_2026','plan','three_days_plus_friday')
from public.service_offers where slug='kobe-three-friday-2026'
on conflict(service_offer_id) do update set provider_payment_link_id=excluded.provider_payment_link_id,payment_url=excluded.payment_url,checkout_policy=excluded.checkout_policy,metadata=excluded.metadata,updated_at=now();

insert into public.payment_routes(service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,metadata)
select id,'stripe','plink_1UHWhxRXDnnSs6XNOWTr3qj1','https://book.stripe.com/cNi7sN5675jm62FeAL7EQ0l',
       coalesce(metadata->>'checkout_policy','manual_after_application'),
       jsonb_build_object('event','kobe_camp_2026','plan','two_days_one_night_plus_friday')
from public.service_offers where slug='kobe-2d1n-friday-2026'
on conflict(service_offer_id) do update set provider_payment_link_id=excluded.provider_payment_link_id,payment_url=excluded.payment_url,checkout_policy=excluded.checkout_policy,metadata=excluded.metadata,updated_at=now();

insert into public.payment_routes(service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,metadata)
select id,'stripe','plink_1UHWhwRXDnnSs6XNryF5jkeE','https://book.stripe.com/bJe28tbuv8vydv764f7EQ0k',
       coalesce(metadata->>'checkout_policy','manual_after_application'),
       jsonb_build_object('event','kobe_camp_2026','plan','full_camp_plus_friday')
from public.service_offers where slug='kobe-full-friday-2026'
on conflict(service_offer_id) do update set provider_payment_link_id=excluded.provider_payment_link_id,payment_url=excluded.payment_url,checkout_policy=excluded.checkout_policy,metadata=excluded.metadata,updated_at=now();

-- Keep payment URL off published offer rows for gated flows.
update public.service_offers set external_payment_url=null where id in (select service_offer_id from public.payment_routes);

-- Automatic event financial closeout from the immutable transaction ledger.
create or replace function public.refresh_event_financials(p_event_id uuid)
returns void
language plpgsql
security definer
set search_path=''
as $$
declare
  revenue bigint;
  refunds bigint;
  participants_count integer;
  cancelled_count integer;
begin
  select
    coalesce(sum(case when l.transaction_type='charge' and l.status='succeeded' then l.amount else 0 end),0),
    coalesce(sum(case when l.transaction_type='refund' and l.status in ('succeeded','pending') then l.amount else 0 end),0)
  into revenue,refunds
  from public.transaction_ledger l
  join public.platform_orders o on o.id=l.order_id
  where o.event_id=p_event_id;

  select count(*) filter (where payment_status='paid'),
         count(*) filter (where attendance_status='cancelled')
  into participants_count,cancelled_count
  from public.participations
  where event_id=p_event_id;

  insert into public.event_financials(event_id,actual_revenue_jpy,refunds_jpy,paid_participants,cancellations)
  values(p_event_id,revenue,refunds,participants_count,cancelled_count)
  on conflict(event_id) do update set
    actual_revenue_jpy=excluded.actual_revenue_jpy,
    refunds_jpy=excluded.refunds_jpy,
    paid_participants=excluded.paid_participants,
    cancellations=excluded.cancellations,
    updated_at=now();
end;
$$;

revoke all on function public.refresh_event_financials(uuid) from public,anon,authenticated;

create or replace function public.trg_refresh_event_financials()
returns trigger
language plpgsql
security definer
set search_path=''
as $$
declare
  ev uuid;
begin
  select event_id into ev
  from public.platform_orders
  where id=coalesce(new.order_id,old.order_id);
  if ev is not null then
    perform public.refresh_event_financials(ev);
  end if;
  return coalesce(new,old);
end;
$$;
revoke all on function public.trg_refresh_event_financials() from public,anon,authenticated;

drop trigger if exists trg_ledger_refresh_event_financials on public.transaction_ledger;
create trigger trg_ledger_refresh_event_financials
after insert or update or delete on public.transaction_ledger
for each row execute function public.trg_refresh_event_financials();

