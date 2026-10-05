
alter table public.dhub_memberships
  add column if not exists program_type text not null default 'coach_lab',
  add column if not exists subject_name text,
  add column if not exists guardian_name text,
  add column if not exists subject_category text,
  add column if not exists metadata jsonb not null default '{}'::jsonb;

update public.dhub_memberships set program_type='coach_lab' where program_type is null or program_type='';

do $$ begin
  if not exists (
    select 1 from pg_constraint where conname='dhub_memberships_program_type_check'
  ) then
    alter table public.dhub_memberships add constraint dhub_memberships_program_type_check
      check (program_type in ('coach_lab','players'));
  end if;
end $$;

alter table public.dhub_access_requests
  add column if not exists program_type text not null default 'coach_lab';

do $$ begin
  if not exists (
    select 1 from pg_constraint where conname='dhub_access_requests_program_type_check'
  ) then
    alter table public.dhub_access_requests add constraint dhub_access_requests_program_type_check
      check (program_type in ('coach_lab','players'));
  end if;
end $$;

alter table public.dhub_announcements
  add column if not exists program_type text not null default 'coach_lab';
alter table public.dhub_live_sessions
  add column if not exists program_type text not null default 'coach_lab';

do $$ begin
  if not exists (select 1 from pg_constraint where conname='dhub_announcements_program_type_check') then
    alter table public.dhub_announcements add constraint dhub_announcements_program_type_check
      check (program_type in ('coach_lab','players','all'));
  end if;
  if not exists (select 1 from pg_constraint where conname='dhub_live_sessions_program_type_check') then
    alter table public.dhub_live_sessions add constraint dhub_live_sessions_program_type_check
      check (program_type in ('coach_lab','players'));
  end if;
end $$;

create or replace function public.has_dhub_program_access(p_program_type text)
returns boolean
language sql
stable
security definer
set search_path=public,auth
as $$
  select exists (
    select 1 from public.dhub_memberships d
    where d.program_type=p_program_type
      and d.status in ('active','grace')
      and (d.access_until is null or d.access_until>=now())
      and (
        d.linked_user_id=auth.uid()
        or lower(d.email_normalized)=lower(coalesce(auth.jwt()->>'email',''))
        or lower(coalesce(auth.jwt()->>'email',''))=any(d.alternate_emails)
      )
  );
$$;

create or replace function public.has_dhub_coach_access()
returns boolean language sql stable security definer set search_path=public,auth
as $$ select public.has_dhub_program_access('coach_lab'); $$;

create or replace function public.has_dhub_player_access()
returns boolean language sql stable security definer set search_path=public,auth
as $$ select public.has_dhub_program_access('players'); $$;

create or replace function public.has_dhub_access()
returns boolean language sql stable security definer set search_path=public,auth
as $$ select public.has_dhub_coach_access() or public.has_dhub_player_access(); $$;

revoke all on function public.has_dhub_program_access(text) from public;
revoke all on function public.has_dhub_coach_access() from public;
revoke all on function public.has_dhub_player_access() from public;
revoke all on function public.has_dhub_access() from public;
grant execute on function public.has_dhub_program_access(text) to authenticated;
grant execute on function public.has_dhub_coach_access() to authenticated;
grant execute on function public.has_dhub_player_access() to authenticated;
grant execute on function public.has_dhub_access() to authenticated;

drop policy if exists "dhub paid members read lessons" on public.dhub_lessons;
create policy "dhub coach members read lessons" on public.dhub_lessons
for select to authenticated using (
  published=true and (
    public.has_dhub_coach_access()
    or exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin')
  )
);

drop policy if exists "dhub member read own progress" on public.dhub_lesson_progress;
create policy "dhub coach read own progress" on public.dhub_lesson_progress
for select to authenticated using (
  user_id=auth.uid() and (
    public.has_dhub_coach_access()
    or exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin')
  )
);
drop policy if exists "dhub member insert own progress" on public.dhub_lesson_progress;
create policy "dhub coach insert own progress" on public.dhub_lesson_progress
for insert to authenticated with check (user_id=auth.uid() and public.has_dhub_coach_access());
drop policy if exists "dhub member update own progress" on public.dhub_lesson_progress;
create policy "dhub coach update own progress" on public.dhub_lesson_progress
for update to authenticated using (user_id=auth.uid() and public.has_dhub_coach_access())
with check (user_id=auth.uid() and public.has_dhub_coach_access());

drop policy if exists "dhub profile self insert" on public.dhub_member_profiles;
create policy "dhub coach profile self insert" on public.dhub_member_profiles
for insert to authenticated with check (user_id=auth.uid() and public.has_dhub_coach_access());
drop policy if exists "dhub profile self update" on public.dhub_member_profiles;
create policy "dhub coach profile self update" on public.dhub_member_profiles
for update to authenticated using (user_id=auth.uid() and public.has_dhub_coach_access())
with check (user_id=auth.uid() and public.has_dhub_coach_access());

drop policy if exists "dhub tool self read" on public.dhub_tool_entries;
create policy "dhub coach tool self read" on public.dhub_tool_entries
for select to authenticated using (user_id=auth.uid() and public.has_dhub_coach_access());
drop policy if exists "dhub tool self insert" on public.dhub_tool_entries;
create policy "dhub coach tool self insert" on public.dhub_tool_entries
for insert to authenticated with check (user_id=auth.uid() and public.has_dhub_coach_access());
drop policy if exists "dhub tool self update" on public.dhub_tool_entries;
create policy "dhub coach tool self update" on public.dhub_tool_entries
for update to authenticated using (user_id=auth.uid() and public.has_dhub_coach_access())
with check (user_id=auth.uid() and public.has_dhub_coach_access());

drop policy if exists "dhub members read announcements" on public.dhub_announcements;
create policy "dhub program members read announcements" on public.dhub_announcements
for select to authenticated using (
  published=true and (
    (program_type in ('coach_lab','all') and public.has_dhub_coach_access())
    or (program_type in ('players','all') and public.has_dhub_player_access())
    or exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin')
  )
);

drop policy if exists "dhub members read sessions" on public.dhub_live_sessions;
create policy "dhub program members read sessions" on public.dhub_live_sessions
for select to authenticated using (
  published=true and (
    (program_type='coach_lab' and public.has_dhub_coach_access())
    or (program_type='players' and public.has_dhub_player_access())
    or exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin')
  )
);

create index if not exists dhub_memberships_program_idx on public.dhub_memberships(program_type,status);
create index if not exists dhub_access_requests_program_idx on public.dhub_access_requests(program_type,status,created_at desc);

