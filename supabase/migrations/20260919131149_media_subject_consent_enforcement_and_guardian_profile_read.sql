
create table if not exists public.media_subjects (
  id uuid primary key default gen_random_uuid(),
  media_id uuid not null references public.event_media(id) on delete cascade,
  player_user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(media_id, player_user_id)
);
alter table public.media_subjects enable row level security;
create index if not exists idx_media_subjects_media_id on public.media_subjects(media_id);
create index if not exists idx_media_subjects_player_user_id on public.media_subjects(player_user_id);

create policy "media subjects entitled or admin read"
on public.media_subjects for select to authenticated
using (
  exists(
    select 1
    from public.event_media em
    join public.event_albums ea on ea.id=em.album_id
    join public.participations p on p.event_id=ea.event_id
    where em.id=media_subjects.media_id
      and p.attendance_status='attended'
      and (
        p.player_user_id=(select auth.uid())
        or exists(
          select 1 from public.guardian_links gl
          where gl.child_user_id=p.player_user_id
            and gl.parent_user_id=(select auth.uid())
            and gl.verified_at is not null
        )
      )
  )
  or exists(select 1 from public.profiles me where me.id=(select auth.uid()) and me.role='admin')
);

create policy "admin manages media subjects"
on public.media_subjects for all to authenticated
using (exists(select 1 from public.profiles me where me.id=(select auth.uid()) and me.role='admin'))
with check (exists(select 1 from public.profiles me where me.id=(select auth.uid()) and me.role='admin'));

drop policy if exists "event media entitled read" on storage.objects;
create policy "event media entitled read"
on storage.objects for select to authenticated
using (
  bucket_id='event-media'
  and exists (
    select 1
    from public.event_media em
    join public.event_albums ea on ea.id=em.album_id
    join public.participations pp on pp.event_id=ea.event_id
    where em.storage_path=storage.objects.name
      and em.is_published=true
      and pp.attendance_status='attended'
      and (
        pp.player_user_id=(select auth.uid())
        or exists(
          select 1 from public.guardian_links gl
          where gl.child_user_id=pp.player_user_id
            and gl.parent_user_id=(select auth.uid())
            and gl.verified_at is not null
        )
      )
      and not exists (
        select 1
        from public.media_subjects ms
        where ms.media_id=em.id
          and not exists (
            select 1
            from public.media_consents mc
            where mc.player_user_id=ms.player_user_id
              and mc.allow_photo=true
              and mc.scope='event_participants_only'
              and mc.revoked_at is null
          )
      )
  )
);

drop policy if exists "profile self or admin read" on public.profiles;
create policy "profile self guardian or admin read" on public.profiles for select to authenticated
using (
  id=(select auth.uid())
  or exists(
    select 1 from public.guardian_links gl
    where gl.parent_user_id=(select auth.uid())
      and gl.child_user_id=profiles.id
      and gl.verified_at is not null
  )
  or exists(select 1 from public.profiles me where me.id=(select auth.uid()) and me.role='admin')
);

