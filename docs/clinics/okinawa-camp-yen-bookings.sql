create table public.okinawa_camp_bookings (
 checkout_session_id text primary key, payment_intent_id text unique, payment_link_id text not null,
 plan text not null check(plan in ('day','housing')), amount_jpy integer not null check(amount_jpy in (27500,39600)),
 payment_status text not null check(payment_status in ('pending','paid','failed','partially_refunded','refunded')),
 booking_status text not null default 'pending_review' check(booking_status in ('pending_review','confirmed','cancelled')),
 guardian_name text, guardian_email text not null, guardian_phone text, billing_address jsonb,
 player_name text not null, player_details text not null, consent_accepted boolean not null check(consent_accepted),
 refunded_jpy integer not null default 0, paid_at timestamptz, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
alter table public.okinawa_camp_bookings enable row level security;
revoke all on public.okinawa_camp_bookings from anon, authenticated;
grant all on public.okinawa_camp_bookings to service_role;
create table public.okinawa_camp_refunds (
 refund_id text primary key, payment_intent_id text not null, amount_jpy integer not null check(amount_jpy>=0),
 status text not null, updated_at timestamptz not null default now()
);
alter table public.okinawa_camp_refunds enable row level security;
revoke all on public.okinawa_camp_refunds from anon, authenticated;
grant all on public.okinawa_camp_refunds to service_role;
create index on public.okinawa_camp_refunds(payment_intent_id);
create function public.record_okinawa_camp_booking(p_booking jsonb) returns void
language plpgsql security invoker set search_path=public,pg_temp as $$
begin
 insert into public.okinawa_camp_bookings as b(checkout_session_id,payment_intent_id,payment_link_id,plan,amount_jpy,payment_status,guardian_name,guardian_email,guardian_phone,billing_address,player_name,player_details,consent_accepted,paid_at)
 values(p_booking->>'checkout_session_id',p_booking->>'payment_intent_id',p_booking->>'payment_link_id',p_booking->>'plan',(p_booking->>'amount_jpy')::integer,p_booking->>'payment_status',p_booking->>'guardian_name',p_booking->>'guardian_email',p_booking->>'guardian_phone',p_booking->'billing_address',p_booking->>'player_name',p_booking->>'player_details',(p_booking->>'consent_accepted')::boolean,(p_booking->>'paid_at')::timestamptz)
 on conflict(checkout_session_id) do update set
 payment_intent_id=coalesce(b.payment_intent_id,excluded.payment_intent_id),
 payment_status=case when b.payment_status in ('paid','partially_refunded','refunded') then b.payment_status when excluded.payment_status='paid' then 'paid' when b.payment_status='failed' then 'failed' else excluded.payment_status end,
 paid_at=coalesce(b.paid_at,excluded.paid_at),updated_at=now();
end; $$;
revoke all on function public.record_okinawa_camp_booking(jsonb) from public, anon, authenticated;
grant execute on function public.record_okinawa_camp_booking(jsonb) to service_role;
create function public.record_okinawa_camp_refund(p_id text,p_payment_intent_id text,p_amount integer,p_status text) returns void
language plpgsql security invoker set search_path=public,pg_temp as $$
begin
 perform 1 from public.okinawa_camp_bookings where payment_intent_id=p_payment_intent_id for update;
 insert into public.okinawa_camp_refunds as r(refund_id,payment_intent_id,amount_jpy,status) values(p_id,p_payment_intent_id,p_amount,p_status)
 on conflict(refund_id) do update set status=case when r.status='succeeded' then r.status else excluded.status end,updated_at=now();
 update public.okinawa_camp_bookings b set
 refunded_jpy=(select coalesce(sum(amount_jpy),0) from public.okinawa_camp_refunds where payment_intent_id=p_payment_intent_id and status='succeeded'),
 payment_status=case when (select coalesce(sum(amount_jpy),0) from public.okinawa_camp_refunds where payment_intent_id=p_payment_intent_id and status='succeeded')>=b.amount_jpy then 'refunded' when exists(select 1 from public.okinawa_camp_refunds where payment_intent_id=p_payment_intent_id and status='succeeded' and amount_jpy>0) then 'partially_refunded' else b.payment_status end,updated_at=now()
 where b.payment_intent_id=p_payment_intent_id;
end; $$;
revoke all on function public.record_okinawa_camp_refund(text,text,integer,text) from public,anon,authenticated;
grant execute on function public.record_okinawa_camp_refund(text,text,integer,text) to service_role;
