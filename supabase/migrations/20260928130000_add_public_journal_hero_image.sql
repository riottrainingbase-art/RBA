alter table public.public_journal_posts
  add column if not exists hero_image_url text,
  add column if not exists hero_image_alt text;
