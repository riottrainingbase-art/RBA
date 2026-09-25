-- Enforce HOMECOURT PLUS entitlements in the database for PLUS-only records.
create or replace function private.has_homecourt_plus(target_user uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.subscriptions s
    where s.user_id = target_user
      and s.plan_key = 'homecourt_monthly'
      and s.status::text in ('active','trialing')
      and (
        coalesce(s.cancel_at_period_end,false) = false
        or (s.current_period_end is not null and s.current_period_end > now())
      )
  );
$$;
revoke all on function private.has_homecourt_plus(uuid) from public, anon;
grant execute on function private.has_homecourt_plus(uuid) to authenticated;

drop policy if exists "weekly action owner reads" on public.homecourt_weekly_actions;
drop policy if exists "weekly action owner inserts" on public.homecourt_weekly_actions;
drop policy if exists "weekly action owner updates" on public.homecourt_weekly_actions;
drop policy if exists "weekly action owner deletes" on public.homecourt_weekly_actions;

create policy "weekly plus owner reads" on public.homecourt_weekly_actions for select to authenticated
using ((select auth.uid())=user_id and private.has_homecourt_plus((select auth.uid())));
create policy "weekly plus owner inserts" on public.homecourt_weekly_actions for insert to authenticated
with check ((select auth.uid())=user_id and private.has_homecourt_plus((select auth.uid())));
create policy "weekly plus owner updates" on public.homecourt_weekly_actions for update to authenticated
using ((select auth.uid())=user_id and private.has_homecourt_plus((select auth.uid())))
with check ((select auth.uid())=user_id and private.has_homecourt_plus((select auth.uid())));
create policy "weekly plus owner deletes" on public.homecourt_weekly_actions for delete to authenticated
using ((select auth.uid())=user_id and private.has_homecourt_plus((select auth.uid())));

drop policy if exists "monthly review owner reads" on public.homecourt_monthly_reviews;
drop policy if exists "monthly review owner inserts" on public.homecourt_monthly_reviews;
drop policy if exists "monthly review owner updates" on public.homecourt_monthly_reviews;
drop policy if exists "monthly review owner deletes" on public.homecourt_monthly_reviews;

create policy "monthly plus owner reads" on public.homecourt_monthly_reviews for select to authenticated
using ((select auth.uid())=user_id and private.has_homecourt_plus((select auth.uid())));
create policy "monthly plus owner inserts" on public.homecourt_monthly_reviews for insert to authenticated
with check ((select auth.uid())=user_id and private.has_homecourt_plus((select auth.uid())));
create policy "monthly plus owner updates" on public.homecourt_monthly_reviews for update to authenticated
using ((select auth.uid())=user_id and private.has_homecourt_plus((select auth.uid())))
with check ((select auth.uid())=user_id and private.has_homecourt_plus((select auth.uid())));
create policy "monthly plus owner deletes" on public.homecourt_monthly_reviews for delete to authenticated
using ((select auth.uid())=user_id and private.has_homecourt_plus((select auth.uid())));