revoke all on public.homecourt_saves from authenticated;
grant select,insert,delete on public.homecourt_saves to authenticated;
revoke all on public.analytics_events from authenticated;
grant select,insert on public.analytics_events to authenticated;
