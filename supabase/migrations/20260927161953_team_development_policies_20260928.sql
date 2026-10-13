-- TEAM DEVELOPMENT RLS policies
drop policy if exists "team development cycles read" on public.team_development_cycles;
create policy "team development cycles read" on public.team_development_cycles
for select to authenticated
using (private.is_entity_manager(entity_id) or private.is_global_admin());

drop policy if exists "team development cycles insert" on public.team_development_cycles;
create policy "team development cycles insert" on public.team_development_cycles
for insert to authenticated
with check (created_by=(select auth.uid()) and (private.is_entity_manager(entity_id) or private.is_global_admin()));

drop policy if exists "team development cycles update" on public.team_development_cycles;
create policy "team development cycles update" on public.team_development_cycles
for update to authenticated
using (private.is_entity_manager(entity_id) or private.is_global_admin())
with check (private.is_entity_manager(entity_id) or private.is_global_admin());

drop policy if exists "team development cycles delete" on public.team_development_cycles;
create policy "team development cycles delete" on public.team_development_cycles
for delete to authenticated
using (private.is_global_admin());

drop policy if exists "team development briefs read" on public.team_development_briefs;
create policy "team development briefs read" on public.team_development_briefs
for select to authenticated
using (private.can_manage_team_development(cycle_id));

drop policy if exists "team development briefs insert" on public.team_development_briefs;
create policy "team development briefs insert" on public.team_development_briefs
for insert to authenticated
with check (submitted_by=(select auth.uid()) and private.can_manage_team_development(cycle_id));

drop policy if exists "team development briefs update" on public.team_development_briefs;
create policy "team development briefs update" on public.team_development_briefs
for update to authenticated
using (private.can_manage_team_development(cycle_id))
with check (private.can_manage_team_development(cycle_id));

drop policy if exists "team development findings read" on public.team_development_findings;
create policy "team development findings read" on public.team_development_findings
for select to authenticated
using (private.can_manage_team_development(cycle_id));

drop policy if exists "team development findings admin insert" on public.team_development_findings;
create policy "team development findings admin insert" on public.team_development_findings
for insert to authenticated
with check (created_by=(select auth.uid()) and private.is_global_admin());

drop policy if exists "team development findings admin update" on public.team_development_findings;
create policy "team development findings admin update" on public.team_development_findings
for update to authenticated
using (private.is_global_admin())
with check (private.is_global_admin());

drop policy if exists "team development findings admin delete" on public.team_development_findings;
create policy "team development findings admin delete" on public.team_development_findings
for delete to authenticated
using (private.is_global_admin());

drop policy if exists "team development reports read" on public.team_development_reports;
create policy "team development reports read" on public.team_development_reports
for select to authenticated
using (private.can_manage_team_development(cycle_id));

drop policy if exists "team development reports admin insert" on public.team_development_reports;
create policy "team development reports admin insert" on public.team_development_reports
for insert to authenticated
with check (private.is_global_admin());

drop policy if exists "team development reports admin update" on public.team_development_reports;
create policy "team development reports admin update" on public.team_development_reports
for update to authenticated
using (private.is_global_admin())
with check (private.is_global_admin());

drop policy if exists "team development plan weeks read" on public.team_development_plan_weeks;
create policy "team development plan weeks read" on public.team_development_plan_weeks
for select to authenticated
using (private.can_manage_team_development(cycle_id));

drop policy if exists "team development plan weeks admin insert" on public.team_development_plan_weeks;
create policy "team development plan weeks admin insert" on public.team_development_plan_weeks
for insert to authenticated
with check (created_by=(select auth.uid()) and private.is_global_admin());

drop policy if exists "team development plan weeks admin update" on public.team_development_plan_weeks;
create policy "team development plan weeks admin update" on public.team_development_plan_weeks
for update to authenticated
using (private.is_global_admin())
with check (private.is_global_admin());

drop policy if exists "team development plan weeks admin delete" on public.team_development_plan_weeks;
create policy "team development plan weeks admin delete" on public.team_development_plan_weeks
for delete to authenticated
using (private.is_global_admin());

drop policy if exists "team development checkins read" on public.team_development_checkins;
create policy "team development checkins read" on public.team_development_checkins
for select to authenticated
using (private.can_manage_team_development(cycle_id));

drop policy if exists "team development checkins insert" on public.team_development_checkins;
create policy "team development checkins insert" on public.team_development_checkins
for insert to authenticated
with check (submitted_by=(select auth.uid()) and private.can_manage_team_development(cycle_id));

drop policy if exists "team development checkins update" on public.team_development_checkins;
create policy "team development checkins update" on public.team_development_checkins
for update to authenticated
using (submitted_by=(select auth.uid()) or private.is_global_admin())
with check (submitted_by=(select auth.uid()) or private.is_global_admin());

drop policy if exists "team development checkins delete" on public.team_development_checkins;
create policy "team development checkins delete" on public.team_development_checkins
for delete to authenticated
using (submitted_by=(select auth.uid()) or private.is_global_admin());

comment on table public.team_development_cycles is
'RBA team-level development cycles. Not official federation registration and not a player ranking system.';
comment on table public.team_development_findings is
'Structured team observations. Findings describe team learning phenomena, not individual player scores.';
comment on table public.team_development_reports is
'RBA-issued team development report following a clinic or observation.';
comment on table public.team_development_plan_weeks is
'Structured follow-up plan, typically four weeks / 30 days, after RBA team clinic or visit training.';
