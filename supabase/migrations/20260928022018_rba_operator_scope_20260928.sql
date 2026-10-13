-- Scope RBA platform moderation/issuer authority to managers of the
-- Riot Basketball Academy platform entity. This avoids requiring a database-wide
-- admin role for normal RBA operations while keeping authority explicit.

create or replace function private.is_rba_operator()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.platform_entities e
    where e.slug='riot-basketball-academy'
      and (
        e.created_by=(select auth.uid())
        or exists (
          select 1
          from public.entity_memberships em
          where em.entity_id=e.id
            and em.user_id=(select auth.uid())
            and em.status='active'
            and em.member_role in ('owner','admin')
        )
      )
  );
$$;

-- Platform moderation / claim review
drop policy if exists "memberships_read" on public.entity_memberships;
create policy "memberships_read"
on public.entity_memberships for select
to authenticated
using (
  user_id=(select auth.uid())
  or private.is_entity_manager(entity_id)
  or private.is_rba_operator()
  or private.is_global_admin()
);

drop policy if exists "memberships_manage_insert" on public.entity_memberships;
create policy "memberships_manage_insert"
on public.entity_memberships for insert
to authenticated
with check (
  private.is_entity_manager(entity_id)
  or private.is_rba_operator()
  or private.is_global_admin()
);

drop policy if exists "memberships_manage_update" on public.entity_memberships;
create policy "memberships_manage_update"
on public.entity_memberships for update
to authenticated
using (
  private.is_entity_manager(entity_id)
  or private.is_rba_operator()
  or private.is_global_admin()
)
with check (
  private.is_entity_manager(entity_id)
  or private.is_rba_operator()
  or private.is_global_admin()
);

drop policy if exists "memberships_manage_delete" on public.entity_memberships;
create policy "memberships_manage_delete"
on public.entity_memberships for delete
to authenticated
using (
  private.is_entity_manager(entity_id)
  or private.is_rba_operator()
  or private.is_global_admin()
);

drop policy if exists "homecourt public entities manager insert" on public.homecourt_public_entities;
create policy "homecourt public entities manager insert"
on public.homecourt_public_entities for insert
to authenticated
with check (
  private.is_entity_manager(entity_id)
  or private.is_rba_operator()
  or private.is_global_admin()
);

drop policy if exists "homecourt public entities manager update" on public.homecourt_public_entities;
create policy "homecourt public entities manager update"
on public.homecourt_public_entities for update
to authenticated
using (
  private.is_entity_manager(entity_id)
  or private.is_rba_operator()
  or private.is_global_admin()
)
with check (
  private.is_entity_manager(entity_id)
  or private.is_rba_operator()
  or private.is_global_admin()
);

drop policy if exists "homecourt public entities manager delete" on public.homecourt_public_entities;
create policy "homecourt public entities manager delete"
on public.homecourt_public_entities for delete
to authenticated
using (
  private.is_rba_operator()
  or private.is_global_admin()
);

drop policy if exists "homecourt claims self read" on public.homecourt_entity_claims;
create policy "homecourt claims self read"
on public.homecourt_entity_claims for select
to authenticated
using (
  user_id=(select auth.uid())
  or private.is_rba_operator()
  or private.is_global_admin()
);

drop policy if exists "homecourt claims controlled update" on public.homecourt_entity_claims;
create policy "homecourt claims controlled update"
on public.homecourt_entity_claims for update
to authenticated
using (
  private.is_rba_operator()
  or private.is_global_admin()
  or (user_id=(select auth.uid()) and status='pending')
)
with check (
  private.is_rba_operator()
  or private.is_global_admin()
  or (
    user_id=(select auth.uid())
    and status in ('pending','cancelled')
    and reviewed_by is null
    and reviewed_at is null
  )
);

drop policy if exists "homecourt suggestions self read" on public.homecourt_entity_suggestions;
create policy "homecourt suggestions self read"
on public.homecourt_entity_suggestions for select
to authenticated
using (
  user_id=(select auth.uid())
  or private.is_rba_operator()
  or private.is_global_admin()
);

drop policy if exists "homecourt suggestions admin update" on public.homecourt_entity_suggestions;
create policy "homecourt suggestions admin update"
on public.homecourt_entity_suggestions for update
to authenticated
using (
  private.is_rba_operator()
  or private.is_global_admin()
)
with check (
  private.is_rba_operator()
  or private.is_global_admin()
);

create or replace function public.approve_homecourt_entity_claim(claim_id uuid)
returns boolean
language plpgsql
security invoker
set search_path = ''
as $$
declare
  c public.homecourt_entity_claims%rowtype;
begin
  if not (private.is_rba_operator() or private.is_global_admin()) then
    raise exception 'not authorized';
  end if;

  select * into c
  from public.homecourt_entity_claims
  where id=claim_id
  for update;

  if c.id is null or c.status <> 'pending' then
    return false;
  end if;

  update public.homecourt_entity_claims
     set status='approved',
         reviewed_by=(select auth.uid()),
         reviewed_at=now(),
         updated_at=now()
   where id=c.id;

  insert into public.entity_memberships(entity_id,user_id,member_role,status)
  values(c.entity_id,c.user_id,'admin','active')
  on conflict do nothing;

  update public.homecourt_public_entities
     set operator_confirmed_at=coalesce(operator_confirmed_at,now()),
         last_confirmed_at=now(),
         updated_at=now()
   where entity_id=c.entity_id;

  return true;
end;
$$;

create or replace function public.approve_homecourt_entity_suggestion(suggestion_id uuid)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  s public.homecourt_entity_suggestions%rowtype;
  new_entity_id uuid;
  new_slug text;
begin
  if not (private.is_rba_operator() or private.is_global_admin()) then
    raise exception 'not authorized';
  end if;

  select * into s
  from public.homecourt_entity_suggestions
  where id=suggestion_id
  for update;

  if s.id is null or s.status <> 'pending' then
    return null;
  end if;

  new_slug := 'homecourt-' || left(replace(gen_random_uuid()::text,'-',''),16);

  insert into public.platform_entities(
    entity_type,name,slug,country,region,city,website_url,status,verification_status,created_by
  ) values (
    case when s.entity_type in ('team','organizer','facility','partner','supplier') then s.entity_type else 'team' end,
    s.name,new_slug,upper(s.country),s.region,s.city,s.official_url,'active','unverified',(select auth.uid())
  )
  returning id into new_entity_id;

  insert into public.homecourt_public_entities(
    entity_id,entity_type,name,slug,country,region,city,description,website_url,
    source_url,source_checked_at,last_confirmed_at,published
  ) values (
    new_entity_id,s.entity_type,s.name,new_slug,upper(s.country),s.region,s.city,
    s.note,s.official_url,coalesce(s.source_url,s.official_url),now(),now(),true
  );

  update public.homecourt_entity_suggestions
     set status='published',reviewed_by=(select auth.uid()),reviewed_at=now()
   where id=s.id;

  return new_entity_id;
end;
$$;

-- RBA-issued TEAM DEVELOPMENT authoring and commercial controls
create or replace function private.can_manage_team_development(target_cycle uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.team_development_cycles c
    where c.id=target_cycle
      and (
        private.is_entity_manager(c.entity_id)
        or private.is_rba_operator()
        or private.is_global_admin()
      )
  );
$$;

drop policy if exists "team development cycles insert" on public.team_development_cycles;
create policy "team development cycles insert"
on public.team_development_cycles for insert
to authenticated
with check (
  created_by=(select auth.uid())
  and (
    private.is_rba_operator()
    or private.is_global_admin()
    or (
      private.is_entity_manager(entity_id)
      and source_service='self_started'
      and package_key='custom'
      and commercial_status='included'
      and access_ends_at is null
    )
  )
);

drop policy if exists "team development findings admin insert" on public.team_development_findings;
create policy "team development findings admin insert"
on public.team_development_findings for insert
to authenticated
with check (
  created_by=(select auth.uid())
  and (private.is_rba_operator() or private.is_global_admin())
);

drop policy if exists "team development findings admin update" on public.team_development_findings;
create policy "team development findings admin update"
on public.team_development_findings for update
to authenticated
using (private.is_rba_operator() or private.is_global_admin())
with check (private.is_rba_operator() or private.is_global_admin());

drop policy if exists "team development findings admin delete" on public.team_development_findings;
create policy "team development findings admin delete"
on public.team_development_findings for delete
to authenticated
using (private.is_rba_operator() or private.is_global_admin());

drop policy if exists "team development reports admin insert" on public.team_development_reports;
create policy "team development reports admin insert"
on public.team_development_reports for insert
to authenticated
with check (private.is_rba_operator() or private.is_global_admin());

drop policy if exists "team development reports admin update" on public.team_development_reports;
create policy "team development reports admin update"
on public.team_development_reports for update
to authenticated
using (private.is_rba_operator() or private.is_global_admin())
with check (private.is_rba_operator() or private.is_global_admin());

drop policy if exists "team development plan weeks admin insert" on public.team_development_plan_weeks;
create policy "team development plan weeks admin insert"
on public.team_development_plan_weeks for insert
to authenticated
with check (
  created_by=(select auth.uid())
  and (private.is_rba_operator() or private.is_global_admin())
);

drop policy if exists "team development plan weeks admin update" on public.team_development_plan_weeks;
create policy "team development plan weeks admin update"
on public.team_development_plan_weeks for update
to authenticated
using (private.is_rba_operator() or private.is_global_admin())
with check (private.is_rba_operator() or private.is_global_admin());

drop policy if exists "team development plan weeks admin delete" on public.team_development_plan_weeks;
create policy "team development plan weeks admin delete"
on public.team_development_plan_weeks for delete
to authenticated
using (private.is_rba_operator() or private.is_global_admin());

create or replace function private.guard_team_development_commercial_fields()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not (private.is_rba_operator() or private.is_global_admin()) then
    if new.source_service is distinct from old.source_service
       or new.package_key is distinct from old.package_key
       or new.commercial_status is distinct from old.commercial_status
       or new.access_ends_at is distinct from old.access_ends_at
       or new.entity_id is distinct from old.entity_id then
      raise exception 'commercial fields are managed by RBA';
    end if;
  end if;
  return new;
end;
$$;
