-- Remote Supabase migration version 20261128100851, applied and verified.
-- Depends on the aichi_clinic_checkout migration; execute in that order.
-- Durable transactional confirmation queue for Aichi only.
create table if not exists public.aichi_clinic_confirmation_outbox (
 application_id uuid primary key references public.aichi_clinic_applications(id),
 state text not null default 'pending' check (state in ('pending','sending','sent','review')),
 queued_at timestamptz not null default now(),
 claimed_at timestamptz,
 sent_at timestamptz,
 gmail_message_id text unique,
 check (state <> 'sent' or (sent_at is not null and gmail_message_id is not null))
);
alter table public.aichi_clinic_confirmation_outbox enable row level security;
revoke all on public.aichi_clinic_confirmation_outbox from public, anon, authenticated;
grant select,insert,update on public.aichi_clinic_confirmation_outbox to service_role;
create or replace function public.queue_aichi_clinic_confirmation()
returns trigger language plpgsql security invoker set search_path=public as $$
begin
 if new.status='paid' and old.status is distinct from 'paid' then
  insert into public.aichi_clinic_confirmation_outbox(application_id) values(new.id) on conflict(application_id) do nothing;
 end if;
 return new;
end;
$$;
revoke all on function public.queue_aichi_clinic_confirmation() from public, anon, authenticated;
grant execute on function public.queue_aichi_clinic_confirmation() to service_role;
create trigger aichi_clinic_confirmation_on_paid after update of status on public.aichi_clinic_applications for each row execute function public.queue_aichi_clinic_confirmation();
insert into public.aichi_clinic_confirmation_outbox(application_id) select id from public.aichi_clinic_applications where status='paid' on conflict(application_id) do nothing;
