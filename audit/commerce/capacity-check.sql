begin;
do $$
declare e uuid; p1 uuid; p2 uuid; a jsonb; b jsonb; c jsonb; d jsonb;
begin
  select id into e from public.events order by id limit 1;
  select id into p1 from public.profiles order by id limit 1;
  select id into p2 from public.profiles where id<>p1 order by id limit 1;
  if e is null or p1 is null or p2 is null then raise exception 'fixture unavailable'; end if;
  delete from public.program_waitlist where event_id=e and subject_user_id in(p1,p2);
  a:=public.rba_reserve_checkout_capacity(e,p1,null,1);
  b:=public.rba_reserve_checkout_capacity(e,p1,null,1);
  c:=public.rba_reserve_checkout_capacity(e,p2,null,1);
  d:=public.rba_reserve_checkout_capacity(e,p2,null,0);
  if (a->>'allowed')::boolean is not true or a->>'reason'<>'seat_held' then raise exception 'seat hold failed'; end if;
  if (b->>'allowed')::boolean is not true or b->>'reason'<>'existing_hold' then raise exception 'repeat hold failed'; end if;
  if (c->>'allowed')::boolean is not false or c->>'reason'<>'capacity_reached' then raise exception 'waitlist failed'; end if;
  if (d->>'allowed')::boolean is not false or d->>'reason'<>'capacity_not_configured' then raise exception 'fail closed failed'; end if;
end $$;
rollback;
