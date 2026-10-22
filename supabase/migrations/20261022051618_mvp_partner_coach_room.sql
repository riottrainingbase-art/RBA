-- MVP partner access is independent of paid subscriptions and global admin privileges.
create table private.mvp_coach_invitations (
 email text primary key check (email = lower(email)),
 member_role text not null check (member_role in ('manager','coach'))
);
insert into private.mvp_coach_invitations(email,member_role) values
 ('riot.training.base@gmail.com','manager'), ('wingwai.wong@gmail.com','manager');
alter table private.mvp_coach_invitations enable row level security;
revoke all on private.mvp_coach_invitations from public,anon,authenticated;

create table public.mvp_coach_members (
 user_id uuid primary key references auth.users(id) on delete cascade,
 display_name text not null check (char_length(trim(display_name)) between 2 and 60),
 member_role text not null default 'coach' check (member_role in ('manager','coach')),
 status text not null default 'pending' check (status in ('pending','active','declined')),
 created_at timestamptz not null default now()
);
alter table public.mvp_coach_members enable row level security;
-- Internal lookups require an authenticated identity. No user-editable metadata is trusted.
create function private.mvp_coach_role() returns text language sql stable security definer set search_path='' as $$
 select m.member_role from public.mvp_coach_members m where auth.uid() is not null and m.user_id=auth.uid() and m.status='active'
$$;
create function private.mvp_invited_role() returns text language sql stable security definer set search_path='' as $$
 select i.member_role from private.mvp_coach_invitations i join auth.users u on lower(u.email)=i.email
 where auth.uid() is not null and u.id=auth.uid() and u.email_confirmed_at is not null
$$;
create function private.mvp_email_confirmed() returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from auth.users u where auth.uid() is not null and u.id=auth.uid() and u.email_confirmed_at is not null)
$$;
revoke all on function private.mvp_email_confirmed() from public,anon;
grant execute on function private.mvp_email_confirmed() to authenticated;
revoke all on function private.mvp_coach_role(),private.mvp_invited_role() from public,anon;
grant usage on schema private to authenticated;
grant execute on function private.mvp_coach_role(),private.mvp_invited_role() to authenticated;
revoke all on public.mvp_coach_members from anon,authenticated;
grant select,insert on public.mvp_coach_members to authenticated;
grant update(status) on public.mvp_coach_members to authenticated;
create policy mvp_members_read on public.mvp_coach_members for select to authenticated using (
 user_id=(select auth.uid()) or (select private.mvp_coach_role())='manager' or (status='active' and (select private.mvp_coach_role()) is not null)
);
create policy mvp_members_request on public.mvp_coach_members for insert to authenticated with check (
 user_id=(select auth.uid()) and (select private.mvp_email_confirmed())
 and member_role=coalesce((select private.mvp_invited_role()),'coach')
 and status=case when (select private.mvp_invited_role()) is not null then 'active' else 'pending' end
);
-- Coaches cannot self-approve, modify roles, or remove a manager.
create policy mvp_members_manage on public.mvp_coach_members for update to authenticated
 using ((select private.mvp_coach_role())='manager' and member_role='coach')
 with check ((select private.mvp_coach_role())='manager' and member_role='coach');

create table public.mvp_coach_threads (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references public.mvp_coach_members(user_id),
 kind text not null check (kind in ('question','practice','idea')),
 topic text not null check (topic in ('movement','fast-break','shooting','practice','development','coaching')),
 title text not null check (char_length(trim(title)) between 5 and 140),
 body text not null check (char_length(trim(body)) between 10 and 4000),
 age_group text not null default '' check (char_length(age_group)<=60),
 status text not null default 'open' check (status in ('open','resolved')),
 created_at timestamptz not null default now()
);
create index mvp_threads_created on public.mvp_coach_threads(created_at desc,id);
create index mvp_threads_author on public.mvp_coach_threads(user_id,created_at desc);
create table public.mvp_coach_replies (
 id uuid primary key default gen_random_uuid(),
 thread_id uuid not null references public.mvp_coach_threads(id) on delete cascade,
 user_id uuid not null references public.mvp_coach_members(user_id),
 body text not null check (char_length(trim(body)) between 2 and 3000),
 created_at timestamptz not null default now()
);
create index mvp_replies_thread on public.mvp_coach_replies(thread_id,created_at,id);
create index mvp_replies_author on public.mvp_coach_replies(user_id,created_at desc);
alter table public.mvp_coach_threads enable row level security;
alter table public.mvp_coach_replies enable row level security;
revoke all on public.mvp_coach_threads,public.mvp_coach_replies from anon,authenticated;
grant select,delete on public.mvp_coach_threads,public.mvp_coach_replies to authenticated;
grant insert(user_id,kind,topic,title,body,age_group) on public.mvp_coach_threads to authenticated;
grant insert(thread_id,user_id,body) on public.mvp_coach_replies to authenticated;
grant update(status) on public.mvp_coach_threads to authenticated;
create policy mvp_threads_read on public.mvp_coach_threads for select to authenticated using ((select private.mvp_coach_role()) is not null);
create policy mvp_threads_post on public.mvp_coach_threads for insert to authenticated with check ((select private.mvp_coach_role()) is not null and user_id=(select auth.uid()) and status='open');
create policy mvp_threads_resolve on public.mvp_coach_threads for update to authenticated using ((select private.mvp_coach_role()) is not null and (user_id=(select auth.uid()) or (select private.mvp_coach_role())='manager')) with check ((select private.mvp_coach_role()) is not null and (user_id=(select auth.uid()) or (select private.mvp_coach_role())='manager'));
create policy mvp_threads_moderate on public.mvp_coach_threads for delete to authenticated using ((select private.mvp_coach_role())='manager');
create policy mvp_replies_read on public.mvp_coach_replies for select to authenticated using ((select private.mvp_coach_role()) is not null);
create policy mvp_replies_post on public.mvp_coach_replies for insert to authenticated with check ((select private.mvp_coach_role()) is not null and user_id=(select auth.uid()) and exists(select 1 from public.mvp_coach_threads t where t.id=thread_id and t.status='open'));
create policy mvp_replies_remove on public.mvp_coach_replies for delete to authenticated using ((select private.mvp_coach_role()) is not null and (user_id=(select auth.uid()) or (select private.mvp_coach_role())='manager'));
-- Seed only the already verified RBA owner. Wong claims his invitation using his confirmed email.
insert into public.mvp_coach_members(user_id,display_name,member_role,status)
 select id,'Masato Nishio · RBA','manager','active' from auth.users where lower(email)='riot.training.base@gmail.com' and email_confirmed_at is not null;

create function private.mvp_post_limit() returns trigger language plpgsql security invoker set search_path='' as $$
begin
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(new.user_id::text,0));
 if tg_table_name='mvp_coach_threads' then
   if (select count(*) from public.mvp_coach_threads where user_id=new.user_id and created_at>now()-interval '10 minutes')>=10 then
     raise exception 'Please wait before starting another discussion.';
   end if;
 else
   if (select count(*) from public.mvp_coach_replies where user_id=new.user_id and created_at>now()-interval '10 minutes')>=30 then
     raise exception 'Please wait before posting another reply.';
   end if;
 end if;
 return new;
end $$;
revoke all on function private.mvp_post_limit() from public,anon;
create trigger mvp_thread_limit before insert on public.mvp_coach_threads for each row execute function private.mvp_post_limit();
create trigger mvp_reply_limit before insert on public.mvp_coach_replies for each row execute function private.mvp_post_limit();
