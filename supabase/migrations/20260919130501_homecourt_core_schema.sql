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
