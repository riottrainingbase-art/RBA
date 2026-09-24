begin;
select set_config('rba.owner',gen_random_uuid()::text,true),set_config('rba.other',gen_random_uuid()::text,true),set_config('rba.person',gen_random_uuid()::text,true),set_config('rba.media',gen_random_uuid()::text,true);
insert into auth.users(id,email) values(current_setting('rba.owner')::uuid,'media-owner@example.invalid'),(current_setting('rba.other')::uuid,'media-other@example.invalid');
set local role authenticated;
select set_config('request.jwt.claim.sub',current_setting('rba.owner'),true);
insert into public.homecourt_people(id,user_id,name,relationship) values(current_setting('rba.person')::uuid,auth.uid(),'検証','self');
insert into public.homecourt_media(id,user_id,person_id,storage_path,mime_type,title,captured_on,review_on) values(current_setting('rba.media')::uuid,auth.uid(),current_setting('rba.person')::uuid,current_setting('rba.owner')||'/'||current_setting('rba.person')||'/'||current_setting('rba.media'),'image/jpeg','検証',(now() at time zone 'Asia/Tokyo')::date,current_date+7);
insert into storage.objects(bucket_id,name) values('homecourt-private',current_setting('rba.owner')||'/'||current_setting('rba.person')||'/'||current_setting('rba.media'));
do $$ begin
 if not exists(select 1 from public.homecourt_media where id=current_setting('rba.media')::uuid) then raise exception 'owner read failed';end if;
 if not exists(select 1 from storage.objects where bucket_id='homecourt-private') then raise exception 'owner file read failed';end if;
 update public.homecourt_media set noticed='変化',next_action='次の練習' where id=current_setting('rba.media')::uuid;
 begin
 update public.homecourt_media set user_id=current_setting('rba.other')::uuid;
 raise exception 'ownership transfer allowed';
 exception when insufficient_privilege or check_violation then null;end;
 begin
 update public.homecourt_media set captured_on=(now() at time zone 'Asia/Tokyo')::date+1;
 raise exception 'future date allowed';exception when check_violation then null;end;
 begin
 insert into storage.objects(bucket_id,name) values('homecourt-private',current_setting('rba.owner')||'/unregistered/file');
 raise exception 'unregistered upload allowed';exception when insufficient_privilege then null;end;
end $$;
select set_config('request.jwt.claim.sub',current_setting('rba.other'),true);
do $$ declare n int;begin
 if exists(select 1 from public.homecourt_media) or exists(select 1 from storage.objects where bucket_id='homecourt-private') then raise exception 'cross-account read allowed';end if;
 update public.homecourt_media set title='forbidden';get diagnostics n=row_count;if n<>0 then raise exception 'cross-account update allowed';end if;
 delete from public.homecourt_media;get diagnostics n=row_count;if n<>0 then raise exception 'cross-account delete allowed';end if;
 begin
 insert into storage.objects(bucket_id,name) values('homecourt-private',current_setting('rba.owner')||'/'||current_setting('rba.person')||'/other');
 raise exception 'cross-account file upload allowed';exception when insufficient_privilege then null;end;
end $$;
reset role;
set local role anon;
do $$ begin
 if exists(select 1 from storage.objects where bucket_id='homecourt-private') then raise exception 'anonymous files exposed';end if;
 begin perform 1 from public.homecourt_media;raise exception 'anonymous metadata exposed';exception when insufficient_privilege then null;end;
end $$;
reset role;
select 'PASS: owner read/edit/upload, private files, cross-account and anonymous isolation, path and future-date validation' as result;
rollback;
