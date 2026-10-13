
drop policy if exists "admin read profiles" on public.profiles;
drop policy if exists "admin manage guardian links" on public.guardian_links;
drop policy if exists "admin manage events" on public.events;
drop policy if exists "admin manage participations" on public.participations;
drop policy if exists "admin manage media consents" on public.media_consents;
drop policy if exists "admin manage albums" on public.event_albums;
drop policy if exists "admin manage event media" on public.event_media;
drop policy if exists "admin manage subscriptions" on public.subscriptions;
drop policy if exists "admin manage coach partners" on public.coach_partner_profiles;
drop policy if exists "admin manage coach event roles" on public.coach_event_roles;

drop policy if exists "consent self insert" on public.media_consents;
drop policy if exists "consent self update" on public.media_consents;

drop policy if exists "event media participant read" on storage.objects;
drop policy if exists "event media admin insert" on storage.objects;
drop policy if exists "event media admin update" on storage.objects;
drop policy if exists "event media admin delete" on storage.objects;

