-- Dedicated Aichi clinic reservations; not applied during code preparation.
create table if not exists public.aichi_clinic_applications (
 id uuid primary key default gen_random_uuid(),
 plan text not null check (plan in ('am','pm','full')),
 identity_hash text not null,
 guardian text not null, email text not null, phone text not null,
 player text not null, grade text not null, team text not null default '',
 amount integer not null check ((plan='full' and amount in (11000,13200)) or (plan in ('am','pm') and amount in (6600,7700))),
 terms_version text not null,
 status text not null default 'creating' check (status in ('creating','open','paid','expired','failed')),
 stripe_session_id text unique, stripe_payment_intent_id text unique,
 created_at timestamptz not null default now(), paid_at timestamptz
);
alter table public.aichi_clinic_applications enable row level security;
revoke all on public.aichi_clinic_applications from public, anon, authenticated;
grant select,insert,update on public.aichi_clinic_applications to service_role;
create unique index if not exists aichi_clinic_active_player on public.aichi_clinic_applications(identity_hash) where status in ('creating','open','paid');
create or replace function public.reserve_aichi_clinic(p_plan text,p_identity text,p_guardian text,p_email text,p_phone text,p_player text,p_grade text,p_team text,p_amount integer,p_terms text,p_capacity integer)
returns uuid language plpgsql security invoker set search_path=public as $$
declare reserved uuid;
begin
 if p_capacity is null or p_capacity<1 then return null; end if;
 perform pg_advisory_xact_lock(hashtextextended('aichi-clinic-2027',0));
 if (select count(*) from public.aichi_clinic_applications where status in ('creating','open','paid'))>=p_capacity then return null; end if;
 insert into public.aichi_clinic_applications(plan,identity_hash,guardian,email,phone,player,grade,team,amount,terms_version) values(p_plan,p_identity,p_guardian,p_email,p_phone,p_player,p_grade,p_team,p_amount,p_terms) returning id into reserved;
 return reserved;
 exception when unique_violation then return null;
end; $$;
revoke all on function public.reserve_aichi_clinic(text,text,text,text,text,text,text,text,integer,text,integer) from public, anon, authenticated;
grant execute on function public.reserve_aichi_clinic(text,text,text,text,text,text,text,text,integer,text,integer) to service_role;
