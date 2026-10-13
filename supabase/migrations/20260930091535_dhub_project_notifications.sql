
create or replace function public.notify_dhub_project_application_status()
returns trigger
language plpgsql
security definer
set search_path=''
as $$
declare
  project_title text;
  body_text text;
begin
  if tg_op <> 'UPDATE' or new.status = old.status then
    return new;
  end if;

  select p.title into project_title
  from public.dhub_projects p
  where p.id=new.project_id;

  body_text := case new.status
    when 'reviewing' then '応募内容をRBAが確認しています。'
    when 'shortlisted' then '担当候補として調整中です。正式決定ではありません。'
    when 'selected' then '担当者として選定されました。日程・報酬・役割等の最終確認を行ってください。'
    when 'not_selected' then '今回は担当見送りとなりました。'
    when 'completed' then '案件が完了扱いになりました。振り返りを次の実践につなげてください。'
    when 'withdrawn' then '応募辞退を受け付けました。'
    else null
  end;

  if body_text is not null then
    insert into public.platform_notifications(
      user_id,notification_type,title,body,action_url,dedupe_key
    ) values (
      new.user_id,
      'dhub_project',
      coalesce(project_title,'D-HUB PROJECT') || '｜' ||
        case new.status
          when 'reviewing' then '確認中'
          when 'shortlisted' then '候補として調整中'
          when 'selected' then '担当決定'
          when 'not_selected' then '選考結果'
          when 'completed' then '完了'
          when 'withdrawn' then '応募辞退'
          else new.status
        end,
      body_text,
      '/ja/d-hub/coaches/member/projects',
      'dhub-project-application:'||new.id::text||':'||new.status
    )
    on conflict (dedupe_key) where dedupe_key is not null do nothing;
  end if;

  return new;
end;
$$;

drop trigger if exists dhub_project_application_status_notify on public.dhub_project_applications;
create trigger dhub_project_application_status_notify
after update of status on public.dhub_project_applications
for each row execute function public.notify_dhub_project_application_status();

create or replace function public.announce_open_dhub_project()
returns trigger
language plpgsql
security definer
set search_path=''
as $$
begin
  if new.visibility='members'
     and new.status='open'
     and (tg_op='INSERT' or old.status is distinct from new.status)
  then
    insert into public.dhub_announcements(
      title,body,action_label,action_url,published,pinned,published_at,created_by,program_type
    ) values (
      'D-HUB PROJECT｜'||new.title,
      case
        when new.application_deadline is not null
          then new.summary||E'\n応募締切：'||to_char(new.application_deadline at time zone 'Asia/Tokyo','YYYY/MM/DD HH24:MI')
        else new.summary
      end,
      '案件を見る',
      '/ja/d-hub/coaches/member/projects',
      true,
      false,
      now(),
      new.created_by,
      'coach_lab'
    );
  end if;
  return new;
end;
$$;

drop trigger if exists dhub_project_open_announcement on public.dhub_projects;
create trigger dhub_project_open_announcement
after insert or update of status on public.dhub_projects
for each row execute function public.announce_open_dhub_project();

comment on function public.notify_dhub_project_application_status() is 'Creates member notifications when a D-HUB project application status changes. Does not guarantee work or payment.';
comment on function public.announce_open_dhub_project() is 'Publishes a D-HUB announcement when a member-visible project is opened.';

