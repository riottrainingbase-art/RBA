create or replace function public.has_dhub_player_access()
returns boolean
language sql
stable
security definer
set search_path to 'public','auth'
as $function$
  select public.has_dhub_program_access('players')
  or exists (
    select 1
    from public.team_memberships tm
    join public.teams t on t.id=tm.team_id
    where tm.user_id=auth.uid()
      and tm.status='active'
      and tm.member_role='player'
      and t.category='gream_u15'
  );
$function$;
