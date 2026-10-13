
create index if not exists homecourt_schedule_items_source_team_idx on public.homecourt_schedule_items(source_team_event_id) where source_team_event_id is not null;
create index if not exists homecourt_schedule_items_source_public_idx on public.homecourt_schedule_items(source_public_event_id) where source_public_event_id is not null;
create index if not exists homecourt_care_related_schedule_idx on public.homecourt_care_plans(related_schedule_id) where related_schedule_id is not null;
create index if not exists homecourt_care_related_team_idx on public.homecourt_care_plans(related_team_event_id) where related_team_event_id is not null;
create index if not exists homecourt_care_wellness_idx on public.homecourt_care_plans(wellness_checkin_id) where wellness_checkin_id is not null;

