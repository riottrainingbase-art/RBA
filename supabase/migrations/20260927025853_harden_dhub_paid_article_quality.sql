
do $$ begin
  if not exists (
    select 1 from pg_constraint where conname='dhub_paid_articles_minimum_depth_check'
  ) then
    alter table public.dhub_paid_articles
      add constraint dhub_paid_articles_minimum_depth_check
      check (
        not published
        or (
          jsonb_array_length(sections) >= 3
          and char_length(trim(field_action)) >= 10
          and coalesce(array_length(reflection_questions,1),0) >= 3
        )
      );
  end if;
end $$;

create or replace view public.dhub_paid_article_quality as
select
  program_type,slug,title,published,
  jsonb_array_length(sections) as section_count,
  coalesce(array_length(reflection_questions,1),0) as reflection_count,
  jsonb_array_length(source_references) as reference_count,
  char_length(field_action) as action_length,
  updated_at
from public.dhub_paid_articles;

