-- Reuse the existing private admin predicate; do not add privileged functions.
alter policy "profile self guardian or admin read" on public.profiles
using (
 id = (select auth.uid())
 or exists (select 1 from public.guardian_links gl where gl.parent_user_id = (select auth.uid()) and gl.child_user_id = profiles.id and gl.verified_at is not null)
 or private.is_global_admin()
);
alter policy "guardian links members or admin read" on public.guardian_links
using (parent_user_id = (select auth.uid()) or child_user_id = (select auth.uid()) or private.is_global_admin());
alter policy "admin verifies guardian links" on public.guardian_links
using (private.is_global_admin()) with check (private.is_global_admin());
