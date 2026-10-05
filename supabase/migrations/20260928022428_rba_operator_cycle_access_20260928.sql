-- RBA operators need to see and manage client-team development cycles
-- across entities while normal team managers remain entity-scoped.

drop policy if exists "team development cycles read" on public.team_development_cycles;
create policy "team development cycles read"
on public.team_development_cycles for select
to authenticated
using (
  private.is_entity_manager(entity_id)
  or private.is_rba_operator()
  or private.is_global_admin()
);

drop policy if exists "team development cycles update" on public.team_development_cycles;
create policy "team development cycles update"
on public.team_development_cycles for update
to authenticated
using (
  private.is_entity_manager(entity_id)
  or private.is_rba_operator()
  or private.is_global_admin()
)
with check (
  private.is_entity_manager(entity_id)
  or private.is_rba_operator()
  or private.is_global_admin()
);
