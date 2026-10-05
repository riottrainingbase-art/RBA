
create index if not exists idx_attendance_user on public.attendance_responses(user_id);
create index if not exists idx_quick_notes_team on public.coach_quick_notes(team_id);
create index if not exists idx_practice_plans_copied_from on public.practice_plans(copied_from);
create index if not exists idx_team_collections_created_by on public.team_collections(created_by);
create index if not exists idx_team_events_created_by on public.team_events(created_by);
create index if not exists idx_team_events_public_event on public.team_events(related_public_event_id);
create index if not exists idx_team_join_codes_created_by on public.team_join_codes(created_by);
create index if not exists idx_team_join_codes_team on public.team_join_codes(team_id);
create index if not exists idx_team_notices_created_by on public.team_notices(created_by);
create index if not exists idx_teams_created_by on public.teams(created_by);

