
alter table public.dhub_paid_articles
  add column if not exists created_by uuid references public.profiles(id) on delete set null,
  add column if not exists updated_by uuid references public.profiles(id) on delete set null,
  add column if not exists editorial_note text not null default '';

create table if not exists public.dhub_paid_article_revisions (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.dhub_paid_articles(id) on delete cascade,
  revision_no integer not null,
  snapshot jsonb not null,
  changed_by uuid references public.profiles(id) on delete set null,
  change_note text,
  created_at timestamptz not null default now(),
  unique(article_id,revision_no)
);

alter table public.dhub_paid_article_revisions enable row level security;

drop policy if exists "dhub admin read paid article revisions" on public.dhub_paid_article_revisions;
create policy "dhub admin read paid article revisions"
on public.dhub_paid_article_revisions
for select to authenticated
using (
  exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin')
);

drop policy if exists "dhub admin create paid article revisions" on public.dhub_paid_article_revisions;
create policy "dhub admin create paid article revisions"
on public.dhub_paid_article_revisions
for insert to authenticated
with check (
  exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin')
);

drop policy if exists "dhub program members read paid articles" on public.dhub_paid_articles;
create policy "dhub program members read paid articles"
on public.dhub_paid_articles
for select to authenticated
using (
  (
    published=true
    and coalesce(published_at,now()) <= now()
    and (
      (program_type='coach_lab' and public.has_dhub_coach_access())
      or (program_type='players' and public.has_dhub_player_access())
    )
  )
  or exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin')
);

create or replace view public.dhub_paid_article_admin_overview as
select
  a.id,
  a.program_type,
  a.slug,
  a.category,
  a.title,
  a.summary,
  a.reading,
  a.published,
  a.published_at,
  a.updated_at,
  a.updated_by,
  jsonb_array_length(a.sections) as section_count,
  coalesce(array_length(a.reflection_questions,1),0) as reflection_count,
  jsonb_array_length(a.source_references) as reference_count,
  case
    when a.published=false then 'draft'
    when a.published=true and a.published_at>now() then 'scheduled'
    else 'published'
  end as publication_state
from public.dhub_paid_articles a;

create index if not exists dhub_paid_article_revisions_article_idx
  on public.dhub_paid_article_revisions(article_id,revision_no desc);
create index if not exists dhub_paid_articles_publish_idx
  on public.dhub_paid_articles(program_type,published,published_at desc);

