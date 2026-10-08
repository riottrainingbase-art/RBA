
create table if not exists public.dhub_player_profiles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  player_name text not null default '',
  grade text,
  category text,
  prefecture text,
  team_name text,
  guardian_name text,
  goal text not null default '',
  current_challenge text not null default '',
  onboarding_completed boolean not null default false,
  updated_at timestamptz not null default now()
);
alter table public.dhub_player_profiles enable row level security;

drop policy if exists "dhub player profile self read" on public.dhub_player_profiles;
create policy "dhub player profile self read" on public.dhub_player_profiles
for select to authenticated using (
  user_id=auth.uid() and public.has_dhub_player_access()
  or exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin')
);
drop policy if exists "dhub player profile self insert" on public.dhub_player_profiles;
create policy "dhub player profile self insert" on public.dhub_player_profiles
for insert to authenticated with check (user_id=auth.uid() and public.has_dhub_player_access());
drop policy if exists "dhub player profile self update" on public.dhub_player_profiles;
create policy "dhub player profile self update" on public.dhub_player_profiles
for update to authenticated using (user_id=auth.uid() and public.has_dhub_player_access())
with check (user_id=auth.uid() and public.has_dhub_player_access());

create table if not exists public.dhub_player_modules (
  id uuid primary key default gen_random_uuid(),
  module_order integer not null unique,
  stage text not null check (stage in ('assessment','development','game_experience','feedback','reassessment')),
  title text not null,
  guiding_question text not null,
  focus text not null,
  action text not null,
  reflection_questions text[] not null default '{}'::text[],
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.dhub_player_modules enable row level security;

drop policy if exists "dhub players read modules" on public.dhub_player_modules;
create policy "dhub players read modules" on public.dhub_player_modules
for select to authenticated using (
  published=true and (
    public.has_dhub_player_access()
    or exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin')
  )
);

create table if not exists public.dhub_player_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  module_id uuid not null references public.dhub_player_modules(id) on delete cascade,
  status text not null default 'started' check (status in ('started','completed')),
  reflection text not null default '',
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique(user_id,module_id)
);
alter table public.dhub_player_progress enable row level security;

drop policy if exists "dhub player progress self read" on public.dhub_player_progress;
create policy "dhub player progress self read" on public.dhub_player_progress
for select to authenticated using (user_id=auth.uid() and public.has_dhub_player_access());
drop policy if exists "dhub player progress self insert" on public.dhub_player_progress;
create policy "dhub player progress self insert" on public.dhub_player_progress
for insert to authenticated with check (user_id=auth.uid() and public.has_dhub_player_access());
drop policy if exists "dhub player progress self update" on public.dhub_player_progress;
create policy "dhub player progress self update" on public.dhub_player_progress
for update to authenticated using (user_id=auth.uid() and public.has_dhub_player_access())
with check (user_id=auth.uid() and public.has_dhub_player_access());

create table if not exists public.dhub_player_diary (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  entry_type text not null check (entry_type in ('practice','game','video','body','goal')),
  title text not null,
  occurred_on date not null default current_date,
  content text not null default '',
  next_action text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.dhub_player_diary enable row level security;

drop policy if exists "dhub player diary self read" on public.dhub_player_diary;
create policy "dhub player diary self read" on public.dhub_player_diary
for select to authenticated using (user_id=auth.uid() and public.has_dhub_player_access());
drop policy if exists "dhub player diary self insert" on public.dhub_player_diary;
create policy "dhub player diary self insert" on public.dhub_player_diary
for insert to authenticated with check (user_id=auth.uid() and public.has_dhub_player_access());
drop policy if exists "dhub player diary self update" on public.dhub_player_diary;
create policy "dhub player diary self update" on public.dhub_player_diary
for update to authenticated using (user_id=auth.uid() and public.has_dhub_player_access())
with check (user_id=auth.uid() and public.has_dhub_player_access());
drop policy if exists "dhub player diary self delete" on public.dhub_player_diary;
create policy "dhub player diary self delete" on public.dhub_player_diary
for delete to authenticated using (user_id=auth.uid() and public.has_dhub_player_access());

create index if not exists dhub_player_progress_user_idx on public.dhub_player_progress(user_id);
create index if not exists dhub_player_diary_user_date_idx on public.dhub_player_diary(user_id,occurred_on desc);

