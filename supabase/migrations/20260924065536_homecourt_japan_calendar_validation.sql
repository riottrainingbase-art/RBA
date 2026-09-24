-- Use the same Japanese calendar day as the member UI, including 00:00–08:59 JST.
alter table public.homecourt_history drop constraint homecourt_history_occurred_on_check, add constraint homecourt_history_occurred_on_check check(occurred_on between date '2000-01-01' and (now() at time zone 'Asia/Tokyo')::date);
alter table public.homecourt_checkins drop constraint homecourt_checkins_checked_on_check, add constraint homecourt_checkins_checked_on_check check(checked_on between date '2000-01-01' and (now() at time zone 'Asia/Tokyo')::date);
