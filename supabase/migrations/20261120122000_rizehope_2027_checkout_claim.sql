-- Prevent multiple live hosted checkouts per team and payment stage.
-- An expired session must be reconciled with Stripe before an operator may reset it.
create or replace function public.rizehope_2027_record_checkout_session(
  p_entry_id uuid,p_stage text,p_session_id text
) returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_entry public.rizehope_2027_team_entries;
begin
  if not private.is_global_admin() then raise exception 'forbidden' using errcode='42501'; end if;
  if coalesce(p_stage,'') not in ('deposit','balance') or
    coalesce(pg_catalog.length(p_session_id),0) < 5 then
    raise exception 'invalid_checkout_session';
  end if;
  select * into v_entry from public.rizehope_2027_team_entries where id=p_entry_id for update;
  if not found or v_entry.category <> 'japan' or v_entry.terms_accepted_at is null then
    raise exception 'team_not_approved_or_terms_not_accepted';
  end if;
  if p_stage='deposit' then
    if v_entry.status <> 'approved_pending_deposit' then raise exception 'not_awaiting_deposit'; end if;
    if v_entry.stripe_deposit_checkout_session_id is not null then
      if v_entry.stripe_deposit_checkout_session_id=p_session_id then
        return pg_catalog.to_jsonb(v_entry);
      end if;
      raise exception 'existing_deposit_checkout_requires_stripe_reconciliation';
    end if;
    update public.rizehope_2027_team_entries
      set stripe_deposit_checkout_session_id=p_session_id,updated_at=now()
      where id=p_entry_id returning * into v_entry;
  else
    if v_entry.status not in ('deposit_paid','balance_requested') then
      raise exception 'deposit_not_paid_or_balance_not_due';
    end if;
    if v_entry.stripe_balance_checkout_session_id is not null then
      if v_entry.stripe_balance_checkout_session_id=p_session_id then
        return pg_catalog.to_jsonb(v_entry);
      end if;
      raise exception 'existing_balance_checkout_requires_stripe_reconciliation';
    end if;
    update public.rizehope_2027_team_entries
      set stripe_balance_checkout_session_id=p_session_id,status='balance_requested',
          updated_at=now()
      where id=p_entry_id returning * into v_entry;
  end if;
  insert into public.rizehope_2027_payment_audit(entry_id,action,actor,details)
    values(p_entry_id,'checkout_created_'||p_stage,auth.uid(),
      pg_catalog.jsonb_build_object('session_id',p_session_id));
  return pg_catalog.to_jsonb(v_entry);
end $$;
revoke all on function public.rizehope_2027_record_checkout_session(uuid,text,text)
  from public,anon,authenticated;
grant execute on function public.rizehope_2027_record_checkout_session(uuid,text,text)
  to authenticated;
