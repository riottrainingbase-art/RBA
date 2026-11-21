-- RBA ESSENTIALS artisan development records: private, never a public order catalog.
-- All updates are operator-authenticated server-side. No end-user browsing or writes.
create table if not exists public.rba_essentials_artisan_trials (
  id uuid primary key default gen_random_uuid(),
  label text not null check (char_length(label) between 3 and 100),
  garment text not null check (garment in ('white_tee','black_hoodie')),
  finish text not null check (finish in ('signature_lettering','artist_one_of_one')),
  stage text not null default 'design' check (stage in ('design','quote_requested','sample_in_progress','sample_received','revisions_needed','approved_for_internal_review','paused')),
  sample_count integer not null default 0 check (sample_count between 0 and 100),
  wash_cycles integer not null default 0 check (wash_cycles between 0 and 100),
  paint_method_tested boolean not null default false,
  rights_approved boolean not null default false,
  creator_compensation_agreed boolean not null default false,
  sample_quality_approved boolean not null default false,
  label_care_approved boolean not null default false,
  fulfillment_confirmed boolean not null default false,
  quoted_artist_fee_jpy integer check (quoted_artist_fee_jpy between 0 and 1000000),
  estimated_minutes integer check (estimated_minutes between 1 and 1000),
  planned_addon_jpy integer check (planned_addon_jpy between 100 and 200000),
  notes text not null default '' check (char_length(notes) <= 2000),
  created_by uuid not null,
  updated_by uuid not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint internal_review_requires_evidence check (
    stage <> 'approved_for_internal_review' or
      (sample_count >= 1 and wash_cycles >= 10 and paint_method_tested
       and rights_approved and creator_compensation_agreed
       and sample_quality_approved and label_care_approved and fulfillment_confirmed
       and quoted_artist_fee_jpy is not null and estimated_minutes is not null)
  )
);
create index if not exists rba_essentials_artisan_stage_idx
  on public.rba_essentials_artisan_trials(stage,updated_at desc);
alter table public.rba_essentials_artisan_trials enable row level security;
revoke all on table public.rba_essentials_artisan_trials from anon,authenticated;
grant select,insert,update on table public.rba_essentials_artisan_trials to service_role;

create table if not exists public.rba_essentials_artisan_audit (
  id bigint generated always as identity primary key,
  trial_id uuid not null references public.rba_essentials_artisan_trials(id),
  operation text not null check (operation in ('INSERT','UPDATE')),
  operator_id uuid not null,
  snapshot jsonb not null,
  occurred_at timestamptz not null default now()
);
create index if not exists rba_essentials_artisan_audit_trial_idx
  on public.rba_essentials_artisan_audit(trial_id,occurred_at desc);
alter table public.rba_essentials_artisan_audit enable row level security;
revoke all on table public.rba_essentials_artisan_audit from anon,authenticated;
grant select,insert on table public.rba_essentials_artisan_audit to service_role;

create or replace function public.rba_essentials_artisan_capture_audit()
returns trigger
language plpgsql security invoker set search_path = ''
as $$
begin
  insert into public.rba_essentials_artisan_audit(trial_id, operation, operator_id, snapshot)
  values (new.id, TG_OP, new.updated_by, to_jsonb(new));
  return new;
end
$$;
drop trigger if exists rba_essentials_artisan_audit_trigger on public.rba_essentials_artisan_trials;
create trigger rba_essentials_artisan_audit_trigger
after insert or update on public.rba_essentials_artisan_trials
for each row execute function public.rba_essentials_artisan_capture_audit();
revoke all on function public.rba_essentials_artisan_capture_audit() from public,anon,authenticated;
grant execute on function public.rba_essentials_artisan_capture_audit() to service_role;
comment on table public.rba_essentials_artisan_trials is
 'Private pre-commercial artist development records. approved_for_internal_review does not enable Stripe Checkout or Meta Commerce.';
