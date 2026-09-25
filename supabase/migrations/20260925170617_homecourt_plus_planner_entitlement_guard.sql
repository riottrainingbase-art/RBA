-- Planner, condition, care and preparation are HOMECOURT PLUS features.
-- Ownership alone is insufficient: every direct Data API operation must also
-- have a current HOMECOURT PLUS entitlement.

drop policy if exists "schedule owner reads" on public.homecourt_schedule_items;
drop policy if exists "schedule owner inserts" on public.homecourt_schedule_items;
drop policy if exists "schedule owner updates" on public.homecourt_schedule_items;
drop policy if exists "schedule owner deletes" on public.homecourt_schedule_items;
create policy "schedule plus owner access"
  on public.homecourt_schedule_items for all to authenticated
  using (
    (select auth.uid()) = user_id
    and private.has_homecourt_plus((select auth.uid()))
  )
  with check (
    (select auth.uid()) = user_id
    and private.has_homecourt_plus((select auth.uid()))
  );

drop policy if exists "wellness owner reads" on public.homecourt_wellness_checkins;
drop policy if exists "wellness owner inserts" on public.homecourt_wellness_checkins;
drop policy if exists "wellness owner updates" on public.homecourt_wellness_checkins;
drop policy if exists "wellness owner deletes" on public.homecourt_wellness_checkins;
create policy "wellness plus owner access"
  on public.homecourt_wellness_checkins for all to authenticated
  using (
    (select auth.uid()) = user_id
    and private.has_homecourt_plus((select auth.uid()))
  )
  with check (
    (select auth.uid()) = user_id
    and private.has_homecourt_plus((select auth.uid()))
  );

drop policy if exists "care owner reads" on public.homecourt_care_plans;
drop policy if exists "care owner inserts" on public.homecourt_care_plans;
drop policy if exists "care owner updates" on public.homecourt_care_plans;
drop policy if exists "care owner deletes" on public.homecourt_care_plans;
create policy "care plus owner access"
  on public.homecourt_care_plans for all to authenticated
  using (
    (select auth.uid()) = user_id
    and private.has_homecourt_plus((select auth.uid()))
  )
  with check (
    (select auth.uid()) = user_id
    and private.has_homecourt_plus((select auth.uid()))
  );

drop policy if exists "schedule tasks owner reads" on public.homecourt_schedule_tasks;
drop policy if exists "schedule tasks owner inserts" on public.homecourt_schedule_tasks;
drop policy if exists "schedule tasks owner updates" on public.homecourt_schedule_tasks;
drop policy if exists "schedule tasks owner deletes" on public.homecourt_schedule_tasks;
create policy "schedule tasks plus owner access"
  on public.homecourt_schedule_tasks for all to authenticated
  using (
    (select auth.uid()) = user_id
    and private.has_homecourt_plus((select auth.uid()))
  )
  with check (
    (select auth.uid()) = user_id
    and private.has_homecourt_plus((select auth.uid()))
  );
