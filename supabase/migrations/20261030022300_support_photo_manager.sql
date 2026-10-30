create table public.rba_support_photo_editors (
 user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.rba_support_photo_editors enable row level security;
grant select on public.rba_support_photo_editors to authenticated;
create policy "support editor reads own permission" on public.rba_support_photo_editors for select to authenticated using (user_id=(select auth.uid()));
insert into public.rba_support_photo_editors(user_id) select id from auth.users where lower(email)='riot.training.base@gmail.com' and email_confirmed_at is not null;

create table public.rba_support_photos (
 id uuid primary key default gen_random_uuid(),
 path text not null unique check(path in ('/media/support/clinic-players.jpg','/media/support/backbone-chiba.jpg','/media/support/players-and-coaches.jpg','/media/support/court-community.jpg') or path ~ '^uploads/[0-9a-f-]{36}\.jpg$'),
 caption text not null default '' check(length(caption)<=300),
 alt text not null default '' check(length(alt)<=300),
 width integer not null check(width between 1 and 10000),height integer not null check(height between 1 and 10000),
 sort_order integer not null default 0 check(sort_order>=0),
 published boolean not null default false,
 consent_confirmed_at timestamptz,
 created_at timestamptz not null default now(),updated_at timestamptz not null default now(),
 check(not published or (consent_confirmed_at is not null and length(trim(caption))>0 and length(trim(alt))>0))
);
create index rba_support_photos_order_idx on public.rba_support_photos(published,sort_order,created_at desc);
alter table public.rba_support_photos enable row level security;
grant select on public.rba_support_photos to anon,authenticated;
grant insert,update on public.rba_support_photos to authenticated;
create policy "published support photos read" on public.rba_support_photos for select to anon,authenticated using(published);
create policy "support editor manages photos" on public.rba_support_photos for all to authenticated
 using(exists(select 1 from public.rba_support_photo_editors e where e.user_id=(select auth.uid())))
 with check(exists(select 1 from public.rba_support_photo_editors e where e.user_id=(select auth.uid())));

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values ('rba-support-photos','rba-support-photos',false,3145728,array['image/jpeg','image/png','image/webp']);
create policy "support editor manages photo files" on storage.objects for all to authenticated
 using(bucket_id='rba-support-photos' and exists(select 1 from public.rba_support_photo_editors e where e.user_id=(select auth.uid())))
 with check(bucket_id='rba-support-photos' and exists(select 1 from public.rba_support_photo_editors e where e.user_id=(select auth.uid())));
create policy "published support photo files read" on storage.objects for select to anon,authenticated
 using(bucket_id='rba-support-photos' and exists(select 1 from public.rba_support_photos p where p.path=storage.objects.name and p.published));

create function public.rba_reorder_support_photos(photo_ids uuid[]) returns void language plpgsql security invoker set search_path='' as $$
begin
 if not exists(select 1 from public.rba_support_photo_editors where user_id=(select auth.uid())) then raise exception 'forbidden'; end if;
 if cardinality(photo_ids) not between 1 and 1000 or cardinality(photo_ids)<>(select count(distinct id) from unnest(photo_ids) id) then raise exception 'invalid order'; end if;
 if (select count(*) from public.rba_support_photos where id=any(photo_ids))<>cardinality(photo_ids) then raise exception 'unknown photo'; end if;
 update public.rba_support_photos p set sort_order=n.position::integer*100,updated_at=now() from unnest(photo_ids) with ordinality n(id,position) where p.id=n.id;
end;
$$;
revoke all on function public.rba_reorder_support_photos(uuid[]) from public,anon;
grant execute on function public.rba_reorder_support_photos(uuid[]) to authenticated;

insert into public.rba_support_photos(path,caption,alt,width,height,sort_order,published,consent_confirmed_at) values
('/media/support/clinic-players.jpg','この一日の先に、もう一度挑戦できる場所を。','クリニックに集まった選手と指導者たちの集合写真',1536,1152,100,true,now()),
('/media/support/backbone-chiba.jpg','BACKBONE 3×3｜千葉チャプター Round 3','BACKBONE 3×3 千葉チャプターRound 3の集合写真',1170,1560,200,true,now()),
('/media/support/players-and-coaches.jpg','選手と指導者が、同じコートで学び合う。','コートに集まった選手と指導者たち',1536,1152,300,true,now()),
('/media/support/court-community.jpg','出会った人と、また次の機会をつくる。','選手と大人たちの集合写真',1536,1152,400,true,now());
