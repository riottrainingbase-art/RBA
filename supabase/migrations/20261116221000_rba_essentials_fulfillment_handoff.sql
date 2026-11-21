-- Apparel paid order production handoff with least privilege.
-- Does not grant access to any individual, including the proposed production partner, by default.
-- Requires a verified authenticated account and written data-processing mandate before granting a member.
create table if not exists public.rba_essentials_fulfillment_agents (
  user_id uuid primary key references auth.users(id) on delete cascade,
  active boolean not null default false,
  access_role text not null default 'production' check(access_role in ('production')),
  granted_by uuid not null references auth.users(id),
  granted_at timestamptz not null default now(),
  terms_reference text not null check (char_length(terms_reference) between 6 and 160)
);
alter table public.rba_essentials_fulfillment_agents enable row level security;
revoke all on public.rba_essentials_fulfillment_agents from anon, authenticated;
grant select,insert,update,delete on public.rba_essentials_fulfillment_agents to service_role;

create table if not exists public.rba_essentials_fulfillment_tasks (
  order_id uuid primary key references public.rba_essentials_orders(order_id) on delete restrict,
  stage text not null default 'awaiting_handoff'
    check(stage in('awaiting_handoff','accepted_by_production','materials_ready','making','quality_check','packed','shipped','delivered','problem')),
  tracking_reference text check (char_length(tracking_reference)<=140),
  carrier text check (char_length(carrier)<=80),
  dispatch_date date,
  issue_note text not null default '' check(char_length(issue_note)<=1200),
  updated_at timestamptz not null default now(),
  updated_by uuid,
  constraint tracking_only_after_shipping check (
    tracking_reference is null or stage in('shipped','delivered','problem')
  ),
  constraint shipped_requires_tracking check (
    stage not in('shipped','delivered') or
    (tracking_reference is not null and char_length(trim(tracking_reference))>=5
     and dispatch_date is not null)
  )
);
alter table public.rba_essentials_fulfillment_tasks enable row level security;
revoke all on public.rba_essentials_fulfillment_tasks from anon, authenticated;
grant select,insert,update on public.rba_essentials_fulfillment_tasks to service_role;
create index if not exists rba_essentials_fulfillment_tasks_stage_idx
  on public.rba_essentials_fulfillment_tasks(stage,updated_at asc);

create table if not exists public.rba_essentials_fulfillment_log (
  id bigint generated always as identity primary key,
  order_id uuid not null references public.rba_essentials_orders(order_id),
  actor_id uuid,
  stage text not null,
  snapshot jsonb not null,
  recorded_at timestamptz not null default now()
);
alter table public.rba_essentials_fulfillment_log enable row level security;
revoke all on public.rba_essentials_fulfillment_log from anon, authenticated;
grant select,insert on public.rba_essentials_fulfillment_log to service_role;
create index if not exists rba_essentials_fulfillment_log_order_idx
  on public.rba_essentials_fulfillment_log(order_id,recorded_at desc);

create or replace function public.rba_essentials_enqueue_fulfillment()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  insert into public.rba_essentials_fulfillment_tasks(order_id,stage)
    values(new.order_id,'awaiting_handoff') on conflict(order_id) do nothing;
  return new;
end
$$;
drop trigger if exists rba_essentials_fulfillment_insert_trg on public.rba_essentials_orders;
create trigger rba_essentials_fulfillment_insert_trg
  after insert on public.rba_essentials_orders
  for each row execute function public.rba_essentials_enqueue_fulfillment();

create or replace function public.rba_essentials_capture_fulfillment_log()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  insert into public.rba_essentials_fulfillment_log(order_id,actor_id,stage,snapshot)
    values(new.order_id,new.updated_by,new.stage,to_jsonb(new));
  return new;
end
$$;
drop trigger if exists rba_essentials_fulfillment_audit_trg on public.rba_essentials_fulfillment_tasks;
create trigger rba_essentials_fulfillment_audit_trg
  after insert or update on public.rba_essentials_fulfillment_tasks
  for each row execute function public.rba_essentials_capture_fulfillment_log();

revoke all on function public.rba_essentials_enqueue_fulfillment() from public,anon,authenticated;
revoke all on function public.rba_essentials_capture_fulfillment_log() from public,anon,authenticated;
grant execute on function public.rba_essentials_enqueue_fulfillment() to service_role;
grant execute on function public.rba_essentials_capture_fulfillment_log() to service_role;

-- Existing orders that predate migration are associated with a production ticket if any.
insert into public.rba_essentials_fulfillment_tasks(order_id)
select order_id from public.rba_essentials_orders
on conflict(order_id) do nothing;

comment on table public.rba_essentials_fulfillment_agents is
  'No default users. Operator Risa may only be invited after identity confirmation and signed processing agreement.';
comment on table public.rba_essentials_fulfillment_tasks is
  'Private paid-order manufacturing status; no customer address/phone; Stripe remains shipping-address source of truth.';
