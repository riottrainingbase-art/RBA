
-- Automatically provision a coach partner profile for coach signups.
create or replace function public.handle_new_profile_role()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  if new.role = 'coach'::public.rba_role then
    insert into public.coach_partner_profiles (user_id, partner_status)
    values (new.id, 'applicant')
    on conflict (user_id) do nothing;
  end if;
  return new;
end;
$$;

revoke execute on function public.handle_new_profile_role() from public, anon, authenticated;

drop trigger if exists on_profile_created_role on public.profiles;
create trigger on_profile_created_role
after insert on public.profiles
for each row execute procedure public.handle_new_profile_role();

-- Private event-media bucket policies.
drop policy if exists "event media participant read" on storage.objects;
create policy "event media participant read"
on storage.objects for select to authenticated
using (
  bucket_id = 'event-media'
  and exists (
    select 1
    from public.event_media em
    join public.event_albums ea on ea.id = em.album_id
    join public.participations p on p.event_id = ea.event_id
    where em.storage_path = storage.objects.name
      and em.is_published = true
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

drop policy if exists "event media admin insert" on storage.objects;
create policy "event media admin insert"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'event-media'
  and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

drop policy if exists "event media admin update" on storage.objects;
create policy "event media admin update"
on storage.objects for update to authenticated
using (
  bucket_id = 'event-media'
  and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
)
with check (
  bucket_id = 'event-media'
  and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

drop policy if exists "event media admin delete" on storage.objects;
create policy "event media admin delete"
on storage.objects for delete to authenticated
using (
  bucket_id = 'event-media'
  and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

