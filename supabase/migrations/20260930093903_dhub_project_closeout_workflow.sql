
create or replace function public.dhub_admin_set_assignment_status(p_assignment_id uuid,p_status text)
returns boolean
language plpgsql
security definer
set search_path=''
as $$
declare a public.dhub_project_assignments%rowtype;
begin
  if auth.uid() is null or not private.is_global_admin() then raise exception 'admin access required'; end if;
  if p_status not in ('active','completed','cancelled') then raise exception 'invalid assignment status'; end if;
  select * into a from public.dhub_project_assignments where id=p_assignment_id for update;
  if a.id is null then raise exception 'assignment not found'; end if;

  if p_status='active' and a.terms_status<>'ready' then
    raise exception 'assignment must be READY before ACTIVE';
  end if;

  if p_status='completed' then
    if a.terms_status not in ('ready','active') then raise exception 'assignment cannot be completed from current status'; end if;
    if not exists (select 1 from public.dhub_project_member_reports r where r.assignment_id=a.id and r.submitted_at is not null) then
      raise exception 'member report required before completion';
    end if;
  end if;

  update public.dhub_project_assignments
  set terms_status=p_status,
      completed_at=case when p_status='completed' then now() else completed_at end,
      updated_at=now()
  where id=a.id;

  if p_status='completed' and a.application_id is not null then
    update public.dhub_project_applications set status='completed',updated_at=now() where id=a.application_id;
  end if;

  return true;
end;
$$;
revoke all on function public.dhub_admin_set_assignment_status(uuid,text) from public,anon;
grant execute on function public.dhub_admin_set_assignment_status(uuid,text) to authenticated,service_role;

create or replace function public.dhub_admin_close_project(
  p_project_id uuid,
  p_participant_count integer,
  p_client_confirmed boolean,
  p_client_feedback text,
  p_incident_count integer,
  p_safeguarding_incident boolean,
  p_delivery_summary text,
  p_next_opportunity text
)
returns boolean
language plpgsql
security definer
set search_path=''
as $$
declare open_assignment_count integer;
begin
  if auth.uid() is null or not private.is_global_admin() then raise exception 'admin access required'; end if;
  if p_incident_count<0 then raise exception 'invalid incident count'; end if;

  select count(*) into open_assignment_count
  from public.dhub_project_assignments a
  where a.project_id=p_project_id
    and a.terms_status in ('offered','accepted','ready','active');

  if open_assignment_count>0 then
    raise exception 'all assignment offers must be resolved and active assignments completed before closeout';
  end if;

  insert into public.dhub_project_closeouts(
    project_id,participant_count,client_confirmed,client_feedback,incident_count,
    safeguarding_incident,delivery_summary,next_opportunity,completed_by,completed_at,updated_at
  )
  values(
    p_project_id,p_participant_count,p_client_confirmed,left(trim(coalesce(p_client_feedback,'')),5000),
    p_incident_count,p_safeguarding_incident,left(trim(coalesce(p_delivery_summary,'')),5000),
    left(trim(coalesce(p_next_opportunity,'')),3000),auth.uid(),now(),now()
  )
  on conflict(project_id)
  do update set participant_count=excluded.participant_count,client_confirmed=excluded.client_confirmed,
    client_feedback=excluded.client_feedback,incident_count=excluded.incident_count,
    safeguarding_incident=excluded.safeguarding_incident,delivery_summary=excluded.delivery_summary,
    next_opportunity=excluded.next_opportunity,completed_by=auth.uid(),completed_at=now(),updated_at=now();

  update public.dhub_projects set status='completed',updated_at=now() where id=p_project_id;
  return true;
end;
$$;
revoke all on function public.dhub_admin_close_project(uuid,integer,boolean,text,integer,boolean,text,text) from public,anon;
grant execute on function public.dhub_admin_close_project(uuid,integer,boolean,text,integer,boolean,text,text) to authenticated,service_role;

create or replace function public.notify_admins_dhub_assignment_response()
returns trigger
language plpgsql
security definer
set search_path=''
as $$
begin
  if old.terms_status is distinct from new.terms_status and new.terms_status in ('accepted','declined') then
    insert into public.platform_notifications(user_id,notification_type,title,body,action_url,dedupe_key)
    select p.id,'dhub_project_admin','D-HUB PROJECT｜担当条件への回答',
      coalesce(pr.title,'案件')||'の担当条件が'||case when new.terms_status='accepted' then '受諾' else '辞退' end||'されました。',
      '/ja/d-hub/coaches/member/projects/admin',
      'dhub-assignment-admin:'||new.id::text||':'||new.terms_status
    from public.profiles p
    left join public.dhub_projects pr on pr.id=new.project_id
    where p.role='admin'::public.rba_role
    on conflict(dedupe_key) where dedupe_key is not null do nothing;
  end if;
  return new;
end;
$$;
drop trigger if exists dhub_assignment_response_admin_notify on public.dhub_project_assignments;
create trigger dhub_assignment_response_admin_notify
after update of terms_status on public.dhub_project_assignments
for each row execute function public.notify_admins_dhub_assignment_response();

create or replace function public.notify_admins_dhub_invite_response()
returns trigger
language plpgsql
security definer
set search_path=''
as $$
begin
  if old.status is distinct from new.status and new.status in ('accepted','declined') then
    insert into public.platform_notifications(user_id,notification_type,title,body,action_url,dedupe_key)
    select p.id,'dhub_project_admin','D-HUB PROJECT｜個別相談への回答',
      coalesce(pr.title,'案件')||'の個別相談が'||case when new.status='accepted' then '受諾' else '辞退' end||'されました。',
      '/ja/d-hub/coaches/member/projects/admin',
      'dhub-invite-admin:'||new.id::text||':'||new.status
    from public.profiles p
    left join public.dhub_projects pr on pr.id=new.project_id
    where p.role='admin'::public.rba_role
    on conflict(dedupe_key) where dedupe_key is not null do nothing;
  end if;
  return new;
end;
$$;
drop trigger if exists dhub_invite_response_admin_notify on public.dhub_project_invites;
create trigger dhub_invite_response_admin_notify
after update of status on public.dhub_project_invites
for each row execute function public.notify_admins_dhub_invite_response();

