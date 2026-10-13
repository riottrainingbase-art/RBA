
create or replace function private.dispatch_homecourt_reminders()
returns integer
language plpgsql
security definer
set search_path = pg_catalog, public, private
as $$
declare
  inserted_count integer := 0;
  n integer;
begin
  -- Personal schedule reminders.
  insert into public.platform_notifications(user_id,notification_type,title,body,action_url,expires_at,dedupe_key)
  select
    s.user_id,
    'homecourt_schedule',
    case p.preferred_language
      when 'ja' then '予定が近づいています'
      when 'ko' then '일정이 다가오고 있습니다'
      when 'zh-Hant' then '行程即將開始'
      else 'Your schedule is coming up'
    end,
    s.title,
    case p.preferred_language
      when 'ja' then '/ja/my-homecourt/app/calendar'
      when 'ko' then '/ko/my-homecourt/app/calendar'
      when 'zh-Hant' then '/zh-tw/my-homecourt/app/calendar'
      else '/my-homecourt/app/calendar'
    end,
    s.starts_at + interval '12 hours',
    'hc:schedule:'||s.id::text||':d'||d.day::text
  from public.homecourt_schedule_items s
  join public.notification_preferences np on np.user_id=s.user_id and np.schedule_reminders
  join public.profiles p on p.id=s.user_id
  cross join lateral unnest(np.event_reminder_days) as d(day)
  where s.starts_at > now()
    and s.starts_at - make_interval(days=>d.day) >= now() - interval '30 minutes'
    and s.starts_at - make_interval(days=>d.day) < now() + interval '30 minutes'
  on conflict (dedupe_key) do nothing;
  get diagnostics n = row_count; inserted_count := inserted_count + n;

  -- Team schedule reminders for active members.
  insert into public.platform_notifications(user_id,notification_type,title,body,action_url,expires_at,dedupe_key)
  select
    tm.user_id,
    'homecourt_team_schedule',
    case p.preferred_language
      when 'ja' then 'チーム予定が近づいています'
      when 'ko' then '팀 일정이 다가오고 있습니다'
      when 'zh-Hant' then '球隊行程即將開始'
      else 'A team event is coming up'
    end,
    te.title,
    case p.preferred_language
      when 'ja' then '/ja/my-homecourt/app/calendar'
      when 'ko' then '/ko/my-homecourt/app/calendar'
      when 'zh-Hant' then '/zh-tw/my-homecourt/app/calendar'
      else '/my-homecourt/app/calendar'
    end,
    te.starts_at + interval '12 hours',
    'hc:team:'||te.id::text||':'||tm.user_id::text||':d'||d.day::text
  from public.team_memberships tm
  join public.team_events te on te.team_id=tm.team_id
  join public.notification_preferences np on np.user_id=tm.user_id and np.schedule_reminders
  join public.profiles p on p.id=tm.user_id
  cross join lateral unnest(np.event_reminder_days) as d(day)
  where tm.status='active'
    and te.starts_at > now()
    and te.starts_at - make_interval(days=>d.day) >= now() - interval '30 minutes'
    and te.starts_at - make_interval(days=>d.day) < now() + interval '30 minutes'
  on conflict (dedupe_key) do nothing;
  get diagnostics n = row_count; inserted_count := inserted_count + n;

  -- Registered RBA event reminders.
  insert into public.platform_notifications(user_id,notification_type,title,body,action_url,expires_at,dedupe_key)
  select
    pa.player_user_id,
    'homecourt_rba_event',
    case p.preferred_language
      when 'ja' then 'RBAの予定が近づいています'
      when 'ko' then 'RBA 일정이 다가오고 있습니다'
      when 'zh-Hant' then 'RBA 行程即將開始'
      else 'An RBA event is coming up'
    end,
    e.title,
    case p.preferred_language
      when 'ja' then '/ja/my-homecourt/app/calendar'
      when 'ko' then '/ko/my-homecourt/app/calendar'
      when 'zh-Hant' then '/zh-tw/my-homecourt/app/calendar'
      else '/my-homecourt/app/calendar'
    end,
    e.starts_at + interval '12 hours',
    'hc:rba:'||e.id::text||':'||pa.player_user_id::text||':d'||d.day::text
  from public.participations pa
  join public.events e on e.id=pa.event_id and e.starts_at is not null
  join public.notification_preferences np on np.user_id=pa.player_user_id and np.schedule_reminders
  join public.profiles p on p.id=pa.player_user_id
  cross join lateral unnest(np.event_reminder_days) as d(day)
  where pa.attendance_status in ('registered','confirmed')
    and e.starts_at > now()
    and e.starts_at - make_interval(days=>d.day) >= now() - interval '30 minutes'
    and e.starts_at - make_interval(days=>d.day) < now() + interval '30 minutes'
  on conflict (dedupe_key) do nothing;
  get diagnostics n = row_count; inserted_count := inserted_count + n;

  -- Care reminders: keep notification text generic because these are private records.
  insert into public.platform_notifications(user_id,notification_type,title,body,action_url,expires_at,dedupe_key)
  select
    cp.user_id,
    'homecourt_care',
    case p.preferred_language
      when 'ja' then 'MY HOME COURTの予定があります'
      when 'ko' then 'MY HOME COURT 일정이 있습니다'
      when 'zh-Hant' then 'MY HOME COURT 有一項予定'
      else 'You have a MY HOME COURT reminder'
    end,
    case p.preferred_language
      when 'ja' then '登録している予定の時間が近づいています。'
      when 'ko' then '등록한 일정 시간이 다가오고 있습니다.'
      when 'zh-Hant' then '你所登記的予定時間即將到來。'
      else 'A saved appointment is coming up.'
    end,
    case p.preferred_language
      when 'ja' then '/ja/my-homecourt/app/calendar'
      when 'ko' then '/ko/my-homecourt/app/calendar'
      when 'zh-Hant' then '/zh-tw/my-homecourt/app/calendar'
      else '/my-homecourt/app/calendar'
    end,
    cp.scheduled_at + interval '6 hours',
    'hc:care:'||cp.id::text||':m'||np.care_reminder_minutes::text
  from public.homecourt_care_plans cp
  join public.notification_preferences np on np.user_id=cp.user_id and np.care_reminders
  join public.profiles p on p.id=cp.user_id
  where cp.status='planned'
    and cp.scheduled_at > now()
    and cp.scheduled_at - make_interval(mins=>np.care_reminder_minutes) >= now() - interval '30 minutes'
    and cp.scheduled_at - make_interval(mins=>np.care_reminder_minutes) < now() + interval '30 minutes'
  on conflict (dedupe_key) do nothing;
  get diagnostics n = row_count; inserted_count := inserted_count + n;

  -- Optional daily private check-in reminder. The notification does not expose entered values.
  insert into public.platform_notifications(user_id,notification_type,title,body,action_url,expires_at,dedupe_key)
  select
    np.user_id,
    'homecourt_daily_checkin',
    case p.preferred_language
      when 'ja' then '今日の記録を残しますか？'
      when 'ko' then '오늘 기록을 남길까요?'
      when 'zh-Hant' then '要留下今天的記錄嗎？'
      else 'Ready to log today?'
    end,
    case p.preferred_language
      when 'ja' then 'MY HOME COURTで今日の記録を短く残せます。'
      when 'ko' then 'MY HOME COURT에서 오늘 기록을 짧게 남길 수 있습니다.'
      when 'zh-Hant' then '可在 MY HOME COURT 簡短留下今天的記錄。'
      else 'Open MY HOME COURT to leave a short daily log.'
    end,
    case p.preferred_language
      when 'ja' then '/ja/my-homecourt/app/calendar'
      when 'ko' then '/ko/my-homecourt/app/calendar'
      when 'zh-Hant' then '/zh-tw/my-homecourt/app/calendar'
      else '/my-homecourt/app/calendar'
    end,
    now() + interval '8 hours',
    'hc:daily:'||np.user_id::text||':'||(now() at time zone coalesce(p.timezone,'Asia/Tokyo'))::date::text
  from public.notification_preferences np
  join public.profiles p on p.id=np.user_id
  where np.wellness_reminders
    and extract(hour from (now() at time zone coalesce(p.timezone,'Asia/Tokyo'))) = extract(hour from np.wellness_reminder_time)
    and not exists (
      select 1 from public.homecourt_wellness_checkins w
      where w.user_id=np.user_id
        and w.checkin_on=(now() at time zone coalesce(p.timezone,'Asia/Tokyo'))::date
    )
  on conflict (dedupe_key) do nothing;
  get diagnostics n = row_count; inserted_count := inserted_count + n;

  return inserted_count;
end;
$$;

revoke all on function private.dispatch_homecourt_reminders() from public, anon, authenticated;

do $$
declare jid bigint;
begin
  select jobid into jid from cron.job where jobname='rba-homecourt-reminders';
  if jid is not null then perform cron.unschedule(jid); end if;
  perform cron.schedule(
    'rba-homecourt-reminders',
    '*/30 * * * *',
    'select private.dispatch_homecourt_reminders();'
  );
end $$;

