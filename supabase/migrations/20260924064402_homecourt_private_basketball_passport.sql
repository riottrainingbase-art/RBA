-- Private, account-owned journals. Self-reported history never grants attendance,
-- certificates, entitlements, team membership or access to another account.
create table public.homecourt_people (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 name text not null check(char_length(btrim(name)) between 1 and 60),
 relationship text not null check(relationship in ('self','child')),
 age_group text not null default 'U15' check(age_group in ('U8','U10','U12','U15','U18','ADULT','COACH')),
 region text not null default '' check(char_length(region)<=80),
 created_at timestamptz not null default now(),
 unique(id,user_id)
);
create unique index homecourt_one_self on public.homecourt_people(user_id) where relationship='self';
create index homecourt_people_owner on public.homecourt_people(user_id);
create table public.homecourt_history (
 id uuid primary key default gen_random_uuid(),user_id uuid not null,
 person_id uuid not null,
 title text not null check(char_length(btrim(title)) between 1 and 160),
 occurred_on date not null check(occurred_on between date '2000-01-01' and current_date),
 date_precision text not null default 'day' check(date_precision in ('day','month')),
 venue text not null default '' check(char_length(venue)<=160),
 takeaway text not null default '' check(char_length(takeaway)<=2000),
 next_action text not null default '' check(char_length(next_action)<=1000),
 created_at timestamptz not null default now(),
 foreign key(person_id,user_id) references public.homecourt_people(id,user_id) on delete cascade,
 unique(person_id,title,occurred_on,venue)
);
create table public.homecourt_checkins (
 id uuid primary key default gen_random_uuid(),user_id uuid not null,person_id uuid not null,
 checked_on date not null check(checked_on between date '2000-01-01' and current_date),
 strengths text not null check(char_length(btrim(strengths)) between 1 and 2000),
 challenge text not null check(char_length(btrim(challenge)) between 1 and 2000),
 next_action text not null check(char_length(btrim(next_action)) between 1 and 1000),
 created_at timestamptz not null default now(),
 foreign key(person_id,user_id) references public.homecourt_people(id,user_id) on delete cascade
);
create table public.homecourt_goals (
 id uuid primary key default gen_random_uuid(),user_id uuid not null,person_id uuid not null,
 title text not null check(char_length(btrim(title)) between 1 and 160),
 horizon text not null check(horizon in ('week','three_months','vision')),
 action text not null check(char_length(btrim(action)) between 1 and 1000),
 success text not null check(char_length(btrim(success)) between 1 and 1000),
 target_on date not null,
 status text not null default 'active' check(status in ('active','achieved','paused')),
 created_at timestamptz not null default now(),
 foreign key(person_id,user_id) references public.homecourt_people(id,user_id) on delete cascade
);
create index homecourt_history_owner on public.homecourt_history(user_id,person_id,occurred_on desc);
create index homecourt_checkins_owner on public.homecourt_checkins(user_id,person_id,checked_on desc);
create index homecourt_goals_owner on public.homecourt_goals(user_id,person_id,target_on);
do $policies$
declare t text;
begin
 foreach t in array array['homecourt_people','homecourt_history','homecourt_checkins','homecourt_goals'] loop
  execute format('alter table public.%I enable row level security',t);
  execute format('revoke all on public.%I from anon, authenticated',t);
  execute format('grant select,insert,update,delete on public.%I to authenticated',t);
  execute format('create policy owner_read on public.%I for select to authenticated using ((select auth.uid())=user_id)',t);
  execute format('create policy owner_insert on public.%I for insert to authenticated with check ((select auth.uid())=user_id)',t);
  execute format('create policy owner_update on public.%I for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id)',t);
  execute format('create policy owner_delete on public.%I for delete to authenticated using ((select auth.uid())=user_id)',t);
 end loop;
end $policies$;
