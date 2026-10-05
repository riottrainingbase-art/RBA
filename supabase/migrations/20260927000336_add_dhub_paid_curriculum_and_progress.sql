
create table if not exists public.dhub_lessons (
  id uuid primary key default gen_random_uuid(),
  week_no integer not null unique check (week_no between 1 and 48),
  module_no integer not null check (module_no between 1 and 12),
  module_title text not null,
  title text not null,
  guiding_question text not null,
  purpose text not null,
  pre_read_slugs text[] not null default '{}'::text[],
  session_flow jsonb not null default '[]'::jsonb check (jsonb_typeof(session_flow)='array'),
  on_court_assignment text not null,
  reflection_questions text[] not null default '{}'::text[],
  rba_note text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.dhub_lessons enable row level security;

drop policy if exists "dhub paid members read lessons" on public.dhub_lessons;
create policy "dhub paid members read lessons"
on public.dhub_lessons
for select
to authenticated
using (
  published = true and (
    public.has_dhub_access()
    or exists (
      select 1 from public.profiles me
      where me.id=auth.uid() and me.role='admin'
    )
  )
);

create table if not exists public.dhub_lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid not null references public.dhub_lessons(id) on delete cascade,
  status text not null default 'started' check (status in ('started','completed')),
  reflection text not null default '',
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id,lesson_id)
);

alter table public.dhub_lesson_progress enable row level security;

drop policy if exists "dhub member read own progress" on public.dhub_lesson_progress;
create policy "dhub member read own progress"
on public.dhub_lesson_progress for select to authenticated
using (
  user_id=auth.uid()
  and (
    public.has_dhub_access()
    or exists (select 1 from public.profiles me where me.id=auth.uid() and me.role='admin')
  )
);

drop policy if exists "dhub member insert own progress" on public.dhub_lesson_progress;
create policy "dhub member insert own progress"
on public.dhub_lesson_progress for insert to authenticated
with check (
  user_id=auth.uid()
  and public.has_dhub_access()
);

drop policy if exists "dhub member update own progress" on public.dhub_lesson_progress;
create policy "dhub member update own progress"
on public.dhub_lesson_progress for update to authenticated
using (user_id=auth.uid() and public.has_dhub_access())
with check (user_id=auth.uid() and public.has_dhub_access());

create index if not exists dhub_lesson_progress_user_idx on public.dhub_lesson_progress(user_id);
create index if not exists dhub_lessons_module_idx on public.dhub_lessons(module_no,week_no);

