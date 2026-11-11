-- RBA MATCH verified-club pilot, 2026-11-12.
-- Existing exchange posts and interests are empty at this release.
-- Safety gate: an applicant can never self-verify their club; only an RBA
-- operator/admin can approve it. Only approved coaches see open requests.
-- This is NOT a payment intermediary or a minor-to-adult messaging feature.

create or replace function private.rba_match_guard_entity_verification()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  -- Server integration may still manage known records. Public member sessions
  -- cannot impersonate these privileged database roles.
  if current_user in ('postgres','service_role') or
      private.is_global_admin() or private.is_rba_operator() then
    return new;
  end if;

  if tg_op = 'INSERT' then
    if new.status not in ('draft','pending_review')
      or new.verification_status not in ('unverified','pending')
      or new.slug = 'riot-basketball-academy'
    then
      raise exception 'RBA approval is required before a club can be active or verified';
    end if;
  elsif tg_op = 'UPDATE' then
    if new.created_by is distinct from old.created_by
      or new.id is distinct from old.id
      or new.slug is distinct from old.slug
      or new.status is distinct from old.status
      or new.verification_status is distinct from old.verification_status
    then
      raise exception 'Club verification and identity may only be changed by RBA';
    end if;
  end if;
  return new;
end;
$$;

revoke all on function private.rba_match_guard_entity_verification() from public, anon, authenticated;
drop trigger if exists rba_match_entity_approval_guard on public.platform_entities;
create trigger rba_match_entity_approval_guard
before insert or update on public.platform_entities
for each row execute function private.rba_match_guard_entity_verification();

-- RBA operators may review submitted organisations; coaches may see only
-- their own entities and active entities through the pre-existing policy.
drop policy if exists rba_match_operator_entity_read on public.platform_entities;
create policy rba_match_operator_entity_read on public.platform_entities
for select to authenticated
using (private.is_rba_operator() or private.is_global_admin());

drop policy if exists rba_match_operator_entity_approval on public.platform_entities;
create policy rba_match_operator_entity_approval on public.platform_entities
for update to authenticated
using (private.is_rba_operator() or private.is_global_admin())
with check (private.is_rba_operator() or private.is_global_admin());

create or replace function private.rba_match_guard_post()
returns trigger language plpgsql security invoker set search_path = '' as $$
declare
  public_copy text;
begin
  if tg_op = 'UPDATE' and
     (new.entity_id is distinct from old.entity_id or new.created_by is distinct from old.created_by) then
    raise exception 'A match post cannot be transferred to another team';
  end if;

  if length(new.title)>120 or length(coalesce(new.public_note,''))>400
     or length(coalesce(new.purpose,''))>160
     or length(coalesce(new.city_from,''))>90 then
    raise exception 'Match public text exceeds the safe limit';
  end if;

  if new.status = 'open' then
    if new.starts_on is null or new.starts_on < current_date
       or new.age_group not in ('U8','U10','U12','U15','U18','ADULT') then
      raise exception 'Choose a future match date and a supported age group';
    end if;
    if not (
      private.is_global_admin() or private.is_rba_operator() or private.is_approved_coach()
    ) or not exists (
      select 1 from public.platform_entities e
      where e.id = new.entity_id
        and e.status = 'active'
        and e.verification_status = 'verified'
    ) then
      raise exception 'RBA must verify the team and coach before opening a match request';
    end if;
    public_copy := concat_ws(' ',new.title,new.city_from,new.public_note,new.purpose,new.level_note);
    if public_copy ~* '(https?://|www\.|[[:alnum:]._%+-]+@[[:alnum:].-]+\.[[:alpha:]]{2,}|0[0-9]{9,10}|@[-_[:alnum:]]+)' then
      raise exception 'Do not include contact details or links in public match listings';
    end if;
  end if;
  return new;
end;
$$;

revoke all on function private.rba_match_guard_post() from public, anon, authenticated;
drop trigger if exists rba_match_post_open_guard on public.homecourt_exchange_posts;
create trigger rba_match_post_open_guard
before insert or update on public.homecourt_exchange_posts
for each row execute function private.rba_match_guard_post();

-- Approved RBA coaches can browse only verified open opportunities, in
-- addition to their own posts under the existing manager read policy.
drop policy if exists rba_match_approved_coach_open_read on public.homecourt_exchange_posts;
create policy rba_match_approved_coach_open_read on public.homecourt_exchange_posts
for select to authenticated
using (
  status = 'open'
  and (private.is_approved_coach() or private.is_rba_operator() or private.is_global_admin())
  and exists (
    select 1 from public.platform_entities e
    where e.id = homecourt_exchange_posts.entity_id
      and e.status = 'active' and e.verification_status = 'verified'
  )
);

-- No public access. Existing party-only RLS for interests remains in force.
-- Prevent a responder from approving their own request or editing its target.
create or replace function private.rba_match_guard_interest()
returns trigger language plpgsql security invoker set search_path = '' as $$
declare
  post_owner uuid;
begin
  if tg_op = 'UPDATE' then
    if new.post_id is distinct from old.post_id
       or new.responding_entity_id is distinct from old.responding_entity_id
       or new.created_by is distinct from old.created_by
       or new.created_at is distinct from old.created_at then
      raise exception 'Match request identity cannot be changed';
    end if;
    if new.note is distinct from old.note
       and not private.is_entity_manager(old.responding_entity_id) then
      raise exception 'Only the requesting organisation may edit its message';
    end if;
    if old.status <> 'requested' and new.status is distinct from old.status then
      raise exception 'This match request is already resolved';
    end if;
    if new.status is distinct from old.status then
      select entity_id into post_owner
      from public.homecourt_exchange_posts where id = old.post_id;
      if new.status in ('accepted','declined')
         and not private.is_entity_manager(post_owner) then
        raise exception 'Only the host can accept or decline a request';
      elsif new.status = 'cancelled'
         and not private.is_entity_manager(old.responding_entity_id) then
        raise exception 'Only the requester can cancel their request';
      elsif new.status not in ('accepted','declined','cancelled') then
        raise exception 'Unsupported match request transition';
      end if;
    end if;
  end if;
  if length(coalesce(new.note,'')) > 300 then
    raise exception 'Match request message exceeds the limit';
  end if;
  return new;
end;
$$;
revoke all on function private.rba_match_guard_interest() from public, anon, authenticated;
drop trigger if exists rba_match_interest_transition_guard on public.homecourt_exchange_interests;
create trigger rba_match_interest_transition_guard
before insert or update on public.homecourt_exchange_interests
for each row execute function private.rba_match_guard_interest();

create index if not exists homecourt_exchange_open_date_idx
on public.homecourt_exchange_posts(starts_on,age_group,country_from)
where status='open';
create index if not exists homecourt_exchange_interests_host_idx
on public.homecourt_exchange_interests(post_id,status,created_at desc);

comment on table public.homecourt_exchange_posts is
  'RBA MATCH: verified adult coach/organisation board. Team-level only; no minor-to-adult DM or public contact details.';
