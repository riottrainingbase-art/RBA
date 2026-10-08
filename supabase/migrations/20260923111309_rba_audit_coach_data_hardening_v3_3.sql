
-- RBA Audit Remediation v3.3
-- Harden coach approval, credential verification and player-development write permissions.

create or replace function private.is_approved_coach(check_user_id uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path=''
as $$
  select exists(
    select 1 from public.coach_partner_profiles cpp
    where cpp.user_id=check_user_id
      and cpp.partner_status='approved'
      and cpp.approved_at is not null
  ) or private.is_global_admin();
$$;

create or replace function private.coach_has_player_context(check_coach_id uuid, check_player_id uuid)
returns boolean
language sql
stable
security definer
set search_path=''
as $$
  select private.is_global_admin()
  or (
    private.is_approved_coach(check_coach_id)
    and exists(
      select 1
      from public.coach_event_roles cer
      join public.participations p on p.event_id=cer.event_id
      where cer.coach_user_id=check_coach_id
        and p.player_user_id=check_player_id
        and p.attendance_status in ('registered','confirmed','attended')
    )
  );
$$;

revoke all on function private.is_approved_coach(uuid) from public,anon;
grant execute on function private.is_approved_coach(uuid) to authenticated;
revoke all on function private.coach_has_player_context(uuid,uuid) from public,anon;
grant execute on function private.coach_has_player_context(uuid,uuid) to authenticated;

-- Prevent coaches from self-approving partner status.
create or replace function public.guard_coach_partner_verification()
returns trigger
language plpgsql
security definer
set search_path=''
as $$
begin
  if not private.is_global_admin() then
    if new.partner_status is distinct from old.partner_status
       or new.approved_at is distinct from old.approved_at then
      raise exception 'coach partner verification fields are admin-managed';
    end if;
  end if;
  return new;
end;
$$;
revoke all on function public.guard_coach_partner_verification() from public,anon,authenticated;

drop trigger if exists trg_guard_coach_partner_verification on public.coach_partner_profiles;
create trigger trg_guard_coach_partner_verification
before update on public.coach_partner_profiles
for each row execute function public.guard_coach_partner_verification();

-- Teams can only be created by an approved RBA coach or global admin.
drop policy if exists "coaches create teams" on public.teams;
create policy "approved coaches create teams" on public.teams
for insert to authenticated
with check (
  created_by=(select auth.uid())
  and (private.is_approved_coach((select auth.uid())) or private.is_global_admin())
);

-- Player goals: self, verified guardian, approved coach with real player context, or admin.
drop policy if exists "player_goals_insert" on public.player_goals;
drop policy if exists "player_goals_update" on public.player_goals;
drop policy if exists "player_goals_delete" on public.player_goals;

create policy "player_goals_insert" on public.player_goals
for insert to authenticated
with check (
  player_user_id=(select auth.uid())
  or exists(
    select 1 from public.guardian_links gl
    where gl.parent_user_id=(select auth.uid())
      and gl.child_user_id=player_goals.player_user_id
      and gl.verified_at is not null
  )
  or (
    created_by=(select auth.uid())
    and private.coach_has_player_context((select auth.uid()),player_user_id)
  )
  or private.is_global_admin()
);

create policy "player_goals_update" on public.player_goals
for update to authenticated
using (
  player_user_id=(select auth.uid())
  or exists(
    select 1 from public.guardian_links gl
    where gl.parent_user_id=(select auth.uid())
      and gl.child_user_id=player_goals.player_user_id
      and gl.verified_at is not null
  )
  or (
    created_by=(select auth.uid())
    and private.coach_has_player_context((select auth.uid()),player_user_id)
  )
  or private.is_global_admin()
)
with check (
  player_user_id=(select auth.uid())
  or exists(
    select 1 from public.guardian_links gl
    where gl.parent_user_id=(select auth.uid())
      and gl.child_user_id=player_goals.player_user_id
      and gl.verified_at is not null
  )
  or (
    created_by=(select auth.uid())
    and private.coach_has_player_context((select auth.uid()),player_user_id)
  )
  or private.is_global_admin()
);

create policy "player_goals_delete" on public.player_goals
for delete to authenticated
using (
  player_user_id=(select auth.uid())
  or (
    created_by=(select auth.uid())
    and private.coach_has_player_context((select auth.uid()),player_user_id)
  )
  or private.is_global_admin()
);

-- Assessments require approved coach + event assignment + player participation, or admin.
drop policy if exists "assessments_staff_insert" on public.player_assessments;
create policy "assessments_staff_insert" on public.player_assessments
for insert to authenticated
with check (
  private.is_global_admin()
  or (
    assessor_user_id=(select auth.uid())
    and event_id is not null
    and private.is_approved_coach((select auth.uid()))
    and exists(
      select 1 from public.coach_event_roles cer
      where cer.event_id=player_assessments.event_id
        and cer.coach_user_id=(select auth.uid())
    )
    and exists(
      select 1 from public.participations p
      where p.event_id=player_assessments.event_id
        and p.player_user_id=player_assessments.player_user_id
        and p.attendance_status in ('registered','confirmed','attended')
    )
  )
);

-- Development plans use the same verified coach-player context.
drop policy if exists "development_plan_insert" on public.development_plan_items;
drop policy if exists "development_plan_update" on public.development_plan_items;
drop policy if exists "development_plan_delete" on public.development_plan_items;

create policy "development_plan_insert" on public.development_plan_items
for insert to authenticated
with check (
  player_user_id=(select auth.uid())
  or exists(
    select 1 from public.guardian_links gl
    where gl.parent_user_id=(select auth.uid())
      and gl.child_user_id=development_plan_items.player_user_id
      and gl.verified_at is not null
  )
  or (
    assigned_by=(select auth.uid())
    and private.coach_has_player_context((select auth.uid()),player_user_id)
  )
  or private.is_global_admin()
);

create policy "development_plan_update" on public.development_plan_items
for update to authenticated
using (
  player_user_id=(select auth.uid())
  or exists(
    select 1 from public.guardian_links gl
    where gl.parent_user_id=(select auth.uid())
      and gl.child_user_id=development_plan_items.player_user_id
      and gl.verified_at is not null
  )
  or (
    assigned_by=(select auth.uid())
    and private.coach_has_player_context((select auth.uid()),player_user_id)
  )
  or private.is_global_admin()
)
with check (
  player_user_id=(select auth.uid())
  or exists(
    select 1 from public.guardian_links gl
    where gl.parent_user_id=(select auth.uid())
      and gl.child_user_id=development_plan_items.player_user_id
      and gl.verified_at is not null
  )
  or (
    assigned_by=(select auth.uid())
    and private.coach_has_player_context((select auth.uid()),player_user_id)
  )
  or private.is_global_admin()
);

create policy "development_plan_delete" on public.development_plan_items
for delete to authenticated
using (
  player_user_id=(select auth.uid())
  or (
    assigned_by=(select auth.uid())
    and private.coach_has_player_context((select auth.uid()),player_user_id)
  )
  or private.is_global_admin()
);

-- Credential verification is admin-managed; coaches may submit claims only as unverified/pending.
drop policy if exists "coach_credentials_self_insert" on public.coach_credentials;
drop policy if exists "coach_credentials_self_update" on public.coach_credentials;

create policy "coach_credentials_self_insert" on public.coach_credentials
for insert to authenticated
with check (
  (coach_user_id=(select auth.uid())
   and verification_status in ('unverified','pending')
   and verified_by is null
   and verified_at is null)
  or private.is_global_admin()
);

create policy "coach_credentials_self_update" on public.coach_credentials
for update to authenticated
using (coach_user_id=(select auth.uid()) or private.is_global_admin())
with check (
  (
    coach_user_id=(select auth.uid())
    and verification_status in ('unverified','pending')
    and verified_by is null
    and verified_at is null
  )
  or private.is_global_admin()
);

create or replace function public.guard_coach_credential_verification()
returns trigger
language plpgsql
security definer
set search_path=''
as $$
begin
  if not private.is_global_admin() then
    if new.verification_status is distinct from old.verification_status
       or new.verified_by is distinct from old.verified_by
       or new.verified_at is distinct from old.verified_at then
      raise exception 'credential verification fields are admin-managed';
    end if;
  end if;
  return new;
end;
$$;
revoke all on function public.guard_coach_credential_verification() from public,anon,authenticated;

drop trigger if exists trg_guard_coach_credential_verification on public.coach_credentials;
create trigger trg_guard_coach_credential_verification
before update on public.coach_credentials
for each row execute function public.guard_coach_credential_verification();

