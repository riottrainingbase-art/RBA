create table if not exists public.homecourt_player_customization (
  user_id uuid primary key references auth.users(id) on delete cascade,
  skin_tone text not null default 'tone-3' check (skin_tone in ('tone-1','tone-2','tone-3','tone-4','tone-5')),
  hair_style text not null default 'short' check (hair_style in ('short','crop','waves','curly','braids','long')),
  hair_color text not null default 'black' check (hair_color in ('black','brown','dark-brown','ash')),
  jersey_style text not null default 'rba-black' check (jersey_style in ('rba-black','rba-white','rba-signal','street-dark','practice-grey')),
  shorts_style text not null default 'match' check (shorts_style in ('match','black','white','signal')),
  shoe_style text not null default 'basic' check (shoe_style in ('basic','high-top','low-top','court-pro','global')),
  accessory text not null default 'none' check (accessory in ('none','wristband','sleeve','headband','towel')),
  jersey_number smallint not null default 0 check (jersey_number between 0 and 99),
  court_theme text not null default 'base' check (court_theme in ('base','night','street','arena','global')),
  updated_at timestamptz not null default now()
);

alter table public.homecourt_player_customization enable row level security;
revoke all on public.homecourt_player_customization from anon;
grant select,insert,update on public.homecourt_player_customization to authenticated;

drop policy if exists "player customization owner read" on public.homecourt_player_customization;
create policy "player customization owner read"
on public.homecourt_player_customization for select to authenticated
using ((select auth.uid())=user_id);

drop policy if exists "player customization owner insert" on public.homecourt_player_customization;
create policy "player customization owner insert"
on public.homecourt_player_customization for insert to authenticated
with check ((select auth.uid())=user_id);

drop policy if exists "player customization owner update" on public.homecourt_player_customization;
create policy "player customization owner update"
on public.homecourt_player_customization for update to authenticated
using ((select auth.uid())=user_id)
with check ((select auth.uid())=user_id);

create index if not exists homecourt_player_customization_updated_at_idx
on public.homecourt_player_customization(updated_at desc);

create schema if not exists private;

create or replace function private.validate_homecourt_player_customization()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid;
  v_history int;
  v_saves int;
  v_views int;
  v_setup boolean;
  v_xp int;
  v_level int;
  v_official int;
  v_world boolean;
begin
  v_uid := (select auth.uid());
  if v_uid is null or v_uid <> new.user_id then raise exception 'not allowed'; end if;

  select count(*)::int into v_history from public.homecourt_history where user_id=new.user_id;
  select count(*)::int into v_saves from public.homecourt_saves where user_id=new.user_id and item_type='opportunity';
  select count(distinct item_key)::int into v_views
  from public.analytics_events
  where user_id=new.user_id and event_name='view' and item_type='journal' and item_key is not null;

  select exists(
    select 1 from public.profiles p
    where p.id=new.user_id and p.onboarding_completed=true
      and nullif(btrim(coalesce(p.display_name,'')),'') is not null
      and exists(select 1 from public.profile_roles pr where pr.user_id=new.user_id and pr.status='active')
  ) into v_setup;

  v_xp := 100 + least(v_history,8)*35 + least(v_saves,5)*25 + least(v_views,10)*12
    + case when v_setup then 50 else 0 end;

  v_level := case
    when v_xp >= 660 then 8 when v_xp >= 595 then 7 when v_xp >= 515 then 6
    when v_xp >= 425 then 5 when v_xp >= 325 then 4 when v_xp >= 225 then 3
    when v_xp >= 125 then 2 else 1 end;

  select count(*)::int into v_official
  from public.participations
  where player_user_id=new.user_id and attendance_status='attended';

  select exists(
    select 1 from public.participations p
    join public.events e on e.id=p.event_id
    where p.player_user_id=new.user_id
      and p.attendance_status='attended'
      and coalesce(e.country,'JP') <> 'JP'
  ) into v_world;

  if new.hair_style='waves' and v_level < 2 then raise exception 'item locked'; end if;
  if new.hair_style='curly' and v_level < 3 then raise exception 'item locked'; end if;
  if new.hair_style='braids' and v_level < 4 then raise exception 'item locked'; end if;
  if new.hair_style='long' and v_level < 5 then raise exception 'item locked'; end if;
  if new.jersey_style='rba-white' and v_level < 2 then raise exception 'item locked'; end if;
  if new.jersey_style='rba-signal' and v_level < 3 then raise exception 'item locked'; end if;
  if new.jersey_style='street-dark' and v_level < 4 then raise exception 'item locked'; end if;
  if new.shoe_style='high-top' and v_level < 2 then raise exception 'item locked'; end if;
  if new.shoe_style='low-top' and v_level < 3 then raise exception 'item locked'; end if;
  if new.shoe_style='court-pro' and v_official < 1 then raise exception 'item locked'; end if;
  if new.shoe_style='global' and not v_world then raise exception 'item locked'; end if;
  if new.accessory='wristband' and v_level < 2 then raise exception 'item locked'; end if;
  if new.accessory='sleeve' and v_level < 3 then raise exception 'item locked'; end if;
  if new.accessory='headband' and v_level < 4 then raise exception 'item locked'; end if;
  if new.accessory='towel' and v_official < 1 then raise exception 'item locked'; end if;
  if new.court_theme='night' and v_level < 2 then raise exception 'item locked'; end if;
  if new.court_theme='street' and v_level < 3 then raise exception 'item locked'; end if;
  if new.court_theme='arena' and v_official < 3 then raise exception 'item locked'; end if;
  if new.court_theme='global' and not v_world then raise exception 'item locked'; end if;
  return new;
end;
$$;

revoke all on function private.validate_homecourt_player_customization() from public;
revoke all on function private.validate_homecourt_player_customization() from anon;
revoke all on function private.validate_homecourt_player_customization() from authenticated;

drop trigger if exists validate_homecourt_player_customization_trigger on public.homecourt_player_customization;
create trigger validate_homecourt_player_customization_trigger
before insert or update on public.homecourt_player_customization
for each row execute function private.validate_homecourt_player_customization();
