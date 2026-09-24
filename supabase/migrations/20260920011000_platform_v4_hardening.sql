drop policy if exists offers_public_read on public.service_offers;
create policy offers_anon_read on public.service_offers for select to anon
using (publication_status = 'published');
create policy offers_authenticated_read on public.service_offers for select to authenticated
using (
  publication_status = 'published'
  or created_by = (select auth.uid())
  or (provider_entity_id is not null and private.is_entity_manager(provider_entity_id))
  or private.is_global_admin()
);


create index if not exists platform_audit_logs_actor_idx on public.platform_audit_logs(actor_user_id);
create index if not exists platform_orders_buyer_entity_idx on public.platform_orders(buyer_entity_id);
create index if not exists safety_reports_entity_idx on public.safety_reports(entity_id);
create index if not exists safety_reports_subject_idx on public.safety_reports(subject_user_id);
create index if not exists service_offers_created_by_idx on public.service_offers(created_by);
create index if not exists transaction_ledger_entity_idx on public.transaction_ledger(entity_id);
create index if not exists user_blocks_blocked_idx on public.user_blocks(blocked_user_id);
