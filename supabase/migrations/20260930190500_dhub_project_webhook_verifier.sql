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
