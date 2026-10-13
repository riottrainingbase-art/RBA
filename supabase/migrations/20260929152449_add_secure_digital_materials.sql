
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

