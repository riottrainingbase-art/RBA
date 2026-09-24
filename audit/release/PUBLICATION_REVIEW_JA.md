# V6 公開差分・残作業

状態: 公開前。SMTP設定はユーザーの希望により後で実施。本番への昇格は行っていない。

本番baseline: `638015f07d23d260f1004416e641740e5f42a29a`
Preview監査済みコミット: `fd8a48fe7a7748a3af9a398271e7ecd2d4eddd4c`
Preview deployment: `dpl_4U8g3dKzvWP6qrGhzZVdnHUVwDpA`
Rollback deployment: `dpl_FHWvoShxQHDzcxJgR14WbtNaRefJ`

## この追加監査で修正した問題

決済ルートで `constructor`、`__proto__` 等が通常のオブジェクト継承プロパティに一致する問題を修正。商品一覧自身の登録キーに限定する。25ケースのテストで、未知の商品は404・登録済み19商品は既存の宛先に303となることを確認。外部決済リクエストは送信していない。TypeScriptと変更ファイルlintも通過。

この修正はローカル変更であり、上記Previewにはまだ含まれない。Preview再反映・再検証が必要。

## API・認証・決済・DB・SEOの変更

- API: 既存決済リンクへの内部リダイレクトを追加。公開HTMLへの直接Stripeリンク埋込みを除去。
- 認証: 既存Supabaseを維持。callbackの遷移先検証、ローカライズされたログイン、登録導線と日本語表現を改善。実メール認証の成功は未確認。
- 決済: 既存の19 legacy決済リンクを維持。第二の決済システムは作成していない。
- DB: management control-plane viewのsecurity_invoker設定と権限を修正したmigrationを追加。
- SEO: canonical/hreflang、sitemap、ログインと決済完了のnoindexを改善。

## 公開までの必須確認・未解決事項

- SMTP保存・RBAメールテンプレート適用・新規登録と既存会員の実メール受信→callback→会員画面到達。
- PLAYER/PARENT/COACHの実アカウントによるデータ分離と権限確認。
- スマホでの主要導線・フォーム・ナビの操作検証。デスクトップのルート監査をスマホ監査の代わりにしない。
- Stripe webhookと二重処理防止のE2E確認。
- Legacy payment linksのイベント開催状況・capacity管理を確認。内部リダイレクトは在庫検証機能を追加するものではない。未確定のcapacityを推測しない。
- safeguarding primary officer、governance documents、organization standardsの承認。
- leaked password protection設定の扱い。
- Resendプランの送信上限とSupabaseメールrate limitの公開規模に対する適合性。
- 未使用のVercel Marketplace Resendリソースと広い権限のキーの整理。
- Preview再検証後PR→main merge→Production build→公開後監査。PR番号・Production commit/deploymentは未確定。

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
