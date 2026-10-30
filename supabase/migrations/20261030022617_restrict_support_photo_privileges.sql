revoke all on public.rba_support_photo_editors from anon,authenticated;
grant select on public.rba_support_photo_editors to authenticated;
revoke all on public.rba_support_photos from anon,authenticated;
grant select on public.rba_support_photos to anon,authenticated;
grant insert,update on public.rba_support_photos to authenticated;
