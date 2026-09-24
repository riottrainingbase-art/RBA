-- Prevent self-service privilege escalation while preserving PLAYER/PARENT/COACH onboarding.
drop policy if exists "profile self update" on public.profiles;
create policy "profile self update" on public.profiles
for update to authenticated
using (id = (select auth.uid()))
with check (
  id = (select auth.uid())
  and (
    role in ('player'::public.rba_role, 'parent'::public.rba_role, 'coach'::public.rba_role)
    or private.is_global_admin()
  )
);

-- Profiles are private. Anonymous clients do not need table privileges.
revoke all on table public.profiles from anon;

-- Fix the owner-delete predicate so it compares the membership to the target team.
drop policy if exists "team owners delete teams" on public.teams;
create policy "team owners delete teams" on public.teams
for delete to authenticated
using (
  exists (
    select 1
    from public.team_memberships tm
    where tm.team_id = teams.id
      and tm.user_id = (select auth.uid())
      and tm.member_role = 'owner'
      and tm.status = 'active'
  )
  or private.is_global_admin()
);

-- Joining is intentionally SECURITY DEFINER because invitees are not team managers.
-- Validate the caller and avoid consuming the same limited-use code more than once.
create or replace function public.join_team_with_code(invite_code text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  invite public.team_join_codes%rowtype;
  current_user_id uuid := (select auth.uid());
begin
  if current_user_id is null then
    raise exception 'authentication required';
  end if;

  if invite_code is null or char_length(trim(invite_code)) not between 4 and 32 then
    raise exception 'invalid or expired team code';
  end if;

  select * into invite
  from public.team_join_codes
  where code = upper(trim(invite_code))
    and active = true
    and (expires_at is null or expires_at > now())
    and (max_uses is null or use_count < max_uses)
  for update;

  if invite.id is null then
    raise exception 'invalid or expired team code';
  end if;

  if exists (
    select 1 from public.team_memberships tm
    where tm.team_id = invite.team_id
      and tm.user_id = current_user_id
      and tm.member_role = invite.member_role
      and tm.status = 'active'
  ) then
    return invite.team_id;
  end if;

  insert into public.team_memberships(team_id,user_id,member_role,status)
  values(invite.team_id,current_user_id,invite.member_role,'active')
  on conflict(team_id,user_id,member_role)
  do update set status='active';

  update public.team_join_codes
  set use_count=use_count+1
  where id=invite.id;

  return invite.team_id;
end;
$$;

revoke all on function public.join_team_with_code(text) from public, anon;
grant execute on function public.join_team_with_code(text) to authenticated, service_role;