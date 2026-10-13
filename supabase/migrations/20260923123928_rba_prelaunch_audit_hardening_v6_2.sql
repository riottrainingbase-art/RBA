
create index if not exists global_exchange_programs_event_idx
on public.global_exchange_programs(event_id);
create index if not exists global_partnership_agreements_owner_idx
on public.global_partnership_agreements(owner_user_id);
create index if not exists impact_snapshots_business_unit_idx
on public.impact_snapshots(business_unit_id);
create index if not exists impact_snapshots_metric_idx
on public.impact_snapshots(metric_id);
create index if not exists operations_exceptions_offer_idx
on public.operations_exceptions(service_offer_id);
create index if not exists operations_exceptions_user_idx
on public.operations_exceptions(user_id);
create index if not exists research_projects_partner_idx
on public.research_projects(partner_id);
create index if not exists safeguarding_officers_user_idx
on public.safeguarding_officers(user_id);

insert into public.go_live_checks(check_key,category,severity,title,description,status,automated,owner_role,evidence)
values
('frontend_source_connected','routing','critical','本番フロントソースへ書込可能','GitHub/Vercelの本番ソースを安全に更新できる接続が必要','blocked',false,'admin','{"github_installations":0,"visible_repositories":0}'::jsonb),
('frontend_patch_buildable','routing','critical','V4パッチがビルド可能','型・パス・依存テーブルを含めて本番Next.jsでビルド成功が必要','fail',false,'admin','{"issue":"payments pages omit required locale prop and generate wrong definitive-content path"}'::jsonb),
('frontend_no_direct_checkout_links','commerce','critical','V4公開ページに直決済リンクがない','Stripe Payment Linkを公開HTMLから直接露出せず、申込/ゲートウェイ経由に統一','fail',false,'admin','{"book_stripe_links_found":44,"external_application_form_links_found":20}'::jsonb),
('frontend_login_routes_consistent','routing','high','ログイン導線が既存認証ルートと一致','V4は /login 系を参照するが現本番認証は /my-homecourt/login 系','fail',false,'admin','{"missing_login_paths":["/login","/ja/login","/zh-tw/login","/ko/login"]}'::jsonb)
on conflict(check_key) do update set
status=excluded.status,evidence=excluded.evidence,updated_at=now();

update public.go_live_checks
set status='pass',
    last_checked_at=now(),
    evidence='{"vercel_runtime_errors_24h":0,"latest_production_state":"READY","exception_monitoring":"active"}'::jsonb,
    updated_at=now()
where check_key='runtime_observability_ready';

