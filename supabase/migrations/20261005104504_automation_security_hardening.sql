-- RBA security hardening before privileged automation expansion.
-- 2026-10-05
-- Goal: least privilege without changing intended authenticated member flows.

-- Public D-HUB access helper RPCs are meaningful only for signed-in users.
revoke execute on function public.has_dhub_access() from public, anon;
grant execute on function public.has_dhub_access() to authenticated, service_role;

revoke execute on function public.has_dhub_coach_access() from public, anon;
grant execute on function public.has_dhub_coach_access() to authenticated, service_role;

revoke execute on function public.has_dhub_player_access() from public, anon;
grant execute on function public.has_dhub_player_access() to authenticated, service_role;

revoke execute on function public.has_dhub_program_access(text) from public, anon;
grant execute on function public.has_dhub_program_access(text) to authenticated, service_role;

-- Trigger functions must not be callable through PostgREST by end users.
revoke execute on function public.announce_open_dhub_project() from public, anon, authenticated;
grant execute on function public.announce_open_dhub_project() to service_role;

revoke execute on function public.notify_admins_dhub_assignment_response() from public, anon, authenticated;
grant execute on function public.notify_admins_dhub_assignment_response() to service_role;

revoke execute on function public.notify_admins_dhub_client_request() from public, anon, authenticated;
grant execute on function public.notify_admins_dhub_client_request() to service_role;

revoke execute on function public.notify_admins_dhub_invite_response() from public, anon, authenticated;
grant execute on function public.notify_admins_dhub_invite_response() to service_role;

revoke execute on function public.notify_admins_dhub_project_application() from public, anon, authenticated;
grant execute on function public.notify_admins_dhub_project_application() to service_role;

revoke execute on function public.notify_dhub_project_application_status() from public, anon, authenticated;
grant execute on function public.notify_dhub_project_application_status() to service_role;

-- These views must respect the querying user's RLS context.
alter view public.dhub_paid_article_quality set (security_invoker = true);
alter view public.dhub_paid_article_admin_overview set (security_invoker = true);

-- Views are read models, not writable public API objects.
revoke all on public.dhub_paid_article_quality from public, anon, authenticated;
grant select on public.dhub_paid_article_quality to authenticated, service_role;

revoke all on public.dhub_paid_article_admin_overview from public, anon, authenticated;
grant select on public.dhub_paid_article_admin_overview to authenticated, service_role;

-- Explicitly preserve server-only posture for internal reconciliation/audit tables.
revoke all on public.participant_rollout_candidates from anon, authenticated;
revoke all on public.participant_rollout_delivery_audit from anon, authenticated;
revoke all on public.payment_reconciliation_actions from anon, authenticated;
revoke all on public.stripe_webhook_events from anon, authenticated;
revoke all on public.unmatched_stripe_payments from anon, authenticated;
