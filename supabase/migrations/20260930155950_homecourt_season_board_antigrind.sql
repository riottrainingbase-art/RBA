create or replace function public.get_homecourt_season_board(p_limit integer default 20)
returns table(
  rank_no bigint,
  ranking_tag text,
  season_points integer,
  is_self boolean,
  skin_tone text,
  hair_style text,
  hair_color text,
  jersey_style text,
  jersey_number smallint
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := (select auth.uid());
  v_limit integer := least(greatest(coalesce(p_limit,20),5),50);
begin
  if v_uid is null then
    raise exception 'authentication required';
  end if;

  if not exists (
    select 1 from public.profiles p
    where p.id=v_uid and p.role='player'
  ) then
    raise exception 'player account required';
  end if;

  return query
  with opted as (
    select
      r.user_id,
      r.ranking_tag,
      coalesce(c.skin_tone,'tone-3') as skin_tone,
      coalesce(c.hair_style,'spiky') as hair_style,
      coalesce(c.hair_color,'dark-brown') as hair_color,
      coalesce(c.jersey_style,'rba-black') as jersey_style,
      coalesce(c.jersey_number,23)::smallint as jersey_number
    from public.homecourt_ranking_preferences r
    left join public.homecourt_player_customization c on c.user_id=r.user_id
    join public.profiles p on p.id=r.user_id and p.role='player'
    where r.participate=true
  ),
  activity as (
    select
      o.*,
      least((
        select count(distinct h.created_at::date)::int
        from public.homecourt_history h
        where h.user_id=o.user_id
          and h.created_at >= '2026-10-01 00:00:00+09'::timestamptz
          and h.created_at <  '2027-01-01 00:00:00+09'::timestamptz
      ),5) as passport_actions,
      least((
        select count(distinct s.item_key)::int
        from public.homecourt_saves s
        where s.user_id=o.user_id
          and s.item_type='opportunity'
          and s.created_at >= '2026-10-01 00:00:00+09'::timestamptz
          and s.created_at <  '2027-01-01 00:00:00+09'::timestamptz
      ),5) as discovery_actions,
      least((
        select count(distinct a.item_key)::int
        from public.analytics_events a
        where a.user_id=o.user_id
          and a.event_name='view'
          and a.item_type='journal'
          and a.item_key is not null
          and a.occurred_at >= '2026-10-01 00:00:00+09'::timestamptz
          and a.occurred_at <  '2027-01-01 00:00:00+09'::timestamptz
      ),10) as learning_actions,
      least((
        select count(distinct pa.event_id)::int
        from public.participations pa
        join public.events e on e.id=pa.event_id
        where pa.player_user_id=o.user_id
          and pa.attendance_status='attended'
          and e.starts_at >= '2026-10-01 00:00:00+09'::timestamptz
          and e.starts_at <  '2027-01-01 00:00:00+09'::timestamptz
      ),4) as verified_actions
    from opted o
  ),
  scored as (
    select
      a.*,
      (
        a.passport_actions*40
        + a.discovery_actions*20
        + a.learning_actions*10
        + a.verified_actions*75
        + case
            when a.passport_actions>0
             and a.discovery_actions>0
             and a.learning_actions>0
             and a.verified_actions>0
            then 50 else 0
          end
      )::int as season_points
    from activity a
  ),
  ranked as (
    select
      dense_rank() over(order by s.season_points desc) as rank_no,
      row_number() over(order by s.season_points desc, s.ranking_tag asc) as ordinal_no,
      s.*
    from scored s
  )
  select
    r.rank_no,
    r.ranking_tag,
    r.season_points,
    (r.user_id=v_uid) as is_self,
    r.skin_tone,
    r.hair_style,
    r.hair_color,
    r.jersey_style,
    r.jersey_number
  from ranked r
  where r.ordinal_no <= v_limit or r.user_id=v_uid
  order by r.rank_no, r.ranking_tag;
end;
$$;

revoke all on function public.get_homecourt_season_board(integer) from public, anon, authenticated;
grant execute on function public.get_homecourt_season_board(integer) to authenticated;

