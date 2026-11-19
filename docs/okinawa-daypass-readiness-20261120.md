# RBA沖縄2026 日帰り・放課後／決済開始準備の確定状況（2026-11-20）

対象：2026-12-22〜24、糸満青少年の家。**本ファイルは本番決済公開の承認書ではない。**

## 今回の技術準備

- [x] Jotform無料希望登録 `263217090103041` は稼働（確認時点で送信0件）。
- [x] RBA本番Stripe `acct_1UGdxZRXDnnSs6XN` の専用Webhook `we_1UdJ4hRXDnnSs6XNH01Wk6t6` はenabledで、Supabase Edge Function `rba-okinawa-2026-day-pass-webhook` v2へ向けて、completed/async succeeded/async failed/expired/refund created/refund updatedを購読。
- [x] Supabase `public.okinawa_2026_day_pass_payments` はRLS有効・匿名読み取り不可、受付台帳は0件。
- [x] DBのCHECK制約を修正：`checkout_creating` を許可（2026-11-20 migration `okinawa_daypass_allow_checkout_creating_state_20261120`）。修正後の制約を読み戻して確認。
- [x] GitHub PR #481（`feature/okinawa-paid-registration-20261118`）には、個別保護者招待、送金前同意、日程別プラン、サーバー上の承認済み税込料金、Stripe Checkout、入金照合用Webhooks、支払い結果画面と期限切れ・二重決済防止のコードが含まれる。
- [x] Stripeテスト鍵を本番決済の秘密鍵と誤認しないための `sk_live_` / `rk_live_` 検査と `session.livemode` 確認を追加。
- [x] `scripts/check-okinawa-daypass-safety.mjs` を登録し、PRのGitHub Actions `RBA Preflight QA` に追加。

## 決済解禁を**禁止**している未解決条件

- [ ] 糸満青少年の家の**11月22日予約期限終了後**の体育館確定時間・施設許可の原文を確認。
- [ ] 日帰り／放課後の人数、車両台数、保護者・引率者、引渡しと安全スタッフ、追加変更申請を確定。
- [ ] 責任者が各プランの税込料金・含有サービス・返金条件を正式承認（下記料金は未承認の案）。枠数と既存3日間の参加者・宿泊者を照合し、追加販売可能な日別定員を決定。
- [ ] Stripe署名付きWebhookの**実結合試験**（成功・遅延成功・失敗・期限切れ・重複イベント・返金・照合）を安全に実施。
- [ ] Vercel本番の `STRIPE_SECRET_KEY`（RBA本番口座専用）と `SUPABASE_SERVICE_ROLE_KEY`（サーバーのみ）の登録。2026-11-20のプロジェクト変数一覧では未確認。
- [ ] `OKINAWA_2026_DAY_PASS_APPROVED_AMOUNTS_JPY`、`OKINAWA_2026_DAY_PASS_APPROVED_NEW_SLOTS_BY_DATE`、`OKINAWA_2026_DAY_PASS_TERMS_VERSION` は**正式承認後のみ設定**する。Vercel環境の現在値 `OKINAWA_2026_DAY_PASS_PAYMENTS_ENABLED=false` と `OKINAWA_2026_DAY_PASS_WEBHOOK_READY=false` を維持。
- [ ] `DEPLOYMENT.md` に従い、PRマージ前の静的QA、**1回だけのPreview checkpoint**、ブラウザ・iPhone確認、正規承認の上で本番プロモーション。
- [ ] 入金済み者・既存3日間の申込者に日帰りプランを重複請求しないことをオペレーターが個別確認。

## 参考料金案（**承認済みではない／顧客へ請求禁止**）

- 1日（12/22午後、12/23、12/24）：9,900円（税込・案）
- 2日（上記から対象2日）：18,000円（税込・案）
- 12/22または12/23放課後：4,400円（税込・案）
- 1日・2日・放課後に食事、宿泊、送迎は含まない。開始・終了時間は未確定。
- 既存の国内3日間通い27,500円／宿泊39,600円、県外通い30,250円／宿泊43,560円のStripe商品・URLは**変更しない**。

## 操作の最終工程（条件が揃った場合に限る）

1. 無料フォームで希望日と選手・保護者情報を収集し、Jotform submission IDを記録。複数選手・既入金の照合を行う。
2. 施設・料金・返金・スタッフ・日別定員・保護者同意が正式確定した一件だけ、運営専用JSONを使用して `scripts/okinawa-daypass-issue-invite.mjs` から個別招待URLを発行。
3. **保護者が自分でチェック項目に同意し、専用ページからRBA Stripe Checkoutに進む。** 無招待ユーザーは課金されない。
4. 署名付きWebhookの`paid`を確認し、参加者・既入金・安全手順を再照合した後に個別の参加最終案内を送る。
5. 画面閲覧・Jotform送信・Checkout開始だけを「決済済み」「確定枠」として扱わない。未承認の2日18,000円公開リンクは使用禁止。

**未承認状態では売上・残席・「半分埋まっている」を事実として表示しない。**
