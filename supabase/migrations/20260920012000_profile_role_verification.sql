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
