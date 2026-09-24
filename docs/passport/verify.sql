begin;
-- All synthetic users and test data roll back at the end.
select set_config('rba.test_owner',gen_random_uuid()::text,true),set_config('rba.test_other',gen_random_uuid()::text,true),set_config('rba.test_person',gen_random_uuid()::text,true);
insert into auth.users(id,email) values(current_setting('rba.test_owner')::uuid,'passport-test-owner@example.invalid'),(current_setting('rba.test_other')::uuid,'passport-test-other@example.invalid');
set local role authenticated;
select set_config('request.jwt.claim.sub',current_setting('rba.test_owner'),true);
insert into public.homecourt_people(id,user_id,name,relationship) values(current_setting('rba.test_person')::uuid,auth.uid(),'検証用','self');
insert into public.homecourt_history(user_id,person_id,title,occurred_on) values(auth.uid(),current_setting('rba.test_person')::uuid,'検証クリニック',current_date);
insert into public.homecourt_checkins(user_id,person_id,checked_on,strengths,challenge,next_action) values(auth.uid(),current_setting('rba.test_person')::uuid,current_date,'周りを見る','判断','一度試す');
insert into public.homecourt_goals(user_id,person_id,title,horizon,action,success,target_on) values(auth.uid(),current_setting('rba.test_person')::uuid,'次の一歩','week','声をかける','一度できた',current_date+7);
do $$ begin
 if (select count(*) from public.homecourt_history)<>1 or (select count(*) from public.homecourt_checkins)<>1 or (select count(*) from public.homecourt_goals)<>1 then raise exception 'owner read failed';end if;
 update public.homecourt_goals set status='achieved' where user_id=auth.uid();
 if not exists(select 1 from public.homecourt_goals where status='achieved') then raise exception 'owner update failed';end if;
 begin
  update public.homecourt_people set user_id=current_setting('rba.test_other')::uuid where id=current_setting('rba.test_person')::uuid;
  raise exception 'owner transfer allowed';
 exception when insufficient_privilege then null;end;
 begin
  insert into public.homecourt_history(user_id,person_id,title,occurred_on) values(auth.uid(),current_setting('rba.test_person')::uuid,'未来',current_date+1);
  raise exception 'future date allowed';
 exception when check_violation then null;end;
end $$;
select set_config('request.jwt.claim.sub',current_setting('rba.test_other'),true);
do $$ declare n int; begin
 if exists(select 1 from public.homecourt_people) or exists(select 1 from public.homecourt_history) or exists(select 1 from public.homecourt_checkins) or exists(select 1 from public.homecourt_goals) then raise exception 'cross account read allowed';end if;
 update public.homecourt_goals set title='not allowed';get diagnostics n=row_count;if n<>0 then raise exception 'cross account update allowed';end if;
 delete from public.homecourt_history;get diagnostics n=row_count;if n<>0 then raise exception 'cross account delete allowed';end if;
 begin
  insert into public.homecourt_history(user_id,person_id,title,occurred_on) values(auth.uid(),current_setting('rba.test_person')::uuid,'not allowed',current_date);
  raise exception 'cross account subject injection allowed';
 exception when foreign_key_violation then null;end;
end $$;
select set_config('request.jwt.claim.sub',current_setting('rba.test_owner'),true);
delete from public.homecourt_history where user_id=auth.uid();
do $$ begin if exists(select 1 from public.homecourt_history) then raise exception 'owner delete failed';end if;end $$;
select 'PASS: owner create/read/update/delete; cross-account isolation; ownership transfer; future-date validation' as verification;
rollback;
