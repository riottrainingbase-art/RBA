-- Keep the same admin-role semantics while avoiding per-row auth.uid evaluation.
alter policy strategic_priorities_admin_all on public.strategic_priorities
  using (exists (select 1 from public.profile_roles pr where pr.user_id=(select auth.uid()) and pr.role='admin' and pr.status='active'))
  with check (exists (select 1 from public.profile_roles pr where pr.user_id=(select auth.uid()) and pr.role='admin' and pr.status='active'));
alter policy enterprise_risks_admin_all on public.enterprise_risks
  using (exists (select 1 from public.profile_roles pr where pr.user_id=(select auth.uid()) and pr.role='admin' and pr.status='active'))
  with check (exists (select 1 from public.profile_roles pr where pr.user_id=(select auth.uid()) and pr.role='admin' and pr.status='active'));
alter policy management_decisions_admin_all on public.management_decisions
  using (exists (select 1 from public.profile_roles pr where pr.user_id=(select auth.uid()) and pr.role='admin' and pr.status='active'))
  with check (exists (select 1 from public.profile_roles pr where pr.user_id=(select auth.uid()) and pr.role='admin' and pr.status='active'));
alter policy monthly_close_controls_admin_all on public.monthly_close_controls
  using (exists (select 1 from public.profile_roles pr where pr.user_id=(select auth.uid()) and pr.role='admin' and pr.status='active'))
  with check (exists (select 1 from public.profile_roles pr where pr.user_id=(select auth.uid()) and pr.role='admin' and pr.status='active'));

create index if not exists management_decisions_related_priority_idx
  on public.management_decisions(related_priority_key);
create index if not exists monthly_close_controls_closed_by_idx
  on public.monthly_close_controls(closed_by);
