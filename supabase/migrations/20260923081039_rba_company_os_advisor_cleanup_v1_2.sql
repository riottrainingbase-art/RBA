
-- RBA Company OS v1.2: advisor cleanup for newly introduced objects

create index if not exists events_owner_user_idx on public.events(owner_user_id);
create index if not exists governance_acceptances_subject_user_idx on public.governance_acceptances(subject_user_id);
create index if not exists governance_documents_created_by_idx on public.governance_documents(created_by);
create index if not exists monthly_kpi_business_unit_idx on public.monthly_kpi_snapshots(business_unit_id);
create index if not exists operating_costs_approved_by_idx on public.operating_costs(approved_by);
create index if not exists safety_report_actions_action_by_idx on public.safety_report_actions(action_by);

drop policy if exists "business_units_admin_write" on public.business_units;
drop policy if exists "business_units_admin_insert" on public.business_units;
drop policy if exists "business_units_admin_update" on public.business_units;
drop policy if exists "business_units_admin_delete" on public.business_units;

create policy "business_units_admin_insert" on public.business_units
for insert to authenticated with check (private.is_global_admin());
create policy "business_units_admin_update" on public.business_units
for update to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "business_units_admin_delete" on public.business_units
for delete to authenticated using (private.is_global_admin());

drop policy if exists "governance_documents_admin_write" on public.governance_documents;
drop policy if exists "governance_documents_admin_insert" on public.governance_documents;
drop policy if exists "governance_documents_admin_update" on public.governance_documents;
drop policy if exists "governance_documents_admin_delete" on public.governance_documents;

create policy "governance_documents_admin_insert" on public.governance_documents
for insert to authenticated with check (private.is_global_admin());
create policy "governance_documents_admin_update" on public.governance_documents
for update to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "governance_documents_admin_delete" on public.governance_documents
for delete to authenticated using (private.is_global_admin());

drop policy if exists "governance_acceptances_self_read" on public.governance_acceptances;
create policy "governance_acceptances_self_read" on public.governance_acceptances
for select to authenticated
using (user_id=(select auth.uid()) or subject_user_id=(select auth.uid()) or private.is_global_admin());

drop policy if exists "governance_acceptances_self_insert" on public.governance_acceptances;
create policy "governance_acceptances_self_insert" on public.governance_acceptances
for insert to authenticated
with check (user_id=(select auth.uid()));

