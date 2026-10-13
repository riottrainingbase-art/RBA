
create or replace function public.member_programmes()
returns table(
  participant_user_id uuid,
  participant_name text,
  event_id uuid,
  event_slug text,
  event_title text,
  starts_at timestamptz,
  ends_at timestamptz,
  venue text,
  city text,
  region text,
  event_status text,
  attendance_status text,
  payment_status text,
  joined_at timestamptz
)
language sql
stable
security invoker
set search_path = ''
as $$
  select
    p.player_user_id,
    pr.display_name,
    e.id,
    e.slug,
    e.title,
    e.starts_at,
    e.ends_at,
    e.venue,
    e.city,
    e.region,
    e.status,
    p.attendance_status::text,
    p.payment_status,
    p.joined_at
  from public.participations p
  join public.events e on e.id=p.event_id
  join public.profiles pr on pr.id=p.player_user_id
  where
    p.player_user_id=(select auth.uid())
    or exists(
      select 1
      from public.guardian_links gl
      where gl.parent_user_id=(select auth.uid())
        and gl.child_user_id=p.player_user_id
        and gl.verified_at is not null
    )
  order by e.starts_at desc nulls last
$$;

revoke all on function public.member_programmes() from public, anon;
grant execute on function public.member_programmes() to authenticated;

create or replace function public.member_orders()
returns table(
  order_id uuid,
  order_number bigint,
  order_type text,
  status text,
  amount_total integer,
  currency text,
  provider text,
  provider_checkout_id text,
  submitted_at timestamptz,
  confirmed_at timestamptz,
  fulfilled_at timestamptz,
  metadata jsonb
)
language sql
stable
security invoker
set search_path = ''
as $$
  select
    o.id,o.order_number,o.order_type,o.status,o.amount_total,o.currency,
    o.provider,o.provider_checkout_id,o.submitted_at,o.confirmed_at,o.fulfilled_at,o.metadata
  from public.platform_orders o
  where o.user_id=(select auth.uid())
  order by o.created_at desc
$$;

revoke all on function public.member_orders() from public, anon;
grant execute on function public.member_orders() to authenticated;

create or replace function public.member_billing_summary()
returns table(
  plan_key text,
  status text,
  current_period_end timestamptz,
  cancel_at_period_end boolean,
  provider_customer_id text,
  billing_portal_url text
)
language sql
stable
security invoker
set search_path = ''
as $$
  select
    s.plan_key,
    s.status::text,
    s.current_period_end,
    s.cancel_at_period_end,
    s.provider_customer_id,
    'https://billing.stripe.com/p/login/8x2dRb2XZ4fi1MpeAL7EQ00'::text
  from public.subscriptions s
  where s.user_id=(select auth.uid())
    and s.provider='stripe'
  order by s.updated_at desc
  limit 1
$$;

revoke all on function public.member_billing_summary() from public, anon;
grant execute on function public.member_billing_summary() to authenticated;

create or replace function public.member_next_action()
returns table(
  action_type text,
  title text,
  detail text,
  href text,
  priority integer
)
language sql
stable
security invoker
set search_path = ''
as $$
  with unpaid as (
    select
      'payment_required'::text action_type,
      'お支払いが必要です'::text title,
      coalesce(o.metadata->>'event',o.metadata->>'program','RBAプログラム')::text detail,
      '/ja/payments'::text href,
      100::integer priority
    from public.platform_orders o
    where o.user_id=(select auth.uid())
      and o.status in ('submitted','awaiting_payment','failed')
    order by o.created_at desc
    limit 1
  ),
  upcoming as (
    select
      'upcoming_programme'::text action_type,
      e.title::text title,
      coalesce(e.city,e.region,'開催予定')::text detail,
      '/ja/my-homecourt/programmes'::text href,
      50::integer priority
    from public.participations p
    join public.events e on e.id=p.event_id
    where (
      p.player_user_id=(select auth.uid())
      or exists(
        select 1 from public.guardian_links gl
        where gl.parent_user_id=(select auth.uid())
          and gl.child_user_id=p.player_user_id
          and gl.verified_at is not null
      )
    )
      and p.attendance_status in ('registered','confirmed')
      and (e.starts_at is null or e.starts_at >= now())
    order by e.starts_at asc nulls last
    limit 1
  )
  select * from unpaid
  union all
  select * from upcoming
  order by priority desc
  limit 1
$$;

revoke all on function public.member_next_action() from public, anon;
grant execute on function public.member_next_action() to authenticated;

