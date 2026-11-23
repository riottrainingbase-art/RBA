/** RBA UNITED 2027 programme registry. Public descriptions only; never use this as a booking/payment ledger. */
export const unitedLinks = {
  parentInterest: "https://form.jotform.com/263263903074052",
  korea: "https://form.jotform.com/263207310187047",
  guam: "https://form.jotform.com/263188088558069",
  rizehopeU12: "https://form.jotform.com/263243952545057",
  shenzhen: "https://form.jotform.com/263237260217048",
  partnerInquiry: "https://form.jotform.com/263264266082054",
  myHomecourt: "/ja/my-homecourt",
  store: "/ja/store",
  developmentCamp: "/ja/camp",
  opportunities: "/ja/opportunities",
} as const;

export const unitedPortfolio = [
  { code:"CLINIC", title:"RBA CLINIC",role:"出会いと育成の入口",fee:"開催ごとの既存クリニック料金",status:"既存サービス",detail:"単発のクリニックがUNITED参加・出場選考を保証することはありません。",href:"/ja/opportunities" },
  { code:"NEXTCOURT",title:"RBA NEXT COURT TOUR",role:"全国の地域へ指導と学習機会を届ける",fee:"各地域の開催形態に応じて確定。6地域・12日・延べ480枠は2027年の目標値",status:"2027年計画／開催・資金確定前",detail:"地域クリニックと4週間フォロー。UNITED選考や大会参加費と分離し、同じ参加枠を二重に売りません。",href:"/ja/national-tour" },
  { code:"CONNECT",title:"RBA CONNECT",role:"国内外のチームと大会主催者・地域協力先の紹介・調整",fee:"相談対象ごとに実費・役務を個別見積（公開定額なし）",status:"連携相談の受付",detail:"チーム・主催者側の窓口。選手個人向けのUNITEDと区別し、取引・会場・渡航を確約しません。",href:"/ja/connect" },
  { code:"CAMP",title:"RBA DEVELOPMENT CAMP",role:"技術と判断を深める",fee:"開催企画の税込参加料。千葉2027・2日間24,200円はその企画限定",status:"既存サービス",detail:"技術と判断を学ぶ育成キャンプ。期間限定チームや大会とは別の契約です。",href:"/ja/camp" },
  { code:"UNITED",title:"RBA UNITED",role:"個人が集まり期間限定で試合・交流へ",fee:"企画ごとの個人参加料／正式条件の確定後に発表",status:"無料希望受付のみ",detail:"JBA既存所属の変更や二重登録を伴わない交流から始め、大会参加資格は別途確認します。",href:"/ja/united" },
  { code:"RIZEHOPE",title:"RIZEHOPE JAPAN",role:"国内外U12チーム向け国際育成交流大会",fee:"国内チーム2日間66,000円（税込）。UNITED個人参加費は未確定",status:"大会準備中",detail:"大会主催・チーム参加料と、RBA UNITEDの個人参加・選考・支払を混同しません。",href:"/ja/opportunities" },
  { code:"HOMECOURT",title:"MY HOME COURT",role:"無料RBA IDと参加記録",fee:"基本登録無料。note会員500円/月・育成記事1,000円/月は別サービス",status:"既存サービス",detail:"UNITEDに別の強制月額会費は設けず、各企画の経験を同意の範囲でつなぎます。",href:"/ja/my-homecourt" },
  { code:"TEAMWEAR",title:"RBA UNITED OFFICIAL GAME UNIFORM",role:"濃色・淡色の競技用ユニフォーム企画",fee:"発売前・税込販売価格未定",status:"Shopify下書き",detail:"JBA主催大会ではリバーシブルを原則公式ウェアにできないため、濃色・淡色の別セットを第一候補にします。サンプル・サイズ・原価・広告許可・大会規定の確認後のみ発売。",href:"/ja/store" },
] as const;

export const unitedProjects = [
  { code:"YAIMA",date:"2026年9月",title:"石垣島YAIMA CUP",age:"U12",status:"実施済み",note:"全国から集まった選手が初対面の仲間と試合・共同生活を経験しました。",url:"/ja/journal/rba-united-yaima-cup-2026",cta:"活動記録" },
  { code:"GUAM",date:"2027年1月5〜10日を中心に調整",title:"神戸 × グアムU14",age:"男子U14",status:"会場・対戦・費用調整中",note:"国内選手の参加希望を受付。会場確保や試合実施を確約しません。",url:unitedLinks.guam,cta:"無料意向登録" },
  { code:"IYIBS",date:"2027年1月28〜31日予定",title:"韓国・仁川IYIBS",age:"U15男子中心",status:"参加資格・編成調整中",note:"登録は選考通過・渡航・支払義務を意味しません。",url:unitedLinks.korea,cta:"無料意向登録" },
  { code:"SHENZHEN",date:"2027年2月に検討",title:"深圳U12 × 関東交流",age:"U12",status:"受入・試合調整中",note:"年齢・施設・対戦相手と費用を確認中。",url:unitedLinks.shenzhen,cta:"無料意向登録" },
  { code:"RIZEHOPE",date:"2027年2月27〜28日予定",title:"RIZEHOPE × UNITED U12",age:"小学6年生を中心",status:"UNITED個人参加枠未確定",note:"チーム参加料66,000円はUNITED個人参加料金ではありません。",url:unitedLinks.rizehopeU12,cta:"無料意向登録" },
] as const;

export const unitedReleaseGates = [
  "施設と営利利用・有償催事の承認",
  "大会ごとのJBA登録・年齢・男女・チーム編成資格",
  "指導者、宿泊引率、責任者、最低スタッフ人数と保険",
  "宿泊・移動・食事の手配主体と旅行業法の適否",
  "日時・会場・宿泊先・送迎・緊急連絡体制の文書確定",
  "参加費・追加料金・取消料・返金・最低実施人数の公開",
  "保護者同意と写真利用許諾の取得、安全情報の適切な管理",
  "既存申込・入金の照合と二重決済防止",
] as const;
