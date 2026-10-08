
revoke execute on function public.handle_new_user() from anon, authenticated;

create index if not exists idx_guardian_links_child_user_id on public.guardian_links(child_user_id);
create index if not exists idx_participations_player_user_id on public.participations(player_user_id);
create index if not exists idx_media_consents_player_user_id on public.media_consents(player_user_id);
create index if not exists idx_media_consents_guardian_user_id on public.media_consents(guardian_user_id);
create index if not exists idx_event_albums_event_id on public.event_albums(event_id);
create index if not exists idx_event_media_album_id on public.event_media(album_id);
create index if not exists idx_subscriptions_user_id on public.subscriptions(user_id);
create index if not exists idx_coach_event_roles_coach_user_id on public.coach_event_roles(coach_user_id);

drop policy if exists "profile self read" on public.profiles;
create policy "profile self read" on public.profiles for select to authenticated
using (id = (select auth.uid()));

drop policy if exists "profile self update" on public.profiles;
create policy "profile self update" on public.profiles for update to authenticated
using (id = (select auth.uid())) with check (id = (select auth.uid()));

drop policy if exists "guardian link members read" on public.guardian_links;
create policy "guardian link members read" on public.guardian_links for select to authenticated
using (parent_user_id = (select auth.uid()) or child_user_id = (select auth.uid()));

drop policy if exists "participation player or guardian read" on public.participations;
create policy "participation player or guardian read" on public.participations for select to authenticated
using (
  player_user_id = (select auth.uid())
  or exists (
    select 1 from public.guardian_links gl
    where gl.child_user_id = participations.player_user_id
      and gl.parent_user_id = (select auth.uid())
      and gl.verified_at is not null
  )
);

drop policy if exists "subscription self read" on public.subscriptions;
create policy "subscription self read" on public.subscriptions for select to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "consent player or guardian read" on public.media_consents;
create policy "consent player or guardian read" on public.media_consents for select to authenticated
using (player_user_id = (select auth.uid()) or guardian_user_id = (select auth.uid()));

drop policy if exists "participant album access" on public.event_albums;
create policy "participant album access" on public.event_albums for select to authenticated
using (
  exists (
    select 1 from public.participations p
    where p.event_id = event_albums.event_id
      and p.attendance_status = 'attended'
      and (
        p.player_user_id = (select auth.uid())
        or exists (
          select 1 from public.guardian_links gl
          where gl.child_user_id = p.player_user_id
            and gl.parent_user_id = (select auth.uid())
            and gl.verified_at is not null
        )
      )
  )
);

drop policy if exists "participant media metadata access" on public.event_media;
create policy "participant media metadata access" on public.event_media for select to authenticated
using (
  is_published = true
  and exists (
    select 1
    from public.event_albums a
    join public.participations p on p.event_id = a.event_id
    where a.id = event_media.album_id
      and p.attendance_status = 'attended'
      and (
        p.player_user_id = (select auth.uid())
        or exists (
          select 1 from public.guardian_links gl
          where gl.child_user_id = p.player_user_id
            and gl.parent_user_id = (select auth.uid())
            and gl.verified_at is not null
        )
      )
  )
);

drop policy if exists "coach sees own partner profile" on public.coach_partner_profiles;
create policy "coach sees own partner profile" on public.coach_partner_profiles for select to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "coach sees own event roles" on public.coach_event_roles;
create policy "coach sees own event roles" on public.coach_event_roles for select to authenticated
using (coach_user_id = (select auth.uid()));

