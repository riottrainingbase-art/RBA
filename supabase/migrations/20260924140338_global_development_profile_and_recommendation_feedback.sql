alter table public.player_development_profiles
  add column if not exists preferred_regions text[] not null default '{}'::text[],
  add column if not exists preferred_countries text[] not null default '{}'::text[],
  add column if not exists preferred_languages text[] not null default '{}'::text[],
  add column if not exists opportunity_types text[] not null default '{}'::text[],
  add column if not exists travel_scope text not null default 'local',
  add column if not exists international_interest boolean not null default false,
  add column if not exists next_12_month_goal text,
  add column if not exists profile_completion integer not null default 0;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname='player_development_profiles_travel_scope_check'
  ) then
    alter table public.player_development_profiles
      add constraint player_development_profiles_travel_scope_check
      check (travel_scope in ('local','national','asia','global'));
  end if;
  if not exists (
    select 1 from pg_constraint
    where conname='player_development_profiles_completion_check'
  ) then
    alter table public.player_development_profiles
      add constraint player_development_profiles_completion_check
      check (profile_completion between 0 and 100);
  end if;
end $$;

create table if not exists public.recommendation_feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_type text not null check (item_type in ('opportunity','content','course','partner','exchange')),
  item_key text not null check (char_length(item_key) between 1 and 160),
  signal text not null check (signal in ('interested','not_relevant','applied','completed')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique(user_id,item_type,item_key,signal)
);
create index if not exists recommendation_feedback_user_time on public.recommendation_feedback(user_id,created_at desc);
alter table public.recommendation_feedback enable row level security;
revoke all on public.recommendation_feedback from anon;
grant select,insert,delete on public.recommendation_feedback to authenticated;
drop policy if exists "recommendation_feedback_owner_read" on public.recommendation_feedback;
create policy "recommendation_feedback_owner_read" on public.recommendation_feedback
  for select to authenticated using ((select auth.uid())=user_id or private.is_global_admin());
drop policy if exists "recommendation_feedback_owner_insert" on public.recommendation_feedback;
create policy "recommendation_feedback_owner_insert" on public.recommendation_feedback
  for insert to authenticated with check ((select auth.uid())=user_id);
drop policy if exists "recommendation_feedback_owner_delete" on public.recommendation_feedback;
create policy "recommendation_feedback_owner_delete" on public.recommendation_feedback
  for delete to authenticated using ((select auth.uid())=user_id);

create or replace function public.compute_player_profile_completion(p_user_id uuid)
returns integer
language sql
stable
security definer
set search_path=public
as $$
  select least(100,
    (case when primary_position is not null and btrim(primary_position)<>'' then 10 else 0 end) +
    (case when development_stage is not null then 10 else 0 end) +
    (case when long_term_goal is not null and btrim(long_term_goal)<>'' then 15 else 0 end) +
    (case when current_focus is not null and btrim(current_focus)<>'' then 15 else 0 end) +
    (case when cardinality(preferred_regions)>0 then 10 else 0 end) +
    (case when cardinality(preferred_languages)>0 then 10 else 0 end) +
    (case when cardinality(opportunity_types)>0 then 10 else 0 end) +
    (case when next_12_month_goal is not null and btrim(next_12_month_goal)<>'' then 20 else 0 end)
  )
  from public.player_development_profiles where user_id=p_user_id
$$;
grant execute on function public.compute_player_profile_completion(uuid) to authenticated;
