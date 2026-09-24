-- The management control-plane view must never bypass caller RLS.
-- Preserve read access for authenticated administrators and service jobs only.
alter view public.management_company_control_plane
  set (security_invoker = true);

revoke all on public.management_company_control_plane from public, anon, authenticated;
grant select on public.management_company_control_plane to authenticated, service_role;
