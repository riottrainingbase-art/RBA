
alter table public.notification_preferences
  add column if not exists schedule_reminders boolean not null default true,
  add column if not exists care_reminders boolean not null default true,
  add column if not exists wellness_reminders boolean not null default false,
  add column if not exists event_reminder_days integer[] not null default array[7,3,1,0],
  add column if not exists care_reminder_minutes integer not null default 120,
  add column if not exists wellness_reminder_time time not null default '20:00:00';

alter table public.notification_preferences
  drop constraint if exists notification_preferences_care_reminder_minutes_check;
alter table public.notification_preferences
  add constraint notification_preferences_care_reminder_minutes_check
  check (care_reminder_minutes between 15 and 10080);

alter table public.notification_preferences
  drop constraint if exists notification_preferences_event_reminder_days_check;
alter table public.notification_preferences
  add constraint notification_preferences_event_reminder_days_check
  check (event_reminder_days <@ array[0,1,2,3,7,14,30]::integer[]);

