
create table if not exists public.homecourt_schedule_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(trim(title)) between 1 and 160),
  item_type text not null default 'personal' check (item_type in ('practice','game','tournament','event','travel','care','personal')),
  starts_at timestamptz not null,
  ends_at timestamptz null,
  venue text null check (venue is null or char_length(venue) <= 240),
  link_url text null check (link_url is null or (char_length(link_url) <= 1200 and link_url ~ '^https?://')),
  link_label text null check (link_label is null or char_length(link_label) <= 80),
  notes text null check (notes is null or char_length(notes) <= 2000),
  countdown_enabled boolean not null default true,
  source_team_event_id uuid null references public.team_events(id) on delete set null,
  source_public_event_id uuid null references public.events(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists homecourt_schedule_items_user_starts_idx on public.homecourt_schedule_items(user_id, starts_at);
alter table public.homecourt_schedule_items enable row level security;
grant select,insert,update,delete on public.homecourt_schedule_items to authenticated;
drop policy if exists "schedule owner reads" on public.homecourt_schedule_items;
drop policy if exists "schedule owner inserts" on public.homecourt_schedule_items;
drop policy if exists "schedule owner updates" on public.homecourt_schedule_items;
drop policy if exists "schedule owner deletes" on public.homecourt_schedule_items;
create policy "schedule owner reads" on public.homecourt_schedule_items for select to authenticated
using ((select auth.uid()) = user_id);
create policy "schedule owner inserts" on public.homecourt_schedule_items for insert to authenticated
with check ((select auth.uid()) = user_id);
create policy "schedule owner updates" on public.homecourt_schedule_items for update to authenticated
using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "schedule owner deletes" on public.homecourt_schedule_items for delete to authenticated
using ((select auth.uid()) = user_id);

create table if not exists public.homecourt_wellness_checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  checkin_on date not null default (now() at time zone 'Asia/Tokyo')::date,
  energy smallint not null check (energy between 1 and 5),
  fatigue smallint not null check (fatigue between 1 and 5),
  soreness smallint not null check (soreness between 1 and 5),
  sleep_hours numeric(3,1) null check (sleep_hours is null or (sleep_hours between 0 and 24)),
  pain_level smallint not null default 0 check (pain_level between 0 and 10),
  body_note text null check (body_note is null or char_length(body_note) <= 500),
  notes text null check (notes is null or char_length(notes) <= 1500),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, checkin_on)
);
create index if not exists homecourt_wellness_user_date_idx on public.homecourt_wellness_checkins(user_id, checkin_on desc);
alter table public.homecourt_wellness_checkins enable row level security;
grant select,insert,update,delete on public.homecourt_wellness_checkins to authenticated;
drop policy if exists "wellness owner reads" on public.homecourt_wellness_checkins;
drop policy if exists "wellness owner inserts" on public.homecourt_wellness_checkins;
drop policy if exists "wellness owner updates" on public.homecourt_wellness_checkins;
drop policy if exists "wellness owner deletes" on public.homecourt_wellness_checkins;
create policy "wellness owner reads" on public.homecourt_wellness_checkins for select to authenticated
using ((select auth.uid()) = user_id);
create policy "wellness owner inserts" on public.homecourt_wellness_checkins for insert to authenticated
with check ((select auth.uid()) = user_id);
create policy "wellness owner updates" on public.homecourt_wellness_checkins for update to authenticated
using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "wellness owner deletes" on public.homecourt_wellness_checkins for delete to authenticated
using ((select auth.uid()) = user_id);

create table if not exists public.homecourt_care_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(trim(title)) between 1 and 160),
  care_type text not null default 'recovery' check (care_type in ('recovery','stretch','conditioning','bodywork','medical','other')),
  scheduled_at timestamptz not null,
  ends_at timestamptz null,
  location text null check (location is null or char_length(location) <= 240),
  provider text null check (provider is null or char_length(provider) <= 160),
  link_url text null check (link_url is null or (char_length(link_url) <= 1200 and link_url ~ '^https?://')),
  notes text null check (notes is null or char_length(notes) <= 1500),
  status text not null default 'planned' check (status in ('planned','completed','cancelled')),
  related_schedule_id uuid null references public.homecourt_schedule_items(id) on delete set null,
  related_team_event_id uuid null references public.team_events(id) on delete set null,
  wellness_checkin_id uuid null references public.homecourt_wellness_checkins(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists homecourt_care_user_scheduled_idx on public.homecourt_care_plans(user_id, scheduled_at);
alter table public.homecourt_care_plans enable row level security;
grant select,insert,update,delete on public.homecourt_care_plans to authenticated;
drop policy if exists "care owner reads" on public.homecourt_care_plans;
drop policy if exists "care owner inserts" on public.homecourt_care_plans;
drop policy if exists "care owner updates" on public.homecourt_care_plans;
drop policy if exists "care owner deletes" on public.homecourt_care_plans;
create policy "care owner reads" on public.homecourt_care_plans for select to authenticated
using ((select auth.uid()) = user_id);
create policy "care owner inserts" on public.homecourt_care_plans for insert to authenticated
with check ((select auth.uid()) = user_id);
create policy "care owner updates" on public.homecourt_care_plans for update to authenticated
using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "care owner deletes" on public.homecourt_care_plans for delete to authenticated
using ((select auth.uid()) = user_id);

