-- HOMECOURT / TEAM DEVELOPMENT index and policy cleanup

create index if not exists homecourt_entity_claims_user_idx
  on public.homecourt_entity_claims(user_id);
create index if not exists homecourt_entity_claims_reviewed_by_idx
  on public.homecourt_entity_claims(reviewed_by) where reviewed_by is not null;

create index if not exists homecourt_entity_suggestions_user_idx
  on public.homecourt_entity_suggestions(user_id);
create index if not exists homecourt_entity_suggestions_reviewed_by_idx
  on public.homecourt_entity_suggestions(reviewed_by) where reviewed_by is not null;

create index if not exists homecourt_exchange_posts_entity_idx
  on public.homecourt_exchange_posts(entity_id);
create index if not exists homecourt_exchange_posts_created_by_idx
  on public.homecourt_exchange_posts(created_by);

create index if not exists homecourt_exchange_interests_responding_entity_idx
  on public.homecourt_exchange_interests(responding_entity_id);
create index if not exists homecourt_exchange_interests_created_by_idx
  on public.homecourt_exchange_interests(created_by);

create index if not exists team_development_cycles_team_idx
  on public.team_development_cycles(team_id) where team_id is not null;
create index if not exists team_development_cycles_event_idx
  on public.team_development_cycles(event_id) where event_id is not null;
create index if not exists team_development_cycles_created_by_idx
  on public.team_development_cycles(created_by);
create index if not exists team_development_briefs_submitted_by_idx
  on public.team_development_briefs(submitted_by);
create index if not exists team_development_findings_created_by_idx
  on public.team_development_findings(created_by);
create index if not exists team_development_plan_weeks_created_by_idx
  on public.team_development_plan_weeks(created_by);
create index if not exists team_development_checkins_submitted_by_idx
  on public.team_development_checkins(submitted_by);
create index if not exists team_development_reports_issued_by_idx
  on public.team_development_reports(issued_by) where issued_by is not null;

drop policy if exists "homecourt claims self cancel" on public.homecourt_entity_claims;
drop policy if exists "homecourt claims admin update" on public.homecourt_entity_claims;
create policy "homecourt claims controlled update"
on public.homecourt_entity_claims for update
to authenticated
using (
  private.is_global_admin()
  or (user_id=(select auth.uid()) and status='pending')
)
with check (
  private.is_global_admin()
  or (
    user_id=(select auth.uid())
    and status in ('pending','cancelled')
    and reviewed_by is null
    and reviewed_at is null
  )
);

