revoke all on schema private from anon;
grant usage on schema private to authenticated;
revoke all on all functions in schema private from anon;
revoke all on function private.has_homecourt_plus(uuid) from public, anon;
grant execute on function private.has_homecourt_plus(uuid) to authenticated;
