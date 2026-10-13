alter view public.management_company_control_plane set (security_invoker = true);
revoke all on public.management_company_control_plane from public, anon, authenticated;
grant select on public.management_company_control_plane to authenticated, service_role;
