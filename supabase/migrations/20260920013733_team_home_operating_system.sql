
create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated;

alter table public.profiles
  add column if not exists onboarding_completed boolean not null default false,
  add column if not exists timezone text not null default 'Asia/Tokyo',
  add column if not exists terms_accepted_at timestamptz,
  add column if not exists marketing_consent boolean not null default false;

create or replace function private.guard_profile_role()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if new.role = 'admin'::public.rba_role and old.role <> 'admin'::public.rba_role then
    raise exception 'admin role cannot be self-assigned';
  end if;
  if old.role = 'admin'::public.rba_role and new.role <> 'admin'::public.rba_role then
    raise exception 'admin role cannot be removed through profile update';
  end if;
  return new;
end;
$$;

drop trigger if exists guard_profile_role_update on public.profiles;
create trigger guard_profile_role_update
before update of role on public.profiles
for each row execute function private.guard_profile_role();

create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  category text not null default 'U15',
  gender text not null default 'mixed' check (gender in ('boys','girls','mixed','other')),
  region text,
  country text not null default 'JP',
  timezone text not null default 'Asia/Tokyo',
  default_currency text not null default 'JPY',
  visibility text not null default 'invite' check (visibility in ('invite','connections','region','national')),
  description text,
  created_by uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.team_memberships (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  member_role text not null check (member_role in ('owner','coach','staff','player','parent')),
  status text not null default 'active' check (status in ('invited','active','paused','removed')),
  joined_at timestamptz not null default now(),
  unique(team_id,user_id,member_role)
);

create or replace function private.is_global_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid()) and p.role = 'admin'::public.rba_role
  );
$$;

create or replace function private.is_team_member(target_team uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.team_memberships tm
    where tm.team_id = target_team
      and tm.user_id = (select auth.uid())
      and tm.status = 'active'
  ) or private.is_global_admin();
$$;

create or replace function private.is_team_manager(target_team uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.team_memberships tm
    where tm.team_id = target_team
      and tm.user_id = (select auth.uid())
      and tm.status = 'active'
      and tm.member_role in ('owner','coach')
  ) or private.is_global_admin();
$$;

revoke all on function private.is_global_admin() from public;
revoke all on function private.is_team_member(uuid) from public;
revoke all on function private.is_team_manager(uuid) from public;
grant execute on function private.is_global_admin() to authenticated;
grant execute on function private.is_team_member(uuid) to authenticated;
grant execute on function private.is_team_manager(uuid) to authenticated;

create or replace function private.add_team_owner()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.team_memberships(team_id,user_id,member_role,status)
  values(new.id,new.created_by,'owner','active');
  return new;
end;
$$;
revoke all on function private.add_team_owner() from public;

drop trigger if exists add_team_owner_after_insert on public.teams;
create trigger add_team_owner_after_insert
after insert on public.teams
for each row execute function private.add_team_owner();

create table if not exists public.team_events (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  event_type text not null check (event_type in ('practice','match','tournament','trip','meeting','day_off','event','international')),
  title text not null check (char_length(title) between 1 and 160),
  starts_at timestamptz not null,
  ends_at timestamptz,
  timezone text not null default 'Asia/Tokyo',
  venue text,
  address text,
  map_url text,
  meeting_at timestamptz,
  target_label text,
  items_to_bring text,
  fee_amount integer check (fee_amount is null or fee_amount >= 0),
  fee_currency text not null default 'JPY',
  contact_notes text,
  availability_status text not null default 'confirmed' check (availability_status in ('confirmed','request_required','unknown')),
  related_public_event_id uuid references public.events(id) on delete set null,
  created_by uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.practice_plans (
  id uuid primary key default gen_random_uuid(),
  team_event_id uuid not null unique references public.team_events(id) on delete cascade,
  theme text,
  objective text,
  menu jsonb not null default '[]'::jsonb,
  participant_count integer check (participant_count is null or participant_count >= 0),
  court_count numeric(4,1) check (court_count is null or court_count > 0),
  equipment text,
  coach_notes text,
  reflection text,
  template_name text,
  copied_from uuid references public.practice_plans(id) on delete set null,
  updated_at timestamptz not null default now()
);

create table if not exists public.attendance_responses (
  id uuid primary key default gen_random_uuid(),
  team_event_id uuid not null references public.team_events(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending','attending','absent','late','undecided')),
  note text,
  responded_at timestamptz,
  updated_at timestamptz not null default now(),
  unique(team_event_id,user_id)
);

create table if not exists public.team_notices (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 160),
  body text not null,
  audience text not null default 'all' check (audience in ('all','players','parents','coaches','staff')),
  priority text not null default 'normal' check (priority in ('normal','important','urgent')),
  published_at timestamptz not null default now(),
  created_by uuid not null references public.profiles(id) on delete restrict
);

create table if not exists public.coach_quick_notes (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references public.teams(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  pinned boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.team_collections (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  title text not null,
  collection_type text not null default 'other' check (collection_type in ('tournament','trip','event','clinic','other')),
  amount integer not null check (amount >= 0),
  currency text not null default 'JPY',
  due_at timestamptz,
  provider text not null default 'stripe',
  provider_price_id text,
  platform_fee_amount integer check (platform_fee_amount is null or platform_fee_amount >= 0),
  status text not null default 'draft' check (status in ('draft','open','closed','cancelled')),
  created_by uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now()
);

create table if not exists public.collection_records (
  id uuid primary key default gen_random_uuid(),
  collection_id uuid not null references public.team_collections(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'unpaid' check (status in ('unpaid','pending','paid','refunded','waived')),
  provider_payment_id text,
  paid_at timestamptz,
  receipt_url text,
  updated_at timestamptz not null default now(),
  unique(collection_id,user_id)
);

create index if not exists idx_team_memberships_user on public.team_memberships(user_id,status);
create index if not exists idx_team_events_team_start on public.team_events(team_id,starts_at);
create index if not exists idx_attendance_event on public.attendance_responses(team_event_id,status);
create index if not exists idx_team_notices_team_published on public.team_notices(team_id,published_at desc);
create index if not exists idx_quick_notes_user on public.coach_quick_notes(user_id,updated_at desc);
create index if not exists idx_collections_team_due on public.team_collections(team_id,due_at);
create index if not exists idx_collection_records_user on public.collection_records(user_id,status);

alter table public.teams enable row level security;
alter table public.team_memberships enable row level security;
alter table public.team_events enable row level security;
alter table public.practice_plans enable row level security;
alter table public.attendance_responses enable row level security;
alter table public.team_notices enable row level security;
alter table public.coach_quick_notes enable row level security;
alter table public.team_collections enable row level security;
alter table public.collection_records enable row level security;

grant select,insert,update,delete on public.teams to authenticated;
grant select,insert,update,delete on public.team_memberships to authenticated;
grant select,insert,update,delete on public.team_events to authenticated;
grant select,insert,update,delete on public.practice_plans to authenticated;
grant select,insert,update,delete on public.attendance_responses to authenticated;
grant select,insert,update,delete on public.team_notices to authenticated;
grant select,insert,update,delete on public.coach_quick_notes to authenticated;
grant select,insert,update,delete on public.team_collections to authenticated;
grant select,insert,update,delete on public.collection_records to authenticated;

create policy "team members read teams" on public.teams for select to authenticated
using (private.is_team_member(id));
create policy "coaches create teams" on public.teams for insert to authenticated
with check (
  created_by = (select auth.uid()) and exists (
    select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('coach'::public.rba_role,'admin'::public.rba_role)
  )
);
create policy "team managers update teams" on public.teams for update to authenticated
using (private.is_team_manager(id)) with check (private.is_team_manager(id));
create policy "team owners delete teams" on public.teams for delete to authenticated
using (exists(select 1 from public.team_memberships tm where tm.team_id=id and tm.user_id=(select auth.uid()) and tm.member_role='owner' and tm.status='active') or private.is_global_admin());

create policy "membership self or manager read" on public.team_memberships for select to authenticated
using (user_id=(select auth.uid()) or private.is_team_manager(team_id));
create policy "team managers add memberships" on public.team_memberships for insert to authenticated
with check (private.is_team_manager(team_id));
create policy "team managers update memberships" on public.team_memberships for update to authenticated
using (private.is_team_manager(team_id)) with check (private.is_team_manager(team_id));
create policy "team managers remove memberships" on public.team_memberships for delete to authenticated
using (private.is_team_manager(team_id));

create policy "team members read events" on public.team_events for select to authenticated
using (private.is_team_member(team_id));
create policy "team managers create events" on public.team_events for insert to authenticated
with check (private.is_team_manager(team_id) and created_by=(select auth.uid()));
create policy "team managers update events" on public.team_events for update to authenticated
using (private.is_team_manager(team_id)) with check (private.is_team_manager(team_id));
create policy "team managers delete events" on public.team_events for delete to authenticated
using (private.is_team_manager(team_id));

create policy "team members read practice plans" on public.practice_plans for select to authenticated
using (exists(select 1 from public.team_events e where e.id=team_event_id and private.is_team_member(e.team_id)));
create policy "team managers create practice plans" on public.practice_plans for insert to authenticated
with check (exists(select 1 from public.team_events e where e.id=team_event_id and private.is_team_manager(e.team_id)));
create policy "team managers update practice plans" on public.practice_plans for update to authenticated
using (exists(select 1 from public.team_events e where e.id=team_event_id and private.is_team_manager(e.team_id)))
with check (exists(select 1 from public.team_events e where e.id=team_event_id and private.is_team_manager(e.team_id)));
create policy "team managers delete practice plans" on public.practice_plans for delete to authenticated
using (exists(select 1 from public.team_events e where e.id=team_event_id and private.is_team_manager(e.team_id)));

create policy "attendance self or manager read" on public.attendance_responses for select to authenticated
using (user_id=(select auth.uid()) or exists(select 1 from public.team_events e where e.id=team_event_id and private.is_team_manager(e.team_id)));
create policy "attendance self or manager create" on public.attendance_responses for insert to authenticated
with check ((user_id=(select auth.uid()) and exists(select 1 from public.team_events e where e.id=team_event_id and private.is_team_member(e.team_id))) or exists(select 1 from public.team_events e where e.id=team_event_id and private.is_team_manager(e.team_id)));
create policy "attendance self or manager update" on public.attendance_responses for update to authenticated
using (user_id=(select auth.uid()) or exists(select 1 from public.team_events e where e.id=team_event_id and private.is_team_manager(e.team_id)))
with check (user_id=(select auth.uid()) or exists(select 1 from public.team_events e where e.id=team_event_id and private.is_team_manager(e.team_id)));

create policy "team members read notices" on public.team_notices for select to authenticated
using (private.is_team_member(team_id));
create policy "team managers create notices" on public.team_notices for insert to authenticated
with check (private.is_team_manager(team_id) and created_by=(select auth.uid()));
create policy "team managers update notices" on public.team_notices for update to authenticated
using (private.is_team_manager(team_id)) with check (private.is_team_manager(team_id));
create policy "team managers delete notices" on public.team_notices for delete to authenticated
using (private.is_team_manager(team_id));

create policy "users read own quick notes" on public.coach_quick_notes for select to authenticated
using (user_id=(select auth.uid()));
create policy "users create own quick notes" on public.coach_quick_notes for insert to authenticated
with check (user_id=(select auth.uid()) and (team_id is null or private.is_team_member(team_id)));
create policy "users update own quick notes" on public.coach_quick_notes for update to authenticated
using (user_id=(select auth.uid())) with check (user_id=(select auth.uid()));
create policy "users delete own quick notes" on public.coach_quick_notes for delete to authenticated
using (user_id=(select auth.uid()));

create policy "team members read collections" on public.team_collections for select to authenticated
using (private.is_team_member(team_id));
create policy "team managers create collections" on public.team_collections for insert to authenticated
with check (private.is_team_manager(team_id) and created_by=(select auth.uid()));
create policy "team managers update collections" on public.team_collections for update to authenticated
using (private.is_team_manager(team_id)) with check (private.is_team_manager(team_id));
create policy "team managers delete collections" on public.team_collections for delete to authenticated
using (private.is_team_manager(team_id));

create policy "collection payer or manager read" on public.collection_records for select to authenticated
using (user_id=(select auth.uid()) or exists(select 1 from public.team_collections c where c.id=collection_id and private.is_team_manager(c.team_id)));
create policy "team managers create collection records" on public.collection_records for insert to authenticated
with check (exists(select 1 from public.team_collections c where c.id=collection_id and private.is_team_manager(c.team_id)));
create policy "team managers update collection records" on public.collection_records for update to authenticated
using (exists(select 1 from public.team_collections c where c.id=collection_id and private.is_team_manager(c.team_id)))
with check (exists(select 1 from public.team_collections c where c.id=collection_id and private.is_team_manager(c.team_id)));

comment on table public.teams is 'TEAM HOME root. One coach may manage multiple teams through team_memberships.';
comment on table public.team_events is 'Unified team calendar for practice, match, tournament, trip, meeting, day off, event and international.';
comment on column public.team_events.availability_status is 'confirmed, request_required, or unknown. Never implies live facility inventory.';
comment on column public.team_collections.platform_fee_amount is 'Reserved for a future approved platform fee; null means not configured.';

