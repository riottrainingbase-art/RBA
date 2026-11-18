# RBA公式サイト｜モバイル表示の公開ゲート

## 目的
2026-11-18にiPhoneのInstagramアプリ内ブラウザから報告された、RBAトップのCTA（「開催予定を見る」「自分に合う入口」）が背景と同化する問題の再発防止。英語・日本語・他言語ページにも共通する「見た目が崩れたまま公開しない」原則を定着させる。

## 問題から分かったこと
- CSSの計算上の文字色・背景色が適切でも、WebKitの実描画で文字が見えない事例があった
- スクリーンショットを生成するだけで見なければ、誤検出を発見できない
- CSS末尾の強い色指定（!important）が、意図したデザインを覆した
- Vercel READYのSHAがGitHubの修正コミットと一致しない場合、GitHubでマージ済みでも本番へは反映されない

## 必須チェック（変更PRごと）
1. 320 / 375 / 390 / 430 / 768 / 1280pxで **Chromium と WebKit** の両方を使用
2. 文字は最低4.5:1のコントラスト。計算値だけでなく **PNGの実画素** から背景の明るさと描画された文字色を検査
3. CTA背景は原則 **不透明** とし、暗い抽象背景の上に透明なリンクを置かない
4. iOSの \`-webkit-text-fill-color\`、訪問済みリンク、hover、focus、子要素の色も検査
5. 最小タップ高さ44px、原則54px、リンク領域全体が押せること
6. ヘッダーとお知らせ帯の改行・欠け・横スクロールを検査
7. スクリーンショットアーティファクトをレビューし、不自然な折り返し・白抜け・重なりがないか確認
8. 変更に販売・契約・決済が含まれない場合は、既存の決済設定を触らない

### 自動テスト
- \`node --test tests/homepage-cta-contrast.test.mjs\`
- \`RBA_PLAYWRIGHT_PATH=<installed playwright>/index.mjs RBA_PNGJS_PATH=<installed pngjs> node tests/homepage-browser-contrast.test.mjs\`
- GitHub Actions: \`.github/workflows/rba-homepage-contrast-qa.yml\`
- GitHub Actions: \`.github/workflows/rba-mobile-browser-qa.yml\`

## 本番公開時
1. 対象GitHubブランチ、PR番号、審査済みヘッドSHA、GitHub Actions成功を確認
2. **Vercelの正式なRBAプロジェクト** \`prj_ToviFjFURKMeQe7Gci5K4XLAfwAE\` を選択
3. Vercel 402デプロイ制限があるときは、二重実行・有料アップグレード・別プロジェクトへの切替でごまかさない
4. 新しい本番デプロイの \`READY\` およびソースGit SHAと対象修正の包含を確認
5. 公式ドメイン \`https://riotbasketballacademy.com/ja/\` をシークレット／新規タブで開く
6. iPhone SafariおよびInstagramアプリ内ブラウザの双方でCTAとお知らせ帯を確認
7. テキスト・リンク・タップ領域を操作確認し、実機でも問題なければ初めて「本番修正完了」と報告

## 障害時
- 公開ができない場合、GitHub修正済みと本番未反映を明確に分けて報告
- 画像やコードから未検証の効果を断定しない
- 回復不能な表示崩れなら、Vercelで直前の正常READYへのロールバックを検討（承認と影響確認が必要）

※この文書自体はデプロイの自動実行をしない。