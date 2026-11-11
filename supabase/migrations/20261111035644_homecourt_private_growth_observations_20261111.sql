-- Private per-person basketball growth observations. No public sharing or cross-player ranking.
create table public.homecourt_growth_observations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  person_id uuid not null,
  observed_on date not null,
  area text not null,
  stage smallint not null,
  context text not null default 'practice',
  observer_kind text not null default 'self',
  evidence text not null default '',
  created_at timestamptz not null default now(),
  constraint homecourt_growth_observations_owner_person_fkey
    foreign key (person_id,user_id) references public.homecourt_people(id,user_id) on delete cascade,
  constraint homecourt_growth_observations_once_per_day unique (user_id,person_id,observed_on,area),
  constraint homecourt_growth_observations_date_check
    check (observed_on between date '2000-01-01' and (now() at time zone 'Asia/Tokyo')::date),
  constraint homecourt_growth_observations_area_check
    check (area in ('scan','decide','execute','connect','move','reflect')),
  constraint homecourt_growth_observations_stage_check
    check (stage between 1 and 4),
  constraint homecourt_growth_observations_context_check
    check (context in ('practice','game','clinic','other')),
  constraint homecourt_growth_observations_observer_check
    check (observer_kind in ('self','guardian')),
  constraint homecourt_growth_observations_evidence_check
    check (char_length(evidence)<=500)
);
create index homecourt_growth_observations_person_day_idx
  on public.homecourt_growth_observations (user_id,person_id,observed_on desc);
alter table public.homecourt_growth_observations enable row level security;
revoke all on public.homecourt_growth_observations from public,anon;
grant select,insert,update,delete on public.homecourt_growth_observations to authenticated;
create policy "growth observation self read" on public.homecourt_growth_observations
  for select to authenticated using (user_id=(select auth.uid()));
create policy "growth observation self insert" on public.homecourt_growth_observations
  for insert to authenticated with check (user_id=(select auth.uid()));
create policy "growth observation self update" on public.homecourt_growth_observations
  for update to authenticated using (user_id=(select auth.uid()))
  with check (user_id=(select auth.uid()));
create policy "growth observation self delete" on public.homecourt_growth_observations
  for delete to authenticated using (user_id=(select auth.uid()));
