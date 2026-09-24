create table public.homecourt_media (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id),
 person_id uuid not null,
 storage_path text not null unique,
 mime_type text not null check(mime_type in ('image/jpeg','image/png','image/webp','video/mp4','video/quicktime','video/webm')),
 title text not null check(length(trim(title)) between 1 and 160),
 captured_on date not null check(captured_on between date '2000-01-01' and (now() at time zone 'Asia/Tokyo')::date),
 focus_seconds integer not null default 0 check(focus_seconds between 0 and 7200),
 noticed text not null default '' check(length(noticed)<=2000),
 next_action text not null default '' check(length(next_action)<=1000),
 review_on date not null,
 history_id uuid references public.homecourt_history(id) on delete set null,
 goal_id uuid references public.homecourt_goals(id) on delete set null,
 created_at timestamptz not null default now(),
 foreign key(person_id,user_id) references public.homecourt_people(id,user_id),
 check(storage_path = user_id::text || '/' || person_id::text || '/' || id::text)
);
create index homecourt_media_person_date on public.homecourt_media(user_id,person_id,captured_on desc);
alter table public.homecourt_media enable row level security;
revoke all on public.homecourt_media from anon;
grant select,insert,update,delete on public.homecourt_media to authenticated;
create policy "media owner reads" on public.homecourt_media for select to authenticated using((select auth.uid())=user_id);
create policy "media owner inserts" on public.homecourt_media for insert to authenticated with check(
 (select auth.uid())=user_id
 and (history_id is null or exists(select 1 from public.homecourt_history h where h.id=history_id and h.person_id=homecourt_media.person_id and h.user_id=(select auth.uid())))
 and (goal_id is null or exists(select 1 from public.homecourt_goals g where g.id=goal_id and g.person_id=homecourt_media.person_id and g.user_id=(select auth.uid())))
);
create policy "media owner edits" on public.homecourt_media for update to authenticated using((select auth.uid())=user_id) with check(
 (select auth.uid())=user_id
 and (history_id is null or exists(select 1 from public.homecourt_history h where h.id=history_id and h.person_id=homecourt_media.person_id and h.user_id=(select auth.uid())))
 and (goal_id is null or exists(select 1 from public.homecourt_goals g where g.id=goal_id and g.person_id=homecourt_media.person_id and g.user_id=(select auth.uid())))
);
create policy "media owner deletes" on public.homecourt_media for delete to authenticated using((select auth.uid())=user_id);
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('homecourt-private','homecourt-private',false,52428800,array['image/jpeg','image/png','image/webp','video/mp4','video/quicktime','video/webm']);
create policy "passport files owner reads" on storage.objects for select to authenticated using(bucket_id='homecourt-private' and (storage.foldername(name))[1]=(select auth.uid())::text);
create policy "passport files owner uploads" on storage.objects for insert to authenticated with check(bucket_id='homecourt-private' and (storage.foldername(name))[1]=(select auth.uid())::text and exists(select 1 from public.homecourt_media m where m.storage_path=name and m.user_id=(select auth.uid())));
create policy "passport files owner deletes" on storage.objects for delete to authenticated using(bucket_id='homecourt-private' and (storage.foldername(name))[1]=(select auth.uid())::text);
