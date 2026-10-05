
alter table public.homecourt_schedule_tasks
  add column if not exists template_key text null,
  add column if not exists auto_generated boolean not null default false;

create unique index if not exists homecourt_schedule_tasks_auto_personal_unique
  on public.homecourt_schedule_tasks(user_id,schedule_item_id,template_key)
  where schedule_item_id is not null and template_key is not null;

create unique index if not exists homecourt_schedule_tasks_auto_team_unique
  on public.homecourt_schedule_tasks(user_id,team_event_id,template_key)
  where team_event_id is not null and template_key is not null;

