
update public.go_live_checks set
  title='V6 Final Candidateを本番Next.jsでビルド確認',
  status='blocked',
  description='V6は第二Commerce実装を完全除去し、静的コード監査済み。本番Next.jsソースへの接続後にinstall/lint/typecheck/buildを実行する。',
  evidence='{"artifact":"RBA_WORLDCLASS_NEXTJS_PATCH_V6_FINAL_CANDIDATE_20260924.zip","page_routes":68,"definitive_html":84,"direct_stripe_links":0,"external_form_links":0,"generic_login_links":0,"second_commerce_files":0,"api_files":0,"db_files":0,"d_hub_routes":4,"reason_blocked":"github installation 0"}'::jsonb,
  updated_at=now()
where check_key='frontend_patch_buildable';

update public.go_live_checks set
  status='pass',
  title='V6公開ページに直決済/外部申込リンクがない',
  evidence='{"direct_stripe_links":0,"direct_external_application_forms":0,"artifact":"V6 Final Candidate"}'::jsonb,
  updated_at=now()
where check_key='frontend_no_direct_checkout_links';

update public.go_live_checks set
  status='pass',
  description='V6では第二Commerce用SQL/Stripe helper/registration/checkout componentsをパッケージから物理削除。現行本番Commerceのみを維持。',
  evidence='{"second_commerce_files":0,"api_files":0,"db_files":0,"live_source_of_truth":"program_applications/payment_routes/platform_orders/transaction_ledger"}'::jsonb,
  updated_at=now()
where check_key='commerce_schema_single_source';

