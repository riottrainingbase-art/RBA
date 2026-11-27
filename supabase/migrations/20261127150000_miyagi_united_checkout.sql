-- Isolated guardian applications. Service-role-only; no access by public clients.
create table if not exists public.miyagi_united_applications (
 id uuid primary key default gen_random_uuid(),
 programme text not null check (programme in ('shizugawa','rizehope')),
 identity_hash text not null,
 guardian text not null, email text not null, phone text not null,
 player text not null, grade text not null, region text not null, team text not null default '',
 amount integer not null check ((programme='shizugawa' and amount in (29800,33000)) or (programme='rizehope' and amount in (22000,24800))),
 terms_version text not null,
 status text not null default 'creating' check (status in ('creating','open','paid','expired','failed')),
 stripe_session_id text unique,
 stripe_payment_intent_id text unique,
 created_at timestamptz not null default now(), paid_at timestamptz
);
alter table public.miyagi_united_applications enable row level security;
revoke all on public.miyagi_united_applications from public, anon, authenticated;
grant select,insert,update on public.miyagi_united_applications to service_role;
create unique index if not exists miyagi_active_guardian_player on public.miyagi_united_applications(programme,identity_hash) where status in ('creating','open','paid');
create or replace function public.reserve_miyagi_united(p_programme text,p_identity text,p_guardian text,p_email text,p_phone text,p_player text,p_grade text,p_region text,p_team text,p_amount integer,p_terms text,p_capacity integer)
returns uuid language plpgsql security invoker set search_path=public as $$
declare reserved uuid;
begin
 if p_capacity is null or p_capacity<1 then return null; end if;
 perform pg_advisory_xact_lock(hashtextextended('miyagi-united:'||p_programme,0));
 if (select count(*) from public.miyagi_united_applications where programme=p_programme and status in ('creating','open','paid'))>=p_capacity then return null; end if;
 insert into public.miyagi_united_applications(programme,identity_hash,guardian,email,phone,player,grade,region,team,amount,terms_version)
 values(p_programme,p_identity,p_guardian,p_email,p_phone,p_player,p_grade,p_region,p_team,p_amount,p_terms) returning id into reserved;
 return reserved;
 exception when unique_violation then return null;
end; $$;
revoke all on function public.reserve_miyagi_united(text,text,text,text,text,text,text,text,text,integer,text,integer) from public, anon, authenticated;
grant execute on function public.reserve_miyagi_united(text,text,text,text,text,text,text,text,text,integer,text,integer) to service_role;
