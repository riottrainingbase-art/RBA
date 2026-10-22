create table public.clinic_registrations (
  id uuid primary key default gen_random_uuid(),
  event_slug text not null references public.events(slug),
  guardian_user_id uuid not null references auth.users(id),
  participant_name text not null check (char_length(participant_name) between 1 and 80),
  participant_key text not null,
  school_grade text not null check (school_grade in ('小学4年生','小学5年生','小学6年生','中学1年生','中学2年生','中学3年生')),
  guardian_name text not null check (char_length(guardian_name) between 1 and 80),
  contact_email text not null,
  emergency_phone text not null check (char_length(emergency_phone) between 8 and 25),
  media_consent boolean not null default false,
  terms_version text not null,
  consented_at timestamptz not null default now(),
  status text not null default 'submitted' check (status in ('submitted','waitlisted','paid','withdrawn')),
  checkout_session_id text unique,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  unique (event_slug,guardian_user_id,participant_key,school_grade)
);
alter table public.clinic_registrations enable row level security;
revoke all on public.clinic_registrations from anon, authenticated;
grant select on public.clinic_registrations to authenticated;
grant all on public.clinic_registrations to service_role;
create policy clinic_registration_owner_read on public.clinic_registrations for select to authenticated
using (guardian_user_id=(select auth.uid()) or private.is_global_admin());
create index clinic_registrations_event_status on public.clinic_registrations(event_slug,status);

-- Only the authenticated Edge Function's service client can call this writer.
-- The event row lock serialises registrations and enforces the 50-person queue.
create function public.rba_submit_okinawa_clinic(p_user_id uuid,p_email text,p_answers jsonb)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare r public.clinic_registrations; e public.events; n integer;
begin
  select * into e from public.events where slug='okinawa-clinic-2026-11-14' for update;
  if not found or e.status not in ('draft','open') or e.starts_at <= now() then raise exception 'registration_closed'; end if;
  select * into r from public.clinic_registrations
  where event_slug=e.slug and guardian_user_id=p_user_id
    and participant_key=p_answers->>'participant_key' and school_grade=p_answers->>'school_grade';
  if found then return to_jsonb(r); end if;
  select count(*) into n from public.clinic_registrations where event_slug=e.slug and status in ('submitted','paid');
  insert into public.clinic_registrations(event_slug,guardian_user_id,participant_name,participant_key,school_grade,guardian_name,contact_email,emergency_phone,media_consent,terms_version,status)
  values(e.slug,p_user_id,p_answers->>'participant_name',p_answers->>'participant_key',p_answers->>'school_grade',p_answers->>'guardian_name',p_email,p_answers->>'emergency_phone',coalesce((p_answers->>'media_consent')::boolean,false),'okinawa-20261114-v1',case when n>=e.capacity then 'waitlisted' else 'submitted' end)
  returning * into r;
  return to_jsonb(r);
end $$;
revoke execute on function public.rba_submit_okinawa_clinic(uuid,text,jsonb) from public,anon,authenticated;
grant execute on function public.rba_submit_okinawa_clinic(uuid,text,jsonb) to service_role;
