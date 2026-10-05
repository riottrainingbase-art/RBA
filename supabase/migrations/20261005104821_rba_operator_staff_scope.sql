-- Allow explicitly assigned RBA staff to operate the RBA exception console.
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
            and em.member_role in ('owner','admin','staff')
        )
      )
  );
$$;
