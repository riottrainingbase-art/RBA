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


