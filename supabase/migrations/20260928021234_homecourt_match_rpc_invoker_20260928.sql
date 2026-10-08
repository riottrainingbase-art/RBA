-- HOMECOURT public MATCH RPC should respect table RLS and never bypass it.
alter function public.get_homecourt_exchange_posts() security invoker;

revoke execute on function public.get_homecourt_exchange_posts() from public;
grant execute on function public.get_homecourt_exchange_posts() to anon, authenticated;

comment on function public.get_homecourt_exchange_posts() is
'Returns safe public fields for open HOMECOURT MATCH posts while respecting homecourt_exchange_posts RLS.';
