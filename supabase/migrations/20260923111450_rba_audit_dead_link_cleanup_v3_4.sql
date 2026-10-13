
-- RBA Audit Remediation v3.4
-- Remove dead application/checkout URLs from current production data and notifications.

update public.service_offers s
set external_application_url=e.registration_url,
    updated_at=now()
from public.events e
where e.slug=s.metadata->>'source_event_slug'
  and e.registration_url is not null
  and s.external_application_url like '/apply?%';

create or replace function public.notify_application_status()
returns trigger
language plpgsql
security definer
set search_path=''
as $$
declare
  offer_slug text;
  offer_title text;
  source_event_slug text;
  pay_url text;
  recipient uuid;
  n_title text;
  n_body text;
  n_type text;
  n_url text;
  dkey text;
begin
  recipient := new.applicant_user_id;
  select s.slug,s.title,s.metadata->>'source_event_slug'
  into offer_slug,offer_title,source_event_slug
  from public.service_offers s where s.id=new.service_offer_id;

  if source_event_slug is not null then
    select e.payment_url into pay_url from public.events e where e.slug=source_event_slug;
  end if;

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
      n_url := coalesce(pay_url,'/ja/payments');
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

create or replace function public.rba_payment_reminder_url(p_offer_id uuid)
returns text
language sql
stable
security definer
set search_path=''
as $$
  select coalesce(e.payment_url,'/ja/payments')
  from public.service_offers s
  left join public.events e on e.slug=s.metadata->>'source_event_slug'
  where s.id=p_offer_id
$$;
revoke all on function public.rba_payment_reminder_url(uuid) from public,anon,authenticated;

