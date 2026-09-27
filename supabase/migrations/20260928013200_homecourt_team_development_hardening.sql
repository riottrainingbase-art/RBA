-- HOMECOURT / TEAM DEVELOPMENT security hardening

-- Approval RPCs do not require SECURITY DEFINER; global-admin RLS is sufficient.
alter function public.approve_homecourt_entity_claim(uuid) security invoker;
alter function public.approve_homecourt_entity_suggestion(uuid) security invoker;
revoke execute on function public.approve_homecourt_entity_claim(uuid) from anon;
revoke execute on function public.approve_homecourt_entity_suggestion(uuid) from anon;
grant execute on function public.approve_homecourt_entity_claim(uuid) to authenticated;
grant execute on function public.approve_homecourt_entity_suggestion(uuid) to authenticated;

-- Non-RBA managers may start their own internal development cycle, but may not
-- self-assign RBA clinic/partner commercial entitlements.
drop policy if exists "team development cycles insert" on public.team_development_cycles;
create policy "team development cycles insert"
on public.team_development_cycles for insert
to authenticated
with check (
  created_by=(select auth.uid())
  and (
    private.is_global_admin()
    or (
      private.is_entity_manager(entity_id)
      and source_service='self_started'
      and package_key='custom'
      and commercial_status='included'
      and access_ends_at is null
    )
  )
);

create or replace function private.guard_team_development_commercial_fields()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not private.is_global_admin() then
    if new.source_service is distinct from old.source_service
       or new.package_key is distinct from old.package_key
       or new.commercial_status is distinct from old.commercial_status
       or new.access_ends_at is distinct from old.access_ends_at
       or new.entity_id is distinct from old.entity_id then
      raise exception 'commercial fields are managed by RBA';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists team_development_commercial_guard on public.team_development_cycles;
create trigger team_development_commercial_guard
before update on public.team_development_cycles
for each row execute function private.guard_team_development_commercial_fields();

drop policy if exists "team development checkins update" on public.team_development_checkins;
create policy "team development checkins update"
on public.team_development_checkins for update
to authenticated
using (
  (submitted_by=(select auth.uid()) and private.can_manage_team_development(cycle_id))
  or private.is_global_admin()
)
with check (
  (submitted_by=(select auth.uid()) and private.can_manage_team_development(cycle_id))
  or private.is_global_admin()
);

drop policy if exists "team development checkins delete" on public.team_development_checkins;
create policy "team development checkins delete"
on public.team_development_checkins for delete
to authenticated
using (
  (submitted_by=(select auth.uid()) and private.can_manage_team_development(cycle_id))
  or private.is_global_admin()
);
