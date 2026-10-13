
-- Tighten role integrity: users cannot change role through normal profile updates.
revoke update(role) on public.profiles from authenticated;
grant update(display_name, preferred_language, birth_year, region, country, avatar_path, updated_at) on public.profiles to authenticated;

-- Admin policies rely on trusted auth.app_metadata, never browser-editable user_metadata.
create policy "admin read profiles"
on public.profiles for select to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "admin manage guardian links"
on public.guardian_links for all to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "admin manage events"
on public.events for all to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "admin manage participations"
on public.participations for all to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "admin manage media consents"
on public.media_consents for all to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "admin manage albums"
on public.event_albums for all to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "admin manage event media"
on public.event_media for all to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "admin manage subscriptions"
on public.subscriptions for all to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "admin manage coach partners"
on public.coach_partner_profiles for all to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "admin manage coach event roles"
on public.coach_event_roles for all to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Participants can create/update their own media consent; guardians can manage linked child's consent.
create policy "consent self insert"
on public.media_consents for insert to authenticated
with check (
  player_user_id = (select auth.uid())
  or guardian_user_id = (select auth.uid())
);

create policy "consent self update"
on public.media_consents for update to authenticated
using (
  player_user_id = (select auth.uid())
  or guardian_user_id = (select auth.uid())
)
with check (
  player_user_id = (select auth.uid())
  or guardian_user_id = (select auth.uid())
);

-- Coach can update own partner profile except approval status is controlled by server/admin.
grant update(bio, regions, specialties) on public.coach_partner_profiles to authenticated;
create policy "coach update own partner profile"
on public.coach_partner_profiles for update to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

-- Useful indexes for event and date lookups.
create index if not exists idx_events_status_starts_at on public.events(status, starts_at);
create index if not exists idx_participations_event_id on public.participations(event_id);
create index if not exists idx_subscriptions_provider_subscription_id on public.subscriptions(provider_subscription_id);

