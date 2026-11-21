# RBA STORE / COLLECTION 001 — 販売を今すぐ開始するための最終設定・承認表
**監査日:** 2026-11-20 JST  
**対象:** WHITE TEE / BLACK SETUP  
**状態:** 有料販売 **NO-GO**（決済停止を維持。機能改修・非課金の購入希望受付は実施可能）

## 1. 確定済み商品条件
| 項目 | WHITE TEE | BLACK SETUP |
| --- | --- | --- |
| 国内売価 | 税込 **¥6,600** | 税込 **¥19,800** |
| 国内送料 | FIRST DROP **¥0**（RBA負担。購入者への送料請求はしない方針） | 同左 |
| 原反・ボディ | United Athle **4252-01**、7.1oz 綿100% | 上：**5763-01** / 下：**5765-01**、12.0oz 裏起毛 綿75%・ポリ25% |
| 商品写真 | 2026-11-20支給CGの掲載許可。**実物写真ではない** | 同左（**5765-01のパンツ裾は画像のワイドストレートと異なる**） |
| サイズ | TEEはS/M/L/XLの想定。**加工後の実寸・対応可否未承認** | 上S〜XXL・下M〜XLの参照。**最終組合せ/実寸未承認** |

確認: この仕様は発注・販売価格に関する社内決定であり、製造先の納品能力・契約や品質検査の完了を意味しない。

## 2. 2026-11-20に実施した安全な設定
- 本番Vercelの `RBA_ESSENTIALS_TEE_PRICE_JPY` を旧 **4900** → **6600** に修正（本番／プレビュー対象）。`RBA_ESSENTIALS_PREORDER_ENABLED` は **false のまま**。
- Shopifyは試用プラン・USD。WHITE TEEとBLACK SETUPの商品画像・説明をCGである旨付きで **DRAFT** 登録済み。価格をUSD数字に「6600」「19800」と書き換えていない（誤請求防止）。
- Stripe RBA live: WHITE TEE税込6,600円の価格オブジェクトは存在（`active:false`）、旧4,900円価格も無効。Payment Linksは意図的に両方無効。
- Jotform `263193283498065` の旧価格4,900円表記を6,600円に訂正。フォームは**購入希望の受付のみ**で契約・決済はしない。
- PR #458: 商品仕様、詳細価格、商品イメージ4点の追加内容は下書きブランチに実装。PR未マージ／本番未デプロイ。
- Vercelのstagingビルドはプロジェクトの `scripts/vercel-ignore-build.mjs` により **preview-rba以外のブランチをスキップ**する仕様でキャンセル。別途プレビュー統合が必要。

## 3. 有料開始前の必須条件（該当する証拠を集め、実際に確認した人が署名）
| Gate | 未確認の証拠 | 終了条件 |
| --- | --- | --- |
| 01 販売事業者 | 法的販売者の氏名・住所・通話可能な電話番号・サイト上の責任者 | 特商法ページを実際の情報で完成、開示方針承認 |
| 02 製造委託 | りさ様／メーカーとの正式な発注・検品・配送・返金／個人情報取扱責任 | 合意書に双方署名、価格・運賃・納期を確定 |
| 03 商品QA | 正式ロゴ版下・ワッペン、完成サンプル、メーカー品番、洗濯表示、各サイズ実寸 | CGとの差を明示し、販売可能な組合せを限定 |
| 04 返品・引渡 | 売主責任での取消／不良対応・未着対応、注文締切、具体的な発送・到着期限 | 特商法・注文最終確認画面、買主通知に同じ条件を掲載 |
| 05 注文処理 | Stripe署名Webhook、Supabase ledger/fulfillment agent、Resend差出ドメイン | テスト決済→台帳→製造→出荷→通知→返金試験に合格 |
| 06 本番公開 | PR #458 QA/デプロイと有料停止での回帰テスト | 実URLで確認し、承認された条件だけを有料化 |
| 07 税務 | 税込価格としての請求表示、適格請求書発行者か、振込／決済手数料 | 販売主体の税理士または担当者が確認 |
| 08 Shopify | trial / USD のままではShopifyネイティブ購入を開放できない | 利用するなら契約プランとJPY価格・配送・支払いを別途整備。Stripe独自販売と二重課金しない |

## 4. 最短の実行順
1. RBAが販売者情報と「1ヶ月以内に発送またはお届け」のどちらかを確約できる日程・在庫／生産数を証拠付きで確認。
2. りさ様と実務担当者の契約・発注フロー・実物検品・個人情報取扱・返品交換窓口を確定。
3. 先行販売の支払・撤回・引渡し・返品表示を完成し、購入確認画面と受領通知をテスト。
4. サイトのstagingを `preview-rba` の既定の許可ルートで、安全にQA（本番スイッチfalse）。既存サイトの公開状態を乱さない。
5. 署名Webhook・試験注文・注文台帳・発送通知を検証し、RBA本人の発売承認後にStripeとサイトの販売を同時に開く。

## 出典
- 消費者庁 特定商取引法ガイド「通信販売」 https://www.no-trouble.caa.go.jp/what/mailorder/
- 消費者庁「通信販売の最終確認画面」 https://www.caa.go.jp/notice/assets/consumer_transaction_cms203_240315_02.pdf
- ローカル実装 docs/RBA_STORE_ORDER_FULFILLMENT_SYSTEM_20261117.md
- この書類は法的助言や署名済み契約書ではない。実在の氏名・住所・電話番号を入力せずGitHubに掲載しない。


---

## 2026-11-21 追補：決済コード修正・RBA管理方式・本番切替手順

この節は過去のPR #458中心の説明に対する**最新の差分**です。歴史的な記録を消さず、現在の実装は **PR #519** を基準とします。**有料販売はまだNO-GO**。

### 今回修正・検証できた内容
- Supabase本番の注文台帳で、フーディー `XXL` を受け付け、パンツ `S` を拒否する CHECK制約へ変更。変更前の注文0件を確認した上で、実際の制約をread-back。マイグレーション `20261121113401_rba_essentials_checkout_size_integrity_20261121.sql`。
- 決済完了画面 `/ja/essentials/complete` は、**Stripe入金成功**と**注文台帳への反映成功**を分けて表示。入金済み・台帳未反映なら再度の決済を促さない。
- RBA運営者限定 `/ja/essentials/manage/reconciliation` を追加。RBA名義Stripe直近100セッションから、支払済みかつアパレル関連のものだけを抽出し、台帳・製造タスクと照合。**読取専用**。Stripeに100件を超える履歴がある場合、画面に部分照合である旨を表示。
- 購入ボタンの二重クリック抑止、適用販売条件への同意、実額・税込・送料・返品特約・配送期限の最終表示。寄附金控除と誤認させる必須チェックは廃止。
- RBA管理者本人が、決済・注文・製造依頼・発送確認・顧客応対を担う。りささんのHOMECOURTアカウント・Stripeアカウントは**不要**。委託先が実物の製造・検品・発送を受託する。
- 公式サイトの新Checkoutには `https://riotbasketballacademy.com/api/commerce/essentials-preorder-webhook` **だけ**をStripe側の必須Webhookとする。旧Hosted Payment Linksは引き続き無効で、使わない決済リンク専用Webhookを有料開始の条件としない。

### 本番セットアップ（販売前に確認すべき順番）

**1. Vercelの商用環境**
- 現在、公式サイトドメインはHobby所属プロジェクト `rba_site_v11_portal_ready` にあります。商用運用可能なPro環境への移管またはHobbyチームの正式Pro契約を、ユーザー本人が管理画面で決定。既存ドメイン・環境変数・サブシステムを壊さないリリース計画を確認。
- PR #519の最新コミットでNext.js/TypeScriptのビルド、375px・768px・1440px表示、商品詳細、法定表示、注文画面、管理者のみの注文/照合/製造ページのアクセスを検証。
- 直近、Vercelは `402 api-deployments-free-per-day` 制限を返したため、新しいコミットのREADYは未検証です。古いプレビューのREADYを最新の根拠として使わない。

**2. 暗号化・サーバー限定環境変数（値や秘密鍵はPR/チャットへ貼り付けない）**
- `STRIPE_SECRET_KEY`：**RBAのStripeアカウント `acct_1UGdxZRXDnnSs6XN` 専用**の本番秘密鍵。顧客/他事業用アカウントやテストキーを混ぜない。
- `SUPABASE_SERVICE_ROLE_KEY`：Supabase `ctngdzzorhzpdxswahzl` のサービスキー。クライアント公開不可、他事業と共有しない権限管理。
- `RBA_ESSENTIALS_STRIPE_WEBHOOK_SECRET`：次項のRBA STORE専用署名シークレット。
- `RBA_ESSENTIALS_RESEND_API_KEY`：送信元ドメインを検証した通知専用メールAPIキー。
- `RBA_ESSENTIALS_NOTICE_FROM`：確認済み `RBA STORE <...@riotbasketballacademy.com>` 形式。
- `RBA_ESSENTIALS_NOTICE_REPLY_TO`：RBAが実際に確認する事業用返信先。
- `RBA_ESSENTIALS_NOTICE_SENDER_VERIFIED`、`RBA_ESSENTIALS_NOTICE_ENABLED`：送信元ドメインと受信テスト成功後のみtrue。
- `RBA_ESSENTIALS_RBA_OPERATOR_USER_ID`、`RBA_ESSENTIALS_RBA_OPERATOR_EMAIL`、`RBA_ESSENTIALS_RBA_OPERATOR_ACCOUNT_VERIFIED`、`RBA_ESSENTIALS_FULFILLMENT_MODE=rba_managed` は既存の本人照合結果とRBA管理方針に従って設定。**外部の製作担当ログインは任意**。
- `RBA_ESSENTIALS_RBA_SUPPLIER_HANDOFF_VERIFIED` は実際に注文番号・SKU・サイズ・数量・納期を送り、委託先が安全な経路で受理したテスト記録がある場合のみtrue。

**3. Stripe公式サイト専用Webhook**
- RBAアカウントのStripe Dashboard → Developers → Webhooksで宛先 `https://riotbasketballacademy.com/api/commerce/essentials-preorder-webhook` を作成。
- 通知対象は `checkout.session.completed` と `checkout.session.async_payment_succeeded`。署名を検証し、`metadata.program=rba_essentials_presale` の有料Stripeセッションだけ処理する。
- Stripe側で署名シークレットを安全に取得し、Vercelの `RBA_ESSENTIALS_STRIPE_WEBHOOK_SECRET` に暗号化保存。値をメールやGitHubに記載しない。
- 本番ルートが実際に公開されてからWebhookを有効化。**署名付きイベントを送って注文台帳へ反映されるまで有料受付をONにしない**。
- RBA STORE以外のイベントはこのルートが無視することを検証。他のHOMECOURT / 沖縄決済のWebhookに影響を与えない。
- 旧Stripe Payment Linksは停止状態を維持。復活させる場合は別途サイズ・価格・契約・専用通知の検証が必要。

**4. 法定販売条件・在庫／履行**
- `RBA_ESSENTIALS_SELLER_NAME` / `_ADDRESS` / `_PHONE` / `_EMAIL` は実在し購入者へ表示する情報を本人が承認する。Stripeアカウント表示名だけでは法的販売者情報にならない。
- `RBA_ESSENTIALS_ORDER_BY` / `_DISPATCH_BY` / `_DELIVER_BY` は具体的な日付（JST、YYYY-MM-DD）。注文期限≦発送期限≦お届け期限で、サイトが規定する最終引渡期限を現実に履行できることを証跡で確認。
- `RBA_ESSENTIALS_CANCELLATION_TERMS` / `_RETURN_TERMS` / `_PRESALE_NOTE` / `_TERMS_VERSION`、 `RBA_ESSENTIALS_TAX_BEHAVIOR=inclusive` を正式な消費者向け文言で承認する。
- 見本完成・洗濯表示・加工後実寸・色・対応サイズ・注文可能数量・正式RBAロゴ版下・返品や破損時の製造先責任の記録が必要。
- `RBA_ESSENTIALS_PREORDER_ENABLED` は、**全てのゲートが証拠と実機テストで確認された最後だけ**trueへ変更。単なる代表の承認や既存の「りささんOK」報告だけで他のフラグをまとめてtrueにしない。

### 本番移行直前の受入テスト
1. 閉鎖状態：未ログイン管理画面が404、決済フォームのPOSTが423（適切なOrigin付き）、旧Payment Linksが無効。
2. Stripe：RBAアカウントの識別子・公開名・ドメイン・明細名が正しい。別アカウントキーでは決済を作れない。
3. 署名Webhook：無署名・別署名・別番組を拒否／無視、成功取引を1件の台帳と1件の製造タスクへ反映。
4. サイズ・金額：TEE S〜XL、HOODIE S〜XXL、PANTS M〜XL、金額6,600/19,800円、送料0円、税区分を画面/Stripe/台帳で一致させる。
5. 同じStripe Checkoutイベントを2回送っても、注文・製造タスク・承諾通知は増えない。
6. 成功ページは「入金済み・受注台帳登録済み」と「入金済み・受注照合中」を正しく区別する。
7. `/ja/essentials/manage/reconciliation` が未登録入金・製造タスク欠落を検出し、自動返金・再請求しない。
8. 発送追跡番号、発送日、委託先の受理、顧客通知の送信元と到達を実際にテスト。委託先へStripe・顧客の決済情報を渡さない。
9. Vercelの正式商用ホスティングで、スマートフォン購入画面・返品/法定条件・公式ロゴを確認してから公開。


---

## 2026-11-21 実装：Stripe WHITE TEEの既定価格と停止中の決済リンクを再構築

- **RBA本番Stripeアカウント**：`acct_1UGdxZRXDnnSs6XN`。確認時点では `charges_enabled=true`、`payouts_enabled=true`、公開事業者名は Riot Basketball Academy、事業URLは `https://riotbasketballacademy.com/`、カード明細表示は RIOT BASKETBALL。
- WHITE TEE 商品 `prod_VdhVeR8cgnzE6d` に **¥6,600・税込（税内包）** の新価格 `price_1UeCqERXDnnSs6XN2re7INMd` を作成。商品 `default_price` へ設定し、Stripe API read-back で一致を確認。旧¥4,900価格は使わない。
- WHITE TEE用の新しいPayment Link `plink_1UeCrqRXDnnSs6XNf9mnO2Te` を用意。**active=false** の状態をread-back確認。税込¥6,600、数量1〜3、サイズS/M/L/XL、国内配送先と電話番号・確認欄に対応。
- BLACK SETUP既存リンク `plink_1UcRBHRXDnnSs6XNoHlBdpSQ` は **active=false** のまま。税込¥19,800、上S/M/L/XL/XXL・下M/L/XLの別サイズ、国内配送先と電話番号・確認欄を再検証。
- 古いTEE用Payment Linkは現在も無効。新しいリンクと過去のリンクを**並行公開しない**。
- Stripeの商品説明は販売価格を確定事実、CG/完成品・加工後実寸・引渡期限・返品条件を区別する表現へ修正済み。
- 元のStripe Price `price_1UcioHRXDnnSs6XNEIYDMnJe` は「取得ではactive:true、商品既定価格への設定でarchivedと応答」の不整合があったため、**新価格の作成と既定価格への設定で解消**した。旧価格の再利用は行わない。

### Hosted Payment Linkと公式サイトの受注を区別する
1. 公式サイトStripe Checkout：`metadata.program=rba_essentials_presale`。署名Webhook `/api/commerce/essentials-preorder-webhook` から注文台帳へ反映。
2. StripeネイティブPayment Link：`metadata.program=rba_essentials_first_drop`。署名Webhook `/api/commerce/essentials-payment-link-webhook` から台帳へ反映。
3. Payment LinkのWebhookは新TEEのリンクID・価格IDだけを使用し、SETUPリンクは現行正規IDに限定。旧リンク・旧4,900円価格からの新規受注を許容しない。
4. **Payment Linkは、実際に承認された `terms_state=approved`、`retail_terms_version`、`dispatch_by`、`deliver_by` をStripe側メタデータに設定するまで有効化しない。** Webhookもこれらを検証し、仮の発送・お届け期限を生成しない。
5. Link向けの `RBA_ESSENTIALS_PAYMENT_LINK_WEBHOOK_SECRET` とVercel側のRBA専用Stripe/Supabaseサーバー秘密鍵、Webhook送信先の稼働確認が済むまでは、Stripeへ入金だけ発生させない。
6. どちらか1つの決済導線に統一して公開。購入者・製造担当に別々の決済リンクを重複案内しない。
7. 誤って有料決済が発生し、リンク側の正式条件を検証できない場合、Webhookは受注完了を偽らず `manual_reconciliation_required` を返す。RBAはStripe実取引と顧客対応・返金可否を原本確認する。

**現在のStripe Payment Linkは2本ともinactive。作成・価格設定だけでは代金を受け取っていない。**
