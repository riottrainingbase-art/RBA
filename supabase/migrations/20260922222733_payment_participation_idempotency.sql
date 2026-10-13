
create unique index if not exists participations_event_user_unique
  on public.participations(event_id, player_user_id);

