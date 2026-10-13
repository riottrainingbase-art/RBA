
drop policy if exists "profile self read" on public.profiles;
create policy "profile self or admin read" on public.profiles for select to authenticated
using (
  id=(select auth.uid())
  or exists(select 1 from public.profiles me where me.id=(select auth.uid()) and me.role='admin')
);

drop policy if exists "guardian link members read" on public.guardian_links;
create policy "guardian links members or admin read" on public.guardian_links for select to authenticated
using (
  parent_user_id=(select auth.uid())
  or child_user_id=(select auth.uid())
  or exists(select 1 from public.profiles me where me.id=(select auth.uid()) and me.role='admin')
);

drop policy if exists "subscription self read" on public.subscriptions;
create policy "subscription self or admin read" on public.subscriptions for select to authenticated
using (
  user_id=(select auth.uid())
  or exists(select 1 from public.profiles me where me.id=(select auth.uid()) and me.role='admin')
);

drop policy if exists "consent player or guardian read" on public.media_consents;
create policy "consent family or admin read" on public.media_consents for select to authenticated
using (
  player_user_id=(select auth.uid())
  or guardian_user_id=(select auth.uid())
  or exists(select 1 from public.profiles me where me.id=(select auth.uid()) and me.role='admin')
);

