# BASTET × RBA 鹿児島クリニック 2026-11-29
## 受付・決済
公式ページ: https://riotbasketballacademy.com/ja/events/kagoshima-clinic-2026-11-29
会場: 錦江湾高校体育館。小・中・高校生男女。
午前9:30–12:00 3,000円、午後13:00–15:30 3,000円、通し4,000円。
RBA Stripe本番 acct_1UGdxZRXDnnSs6XN。1決済1名、数量変更不可。
決済時に参加者名・ふりがな、学年・性別、保護者名・電話・メール、保護者同意を収集。
受付データの正本はStripe Checkout Session。支払状態paidを確認する。画面遷移やURLパラメータを入金証明にしない。
## 決済リンク
am: plink_1UUifcRXDnnSs6XNB6OrbFGE https://book.stripe.com/4gM8wR2XZ27a9eR0JV7EQ1a
pm: plink_1UUifdRXDnnSs6XNoHf6nRQ8 https://book.stripe.com/4gMfZjcyz6nq3Ux64f7EQ1b
full: plink_1UUifeRXDnnSs6XN6vCUtpmV https://book.stripe.com/00waEZdCDeTW1Mpakv7EQ1c
## 日々の運営
Stripeの各Payment LinkからCheckout Sessionsを確認。支払済みだけを確定名簿とし、pending/failed/expiredを混ぜない。
既存メール・DMの名簿と参加者名・保護者連絡先・参加枠で照合し重複決済を確認。
主催者への個人情報共有は事前確認を取る。今回外部へのメール送信・名簿転送は実施していない。
集合・持ち物・駐車場は決済後に運営が個別案内。自動案内メール・主催者通知は未実装。完了画面に保存・問い合わせを表示。
定員は資料に記載がないため数値を設定していない。3リンク共通の在庫管理は未実装。定員を決めた場合は通し参加が午前午後双方を消費する点に注意。
開始時刻に公式ページの該当ボタンとPOST受付が停止する。ただし配布済みのStripe直接URLは時刻停止しないため、運営がStripeで非アクティブ化する。
既存署名検証Webhookは決済イベントを受け取るが、今回専用のMY HOME COURT名簿・通知連携は追加していない。照合はStripeを正本として行う。
## 変更・取消し
RBA公開共通規定を表示（個別条件は現資料にない）。
11/21まで100%返金、11/22–25は50%、11/26以降原則返金なし。
返還されない決済手数料・返金不能の外部実費は差引く場合がある。RBA都合中止は全額返金。
問い合わせ riot.training.base@gmail.com / 主催者既存窓口 wakuuzu@gmail.com。
返金処理時は名簿を同時更新。リンク名・選択枠だけで返金済みを確定参加にしない。
## 検証範囲
実課金は行わない。サーバー受付の同意確認・金額改ざん防止・不正枠・開始後停止を検証。
Stripe本番の価格・数量固定・必須項目を読み戻し確認。表示・導線を公開後確認。
