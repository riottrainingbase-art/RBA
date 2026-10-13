
create table if not exists public.public_journal_posts (
  id uuid primary key default gen_random_uuid(),
  locale text not null check (locale in ('en','ja','zh-tw','ko')),
  slug text not null,
  category text not null,
  audience text not null default 'all',
  title text not null,
  standfirst text not null,
  reading text not null default '5 MIN READ',
  aside_title text,
  aside_text text,
  sections jsonb not null check (jsonb_typeof(sections)='array'),
  cta_title text,
  cta_body text,
  published boolean not null default false,
  published_at timestamptz,
  updated_at timestamptz not null default now(),
  unique(locale, slug)
);
alter table public.public_journal_posts enable row level security;
grant select on public.public_journal_posts to anon, authenticated;
drop policy if exists "Public can read published journal posts" on public.public_journal_posts;
create policy "Public can read published journal posts"
on public.public_journal_posts for select
to anon, authenticated
using (published = true);

create index if not exists public_journal_posts_locale_published_idx
on public.public_journal_posts(locale, published_at desc)
where published = true;

create or replace function public.sync_public_journal_update()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  if new.published = true and (tg_op = 'INSERT' or old.published is distinct from true or old.updated_at is distinct from new.updated_at) then
    insert into public.public_content_updates(kind,locale,title,summary,href,published_at,is_active)
    values('journal',new.locale,new.title,new.standfirst,
      case when new.locale='en' then '/journal/'||new.slug else '/'||new.locale||'/journal/'||new.slug end,
      coalesce(new.published_at,now()),true);
  end if;
  return new;
end;
$$;
revoke all on function public.sync_public_journal_update() from public;
drop trigger if exists trg_sync_public_journal_update on public.public_journal_posts;
create trigger trg_sync_public_journal_update
after insert or update of published,updated_at on public.public_journal_posts
for each row execute function public.sync_public_journal_update();

