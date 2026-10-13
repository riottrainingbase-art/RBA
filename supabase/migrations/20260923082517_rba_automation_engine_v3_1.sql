
-- RBA Automation Engine v3.1
-- Hourly lifecycle, waitlist promotion, reminders, cost/P&L refresh and KPI snapshots.

create table if not exists public.automation_dispatch_log (
  id uuid primary key default gen_random_uuid(),
  dedupe_key text not null unique,
  automation_type text not null,
  user_id uuid references auth.users(id) on delete cascade,
  resource_type text,
  resource_id text,
  dispatched_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb
);
create index if not exists automation_dispatch_log_user_idx on public.automation_dispatch_log(user_id,dispatched_at desc);
alter table public.automation_dispatch_log enable row level security;
create policy "automation_dispatch_admin_read" on public.automation_dispatch_log
for select to authenticated using (private.is_global_admin());

create or replace function public.refresh_event_costs(p_event_id uuid)
returns void
language plpgsql
security definer
set search_path=''
as $$
declare
  total_cost bigint;
begin
  select coalesce(sum(amount_jpy),0) into total_cost
  from public.operating_costs
  where event_id=p_event_id and payment_status in ('scheduled','paid');

  insert into public.event_financials(event_id,actual_cost_jpy)
  values(p_event_id,total_cost)
  on conflict(event_id) do update set
    actual_cost_jpy=excluded.actual_cost_jpy,
    updated_at=now();
end;
$$;
revoke all on function public.refresh_event_costs(uuid) from public,anon,authenticated;

create or replace function public.trg_refresh_event_costs()
returns trigger
language plpgsql
security definer
set search_path=''
as $$
declare
  ev uuid;
begin
  ev := coalesce(new.event_id,old.event_id);
  if ev is not null then perform public.refresh_event_costs(ev); end if;
  return coalesce(new,old);
end;
$$;
revoke all on function public.trg_refresh_event_costs() from public,anon,authenticated;

drop trigger if exists trg_operating_costs_refresh_event on public.operating_costs;
create trigger trg_operating_costs_refresh_event
after insert or update or delete on public.operating_costs
for each row execute function public.trg_refresh_event_costs();

create or replace function public.notify_application_status()
returns trigger
language plpgsql
security definer
set search_path=''
as $$
declare
  offer_slug text;
  offer_title text;
  recipient uuid;
  n_title text;
  n_body text;
  n_type text;
  n_url text;
  dkey text;
begin
  recipient := new.applicant_user_id;
  select slug,title into offer_slug,offer_title
  from public.service_offers where id=new.service_offer_id;

  if tg_op='INSERT' then
    n_type := 'application_received';
    n_title := '申込を受け付けました';
    n_body := coalesce(offer_title,'RBAプログラム') || ' の申込を受け付けました。';
    n_url := '/ja/my-homecourt';
  elsif new.status is distinct from old.status then
    if new.status='accepted' then
      n_type := 'application_accepted';
      n_title := '申込が承認されました';
      n_body := coalesce(offer_title,'RBAプログラム') || ' の申込が承認されました。お支払いへ進めます。';
      n_url := case when offer_slug is not null
        then '/ja/checkout?offer='||offer_slug||'&subject='||coalesce(new.subject_user_id,new.applicant_user_id)::text
        else '/ja/my-homecourt' end;
    elsif new.status='waitlisted' then
      n_type := 'application_waitlisted';
      n_title := 'キャンセル待ちに入りました';
      n_body := coalesce(offer_title,'RBAプログラム') || ' は現在キャンセル待ちです。空きが出た場合にお知らせします。';
      n_url := '/ja/my-homecourt';
    elsif new.status='rejected' then
      n_type := 'application_rejected';
      n_title := '申込状況が更新されました';
      n_body := coalesce(offer_title,'RBAプログラム') || ' の申込状況をご確認ください。';
      n_url := '/ja/my-homecourt';
    else
      return new;
    end if;
  else
    return new;
  end if;

  dkey := 'application:'||new.id::text||':'||n_type||':'||new.status;
  insert into public.automation_dispatch_log(dedupe_key,automation_type,user_id,resource_type,resource_id)
  values(dkey,n_type,recipient,'program_application',new.id::text)
  on conflict(dedupe_key) do nothing;

  if found then
    insert into public.platform_notifications(user_id,notification_type,title,body,action_url)
    values(recipient,n_type,n_title,n_body,n_url);
  end if;
  return new;
end;
$$;
revoke all on function public.notify_application_status() from public,anon,authenticated;

drop trigger if exists trg_program_application_notify on public.program_applications;
create trigger trg_program_application_notify
after insert or update of status on public.program_applications
for each row execute function public.notify_application_status();

create or replace function public.rba_automation_tick()
returns jsonb
language plpgsql
security definer
set search_path=''
as $$
declare
  v_events_completed int:=0;
  v_waitlist_expired int:=0;
  v_waitlist_offered int:=0;
  v_reminders int:=0;
  v_refreshes int:=0;
  rec record;
  cap int;
  occupied int;
  waiting record;
  offer_slug text;
  offer_title text;
  dkey text;
  month_start date:=date_trunc('month',current_date)::date;
begin
  -- Event lifecycle.
  update public.events
  set status='completed'
  where status in ('open','closed')
    and ends_at is not null
    and ends_at < now();
  get diagnostics v_events_completed = row_count;

  -- Expire stale waitlist offers.
  for rec in
    select w.id,w.application_id,w.subject_user_id,w.event_id
    from public.program_waitlist w
    where w.status='offered' and w.offer_expires_at is not null and w.offer_expires_at<now()
  loop
    update public.program_waitlist set status='expired' where id=rec.id;
    if rec.application_id is not null then
      update public.program_applications set status='waitlisted' where id=rec.application_id;
    end if;
    v_waitlist_expired:=v_waitlist_expired+1;
  end loop;

  -- Promote waitlist when a capacity-controlled event has space.
  for rec in
    select e.id,e.capacity,e.title
    from public.events e
    where e.status='open' and e.capacity is not null and e.capacity>0
  loop
    cap:=rec.capacity;
    select count(*) into occupied
    from public.participations p
    where p.event_id=rec.id and p.attendance_status in ('registered','confirmed','attended');

    while occupied < cap loop
      select w.id,w.application_id,w.subject_user_id
      into waiting
      from public.program_waitlist w
      where w.event_id=rec.id and w.status='waiting'
      order by w.priority,w.joined_at
      limit 1
      for update skip locked;

      exit when waiting.id is null;

      update public.program_waitlist
      set status='offered',offer_expires_at=now()+interval '24 hours'
      where id=waiting.id;

      if waiting.application_id is not null then
        update public.program_applications set status='accepted',reviewed_at=now()
        where id=waiting.application_id;
      end if;

      dkey:='waitlist_offer:'||waiting.id::text;
      insert into public.automation_dispatch_log(dedupe_key,automation_type,user_id,resource_type,resource_id)
      values(dkey,'waitlist_offer',waiting.subject_user_id,'program_waitlist',waiting.id::text)
      on conflict(dedupe_key) do nothing;
      if found then
        insert into public.platform_notifications(user_id,notification_type,title,body,action_url,expires_at)
        values(waiting.subject_user_id,'waitlist_offer','空きが出ました',
          rec.title||' に空きが出ました。24時間以内にお支払いを完了してください。',
          '/ja/my-homecourt',now()+interval '24 hours');
      end if;

      v_waitlist_offered:=v_waitlist_offered+1;
      occupied:=occupied+1;
    end loop;
  end loop;

  -- Payment reminders for accepted applications that remain unpaid.
  for rec in
    select a.id,a.applicant_user_id,a.subject_user_id,a.service_offer_id,a.reviewed_at,s.slug,s.title
    from public.program_applications a
    join public.service_offers s on s.id=a.service_offer_id
    where a.status='accepted'
      and coalesce(a.reviewed_at,a.submitted_at) < now()-interval '18 hours'
      and not exists (
        select 1 from public.platform_orders o
        where o.application_id=a.id and o.status in ('paid','fulfilled','refunded')
      )
  loop
    dkey:='payment_reminder:'||rec.id::text||':'||to_char(current_date,'YYYYMMDD');
    insert into public.automation_dispatch_log(dedupe_key,automation_type,user_id,resource_type,resource_id)
    values(dkey,'payment_reminder',rec.applicant_user_id,'program_application',rec.id::text)
    on conflict(dedupe_key) do nothing;
    if found then
      insert into public.platform_notifications(user_id,notification_type,title,body,action_url)
      values(rec.applicant_user_id,'payment_reminder','お支払いの確認',
        rec.title||' の参加枠を確定するにはお支払いが必要です。',
        '/ja/checkout?offer='||rec.slug||'&subject='||coalesce(rec.subject_user_id,rec.applicant_user_id)::text);
      v_reminders:=v_reminders+1;
    end if;
  end loop;

  -- Refresh all active/recent event P&L.
  for rec in
    select id from public.events
    where coalesce(ends_at,starts_at,created_at) > now()-interval '180 days'
  loop
    perform public.refresh_event_costs(rec.id);
    perform public.refresh_event_financials(rec.id);
    v_refreshes:=v_refreshes+1;
  end loop;

  -- Monthly business-unit KPI snapshots (current month, recalculated).
  insert into public.monthly_kpi_snapshots(
    month,business_unit_id,revenue_jpy,gross_profit_jpy,operating_profit_jpy,
    active_customers,new_customers,repeat_customers,events_held,participants,
    refunds_jpy,founder_dependent_revenue_jpy,updated_at
  )
  select
    month_start,
    bu.id,
    coalesce(sum(ef.actual_revenue_jpy),0),
    coalesce(sum(ef.actual_revenue_jpy-ef.actual_cost_jpy),0),
    coalesce(sum(ef.actual_revenue_jpy-ef.actual_cost_jpy-ef.refunds_jpy),0),
    coalesce((
      select count(distinct o.subject_user_id)
      from public.platform_orders o
      join public.service_offers so on so.id=o.service_offer_id
      where so.business_unit_id=bu.id and o.status in ('paid','fulfilled','refunded')
        and o.confirmed_at>=month_start and o.confirmed_at<month_start+interval '1 month'
    ),0),
    coalesce((
      select count(distinct o.subject_user_id)
      from public.platform_orders o
      join public.service_offers so on so.id=o.service_offer_id
      where so.business_unit_id=bu.id and o.status in ('paid','fulfilled','refunded')
        and o.confirmed_at>=month_start and o.confirmed_at<month_start+interval '1 month'
        and not exists (
          select 1 from public.platform_orders old
          where old.subject_user_id=o.subject_user_id and old.confirmed_at<month_start
            and old.status in ('paid','fulfilled','refunded')
        )
    ),0),
    coalesce((
      select count(distinct o.subject_user_id)
      from public.platform_orders o
      join public.service_offers so on so.id=o.service_offer_id
      where so.business_unit_id=bu.id and o.status in ('paid','fulfilled','refunded')
        and o.confirmed_at>=month_start and o.confirmed_at<month_start+interval '1 month'
        and exists (
          select 1 from public.platform_orders old
          where old.subject_user_id=o.subject_user_id and old.confirmed_at<month_start
            and old.status in ('paid','fulfilled','refunded')
        )
    ),0),
    count(distinct e.id) filter (where e.starts_at>=month_start and e.starts_at<month_start+interval '1 month'),
    coalesce(sum(ef.paid_participants),0),
    coalesce(sum(ef.refunds_jpy),0),
    coalesce(sum(ef.actual_revenue_jpy) filter (where ef.founder_required),0),
    now()
  from public.business_units bu
  left join public.events e on e.business_unit_id=bu.id
    and coalesce(e.starts_at,e.created_at)>=month_start
    and coalesce(e.starts_at,e.created_at)<month_start+interval '1 month'
  left join public.event_financials ef on ef.event_id=e.id
  where bu.status='active'
  group by bu.id
  on conflict(month,business_unit_id) do update set
    revenue_jpy=excluded.revenue_jpy,
    gross_profit_jpy=excluded.gross_profit_jpy,
    operating_profit_jpy=excluded.operating_profit_jpy,
    active_customers=excluded.active_customers,
    new_customers=excluded.new_customers,
    repeat_customers=excluded.repeat_customers,
    events_held=excluded.events_held,
    participants=excluded.participants,
    refunds_jpy=excluded.refunds_jpy,
    founder_dependent_revenue_jpy=excluded.founder_dependent_revenue_jpy,
    updated_at=now();

  return jsonb_build_object(
    'events_completed',v_events_completed,
    'waitlist_expired',v_waitlist_expired,
    'waitlist_offered',v_waitlist_offered,
    'payment_reminders',v_reminders,
    'financial_refreshes',v_refreshes,
    'ran_at',now()
  );
end;
$$;
revoke all on function public.rba_automation_tick() from public,anon,authenticated;

do $$
begin
  perform cron.unschedule('rba-platform-hourly-automation');
exception when others then null;
end $$;

select cron.schedule(
  'rba-platform-hourly-automation',
  '7 * * * *',
  'select public.rba_automation_tick();'
);

