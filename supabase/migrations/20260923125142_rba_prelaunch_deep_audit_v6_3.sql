
insert into public.go_live_checks
(check_key,category,severity,title,description,status,automated,owner_role,evidence)
values
('static_login_not_preview','routing','critical','公開ログインがプレビューUIではない',
 '4言語login.htmlは現在data-preview-authで実送信しない。既存MY HOME COURT認証へ接続またはリダイレクト必須。',
 'fail',false,'admin',
 '{"affected_pages":4,"preview_auth":true,"production_auth_target":"*/my-homecourt/login"}'::jsonb),

('manifest_paths_valid','routing','medium','Web App Manifest参照が正しい',
 'manifest.jsonは絶対パス /manifest.json を使用し、各サブルート配下へ誤解決させない。',
 'fail',false,'admin',
 '{"broken_relative_manifest_references":67}'::jsonb),

('transaction_pages_noindex','routing','medium','取引完了ページを検索インデックスから除外',
 'payment-complete等の状態ページはnoindexを推奨。個別決済状態URLを検索結果へ露出させない。',
 'warning',false,'admin',
 '{"payment_complete_pages_without_noindex":4}'::jsonb),

('locale_copy_clean','routing','medium','4言語の文言混在がない',
 '繁体字ページに韓国語など別言語の混入がないこと。',
 'fail',false,'admin',
 '{"zh_tw_my_homecourt_hangul_leak":"기준"}'::jsonb),

('registration_api_abuse_controls','security','high','公開申込APIに濫用対策がある',
 '公開POST /api/registrations は認証不要のため、レート制限・Bot対策・Origin検証等を追加して大量投稿を抑止する。',
 'fail',false,'admin',
 '{"current_controls":["field_validation","consent"],"missing":["rate_limit","bot_protection","strict_origin_check"]}'::jsonb),

('commerce_schema_single_source','commerce','critical','Commerceデータモデルが一系統',
 'V4 Next.jsが前提とするrba_registrations/rba_payment_events系と現行program_applications/platform_orders系を二重運用しない。',
 'fail',false,'admin',
 '{"current_live_model":"program_applications/payment_routes/platform_orders/transaction_ledger","v4_patch_model":"rba_registrations/rba_payment_events/rba_offer_inventory","v4_tables_present":false}'::jsonb)
on conflict(check_key) do update set
status=excluded.status,evidence=excluded.evidence,description=excluded.description,updated_at=now();

