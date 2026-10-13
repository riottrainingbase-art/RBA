
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values (
  'public-journal-media',
  'public-journal-media',
  true,
  10485760,
  array['image/jpeg','image/png','image/webp']::text[]
)
on conflict (id) do update
set public=true,
    file_size_limit=excluded.file_size_limit,
    allowed_mime_types=excluded.allowed_mime_types;

drop policy if exists "admin manages public journal media" on storage.objects;
create policy "admin manages public journal media"
on storage.objects
for all
to authenticated
using (
  bucket_id='public-journal-media'
  and exists (
    select 1 from public.profiles p
    where p.id=(select auth.uid()) and p.role='admin'::rba_role
  )
)
with check (
  bucket_id='public-journal-media'
  and exists (
    select 1 from public.profiles p
    where p.id=(select auth.uid()) and p.role='admin'::rba_role
  )
);

drop policy if exists "temporary kawasaki journal upload" on storage.objects;
create policy "temporary kawasaki journal upload"
on storage.objects
for insert
to anon
with check (
  bucket_id='public-journal-media'
  and name in (
    'kawasaki-clinic-2026/group.jpg',
    'kawasaki-clinic-2026/court.jpg'
  )
);

