
-- RBA Audit Remediation v3.2
-- Close approval bypasses, fix refund accounting, reserve waitlist offers, and bind paid orders to waitlist acceptance.

-- 1) Program application authorization: applicants can only create/edit their own or verified child's
-- draft/submitted application. Accepted/rejected/waitlisted are server/admin controlled.
drop policy if exists "applications_self_insert" on public.program_applications;
drop policy if exists "applications_self_update_draft" on public.program_applications;
drop policy if exists "applications_admin_insert" on public.program_applications;
drop policy if exists "applications_admin_update" on public.program_applications;
drop policy if exists "applications_admin_delete" on public.program_applications;

create policy "applications_self_insert" on public.program_applications
for insert to authenticated
with check (
  applicant_user_id=(select auth.uid())
  and status in ('draft','submitted')
  and (
    subject_user_id is null
    or subject_user_id=(select auth.uid())
    or exists(
      select 1 from public.guardian_links gl
      where gl.parent_user_id=(select auth.uid())
        and gl.child_user_id=program_applications.subject_user_id
        and gl.verified_at is not null
    )
  )
);

create policy "applications_self_update" on public.program_applications
for update to authenticated
using (
  applicant_user_id=(select auth.uid())
  and status in ('draft','submitted')
)
with check (
  applicant_user_id=(select auth.uid())
  and status in ('draft','submitted','withdrawn')
  and (
    subject_user_id is null
    or subject_user_id=(select auth.uid())
    or exists(
      select 1 from public.guardian_links gl
      where gl.parent_user_id=(select auth.uid())
        and gl.child_user_id=program_applications.subject_user_id
        and gl.verified_at is not null
    )
  )
);

create policy "applications_admin_insert" on public.program_applications
for insert to authenticated with check (private.is_global_admin());
create policy "applications_admin_update" on public.program_applications
for update to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "applications_admin_delete" on public.program_applications
for delete to authenticated using (private.is_global_admin());

-- Null-safe uniqueness for applications.
create unique index if not exists program_applications_offer_subject_uq
on public.program_applications(
  applicant_user_id,
  coalesce(subject_user_id,applicant_user_id),
  service_offer_id,
  application_type
)
where service_offer_id is not null;

create unique index if not exists program_applications_event_subject_uq
on public.program_applications(
  applicant_user_id,
  coalesce(subject_user_id,applicant_user_id),
  event_id,
  application_type
)
where event_id is not null and service_offer_id is null;

-- 2) Refund accounting: successful refunds are stored as status='refunded', not 'succeeded'.
create or replace function public.refresh_event_financials(p_event_id uuid)
returns void
language plpgsql
security definer
set search_path=''
as $$
declare
  revenue bigint;
  refunds bigint;
  participants_count integer;
  cancelled_count integer;
begin
  select
    coalesce(sum(case when l.transaction_type='charge' and l.status='succeeded' then l.amount else 0 end),0),
    coalesce(sum(case when l.transaction_type='refund' and l.status in ('refunded','partially_refunded','pending') then l.amount else 0 end),0)
  into revenue,refunds
  from public.transaction_ledger l
  join public.platform_orders o on o.id=l.order_id
  where o.event_id=p_event_id;

  select count(*) filter (where payment_status='paid'),
         count(*) filter (where attendance_status='cancelled')
  into participants_count,cancelled_count
  from public.participations
  where event_id=p_event_id;

  insert into public.event_financials(event_id,actual_revenue_jpy,refunds_jpy,paid_participants,cancellations)
  values(p_event_id,revenue,refunds,participants_count,cancelled_count)
  on conflict(event_id) do update set
    actual_revenue_jpy=excluded.actual_revenue_jpy,
    refunds_jpy=excluded.refunds_jpy,
    paid_participants=excluded.paid_participants,
    cancellations=excluded.cancellations,
    updated_at=now();
end;
$$;
revoke all on function public.refresh_event_financials(uuid) from public,anon,authenticated;

-- 3) Paid order automatically consumes a waitlist offer.
create or replace function public.accept_waitlist_on_paid_order()
returns trigger
language plpgsql
security definer
set search_path=''
as $$
begin
  if new.status in ('paid','confirmed','fulfilled')
     and (old.status is distinct from new.status)
     and new.event_id is not null
     and new.subject_user_id is not null then
    update public.program_waitlist
    set status='accepted', offer_expires_at=null
    where event_id=new.event_id
      and subject_user_id=new.subject_user_id
      and status in ('waiting','offered');
  end if;
  return new;
end;
$$;
revoke all on function public.accept_waitlist_on_paid_order() from public,anon,authenticated;

drop trigger if exists trg_accept_waitlist_on_paid_order on public.platform_orders;
create trigger trg_accept_waitlist_on_paid_order
after update of status on public.platform_orders
for each row execute function public.accept_waitlist_on_paid_order();

-- 4) Fix automation: outstanding waitlist offers reserve capacity.
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
  reserved int;
  waiting record;
  dkey text;
  month_start date:=date_trunc('month',current_date)::date;
begin
  update public.events
  set status='completed'
  where status in ('open','closed')
    and ends_at is not null
    and ends_at < now();
  get diagnostics v_events_completed = row_count;

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

  for rec in
    select e.id,e.capacity,e.title
    from public.events e
    where e.status='open' and e.capacity is not null and e.capacity>0
  loop
    cap:=rec.capacity;

    select count(*) into occupied
    from public.participations p
    where p.event_id=rec.id and p.attendance_status in ('registered','confirmed','attended');

    select count(*) into reserved
    from public.program_waitlist w
    where w.event_id=rec.id
      and w.status='offered'
      and (w.offer_expires_at is null or w.offer_expires_at>=now());

    while occupied + reserved < cap loop
      waiting := null;
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
        update public.program_applications
        set status='accepted',reviewed_at=now()
        where id=waiting.application_id;
      end if;

      dkey:='waitlist_offer:'||waiting.id::text||':'||to_char(now(),'YYYYMMDDHH24');
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
      reserved:=reserved+1;
    end loop;
  end loop;

  for rec in
    select a.id,a.applicant_user_id,a.subject_user_id,a.service_offer_id,a.reviewed_at,s.slug,s.title
    from public.program_applications a
    join public.service_offers s on s.id=a.service_offer_id
    where a.status='accepted'
      and coalesce(a.reviewed_at,a.submitted_at) < now()-interval '18 hours'
      and not exists (
        select 1 from public.platform_orders o
        where o.application_id=a.id and o.status in ('paid','confirmed','fulfilled','refunded')
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

  for rec in
    select id from public.events
    where coalesce(ends_at,starts_at,created_at) > now()-interval '180 days'
  loop
    perform public.refresh_event_costs(rec.id);
    perform public.refresh_event_financials(rec.id);
    v_refreshes:=v_refreshes+1;
  end loop;

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
      select count(distinct coalesce(o.subject_user_id,o.user_id))
      from public.platform_orders o
      join public.service_offers so on so.id=o.service_offer_id
      where so.business_unit_id=bu.id and o.status in ('paid','confirmed','fulfilled','refunded')
        and o.confirmed_at>=month_start and o.confirmed_at<month_start+interval '1 month'
    ),0),
    coalesce((
      select count(distinct coalesce(o.subject_user_id,o.user_id))
      from public.platform_orders o
      join public.service_offers so on so.id=o.service_offer_id
      where so.business_unit_id=bu.id and o.status in ('paid','confirmed','fulfilled','refunded')
        and o.confirmed_at>=month_start and o.confirmed_at<month_start+interval '1 month'
        and not exists (
          select 1 from public.platform_orders old
          where coalesce(old.subject_user_id,old.user_id)=coalesce(o.subject_user_id,o.user_id)
            and old.confirmed_at<month_start
            and old.status in ('paid','confirmed','fulfilled','refunded')
        )
    ),0),
    coalesce((
      select count(distinct coalesce(o.subject_user_id,o.user_id))
      from public.platform_orders o
      join public.service_offers so on so.id=o.service_offer_id
      where so.business_unit_id=bu.id and o.status in ('paid','confirmed','fulfilled','refunded')
        and o.confirmed_at>=month_start and o.confirmed_at<month_start+interval '1 month'
        and exists (
          select 1 from public.platform_orders old
          where coalesce(old.subject_user_id,old.user_id)=coalesce(o.subject_user_id,o.user_id)
            and old.confirmed_at<month_start
            and old.status in ('paid','confirmed','fulfilled','refunded')
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

