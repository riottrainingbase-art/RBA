-- Prepare D-HUB entitlement storage for governed Stripe subscriptions.
-- Existing Square memberships remain valid.

alter table public.dhub_memberships
  drop constraint if exists dhub_memberships_provider_check;

alter table public.dhub_memberships
  add constraint dhub_memberships_provider_check
  check (provider in ('square','stripe','manual'));

alter table public.dhub_memberships
  drop constraint if exists dhub_memberships_email_normalized_key;

create unique index if not exists dhub_memberships_email_program_key
  on public.dhub_memberships(email_normalized,program_type);

create index if not exists dhub_memberships_source_reference_idx
  on public.dhub_memberships(source_reference)
  where source_reference is not null;
