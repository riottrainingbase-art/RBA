# RIZEHOPE写真素材｜9点の掲載候補と公開ゲート

基点: `492b6f4ca96b19a27194fd674f83663220d646ad` / 対象: RIZEHOPE JAPAN 2027 日英紹介ページ

## 作業結果

提供10ファイルのうち重複1件を除き、WebP 9点を準備した。画像の公開先は `public/media/rizehope-2027/`。対応メタデータは `lib/rizehope-2027.ts` の `gallery` に候補として記述。

**写真のバイナリはGitHubにまだ登録していない。** 入力写真は現在のチャット内で最適化し、別途ユーザーへZIPとして渡した。GitHubの現コネクタ経由ではローカルJPEG/WebPファイルを直接送信できないため、ZIP内のWebPをサイトの画像フォルダへ配置する工程が必要。

## 公開禁止ゲート（全候補 false）

- 撮影イベント名・撮影年月日・場所の確定（2027年2月の大会実施写真と誤認させない）
- 撮影者・権利者からRBA公式サイト掲載と加工の許可取得
- 写る未成年者の肖像利用同意・チームからの必要な確認
- クレジットを本当の権利者表記に更新
- 全画像のGitHub実ファイル存在・デコード・本番QA・スマホQA確認

上記の証拠がそろうまで `usageRightsConfirmed:false`、`childrensPhotoConsentConfirmed:false` を維持する。`approvedRizehopeGallery()` により表示されない状態が正しい。**承認は人による検証後に別のコミットで実施。**

## 候補画像

1. `01-rizehope-banner.webp` — RIZEHOPEのロゴが掲げられた体育館の大型バナー
2. `02-sideline-audience.webp` — 照明演出のある体育館で試合を見守る選手・関係者
3. `03-team-huddle.webp` — 試合前に円陣を組むジュニアバスケットボールチーム
4. `04-court-gathering.webp` — 体育館のコートに集まった複数のジュニアチーム
5. `05-orange-team-energy.webp` — 赤系ユニフォームを着たジュニア選手たちの演出シーン
6. `06-court-high-five.webp` — コートでハイタッチを交わすジュニア選手とスタッフ
7. `07-team-talk.webp` — 青緑色の照明のもと集まる白いユニフォームのチーム
8. `08-friendship-moment.webp` — コート上で笑顔を見せるジュニアバスケットボール選手たち
9. `09-team-celebration.webp` — 演出照明の下で並ぶジュニア選手たち

## 対象外

代表紹介PR #482、既存決済・Jotform、HOMECOURT、Productionデプロイ、ドメイン変更には手を加えない。
