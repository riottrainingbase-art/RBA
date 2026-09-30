-- Partner beta application and review workflow.
create table if not exists public.development_partner_applications (
  id uuid primary key default gen_random_uuid(),
  submitted_by uuid not null references auth.users(id) on delete restrict,
  organization_name text not null,
  organization_type text,
  region text,
  age_groups text[] not null default '{}',
  contact_name text not null,
  contact_email text not null,
  website_url text,
  current_activity text not null,
  collaboration_goal text not null,
  safeguarding_summary text,
  principles_acknowledged boolean not null default false,
  status text not null default 'submitted' check (status in ('submitted','reviewing','needs_information','accepted_beta','declined','withdrawn')),
  reviewer_id uuid references auth.users(id) on delete set null,
  review_note text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists development_partner_applications_status_idx on public.development_partner_applications(status,created_at desc);
alter table public.development_partner_applications enable row level security;
create policy "applicant reads own partner application" on public.development_partner_applications for select using (auth.uid()=submitted_by);
create policy "applicant creates own partner application" on public.development_partner_applications for insert with check (auth.uid()=submitted_by and principles_acknowledged=true);
create policy "applicant withdraws own pending application" on public.development_partner_applications for update using (auth.uid()=submitted_by and status in ('submitted','needs_information')) with check (auth.uid()=submitted_by and status in ('submitted','needs_information','withdrawn'));
comment on table public.development_partner_applications is 'Beta intake only. Acceptance does not certify coaching quality or safeguarding.';
