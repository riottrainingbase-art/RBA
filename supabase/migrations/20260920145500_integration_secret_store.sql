-- Keep third-party signing secrets out of Edge Function source code.
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
