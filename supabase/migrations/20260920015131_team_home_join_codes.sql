
create table if not exists public.team_join_codes (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  code text not null unique default upper(substr(replace(gen_random_uuid()::text,'-',''),1,8)),
  member_role text not null default 'player' check (member_role in ('coach','staff','player','parent')),
  expires_at timestamptz,
  max_uses integer check (max_uses is null or max_uses > 0),
  use_count integer not null default 0 check (use_count >= 0),
  active boolean not null default true,
  created_by uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now()
);

alter table public.team_join_codes enable row level security;
grant select,insert,update,delete on public.team_join_codes to authenticated;

create policy "team managers read join codes" on public.team_join_codes for select to authenticated
using (private.is_team_manager(team_id));
create policy "team managers create join codes" on public.team_join_codes for insert to authenticated
with check (private.is_team_manager(team_id) and created_by=(select auth.uid()));
create policy "team managers update join codes" on public.team_join_codes for update to authenticated
using (private.is_team_manager(team_id)) with check (private.is_team_manager(team_id));
create policy "team managers delete join codes" on public.team_join_codes for delete to authenticated
using (private.is_team_manager(team_id));

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

  insert into public.team_memberships(team_id,user_id,member_role,status)
  values(invite.team_id,current_user_id,invite.member_role,'active')
  on conflict(team_id,user_id,member_role)
  do update set status='active';

  update public.team_join_codes set use_count=use_count+1 where id=invite.id;
  return invite.team_id;
end;
$$;

revoke all on function public.join_team_with_code(text) from public;
revoke all on function public.join_team_with_code(text) from anon;
grant execute on function public.join_team_with_code(text) to authenticated;

comment on function public.join_team_with_code(text) is 'Authenticated users join a TEAM HOME only with a valid manager-issued code.';

