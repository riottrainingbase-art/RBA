# [Preview checkpoint] RBA National Clinic Network / 2026-10-25

Feature PR #226: `d12f23a976e3357ba32fcbf175db7d0bde0b02d0` を preview-rba に統合。

## 公開範囲
- /ja/national-clinic-tour：全国の成人地域ホスト・チーム開催相談を受け付ける公式ページ
- /ja/clinic-request：日本語の主催者用受付は既存 Jotform 262648437888073 へ統一
- /ja/team-visit-clinic：初回無料相談→見積・書面合意→必要決済（Stripe先払い公開CTAは削除）
- /ja/instagram：地域ホスト募集への案内
- ホーム日本語：地域合同・継続開催の誘導
- QA: audit/national-clinic-funnel/check.mjs, GitHub TypeScript, ESLint, 日本語・会員機能回帰
- docs/national-clinic-network-operator-20261025.md：開催→次回契約への運営SOP

## リリース前に必ず確認
1. ビルド READY、表示・公式ドメイン6ページのリンクとコピーを読み戻す
2. Jotform 262648437888073 の説明・希望開催頻度3項目・未成年者情報注意を再確認
3. 全国47都道府県での開催「決定」と誤表記されないこと
4. 最初の問い合わせ・初回見積は無料。フォーム送信で決済しない
5. TEAM TAKEOVER の公開リンクから「支払ってから日程相談」を除去したこと
6. 多言語の既存共通問合せは継続して動作すること
7. 新規メール一斉送信・閲覧/決済実績の虚偽表示を行わない

### 公開後運営
次の開催営業は、既存統合 Sheet の `Clinic_開催営業パイプライン` と `Clinic_52週開催枠` を正本として手動照合する。自動データ連携・予約確定や販売促進メールは本リリースに含めない。
