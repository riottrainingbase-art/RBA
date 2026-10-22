begin;
create temporary table mvp_test_actors(label text primary key,id uuid default gen_random_uuid());
insert into mvp_test_actors(label) values('lead'),('coach'),('outsider');
grant select on mvp_test_actors to authenticated;
insert into auth.users(id,email,email_confirmed_at,raw_user_meta_data,raw_app_meta_data,aud,role)
 select id,id::text||'@example.invalid',now(),'{"role":"coach"}'::jsonb,'{}'::jsonb,'authenticated','authenticated' from mvp_test_actors;
insert into private.mvp_coach_invitations(email,member_role) select id::text||'@example.invalid','manager' from mvp_test_actors where label='lead';
select set_config('request.jwt.claim.sub',(select id::text from mvp_test_actors where label='lead'),true);
set local role authenticated;
insert into public.mvp_coach_members(user_id,display_name,member_role,status) values(auth.uid(),'Test lead','manager','active');
reset role;
select set_config('request.jwt.claim.sub',(select id::text from mvp_test_actors where label='coach'),true);
set local role authenticated;
insert into public.mvp_coach_members(user_id,display_name) values(auth.uid(),'Test coach');
do $$begin
 if (select count(*) from public.mvp_coach_members)<>1 then raise exception 'Pending member can see other memberships'; end if;
 begin
  insert into public.mvp_coach_threads(user_id,kind,topic,title,body) values(auth.uid(),'question','practice','Pending must fail','This must be blocked.');
  raise exception 'Pending member posted';
 exception when insufficient_privilege then null; end;
 update public.mvp_coach_members set status='active' where user_id=auth.uid();
 if exists(select 1 from public.mvp_coach_members where user_id=auth.uid() and status='active') then raise exception 'Self approval allowed'; end if;
 begin
  update public.mvp_coach_members set member_role='manager' where user_id=auth.uid();
  raise exception 'Role forgery allowed';
 exception when insufficient_privilege then null; end;
end $$;
reset role;
select set_config('request.jwt.claim.sub',(select id::text from mvp_test_actors where label='lead'),true);
set local role authenticated;
update public.mvp_coach_members set status='active' where user_id=(select id from mvp_test_actors where label='coach');
reset role;
select set_config('request.jwt.claim.sub',(select id::text from mvp_test_actors where label='coach'),true);
set local role authenticated;
insert into public.mvp_coach_threads(user_id,kind,topic,title,body,age_group) values(auth.uid(),'question','fast-break','How can we run wide?','We tried a two on one. What should we observe?','U13');
insert into public.mvp_coach_replies(thread_id,user_id,body) select id,auth.uid(),'We will try this in our next practice.' from public.mvp_coach_threads where user_id=auth.uid();
do $$begin
 if (select count(*) from public.mvp_coach_replies where user_id=auth.uid())<>1 then raise exception 'Reply persistence failed'; end if;
 begin
  insert into public.mvp_coach_threads(user_id,kind,topic,title,body) select id,'idea','coaching','Forged author','Should not impersonate another coach.' from mvp_test_actors where label='lead';
  raise exception 'Author forgery allowed';
 exception when insufficient_privilege then null; end;
 begin
  insert into public.mvp_coach_threads(user_id,kind,topic,title,body,created_at) values(auth.uid(),'idea','coaching','Forged time','Should not fake creation date.',now()+interval '1 year');
  raise exception 'Timestamp forgery allowed';
 exception when insufficient_privilege then null; end;
end $$;
update public.mvp_coach_threads set status='resolved' where user_id=auth.uid();
do $$begin
 begin
  insert into public.mvp_coach_replies(thread_id,user_id,body) select id,auth.uid(),'Closed thread must reject this reply.' from public.mvp_coach_threads where user_id=auth.uid();
  raise exception 'Closed thread accepted reply';
 exception when insufficient_privilege then null; end;
end $$;
reset role;
select set_config('request.jwt.claim.sub',(select id::text from mvp_test_actors where label='outsider'),true);
set local role authenticated;
do $$begin
 if exists(select 1 from public.mvp_coach_threads) or exists(select 1 from public.mvp_coach_replies) then raise exception 'Outsider read private discussion'; end if;
 begin
  insert into public.mvp_coach_members(user_id,display_name,member_role,status) values(auth.uid(),'Fake lead','manager','active');
  raise exception 'Outsider claimed manager';
 exception when insufficient_privilege then null; end;
end $$;
reset role;
select set_config('request.jwt.claim.sub',(select id::text from mvp_test_actors where label='lead'),true);
set local role authenticated;
do $$begin
 if not exists(select 1 from public.mvp_coach_threads where title='How can we run wide?') then raise exception 'Lead cannot read member thread'; end if;
end $$;
update public.mvp_coach_threads set status='open' where user_id=(select id from mvp_test_actors where label='coach');
insert into public.mvp_coach_replies(thread_id,user_id,body) select id,auth.uid(),'Test lead reply to the coach.' from public.mvp_coach_threads where user_id=(select id from mvp_test_actors where label='coach');
update public.mvp_coach_members set status='declined' where user_id=(select id from mvp_test_actors where label='coach');
reset role;
select set_config('request.jwt.claim.sub',(select id::text from mvp_test_actors where label='coach'),true);
set local role authenticated;
do $$begin
 if exists(select 1 from public.mvp_coach_threads) or exists(select 1 from public.mvp_coach_replies) then raise exception 'Revoked member still has access'; end if;
 begin
  insert into public.mvp_coach_replies(thread_id,user_id,body) values(gen_random_uuid(),auth.uid(),'Revoked must not post.');
  raise exception 'Revoked user can post';
 exception when insufficient_privilege then null; end;
end $$;
reset role;
set local role anon;
do $$begin
 begin
  perform 1 from public.mvp_coach_threads;
  raise exception 'Anonymous discussion read allowed';
 exception when insufficient_privilege then null; end;
end $$;
reset role;
delete from auth.users where id=(select id from mvp_test_actors where label='coach');
do $$begin
 if exists(select 1 from public.mvp_coach_threads where user_id in (select id from mvp_test_actors)) then raise exception 'Account deletion left discussion data'; end if;
end $$;
select 'PASS: account cleanup; invited manager, pending/active/revoked/outside/anon isolation, persistent thread and reply, role/author/time forgery, closed thread enforcement; fixtures rolled back' as result;
rollback;
