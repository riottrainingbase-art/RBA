# V6 公開前監査（2026-09-24）

状態: Preview。メール設定・実メール試験はユーザー指示により保留。main merge・Production昇格なし。
本番baseline: `638015f07d23d260f1004416e641740e5f42a29a`
直近READY Preview: `dpl_61ZpuduraCjw6W1DiNu9j1ZMx7mP`（コミット `e46d1f3c929449c6c946b9778bb7270adac69410`）
Rollback: `dpl_FHWvoShxQHDzcxJgR14WbtNaRefJ`
最新候補はVercelでREADY。Productionはbaseline deploymentのまま変更していない。

## 修正と検証

- profiles/guardian_linksのRLS相互参照で発生した42P17再帰エラーを修正。migrationを本番DBへ適用済み。既存private.is_global_adminを再利用し、公開権限を広げていない。
- 認証IDを持たないauthenticated接続はprofiles/guardian_links/team_memberships/subscriptionsの閲覧0件。既存player/coachのSQLロール試験では自身のプロフィール1件のみ。すべてrollbackし、個人データを変更していない。
- 会員フォームでawait後にReact currentTargetが無効になる問題を修正。データ取得失敗を初期設定画面と誤認しないよう再試行画面を追加。
- 初期設定の重複roleを更新しないようignoreDuplicatesを指定。役割保存後にプロフィール完了を記録。既存承認状態を保持し、0行更新・通信失敗を画面に表示。6ケースの非通信テストと重複roleの実DB rollback試験通過。
- legacy決済の11件は既存gatewayの確認済みofferに対応。未対応8件は問い合わせへ。gateway拒否時のStripe直リンクfallbackはない。23ケース通過（実決済なし）。未知キー・継承プロパティは404。
- 実稼働の3 Edge Functionsを回収し保存。Webhook・gateway・payment-ops自体の本番再デプロイはしていない。
- 日本語問い合わせ文を改善。会員ステータスの無料/有料表記を4言語でRBA ID/RBA HOMECOURTに統一。
- ローカルproduction build成功、typecheck成功。アプリlint成功（回収したDeno Edge Functionsは対象外）。
- 公開161ルートHTTP200、抽出185内部リンクの対象範囲に404なし、HTML内の直接Stripeリンクなし。詳細はhttp-local.json。APIと会員アプリはローカル環境変数がないため別枠。
- 会員導線12表示ケース・96ローカライズリンク通過。サーバーレンダー試験であり、実ログインではない。
- Previewブラウザで日本語D-HUB→問い合わせ遷移と決済ページ表示を確認。D-HUBにRBA独自プログラム・FIBA/WABC非公認を明記。
- Vercel直近1時間のruntime error照会は0件。全ユーザー操作のエラーゼロを保証するものではない。
- Preview全161件のAPI取得はDeployment ProtectionのSSO転送等で大半が判定不能。アプリの404/500と混同しない。全件Preview合格とは扱わない。

## 公開ゲート・未解決

- 実アカウントによるPLAYER/PARENT/COACH操作とデータ分離。現在parentプロフィールがないため親子実フロー未検証。
- スマホ実機での表示・フォーム・メニュー操作。デスクトップ確認は代替にならない。
- Stripe test-modeで支払い→Webhook→会員反映の署名付きE2E。並行claim・失敗再試行・通知重複排除はDB transactionで確認済みだが、接続中Stripeはlive accountのみのため実課金試験は行わない。
- capacity未設定イベントは既存gatewayで拒否。開催状況・8 legacy routeの正規対応を運営が確定するまで直接決済しない。
- safeguarding責任者、governance documents、organization standards承認。推測して設定しない。
- leaked password protection無効。運用方針と有効化確認が必要。
- メール関連は保留: SMTP、RBA送信元・テンプレート、実受信→callback→会員画面、送信上限、未使用メールリソース整理。
- 全公開ゲート通過後にPR→main merge→Production build→本番4言語/会員/決済/SEO再監査。現在PR・公開後監査は未実施。

## 変更分類

API: 決済内部routeを既存gatewayへ集約。
Auth: 既存Supabase session維持。初期設定の保存順序とエラー表示を修正。メールは未実施。
Commerce: 別決済システムなし、未確認routeは問い合わせへ。
DB: control-plane view修正に加えprofiles/guardian_links再帰解消。
SEO: canonical/hreflang/sitemap、login/payment-complete noindexの既存候補変更を維持。


## 2026-09-24 追加監査

- 既存gatewayの決済に付く `rba_platform` イベントを稼働Webhookが未処理のまま返していた問題を修正。実在しない委譲処理を削除し、通常の注文・台帳・参加・通知処理へ接続した。
- Stripeイベントに10分leaseの原子的claimを追加。同一イベントの並行処理を拒否し、失敗イベントだけ再試行可能。処理tokenを持つ実行だけが完了・失敗を記録する。
- 決済通知と照合actionにdedupe keyを追加。再試行で同じ通知が重複しない。DB transaction試験で並行claim拒否、失敗再試行、通知・action重複排除を確認し、試験データはrollback済み。
- `stripe-homecourt-webhook` version 11を稼働環境へ反映。署名検証を処理前に維持し、JWT検証なしはStripe webhook受信用の既存設定を維持。
- PARENTの実プロフィールがないため、既存coach/player IDをtransaction内だけparent/childとして構成。親は本人と確認済みの子どもの計2件だけ閲覧し、guardian linkは自分の1件だけ閲覧できることを確認。全変更rollback済み。
- capacity確保関数の旧列名 `participations.user_id` を現行の `player_user_id` へ修正。席確保、同一利用者の再試行、満員時waitlist、capacity未設定時fail closedをtransaction/rollbackで確認。
- Supabase advisorのRLS auth.uid再評価4件と未index FK2件を修正。残るsecurity警告はservice-only 3表のpolicyなし（RLSにより公開roleは全拒否）、意図したjoin_team RPC、パスワード漏洩保護無効。
- MY HOME COURTの英語・繁体字・韓国語から無料/有料会員を前面に出す表現を除去し、日本語と同じDISCOVER / CONNECT / CHALLENGEの体験設計に統一。
- 全体metadataへmanifestを追加し、install iconをmanifestに追加。

## 新規ページ

- `app/camp/page.tsx`
- `app/faq/page.tsx`
- `app/international/page.tsx`
- `app/ja/camp/page.tsx`
- `app/ja/faq/page.tsx`
- `app/ja/international/page.tsx`
- `app/ja/network/page.tsx`
- `app/ja/opportunities/page.tsx`
- `app/ja/platform/page.tsx`
- `app/ja/regional-host/page.tsx`
- `app/ja/sponsor/page.tsx`
- `app/ja/team/page.tsx`
- `app/ja/verified/page.tsx`
- `app/ko/camp/page.tsx`
- `app/ko/faq/page.tsx`
- `app/ko/international/page.tsx`
- `app/ko/network/page.tsx`
- `app/ko/opportunities/page.tsx`
- `app/ko/platform/page.tsx`
- `app/ko/regional-host/page.tsx`
- `app/ko/sponsor/page.tsx`
- `app/ko/team/page.tsx`
- `app/ko/verified/page.tsx`
- `app/network/page.tsx`
- `app/opportunities/page.tsx`
- `app/platform/page.tsx`
- `app/regional-host/page.tsx`
- `app/sponsor/page.tsx`
- `app/team/page.tsx`
- `app/verified/page.tsx`
- `app/zh-tw/camp/page.tsx`
- `app/zh-tw/faq/page.tsx`
- `app/zh-tw/international/page.tsx`
- `app/zh-tw/network/page.tsx`
- `app/zh-tw/opportunities/page.tsx`
- `app/zh-tw/platform/page.tsx`
- `app/zh-tw/regional-host/page.tsx`
- `app/zh-tw/sponsor/page.tsx`
- `app/zh-tw/team/page.tsx`
- `app/zh-tw/verified/page.tsx`

## 修正ページ

- `app/about/page.tsx`
- `app/contact/page.tsx`
- `app/d-hub/page.tsx`
- `app/ja/about/page.tsx`
- `app/ja/contact/page.tsx`
- `app/ja/d-hub/page.tsx`
- `app/ja/my-homecourt/app/[[...section]]/page.tsx`
- `app/ja/my-homecourt/login/page.tsx`
- `app/ja/organizer/page.tsx`
- `app/ja/page.tsx`
- `app/ja/payment-complete/page.tsx`
- `app/ja/policies/page.tsx`
- `app/journal/kobe-development-camp-2026/page.tsx`
- `app/ko/about/page.tsx`
- `app/ko/contact/page.tsx`
- `app/ko/d-hub/page.tsx`
- `app/ko/my-homecourt/app/[[...section]]/page.tsx`
- `app/ko/my-homecourt/login/page.tsx`
- `app/ko/organizer/page.tsx`
- `app/ko/page.tsx`
- `app/ko/payment-complete/page.tsx`
- `app/ko/policies/page.tsx`
- `app/my-homecourt/login/page.tsx`
- `app/organizer/page.tsx`
- `app/page.tsx`
- `app/payment-complete/page.tsx`
- `app/policies/page.tsx`
- `app/zh-tw/about/page.tsx`
- `app/zh-tw/contact/page.tsx`
- `app/zh-tw/d-hub/page.tsx`
- `app/zh-tw/my-homecourt/login/page.tsx`
- `app/zh-tw/organizer/page.tsx`
- `app/zh-tw/page.tsx`
- `app/zh-tw/payment-complete/page.tsx`
- `app/zh-tw/policies/page.tsx`

## 削除ページ

なし


## 2026-09-24 Preview・本番健全性再監査

- 最新Preview `dpl_61ZpuduraCjw6W1DiNu9j1ZMx7mP` はREADY。対象commitは `e46d1f3c929449c6c946b9778bb7270adac69410`。
- Vercel保護を正規の一時共有URLで通したread-onlyブラウザ監査で、`/`、`/ja`、`/zh-tw`、`/ko`、`/ja/my-homecourt`、`/ja/my-homecourt/login`、`/ja/my-homecourt/app`、`/ja/payments`、`/ja/schedule`、`/ja/contact`、`/ja/policies`、`/robots.txt`、`/sitemap.xml`、manifestの全14対象が表示成功。フォーム送信・メール送信・登録・決済は行っていない。
- 未認証の `/ja/my-homecourt/app` はlocalized loginへ転送。generic `/login` は404で、会員導線から使用していない。
- 監査アクセス後の最新Preview runtime logは200が32件、307が2件、runtime errorは0件。
- Productionは `dpl_FHWvoShxQHDzcxJgR14WbtNaRefJ` のまま。naked/www、4言語、JA login、JA payments、robots、sitemapのread-only健全性監査で可視404/500なし。現在のProductionを変更していない。
- Supabase最新advisorではRLS initplanとmissing FK indexの警告は解消済み。service-only 3表のpolicyなしはRLSによる公開role全拒否、join_team RPCは認証済み会員の意図した導線。leaked password protectionは未解決。
- `stripe_webhook_events` は0件。署名付き実Webhookはまだ到着していないため、live chargeを使った確認は実施しない。
- モバイル実機監査は未完了。追加ブラウザセッションがDeployment Protectionで遮断されたため、推測で合格扱いにしない。
