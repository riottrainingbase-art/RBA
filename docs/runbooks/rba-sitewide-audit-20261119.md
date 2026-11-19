# RBA公式サイト全体監査｜2026-11-19

対象リポジトリ: `riottrainingbase-art/RBA` / リリース基点: `492b6f4ca96b19a27194fd674f83663220d646ad`
対象環境: 正式Vercelプロジェクト `prj_ToviFjFURKMeQe7Gci5K4XLAfwAE` / `team_UwGou6ao1Pluwbd6S0e3GYND`。
**本PRは検索導線と回帰検査の限定修正。Production公開、ドメイン、決済、他のPRには手を加えない。**

## 実地監査の区別

- GitHub Git Treeは **1480エントリ / 329個の `page.tsx` ルート** を列挙。これは構造的な存在確認であって、329ページすべての公開ブラウザ品質保証ではない。
- ソースを個別に調査: `app/sitemap.ts`、`app/robots.ts`、`app/layout.tsx`、`next.config.ts`、共通ナビ、トップ、RIZEHOPE、各国際ページ、代表、リンク集、問い合わせ、プログラム案内、キャンプ、MY HOME COURTの公開窓口、法人、協賛、サポーター、読む順番案内など。
- トップ、共通ナビ、RIZEHOPE、リンク集の **静的内部 href の実在** をGit Treeで比較して参照先欠落は確認されなかった。動的リンク・外部リンクの応答・フォーム送信・実決済の検証とは異なる。

## 改善を実施する範囲

1. 既存の日英RIZEHOPE専用URL2件を公開サイトマップへ明示追加。繁体字・韓国語のRIZEHOPE専用URLは存在しないため作らない（国際交流TOPからのリンク表示は別に維持）。
2. `/ja/reading-guide`、`/ja/supporters`、`/ja/my-homecourt/nationwide`、`/ja/my-homecourt/united`、`/ja/partners/brief`、`/ja/cancellation` を追加。いずれも実ルートとcanonicalをソース確認。
3. `/ja/links` は既存の `noindex` を尊重し、サイトマップへ強制追加しない。
4. Node標準のみで実行できるGitHub Actionsのサイトマップ・日英相互リンク・内部 href QAを作成。外部の秘密情報や実決済は利用しない。
5. `robots.ts` に認証/管理/個人用アプリのクロール除外を追加。これは検索向けの案内に過ぎず、認証/認可を代替しない。公開の紹介ページ・無料受付ページはブロックしない。

## 監査で確認した重要リスクと未実施の検証

| 領域 | 現状 | 今後の判断ゲート |
| --- | --- | --- |
| Production同期 | 公開READY `dpl_7cZN7Ri3LK8ZzfiRkWKgBZz2V3xx` は `3a0dfa3`、GitHub Releaseは `492b6f4`。未公開差分あり | 現行本番のページ/CI/追加差分を同一SHA Previewで再検査してから展開 |
| 代表紹介 | PR #482 は `b9696331`、現リリースに非統合 | モバイルブラウザQA、重複差分と肖像/経歴、Preview READY確認後のみ検討 |
| RIZEHOPE実写写真 | PR #501。使用権と未成年者掲載同意は代表から取得済みと確認。画像9点のバイナリがリポジトリ未登録 | 撮影イベント/年月日の確認、画像配置、各画像404/デコード/スマホ、クレジット確認で解除 |
| RIZEHOPE大会 | 2027年2月27–28日、会場予約/演出許可の案内あり | 参加海外チーム/公式主催/料金/試合条件の未確定事項を確定と表記しない |
| RIZEHOPE決済 | `lib/rizehope-2027.ts` の3トラックすべて `not-open` | 参加資格/料金/契約/返金条件/個別承認が完了するまで課金リンクは出さない |
| 沖縄キャンプ | 12月22–24日案内が存在。食事・宿泊条件や日帰りの情報も複数ルートにあり得る | 実際の施設と価格表、決済提供者の状態を確認して差分照合。現PRでは未変更 |
| リンク導線 | 主要4ファイルの静的内部リンクは解決 | 外部Jotform/LINE/note/Stripeの応答、セッション/戻り先と実機E2Eは未確認 |
| 4言語 | コアサイトは日/英/繁/韓、RIZEHOPE専用ページは日/英 | 各言語の自動翻訳/誤訳/実際のhreflang/canonical/http応答をPreviewで確認 |
| セキュリティ | CSP、frame-ancestors/X-Frame-Options、Referrer/Permissions headersを確認 | 認証・管理APIの認可、ログの個人情報マスキング、依存関係セキュリティ監査は別工程 |
| 事業情報 | 法人価格、note会員、協賛金額を複数画面で案内 | 実際の承諾・提供/価格と法的な表示の突合が必要。無断価格変更しない |

## 次期QAタスク（本PRには含まない）

- 主要導線ごとに320/375/390/430/768/1280pxでiOS Safari、Android Chrome、Desktopを確認。
- 404/500、リンクチェーン、画像/OGP、WCAGコントラスト/フォーカス、hreflang、構造化データの実レンダリング確認。
- 日本語/英語/繁体字中国語/韓国語の意味差、タイトル・description・フォーム案内の整合。
- 申込者データ・決済データは変更せず、Stripe/Jotform公式管理画面の料金・公開状態を読み取り確認。
- 当日予定/募集終了を正確に反映。古い募集ページを自動削除・リダイレクトせず、アーカイブと最新導線を個別に判断。

**本番承認条件:** GitHub QA success + 正規Vercelの同一SHA Preview READY + 実画面QA + 現行本番からの差分監査 + 明示的なProduction承認。

## 管理・会員画面の検索除外追加（11月19日）

17個の管理・会員・支払完了セグメントにNext.jsの `robots: { index: false, follow: false }` を継承させる専用レイアウトを追加し、Google等の検索対象から外す意図を実装。共通メタデータは `lib/private-page-seo.ts`、漏れは `tests/site-public-discovery.test.mjs` で検査。**robots/noindexはアクセス制御ではない**ため、認証・認可の有無は別途サーバ検査が必要。一般向け案内・無料申込・プラン紹介ページは検索対象を維持する。

## 実ページブラウザQAの追加

`tests/site-real-browser-smoke.test.mjs` を新設し、GitHub Actionsで実際のポータブル開発サーバを立ち上げ、11の公開ルートをChromium/WebKitの390px・1280pxで検査する。コンテナには `mcr.microsoft.com/playwright:v1.55.0-noble` を使用し、毎回APT数百個をインストールしない。HTTP 200、見出し、タイトル、リンク、水平はみ出し、RIZEHOPE受付セクションを確認。写真・代表紹介の一部ページはスクリーンショットもアップロード。**Vercelの正式Previewや本番URLの表示確認とは別であり、その代替ではない。** 公開サイトにアクセスするのではなくGitHub runner上のローカル開発サーバのみを利用し、課金・決済・Production変更を行わない。

## E2E初回失敗と原因切り分け

初回GitHub ActionsのブラウザE2Eはページ描画前にローカル起動失敗。`pnpm dev` が参照する `vite.config.ts` はGitHubの通常チェックアウトに存在しない `.openai/hosting.json` および `build/sites-vite-plugin` を必須としており、ホスト専用環境外で起動できない。これをブラウザ表示の不具合と混同しない。リポジトリに架空のホスティング設定を追加せず、E2E専用Workflowのみ `pnpm exec next dev --hostname 0.0.0.0 --port 5173` へ変更し、標準Next.jsレンダリングが可能か検証する。Next.js環境で成功してもVercel/本番ビルド成功と同一視しない。

## E2Eで実際に発見したWebKit 390px横はみ出し

Next.js開発サーバを立ち上げたE2EでChromiumは11ルート×390/1280pxすべて成功。WebKit 390pxの英語トップ `/` で document scrollWidth 922px / viewport 390px の横はみ出しを検出。診断による主因はCSS grid内で874pxの固有幅が残った代表写真 `<img>` であり、`components/founder-profile.css` の `min-width:0`、`max-width:100%` およびモバイル `grid-template-columns:minmax(0,1fr)` で修正。代表紹介PR #482側にも同一CSS修正を独立適用。**この行は修正コードの記録であり、再実行の全ブラウザ成功を意味しない。**
