-- Record documentary consent for exact event terms, not merely a checked box in an inquiry.
-- Approval of an entry and actual representative acceptance are distinct steps.
create or replace function public.rizehope_2027_record_terms_acceptance(
  p_entry_id uuid, p_terms_version text, p_evidence_reference text
) returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_entry public.rizehope_2027_team_entries;
begin
  if not private.is_global_admin() then raise exception 'forbidden' using errcode='42501'; end if;
  if coalesce(pg_catalog.length(p_terms_version),0) < 5 or
     coalesce(pg_catalog.length(p_evidence_reference),0) < 10 then
    raise exception 'documented_consent_evidence_required';
  end if;
  select * into v_entry from public.rizehope_2027_team_entries where id=p_entry_id for update;
  if not found or v_entry.status <> 'approved_pending_deposit' or
     v_entry.terms_version is distinct from p_terms_version then
    raise exception 'unapproved_or_terms_mismatch';
  end if;
  if v_entry.terms_accepted_at is not null then
    return pg_catalog.to_jsonb(v_entry);
  end if;
  update public.rizehope_2027_team_entries
    set terms_accepted_at=now(),updated_at=now()
    where id=p_entry_id returning * into v_entry;
  insert into public.rizehope_2027_payment_audit(entry_id,action,actor,details)
    values(p_entry_id,'representative_terms_acceptance_evidence',
           auth.uid(),pg_catalog.jsonb_build_object(
             'terms_version',p_terms_version,'evidence_reference',p_evidence_reference));
  return pg_catalog.to_jsonb(v_entry);
end $$;
revoke all on function public.rizehope_2027_record_terms_acceptance(uuid,text,text)
  from public, anon, authenticated;
grant execute on function public.rizehope_2027_record_terms_acceptance(uuid,text,text) to authenticated;
