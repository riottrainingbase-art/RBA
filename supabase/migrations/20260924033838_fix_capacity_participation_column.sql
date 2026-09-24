CREATE OR REPLACE FUNCTION public.rba_reserve_checkout_capacity(p_event_id uuid, p_subject_user_id uuid, p_application_id uuid, p_capacity integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_participants integer := 0;
  v_holds integer := 0;
  v_existing text;
begin
  if p_capacity is null or p_capacity <= 0 then
    return jsonb_build_object('allowed',false,'reason','capacity_not_configured');
  end if;

  perform pg_advisory_xact_lock(hashtextextended(p_event_id::text,0));

  select status into v_existing
  from public.program_waitlist
  where event_id=p_event_id and subject_user_id=p_subject_user_id
  for update;

  if v_existing='offered' then
    update public.program_waitlist
    set offer_expires_at=greatest(coalesce(offer_expires_at,now()),now()+interval '30 minutes')
    where event_id=p_event_id and subject_user_id=p_subject_user_id;
    return jsonb_build_object('allowed',true,'reason','existing_hold');
  end if;

  if exists(
    select 1 from public.participations
    where event_id=p_event_id
      and player_user_id=p_subject_user_id
      and attendance_status in ('registered','confirmed','attended')
  ) then
    return jsonb_build_object('allowed',true,'reason','already_registered');
  end if;

  select count(*) into v_participants
  from public.participations
  where event_id=p_event_id
    and attendance_status in ('registered','confirmed','attended');

  select count(*) into v_holds
  from public.program_waitlist
  where event_id=p_event_id
    and status='offered'
    and coalesce(offer_expires_at,now()+interval '1 minute')>now()
    and subject_user_id<>p_subject_user_id;

  if v_participants + v_holds >= p_capacity then
    insert into public.program_waitlist(event_id,subject_user_id,application_id,status,joined_at,offer_expires_at)
    values(p_event_id,p_subject_user_id,p_application_id,'waiting',now(),null)
    on conflict(event_id,subject_user_id) do update
      set application_id=coalesce(excluded.application_id,public.program_waitlist.application_id),
          status='waiting',
          offer_expires_at=null;

    if p_application_id is not null then
      update public.program_applications
      set status='waitlisted'
      where id=p_application_id and status not in ('rejected','withdrawn');
    end if;

    return jsonb_build_object(
      'allowed',false,'reason','capacity_reached',
      'occupied',v_participants,'reserved',v_holds,'capacity',p_capacity
    );
  end if;

  insert into public.program_waitlist(event_id,subject_user_id,application_id,status,joined_at,offer_expires_at)
  values(p_event_id,p_subject_user_id,p_application_id,'offered',now(),now()+interval '30 minutes')
  on conflict(event_id,subject_user_id) do update
    set application_id=coalesce(excluded.application_id,public.program_waitlist.application_id),
        status='offered',
        offer_expires_at=now()+interval '30 minutes';

  return jsonb_build_object(
    'allowed',true,'reason','seat_held',
    'occupied',v_participants,'reserved',v_holds,'capacity',p_capacity,
    'hold_minutes',30
  );
end;
$function$

