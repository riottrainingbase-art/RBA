
-- Admin-aware operational policies without exposing service keys.
create policy "admin manages events"
on public.events for all to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

create policy "admin manages participations"
on public.participations for all to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

create policy "parent can request guardian link"
on public.guardian_links for insert to authenticated
with check (parent_user_id=(select auth.uid()) and verified_at is null);

create policy "admin verifies guardian links"
on public.guardian_links for update to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

create policy "guardian can create media consent"
on public.media_consents for insert to authenticated
with check (
  guardian_user_id=(select auth.uid())
  and exists (
    select 1 from public.guardian_links gl
    where gl.parent_user_id=(select auth.uid())
      and gl.child_user_id=media_consents.player_user_id
      and gl.verified_at is not null
  )
);

create policy "guardian can update own media consent"
on public.media_consents for update to authenticated
using (guardian_user_id=(select auth.uid()))
with check (guardian_user_id=(select auth.uid()));

create policy "admin manages albums"
on public.event_albums for all to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

create policy "admin manages event media"
on public.event_media for all to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

create policy "admin manages coach partner profiles"
on public.coach_partner_profiles for all to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

create policy "admin manages coach event roles"
on public.coach_event_roles for all to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

-- Storage: event-media remains private. Authenticated attendees or verified guardians can read only objects
-- that are registered as published event_media for an album/event they are entitled to.
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
  )
);

create policy "admin manages event media objects"
on storage.objects for all to authenticated
using (
  bucket_id='event-media'
  and exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin')
)
with check (
  bucket_id='event-media'
  and exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin')
);

