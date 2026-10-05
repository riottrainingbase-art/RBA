
create or replace function public.touch_public_journal_updated_at()
returns trigger language plpgsql security invoker set search_path=public as $$
begin
  new.updated_at=now();
  return new;
end;
$$;
revoke all on function public.touch_public_journal_updated_at() from public;
drop trigger if exists trg_touch_public_journal_updated_at on public.public_journal_posts;
create trigger trg_touch_public_journal_updated_at
before update on public.public_journal_posts
for each row execute function public.touch_public_journal_updated_at();

