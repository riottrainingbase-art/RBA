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
