-- RIZEHOPE JAPAN 2027: PRIVATE ledger for RBA UNITED selected individual players.
-- Does not reserve a team slot per player. Team capacity remains a separate, shared 10-team ledger.
-- Financial actions remain disabled at application and environment level until final signed terms.

create table if not exists public.rizehope_2027_united_players (
 id uuid primary key default gen_random_uuid(),
 event_key text not null default 'rizehope_japan_2027' check (event_key='rizehope_japan_2027'),
 team_entry_id uuid references public.rizehope_2027_team_entries(id),
 guardian_name text not null check (char_length(guardian_name) between 2 and 160),
 guardian_email text not null check (char_length(guardian_email) between 4 and 250),
 region text not null check (char_length(region) between 1 and 120),
 source_form_id text not null check (source_form_id='263221266794057'),
 source_submission_id text not null,
 source_submitted_at timestamptz not null,
 status text not null default 'interest' check (status in
  ('interest','reviewing','selected','approved_pending_deposit','deposit_paid','balance_requested','confirmed','declined','withdrawn','cancelled')),
 terms_version text,
 terms_evidence_reference text,
 terms_accepted_at timestamptz,
 total_jpy integer,
 deposit_jpy integer,
 balance_jpy integer,
 stripe_deposit_checkout_session_id text unique,
 stripe_balance_checkout_session_id text unique,
 stripe_deposit_payment_intent_id text unique,
 stripe_balance_payment_intent_id text unique,
 deposit_paid_at timestamptz,
 balance_paid_at timestamptz,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 unique(source_form_id,source_submission_id),
 check ((total_jpy is null and deposit_jpy is null and balance_jpy is null) or
        (total_jpy>0 and deposit_jpy>0 and balance_jpy>0 and deposit_jpy+balance_jpy=total_jpy)),
 check (deposit_paid_at is null or stripe_deposit_payment_intent_id is not null),
 check (balance_paid_at is null or
       (deposit_paid_at is not null and stripe_balance_payment_intent_id is not null))
);
create index if not exists rizehope_united_status_idx
 on public.rizehope_2027_united_players(status,source_submitted_at);

create table if not exists public.rizehope_2027_united_payment_audit (
 id bigint generated always as identity primary key,
 player_entry_id uuid not null references public.rizehope_2027_united_players(id),
 action text not null,
 actor uuid,
 stripe_event_id text unique,
 payment_intent_id text,
 amount_jpy integer,
 details jsonb not null default '{}'::jsonb,
 created_at timestamptz not null default now()
);

alter table public.rizehope_2027_united_players enable row level security;
alter table public.rizehope_2027_united_payment_audit enable row level security;
revoke all on public.rizehope_2027_united_players from public,anon,authenticated;
revoke all on public.rizehope_2027_united_payment_audit from public,anon,authenticated;
grant select on public.rizehope_2027_united_players to authenticated;
grant select on public.rizehope_2027_united_payment_audit to authenticated;
grant all on public.rizehope_2027_united_players to service_role;
grant all on public.rizehope_2027_united_payment_audit to service_role;
grant usage,select on sequence public.rizehope_2027_united_payment_audit_id_seq to service_role;
create policy rizehope_united_private_admin_read
 on public.rizehope_2027_united_players for select to authenticated
 using ((select private.is_global_admin()));
create policy rizehope_united_private_audit_admin_read
 on public.rizehope_2027_united_payment_audit for select to authenticated
 using ((select private.is_global_admin()));

create or replace function public.rizehope_2027_united_import_interest(
 p_form_id text,p_submission_id text,p_submitted_at timestamptz,
 p_guardian_name text,p_guardian_email text,p_region text
) returns uuid language plpgsql security definer set search_path='' as $$
declare v_id uuid;
begin
 if not private.is_global_admin() then raise exception 'forbidden' using errcode='42501'; end if;
 if p_form_id is distinct from '263221266794057' or
    coalesce(pg_catalog.length(p_submission_id),0)<8 or
    p_submitted_at is null or p_submitted_at>now()+interval '5 minutes' then
    raise exception 'invalid_source';
 end if;
 if pg_catalog.length(pg_catalog.btrim(p_guardian_name))<2 or
    pg_catalog.length(pg_catalog.btrim(p_guardian_email))<4 or
    pg_catalog.length(pg_catalog.btrim(p_region))<1 then
    raise exception 'missing_guardian_info';
 end if;
 insert into public.rizehope_2027_united_players (
  source_form_id,source_submission_id,source_submitted_at,guardian_name,guardian_email,region
 ) values (
  p_form_id,p_submission_id,p_submitted_at,
  pg_catalog.btrim(p_guardian_name),pg_catalog.lower(pg_catalog.btrim(p_guardian_email)),
  pg_catalog.btrim(p_region)
 ) on conflict (source_form_id,source_submission_id) do nothing returning id into v_id;
 if v_id is null then
  select id into v_id from public.rizehope_2027_united_players
   where source_form_id=p_form_id and source_submission_id=p_submission_id;
 end if;
 return v_id;
end $$;
revoke all on function public.rizehope_2027_united_import_interest(text,text,timestamptz,text,text,text)
 from public,anon,authenticated;
grant execute on function public.rizehope_2027_united_import_interest(text,text,timestamptz,text,text,text)
 to authenticated;

-- Only a genuine, approved UNITED TEAM counts as one team in the global capacity.
-- Individual players may be offered a fee only once this team is approved.
create or replace function public.rizehope_2027_united_select_player(
 p_player_id uuid,p_team_entry_id uuid,p_terms_version text,
 p_total_jpy integer,p_deposit_jpy integer,p_balance_jpy integer
) returns jsonb language plpgsql security definer set search_path='' as $$
declare v_player public.rizehope_2027_united_players;
        v_team public.rizehope_2027_team_entries;
begin
 if not private.is_global_admin() then raise exception 'forbidden' using errcode='42501'; end if;
 if p_total_jpy is null or p_total_jpy<1 or p_deposit_jpy is null or p_deposit_jpy<1 or
    p_balance_jpy is null or p_balance_jpy<1 or
    p_total_jpy<>p_deposit_jpy+p_balance_jpy or
    coalesce(pg_catalog.length(p_terms_version),0)<5 then
   raise exception 'individual_price_and_terms_required';
 end if;
 select * into v_team from public.rizehope_2027_team_entries
   where id=p_team_entry_id for update;
 if not found or v_team.category<>'united' or v_team.status not in
  ('approved_pending_deposit','deposit_paid','balance_requested','confirmed') then
   raise exception 'united_team_not_approved';
 end if;
 select * into v_player from public.rizehope_2027_united_players
  where id=p_player_id for update;
 if not found or v_player.status not in ('interest','reviewing') then
   raise exception 'player_not_eligible_for_selection';
 end if;
 update public.rizehope_2027_united_players
  set team_entry_id=p_team_entry_id,status='selected',
      total_jpy=p_total_jpy,deposit_jpy=p_deposit_jpy,balance_jpy=p_balance_jpy,
      terms_version=p_terms_version,updated_at=now()
  where id=p_player_id returning * into v_player;
 insert into public.rizehope_2027_united_payment_audit
  (player_entry_id,action,actor,details) values
  (p_player_id,'selected_without_payment',auth.uid(),
   pg_catalog.jsonb_build_object('terms_version',p_terms_version,'total_jpy',p_total_jpy));
 return pg_catalog.to_jsonb(v_player);
end $$;
revoke all on function public.rizehope_2027_united_select_player(uuid,uuid,text,integer,integer,integer)
 from public,anon,authenticated;
grant execute on function public.rizehope_2027_united_select_player(uuid,uuid,text,integer,integer,integer)
 to authenticated;

create or replace function public.rizehope_2027_united_record_guardian_terms(
 p_player_id uuid,p_terms_version text,p_evidence_reference text
) returns jsonb language plpgsql security definer set search_path='' as $$
declare v_player public.rizehope_2027_united_players;
begin
 if not private.is_global_admin() then raise exception 'forbidden' using errcode='42501'; end if;
 if coalesce(pg_catalog.length(p_evidence_reference),0)<10 then
   raise exception 'documentary_guardian_consent_required';
 end if;
 select * into v_player from public.rizehope_2027_united_players
  where id=p_player_id for update;
 if not found or v_player.status<>'selected' or
    v_player.terms_version is distinct from p_terms_version then
   raise exception 'selection_or_terms_mismatch';
 end if;
 update public.rizehope_2027_united_players
  set status='approved_pending_deposit',terms_evidence_reference=p_evidence_reference,
      terms_accepted_at=now(),updated_at=now()
  where id=p_player_id returning * into v_player;
 insert into public.rizehope_2027_united_payment_audit
  (player_entry_id,action,actor,details) values
  (p_player_id,'guardian_written_terms_accepted',auth.uid(),
   pg_catalog.jsonb_build_object('terms_version',p_terms_version,
                                 'evidence_reference',p_evidence_reference));
 return pg_catalog.to_jsonb(v_player);
end $$;
revoke all on function public.rizehope_2027_united_record_guardian_terms(uuid,text,text)
 from public,anon,authenticated;
grant execute on function public.rizehope_2027_united_record_guardian_terms(uuid,text,text)
 to authenticated;

create or replace function public.rizehope_2027_united_claim_checkout(
 p_player_id uuid,p_stage text,p_session_id text
) returns jsonb language plpgsql security definer set search_path='' as $$
declare v_player public.rizehope_2027_united_players;
begin
 if not private.is_global_admin() then raise exception 'forbidden' using errcode='42501'; end if;
 if p_stage not in ('deposit','balance') or coalesce(pg_catalog.length(p_session_id),0)<5 then
   raise exception 'invalid_checkout_claim';
 end if;
 select * into v_player from public.rizehope_2027_united_players
  where id=p_player_id for update;
 if not found or v_player.terms_accepted_at is null or v_player.team_entry_id is null then
   raise exception 'unaccepted_guardian_or_missing_team';
 end if;
 if p_stage='deposit' then
   if v_player.status<>'approved_pending_deposit' or
      v_player.stripe_deposit_checkout_session_id is not null then
     raise exception 'deposit_not_due_or_checkout_exists';
   end if;
   update public.rizehope_2027_united_players
    set stripe_deposit_checkout_session_id=p_session_id,updated_at=now()
    where id=p_player_id returning * into v_player;
 else
   if v_player.status not in ('deposit_paid','balance_requested') or
      v_player.stripe_balance_checkout_session_id is not null then
     raise exception 'balance_not_due_or_checkout_exists';
   end if;
   update public.rizehope_2027_united_players
    set stripe_balance_checkout_session_id=p_session_id,
        status='balance_requested',updated_at=now()
    where id=p_player_id returning * into v_player;
 end if;
 insert into public.rizehope_2027_united_payment_audit
  (player_entry_id,action,actor,details)
  values(p_player_id,'checkout_issued_'||p_stage,auth.uid(),
         pg_catalog.jsonb_build_object('checkout_session_id',p_session_id));
 return pg_catalog.to_jsonb(v_player);
end $$;
revoke all on function public.rizehope_2027_united_claim_checkout(uuid,text,text)
 from public,anon,authenticated;
grant execute on function public.rizehope_2027_united_claim_checkout(uuid,text,text)
 to authenticated;

-- This function is callable only by service_role after the route verifies Stripe signature.
create or replace function public.rizehope_2027_united_record_verified_payment(
 p_player_id uuid,p_stage text,p_session_id text,p_payment_intent_id text,
 p_stripe_event_id text,p_amount_jpy integer,p_currency text,p_livemode boolean
) returns jsonb language plpgsql security definer set search_path='' as $$
declare v_player public.rizehope_2027_united_players;
        v_event public.rizehope_2027_united_payment_audit;
begin
 if p_livemode is distinct from true or coalesce(pg_catalog.lower(p_currency),'')<>'jpy' or
    p_stage not in ('deposit','balance') or
    coalesce(pg_catalog.length(p_payment_intent_id),0)<5 or
    coalesce(pg_catalog.length(p_session_id),0)<5 or
    coalesce(pg_catalog.length(p_stripe_event_id),0)<5 then
    raise exception 'unverified_payment_payload';
 end if;
 select * into v_event from public.rizehope_2027_united_payment_audit
  where stripe_event_id=p_stripe_event_id;
 if found then
   if v_event.player_entry_id<>p_player_id then
     raise exception 'stripe_event_reused_for_other_player';
   end if;
   select * into v_player from public.rizehope_2027_united_players where id=p_player_id;
   return pg_catalog.to_jsonb(v_player);
 end if;
 select * into v_player from public.rizehope_2027_united_players
  where id=p_player_id for update;
 if not found or v_player.terms_accepted_at is null or v_player.team_entry_id is null then
   raise exception 'unapproved_player';
 end if;
 if p_stage='deposit' then
   if v_player.status<>'approved_pending_deposit' or
      v_player.stripe_deposit_checkout_session_id is distinct from p_session_id or
      p_amount_jpy is distinct from v_player.deposit_jpy or
      v_player.stripe_deposit_payment_intent_id is not null then
      raise exception 'deposit_does_not_match';
   end if;
   update public.rizehope_2027_united_players
    set stripe_deposit_payment_intent_id=p_payment_intent_id,
        deposit_paid_at=now(),status='deposit_paid',updated_at=now()
    where id=p_player_id returning * into v_player;
 else
   if v_player.status not in ('deposit_paid','balance_requested') or
      v_player.deposit_paid_at is null or
      v_player.stripe_balance_checkout_session_id is distinct from p_session_id or
      p_amount_jpy is distinct from v_player.balance_jpy or
      v_player.stripe_balance_payment_intent_id is not null then
      raise exception 'balance_does_not_match';
   end if;
   update public.rizehope_2027_united_players
    set stripe_balance_payment_intent_id=p_payment_intent_id,
        balance_paid_at=now(),status='confirmed',updated_at=now()
    where id=p_player_id returning * into v_player;
 end if;
 insert into public.rizehope_2027_united_payment_audit
  (player_entry_id,action,stripe_event_id,payment_intent_id,amount_jpy,details)
 values(p_player_id,'stripe_'||p_stage||'_paid',p_stripe_event_id,
        p_payment_intent_id,p_amount_jpy,
        pg_catalog.jsonb_build_object('checkout_session_id',p_session_id));
 return pg_catalog.to_jsonb(v_player);
end $$;
revoke all on function public.rizehope_2027_united_record_verified_payment(uuid,text,text,text,text,integer,text,boolean)
 from public,anon,authenticated;
grant execute on function public.rizehope_2027_united_record_verified_payment(uuid,text,text,text,text,integer,text,boolean)
 to service_role;
