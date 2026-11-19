-- RIZEHOPE 2027: private-by-default payment and capacity ledger.
-- All teams, including overseas and a formally accepted RBA UNITED, count against 10.
-- Jotform submissions must be reconciled by an authorised RBA admin; none are automatically paid.
create table if not exists public.rizehope_2027_team_entries (
  id uuid primary key default gen_random_uuid(),
  event_key text not null default 'rizehope_japan_2027' check (event_key = 'rizehope_japan_2027'),
  category text not null check (category in ('japan', 'overseas', 'united')),
  team_name text not null check (char_length(team_name) between 2 and 160),
  region text not null check (char_length(region) between 1 and 120),
  team_key text not null check (char_length(team_key) between 2 and 280),
  adult_representative text not null check (char_length(adult_representative) between 2 and 160),
  representative_email text not null check (char_length(representative_email) between 4 and 250),
  source_form_id text not null,
  source_submission_id text not null,
  source_submitted_at timestamptz not null,
  status text not null default 'inquiry'
    check (status in ('inquiry','reviewing','waitlisted','approved_pending_deposit',
                     'deposit_paid','balance_requested','confirmed','declined','withdrawn','cancelled')),
  terms_version text,
  terms_accepted_at timestamptz,
  stripe_deposit_checkout_session_id text unique,
  stripe_deposit_payment_intent_id text unique,
  stripe_balance_checkout_session_id text unique,
  stripe_balance_payment_intent_id text unique,
  deposit_paid_at timestamptz,
  balance_paid_at timestamptz,
  accepted_at timestamptz,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (source_form_id, source_submission_id),
  unique (event_key, category, team_key),
  check (deposit_paid_at is null or stripe_deposit_payment_intent_id is not null),
  check (balance_paid_at is null or (deposit_paid_at is not null and stripe_balance_payment_intent_id is not null))
);
create index if not exists rizehope_2027_entries_status_idx
  on public.rizehope_2027_team_entries (status, source_submitted_at, id);
create table if not exists public.rizehope_2027_capacity (
  event_key text primary key check (event_key = 'rizehope_japan_2027'),
  max_teams smallint not null default 10 check (max_teams = 10),
  updated_at timestamptz not null default now()
);
insert into public.rizehope_2027_capacity(event_key,max_teams)
  values('rizehope_japan_2027',10) on conflict(event_key) do nothing;
create table if not exists public.rizehope_2027_payment_audit (
  id bigint generated always as identity primary key,
  entry_id uuid not null references public.rizehope_2027_team_entries(id),
  action text not null,
  actor uuid,
  stripe_event_id text unique,
  payment_intent_id text,
  amount_jpy integer,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists rizehope_2027_payment_audit_entry_idx
  on public.rizehope_2027_payment_audit(entry_id,created_at);

alter table public.rizehope_2027_team_entries enable row level security;
alter table public.rizehope_2027_capacity enable row level security;
alter table public.rizehope_2027_payment_audit enable row level security;
revoke all on public.rizehope_2027_team_entries from public, anon, authenticated;
revoke all on public.rizehope_2027_capacity from public, anon, authenticated;
revoke all on public.rizehope_2027_payment_audit from public, anon, authenticated;
grant select on public.rizehope_2027_team_entries to authenticated;
grant select on public.rizehope_2027_capacity to authenticated;
grant select on public.rizehope_2027_payment_audit to authenticated;
grant all on public.rizehope_2027_team_entries to service_role;
grant all on public.rizehope_2027_capacity to service_role;
grant all on public.rizehope_2027_payment_audit to service_role;
grant usage, select on sequence public.rizehope_2027_payment_audit_id_seq to service_role;

create policy rizehope_2027_entries_admin_read
  on public.rizehope_2027_team_entries for select to authenticated
  using ((select private.is_global_admin()));
create policy rizehope_2027_capacity_admin_read
  on public.rizehope_2027_capacity for select to authenticated
  using ((select private.is_global_admin()));
create policy rizehope_2027_audit_admin_read
  on public.rizehope_2027_payment_audit for select to authenticated
  using ((select private.is_global_admin()));

-- Adult team leader data enters only through a restricted, reviewed administrator action.
-- Import is idempotent by originating form/submission ID; old interest registrations
-- are kept separate from actual approved tournament entries.
create or replace function public.rizehope_2027_import_entry(
  p_category text,
  p_team_name text,
  p_region text,
  p_adult_representative text,
  p_representative_email text,
  p_source_form_id text,
  p_source_submission_id text,
  p_source_submitted_at timestamptz
) returns uuid language plpgsql security definer set search_path = '' as $$
declare
  v_id uuid;
  v_key text;
begin
  if not private.is_global_admin() then raise exception 'forbidden' using errcode='42501'; end if;
  if p_category not in ('japan','overseas','united') then raise exception 'invalid_category'; end if;
  if p_source_submitted_at is null or p_source_submitted_at > now() + interval '5 minutes' then raise exception 'invalid_submission_time'; end if;
  if p_source_form_id is null or char_length(p_source_form_id) < 8 or
     p_source_submission_id is null or char_length(p_source_submission_id) < 8 then
    raise exception 'missing_original_form_reference';
  end if;
  v_key := pg_catalog.regexp_replace(pg_catalog.lower(pg_catalog.btrim(p_team_name || '|' || p_region)),
                                       '[[:space:][:punct:]]+', '', 'g');
  insert into public.rizehope_2027_team_entries(
    category,team_name,region,team_key,adult_representative,representative_email,
    source_form_id,source_submission_id,source_submitted_at
  ) values (
    p_category,pg_catalog.btrim(p_team_name),pg_catalog.btrim(p_region),v_key,
    pg_catalog.btrim(p_adult_representative),pg_catalog.lower(pg_catalog.btrim(p_representative_email)),
    p_source_form_id,p_source_submission_id,p_source_submitted_at
  )
  on conflict (source_form_id,source_submission_id) do nothing
  returning id into v_id;
  if v_id is null then
    select id into v_id from public.rizehope_2027_team_entries
      where source_form_id=p_source_form_id and source_submission_id=p_source_submission_id;
  end if;
  return v_id;
end $$;
revoke all on function public.rizehope_2027_import_entry(text,text,text,text,text,text,text,timestamptz)
  from public, anon, authenticated;
grant execute on function public.rizehope_2027_import_entry(text,text,text,text,text,text,text,timestamptz)
  to authenticated;

-- A single capacity row lock serializes ALL approvals, including overseas and UNITED.
-- Approved teams hold a slot before any payment link can be issued.
create or replace function public.rizehope_2027_accept_team(p_entry_id uuid,p_terms_version text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  v_entry public.rizehope_2027_team_entries;
  v_max int;
  v_held int;
begin
  if not private.is_global_admin() then raise exception 'forbidden' using errcode='42501'; end if;
  if p_terms_version is null or pg_catalog.char_length(p_terms_version) < 5 then
    raise exception 'terms_version_required';
  end if;
  select max_teams into v_max from public.rizehope_2027_capacity
    where event_key='rizehope_japan_2027' for update;
  if not found then raise exception 'capacity_unavailable'; end if;
  select * into v_entry from public.rizehope_2027_team_entries
    where id=p_entry_id for update;
  if not found then raise exception 'entry_not_found'; end if;
  if v_entry.status='approved_pending_deposit' then return pg_catalog.to_jsonb(v_entry); end if;
  if v_entry.status not in ('inquiry','reviewing','waitlisted') then raise exception 'invalid_transition'; end if;
  select count(*) into v_held from public.rizehope_2027_team_entries
    where status in ('approved_pending_deposit','deposit_paid','balance_requested','confirmed');
  if v_held >= v_max then raise exception 'ten_team_capacity_full'; end if;
  update public.rizehope_2027_team_entries
    set status='approved_pending_deposit',terms_version=p_terms_version,
        accepted_at=now(),updated_at=now()
    where id=p_entry_id returning * into v_entry;
  insert into public.rizehope_2027_payment_audit(entry_id,action,actor,details)
    values(p_entry_id,'accepted_pending_deposit',auth.uid(),pg_catalog.jsonb_build_object('terms_version',p_terms_version));
  return pg_catalog.to_jsonb(v_entry);
end $$;
revoke all on function public.rizehope_2027_accept_team(uuid,text) from public, anon, authenticated;
grant execute on function public.rizehope_2027_accept_team(uuid,text) to authenticated;

-- Deposit/balance updates ONLY after a Stripe-signed event has been verified server-side.
-- In particular, do not trust a Jotform submission or checkout success redirect.
create or replace function public.rizehope_2027_record_verified_payment(
  p_entry_id uuid,p_stage text,p_session_id text,p_payment_intent_id text,
  p_stripe_event_id text,p_amount_jpy int,p_currency text,p_livemode boolean
) returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  v_entry public.rizehope_2027_team_entries;
  v_existing public.rizehope_2027_payment_audit;
begin
  -- EXECUTE is granted only to service_role; security definer runs as its owner.
  if not p_livemode or p_amount_jpy <> 33000 or pg_catalog.lower(p_currency) <> 'jpy' or
     p_stage not in ('deposit','balance') or
     coalesce(pg_catalog.length(p_session_id),0) < 5 or
     coalesce(pg_catalog.length(p_payment_intent_id),0) < 5 or
     coalesce(pg_catalog.length(p_stripe_event_id),0) < 5 then
    raise exception 'unverified_payment_payload';
  end if;
  select * into v_existing from public.rizehope_2027_payment_audit
    where stripe_event_id=p_stripe_event_id;
  if found then
    if v_existing.entry_id <> p_entry_id then raise exception 'reused_event_for_another_team'; end if;
    select * into v_entry from public.rizehope_2027_team_entries where id=p_entry_id;
    return pg_catalog.to_jsonb(v_entry);
  end if;
  select * into v_entry from public.rizehope_2027_team_entries where id=p_entry_id for update;
  if not found or v_entry.category <> 'japan' then raise exception 'domestic_entry_not_found'; end if;
  if p_stage='deposit' then
    if v_entry.status<>'approved_pending_deposit' or v_entry.stripe_deposit_payment_intent_id is not null then
      raise exception 'deposit_not_expected';
    end if;
    update public.rizehope_2027_team_entries
      set stripe_deposit_checkout_session_id=p_session_id,
          stripe_deposit_payment_intent_id=p_payment_intent_id,
          deposit_paid_at=now(),status='deposit_paid',updated_at=now()
      where id=p_entry_id returning * into v_entry;
  else
    if v_entry.status not in ('deposit_paid','balance_requested') or
       v_entry.stripe_balance_payment_intent_id is not null then
      raise exception 'balance_not_expected';
    end if;
    update public.rizehope_2027_team_entries
      set stripe_balance_checkout_session_id=p_session_id,
          stripe_balance_payment_intent_id=p_payment_intent_id,
          balance_paid_at=now(),status='confirmed',updated_at=now()
      where id=p_entry_id returning * into v_entry;
  end if;
  insert into public.rizehope_2027_payment_audit
    (entry_id,action,stripe_event_id,payment_intent_id,amount_jpy,details)
    values(p_entry_id,'stripe_'||p_stage||'_paid',p_stripe_event_id,
           p_payment_intent_id,p_amount_jpy,
           pg_catalog.jsonb_build_object('stripe_checkout_session',p_session_id));
  return pg_catalog.to_jsonb(v_entry);
end $$;
revoke all on function public.rizehope_2027_record_verified_payment(uuid,text,text,text,text,int,text,boolean)
  from public, anon, authenticated;
grant execute on function public.rizehope_2027_record_verified_payment(uuid,text,text,text,text,int,text,boolean)
  to service_role;
