alter function public.compute_player_profile_completion(uuid) security invoker;
revoke execute on function public.compute_player_profile_completion(uuid) from public, anon;
grant execute on function public.compute_player_profile_completion(uuid) to authenticated;
