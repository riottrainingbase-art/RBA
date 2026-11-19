# RBA GitHub オープンPR全件台帳｜2026-11-19 スナップショット

更新時点：RBAリポジトリで取得した公開PR一覧。**PRの存在は本番実装の証拠ではない**。PRタイトルによる仮分類であり、レビュー結果・結合可否・外部契約の成立を保証しない。

オープンPR合計 **84件**。分類内訳：決済・返金 7件／その他 18件／集客・教育 14件／国際交流 10件／申込・安全 8件／表示・品質 2件／会員・学習基盤 12件／企業・販売 5件／地域・GREAM 8件。

## 個別重要な依存関係
- #494（note/集客）は mainベース、#499（本番系への安全移植）は release ベース。両方を無条件にマージするとUIを上書きする可能性あり。
- #481/#442：沖縄キャンプの追加プランの申込・決済に重複。料金・会場・Stripe webhook・予約確定・返金を単一ソースで照合。
- #491/#466/#495：RBA UNITED/海外アテンド/前金・申込に重複。販売価格、契約、スポンサー許諾、移動/宿泊手配が確定するまで決済公開を保留。
- #482/#463：代表紹介・全体デザインを同時に本番へ入れる場合、モバイルCTA/ロゴ/写真使用許諾をまとめてQA。
- MY HOME COURT #484/#486/#488/#466：RBA ID・権限・個人の育成履歴・有料会員の境界が競合し得る。

## 統合判断前の確認ルール
1. P0：契約・金額・申込期限・二重請求・参加者情報のリスクあり。UIの存在だけで公開可能としない。
2. P1：本番体験・案内・会員情報に影響。基準リリースと差分統合し、スマホ・ブラウザーで確認。
3. P2：デザイン、記事、商品提案の整理。既存の公開ページと重複を避けて段階化。
4. 『完了』の表現は（コード→QA→プレビュー→本番URL→実操作テスト）の5段階を区別。
5. ステータス欄は **未統合** とだけ表示。個別PRのCI検査、契約、ユーザー実操作は原則「未検証」。

| PR | 優先 | 領域 | タイトル | Draft | ベース | 最終更新(UTC) | 確認状況 |
|---|---|---|---|---|---|---|---|
| [#499](https://github.com/riottrainingbase-art/RBA/pull/499) | P0 | 決済・返金 | RBA本番系統合①｜note応援・7日間無料ガイド・クリニック任意サポート／決済変更なし | はい | `release/instagram-conversion-hub-20261117` | 2026-11-19T08:50 | **未統合・本番未確認** |
| [#495](https://github.com/riottrainingbase-art/RBA/pull/495) | P2 | その他 | Launch RBA Global Services proposal funnel: overseas teams, academy advisory & coach education | いいえ | `release/instagram-conversion-hub-20261117` | 2026-11-19T08:41 | **未統合・本番未確認** |
| [#494](https://github.com/riottrainingbase-art/RBA/pull/494) | P1 | 集客・教育 | RBA note 月500円・1,000円｜実証型マーケティング導線・30日集客キット | はい | `main` | 2026-11-19T08:34 | **未統合・本番未確認** |
| [#491](https://github.com/riottrainingbase-art/RBA/pull/491) | P1 | 国際交流 | RBA UNITED｜深圳U12男子・関東国際交流の事前登録案内を本番リリースブランチへ | いいえ | `release/instagram-conversion-hub-20261117` | 2026-11-19T02:01 | **未統合・本番未確認** |
| [#481](https://github.com/riottrainingbase-art/RBA/pull/481) | P0 | 決済・返金 | 沖縄ユース：1日・2日間・放課後の申込からStripe決済まで安全に接続 | いいえ | `main` | 2026-11-19T00:31 | **未統合・本番未確認** |
| [#489](https://github.com/riottrainingbase-art/RBA/pull/489) | P0 | 申込・安全 | RBA新規顧客獲得｜Instagram初回導線・Torsten受講CVR・計測安全性 | いいえ | `release/instagram-conversion-hub-20261117` | 2026-11-18T23:56 | **未統合・本番未確認** |
| [#482](https://github.com/riottrainingbase-art/RBA/pull/482) | P2 | 表示・品質 | RBA代表紹介の全面実装｜トップ・4言語経歴・指導理念・SEO | いいえ | `release/instagram-conversion-hub-20261117` | 2026-11-18T23:08 | **未統合・本番未確認** |
| [#488](https://github.com/riottrainingbase-art/RBA/pull/488) | P1 | 会員・学習基盤 | MY HOME COURT｜敗戦からの次の一歩を無料JOURNALとD-HUBへ接続 | はい | `release/instagram-conversion-hub-20261117` | 2026-11-18T22:57 | **未統合・本番未確認** |
| [#487](https://github.com/riottrainingbase-art/RBA/pull/487) | P0 | 申込・安全 | 全国募集｜RBA公式プリウス車両パートナー・協賛フォーム導線・安全条件 | はい | `main` | 2026-11-18T22:43 | **未統合・本番未確認** |
| [#484](https://github.com/riottrainingbase-art/RBA/pull/484) | P1 | 会員・学習基盤 | MY HOME COURT｜選手・保護者・指導者向け「最初の7歩」21実践ガイド | はい | `main` | 2026-11-18T16:24 | **未統合・本番未確認** |
| [#486](https://github.com/riottrainingbase-art/RBA/pull/486) | P1 | 会員・学習基盤 | RBA NEXT PLAY｜悩みから行動までつなぐMY HOME COURT市場適合改善 | はい | `release/instagram-conversion-hub-20261117` | 2026-11-18T16:24 | **未統合・本番未確認** |
| [#485](https://github.com/riottrainingbase-art/RBA/pull/485) | P2 | 企業・販売 | RBA企業向け90日パイロット｜協賛導線・契約/納品ゲート・成果報告 | はい | `main` | 2026-11-18T15:57 | **未統合・本番未確認** |
| [#483](https://github.com/riottrainingbase-art/RBA/pull/483) | P0 | 申込・安全 | 保護者の声を反映｜キャンプ・遠征の参加前案内、安全管理、運営ゲート改善 | はい | `main` | 2026-11-18T15:17 | **未統合・本番未確認** |
| [#476](https://github.com/riottrainingbase-art/RBA/pull/476) | P1 | 集客・教育 | fix(home): iPhone/Instagramで見えないボタンをピクセル検査済みの配色へ統一 | いいえ | `preview-rba` | 2026-11-18T02:17 | **未統合・本番未確認** |
| [#445](https://github.com/riottrainingbase-art/RBA/pull/445) | P2 | 企業・販売 | RBA GROWTH AWARDS｜参加者の成長申請・協賛LP新設 | いいえ | `main` | 2026-11-17T16:03 | **未統合・本番未確認** |
| [#469](https://github.com/riottrainingbase-art/RBA/pull/469) | P2 | その他 | Add an official RBA entry for RTB members | いいえ | `main` | 2026-11-17T15:55 | **未統合・本番未確認** |
| [#466](https://github.com/riottrainingbase-art/RBA/pull/466) | P0 | 決済・返金 | MY HOME COURT｜全クリニック・キャンプ申込ハブ＋神戸U14前金50％決済連携 | はい | `main` | 2026-11-17T10:22 | **未統合・本番未確認** |
| [#458](https://github.com/riottrainingbase-art/RBA/pull/458) | P2 | 企業・販売 | RBA STORE ／ COLLECTION 001・受注通知・製作発送フロー（販売停止のまま実装） | はい | `main` | 2026-11-17T09:37 | **未統合・本番未確認** |
| [#465](https://github.com/riottrainingbase-art/RBA/pull/465) | P0 | 申込・安全 | fix(沖縄キャンプ): 12/22の未承認・午前受付を予定表から削除 | はい | `main` | 2026-11-17T07:22 | **未統合・本番未確認** |
| [#463](https://github.com/riottrainingbase-art/RBA/pull/463) | P2 | その他 | RBA全体：日本語エディトリアル再設計・ラグジュアリーなブランド統一 | はい | `release/instagram-conversion-hub-20261117` | 2026-11-16T23:53 | **未統合・本番未確認** |
| [#459](https://github.com/riottrainingbase-art/RBA/pull/459) | P2 | その他 | 2027年1〜3月のRBAクリニック仮日程を掲載 | いいえ | `main` | 2026-11-16T12:28 | **未統合・本番未確認** |
| [#442](https://github.com/riottrainingbase-art/RBA/pull/442) | P0 | 決済・返金 | 沖縄キャンプの放課後・1日参加に申込・決済ページを追加 | いいえ | `main` | 2026-11-15T09:15 | **未統合・本番未確認** |
| [#434](https://github.com/riottrainingbase-art/RBA/pull/434) | P1 | 会員・学習基盤 | D-HUB COACH LAB｜会員の希望テーマを募集する導線 | はい | `main` | 2026-11-13T01:40 | **未統合・本番未確認** |
| [#430](https://github.com/riottrainingbase-art/RBA/pull/430) | P2 | 企業・販売 | RBAアパレル｜既存の無料フォームを活用した商品検討・採算管理（発売前ガード維持） | はい | `main` | 2026-11-12T06:07 | **未統合・本番未確認** |
| [#424](https://github.com/riottrainingbase-art/RBA/pull/424) | P0 | 申込・安全 | MY HOMECOURT｜RBA MATCH実働試験・ENTRY安全照合を既存基盤に統合 | いいえ | `main` | 2026-11-11T17:14 | **未統合・本番未確認** |
| [#425](https://github.com/riottrainingbase-art/RBA/pull/425) | P2 | その他 | 日本語開催一覧に東京・八戸の開催調整状況を追加 | いいえ | `main` | 2026-11-11T17:14 | **未統合・本番未確認** |
| [#421](https://github.com/riottrainingbase-art/RBA/pull/421) | P1 | 集客・教育 | RBA JOURNALに世界のユースバスケとコーチングコラムを追加 | いいえ | `main` | 2026-11-11T16:12 | **未統合・本番未確認** |
| [#416](https://github.com/riottrainingbase-art/RBA/pull/416) | P2 | その他 | 八戸ミニバスクリニックの開催案内ページ | はい | `main` | 2026-11-11T05:21 | **未統合・本番未確認** |
| [#415](https://github.com/riottrainingbase-art/RBA/pull/415) | P1 | 地域・GREAM | 沖縄11/14｜サン食品様の物品協賛ご提案と公式サイトを掲載 | はい | `main` | 2026-11-11T05:05 | **未統合・本番未確認** |
| [#408](https://github.com/riottrainingbase-art/RBA/pull/408) | P0 | 決済・返金 | fix: 11/14沖縄クリニック一覧の会場・決済表記を正規化 | はい | `main` | 2026-11-10T18:11 | **未統合・本番未確認** |
| [#407](https://github.com/riottrainingbase-art/RBA/pull/407) | P1 | 国際交流 | 沖縄国際ユースキャンプに英語の招待状の案内を追加 | いいえ | `main` | 2026-11-10T07:06 | **未統合・本番未確認** |
| [#406](https://github.com/riottrainingbase-art/RBA/pull/406) | P1 | 集客・教育 | Add coach Q&A and refine both Torsten clinic pages | いいえ | `main` | 2026-11-10T07:04 | **未統合・本番未確認** |
| [#405](https://github.com/riottrainingbase-art/RBA/pull/405) | P2 | その他 | 宮古・BiiLDactアカデミーをRBA日本語トップと地域紹介に掲載 | いいえ | `main` | 2026-11-10T02:18 | **未統合・本番未確認** |
| [#395](https://github.com/riottrainingbase-art/RBA/pull/395) | P2 | その他 | 東京U12・U15クリニック｜2027年春の無料先行案内LPと開催希望導線 | いいえ | `main` | 2026-11-09T13:01 | **未統合・本番未確認** |
| [#394](https://github.com/riottrainingbase-art/RBA/pull/394) | P1 | 国際交流 | Make RBA International and Taiwan programmes easier to find | はい | `main` | 2026-11-09T11:52 | **未統合・本番未確認** |
| [#390](https://github.com/riottrainingbase-art/RBA/pull/390) | P1 | 地域・GREAM | 日本語トップを目的別4入口に整理し、Torsten・GREAM・参加導線を簡潔化 | いいえ | `main` | 2026-11-09T03:42 | **未統合・本番未確認** |
| [#376](https://github.com/riottrainingbase-art/RBA/pull/376) | P1 | 会員・学習基盤 | docs(D-HUB): 会員メールのブランド・文体・配信品質をv3へ統一 | はい | `main` | 2026-11-08T11:45 | **未統合・本番未確認** |
| [#368](https://github.com/riottrainingbase-art/RBA/pull/368) | P1 | 地域・GREAM | DSM GREAM秋田 男子U15の練習体験募集 | いいえ | `main` | 2026-11-07T08:10 | **未統合・本番未確認** |
| [#364](https://github.com/riottrainingbase-art/RBA/pull/364) | P1 | 国際交流 | Torsten Vol.2｜B.PREMIER現役HCを軸にアジア20市場の販売・共有導線を強化 | はい | `main` | 2026-11-06T23:48 | **未統合・本番未確認** |
| [#360](https://github.com/riottrainingbase-art/RBA/pull/360) | P0 | 申込・安全 | GREAM OKINAWA｜沖縄デザインの公式サイト再構築＋体験会先行申込・保護者フォーム | はい | `feat/gream-okinawa-multilingual-intake-20261105` | 2026-11-06T12:05 | **未統合・本番未確認** |
| [#357](https://github.com/riottrainingbase-art/RBA/pull/357) | P1 | 国際交流 | Release candidate: Okinawa camp refund clarity and safe Korean family routes | いいえ | `preview-rba` | 2026-11-06T08:51 | **未統合・本番未確認** |
| [#356](https://github.com/riottrainingbase-art/RBA/pull/356) | P1 | 国際交流 | Okinawa 2026: verified RBA refund terms, Korean pages and safe overseas entry | いいえ | `main` | 2026-11-06T08:49 | **未統合・本番未確認** |
| [#354](https://github.com/riottrainingbase-art/RBA/pull/354) | P1 | 国際交流 | Korea/Japan youth exchange hub, accurate camp CTAs and parent guidance | いいえ | `main` | 2026-11-06T06:27 | **未統合・本番未確認** |
| [#346](https://github.com/riottrainingbase-art/RBA/pull/346) | P1 | 地域・GREAM | GREAM OKINAWA｜U15ヘッドコーチ・アシスタント募集を明確化 | いいえ | `main` | 2026-11-06T04:34 | **未統合・本番未確認** |
| [#337](https://github.com/riottrainingbase-art/RBA/pull/337) | P1 | 地域・GREAM | GREAM OKINAWA｜多言語案内・参加相談・CTA計測（ビルド確認待ち） | はい | `main` | 2026-11-05T12:46 | **未統合・本番未確認** |
| [#327](https://github.com/riottrainingbase-art/RBA/pull/327) | P1 | 地域・GREAM | GREAM SENDAI U15｜練習動画2本・集合写真・オリジナルBGM（公開前準備） | はい | `main` | 2026-11-05T11:23 | **未統合・本番未確認** |
| [#319](https://github.com/riottrainingbase-art/RBA/pull/319) | P1 | 地域・GREAM | 11/14沖縄クリニック｜会場確保の表現を最終確認中に統一（公開前確認） | はい | `main` | 2026-11-05T00:01 | **未統合・本番未確認** |
| [#307](https://github.com/riottrainingbase-art/RBA/pull/307) | P0 | 申込・安全 | たつの育成キャンプ：募集名称統一・11/23会場不確定の明示・安全な参加導線 | いいえ | `main` | 2026-11-03T00:47 | **未統合・本番未確認** |
| [#278](https://github.com/riottrainingbase-art/RBA/pull/278) | P1 | 会員・学習基盤 | RBAメンバーシップ：既存支援者を保護した会員獲得・継続支援の実装仕様 | はい | `main` | 2026-10-30T08:56 | **未統合・本番未確認** |
| [#263](https://github.com/riottrainingbase-art/RBA/pull/263) | P2 | その他 | RTB SELECT: 靴用消臭スプレーの購入希望調査導線を準備 | はい | `main` | 2026-10-29T04:05 | **未統合・本番未確認** |
| [#261](https://github.com/riottrainingbase-art/RBA/pull/261) | P2 | その他 | 西尾優人プロフィールにMVP・SPARTANSテクニカルアドバイザーを追記 | いいえ | `main` | 2026-10-29T02:57 | **未統合・本番未確認** |
| [#260](https://github.com/riottrainingbase-art/RBA/pull/260) | P2 | その他 | たつのキャンプ：個人参加・通い参加のFAQを強化 | いいえ | `main` | 2026-10-29T02:00 | **未統合・本番未確認** |
| [#259](https://github.com/riottrainingbase-art/RBA/pull/259) | P1 | 集客・教育 | 沖縄キャンプ：保護者FAQとSNS共有表示を改善 | いいえ | `main` | 2026-10-29T01:51 | **未統合・本番未確認** |
| [#236](https://github.com/riottrainingbase-art/RBA/pull/236) | P2 | その他 | Add premium reusable regional clinic landing pages | はい | `main` | 2026-10-26T22:40 | **未統合・本番未確認** |
| [#228](https://github.com/riottrainingbase-art/RBA/pull/228) | P0 | 決済・返金 | 沖縄県民料金の日本円決済と仮予約台帳を追加 | いいえ | `main` | 2026-10-24T16:25 | **未統合・本番未確認** |
| [#219](https://github.com/riottrainingbase-art/RBA/pull/219) | P2 | その他 | BACKBONE 3×3｜ブランドページをエディトリアルに刷新 | はい | `main` | 2026-10-24T11:51 | **未統合・本番未確認** |
| [#212](https://github.com/riottrainingbase-art/RBA/pull/212) | P2 | その他 | Make RBA sponsorship enquiries project-specific | はい | `main` | 2026-10-23T15:31 | **未統合・本番未確認** |
| [#207](https://github.com/riottrainingbase-art/RBA/pull/207) | P1 | 会員・学習基盤 | Homepage clarity: remove prohibited affiliation claims and fix RBA ID CTAs | はい | `main` | 2026-10-23T01:28 | **未統合・本番未確認** |
| [#206](https://github.com/riottrainingbase-art/RBA/pull/206) | P1 | 会員・学習基盤 | Overseas clinic → RBA ID → MY HOME COURT: multilingual story onboarding | はい | `main` | 2026-10-23T01:05 | **未統合・本番未確認** |
| [#183](https://github.com/riottrainingbase-art/RBA/pull/183) | P1 | 地域・GREAM | 【公開保留】RBA沖縄 指導者・運営候補の事前面談ページ | はい | `main` | 2026-10-20T16:44 | **未統合・本番未確認** |
| [#182](https://github.com/riottrainingbase-art/RBA/pull/182) | P0 | 申込・安全 | RBA全国指導者向け無料特集とTorsten公式申込導線 | いいえ | `main` | 2026-10-20T10:28 | **未統合・本番未確認** |
| [#163](https://github.com/riottrainingbase-art/RBA/pull/163) | P1 | 集客・教育 | Torsten 11/25｜最新RBA本番を保持してQR付き告知画像を公開 | いいえ | `release/torsten-coach-funnel-20261014` | 2026-10-15T02:12 | **未統合・本番未確認** |
| [#162](https://github.com/riottrainingbase-art/RBA/pull/162) | P1 | 集客・教育 | 11/25 Torsten｜RBA共通QR画像（4:5 JPEG）・講習LP配布導線 | いいえ | `release/torsten-coach-funnel-20261014` | 2026-10-14T05:12 | **未統合・本番未確認** |
| [#157](https://github.com/riottrainingbase-art/RBA/pull/157) | P1 | 集客・教育 | Torsten 11/25｜本番コードを保持した全国集客LP・無料5問チェック | いいえ | `release/instagram-live-baseline-20261013` | 2026-10-14T05:06 | **未統合・本番未確認** |
| [#161](https://github.com/riottrainingbase-art/RBA/pull/161) | P1 | 集客・教育 | RBAトップページ｜トーステン講習・無料5問チェックを主要導線へ（最新本番から） | いいえ | `release/torsten-coach-funnel-20261014` | 2026-10-14T04:18 | **未統合・本番未確認** |
| [#160](https://github.com/riottrainingbase-art/RBA/pull/160) | P1 | 集客・教育 | Torsten 11/25｜RBA日本語トップに講習・無料チェックへの入口を追加 | いいえ | `release/torsten-coach-funnel-20261014` | 2026-10-14T04:14 | **未統合・本番未確認** |
| [#159](https://github.com/riottrainingbase-art/RBA/pull/159) | P1 | 集客・教育 | Torsten｜最新本番を保持したクリック計測・公式紹介素材 | いいえ | `release/torsten-coach-funnel-20261014` | 2026-10-14T03:27 | **未統合・本番未確認** |
| [#158](https://github.com/riottrainingbase-art/RBA/pull/158) | P1 | 集客・教育 | Torsten集客｜クリック計測と全国紹介キットの公開導線 | いいえ | `release/torsten-coach-funnel-20261014` | 2026-10-14T03:21 | **未統合・本番未確認** |
| [#154](https://github.com/riottrainingbase-art/RBA/pull/154) | P1 | 集客・教育 | Torsten 11/25｜全国の指導者向けLPを全面再設計 | いいえ | `main` | 2026-10-14T01:37 | **未統合・本番未確認** |
| [#133](https://github.com/riottrainingbase-art/RBA/pull/133) | P1 | 国際交流 | ASIA BRIDGES Taiwan: four-language landing pages, enquiry funnel and pilot governance | はい | `main` | 2026-10-12T10:26 | **未統合・本番未確認** |
| [#131](https://github.com/riottrainingbase-art/RBA/pull/131) | P1 | 集客・教育 | RBA BOOKS｜『ベンチは育成じゃない。』出版告知をHPとJOURNALに追加 | いいえ | `main` | 2026-10-10T02:34 | **未統合・本番未確認** |
| [#109](https://github.com/riottrainingbase-art/RBA/pull/109) | P2 | その他 | Redesign RBA operating model for founder independence and automation | はい | `main` | 2026-10-05T13:53 | **未統合・本番未確認** |
| [#108](https://github.com/riottrainingbase-art/RBA/pull/108) | P2 | 表示・品質 | RBAサイトの情報設計・日本語・導線を整理 | はい | `main` | 2026-10-05T04:46 | **未統合・本番未確認** |
| [#106](https://github.com/riottrainingbase-art/RBA/pull/106) | P2 | その他 | Make RBA Saga copy natural and easy to update | はい | `main` | 2026-10-04T18:29 | **未統合・本番未確認** |
| [#95](https://github.com/riottrainingbase-art/RBA/pull/95) | P2 | その他 | 日本語コピー全体見直し | いいえ | `main` | 2026-10-01T15:05 | **未統合・本番未確認** |
| [#87](https://github.com/riottrainingbase-art/RBA/pull/87) | P1 | 国際交流 | RBA UNITED：韓国・マレーシアの比較から先行エントリー・相談まで接続 | はい | `main` | 2026-09-30T13:03 | **未統合・本番未確認** |
| [#83](https://github.com/riottrainingbase-art/RBA/pull/83) | P1 | 国際交流 | Build RBA UNITED Malaysia / Incheon recruitment funnel | いいえ | `main` | 2026-09-30T09:44 | **未統合・本番未確認** |
| [#63](https://github.com/riottrainingbase-art/RBA/pull/63) | P2 | 企業・販売 | feat: add paid RBA U12 coaching guide store | いいえ | `main` | 2026-09-29T15:37 | **未統合・本番未確認** |
| [#62](https://github.com/riottrainingbase-art/RBA/pull/62) | P2 | その他 | Improve Japanese readability and homepage information density | いいえ | `main` | 2026-09-29T15:29 | **未統合・本番未確認** |
| [#53](https://github.com/riottrainingbase-art/RBA/pull/53) | P1 | 会員・学習基盤 | Finalize RBA platform architecture, HOMECOURT and TEAM DEVELOPMENT 90 | はい | `main` | 2026-09-28T02:24 | **未統合・本番未確認** |
| [#52](https://github.com/riottrainingbase-art/RBA/pull/52) | P1 | 会員・学習基盤 | Release HOMECOURT platform + TEAM DEVELOPMENT 90 | はい | `main` | 2026-09-27T23:59 | **未統合・本番未確認** |
| [#50](https://github.com/riottrainingbase-art/RBA/pull/50) | P1 | 会員・学習基盤 | Final integration: HOME COURT discovery and learning | はい | `main` | 2026-09-26T12:31 | **未統合・本番未確認** |
| [#28](https://github.com/riottrainingbase-art/RBA/pull/28) | P0 | 決済・返金 | Expand PLAYER library and unify HOMECOURT checkout | いいえ | `main` | 2026-09-24T23:36 | **未統合・本番未確認** |
| [#26](https://github.com/riottrainingbase-art/RBA/pull/26) | P1 | 会員・学習基盤 | Build open HOME COURT discovery and clinic participant onboarding | いいえ | `main` | 2026-09-24T17:51 | **未統合・本番未確認** |

## 保存後の作業
- 領域ごとにPRファイル差分の重複を照合し、採用版と破棄版を決める。
- 決済に触れない範囲の最小統合を先にPR #499として用意済み。CI成功、Preview・本番未実施。
- その次に参加者安全と決済・会員権限のE2Eを別PRで扱う。
