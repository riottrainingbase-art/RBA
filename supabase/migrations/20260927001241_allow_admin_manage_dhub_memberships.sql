
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

