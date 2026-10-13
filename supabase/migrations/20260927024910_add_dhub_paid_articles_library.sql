
create table if not exists public.dhub_paid_articles (
  id uuid primary key default gen_random_uuid(),
  program_type text not null check (program_type in ('coach_lab','players')),
  slug text not null,
  category text not null,
  title text not null,
  summary text not null,
  reading text not null default '7 MIN READ',
  sections jsonb not null default '[]'::jsonb check (jsonb_typeof(sections)='array'),
  field_action text not null default '',
  reflection_questions text[] not null default '{}'::text[],
  related_public_slugs text[] not null default '{}'::text[],
  source_references jsonb not null default '[]'::jsonb check (jsonb_typeof(source_references)='array'),
  published boolean not null default false,
  published_at timestamptz,
  updated_at timestamptz not null default now(),
  unique(program_type,slug)
);

alter table public.dhub_paid_articles enable row level security;

drop policy if exists "dhub program members read paid articles" on public.dhub_paid_articles;
create policy "dhub program members read paid articles"
on public.dhub_paid_articles
for select
to authenticated
using (
  published=true
  and (
    (program_type='coach_lab' and public.has_dhub_coach_access())
    or (program_type='players' and public.has_dhub_player_access())
    or exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin')
  )
);

drop policy if exists "dhub admin manage paid articles" on public.dhub_paid_articles;
create policy "dhub admin manage paid articles"
on public.dhub_paid_articles
for all
to authenticated
using (exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin'))
with check (exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin'));

do $$ begin
  if not exists (
    select 1 from pg_constraint
    where conname='dhub_paid_articles_coach_refs_check'
  ) then
    alter table public.dhub_paid_articles
      add constraint dhub_paid_articles_coach_refs_check
      check (
        not (published=true and program_type='coach_lab')
        or jsonb_array_length(source_references)>0
      );
  end if;
end $$;

create index if not exists dhub_paid_articles_program_idx
  on public.dhub_paid_articles(program_type,published,published_at desc);

