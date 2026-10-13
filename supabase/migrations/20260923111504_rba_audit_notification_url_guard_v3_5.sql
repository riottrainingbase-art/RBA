
create or replace function public.rewrite_dead_checkout_notification_url()
returns trigger
language plpgsql
security definer
set search_path=''
as $$
declare
  offer_slug text;
  replacement text;
begin
  if new.action_url like '/ja/checkout?offer=%' then
    offer_slug := split_part(split_part(new.action_url,'offer=',2),'&',1);
    select coalesce(e.payment_url,'/ja/payments')
      into replacement
    from public.service_offers s
    left join public.events e on e.slug=s.metadata->>'source_event_slug'
    where s.slug=offer_slug;
    new.action_url := coalesce(replacement,'/ja/payments');
  end if;
  return new;
end;
$$;
revoke all on function public.rewrite_dead_checkout_notification_url() from public,anon,authenticated;

drop trigger if exists trg_rewrite_dead_checkout_notification_url on public.platform_notifications;
create trigger trg_rewrite_dead_checkout_notification_url
before insert or update of action_url on public.platform_notifications
for each row execute function public.rewrite_dead_checkout_notification_url();

