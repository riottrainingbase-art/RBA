-- RBA development platform foundation
-- Intentionally additive. This migration is not applied by creating this file.

create table if not exists public.world_youth_development_updates (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  country_code text not null,
  region_label text not null,
  organization text not null,
  category text not null check (category in ('rules','competition','coach_education','talent','school','girls','3x3','environment')),
  title text not null,
  verified_fact text not null,
  development_meaning text,
  japan_question text,
  primary_source_url text not null,
  source_published_on date,
  verified_on date not null default current_date,
  status text not null default 'draft' check (status in ('draft','verified','archived')),
  related_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists world_youth_development_updates_lookup_idx
  on public.world_youth_development_updates (status, category, verified_on desc);

alter table public.world_youth_development_updates enable row level security;

create policy "verified world updates are public"
on public.world_youth_development_updates for select
using (status = 'verified');

create table if not exists public.development_partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  country_code text not null default 'JP',
  region text,
  website_url text,
  relationship_status text not null default 'discussion'
    check (relationship_status in ('discussion','verified_partner','active_collaboration','past_activity','suspended')),
  verification_note text,
  verified_at timestamptz,
  renewal_due_at timestamptz,
  public_visibility boolean not null default false,
  safeguarding_contact_confirmed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.development_partners enable row level security;

create policy "visible partners are public"
on public.development_partners for select
using (public_visibility = true and relationship_status in ('verified_partner','active_collaboration','past_activity'));

create table if not exists public.partner_principle_acknowledgements (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.development_partners(id) on delete cascade,
  principle_key text not null,
  acknowledged_at timestamptz not null default now(),
  acknowledged_by uuid references auth.users(id) on delete set null,
  unique(partner_id, principle_key)
);

alter table public.partner_principle_acknowledgements enable row level security;

comment on table public.development_partners is
'Beta partner registry. Presence is not a certification, ranking, safeguarding guarantee, or endorsement.';
