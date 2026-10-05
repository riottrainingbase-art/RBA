
-- Harden D-HUB project application writes.
-- Members must use RPCs; they cannot directly alter selection state or admin notes.

revoke all on table public.dhub_project_applications from authenticated;
grant select on table public.dhub_project_applications to authenticated;

drop policy if exists "dhub project applications own insert" on public.dhub_project_applications;
drop policy if exists "dhub project applications own update" on public.dhub_project_applications;
drop policy if exists "dhub project applications admin delete" on public.dhub_project_applications;

create or replace function public.dhub_apply_to_project(
  p_project_id uuid,
  p_proposed_role text,
  p_motivation text,
  p_availability_note text,
  p_member_note text default ''
)
returns uuid
language plpgsql
security definer
set search_path=''
as $$
declare
  application_id uuid;
  current_user_id uuid := auth.uid();
begin
  if current_user_id is null or not public.has_dhub_coach_access() then
    raise exception 'D-HUB COACH LAB access required';
  end if;

  if not exists (
    select 1
    from public.dhub_projects p
    where p.id=p_project_id
      and p.status='open'
      and p.visibility='members'
      and (p.application_deadline is null or p.application_deadline > now())
  ) then
    raise exception 'project is not open';
  end if;

  insert into public.dhub_project_applications(
    project_id,user_id,proposed_role,motivation,availability_note,member_note,status
  )
  values(
    p_project_id,current_user_id,
    left(trim(coalesce(p_proposed_role,'')),200),
    left(trim(coalesce(p_motivation,'')),4000),
    left(trim(coalesce(p_availability_note,'')),2000),
    left(trim(coalesce(p_member_note,'')),2000),
    'submitted'
  )
  on conflict(project_id,user_id)
  do update set
    proposed_role=excluded.proposed_role,
    motivation=excluded.motivation,
    availability_note=excluded.availability_note,
    member_note=excluded.member_note,
    status=case
      when public.dhub_project_applications.status in ('withdrawn','not_selected') then 'submitted'
      else public.dhub_project_applications.status
    end,
    updated_at=now()
  where public.dhub_project_applications.user_id=current_user_id
  returning id into application_id;

  return application_id;
end;
$$;

revoke all on function public.dhub_apply_to_project(uuid,text,text,text,text) from public, anon;
grant execute on function public.dhub_apply_to_project(uuid,text,text,text,text) to authenticated, service_role;

create or replace function public.dhub_withdraw_project_application(p_project_id uuid)
returns boolean
language plpgsql
security definer
set search_path=''
as $$
declare
  current_user_id uuid := auth.uid();
begin
  if current_user_id is null then
    raise exception 'authentication required';
  end if;

  update public.dhub_project_applications
  set status='withdrawn', updated_at=now()
  where project_id=p_project_id
    and user_id=current_user_id
    and status in ('submitted','reviewing','shortlisted');

  return found;
end;
$$;

revoke all on function public.dhub_withdraw_project_application(uuid) from public, anon;
grant execute on function public.dhub_withdraw_project_application(uuid) to authenticated, service_role;

create or replace function public.dhub_admin_update_application_status(
  p_application_id uuid,
  p_status text,
  p_admin_note text default ''
)
returns boolean
language plpgsql
security definer
set search_path=''
as $$
declare
  target_project_id uuid;
  target_status text;
  role_limit integer;
  selected_count integer;
begin
  if auth.uid() is null or not private.is_global_admin() then
    raise exception 'admin access required';
  end if;

  if p_status not in ('submitted','reviewing','shortlisted','selected','not_selected','withdrawn','completed') then
    raise exception 'invalid status';
  end if;

  select a.project_id,a.status
    into target_project_id,target_status
  from public.dhub_project_applications a
  where a.id=p_application_id
  for update;

  if target_project_id is null then
    raise exception 'application not found';
  end if;

  if p_status='selected' and target_status<>'selected' then
    select p.roles_needed into role_limit
    from public.dhub_projects p
    where p.id=target_project_id
    for update;

    select count(*) into selected_count
    from public.dhub_project_applications a
    where a.project_id=target_project_id
      and a.status='selected'
      and a.id<>p_application_id;

    if selected_count >= role_limit then
      raise exception 'selected roles already filled';
    end if;
  end if;

  update public.dhub_project_applications
  set status=p_status,
      admin_note=left(trim(coalesce(p_admin_note,'')),4000),
      updated_at=now()
  where id=p_application_id;

  if p_status='selected' then
    select count(*) into selected_count
    from public.dhub_project_applications a
    where a.project_id=target_project_id
      and a.status='selected';

    select p.roles_needed into role_limit
    from public.dhub_projects p
    where p.id=target_project_id;

    if selected_count >= role_limit then
      update public.dhub_projects
      set status='filled', updated_at=now()
      where id=target_project_id and status in ('open','matching');
    else
      update public.dhub_projects
      set status='matching', updated_at=now()
      where id=target_project_id and status='open';
    end if;
  end if;

  return true;
end;
$$;

revoke all on function public.dhub_admin_update_application_status(uuid,text,text) from public, anon;
grant execute on function public.dhub_admin_update_application_status(uuid,text,text) to authenticated, service_role;

comment on function public.dhub_admin_update_application_status(uuid,text,text)
is 'Admin-only status transition for D-HUB project applications. Prevents member status escalation and over-selection beyond roles_needed.';

