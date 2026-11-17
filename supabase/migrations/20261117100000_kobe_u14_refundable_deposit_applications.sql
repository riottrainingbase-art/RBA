create table if not exists public.kobe_u14_deposit_applications (
 id uuid primary key default gen_random_uuid(),
 contact_name text not null check (char_length(contact_name) between 2 and 100),
 contact_email text not null check (char_length(contact_email) between 5 and 200),
 contact_phone text not null check (char_length(contact_phone) between 10 and 18),
 participant_or_team text not null check (char_length(participant_or_team) between 2 and 120),
 affiliation text,
 plan_key text not null check (plan_key in ('individual_jan6','individual_jan7','individual_both','team_jan6','team_jan7','team_both','selected')),
 age_jan2027 integer check (age_jan2027 is null or age_jan2027 between 7 and 19),
 expected_player_count integer check (expected_player_count is null or expected_player_count between 1 and 50),
 adult_supervisor_count integer check (adult_supervisor_count is null or adult_supervisor_count between 1 and 30),
 note text,
 total_jpy integer not null check (total_jpy in (8800,15400,77000,143000,100000)),
 deposit_jpy integer not null,
 balance_jpy integer not null,
 stripe_deposit_link_id text not null,
 stripe_balance_link_id text not null,
 status text not null default 'awaiting_deposit' check (status in ('awaiting_deposit','deposit_paid','balance_approved','fully_paid','refund_pending','refunded','needs_review')),
 stripe_deposit_session_id text unique,
 stripe_deposit_payment_intent_id text unique,
 stripe_balance_session_id text unique,
 stripe_balance_payment_intent_id text unique,
 stripe_paid_email text,
 deposit_paid_at timestamptz,
 balance_paid_at timestamptz,
 refund_completed_at timestamptz,
 refundable_until_final_terms boolean not null default true,
 guardian_authorized boolean not null check(guardian_authorized=true),
 provisional_terms_accepted boolean not null check(provisional_terms_accepted=true),
 privacy_accepted boolean not null check(privacy_accepted=true),
 photo_marketing_consent boolean not null default false,
 terms_version text not null default '2026-11-17-provisional-v1',
 ip_hash text,
 source text not null default 'rba_official_site',
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 constraint kobe_u14_half_due check (deposit_jpy = balance_jpy and total_jpy = deposit_jpy + balance_jpy),
 constraint kobe_u14_plan_price check (
 (plan_key in ('individual_jan6','individual_jan7') and total_jpy=8800 and deposit_jpy=4400) or
 (plan_key = 'individual_both' and total_jpy=15400 and deposit_jpy=7700) or
 (plan_key in ('team_jan6','team_jan7') and total_jpy=77000 and deposit_jpy=38500) or
 (plan_key = 'team_both' and total_jpy=143000 and deposit_jpy=71500) or
 (plan_key = 'selected' and total_jpy=100000 and deposit_jpy=50000)
 )
);
comment on table public.kobe_u14_deposit_applications is 'Service-only provisional U14 Japan x Guam applications. Payment is not participation confirmation; reconcile verified Stripe event and issue refunds when required.';
create index if not exists kobe_u14_app_email_plan_idx on public.kobe_u14_deposit_applications (lower(contact_email),plan_key,created_at desc);
create index if not exists kobe_u14_app_ip_idx on public.kobe_u14_deposit_applications (ip_hash,created_at desc);
create index if not exists kobe_u14_app_status_idx on public.kobe_u14_deposit_applications (status,created_at desc);
alter table public.kobe_u14_deposit_applications enable row level security;
revoke all on table public.kobe_u14_deposit_applications from anon, authenticated, public;
grant all on table public.kobe_u14_deposit_applications to service_role;
