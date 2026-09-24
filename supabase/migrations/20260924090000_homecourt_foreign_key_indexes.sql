-- Keep owner-scoped HOME COURT joins fast as participation, media and history grow.
create index if not exists homecourt_checkins_person_owner_fk
  on public.homecourt_checkins(person_id,user_id);
create index if not exists homecourt_goals_person_owner_fk
  on public.homecourt_goals(person_id,user_id);
create index if not exists homecourt_history_person_owner_fk
  on public.homecourt_history(person_id,user_id);
create index if not exists homecourt_media_goal_fk
  on public.homecourt_media(goal_id)
  where goal_id is not null;
create index if not exists homecourt_media_history_fk
  on public.homecourt_media(history_id)
  where history_id is not null;
create index if not exists homecourt_media_person_owner_fk
  on public.homecourt_media(person_id,user_id);
