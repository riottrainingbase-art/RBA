export const clinicPath = "/ja/events/torsten-loibl-online-clinic";
export const clinicUrl = `https://riotbasketballacademy.com${clinicPath}`;
export const clinicSharePath = `${clinicPath}/share`;
export const clinicTitle = "現代バスケットボールにおけるシューターの育成と活用";

export const clinicFormats = [
  { id: "live", name: "ライブ参加", price: "3,300円", when: "11月25日（水）20:00〜21:30", benefit: "当日、Zoomで講義を受講したい方へ。", choice: "ライブ参加" },
  { id: "recorded", name: "オンデマンド視聴", price: "4,400円", when: "開催後、公開から30日間", benefit: "練習や仕事と重なる方、自分の時間に繰り返し学びたい方へ。", choice: "オンデマンド視聴" },
] as const;

export const clinicFaqs = [
  ["水曜日は練習があり、参加できません。", "開催後に公開するオンデマンド視聴（4,400円・税込）を選べます。公開から30日間、ご自身の時間に繰り返し視聴できます。公開開始日の詳細は主催者からの案内をご確認ください。"],
  ["英語が分からなくても受講できますか？", "英語の講義に日本語逐次通訳が付きます。ライブ・オンデマンドともに通訳付きです。"],
  ["指導を始めたばかりでも参加できますか？", "指導者資格は必要ありません。指導者・チームスタッフ・教員・保護者・選手の皆さまが参加できます。"],
  ["ライブ料金には録画も含まれますか？", "ライブ参加と30日間のオンデマンド視聴は、別の参加形式です。ライブ参加後の録画視聴も希望される場合は、お申し込み前にRBAへ条件をご相談ください。"],
  ["フォームを送信すれば、申込完了ですか？", "フォーム送信とお支払いの2段階です。送信後の確認画面にある、選んだ参加形式の決済リンクでお支払いを完了すると申込が確定します。確認画面を閉じてしまった場合は、再度フォームを送信せずRBAへご連絡ください。"],
  ["スタッフみんなで受講したい場合は？", "お一人ずつお申し込みください。Zoom・視聴URLの第三者共有はできません。スタッフ内での募集案内の共有には、このページの紹介文をご利用いただけます。"],
  ["自分の質問には必ず回答してもらえますか？", "申込フォームで関心のあるテーマをお知らせいただけます。ただし、すべての質問への個別回答や、特定のドリルの紹介を保証するものではありません。"],
] as const;

const overview = "11月25日（水）20:00〜21:30（日本時間）、トーステン・ロイブル氏オンラインクリニック Vol.2を開催します。テーマは「現代バスケットボールにおけるシューターの育成と活用」。Zoom・英語講義＋日本語逐次通訳付き。ライブ3,300円／公開後30日間のオンデマンド4,400円（税込）。当日、練習や仕事がある方は録画視聴を選べます。";
export const clinicShareMessages = [
  { id: "general", label: "共通", lead: "練習では入る。そのシュートを、試合で打てる力へ。シュート技術・練習設計・試合で良いシュート機会をつくる戦略を学ぶ90分です。" },
  { id: "u12", label: "ミニバス・U12", lead: "シュートフォームを教えることと、守備のいる試合で打てることを、どうつなぐか。ミニバス・U12の指導を考える学習機会のご案内です。" },
  { id: "u15u18", label: "U15・中高・大学", lead: "シュートドリルを、試合での判断へ。技術、練習設計、スペーシング、良いシュート機会をつくる戦略をつなげて学びたい指導者の方へ。" },
  { id: "parents", label: "保護者・選手", lead: "練習本数や成功率だけでは見えない、シュートの学び。保護者・選手も参加できるオンライン講習のご案内です。" },
].map(item => {
  const url = new URL(clinicUrl);
  url.search = new URLSearchParams({ utm_source: "rba_share_kit", utm_medium: "voluntary_share", utm_campaign: "torsten_vol2_20261125", utm_content: item.id }).toString();
  return { ...item, text: `${item.lead}\n\n${overview}\n\n詳細・お申し込み：\n${url.toString()}\n\nフォーム送信後、お支払い完了で申込確定となります。` };
});

export function clinicHelpUrl(subject: string) {
  return `mailto:riot.training.base@gmail.com?${new URLSearchParams({ subject: `11/25クリニック｜${subject}`, body: "RBA 西尾様\n\n氏名：\n申込に使用したメールアドレス（申込済みの場合）：\n相談内容：\n" }).toString().replace(/\+/g, "%20")}`;
}
