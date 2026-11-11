-- Post-creation permissions hardening. TRUNCATE bypasses RLS and must not be available to authenticated clients.
revoke truncate, references, trigger
  on table public.homecourt_growth_observations from authenticated;
