-- HOMECOURT Development Graph v1
-- Purpose: keep TeamJBA official registration/competition functions out of HOMECOURT,
-- while connecting development experiences, safe public environment discovery,
-- operator claims, and cross-border youth team exchange.

create table if not exists public.homecourt_public_entities (
  id uuid primary key default gen_random_uuid(),
  entity_id uuid not null unique references public.platform_entities(id) on delete cascade,
  entity_type text not null default 'team',
  name text not null,
  slug text not null unique,
  country text not null default 'JP',
  region text,
  city text,
  timezone text not null default 'Asia/Tokyo',
  description text,
  website_url text,
  age_groups text[] not null default '{}',
  categories text[] not null default '{}',
  genders text[] not null default '{}',
  activity_days text[] not null default '{}',
  activity_frequency text,
  beginner_policy text,
  recruitment_status text not null default 'unknown' check (recruitment_status in ('open','limited','closed','unknown')),
  trial_status text not null default 'unknown' check (trial_status in ('available','request','unavailable','unknown')),
  fee_note text,
  parent_duty_note text,
  philosophy text,
  source_url text,
  source_checked_at timestamptz,
  last_confirmed_at timestamptz,
  operator_confirmed_at timestamptz,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists homecourt_public_entities_country_region_idx
  on public.homecourt_public_entities(country, region);
create index if not exists homecourt_public_entities_published_idx
  on public.homecourt_public_entities(published);
create index if not exists homecourt_public_entities_age_groups_gin
  on public.homecourt_public_entities using gin(age_groups);
create index if not exists homecourt_public_entities_categories_gin
  on public.homecourt_public_entities using gin(categories);

alter table public.homecourt_public_entities enable row level security;

drop policy if exists "homecourt public entities public read" on public.homecourt_public_entities;
create policy "homecourt public entities public read"
on public.homecourt_public_entities for select
to anon, authenticated
using (published = true or private.is_entity_manager(entity_id) or private.is_global_admin());

drop policy if exists "homecourt public entities manager insert" on public.homecourt_public_entities;
create policy "homecourt public entities manager insert"
on public.homecourt_public_entities for insert
to authenticated
with check (private.is_entity_manager(entity_id));

drop policy if exists "homecourt public entities manager update" on public.homecourt_public_entities;
create policy "homecourt public entities manager update"
on public.homecourt_public_entities for update
to authenticated
using (private.is_entity_manager(entity_id))
with check (private.is_entity_manager(entity_id));

drop policy if exists "homecourt public entities manager delete" on public.homecourt_public_entities;
create policy "homecourt public entities manager delete"
on public.homecourt_public_entities for delete
to authenticated
using (private.is_global_admin());

create table if not exists public.homecourt_entity_claims (
  id uuid primary key default gen_random_uuid(),
  entity_id uuid not null references public.platform_entities(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  relationship_to_entity text not null default 'staff',
  proof_url text,
  proof_note text,
  status text not null default 'pending' check (status in ('pending','approved','rejected','cancelled')),
  reviewed_by uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists homecourt_entity_claims_one_open_idx
  on public.homecourt_entity_claims(entity_id, user_id)
  where status in ('pending','approved');
create index if not exists homecourt_entity_claims_status_idx
  on public.homecourt_entity_claims(status, created_at desc);

alter table public.homecourt_entity_claims enable row level security;

drop policy if exists "homecourt claims self read" on public.homecourt_entity_claims;
create policy "homecourt claims self read"
on public.homecourt_entity_claims for select
to authenticated
using (user_id = (select auth.uid()) or private.is_global_admin());

drop policy if exists "homecourt claims self insert" on public.homecourt_entity_claims;
create policy "homecourt claims self insert"
on public.homecourt_entity_claims for insert
to authenticated
with check (
  user_id = (select auth.uid())
  and status = 'pending'
  and reviewed_by is null
  and reviewed_at is null
);

drop policy if exists "homecourt claims self cancel" on public.homecourt_entity_claims;
create policy "homecourt claims self cancel"
on public.homecourt_entity_claims for update
to authenticated
using (user_id = (select auth.uid()) and status = 'pending')
with check (user_id = (select auth.uid()) and status in ('pending','cancelled'));

drop policy if exists "homecourt claims admin update" on public.homecourt_entity_claims;
create policy "homecourt claims admin update"
on public.homecourt_entity_claims for update
to authenticated
using (private.is_global_admin())
with check (private.is_global_admin());

create or replace function public.approve_homecourt_entity_claim(claim_id uuid)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  c public.homecourt_entity_claims%rowtype;
begin
  if not private.is_global_admin() then
    raise exception 'not authorized';
  end if;

  select * into c
  from public.homecourt_entity_claims
  where id = claim_id
  for update;

  if c.id is null or c.status <> 'pending' then
    return false;
  end if;

  update public.homecourt_entity_claims
     set status='approved',
         reviewed_by=(select auth.uid()),
         reviewed_at=now(),
         updated_at=now()
   where id=c.id;

  insert into public.entity_memberships(entity_id,user_id,member_role,status)
  values(c.entity_id,c.user_id,'admin','active')
  on conflict do nothing;

  update public.homecourt_public_entities
     set operator_confirmed_at=coalesce(operator_confirmed_at,now()),
         last_confirmed_at=now(),
         updated_at=now()
   where entity_id=c.entity_id;

  return true;
end;
$$;
revoke all on function public.approve_homecourt_entity_claim(uuid) from public;
grant execute on function public.approve_homecourt_entity_claim(uuid) to authenticated;

create table if not exists public.homecourt_entity_suggestions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  entity_type text not null default 'team',
  country text not null default 'JP',
  region text,
  city text,
  official_url text,
  source_url text,
  note text,
  status text not null default 'pending' check (status in ('pending','reviewed','published','rejected')),
  reviewed_by uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists homecourt_entity_suggestions_status_idx
  on public.homecourt_entity_suggestions(status, created_at desc);
alter table public.homecourt_entity_suggestions enable row level security;

drop policy if exists "homecourt suggestions self read" on public.homecourt_entity_suggestions;
create policy "homecourt suggestions self read"
on public.homecourt_entity_suggestions for select
to authenticated
using (user_id=(select auth.uid()) or private.is_global_admin());

drop policy if exists "homecourt suggestions self insert" on public.homecourt_entity_suggestions;
create policy "homecourt suggestions self insert"
on public.homecourt_entity_suggestions for insert
to authenticated
with check (user_id=(select auth.uid()) and status='pending');

drop policy if exists "homecourt suggestions admin update" on public.homecourt_entity_suggestions;
create policy "homecourt suggestions admin update"
on public.homecourt_entity_suggestions for update
to authenticated
using (private.is_global_admin())
with check (private.is_global_admin());

create or replace function public.approve_homecourt_entity_suggestion(suggestion_id uuid)
returns uuid
language plpgsql
security definer
set search_path = ''
as $
declare
  s public.homecourt_entity_suggestions%rowtype;
  new_entity_id uuid;
  new_slug text;
begin
  if not private.is_global_admin() then
    raise exception 'not authorized';
  end if;

  select * into s
  from public.homecourt_entity_suggestions
  where id=suggestion_id
  for update;

  if s.id is null or s.status <> 'pending' then
    return null;
  end if;

  new_slug := 'homecourt-' || left(replace(gen_random_uuid()::text,'-',''),16);

  insert into public.platform_entities(
    entity_type,name,slug,country,region,city,website_url,status,verification_status,created_by
  ) values (
    case when s.entity_type in ('team','organizer','facility','partner','supplier') then s.entity_type else 'team' end,
    s.name,new_slug,upper(s.country),s.region,s.city,s.official_url,'active','unverified',(select auth.uid())
  )
  returning id into new_entity_id;

  insert into public.homecourt_public_entities(
    entity_id,entity_type,name,slug,country,region,city,description,website_url,
    source_url,source_checked_at,last_confirmed_at,published
  ) values (
    new_entity_id,s.entity_type,s.name,new_slug,upper(s.country),s.region,s.city,
    s.note,s.official_url,coalesce(s.source_url,s.official_url),now(),now(),true
  );

  update public.homecourt_entity_suggestions
     set status='published',reviewed_by=(select auth.uid()),reviewed_at=now()
   where id=s.id;

  return new_entity_id;
end;
$;
revoke all on function public.approve_homecourt_entity_suggestion(uuid) from public;
grant execute on function public.approve_homecourt_entity_suggestion(uuid) to authenticated;

create table if not exists public.homecourt_opportunity_preferences (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  age_group text,
  countries text[] not null default '{}',
  regions text[] not null default '{}',
  opportunity_types text[] not null default '{}',
  international_interest boolean not null default false,
  max_travel_minutes integer check (max_travel_minutes is null or max_travel_minutes between 0 and 1440),
  budget_band text check (budget_band is null or budget_band in ('free','low','standard','flexible')),
  beginner_support text check (beginner_support is null or beginner_support in ('required','preferred','either')),
  parent_duty_preference text check (parent_duty_preference is null or parent_duty_preference in ('low','some','either')),
  updated_at timestamptz not null default now()
);
alter table public.homecourt_opportunity_preferences enable row level security;

drop policy if exists "homecourt opportunity preferences owner read" on public.homecourt_opportunity_preferences;
create policy "homecourt opportunity preferences owner read"
on public.homecourt_opportunity_preferences for select to authenticated
using (user_id=(select auth.uid()));

drop policy if exists "homecourt opportunity preferences owner insert" on public.homecourt_opportunity_preferences;
create policy "homecourt opportunity preferences owner insert"
on public.homecourt_opportunity_preferences for insert to authenticated
with check (user_id=(select auth.uid()));

drop policy if exists "homecourt opportunity preferences owner update" on public.homecourt_opportunity_preferences;
create policy "homecourt opportunity preferences owner update"
on public.homecourt_opportunity_preferences for update to authenticated
using (user_id=(select auth.uid()))
with check (user_id=(select auth.uid()));

drop policy if exists "homecourt opportunity preferences owner delete" on public.homecourt_opportunity_preferences;
create policy "homecourt opportunity preferences owner delete"
on public.homecourt_opportunity_preferences for delete to authenticated
using (user_id=(select auth.uid()));

create table if not exists public.homecourt_exchange_posts (
  id uuid primary key default gen_random_uuid(),
  entity_id uuid not null references public.platform_entities(id) on delete cascade,
  created_by uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  age_group text not null,
  gender text not null default 'mixed',
  country_from text not null,
  city_from text,
  target_countries text[] not null default '{}',
  mode text not null default 'either' check (mode in ('host','travel','either')),
  starts_on date,
  ends_on date,
  team_size_min integer check (team_size_min is null or team_size_min > 0),
  team_size_max integer check (team_size_max is null or team_size_max > 0),
  venue_available boolean not null default false,
  languages text[] not null default '{}',
  purpose text,
  level_note text,
  public_note text,
  status text not null default 'draft' check (status in ('draft','open','paused','matched','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_on is null or starts_on is null or ends_on >= starts_on),
  check (team_size_max is null or team_size_min is null or team_size_max >= team_size_min)
);
create index if not exists homecourt_exchange_posts_open_idx
  on public.homecourt_exchange_posts(status, starts_on);
create index if not exists homecourt_exchange_posts_targets_gin
  on public.homecourt_exchange_posts using gin(target_countries);
alter table public.homecourt_exchange_posts enable row level security;

drop policy if exists "homecourt exchange posts public read" on public.homecourt_exchange_posts;
drop policy if exists "homecourt exchange posts manager read" on public.homecourt_exchange_posts;
create policy "homecourt exchange posts manager read"
on public.homecourt_exchange_posts for select
to authenticated
using (private.is_entity_manager(entity_id) or private.is_global_admin());

drop policy if exists "homecourt exchange posts manager insert" on public.homecourt_exchange_posts;
create policy "homecourt exchange posts manager insert"
on public.homecourt_exchange_posts for insert
to authenticated
with check (created_by=(select auth.uid()) and private.is_entity_manager(entity_id));

drop policy if exists "homecourt exchange posts manager update" on public.homecourt_exchange_posts;
create policy "homecourt exchange posts manager update"
on public.homecourt_exchange_posts for update
to authenticated
using (private.is_entity_manager(entity_id))
with check (private.is_entity_manager(entity_id));

drop policy if exists "homecourt exchange posts manager delete" on public.homecourt_exchange_posts;
create policy "homecourt exchange posts manager delete"
on public.homecourt_exchange_posts for delete
to authenticated
using (private.is_entity_manager(entity_id));

create or replace function public.get_homecourt_exchange_posts()
returns table(
  id uuid,
  entity_id uuid,
  title text,
  age_group text,
  gender text,
  country_from text,
  city_from text,
  target_countries text[],
  mode text,
  starts_on date,
  ends_on date,
  team_size_min integer,
  team_size_max integer,
  venue_available boolean,
  languages text[],
  purpose text,
  level_note text,
  public_note text,
  status text,
  created_at timestamptz
)
language sql
stable
security definer
set search_path = ''
as $
  select
    p.id,p.entity_id,p.title,p.age_group,p.gender,p.country_from,p.city_from,
    p.target_countries,p.mode,p.starts_on,p.ends_on,p.team_size_min,p.team_size_max,
    p.venue_available,p.languages,p.purpose,p.level_note,p.public_note,p.status,p.created_at
  from public.homecourt_exchange_posts p
  where p.status='open'
    and (p.ends_on is null or p.ends_on >= current_date - 7)
  order by p.starts_on nulls last,p.created_at desc;
$;
revoke all on function public.get_homecourt_exchange_posts() from public;
grant execute on function public.get_homecourt_exchange_posts() to anon, authenticated;

create table if not exists public.homecourt_exchange_interests (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.homecourt_exchange_posts(id) on delete cascade,
  responding_entity_id uuid not null references public.platform_entities(id) on delete cascade,
  created_by uuid not null references public.profiles(id) on delete cascade,
  note text,
  status text not null default 'requested' check (status in ('requested','accepted','declined','cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(post_id, responding_entity_id)
);
alter table public.homecourt_exchange_interests enable row level security;

drop policy if exists "homecourt exchange interests parties read" on public.homecourt_exchange_interests;
create policy "homecourt exchange interests parties read"
on public.homecourt_exchange_interests for select
to authenticated
using (
  private.is_entity_manager(responding_entity_id)
  or exists (
    select 1 from public.homecourt_exchange_posts p
    where p.id=post_id and private.is_entity_manager(p.entity_id)
  )
  or private.is_global_admin()
);

drop policy if exists "homecourt exchange interests responder insert" on public.homecourt_exchange_interests;
create policy "homecourt exchange interests responder insert"
on public.homecourt_exchange_interests for insert
to authenticated
with check (
  created_by=(select auth.uid())
  and private.is_entity_manager(responding_entity_id)
  and exists (
    select 1 from public.homecourt_exchange_posts p
    where p.id=post_id
      and p.status='open'
      and p.entity_id<>responding_entity_id
  )
);

drop policy if exists "homecourt exchange interests parties update" on public.homecourt_exchange_interests;
create policy "homecourt exchange interests parties update"
on public.homecourt_exchange_interests for update
to authenticated
using (
  private.is_entity_manager(responding_entity_id)
  or exists (
    select 1 from public.homecourt_exchange_posts p
    where p.id=post_id and private.is_entity_manager(p.entity_id)
  )
  or private.is_global_admin()
)
with check (
  private.is_entity_manager(responding_entity_id)
  or exists (
    select 1 from public.homecourt_exchange_posts p
    where p.id=post_id and private.is_entity_manager(p.entity_id)
  )
  or private.is_global_admin()
);

create or replace view public.homecourt_development_timeline
with (security_invoker=true)
as
select
  h.user_id,
  'self_recorded'::text as source_type,
  h.id as source_id,
  h.title,
  h.occurred_on as happened_on,
  null::text as country,
  null::text as region,
  nullif(h.venue,'') as venue,
  'self'::text as verification_level,
  jsonb_build_object(
    'person_id', h.person_id,
    'date_precision', h.date_precision,
    'takeaway', h.takeaway,
    'next_action', h.next_action
  ) as metadata
from public.homecourt_history h
union all
select
  p.player_user_id as user_id,
  'event_participation'::text as source_type,
  p.id as source_id,
  e.title,
  coalesce(e.starts_at::date,p.joined_at::date) as happened_on,
  e.country,
  e.region,
  e.venue,
  case
    when p.attendance_status='attended' then 'organizer_confirmed'
    when p.attendance_status='confirmed' then 'registration_confirmed'
    else 'registered'
  end::text as verification_level,
  jsonb_build_object(
    'event_id', e.id,
    'event_type', e.event_type,
    'attendance_status', p.attendance_status,
    'event_slug', e.slug
  ) as metadata
from public.participations p
join public.events e on e.id=p.event_id
where p.attendance_status in ('registered','confirmed','attended')
union all
select
  m.player_user_id as user_id,
  'milestone'::text as source_type,
  m.id as source_id,
  m.title,
  m.achieved_on as happened_on,
  null::text as country,
  null::text as region,
  null::text as venue,
  case when m.verified_by is null then 'recorded' else 'verified' end::text as verification_level,
  jsonb_build_object(
    'milestone_type', m.milestone_type,
    'description', m.description,
    'event_id', m.event_id,
    'visibility', m.visibility
  ) as metadata
from public.player_pathway_milestones m;

grant select on public.homecourt_development_timeline to authenticated;

-- Publish RBA's own safe public organization profile without exposing private entity fields.
insert into public.homecourt_public_entities(
  entity_id,entity_type,name,slug,country,timezone,description,website_url,
  age_groups,categories,genders,beginner_policy,recruitment_status,trial_status,
  philosophy,source_url,source_checked_at,last_confirmed_at,operator_confirmed_at,published
)
select
  e.id,
  'organizer',
  e.name,
  coalesce(e.slug,'riot-basketball-academy'),
  e.country,
  e.timezone,
  coalesce(e.description,'育成年代の選手・保護者・指導者を、地域や所属を越えて育成機会へつなぐバスケットボール・プラットフォーム。'),
  e.website_url,
  array['U8','U10','U12','U15','U18'],
  array['clinic','camp','3x3','coach_education','international_exchange'],
  array['boys','girls','mixed'],
  'programme_by_programme',
  'open',
  'request',
  '科学的根拠、安全、長期育成、認知・判断・実行を大切にし、所属チーム以外にも学びと経験の選択肢をつくります。',
  'https://riotbasketballacademy.com/',
  now(),now(),now(),true
from public.platform_entities e
where e.slug='riot-basketball-academy'
on conflict (entity_id) do update set
  name=excluded.name,
  country=excluded.country,
  timezone=excluded.timezone,
  description=excluded.description,
  website_url=excluded.website_url,
  age_groups=excluded.age_groups,
  categories=excluded.categories,
  genders=excluded.genders,
  philosophy=excluded.philosophy,
  source_url=excluded.source_url,
  source_checked_at=excluded.source_checked_at,
  last_confirmed_at=excluded.last_confirmed_at,
  operator_confirmed_at=excluded.operator_confirmed_at,
  published=true,
  updated_at=now();

comment on table public.homecourt_public_entities is
'Safe public discovery data. This is not JBA registration, certification or official competition status.';
comment on table public.homecourt_exchange_posts is
'Cross-border youth development exchange matching. No player ranking and no unrestricted minor-to-adult messaging.';
comment on view public.homecourt_development_timeline is
'Portable person-owned development history combining self-recorded and confirmed experiences.';
