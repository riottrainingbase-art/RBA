
alter table public.homecourt_schedule_tasks
  add column if not exists public_event_id uuid null references public.events(id) on delete cascade;

alter table public.homecourt_schedule_tasks
  drop constraint if exists homecourt_schedule_tasks_target_check;

alter table public.homecourt_schedule_tasks
  add constraint homecourt_schedule_tasks_target_check
  check (schedule_item_id is not null or team_event_id is not null or public_event_id is not null);

create index if not exists homecourt_schedule_tasks_public_event_idx
  on public.homecourt_schedule_tasks(public_event_id)
  where public_event_id is not null;

create unique index if not exists homecourt_schedule_tasks_auto_public_unique
  on public.homecourt_schedule_tasks(user_id,public_event_id,template_key)
  where public_event_id is not null and template_key is not null;

