
create table if not exists public.public_content_updates (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('journal','programme','exchange','platform')),
  locale text not null check (locale in ('en','ja','zh-tw','ko')),
  title text not null,
  summary text,
  href text not null,
  published_at timestamptz not null default now(),
  is_active boolean not null default true
);
alter table public.public_content_updates enable row level security;
grant select on public.public_content_updates to anon, authenticated;
drop policy if exists "Public can read active content updates" on public.public_content_updates;
create policy "Public can read active content updates"
on public.public_content_updates for select
to anon, authenticated
using (is_active = true);

create index if not exists public_content_updates_locale_published_idx
on public.public_content_updates(locale, published_at desc)
where is_active = true;

