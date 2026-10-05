
-- Consolidate SELECT policies to avoid multiple permissive policy evaluation.

drop policy if exists "public can read public events" on public.events;
drop policy if exists "admin manages events" on public.events;
create policy "events read public or admin" on public.events for select
using (
  status in ('open','completed')
  or exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin')
);
create policy "admin inserts events" on public.events for insert to authenticated
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy "admin updates events" on public.events for update to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy "admin deletes events" on public.events for delete to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

drop policy if exists "participation player or guardian read" on public.participations;
drop policy if exists "admin manages participations" on public.participations;
create policy "participations entitled or admin read" on public.participations for select to authenticated
using (
  player_user_id=(select auth.uid())
  or exists(
    select 1 from public.guardian_links gl
    where gl.child_user_id=participations.player_user_id
      and gl.parent_user_id=(select auth.uid())
      and gl.verified_at is not null
  )
  or exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin')
);
create policy "admin inserts participations" on public.participations for insert to authenticated
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy "admin updates participations" on public.participations for update to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy "admin deletes participations" on public.participations for delete to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

drop policy if exists "participant album access" on public.event_albums;
drop policy if exists "admin manages albums" on public.event_albums;
create policy "album entitled or admin read" on public.event_albums for select to authenticated
using (
  exists(
    select 1 from public.participations p
    where p.event_id=event_albums.event_id
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
  or exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin')
);
create policy "admin inserts albums" on public.event_albums for insert to authenticated
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy "admin updates albums" on public.event_albums for update to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy "admin deletes albums" on public.event_albums for delete to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

drop policy if exists "participant media metadata access" on public.event_media;
drop policy if exists "admin manages event media" on public.event_media;
create policy "event media entitled or admin read" on public.event_media for select to authenticated
using (
  (
    is_published=true
    and exists(
      select 1
      from public.event_albums a
      join public.participations p on p.event_id=a.event_id
      where a.id=event_media.album_id
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
  )
  or exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin')
);
create policy "admin inserts event media" on public.event_media for insert to authenticated
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy "admin updates event media" on public.event_media for update to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy "admin deletes event media" on public.event_media for delete to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

drop policy if exists "coach sees own partner profile" on public.coach_partner_profiles;
drop policy if exists "admin manages coach partner profiles" on public.coach_partner_profiles;
create policy "coach partner self or admin read" on public.coach_partner_profiles for select to authenticated
using (
  user_id=(select auth.uid())
  or exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin')
);
create policy "admin inserts coach partner profiles" on public.coach_partner_profiles for insert to authenticated
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy "admin updates coach partner profiles" on public.coach_partner_profiles for update to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy "admin deletes coach partner profiles" on public.coach_partner_profiles for delete to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

drop policy if exists "coach sees own event roles" on public.coach_event_roles;
drop policy if exists "admin manages coach event roles" on public.coach_event_roles;
create policy "coach event roles self or admin read" on public.coach_event_roles for select to authenticated
using (
  coach_user_id=(select auth.uid())
  or exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin')
);
create policy "admin inserts coach event roles" on public.coach_event_roles for insert to authenticated
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy "admin updates coach event roles" on public.coach_event_roles for update to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy "admin deletes coach event roles" on public.coach_event_roles for delete to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

