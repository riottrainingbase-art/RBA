-- Coach practice loop: connect D-HUB learning to real coaching and reflection.
create table if not exists public.coach_practice_reflections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id uuid references public.dhub_lessons(id) on delete set null,
  practice_date date not null default current_date,
  team_context text,
  age_group text,
  learning_question text not null,
  planned_constraint text,
  observation text,
  player_response text,
  coach_reflection text,
  next_change text,
  visibility text not null default 'private' check (visibility in ('private','anonymized_for_learning')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists coach_practice_reflections_user_idx on public.coach_practice_reflections(user_id,practice_date desc);
alter table public.coach_practice_reflections enable row level security;
create policy "coach owns reflection select" on public.coach_practice_reflections for select using (auth.uid()=user_id);
create policy "coach owns reflection insert" on public.coach_practice_reflections for insert with check (auth.uid()=user_id);
create policy "coach owns reflection update" on public.coach_practice_reflections for update using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "coach owns reflection delete" on public.coach_practice_reflections for delete using (auth.uid()=user_id);
comment on column public.coach_practice_reflections.visibility is 'anonymized_for_learning is an opt-in flag only; it does not itself publish or expose the record.';
