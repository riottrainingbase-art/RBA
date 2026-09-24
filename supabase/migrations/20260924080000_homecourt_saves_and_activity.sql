create table if not exists public.homecourt_saves (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 item_type text not null check (item_type in ('opportunity','content','course','session')),
 item_key text not null check (length(item_key) between 1 and 160),
 title text not null check (length(title) between 1 and 240),
 href text not null check (length(href) between 1 and 1000),
 metadata jsonb not null default '{}'::jsonb,
 created_at timestamptz not null default now(),
 unique(user_id,item_type,item_key)
);
create index if not exists homecourt_saves_user_created on public.homecourt_saves(user_id,created_at desc);
alter table public.homecourt_saves enable row level security;
revoke all on public.homecourt_saves from anon;
grant select,insert,delete on public.homecourt_saves to authenticated;
create policy "saves owner reads" on public.homecourt_saves for select to authenticated using ((select auth.uid())=user_id);
create policy "saves owner inserts" on public.homecourt_saves for insert to authenticated with check ((select auth.uid())=user_id);
create policy "saves owner deletes" on public.homecourt_saves for delete to authenticated using ((select auth.uid())=user_id);

create table if not exists public.analytics_events (
 id bigint generated always as identity primary key,
 user_id uuid references auth.users(id) on delete set null,
 event_name text not null check (event_name in ('view','search','save','unsave','apply_open','learn_open','return_visit')),
 item_type text,
 item_key text,
 role text,
 locale text,
 metadata jsonb not null default '{}'::jsonb,
 occurred_at timestamptz not null default now()
);
create index if not exists analytics_events_name_time on public.analytics_events(event_name,occurred_at desc);
create index if not exists analytics_events_user_time on public.analytics_events(user_id,occurred_at desc) where user_id is not null;
alter table public.analytics_events enable row level security;
revoke all on public.analytics_events from anon;
grant insert,select on public.analytics_events to authenticated;
create policy "activity owner inserts" on public.analytics_events for insert to authenticated with check ((select auth.uid())=user_id);
create policy "activity owner reads" on public.analytics_events for select to authenticated using ((select auth.uid())=user_id or private.is_global_admin());
