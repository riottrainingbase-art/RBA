
alter table public.unmatched_stripe_payments
  add column if not exists payment_status text;

create or replace function private.claim_unmatched_payments_for_user(p_user_id uuid)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_email text;
  v_role public.rba_role;
  r record;
  v_order_id uuid;
  v_event_id uuid;
  v_event_slug text;
  v_count integer := 0;
begin
  select lower(u.email), p.role
    into v_email, v_role
  from auth.users u
  join public.profiles p on p.id=u.id
  where u.id=p_user_id;

  if v_email is null then return 0; end if;

  for r in
    select *
    from public.unmatched_stripe_payments
    where status='unresolved'
      and lower(customer_email)=v_email
      and payment_status='paid'
    order by created_at
  loop
    insert into public.platform_orders(
      user_id,order_type,status,amount_subtotal,amount_total,currency,locale,
      provider,provider_checkout_id,submitted_at,confirmed_at,metadata,updated_at
    )
    values(
      p_user_id,
      case when r.programme_key='rba_homecourt' then 'subscription' else 'event' end,
      'paid',r.amount_total,r.amount_total,coalesce(r.currency,'JPY'),'ja',
      'stripe',r.checkout_session_id,r.created_at,now(),
      jsonb_build_object(
        'program',r.programme_key,'event',r.event_key,'plan',r.plan_key,
        'stripe_customer_id',r.customer_id,'stripe_subscription_id',r.subscription_id,
        'payment_intent_id',r.payment_intent_id,'reconciled_from_unmatched',true
      ),
      now()
    )
    on conflict (provider_checkout_id) do update set
      user_id=excluded.user_id,status='paid',confirmed_at=now(),updated_at=now()
    returning id into v_order_id;

    insert into public.transaction_ledger(
      order_id,user_id,transaction_type,status,amount,currency,provider,
      provider_transaction_id,occurred_at,metadata
    )
    values(
      v_order_id,p_user_id,'charge','succeeded',coalesce(r.amount_total,0),
      coalesce(r.currency,'JPY'),'stripe',r.checkout_session_id,now(),
      jsonb_build_object('payment_intent_id',r.payment_intent_id,'reconciled_from_unmatched',true)
    )
    on conflict (provider,provider_transaction_id) do update set
      order_id=excluded.order_id,user_id=excluded.user_id,status='succeeded';

    if r.programme_key='rba_homecourt' and r.subscription_id is not null then
      insert into public.subscriptions(
        user_id,provider,provider_customer_id,provider_subscription_id,status,plan_key,updated_at
      )
      values(
        p_user_id,'stripe',r.customer_id,r.subscription_id,'active','homecourt_monthly',now()
      )
      on conflict (provider_subscription_id) do update set
        user_id=excluded.user_id,provider_customer_id=excluded.provider_customer_id,
        status='active',updated_at=now();
    end if;

    if v_role='player' and r.event_key is not null then
      v_event_slug := case r.event_key
        when 'yaima_cup_2026' then 'yaima-cup-2026'
        when 'saga_fukuoka_2days_2026' then 'saga-fukuoka-2days-2026'
        when 'yamagata_1day_2026' then 'yamagata-1day-2026'
        when 'shizugawa_camp_2026' then 'shizugawa-development-camp-2026'
        when 'kobe_camp_2026' then 'kobe-development-camp-2026'
        when 'rba_3days_development_camp_2026' then 'kobe-development-camp-2026'
        when 'torsten_loibl_online_clinic_vol2' then 'torsten-loibl-online-clinic-vol-2'
        else null
      end;

      if v_event_slug is not null then
        select id into v_event_id from public.events where slug=v_event_slug;
        if v_event_id is not null then
          insert into public.participations(event_id,player_user_id,attendance_status,payment_status)
          values(v_event_id,p_user_id,'confirmed','paid')
          on conflict (event_id,player_user_id) do update set
            attendance_status='confirmed',payment_status='paid';
        end if;
      end if;
    end if;

    update public.unmatched_stripe_payments
    set status='resolved',resolved_user_id=p_user_id,resolved_at=now()
    where id=r.id;

    insert into public.payment_reconciliation_actions(
      action_type,stripe_object_id,user_id,order_id,detail
    ) values (
      'payment_matched',r.checkout_session_id,p_user_id,v_order_id,
      jsonb_build_object('source','auto_claim_after_registration')
    );

    v_count := v_count + 1;
  end loop;

  return v_count;
end;
$$;

revoke all on function private.claim_unmatched_payments_for_user(uuid) from public, anon, authenticated;
grant execute on function private.claim_unmatched_payments_for_user(uuid) to postgres, service_role;

create or replace function private.claim_unmatched_payments_after_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform private.claim_unmatched_payments_for_user(new.id);
  return new;
end;
$$;

revoke all on function private.claim_unmatched_payments_after_profile() from public, anon, authenticated;

drop trigger if exists claim_unmatched_payments_after_profile on public.profiles;
create trigger claim_unmatched_payments_after_profile
after insert on public.profiles
for each row execute function private.claim_unmatched_payments_after_profile();

