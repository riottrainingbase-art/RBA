
alter table public.public_journal_posts
  add constraint public_journal_posts_published_coach_refs_check
  check (
    not (
      published = true
      and (audience = 'coaches' or category = 'coaching')
    )
    or (
      jsonb_typeof(source_references) = 'array'
      and jsonb_array_length(source_references) > 0
    )
  );

