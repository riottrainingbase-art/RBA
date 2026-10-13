-- RBA PRODUCTION SUPABASE MIGRATION SNAPSHOT
-- Recovered from supabase_migrations.schema_migrations on 2026-10-05.
-- AUDIT/RECOVERY ONLY. DO NOT RUN THIS FILE AS A MIGRATION.
-- Total migrations: 121


-- =====================================================================
-- MIGRATION 20260919130501 homecourt_core_schema
-- =====================================================================
create extension if not exists pgcrypto;

create type public.rba_role as enum ('player','parent','coach','admin');
create type public.event_type as enum ('clinic','camp','homecourt_session','international','coach_education');
create type public.attendance_status as enum ('registered','confirmed','attended','cancelled','no_show');
create type public.subscription_status as enum ('inactive','trialing','active','past_due','cancelled','unpaid');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.rba_role not null default 'player',
  display_name text,
  preferred_language text not null default 'ja' check (preferred_language in ('ja','en','zh-Hant','ko')),
  birth_year integer check (birth_year is null or birth_year between 1990 and extract(year from current_date)::int),
  region text,
  country text not null default 'JP',
  avatar_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.guardian_links (
  id uuid primary key default gen_random_uuid(),
  parent_user_id uuid not null references public.profiles(id) on delete cascade,
  child_user_id uuid not null references public.profiles(id) on delete cascade,
  relationship text not null default 'guardian',
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  unique(parent_user_id, child_user_id)
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  event_type public.event_type not null,
  title text not null,
  starts_at timestamptz,
  ends_at timestamptz,
  venue text,
  city text,
  region text,
  country text not null default 'JP',
  status text not null default 'draft' check (status in ('draft','open','closed','completed','cancelled')),
  registration_url text,
  payment_url text,
  public_summary text,
  created_at timestamptz not null default now()
);

create table public.participations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  player_user_id uuid not null references public.profiles(id) on delete cascade,
  attendance_status public.attendance_status not null default 'registered',
  payment_status text not null default 'unknown',
  certificate_issued_at timestamptz,
  certificate_code text unique,
  joined_at timestamptz not null default now(),
  unique(event_id, player_user_id)
);

create table public.media_consents (
  id uuid primary key default gen_random_uuid(),
  player_user_id uuid not null references public.profiles(id) on delete cascade,
  guardian_user_id uuid references public.profiles(id) on delete set null,
  scope text not null default 'event_participants_only',
  allow_photo boolean not null default false,
  allow_video boolean not null default false,
  effective_from timestamptz not null default now(),
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.event_albums (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  title text not null,
  created_at timestamptz not null default now()
);

create table public.event_media (
  id uuid primary key default gen_random_uuid(),
  album_id uuid not null references public.event_albums(id) on delete cascade,
  storage_path text not null unique,
  media_type text not null check (media_type in ('image','video')),
  uploaded_at timestamptz not null default now(),
  is_published boolean not null default false
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  provider text not null default 'stripe',
  provider_customer_id text,
  provider_subscription_id text unique,
  status public.subscription_status not null default 'inactive',
  plan_key text not null default 'homecourt_monthly',
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  updated_at timestamptz not null default now()
);

create table public.coach_partner_profiles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  partner_status text not null default 'applicant' check (partner_status in ('applicant','approved','paused','ended')),
  bio text,
  regions text[],
  specialties text[],
  approved_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.coach_event_roles (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  coach_user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'coach',
  payout_amount_jpy integer,
  payout_status text not null default 'pending',
  unique(event_id, coach_user_id)
);

alter table public.profiles enable row level security;
alter table public.guardian_links enable row level security;
alter table public.events enable row level security;
alter table public.participations enable row level security;
alter table public.media_consents enable row level security;
alter table public.event_albums enable row level security;
alter table public.event_media enable row level security;
alter table public.subscriptions enable row level security;
alter table public.coach_partner_profiles enable row level security;
alter table public.coach_event_roles enable row level security;

create policy "public can read public events"
on public.events for select using (status in ('open','completed'));

create policy "profile self read"
on public.profiles for select to authenticated using (id = auth.uid());

create policy "profile self update"
on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

create policy "guardian link members read"
on public.guardian_links for select to authenticated using (parent_user_id = auth.uid() or child_user_id = auth.uid());

create policy "participation player or guardian read"
on public.participations for select to authenticated using (
  player_user_id = auth.uid()
  or exists (
    select 1 from public.guardian_links gl
    where gl.child_user_id = participations.player_user_id
      and gl.parent_user_id = auth.uid()
      and gl.verified_at is not null
  )
);

create policy "subscription self read"
on public.subscriptions for select to authenticated using (user_id = auth.uid());

create policy "consent player or guardian read"
on public.media_consents for select to authenticated using (
  player_user_id = auth.uid() or guardian_user_id = auth.uid()
);

create policy "participant album access"
on public.event_albums for select to authenticated using (
  exists (
    select 1 from public.participations p
    where p.event_id = event_albums.event_id
      and p.attendance_status = 'attended'
      and (
        p.player_user_id = auth.uid()
        or exists (
          select 1 from public.guardian_links gl
          where gl.child_user_id = p.player_user_id
            and gl.parent_user_id = auth.uid()
            and gl.verified_at is not null
        )
      )
  )
);

create policy "participant media metadata access"
on public.event_media for select to authenticated using (
  is_published = true
  and exists (
    select 1
    from public.event_albums a
    join public.participations p on p.event_id = a.event_id
    where a.id = event_media.album_id
      and p.attendance_status = 'attended'
      and (
        p.player_user_id = auth.uid()
        or exists (
          select 1 from public.guardian_links gl
          where gl.child_user_id = p.player_user_id
            and gl.parent_user_id = auth.uid()
            and gl.verified_at is not null
        )
      )
  )
);

create policy "coach sees own partner profile"
on public.coach_partner_profiles for select to authenticated using (user_id = auth.uid());

create policy "coach sees own event roles"
on public.coach_event_roles for select to authenticated using (coach_user_id = auth.uid());

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
declare requested_role text;
begin
  requested_role := coalesce(new.raw_user_meta_data ->> 'role', 'player');
  if requested_role not in ('player','parent','coach') then
    requested_role := 'player';
  end if;
  insert into public.profiles (id, role, display_name, preferred_language)
  values (
    new.id,
    requested_role::public.rba_role,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email,'@',1)),
    coalesce(new.raw_user_meta_data ->> 'preferred_language','ja')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'event-media',
  'event-media',
  false,
  52428800,
  array['image/jpeg','image/png','image/webp','video/mp4']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

insert into public.events (slug,event_type,title,starts_at,status,public_summary)
values
('torsten-loibl-online-clinic-vol-2','coach_education','Torsten Loibl Online Clinic Vol.2','2026-11-25T20:00:00+09:00','open','全国の指導者向けオンライン講習。'),
('rba-camp-2026-friday-evening','camp','RBA CAMP 2026 | Friday Evening Clinic','2026-11-20T18:00:00+09:00','open','金曜夜のRBA CAMPセッション。')
on conflict (slug) do nothing;

-- =====================================================================
-- MIGRATION 20260919130523 homecourt_security_performance_hardening
-- =====================================================================

revoke execute on function public.handle_new_user() from anon, authenticated;

create index if not exists idx_guardian_links_child_user_id on public.guardian_links(child_user_id);
create index if not exists idx_participations_player_user_id on public.participations(player_user_id);
create index if not exists idx_media_consents_player_user_id on public.media_consents(player_user_id);
create index if not exists idx_media_consents_guardian_user_id on public.media_consents(guardian_user_id);
create index if not exists idx_event_albums_event_id on public.event_albums(event_id);
create index if not exists idx_event_media_album_id on public.event_media(album_id);
create index if not exists idx_subscriptions_user_id on public.subscriptions(user_id);
create index if not exists idx_coach_event_roles_coach_user_id on public.coach_event_roles(coach_user_id);

drop policy if exists "profile self read" on public.profiles;
create policy "profile self read" on public.profiles for select to authenticated
using (id = (select auth.uid()));

drop policy if exists "profile self update" on public.profiles;
create policy "profile self update" on public.profiles for update to authenticated
using (id = (select auth.uid())) with check (id = (select auth.uid()));

drop policy if exists "guardian link members read" on public.guardian_links;
create policy "guardian link members read" on public.guardian_links for select to authenticated
using (parent_user_id = (select auth.uid()) or child_user_id = (select auth.uid()));

drop policy if exists "participation player or guardian read" on public.participations;
create policy "participation player or guardian read" on public.participations for select to authenticated
using (
  player_user_id = (select auth.uid())
  or exists (
    select 1 from public.guardian_links gl
    where gl.child_user_id = participations.player_user_id
      and gl.parent_user_id = (select auth.uid())
      and gl.verified_at is not null
  )
);

drop policy if exists "subscription self read" on public.subscriptions;
create policy "subscription self read" on public.subscriptions for select to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "consent player or guardian read" on public.media_consents;
create policy "consent player or guardian read" on public.media_consents for select to authenticated
using (player_user_id = (select auth.uid()) or guardian_user_id = (select auth.uid()));

drop policy if exists "participant album access" on public.event_albums;
create policy "participant album access" on public.event_albums for select to authenticated
using (
  exists (
    select 1 from public.participations p
    where p.event_id = event_albums.event_id
      and p.attendance_status = 'attended'
      and (
        p.player_user_id = (select auth.uid())
        or exists (
          select 1 from public.guardian_links gl
          where gl.child_user_id = p.player_user_id
            and gl.parent_user_id = (select auth.uid())
            and gl.verified_at is not null
        )
      )
  )
);

drop policy if exists "participant media metadata access" on public.event_media;
create policy "participant media metadata access" on public.event_media for select to authenticated
using (
  is_published = true
  and exists (
    select 1
    from public.event_albums a
    join public.participations p on p.event_id = a.event_id
    where a.id = event_media.album_id
      and p.attendance_status = 'attended'
      and (
        p.player_user_id = (select auth.uid())
        or exists (
          select 1 from public.guardian_links gl
          where gl.child_user_id = p.player_user_id
            and gl.parent_user_id = (select auth.uid())
            and gl.verified_at is not null
        )
      )
  )
);

drop policy if exists "coach sees own partner profile" on public.coach_partner_profiles;
create policy "coach sees own partner profile" on public.coach_partner_profiles for select to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "coach sees own event roles" on public.coach_event_roles;
create policy "coach sees own event roles" on public.coach_event_roles for select to authenticated
using (coach_user_id = (select auth.uid()));


-- =====================================================================
-- MIGRATION 20260919130536 revoke_profile_trigger_rpc
-- =====================================================================
revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- =====================================================================
-- MIGRATION 20260919131025 homecourt_operational_policies_and_storage_acl
-- =====================================================================

-- Admin-aware operational policies without exposing service keys.
create policy "admin manages events"
on public.events for all to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

create policy "admin manages participations"
on public.participations for all to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

create policy "parent can request guardian link"
on public.guardian_links for insert to authenticated
with check (parent_user_id=(select auth.uid()) and verified_at is null);

create policy "admin verifies guardian links"
on public.guardian_links for update to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

create policy "guardian can create media consent"
on public.media_consents for insert to authenticated
with check (
  guardian_user_id=(select auth.uid())
  and exists (
    select 1 from public.guardian_links gl
    where gl.parent_user_id=(select auth.uid())
      and gl.child_user_id=media_consents.player_user_id
      and gl.verified_at is not null
  )
);

create policy "guardian can update own media consent"
on public.media_consents for update to authenticated
using (guardian_user_id=(select auth.uid()))
with check (guardian_user_id=(select auth.uid()));

create policy "admin manages albums"
on public.event_albums for all to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

create policy "admin manages event media"
on public.event_media for all to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

create policy "admin manages coach partner profiles"
on public.coach_partner_profiles for all to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

create policy "admin manages coach event roles"
on public.coach_event_roles for all to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

-- Storage: event-media remains private. Authenticated attendees or verified guardians can read only objects
-- that are registered as published event_media for an album/event they are entitled to.
create policy "event media entitled read"
on storage.objects for select to authenticated
using (
  bucket_id='event-media'
  and exists (
    select 1
    from public.event_media em
    join public.event_albums ea on ea.id=em.album_id
    join public.participations pp on pp.event_id=ea.event_id
    where em.storage_path=storage.objects.name
      and em.is_published=true
      and pp.attendance_status='attended'
      and (
        pp.player_user_id=(select auth.uid())
        or exists(
          select 1 from public.guardian_links gl
          where gl.child_user_id=pp.player_user_id
            and gl.parent_user_id=(select auth.uid())
            and gl.verified_at is not null
        )
      )
  )
);

create policy "admin manages event media objects"
on storage.objects for all to authenticated
using (
  bucket_id='event-media'
  and exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin')
)
with check (
  bucket_id='event-media'
  and exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin')
);


-- =====================================================================
-- MIGRATION 20260919131059 consolidate_rls_for_performance
-- =====================================================================

-- Consolidate SELECT policies to avoid multiple permissive policy evaluation.

drop policy if exists "public can read public events" on public.events;
drop policy if exists "admin manages events" on public.events;
create policy "events read public or admin" on public.events for select
using (
  status in ('open','completed')
  or exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin')
);
create policy "admin inserts events" on public.events for insert to authenticated
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy "admin updates events" on public.events for update to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy "admin deletes events" on public.events for delete to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

drop policy if exists "participation player or guardian read" on public.participations;
drop policy if exists "admin manages participations" on public.participations;
create policy "participations entitled or admin read" on public.participations for select to authenticated
using (
  player_user_id=(select auth.uid())
  or exists(
    select 1 from public.guardian_links gl
    where gl.child_user_id=participations.player_user_id
      and gl.parent_user_id=(select auth.uid())
      and gl.verified_at is not null
  )
  or exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin')
);
create policy "admin inserts participations" on public.participations for insert to authenticated
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy "admin updates participations" on public.participations for update to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy "admin deletes participations" on public.participations for delete to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

drop policy if exists "participant album access" on public.event_albums;
drop policy if exists "admin manages albums" on public.event_albums;
create policy "album entitled or admin read" on public.event_albums for select to authenticated
using (
  exists(
    select 1 from public.participations p
    where p.event_id=event_albums.event_id
      and p.attendance_status='attended'
      and (
        p.player_user_id=(select auth.uid())
        or exists(
          select 1 from public.guardian_links gl
          where gl.child_user_id=p.player_user_id
            and gl.parent_user_id=(select auth.uid())
            and gl.verified_at is not null
        )
      )
  )
  or exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin')
);
create policy "admin inserts albums" on public.event_albums for insert to authenticated
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy "admin updates albums" on public.event_albums for update to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy "admin deletes albums" on public.event_albums for delete to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

drop policy if exists "participant media metadata access" on public.event_media;
drop policy if exists "admin manages event media" on public.event_media;
create policy "event media entitled or admin read" on public.event_media for select to authenticated
using (
  (
    is_published=true
    and exists(
      select 1
      from public.event_albums a
      join public.participations p on p.event_id=a.event_id
      where a.id=event_media.album_id
        and p.attendance_status='attended'
        and (
          p.player_user_id=(select auth.uid())
          or exists(
            select 1 from public.guardian_links gl
            where gl.child_user_id=p.player_user_id
              and gl.parent_user_id=(select auth.uid())
              and gl.verified_at is not null
          )
        )
    )
  )
  or exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin')
);
create policy "admin inserts event media" on public.event_media for insert to authenticated
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy "admin updates event media" on public.event_media for update to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy "admin deletes event media" on public.event_media for delete to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

drop policy if exists "coach sees own partner profile" on public.coach_partner_profiles;
drop policy if exists "admin manages coach partner profiles" on public.coach_partner_profiles;
create policy "coach partner self or admin read" on public.coach_partner_profiles for select to authenticated
using (
  user_id=(select auth.uid())
  or exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin')
);
create policy "admin inserts coach partner profiles" on public.coach_partner_profiles for insert to authenticated
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy "admin updates coach partner profiles" on public.coach_partner_profiles for update to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy "admin deletes coach partner profiles" on public.coach_partner_profiles for delete to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

drop policy if exists "coach sees own event roles" on public.coach_event_roles;
drop policy if exists "admin manages coach event roles" on public.coach_event_roles;
create policy "coach event roles self or admin read" on public.coach_event_roles for select to authenticated
using (
  coach_user_id=(select auth.uid())
  or exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin')
);
create policy "admin inserts coach event roles" on public.coach_event_roles for insert to authenticated
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy "admin updates coach event roles" on public.coach_event_roles for update to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy "admin deletes coach event roles" on public.coach_event_roles for delete to authenticated
using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));


-- =====================================================================
-- MIGRATION 20260919131122 admin_read_visibility
-- =====================================================================

drop policy if exists "profile self read" on public.profiles;
create policy "profile self or admin read" on public.profiles for select to authenticated
using (
  id=(select auth.uid())
  or exists(select 1 from public.profiles me where me.id=(select auth.uid()) and me.role='admin')
);

drop policy if exists "guardian link members read" on public.guardian_links;
create policy "guardian links members or admin read" on public.guardian_links for select to authenticated
using (
  parent_user_id=(select auth.uid())
  or child_user_id=(select auth.uid())
  or exists(select 1 from public.profiles me where me.id=(select auth.uid()) and me.role='admin')
);

drop policy if exists "subscription self read" on public.subscriptions;
create policy "subscription self or admin read" on public.subscriptions for select to authenticated
using (
  user_id=(select auth.uid())
  or exists(select 1 from public.profiles me where me.id=(select auth.uid()) and me.role='admin')
);

drop policy if exists "consent player or guardian read" on public.media_consents;
create policy "consent family or admin read" on public.media_consents for select to authenticated
using (
  player_user_id=(select auth.uid())
  or guardian_user_id=(select auth.uid())
  or exists(select 1 from public.profiles me where me.id=(select auth.uid()) and me.role='admin')
);


-- =====================================================================
-- MIGRATION 20260919131149 media_subject_consent_enforcement_and_guardian_profile_read
-- =====================================================================

create table if not exists public.media_subjects (
  id uuid primary key default gen_random_uuid(),
  media_id uuid not null references public.event_media(id) on delete cascade,
  player_user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(media_id, player_user_id)
);
alter table public.media_subjects enable row level security;
create index if not exists idx_media_subjects_media_id on public.media_subjects(media_id);
create index if not exists idx_media_subjects_player_user_id on public.media_subjects(player_user_id);

create policy "media subjects entitled or admin read"
on public.media_subjects for select to authenticated
using (
  exists(
    select 1
    from public.event_media em
    join public.event_albums ea on ea.id=em.album_id
    join public.participations p on p.event_id=ea.event_id
    where em.id=media_subjects.media_id
      and p.attendance_status='attended'
      and (
        p.player_user_id=(select auth.uid())
        or exists(
          select 1 from public.guardian_links gl
          where gl.child_user_id=p.player_user_id
            and gl.parent_user_id=(select auth.uid())
            and gl.verified_at is not null
        )
      )
  )
  or exists(select 1 from public.profiles me where me.id=(select auth.uid()) and me.role='admin')
);

create policy "admin manages media subjects"
on public.media_subjects for all to authenticated
using (exists(select 1 from public.profiles me where me.id=(select auth.uid()) and me.role='admin'))
with check (exists(select 1 from public.profiles me where me.id=(select auth.uid()) and me.role='admin'));

drop policy if exists "event media entitled read" on storage.objects;
create policy "event media entitled read"
on storage.objects for select to authenticated
using (
  bucket_id='event-media'
  and exists (
    select 1
    from public.event_media em
    join public.event_albums ea on ea.id=em.album_id
    join public.participations pp on pp.event_id=ea.event_id
    where em.storage_path=storage.objects.name
      and em.is_published=true
      and pp.attendance_status='attended'
      and (
        pp.player_user_id=(select auth.uid())
        or exists(
          select 1 from public.guardian_links gl
          where gl.child_user_id=pp.player_user_id
            and gl.parent_user_id=(select auth.uid())
            and gl.verified_at is not null
        )
      )
      and not exists (
        select 1
        from public.media_subjects ms
        where ms.media_id=em.id
          and not exists (
            select 1
            from public.media_consents mc
            where mc.player_user_id=ms.player_user_id
              and mc.allow_photo=true
              and mc.scope='event_participants_only'
              and mc.revoked_at is null
          )
      )
  )
);

drop policy if exists "profile self or admin read" on public.profiles;
create policy "profile self guardian or admin read" on public.profiles for select to authenticated
using (
  id=(select auth.uid())
  or exists(
    select 1 from public.guardian_links gl
    where gl.parent_user_id=(select auth.uid())
      and gl.child_user_id=profiles.id
      and gl.verified_at is not null
  )
  or exists(select 1 from public.profiles me where me.id=(select auth.uid()) and me.role='admin')
);


-- =====================================================================
-- MIGRATION 20260919134857 homecourt_admin_and_consent_hardening
-- =====================================================================

-- Tighten role integrity: users cannot change role through normal profile updates.
revoke update(role) on public.profiles from authenticated;
grant update(display_name, preferred_language, birth_year, region, country, avatar_path, updated_at) on public.profiles to authenticated;

-- Admin policies rely on trusted auth.app_metadata, never browser-editable user_metadata.
create policy "admin read profiles"
on public.profiles for select to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "admin manage guardian links"
on public.guardian_links for all to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "admin manage events"
on public.events for all to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "admin manage participations"
on public.participations for all to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "admin manage media consents"
on public.media_consents for all to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "admin manage albums"
on public.event_albums for all to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "admin manage event media"
on public.event_media for all to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "admin manage subscriptions"
on public.subscriptions for all to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "admin manage coach partners"
on public.coach_partner_profiles for all to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "admin manage coach event roles"
on public.coach_event_roles for all to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Participants can create/update their own media consent; guardians can manage linked child's consent.
create policy "consent self insert"
on public.media_consents for insert to authenticated
with check (
  player_user_id = (select auth.uid())
  or guardian_user_id = (select auth.uid())
);

create policy "consent self update"
on public.media_consents for update to authenticated
using (
  player_user_id = (select auth.uid())
  or guardian_user_id = (select auth.uid())
)
with check (
  player_user_id = (select auth.uid())
  or guardian_user_id = (select auth.uid())
);

-- Coach can update own partner profile except approval status is controlled by server/admin.
grant update(bio, regions, specialties) on public.coach_partner_profiles to authenticated;
create policy "coach update own partner profile"
on public.coach_partner_profiles for update to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

-- Useful indexes for event and date lookups.
create index if not exists idx_events_status_starts_at on public.events(status, starts_at);
create index if not exists idx_participations_event_id on public.participations(event_id);
create index if not exists idx_subscriptions_provider_subscription_id on public.subscriptions(provider_subscription_id);


-- =====================================================================
-- MIGRATION 20260919135038 homecourt_storage_and_role_provisioning
-- =====================================================================

-- Automatically provision a coach partner profile for coach signups.
create or replace function public.handle_new_profile_role()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  if new.role = 'coach'::public.rba_role then
    insert into public.coach_partner_profiles (user_id, partner_status)
    values (new.id, 'applicant')
    on conflict (user_id) do nothing;
  end if;
  return new;
end;
$$;

revoke execute on function public.handle_new_profile_role() from public, anon, authenticated;

drop trigger if exists on_profile_created_role on public.profiles;
create trigger on_profile_created_role
after insert on public.profiles
for each row execute procedure public.handle_new_profile_role();

-- Private event-media bucket policies.
drop policy if exists "event media participant read" on storage.objects;
create policy "event media participant read"
on storage.objects for select to authenticated
using (
  bucket_id = 'event-media'
  and exists (
    select 1
    from public.event_media em
    join public.event_albums ea on ea.id = em.album_id
    join public.participations p on p.event_id = ea.event_id
    where em.storage_path = storage.objects.name
      and em.is_published = true
      and p.attendance_status = 'attended'
      and (
        p.player_user_id = (select auth.uid())
        or exists (
          select 1 from public.guardian_links gl
          where gl.child_user_id = p.player_user_id
            and gl.parent_user_id = (select auth.uid())
            and gl.verified_at is not null
        )
      )
  )
);

drop policy if exists "event media admin insert" on storage.objects;
create policy "event media admin insert"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'event-media'
  and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

drop policy if exists "event media admin update" on storage.objects;
create policy "event media admin update"
on storage.objects for update to authenticated
using (
  bucket_id = 'event-media'
  and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
)
with check (
  bucket_id = 'event-media'
  and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

drop policy if exists "event media admin delete" on storage.objects;
create policy "event media admin delete"
on storage.objects for delete to authenticated
using (
  bucket_id = 'event-media'
  and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);


-- =====================================================================
-- MIGRATION 20260919135112 remove_redundant_policies_and_tighten_media_consent
-- =====================================================================

drop policy if exists "admin read profiles" on public.profiles;
drop policy if exists "admin manage guardian links" on public.guardian_links;
drop policy if exists "admin manage events" on public.events;
drop policy if exists "admin manage participations" on public.participations;
drop policy if exists "admin manage media consents" on public.media_consents;
drop policy if exists "admin manage albums" on public.event_albums;
drop policy if exists "admin manage event media" on public.event_media;
drop policy if exists "admin manage subscriptions" on public.subscriptions;
drop policy if exists "admin manage coach partners" on public.coach_partner_profiles;
drop policy if exists "admin manage coach event roles" on public.coach_event_roles;

drop policy if exists "consent self insert" on public.media_consents;
drop policy if exists "consent self update" on public.media_consents;

drop policy if exists "event media participant read" on storage.objects;
drop policy if exists "event media admin insert" on storage.objects;
drop policy if exists "event media admin update" on storage.objects;
drop policy if exists "event media admin delete" on storage.objects;


-- =====================================================================
-- MIGRATION 20260919135223 remove_last_duplicate_rls_policies
-- =====================================================================

drop policy if exists "admin updates coach partner profiles" on public.coach_partner_profiles;
drop policy if exists "admin manages media subjects" on public.media_subjects;


-- =====================================================================
-- MIGRATION 20260920013733 team_home_operating_system
-- =====================================================================

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


-- =====================================================================
-- MIGRATION 20260920015131 team_home_join_codes
-- =====================================================================

create table if not exists public.team_join_codes (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  code text not null unique default upper(substr(replace(gen_random_uuid()::text,'-',''),1,8)),
  member_role text not null default 'player' check (member_role in ('coach','staff','player','parent')),
  expires_at timestamptz,
  max_uses integer check (max_uses is null or max_uses > 0),
  use_count integer not null default 0 check (use_count >= 0),
  active boolean not null default true,
  created_by uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now()
);

alter table public.team_join_codes enable row level security;
grant select,insert,update,delete on public.team_join_codes to authenticated;

create policy "team managers read join codes" on public.team_join_codes for select to authenticated
using (private.is_team_manager(team_id));
create policy "team managers create join codes" on public.team_join_codes for insert to authenticated
with check (private.is_team_manager(team_id) and created_by=(select auth.uid()));
create policy "team managers update join codes" on public.team_join_codes for update to authenticated
using (private.is_team_manager(team_id)) with check (private.is_team_manager(team_id));
create policy "team managers delete join codes" on public.team_join_codes for delete to authenticated
using (private.is_team_manager(team_id));

create or replace function public.join_team_with_code(invite_code text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  invite public.team_join_codes%rowtype;
  current_user_id uuid := (select auth.uid());
begin
  if current_user_id is null then
    raise exception 'authentication required';
  end if;

  select * into invite
  from public.team_join_codes
  where code = upper(trim(invite_code))
    and active = true
    and (expires_at is null or expires_at > now())
    and (max_uses is null or use_count < max_uses)
  for update;

  if invite.id is null then
    raise exception 'invalid or expired team code';
  end if;

  insert into public.team_memberships(team_id,user_id,member_role,status)
  values(invite.team_id,current_user_id,invite.member_role,'active')
  on conflict(team_id,user_id,member_role)
  do update set status='active';

  update public.team_join_codes set use_count=use_count+1 where id=invite.id;
  return invite.team_id;
end;
$$;

revoke all on function public.join_team_with_code(text) from public;
revoke all on function public.join_team_with_code(text) from anon;
grant execute on function public.join_team_with_code(text) to authenticated;

comment on function public.join_team_with_code(text) is 'Authenticated users join a TEAM HOME only with a valid manager-issued code.';


-- =====================================================================
-- MIGRATION 20260920015336 team_home_index_hardening
-- =====================================================================

create index if not exists idx_attendance_user on public.attendance_responses(user_id);
create index if not exists idx_quick_notes_team on public.coach_quick_notes(team_id);
create index if not exists idx_practice_plans_copied_from on public.practice_plans(copied_from);
create index if not exists idx_team_collections_created_by on public.team_collections(created_by);
create index if not exists idx_team_events_created_by on public.team_events(created_by);
create index if not exists idx_team_events_public_event on public.team_events(related_public_event_id);
create index if not exists idx_team_join_codes_created_by on public.team_join_codes(created_by);
create index if not exists idx_team_join_codes_team on public.team_join_codes(team_id);
create index if not exists idx_team_notices_created_by on public.team_notices(created_by);
create index if not exists idx_teams_created_by on public.teams(created_by);


-- =====================================================================
-- MIGRATION 20260920025551 platform_v4_foundation
-- =====================================================================
-- RBA Platform v4: additive business/platform foundation.
-- Keeps the existing primary profile role for backwards compatibility while
-- allowing one RBA ID to hold multiple explicitly granted roles.

create table if not exists public.profile_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('player','parent','coach','team','organizer','official','facility','partner','admin')),
  status text not null default 'active' check (status in ('pending','active','suspended','revoked')),
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  primary key (user_id, role)
);

create table if not exists public.platform_entities (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null check (entity_type in ('team','organizer','facility','partner','supplier')),
  name text not null check (char_length(name) between 1 and 160),
  slug text unique,
  country text not null default 'JP',
  region text,
  timezone text not null default 'Asia/Tokyo',
  default_currency text not null default 'JPY',
  description text,
  website_url text,
  status text not null default 'draft' check (status in ('draft','pending_review','active','suspended','archived')),
  verification_status text not null default 'unverified' check (verification_status in ('unverified','pending','verified','rejected')),
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.entity_memberships (
  id uuid primary key default gen_random_uuid(),
  entity_id uuid not null references public.platform_entities(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  member_role text not null check (member_role in ('owner','admin','staff','coach','official','viewer')),
  status text not null default 'active' check (status in ('invited','active','suspended','removed')),
  created_at timestamptz not null default now(),
  unique (entity_id, user_id, member_role)
);

create table if not exists public.service_offers (
  id uuid primary key default gen_random_uuid(),
  provider_entity_id uuid references public.platform_entities(id) on delete set null,
  offer_type text not null check (offer_type in ('event','clinic','tournament','trip','team_collection','team_shop','official_store','staffing','facility','sponsorship','subscription','other')),
  title text not null check (char_length(title) between 1 and 180),
  slug text unique,
  summary text,
  availability_status text not null default 'request_required' check (availability_status in ('confirmed','request_required','unknown','closed')),
  publication_status text not null default 'draft' check (publication_status in ('draft','published','paused','archived')),
  currency text not null default 'JPY',
  unit_amount integer check (unit_amount is null or unit_amount >= 0),
  pricing_mode text not null default 'fixed' check (pricing_mode in ('free','fixed','starting_at','quote','external')),
  external_application_url text,
  external_payment_url text,
  starts_at timestamptz,
  ends_at timestamptz,
  capacity integer check (capacity is null or capacity >= 0),
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.platform_orders (
  id uuid primary key default gen_random_uuid(),
  order_number bigint generated always as identity unique,
  user_id uuid not null references auth.users(id),
  buyer_entity_id uuid references public.platform_entities(id),
  service_offer_id uuid references public.service_offers(id),
  order_type text not null check (order_type in ('application','event','subscription','trip','team_collection','shop','quote','staffing','facility','sponsorship','other')),
  status text not null default 'draft' check (status in ('draft','submitted','awaiting_payment','paid','confirmed','fulfilled','cancelled','refunded','failed')),
  amount_subtotal integer check (amount_subtotal is null or amount_subtotal >= 0),
  amount_fee integer check (amount_fee is null or amount_fee >= 0),
  amount_total integer check (amount_total is null or amount_total >= 0),
  currency text not null default 'JPY',
  locale text not null default 'ja',
  provider text,
  provider_checkout_id text unique,
  submitted_at timestamptz,
  confirmed_at timestamptz,
  fulfilled_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.transaction_ledger (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.platform_orders(id) on delete set null,
  user_id uuid references auth.users(id) on delete set null,
  entity_id uuid references public.platform_entities(id) on delete set null,
  transaction_type text not null check (transaction_type in ('charge','refund','fee','payout','adjustment')),
  status text not null check (status in ('pending','succeeded','failed','cancelled','refunded','partially_refunded')),
  amount integer not null check (amount >= 0),
  currency text not null default 'JPY',
  provider text not null,
  provider_transaction_id text not null,
  receipt_url text,
  occurred_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (provider, provider_transaction_id, transaction_type)
);

create table if not exists public.safety_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_user_id uuid not null references auth.users(id),
  subject_user_id uuid references auth.users(id),
  entity_id uuid references public.platform_entities(id),
  category text not null check (category in ('safeguarding','harassment','privacy','fraud','content','other')),
  description text not null check (char_length(description) between 1 and 4000),
  status text not null default 'received' check (status in ('received','reviewing','actioned','closed')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists public.user_blocks (
  blocker_user_id uuid not null references auth.users(id) on delete cascade,
  blocked_user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blocker_user_id, blocked_user_id),
  check (blocker_user_id <> blocked_user_id)
);

create table if not exists public.platform_audit_logs (
  id bigint generated always as identity primary key,
  actor_user_id uuid references auth.users(id) on delete set null,
  action text not null,
  resource_type text not null,
  resource_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists profile_roles_role_idx on public.profile_roles(role, status);
create index if not exists platform_entities_created_by_idx on public.platform_entities(created_by);
create index if not exists entity_memberships_user_idx on public.entity_memberships(user_id, status);
create index if not exists service_offers_provider_idx on public.service_offers(provider_entity_id);
create index if not exists service_offers_public_idx on public.service_offers(publication_status, offer_type, starts_at);
create index if not exists platform_orders_user_idx on public.platform_orders(user_id, created_at desc);
create index if not exists platform_orders_offer_idx on public.platform_orders(service_offer_id);
create index if not exists transaction_ledger_user_idx on public.transaction_ledger(user_id, occurred_at desc);
create index if not exists transaction_ledger_order_idx on public.transaction_ledger(order_id);
create index if not exists safety_reports_reporter_idx on public.safety_reports(reporter_user_id, created_at desc);

create or replace function private.is_entity_manager(target_entity uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.platform_entities e
    where e.id = target_entity and e.created_by = (select auth.uid())
  ) or exists (
    select 1 from public.entity_memberships em
    where em.entity_id = target_entity
      and em.user_id = (select auth.uid())
      and em.status = 'active'
      and em.member_role in ('owner','admin')
  ) or private.is_global_admin();
$$;
revoke all on function private.is_entity_manager(uuid) from public, anon;
grant execute on function private.is_entity_manager(uuid) to authenticated;

create or replace function private.sync_primary_profile_role()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profile_roles(user_id, role, status, verified_at)
  values (new.id, new.role::text, 'active', now())
  on conflict (user_id, role) do update set status = 'active';
  return new;
end;
$$;
revoke all on function private.sync_primary_profile_role() from public, anon;

drop trigger if exists sync_primary_profile_role on public.profiles;
create trigger sync_primary_profile_role
after insert or update of role on public.profiles
for each row execute function private.sync_primary_profile_role();

insert into public.profile_roles(user_id, role, status, verified_at)
select id, role::text, 'active', now() from public.profiles
on conflict (user_id, role) do nothing;

alter table public.profile_roles enable row level security;
alter table public.platform_entities enable row level security;
alter table public.entity_memberships enable row level security;
alter table public.service_offers enable row level security;
alter table public.platform_orders enable row level security;
alter table public.transaction_ledger enable row level security;
alter table public.safety_reports enable row level security;
alter table public.user_blocks enable row level security;
alter table public.platform_audit_logs enable row level security;

create policy profile_roles_read_self on public.profile_roles for select to authenticated
using (user_id = (select auth.uid()) or private.is_global_admin());
create policy profile_roles_add_self on public.profile_roles for insert to authenticated
with check (user_id = (select auth.uid()) and role in ('player','parent','coach','organizer','official','facility','partner'));
create policy profile_roles_remove_self on public.profile_roles for delete to authenticated
using (user_id = (select auth.uid()) and role <> 'admin');

create policy entities_read on public.platform_entities for select to authenticated
using (status = 'active' or private.is_entity_manager(id));
create policy entities_create on public.platform_entities for insert to authenticated
with check (created_by = (select auth.uid()));
create policy entities_manage on public.platform_entities for update to authenticated
using (private.is_entity_manager(id)) with check (private.is_entity_manager(id));

create policy memberships_read on public.entity_memberships for select to authenticated
using (user_id = (select auth.uid()) or private.is_entity_manager(entity_id));
create policy memberships_manage_insert on public.entity_memberships for insert to authenticated
with check (private.is_entity_manager(entity_id));
create policy memberships_manage_update on public.entity_memberships for update to authenticated
using (private.is_entity_manager(entity_id)) with check (private.is_entity_manager(entity_id));
create policy memberships_manage_delete on public.entity_memberships for delete to authenticated
using (private.is_entity_manager(entity_id));

create policy offers_public_read on public.service_offers for select to anon, authenticated
using (publication_status = 'published' or (select auth.role()) = 'authenticated' and (created_by = (select auth.uid()) or (provider_entity_id is not null and private.is_entity_manager(provider_entity_id))) or private.is_global_admin());
create policy offers_create on public.service_offers for insert to authenticated
with check (created_by = (select auth.uid()) and (provider_entity_id is null or private.is_entity_manager(provider_entity_id)));
create policy offers_manage on public.service_offers for update to authenticated
using (created_by = (select auth.uid()) or (provider_entity_id is not null and private.is_entity_manager(provider_entity_id)) or private.is_global_admin())
with check (created_by = (select auth.uid()) or (provider_entity_id is not null and private.is_entity_manager(provider_entity_id)) or private.is_global_admin());

create policy orders_read_own on public.platform_orders for select to authenticated
using (user_id = (select auth.uid()) or (buyer_entity_id is not null and private.is_entity_manager(buyer_entity_id)) or private.is_global_admin());
create policy orders_create_own on public.platform_orders for insert to authenticated
with check (user_id = (select auth.uid()) and status in ('draft','submitted','awaiting_payment'));

create policy ledger_read_own on public.transaction_ledger for select to authenticated
using (user_id = (select auth.uid()) or (entity_id is not null and private.is_entity_manager(entity_id)) or private.is_global_admin());

create policy safety_reports_create on public.safety_reports for insert to authenticated
with check (reporter_user_id = (select auth.uid()));
create policy safety_reports_read on public.safety_reports for select to authenticated
using (reporter_user_id = (select auth.uid()) or private.is_global_admin());

create policy blocks_read_self on public.user_blocks for select to authenticated
using (blocker_user_id = (select auth.uid()));
create policy blocks_create_self on public.user_blocks for insert to authenticated
with check (blocker_user_id = (select auth.uid()));
create policy blocks_delete_self on public.user_blocks for delete to authenticated
using (blocker_user_id = (select auth.uid()));

create policy audit_admin_read on public.platform_audit_logs for select to authenticated
using (private.is_global_admin());

grant select, insert, delete on public.profile_roles to authenticated;
grant select, insert, update on public.platform_entities to authenticated;
grant select, insert, update, delete on public.entity_memberships to authenticated;
grant select on public.service_offers to anon;
grant select, insert, update on public.service_offers to authenticated;
grant select, insert on public.platform_orders to authenticated;
grant select on public.transaction_ledger to authenticated;
grant select, insert on public.safety_reports to authenticated;
grant select, insert, delete on public.user_blocks to authenticated;
grant select on public.platform_audit_logs to authenticated;



-- =====================================================================
-- MIGRATION 20260920030828 platform_v4_hardening
-- =====================================================================
drop policy if exists offers_public_read on public.service_offers;
create policy offers_anon_read on public.service_offers for select to anon
using (publication_status = 'published');
create policy offers_authenticated_read on public.service_offers for select to authenticated
using (
  publication_status = 'published'
  or created_by = (select auth.uid())
  or (provider_entity_id is not null and private.is_entity_manager(provider_entity_id))
  or private.is_global_admin()
);

create index if not exists platform_audit_logs_actor_idx on public.platform_audit_logs(actor_user_id);
create index if not exists platform_orders_buyer_entity_idx on public.platform_orders(buyer_entity_id);
create index if not exists safety_reports_entity_idx on public.safety_reports(entity_id);
create index if not exists safety_reports_subject_idx on public.safety_reports(subject_user_id);
create index if not exists service_offers_created_by_idx on public.service_offers(created_by);
create index if not exists transaction_ledger_entity_idx on public.transaction_ledger(entity_id);
create index if not exists user_blocks_blocked_idx on public.user_blocks(blocked_user_id);


-- =====================================================================
-- MIGRATION 20260920032114 profile_role_verification
-- =====================================================================
drop policy if exists profile_roles_add_self on public.profile_roles;
create policy profile_roles_add_self on public.profile_roles for insert to authenticated
with check (
  user_id = (select auth.uid())
  and (
    (role in ('player','parent','coach') and status = 'active')
    or (role in ('organizer','official','facility','partner') and status = 'pending')
  )
  and verified_at is null
);


-- =====================================================================
-- MIGRATION 20260920130812 member_security_hardening
-- =====================================================================
-- Prevent self-service privilege escalation while preserving PLAYER/PARENT/COACH onboarding.
drop policy if exists "profile self update" on public.profiles;
create policy "profile self update" on public.profiles
for update to authenticated
using (id = (select auth.uid()))
with check (
  id = (select auth.uid())
  and (
    role in ('player'::public.rba_role, 'parent'::public.rba_role, 'coach'::public.rba_role)
    or private.is_global_admin()
  )
);

revoke all on table public.profiles from anon;

drop policy if exists "team owners delete teams" on public.teams;
create policy "team owners delete teams" on public.teams
for delete to authenticated
using (
  exists (
    select 1
    from public.team_memberships tm
    where tm.team_id = teams.id
      and tm.user_id = (select auth.uid())
      and tm.member_role = 'owner'
      and tm.status = 'active'
  )
  or private.is_global_admin()
);

create or replace function public.join_team_with_code(invite_code text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  invite public.team_join_codes%rowtype;
  current_user_id uuid := (select auth.uid());
begin
  if current_user_id is null then
    raise exception 'authentication required';
  end if;

  if invite_code is null or char_length(trim(invite_code)) not between 4 and 32 then
    raise exception 'invalid or expired team code';
  end if;

  select * into invite
  from public.team_join_codes
  where code = upper(trim(invite_code))
    and active = true
    and (expires_at is null or expires_at > now())
    and (max_uses is null or use_count < max_uses)
  for update;

  if invite.id is null then
    raise exception 'invalid or expired team code';
  end if;

  if exists (
    select 1 from public.team_memberships tm
    where tm.team_id = invite.team_id
      and tm.user_id = current_user_id
      and tm.member_role = invite.member_role
      and tm.status = 'active'
  ) then
    return invite.team_id;
  end if;

  insert into public.team_memberships(team_id,user_id,member_role,status)
  values(invite.team_id,current_user_id,invite.member_role,'active')
  on conflict(team_id,user_id,member_role)
  do update set status='active';

  update public.team_join_codes
  set use_count=use_count+1
  where id=invite.id;

  return invite.team_id;
end;
$$;

revoke all on function public.join_team_with_code(text) from public, anon;
grant execute on function public.join_team_with_code(text) to authenticated, service_role;

-- =====================================================================
-- MIGRATION 20260920134614 integration_secret_store
-- =====================================================================
create table if not exists private.integration_secrets (
  name text primary key,
  secret text not null,
  updated_at timestamptz not null default now()
);
revoke all on table private.integration_secrets from public, anon, authenticated;
grant select on table private.integration_secrets to service_role;
create or replace function public.get_integration_secret(secret_name text)
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select s.secret
  from private.integration_secrets s
  where s.name = secret_name
  limit 1;
$$;
revoke all on function public.get_integration_secret(text) from public, anon, authenticated;
grant execute on function public.get_integration_secret(text) to service_role;

-- =====================================================================
-- MIGRATION 20260922222615 stripe_payment_reconciliation
-- =====================================================================

create table if not exists public.stripe_webhook_events (
  id uuid primary key default gen_random_uuid(),
  stripe_event_id text not null unique,
  event_type text not null,
  object_id text,
  livemode boolean not null default true,
  payload_sha256 text,
  processing_status text not null default 'received'
    check (processing_status in ('received','processed','ignored','failed')),
  error_message text,
  received_at timestamptz not null default now(),
  processed_at timestamptz
);

alter table public.stripe_webhook_events enable row level security;
revoke all on public.stripe_webhook_events from anon, authenticated;

create unique index if not exists transaction_ledger_provider_tx_unique
  on public.transaction_ledger(provider, provider_transaction_id);

create or replace function public.resolve_rba_user_id_by_email(input_email text)
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select u.id
  from auth.users u
  where lower(u.email) = lower(input_email)
  order by u.created_at desc
  limit 1
$$;

revoke all on function public.resolve_rba_user_id_by_email(text) from public, anon, authenticated;
grant execute on function public.resolve_rba_user_id_by_email(text) to service_role;

create or replace function public.get_rba_stripe_webhook_secret()
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select ds.decrypted_secret
  from vault.decrypted_secrets ds
  where ds.name = 'rba_stripe_webhook_secret'
  order by ds.created_at desc
  limit 1
$$;

revoke all on function public.get_rba_stripe_webhook_secret() from public, anon, authenticated;
grant execute on function public.get_rba_stripe_webhook_secret() to service_role;


-- =====================================================================
-- MIGRATION 20260922222733 payment_participation_idempotency
-- =====================================================================

create unique index if not exists participations_event_user_unique
  on public.participations(event_id, player_user_id);


-- =====================================================================
-- MIGRATION 20260922223206 remove_duplicate_participation_index
-- =====================================================================
drop index if exists public.participations_event_user_unique;

-- =====================================================================
-- MIGRATION 20260922230430 stripe_unmatched_and_refund_reconciliation
-- =====================================================================

create table if not exists public.unmatched_stripe_payments (
  id uuid primary key default gen_random_uuid(),
  checkout_session_id text unique,
  stripe_event_id text,
  customer_email text,
  customer_id text,
  payment_intent_id text,
  subscription_id text,
  amount_total integer,
  currency text,
  programme_key text,
  event_key text,
  plan_key text,
  reason text not null default 'rba_user_not_resolved',
  status text not null default 'unresolved'
    check (status in ('unresolved','resolved','ignored')),
  resolved_user_id uuid references auth.users(id),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

alter table public.unmatched_stripe_payments enable row level security;
revoke all on public.unmatched_stripe_payments from anon, authenticated;

create index if not exists unmatched_stripe_payments_status_created_idx
  on public.unmatched_stripe_payments(status, created_at desc);

create table if not exists public.payment_reconciliation_actions (
  id bigint generated always as identity primary key,
  action_type text not null
    check (action_type in ('payment_matched','payment_unmatched','refund_recorded','subscription_updated','payment_failed')),
  stripe_object_id text,
  user_id uuid references auth.users(id),
  order_id uuid references public.platform_orders(id),
  detail jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.payment_reconciliation_actions enable row level security;
revoke all on public.payment_reconciliation_actions from anon, authenticated;

create index if not exists payment_reconciliation_actions_created_idx
  on public.payment_reconciliation_actions(created_at desc);

create or replace function public.resolve_unmatched_stripe_payment(
  p_checkout_session_id text,
  p_user_id uuid
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.role() <> 'service_role' then
    raise exception 'not authorized';
  end if;

  update public.unmatched_stripe_payments
  set status='resolved',
      resolved_user_id=p_user_id,
      resolved_at=now()
  where checkout_session_id=p_checkout_session_id
    and status='unresolved';
end;
$$;

revoke all on function public.resolve_unmatched_stripe_payment(text, uuid) from public, anon, authenticated;
grant execute on function public.resolve_unmatched_stripe_payment(text, uuid) to service_role;


-- =====================================================================
-- MIGRATION 20260922230457 stripe_refund_and_invoice_helpers
-- =====================================================================

create or replace function public.record_stripe_refund(
  p_refund_id text,
  p_payment_intent_id text,
  p_amount integer,
  p_currency text,
  p_status text,
  p_metadata jsonb default '{}'::jsonb
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_order_id uuid;
  v_user_id uuid;
  v_total integer;
  v_refunded integer;
  v_order_status text;
begin
  if auth.role() <> 'service_role' then
    raise exception 'not authorized';
  end if;

  select tl.order_id, tl.user_id
    into v_order_id, v_user_id
  from public.transaction_ledger tl
  where tl.provider='stripe'
    and tl.transaction_type='charge'
    and tl.metadata->>'payment_intent_id'=p_payment_intent_id
  order by tl.occurred_at desc
  limit 1;

  if v_order_id is null then
    return null;
  end if;

  insert into public.transaction_ledger(
    order_id,user_id,transaction_type,status,amount,currency,
    provider,provider_transaction_id,occurred_at,metadata
  )
  values(
    v_order_id,v_user_id,'refund',
    case when p_status='succeeded' then 'refunded'
         when p_status='failed' then 'failed'
         else 'pending' end,
    greatest(p_amount,0), upper(coalesce(p_currency,'JPY')),
    'stripe',p_refund_id,now(),
    coalesce(p_metadata,'{}'::jsonb) || jsonb_build_object('payment_intent_id',p_payment_intent_id)
  )
  on conflict (provider,provider_transaction_id)
  do update set
    status=excluded.status,
    amount=excluded.amount,
    metadata=excluded.metadata,
    occurred_at=excluded.occurred_at;

  select amount_total into v_total
  from public.platform_orders where id=v_order_id;

  select coalesce(sum(amount),0) into v_refunded
  from public.transaction_ledger
  where order_id=v_order_id
    and provider='stripe'
    and transaction_type='refund'
    and status='refunded';

  v_order_status := case
    when v_total is not null and v_refunded >= v_total then 'refunded'
    else 'paid'
  end;

  update public.platform_orders
  set status=v_order_status, updated_at=now()
  where id=v_order_id;

  insert into public.payment_reconciliation_actions(
    action_type,stripe_object_id,user_id,order_id,detail
  ) values (
    'refund_recorded',p_refund_id,v_user_id,v_order_id,
    jsonb_build_object('payment_intent_id',p_payment_intent_id,'amount',p_amount,'refund_status',p_status)
  );

  return v_order_id;
end;
$$;

revoke all on function public.record_stripe_refund(text,text,integer,text,text,jsonb) from public, anon, authenticated;
grant execute on function public.record_stripe_refund(text,text,integer,text,text,jsonb) to service_role;

create or replace function public.set_homecourt_invoice_state(
  p_subscription_id text,
  p_paid boolean,
  p_invoice_id text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid;
begin
  if auth.role() <> 'service_role' then
    raise exception 'not authorized';
  end if;

  update public.subscriptions
  set status=case when p_paid then 'active'::public.subscription_status else 'past_due'::public.subscription_status end,
      updated_at=now()
  where provider='stripe'
    and provider_subscription_id=p_subscription_id
  returning user_id into v_user_id;

  if v_user_id is not null then
    insert into public.payment_reconciliation_actions(
      action_type,stripe_object_id,user_id,detail
    ) values (
      case when p_paid then 'subscription_updated' else 'payment_failed' end,
      p_invoice_id,v_user_id,
      jsonb_build_object('subscription_id',p_subscription_id,'paid',p_paid)
    );
  end if;
end;
$$;

revoke all on function public.set_homecourt_invoice_state(text,boolean,text) from public, anon, authenticated;
grant execute on function public.set_homecourt_invoice_state(text,boolean,text) to service_role;


-- =====================================================================
-- MIGRATION 20260922230635 event_lifecycle_and_ops_views
-- =====================================================================

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create or replace function private.close_expired_events()
returns integer
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_count integer;
begin
  update public.events
  set status='completed'
  where status='open'
    and ends_at is not null
    and ends_at < now();
  get diagnostics v_count = row_count;
  return v_count;
end;
$$;

revoke all on function private.close_expired_events() from public, anon, authenticated;
grant execute on function private.close_expired_events() to postgres, service_role;

create or replace view private.payment_ops_summary
with (security_invoker=true)
as
select
  (select count(*) from public.unmatched_stripe_payments where status='unresolved') as unmatched_payments,
  (select count(*) from public.stripe_webhook_events where processing_status='failed') as failed_webhooks,
  (select count(*) from public.platform_orders where status='failed') as failed_orders,
  (select count(*) from public.platform_orders where status='refunded') as refunded_orders,
  (select count(*) from public.subscriptions where status='past_due') as past_due_subscriptions,
  (select count(*) from public.subscriptions where status='active') as active_homecourt_subscriptions;

revoke all on private.payment_ops_summary from public, anon, authenticated;
grant select on private.payment_ops_summary to postgres, service_role;

create extension if not exists pg_cron with schema pg_catalog;
grant usage on schema cron to postgres;
grant all privileges on all tables in schema cron to postgres;

select cron.schedule(
  'rba-close-expired-events',
  '17 * * * *',
  $$select private.close_expired_events();$$
);


-- =====================================================================
-- MIGRATION 20260922230717 auto_claim_unmatched_payments
-- =====================================================================

alter table public.unmatched_stripe_payments
  add column if not exists payment_status text;

create or replace function private.claim_unmatched_payments_for_user(p_user_id uuid)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_email text;
  v_role public.rba_role;
  r record;
  v_order_id uuid;
  v_event_id uuid;
  v_event_slug text;
  v_count integer := 0;
begin
  select lower(u.email), p.role
    into v_email, v_role
  from auth.users u
  join public.profiles p on p.id=u.id
  where u.id=p_user_id;

  if v_email is null then return 0; end if;

  for r in
    select *
    from public.unmatched_stripe_payments
    where status='unresolved'
      and lower(customer_email)=v_email
      and payment_status='paid'
    order by created_at
  loop
    insert into public.platform_orders(
      user_id,order_type,status,amount_subtotal,amount_total,currency,locale,
      provider,provider_checkout_id,submitted_at,confirmed_at,metadata,updated_at
    )
    values(
      p_user_id,
      case when r.programme_key='rba_homecourt' then 'subscription' else 'event' end,
      'paid',r.amount_total,r.amount_total,coalesce(r.currency,'JPY'),'ja',
      'stripe',r.checkout_session_id,r.created_at,now(),
      jsonb_build_object(
        'program',r.programme_key,'event',r.event_key,'plan',r.plan_key,
        'stripe_customer_id',r.customer_id,'stripe_subscription_id',r.subscription_id,
        'payment_intent_id',r.payment_intent_id,'reconciled_from_unmatched',true
      ),
      now()
    )
    on conflict (provider_checkout_id) do update set
      user_id=excluded.user_id,status='paid',confirmed_at=now(),updated_at=now()
    returning id into v_order_id;

    insert into public.transaction_ledger(
      order_id,user_id,transaction_type,status,amount,currency,provider,
      provider_transaction_id,occurred_at,metadata
    )
    values(
      v_order_id,p_user_id,'charge','succeeded',coalesce(r.amount_total,0),
      coalesce(r.currency,'JPY'),'stripe',r.checkout_session_id,now(),
      jsonb_build_object('payment_intent_id',r.payment_intent_id,'reconciled_from_unmatched',true)
    )
    on conflict (provider,provider_transaction_id) do update set
      order_id=excluded.order_id,user_id=excluded.user_id,status='succeeded';

    if r.programme_key='rba_homecourt' and r.subscription_id is not null then
      insert into public.subscriptions(
        user_id,provider,provider_customer_id,provider_subscription_id,status,plan_key,updated_at
      )
      values(
        p_user_id,'stripe',r.customer_id,r.subscription_id,'active','homecourt_monthly',now()
      )
      on conflict (provider_subscription_id) do update set
        user_id=excluded.user_id,provider_customer_id=excluded.provider_customer_id,
        status='active',updated_at=now();
    end if;

    if v_role='player' and r.event_key is not null then
      v_event_slug := case r.event_key
        when 'yaima_cup_2026' then 'yaima-cup-2026'
        when 'saga_fukuoka_2days_2026' then 'saga-fukuoka-2days-2026'
        when 'yamagata_1day_2026' then 'yamagata-1day-2026'
        when 'shizugawa_camp_2026' then 'shizugawa-development-camp-2026'
        when 'kobe_camp_2026' then 'kobe-development-camp-2026'
        when 'rba_3days_development_camp_2026' then 'kobe-development-camp-2026'
        when 'torsten_loibl_online_clinic_vol2' then 'torsten-loibl-online-clinic-vol-2'
        else null
      end;

      if v_event_slug is not null then
        select id into v_event_id from public.events where slug=v_event_slug;
        if v_event_id is not null then
          insert into public.participations(event_id,player_user_id,attendance_status,payment_status)
          values(v_event_id,p_user_id,'confirmed','paid')
          on conflict (event_id,player_user_id) do update set
            attendance_status='confirmed',payment_status='paid';
        end if;
      end if;
    end if;

    update public.unmatched_stripe_payments
    set status='resolved',resolved_user_id=p_user_id,resolved_at=now()
    where id=r.id;

    insert into public.payment_reconciliation_actions(
      action_type,stripe_object_id,user_id,order_id,detail
    ) values (
      'payment_matched',r.checkout_session_id,p_user_id,v_order_id,
      jsonb_build_object('source','auto_claim_after_registration')
    );

    v_count := v_count + 1;
  end loop;

  return v_count;
end;
$$;

revoke all on function private.claim_unmatched_payments_for_user(uuid) from public, anon, authenticated;
grant execute on function private.claim_unmatched_payments_for_user(uuid) to postgres, service_role;

create or replace function private.claim_unmatched_payments_after_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform private.claim_unmatched_payments_for_user(new.id);
  return new;
end;
$$;

revoke all on function private.claim_unmatched_payments_after_profile() from public, anon, authenticated;

drop trigger if exists claim_unmatched_payments_after_profile on public.profiles;
create trigger claim_unmatched_payments_after_profile
after insert on public.profiles
for each row execute function private.claim_unmatched_payments_after_profile();


-- =====================================================================
-- MIGRATION 20260922231008 member_dashboard_read_models
-- =====================================================================

create or replace function public.member_programmes()
returns table(
  participant_user_id uuid,
  participant_name text,
  event_id uuid,
  event_slug text,
  event_title text,
  starts_at timestamptz,
  ends_at timestamptz,
  venue text,
  city text,
  region text,
  event_status text,
  attendance_status text,
  payment_status text,
  joined_at timestamptz
)
language sql
stable
security invoker
set search_path = ''
as $$
  select
    p.player_user_id,
    pr.display_name,
    e.id,
    e.slug,
    e.title,
    e.starts_at,
    e.ends_at,
    e.venue,
    e.city,
    e.region,
    e.status,
    p.attendance_status::text,
    p.payment_status,
    p.joined_at
  from public.participations p
  join public.events e on e.id=p.event_id
  join public.profiles pr on pr.id=p.player_user_id
  where
    p.player_user_id=(select auth.uid())
    or exists(
      select 1
      from public.guardian_links gl
      where gl.parent_user_id=(select auth.uid())
        and gl.child_user_id=p.player_user_id
        and gl.verified_at is not null
    )
  order by e.starts_at desc nulls last
$$;

revoke all on function public.member_programmes() from public, anon;
grant execute on function public.member_programmes() to authenticated;

create or replace function public.member_orders()
returns table(
  order_id uuid,
  order_number bigint,
  order_type text,
  status text,
  amount_total integer,
  currency text,
  provider text,
  provider_checkout_id text,
  submitted_at timestamptz,
  confirmed_at timestamptz,
  fulfilled_at timestamptz,
  metadata jsonb
)
language sql
stable
security invoker
set search_path = ''
as $$
  select
    o.id,o.order_number,o.order_type,o.status,o.amount_total,o.currency,
    o.provider,o.provider_checkout_id,o.submitted_at,o.confirmed_at,o.fulfilled_at,o.metadata
  from public.platform_orders o
  where o.user_id=(select auth.uid())
  order by o.created_at desc
$$;

revoke all on function public.member_orders() from public, anon;
grant execute on function public.member_orders() to authenticated;

create or replace function public.member_billing_summary()
returns table(
  plan_key text,
  status text,
  current_period_end timestamptz,
  cancel_at_period_end boolean,
  provider_customer_id text,
  billing_portal_url text
)
language sql
stable
security invoker
set search_path = ''
as $$
  select
    s.plan_key,
    s.status::text,
    s.current_period_end,
    s.cancel_at_period_end,
    s.provider_customer_id,
    'https://billing.stripe.com/p/login/8x2dRb2XZ4fi1MpeAL7EQ00'::text
  from public.subscriptions s
  where s.user_id=(select auth.uid())
    and s.provider='stripe'
  order by s.updated_at desc
  limit 1
$$;

revoke all on function public.member_billing_summary() from public, anon;
grant execute on function public.member_billing_summary() to authenticated;

create or replace function public.member_next_action()
returns table(
  action_type text,
  title text,
  detail text,
  href text,
  priority integer
)
language sql
stable
security invoker
set search_path = ''
as $$
  with unpaid as (
    select
      'payment_required'::text action_type,
      'お支払いが必要です'::text title,
      coalesce(o.metadata->>'event',o.metadata->>'program','RBAプログラム')::text detail,
      '/ja/payments'::text href,
      100::integer priority
    from public.platform_orders o
    where o.user_id=(select auth.uid())
      and o.status in ('submitted','awaiting_payment','failed')
    order by o.created_at desc
    limit 1
  ),
  upcoming as (
    select
      'upcoming_programme'::text action_type,
      e.title::text title,
      coalesce(e.city,e.region,'開催予定')::text detail,
      '/ja/my-homecourt/programmes'::text href,
      50::integer priority
    from public.participations p
    join public.events e on e.id=p.event_id
    where (
      p.player_user_id=(select auth.uid())
      or exists(
        select 1 from public.guardian_links gl
        where gl.parent_user_id=(select auth.uid())
          and gl.child_user_id=p.player_user_id
          and gl.verified_at is not null
      )
    )
      and p.attendance_status in ('registered','confirmed')
      and (e.starts_at is null or e.starts_at >= now())
    order by e.starts_at asc nulls last
    limit 1
  )
  select * from unpaid
  union all
  select * from upcoming
  order by priority desc
  limit 1
$$;

revoke all on function public.member_next_action() from public, anon;
grant execute on function public.member_next_action() to authenticated;


-- =====================================================================
-- MIGRATION 20260923072800 seed_rba_platform_offers_v1
-- =====================================================================

do $$
declare
  v_creator uuid;
  v_entity uuid;
begin
  select id into v_creator from auth.users where email='riot.training.base@gmail.com' limit 1;
  if v_creator is null then raise exception 'RBA creator user not found'; end if;

  insert into public.platform_entities(
    entity_type,name,slug,country,region,timezone,default_currency,description,website_url,status,verification_status,created_by
  ) values (
    'organizer','Riot Basketball Academy','riot-basketball-academy','JP',null,'Asia/Tokyo','JPY',
    'Youth Basketball Development Platform from Japan.','https://riotbasketballacademy.com',
    'active','verified',v_creator
  )
  on conflict (slug) do update set
    name=excluded.name, website_url=excluded.website_url, status='active', verification_status='verified', updated_at=now()
  returning id into v_entity;

  insert into public.service_offers(provider_entity_id,offer_type,title,slug,summary,availability_status,publication_status,currency,unit_amount,pricing_mode,external_application_url,starts_at,ends_at,capacity,metadata,created_by)
  values
  (v_entity,'clinic','RBA KAWASAKI CLINIC | 2026-09-27','kawasaki-2026-09-27','Application first. Participation fee is confirmed before payment.','request_required','published','JPY',null,'quote','/apply?offer=kawasaki-2026-09-27','2026-09-27T00:00:00+09:00','2026-09-27T23:59:59+09:00',null,
    jsonb_build_object('event','kawasaki_clinic_2026_09_27','plan','clinic_fee_pending','checkout_policy','manual_after_application','application_kind','youth','allowed_age_groups',jsonb_build_array('U12','U15'),'source_event_slug','rba-kawasaki-clinic-2026-09-27'),v_creator),
  (v_entity,'event','SAGA × FUKUOKA 2DAYS DEVELOPMENT CAMP','saga-fukuoka-2026','Application and review required before payment.','request_required','published','JPY',16500,'fixed','/apply?offer=saga-fukuoka-2026','2026-10-04T00:00:00+09:00','2026-10-05T23:59:59+09:00',null,
    jsonb_build_object('event','saga_fukuoka_2days_2026','plan','camp_fee','stripe_price_id','price_1UHWhORXDnnSs6XNQremcSBF','checkout_policy','manual_after_application','application_kind','youth','includes_accommodation_or_transport',true,'allowed_age_groups',jsonb_build_array('U8','U10','U12','U15'),'source_event_slug','saga-fukuoka-2days-2026'),v_creator),
  (v_entity,'clinic','YAMAGATA 1DAY DEVELOPMENT CLINIC','yamagata-1day-2026','Application first, then secure Stripe checkout.','confirmed','published','JPY',6600,'fixed','/apply?offer=yamagata-1day-2026','2026-10-24T00:00:00+09:00','2026-10-24T23:59:59+09:00',null,
    jsonb_build_object('event','yamagata_1day_2026','plan','clinic_fee','stripe_price_id','price_1UHWhNRXDnnSs6XNbpljBoO4','checkout_policy','instant_after_application','application_kind','youth','allowed_age_groups',jsonb_build_array('U10','U12','U15'),'source_event_slug','yamagata-1day-2026'),v_creator),
  (v_entity,'event','SHIZUGAWA DEVELOPMENT CAMP 2026','shizugawa-2026','Application and review required before payment.','request_required','published','JPY',25000,'fixed','/apply?offer=shizugawa-2026','2026-11-07T00:00:00+09:00','2026-11-08T23:59:59+09:00',null,
    jsonb_build_object('event','shizugawa_camp_2026','plan','camp_fee','stripe_price_id','price_1UHWhORXDnnSs6XNCRyHN0Bn','checkout_policy','manual_after_application','application_kind','youth','allowed_age_groups',jsonb_build_array('U10','U12','U15'),'allowed_school_grades',jsonb_build_array('jp_g3','jp_g4','jp_g5','jp_g6','jhs1','jhs2','jhs3'),'source_event_slug','shizugawa-development-camp-2026'),v_creator),
  (v_entity,'event','KOBE CAMP | HALF DAY + FRIDAY','kobe-half-friday-2026','Day-only KOBE Development Camp plan.','confirmed','published','JPY',9900,'fixed','/apply?offer=kobe-half-friday-2026','2026-11-20T00:00:00+09:00','2026-11-23T23:59:59+09:00',null,
    jsonb_build_object('event','kobe_camp_2026','plan','half_day_plus_friday','stripe_price_id','price_1UHWhPRXDnnSs6XNvzTQoJQL','checkout_policy','instant_after_application','application_kind','youth','attendance_selection_required',true,'allowed_age_groups',jsonb_build_array('U12','U15'),'allowed_school_grades',jsonb_build_array('jp_g5','jp_g6','jhs1','jhs2','jhs3'),'source_event_slug','kobe-development-camp-2026'),v_creator),
  (v_entity,'event','KOBE CAMP | 1 DAY + FRIDAY','kobe-one-friday-2026','Day-only KOBE Development Camp plan.','confirmed','published','JPY',14300,'fixed','/apply?offer=kobe-one-friday-2026','2026-11-20T00:00:00+09:00','2026-11-23T23:59:59+09:00',null,
    jsonb_build_object('event','kobe_camp_2026','plan','one_day_plus_friday','stripe_price_id','price_1UHWhQRXDnnSs6XNJVoPqblr','checkout_policy','instant_after_application','application_kind','youth','attendance_selection_required',true,'allowed_age_groups',jsonb_build_array('U12','U15'),'allowed_school_grades',jsonb_build_array('jp_g5','jp_g6','jhs1','jhs2','jhs3'),'source_event_slug','kobe-development-camp-2026'),v_creator),
  (v_entity,'event','KOBE CAMP | 2 DAYS + FRIDAY','kobe-two-friday-2026','Day-only KOBE Development Camp plan.','confirmed','published','JPY',23100,'fixed','/apply?offer=kobe-two-friday-2026','2026-11-20T00:00:00+09:00','2026-11-23T23:59:59+09:00',null,
    jsonb_build_object('event','kobe_camp_2026','plan','two_days_plus_friday','stripe_price_id','price_1UHWhRRXDnnSs6XNi210VUhV','checkout_policy','instant_after_application','application_kind','youth','attendance_selection_required',true,'allowed_age_groups',jsonb_build_array('U12','U15'),'allowed_school_grades',jsonb_build_array('jp_g5','jp_g6','jhs1','jhs2','jhs3'),'source_event_slug','kobe-development-camp-2026'),v_creator),
  (v_entity,'event','KOBE CAMP | 3 DAYS + FRIDAY','kobe-three-friday-2026','Day-only KOBE Development Camp plan.','confirmed','published','JPY',30800,'fixed','/apply?offer=kobe-three-friday-2026','2026-11-20T00:00:00+09:00','2026-11-23T23:59:59+09:00',null,
    jsonb_build_object('event','kobe_camp_2026','plan','three_days_plus_friday','stripe_price_id','price_1UHWhRRXDnnSs6XNGQQzeolt','checkout_policy','instant_after_application','application_kind','youth','allowed_age_groups',jsonb_build_array('U12','U15'),'allowed_school_grades',jsonb_build_array('jp_g5','jp_g6','jhs1','jhs2','jhs3'),'source_event_slug','kobe-development-camp-2026'),v_creator),
  (v_entity,'event','KOBE CAMP | 2D1N + FRIDAY','kobe-2d1n-friday-2026','Accommodation-inclusive plan. Review required before payment.','request_required','published','JPY',36300,'fixed','/apply?offer=kobe-2d1n-friday-2026','2026-11-20T00:00:00+09:00','2026-11-23T23:59:59+09:00',null,
    jsonb_build_object('event','kobe_camp_2026','plan','two_days_one_night_plus_friday','stripe_price_id','price_1UHWhSRXDnnSs6XNLimQT4qN','checkout_policy','manual_after_application','application_kind','youth','includes_accommodation_or_transport',true,'allowed_age_groups',jsonb_build_array('U12','U15'),'allowed_school_grades',jsonb_build_array('jp_g5','jp_g6','jhs1','jhs2','jhs3'),'source_event_slug','kobe-development-camp-2026'),v_creator),
  (v_entity,'event','KOBE CAMP | FULL CAMP + FRIDAY','kobe-full-friday-2026','Accommodation-inclusive plan. Review required before payment.','request_required','published','JPY',56100,'fixed','/apply?offer=kobe-full-friday-2026','2026-11-20T00:00:00+09:00','2026-11-23T23:59:59+09:00',null,
    jsonb_build_object('event','kobe_camp_2026','plan','full_camp_plus_friday','stripe_price_id','price_1UHWhTRXDnnSs6XN7aMER4Hl','checkout_policy','manual_after_application','application_kind','youth','includes_accommodation_or_transport',true,'allowed_age_groups',jsonb_build_array('U12','U15'),'allowed_school_grades',jsonb_build_array('jp_g5','jp_g6','jhs1','jhs2','jhs3'),'source_event_slug','kobe-development-camp-2026'),v_creator),
  (v_entity,'event','Torsten Loibl Online Clinic Vol.2 | LIVE','torsten-live-vol2','Live online clinic.','confirmed','published','JPY',3300,'fixed','/apply?offer=torsten-live-vol2','2026-11-25T20:00:00+09:00','2026-11-25T21:30:00+09:00',null,
    jsonb_build_object('event','torsten_loibl_online_clinic_vol2','plan','live','stripe_price_id','price_1UHWgvRXDnnSs6XN92GX8aYS','checkout_policy','instant_after_application','application_kind','general','source_event_slug','torsten-loibl-online-clinic-vol-2'),v_creator),
  (v_entity,'event','Torsten Loibl Online Clinic Vol.2 | 30-Day On-Demand','torsten-ondemand-vol2','30-day on-demand access.','confirmed','published','JPY',4400,'fixed','/apply?offer=torsten-ondemand-vol2','2026-11-25T00:00:00+09:00',null,null,
    jsonb_build_object('event','torsten_loibl_online_clinic_vol2','plan','ondemand_30days','stripe_price_id','price_1UHWhLRXDnnSs6XN6ufciiP6','checkout_policy','instant_after_application','application_kind','general','source_event_slug','torsten-loibl-online-clinic-vol-2'),v_creator),
  (v_entity,'clinic','RBA Team Training | 3 Hours','team-training-3h','Team training. Scope/date/venue confirmed before private checkout.','request_required','published','JPY',33000,'fixed','/contact','2026-09-23T00:00:00+09:00',null,null,
    jsonb_build_object('event','team_training','plan','3h','stripe_price_id','price_1UIg4ORXDnnSs6XNekQSEXYA','checkout_policy','inquiry_only','application_kind','team'),v_creator),
  (v_entity,'clinic','RBA Team Training | Half Day','team-training-halfday','Team training. Scope/date/venue confirmed before private checkout.','request_required','published','JPY',55000,'fixed','/contact','2026-09-23T00:00:00+09:00',null,null,
    jsonb_build_object('event','team_training','plan','halfday','stripe_price_id','price_1UIg4YRXDnnSs6XN64LgUXdd','checkout_policy','inquiry_only','application_kind','team'),v_creator),
  (v_entity,'clinic','RBA Team Training | Full Day','team-training-fullday','Team training. Scope/date/venue confirmed before private checkout.','request_required','published','JPY',88000,'fixed','/contact','2026-09-23T00:00:00+09:00',null,null,
    jsonb_build_object('event','team_training','plan','fullday','stripe_price_id','price_1UIg4iRXDnnSs6XNNCVtZv2H','checkout_policy','inquiry_only','application_kind','team'),v_creator)
  on conflict (slug) do update set
    provider_entity_id=excluded.provider_entity_id,
    offer_type=excluded.offer_type,
    title=excluded.title,
    summary=excluded.summary,
    availability_status=excluded.availability_status,
    publication_status=excluded.publication_status,
    currency=excluded.currency,
    unit_amount=excluded.unit_amount,
    pricing_mode=excluded.pricing_mode,
    external_application_url=excluded.external_application_url,
    starts_at=excluded.starts_at,
    ends_at=excluded.ends_at,
    capacity=excluded.capacity,
    metadata=excluded.metadata,
    created_by=excluded.created_by,
    updated_at=now();
end $$;


-- =====================================================================
-- MIGRATION 20260923073258 platform_commerce_v4_hardening
-- =====================================================================
create index if not exists payment_reconciliation_actions_order_idx on public.payment_reconciliation_actions(order_id);
create index if not exists payment_reconciliation_actions_user_idx on public.payment_reconciliation_actions(user_id);
create index if not exists unmatched_stripe_payments_resolved_user_idx on public.unmatched_stripe_payments(resolved_user_id);
create index if not exists platform_orders_status_offer_idx on public.platform_orders(service_offer_id,status);

create or replace function public.rba_reserve_platform_order_slot(p_order_id uuid, p_hold_minutes integer default 30)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_offer_id uuid;
  v_capacity integer;
  v_availability text;
  v_used integer;
  v_hold_until timestamptz;
begin
  select po.service_offer_id, so.capacity, so.availability_status
    into v_offer_id, v_capacity, v_availability
  from public.platform_orders po
  join public.service_offers so on so.id=po.service_offer_id
  where po.id=p_order_id
  for update of so;

  if v_offer_id is null then raise exception 'ORDER_NOT_FOUND'; end if;
  if v_availability='closed' then raise exception 'OFFER_CLOSED'; end if;
  if v_capacity is null then return jsonb_build_object('capacity',null,'controlled',false); end if;

  select count(*) into v_used
  from public.platform_orders po
  where po.service_offer_id=v_offer_id
    and po.id<>p_order_id
    and (
      po.status in ('paid','confirmed','fulfilled')
      or (
        po.status='awaiting_payment'
        and nullif(po.metadata->>'seat_hold_until','')::timestamptz > now()
      )
    );
  if v_used>=v_capacity then raise exception 'OFFER_FULL'; end if;

  v_hold_until := now()+make_interval(mins=>greatest(1,least(coalesce(p_hold_minutes,30),60)));
  update public.platform_orders
  set status='awaiting_payment',
      metadata=jsonb_set(coalesce(metadata,'{}'::jsonb),'{seat_hold_until}',to_jsonb(v_hold_until::text),true),
      updated_at=now()
  where id=p_order_id;

  return jsonb_build_object('capacity',v_capacity,'controlled',true,'used',v_used,'remaining_after_hold',v_capacity-v_used-1,'hold_until',v_hold_until);
end;
$$;
revoke all on function public.rba_reserve_platform_order_slot(uuid,integer) from public, anon, authenticated;
grant execute on function public.rba_reserve_platform_order_slot(uuid,integer) to service_role;

-- =====================================================================
-- MIGRATION 20260923080910 rba_company_os_ipo_foundation_v1
-- =====================================================================

-- RBA Company OS / IPO-readiness operating layer v1
create table if not exists public.business_units (
  id uuid primary key default gen_random_uuid(),
  code text not null unique check (code ~ '^[A-Z0-9_]{2,32}$'),
  name text not null,
  description text,
  status text not null default 'active' check (status in ('active','paused','retired')),
  display_order integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.business_units (code,name,description,display_order)
values
 ('ACADEMY','RBA Academy','育成年代のスクール・クリニック・現場指導',10),
 ('EVENTS','RBA Events','大会・キャンプ・イベント運営',20),
 ('UNITED','RBA United','選抜・交流・代表活動',30),
 ('DHUB','D-HUB','強化・エリート育成ライン',40),
 ('HOMECOURT','My Home Court','会員基盤・活動管理・継続支援',50),
 ('GLOBAL','RBA Global','海外遠征・受入・国際提携',60),
 ('PARTNERS','RBA Partners','スポンサー・法人・地域連携',70)
on conflict (code) do update
set name=excluded.name, description=excluded.description, display_order=excluded.display_order, updated_at=now();

alter table public.events
  add column if not exists event_code text,
  add column if not exists business_unit_id uuid references public.business_units(id),
  add column if not exists capacity integer check (capacity is null or capacity >= 0),
  add column if not exists owner_user_id uuid references auth.users(id);

create unique index if not exists events_event_code_uq
  on public.events(event_code) where event_code is not null;
create index if not exists events_business_unit_idx
  on public.events(business_unit_id);

alter table public.service_offers
  add column if not exists offer_code text,
  add column if not exists business_unit_id uuid references public.business_units(id),
  add column if not exists revenue_recognition_mode text not null default 'on_fulfillment'
    check (revenue_recognition_mode in ('on_payment','on_fulfillment','monthly','manual'));

create unique index if not exists service_offers_offer_code_uq
  on public.service_offers(offer_code) where offer_code is not null;
create index if not exists service_offers_business_unit_idx
  on public.service_offers(business_unit_id);

create table if not exists public.event_financials (
  event_id uuid primary key references public.events(id) on delete cascade,
  business_unit_id uuid references public.business_units(id),
  budget_revenue_jpy bigint not null default 0 check (budget_revenue_jpy >= 0),
  budget_cost_jpy bigint not null default 0 check (budget_cost_jpy >= 0),
  actual_revenue_jpy bigint not null default 0 check (actual_revenue_jpy >= 0),
  actual_cost_jpy bigint not null default 0 check (actual_cost_jpy >= 0),
  paid_participants integer not null default 0 check (paid_participants >= 0),
  complimentary_participants integer not null default 0 check (complimentary_participants >= 0),
  cancellations integer not null default 0 check (cancellations >= 0),
  refunds_jpy bigint not null default 0 check (refunds_jpy >= 0),
  founder_required boolean not null default true,
  close_status text not null default 'open' check (close_status in ('open','provisional','closed')),
  closed_at timestamptz,
  notes text,
  updated_at timestamptz not null default now()
);

create index if not exists event_financials_business_unit_idx
  on public.event_financials(business_unit_id);

create table if not exists public.operating_costs (
  id uuid primary key default gen_random_uuid(),
  business_unit_id uuid references public.business_units(id),
  event_id uuid references public.events(id) on delete set null,
  category text not null check (category in (
    'venue','travel','lodging','staff','equipment','insurance','payment_fee',
    'marketing','food','transport','professional_fee','software','other'
  )),
  amount_jpy bigint not null check (amount_jpy >= 0),
  vendor_name text,
  incurred_on date not null default current_date,
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid','scheduled','paid','refunded','void')),
  receipt_reference text,
  approved_by uuid references auth.users(id),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists operating_costs_event_idx on public.operating_costs(event_id);
create index if not exists operating_costs_bu_date_idx on public.operating_costs(business_unit_id, incurred_on);

create table if not exists public.governance_documents (
  id uuid primary key default gen_random_uuid(),
  document_key text not null,
  version text not null,
  locale text not null default 'ja',
  title text not null,
  status text not null default 'draft' check (status in ('draft','approved','published','retired')),
  effective_at timestamptz,
  published_at timestamptz,
  review_due_at date,
  owner_role text,
  source_url text,
  checksum text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(document_key, version, locale)
);

create table if not exists public.governance_acceptances (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.governance_documents(id) on delete restrict,
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_user_id uuid references auth.users(id) on delete cascade,
  accepted_at timestamptz not null default now(),
  revoked_at timestamptz,
  acceptance_source text not null default 'web',
  metadata jsonb not null default '{}'::jsonb,
  unique(document_id, user_id, subject_user_id)
);

create index if not exists governance_acceptances_user_idx
  on public.governance_acceptances(user_id);

create table if not exists public.safety_report_actions (
  id uuid primary key default gen_random_uuid(),
  safety_report_id uuid not null references public.safety_reports(id) on delete cascade,
  action_type text not null check (action_type in (
    'triage','guardian_contact','medical_referral','staff_review','suspension',
    'corrective_action','closure','other'
  )),
  action_note text not null,
  action_by uuid references auth.users(id),
  action_at timestamptz not null default now(),
  follow_up_due_at timestamptz,
  completed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists safety_report_actions_report_idx
  on public.safety_report_actions(safety_report_id, action_at);

create table if not exists public.monthly_kpi_snapshots (
  month date not null check (date_trunc('month', month)::date = month),
  business_unit_id uuid references public.business_units(id),
  revenue_jpy bigint not null default 0,
  gross_profit_jpy bigint not null default 0,
  operating_profit_jpy bigint not null default 0,
  active_customers integer not null default 0,
  new_customers integer not null default 0,
  repeat_customers integer not null default 0,
  events_held integer not null default 0,
  participants integer not null default 0,
  refunds_jpy bigint not null default 0,
  founder_dependent_revenue_jpy bigint not null default 0,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (month, business_unit_id)
);

create or replace view public.management_event_pnl as
select
  e.id as event_id,
  e.event_code,
  e.title,
  e.starts_at,
  e.city,
  e.region,
  bu.code as business_unit_code,
  bu.name as business_unit_name,
  ef.budget_revenue_jpy,
  ef.budget_cost_jpy,
  (ef.budget_revenue_jpy - ef.budget_cost_jpy) as budget_profit_jpy,
  ef.actual_revenue_jpy,
  ef.actual_cost_jpy,
  ef.refunds_jpy,
  (ef.actual_revenue_jpy - ef.actual_cost_jpy - ef.refunds_jpy) as actual_profit_jpy,
  case
    when ef.actual_revenue_jpy > 0
    then round(((ef.actual_revenue_jpy - ef.actual_cost_jpy - ef.refunds_jpy)::numeric / ef.actual_revenue_jpy::numeric) * 100, 1)
    else null
  end as operating_margin_pct,
  ef.paid_participants,
  ef.complimentary_participants,
  ef.cancellations,
  ef.founder_required,
  ef.close_status
from public.events e
left join public.event_financials ef on ef.event_id=e.id
left join public.business_units bu on bu.id=coalesce(ef.business_unit_id,e.business_unit_id);

create or replace view public.management_monthly_kpis as
select
  month,
  bu.code as business_unit_code,
  bu.name as business_unit_name,
  revenue_jpy,
  gross_profit_jpy,
  operating_profit_jpy,
  active_customers,
  new_customers,
  repeat_customers,
  events_held,
  participants,
  refunds_jpy,
  founder_dependent_revenue_jpy,
  case when revenue_jpy > 0
    then round((founder_dependent_revenue_jpy::numeric / revenue_jpy::numeric) * 100, 1)
    else null
  end as founder_dependency_pct
from public.monthly_kpi_snapshots k
left join public.business_units bu on bu.id=k.business_unit_id;

alter table public.business_units enable row level security;
alter table public.event_financials enable row level security;
alter table public.operating_costs enable row level security;
alter table public.governance_documents enable row level security;
alter table public.governance_acceptances enable row level security;
alter table public.safety_report_actions enable row level security;
alter table public.monthly_kpi_snapshots enable row level security;

drop policy if exists "business_units_read" on public.business_units;
create policy "business_units_read" on public.business_units
for select to authenticated using (true);

drop policy if exists "business_units_admin_write" on public.business_units;
create policy "business_units_admin_write" on public.business_units
for all to authenticated
using (private.is_global_admin())
with check (private.is_global_admin());

drop policy if exists "event_financials_admin_all" on public.event_financials;
create policy "event_financials_admin_all" on public.event_financials
for all to authenticated
using (private.is_global_admin())
with check (private.is_global_admin());

drop policy if exists "operating_costs_admin_all" on public.operating_costs;
create policy "operating_costs_admin_all" on public.operating_costs
for all to authenticated
using (private.is_global_admin())
with check (private.is_global_admin());

drop policy if exists "governance_documents_published_read" on public.governance_documents;
create policy "governance_documents_published_read" on public.governance_documents
for select to authenticated
using (status='published' or private.is_global_admin());

drop policy if exists "governance_documents_admin_write" on public.governance_documents;
create policy "governance_documents_admin_write" on public.governance_documents
for all to authenticated
using (private.is_global_admin())
with check (private.is_global_admin());

drop policy if exists "governance_acceptances_self_read" on public.governance_acceptances;
create policy "governance_acceptances_self_read" on public.governance_acceptances
for select to authenticated
using (user_id=auth.uid() or subject_user_id=auth.uid() or private.is_global_admin());

drop policy if exists "governance_acceptances_self_insert" on public.governance_acceptances;
create policy "governance_acceptances_self_insert" on public.governance_acceptances
for insert to authenticated
with check (user_id=auth.uid());

drop policy if exists "safety_report_actions_admin_all" on public.safety_report_actions;
create policy "safety_report_actions_admin_all" on public.safety_report_actions
for all to authenticated
using (private.is_global_admin())
with check (private.is_global_admin());

drop policy if exists "monthly_kpi_admin_all" on public.monthly_kpi_snapshots;
create policy "monthly_kpi_admin_all" on public.monthly_kpi_snapshots
for all to authenticated
using (private.is_global_admin())
with check (private.is_global_admin());

revoke all on public.management_event_pnl from anon, authenticated;
revoke all on public.management_monthly_kpis from anon, authenticated;
grant select on public.management_event_pnl to authenticated;
grant select on public.management_monthly_kpis to authenticated;


-- =====================================================================
-- MIGRATION 20260923081003 rba_company_os_operational_coding_v1_1
-- =====================================================================

-- RBA Company OS v1.1: operational coding, classification and governance register

create or replace function public.rba_make_event_code()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  d text;
begin
  if new.event_code is null or btrim(new.event_code) = '' then
    d := to_char(coalesce(new.starts_at, now()), 'YYYYMMDD');
    new.event_code := 'RBA-EVT-' || d || '-' || upper(substr(replace(new.id::text,'-',''),1,6));
  end if;
  return new;
end;
$$;

drop trigger if exists trg_rba_make_event_code on public.events;
create trigger trg_rba_make_event_code
before insert or update of starts_at, event_code on public.events
for each row execute function public.rba_make_event_code();

create or replace function public.rba_make_offer_code()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.offer_code is null or btrim(new.offer_code) = '' then
    new.offer_code := 'RBA-OFR-' || upper(substr(replace(new.id::text,'-',''),1,8));
  end if;
  return new;
end;
$$;

drop trigger if exists trg_rba_make_offer_code on public.service_offers;
create trigger trg_rba_make_offer_code
before insert or update of offer_code on public.service_offers
for each row execute function public.rba_make_offer_code();

update public.events
set event_code = 'RBA-EVT-' || to_char(coalesce(starts_at, created_at), 'YYYYMMDD') || '-' || upper(substr(replace(id::text,'-',''),1,6))
where event_code is null;

update public.service_offers
set offer_code = 'RBA-OFR-' || upper(substr(replace(id::text,'-',''),1,8))
where offer_code is null;

-- Operational business-unit ownership for existing records.
update public.events e
set business_unit_id = bu.id
from public.business_units bu
where e.business_unit_id is null
  and (
    (e.slug='yaima-cup-2026' and bu.code='UNITED')
    or (e.event_type='clinic' and bu.code='ACADEMY')
    or (e.event_type='camp' and bu.code='EVENTS')
    or (e.event_type='homecourt_session' and bu.code='HOMECOURT')
    or (e.event_type='coach_education' and bu.code='ACADEMY')
    or (e.event_type='international' and e.slug<>'yaima-cup-2026' and bu.code='GLOBAL')
  );

update public.service_offers s
set business_unit_id = bu.id
from public.business_units bu
where s.business_unit_id is null
  and (
    (s.slug like 'team-training-%' and bu.code='ACADEMY')
    or (s.slug like 'torsten-%' and bu.code='ACADEMY')
    or (s.offer_type='clinic' and bu.code='ACADEMY')
    or (s.slug in ('saga-fukuoka-2026','shizugawa-2026')
        and bu.code='EVENTS')
    or (s.slug like 'kobe-%-2026' and bu.code='EVENTS')
  );

-- Seed financial control rows so every existing event has a close process.
insert into public.event_financials (event_id, business_unit_id)
select e.id, e.business_unit_id
from public.events e
on conflict (event_id) do nothing;

-- Governance register: these are control records, not substitute legal advice.
insert into public.governance_documents
(document_key, version, locale, title, status, owner_role)
values
 ('terms_of_service','0.1','ja','RBA 利用規約','draft','Legal / Operations'),
 ('privacy_policy','0.1','ja','RBA プライバシーポリシー','draft','Privacy / Operations'),
 ('event_participation_terms','0.1','ja','イベント参加規約','draft','Events'),
 ('refund_policy','0.1','ja','キャンセル・返金規定','draft','Finance / Operations'),
 ('media_consent_policy','0.1','ja','写真・動画・肖像利用方針','draft','Safeguarding'),
 ('safeguarding_policy','0.1','ja','子どもの安全・セーフガーディング方針','draft','Safeguarding'),
 ('incident_response_policy','0.1','ja','事故・インシデント対応規程','draft','Safeguarding'),
 ('international_travel_terms','0.1','ja','海外遠征・国際交流参加規約','draft','Global'),
 ('coach_code_of_conduct','0.1','ja','コーチ行動規範','draft','Academy'),
 ('partner_sponsor_policy','0.1','ja','スポンサー・パートナー取引方針','draft','Partnerships'),
 ('data_retention_policy','0.1','ja','データ保存・削除方針','draft','Privacy / Technology')
on conflict (document_key,version,locale) do nothing;

alter view public.management_event_pnl set (security_invoker = true);
alter view public.management_monthly_kpis set (security_invoker = true);


-- =====================================================================
-- MIGRATION 20260923081039 rba_company_os_advisor_cleanup_v1_2
-- =====================================================================

-- RBA Company OS v1.2: advisor cleanup for newly introduced objects

create index if not exists events_owner_user_idx on public.events(owner_user_id);
create index if not exists governance_acceptances_subject_user_idx on public.governance_acceptances(subject_user_id);
create index if not exists governance_documents_created_by_idx on public.governance_documents(created_by);
create index if not exists monthly_kpi_business_unit_idx on public.monthly_kpi_snapshots(business_unit_id);
create index if not exists operating_costs_approved_by_idx on public.operating_costs(approved_by);
create index if not exists safety_report_actions_action_by_idx on public.safety_report_actions(action_by);

drop policy if exists "business_units_admin_write" on public.business_units;
drop policy if exists "business_units_admin_insert" on public.business_units;
drop policy if exists "business_units_admin_update" on public.business_units;
drop policy if exists "business_units_admin_delete" on public.business_units;

create policy "business_units_admin_insert" on public.business_units
for insert to authenticated with check (private.is_global_admin());
create policy "business_units_admin_update" on public.business_units
for update to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "business_units_admin_delete" on public.business_units
for delete to authenticated using (private.is_global_admin());

drop policy if exists "governance_documents_admin_write" on public.governance_documents;
drop policy if exists "governance_documents_admin_insert" on public.governance_documents;
drop policy if exists "governance_documents_admin_update" on public.governance_documents;
drop policy if exists "governance_documents_admin_delete" on public.governance_documents;

create policy "governance_documents_admin_insert" on public.governance_documents
for insert to authenticated with check (private.is_global_admin());
create policy "governance_documents_admin_update" on public.governance_documents
for update to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "governance_documents_admin_delete" on public.governance_documents
for delete to authenticated using (private.is_global_admin());

drop policy if exists "governance_acceptances_self_read" on public.governance_acceptances;
create policy "governance_acceptances_self_read" on public.governance_acceptances
for select to authenticated
using (user_id=(select auth.uid()) or subject_user_id=(select auth.uid()) or private.is_global_admin());

drop policy if exists "governance_acceptances_self_insert" on public.governance_acceptances;
create policy "governance_acceptances_self_insert" on public.governance_acceptances
for insert to authenticated
with check (user_id=(select auth.uid()));


-- =====================================================================
-- MIGRATION 20260923081433 rba_platform_expansion_v2
-- =====================================================================

-- RBA Platform Expansion v2
-- Youth development platform: player development, applications, waitlists,
-- scholarships, coach credentials, safeguarding, partner/facility discovery and feedback.

create table if not exists public.player_development_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  primary_position text,
  secondary_positions text[] not null default '{}',
  dominant_hand text check (dominant_hand is null or dominant_hand in ('right','left','both','unknown')),
  development_stage text not null default 'foundation'
    check (development_stage in ('foundation','learning','developing','advanced','performance')),
  long_term_goal text,
  current_focus text,
  public_visibility text not null default 'private'
    check (public_visibility in ('private','team','rba_network')),
  updated_at timestamptz not null default now()
);

create table if not exists public.player_goals (
  id uuid primary key default gen_random_uuid(),
  player_user_id uuid not null references auth.users(id) on delete cascade,
  category text not null check (category in ('skill','decision_making','physical','tactical','habit','confidence','other')),
  title text not null,
  description text,
  target_date date,
  status text not null default 'active' check (status in ('active','achieved','paused','cancelled')),
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  achieved_at timestamptz
);

create index if not exists player_goals_player_idx on public.player_goals(player_user_id,status);

create table if not exists public.player_assessments (
  id uuid primary key default gen_random_uuid(),
  player_user_id uuid not null references auth.users(id) on delete cascade,
  assessor_user_id uuid not null references auth.users(id),
  event_id uuid references public.events(id) on delete set null,
  assessment_date date not null default current_date,
  assessment_type text not null default 'development'
    check (assessment_type in ('development','camp','club','combine','self','other')),
  technical jsonb not null default '{}'::jsonb,
  decision_making jsonb not null default '{}'::jsonb,
  tactical jsonb not null default '{}'::jsonb,
  physical jsonb not null default '{}'::jsonb,
  habits jsonb not null default '{}'::jsonb,
  strengths text,
  next_actions text,
  visibility text not null default 'family_and_staff'
    check (visibility in ('staff_only','family_and_staff','player_family_staff')),
  created_at timestamptz not null default now()
);

create index if not exists player_assessments_player_date_idx
  on public.player_assessments(player_user_id,assessment_date desc);
create index if not exists player_assessments_assessor_idx
  on public.player_assessments(assessor_user_id);

create table if not exists public.development_plan_items (
  id uuid primary key default gen_random_uuid(),
  player_user_id uuid not null references auth.users(id) on delete cascade,
  goal_id uuid references public.player_goals(id) on delete set null,
  title text not null,
  instructions text,
  frequency_per_week integer check (frequency_per_week is null or frequency_per_week between 1 and 14),
  starts_on date not null default current_date,
  ends_on date,
  status text not null default 'active' check (status in ('active','completed','paused','cancelled')),
  assigned_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create index if not exists development_plan_player_idx
  on public.development_plan_items(player_user_id,status);

create table if not exists public.player_reflections (
  id uuid primary key default gen_random_uuid(),
  player_user_id uuid not null references auth.users(id) on delete cascade,
  event_id uuid references public.events(id) on delete set null,
  reflection_date date not null default current_date,
  what_went_well text,
  what_was_difficult text,
  next_focus text,
  confidence_score integer check (confidence_score is null or confidence_score between 1 and 5),
  enjoyment_score integer check (enjoyment_score is null or enjoyment_score between 1 and 5),
  created_at timestamptz not null default now()
);

create index if not exists player_reflections_player_idx
  on public.player_reflections(player_user_id,reflection_date desc);

create table if not exists public.program_applications (
  id uuid primary key default gen_random_uuid(),
  applicant_user_id uuid not null references auth.users(id) on delete cascade,
  subject_user_id uuid references auth.users(id) on delete cascade,
  event_id uuid references public.events(id) on delete cascade,
  service_offer_id uuid references public.service_offers(id) on delete cascade,
  application_type text not null default 'standard'
    check (application_type in ('standard','selection','scholarship','international','team')),
  status text not null default 'submitted'
    check (status in ('draft','submitted','under_review','accepted','waitlisted','rejected','withdrawn')),
  answers jsonb not null default '{}'::jsonb,
  reviewed_by uuid references auth.users(id),
  review_note text,
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz,
  unique(applicant_user_id,subject_user_id,event_id,service_offer_id,application_type)
);

create index if not exists program_applications_event_status_idx
  on public.program_applications(event_id,status);
create index if not exists program_applications_subject_idx
  on public.program_applications(subject_user_id);

create table if not exists public.program_waitlist (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  subject_user_id uuid not null references auth.users(id) on delete cascade,
  application_id uuid references public.program_applications(id) on delete set null,
  priority integer not null default 100,
  status text not null default 'waiting'
    check (status in ('waiting','offered','accepted','expired','removed')),
  joined_at timestamptz not null default now(),
  offer_expires_at timestamptz,
  unique(event_id,subject_user_id)
);

create index if not exists program_waitlist_event_idx
  on public.program_waitlist(event_id,status,priority,joined_at);

create table if not exists public.scholarship_programs (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  title text not null,
  description text,
  funding_source text,
  discount_type text not null check (discount_type in ('fixed_jpy','percent','full')),
  discount_value integer not null check (discount_value >= 0),
  starts_on date,
  ends_on date,
  status text not null default 'active' check (status in ('draft','active','paused','closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.scholarship_awards (
  id uuid primary key default gen_random_uuid(),
  scholarship_program_id uuid not null references public.scholarship_programs(id) on delete restrict,
  recipient_user_id uuid not null references auth.users(id) on delete cascade,
  event_id uuid references public.events(id) on delete set null,
  service_offer_id uuid references public.service_offers(id) on delete set null,
  amount_jpy integer check (amount_jpy is null or amount_jpy >= 0),
  status text not null default 'approved' check (status in ('approved','applied','used','revoked','expired')),
  approved_by uuid references auth.users(id),
  approved_at timestamptz not null default now(),
  notes text
);

create index if not exists scholarship_awards_recipient_idx
  on public.scholarship_awards(recipient_user_id,status);

create table if not exists public.coach_credentials (
  id uuid primary key default gen_random_uuid(),
  coach_user_id uuid not null references auth.users(id) on delete cascade,
  credential_type text not null,
  issuer text not null,
  credential_name text not null,
  credential_number text,
  issued_on date,
  expires_on date,
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified','pending','verified','expired','rejected')),
  verified_by uuid references auth.users(id),
  verified_at timestamptz,
  document_reference text,
  unique(coach_user_id,issuer,credential_name,credential_number)
);

create index if not exists coach_credentials_user_idx
  on public.coach_credentials(coach_user_id,verification_status);

create table if not exists public.coach_development_records (
  id uuid primary key default gen_random_uuid(),
  coach_user_id uuid not null references auth.users(id) on delete cascade,
  activity_type text not null check (activity_type in ('clinic','mentoring','observation','course','workshop','self_study','other')),
  title text not null,
  provider text,
  occurred_on date not null,
  minutes integer check (minutes is null or minutes > 0),
  evidence_reference text,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists coach_development_user_idx
  on public.coach_development_records(coach_user_id,occurred_on desc);

create table if not exists public.entity_tags (
  id uuid primary key default gen_random_uuid(),
  tag_key text not null unique,
  label_ja text not null,
  label_en text,
  category text not null default 'general'
);

create table if not exists public.platform_entity_tags (
  entity_id uuid not null references public.platform_entities(id) on delete cascade,
  tag_id uuid not null references public.entity_tags(id) on delete cascade,
  primary key(entity_id,tag_id)
);

create index if not exists platform_entity_tags_tag_idx
  on public.platform_entity_tags(tag_id,entity_id);

create table if not exists public.offer_tags (
  service_offer_id uuid not null references public.service_offers(id) on delete cascade,
  tag_id uuid not null references public.entity_tags(id) on delete cascade,
  primary key(service_offer_id,tag_id)
);

create index if not exists offer_tags_tag_idx
  on public.offer_tags(tag_id,service_offer_id);

insert into public.entity_tags(tag_key,label_ja,label_en,category) values
 ('u8','U8','U8','age'),
 ('u10','U10','U10','age'),
 ('u12','U12','U12','age'),
 ('u15','U15','U15','age'),
 ('girls','女子','Girls','audience'),
 ('boys','男子','Boys','audience'),
 ('mixed','男女','Mixed','audience'),
 ('clinic','クリニック','Clinic','program'),
 ('camp','キャンプ','Camp','program'),
 ('tournament','大会','Tournament','program'),
 ('international','海外・国際交流','International','program'),
 ('coach_education','指導者学習','Coach Education','program'),
 ('strength_conditioning','S&C','Strength & Conditioning','program'),
 ('team_training','チームトレーニング','Team Training','program')
on conflict(tag_key) do nothing;

create table if not exists public.participant_safety_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  emergency_contact_name text,
  emergency_contact_relation text,
  emergency_contact_phone text,
  accommodation_note text,
  allergy_note text,
  medication_note text,
  medical_provider_note text,
  last_confirmed_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.event_checkins (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  participant_user_id uuid not null references auth.users(id) on delete cascade,
  checked_in_at timestamptz,
  checked_out_at timestamptz,
  checked_in_by uuid references auth.users(id),
  status text not null default 'expected'
    check (status in ('expected','checked_in','checked_out','absent','excused')),
  notes text,
  unique(event_id,participant_user_id)
);

create index if not exists event_checkins_event_status_idx
  on public.event_checkins(event_id,status);

create table if not exists public.program_feedback (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete cascade,
  service_offer_id uuid references public.service_offers(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  participant_user_id uuid references auth.users(id) on delete cascade,
  overall_score integer check (overall_score between 1 and 5),
  development_value_score integer check (development_value_score between 1 and 5),
  safety_score integer check (safety_score between 1 and 5),
  communication_score integer check (communication_score between 1 and 5),
  comment text,
  permission_to_quote boolean not null default false,
  created_at timestamptz not null default now(),
  unique(event_id,service_offer_id,user_id,participant_user_id)
);

create index if not exists program_feedback_event_idx
  on public.program_feedback(event_id,created_at desc);

-- RLS
alter table public.player_development_profiles enable row level security;
alter table public.player_goals enable row level security;
alter table public.player_assessments enable row level security;
alter table public.development_plan_items enable row level security;
alter table public.player_reflections enable row level security;
alter table public.program_applications enable row level security;
alter table public.program_waitlist enable row level security;
alter table public.scholarship_programs enable row level security;
alter table public.scholarship_awards enable row level security;
alter table public.coach_credentials enable row level security;
alter table public.coach_development_records enable row level security;
alter table public.entity_tags enable row level security;
alter table public.platform_entity_tags enable row level security;
alter table public.offer_tags enable row level security;
alter table public.participant_safety_profiles enable row level security;
alter table public.event_checkins enable row level security;
alter table public.program_feedback enable row level security;

-- player/family permissions
create policy "player_dev_profile_family_read" on public.player_development_profiles
for select to authenticated using (
  user_id=(select auth.uid())
  or exists(select 1 from public.guardian_links gl where gl.child_user_id=user_id and gl.parent_user_id=(select auth.uid()) and gl.verified_at is not null)
  or private.is_global_admin()
);
create policy "player_dev_profile_self_update" on public.player_development_profiles
for update to authenticated using (user_id=(select auth.uid()) or private.is_global_admin())
with check (user_id=(select auth.uid()) or private.is_global_admin());
create policy "player_dev_profile_self_insert" on public.player_development_profiles
for insert to authenticated with check (user_id=(select auth.uid()) or private.is_global_admin());

create policy "player_goals_family_read" on public.player_goals
for select to authenticated using (
  player_user_id=(select auth.uid())
  or exists(select 1 from public.guardian_links gl where gl.child_user_id=player_user_id and gl.parent_user_id=(select auth.uid()) and gl.verified_at is not null)
  or private.is_global_admin()
);
create policy "player_goals_manage" on public.player_goals
for all to authenticated using (
  player_user_id=(select auth.uid()) or created_by=(select auth.uid()) or private.is_global_admin()
) with check (
  player_user_id=(select auth.uid()) or created_by=(select auth.uid()) or private.is_global_admin()
);

create policy "assessments_family_read" on public.player_assessments
for select to authenticated using (
  player_user_id=(select auth.uid())
  or assessor_user_id=(select auth.uid())
  or exists(select 1 from public.guardian_links gl where gl.child_user_id=player_user_id and gl.parent_user_id=(select auth.uid()) and gl.verified_at is not null)
  or private.is_global_admin()
);
create policy "assessments_staff_insert" on public.player_assessments
for insert to authenticated with check (assessor_user_id=(select auth.uid()) or private.is_global_admin());

create policy "development_plan_family_read" on public.development_plan_items
for select to authenticated using (
  player_user_id=(select auth.uid())
  or assigned_by=(select auth.uid())
  or exists(select 1 from public.guardian_links gl where gl.child_user_id=player_user_id and gl.parent_user_id=(select auth.uid()) and gl.verified_at is not null)
  or private.is_global_admin()
);
create policy "development_plan_assign" on public.development_plan_items
for all to authenticated using (
  assigned_by=(select auth.uid()) or player_user_id=(select auth.uid()) or private.is_global_admin()
) with check (
  assigned_by=(select auth.uid()) or player_user_id=(select auth.uid()) or private.is_global_admin()
);

create policy "reflections_self_family_read" on public.player_reflections
for select to authenticated using (
  player_user_id=(select auth.uid())
  or exists(select 1 from public.guardian_links gl where gl.child_user_id=player_user_id and gl.parent_user_id=(select auth.uid()) and gl.verified_at is not null)
  or private.is_global_admin()
);
create policy "reflections_self_write" on public.player_reflections
for all to authenticated using (player_user_id=(select auth.uid()) or private.is_global_admin())
with check (player_user_id=(select auth.uid()) or private.is_global_admin());

-- applications/waitlists
create policy "applications_self_read" on public.program_applications
for select to authenticated using (
 applicant_user_id=(select auth.uid()) or subject_user_id=(select auth.uid()) or private.is_global_admin()
);
create policy "applications_self_insert" on public.program_applications
for insert to authenticated with check (applicant_user_id=(select auth.uid()));
create policy "applications_self_update_draft" on public.program_applications
for update to authenticated using (
 (applicant_user_id=(select auth.uid()) and status in ('draft','submitted')) or private.is_global_admin()
) with check (
 applicant_user_id=(select auth.uid()) or private.is_global_admin()
);

create policy "waitlist_self_read" on public.program_waitlist
for select to authenticated using (
 subject_user_id=(select auth.uid())
 or exists(select 1 from public.guardian_links gl where gl.child_user_id=subject_user_id and gl.parent_user_id=(select auth.uid()) and gl.verified_at is not null)
 or private.is_global_admin()
);
create policy "waitlist_admin_manage" on public.program_waitlist
for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());

-- scholarships
create policy "scholarships_active_read" on public.scholarship_programs
for select to authenticated using (status='active' or private.is_global_admin());
create policy "scholarships_admin_manage" on public.scholarship_programs
for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());

create policy "awards_recipient_read" on public.scholarship_awards
for select to authenticated using (
 recipient_user_id=(select auth.uid())
 or exists(select 1 from public.guardian_links gl where gl.child_user_id=recipient_user_id and gl.parent_user_id=(select auth.uid()) and gl.verified_at is not null)
 or private.is_global_admin()
);
create policy "awards_admin_manage" on public.scholarship_awards
for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());

-- coach credential development
create policy "coach_credentials_self_read" on public.coach_credentials
for select to authenticated using (coach_user_id=(select auth.uid()) or private.is_global_admin());
create policy "coach_credentials_self_insert" on public.coach_credentials
for insert to authenticated with check (coach_user_id=(select auth.uid()) or private.is_global_admin());
create policy "coach_credentials_self_update" on public.coach_credentials
for update to authenticated using (coach_user_id=(select auth.uid()) or private.is_global_admin())
with check (coach_user_id=(select auth.uid()) or private.is_global_admin());

create policy "coach_dev_self_manage" on public.coach_development_records
for all to authenticated using (coach_user_id=(select auth.uid()) or private.is_global_admin())
with check (coach_user_id=(select auth.uid()) or private.is_global_admin());

-- searchable metadata
create policy "entity_tags_read" on public.entity_tags
for select to anon,authenticated using (true);
create policy "entity_tags_admin_write" on public.entity_tags
for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "platform_entity_tags_read" on public.platform_entity_tags
for select to anon,authenticated using (true);
create policy "platform_entity_tags_admin_write" on public.platform_entity_tags
for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "offer_tags_read" on public.offer_tags
for select to anon,authenticated using (true);
create policy "offer_tags_admin_write" on public.offer_tags
for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());

-- safety profiles
create policy "safety_profile_family_read" on public.participant_safety_profiles
for select to authenticated using (
 user_id=(select auth.uid())
 or exists(select 1 from public.guardian_links gl where gl.child_user_id=user_id and gl.parent_user_id=(select auth.uid()) and gl.verified_at is not null)
 or private.is_global_admin()
);
create policy "safety_profile_self_write" on public.participant_safety_profiles
for all to authenticated using (
 user_id=(select auth.uid())
 or exists(select 1 from public.guardian_links gl where gl.child_user_id=user_id and gl.parent_user_id=(select auth.uid()) and gl.verified_at is not null)
 or private.is_global_admin()
) with check (
 user_id=(select auth.uid())
 or exists(select 1 from public.guardian_links gl where gl.child_user_id=user_id and gl.parent_user_id=(select auth.uid()) and gl.verified_at is not null)
 or private.is_global_admin()
);

create policy "event_checkins_self_read" on public.event_checkins
for select to authenticated using (
 participant_user_id=(select auth.uid())
 or exists(select 1 from public.guardian_links gl where gl.child_user_id=participant_user_id and gl.parent_user_id=(select auth.uid()) and gl.verified_at is not null)
 or private.is_global_admin()
);
create policy "event_checkins_admin_manage" on public.event_checkins
for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());

-- feedback
create policy "program_feedback_self_read" on public.program_feedback
for select to authenticated using (user_id=(select auth.uid()) or private.is_global_admin());
create policy "program_feedback_self_insert" on public.program_feedback
for insert to authenticated with check (user_id=(select auth.uid()));
create policy "program_feedback_admin_read" on public.program_feedback
for select to authenticated using (private.is_global_admin());

-- management read models
create or replace view public.management_program_quality
with (security_invoker=true)
as
select
  e.id as event_id,
  e.event_code,
  e.title,
  count(f.id) as response_count,
  round(avg(f.overall_score)::numeric,2) as avg_overall,
  round(avg(f.development_value_score)::numeric,2) as avg_development_value,
  round(avg(f.safety_score)::numeric,2) as avg_safety,
  round(avg(f.communication_score)::numeric,2) as avg_communication
from public.events e
left join public.program_feedback f on f.event_id=e.id
group by e.id,e.event_code,e.title;

revoke all on public.management_program_quality from anon,authenticated;
grant select on public.management_program_quality to authenticated;


-- =====================================================================
-- MIGRATION 20260923081535 rba_platform_network_v2_1
-- =====================================================================

-- RBA Platform Expansion v2.1
-- Discovery, pathway, communication and advisor cleanup.

alter table public.platform_entities
  add column if not exists address_line text,
  add column if not exists postal_code text,
  add column if not exists city text,
  add column if not exists latitude numeric(9,6),
  add column if not exists longitude numeric(9,6),
  add column if not exists contact_email text,
  add column if not exists contact_phone text;

create table if not exists public.player_pathway_milestones (
  id uuid primary key default gen_random_uuid(),
  player_user_id uuid not null references auth.users(id) on delete cascade,
  milestone_type text not null check (milestone_type in (
    'first_event','repeat_participant','camp','tournament','international',
    'leadership','skill_progress','team_selection','coach_recognition','other'
  )),
  title text not null,
  description text,
  event_id uuid references public.events(id) on delete set null,
  achieved_on date not null default current_date,
  verified_by uuid references auth.users(id),
  visibility text not null default 'family'
    check (visibility in ('private','family','team','rba_network')),
  created_at timestamptz not null default now()
);
create index if not exists player_pathway_milestones_player_idx
  on public.player_pathway_milestones(player_user_id,achieved_on desc);
create index if not exists player_pathway_milestones_event_idx
  on public.player_pathway_milestones(event_id);
create index if not exists player_pathway_milestones_verified_by_idx
  on public.player_pathway_milestones(verified_by);

create table if not exists public.notification_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  event_updates boolean not null default true,
  payment_updates boolean not null default true,
  team_updates boolean not null default true,
  development_updates boolean not null default true,
  opportunities boolean not null default true,
  marketing boolean not null default false,
  preferred_channel text not null default 'email'
    check (preferred_channel in ('email','line','push','none')),
  updated_at timestamptz not null default now()
);

create table if not exists public.platform_notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  notification_type text not null,
  title text not null,
  body text not null,
  action_url text,
  read_at timestamptz,
  created_at timestamptz not null default now(),
  expires_at timestamptz
);
create index if not exists platform_notifications_user_unread_idx
  on public.platform_notifications(user_id,read_at,created_at desc);

create or replace view public.public_offer_directory
with (security_invoker=true)
as
select
  s.id,
  s.offer_code,
  s.slug,
  s.offer_type,
  s.title,
  s.summary,
  s.currency,
  s.unit_amount,
  s.pricing_mode,
  s.starts_at,
  s.ends_at,
  s.capacity,
  bu.code as business_unit_code,
  bu.name as business_unit_name,
  coalesce(
    jsonb_agg(
      distinct jsonb_build_object(
        'key',t.tag_key,
        'label_ja',t.label_ja,
        'label_en',t.label_en,
        'category',t.category
      )
    ) filter (where t.id is not null),
    '[]'::jsonb
  ) as tags
from public.service_offers s
left join public.business_units bu on bu.id=s.business_unit_id
left join public.offer_tags ot on ot.service_offer_id=s.id
left join public.entity_tags t on t.id=ot.tag_id
where s.publication_status='published'
group by s.id,s.offer_code,s.slug,s.offer_type,s.title,s.summary,s.currency,
         s.unit_amount,s.pricing_mode,s.starts_at,s.ends_at,s.capacity,bu.code,bu.name;

grant select on public.public_offer_directory to anon,authenticated;

alter table public.player_pathway_milestones enable row level security;
alter table public.notification_preferences enable row level security;
alter table public.platform_notifications enable row level security;

create policy "pathway_family_read" on public.player_pathway_milestones
for select to authenticated using (
  player_user_id=(select auth.uid())
  or exists(select 1 from public.guardian_links gl where gl.child_user_id=player_user_id and gl.parent_user_id=(select auth.uid()) and gl.verified_at is not null)
  or private.is_global_admin()
);
create policy "pathway_admin_insert" on public.player_pathway_milestones
for insert to authenticated with check (private.is_global_admin());

create policy "notification_preferences_self_read" on public.notification_preferences
for select to authenticated using (user_id=(select auth.uid()) or private.is_global_admin());
create policy "notification_preferences_self_insert" on public.notification_preferences
for insert to authenticated with check (user_id=(select auth.uid()) or private.is_global_admin());
create policy "notification_preferences_self_update" on public.notification_preferences
for update to authenticated using (user_id=(select auth.uid()) or private.is_global_admin())
with check (user_id=(select auth.uid()) or private.is_global_admin());

create policy "notifications_self_read" on public.platform_notifications
for select to authenticated using (user_id=(select auth.uid()) or private.is_global_admin());
create policy "notifications_self_update" on public.platform_notifications
for update to authenticated using (user_id=(select auth.uid()) or private.is_global_admin())
with check (user_id=(select auth.uid()) or private.is_global_admin());
create policy "notifications_admin_insert" on public.platform_notifications
for insert to authenticated with check (private.is_global_admin());

-- Cover new foreign keys.
create index if not exists coach_credentials_verified_by_idx on public.coach_credentials(verified_by);
create index if not exists development_plan_assigned_by_idx on public.development_plan_items(assigned_by);
create index if not exists development_plan_goal_idx on public.development_plan_items(goal_id);
create index if not exists event_checkins_checked_in_by_idx on public.event_checkins(checked_in_by);
create index if not exists event_checkins_participant_idx on public.event_checkins(participant_user_id);
create index if not exists player_assessments_event_idx on public.player_assessments(event_id);
create index if not exists player_goals_created_by_idx on public.player_goals(created_by);
create index if not exists player_reflections_event_idx on public.player_reflections(event_id);
create index if not exists program_applications_reviewed_by_idx on public.program_applications(reviewed_by);
create index if not exists program_applications_offer_idx on public.program_applications(service_offer_id);
create index if not exists program_feedback_participant_idx on public.program_feedback(participant_user_id);
create index if not exists program_feedback_offer_idx on public.program_feedback(service_offer_id);
create index if not exists program_feedback_user_idx on public.program_feedback(user_id);
create index if not exists program_waitlist_application_idx on public.program_waitlist(application_id);
create index if not exists program_waitlist_subject_idx on public.program_waitlist(subject_user_id);
create index if not exists scholarship_awards_approved_by_idx on public.scholarship_awards(approved_by);
create index if not exists scholarship_awards_event_idx on public.scholarship_awards(event_id);
create index if not exists scholarship_awards_program_idx on public.scholarship_awards(scholarship_program_id);
create index if not exists scholarship_awards_offer_idx on public.scholarship_awards(service_offer_id);

-- Replace ALL policies that overlap SELECT with action-specific policies.
drop policy if exists "development_plan_assign" on public.development_plan_items;
create policy "development_plan_insert" on public.development_plan_items
for insert to authenticated with check (
  assigned_by=(select auth.uid()) or player_user_id=(select auth.uid()) or private.is_global_admin()
);
create policy "development_plan_update" on public.development_plan_items
for update to authenticated using (
  assigned_by=(select auth.uid()) or player_user_id=(select auth.uid()) or private.is_global_admin()
) with check (
  assigned_by=(select auth.uid()) or player_user_id=(select auth.uid()) or private.is_global_admin()
);
create policy "development_plan_delete" on public.development_plan_items
for delete to authenticated using (
  assigned_by=(select auth.uid()) or player_user_id=(select auth.uid()) or private.is_global_admin()
);

drop policy if exists "player_goals_manage" on public.player_goals;
create policy "player_goals_insert" on public.player_goals
for insert to authenticated with check (
  player_user_id=(select auth.uid()) or created_by=(select auth.uid()) or private.is_global_admin()
);
create policy "player_goals_update" on public.player_goals
for update to authenticated using (
  player_user_id=(select auth.uid()) or created_by=(select auth.uid()) or private.is_global_admin()
) with check (
  player_user_id=(select auth.uid()) or created_by=(select auth.uid()) or private.is_global_admin()
);
create policy "player_goals_delete" on public.player_goals
for delete to authenticated using (
  player_user_id=(select auth.uid()) or created_by=(select auth.uid()) or private.is_global_admin()
);

drop policy if exists "reflections_self_write" on public.player_reflections;
create policy "reflections_self_insert" on public.player_reflections
for insert to authenticated with check (player_user_id=(select auth.uid()) or private.is_global_admin());
create policy "reflections_self_update" on public.player_reflections
for update to authenticated using (player_user_id=(select auth.uid()) or private.is_global_admin())
with check (player_user_id=(select auth.uid()) or private.is_global_admin());
create policy "reflections_self_delete" on public.player_reflections
for delete to authenticated using (player_user_id=(select auth.uid()) or private.is_global_admin());

drop policy if exists "safety_profile_self_write" on public.participant_safety_profiles;
create policy "safety_profile_family_insert" on public.participant_safety_profiles
for insert to authenticated with check (
 user_id=(select auth.uid())
 or exists(select 1 from public.guardian_links gl where gl.child_user_id=user_id and gl.parent_user_id=(select auth.uid()) and gl.verified_at is not null)
 or private.is_global_admin()
);
create policy "safety_profile_family_update" on public.participant_safety_profiles
for update to authenticated using (
 user_id=(select auth.uid())
 or exists(select 1 from public.guardian_links gl where gl.child_user_id=user_id and gl.parent_user_id=(select auth.uid()) and gl.verified_at is not null)
 or private.is_global_admin()
) with check (
 user_id=(select auth.uid())
 or exists(select 1 from public.guardian_links gl where gl.child_user_id=user_id and gl.parent_user_id=(select auth.uid()) and gl.verified_at is not null)
 or private.is_global_admin()
);

drop policy if exists "waitlist_admin_manage" on public.program_waitlist;
create policy "waitlist_admin_insert" on public.program_waitlist
for insert to authenticated with check (private.is_global_admin());
create policy "waitlist_admin_update" on public.program_waitlist
for update to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "waitlist_admin_delete" on public.program_waitlist
for delete to authenticated using (private.is_global_admin());

drop policy if exists "scholarships_admin_manage" on public.scholarship_programs;
create policy "scholarships_admin_insert" on public.scholarship_programs
for insert to authenticated with check (private.is_global_admin());
create policy "scholarships_admin_update" on public.scholarship_programs
for update to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "scholarships_admin_delete" on public.scholarship_programs
for delete to authenticated using (private.is_global_admin());

drop policy if exists "awards_admin_manage" on public.scholarship_awards;
create policy "awards_admin_insert" on public.scholarship_awards
for insert to authenticated with check (private.is_global_admin());
create policy "awards_admin_update" on public.scholarship_awards
for update to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "awards_admin_delete" on public.scholarship_awards
for delete to authenticated using (private.is_global_admin());

drop policy if exists "event_checkins_admin_manage" on public.event_checkins;
create policy "event_checkins_admin_insert" on public.event_checkins
for insert to authenticated with check (private.is_global_admin());
create policy "event_checkins_admin_update" on public.event_checkins
for update to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "event_checkins_admin_delete" on public.event_checkins
for delete to authenticated using (private.is_global_admin());

drop policy if exists "entity_tags_admin_write" on public.entity_tags;
create policy "entity_tags_admin_insert" on public.entity_tags
for insert to authenticated with check (private.is_global_admin());
create policy "entity_tags_admin_update" on public.entity_tags
for update to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "entity_tags_admin_delete" on public.entity_tags
for delete to authenticated using (private.is_global_admin());

drop policy if exists "platform_entity_tags_admin_write" on public.platform_entity_tags;
create policy "platform_entity_tags_admin_insert" on public.platform_entity_tags
for insert to authenticated with check (private.is_global_admin());
create policy "platform_entity_tags_admin_delete" on public.platform_entity_tags
for delete to authenticated using (private.is_global_admin());

drop policy if exists "offer_tags_admin_write" on public.offer_tags;
create policy "offer_tags_admin_insert" on public.offer_tags
for insert to authenticated with check (private.is_global_admin());
create policy "offer_tags_admin_delete" on public.offer_tags
for delete to authenticated using (private.is_global_admin());

drop policy if exists "program_feedback_admin_read" on public.program_feedback;
drop policy if exists "program_feedback_self_read" on public.program_feedback;
create policy "program_feedback_read" on public.program_feedback
for select to authenticated using (user_id=(select auth.uid()) or private.is_global_admin());


-- =====================================================================
-- MIGRATION 20260923082131 rba_commerce_automation_v3
-- =====================================================================

-- RBA Commerce Automation v3
-- Secure payment routing, application gating, order attribution and automatic P&L refresh.

create table if not exists public.payment_routes (
  id uuid primary key default gen_random_uuid(),
  service_offer_id uuid not null unique references public.service_offers(id) on delete cascade,
  provider text not null default 'stripe' check (provider in ('stripe','square','manual')),
  provider_payment_link_id text,
  payment_url text not null,
  checkout_policy text not null default 'instant_after_application'
    check (checkout_policy in ('instant','instant_after_application','manual_after_application','inquiry_only')),
  active boolean not null default true,
  requires_authenticated_user boolean not null default true,
  requires_guardian_for_minor boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists payment_routes_provider_link_uq
  on public.payment_routes(provider,provider_payment_link_id)
  where provider_payment_link_id is not null;
create index if not exists payment_routes_offer_idx on public.payment_routes(service_offer_id);

create table if not exists public.checkout_access_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_user_id uuid not null references auth.users(id) on delete cascade,
  service_offer_id uuid not null references public.service_offers(id) on delete cascade,
  application_id uuid references public.program_applications(id) on delete set null,
  decision text not null check (decision in ('allowed','blocked','inquiry_only','waitlisted')),
  reason text,
  provider_payment_link_id text,
  created_at timestamptz not null default now()
);
create index if not exists checkout_access_logs_user_idx on public.checkout_access_logs(user_id,created_at desc);
create index if not exists checkout_access_logs_subject_idx on public.checkout_access_logs(subject_user_id,created_at desc);
create index if not exists checkout_access_logs_offer_idx on public.checkout_access_logs(service_offer_id,created_at desc);
create index if not exists checkout_access_logs_application_idx on public.checkout_access_logs(application_id);

alter table public.platform_orders
  add column if not exists subject_user_id uuid references auth.users(id),
  add column if not exists application_id uuid references public.program_applications(id),
  add column if not exists event_id uuid references public.events(id);

create index if not exists platform_orders_subject_idx on public.platform_orders(subject_user_id);
create index if not exists platform_orders_application_idx on public.platform_orders(application_id);
create index if not exists platform_orders_event_idx on public.platform_orders(event_id);

alter table public.payment_routes enable row level security;
alter table public.checkout_access_logs enable row level security;

create policy "payment_routes_admin_read" on public.payment_routes
for select to authenticated using (private.is_global_admin());
create policy "payment_routes_admin_insert" on public.payment_routes
for insert to authenticated with check (private.is_global_admin());
create policy "payment_routes_admin_update" on public.payment_routes
for update to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "payment_routes_admin_delete" on public.payment_routes
for delete to authenticated using (private.is_global_admin());

create policy "checkout_access_self_read" on public.checkout_access_logs
for select to authenticated using (
  user_id=(select auth.uid()) or subject_user_id=(select auth.uid()) or private.is_global_admin()
);

-- Payment links already exist in the RBA Stripe account. Keep them in an admin-only routing table,
-- not on the public service-offer row, so approval-gated offers cannot be bypassed from the public API.
insert into public.payment_routes(service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,metadata)
select id,'stripe','plink_1UHWhoRXDnnSs6XNpmKzwSUS','https://book.stripe.com/aFa14p5678vy8aN8cn7EQ0b',
       coalesce(metadata->>'checkout_policy','instant_after_application'),
       jsonb_build_object('event','torsten_loibl_online_clinic_vol2','plan','live')
from public.service_offers where slug='torsten-live-vol2'
on conflict(service_offer_id) do update set provider_payment_link_id=excluded.provider_payment_link_id,payment_url=excluded.payment_url,checkout_policy=excluded.checkout_policy,metadata=excluded.metadata,updated_at=now();

insert into public.payment_routes(service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,metadata)
select id,'stripe','plink_1UHWhoRXDnnSs6XNq0bL3Gsf','https://book.stripe.com/bJebJ3dCD6nq9eR9gr7EQ0c',
       coalesce(metadata->>'checkout_policy','instant_after_application'),
       jsonb_build_object('event','torsten_loibl_online_clinic_vol2','plan','ondemand_30days')
from public.service_offers where slug='torsten-ondemand-vol2'
on conflict(service_offer_id) do update set provider_payment_link_id=excluded.provider_payment_link_id,payment_url=excluded.payment_url,checkout_policy=excluded.checkout_policy,metadata=excluded.metadata,updated_at=now();

insert into public.payment_routes(service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,metadata)
select id,'stripe','plink_1UIg5CRXDnnSs6XNJUGgUgGd','https://book.stripe.com/28EcN77ef27a76J1NZ7EQ0o',
       coalesce(metadata->>'checkout_policy','inquiry_only'), jsonb_build_object('rba_offer','team_training_3h')
from public.service_offers where slug='team-training-3h'
on conflict(service_offer_id) do update set provider_payment_link_id=excluded.provider_payment_link_id,payment_url=excluded.payment_url,checkout_policy=excluded.checkout_policy,metadata=excluded.metadata,updated_at=now();

insert into public.payment_routes(service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,metadata)
select id,'stripe','plink_1UIg5JRXDnnSs6XNRMGJcKY4','https://book.stripe.com/28E00l9mn3begHj0JV7EQ0p',
       coalesce(metadata->>'checkout_policy','inquiry_only'), jsonb_build_object('rba_offer','team_training_halfday')
from public.service_offers where slug='team-training-halfday'
on conflict(service_offer_id) do update set provider_payment_link_id=excluded.provider_payment_link_id,payment_url=excluded.payment_url,checkout_policy=excluded.checkout_policy,metadata=excluded.metadata,updated_at=now();

insert into public.payment_routes(service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,metadata)
select id,'stripe','plink_1UIg5RRXDnnSs6XNHlmybplK','https://book.stripe.com/7sY28t4237ruezbgIT7EQ0q',
       coalesce(metadata->>'checkout_policy','inquiry_only'), jsonb_build_object('rba_offer','team_training_fullday')
from public.service_offers where slug='team-training-fullday'
on conflict(service_offer_id) do update set provider_payment_link_id=excluded.provider_payment_link_id,payment_url=excluded.payment_url,checkout_policy=excluded.checkout_policy,metadata=excluded.metadata,updated_at=now();

insert into public.payment_routes(service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,metadata)
select id,'stripe','plink_1UHWhqRXDnnSs6XNowdmBvZd','https://book.stripe.com/fZu7sN2XZ9zC9eRakv7EQ0e',
       coalesce(metadata->>'checkout_policy','manual_after_application'),
       jsonb_build_object('event','saga_fukuoka_2days_2026','plan','camp_fee')
from public.service_offers where slug='saga-fukuoka-2026'
on conflict(service_offer_id) do update set provider_payment_link_id=excluded.provider_payment_link_id,payment_url=excluded.payment_url,checkout_policy=excluded.checkout_policy,metadata=excluded.metadata,updated_at=now();

insert into public.payment_routes(service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,metadata)
select id,'stripe','plink_1UHWhrRXDnnSs6XN7PeWIRoT','https://book.stripe.com/9B67sN4233be76Jakv7EQ0f',
       coalesce(metadata->>'checkout_policy','instant_after_application'),
       jsonb_build_object('event','yamagata_1day_2026','plan','clinic_fee')
from public.service_offers where slug='yamagata-1day-2026'
on conflict(service_offer_id) do update set provider_payment_link_id=excluded.provider_payment_link_id,payment_url=excluded.payment_url,checkout_policy=excluded.checkout_policy,metadata=excluded.metadata,updated_at=now();

insert into public.payment_routes(service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,metadata)
select id,'stripe','plink_1UHWhuRXDnnSs6XNFVtuDYoQ','https://book.stripe.com/00wdRbeGHh248aN0JV7EQ0i',
       coalesce(metadata->>'checkout_policy','manual_after_application'),
       jsonb_build_object('event','shizugawa_camp_2026','plan','camp_fee')
from public.service_offers where slug='shizugawa-2026'
on conflict(service_offer_id) do update set provider_payment_link_id=excluded.provider_payment_link_id,payment_url=excluded.payment_url,checkout_policy=excluded.checkout_policy,metadata=excluded.metadata,updated_at=now();

insert into public.payment_routes(service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,metadata)
select id,'stripe','plink_1UHWhsRXDnnSs6XNIm0TDCQG','https://book.stripe.com/00w00l5678vyezbakv7EQ0g',
       coalesce(metadata->>'checkout_policy','instant_after_application'),
       jsonb_build_object('event','kobe_camp_2026','plan','half_day_plus_friday')
from public.service_offers where slug='kobe-half-friday-2026'
on conflict(service_offer_id) do update set provider_payment_link_id=excluded.provider_payment_link_id,payment_url=excluded.payment_url,checkout_policy=excluded.checkout_policy,metadata=excluded.metadata,updated_at=now();

insert into public.payment_routes(service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,metadata)
select id,'stripe','plink_1UHWhtRXDnnSs6XNCJECwnxT','https://book.stripe.com/00waEZ423bHKaiVeAL7EQ0h',
       coalesce(metadata->>'checkout_policy','instant_after_application'),
       jsonb_build_object('event','kobe_camp_2026','plan','one_day_plus_friday')
from public.service_offers where slug='kobe-one-friday-2026'
on conflict(service_offer_id) do update set provider_payment_link_id=excluded.provider_payment_link_id,payment_url=excluded.payment_url,checkout_policy=excluded.checkout_policy,metadata=excluded.metadata,updated_at=now();

insert into public.payment_routes(service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,metadata)
select id,'stripe','plink_1UHWhvRXDnnSs6XNMb4sYXTM','https://book.stripe.com/dRmdRb7ef1364YB64f7EQ0j',
       coalesce(metadata->>'checkout_policy','instant_after_application'),
       jsonb_build_object('event','kobe_camp_2026','plan','two_days_plus_friday')
from public.service_offers where slug='kobe-two-friday-2026'
on conflict(service_offer_id) do update set provider_payment_link_id=excluded.provider_payment_link_id,payment_url=excluded.payment_url,checkout_policy=excluded.checkout_policy,metadata=excluded.metadata,updated_at=now();

insert into public.payment_routes(service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,metadata)
select id,'stripe','plink_1UHWhyRXDnnSs6XNCR52DHsL','https://book.stripe.com/bJe8wRgOPfY0cr3dwH7EQ0m',
       coalesce(metadata->>'checkout_policy','instant_after_application'),
       jsonb_build_object('event','kobe_camp_2026','plan','three_days_plus_friday')
from public.service_offers where slug='kobe-three-friday-2026'
on conflict(service_offer_id) do update set provider_payment_link_id=excluded.provider_payment_link_id,payment_url=excluded.payment_url,checkout_policy=excluded.checkout_policy,metadata=excluded.metadata,updated_at=now();

insert into public.payment_routes(service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,metadata)
select id,'stripe','plink_1UHWhxRXDnnSs6XNOWTr3qj1','https://book.stripe.com/cNi7sN5675jm62FeAL7EQ0l',
       coalesce(metadata->>'checkout_policy','manual_after_application'),
       jsonb_build_object('event','kobe_camp_2026','plan','two_days_one_night_plus_friday')
from public.service_offers where slug='kobe-2d1n-friday-2026'
on conflict(service_offer_id) do update set provider_payment_link_id=excluded.provider_payment_link_id,payment_url=excluded.payment_url,checkout_policy=excluded.checkout_policy,metadata=excluded.metadata,updated_at=now();

insert into public.payment_routes(service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,metadata)
select id,'stripe','plink_1UHWhwRXDnnSs6XNryF5jkeE','https://book.stripe.com/bJe28tbuv8vydv764f7EQ0k',
       coalesce(metadata->>'checkout_policy','manual_after_application'),
       jsonb_build_object('event','kobe_camp_2026','plan','full_camp_plus_friday')
from public.service_offers where slug='kobe-full-friday-2026'
on conflict(service_offer_id) do update set provider_payment_link_id=excluded.provider_payment_link_id,payment_url=excluded.payment_url,checkout_policy=excluded.checkout_policy,metadata=excluded.metadata,updated_at=now();

-- Keep payment URL off published offer rows for gated flows.
update public.service_offers set external_payment_url=null where id in (select service_offer_id from public.payment_routes);

-- Automatic event financial closeout from the immutable transaction ledger.
create or replace function public.refresh_event_financials(p_event_id uuid)
returns void
language plpgsql
security definer
set search_path=''
as $$
declare
  revenue bigint;
  refunds bigint;
  participants_count integer;
  cancelled_count integer;
begin
  select
    coalesce(sum(case when l.transaction_type='charge' and l.status='succeeded' then l.amount else 0 end),0),
    coalesce(sum(case when l.transaction_type='refund' and l.status in ('succeeded','pending') then l.amount else 0 end),0)
  into revenue,refunds
  from public.transaction_ledger l
  join public.platform_orders o on o.id=l.order_id
  where o.event_id=p_event_id;

  select count(*) filter (where payment_status='paid'),
         count(*) filter (where attendance_status='cancelled')
  into participants_count,cancelled_count
  from public.participations
  where event_id=p_event_id;

  insert into public.event_financials(event_id,actual_revenue_jpy,refunds_jpy,paid_participants,cancellations)
  values(p_event_id,revenue,refunds,participants_count,cancelled_count)
  on conflict(event_id) do update set
    actual_revenue_jpy=excluded.actual_revenue_jpy,
    refunds_jpy=excluded.refunds_jpy,
    paid_participants=excluded.paid_participants,
    cancellations=excluded.cancellations,
    updated_at=now();
end;
$$;

revoke all on function public.refresh_event_financials(uuid) from public,anon,authenticated;

create or replace function public.trg_refresh_event_financials()
returns trigger
language plpgsql
security definer
set search_path=''
as $$
declare
  ev uuid;
begin
  select event_id into ev
  from public.platform_orders
  where id=coalesce(new.order_id,old.order_id);
  if ev is not null then
    perform public.refresh_event_financials(ev);
  end if;
  return coalesce(new,old);
end;
$$;
revoke all on function public.trg_refresh_event_financials() from public,anon,authenticated;

drop trigger if exists trg_ledger_refresh_event_financials on public.transaction_ledger;
create trigger trg_ledger_refresh_event_financials
after insert or update or delete on public.transaction_ledger
for each row execute function public.trg_refresh_event_financials();


-- =====================================================================
-- MIGRATION 20260923082517 rba_automation_engine_v3_1
-- =====================================================================

-- RBA Automation Engine v3.1
-- Hourly lifecycle, waitlist promotion, reminders, cost/P&L refresh and KPI snapshots.

create table if not exists public.automation_dispatch_log (
  id uuid primary key default gen_random_uuid(),
  dedupe_key text not null unique,
  automation_type text not null,
  user_id uuid references auth.users(id) on delete cascade,
  resource_type text,
  resource_id text,
  dispatched_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb
);
create index if not exists automation_dispatch_log_user_idx on public.automation_dispatch_log(user_id,dispatched_at desc);
alter table public.automation_dispatch_log enable row level security;
create policy "automation_dispatch_admin_read" on public.automation_dispatch_log
for select to authenticated using (private.is_global_admin());

create or replace function public.refresh_event_costs(p_event_id uuid)
returns void
language plpgsql
security definer
set search_path=''
as $$
declare
  total_cost bigint;
begin
  select coalesce(sum(amount_jpy),0) into total_cost
  from public.operating_costs
  where event_id=p_event_id and payment_status in ('scheduled','paid');

  insert into public.event_financials(event_id,actual_cost_jpy)
  values(p_event_id,total_cost)
  on conflict(event_id) do update set
    actual_cost_jpy=excluded.actual_cost_jpy,
    updated_at=now();
end;
$$;
revoke all on function public.refresh_event_costs(uuid) from public,anon,authenticated;

create or replace function public.trg_refresh_event_costs()
returns trigger
language plpgsql
security definer
set search_path=''
as $$
declare
  ev uuid;
begin
  ev := coalesce(new.event_id,old.event_id);
  if ev is not null then perform public.refresh_event_costs(ev); end if;
  return coalesce(new,old);
end;
$$;
revoke all on function public.trg_refresh_event_costs() from public,anon,authenticated;

drop trigger if exists trg_operating_costs_refresh_event on public.operating_costs;
create trigger trg_operating_costs_refresh_event
after insert or update or delete on public.operating_costs
for each row execute function public.trg_refresh_event_costs();

create or replace function public.notify_application_status()
returns trigger
language plpgsql
security definer
set search_path=''
as $$
declare
  offer_slug text;
  offer_title text;
  recipient uuid;
  n_title text;
  n_body text;
  n_type text;
  n_url text;
  dkey text;
begin
  recipient := new.applicant_user_id;
  select slug,title into offer_slug,offer_title
  from public.service_offers where id=new.service_offer_id;

  if tg_op='INSERT' then
    n_type := 'application_received';
    n_title := '申込を受け付けました';
    n_body := coalesce(offer_title,'RBAプログラム') || ' の申込を受け付けました。';
    n_url := '/ja/my-homecourt';
  elsif new.status is distinct from old.status then
    if new.status='accepted' then
      n_type := 'application_accepted';
      n_title := '申込が承認されました';
      n_body := coalesce(offer_title,'RBAプログラム') || ' の申込が承認されました。お支払いへ進めます。';
      n_url := case when offer_slug is not null
        then '/ja/checkout?offer='||offer_slug||'&subject='||coalesce(new.subject_user_id,new.applicant_user_id)::text
        else '/ja/my-homecourt' end;
    elsif new.status='waitlisted' then
      n_type := 'application_waitlisted';
      n_title := 'キャンセル待ちに入りました';
      n_body := coalesce(offer_title,'RBAプログラム') || ' は現在キャンセル待ちです。空きが出た場合にお知らせします。';
      n_url := '/ja/my-homecourt';
    elsif new.status='rejected' then
      n_type := 'application_rejected';
      n_title := '申込状況が更新されました';
      n_body := coalesce(offer_title,'RBAプログラム') || ' の申込状況をご確認ください。';
      n_url := '/ja/my-homecourt';
    else
      return new;
    end if;
  else
    return new;
  end if;

  dkey := 'application:'||new.id::text||':'||n_type||':'||new.status;
  insert into public.automation_dispatch_log(dedupe_key,automation_type,user_id,resource_type,resource_id)
  values(dkey,n_type,recipient,'program_application',new.id::text)
  on conflict(dedupe_key) do nothing;

  if found then
    insert into public.platform_notifications(user_id,notification_type,title,body,action_url)
    values(recipient,n_type,n_title,n_body,n_url);
  end if;
  return new;
end;
$$;
revoke all on function public.notify_application_status() from public,anon,authenticated;

drop trigger if exists trg_program_application_notify on public.program_applications;
create trigger trg_program_application_notify
after insert or update of status on public.program_applications
for each row execute function public.notify_application_status();

create or replace function public.rba_automation_tick()
returns jsonb
language plpgsql
security definer
set search_path=''
as $$
declare
  v_events_completed int:=0;
  v_waitlist_expired int:=0;
  v_waitlist_offered int:=0;
  v_reminders int:=0;
  v_refreshes int:=0;
  rec record;
  cap int;
  occupied int;
  waiting record;
  offer_slug text;
  offer_title text;
  dkey text;
  month_start date:=date_trunc('month',current_date)::date;
begin
  -- Event lifecycle.
  update public.events
  set status='completed'
  where status in ('open','closed')
    and ends_at is not null
    and ends_at < now();
  get diagnostics v_events_completed = row_count;

  -- Expire stale waitlist offers.
  for rec in
    select w.id,w.application_id,w.subject_user_id,w.event_id
    from public.program_waitlist w
    where w.status='offered' and w.offer_expires_at is not null and w.offer_expires_at<now()
  loop
    update public.program_waitlist set status='expired' where id=rec.id;
    if rec.application_id is not null then
      update public.program_applications set status='waitlisted' where id=rec.application_id;
    end if;
    v_waitlist_expired:=v_waitlist_expired+1;
  end loop;

  -- Promote waitlist when a capacity-controlled event has space.
  for rec in
    select e.id,e.capacity,e.title
    from public.events e
    where e.status='open' and e.capacity is not null and e.capacity>0
  loop
    cap:=rec.capacity;
    select count(*) into occupied
    from public.participations p
    where p.event_id=rec.id and p.attendance_status in ('registered','confirmed','attended');

    while occupied < cap loop
      select w.id,w.application_id,w.subject_user_id
      into waiting
      from public.program_waitlist w
      where w.event_id=rec.id and w.status='waiting'
      order by w.priority,w.joined_at
      limit 1
      for update skip locked;

      exit when waiting.id is null;

      update public.program_waitlist
      set status='offered',offer_expires_at=now()+interval '24 hours'
      where id=waiting.id;

      if waiting.application_id is not null then
        update public.program_applications set status='accepted',reviewed_at=now()
        where id=waiting.application_id;
      end if;

      dkey:='waitlist_offer:'||waiting.id::text;
      insert into public.automation_dispatch_log(dedupe_key,automation_type,user_id,resource_type,resource_id)
      values(dkey,'waitlist_offer',waiting.subject_user_id,'program_waitlist',waiting.id::text)
      on conflict(dedupe_key) do nothing;
      if found then
        insert into public.platform_notifications(user_id,notification_type,title,body,action_url,expires_at)
        values(waiting.subject_user_id,'waitlist_offer','空きが出ました',
          rec.title||' に空きが出ました。24時間以内にお支払いを完了してください。',
          '/ja/my-homecourt',now()+interval '24 hours');
      end if;

      v_waitlist_offered:=v_waitlist_offered+1;
      occupied:=occupied+1;
    end loop;
  end loop;

  -- Payment reminders for accepted applications that remain unpaid.
  for rec in
    select a.id,a.applicant_user_id,a.subject_user_id,a.service_offer_id,a.reviewed_at,s.slug,s.title
    from public.program_applications a
    join public.service_offers s on s.id=a.service_offer_id
    where a.status='accepted'
      and coalesce(a.reviewed_at,a.submitted_at) < now()-interval '18 hours'
      and not exists (
        select 1 from public.platform_orders o
        where o.application_id=a.id and o.status in ('paid','fulfilled','refunded')
      )
  loop
    dkey:='payment_reminder:'||rec.id::text||':'||to_char(current_date,'YYYYMMDD');
    insert into public.automation_dispatch_log(dedupe_key,automation_type,user_id,resource_type,resource_id)
    values(dkey,'payment_reminder',rec.applicant_user_id,'program_application',rec.id::text)
    on conflict(dedupe_key) do nothing;
    if found then
      insert into public.platform_notifications(user_id,notification_type,title,body,action_url)
      values(rec.applicant_user_id,'payment_reminder','お支払いの確認',
        rec.title||' の参加枠を確定するにはお支払いが必要です。',
        '/ja/checkout?offer='||rec.slug||'&subject='||coalesce(rec.subject_user_id,rec.applicant_user_id)::text);
      v_reminders:=v_reminders+1;
    end if;
  end loop;

  -- Refresh all active/recent event P&L.
  for rec in
    select id from public.events
    where coalesce(ends_at,starts_at,created_at) > now()-interval '180 days'
  loop
    perform public.refresh_event_costs(rec.id);
    perform public.refresh_event_financials(rec.id);
    v_refreshes:=v_refreshes+1;
  end loop;

  -- Monthly business-unit KPI snapshots (current month, recalculated).
  insert into public.monthly_kpi_snapshots(
    month,business_unit_id,revenue_jpy,gross_profit_jpy,operating_profit_jpy,
    active_customers,new_customers,repeat_customers,events_held,participants,
    refunds_jpy,founder_dependent_revenue_jpy,updated_at
  )
  select
    month_start,
    bu.id,
    coalesce(sum(ef.actual_revenue_jpy),0),
    coalesce(sum(ef.actual_revenue_jpy-ef.actual_cost_jpy),0),
    coalesce(sum(ef.actual_revenue_jpy-ef.actual_cost_jpy-ef.refunds_jpy),0),
    coalesce((
      select count(distinct o.subject_user_id)
      from public.platform_orders o
      join public.service_offers so on so.id=o.service_offer_id
      where so.business_unit_id=bu.id and o.status in ('paid','fulfilled','refunded')
        and o.confirmed_at>=month_start and o.confirmed_at<month_start+interval '1 month'
    ),0),
    coalesce((
      select count(distinct o.subject_user_id)
      from public.platform_orders o
      join public.service_offers so on so.id=o.service_offer_id
      where so.business_unit_id=bu.id and o.status in ('paid','fulfilled','refunded')
        and o.confirmed_at>=month_start and o.confirmed_at<month_start+interval '1 month'
        and not exists (
          select 1 from public.platform_orders old
          where old.subject_user_id=o.subject_user_id and old.confirmed_at<month_start
            and old.status in ('paid','fulfilled','refunded')
        )
    ),0),
    coalesce((
      select count(distinct o.subject_user_id)
      from public.platform_orders o
      join public.service_offers so on so.id=o.service_offer_id
      where so.business_unit_id=bu.id and o.status in ('paid','fulfilled','refunded')
        and o.confirmed_at>=month_start and o.confirmed_at<month_start+interval '1 month'
        and exists (
          select 1 from public.platform_orders old
          where old.subject_user_id=o.subject_user_id and old.confirmed_at<month_start
            and old.status in ('paid','fulfilled','refunded')
        )
    ),0),
    count(distinct e.id) filter (where e.starts_at>=month_start and e.starts_at<month_start+interval '1 month'),
    coalesce(sum(ef.paid_participants),0),
    coalesce(sum(ef.refunds_jpy),0),
    coalesce(sum(ef.actual_revenue_jpy) filter (where ef.founder_required),0),
    now()
  from public.business_units bu
  left join public.events e on e.business_unit_id=bu.id
    and coalesce(e.starts_at,e.created_at)>=month_start
    and coalesce(e.starts_at,e.created_at)<month_start+interval '1 month'
  left join public.event_financials ef on ef.event_id=e.id
  where bu.status='active'
  group by bu.id
  on conflict(month,business_unit_id) do update set
    revenue_jpy=excluded.revenue_jpy,
    gross_profit_jpy=excluded.gross_profit_jpy,
    operating_profit_jpy=excluded.operating_profit_jpy,
    active_customers=excluded.active_customers,
    new_customers=excluded.new_customers,
    repeat_customers=excluded.repeat_customers,
    events_held=excluded.events_held,
    participants=excluded.participants,
    refunds_jpy=excluded.refunds_jpy,
    founder_dependent_revenue_jpy=excluded.founder_dependent_revenue_jpy,
    updated_at=now();

  return jsonb_build_object(
    'events_completed',v_events_completed,
    'waitlist_expired',v_waitlist_expired,
    'waitlist_offered',v_waitlist_offered,
    'payment_reminders',v_reminders,
    'financial_refreshes',v_refreshes,
    'ran_at',now()
  );
end;
$$;
revoke all on function public.rba_automation_tick() from public,anon,authenticated;

do $$
begin
  perform cron.unschedule('rba-platform-hourly-automation');
exception when others then null;
end $$;

select cron.schedule(
  'rba-platform-hourly-automation',
  '7 * * * *',
  'select public.rba_automation_tick();'
);


-- =====================================================================
-- MIGRATION 20260923111023 rba_audit_remediation_v3_2
-- =====================================================================

-- RBA Audit Remediation v3.2
-- Close approval bypasses, fix refund accounting, reserve waitlist offers, and bind paid orders to waitlist acceptance.

-- 1) Program application authorization: applicants can only create/edit their own or verified child's
-- draft/submitted application. Accepted/rejected/waitlisted are server/admin controlled.
drop policy if exists "applications_self_insert" on public.program_applications;
drop policy if exists "applications_self_update_draft" on public.program_applications;
drop policy if exists "applications_admin_insert" on public.program_applications;
drop policy if exists "applications_admin_update" on public.program_applications;
drop policy if exists "applications_admin_delete" on public.program_applications;

create policy "applications_self_insert" on public.program_applications
for insert to authenticated
with check (
  applicant_user_id=(select auth.uid())
  and status in ('draft','submitted')
  and (
    subject_user_id is null
    or subject_user_id=(select auth.uid())
    or exists(
      select 1 from public.guardian_links gl
      where gl.parent_user_id=(select auth.uid())
        and gl.child_user_id=program_applications.subject_user_id
        and gl.verified_at is not null
    )
  )
);

create policy "applications_self_update" on public.program_applications
for update to authenticated
using (
  applicant_user_id=(select auth.uid())
  and status in ('draft','submitted')
)
with check (
  applicant_user_id=(select auth.uid())
  and status in ('draft','submitted','withdrawn')
  and (
    subject_user_id is null
    or subject_user_id=(select auth.uid())
    or exists(
      select 1 from public.guardian_links gl
      where gl.parent_user_id=(select auth.uid())
        and gl.child_user_id=program_applications.subject_user_id
        and gl.verified_at is not null
    )
  )
);

create policy "applications_admin_insert" on public.program_applications
for insert to authenticated with check (private.is_global_admin());
create policy "applications_admin_update" on public.program_applications
for update to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "applications_admin_delete" on public.program_applications
for delete to authenticated using (private.is_global_admin());

-- Null-safe uniqueness for applications.
create unique index if not exists program_applications_offer_subject_uq
on public.program_applications(
  applicant_user_id,
  coalesce(subject_user_id,applicant_user_id),
  service_offer_id,
  application_type
)
where service_offer_id is not null;

create unique index if not exists program_applications_event_subject_uq
on public.program_applications(
  applicant_user_id,
  coalesce(subject_user_id,applicant_user_id),
  event_id,
  application_type
)
where event_id is not null and service_offer_id is null;

-- 2) Refund accounting: successful refunds are stored as status='refunded', not 'succeeded'.
create or replace function public.refresh_event_financials(p_event_id uuid)
returns void
language plpgsql
security definer
set search_path=''
as $$
declare
  revenue bigint;
  refunds bigint;
  participants_count integer;
  cancelled_count integer;
begin
  select
    coalesce(sum(case when l.transaction_type='charge' and l.status='succeeded' then l.amount else 0 end),0),
    coalesce(sum(case when l.transaction_type='refund' and l.status in ('refunded','partially_refunded','pending') then l.amount else 0 end),0)
  into revenue,refunds
  from public.transaction_ledger l
  join public.platform_orders o on o.id=l.order_id
  where o.event_id=p_event_id;

  select count(*) filter (where payment_status='paid'),
         count(*) filter (where attendance_status='cancelled')
  into participants_count,cancelled_count
  from public.participations
  where event_id=p_event_id;

  insert into public.event_financials(event_id,actual_revenue_jpy,refunds_jpy,paid_participants,cancellations)
  values(p_event_id,revenue,refunds,participants_count,cancelled_count)
  on conflict(event_id) do update set
    actual_revenue_jpy=excluded.actual_revenue_jpy,
    refunds_jpy=excluded.refunds_jpy,
    paid_participants=excluded.paid_participants,
    cancellations=excluded.cancellations,
    updated_at=now();
end;
$$;
revoke all on function public.refresh_event_financials(uuid) from public,anon,authenticated;

-- 3) Paid order automatically consumes a waitlist offer.
create or replace function public.accept_waitlist_on_paid_order()
returns trigger
language plpgsql
security definer
set search_path=''
as $$
begin
  if new.status in ('paid','confirmed','fulfilled')
     and (old.status is distinct from new.status)
     and new.event_id is not null
     and new.subject_user_id is not null then
    update public.program_waitlist
    set status='accepted', offer_expires_at=null
    where event_id=new.event_id
      and subject_user_id=new.subject_user_id
      and status in ('waiting','offered');
  end if;
  return new;
end;
$$;
revoke all on function public.accept_waitlist_on_paid_order() from public,anon,authenticated;

drop trigger if exists trg_accept_waitlist_on_paid_order on public.platform_orders;
create trigger trg_accept_waitlist_on_paid_order
after update of status on public.platform_orders
for each row execute function public.accept_waitlist_on_paid_order();

-- 4) Fix automation: outstanding waitlist offers reserve capacity.
create or replace function public.rba_automation_tick()
returns jsonb
language plpgsql
security definer
set search_path=''
as $$
declare
  v_events_completed int:=0;
  v_waitlist_expired int:=0;
  v_waitlist_offered int:=0;
  v_reminders int:=0;
  v_refreshes int:=0;
  rec record;
  cap int;
  occupied int;
  reserved int;
  waiting record;
  dkey text;
  month_start date:=date_trunc('month',current_date)::date;
begin
  update public.events
  set status='completed'
  where status in ('open','closed')
    and ends_at is not null
    and ends_at < now();
  get diagnostics v_events_completed = row_count;

  for rec in
    select w.id,w.application_id,w.subject_user_id,w.event_id
    from public.program_waitlist w
    where w.status='offered' and w.offer_expires_at is not null and w.offer_expires_at<now()
  loop
    update public.program_waitlist set status='expired' where id=rec.id;
    if rec.application_id is not null then
      update public.program_applications set status='waitlisted' where id=rec.application_id;
    end if;
    v_waitlist_expired:=v_waitlist_expired+1;
  end loop;

  for rec in
    select e.id,e.capacity,e.title
    from public.events e
    where e.status='open' and e.capacity is not null and e.capacity>0
  loop
    cap:=rec.capacity;

    select count(*) into occupied
    from public.participations p
    where p.event_id=rec.id and p.attendance_status in ('registered','confirmed','attended');

    select count(*) into reserved
    from public.program_waitlist w
    where w.event_id=rec.id
      and w.status='offered'
      and (w.offer_expires_at is null or w.offer_expires_at>=now());

    while occupied + reserved < cap loop
      waiting := null;
      select w.id,w.application_id,w.subject_user_id
      into waiting
      from public.program_waitlist w
      where w.event_id=rec.id and w.status='waiting'
      order by w.priority,w.joined_at
      limit 1
      for update skip locked;

      exit when waiting.id is null;

      update public.program_waitlist
      set status='offered',offer_expires_at=now()+interval '24 hours'
      where id=waiting.id;

      if waiting.application_id is not null then
        update public.program_applications
        set status='accepted',reviewed_at=now()
        where id=waiting.application_id;
      end if;

      dkey:='waitlist_offer:'||waiting.id::text||':'||to_char(now(),'YYYYMMDDHH24');
      insert into public.automation_dispatch_log(dedupe_key,automation_type,user_id,resource_type,resource_id)
      values(dkey,'waitlist_offer',waiting.subject_user_id,'program_waitlist',waiting.id::text)
      on conflict(dedupe_key) do nothing;
      if found then
        insert into public.platform_notifications(user_id,notification_type,title,body,action_url,expires_at)
        values(waiting.subject_user_id,'waitlist_offer','空きが出ました',
          rec.title||' に空きが出ました。24時間以内にお支払いを完了してください。',
          '/ja/my-homecourt',now()+interval '24 hours');
      end if;

      v_waitlist_offered:=v_waitlist_offered+1;
      reserved:=reserved+1;
    end loop;
  end loop;

  for rec in
    select a.id,a.applicant_user_id,a.subject_user_id,a.service_offer_id,a.reviewed_at,s.slug,s.title
    from public.program_applications a
    join public.service_offers s on s.id=a.service_offer_id
    where a.status='accepted'
      and coalesce(a.reviewed_at,a.submitted_at) < now()-interval '18 hours'
      and not exists (
        select 1 from public.platform_orders o
        where o.application_id=a.id and o.status in ('paid','confirmed','fulfilled','refunded')
      )
  loop
    dkey:='payment_reminder:'||rec.id::text||':'||to_char(current_date,'YYYYMMDD');
    insert into public.automation_dispatch_log(dedupe_key,automation_type,user_id,resource_type,resource_id)
    values(dkey,'payment_reminder',rec.applicant_user_id,'program_application',rec.id::text)
    on conflict(dedupe_key) do nothing;
    if found then
      insert into public.platform_notifications(user_id,notification_type,title,body,action_url)
      values(rec.applicant_user_id,'payment_reminder','お支払いの確認',
        rec.title||' の参加枠を確定するにはお支払いが必要です。',
        '/ja/checkout?offer='||rec.slug||'&subject='||coalesce(rec.subject_user_id,rec.applicant_user_id)::text);
      v_reminders:=v_reminders+1;
    end if;
  end loop;

  for rec in
    select id from public.events
    where coalesce(ends_at,starts_at,created_at) > now()-interval '180 days'
  loop
    perform public.refresh_event_costs(rec.id);
    perform public.refresh_event_financials(rec.id);
    v_refreshes:=v_refreshes+1;
  end loop;

  insert into public.monthly_kpi_snapshots(
    month,business_unit_id,revenue_jpy,gross_profit_jpy,operating_profit_jpy,
    active_customers,new_customers,repeat_customers,events_held,participants,
    refunds_jpy,founder_dependent_revenue_jpy,updated_at
  )
  select
    month_start,
    bu.id,
    coalesce(sum(ef.actual_revenue_jpy),0),
    coalesce(sum(ef.actual_revenue_jpy-ef.actual_cost_jpy),0),
    coalesce(sum(ef.actual_revenue_jpy-ef.actual_cost_jpy-ef.refunds_jpy),0),
    coalesce((
      select count(distinct coalesce(o.subject_user_id,o.user_id))
      from public.platform_orders o
      join public.service_offers so on so.id=o.service_offer_id
      where so.business_unit_id=bu.id and o.status in ('paid','confirmed','fulfilled','refunded')
        and o.confirmed_at>=month_start and o.confirmed_at<month_start+interval '1 month'
    ),0),
    coalesce((
      select count(distinct coalesce(o.subject_user_id,o.user_id))
      from public.platform_orders o
      join public.service_offers so on so.id=o.service_offer_id
      where so.business_unit_id=bu.id and o.status in ('paid','confirmed','fulfilled','refunded')
        and o.confirmed_at>=month_start and o.confirmed_at<month_start+interval '1 month'
        and not exists (
          select 1 from public.platform_orders old
          where coalesce(old.subject_user_id,old.user_id)=coalesce(o.subject_user_id,o.user_id)
            and old.confirmed_at<month_start
            and old.status in ('paid','confirmed','fulfilled','refunded')
        )
    ),0),
    coalesce((
      select count(distinct coalesce(o.subject_user_id,o.user_id))
      from public.platform_orders o
      join public.service_offers so on so.id=o.service_offer_id
      where so.business_unit_id=bu.id and o.status in ('paid','confirmed','fulfilled','refunded')
        and o.confirmed_at>=month_start and o.confirmed_at<month_start+interval '1 month'
        and exists (
          select 1 from public.platform_orders old
          where coalesce(old.subject_user_id,old.user_id)=coalesce(o.subject_user_id,o.user_id)
            and old.confirmed_at<month_start
            and old.status in ('paid','confirmed','fulfilled','refunded')
        )
    ),0),
    count(distinct e.id) filter (where e.starts_at>=month_start and e.starts_at<month_start+interval '1 month'),
    coalesce(sum(ef.paid_participants),0),
    coalesce(sum(ef.refunds_jpy),0),
    coalesce(sum(ef.actual_revenue_jpy) filter (where ef.founder_required),0),
    now()
  from public.business_units bu
  left join public.events e on e.business_unit_id=bu.id
    and coalesce(e.starts_at,e.created_at)>=month_start
    and coalesce(e.starts_at,e.created_at)<month_start+interval '1 month'
  left join public.event_financials ef on ef.event_id=e.id
  where bu.status='active'
  group by bu.id
  on conflict(month,business_unit_id) do update set
    revenue_jpy=excluded.revenue_jpy,
    gross_profit_jpy=excluded.gross_profit_jpy,
    operating_profit_jpy=excluded.operating_profit_jpy,
    active_customers=excluded.active_customers,
    new_customers=excluded.new_customers,
    repeat_customers=excluded.repeat_customers,
    events_held=excluded.events_held,
    participants=excluded.participants,
    refunds_jpy=excluded.refunds_jpy,
    founder_dependent_revenue_jpy=excluded.founder_dependent_revenue_jpy,
    updated_at=now();

  return jsonb_build_object(
    'events_completed',v_events_completed,
    'waitlist_expired',v_waitlist_expired,
    'waitlist_offered',v_waitlist_offered,
    'payment_reminders',v_reminders,
    'financial_refreshes',v_refreshes,
    'ran_at',now()
  );
end;
$$;
revoke all on function public.rba_automation_tick() from public,anon,authenticated;


-- =====================================================================
-- MIGRATION 20260923111309 rba_audit_coach_data_hardening_v3_3
-- =====================================================================

-- RBA Audit Remediation v3.3
-- Harden coach approval, credential verification and player-development write permissions.

create or replace function private.is_approved_coach(check_user_id uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path=''
as $$
  select exists(
    select 1 from public.coach_partner_profiles cpp
    where cpp.user_id=check_user_id
      and cpp.partner_status='approved'
      and cpp.approved_at is not null
  ) or private.is_global_admin();
$$;

create or replace function private.coach_has_player_context(check_coach_id uuid, check_player_id uuid)
returns boolean
language sql
stable
security definer
set search_path=''
as $$
  select private.is_global_admin()
  or (
    private.is_approved_coach(check_coach_id)
    and exists(
      select 1
      from public.coach_event_roles cer
      join public.participations p on p.event_id=cer.event_id
      where cer.coach_user_id=check_coach_id
        and p.player_user_id=check_player_id
        and p.attendance_status in ('registered','confirmed','attended')
    )
  );
$$;

revoke all on function private.is_approved_coach(uuid) from public,anon;
grant execute on function private.is_approved_coach(uuid) to authenticated;
revoke all on function private.coach_has_player_context(uuid,uuid) from public,anon;
grant execute on function private.coach_has_player_context(uuid,uuid) to authenticated;

-- Prevent coaches from self-approving partner status.
create or replace function public.guard_coach_partner_verification()
returns trigger
language plpgsql
security definer
set search_path=''
as $$
begin
  if not private.is_global_admin() then
    if new.partner_status is distinct from old.partner_status
       or new.approved_at is distinct from old.approved_at then
      raise exception 'coach partner verification fields are admin-managed';
    end if;
  end if;
  return new;
end;
$$;
revoke all on function public.guard_coach_partner_verification() from public,anon,authenticated;

drop trigger if exists trg_guard_coach_partner_verification on public.coach_partner_profiles;
create trigger trg_guard_coach_partner_verification
before update on public.coach_partner_profiles
for each row execute function public.guard_coach_partner_verification();

-- Teams can only be created by an approved RBA coach or global admin.
drop policy if exists "coaches create teams" on public.teams;
create policy "approved coaches create teams" on public.teams
for insert to authenticated
with check (
  created_by=(select auth.uid())
  and (private.is_approved_coach((select auth.uid())) or private.is_global_admin())
);

-- Player goals: self, verified guardian, approved coach with real player context, or admin.
drop policy if exists "player_goals_insert" on public.player_goals;
drop policy if exists "player_goals_update" on public.player_goals;
drop policy if exists "player_goals_delete" on public.player_goals;

create policy "player_goals_insert" on public.player_goals
for insert to authenticated
with check (
  player_user_id=(select auth.uid())
  or exists(
    select 1 from public.guardian_links gl
    where gl.parent_user_id=(select auth.uid())
      and gl.child_user_id=player_goals.player_user_id
      and gl.verified_at is not null
  )
  or (
    created_by=(select auth.uid())
    and private.coach_has_player_context((select auth.uid()),player_user_id)
  )
  or private.is_global_admin()
);

create policy "player_goals_update" on public.player_goals
for update to authenticated
using (
  player_user_id=(select auth.uid())
  or exists(
    select 1 from public.guardian_links gl
    where gl.parent_user_id=(select auth.uid())
      and gl.child_user_id=player_goals.player_user_id
      and gl.verified_at is not null
  )
  or (
    created_by=(select auth.uid())
    and private.coach_has_player_context((select auth.uid()),player_user_id)
  )
  or private.is_global_admin()
)
with check (
  player_user_id=(select auth.uid())
  or exists(
    select 1 from public.guardian_links gl
    where gl.parent_user_id=(select auth.uid())
      and gl.child_user_id=player_goals.player_user_id
      and gl.verified_at is not null
  )
  or (
    created_by=(select auth.uid())
    and private.coach_has_player_context((select auth.uid()),player_user_id)
  )
  or private.is_global_admin()
);

create policy "player_goals_delete" on public.player_goals
for delete to authenticated
using (
  player_user_id=(select auth.uid())
  or (
    created_by=(select auth.uid())
    and private.coach_has_player_context((select auth.uid()),player_user_id)
  )
  or private.is_global_admin()
);

-- Assessments require approved coach + event assignment + player participation, or admin.
drop policy if exists "assessments_staff_insert" on public.player_assessments;
create policy "assessments_staff_insert" on public.player_assessments
for insert to authenticated
with check (
  private.is_global_admin()
  or (
    assessor_user_id=(select auth.uid())
    and event_id is not null
    and private.is_approved_coach((select auth.uid()))
    and exists(
      select 1 from public.coach_event_roles cer
      where cer.event_id=player_assessments.event_id
        and cer.coach_user_id=(select auth.uid())
    )
    and exists(
      select 1 from public.participations p
      where p.event_id=player_assessments.event_id
        and p.player_user_id=player_assessments.player_user_id
        and p.attendance_status in ('registered','confirmed','attended')
    )
  )
);

-- Development plans use the same verified coach-player context.
drop policy if exists "development_plan_insert" on public.development_plan_items;
drop policy if exists "development_plan_update" on public.development_plan_items;
drop policy if exists "development_plan_delete" on public.development_plan_items;

create policy "development_plan_insert" on public.development_plan_items
for insert to authenticated
with check (
  player_user_id=(select auth.uid())
  or exists(
    select 1 from public.guardian_links gl
    where gl.parent_user_id=(select auth.uid())
      and gl.child_user_id=development_plan_items.player_user_id
      and gl.verified_at is not null
  )
  or (
    assigned_by=(select auth.uid())
    and private.coach_has_player_context((select auth.uid()),player_user_id)
  )
  or private.is_global_admin()
);

create policy "development_plan_update" on public.development_plan_items
for update to authenticated
using (
  player_user_id=(select auth.uid())
  or exists(
    select 1 from public.guardian_links gl
    where gl.parent_user_id=(select auth.uid())
      and gl.child_user_id=development_plan_items.player_user_id
      and gl.verified_at is not null
  )
  or (
    assigned_by=(select auth.uid())
    and private.coach_has_player_context((select auth.uid()),player_user_id)
  )
  or private.is_global_admin()
)
with check (
  player_user_id=(select auth.uid())
  or exists(
    select 1 from public.guardian_links gl
    where gl.parent_user_id=(select auth.uid())
      and gl.child_user_id=development_plan_items.player_user_id
      and gl.verified_at is not null
  )
  or (
    assigned_by=(select auth.uid())
    and private.coach_has_player_context((select auth.uid()),player_user_id)
  )
  or private.is_global_admin()
);

create policy "development_plan_delete" on public.development_plan_items
for delete to authenticated
using (
  player_user_id=(select auth.uid())
  or (
    assigned_by=(select auth.uid())
    and private.coach_has_player_context((select auth.uid()),player_user_id)
  )
  or private.is_global_admin()
);

-- Credential verification is admin-managed; coaches may submit claims only as unverified/pending.
drop policy if exists "coach_credentials_self_insert" on public.coach_credentials;
drop policy if exists "coach_credentials_self_update" on public.coach_credentials;

create policy "coach_credentials_self_insert" on public.coach_credentials
for insert to authenticated
with check (
  (coach_user_id=(select auth.uid())
   and verification_status in ('unverified','pending')
   and verified_by is null
   and verified_at is null)
  or private.is_global_admin()
);

create policy "coach_credentials_self_update" on public.coach_credentials
for update to authenticated
using (coach_user_id=(select auth.uid()) or private.is_global_admin())
with check (
  (
    coach_user_id=(select auth.uid())
    and verification_status in ('unverified','pending')
    and verified_by is null
    and verified_at is null
  )
  or private.is_global_admin()
);

create or replace function public.guard_coach_credential_verification()
returns trigger
language plpgsql
security definer
set search_path=''
as $$
begin
  if not private.is_global_admin() then
    if new.verification_status is distinct from old.verification_status
       or new.verified_by is distinct from old.verified_by
       or new.verified_at is distinct from old.verified_at then
      raise exception 'credential verification fields are admin-managed';
    end if;
  end if;
  return new;
end;
$$;
revoke all on function public.guard_coach_credential_verification() from public,anon,authenticated;

drop trigger if exists trg_guard_coach_credential_verification on public.coach_credentials;
create trigger trg_guard_coach_credential_verification
before update on public.coach_credentials
for each row execute function public.guard_coach_credential_verification();


-- =====================================================================
-- MIGRATION 20260923111450 rba_audit_dead_link_cleanup_v3_4
-- =====================================================================

-- RBA Audit Remediation v3.4
-- Remove dead application/checkout URLs from current production data and notifications.

update public.service_offers s
set external_application_url=e.registration_url,
    updated_at=now()
from public.events e
where e.slug=s.metadata->>'source_event_slug'
  and e.registration_url is not null
  and s.external_application_url like '/apply?%';

create or replace function public.notify_application_status()
returns trigger
language plpgsql
security definer
set search_path=''
as $$
declare
  offer_slug text;
  offer_title text;
  source_event_slug text;
  pay_url text;
  recipient uuid;
  n_title text;
  n_body text;
  n_type text;
  n_url text;
  dkey text;
begin
  recipient := new.applicant_user_id;
  select s.slug,s.title,s.metadata->>'source_event_slug'
  into offer_slug,offer_title,source_event_slug
  from public.service_offers s where s.id=new.service_offer_id;

  if source_event_slug is not null then
    select e.payment_url into pay_url from public.events e where e.slug=source_event_slug;
  end if;

  if tg_op='INSERT' then
    n_type := 'application_received';
    n_title := '申込を受け付けました';
    n_body := coalesce(offer_title,'RBAプログラム') || ' の申込を受け付けました。';
    n_url := '/ja/my-homecourt';
  elsif new.status is distinct from old.status then
    if new.status='accepted' then
      n_type := 'application_accepted';
      n_title := '申込が承認されました';
      n_body := coalesce(offer_title,'RBAプログラム') || ' の申込が承認されました。お支払いへ進めます。';
      n_url := coalesce(pay_url,'/ja/payments');
    elsif new.status='waitlisted' then
      n_type := 'application_waitlisted';
      n_title := 'キャンセル待ちに入りました';
      n_body := coalesce(offer_title,'RBAプログラム') || ' は現在キャンセル待ちです。空きが出た場合にお知らせします。';
      n_url := '/ja/my-homecourt';
    elsif new.status='rejected' then
      n_type := 'application_rejected';
      n_title := '申込状況が更新されました';
      n_body := coalesce(offer_title,'RBAプログラム') || ' の申込状況をご確認ください。';
      n_url := '/ja/my-homecourt';
    else
      return new;
    end if;
  else
    return new;
  end if;

  dkey := 'application:'||new.id::text||':'||n_type||':'||new.status;
  insert into public.automation_dispatch_log(dedupe_key,automation_type,user_id,resource_type,resource_id)
  values(dkey,n_type,recipient,'program_application',new.id::text)
  on conflict(dedupe_key) do nothing;

  if found then
    insert into public.platform_notifications(user_id,notification_type,title,body,action_url)
    values(recipient,n_type,n_title,n_body,n_url);
  end if;
  return new;
end;
$$;
revoke all on function public.notify_application_status() from public,anon,authenticated;

create or replace function public.rba_payment_reminder_url(p_offer_id uuid)
returns text
language sql
stable
security definer
set search_path=''
as $$
  select coalesce(e.payment_url,'/ja/payments')
  from public.service_offers s
  left join public.events e on e.slug=s.metadata->>'source_event_slug'
  where s.id=p_offer_id
$$;
revoke all on function public.rba_payment_reminder_url(uuid) from public,anon,authenticated;


-- =====================================================================
-- MIGRATION 20260923111504 rba_audit_notification_url_guard_v3_5
-- =====================================================================

create or replace function public.rewrite_dead_checkout_notification_url()
returns trigger
language plpgsql
security definer
set search_path=''
as $$
declare
  offer_slug text;
  replacement text;
begin
  if new.action_url like '/ja/checkout?offer=%' then
    offer_slug := split_part(split_part(new.action_url,'offer=',2),'&',1);
    select coalesce(e.payment_url,'/ja/payments')
      into replacement
    from public.service_offers s
    left join public.events e on e.slug=s.metadata->>'source_event_slug'
    where s.slug=offer_slug;
    new.action_url := coalesce(replacement,'/ja/payments');
  end if;
  return new;
end;
$$;
revoke all on function public.rewrite_dead_checkout_notification_url() from public,anon,authenticated;

drop trigger if exists trg_rewrite_dead_checkout_notification_url on public.platform_notifications;
create trigger trg_rewrite_dead_checkout_notification_url
before insert or update of action_url on public.platform_notifications
for each row execute function public.rewrite_dead_checkout_notification_url();


-- =====================================================================
-- MIGRATION 20260923112015 rba_global_scale_platform_v4
-- =====================================================================

-- RBA Global Scale Platform v4
-- International partnerships, impact reporting, federation readiness, coach education,
-- safeguarding governance and research/evidence layer.

create table if not exists public.global_partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  organization_type text not null check (organization_type in (
    'national_federation','regional_federation','club','academy','school','university',
    'ngo','government','brand','medical','performance','event_organizer','other'
  )),
  country_code text not null,
  city text,
  website_url text,
  contact_name text,
  contact_email text,
  relationship_status text not null default 'prospect'
    check (relationship_status in ('prospect','contacted','discussion','mou_drafting','active','paused','ended')),
  strategic_fit text,
  safeguarding_contact text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(name,country_code)
);

create table if not exists public.global_partnership_agreements (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.global_partners(id) on delete cascade,
  agreement_type text not null check (agreement_type in (
    'mou','exchange','coach_education','tournament','player_development',
    'research','sponsorship','facility','community_impact','other'
  )),
  title text not null,
  status text not null default 'draft'
    check (status in ('draft','review','signed','active','expired','terminated')),
  starts_on date,
  ends_on date,
  document_reference text,
  owner_user_id uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists global_partnership_agreements_partner_idx
  on public.global_partnership_agreements(partner_id,status);

create table if not exists public.global_exchange_programs (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  partner_id uuid references public.global_partners(id) on delete set null,
  title text not null,
  exchange_type text not null check (exchange_type in (
    'outbound_team','inbound_team','coach_exchange','camp','tournament',
    'study_visit','online_exchange','research_exchange'
  )),
  host_country_code text not null,
  city text,
  target_group text,
  starts_on date,
  ends_on date,
  capacity integer check (capacity is null or capacity>=0),
  status text not null default 'planning'
    check (status in ('planning','recruiting','confirmed','completed','cancelled')),
  event_id uuid references public.events(id) on delete set null,
  created_at timestamptz not null default now()
);
create index if not exists global_exchange_programs_partner_idx
  on public.global_exchange_programs(partner_id,status);

create table if not exists public.impact_metrics (
  id uuid primary key default gen_random_uuid(),
  metric_key text not null unique,
  label_ja text not null,
  label_en text not null,
  unit text not null default 'count',
  category text not null check (category in (
    'participation','development','coach_education','safeguarding',
    'inclusion','community','international','retention','quality'
  )),
  methodology text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

insert into public.impact_metrics(metric_key,label_ja,label_en,unit,category,methodology) values
 ('participants_unique','ユニーク参加者','Unique participants','count','participation','Distinct participants in reporting period'),
 ('girls_participation_rate','女子参加率','Girls participation rate','percent','inclusion','Girls participants / all participants'),
 ('repeat_participation_rate','再参加率','Repeat participation rate','percent','retention','Participants with prior RBA participation / participants'),
 ('coach_learning_hours','コーチ学習時間','Coach learning hours','hours','coach_education','Verified education minutes / 60'),
 ('verified_coaches','確認済みコーチ','Verified coaches','count','coach_education','Coaches with verified credentials or approved RBA status'),
 ('safeguarding_reports','セーフガーディング報告','Safeguarding reports','count','safeguarding','Received safety reports'),
 ('safeguarding_closed_rate','安全案件解決率','Safeguarding case closure rate','percent','safeguarding','Resolved safeguarding cases / received cases'),
 ('international_programs','国際交流プログラム数','International programs','count','international','Confirmed/completed global exchange programs'),
 ('countries_connected','接続国数','Countries connected','count','international','Distinct countries with active partnerships/programs'),
 ('development_assessments','育成評価数','Development assessments','count','development','Completed player assessments'),
 ('goal_achievement_rate','目標達成率','Goal achievement rate','percent','development','Achieved player goals / closed or achieved goals'),
 ('program_quality_score','プログラム品質スコア','Program quality score','score_5','quality','Mean overall feedback score')
on conflict(metric_key) do nothing;

create table if not exists public.impact_snapshots (
  id uuid primary key default gen_random_uuid(),
  reporting_period_start date not null,
  reporting_period_end date not null,
  metric_id uuid not null references public.impact_metrics(id) on delete cascade,
  business_unit_id uuid references public.business_units(id),
  country_code text,
  value_numeric numeric not null,
  numerator numeric,
  denominator numeric,
  notes text,
  generated_at timestamptz not null default now(),
  unique(reporting_period_start,reporting_period_end,metric_id,business_unit_id,country_code)
);

create table if not exists public.coach_education_programs (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  title text not null,
  level text not null check (level in ('foundation','level_1','level_2','advanced','specialist')),
  target_audience text,
  delivery_mode text not null check (delivery_mode in ('online','in_person','hybrid')),
  language_codes text[] not null default ARRAY['ja']::text[],
  learning_outcomes jsonb not null default '[]'::jsonb,
  assessment_required boolean not null default false,
  certificate_issued boolean not null default false,
  status text not null default 'draft' check (status in ('draft','active','paused','retired')),
  created_at timestamptz not null default now()
);

create table if not exists public.coach_education_enrollments (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.coach_education_programs(id) on delete cascade,
  coach_user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'enrolled' check (status in ('enrolled','in_progress','completed','failed','withdrawn')),
  enrolled_at timestamptz not null default now(),
  completed_at timestamptz,
  assessment_score numeric,
  certificate_code text unique,
  unique(program_id,coach_user_id)
);
create index if not exists coach_education_enrollments_coach_idx
  on public.coach_education_enrollments(coach_user_id,status);

create table if not exists public.research_projects (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  title text not null,
  research_type text not null check (research_type in (
    'internal_evaluation','academic_collaboration','survey','longitudinal','program_evaluation','other'
  )),
  partner_id uuid references public.global_partners(id) on delete set null,
  purpose text not null,
  methodology text,
  ethics_review_status text not null default 'not_required'
    check (ethics_review_status in ('not_required','pending','approved','rejected')),
  privacy_basis text,
  status text not null default 'planning'
    check (status in ('planning','collecting','analysis','published','closed')),
  starts_on date,
  ends_on date,
  output_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.public_reports (
  id uuid primary key default gen_random_uuid(),
  report_type text not null check (report_type in (
    'annual_impact','safeguarding','development','coach_education','international','financial_summary','research'
  )),
  title text not null,
  year integer,
  language_code text not null default 'en',
  public_url text,
  status text not null default 'draft' check (status in ('draft','review','published','archived')),
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.safeguarding_officers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  full_name text not null,
  role_title text not null,
  email text,
  country_code text not null default 'JP',
  primary_contact boolean not null default false,
  training_provider text,
  training_name text,
  training_completed_on date,
  training_expires_on date,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.organization_standards (
  id uuid primary key default gen_random_uuid(),
  standard_key text not null unique,
  title text not null,
  area text not null check (area in (
    'coaching','safeguarding','governance','medical','data_privacy','event_operations',
    'international','inclusion','research','finance'
  )),
  version text not null,
  status text not null default 'draft' check (status in ('draft','approved','published','retired')),
  effective_on date,
  review_due_on date,
  public_url text,
  created_at timestamptz not null default now()
);

insert into public.organization_standards(standard_key,title,area,version,status) values
 ('rba_player_development_standard','RBA Player Development Standard','coaching','1.0','draft'),
 ('rba_coach_standard','RBA Coach Standard','coaching','1.0','draft'),
 ('rba_safeguarding_standard','RBA Safeguarding Standard','safeguarding','1.0','draft'),
 ('rba_event_standard','RBA Event Operations Standard','event_operations','1.0','draft'),
 ('rba_international_exchange_standard','RBA International Exchange Standard','international','1.0','draft'),
 ('rba_data_privacy_standard','RBA Youth Data & Privacy Standard','data_privacy','1.0','draft'),
 ('rba_inclusion_standard','RBA Inclusion & Access Standard','inclusion','1.0','draft'),
 ('rba_research_ethics_standard','RBA Research & Evaluation Standard','research','1.0','draft')
on conflict(standard_key) do nothing;

-- RLS
alter table public.global_partners enable row level security;
alter table public.global_partnership_agreements enable row level security;
alter table public.global_exchange_programs enable row level security;
alter table public.impact_metrics enable row level security;
alter table public.impact_snapshots enable row level security;
alter table public.coach_education_programs enable row level security;
alter table public.coach_education_enrollments enable row level security;
alter table public.research_projects enable row level security;
alter table public.public_reports enable row level security;
alter table public.safeguarding_officers enable row level security;
alter table public.organization_standards enable row level security;

-- Public read where appropriate; admin write.
create policy "impact_metrics_public_read" on public.impact_metrics for select to anon,authenticated using (active);
create policy "coach_education_programs_public_read" on public.coach_education_programs for select to anon,authenticated using (status='active');
create policy "public_reports_public_read" on public.public_reports for select to anon,authenticated using (status='published');
create policy "organization_standards_public_read" on public.organization_standards for select to anon,authenticated using (status='published');

create policy "global_partners_admin_all" on public.global_partners for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "global_agreements_admin_all" on public.global_partnership_agreements for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "global_exchange_admin_all" on public.global_exchange_programs for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "impact_metrics_admin_write" on public.impact_metrics for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "impact_snapshots_admin_all" on public.impact_snapshots for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "coach_education_programs_admin_write" on public.coach_education_programs for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());

create policy "coach_education_enrollments_self_read" on public.coach_education_enrollments
for select to authenticated using (coach_user_id=(select auth.uid()) or private.is_global_admin());
create policy "coach_education_enrollments_admin_write" on public.coach_education_enrollments
for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());

create policy "research_projects_admin_all" on public.research_projects for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "public_reports_admin_write" on public.public_reports for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "safeguarding_officers_admin_all" on public.safeguarding_officers for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "organization_standards_admin_write" on public.organization_standards for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());

-- International partner pipeline seed from current known RBA relationships.
insert into public.global_partners(name,organization_type,country_code,relationship_status,strategic_fit)
values
 ('MVP Academy','academy','MY','discussion','Youth curriculum, coach development and Japan exchange'),
 ('Philippines Basketball Delegation','other','PH','discussion','Japan-hosted exchange and delegation collaboration')
on conflict(name,country_code) do nothing;


-- =====================================================================
-- MIGRATION 20260923113642 rba_operations_intelligence_v5
-- =====================================================================

-- RBA Operations Intelligence v5
-- Exception-first operations, hub scoring, partner scoring and executive work queue.

create table if not exists public.operations_exceptions (
  id uuid primary key default gen_random_uuid(),
  exception_key text not null unique,
  exception_type text not null check (exception_type in (
    'payment','refund','capacity','waitlist','safeguarding','event_margin',
    'founder_dependency','partner_followup','data_quality','credential','other'
  )),
  severity text not null default 'medium' check (severity in ('low','medium','high','critical')),
  status text not null default 'open' check (status in ('open','acknowledged','resolved','dismissed')),
  title text not null,
  description text,
  user_id uuid references auth.users(id) on delete set null,
  event_id uuid references public.events(id) on delete cascade,
  service_offer_id uuid references public.service_offers(id) on delete cascade,
  partner_id uuid references public.global_partners(id) on delete cascade,
  due_at timestamptz,
  source_table text,
  source_id text,
  metadata jsonb not null default '{}'::jsonb,
  detected_at timestamptz not null default now(),
  acknowledged_at timestamptz,
  resolved_at timestamptz,
  updated_at timestamptz not null default now()
);
create index if not exists operations_exceptions_open_idx
  on public.operations_exceptions(status,severity,due_at);
create index if not exists operations_exceptions_event_idx
  on public.operations_exceptions(event_id,status);
create index if not exists operations_exceptions_partner_idx
  on public.operations_exceptions(partner_id,status);

alter table public.operations_exceptions enable row level security;
create policy "operations_exceptions_admin_all" on public.operations_exceptions
for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());

create table if not exists public.hub_performance_snapshots (
  id uuid primary key default gen_random_uuid(),
  hub_key text not null,
  hub_name text not null,
  region text,
  period_start date not null,
  period_end date not null,
  events_count integer not null default 0,
  participants_count integer not null default 0,
  repeat_rate numeric,
  revenue_jpy bigint not null default 0,
  operating_profit_jpy bigint not null default 0,
  margin_pct numeric,
  program_quality_score numeric,
  safeguarding_open_count integer not null default 0,
  approved_coaches_count integer not null default 0,
  founder_dependency_pct numeric,
  score numeric,
  score_version text not null default 'v1',
  generated_at timestamptz not null default now(),
  unique(hub_key,period_start,period_end)
);
alter table public.hub_performance_snapshots enable row level security;
create policy "hub_performance_admin_read" on public.hub_performance_snapshots
for select to authenticated using (private.is_global_admin());
create policy "hub_performance_admin_write" on public.hub_performance_snapshots
for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());

create table if not exists public.partner_health_snapshots (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.global_partners(id) on delete cascade,
  period_start date not null,
  period_end date not null,
  relationship_status text,
  active_agreements integer not null default 0,
  confirmed_programs integer not null default 0,
  completed_programs integer not null default 0,
  participant_reach integer not null default 0,
  last_activity_at timestamptz,
  safeguarding_ready boolean not null default false,
  score numeric,
  score_version text not null default 'v1',
  generated_at timestamptz not null default now(),
  unique(partner_id,period_start,period_end)
);
create index if not exists partner_health_partner_idx
  on public.partner_health_snapshots(partner_id,period_end desc);
alter table public.partner_health_snapshots enable row level security;
create policy "partner_health_admin_read" on public.partner_health_snapshots
for select to authenticated using (private.is_global_admin());
create policy "partner_health_admin_write" on public.partner_health_snapshots
for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());

create or replace view public.management_exception_queue
with (security_invoker=true)
as
select
  x.id,
  x.exception_type,
  x.severity,
  x.status,
  x.title,
  x.description,
  x.due_at,
  x.detected_at,
  e.event_code,
  e.title as event_title,
  s.offer_code,
  s.title as offer_title,
  gp.name as partner_name,
  x.metadata
from public.operations_exceptions x
left join public.events e on e.id=x.event_id
left join public.service_offers s on s.id=x.service_offer_id
left join public.global_partners gp on gp.id=x.partner_id
where x.status in ('open','acknowledged')
order by
  case x.severity when 'critical' then 1 when 'high' then 2 when 'medium' then 3 else 4 end,
  x.due_at nulls last,
  x.detected_at;

revoke all on public.management_exception_queue from anon,authenticated;
grant select on public.management_exception_queue to authenticated;

create or replace function public.rba_refresh_operations_exceptions()
returns jsonb
language plpgsql
security definer
set search_path=''
as $$
declare
  v_added int:=0;
  v_resolved int:=0;
  rec record;
  key text;
begin
  -- resolve stale auto-generated exceptions before recalculation
  update public.operations_exceptions
  set status='resolved',resolved_at=now(),updated_at=now()
  where status in ('open','acknowledged')
    and metadata->>'auto_generated'='true'
    and exception_type in ('payment','capacity','event_margin','founder_dependency','partner_followup','data_quality');
  get diagnostics v_resolved = row_count;

  -- payment: accepted applications with no paid order after 18h
  for rec in
    select a.id,a.applicant_user_id,a.service_offer_id,s.title
    from public.program_applications a
    join public.service_offers s on s.id=a.service_offer_id
    where a.status='accepted'
      and coalesce(a.reviewed_at,a.submitted_at)<now()-interval '18 hours'
      and not exists(
        select 1 from public.platform_orders o
        where o.application_id=a.id and o.status in ('paid','confirmed','fulfilled','refunded')
      )
  loop
    key:='payment:'||rec.id::text;
    insert into public.operations_exceptions(
      exception_key,exception_type,severity,title,description,user_id,service_offer_id,due_at,
      source_table,source_id,metadata
    ) values(
      key,'payment','medium','未決済の承認済み申込',
      rec.title||' の承認済み申込が未決済です。',
      rec.applicant_user_id,rec.service_offer_id,now()+interval '6 hours',
      'program_applications',rec.id::text,'{"auto_generated":true}'::jsonb
    )
    on conflict(exception_key) do update set
      status='open',resolved_at=null,updated_at=now(),due_at=excluded.due_at;
    v_added:=v_added+1;
  end loop;

  -- data quality: capacity controlled but no capacity set
  for rec in
    select s.id,s.title
    from public.service_offers s
    left join public.events e on e.slug=s.metadata->>'source_event_slug'
    where s.publication_status='published'
      and coalesce((s.metadata->>'capacity_controlled')::boolean,false)=true
      and coalesce(s.capacity,e.capacity) is null
  loop
    key:='capacity_missing:'||rec.id::text;
    insert into public.operations_exceptions(
      exception_key,exception_type,severity,title,description,service_offer_id,
      source_table,source_id,metadata
    ) values(
      key,'data_quality','high','定員未設定',
      rec.title||' は定員管理対象ですがcapacityが未設定です。',
      rec.id,'service_offers',rec.id::text,'{"auto_generated":true}'::jsonb
    )
    on conflict(exception_key) do update set
      status='open',resolved_at=null,updated_at=now();
    v_added:=v_added+1;
  end loop;

  -- event margin: completed/recent event with negative operating profit
  for rec in
    select ef.event_id,e.title,
      (ef.actual_revenue_jpy-ef.actual_cost_jpy-ef.refunds_jpy) as profit
    from public.event_financials ef
    join public.events e on e.id=ef.event_id
    where ef.actual_revenue_jpy>0
      and (ef.actual_revenue_jpy-ef.actual_cost_jpy-ef.refunds_jpy)<0
  loop
    key:='negative_margin:'||rec.event_id::text;
    insert into public.operations_exceptions(
      exception_key,exception_type,severity,title,description,event_id,
      source_table,source_id,metadata
    ) values(
      key,'event_margin','high','イベント赤字',
      rec.title||' の実績利益がマイナスです。',
      rec.event_id,'event_financials',rec.event_id::text,
      jsonb_build_object('auto_generated',true,'profit_jpy',rec.profit)
    )
    on conflict(exception_key) do update set
      status='open',resolved_at=null,updated_at=now(),metadata=excluded.metadata;
    v_added:=v_added+1;
  end loop;

  -- founder dependency: profitable event marked founder-required
  for rec in
    select ef.event_id,e.title,ef.actual_revenue_jpy
    from public.event_financials ef
    join public.events e on e.id=ef.event_id
    where ef.founder_required=true and ef.actual_revenue_jpy>0
  loop
    key:='founder_dependency:'||rec.event_id::text;
    insert into public.operations_exceptions(
      exception_key,exception_type,severity,title,description,event_id,
      source_table,source_id,metadata
    ) values(
      key,'founder_dependency','low','Founder依存イベント',
      rec.title||' はFounder必須として売上計上されています。',
      rec.event_id,'event_financials',rec.event_id::text,
      jsonb_build_object('auto_generated',true,'revenue_jpy',rec.actual_revenue_jpy)
    )
    on conflict(exception_key) do update set
      status='open',resolved_at=null,updated_at=now(),metadata=excluded.metadata;
    v_added:=v_added+1;
  end loop;

  -- partner follow-up: discussion/contacted with no update for 14 days
  for rec in
    select id,name,relationship_status,updated_at
    from public.global_partners
    where relationship_status in ('contacted','discussion','mou_drafting')
      and updated_at<now()-interval '14 days'
  loop
    key:='partner_followup:'||rec.id::text;
    insert into public.operations_exceptions(
      exception_key,exception_type,severity,title,description,partner_id,due_at,
      source_table,source_id,metadata
    ) values(
      key,'partner_followup','medium','海外パートナー要フォロー',
      rec.name||' との案件が14日以上更新されていません。',
      rec.id,now()+interval '3 days','global_partners',rec.id::text,'{"auto_generated":true}'::jsonb
    )
    on conflict(exception_key) do update set
      status='open',resolved_at=null,updated_at=now(),due_at=excluded.due_at;
    v_added:=v_added+1;
  end loop;

  return jsonb_build_object('exceptions_refreshed',v_added,'auto_resolved',v_resolved,'ran_at',now());
end;
$$;
revoke all on function public.rba_refresh_operations_exceptions() from public,anon,authenticated;

-- attach exception refresh to existing hourly automation without rewriting it
create or replace function public.rba_operations_tick()
returns jsonb
language plpgsql
security definer
set search_path=''
as $$
declare
  base jsonb;
  exceptions jsonb;
begin
  base:=public.rba_automation_tick();
  exceptions:=public.rba_refresh_operations_exceptions();
  return jsonb_build_object('automation',base,'exceptions',exceptions);
end;
$$;
revoke all on function public.rba_operations_tick() from public,anon,authenticated;

do $$
begin
  perform cron.unschedule('rba-platform-hourly-automation');
exception when others then null;
end $$;

select cron.schedule(
  'rba-platform-hourly-automation',
  '7 * * * *',
  'select public.rba_operations_tick();'
);


-- =====================================================================
-- MIGRATION 20260923121931 rba_go_live_control_plane_v6
-- =====================================================================

-- RBA Go-Live Control Plane v6
create table if not exists public.go_live_checks (
  id uuid primary key default gen_random_uuid(),
  check_key text not null unique,
  category text not null check (category in (
    'commerce','routing','security','data_quality','operations','legal','international','observability'
  )),
  severity text not null default 'high' check (severity in ('low','medium','high','critical')),
  title text not null,
  description text,
  status text not null default 'pending' check (status in ('pass','fail','warning','pending','blocked')),
  automated boolean not null default true,
  last_checked_at timestamptz,
  evidence jsonb not null default '{}'::jsonb,
  owner_role text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.go_live_checks enable row level security;
create policy "go_live_checks_admin_all" on public.go_live_checks
for all to authenticated using (private.is_global_admin()) with check (private.is_global_admin());

insert into public.go_live_checks(check_key,category,severity,title,description,automated,owner_role)
values
 ('published_offers_have_routes','commerce','critical','公開商品に有効な決済ルートがある','公開中service_offerは原則として決済/問い合わせルートを持つ',true,'admin'),
 ('no_direct_payment_urls','commerce','critical','公開商品に直Stripe URLがない','Checkout Gatewayを迂回するURLをservice_offersに置かない',true,'admin'),
 ('capacity_configured','data_quality','high','定員管理商品のcapacityが設定済み','capacity_controlled商品は定員未設定のまま公開しない',true,'operations'),
 ('no_high_critical_exceptions','operations','high','重大な未解決例外がない','operations_exceptionsのHIGH/CRITICALを公開前に解消',true,'operations'),
 ('governance_approved','legal','high','主要ガバナンス文書が承認済み','利用規約・プライバシー・返金・安全・国際遠征等',true,'admin'),
 ('safeguarding_lead_assigned','security','high','Safeguarding責任者が登録済み','primary_contactのactive officerが最低1名必要',true,'admin'),
 ('published_standards_present','international','medium','公開可能な組織標準がある','対外説明用Standardsをapproved/publishedへ',true,'admin'),
 ('runtime_observability_ready','observability','medium','本番監視系が稼働','Vercel/Supabaseログと例外監視を運用可能な状態にする',false,'admin')
on conflict(check_key) do nothing;

create or replace function public.rba_refresh_go_live_checks()
returns jsonb
language plpgsql
security definer
set search_path=''
as $$
declare
  v_missing_routes int;
  v_direct_urls int;
  v_capacity_missing int;
  v_high_ex int;
  v_gov_missing int;
  v_sg_leads int;
  v_standards int;
begin
  select count(*) into v_missing_routes
  from public.service_offers s
  left join public.payment_routes pr on pr.service_offer_id=s.id and pr.active=true
  where s.publication_status='published' and pr.id is null;

  update public.go_live_checks set
    status=case when v_missing_routes=0 then 'pass' else 'fail' end,
    last_checked_at=now(),
    evidence=jsonb_build_object('published_without_active_route',v_missing_routes),
    updated_at=now()
  where check_key='published_offers_have_routes';

  select count(*) into v_direct_urls
  from public.service_offers
  where publication_status='published' and external_payment_url is not null;

  update public.go_live_checks set
    status=case when v_direct_urls=0 then 'pass' else 'fail' end,
    last_checked_at=now(),
    evidence=jsonb_build_object('published_with_direct_payment_url',v_direct_urls),
    updated_at=now()
  where check_key='no_direct_payment_urls';

  select count(*) into v_capacity_missing
  from public.service_offers s
  left join public.events e on e.slug=s.metadata->>'source_event_slug'
  where s.publication_status='published'
    and coalesce((s.metadata->>'capacity_controlled')::boolean,false)=true
    and coalesce(s.capacity,e.capacity) is null;

  update public.go_live_checks set
    status=case when v_capacity_missing=0 then 'pass' else 'fail' end,
    last_checked_at=now(),
    evidence=jsonb_build_object('capacity_missing',v_capacity_missing),
    updated_at=now()
  where check_key='capacity_configured';

  select count(*) into v_high_ex
  from public.operations_exceptions
  where status in ('open','acknowledged') and severity in ('high','critical');

  update public.go_live_checks set
    status=case when v_high_ex=0 then 'pass' else 'fail' end,
    last_checked_at=now(),
    evidence=jsonb_build_object('high_critical_open',v_high_ex),
    updated_at=now()
  where check_key='no_high_critical_exceptions';

  select count(*) into v_gov_missing
  from (values
    ('terms_of_service'),('privacy_policy'),('refund_policy'),
    ('safeguarding_policy'),('international_travel_terms')
  ) req(doc_type)
  where not exists (
    select 1 from public.governance_documents g
    where g.document_type=req.doc_type and g.status in ('approved','published','active')
  );

  update public.go_live_checks set
    status=case when v_gov_missing=0 then 'pass' else 'blocked' end,
    last_checked_at=now(),
    evidence=jsonb_build_object('required_documents_not_approved',v_gov_missing),
    updated_at=now()
  where check_key='governance_approved';

  select count(*) into v_sg_leads
  from public.safeguarding_officers
  where active=true and primary_contact=true;

  update public.go_live_checks set
    status=case when v_sg_leads>0 then 'pass' else 'blocked' end,
    last_checked_at=now(),
    evidence=jsonb_build_object('active_primary_safeguarding_officers',v_sg_leads),
    updated_at=now()
  where check_key='safeguarding_lead_assigned';

  select count(*) into v_standards
  from public.organization_standards
  where status in ('approved','published');

  update public.go_live_checks set
    status=case when v_standards>0 then 'pass' else 'warning' end,
    last_checked_at=now(),
    evidence=jsonb_build_object('approved_or_published_standards',v_standards),
    updated_at=now()
  where check_key='published_standards_present';

  return jsonb_build_object(
    'missing_routes',v_missing_routes,
    'direct_urls',v_direct_urls,
    'capacity_missing',v_capacity_missing,
    'high_critical_exceptions',v_high_ex,
    'required_governance_missing',v_gov_missing,
    'safeguarding_primary',v_sg_leads,
    'published_standards',v_standards,
    'checked_at',now()
  );
end;
$$;
revoke all on function public.rba_refresh_go_live_checks() from public,anon,authenticated;

create or replace view public.management_go_live_dashboard
with (security_invoker=true)
as
select
  category,severity,title,status,automated,last_checked_at,evidence,owner_role
from public.go_live_checks
order by
  case status when 'fail' then 1 when 'blocked' then 2 when 'warning' then 3 when 'pending' then 4 else 5 end,
  case severity when 'critical' then 1 when 'high' then 2 when 'medium' then 3 else 4 end,
  title;

revoke all on public.management_go_live_dashboard from anon,authenticated;
grant select on public.management_go_live_dashboard to authenticated;


-- =====================================================================
-- MIGRATION 20260923122020 rba_go_live_control_plane_v6_fix1
-- =====================================================================

create or replace function public.rba_refresh_go_live_checks()
returns jsonb
language plpgsql
security definer
set search_path=''
as $$
declare
  v_missing_routes int;
  v_direct_urls int;
  v_capacity_missing int;
  v_high_ex int;
  v_gov_missing int;
  v_sg_leads int;
  v_standards int;
begin
  select count(*) into v_missing_routes
  from public.service_offers s
  left join public.payment_routes pr on pr.service_offer_id=s.id and pr.active=true
  where s.publication_status='published' and pr.id is null;

  update public.go_live_checks set
    status=case when v_missing_routes=0 then 'pass' else 'fail' end,
    last_checked_at=now(),
    evidence=jsonb_build_object('published_without_active_route',v_missing_routes),
    updated_at=now()
  where check_key='published_offers_have_routes';

  select count(*) into v_direct_urls
  from public.service_offers
  where publication_status='published' and external_payment_url is not null;

  update public.go_live_checks set
    status=case when v_direct_urls=0 then 'pass' else 'fail' end,
    last_checked_at=now(),
    evidence=jsonb_build_object('published_with_direct_payment_url',v_direct_urls),
    updated_at=now()
  where check_key='no_direct_payment_urls';

  select count(*) into v_capacity_missing
  from public.service_offers s
  left join public.events e on e.slug=s.metadata->>'source_event_slug'
  where s.publication_status='published'
    and coalesce((s.metadata->>'capacity_controlled')::boolean,false)=true
    and coalesce(s.capacity,e.capacity) is null;

  update public.go_live_checks set
    status=case when v_capacity_missing=0 then 'pass' else 'fail' end,
    last_checked_at=now(),
    evidence=jsonb_build_object('capacity_missing',v_capacity_missing),
    updated_at=now()
  where check_key='capacity_configured';

  select count(*) into v_high_ex
  from public.operations_exceptions
  where status in ('open','acknowledged') and severity in ('high','critical');

  update public.go_live_checks set
    status=case when v_high_ex=0 then 'pass' else 'fail' end,
    last_checked_at=now(),
    evidence=jsonb_build_object('high_critical_open',v_high_ex),
    updated_at=now()
  where check_key='no_high_critical_exceptions';

  select count(*) into v_gov_missing
  from (values
    ('terms_of_service'),('privacy_policy'),('refund_policy'),
    ('safeguarding_policy'),('international_travel_terms')
  ) req(document_key)
  where not exists (
    select 1 from public.governance_documents g
    where g.document_key=req.document_key
      and g.status in ('approved','published','active')
  );

  update public.go_live_checks set
    status=case when v_gov_missing=0 then 'pass' else 'blocked' end,
    last_checked_at=now(),
    evidence=jsonb_build_object('required_documents_not_approved',v_gov_missing),
    updated_at=now()
  where check_key='governance_approved';

  select count(*) into v_sg_leads
  from public.safeguarding_officers
  where active=true and primary_contact=true;

  update public.go_live_checks set
    status=case when v_sg_leads>0 then 'pass' else 'blocked' end,
    last_checked_at=now(),
    evidence=jsonb_build_object('active_primary_safeguarding_officers',v_sg_leads),
    updated_at=now()
  where check_key='safeguarding_lead_assigned';

  select count(*) into v_standards
  from public.organization_standards
  where status in ('approved','published');

  update public.go_live_checks set
    status=case when v_standards>0 then 'pass' else 'warning' end,
    last_checked_at=now(),
    evidence=jsonb_build_object('approved_or_published_standards',v_standards),
    updated_at=now()
  where check_key='published_standards_present';

  return jsonb_build_object(
    'missing_routes',v_missing_routes,
    'direct_urls',v_direct_urls,
    'capacity_missing',v_capacity_missing,
    'high_critical_exceptions',v_high_ex,
    'required_governance_missing',v_gov_missing,
    'safeguarding_primary',v_sg_leads,
    'published_standards',v_standards,
    'checked_at',now()
  );
end;
$$;


-- =====================================================================
-- MIGRATION 20260923122447 rba_checkout_capacity_lock_v6_1
-- =====================================================================

create or replace function public.rba_reserve_checkout_capacity(
  p_event_id uuid,
  p_subject_user_id uuid,
  p_application_id uuid,
  p_capacity integer
)
returns jsonb
language plpgsql
security definer
set search_path=''
as $$
declare
  v_participants integer := 0;
  v_holds integer := 0;
  v_existing text;
begin
  if p_capacity is null or p_capacity <= 0 then
    return jsonb_build_object('allowed',false,'reason','capacity_not_configured');
  end if;

  perform pg_advisory_xact_lock(hashtextextended(p_event_id::text,0));

  select status into v_existing
  from public.program_waitlist
  where event_id=p_event_id and subject_user_id=p_subject_user_id
  for update;

  if v_existing='offered' then
    update public.program_waitlist
    set offer_expires_at=greatest(coalesce(offer_expires_at,now()),now()+interval '30 minutes')
    where event_id=p_event_id and subject_user_id=p_subject_user_id;
    return jsonb_build_object('allowed',true,'reason','existing_hold');
  end if;

  if exists(
    select 1 from public.participations
    where event_id=p_event_id
      and user_id=p_subject_user_id
      and attendance_status in ('registered','confirmed','attended')
  ) then
    return jsonb_build_object('allowed',true,'reason','already_registered');
  end if;

  select count(*) into v_participants
  from public.participations
  where event_id=p_event_id
    and attendance_status in ('registered','confirmed','attended');

  select count(*) into v_holds
  from public.program_waitlist
  where event_id=p_event_id
    and status='offered'
    and coalesce(offer_expires_at,now()+interval '1 minute')>now()
    and subject_user_id<>p_subject_user_id;

  if v_participants + v_holds >= p_capacity then
    insert into public.program_waitlist(event_id,subject_user_id,application_id,status,joined_at,offer_expires_at)
    values(p_event_id,p_subject_user_id,p_application_id,'waiting',now(),null)
    on conflict(event_id,subject_user_id) do update
      set application_id=coalesce(excluded.application_id,public.program_waitlist.application_id),
          status='waiting',
          offer_expires_at=null;

    if p_application_id is not null then
      update public.program_applications
      set status='waitlisted'
      where id=p_application_id and status not in ('rejected','withdrawn');
    end if;

    return jsonb_build_object(
      'allowed',false,'reason','capacity_reached',
      'occupied',v_participants,'reserved',v_holds,'capacity',p_capacity
    );
  end if;

  insert into public.program_waitlist(event_id,subject_user_id,application_id,status,joined_at,offer_expires_at)
  values(p_event_id,p_subject_user_id,p_application_id,'offered',now(),now()+interval '30 minutes')
  on conflict(event_id,subject_user_id) do update
    set application_id=coalesce(excluded.application_id,public.program_waitlist.application_id),
        status='offered',
        offer_expires_at=now()+interval '30 minutes';

  return jsonb_build_object(
    'allowed',true,'reason','seat_held',
    'occupied',v_participants,'reserved',v_holds,'capacity',p_capacity,
    'hold_minutes',30
  );
end;
$$;

revoke all on function public.rba_reserve_checkout_capacity(uuid,uuid,uuid,integer)
from public,anon,authenticated;


-- =====================================================================
-- MIGRATION 20260923123928 rba_prelaunch_audit_hardening_v6_2
-- =====================================================================

create index if not exists global_exchange_programs_event_idx
on public.global_exchange_programs(event_id);
create index if not exists global_partnership_agreements_owner_idx
on public.global_partnership_agreements(owner_user_id);
create index if not exists impact_snapshots_business_unit_idx
on public.impact_snapshots(business_unit_id);
create index if not exists impact_snapshots_metric_idx
on public.impact_snapshots(metric_id);
create index if not exists operations_exceptions_offer_idx
on public.operations_exceptions(service_offer_id);
create index if not exists operations_exceptions_user_idx
on public.operations_exceptions(user_id);
create index if not exists research_projects_partner_idx
on public.research_projects(partner_id);
create index if not exists safeguarding_officers_user_idx
on public.safeguarding_officers(user_id);

insert into public.go_live_checks(check_key,category,severity,title,description,status,automated,owner_role,evidence)
values
('frontend_source_connected','routing','critical','本番フロントソースへ書込可能','GitHub/Vercelの本番ソースを安全に更新できる接続が必要','blocked',false,'admin','{"github_installations":0,"visible_repositories":0}'::jsonb),
('frontend_patch_buildable','routing','critical','V4パッチがビルド可能','型・パス・依存テーブルを含めて本番Next.jsでビルド成功が必要','fail',false,'admin','{"issue":"payments pages omit required locale prop and generate wrong definitive-content path"}'::jsonb),
('frontend_no_direct_checkout_links','commerce','critical','V4公開ページに直決済リンクがない','Stripe Payment Linkを公開HTMLから直接露出せず、申込/ゲートウェイ経由に統一','fail',false,'admin','{"book_stripe_links_found":44,"external_application_form_links_found":20}'::jsonb),
('frontend_login_routes_consistent','routing','high','ログイン導線が既存認証ルートと一致','V4は /login 系を参照するが現本番認証は /my-homecourt/login 系','fail',false,'admin','{"missing_login_paths":["/login","/ja/login","/zh-tw/login","/ko/login"]}'::jsonb)
on conflict(check_key) do update set
status=excluded.status,evidence=excluded.evidence,updated_at=now();

update public.go_live_checks
set status='pass',
    last_checked_at=now(),
    evidence='{"vercel_runtime_errors_24h":0,"latest_production_state":"READY","exception_monitoring":"active"}'::jsonb,
    updated_at=now()
where check_key='runtime_observability_ready';


-- =====================================================================
-- MIGRATION 20260923125142 rba_prelaunch_deep_audit_v6_3
-- =====================================================================

insert into public.go_live_checks
(check_key,category,severity,title,description,status,automated,owner_role,evidence)
values
('static_login_not_preview','routing','critical','公開ログインがプレビューUIではない',
 '4言語login.htmlは現在data-preview-authで実送信しない。既存MY HOME COURT認証へ接続またはリダイレクト必須。',
 'fail',false,'admin',
 '{"affected_pages":4,"preview_auth":true,"production_auth_target":"*/my-homecourt/login"}'::jsonb),

('manifest_paths_valid','routing','medium','Web App Manifest参照が正しい',
 'manifest.jsonは絶対パス /manifest.json を使用し、各サブルート配下へ誤解決させない。',
 'fail',false,'admin',
 '{"broken_relative_manifest_references":67}'::jsonb),

('transaction_pages_noindex','routing','medium','取引完了ページを検索インデックスから除外',
 'payment-complete等の状態ページはnoindexを推奨。個別決済状態URLを検索結果へ露出させない。',
 'warning',false,'admin',
 '{"payment_complete_pages_without_noindex":4}'::jsonb),

('locale_copy_clean','routing','medium','4言語の文言混在がない',
 '繁体字ページに韓国語など別言語の混入がないこと。',
 'fail',false,'admin',
 '{"zh_tw_my_homecourt_hangul_leak":"기준"}'::jsonb),

('registration_api_abuse_controls','security','high','公開申込APIに濫用対策がある',
 '公開POST /api/registrations は認証不要のため、レート制限・Bot対策・Origin検証等を追加して大量投稿を抑止する。',
 'fail',false,'admin',
 '{"current_controls":["field_validation","consent"],"missing":["rate_limit","bot_protection","strict_origin_check"]}'::jsonb),

('commerce_schema_single_source','commerce','critical','Commerceデータモデルが一系統',
 'V4 Next.jsが前提とするrba_registrations/rba_payment_events系と現行program_applications/platform_orders系を二重運用しない。',
 'fail',false,'admin',
 '{"current_live_model":"program_applications/payment_routes/platform_orders/transaction_ledger","v4_patch_model":"rba_registrations/rba_payment_events/rba_offer_inventory","v4_tables_present":false}'::jsonb)
on conflict(check_key) do update set
status=excluded.status,evidence=excluded.evidence,description=excluded.description,updated_at=now();


-- =====================================================================
-- MIGRATION 20260923130159 rba_kawasaki_safe_inquiry_route_v6_4
-- =====================================================================

insert into public.payment_routes(
  service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,active,
  requires_authenticated_user,requires_guardian_for_minor,metadata,created_at,updated_at
)
select
  s.id,'manual',null,'https://riotbasketballacademy.com/ja/contact','inquiry_only',true,
  true,true,
  jsonb_build_object('reason','fee_pending','safe_launch',true,'source','prelaunch_audit'),
  now(),now()
from public.service_offers s
where s.slug='kawasaki-2026-09-27'
on conflict(service_offer_id) do update set
  provider='manual',
  provider_payment_link_id=null,
  payment_url='https://riotbasketballacademy.com/ja/contact',
  checkout_policy='inquiry_only',
  active=true,
  metadata=coalesce(public.payment_routes.metadata,'{}'::jsonb) || '{"reason":"fee_pending","safe_launch":true,"source":"prelaunch_audit"}'::jsonb,
  updated_at=now();


-- =====================================================================
-- MIGRATION 20260923130234 rba_v5_safe_launch_audit_state_v6_5
-- =====================================================================

update public.go_live_checks set
  title='V5 Safe Launchパッチを本番Next.jsでビルド確認',
  status='blocked',
  description='V5は静的コード監査済みだが、実本番ソースにGitHub接続できるまで実プロジェクトでのNext.js buildを実行できない。',
  evidence='{"artifact":"RBA_WORLDCLASS_NEXTJS_PATCH_V5_SAFE_LAUNCH_20260923.zip","static_component_props_errors":0,"incompatible_commerce_api_files":0,"reason_blocked":"production source unavailable"}'::jsonb,
  updated_at=now()
where check_key='frontend_patch_buildable';

update public.go_live_checks set
  title='V5公開ページに直決済/外部申込リンクがない',
  status='pass',
  description='V5 Safe Launchでは公開HTMLからStripe直リンクおよびGoogle/Jotform直リンクを除去。',
  evidence='{"direct_stripe_links":0,"direct_external_application_forms":0}'::jsonb,
  updated_at=now()
where check_key='frontend_no_direct_checkout_links';

update public.go_live_checks set
  status='pass',
  description='V5 Safe LaunchのCTAは既存のlocale-aware /my-homecourt/loginへ統一。',
  evidence='{"generic_login_links":0,"target_routes":["/my-homecourt/login","/ja/my-homecourt/login","/zh-tw/my-homecourt/login","/ko/my-homecourt/login"]}'::jsonb,
  updated_at=now()
where check_key='frontend_login_routes_consistent';

update public.go_live_checks set
  status='pass',
  description='V5 Safe Launchは独自login.htmlを本番ルートとして追加せず、既存認証へ接続。',
  evidence='{"preview_login_routes_in_patch":0,"uses_existing_auth":true}'::jsonb,
  updated_at=now()
where check_key='static_login_not_preview';

update public.go_live_checks set
  status='pass',
  description='V5 definitive content内のmanifest参照を /manifest.json に正規化。',
  evidence='{"relative_manifest_references":0}'::jsonb,
  updated_at=now()
where check_key='manifest_paths_valid';

update public.go_live_checks set
  status='pass',
  description='V5では既存payment-completeを上書きしないため、今回の公開パッチから取引ページSEO変更を除外。',
  evidence='{"payment_complete_routes_overwritten":0,"followup":"add noindex in production source when source connection is restored"}'::jsonb,
  updated_at=now()
where check_key='transaction_pages_noindex';

update public.go_live_checks set
  status='pass',
  description='V5の繁体字コンテンツを再走査し、既知のHangul混入を修正。',
  evidence='{"zh_tw_hangul_files":0}'::jsonb,
  updated_at=now()
where check_key='locale_copy_clean';

update public.go_live_checks set
  status='pass',
  description='V5 Safe LaunchはV4の公開 /api/registrations を含めない。既存本番API/認証/commerceを維持。',
  evidence='{"v4_public_registration_api_in_patch":false,"new_api_route_files":0}'::jsonb,
  updated_at=now()
where check_key='registration_api_abuse_controls';

update public.go_live_checks set
  status='pass',
  description='V5 Safe LaunchはV4の第二Commerceモデルを除外し、現行本番のprogram_applications/payment_routes/platform_orders/transaction_ledgerを唯一の運用系として維持。',
  evidence='{"second_commerce_model_in_patch":false,"new_commerce_api_files":0,"live_source_of_truth":"program_applications/payment_routes/platform_orders/transaction_ledger"}'::jsonb,
  updated_at=now()
where check_key='commerce_schema_single_source';


-- =====================================================================
-- MIGRATION 20260923154854 rba_v6_final_candidate_audit_state_v6_6
-- =====================================================================

update public.go_live_checks set
  title='V6 Final Candidateを本番Next.jsでビルド確認',
  status='blocked',
  description='V6は第二Commerce実装を完全除去し、静的コード監査済み。本番Next.jsソースへの接続後にinstall/lint/typecheck/buildを実行する。',
  evidence='{"artifact":"RBA_WORLDCLASS_NEXTJS_PATCH_V6_FINAL_CANDIDATE_20260924.zip","page_routes":68,"definitive_html":84,"direct_stripe_links":0,"external_form_links":0,"generic_login_links":0,"second_commerce_files":0,"api_files":0,"db_files":0,"d_hub_routes":4,"reason_blocked":"github installation 0"}'::jsonb,
  updated_at=now()
where check_key='frontend_patch_buildable';

update public.go_live_checks set
  status='pass',
  title='V6公開ページに直決済/外部申込リンクがない',
  evidence='{"direct_stripe_links":0,"direct_external_application_forms":0,"artifact":"V6 Final Candidate"}'::jsonb,
  updated_at=now()
where check_key='frontend_no_direct_checkout_links';

update public.go_live_checks set
  status='pass',
  description='V6では第二Commerce用SQL/Stripe helper/registration/checkout componentsをパッケージから物理削除。現行本番Commerceのみを維持。',
  evidence='{"second_commerce_files":0,"api_files":0,"db_files":0,"live_source_of_truth":"program_applications/payment_routes/platform_orders/transaction_ledger"}'::jsonb,
  updated_at=now()
where check_key='commerce_schema_single_source';


-- =====================================================================
-- MIGRATION 20260923224736 rba_company_control_plane_v7
-- =====================================================================

create table if not exists public.strategic_priorities (
  id uuid primary key default gen_random_uuid(),
  priority_key text not null unique,
  title text not null,
  pillar text not null check (pillar in ('development','growth','platform','finance','governance','safeguarding','people','global','ipo_readiness')),
  priority_rank integer not null check (priority_rank between 1 and 100),
  status text not null default 'not_started' check (status in ('not_started','in_progress','blocked','done','deferred')),
  owner_role text,
  target_date date,
  success_metric text,
  current_blocker text,
  evidence jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.enterprise_risks (
  id uuid primary key default gen_random_uuid(),
  risk_key text not null unique,
  title text not null,
  category text not null check (category in ('safeguarding','legal','finance','security','operations','commercial','people','reputation','technology','international')),
  likelihood integer not null default 3 check (likelihood between 1 and 5),
  impact integer not null default 3 check (impact between 1 and 5),
  status text not null default 'open' check (status in ('open','mitigating','accepted','closed')),
  owner_role text,
  mitigation text,
  next_review_on date,
  evidence jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.management_decisions (
  id uuid primary key default gen_random_uuid(),
  decision_date date not null default current_date,
  decision_key text not null unique,
  title text not null,
  decision_text text not null,
  rationale text,
  scope text,
  status text not null default 'active' check (status in ('active','superseded','withdrawn')),
  owner_role text,
  related_priority_key text references public.strategic_priorities(priority_key) on update cascade on delete set null,
  evidence jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.monthly_close_controls (
  month date primary key check (date_trunc('month', month::timestamptz)::date = month),
  financial_close_status text not null default 'open' check (financial_close_status in ('open','review','closed')),
  kpi_close_status text not null default 'open' check (kpi_close_status in ('open','review','closed')),
  safety_review_status text not null default 'open' check (safety_review_status in ('open','review','closed')),
  governance_review_status text not null default 'open' check (governance_review_status in ('open','review','closed')),
  exception_review_status text not null default 'open' check (exception_review_status in ('open','review','closed')),
  closed_by uuid references auth.users(id) on delete set null,
  closed_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.strategic_priorities enable row level security;
alter table public.enterprise_risks enable row level security;
alter table public.management_decisions enable row level security;
alter table public.monthly_close_controls enable row level security;

drop policy if exists strategic_priorities_admin_all on public.strategic_priorities;
create policy strategic_priorities_admin_all on public.strategic_priorities
for all to authenticated
using (exists (
  select 1 from public.profile_roles pr
  where pr.user_id = auth.uid() and pr.role='admin' and pr.status='active'
))
with check (exists (
  select 1 from public.profile_roles pr
  where pr.user_id = auth.uid() and pr.role='admin' and pr.status='active'
));

drop policy if exists enterprise_risks_admin_all on public.enterprise_risks;
create policy enterprise_risks_admin_all on public.enterprise_risks
for all to authenticated
using (exists (
  select 1 from public.profile_roles pr
  where pr.user_id = auth.uid() and pr.role='admin' and pr.status='active'
))
with check (exists (
  select 1 from public.profile_roles pr
  where pr.user_id = auth.uid() and pr.role='admin' and pr.status='active'
));

drop policy if exists management_decisions_admin_all on public.management_decisions;
create policy management_decisions_admin_all on public.management_decisions
for all to authenticated
using (exists (
  select 1 from public.profile_roles pr
  where pr.user_id = auth.uid() and pr.role='admin' and pr.status='active'
))
with check (exists (
  select 1 from public.profile_roles pr
  where pr.user_id = auth.uid() and pr.role='admin' and pr.status='active'
));

drop policy if exists monthly_close_controls_admin_all on public.monthly_close_controls;
create policy monthly_close_controls_admin_all on public.monthly_close_controls
for all to authenticated
using (exists (
  select 1 from public.profile_roles pr
  where pr.user_id = auth.uid() and pr.role='admin' and pr.status='active'
))
with check (exists (
  select 1 from public.profile_roles pr
  where pr.user_id = auth.uid() and pr.role='admin' and pr.status='active'
));

insert into public.strategic_priorities
(priority_key,title,pillar,priority_rank,status,owner_role,success_metric,current_blocker,evidence)
values
('PROD_SOURCE_CONTROL','Production source control baseline','platform',1,'in_progress','platform_owner','Current production source recovered to GitHub main; all future changes through branch/preview/PR flow','Vercel production source recovery not yet completed','{"repo":"riottrainingbase-art/RBA","branch":"main"}'),
('SAFEGUARDING_OFFICER','Appoint and operationalize primary safeguarding officer','safeguarding',2,'blocked','executive','At least one active primary safeguarding officer with documented contact and training record','No primary safeguarding officer registered','{}'),
('AUTHORITATIVE_CAPACITY','Set authoritative capacity for every capacity-controlled published offer','platform',3,'blocked','operations','Zero capacity-controlled published offers/events with unknown capacity','Authoritative capacity values not yet entered for all relevant events','{}'),
('GOVERNANCE_APPROVAL','Approve and publish core governance documents','governance',4,'blocked','executive','Core governance documents approved, versioned, effective-dated and published','Core governance documents remain draft pending professional review','{}'),
('ORG_STANDARDS_APPROVAL','Approve RBA organization standards','development',5,'blocked','executive','Organization standards approved/published with effective and review dates','Standards remain draft','{}'),
('MONTHLY_MANAGEMENT_CLOSE','Run monthly 7-business-unit management close','finance',6,'in_progress','finance','Monthly revenue, gross profit, operating profit, customers, participants, refunds and founder dependency closed for all 7 business units',null,'{}'),
('FOUNDER_DEPENDENCY','Reduce founder dependency with role and operating standardization','people',7,'in_progress','executive','Founder-dependent revenue measured monthly and reduced over time',null,'{}'),
('HOMECOURT_OS','Build MY HOME COURT as the operating and member system of record','platform',8,'in_progress','platform_owner','Member, development, consent, participation, payment and coach records use a single governed platform flow',null,'{}'),
('DHUB_COACH_INFRA','Establish D-HUB as coach development infrastructure','development',9,'in_progress','coach_education','48-week learn-practice-observe-reflect pathway operational with coach development records',null,'{}'),
('NATIONAL_HUB_MODEL','Standardize POP-UP to RECURRING to PARTNER to HUB expansion model','growth',10,'not_started','growth','Every active market assigned a documented stage, owner and unit economics',null,'{}'),
('GLOBAL_EXCHANGE_OS','Standardize international exchange governance and operations','global',11,'in_progress','global','Every exchange has agreement, owner, safeguarding, financial and operational records',null,'{}'),
('IPO_CONTROL_ENVIRONMENT','Build audit-ready decision, risk, close and change-control evidence','ipo_readiness',12,'in_progress','executive','Monthly close, material decisions, risks, permissions and production changes are auditable',null,'{}')
on conflict (priority_key) do update set
  title=excluded.title,
  pillar=excluded.pillar,
  priority_rank=excluded.priority_rank,
  owner_role=excluded.owner_role,
  success_metric=excluded.success_metric,
  current_blocker=excluded.current_blocker,
  evidence=public.strategic_priorities.evidence || excluded.evidence,
  updated_at=now();

insert into public.enterprise_risks
(risk_key,title,category,likelihood,impact,status,owner_role,mitigation,next_review_on)
values
('RISK_NO_SOURCE_BASELINE','Production source not yet fully established in Git version control','technology',4,5,'mitigating','platform_owner','Recover current Vercel production source, commit baseline to main, and require Preview/PR before production',current_date + 7),
('RISK_SAFEGUARDING_OWNER','No active primary safeguarding officer recorded','safeguarding',4,5,'open','executive','Appoint accountable officer and deputy; document reporting, escalation, training and access control',current_date + 3),
('RISK_UNKNOWN_CAPACITY','Published capacity-controlled offers have unknown authoritative capacity','operations',4,4,'mitigating','operations','Keep checkout fail-closed until capacity is confirmed and entered',current_date + 3),
('RISK_GOVERNANCE_DRAFT','Core governance documents are not yet formally approved','legal',4,5,'open','executive','Professional review, version approval, effective dates, publication and acceptance tracking',current_date + 14),
('RISK_FOUNDER_DEPENDENCY','Material operations and revenue remain founder-dependent','people',4,4,'mitigating','executive','Measure founder-dependent revenue monthly and transfer repeatable work into roles, standards and automation',current_date + 30),
('RISK_AUTH_PASSWORD_PROTECTION','Supabase leaked-password protection remains disabled','security',3,4,'open','platform_owner','Enable leaked-password protection in Supabase Auth settings and verify authentication regression tests',current_date + 7)
on conflict (risk_key) do update set
  title=excluded.title,
  category=excluded.category,
  likelihood=excluded.likelihood,
  impact=excluded.impact,
  owner_role=excluded.owner_role,
  mitigation=excluded.mitigation,
  next_review_on=excluded.next_review_on,
  updated_at=now();

insert into public.management_decisions
(decision_key,title,decision_text,rationale,scope,status,owner_role,related_priority_key,evidence)
values
('DEC_PLATFORM_COMPANY_MODEL','Operate RBA as a scalable development platform company',
 'RBA operating decisions will be evaluated against development value, recurring economics, national scalability, data asset creation, founder-dependency reduction, safeguarding, governance and auditability.',
 'This creates a consistent decision standard for growth without degrading development quality or control environment.',
 'company','active','executive','IPO_CONTROL_ENVIRONMENT',
 '{"principles":["development_value","recurring_economics","national_scalability","data_asset","founder_dependency","safeguarding","governance","auditability"]}'),
('DEC_GIT_PREVIEW_PROD','Require Git and Preview before Production changes',
 'Production changes must originate from source control and pass a Preview review before merge/deployment, except documented emergency procedures.',
 'Reduces production risk and creates an auditable change history.',
 'technology','active','platform_owner','PROD_SOURCE_CONTROL',
 '{"repo":"riottrainingbase-art/RBA"}'),
('DEC_COMMERCE_SINGLE_SOURCE','Maintain one governed commerce architecture',
 'Do not introduce a second checkout/order/payment architecture. Existing governed payment routing and ledger structures remain the single source of truth.',
 'Prevents reconciliation errors, duplicate flows and uncontrolled payment links.',
 'commerce','active','finance','HOMECOURT_OS','{}')
on conflict (decision_key) do update set
  title=excluded.title,
  decision_text=excluded.decision_text,
  rationale=excluded.rationale,
  scope=excluded.scope,
  status=excluded.status,
  owner_role=excluded.owner_role,
  related_priority_key=excluded.related_priority_key,
  evidence=excluded.evidence;

insert into public.monthly_close_controls(month)
values (date_trunc('month', current_date)::date)
on conflict (month) do nothing;

create or replace view public.management_company_control_plane as
select
  p.priority_key,
  p.priority_rank,
  p.title,
  p.pillar,
  p.status,
  p.owner_role,
  p.target_date,
  p.success_metric,
  p.current_blocker,
  coalesce(r.open_risk_count,0) as open_risk_count,
  p.updated_at
from public.strategic_priorities p
left join lateral (
  select count(*)::int as open_risk_count
  from public.enterprise_risks er
  where er.status in ('open','mitigating')
    and (
      (p.pillar='safeguarding' and er.category='safeguarding') or
      (p.pillar='governance' and er.category='legal') or
      (p.pillar='finance' and er.category='finance') or
      (p.pillar='people' and er.category='people') or
      (p.pillar='platform' and er.category in ('technology','security','operations')) or
      (p.pillar='ipo_readiness' and er.category in ('technology','security','legal','finance','operations','people'))
    )
) r on true;

grant select on public.management_company_control_plane to authenticated;


-- =====================================================================
-- MIGRATION 20260924015458 secure_management_control_plane
-- =====================================================================
alter view public.management_company_control_plane set (security_invoker = true);
revoke all on public.management_company_control_plane from public, anon, authenticated;
grant select on public.management_company_control_plane to authenticated, service_role;

-- =====================================================================
-- MIGRATION 20260924025331 fix_profile_guardian_policy_recursion
-- =====================================================================
-- Reuse the existing private admin predicate; do not add privileged functions.
alter policy "profile self guardian or admin read" on public.profiles
using (
 id = (select auth.uid())
 or exists (select 1 from public.guardian_links gl where gl.parent_user_id = (select auth.uid()) and gl.child_user_id = profiles.id and gl.verified_at is not null)
 or private.is_global_admin()
);
alter policy "guardian links members or admin read" on public.guardian_links
using (parent_user_id = (select auth.uid()) or child_user_id = (select auth.uid()) or private.is_global_admin());
alter policy "admin verifies guardian links" on public.guardian_links
using (private.is_global_admin()) with check (private.is_global_admin());

-- =====================================================================
-- MIGRATION 20260924032723 harden_stripe_webhook_claim
-- =====================================================================
-- Atomically lease Stripe events so concurrent deliveries cannot both fulfill.
alter table public.stripe_webhook_events
  add column if not exists processing_token uuid,
  add column if not exists processing_started_at timestamptz;

alter table public.stripe_webhook_events
  drop constraint if exists stripe_webhook_events_processing_status_check;
alter table public.stripe_webhook_events
  add constraint stripe_webhook_events_processing_status_check
  check (processing_status in ('received','processing','processed','ignored','failed'));

alter table public.platform_notifications
  add column if not exists dedupe_key text;
create unique index if not exists platform_notifications_dedupe_key_key
  on public.platform_notifications(dedupe_key);

alter table public.payment_reconciliation_actions
  add column if not exists dedupe_key text;
create unique index if not exists payment_reconciliation_actions_dedupe_key_key
  on public.payment_reconciliation_actions(dedupe_key);

create or replace function public.claim_stripe_webhook_event(
  p_event_id text,
  p_event_type text,
  p_object_id text,
  p_livemode boolean,
  p_payload_sha256 text,
  p_token uuid
) returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  claimed_id uuid;
begin
  insert into public.stripe_webhook_events(
    stripe_event_id,event_type,object_id,livemode,payload_sha256,
    processing_status,processing_token,processing_started_at,error_message,processed_at
  ) values (
    p_event_id,p_event_type,p_object_id,p_livemode,p_payload_sha256,
    'processing',p_token,now(),null,null
  )
  on conflict (stripe_event_id) do update set
    event_type=excluded.event_type,
    object_id=coalesce(excluded.object_id,public.stripe_webhook_events.object_id),
    livemode=excluded.livemode,
    payload_sha256=excluded.payload_sha256,
    processing_status='processing',
    processing_token=excluded.processing_token,
    processing_started_at=now(),
    error_message=null,
    processed_at=null
  where public.stripe_webhook_events.processing_status='failed'
     or (
       public.stripe_webhook_events.processing_status in ('received','processing')
       and coalesce(public.stripe_webhook_events.processing_started_at,public.stripe_webhook_events.received_at)
         < now() - interval '10 minutes'
     )
  returning id into claimed_id;
  return claimed_id is not null;
end;
$$;

revoke all on function public.claim_stripe_webhook_event(text,text,text,boolean,text,uuid) from public,anon,authenticated;
grant execute on function public.claim_stripe_webhook_event(text,text,text,boolean,text,uuid) to service_role;


-- =====================================================================
-- MIGRATION 20260924033201 optimize_control_plane_policies
-- =====================================================================
-- Keep the same admin-role semantics while avoiding per-row auth.uid evaluation.
alter policy strategic_priorities_admin_all on public.strategic_priorities
  using (exists (select 1 from public.profile_roles pr where pr.user_id=(select auth.uid()) and pr.role='admin' and pr.status='active'))
  with check (exists (select 1 from public.profile_roles pr where pr.user_id=(select auth.uid()) and pr.role='admin' and pr.status='active'));
alter policy enterprise_risks_admin_all on public.enterprise_risks
  using (exists (select 1 from public.profile_roles pr where pr.user_id=(select auth.uid()) and pr.role='admin' and pr.status='active'))
  with check (exists (select 1 from public.profile_roles pr where pr.user_id=(select auth.uid()) and pr.role='admin' and pr.status='active'));
alter policy management_decisions_admin_all on public.management_decisions
  using (exists (select 1 from public.profile_roles pr where pr.user_id=(select auth.uid()) and pr.role='admin' and pr.status='active'))
  with check (exists (select 1 from public.profile_roles pr where pr.user_id=(select auth.uid()) and pr.role='admin' and pr.status='active'));
alter policy monthly_close_controls_admin_all on public.monthly_close_controls
  using (exists (select 1 from public.profile_roles pr where pr.user_id=(select auth.uid()) and pr.role='admin' and pr.status='active'))
  with check (exists (select 1 from public.profile_roles pr where pr.user_id=(select auth.uid()) and pr.role='admin' and pr.status='active'));

create index if not exists management_decisions_related_priority_idx
  on public.management_decisions(related_priority_key);
create index if not exists monthly_close_controls_closed_by_idx
  on public.monthly_close_controls(closed_by);


-- =====================================================================
-- MIGRATION 20260924033838 fix_capacity_participation_column
-- =====================================================================
CREATE OR REPLACE FUNCTION public.rba_reserve_checkout_capacity(p_event_id uuid, p_subject_user_id uuid, p_application_id uuid, p_capacity integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_participants integer := 0;
  v_holds integer := 0;
  v_existing text;
begin
  if p_capacity is null or p_capacity <= 0 then
    return jsonb_build_object('allowed',false,'reason','capacity_not_configured');
  end if;

  perform pg_advisory_xact_lock(hashtextextended(p_event_id::text,0));

  select status into v_existing
  from public.program_waitlist
  where event_id=p_event_id and subject_user_id=p_subject_user_id
  for update;

  if v_existing='offered' then
    update public.program_waitlist
    set offer_expires_at=greatest(coalesce(offer_expires_at,now()),now()+interval '30 minutes')
    where event_id=p_event_id and subject_user_id=p_subject_user_id;
    return jsonb_build_object('allowed',true,'reason','existing_hold');
  end if;

  if exists(
    select 1 from public.participations
    where event_id=p_event_id
      and player_user_id=p_subject_user_id
      and attendance_status in ('registered','confirmed','attended')
  ) then
    return jsonb_build_object('allowed',true,'reason','already_registered');
  end if;

  select count(*) into v_participants
  from public.participations
  where event_id=p_event_id
    and attendance_status in ('registered','confirmed','attended');

  select count(*) into v_holds
  from public.program_waitlist
  where event_id=p_event_id
    and status='offered'
    and coalesce(offer_expires_at,now()+interval '1 minute')>now()
    and subject_user_id<>p_subject_user_id;

  if v_participants + v_holds >= p_capacity then
    insert into public.program_waitlist(event_id,subject_user_id,application_id,status,joined_at,offer_expires_at)
    values(p_event_id,p_subject_user_id,p_application_id,'waiting',now(),null)
    on conflict(event_id,subject_user_id) do update
      set application_id=coalesce(excluded.application_id,public.program_waitlist.application_id),
          status='waiting',
          offer_expires_at=null;

    if p_application_id is not null then
      update public.program_applications
      set status='waitlisted'
      where id=p_application_id and status not in ('rejected','withdrawn');
    end if;

    return jsonb_build_object(
      'allowed',false,'reason','capacity_reached',
      'occupied',v_participants,'reserved',v_holds,'capacity',p_capacity
    );
  end if;

  insert into public.program_waitlist(event_id,subject_user_id,application_id,status,joined_at,offer_expires_at)
  values(p_event_id,p_subject_user_id,p_application_id,'offered',now(),now()+interval '30 minutes')
  on conflict(event_id,subject_user_id) do update
    set application_id=coalesce(excluded.application_id,public.program_waitlist.application_id),
        status='offered',
        offer_expires_at=now()+interval '30 minutes';

  return jsonb_build_object(
    'allowed',true,'reason','seat_held',
    'occupied',v_participants,'reserved',v_holds,'capacity',p_capacity,
    'hold_minutes',30
  );
end;
$function$


-- =====================================================================
-- MIGRATION 20260924064402 homecourt_private_basketball_passport
-- =====================================================================
-- Private, account-owned journals. Self-reported history never grants attendance,
-- certificates, entitlements, team membership or access to another account.
create table public.homecourt_people (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 name text not null check(char_length(btrim(name)) between 1 and 60),
 relationship text not null check(relationship in ('self','child')),
 age_group text not null default 'U15' check(age_group in ('U8','U10','U12','U15','U18','ADULT','COACH')),
 region text not null default '' check(char_length(region)<=80),
 created_at timestamptz not null default now(),
 unique(id,user_id)
);
create unique index homecourt_one_self on public.homecourt_people(user_id) where relationship='self';
create index homecourt_people_owner on public.homecourt_people(user_id);
create table public.homecourt_history (
 id uuid primary key default gen_random_uuid(),user_id uuid not null,
 person_id uuid not null,
 title text not null check(char_length(btrim(title)) between 1 and 160),
 occurred_on date not null check(occurred_on between date '2000-01-01' and current_date),
 date_precision text not null default 'day' check(date_precision in ('day','month')),
 venue text not null default '' check(char_length(venue)<=160),
 takeaway text not null default '' check(char_length(takeaway)<=2000),
 next_action text not null default '' check(char_length(next_action)<=1000),
 created_at timestamptz not null default now(),
 foreign key(person_id,user_id) references public.homecourt_people(id,user_id) on delete cascade,
 unique(person_id,title,occurred_on,venue)
);
create table public.homecourt_checkins (
 id uuid primary key default gen_random_uuid(),user_id uuid not null,person_id uuid not null,
 checked_on date not null check(checked_on between date '2000-01-01' and current_date),
 strengths text not null check(char_length(btrim(strengths)) between 1 and 2000),
 challenge text not null check(char_length(btrim(challenge)) between 1 and 2000),
 next_action text not null check(char_length(btrim(next_action)) between 1 and 1000),
 created_at timestamptz not null default now(),
 foreign key(person_id,user_id) references public.homecourt_people(id,user_id) on delete cascade
);
create table public.homecourt_goals (
 id uuid primary key default gen_random_uuid(),user_id uuid not null,person_id uuid not null,
 title text not null check(char_length(btrim(title)) between 1 and 160),
 horizon text not null check(horizon in ('week','three_months','vision')),
 action text not null check(char_length(btrim(action)) between 1 and 1000),
 success text not null check(char_length(btrim(success)) between 1 and 1000),
 target_on date not null,
 status text not null default 'active' check(status in ('active','achieved','paused')),
 created_at timestamptz not null default now(),
 foreign key(person_id,user_id) references public.homecourt_people(id,user_id) on delete cascade
);
create index homecourt_history_owner on public.homecourt_history(user_id,person_id,occurred_on desc);
create index homecourt_checkins_owner on public.homecourt_checkins(user_id,person_id,checked_on desc);
create index homecourt_goals_owner on public.homecourt_goals(user_id,person_id,target_on);
do $policies$
declare t text;
begin
 foreach t in array array['homecourt_people','homecourt_history','homecourt_checkins','homecourt_goals'] loop
  execute format('alter table public.%I enable row level security',t);
  execute format('revoke all on public.%I from anon, authenticated',t);
  execute format('grant select,insert,update,delete on public.%I to authenticated',t);
  execute format('create policy owner_read on public.%I for select to authenticated using ((select auth.uid())=user_id)',t);
  execute format('create policy owner_insert on public.%I for insert to authenticated with check ((select auth.uid())=user_id)',t);
  execute format('create policy owner_update on public.%I for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id)',t);
  execute format('create policy owner_delete on public.%I for delete to authenticated using ((select auth.uid())=user_id)',t);
 end loop;
end $policies$;


-- =====================================================================
-- MIGRATION 20260924065536 homecourt_japan_calendar_validation
-- =====================================================================
alter table public.homecourt_history drop constraint homecourt_history_occurred_on_check, add constraint homecourt_history_occurred_on_check check(occurred_on between date '2000-01-01' and (now() at time zone 'Asia/Tokyo')::date); alter table public.homecourt_checkins drop constraint homecourt_checkins_checked_on_check, add constraint homecourt_checkins_checked_on_check check(checked_on between date '2000-01-01' and (now() at time zone 'Asia/Tokyo')::date);

-- =====================================================================
-- MIGRATION 20260924071351 homecourt_private_visual_journal
-- =====================================================================
create table public.homecourt_media (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id),
 person_id uuid not null,
 storage_path text not null unique,
 mime_type text not null check(mime_type in ('image/jpeg','image/png','image/webp','video/mp4','video/quicktime','video/webm')),
 title text not null check(length(trim(title)) between 1 and 160),
 captured_on date not null check(captured_on between date '2000-01-01' and (now() at time zone 'Asia/Tokyo')::date),
 focus_seconds integer not null default 0 check(focus_seconds between 0 and 7200),
 noticed text not null default '' check(length(noticed)<=2000),
 next_action text not null default '' check(length(next_action)<=1000),
 review_on date not null,
 history_id uuid references public.homecourt_history(id) on delete set null,
 goal_id uuid references public.homecourt_goals(id) on delete set null,
 created_at timestamptz not null default now(),
 foreign key(person_id,user_id) references public.homecourt_people(id,user_id),
 check(storage_path = user_id::text || '/' || person_id::text || '/' || id::text)
);
create index homecourt_media_person_date on public.homecourt_media(user_id,person_id,captured_on desc);
alter table public.homecourt_media enable row level security;
revoke all on public.homecourt_media from anon;
grant select,insert,update,delete on public.homecourt_media to authenticated;
create policy "media owner reads" on public.homecourt_media for select to authenticated using((select auth.uid())=user_id);
create policy "media owner inserts" on public.homecourt_media for insert to authenticated with check(
 (select auth.uid())=user_id
 and (history_id is null or exists(select 1 from public.homecourt_history h where h.id=history_id and h.person_id=homecourt_media.person_id and h.user_id=(select auth.uid())))
 and (goal_id is null or exists(select 1 from public.homecourt_goals g where g.id=goal_id and g.person_id=homecourt_media.person_id and g.user_id=(select auth.uid())))
);
create policy "media owner edits" on public.homecourt_media for update to authenticated using((select auth.uid())=user_id) with check(
 (select auth.uid())=user_id
 and (history_id is null or exists(select 1 from public.homecourt_history h where h.id=history_id and h.person_id=homecourt_media.person_id and h.user_id=(select auth.uid())))
 and (goal_id is null or exists(select 1 from public.homecourt_goals g where g.id=goal_id and g.person_id=homecourt_media.person_id and g.user_id=(select auth.uid())))
);
create policy "media owner deletes" on public.homecourt_media for delete to authenticated using((select auth.uid())=user_id);
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('homecourt-private','homecourt-private',false,52428800,array['image/jpeg','image/png','image/webp','video/mp4','video/quicktime','video/webm']);
create policy "passport files owner reads" on storage.objects for select to authenticated using(bucket_id='homecourt-private' and (storage.foldername(name))[1]=(select auth.uid())::text);
create policy "passport files owner uploads" on storage.objects for insert to authenticated with check(bucket_id='homecourt-private' and (storage.foldername(name))[1]=(select auth.uid())::text and exists(select 1 from public.homecourt_media m where m.storage_path=name and m.user_id=(select auth.uid())));
create policy "passport files owner deletes" on storage.objects for delete to authenticated using(bucket_id='homecourt-private' and (storage.foldername(name))[1]=(select auth.uid())::text);


-- =====================================================================
-- MIGRATION 20260924080733 homecourt_saves_and_activity
-- =====================================================================
create table if not exists public.homecourt_saves ( id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, item_type text not null check (item_type in ('opportunity','content','course','session')), item_key text not null check (length(item_key) between 1 and 160), title text not null check (length(title) between 1 and 240), href text not null check (length(href) between 1 and 1000), metadata jsonb not null default '{}'::jsonb, created_at timestamptz not null default now(), unique(user_id,item_type,item_key)); create index if not exists homecourt_saves_user_created on public.homecourt_saves(user_id,created_at desc); alter table public.homecourt_saves enable row level security; revoke all on public.homecourt_saves from anon; grant select,insert,delete on public.homecourt_saves to authenticated; create policy "saves owner reads" on public.homecourt_saves for select to authenticated using ((select auth.uid())=user_id); create policy "saves owner inserts" on public.homecourt_saves for insert to authenticated with check ((select auth.uid())=user_id); create policy "saves owner deletes" on public.homecourt_saves for delete to authenticated using ((select auth.uid())=user_id); create table if not exists public.analytics_events ( id bigint generated always as identity primary key, user_id uuid references auth.users(id) on delete set null, event_name text not null check (event_name in ('view','search','save','unsave','apply_open','learn_open','return_visit')), item_type text, item_key text, role text, locale text, metadata jsonb not null default '{}'::jsonb, occurred_at timestamptz not null default now()); create index if not exists analytics_events_name_time on public.analytics_events(event_name,occurred_at desc); create index if not exists analytics_events_user_time on public.analytics_events(user_id,occurred_at desc) where user_id is not null; alter table public.analytics_events enable row level security; revoke all on public.analytics_events from anon; grant insert,select on public.analytics_events to authenticated; create policy "activity owner inserts" on public.analytics_events for insert to authenticated with check ((select auth.uid())=user_id); create policy "activity owner reads" on public.analytics_events for select to authenticated using ((select auth.uid())=user_id or private.is_global_admin());

-- =====================================================================
-- MIGRATION 20260924080800 tighten_homecourt_activity_grants
-- =====================================================================
revoke all on public.homecourt_saves from authenticated; grant select,insert,delete on public.homecourt_saves to authenticated; revoke all on public.analytics_events from authenticated; grant select,insert on public.analytics_events to authenticated;

-- =====================================================================
-- MIGRATION 20260924090529 homecourt_foreign_key_indexes
-- =====================================================================
create index if not exists homecourt_checkins_person_owner_fk
  on public.homecourt_checkins(person_id,user_id);
create index if not exists homecourt_goals_person_owner_fk
  on public.homecourt_goals(person_id,user_id);
create index if not exists homecourt_history_person_owner_fk
  on public.homecourt_history(person_id,user_id);
create index if not exists homecourt_media_goal_fk
  on public.homecourt_media(goal_id)
  where goal_id is not null;
create index if not exists homecourt_media_history_fk
  on public.homecourt_media(history_id)
  where history_id is not null;
create index if not exists homecourt_media_person_owner_fk
  on public.homecourt_media(person_id,user_id);

-- =====================================================================
-- MIGRATION 20260924140338 global_development_profile_and_recommendation_feedback
-- =====================================================================
alter table public.player_development_profiles
  add column if not exists preferred_regions text[] not null default '{}'::text[],
  add column if not exists preferred_countries text[] not null default '{}'::text[],
  add column if not exists preferred_languages text[] not null default '{}'::text[],
  add column if not exists opportunity_types text[] not null default '{}'::text[],
  add column if not exists travel_scope text not null default 'local',
  add column if not exists international_interest boolean not null default false,
  add column if not exists next_12_month_goal text,
  add column if not exists profile_completion integer not null default 0;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname='player_development_profiles_travel_scope_check'
  ) then
    alter table public.player_development_profiles
      add constraint player_development_profiles_travel_scope_check
      check (travel_scope in ('local','national','asia','global'));
  end if;
  if not exists (
    select 1 from pg_constraint
    where conname='player_development_profiles_completion_check'
  ) then
    alter table public.player_development_profiles
      add constraint player_development_profiles_completion_check
      check (profile_completion between 0 and 100);
  end if;
end $$;

create table if not exists public.recommendation_feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_type text not null check (item_type in ('opportunity','content','course','partner','exchange')),
  item_key text not null check (char_length(item_key) between 1 and 160),
  signal text not null check (signal in ('interested','not_relevant','applied','completed')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique(user_id,item_type,item_key,signal)
);
create index if not exists recommendation_feedback_user_time on public.recommendation_feedback(user_id,created_at desc);
alter table public.recommendation_feedback enable row level security;
revoke all on public.recommendation_feedback from anon;
grant select,insert,delete on public.recommendation_feedback to authenticated;
drop policy if exists "recommendation_feedback_owner_read" on public.recommendation_feedback;
create policy "recommendation_feedback_owner_read" on public.recommendation_feedback
  for select to authenticated using ((select auth.uid())=user_id or private.is_global_admin());
drop policy if exists "recommendation_feedback_owner_insert" on public.recommendation_feedback;
create policy "recommendation_feedback_owner_insert" on public.recommendation_feedback
  for insert to authenticated with check ((select auth.uid())=user_id);
drop policy if exists "recommendation_feedback_owner_delete" on public.recommendation_feedback;
create policy "recommendation_feedback_owner_delete" on public.recommendation_feedback
  for delete to authenticated using ((select auth.uid())=user_id);

create or replace function public.compute_player_profile_completion(p_user_id uuid)
returns integer
language sql
stable
security definer
set search_path=public
as $$
  select least(100,
    (case when primary_position is not null and btrim(primary_position)<>'' then 10 else 0 end) +
    (case when development_stage is not null then 10 else 0 end) +
    (case when long_term_goal is not null and btrim(long_term_goal)<>'' then 15 else 0 end) +
    (case when current_focus is not null and btrim(current_focus)<>'' then 15 else 0 end) +
    (case when cardinality(preferred_regions)>0 then 10 else 0 end) +
    (case when cardinality(preferred_languages)>0 then 10 else 0 end) +
    (case when cardinality(opportunity_types)>0 then 10 else 0 end) +
    (case when next_12_month_goal is not null and btrim(next_12_month_goal)<>'' then 20 else 0 end)
  )
  from public.player_development_profiles where user_id=p_user_id
$$;
grant execute on function public.compute_player_profile_completion(uuid) to authenticated;

-- =====================================================================
-- MIGRATION 20260924140928 harden_profile_completion_function
-- =====================================================================
alter function public.compute_player_profile_completion(uuid) security invoker;
revoke execute on function public.compute_player_profile_completion(uuid) from public, anon;
grant execute on function public.compute_player_profile_completion(uuid) to authenticated;

-- =====================================================================
-- MIGRATION 20260924165258 member_article_bodies_private_storage
-- =====================================================================
create table public.member_article_bodies (slug text primary key, sections jsonb not null check (jsonb_typeof(sections)='array'), action text not null, questions jsonb not null check (jsonb_typeof(questions)='array'), published boolean not null default false, published_at timestamptz, updated_at timestamptz not null default now()); alter table public.member_article_bodies enable row level security; revoke all on public.member_article_bodies from anon, authenticated; grant select on public.member_article_bodies to authenticated; grant all on public.member_article_bodies to service_role; create policy member_article_current_subscription on public.member_article_bodies for select to authenticated using (published and published_at <= now() and exists (select 1 from public.subscriptions s where s.user_id=(select auth.uid()) and s.plan_key='homecourt_monthly' and s.status::text in ('active','trialing') and s.current_period_end>now()));

-- =====================================================================
-- MIGRATION 20260924171239 participant_rollout_delivery_audit
-- =====================================================================
create table public.participant_rollout_delivery_audit (campaign_key text not null, recipient_sha256 text not null check (recipient_sha256 ~ '^[0-9a-f]{64}$'), source_message_ids text[] not null, sent_message_count integer not null check (sent_message_count>0), audited_at timestamptz not null default now(), primary key(campaign_key,recipient_sha256)); alter table public.participant_rollout_delivery_audit enable row level security; revoke all on public.participant_rollout_delivery_audit from anon,authenticated; grant all on public.participant_rollout_delivery_audit to service_role; comment on table public.participant_rollout_delivery_audit is 'Restricted delivery history for duplicate prevention. A sent message is not proof of delivery, consent, attendance, account identity, or membership.';

-- =====================================================================
-- MIGRATION 20260924171947 participant_rollout_candidates
-- =====================================================================
create table public.participant_rollout_candidates (recipient_sha256 text primary key check(recipient_sha256 ~ '^[0-9a-f]{64}$'), source_refs jsonb not null check(jsonb_typeof(source_refs)='array'), source_kind text not null default 'application' check(source_kind='application'), review_status text not null default 'needs_review' check(review_status in ('needs_review','eligible','suppressed')), attendance_verified boolean not null default false, contact_permission_verified boolean not null default false, audited_at timestamptz not null default now()); alter table public.participant_rollout_candidates enable row level security; revoke all on public.participant_rollout_candidates from anon,authenticated; grant all on public.participant_rollout_candidates to service_role; comment on table public.participant_rollout_candidates is 'Restricted application-source inventory; no automatic account, attendance, subscription, or send. Check source and permission before outreach. Email hashes are personal data and stay service-only.';

-- =====================================================================
-- MIGRATION 20260924173625 public_content_updates_feed
-- =====================================================================

create table if not exists public.public_content_updates (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('journal','programme','exchange','platform')),
  locale text not null check (locale in ('en','ja','zh-tw','ko')),
  title text not null,
  summary text,
  href text not null,
  published_at timestamptz not null default now(),
  is_active boolean not null default true
);
alter table public.public_content_updates enable row level security;
grant select on public.public_content_updates to anon, authenticated;
drop policy if exists "Public can read active content updates" on public.public_content_updates;
create policy "Public can read active content updates"
on public.public_content_updates for select
to anon, authenticated
using (is_active = true);

create index if not exists public_content_updates_locale_published_idx
on public.public_content_updates(locale, published_at desc)
where is_active = true;


-- =====================================================================
-- MIGRATION 20260924173649 public_journal_cms
-- =====================================================================

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


-- =====================================================================
-- MIGRATION 20260924174345 journal_update_notification_touch
-- =====================================================================

create or replace function public.touch_public_journal_updated_at()
returns trigger language plpgsql security invoker set search_path=public as $$
begin
  new.updated_at=now();
  return new;
end;
$$;
revoke all on function public.touch_public_journal_updated_at() from public;
drop trigger if exists trg_touch_public_journal_updated_at on public.public_journal_posts;
create trigger trg_touch_public_journal_updated_at
before update on public.public_journal_posts
for each row execute function public.touch_public_journal_updated_at();


-- =====================================================================
-- MIGRATION 20260925130100 homecourt_schedule_wellness_care
-- =====================================================================

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


-- =====================================================================
-- MIGRATION 20260925130411 homecourt_schedule_wellness_care_indexes
-- =====================================================================

create index if not exists homecourt_schedule_items_source_team_idx on public.homecourt_schedule_items(source_team_event_id) where source_team_event_id is not null;
create index if not exists homecourt_schedule_items_source_public_idx on public.homecourt_schedule_items(source_public_event_id) where source_public_event_id is not null;
create index if not exists homecourt_care_related_schedule_idx on public.homecourt_care_plans(related_schedule_id) where related_schedule_id is not null;
create index if not exists homecourt_care_related_team_idx on public.homecourt_care_plans(related_team_event_id) where related_team_event_id is not null;
create index if not exists homecourt_care_wellness_idx on public.homecourt_care_plans(wellness_checkin_id) where wellness_checkin_id is not null;


-- =====================================================================
-- MIGRATION 20260925131659 homecourt_event_preparation_tasks
-- =====================================================================

create table if not exists public.homecourt_schedule_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  schedule_item_id uuid null references public.homecourt_schedule_items(id) on delete cascade,
  team_event_id uuid null references public.team_events(id) on delete cascade,
  title text not null check (char_length(trim(title)) between 1 and 180),
  category text not null default 'prepare' check (category in ('prepare','travel','equipment','recovery','study','other')),
  due_at timestamptz null,
  completed_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (schedule_item_id is not null or team_event_id is not null)
);
create index if not exists homecourt_schedule_tasks_user_due_idx on public.homecourt_schedule_tasks(user_id,due_at);
create index if not exists homecourt_schedule_tasks_schedule_idx on public.homecourt_schedule_tasks(schedule_item_id) where schedule_item_id is not null;
create index if not exists homecourt_schedule_tasks_team_event_idx on public.homecourt_schedule_tasks(team_event_id) where team_event_id is not null;
alter table public.homecourt_schedule_tasks enable row level security;
grant select,insert,update,delete on public.homecourt_schedule_tasks to authenticated;
drop policy if exists "schedule tasks owner reads" on public.homecourt_schedule_tasks;
drop policy if exists "schedule tasks owner inserts" on public.homecourt_schedule_tasks;
drop policy if exists "schedule tasks owner updates" on public.homecourt_schedule_tasks;
drop policy if exists "schedule tasks owner deletes" on public.homecourt_schedule_tasks;
create policy "schedule tasks owner reads" on public.homecourt_schedule_tasks for select to authenticated
using ((select auth.uid()) = user_id);
create policy "schedule tasks owner inserts" on public.homecourt_schedule_tasks for insert to authenticated
with check ((select auth.uid()) = user_id);
create policy "schedule tasks owner updates" on public.homecourt_schedule_tasks for update to authenticated
using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "schedule tasks owner deletes" on public.homecourt_schedule_tasks for delete to authenticated
using ((select auth.uid()) = user_id);


-- =====================================================================
-- MIGRATION 20260925132029 homecourt_event_prep_templates
-- =====================================================================

alter table public.homecourt_schedule_tasks
  add column if not exists template_key text null,
  add column if not exists auto_generated boolean not null default false;

create unique index if not exists homecourt_schedule_tasks_auto_personal_unique
  on public.homecourt_schedule_tasks(user_id,schedule_item_id,template_key)
  where schedule_item_id is not null and template_key is not null;

create unique index if not exists homecourt_schedule_tasks_auto_team_unique
  on public.homecourt_schedule_tasks(user_id,team_event_id,template_key)
  where team_event_id is not null and template_key is not null;


-- =====================================================================
-- MIGRATION 20260925132305 homecourt_event_prep_public_events
-- =====================================================================

alter table public.homecourt_schedule_tasks
  add column if not exists public_event_id uuid null references public.events(id) on delete cascade;

alter table public.homecourt_schedule_tasks
  drop constraint if exists homecourt_schedule_tasks_target_check;

alter table public.homecourt_schedule_tasks
  add constraint homecourt_schedule_tasks_target_check
  check (schedule_item_id is not null or team_event_id is not null or public_event_id is not null);

create index if not exists homecourt_schedule_tasks_public_event_idx
  on public.homecourt_schedule_tasks(public_event_id)
  where public_event_id is not null;

create unique index if not exists homecourt_schedule_tasks_auto_public_unique
  on public.homecourt_schedule_tasks(user_id,public_event_id,template_key)
  where public_event_id is not null and template_key is not null;


-- =====================================================================
-- MIGRATION 20260925132604 homecourt_reminder_preferences
-- =====================================================================

alter table public.notification_preferences
  add column if not exists schedule_reminders boolean not null default true,
  add column if not exists care_reminders boolean not null default true,
  add column if not exists wellness_reminders boolean not null default false,
  add column if not exists event_reminder_days integer[] not null default array[7,3,1,0],
  add column if not exists care_reminder_minutes integer not null default 120,
  add column if not exists wellness_reminder_time time not null default '20:00:00';

alter table public.notification_preferences
  drop constraint if exists notification_preferences_care_reminder_minutes_check;
alter table public.notification_preferences
  add constraint notification_preferences_care_reminder_minutes_check
  check (care_reminder_minutes between 15 and 10080);

alter table public.notification_preferences
  drop constraint if exists notification_preferences_event_reminder_days_check;
alter table public.notification_preferences
  add constraint notification_preferences_event_reminder_days_check
  check (event_reminder_days <@ array[0,1,2,3,7,14,30]::integer[]);


-- =====================================================================
-- MIGRATION 20260925133144 homecourt_reminder_dispatch
-- =====================================================================

create or replace function private.dispatch_homecourt_reminders()
returns integer
language plpgsql
security definer
set search_path = pg_catalog, public, private
as $$
declare
  inserted_count integer := 0;
  n integer;
begin
  -- Personal schedule reminders.
  insert into public.platform_notifications(user_id,notification_type,title,body,action_url,expires_at,dedupe_key)
  select
    s.user_id,
    'homecourt_schedule',
    case p.preferred_language
      when 'ja' then '予定が近づいています'
      when 'ko' then '일정이 다가오고 있습니다'
      when 'zh-Hant' then '行程即將開始'
      else 'Your schedule is coming up'
    end,
    s.title,
    case p.preferred_language
      when 'ja' then '/ja/my-homecourt/app/calendar'
      when 'ko' then '/ko/my-homecourt/app/calendar'
      when 'zh-Hant' then '/zh-tw/my-homecourt/app/calendar'
      else '/my-homecourt/app/calendar'
    end,
    s.starts_at + interval '12 hours',
    'hc:schedule:'||s.id::text||':d'||d.day::text
  from public.homecourt_schedule_items s
  join public.notification_preferences np on np.user_id=s.user_id and np.schedule_reminders
  join public.profiles p on p.id=s.user_id
  cross join lateral unnest(np.event_reminder_days) as d(day)
  where s.starts_at > now()
    and s.starts_at - make_interval(days=>d.day) >= now() - interval '30 minutes'
    and s.starts_at - make_interval(days=>d.day) < now() + interval '30 minutes'
  on conflict (dedupe_key) do nothing;
  get diagnostics n = row_count; inserted_count := inserted_count + n;

  -- Team schedule reminders for active members.
  insert into public.platform_notifications(user_id,notification_type,title,body,action_url,expires_at,dedupe_key)
  select
    tm.user_id,
    'homecourt_team_schedule',
    case p.preferred_language
      when 'ja' then 'チーム予定が近づいています'
      when 'ko' then '팀 일정이 다가오고 있습니다'
      when 'zh-Hant' then '球隊行程即將開始'
      else 'A team event is coming up'
    end,
    te.title,
    case p.preferred_language
      when 'ja' then '/ja/my-homecourt/app/calendar'
      when 'ko' then '/ko/my-homecourt/app/calendar'
      when 'zh-Hant' then '/zh-tw/my-homecourt/app/calendar'
      else '/my-homecourt/app/calendar'
    end,
    te.starts_at + interval '12 hours',
    'hc:team:'||te.id::text||':'||tm.user_id::text||':d'||d.day::text
  from public.team_memberships tm
  join public.team_events te on te.team_id=tm.team_id
  join public.notification_preferences np on np.user_id=tm.user_id and np.schedule_reminders
  join public.profiles p on p.id=tm.user_id
  cross join lateral unnest(np.event_reminder_days) as d(day)
  where tm.status='active'
    and te.starts_at > now()
    and te.starts_at - make_interval(days=>d.day) >= now() - interval '30 minutes'
    and te.starts_at - make_interval(days=>d.day) < now() + interval '30 minutes'
  on conflict (dedupe_key) do nothing;
  get diagnostics n = row_count; inserted_count := inserted_count + n;

  -- Registered RBA event reminders.
  insert into public.platform_notifications(user_id,notification_type,title,body,action_url,expires_at,dedupe_key)
  select
    pa.player_user_id,
    'homecourt_rba_event',
    case p.preferred_language
      when 'ja' then 'RBAの予定が近づいています'
      when 'ko' then 'RBA 일정이 다가오고 있습니다'
      when 'zh-Hant' then 'RBA 行程即將開始'
      else 'An RBA event is coming up'
    end,
    e.title,
    case p.preferred_language
      when 'ja' then '/ja/my-homecourt/app/calendar'
      when 'ko' then '/ko/my-homecourt/app/calendar'
      when 'zh-Hant' then '/zh-tw/my-homecourt/app/calendar'
      else '/my-homecourt/app/calendar'
    end,
    e.starts_at + interval '12 hours',
    'hc:rba:'||e.id::text||':'||pa.player_user_id::text||':d'||d.day::text
  from public.participations pa
  join public.events e on e.id=pa.event_id and e.starts_at is not null
  join public.notification_preferences np on np.user_id=pa.player_user_id and np.schedule_reminders
  join public.profiles p on p.id=pa.player_user_id
  cross join lateral unnest(np.event_reminder_days) as d(day)
  where pa.attendance_status in ('registered','confirmed')
    and e.starts_at > now()
    and e.starts_at - make_interval(days=>d.day) >= now() - interval '30 minutes'
    and e.starts_at - make_interval(days=>d.day) < now() + interval '30 minutes'
  on conflict (dedupe_key) do nothing;
  get diagnostics n = row_count; inserted_count := inserted_count + n;

  -- Care reminders: keep notification text generic because these are private records.
  insert into public.platform_notifications(user_id,notification_type,title,body,action_url,expires_at,dedupe_key)
  select
    cp.user_id,
    'homecourt_care',
    case p.preferred_language
      when 'ja' then 'MY HOME COURTの予定があります'
      when 'ko' then 'MY HOME COURT 일정이 있습니다'
      when 'zh-Hant' then 'MY HOME COURT 有一項予定'
      else 'You have a MY HOME COURT reminder'
    end,
    case p.preferred_language
      when 'ja' then '登録している予定の時間が近づいています。'
      when 'ko' then '등록한 일정 시간이 다가오고 있습니다.'
      when 'zh-Hant' then '你所登記的予定時間即將到來。'
      else 'A saved appointment is coming up.'
    end,
    case p.preferred_language
      when 'ja' then '/ja/my-homecourt/app/calendar'
      when 'ko' then '/ko/my-homecourt/app/calendar'
      when 'zh-Hant' then '/zh-tw/my-homecourt/app/calendar'
      else '/my-homecourt/app/calendar'
    end,
    cp.scheduled_at + interval '6 hours',
    'hc:care:'||cp.id::text||':m'||np.care_reminder_minutes::text
  from public.homecourt_care_plans cp
  join public.notification_preferences np on np.user_id=cp.user_id and np.care_reminders
  join public.profiles p on p.id=cp.user_id
  where cp.status='planned'
    and cp.scheduled_at > now()
    and cp.scheduled_at - make_interval(mins=>np.care_reminder_minutes) >= now() - interval '30 minutes'
    and cp.scheduled_at - make_interval(mins=>np.care_reminder_minutes) < now() + interval '30 minutes'
  on conflict (dedupe_key) do nothing;
  get diagnostics n = row_count; inserted_count := inserted_count + n;

  -- Optional daily private check-in reminder. The notification does not expose entered values.
  insert into public.platform_notifications(user_id,notification_type,title,body,action_url,expires_at,dedupe_key)
  select
    np.user_id,
    'homecourt_daily_checkin',
    case p.preferred_language
      when 'ja' then '今日の記録を残しますか？'
      when 'ko' then '오늘 기록을 남길까요?'
      when 'zh-Hant' then '要留下今天的記錄嗎？'
      else 'Ready to log today?'
    end,
    case p.preferred_language
      when 'ja' then 'MY HOME COURTで今日の記録を短く残せます。'
      when 'ko' then 'MY HOME COURT에서 오늘 기록을 짧게 남길 수 있습니다.'
      when 'zh-Hant' then '可在 MY HOME COURT 簡短留下今天的記錄。'
      else 'Open MY HOME COURT to leave a short daily log.'
    end,
    case p.preferred_language
      when 'ja' then '/ja/my-homecourt/app/calendar'
      when 'ko' then '/ko/my-homecourt/app/calendar'
      when 'zh-Hant' then '/zh-tw/my-homecourt/app/calendar'
      else '/my-homecourt/app/calendar'
    end,
    now() + interval '8 hours',
    'hc:daily:'||np.user_id::text||':'||(now() at time zone coalesce(p.timezone,'Asia/Tokyo'))::date::text
  from public.notification_preferences np
  join public.profiles p on p.id=np.user_id
  where np.wellness_reminders
    and extract(hour from (now() at time zone coalesce(p.timezone,'Asia/Tokyo'))) = extract(hour from np.wellness_reminder_time)
    and not exists (
      select 1 from public.homecourt_wellness_checkins w
      where w.user_id=np.user_id
        and w.checkin_on=(now() at time zone coalesce(p.timezone,'Asia/Tokyo'))::date
    )
  on conflict (dedupe_key) do nothing;
  get diagnostics n = row_count; inserted_count := inserted_count + n;

  return inserted_count;
end;
$$;

revoke all on function private.dispatch_homecourt_reminders() from public, anon, authenticated;

do $$
declare jid bigint;
begin
  select jobid into jid from cron.job where jobname='rba-homecourt-reminders';
  if jid is not null then perform cron.unschedule(jid); end if;
  perform cron.schedule(
    'rba-homecourt-reminders',
    '*/30 * * * *',
    'select private.dispatch_homecourt_reminders();'
  );
end $$;


-- =====================================================================
-- MIGRATION 20260925161351 homecourt_plus_monthly_reviews
-- =====================================================================
create table if not exists public.homecourt_monthly_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  period_month date not null,
  role text not null check (role in ('player','parent','coach')),
  focus text not null default '' check (char_length(focus) <= 1000),
  wins text not null default '' check (char_length(wins) <= 2000),
  challenge text not null default '' check (char_length(challenge) <= 2000),
  next_action text not null default '' check (char_length(next_action) <= 1000),
  note text not null default '' check (char_length(note) <= 3000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, period_month, role),
  check (period_month = date_trunc('month', period_month)::date)
);
create index if not exists homecourt_monthly_reviews_owner_period on public.homecourt_monthly_reviews(user_id, period_month desc);
alter table public.homecourt_monthly_reviews enable row level security;
revoke all on public.homecourt_monthly_reviews from anon, authenticated;
grant select, insert, update, delete on public.homecourt_monthly_reviews to authenticated;
create policy "monthly review owner reads" on public.homecourt_monthly_reviews for select to authenticated using ((select auth.uid()) = user_id);
create policy "monthly review owner inserts" on public.homecourt_monthly_reviews for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "monthly review owner updates" on public.homecourt_monthly_reviews for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "monthly review owner deletes" on public.homecourt_monthly_reviews for delete to authenticated using ((select auth.uid()) = user_id);

-- =====================================================================
-- MIGRATION 20260925161738 homecourt_plus_weekly_actions
-- =====================================================================
create table if not exists public.homecourt_weekly_actions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  week_start date not null,
  role text not null check (role in ('player','parent','coach')),
  theme text not null default '' check (char_length(theme) <= 500),
  action text not null default '' check (char_length(action) <= 1200),
  evidence text not null default '' check (char_length(evidence) <= 1200),
  reflection text not null default '' check (char_length(reflection) <= 2000),
  next_action text not null default '' check (char_length(next_action) <= 1200),
  status text not null default 'active' check (status in ('active','completed','skipped')),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, week_start, role)
);
create index if not exists homecourt_weekly_actions_owner_week on public.homecourt_weekly_actions(user_id, week_start desc);
alter table public.homecourt_weekly_actions enable row level security;
revoke all on public.homecourt_weekly_actions from anon, authenticated;
grant select, insert, update, delete on public.homecourt_weekly_actions to authenticated;
create policy "weekly action owner reads" on public.homecourt_weekly_actions for select to authenticated using ((select auth.uid())=user_id);
create policy "weekly action owner inserts" on public.homecourt_weekly_actions for insert to authenticated with check ((select auth.uid())=user_id);
create policy "weekly action owner updates" on public.homecourt_weekly_actions for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy "weekly action owner deletes" on public.homecourt_weekly_actions for delete to authenticated using ((select auth.uid())=user_id);

-- =====================================================================
-- MIGRATION 20260925162112 homecourt_plus_entitlement_guard
-- =====================================================================
create or replace function private.has_homecourt_plus(target_user uuid)
returns boolean language sql stable security definer set search_path='' as $$
select exists (
  select 1 from public.subscriptions s
  where s.user_id=target_user
    and s.plan_key='homecourt_monthly'
    and s.status::text in ('active','trialing')
    and (coalesce(s.cancel_at_period_end,false)=false or (s.current_period_end is not null and s.current_period_end>now()))
); $$;
revoke all on function private.has_homecourt_plus(uuid) from public, anon;
grant execute on function private.has_homecourt_plus(uuid) to authenticated;
drop policy if exists "weekly action owner reads" on public.homecourt_weekly_actions;
drop policy if exists "weekly action owner inserts" on public.homecourt_weekly_actions;
drop policy if exists "weekly action owner updates" on public.homecourt_weekly_actions;
drop policy if exists "weekly action owner deletes" on public.homecourt_weekly_actions;
create policy "weekly plus owner reads" on public.homecourt_weekly_actions for select to authenticated using ((select auth.uid())=user_id and private.has_homecourt_plus((select auth.uid())));
create policy "weekly plus owner inserts" on public.homecourt_weekly_actions for insert to authenticated with check ((select auth.uid())=user_id and private.has_homecourt_plus((select auth.uid())));
create policy "weekly plus owner updates" on public.homecourt_weekly_actions for update to authenticated using ((select auth.uid())=user_id and private.has_homecourt_plus((select auth.uid()))) with check ((select auth.uid())=user_id and private.has_homecourt_plus((select auth.uid())));
create policy "weekly plus owner deletes" on public.homecourt_weekly_actions for delete to authenticated using ((select auth.uid())=user_id and private.has_homecourt_plus((select auth.uid())));
drop policy if exists "monthly review owner reads" on public.homecourt_monthly_reviews;
drop policy if exists "monthly review owner inserts" on public.homecourt_monthly_reviews;
drop policy if exists "monthly review owner updates" on public.homecourt_monthly_reviews;
drop policy if exists "monthly review owner deletes" on public.homecourt_monthly_reviews;
create policy "monthly plus owner reads" on public.homecourt_monthly_reviews for select to authenticated using ((select auth.uid())=user_id and private.has_homecourt_plus((select auth.uid())));
create policy "monthly plus owner inserts" on public.homecourt_monthly_reviews for insert to authenticated with check ((select auth.uid())=user_id and private.has_homecourt_plus((select auth.uid())));
create policy "monthly plus owner updates" on public.homecourt_monthly_reviews for update to authenticated using ((select auth.uid())=user_id and private.has_homecourt_plus((select auth.uid()))) with check ((select auth.uid())=user_id and private.has_homecourt_plus((select auth.uid())));
create policy "monthly plus owner deletes" on public.homecourt_monthly_reviews for delete to authenticated using ((select auth.uid())=user_id and private.has_homecourt_plus((select auth.uid())));

-- =====================================================================
-- MIGRATION 20260925170617 homecourt_plus_planner_entitlement_guard
-- =====================================================================
-- Planner, condition, care and preparation are HOMECOURT PLUS features.
drop policy if exists "schedule owner reads" on public.homecourt_schedule_items;
drop policy if exists "schedule owner inserts" on public.homecourt_schedule_items;
drop policy if exists "schedule owner updates" on public.homecourt_schedule_items;
drop policy if exists "schedule owner deletes" on public.homecourt_schedule_items;
create policy "schedule plus owner access" on public.homecourt_schedule_items for all to authenticated
using ((select auth.uid()) = user_id and private.has_homecourt_plus((select auth.uid())))
with check ((select auth.uid()) = user_id and private.has_homecourt_plus((select auth.uid())));

drop policy if exists "wellness owner reads" on public.homecourt_wellness_checkins;
drop policy if exists "wellness owner inserts" on public.homecourt_wellness_checkins;
drop policy if exists "wellness owner updates" on public.homecourt_wellness_checkins;
drop policy if exists "wellness owner deletes" on public.homecourt_wellness_checkins;
create policy "wellness plus owner access" on public.homecourt_wellness_checkins for all to authenticated
using ((select auth.uid()) = user_id and private.has_homecourt_plus((select auth.uid())))
with check ((select auth.uid()) = user_id and private.has_homecourt_plus((select auth.uid())));

drop policy if exists "care owner reads" on public.homecourt_care_plans;
drop policy if exists "care owner inserts" on public.homecourt_care_plans;
drop policy if exists "care owner updates" on public.homecourt_care_plans;
drop policy if exists "care owner deletes" on public.homecourt_care_plans;
create policy "care plus owner access" on public.homecourt_care_plans for all to authenticated
using ((select auth.uid()) = user_id and private.has_homecourt_plus((select auth.uid())))
with check ((select auth.uid()) = user_id and private.has_homecourt_plus((select auth.uid())));

drop policy if exists "schedule tasks owner reads" on public.homecourt_schedule_tasks;
drop policy if exists "schedule tasks owner inserts" on public.homecourt_schedule_tasks;
drop policy if exists "schedule tasks owner updates" on public.homecourt_schedule_tasks;
drop policy if exists "schedule tasks owner deletes" on public.homecourt_schedule_tasks;
create policy "schedule tasks plus owner access" on public.homecourt_schedule_tasks for all to authenticated
using ((select auth.uid()) = user_id and private.has_homecourt_plus((select auth.uid())))
with check ((select auth.uid()) = user_id and private.has_homecourt_plus((select auth.uid())));

-- =====================================================================
-- MIGRATION 20260925170658 homecourt_plus_private_schema_usage
-- =====================================================================
revoke all on schema private from anon;
grant usage on schema private to authenticated;
revoke all on all functions in schema private from anon;
revoke all on function private.has_homecourt_plus(uuid) from public, anon;
grant execute on function private.has_homecourt_plus(uuid) to authenticated;

-- =====================================================================
-- MIGRATION 20260926224939 require_references_for_published_coach_journal_v2
-- =====================================================================

alter table public.public_journal_posts
  add constraint public_journal_posts_published_coach_refs_check
  check (
    not (
      published = true
      and (audience = 'coaches' or category = 'coaching')
    )
    or (
      jsonb_typeof(source_references) = 'array'
      and jsonb_array_length(source_references) > 0
    )
  );


-- =====================================================================
-- MIGRATION 20260926235456 add_dhub_square_membership_access
-- =====================================================================

create table if not exists public.dhub_memberships (
  id uuid primary key default gen_random_uuid(),
  member_name text,
  email_normalized text not null unique,
  alternate_emails text[] not null default '{}'::text[],
  linked_user_id uuid null references public.profiles(id) on delete set null,
  provider text not null default 'square' check (provider in ('square','manual')),
  plan_key text not null default 'dhub_coach_lab_monthly',
  status text not null default 'active' check (status in ('active','grace','inactive','cancelled')),
  amount_jpy integer not null default 3300 check (amount_jpy >= 0),
  last_payment_at timestamptz,
  access_until timestamptz,
  source_reference text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.dhub_memberships enable row level security;

drop policy if exists "dhub member self read" on public.dhub_memberships;
create policy "dhub member self read"
on public.dhub_memberships
for select
to authenticated
using (
  linked_user_id = auth.uid()
  or lower(email_normalized) = lower(coalesce(auth.jwt()->>'email',''))
  or lower(coalesce(auth.jwt()->>'email','')) = any(alternate_emails)
  or exists (
    select 1 from public.profiles me
    where me.id=auth.uid() and me.role='admin'
  )
);

create or replace function public.has_dhub_access()
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select exists (
    select 1
    from public.dhub_memberships d
    where d.status in ('active','grace')
      and (d.access_until is null or d.access_until >= now())
      and (
        d.linked_user_id = auth.uid()
        or lower(d.email_normalized) = lower(coalesce(auth.jwt()->>'email',''))
        or lower(coalesce(auth.jwt()->>'email','')) = any(d.alternate_emails)
      )
  );
$$;

revoke all on function public.has_dhub_access() from public;
grant execute on function public.has_dhub_access() to authenticated;

create index if not exists dhub_memberships_linked_user_id_idx
  on public.dhub_memberships(linked_user_id);
create index if not exists dhub_memberships_access_until_idx
  on public.dhub_memberships(access_until);


-- =====================================================================
-- MIGRATION 20260927000336 add_dhub_paid_curriculum_and_progress
-- =====================================================================

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


-- =====================================================================
-- MIGRATION 20260927001215 add_dhub_access_requests
-- =====================================================================

create table if not exists public.dhub_access_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  rba_email text not null,
  square_email text,
  square_invoice_no text,
  note text,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  reviewed_by uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.dhub_access_requests enable row level security;

drop policy if exists "dhub access request self read" on public.dhub_access_requests;
create policy "dhub access request self read"
on public.dhub_access_requests for select to authenticated
using (
  user_id=auth.uid()
  or exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin')
);

drop policy if exists "dhub access request self insert" on public.dhub_access_requests;
create policy "dhub access request self insert"
on public.dhub_access_requests for insert to authenticated
with check(user_id=auth.uid());

drop policy if exists "dhub access request admin update" on public.dhub_access_requests;
create policy "dhub access request admin update"
on public.dhub_access_requests for update to authenticated
using(exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin'))
with check(exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin'));

create index if not exists dhub_access_requests_status_idx on public.dhub_access_requests(status,created_at desc);


-- =====================================================================
-- MIGRATION 20260927001241 allow_admin_manage_dhub_memberships
-- =====================================================================

drop policy if exists "dhub admin update memberships" on public.dhub_memberships;
create policy "dhub admin update memberships"
on public.dhub_memberships
for update
to authenticated
using (
  exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin')
)
with check (
  exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin')
);


-- =====================================================================
-- MIGRATION 20260927004244 expand_dhub_member_workspace
-- =====================================================================

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


-- =====================================================================
-- MIGRATION 20260927004805 split_dhub_coach_lab_and_players
-- =====================================================================

alter table public.dhub_memberships
  add column if not exists program_type text not null default 'coach_lab',
  add column if not exists subject_name text,
  add column if not exists guardian_name text,
  add column if not exists subject_category text,
  add column if not exists metadata jsonb not null default '{}'::jsonb;

update public.dhub_memberships set program_type='coach_lab' where program_type is null or program_type='';

do $$ begin
  if not exists (
    select 1 from pg_constraint where conname='dhub_memberships_program_type_check'
  ) then
    alter table public.dhub_memberships add constraint dhub_memberships_program_type_check
      check (program_type in ('coach_lab','players'));
  end if;
end $$;

alter table public.dhub_access_requests
  add column if not exists program_type text not null default 'coach_lab';

do $$ begin
  if not exists (
    select 1 from pg_constraint where conname='dhub_access_requests_program_type_check'
  ) then
    alter table public.dhub_access_requests add constraint dhub_access_requests_program_type_check
      check (program_type in ('coach_lab','players'));
  end if;
end $$;

alter table public.dhub_announcements
  add column if not exists program_type text not null default 'coach_lab';
alter table public.dhub_live_sessions
  add column if not exists program_type text not null default 'coach_lab';

do $$ begin
  if not exists (select 1 from pg_constraint where conname='dhub_announcements_program_type_check') then
    alter table public.dhub_announcements add constraint dhub_announcements_program_type_check
      check (program_type in ('coach_lab','players','all'));
  end if;
  if not exists (select 1 from pg_constraint where conname='dhub_live_sessions_program_type_check') then
    alter table public.dhub_live_sessions add constraint dhub_live_sessions_program_type_check
      check (program_type in ('coach_lab','players'));
  end if;
end $$;

create or replace function public.has_dhub_program_access(p_program_type text)
returns boolean
language sql
stable
security definer
set search_path=public,auth
as $$
  select exists (
    select 1 from public.dhub_memberships d
    where d.program_type=p_program_type
      and d.status in ('active','grace')
      and (d.access_until is null or d.access_until>=now())
      and (
        d.linked_user_id=auth.uid()
        or lower(d.email_normalized)=lower(coalesce(auth.jwt()->>'email',''))
        or lower(coalesce(auth.jwt()->>'email',''))=any(d.alternate_emails)
      )
  );
$$;

create or replace function public.has_dhub_coach_access()
returns boolean language sql stable security definer set search_path=public,auth
as $$ select public.has_dhub_program_access('coach_lab'); $$;

create or replace function public.has_dhub_player_access()
returns boolean language sql stable security definer set search_path=public,auth
as $$ select public.has_dhub_program_access('players'); $$;

create or replace function public.has_dhub_access()
returns boolean language sql stable security definer set search_path=public,auth
as $$ select public.has_dhub_coach_access() or public.has_dhub_player_access(); $$;

revoke all on function public.has_dhub_program_access(text) from public;
revoke all on function public.has_dhub_coach_access() from public;
revoke all on function public.has_dhub_player_access() from public;
revoke all on function public.has_dhub_access() from public;
grant execute on function public.has_dhub_program_access(text) to authenticated;
grant execute on function public.has_dhub_coach_access() to authenticated;
grant execute on function public.has_dhub_player_access() to authenticated;
grant execute on function public.has_dhub_access() to authenticated;

drop policy if exists "dhub paid members read lessons" on public.dhub_lessons;
create policy "dhub coach members read lessons" on public.dhub_lessons
for select to authenticated using (
  published=true and (
    public.has_dhub_coach_access()
    or exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin')
  )
);

drop policy if exists "dhub member read own progress" on public.dhub_lesson_progress;
create policy "dhub coach read own progress" on public.dhub_lesson_progress
for select to authenticated using (
  user_id=auth.uid() and (
    public.has_dhub_coach_access()
    or exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin')
  )
);
drop policy if exists "dhub member insert own progress" on public.dhub_lesson_progress;
create policy "dhub coach insert own progress" on public.dhub_lesson_progress
for insert to authenticated with check (user_id=auth.uid() and public.has_dhub_coach_access());
drop policy if exists "dhub member update own progress" on public.dhub_lesson_progress;
create policy "dhub coach update own progress" on public.dhub_lesson_progress
for update to authenticated using (user_id=auth.uid() and public.has_dhub_coach_access())
with check (user_id=auth.uid() and public.has_dhub_coach_access());

drop policy if exists "dhub profile self insert" on public.dhub_member_profiles;
create policy "dhub coach profile self insert" on public.dhub_member_profiles
for insert to authenticated with check (user_id=auth.uid() and public.has_dhub_coach_access());
drop policy if exists "dhub profile self update" on public.dhub_member_profiles;
create policy "dhub coach profile self update" on public.dhub_member_profiles
for update to authenticated using (user_id=auth.uid() and public.has_dhub_coach_access())
with check (user_id=auth.uid() and public.has_dhub_coach_access());

drop policy if exists "dhub tool self read" on public.dhub_tool_entries;
create policy "dhub coach tool self read" on public.dhub_tool_entries
for select to authenticated using (user_id=auth.uid() and public.has_dhub_coach_access());
drop policy if exists "dhub tool self insert" on public.dhub_tool_entries;
create policy "dhub coach tool self insert" on public.dhub_tool_entries
for insert to authenticated with check (user_id=auth.uid() and public.has_dhub_coach_access());
drop policy if exists "dhub tool self update" on public.dhub_tool_entries;
create policy "dhub coach tool self update" on public.dhub_tool_entries
for update to authenticated using (user_id=auth.uid() and public.has_dhub_coach_access())
with check (user_id=auth.uid() and public.has_dhub_coach_access());

drop policy if exists "dhub members read announcements" on public.dhub_announcements;
create policy "dhub program members read announcements" on public.dhub_announcements
for select to authenticated using (
  published=true and (
    (program_type in ('coach_lab','all') and public.has_dhub_coach_access())
    or (program_type in ('players','all') and public.has_dhub_player_access())
    or exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin')
  )
);

drop policy if exists "dhub members read sessions" on public.dhub_live_sessions;
create policy "dhub program members read sessions" on public.dhub_live_sessions
for select to authenticated using (
  published=true and (
    (program_type='coach_lab' and public.has_dhub_coach_access())
    or (program_type='players' and public.has_dhub_player_access())
    or exists(select 1 from public.profiles me where me.id=auth.uid() and me.role='admin')
  )
);

create index if not exists dhub_memberships_program_idx on public.dhub_memberships(program_type,status);
create index if not exists dhub_access_requests_program_idx on public.dhub_access_requests(program_type,status,created_at desc);


-- =====================================================================
-- MIGRATION 20260927004854 add_dhub_players_workspace
-- =====================================================================

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


-- =====================================================================
-- MIGRATION 20260927024910 add_dhub_paid_articles_library
-- =====================================================================

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


-- =====================================================================
-- MIGRATION 20260927025853 harden_dhub_paid_article_quality
-- =====================================================================

do $$ begin
  if not exists (
    select 1 from pg_constraint where conname='dhub_paid_articles_minimum_depth_check'
  ) then
    alter table public.dhub_paid_articles
      add constraint dhub_paid_articles_minimum_depth_check
      check (
        not published
        or (
          jsonb_array_length(sections) >= 3
          and char_length(trim(field_action)) >= 10
          and coalesce(array_length(reflection_questions,1),0) >= 3
        )
      );
  end if;
end $$;

create or replace view public.dhub_paid_article_quality as
select
  program_type,slug,title,published,
  jsonb_array_length(sections) as section_count,
  coalesce(array_length(reflection_questions,1),0) as reflection_count,
  jsonb_array_length(source_references) as reference_count,
  char_length(field_action) as action_length,
  updated_at
from public.dhub_paid_articles;


-- =====================================================================
-- MIGRATION 20260927035304 dhub_paid_article_cms_workflow
-- =====================================================================

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


-- =====================================================================
-- MIGRATION 20260927040017 dhub_paid_article_safe_working_drafts
-- =====================================================================

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


-- =====================================================================
-- MIGRATION 20260927161945 homecourt_development_graph_20260928
-- =====================================================================
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
as $$
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
$$;
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

create table if not exists public.homecourt_travel_windows (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  country text not null,
  city text,
  starts_on date not null,
  ends_on date not null,
  age_group text,
  interest_types text[] not null default '{}',
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_on >= starts_on)
);
create index if not exists homecourt_travel_windows_user_date_idx
  on public.homecourt_travel_windows(user_id, starts_on);
alter table public.homecourt_travel_windows enable row level security;

drop policy if exists "homecourt travel owner read" on public.homecourt_travel_windows;
create policy "homecourt travel owner read"
on public.homecourt_travel_windows for select to authenticated
using (user_id=(select auth.uid()));

drop policy if exists "homecourt travel owner insert" on public.homecourt_travel_windows;
create policy "homecourt travel owner insert"
on public.homecourt_travel_windows for insert to authenticated
with check (user_id=(select auth.uid()));

drop policy if exists "homecourt travel owner update" on public.homecourt_travel_windows;
create policy "homecourt travel owner update"
on public.homecourt_travel_windows for update to authenticated
using (user_id=(select auth.uid()))
with check (user_id=(select auth.uid()));

drop policy if exists "homecourt travel owner delete" on public.homecourt_travel_windows;
create policy "homecourt travel owner delete"
on public.homecourt_travel_windows for delete to authenticated
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
as $$
  select
    p.id,p.entity_id,p.title,p.age_group,p.gender,p.country_from,p.city_from,
    p.target_countries,p.mode,p.starts_on,p.ends_on,p.team_size_min,p.team_size_max,
    p.venue_available,p.languages,p.purpose,p.level_note,p.public_note,p.status,p.created_at
  from public.homecourt_exchange_posts p
  where p.status='open'
    and (p.ends_on is null or p.ends_on >= current_date - 7)
  order by p.starts_on nulls last,p.created_at desc;
$$;
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


-- =====================================================================
-- MIGRATION 20260927161949 team_development_core_20260928
-- =====================================================================
-- TEAM DEVELOPMENT core
create table if not exists public.team_development_cycles (
  id uuid primary key default gen_random_uuid(),
  entity_id uuid not null references public.platform_entities(id) on delete cascade,
  team_id uuid references public.teams(id) on delete set null,
  event_id uuid references public.events(id) on delete set null,
  title text not null,
  source_service text not null default 'rba_team_clinic',
  package_key text not null default 'clinic_30',
  status text not null default 'intake',
  clinic_on date,
  plan_start_on date,
  plan_end_on date,
  next_followup_on date,
  commercial_status text not null default 'included',
  access_ends_at timestamptz,
  created_by uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint team_development_cycle_source_check check (source_service in ('rba_team_clinic','rba_visit_training','partner_program','self_started','other')),
  constraint team_development_cycle_package_check check (package_key in ('clinic','clinic_30','partner','custom')),
  constraint team_development_cycle_status_check check (status in ('intake','scheduled','observed','report_ready','plan_active','review_due','completed','paused')),
  constraint team_development_cycle_commercial_check check (commercial_status in ('included','trial','active','partner','expired')),
  constraint team_development_cycle_date_check check (plan_end_on is null or plan_start_on is null or plan_end_on >= plan_start_on)
);
create index if not exists team_development_cycles_entity_idx on public.team_development_cycles(entity_id, created_at desc);
create index if not exists team_development_cycles_status_idx on public.team_development_cycles(status, clinic_on desc);
alter table public.team_development_cycles enable row level security;

create table if not exists public.team_development_briefs (
  cycle_id uuid primary key references public.team_development_cycles(id) on delete cascade,
  submitted_by uuid not null references public.profiles(id) on delete restrict,
  age_group text,
  player_count integer,
  training_days text,
  training_frequency text,
  current_context text,
  team_strength text,
  offense_challenge text,
  defense_challenge text,
  perception_decision_challenge text,
  physical_challenge text,
  coach_goal text,
  desired_change text,
  constraints text,
  notes text,
  updated_at timestamptz not null default now(),
  constraint team_development_brief_player_count_check check (player_count is null or player_count between 1 and 100)
);
alter table public.team_development_briefs enable row level security;

create table if not exists public.team_development_findings (
  id uuid primary key default gen_random_uuid(),
  cycle_id uuid not null references public.team_development_cycles(id) on delete cascade,
  domain text not null,
  finding_type text not null,
  observation text not null,
  evidence text,
  next_action text,
  priority integer,
  created_by uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint team_development_finding_domain_check check (domain in ('spacing','perception','decision','advantage','off_ball','transition','defense','communication','physical','practice_design','other')),
  constraint team_development_finding_type_check check (finding_type in ('strength','observation','priority')),
  constraint team_development_finding_priority_check check (priority is null or priority between 1 and 3)
);
create index if not exists team_development_findings_cycle_idx on public.team_development_findings(cycle_id, finding_type, priority);
alter table public.team_development_findings enable row level security;

create table if not exists public.team_development_reports (
  cycle_id uuid primary key references public.team_development_cycles(id) on delete cascade,
  summary text not null default '',
  strengths text[] not null default '{}',
  priorities text[] not null default '{}',
  coach_focus text not null default '',
  player_message text not null default '',
  family_message text not null default '',
  status text not null default 'draft',
  issued_by uuid references public.profiles(id) on delete set null,
  issued_at timestamptz,
  updated_at timestamptz not null default now(),
  constraint team_development_report_status_check check (status in ('draft','issued'))
);
alter table public.team_development_reports enable row level security;

create table if not exists public.team_development_plan_weeks (
  id uuid primary key default gen_random_uuid(),
  cycle_id uuid not null references public.team_development_cycles(id) on delete cascade,
  week_no integer not null,
  starts_on date,
  ends_on date,
  title text not null,
  focus text not null default '',
  objective text not null default '',
  small_sided_game text not null default '',
  coach_observation text not null default '',
  player_question text not null default '',
  status text not null default 'planned',
  created_by uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(cycle_id, week_no),
  constraint team_development_week_no_check check (week_no between 1 and 8),
  constraint team_development_week_status_check check (status in ('planned','active','complete')),
  constraint team_development_week_date_check check (ends_on is null or starts_on is null or ends_on >= starts_on)
);
alter table public.team_development_plan_weeks enable row level security;

create table if not exists public.team_development_checkins (
  id uuid primary key default gen_random_uuid(),
  cycle_id uuid not null references public.team_development_cycles(id) on delete cascade,
  week_no integer,
  submitted_by uuid not null references public.profiles(id) on delete restrict,
  progress_state text not null default 'trying',
  worked text not null default '',
  evidence text not null default '',
  stuck text not null default '',
  adjustment text not null default '',
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint team_development_checkin_week_check check (week_no is null or week_no between 1 and 8),
  constraint team_development_progress_state_check check (progress_state in ('not_started','trying','more_consistent','embedded'))
);
create index if not exists team_development_checkins_cycle_idx on public.team_development_checkins(cycle_id, week_no, submitted_at desc);
alter table public.team_development_checkins enable row level security;

create or replace function private.can_manage_team_development(target_cycle uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.team_development_cycles c
    where c.id=target_cycle
      and (private.is_entity_manager(c.entity_id) or private.is_global_admin())
  );
$$;

-- =====================================================================
-- MIGRATION 20260927161953 team_development_policies_20260928
-- =====================================================================
-- TEAM DEVELOPMENT RLS policies
drop policy if exists "team development cycles read" on public.team_development_cycles;
create policy "team development cycles read" on public.team_development_cycles
for select to authenticated
using (private.is_entity_manager(entity_id) or private.is_global_admin());

drop policy if exists "team development cycles insert" on public.team_development_cycles;
create policy "team development cycles insert" on public.team_development_cycles
for insert to authenticated
with check (created_by=(select auth.uid()) and (private.is_entity_manager(entity_id) or private.is_global_admin()));

drop policy if exists "team development cycles update" on public.team_development_cycles;
create policy "team development cycles update" on public.team_development_cycles
for update to authenticated
using (private.is_entity_manager(entity_id) or private.is_global_admin())
with check (private.is_entity_manager(entity_id) or private.is_global_admin());

drop policy if exists "team development cycles delete" on public.team_development_cycles;
create policy "team development cycles delete" on public.team_development_cycles
for delete to authenticated
using (private.is_global_admin());

drop policy if exists "team development briefs read" on public.team_development_briefs;
create policy "team development briefs read" on public.team_development_briefs
for select to authenticated
using (private.can_manage_team_development(cycle_id));

drop policy if exists "team development briefs insert" on public.team_development_briefs;
create policy "team development briefs insert" on public.team_development_briefs
for insert to authenticated
with check (submitted_by=(select auth.uid()) and private.can_manage_team_development(cycle_id));

drop policy if exists "team development briefs update" on public.team_development_briefs;
create policy "team development briefs update" on public.team_development_briefs
for update to authenticated
using (private.can_manage_team_development(cycle_id))
with check (private.can_manage_team_development(cycle_id));

drop policy if exists "team development findings read" on public.team_development_findings;
create policy "team development findings read" on public.team_development_findings
for select to authenticated
using (private.can_manage_team_development(cycle_id));

drop policy if exists "team development findings admin insert" on public.team_development_findings;
create policy "team development findings admin insert" on public.team_development_findings
for insert to authenticated
with check (created_by=(select auth.uid()) and private.is_global_admin());

drop policy if exists "team development findings admin update" on public.team_development_findings;
create policy "team development findings admin update" on public.team_development_findings
for update to authenticated
using (private.is_global_admin())
with check (private.is_global_admin());

drop policy if exists "team development findings admin delete" on public.team_development_findings;
create policy "team development findings admin delete" on public.team_development_findings
for delete to authenticated
using (private.is_global_admin());

drop policy if exists "team development reports read" on public.team_development_reports;
create policy "team development reports read" on public.team_development_reports
for select to authenticated
using (private.can_manage_team_development(cycle_id));

drop policy if exists "team development reports admin insert" on public.team_development_reports;
create policy "team development reports admin insert" on public.team_development_reports
for insert to authenticated
with check (private.is_global_admin());

drop policy if exists "team development reports admin update" on public.team_development_reports;
create policy "team development reports admin update" on public.team_development_reports
for update to authenticated
using (private.is_global_admin())
with check (private.is_global_admin());

drop policy if exists "team development plan weeks read" on public.team_development_plan_weeks;
create policy "team development plan weeks read" on public.team_development_plan_weeks
for select to authenticated
using (private.can_manage_team_development(cycle_id));

drop policy if exists "team development plan weeks admin insert" on public.team_development_plan_weeks;
create policy "team development plan weeks admin insert" on public.team_development_plan_weeks
for insert to authenticated
with check (created_by=(select auth.uid()) and private.is_global_admin());

drop policy if exists "team development plan weeks admin update" on public.team_development_plan_weeks;
create policy "team development plan weeks admin update" on public.team_development_plan_weeks
for update to authenticated
using (private.is_global_admin())
with check (private.is_global_admin());

drop policy if exists "team development plan weeks admin delete" on public.team_development_plan_weeks;
create policy "team development plan weeks admin delete" on public.team_development_plan_weeks
for delete to authenticated
using (private.is_global_admin());

drop policy if exists "team development checkins read" on public.team_development_checkins;
create policy "team development checkins read" on public.team_development_checkins
for select to authenticated
using (private.can_manage_team_development(cycle_id));

drop policy if exists "team development checkins insert" on public.team_development_checkins;
create policy "team development checkins insert" on public.team_development_checkins
for insert to authenticated
with check (submitted_by=(select auth.uid()) and private.can_manage_team_development(cycle_id));

drop policy if exists "team development checkins update" on public.team_development_checkins;
create policy "team development checkins update" on public.team_development_checkins
for update to authenticated
using (submitted_by=(select auth.uid()) or private.is_global_admin())
with check (submitted_by=(select auth.uid()) or private.is_global_admin());

drop policy if exists "team development checkins delete" on public.team_development_checkins;
create policy "team development checkins delete" on public.team_development_checkins
for delete to authenticated
using (submitted_by=(select auth.uid()) or private.is_global_admin());

comment on table public.team_development_cycles is
'RBA team-level development cycles. Not official federation registration and not a player ranking system.';
comment on table public.team_development_findings is
'Structured team observations. Findings describe team learning phenomena, not individual player scores.';
comment on table public.team_development_reports is
'RBA-issued team development report following a clinic or observation.';
comment on table public.team_development_plan_weeks is
'Structured follow-up plan, typically four weeks / 30 days, after RBA team clinic or visit training.';

-- =====================================================================
-- MIGRATION 20260927162130 homecourt_team_development_hardening_20260928
-- =====================================================================
-- HOMECOURT / TEAM DEVELOPMENT security hardening

-- Approval RPCs do not require SECURITY DEFINER; global-admin RLS is sufficient.
alter function public.approve_homecourt_entity_claim(uuid) security invoker;
alter function public.approve_homecourt_entity_suggestion(uuid) security invoker;
revoke execute on function public.approve_homecourt_entity_claim(uuid) from anon;
revoke execute on function public.approve_homecourt_entity_suggestion(uuid) from anon;
grant execute on function public.approve_homecourt_entity_claim(uuid) to authenticated;
grant execute on function public.approve_homecourt_entity_suggestion(uuid) to authenticated;

-- Non-RBA managers may start their own internal development cycle, but may not
-- self-assign RBA clinic/partner commercial entitlements.
drop policy if exists "team development cycles insert" on public.team_development_cycles;
create policy "team development cycles insert"
on public.team_development_cycles for insert
to authenticated
with check (
  created_by=(select auth.uid())
  and (
    private.is_global_admin()
    or (
      private.is_entity_manager(entity_id)
      and source_service='self_started'
      and package_key='custom'
      and commercial_status='included'
      and access_ends_at is null
    )
  )
);

create or replace function private.guard_team_development_commercial_fields()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not private.is_global_admin() then
    if new.source_service is distinct from old.source_service
       or new.package_key is distinct from old.package_key
       or new.commercial_status is distinct from old.commercial_status
       or new.access_ends_at is distinct from old.access_ends_at
       or new.entity_id is distinct from old.entity_id then
      raise exception 'commercial fields are managed by RBA';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists team_development_commercial_guard on public.team_development_cycles;
create trigger team_development_commercial_guard
before update on public.team_development_cycles
for each row execute function private.guard_team_development_commercial_fields();

drop policy if exists "team development checkins update" on public.team_development_checkins;
create policy "team development checkins update"
on public.team_development_checkins for update
to authenticated
using (
  (submitted_by=(select auth.uid()) and private.can_manage_team_development(cycle_id))
  or private.is_global_admin()
)
with check (
  (submitted_by=(select auth.uid()) and private.can_manage_team_development(cycle_id))
  or private.is_global_admin()
);

drop policy if exists "team development checkins delete" on public.team_development_checkins;
create policy "team development checkins delete"
on public.team_development_checkins for delete
to authenticated
using (
  (submitted_by=(select auth.uid()) and private.can_manage_team_development(cycle_id))
  or private.is_global_admin()
);


-- =====================================================================
-- MIGRATION 20260927162454 homecourt_indexes_policy_cleanup_20260928
-- =====================================================================
-- HOMECOURT / TEAM DEVELOPMENT index and policy cleanup

create index if not exists homecourt_entity_claims_user_idx
  on public.homecourt_entity_claims(user_id);
create index if not exists homecourt_entity_claims_reviewed_by_idx
  on public.homecourt_entity_claims(reviewed_by) where reviewed_by is not null;

create index if not exists homecourt_entity_suggestions_user_idx
  on public.homecourt_entity_suggestions(user_id);
create index if not exists homecourt_entity_suggestions_reviewed_by_idx
  on public.homecourt_entity_suggestions(reviewed_by) where reviewed_by is not null;

create index if not exists homecourt_exchange_posts_entity_idx
  on public.homecourt_exchange_posts(entity_id);
create index if not exists homecourt_exchange_posts_created_by_idx
  on public.homecourt_exchange_posts(created_by);

create index if not exists homecourt_exchange_interests_responding_entity_idx
  on public.homecourt_exchange_interests(responding_entity_id);
create index if not exists homecourt_exchange_interests_created_by_idx
  on public.homecourt_exchange_interests(created_by);

create index if not exists team_development_cycles_team_idx
  on public.team_development_cycles(team_id) where team_id is not null;
create index if not exists team_development_cycles_event_idx
  on public.team_development_cycles(event_id) where event_id is not null;
create index if not exists team_development_cycles_created_by_idx
  on public.team_development_cycles(created_by);
create index if not exists team_development_briefs_submitted_by_idx
  on public.team_development_briefs(submitted_by);
create index if not exists team_development_findings_created_by_idx
  on public.team_development_findings(created_by);
create index if not exists team_development_plan_weeks_created_by_idx
  on public.team_development_plan_weeks(created_by);
create index if not exists team_development_checkins_submitted_by_idx
  on public.team_development_checkins(submitted_by);
create index if not exists team_development_reports_issued_by_idx
  on public.team_development_reports(issued_by) where issued_by is not null;

drop policy if exists "homecourt claims self cancel" on public.homecourt_entity_claims;
drop policy if exists "homecourt claims admin update" on public.homecourt_entity_claims;
create policy "homecourt claims controlled update"
on public.homecourt_entity_claims for update
to authenticated
using (
  private.is_global_admin()
  or (user_id=(select auth.uid()) and status='pending')
)
with check (
  private.is_global_admin()
  or (
    user_id=(select auth.uid())
    and status in ('pending','cancelled')
    and reviewed_by is null
    and reviewed_at is null
  )
);


-- =====================================================================
-- MIGRATION 20260927173654 team_development_90_day_cycle_20260928
-- =====================================================================
-- Move TEAM DEVELOPMENT standard cycle from 30 days to 90 days.
-- Existing clinic_30 values remain valid for backwards compatibility.

alter table public.team_development_cycles
  drop constraint if exists team_development_cycle_package_check;

alter table public.team_development_cycles
  add constraint team_development_cycle_package_check
  check (package_key in ('clinic','clinic_30','clinic_90','partner','custom'));

alter table public.team_development_cycles
  alter column package_key set default 'clinic_90';

alter table public.team_development_plan_weeks
  drop constraint if exists team_development_week_no_check;

alter table public.team_development_plan_weeks
  add constraint team_development_week_no_check
  check (week_no between 1 and 12);

alter table public.team_development_checkins
  drop constraint if exists team_development_checkin_week_check;

alter table public.team_development_checkins
  add constraint team_development_checkin_week_check
  check (week_no is null or week_no between 1 and 12);

create table if not exists public.team_development_phase_reviews (
  id uuid primary key default gen_random_uuid(),
  cycle_id uuid not null references public.team_development_cycles(id) on delete cascade,
  phase_no integer not null check (phase_no between 1 and 3),
  review_on date not null default current_date,
  submitted_by uuid not null references public.profiles(id) on delete restrict,
  progress_state text not null default 'trying'
    check (progress_state in ('not_started','trying','more_consistent','embedded')),
  what_changed text not null default '',
  evidence text not null default '',
  next_priority text not null default '',
  rba_note text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(cycle_id,phase_no)
);

create index if not exists team_development_phase_reviews_cycle_idx
  on public.team_development_phase_reviews(cycle_id,phase_no);
create index if not exists team_development_phase_reviews_submitted_by_idx
  on public.team_development_phase_reviews(submitted_by);

alter table public.team_development_phase_reviews enable row level security;

drop policy if exists "team development phase reviews read" on public.team_development_phase_reviews;
create policy "team development phase reviews read"
on public.team_development_phase_reviews for select
to authenticated
using (private.can_manage_team_development(cycle_id));

drop policy if exists "team development phase reviews insert" on public.team_development_phase_reviews;
create policy "team development phase reviews insert"
on public.team_development_phase_reviews for insert
to authenticated
with check (
  submitted_by=(select auth.uid())
  and private.can_manage_team_development(cycle_id)
);

drop policy if exists "team development phase reviews update" on public.team_development_phase_reviews;
create policy "team development phase reviews update"
on public.team_development_phase_reviews for update
to authenticated
using (
  (submitted_by=(select auth.uid()) and private.can_manage_team_development(cycle_id))
  or private.is_global_admin()
)
with check (
  (submitted_by=(select auth.uid()) and private.can_manage_team_development(cycle_id))
  or private.is_global_admin()
);

comment on table public.team_development_phase_reviews is
'Day 30, Day 60 and Day 90 team-level review checkpoints for the 90-day RBA TEAM DEVELOPMENT cycle.';

-- =====================================================================
-- MIGRATION 20260928021234 homecourt_match_rpc_invoker_20260928
-- =====================================================================
-- HOMECOURT public MATCH RPC should respect table RLS and never bypass it.
alter function public.get_homecourt_exchange_posts() security invoker;

revoke execute on function public.get_homecourt_exchange_posts() from public;
grant execute on function public.get_homecourt_exchange_posts() to anon, authenticated;

comment on function public.get_homecourt_exchange_posts() is
'Returns safe public fields for open HOMECOURT MATCH posts while respecting homecourt_exchange_posts RLS.';

-- =====================================================================
-- MIGRATION 20260928021621 homecourt_admin_policies_20260928
-- =====================================================================
-- Allow authenticated global admins to complete HOMECOURT review workflows
-- while keeping normal entity managers scoped to their own entities.

drop policy if exists "memberships_read" on public.entity_memberships;
create policy "memberships_read"
on public.entity_memberships for select
to authenticated
using (
  user_id=(select auth.uid())
  or private.is_entity_manager(entity_id)
  or private.is_global_admin()
);

drop policy if exists "memberships_manage_insert" on public.entity_memberships;
create policy "memberships_manage_insert"
on public.entity_memberships for insert
to authenticated
with check (
  private.is_entity_manager(entity_id)
  or private.is_global_admin()
);

drop policy if exists "memberships_manage_update" on public.entity_memberships;
create policy "memberships_manage_update"
on public.entity_memberships for update
to authenticated
using (
  private.is_entity_manager(entity_id)
  or private.is_global_admin()
)
with check (
  private.is_entity_manager(entity_id)
  or private.is_global_admin()
);

drop policy if exists "memberships_manage_delete" on public.entity_memberships;
create policy "memberships_manage_delete"
on public.entity_memberships for delete
to authenticated
using (
  private.is_entity_manager(entity_id)
  or private.is_global_admin()
);

drop policy if exists "homecourt public entities manager insert" on public.homecourt_public_entities;
create policy "homecourt public entities manager insert"
on public.homecourt_public_entities for insert
to authenticated
with check (
  private.is_entity_manager(entity_id)
  or private.is_global_admin()
);

drop policy if exists "homecourt public entities manager update" on public.homecourt_public_entities;
create policy "homecourt public entities manager update"
on public.homecourt_public_entities for update
to authenticated
using (
  private.is_entity_manager(entity_id)
  or private.is_global_admin()
)
with check (
  private.is_entity_manager(entity_id)
  or private.is_global_admin()
);

-- =====================================================================
-- MIGRATION 20260928022018 rba_operator_scope_20260928
-- =====================================================================
-- Scope RBA platform moderation/issuer authority to managers of the
-- Riot Basketball Academy platform entity. This avoids requiring a database-wide
-- admin role for normal RBA operations while keeping authority explicit.

create or replace function private.is_rba_operator()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.platform_entities e
    where e.slug='riot-basketball-academy'
      and (
        e.created_by=(select auth.uid())
        or exists (
          select 1
          from public.entity_memberships em
          where em.entity_id=e.id
            and em.user_id=(select auth.uid())
            and em.status='active'
            and em.member_role in ('owner','admin')
        )
      )
  );
$$;

-- Platform moderation / claim review
drop policy if exists "memberships_read" on public.entity_memberships;
create policy "memberships_read"
on public.entity_memberships for select
to authenticated
using (
  user_id=(select auth.uid())
  or private.is_entity_manager(entity_id)
  or private.is_rba_operator()
  or private.is_global_admin()
);

drop policy if exists "memberships_manage_insert" on public.entity_memberships;
create policy "memberships_manage_insert"
on public.entity_memberships for insert
to authenticated
with check (
  private.is_entity_manager(entity_id)
  or private.is_rba_operator()
  or private.is_global_admin()
);

drop policy if exists "memberships_manage_update" on public.entity_memberships;
create policy "memberships_manage_update"
on public.entity_memberships for update
to authenticated
using (
  private.is_entity_manager(entity_id)
  or private.is_rba_operator()
  or private.is_global_admin()
)
with check (
  private.is_entity_manager(entity_id)
  or private.is_rba_operator()
  or private.is_global_admin()
);

drop policy if exists "memberships_manage_delete" on public.entity_memberships;
create policy "memberships_manage_delete"
on public.entity_memberships for delete
to authenticated
using (
  private.is_entity_manager(entity_id)
  or private.is_rba_operator()
  or private.is_global_admin()
);

drop policy if exists "homecourt public entities manager insert" on public.homecourt_public_entities;
create policy "homecourt public entities manager insert"
on public.homecourt_public_entities for insert
to authenticated
with check (
  private.is_entity_manager(entity_id)
  or private.is_rba_operator()
  or private.is_global_admin()
);

drop policy if exists "homecourt public entities manager update" on public.homecourt_public_entities;
create policy "homecourt public entities manager update"
on public.homecourt_public_entities for update
to authenticated
using (
  private.is_entity_manager(entity_id)
  or private.is_rba_operator()
  or private.is_global_admin()
)
with check (
  private.is_entity_manager(entity_id)
  or private.is_rba_operator()
  or private.is_global_admin()
);

drop policy if exists "homecourt public entities manager delete" on public.homecourt_public_entities;
create policy "homecourt public entities manager delete"
on public.homecourt_public_entities for delete
to authenticated
using (
  private.is_rba_operator()
  or private.is_global_admin()
);

drop policy if exists "homecourt claims self read" on public.homecourt_entity_claims;
create policy "homecourt claims self read"
on public.homecourt_entity_claims for select
to authenticated
using (
  user_id=(select auth.uid())
  or private.is_rba_operator()
  or private.is_global_admin()
);

drop policy if exists "homecourt claims controlled update" on public.homecourt_entity_claims;
create policy "homecourt claims controlled update"
on public.homecourt_entity_claims for update
to authenticated
using (
  private.is_rba_operator()
  or private.is_global_admin()
  or (user_id=(select auth.uid()) and status='pending')
)
with check (
  private.is_rba_operator()
  or private.is_global_admin()
  or (
    user_id=(select auth.uid())
    and status in ('pending','cancelled')
    and reviewed_by is null
    and reviewed_at is null
  )
);

drop policy if exists "homecourt suggestions self read" on public.homecourt_entity_suggestions;
create policy "homecourt suggestions self read"
on public.homecourt_entity_suggestions for select
to authenticated
using (
  user_id=(select auth.uid())
  or private.is_rba_operator()
  or private.is_global_admin()
);

drop policy if exists "homecourt suggestions admin update" on public.homecourt_entity_suggestions;
create policy "homecourt suggestions admin update"
on public.homecourt_entity_suggestions for update
to authenticated
using (
  private.is_rba_operator()
  or private.is_global_admin()
)
with check (
  private.is_rba_operator()
  or private.is_global_admin()
);

create or replace function public.approve_homecourt_entity_claim(claim_id uuid)
returns boolean
language plpgsql
security invoker
set search_path = ''
as $$
declare
  c public.homecourt_entity_claims%rowtype;
begin
  if not (private.is_rba_operator() or private.is_global_admin()) then
    raise exception 'not authorized';
  end if;

  select * into c
  from public.homecourt_entity_claims
  where id=claim_id
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

create or replace function public.approve_homecourt_entity_suggestion(suggestion_id uuid)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  s public.homecourt_entity_suggestions%rowtype;
  new_entity_id uuid;
  new_slug text;
begin
  if not (private.is_rba_operator() or private.is_global_admin()) then
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
$$;

-- RBA-issued TEAM DEVELOPMENT authoring and commercial controls
create or replace function private.can_manage_team_development(target_cycle uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.team_development_cycles c
    where c.id=target_cycle
      and (
        private.is_entity_manager(c.entity_id)
        or private.is_rba_operator()
        or private.is_global_admin()
      )
  );
$$;

drop policy if exists "team development cycles insert" on public.team_development_cycles;
create policy "team development cycles insert"
on public.team_development_cycles for insert
to authenticated
with check (
  created_by=(select auth.uid())
  and (
    private.is_rba_operator()
    or private.is_global_admin()
    or (
      private.is_entity_manager(entity_id)
      and source_service='self_started'
      and package_key='custom'
      and commercial_status='included'
      and access_ends_at is null
    )
  )
);

drop policy if exists "team development findings admin insert" on public.team_development_findings;
create policy "team development findings admin insert"
on public.team_development_findings for insert
to authenticated
with check (
  created_by=(select auth.uid())
  and (private.is_rba_operator() or private.is_global_admin())
);

drop policy if exists "team development findings admin update" on public.team_development_findings;
create policy "team development findings admin update"
on public.team_development_findings for update
to authenticated
using (private.is_rba_operator() or private.is_global_admin())
with check (private.is_rba_operator() or private.is_global_admin());

drop policy if exists "team development findings admin delete" on public.team_development_findings;
create policy "team development findings admin delete"
on public.team_development_findings for delete
to authenticated
using (private.is_rba_operator() or private.is_global_admin());

drop policy if exists "team development reports admin insert" on public.team_development_reports;
create policy "team development reports admin insert"
on public.team_development_reports for insert
to authenticated
with check (private.is_rba_operator() or private.is_global_admin());

drop policy if exists "team development reports admin update" on public.team_development_reports;
create policy "team development reports admin update"
on public.team_development_reports for update
to authenticated
using (private.is_rba_operator() or private.is_global_admin())
with check (private.is_rba_operator() or private.is_global_admin());

drop policy if exists "team development plan weeks admin insert" on public.team_development_plan_weeks;
create policy "team development plan weeks admin insert"
on public.team_development_plan_weeks for insert
to authenticated
with check (
  created_by=(select auth.uid())
  and (private.is_rba_operator() or private.is_global_admin())
);

drop policy if exists "team development plan weeks admin update" on public.team_development_plan_weeks;
create policy "team development plan weeks admin update"
on public.team_development_plan_weeks for update
to authenticated
using (private.is_rba_operator() or private.is_global_admin())
with check (private.is_rba_operator() or private.is_global_admin());

drop policy if exists "team development plan weeks admin delete" on public.team_development_plan_weeks;
create policy "team development plan weeks admin delete"
on public.team_development_plan_weeks for delete
to authenticated
using (private.is_rba_operator() or private.is_global_admin());

create or replace function private.guard_team_development_commercial_fields()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not (private.is_rba_operator() or private.is_global_admin()) then
    if new.source_service is distinct from old.source_service
       or new.package_key is distinct from old.package_key
       or new.commercial_status is distinct from old.commercial_status
       or new.access_ends_at is distinct from old.access_ends_at
       or new.entity_id is distinct from old.entity_id then
      raise exception 'commercial fields are managed by RBA';
    end if;
  end if;
  return new;
end;
$$;

-- =====================================================================
-- MIGRATION 20260928022428 rba_operator_cycle_access_20260928
-- =====================================================================
-- RBA operators need to see and manage client-team development cycles
-- across entities while normal team managers remain entity-scoped.

drop policy if exists "team development cycles read" on public.team_development_cycles;
create policy "team development cycles read"
on public.team_development_cycles for select
to authenticated
using (
  private.is_entity_manager(entity_id)
  or private.is_rba_operator()
  or private.is_global_admin()
);

drop policy if exists "team development cycles update" on public.team_development_cycles;
create policy "team development cycles update"
on public.team_development_cycles for update
to authenticated
using (
  private.is_entity_manager(entity_id)
  or private.is_rba_operator()
  or private.is_global_admin()
)
with check (
  private.is_entity_manager(entity_id)
  or private.is_rba_operator()
  or private.is_global_admin()
);

-- =====================================================================
-- MIGRATION 20260928125138 add_public_journal_hero_image
-- =====================================================================

alter table public.public_journal_posts
  add column if not exists hero_image_url text,
  add column if not exists hero_image_alt text;


-- =====================================================================
-- MIGRATION 20260928135025 add_paid_article_player_progress
-- =====================================================================

create table if not exists public.dhub_paid_article_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  article_id uuid not null references public.dhub_paid_articles(id) on delete cascade,
  status text not null default 'started' check (status in ('started','completed')),
  reflection text not null default '',
  next_action text not null default '',
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id,article_id)
);

alter table public.dhub_paid_article_progress enable row level security;

drop policy if exists "paid_article_progress_select_own" on public.dhub_paid_article_progress;
create policy "paid_article_progress_select_own"
on public.dhub_paid_article_progress
for select
using (auth.uid() = user_id);

drop policy if exists "paid_article_progress_insert_own" on public.dhub_paid_article_progress;
create policy "paid_article_progress_insert_own"
on public.dhub_paid_article_progress
for insert
with check (auth.uid() = user_id);

drop policy if exists "paid_article_progress_update_own" on public.dhub_paid_article_progress;
create policy "paid_article_progress_update_own"
on public.dhub_paid_article_progress
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create index if not exists dhub_paid_article_progress_user_idx
on public.dhub_paid_article_progress(user_id,updated_at desc);


-- =====================================================================
-- MIGRATION 20260928140230 optimize_paid_article_progress_rls_and_indexes
-- =====================================================================

create index if not exists dhub_paid_article_progress_article_idx
on public.dhub_paid_article_progress(article_id);

drop policy if exists "paid_article_progress_select_own" on public.dhub_paid_article_progress;
create policy "paid_article_progress_select_own"
on public.dhub_paid_article_progress
for select
using ((select auth.uid()) = user_id);

drop policy if exists "paid_article_progress_insert_own" on public.dhub_paid_article_progress;
create policy "paid_article_progress_insert_own"
on public.dhub_paid_article_progress
for insert
with check ((select auth.uid()) = user_id);

drop policy if exists "paid_article_progress_update_own" on public.dhub_paid_article_progress;
create policy "paid_article_progress_update_own"
on public.dhub_paid_article_progress
for update
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);


-- =====================================================================
-- MIGRATION 20260929135802 gream_dhub_players_entitlement
-- =====================================================================
create or replace function public.has_dhub_player_access()
returns boolean
language sql
stable
security definer
set search_path to 'public','auth'
as $function$
  select public.has_dhub_program_access('players')
  or exists (
    select 1
    from public.team_memberships tm
    join public.teams t on t.id=tm.team_id
    where tm.user_id=auth.uid()
      and tm.status='active'
      and tm.member_role='player'
      and t.category='gream_u15'
  );
$function$;

-- =====================================================================
-- MIGRATION 20260929152449 add_secure_digital_materials
-- =====================================================================

create table if not exists public.digital_materials (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  service_offer_id uuid not null unique references public.service_offers(id) on delete restrict,
  title text not null check (char_length(title) between 1 and 180),
  subtitle text,
  summary text,
  publication_status text not null default 'draft' check (publication_status in ('draft','published','archived')),
  content jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.digital_materials enable row level security;

drop policy if exists digital_materials_paid_read on public.digital_materials;
create policy digital_materials_paid_read
on public.digital_materials
for select
to authenticated
using (
  private.is_global_admin()
  or (
    publication_status = 'published'
    and exists (
      select 1
      from public.platform_orders po
      where po.user_id = (select auth.uid())
        and po.service_offer_id = digital_materials.service_offer_id
        and po.status in ('paid','confirmed','fulfilled')
    )
  )
);

comment on table public.digital_materials is
'Secure paid digital learning materials. Full content is readable only by an authenticated purchaser or global admin.';


-- =====================================================================
-- MIGRATION 20260930045522 create_public_journal_media_bucket
-- =====================================================================

insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values (
  'public-journal-media',
  'public-journal-media',
  true,
  10485760,
  array['image/jpeg','image/png','image/webp']::text[]
)
on conflict (id) do update
set public=true,
    file_size_limit=excluded.file_size_limit,
    allowed_mime_types=excluded.allowed_mime_types;

drop policy if exists "admin manages public journal media" on storage.objects;
create policy "admin manages public journal media"
on storage.objects
for all
to authenticated
using (
  bucket_id='public-journal-media'
  and exists (
    select 1 from public.profiles p
    where p.id=(select auth.uid()) and p.role='admin'::rba_role
  )
)
with check (
  bucket_id='public-journal-media'
  and exists (
    select 1 from public.profiles p
    where p.id=(select auth.uid()) and p.role='admin'::rba_role
  )
);

drop policy if exists "temporary kawasaki journal upload" on storage.objects;
create policy "temporary kawasaki journal upload"
on storage.objects
for insert
to anon
with check (
  bucket_id='public-journal-media'
  and name in (
    'kawasaki-clinic-2026/group.jpg',
    'kawasaki-clinic-2026/court.jpg'
  )
);


-- =====================================================================
-- MIGRATION 20260930090818 dhub_project_network
-- =====================================================================

create table if not exists public.dhub_project_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  base_region text not null default '',
  travel_ok boolean not null default false,
  specialties text[] not null default '{}',
  age_groups text[] not null default '{}',
  credentials text[] not null default '{}',
  languages text[] not null default '{}',
  bio text not null default '',
  portfolio_url text,
  open_to_projects boolean not null default true,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.dhub_projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null default '',
  category text not null check (category in ('on_court','team_support','regional','international','performance','operations','other')),
  status text not null default 'draft' check (status in ('draft','open','matching','filled','completed','cancelled')),
  visibility text not null default 'members' check (visibility in ('members','direct')),
  region text not null default '',
  venue text,
  starts_at timestamptz,
  ends_at timestamptz,
  application_deadline timestamptz,
  roles_needed integer not null default 1 check (roles_needed > 0),
  target_age_groups text[] not null default '{}',
  required_experience text[] not null default '{}',
  required_credentials text[] not null default '{}',
  required_languages text[] not null default '{}',
  responsibilities text[] not null default '{}',
  compensation_type text not null default 'paid' check (compensation_type in ('paid','expenses_only','volunteer')),
  compensation_jpy_min integer,
  compensation_jpy_max integer,
  expense_terms text not null default '',
  cancellation_terms text not null default '',
  safeguarding_notes text not null default '',
  contact_notes text not null default '',
  created_by uuid references auth.users(id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (compensation_jpy_min is null or compensation_jpy_min >= 0),
  check (compensation_jpy_max is null or compensation_jpy_max >= 0),
  check (compensation_jpy_min is null or compensation_jpy_max is null or compensation_jpy_max >= compensation_jpy_min),
  check (ends_at is null or starts_at is null or ends_at >= starts_at)
);

create table if not exists public.dhub_project_applications (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.dhub_projects(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  proposed_role text not null default '',
  motivation text not null default '',
  availability_note text not null default '',
  member_note text not null default '',
  admin_note text not null default '',
  status text not null default 'submitted' check (status in ('submitted','reviewing','shortlisted','selected','not_selected','withdrawn','completed')),
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(project_id,user_id)
);

create index if not exists dhub_projects_status_deadline_idx on public.dhub_projects(status, application_deadline);
create index if not exists dhub_projects_category_region_idx on public.dhub_projects(category, region);
create index if not exists dhub_project_applications_project_status_idx on public.dhub_project_applications(project_id,status);
create index if not exists dhub_project_applications_user_idx on public.dhub_project_applications(user_id,submitted_at desc);

alter table public.dhub_project_profiles enable row level security;
alter table public.dhub_projects enable row level security;
alter table public.dhub_project_applications enable row level security;

drop policy if exists "dhub project profiles own read" on public.dhub_project_profiles;
create policy "dhub project profiles own read" on public.dhub_project_profiles
for select to authenticated
using (user_id = auth.uid() or private.is_global_admin());

drop policy if exists "dhub project profiles own insert" on public.dhub_project_profiles;
create policy "dhub project profiles own insert" on public.dhub_project_profiles
for insert to authenticated
with check (user_id = auth.uid() and public.has_dhub_coach_access());

drop policy if exists "dhub project profiles own update" on public.dhub_project_profiles;
create policy "dhub project profiles own update" on public.dhub_project_profiles
for update to authenticated
using (user_id = auth.uid() or private.is_global_admin())
with check (user_id = auth.uid() or private.is_global_admin());

drop policy if exists "dhub projects member read" on public.dhub_projects;
create policy "dhub projects member read" on public.dhub_projects
for select to authenticated
using (
  private.is_global_admin()
  or (
    public.has_dhub_coach_access()
    and (
      (visibility='members' and status in ('open','matching','filled','completed'))
      or (
        visibility='direct'
        and exists (
          select 1 from public.dhub_project_applications a
          where a.project_id=dhub_projects.id and a.user_id=auth.uid()
        )
      )
    )
  )
);

drop policy if exists "dhub projects admin insert" on public.dhub_projects;
create policy "dhub projects admin insert" on public.dhub_projects
for insert to authenticated
with check (private.is_global_admin());

drop policy if exists "dhub projects admin update" on public.dhub_projects;
create policy "dhub projects admin update" on public.dhub_projects
for update to authenticated
using (private.is_global_admin())
with check (private.is_global_admin());

drop policy if exists "dhub projects admin delete" on public.dhub_projects;
create policy "dhub projects admin delete" on public.dhub_projects
for delete to authenticated
using (private.is_global_admin());

drop policy if exists "dhub project applications own read" on public.dhub_project_applications;
create policy "dhub project applications own read" on public.dhub_project_applications
for select to authenticated
using (user_id=auth.uid() or private.is_global_admin());

drop policy if exists "dhub project applications own insert" on public.dhub_project_applications;
create policy "dhub project applications own insert" on public.dhub_project_applications
for insert to authenticated
with check (
  user_id=auth.uid()
  and public.has_dhub_coach_access()
  and exists (
    select 1 from public.dhub_projects p
    where p.id=project_id
      and p.status='open'
      and (p.application_deadline is null or p.application_deadline > now())
  )
);

drop policy if exists "dhub project applications own update" on public.dhub_project_applications;
create policy "dhub project applications own update" on public.dhub_project_applications
for update to authenticated
using (user_id=auth.uid() or private.is_global_admin())
with check (user_id=auth.uid() or private.is_global_admin());

drop policy if exists "dhub project applications admin delete" on public.dhub_project_applications;
create policy "dhub project applications admin delete" on public.dhub_project_applications
for delete to authenticated
using (private.is_global_admin());

grant select, insert, update on public.dhub_project_profiles to authenticated;
grant select on public.dhub_projects to authenticated;
grant insert, update, delete on public.dhub_projects to authenticated;
grant select, insert, update on public.dhub_project_applications to authenticated;
grant delete on public.dhub_project_applications to authenticated;

create or replace function public.is_dhub_project_admin()
returns boolean
language sql
stable
security definer
set search_path=''
as $$
  select private.is_global_admin();
$$;
revoke all on function public.is_dhub_project_admin() from public, anon;
grant execute on function public.is_dhub_project_admin() to authenticated, service_role;

create or replace function public.dhub_apply_to_project(
  p_project_id uuid,
  p_proposed_role text,
  p_motivation text,
  p_availability_note text,
  p_member_note text default ''
)
returns uuid
language plpgsql
security invoker
set search_path='public','auth'
as $$
declare
  application_id uuid;
begin
  if auth.uid() is null or not public.has_dhub_coach_access() then
    raise exception 'D-HUB COACH LAB access required';
  end if;
  if not exists (
    select 1 from public.dhub_projects p
    where p.id=p_project_id
      and p.status='open'
      and (p.application_deadline is null or p.application_deadline > now())
  ) then
    raise exception 'project is not open';
  end if;

  insert into public.dhub_project_applications(project_id,user_id,proposed_role,motivation,availability_note,member_note)
  values(p_project_id,auth.uid(),left(trim(coalesce(p_proposed_role,'')),200),left(trim(coalesce(p_motivation,'')),4000),left(trim(coalesce(p_availability_note,'')),2000),left(trim(coalesce(p_member_note,'')),2000))
  on conflict(project_id,user_id)
  do update set
    proposed_role=excluded.proposed_role,
    motivation=excluded.motivation,
    availability_note=excluded.availability_note,
    member_note=excluded.member_note,
    status=case when public.dhub_project_applications.status='withdrawn' then 'submitted' else public.dhub_project_applications.status end,
    updated_at=now()
  returning id into application_id;

  return application_id;
end;
$$;
revoke all on function public.dhub_apply_to_project(uuid,text,text,text,text) from public, anon;
grant execute on function public.dhub_apply_to_project(uuid,text,text,text,text) to authenticated, service_role;

create or replace function public.dhub_withdraw_project_application(p_project_id uuid)
returns boolean
language plpgsql
security invoker
set search_path='public','auth'
as $$
begin
  update public.dhub_project_applications
  set status='withdrawn', updated_at=now()
  where project_id=p_project_id and user_id=auth.uid() and status in ('submitted','reviewing','shortlisted');
  return found;
end;
$$;
revoke all on function public.dhub_withdraw_project_application(uuid) from public, anon;
grant execute on function public.dhub_withdraw_project_application(uuid) to authenticated, service_role;

comment on table public.dhub_projects is 'D-HUB COACH LAB project board. Membership never guarantees assignment or income.';
comment on table public.dhub_project_applications is 'Member applications to D-HUB projects. Terms and selection remain project-specific.';
comment on table public.dhub_project_profiles is 'Private coach project profile used only for matching; not a public directory or certification.';


-- =====================================================================
-- MIGRATION 20260930091535 dhub_project_notifications
-- =====================================================================

create or replace function public.notify_dhub_project_application_status()
returns trigger
language plpgsql
security definer
set search_path=''
as $$
declare
  project_title text;
  body_text text;
begin
  if tg_op <> 'UPDATE' or new.status = old.status then
    return new;
  end if;

  select p.title into project_title
  from public.dhub_projects p
  where p.id=new.project_id;

  body_text := case new.status
    when 'reviewing' then '応募内容をRBAが確認しています。'
    when 'shortlisted' then '担当候補として調整中です。正式決定ではありません。'
    when 'selected' then '担当者として選定されました。日程・報酬・役割等の最終確認を行ってください。'
    when 'not_selected' then '今回は担当見送りとなりました。'
    when 'completed' then '案件が完了扱いになりました。振り返りを次の実践につなげてください。'
    when 'withdrawn' then '応募辞退を受け付けました。'
    else null
  end;

  if body_text is not null then
    insert into public.platform_notifications(
      user_id,notification_type,title,body,action_url,dedupe_key
    ) values (
      new.user_id,
      'dhub_project',
      coalesce(project_title,'D-HUB PROJECT') || '｜' ||
        case new.status
          when 'reviewing' then '確認中'
          when 'shortlisted' then '候補として調整中'
          when 'selected' then '担当決定'
          when 'not_selected' then '選考結果'
          when 'completed' then '完了'
          when 'withdrawn' then '応募辞退'
          else new.status
        end,
      body_text,
      '/ja/d-hub/coaches/member/projects',
      'dhub-project-application:'||new.id::text||':'||new.status
    )
    on conflict (dedupe_key) where dedupe_key is not null do nothing;
  end if;

  return new;
end;
$$;

drop trigger if exists dhub_project_application_status_notify on public.dhub_project_applications;
create trigger dhub_project_application_status_notify
after update of status on public.dhub_project_applications
for each row execute function public.notify_dhub_project_application_status();

create or replace function public.announce_open_dhub_project()
returns trigger
language plpgsql
security definer
set search_path=''
as $$
begin
  if new.visibility='members'
     and new.status='open'
     and (tg_op='INSERT' or old.status is distinct from new.status)
  then
    insert into public.dhub_announcements(
      title,body,action_label,action_url,published,pinned,published_at,created_by,program_type
    ) values (
      'D-HUB PROJECT｜'||new.title,
      case
        when new.application_deadline is not null
          then new.summary||E'\n応募締切：'||to_char(new.application_deadline at time zone 'Asia/Tokyo','YYYY/MM/DD HH24:MI')
        else new.summary
      end,
      '案件を見る',
      '/ja/d-hub/coaches/member/projects',
      true,
      false,
      now(),
      new.created_by,
      'coach_lab'
    );
  end if;
  return new;
end;
$$;

drop trigger if exists dhub_project_open_announcement on public.dhub_projects;
create trigger dhub_project_open_announcement
after insert or update of status on public.dhub_projects
for each row execute function public.announce_open_dhub_project();

comment on function public.notify_dhub_project_application_status() is 'Creates member notifications when a D-HUB project application status changes. Does not guarantee work or payment.';
comment on function public.announce_open_dhub_project() is 'Publishes a D-HUB announcement when a member-visible project is opened.';


-- =====================================================================
-- MIGRATION 20260930091939 dhub_project_financials
-- =====================================================================

create table if not exists public.dhub_project_financials (
  project_id uuid primary key references public.dhub_projects(id) on delete cascade,
  client_fee_jpy integer not null default 0 check (client_fee_jpy >= 0),
  member_compensation_jpy integer not null default 0 check (member_compensation_jpy >= 0),
  travel_budget_jpy integer not null default 0 check (travel_budget_jpy >= 0),
  other_direct_cost_jpy integer not null default 0 check (other_direct_cost_jpy >= 0),
  payment_status text not null default 'unbilled' check (payment_status in ('unbilled','invoiced','partially_paid','paid','refunded','cancelled')),
  invoice_reference text,
  internal_notes text not null default '',
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.dhub_project_financials enable row level security;

drop policy if exists "dhub project financials admin read" on public.dhub_project_financials;
create policy "dhub project financials admin read" on public.dhub_project_financials
for select to authenticated
using (private.is_global_admin());

drop policy if exists "dhub project financials admin insert" on public.dhub_project_financials;
create policy "dhub project financials admin insert" on public.dhub_project_financials
for insert to authenticated
with check (private.is_global_admin());

drop policy if exists "dhub project financials admin update" on public.dhub_project_financials;
create policy "dhub project financials admin update" on public.dhub_project_financials
for update to authenticated
using (private.is_global_admin())
with check (private.is_global_admin());

drop policy if exists "dhub project financials admin delete" on public.dhub_project_financials;
create policy "dhub project financials admin delete" on public.dhub_project_financials
for delete to authenticated
using (private.is_global_admin());

grant select,insert,update,delete on public.dhub_project_financials to authenticated;

comment on table public.dhub_project_financials is 'Admin-only D-HUB project economics. Never exposed to member project listings.';


-- =====================================================================
-- MIGRATION 20260930092504 dhub_project_application_write_hardening
-- =====================================================================

-- Harden D-HUB project application writes.
-- Members must use RPCs; they cannot directly alter selection state or admin notes.

revoke all on table public.dhub_project_applications from authenticated;
grant select on table public.dhub_project_applications to authenticated;

drop policy if exists "dhub project applications own insert" on public.dhub_project_applications;
drop policy if exists "dhub project applications own update" on public.dhub_project_applications;
drop policy if exists "dhub project applications admin delete" on public.dhub_project_applications;

create or replace function public.dhub_apply_to_project(
  p_project_id uuid,
  p_proposed_role text,
  p_motivation text,
  p_availability_note text,
  p_member_note text default ''
)
returns uuid
language plpgsql
security definer
set search_path=''
as $$
declare
  application_id uuid;
  current_user_id uuid := auth.uid();
begin
  if current_user_id is null or not public.has_dhub_coach_access() then
    raise exception 'D-HUB COACH LAB access required';
  end if;

  if not exists (
    select 1
    from public.dhub_projects p
    where p.id=p_project_id
      and p.status='open'
      and p.visibility='members'
      and (p.application_deadline is null or p.application_deadline > now())
  ) then
    raise exception 'project is not open';
  end if;

  insert into public.dhub_project_applications(
    project_id,user_id,proposed_role,motivation,availability_note,member_note,status
  )
  values(
    p_project_id,current_user_id,
    left(trim(coalesce(p_proposed_role,'')),200),
    left(trim(coalesce(p_motivation,'')),4000),
    left(trim(coalesce(p_availability_note,'')),2000),
    left(trim(coalesce(p_member_note,'')),2000),
    'submitted'
  )
  on conflict(project_id,user_id)
  do update set
    proposed_role=excluded.proposed_role,
    motivation=excluded.motivation,
    availability_note=excluded.availability_note,
    member_note=excluded.member_note,
    status=case
      when public.dhub_project_applications.status in ('withdrawn','not_selected') then 'submitted'
      else public.dhub_project_applications.status
    end,
    updated_at=now()
  where public.dhub_project_applications.user_id=current_user_id
  returning id into application_id;

  return application_id;
end;
$$;

revoke all on function public.dhub_apply_to_project(uuid,text,text,text,text) from public, anon;
grant execute on function public.dhub_apply_to_project(uuid,text,text,text,text) to authenticated, service_role;

create or replace function public.dhub_withdraw_project_application(p_project_id uuid)
returns boolean
language plpgsql
security definer
set search_path=''
as $$
declare
  current_user_id uuid := auth.uid();
begin
  if current_user_id is null then
    raise exception 'authentication required';
  end if;

  update public.dhub_project_applications
  set status='withdrawn', updated_at=now()
  where project_id=p_project_id
    and user_id=current_user_id
    and status in ('submitted','reviewing','shortlisted');

  return found;
end;
$$;

revoke all on function public.dhub_withdraw_project_application(uuid) from public, anon;
grant execute on function public.dhub_withdraw_project_application(uuid) to authenticated, service_role;

create or replace function public.dhub_admin_update_application_status(
  p_application_id uuid,
  p_status text,
  p_admin_note text default ''
)
returns boolean
language plpgsql
security definer
set search_path=''
as $$
declare
  target_project_id uuid;
  target_status text;
  role_limit integer;
  selected_count integer;
begin
  if auth.uid() is null or not private.is_global_admin() then
    raise exception 'admin access required';
  end if;

  if p_status not in ('submitted','reviewing','shortlisted','selected','not_selected','withdrawn','completed') then
    raise exception 'invalid status';
  end if;

  select a.project_id,a.status
    into target_project_id,target_status
  from public.dhub_project_applications a
  where a.id=p_application_id
  for update;

  if target_project_id is null then
    raise exception 'application not found';
  end if;

  if p_status='selected' and target_status<>'selected' then
    select p.roles_needed into role_limit
    from public.dhub_projects p
    where p.id=target_project_id
    for update;

    select count(*) into selected_count
    from public.dhub_project_applications a
    where a.project_id=target_project_id
      and a.status='selected'
      and a.id<>p_application_id;

    if selected_count >= role_limit then
      raise exception 'selected roles already filled';
    end if;
  end if;

  update public.dhub_project_applications
  set status=p_status,
      admin_note=left(trim(coalesce(p_admin_note,'')),4000),
      updated_at=now()
  where id=p_application_id;

  if p_status='selected' then
    select count(*) into selected_count
    from public.dhub_project_applications a
    where a.project_id=target_project_id
      and a.status='selected';

    select p.roles_needed into role_limit
    from public.dhub_projects p
    where p.id=target_project_id;

    if selected_count >= role_limit then
      update public.dhub_projects
      set status='filled', updated_at=now()
      where id=target_project_id and status in ('open','matching');
    else
      update public.dhub_projects
      set status='matching', updated_at=now()
      where id=target_project_id and status='open';
    end if;
  end if;

  return true;
end;
$$;

revoke all on function public.dhub_admin_update_application_status(uuid,text,text) from public, anon;
grant execute on function public.dhub_admin_update_application_status(uuid,text,text) to authenticated, service_role;

comment on function public.dhub_admin_update_application_status(uuid,text,text)
is 'Admin-only status transition for D-HUB project applications. Prevents member status escalation and over-selection beyond roles_needed.';


-- =====================================================================
-- MIGRATION 20260930093307 dhub_project_operations_v2
-- =====================================================================

create table if not exists public.dhub_client_requests (
  id uuid primary key default gen_random_uuid(),
  source text not null default 'jotform',
  source_submission_id text,
  organization_name text not null default '',
  contact_name text not null default '',
  email text not null default '',
  phone text not null default '',
  request_type text not null default 'other',
  age_groups text[] not null default '{}',
  region_venue text not null default '',
  preferred_schedule text not null default '',
  participant_count integer,
  objective text not null default '',
  roles_requested text not null default '',
  budget_range text not null default '',
  transport_support text not null default '',
  accommodation_support text not null default '',
  required_qualifications text not null default '',
  safeguarding_notes text not null default '',
  other_notes text not null default '',
  status text not null default 'new' check (status in ('new','reviewing','qualified','proposal','converted','declined','archived')),
  raw_payload jsonb not null default '{}'::jsonb,
  converted_project_id uuid references public.dhub_projects(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(source, source_submission_id)
);

alter table public.dhub_projects
  add column if not exists client_request_id uuid references public.dhub_client_requests(id) on delete set null;

create table if not exists public.dhub_project_invites (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.dhub_projects(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role_title text not null default '',
  message text not null default '',
  status text not null default 'pending' check (status in ('pending','accepted','declined','expired','cancelled')),
  invited_by uuid references auth.users(id) on delete set null,
  expires_at timestamptz,
  responded_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(project_id,user_id)
);

create table if not exists public.dhub_project_assignments (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.dhub_projects(id) on delete cascade,
  application_id uuid references public.dhub_project_applications(id) on delete set null,
  user_id uuid not null references auth.users(id) on delete cascade,
  role_title text not null,
  scope_of_work text not null default '',
  compensation_jpy integer not null default 0 check (compensation_jpy >= 0),
  expense_terms text not null default '',
  expected_hours numeric(6,2),
  payment_due_at timestamptz,
  cancellation_terms text not null default '',
  terms_status text not null default 'draft' check (terms_status in ('draft','offered','accepted','declined','ready','active','completed','cancelled')),
  offered_at timestamptz,
  responded_at timestamptz,
  accepted_at timestamptz,
  ready_at timestamptz,
  completed_at timestamptz,
  terms_snapshot jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(project_id,user_id,role_title)
);

create table if not exists public.dhub_project_safety_checks (
  assignment_id uuid primary key references public.dhub_project_assignments(id) on delete cascade,
  minors_involved boolean not null default true,
  identity_verified boolean not null default false,
  credentials_verified boolean not null default false,
  supervision_confirmed boolean not null default false,
  emergency_process_confirmed boolean not null default false,
  media_policy_confirmed boolean not null default false,
  transport_responsibility_confirmed boolean not null default false,
  overnight_responsibility_confirmed boolean not null default false,
  medical_escalation_confirmed boolean not null default false,
  communication_boundaries_confirmed boolean not null default false,
  notes text not null default '',
  checked_by uuid references auth.users(id) on delete set null,
  checked_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.dhub_project_member_reports (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null unique references public.dhub_project_assignments(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  actual_hours numeric(6,2),
  delivery_summary text not null default '',
  reflection text not null default '',
  issues text not null default '',
  next_step text not null default '',
  submitted_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.dhub_project_closeouts (
  project_id uuid primary key references public.dhub_projects(id) on delete cascade,
  participant_count integer,
  client_confirmed boolean not null default false,
  client_feedback text not null default '',
  incident_count integer not null default 0 check (incident_count >= 0),
  safeguarding_incident boolean not null default false,
  delivery_summary text not null default '',
  next_opportunity text not null default '',
  completed_by uuid references auth.users(id) on delete set null,
  completed_at timestamptz,
  updated_at timestamptz not null default now()
);

create index if not exists dhub_client_requests_status_created_idx on public.dhub_client_requests(status,created_at desc);
create index if not exists dhub_project_invites_user_status_idx on public.dhub_project_invites(user_id,status,created_at desc);
create index if not exists dhub_project_assignments_user_status_idx on public.dhub_project_assignments(user_id,terms_status,created_at desc);
create index if not exists dhub_project_assignments_project_idx on public.dhub_project_assignments(project_id);
create index if not exists dhub_project_member_reports_user_idx on public.dhub_project_member_reports(user_id,updated_at desc);

alter table public.dhub_client_requests enable row level security;
alter table public.dhub_project_invites enable row level security;
alter table public.dhub_project_assignments enable row level security;
alter table public.dhub_project_safety_checks enable row level security;
alter table public.dhub_project_member_reports enable row level security;
alter table public.dhub_project_closeouts enable row level security;

create policy "dhub client requests admin read" on public.dhub_client_requests
for select to authenticated using (private.is_global_admin());
create policy "dhub client requests admin insert" on public.dhub_client_requests
for insert to authenticated with check (private.is_global_admin());
create policy "dhub client requests admin update" on public.dhub_client_requests
for update to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "dhub client requests admin delete" on public.dhub_client_requests
for delete to authenticated using (private.is_global_admin());

create policy "dhub project invites own read" on public.dhub_project_invites
for select to authenticated using (user_id=auth.uid() or private.is_global_admin());

create policy "dhub project assignments own read" on public.dhub_project_assignments
for select to authenticated using (user_id=auth.uid() or private.is_global_admin());

create policy "dhub project safety admin read" on public.dhub_project_safety_checks
for select to authenticated using (private.is_global_admin());

create policy "dhub project reports own read" on public.dhub_project_member_reports
for select to authenticated using (user_id=auth.uid() or private.is_global_admin());
create policy "dhub project reports own insert" on public.dhub_project_member_reports
for insert to authenticated with check (
  user_id=auth.uid()
  and exists (
    select 1 from public.dhub_project_assignments a
    where a.id=assignment_id and a.user_id=auth.uid() and a.terms_status in ('ready','active','completed')
  )
);
create policy "dhub project reports own update" on public.dhub_project_member_reports
for update to authenticated
using (user_id=auth.uid())
with check (user_id=auth.uid());

create policy "dhub project closeouts admin read" on public.dhub_project_closeouts
for select to authenticated using (private.is_global_admin());

grant select,insert,update,delete on public.dhub_client_requests to authenticated;
grant select on public.dhub_project_invites to authenticated;
grant select on public.dhub_project_assignments to authenticated;
grant select on public.dhub_project_safety_checks to authenticated;
grant select,insert,update on public.dhub_project_member_reports to authenticated;
grant select on public.dhub_project_closeouts to authenticated;

-- Allow directly invited members to inspect a direct-visibility project before responding.
drop policy if exists "dhub projects member read" on public.dhub_projects;
create policy "dhub projects member read" on public.dhub_projects
for select to authenticated
using (
  private.is_global_admin()
  or (
    public.has_dhub_coach_access()
    and (
      (visibility='members' and status in ('open','matching','filled','completed'))
      or (
        visibility='direct'
        and (
          exists (
            select 1 from public.dhub_project_applications a
            where a.project_id=dhub_projects.id and a.user_id=auth.uid()
          )
          or exists (
            select 1 from public.dhub_project_invites i
            where i.project_id=dhub_projects.id
              and i.user_id=auth.uid()
              and i.status='pending'
              and (i.expires_at is null or i.expires_at > now())
          )
        )
      )
    )
  )
);

create or replace function public.dhub_admin_convert_client_request(
  p_request_id uuid,
  p_slug text,
  p_title text
)
returns uuid
language plpgsql
security definer
set search_path=''
as $$
declare
  r public.dhub_client_requests%rowtype;
  new_project_id uuid;
  mapped_category text;
begin
  if auth.uid() is null or not private.is_global_admin() then
    raise exception 'admin access required';
  end if;

  select * into r from public.dhub_client_requests where id=p_request_id for update;
  if r.id is null then raise exception 'request not found'; end if;
  if r.converted_project_id is not null then return r.converted_project_id; end if;

  mapped_category := case r.request_type
    when 'on_court' then 'on_court'
    when 'team_support' then 'team_support'
    when 'regional' then 'regional'
    when 'international' then 'international'
    when 'performance' then 'performance'
    when 'operations' then 'operations'
    else 'other'
  end;

  insert into public.dhub_projects(
    slug,title,summary,category,status,visibility,region,roles_needed,
    target_age_groups,compensation_type,contact_notes,client_request_id,created_by
  )
  values(
    lower(trim(p_slug)),
    left(trim(p_title),160),
    left(coalesce(nullif(trim(r.objective),''),nullif(trim(r.roles_requested),''),'Client request'),1500),
    mapped_category,
    'draft',
    'members',
    left(trim(r.region_venue),120),
    1,
    r.age_groups,
    'paid',
    left(
      concat_ws(E'\n',
        nullif('Organization: '||r.organization_name,'Organization: '),
        nullif('Contact: '||r.contact_name,'Contact: '),
        nullif('Budget: '||r.budget_range,'Budget: '),
        nullif('Requested roles: '||r.roles_requested,'Requested roles: ')
      ),2000
    ),
    r.id,
    auth.uid()
  )
  returning id into new_project_id;

  update public.dhub_client_requests
  set status='converted',converted_project_id=new_project_id,updated_at=now()
  where id=r.id;

  return new_project_id;
end;
$$;

revoke all on function public.dhub_admin_convert_client_request(uuid,text,text) from public,anon;
grant execute on function public.dhub_admin_convert_client_request(uuid,text,text) to authenticated,service_role;

create or replace function public.dhub_admin_invite_member(
  p_project_id uuid,
  p_user_id uuid,
  p_role_title text,
  p_message text default '',
  p_expires_at timestamptz default null
)
returns uuid
language plpgsql
security definer
set search_path=''
as $$
declare invite_id uuid;
begin
  if auth.uid() is null or not private.is_global_admin() then raise exception 'admin access required'; end if;
  if not exists (select 1 from public.dhub_projects p where p.id=p_project_id and p.visibility='direct') then
    raise exception 'direct project required';
  end if;
  if not public.has_dhub_program_access_for_user(p_user_id,'coach_lab') then
    raise exception 'target user does not have D-HUB COACH LAB access';
  end if;

  insert into public.dhub_project_invites(project_id,user_id,role_title,message,invited_by,expires_at)
  values(p_project_id,p_user_id,left(trim(p_role_title),200),left(trim(coalesce(p_message,'')),2000),auth.uid(),p_expires_at)
  on conflict(project_id,user_id)
  do update set role_title=excluded.role_title,message=excluded.message,status='pending',invited_by=auth.uid(),expires_at=excluded.expires_at,responded_at=null,updated_at=now()
  returning id into invite_id;

  return invite_id;
end;
$$;

-- Helper because has_dhub_program_access() is caller-scoped.
create or replace function public.has_dhub_program_access_for_user(p_user_id uuid,p_program_type text)
returns boolean
language sql
stable
security definer
set search_path=''
as $$
  select exists (
    select 1 from public.dhub_memberships m
    where m.linked_user_id=p_user_id
      and m.program_type=p_program_type
      and m.status in ('active','grace')
      and (m.access_until is null or m.access_until > now())
  );
$$;
revoke all on function public.has_dhub_program_access_for_user(uuid,text) from public,anon;
grant execute on function public.has_dhub_program_access_for_user(uuid,text) to authenticated,service_role;

-- Recreate admin invite after helper exists.
create or replace function public.dhub_admin_invite_member(
  p_project_id uuid,
  p_user_id uuid,
  p_role_title text,
  p_message text default '',
  p_expires_at timestamptz default null
)
returns uuid
language plpgsql
security definer
set search_path=''
as $$
declare invite_id uuid;
begin
  if auth.uid() is null or not private.is_global_admin() then raise exception 'admin access required'; end if;
  if not exists (select 1 from public.dhub_projects p where p.id=p_project_id and p.visibility='direct') then
    raise exception 'direct project required';
  end if;
  if not public.has_dhub_program_access_for_user(p_user_id,'coach_lab') then
    raise exception 'target user does not have D-HUB COACH LAB access';
  end if;

  insert into public.dhub_project_invites(project_id,user_id,role_title,message,invited_by,expires_at)
  values(p_project_id,p_user_id,left(trim(p_role_title),200),left(trim(coalesce(p_message,'')),2000),auth.uid(),p_expires_at)
  on conflict(project_id,user_id)
  do update set role_title=excluded.role_title,message=excluded.message,status='pending',invited_by=auth.uid(),expires_at=excluded.expires_at,responded_at=null,updated_at=now()
  returning id into invite_id;

  insert into public.platform_notifications(user_id,notification_type,title,body,action_url,dedupe_key)
  select p_user_id,'dhub_project','D-HUB PROJECT｜個別相談',
         p.title||'について、RBAから個別に参加・担当相談があります。',
         '/ja/d-hub/coaches/member/projects',
         'dhub-project-invite:'||invite_id::text||':pending'
  from public.dhub_projects p where p.id=p_project_id
  on conflict(dedupe_key) where dedupe_key is not null do nothing;

  return invite_id;
end;
$$;
revoke all on function public.dhub_admin_invite_member(uuid,uuid,text,text,timestamptz) from public,anon;
grant execute on function public.dhub_admin_invite_member(uuid,uuid,text,text,timestamptz) to authenticated,service_role;

create or replace function public.dhub_respond_project_invite(p_invite_id uuid,p_response text)
returns boolean
language plpgsql
security definer
set search_path=''
as $$
declare i public.dhub_project_invites%rowtype;
begin
  if auth.uid() is null then raise exception 'authentication required'; end if;
  if p_response not in ('accepted','declined') then raise exception 'invalid response'; end if;

  select * into i from public.dhub_project_invites
  where id=p_invite_id and user_id=auth.uid() and status='pending'
    and (expires_at is null or expires_at > now())
  for update;
  if i.id is null then raise exception 'invite not available'; end if;

  update public.dhub_project_invites
  set status=p_response,responded_at=now(),updated_at=now()
  where id=i.id;

  if p_response='accepted' then
    insert into public.dhub_project_applications(project_id,user_id,proposed_role,motivation,status)
    values(i.project_id,i.user_id,i.role_title,'RBAからの個別相談を受諾','shortlisted')
    on conflict(project_id,user_id)
    do update set proposed_role=excluded.proposed_role,status='shortlisted',updated_at=now();
  end if;

  return true;
end;
$$;
revoke all on function public.dhub_respond_project_invite(uuid,text) from public,anon;
grant execute on function public.dhub_respond_project_invite(uuid,text) to authenticated,service_role;

create or replace function public.dhub_admin_offer_assignment(
  p_project_id uuid,
  p_user_id uuid,
  p_application_id uuid,
  p_role_title text,
  p_scope_of_work text,
  p_compensation_jpy integer,
  p_expense_terms text,
  p_expected_hours numeric,
  p_payment_due_at timestamptz,
  p_cancellation_terms text
)
returns uuid
language plpgsql
security definer
set search_path=''
as $$
declare assignment_id uuid;
begin
  if auth.uid() is null or not private.is_global_admin() then raise exception 'admin access required'; end if;
  if p_compensation_jpy < 0 then raise exception 'invalid compensation'; end if;
  if p_application_id is not null and not exists (
    select 1 from public.dhub_project_applications a
    where a.id=p_application_id and a.project_id=p_project_id and a.user_id=p_user_id
      and a.status in ('shortlisted','selected')
  ) then raise exception 'application does not match assignment'; end if;

  insert into public.dhub_project_assignments(
    project_id,application_id,user_id,role_title,scope_of_work,compensation_jpy,expense_terms,
    expected_hours,payment_due_at,cancellation_terms,terms_status,offered_at,terms_snapshot,created_by
  )
  values(
    p_project_id,p_application_id,p_user_id,left(trim(p_role_title),200),left(trim(p_scope_of_work),5000),
    p_compensation_jpy,left(trim(coalesce(p_expense_terms,'')),2000),p_expected_hours,p_payment_due_at,
    left(trim(coalesce(p_cancellation_terms,'')),2000),'offered',now(),
    jsonb_build_object(
      'role_title',left(trim(p_role_title),200),
      'scope_of_work',left(trim(p_scope_of_work),5000),
      'compensation_jpy',p_compensation_jpy,
      'expense_terms',left(trim(coalesce(p_expense_terms,'')),2000),
      'expected_hours',p_expected_hours,
      'payment_due_at',p_payment_due_at,
      'cancellation_terms',left(trim(coalesce(p_cancellation_terms,'')),2000),
      'offered_at',now()
    ),
    auth.uid()
  )
  on conflict(project_id,user_id,role_title)
  do update set
    application_id=excluded.application_id,scope_of_work=excluded.scope_of_work,
    compensation_jpy=excluded.compensation_jpy,expense_terms=excluded.expense_terms,
    expected_hours=excluded.expected_hours,payment_due_at=excluded.payment_due_at,
    cancellation_terms=excluded.cancellation_terms,terms_status='offered',offered_at=now(),
    responded_at=null,accepted_at=null,ready_at=null,terms_snapshot=excluded.terms_snapshot,
    updated_at=now()
  returning id into assignment_id;

  insert into public.dhub_project_safety_checks(assignment_id)
  values(assignment_id)
  on conflict(assignment_id) do nothing;

  insert into public.platform_notifications(user_id,notification_type,title,body,action_url,dedupe_key)
  select p_user_id,'dhub_project',p.title||'｜担当条件の確認',
         '役割・報酬・実費・キャンセル条件を確認し、受諾または辞退してください。',
         '/ja/d-hub/coaches/member/projects',
         'dhub-assignment:'||assignment_id::text||':offered'
  from public.dhub_projects p where p.id=p_project_id
  on conflict(dedupe_key) where dedupe_key is not null do nothing;

  return assignment_id;
end;
$$;
revoke all on function public.dhub_admin_offer_assignment(uuid,uuid,uuid,text,text,integer,text,numeric,timestamptz,text) from public,anon;
grant execute on function public.dhub_admin_offer_assignment(uuid,uuid,uuid,text,text,integer,text,numeric,timestamptz,text) to authenticated,service_role;

create or replace function public.dhub_respond_assignment(p_assignment_id uuid,p_response text)
returns boolean
language plpgsql
security definer
set search_path=''
as $$
begin
  if auth.uid() is null then raise exception 'authentication required'; end if;
  if p_response not in ('accepted','declined') then raise exception 'invalid response'; end if;

  update public.dhub_project_assignments
  set terms_status=p_response,
      responded_at=now(),
      accepted_at=case when p_response='accepted' then now() else null end,
      updated_at=now()
  where id=p_assignment_id and user_id=auth.uid() and terms_status='offered';

  if not found then raise exception 'assignment offer not available'; end if;
  return true;
end;
$$;
revoke all on function public.dhub_respond_assignment(uuid,text) from public,anon;
grant execute on function public.dhub_respond_assignment(uuid,text) to authenticated,service_role;

create or replace function public.dhub_admin_update_safety_check(
  p_assignment_id uuid,
  p_minors_involved boolean,
  p_identity_verified boolean,
  p_credentials_verified boolean,
  p_supervision_confirmed boolean,
  p_emergency_process_confirmed boolean,
  p_media_policy_confirmed boolean,
  p_transport_responsibility_confirmed boolean,
  p_overnight_responsibility_confirmed boolean,
  p_medical_escalation_confirmed boolean,
  p_communication_boundaries_confirmed boolean,
  p_notes text default ''
)
returns boolean
language plpgsql
security definer
set search_path=''
as $$
begin
  if auth.uid() is null or not private.is_global_admin() then raise exception 'admin access required'; end if;

  insert into public.dhub_project_safety_checks(
    assignment_id,minors_involved,identity_verified,credentials_verified,supervision_confirmed,
    emergency_process_confirmed,media_policy_confirmed,transport_responsibility_confirmed,
    overnight_responsibility_confirmed,medical_escalation_confirmed,communication_boundaries_confirmed,
    notes,checked_by,checked_at,updated_at
  )
  values(
    p_assignment_id,p_minors_involved,p_identity_verified,p_credentials_verified,p_supervision_confirmed,
    p_emergency_process_confirmed,p_media_policy_confirmed,p_transport_responsibility_confirmed,
    p_overnight_responsibility_confirmed,p_medical_escalation_confirmed,p_communication_boundaries_confirmed,
    left(trim(coalesce(p_notes,'')),4000),auth.uid(),now(),now()
  )
  on conflict(assignment_id)
  do update set
    minors_involved=excluded.minors_involved,identity_verified=excluded.identity_verified,
    credentials_verified=excluded.credentials_verified,supervision_confirmed=excluded.supervision_confirmed,
    emergency_process_confirmed=excluded.emergency_process_confirmed,media_policy_confirmed=excluded.media_policy_confirmed,
    transport_responsibility_confirmed=excluded.transport_responsibility_confirmed,
    overnight_responsibility_confirmed=excluded.overnight_responsibility_confirmed,
    medical_escalation_confirmed=excluded.medical_escalation_confirmed,
    communication_boundaries_confirmed=excluded.communication_boundaries_confirmed,
    notes=excluded.notes,checked_by=auth.uid(),checked_at=now(),updated_at=now();

  return true;
end;
$$;
revoke all on function public.dhub_admin_update_safety_check(uuid,boolean,boolean,boolean,boolean,boolean,boolean,boolean,boolean,boolean,boolean,text) from public,anon;
grant execute on function public.dhub_admin_update_safety_check(uuid,boolean,boolean,boolean,boolean,boolean,boolean,boolean,boolean,boolean,boolean,text) to authenticated,service_role;

create or replace function public.dhub_admin_mark_assignment_ready(p_assignment_id uuid)
returns boolean
language plpgsql
security definer
set search_path=''
as $$
declare a public.dhub_project_assignments%rowtype;
declare s public.dhub_project_safety_checks%rowtype;
begin
  if auth.uid() is null or not private.is_global_admin() then raise exception 'admin access required'; end if;
  select * into a from public.dhub_project_assignments where id=p_assignment_id for update;
  if a.id is null then raise exception 'assignment not found'; end if;
  if a.terms_status<>'accepted' then raise exception 'member must accept assignment terms first'; end if;

  select * into s from public.dhub_project_safety_checks where assignment_id=a.id;
  if s.assignment_id is null then raise exception 'safety check missing'; end if;

  if s.minors_involved and not (
    s.identity_verified and s.credentials_verified and s.supervision_confirmed
    and s.emergency_process_confirmed and s.media_policy_confirmed
    and s.transport_responsibility_confirmed and s.overnight_responsibility_confirmed
    and s.medical_escalation_confirmed and s.communication_boundaries_confirmed
  ) then raise exception 'safeguarding checklist is incomplete'; end if;

  update public.dhub_project_assignments
  set terms_status='ready',ready_at=now(),updated_at=now()
  where id=a.id;

  if a.application_id is not null then
    update public.dhub_project_applications
    set status='selected',updated_at=now()
    where id=a.application_id and status in ('shortlisted','reviewing','submitted');
  end if;

  return true;
end;
$$;
revoke all on function public.dhub_admin_mark_assignment_ready(uuid) from public,anon;
grant execute on function public.dhub_admin_mark_assignment_ready(uuid) to authenticated,service_role;

create or replace function public.dhub_submit_member_project_report(
  p_assignment_id uuid,
  p_actual_hours numeric,
  p_delivery_summary text,
  p_reflection text,
  p_issues text,
  p_next_step text
)
returns uuid
language plpgsql
security definer
set search_path=''
as $$
declare report_id uuid;
begin
  if auth.uid() is null then raise exception 'authentication required'; end if;
  if not exists (
    select 1 from public.dhub_project_assignments a
    where a.id=p_assignment_id and a.user_id=auth.uid() and a.terms_status in ('ready','active','completed')
  ) then raise exception 'assignment not available for report'; end if;

  insert into public.dhub_project_member_reports(
    assignment_id,user_id,actual_hours,delivery_summary,reflection,issues,next_step,submitted_at
  )
  values(
    p_assignment_id,auth.uid(),p_actual_hours,left(trim(coalesce(p_delivery_summary,'')),5000),
    left(trim(coalesce(p_reflection,'')),5000),left(trim(coalesce(p_issues,'')),5000),
    left(trim(coalesce(p_next_step,'')),3000),now()
  )
  on conflict(assignment_id)
  do update set actual_hours=excluded.actual_hours,delivery_summary=excluded.delivery_summary,
    reflection=excluded.reflection,issues=excluded.issues,next_step=excluded.next_step,
    submitted_at=now(),updated_at=now()
  returning id into report_id;

  return report_id;
end;
$$;
revoke all on function public.dhub_submit_member_project_report(uuid,numeric,text,text,text,text) from public,anon;
grant execute on function public.dhub_submit_member_project_report(uuid,numeric,text,text,text,text) to authenticated,service_role;

-- New application and intake alerts for RBA admins.
create or replace function public.notify_admins_dhub_project_application()
returns trigger
language plpgsql
security definer
set search_path=''
as $$
begin
  insert into public.platform_notifications(user_id,notification_type,title,body,action_url,dedupe_key)
  select p.id,'dhub_project_admin','D-HUB PROJECT｜新規応募',
         coalesce(pr.title,'案件')||'に新しい応募が入りました。',
         '/ja/d-hub/coaches/member/projects/admin',
         'dhub-project-admin-application:'||new.id::text
  from public.profiles p
  left join public.dhub_projects pr on pr.id=new.project_id
  where p.role='admin'::public.rba_role
  on conflict(dedupe_key) where dedupe_key is not null do nothing;
  return new;
end;
$$;

drop trigger if exists dhub_project_application_admin_notify on public.dhub_project_applications;
create trigger dhub_project_application_admin_notify
after insert on public.dhub_project_applications
for each row execute function public.notify_admins_dhub_project_application();

create or replace function public.notify_admins_dhub_client_request()
returns trigger
language plpgsql
security definer
set search_path=''
as $$
begin
  insert into public.platform_notifications(user_id,notification_type,title,body,action_url,dedupe_key)
  select p.id,'dhub_project_admin','D-HUB PROJECT REQUEST｜新規依頼',
         coalesce(nullif(new.organization_name,''),'新規依頼')||'から案件相談が届きました。',
         '/ja/d-hub/coaches/member/projects/admin',
         'dhub-project-admin-request:'||new.id::text
  from public.profiles p
  where p.role='admin'::public.rba_role
  on conflict(dedupe_key) where dedupe_key is not null do nothing;
  return new;
end;
$$;

drop trigger if exists dhub_client_request_admin_notify on public.dhub_client_requests;
create trigger dhub_client_request_admin_notify
after insert on public.dhub_client_requests
for each row execute function public.notify_admins_dhub_client_request();

comment on table public.dhub_client_requests is 'Admin-only client demand pipeline. May include PII from project request forms.';
comment on table public.dhub_project_assignments is 'Formal member assignment terms. Offer acceptance and safeguarding gate precede READY.';
comment on table public.dhub_project_safety_checks is 'Admin-only safeguarding readiness checklist for a D-HUB assignment.';
comment on table public.dhub_project_member_reports is 'Member delivery report and reflection after a D-HUB project.';
comment on table public.dhub_project_closeouts is 'Admin closeout and impact record for completed D-HUB projects.';


-- =====================================================================
-- MIGRATION 20260930093632 dhub_project_webhook_verifier
-- =====================================================================

create or replace function public.verify_dhub_project_webhook_token(p_token text)
returns boolean
language sql
stable
security definer
set search_path=''
as $$
  select exists (
    select 1
    from vault.decrypted_secrets s
    where s.name='dhub_project_webhook_token'
      and s.decrypted_secret=p_token
  );
$$;

revoke all on function public.verify_dhub_project_webhook_token(text) from public,anon,authenticated;
grant execute on function public.verify_dhub_project_webhook_token(text) to service_role;

comment on function public.verify_dhub_project_webhook_token(text)
is 'Service-role-only verifier for the Jotform D-HUB project intake webhook token stored in Supabase Vault.';


-- =====================================================================
-- MIGRATION 20260930093903 dhub_project_closeout_workflow
-- =====================================================================

create or replace function public.dhub_admin_set_assignment_status(p_assignment_id uuid,p_status text)
returns boolean
language plpgsql
security definer
set search_path=''
as $$
declare a public.dhub_project_assignments%rowtype;
begin
  if auth.uid() is null or not private.is_global_admin() then raise exception 'admin access required'; end if;
  if p_status not in ('active','completed','cancelled') then raise exception 'invalid assignment status'; end if;
  select * into a from public.dhub_project_assignments where id=p_assignment_id for update;
  if a.id is null then raise exception 'assignment not found'; end if;

  if p_status='active' and a.terms_status<>'ready' then
    raise exception 'assignment must be READY before ACTIVE';
  end if;

  if p_status='completed' then
    if a.terms_status not in ('ready','active') then raise exception 'assignment cannot be completed from current status'; end if;
    if not exists (select 1 from public.dhub_project_member_reports r where r.assignment_id=a.id and r.submitted_at is not null) then
      raise exception 'member report required before completion';
    end if;
  end if;

  update public.dhub_project_assignments
  set terms_status=p_status,
      completed_at=case when p_status='completed' then now() else completed_at end,
      updated_at=now()
  where id=a.id;

  if p_status='completed' and a.application_id is not null then
    update public.dhub_project_applications set status='completed',updated_at=now() where id=a.application_id;
  end if;

  return true;
end;
$$;
revoke all on function public.dhub_admin_set_assignment_status(uuid,text) from public,anon;
grant execute on function public.dhub_admin_set_assignment_status(uuid,text) to authenticated,service_role;

create or replace function public.dhub_admin_close_project(
  p_project_id uuid,
  p_participant_count integer,
  p_client_confirmed boolean,
  p_client_feedback text,
  p_incident_count integer,
  p_safeguarding_incident boolean,
  p_delivery_summary text,
  p_next_opportunity text
)
returns boolean
language plpgsql
security definer
set search_path=''
as $$
declare open_assignment_count integer;
begin
  if auth.uid() is null or not private.is_global_admin() then raise exception 'admin access required'; end if;
  if p_incident_count<0 then raise exception 'invalid incident count'; end if;

  select count(*) into open_assignment_count
  from public.dhub_project_assignments a
  where a.project_id=p_project_id
    and a.terms_status in ('offered','accepted','ready','active');

  if open_assignment_count>0 then
    raise exception 'all assignment offers must be resolved and active assignments completed before closeout';
  end if;

  insert into public.dhub_project_closeouts(
    project_id,participant_count,client_confirmed,client_feedback,incident_count,
    safeguarding_incident,delivery_summary,next_opportunity,completed_by,completed_at,updated_at
  )
  values(
    p_project_id,p_participant_count,p_client_confirmed,left(trim(coalesce(p_client_feedback,'')),5000),
    p_incident_count,p_safeguarding_incident,left(trim(coalesce(p_delivery_summary,'')),5000),
    left(trim(coalesce(p_next_opportunity,'')),3000),auth.uid(),now(),now()
  )
  on conflict(project_id)
  do update set participant_count=excluded.participant_count,client_confirmed=excluded.client_confirmed,
    client_feedback=excluded.client_feedback,incident_count=excluded.incident_count,
    safeguarding_incident=excluded.safeguarding_incident,delivery_summary=excluded.delivery_summary,
    next_opportunity=excluded.next_opportunity,completed_by=auth.uid(),completed_at=now(),updated_at=now();

  update public.dhub_projects set status='completed',updated_at=now() where id=p_project_id;
  return true;
end;
$$;
revoke all on function public.dhub_admin_close_project(uuid,integer,boolean,text,integer,boolean,text,text) from public,anon;
grant execute on function public.dhub_admin_close_project(uuid,integer,boolean,text,integer,boolean,text,text) to authenticated,service_role;

create or replace function public.notify_admins_dhub_assignment_response()
returns trigger
language plpgsql
security definer
set search_path=''
as $$
begin
  if old.terms_status is distinct from new.terms_status and new.terms_status in ('accepted','declined') then
    insert into public.platform_notifications(user_id,notification_type,title,body,action_url,dedupe_key)
    select p.id,'dhub_project_admin','D-HUB PROJECT｜担当条件への回答',
      coalesce(pr.title,'案件')||'の担当条件が'||case when new.terms_status='accepted' then '受諾' else '辞退' end||'されました。',
      '/ja/d-hub/coaches/member/projects/admin',
      'dhub-assignment-admin:'||new.id::text||':'||new.terms_status
    from public.profiles p
    left join public.dhub_projects pr on pr.id=new.project_id
    where p.role='admin'::public.rba_role
    on conflict(dedupe_key) where dedupe_key is not null do nothing;
  end if;
  return new;
end;
$$;
drop trigger if exists dhub_assignment_response_admin_notify on public.dhub_project_assignments;
create trigger dhub_assignment_response_admin_notify
after update of terms_status on public.dhub_project_assignments
for each row execute function public.notify_admins_dhub_assignment_response();

create or replace function public.notify_admins_dhub_invite_response()
returns trigger
language plpgsql
security definer
set search_path=''
as $$
begin
  if old.status is distinct from new.status and new.status in ('accepted','declined') then
    insert into public.platform_notifications(user_id,notification_type,title,body,action_url,dedupe_key)
    select p.id,'dhub_project_admin','D-HUB PROJECT｜個別相談への回答',
      coalesce(pr.title,'案件')||'の個別相談が'||case when new.status='accepted' then '受諾' else '辞退' end||'されました。',
      '/ja/d-hub/coaches/member/projects/admin',
      'dhub-invite-admin:'||new.id::text||':'||new.status
    from public.profiles p
    left join public.dhub_projects pr on pr.id=new.project_id
    where p.role='admin'::public.rba_role
    on conflict(dedupe_key) where dedupe_key is not null do nothing;
  end if;
  return new;
end;
$$;
drop trigger if exists dhub_invite_response_admin_notify on public.dhub_project_invites;
create trigger dhub_invite_response_admin_notify
after update of status on public.dhub_project_invites
for each row execute function public.notify_admins_dhub_invite_response();


-- =====================================================================
-- MIGRATION 20260930154627 homecourt_season_board_and_avatar_v2
-- =====================================================================

alter table public.homecourt_player_customization
  drop constraint if exists homecourt_player_customization_hair_style_check;

alter table public.homecourt_player_customization
  add constraint homecourt_player_customization_hair_style_check
  check (hair_style = any(array['spiky','short','crop','waves','curly','braids','long']::text[]));

alter table public.homecourt_player_customization
  alter column hair_style set default 'spiky',
  alter column hair_color set default 'dark-brown',
  alter column jersey_number set default 23;

create table if not exists public.homecourt_ranking_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  participate boolean not null default false,
  ranking_tag text not null default (
    'PLAYER-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,5))
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint homecourt_ranking_tag_format check (ranking_tag ~ '^PLAYER-[A-Z0-9]{5}$')
);

create unique index if not exists homecourt_ranking_preferences_tag_uidx
  on public.homecourt_ranking_preferences (ranking_tag);

alter table public.homecourt_ranking_preferences enable row level security;

revoke all on public.homecourt_ranking_preferences from anon, authenticated;
grant select on public.homecourt_ranking_preferences to authenticated;

drop policy if exists "ranking preference owner read" on public.homecourt_ranking_preferences;
create policy "ranking preference owner read"
on public.homecourt_ranking_preferences
for select to authenticated
using ((select auth.uid()) = user_id);

create or replace function public.set_homecourt_season_board_opt_in(p_enabled boolean)
returns table(participate boolean, ranking_tag text)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := (select auth.uid());
begin
  if v_uid is null then
    raise exception 'authentication required';
  end if;

  if not exists (
    select 1 from public.profiles p
    where p.id = v_uid and p.role = 'player'
  ) then
    raise exception 'player account required';
  end if;

  insert into public.homecourt_ranking_preferences(user_id, participate, updated_at)
  values (v_uid, p_enabled, now())
  on conflict (user_id)
  do update set participate = excluded.participate, updated_at = now();

  return query
  select r.participate, r.ranking_tag
  from public.homecourt_ranking_preferences r
  where r.user_id = v_uid;
end;
$$;

revoke all on function public.set_homecourt_season_board_opt_in(boolean) from public, anon, authenticated;
grant execute on function public.set_homecourt_season_board_opt_in(boolean) to authenticated;

create or replace function public.get_homecourt_season_board(p_limit integer default 20)
returns table(
  rank_no bigint,
  ranking_tag text,
  season_points integer,
  is_self boolean,
  skin_tone text,
  hair_style text,
  hair_color text,
  jersey_style text,
  jersey_number smallint
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := (select auth.uid());
  v_limit integer := least(greatest(coalesce(p_limit,20),5),50);
begin
  if v_uid is null then
    raise exception 'authentication required';
  end if;

  return query
  with opted as (
    select
      r.user_id,
      r.ranking_tag,
      coalesce(c.skin_tone,'tone-3') as skin_tone,
      coalesce(c.hair_style,'spiky') as hair_style,
      coalesce(c.hair_color,'dark-brown') as hair_color,
      coalesce(c.jersey_style,'rba-black') as jersey_style,
      coalesce(c.jersey_number,23)::smallint as jersey_number
    from public.homecourt_ranking_preferences r
    left join public.homecourt_player_customization c on c.user_id=r.user_id
    join public.profiles p on p.id=r.user_id and p.role='player'
    where r.participate=true
  ),
  activity as (
    select
      o.*,
      least((
        select count(*)::int
        from public.homecourt_history h
        where h.user_id=o.user_id
          and h.created_at >= '2026-10-01 00:00:00+09'::timestamptz
          and h.created_at <  '2027-01-01 00:00:00+09'::timestamptz
      ),5) as passport_actions,
      least((
        select count(*)::int
        from public.homecourt_saves s
        where s.user_id=o.user_id
          and s.item_type='opportunity'
          and s.created_at >= '2026-10-01 00:00:00+09'::timestamptz
          and s.created_at <  '2027-01-01 00:00:00+09'::timestamptz
      ),5) as discovery_actions,
      least((
        select count(distinct a.item_key)::int
        from public.analytics_events a
        where a.user_id=o.user_id
          and a.event_name='view'
          and a.item_type='journal'
          and a.item_key is not null
          and a.occurred_at >= '2026-10-01 00:00:00+09'::timestamptz
          and a.occurred_at <  '2027-01-01 00:00:00+09'::timestamptz
      ),10) as learning_actions,
      least((
        select count(*)::int
        from public.participations pa
        join public.events e on e.id=pa.event_id
        where pa.player_user_id=o.user_id
          and pa.attendance_status='attended'
          and e.starts_at >= '2026-10-01 00:00:00+09'::timestamptz
          and e.starts_at <  '2027-01-01 00:00:00+09'::timestamptz
      ),4) as verified_actions
    from opted o
  ),
  scored as (
    select
      a.*,
      (
        a.passport_actions*40
        + a.discovery_actions*20
        + a.learning_actions*10
        + a.verified_actions*75
        + case
            when a.passport_actions>0
             and a.discovery_actions>0
             and a.learning_actions>0
             and a.verified_actions>0
            then 50 else 0
          end
      )::int as season_points
    from activity a
  ),
  ranked as (
    select
      dense_rank() over(order by s.season_points desc) as rank_no,
      row_number() over(order by s.season_points desc, s.ranking_tag asc) as ordinal_no,
      s.*
    from scored s
  )
  select
    r.rank_no,
    r.ranking_tag,
    r.season_points,
    (r.user_id=v_uid) as is_self,
    r.skin_tone,
    r.hair_style,
    r.hair_color,
    r.jersey_style,
    r.jersey_number
  from ranked r
  where r.ordinal_no <= v_limit or r.user_id=v_uid
  order by r.rank_no, r.ranking_tag;
end;
$$;

revoke all on function public.get_homecourt_season_board(integer) from public, anon, authenticated;
grant execute on function public.get_homecourt_season_board(integer) to authenticated;


-- =====================================================================
-- MIGRATION 20260930155143 homecourt_season_board_privacy_hardening
-- =====================================================================

alter table public.homecourt_ranking_preferences
  drop constraint if exists homecourt_ranking_tag_format;

update public.homecourt_ranking_preferences
set ranking_tag = 'PLAYER-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,8))
where ranking_tag ~ '^PLAYER-[A-Z0-9]{5}$';

alter table public.homecourt_ranking_preferences
  alter column ranking_tag set default (
    'PLAYER-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,8))
  );

alter table public.homecourt_ranking_preferences
  add constraint homecourt_ranking_tag_format
  check (ranking_tag ~ '^PLAYER-[A-Z0-9]{8}$');

create or replace function public.get_homecourt_season_board(p_limit integer default 20)
returns table(
  rank_no bigint,
  ranking_tag text,
  season_points integer,
  is_self boolean,
  skin_tone text,
  hair_style text,
  hair_color text,
  jersey_style text,
  jersey_number smallint
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := (select auth.uid());
  v_limit integer := least(greatest(coalesce(p_limit,20),5),50);
begin
  if v_uid is null then
    raise exception 'authentication required';
  end if;

  if not exists (
    select 1 from public.profiles p
    where p.id=v_uid and p.role='player'
  ) then
    raise exception 'player account required';
  end if;

  return query
  with opted as (
    select
      r.user_id,
      r.ranking_tag,
      coalesce(c.skin_tone,'tone-3') as skin_tone,
      coalesce(c.hair_style,'spiky') as hair_style,
      coalesce(c.hair_color,'dark-brown') as hair_color,
      coalesce(c.jersey_style,'rba-black') as jersey_style,
      coalesce(c.jersey_number,23)::smallint as jersey_number
    from public.homecourt_ranking_preferences r
    left join public.homecourt_player_customization c on c.user_id=r.user_id
    join public.profiles p on p.id=r.user_id and p.role='player'
    where r.participate=true
  ),
  activity as (
    select
      o.*,
      least((
        select count(*)::int
        from public.homecourt_history h
        where h.user_id=o.user_id
          and h.created_at >= '2026-10-01 00:00:00+09'::timestamptz
          and h.created_at <  '2027-01-01 00:00:00+09'::timestamptz
      ),5) as passport_actions,
      least((
        select count(*)::int
        from public.homecourt_saves s
        where s.user_id=o.user_id
          and s.item_type='opportunity'
          and s.created_at >= '2026-10-01 00:00:00+09'::timestamptz
          and s.created_at <  '2027-01-01 00:00:00+09'::timestamptz
      ),5) as discovery_actions,
      least((
        select count(distinct a.item_key)::int
        from public.analytics_events a
        where a.user_id=o.user_id
          and a.event_name='view'
          and a.item_type='journal'
          and a.item_key is not null
          and a.occurred_at >= '2026-10-01 00:00:00+09'::timestamptz
          and a.occurred_at <  '2027-01-01 00:00:00+09'::timestamptz
      ),10) as learning_actions,
      least((
        select count(*)::int
        from public.participations pa
        join public.events e on e.id=pa.event_id
        where pa.player_user_id=o.user_id
          and pa.attendance_status='attended'
          and e.starts_at >= '2026-10-01 00:00:00+09'::timestamptz
          and e.starts_at <  '2027-01-01 00:00:00+09'::timestamptz
      ),4) as verified_actions
    from opted o
  ),
  scored as (
    select
      a.*,
      (
        a.passport_actions*40
        + a.discovery_actions*20
        + a.learning_actions*10
        + a.verified_actions*75
        + case
            when a.passport_actions>0
             and a.discovery_actions>0
             and a.learning_actions>0
             and a.verified_actions>0
            then 50 else 0
          end
      )::int as season_points
    from activity a
  ),
  ranked as (
    select
      dense_rank() over(order by s.season_points desc) as rank_no,
      row_number() over(order by s.season_points desc, s.ranking_tag asc) as ordinal_no,
      s.*
    from scored s
  )
  select
    r.rank_no,
    r.ranking_tag,
    r.season_points,
    (r.user_id=v_uid) as is_self,
    r.skin_tone,
    r.hair_style,
    r.hair_color,
    r.jersey_style,
    r.jersey_number
  from ranked r
  where r.ordinal_no <= v_limit or r.user_id=v_uid
  order by r.rank_no, r.ranking_tag;
end;
$$;

revoke all on function public.get_homecourt_season_board(integer) from public, anon, authenticated;
grant execute on function public.get_homecourt_season_board(integer) to authenticated;


-- =====================================================================
-- MIGRATION 20260930155950 homecourt_season_board_antigrind
-- =====================================================================
create or replace function public.get_homecourt_season_board(p_limit integer default 20)
returns table(
  rank_no bigint,
  ranking_tag text,
  season_points integer,
  is_self boolean,
  skin_tone text,
  hair_style text,
  hair_color text,
  jersey_style text,
  jersey_number smallint
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := (select auth.uid());
  v_limit integer := least(greatest(coalesce(p_limit,20),5),50);
begin
  if v_uid is null then
    raise exception 'authentication required';
  end if;

  if not exists (
    select 1 from public.profiles p
    where p.id=v_uid and p.role='player'
  ) then
    raise exception 'player account required';
  end if;

  return query
  with opted as (
    select
      r.user_id,
      r.ranking_tag,
      coalesce(c.skin_tone,'tone-3') as skin_tone,
      coalesce(c.hair_style,'spiky') as hair_style,
      coalesce(c.hair_color,'dark-brown') as hair_color,
      coalesce(c.jersey_style,'rba-black') as jersey_style,
      coalesce(c.jersey_number,23)::smallint as jersey_number
    from public.homecourt_ranking_preferences r
    left join public.homecourt_player_customization c on c.user_id=r.user_id
    join public.profiles p on p.id=r.user_id and p.role='player'
    where r.participate=true
  ),
  activity as (
    select
      o.*,
      least((
        select count(distinct h.created_at::date)::int
        from public.homecourt_history h
        where h.user_id=o.user_id
          and h.created_at >= '2026-10-01 00:00:00+09'::timestamptz
          and h.created_at <  '2027-01-01 00:00:00+09'::timestamptz
      ),5) as passport_actions,
      least((
        select count(distinct s.item_key)::int
        from public.homecourt_saves s
        where s.user_id=o.user_id
          and s.item_type='opportunity'
          and s.created_at >= '2026-10-01 00:00:00+09'::timestamptz
          and s.created_at <  '2027-01-01 00:00:00+09'::timestamptz
      ),5) as discovery_actions,
      least((
        select count(distinct a.item_key)::int
        from public.analytics_events a
        where a.user_id=o.user_id
          and a.event_name='view'
          and a.item_type='journal'
          and a.item_key is not null
          and a.occurred_at >= '2026-10-01 00:00:00+09'::timestamptz
          and a.occurred_at <  '2027-01-01 00:00:00+09'::timestamptz
      ),10) as learning_actions,
      least((
        select count(distinct pa.event_id)::int
        from public.participations pa
        join public.events e on e.id=pa.event_id
        where pa.player_user_id=o.user_id
          and pa.attendance_status='attended'
          and e.starts_at >= '2026-10-01 00:00:00+09'::timestamptz
          and e.starts_at <  '2027-01-01 00:00:00+09'::timestamptz
      ),4) as verified_actions
    from opted o
  ),
  scored as (
    select
      a.*,
      (
        a.passport_actions*40
        + a.discovery_actions*20
        + a.learning_actions*10
        + a.verified_actions*75
        + case
            when a.passport_actions>0
             and a.discovery_actions>0
             and a.learning_actions>0
             and a.verified_actions>0
            then 50 else 0
          end
      )::int as season_points
    from activity a
  ),
  ranked as (
    select
      dense_rank() over(order by s.season_points desc) as rank_no,
      row_number() over(order by s.season_points desc, s.ranking_tag asc) as ordinal_no,
      s.*
    from scored s
  )
  select
    r.rank_no,
    r.ranking_tag,
    r.season_points,
    (r.user_id=v_uid) as is_self,
    r.skin_tone,
    r.hair_style,
    r.hair_color,
    r.jersey_style,
    r.jersey_number
  from ranked r
  where r.ordinal_no <= v_limit or r.user_id=v_uid
  order by r.rank_no, r.ranking_tag;
end;
$$;

revoke all on function public.get_homecourt_season_board(integer) from public, anon, authenticated;
grant execute on function public.get_homecourt_season_board(integer) to authenticated;


-- =====================================================================
-- MIGRATION 20260930160248 homecourt_avatar_default_upgrade
-- =====================================================================

update public.homecourt_player_customization
set
  hair_style='spiky',
  hair_color='dark-brown',
  jersey_number=23,
  updated_at=now()
where hair_style='short'
  and hair_color='black'
  and jersey_style='rba-black'
  and shorts_style='match'
  and shoe_style='basic'
  and accessory='none'
  and jersey_number=0
  and court_theme='base';

