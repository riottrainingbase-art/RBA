
-- RBA Platform Expansion v2.1
-- Discovery, pathway, communication and advisor cleanup.

alter table public.platform_entities
  add column if not exists address_line text,
  add column if not exists postal_code text,
  add column if not exists city text,
  add column if not exists latitude numeric(9,6),
  add column if not exists longitude numeric(9,6),
  add column if not exists contact_email text,
  add column if not exists contact_phone text;

create table if not exists public.player_pathway_milestones (
  id uuid primary key default gen_random_uuid(),
  player_user_id uuid not null references auth.users(id) on delete cascade,
  milestone_type text not null check (milestone_type in (
    'first_event','repeat_participant','camp','tournament','international',
    'leadership','skill_progress','team_selection','coach_recognition','other'
  )),
  title text not null,
  description text,
  event_id uuid references public.events(id) on delete set null,
  achieved_on date not null default current_date,
  verified_by uuid references auth.users(id),
  visibility text not null default 'family'
    check (visibility in ('private','family','team','rba_network')),
  created_at timestamptz not null default now()
);
create index if not exists player_pathway_milestones_player_idx
  on public.player_pathway_milestones(player_user_id,achieved_on desc);
create index if not exists player_pathway_milestones_event_idx
  on public.player_pathway_milestones(event_id);
create index if not exists player_pathway_milestones_verified_by_idx
  on public.player_pathway_milestones(verified_by);

create table if not exists public.notification_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  event_updates boolean not null default true,
  payment_updates boolean not null default true,
  team_updates boolean not null default true,
  development_updates boolean not null default true,
  opportunities boolean not null default true,
  marketing boolean not null default false,
  preferred_channel text not null default 'email'
    check (preferred_channel in ('email','line','push','none')),
  updated_at timestamptz not null default now()
);

create table if not exists public.platform_notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  notification_type text not null,
  title text not null,
  body text not null,
  action_url text,
  read_at timestamptz,
  created_at timestamptz not null default now(),
  expires_at timestamptz
);
create index if not exists platform_notifications_user_unread_idx
  on public.platform_notifications(user_id,read_at,created_at desc);

create or replace view public.public_offer_directory
with (security_invoker=true)
as
select
  s.id,
  s.offer_code,
  s.slug,
  s.offer_type,
  s.title,
  s.summary,
  s.currency,
  s.unit_amount,
  s.pricing_mode,
  s.starts_at,
  s.ends_at,
  s.capacity,
  bu.code as business_unit_code,
  bu.name as business_unit_name,
  coalesce(
    jsonb_agg(
      distinct jsonb_build_object(
        'key',t.tag_key,
        'label_ja',t.label_ja,
        'label_en',t.label_en,
        'category',t.category
      )
    ) filter (where t.id is not null),
    '[]'::jsonb
  ) as tags
from public.service_offers s
left join public.business_units bu on bu.id=s.business_unit_id
left join public.offer_tags ot on ot.service_offer_id=s.id
left join public.entity_tags t on t.id=ot.tag_id
where s.publication_status='published'
group by s.id,s.offer_code,s.slug,s.offer_type,s.title,s.summary,s.currency,
         s.unit_amount,s.pricing_mode,s.starts_at,s.ends_at,s.capacity,bu.code,bu.name;

grant select on public.public_offer_directory to anon,authenticated;

alter table public.player_pathway_milestones enable row level security;
alter table public.notification_preferences enable row level security;
alter table public.platform_notifications enable row level security;

create policy "pathway_family_read" on public.player_pathway_milestones
for select to authenticated using (
  player_user_id=(select auth.uid())
  or exists(select 1 from public.guardian_links gl where gl.child_user_id=player_user_id and gl.parent_user_id=(select auth.uid()) and gl.verified_at is not null)
  or private.is_global_admin()
);
create policy "pathway_admin_insert" on public.player_pathway_milestones
for insert to authenticated with check (private.is_global_admin());

create policy "notification_preferences_self_read" on public.notification_preferences
for select to authenticated using (user_id=(select auth.uid()) or private.is_global_admin());
create policy "notification_preferences_self_insert" on public.notification_preferences
for insert to authenticated with check (user_id=(select auth.uid()) or private.is_global_admin());
create policy "notification_preferences_self_update" on public.notification_preferences
for update to authenticated using (user_id=(select auth.uid()) or private.is_global_admin())
with check (user_id=(select auth.uid()) or private.is_global_admin());

create policy "notifications_self_read" on public.platform_notifications
for select to authenticated using (user_id=(select auth.uid()) or private.is_global_admin());
create policy "notifications_self_update" on public.platform_notifications
for update to authenticated using (user_id=(select auth.uid()) or private.is_global_admin())
with check (user_id=(select auth.uid()) or private.is_global_admin());
create policy "notifications_admin_insert" on public.platform_notifications
for insert to authenticated with check (private.is_global_admin());

-- Cover new foreign keys.
create index if not exists coach_credentials_verified_by_idx on public.coach_credentials(verified_by);
create index if not exists development_plan_assigned_by_idx on public.development_plan_items(assigned_by);
create index if not exists development_plan_goal_idx on public.development_plan_items(goal_id);
create index if not exists event_checkins_checked_in_by_idx on public.event_checkins(checked_in_by);
create index if not exists event_checkins_participant_idx on public.event_checkins(participant_user_id);
create index if not exists player_assessments_event_idx on public.player_assessments(event_id);
create index if not exists player_goals_created_by_idx on public.player_goals(created_by);
create index if not exists player_reflections_event_idx on public.player_reflections(event_id);
create index if not exists program_applications_reviewed_by_idx on public.program_applications(reviewed_by);
create index if not exists program_applications_offer_idx on public.program_applications(service_offer_id);
create index if not exists program_feedback_participant_idx on public.program_feedback(participant_user_id);
create index if not exists program_feedback_offer_idx on public.program_feedback(service_offer_id);
create index if not exists program_feedback_user_idx on public.program_feedback(user_id);
create index if not exists program_waitlist_application_idx on public.program_waitlist(application_id);
create index if not exists program_waitlist_subject_idx on public.program_waitlist(subject_user_id);
create index if not exists scholarship_awards_approved_by_idx on public.scholarship_awards(approved_by);
create index if not exists scholarship_awards_event_idx on public.scholarship_awards(event_id);
create index if not exists scholarship_awards_program_idx on public.scholarship_awards(scholarship_program_id);
create index if not exists scholarship_awards_offer_idx on public.scholarship_awards(service_offer_id);

-- Replace ALL policies that overlap SELECT with action-specific policies.
drop policy if exists "development_plan_assign" on public.development_plan_items;
create policy "development_plan_insert" on public.development_plan_items
for insert to authenticated with check (
  assigned_by=(select auth.uid()) or player_user_id=(select auth.uid()) or private.is_global_admin()
);
create policy "development_plan_update" on public.development_plan_items
for update to authenticated using (
  assigned_by=(select auth.uid()) or player_user_id=(select auth.uid()) or private.is_global_admin()
) with check (
  assigned_by=(select auth.uid()) or player_user_id=(select auth.uid()) or private.is_global_admin()
);
create policy "development_plan_delete" on public.development_plan_items
for delete to authenticated using (
  assigned_by=(select auth.uid()) or player_user_id=(select auth.uid()) or private.is_global_admin()
);

drop policy if exists "player_goals_manage" on public.player_goals;
create policy "player_goals_insert" on public.player_goals
for insert to authenticated with check (
  player_user_id=(select auth.uid()) or created_by=(select auth.uid()) or private.is_global_admin()
);
create policy "player_goals_update" on public.player_goals
for update to authenticated using (
  player_user_id=(select auth.uid()) or created_by=(select auth.uid()) or private.is_global_admin()
) with check (
  player_user_id=(select auth.uid()) or created_by=(select auth.uid()) or private.is_global_admin()
);
create policy "player_goals_delete" on public.player_goals
for delete to authenticated using (
  player_user_id=(select auth.uid()) or created_by=(select auth.uid()) or private.is_global_admin()
);

drop policy if exists "reflections_self_write" on public.player_reflections;
create policy "reflections_self_insert" on public.player_reflections
for insert to authenticated with check (player_user_id=(select auth.uid()) or private.is_global_admin());
create policy "reflections_self_update" on public.player_reflections
for update to authenticated using (player_user_id=(select auth.uid()) or private.is_global_admin())
with check (player_user_id=(select auth.uid()) or private.is_global_admin());
create policy "reflections_self_delete" on public.player_reflections
for delete to authenticated using (player_user_id=(select auth.uid()) or private.is_global_admin());

drop policy if exists "safety_profile_self_write" on public.participant_safety_profiles;
create policy "safety_profile_family_insert" on public.participant_safety_profiles
for insert to authenticated with check (
 user_id=(select auth.uid())
 or exists(select 1 from public.guardian_links gl where gl.child_user_id=user_id and gl.parent_user_id=(select auth.uid()) and gl.verified_at is not null)
 or private.is_global_admin()
);
create policy "safety_profile_family_update" on public.participant_safety_profiles
for update to authenticated using (
 user_id=(select auth.uid())
 or exists(select 1 from public.guardian_links gl where gl.child_user_id=user_id and gl.parent_user_id=(select auth.uid()) and gl.verified_at is not null)
 or private.is_global_admin()
) with check (
 user_id=(select auth.uid())
 or exists(select 1 from public.guardian_links gl where gl.child_user_id=user_id and gl.parent_user_id=(select auth.uid()) and gl.verified_at is not null)
 or private.is_global_admin()
);

drop policy if exists "waitlist_admin_manage" on public.program_waitlist;
create policy "waitlist_admin_insert" on public.program_waitlist
for insert to authenticated with check (private.is_global_admin());
create policy "waitlist_admin_update" on public.program_waitlist
for update to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "waitlist_admin_delete" on public.program_waitlist
for delete to authenticated using (private.is_global_admin());

drop policy if exists "scholarships_admin_manage" on public.scholarship_programs;
create policy "scholarships_admin_insert" on public.scholarship_programs
for insert to authenticated with check (private.is_global_admin());
create policy "scholarships_admin_update" on public.scholarship_programs
for update to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "scholarships_admin_delete" on public.scholarship_programs
for delete to authenticated using (private.is_global_admin());

drop policy if exists "awards_admin_manage" on public.scholarship_awards;
create policy "awards_admin_insert" on public.scholarship_awards
for insert to authenticated with check (private.is_global_admin());
create policy "awards_admin_update" on public.scholarship_awards
for update to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "awards_admin_delete" on public.scholarship_awards
for delete to authenticated using (private.is_global_admin());

drop policy if exists "event_checkins_admin_manage" on public.event_checkins;
create policy "event_checkins_admin_insert" on public.event_checkins
for insert to authenticated with check (private.is_global_admin());
create policy "event_checkins_admin_update" on public.event_checkins
for update to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "event_checkins_admin_delete" on public.event_checkins
for delete to authenticated using (private.is_global_admin());

drop policy if exists "entity_tags_admin_write" on public.entity_tags;
create policy "entity_tags_admin_insert" on public.entity_tags
for insert to authenticated with check (private.is_global_admin());
create policy "entity_tags_admin_update" on public.entity_tags
for update to authenticated using (private.is_global_admin()) with check (private.is_global_admin());
create policy "entity_tags_admin_delete" on public.entity_tags
for delete to authenticated using (private.is_global_admin());

drop policy if exists "platform_entity_tags_admin_write" on public.platform_entity_tags;
create policy "platform_entity_tags_admin_insert" on public.platform_entity_tags
for insert to authenticated with check (private.is_global_admin());
create policy "platform_entity_tags_admin_delete" on public.platform_entity_tags
for delete to authenticated using (private.is_global_admin());

drop policy if exists "offer_tags_admin_write" on public.offer_tags;
create policy "offer_tags_admin_insert" on public.offer_tags
for insert to authenticated with check (private.is_global_admin());
create policy "offer_tags_admin_delete" on public.offer_tags
for delete to authenticated using (private.is_global_admin());

drop policy if exists "program_feedback_admin_read" on public.program_feedback;
drop policy if exists "program_feedback_self_read" on public.program_feedback;
create policy "program_feedback_read" on public.program_feedback
for select to authenticated using (user_id=(select auth.uid()) or private.is_global_admin());

