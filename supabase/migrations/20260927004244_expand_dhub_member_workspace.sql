
create table if not exists public.dhub_member_profiles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  team_name text,
  categories text[] not null default '{}'::text[],
  coaching_years text,
  current_challenge text not null default '',
  learning_goal text not null default '',
  onboarding_completed boolean not null default false,
  joined_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.dhub_member_profiles enable row level security;

drop policy if exists "dhub profile self read" on public.dhub_member_profiles;
create policy "dhub profile self read" on public.dhub_member_profiles
for select to authenticated using (
  user_id=auth.uid()
  or exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin')
);
drop policy if exists "dhub profile self insert" on public.dhub_member_profiles;
create policy "dhub profile self insert" on public.dhub_member_profiles
for insert to authenticated with check (user_id=auth.uid() and public.has_dhub_access());
drop policy if exists "dhub profile self update" on public.dhub_member_profiles;
create policy "dhub profile self update" on public.dhub_member_profiles
for update to authenticated using (user_id=auth.uid() and public.has_dhub_access())
with check (user_id=auth.uid() and public.has_dhub_access());

create table if not exists public.dhub_tool_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  tool_key text not null,
  title text not null default '',
  content text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id,tool_key)
);
alter table public.dhub_tool_entries enable row level security;

drop policy if exists "dhub tool self read" on public.dhub_tool_entries;
create policy "dhub tool self read" on public.dhub_tool_entries
for select to authenticated using (
  user_id=auth.uid()
  and public.has_dhub_access()
);
drop policy if exists "dhub tool self insert" on public.dhub_tool_entries;
create policy "dhub tool self insert" on public.dhub_tool_entries
for insert to authenticated with check (user_id=auth.uid() and public.has_dhub_access());
drop policy if exists "dhub tool self update" on public.dhub_tool_entries;
create policy "dhub tool self update" on public.dhub_tool_entries
for update to authenticated using (user_id=auth.uid() and public.has_dhub_access())
with check (user_id=auth.uid() and public.has_dhub_access());

create table if not exists public.dhub_announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  action_label text,
  action_url text,
  published boolean not null default true,
  pinned boolean not null default false,
  published_at timestamptz not null default now(),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.dhub_announcements enable row level security;

drop policy if exists "dhub members read announcements" on public.dhub_announcements;
create policy "dhub members read announcements" on public.dhub_announcements
for select to authenticated using (
  published=true and (
    public.has_dhub_access()
    or exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin')
  )
);
drop policy if exists "dhub admin manage announcements" on public.dhub_announcements;
create policy "dhub admin manage announcements" on public.dhub_announcements
for all to authenticated
using (exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin'))
with check (exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin'));

create table if not exists public.dhub_live_sessions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  starts_at timestamptz not null,
  ends_at timestamptz,
  format text not null default 'ONLINE',
  join_url text,
  recording_url text,
  lesson_week_no integer references public.dhub_lessons(week_no) on delete set null,
  note text,
  published boolean not null default true,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.dhub_live_sessions enable row level security;

drop policy if exists "dhub members read sessions" on public.dhub_live_sessions;
create policy "dhub members read sessions" on public.dhub_live_sessions
for select to authenticated using (
  published=true and (
    public.has_dhub_access()
    or exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin')
  )
);
drop policy if exists "dhub admin manage sessions" on public.dhub_live_sessions;
create policy "dhub admin manage sessions" on public.dhub_live_sessions
for all to authenticated
using (exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin'))
with check (exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin'));

create index if not exists dhub_tool_entries_user_idx on public.dhub_tool_entries(user_id);
create index if not exists dhub_announcements_published_idx on public.dhub_announcements(published,pinned,published_at desc);
create index if not exists dhub_live_sessions_starts_idx on public.dhub_live_sessions(published,starts_at);

