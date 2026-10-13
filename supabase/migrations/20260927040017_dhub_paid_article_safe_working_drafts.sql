
create table if not exists public.dhub_paid_article_drafts (
  article_id uuid primary key references public.dhub_paid_articles(id) on delete cascade,
  payload jsonb not null,
  updated_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now()
);

alter table public.dhub_paid_article_drafts enable row level security;

drop policy if exists "dhub admin manage paid article drafts" on public.dhub_paid_article_drafts;
create policy "dhub admin manage paid article drafts"
on public.dhub_paid_article_drafts
for all
to authenticated
using (
  exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin')
)
with check (
  exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin')
);

