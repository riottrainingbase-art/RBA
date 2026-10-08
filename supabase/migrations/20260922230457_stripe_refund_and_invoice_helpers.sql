
create or replace function public.record_stripe_refund(
  p_refund_id text,
  p_payment_intent_id text,
  p_amount integer,
  p_currency text,
  p_status text,
  p_metadata jsonb default '{}'::jsonb
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_order_id uuid;
  v_user_id uuid;
  v_total integer;
  v_refunded integer;
  v_order_status text;
begin
  if auth.role() <> 'service_role' then
    raise exception 'not authorized';
  end if;

  select tl.order_id, tl.user_id
    into v_order_id, v_user_id
  from public.transaction_ledger tl
  where tl.provider='stripe'
    and tl.transaction_type='charge'
    and tl.metadata->>'payment_intent_id'=p_payment_intent_id
  order by tl.occurred_at desc
  limit 1;

  if v_order_id is null then
    return null;
  end if;

  insert into public.transaction_ledger(
    order_id,user_id,transaction_type,status,amount,currency,
    provider,provider_transaction_id,occurred_at,metadata
  )
  values(
    v_order_id,v_user_id,'refund',
    case when p_status='succeeded' then 'refunded'
         when p_status='failed' then 'failed'
         else 'pending' end,
    greatest(p_amount,0), upper(coalesce(p_currency,'JPY')),
    'stripe',p_refund_id,now(),
    coalesce(p_metadata,'{}'::jsonb) || jsonb_build_object('payment_intent_id',p_payment_intent_id)
  )
  on conflict (provider,provider_transaction_id)
  do update set
    status=excluded.status,
    amount=excluded.amount,
    metadata=excluded.metadata,
    occurred_at=excluded.occurred_at;

  select amount_total into v_total
  from public.platform_orders where id=v_order_id;

  select coalesce(sum(amount),0) into v_refunded
  from public.transaction_ledger
  where order_id=v_order_id
    and provider='stripe'
    and transaction_type='refund'
    and status='refunded';

  v_order_status := case
    when v_total is not null and v_refunded >= v_total then 'refunded'
    else 'paid'
  end;

  update public.platform_orders
  set status=v_order_status, updated_at=now()
  where id=v_order_id;

  insert into public.payment_reconciliation_actions(
    action_type,stripe_object_id,user_id,order_id,detail
  ) values (
    'refund_recorded',p_refund_id,v_user_id,v_order_id,
    jsonb_build_object('payment_intent_id',p_payment_intent_id,'amount',p_amount,'refund_status',p_status)
  );

  return v_order_id;
end;
$$;

revoke all on function public.record_stripe_refund(text,text,integer,text,text,jsonb) from public, anon, authenticated;
grant execute on function public.record_stripe_refund(text,text,integer,text,text,jsonb) to service_role;

create or replace function public.set_homecourt_invoice_state(
  p_subscription_id text,
  p_paid boolean,
  p_invoice_id text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid;
begin
  if auth.role() <> 'service_role' then
    raise exception 'not authorized';
  end if;

  update public.subscriptions
  set status=case when p_paid then 'active'::public.subscription_status else 'past_due'::public.subscription_status end,
      updated_at=now()
  where provider='stripe'
    and provider_subscription_id=p_subscription_id
  returning user_id into v_user_id;

  if v_user_id is not null then
    insert into public.payment_reconciliation_actions(
      action_type,stripe_object_id,user_id,detail
    ) values (
      case when p_paid then 'subscription_updated' else 'payment_failed' end,
      p_invoice_id,v_user_id,
      jsonb_build_object('subscription_id',p_subscription_id,'paid',p_paid)
    );
  end if;
end;
$$;

revoke all on function public.set_homecourt_invoice_state(text,boolean,text) from public, anon, authenticated;
grant execute on function public.set_homecourt_invoice_state(text,boolean,text) to service_role;

