/**
 * Public-facing, date-stamped RBA information register.
 * This is editorial information, not an operational CRM or a live booking ledger.
 * Do not expose minors' names, flight records, health data, invoices, or private negotiations.
 * Verification baseline: 2026-11-16; update the date only after reviewing facts.
 */
export type PublicRbaStatus = "開催予定" | "活動中" | "準備・協議中" | "実施済み" | "方針・規約";
export type PublicRbaItem = Readonly<{
  id: string;
  category: "開催・講習" | "クラブ・スクール" | "会員・育成サービス" | "国際交流・新規企画" | "協賛・団体運営";
  status: PublicRbaStatus;
  title: string;
  when?: string;
  detail: string;
  note?: string;
  href?: string;
  linkText?: string;
}>;

export const rbaPublicInformationReviewedAt = "2026年11月16日";
export const rbaPublicInformation: readonly PublicRbaItem[] = [
  {
    id: "tatsuno-2026", category: "開催・講習", status: "開催予定", when: "11月20〜23日／兵庫・たつの",
    title: "KOBE Development Camp 2026",
    detail: "20日夜は前夜プログラム、21・22日は青龍ラーテルズとの合同練習（両日9:00〜17:00）が中心です。23日は別会場の午前9:00〜12:00枠を予定し、参加する選手や担当体制は前日までのプログラムと異なります。",
    note: "宿泊・食事・移動・集合場所などは個別の最終案内を優先してください。申込・決済済みの方は再手続き不要です。",
    href: "/ja/events/kobe-development-camp-2026", linkText: "たつのキャンプの公式案内"
  },
  {
    id: "torsten-2026", category: "開催・講習", status: "実施済み", when: "11月25日（水）20:00〜21:30／Zoom",
    title: "Torsten Loibl ONLINE CLINIC Vol.2",
    detail: "育成年代のシューター育成とゲームの中での判断を扱うオンライン講習。日本向けはLIVE税込3,300円、30日録画税込4,400円の別プランです。海外向けは公式英語ページの米ドル決済を利用します。",
    note: "日本語逐次通訳付き。国際協会等による認定講習と誤認しないよう、RBAの独立企画として案内しています。",
    href: "/ja/events/torsten-loibl-online-clinic", linkText: "講習内容・録画のご案内"
  },
  {
    id: "kagoshima-2026", category: "開催・講習", status: "開催予定", when: "11月29日（日）／鹿児島",
    title: "BASTET × RBA 鹿児島クリニック",
    detail: "午前9:30〜12:00、午後13:00〜15:30。1部のみ税込3,000円、午前・午後通し税込4,000円。対象は小・中・高校生です。",
    href: "/ja/events/kagoshima-clinic-2026-11-29", linkText: "参加案内・お申し込み"
  },
  {
    id: "okinawa-camp-2026", category: "開催・講習", status: "開催予定", when: "12月22〜24日／沖縄・糸満",
    title: "沖縄国際ユースバスケットボールキャンプ",
    detail: "7〜18歳を対象とする国際交流キャンプ。施設から利用可能との回答を受けています。沖縄県内参加者の3日間通いは税込27,500円、宿泊プランは税込39,600円。放課後・1日参加枠は別途調整中です。",
    note: "宿泊の正式手続き、体育館の利用時刻、送迎、追加費用の有無など、調整中の事項は必ず参加前に公式ページで確認してください。",
    href: "/ja/events/okinawa-international-camp-2026", linkText: "沖縄キャンプの最新条件"
  },
  {
    id: "gream-sendai", category: "クラブ・スクール", status: "活動中",
    title: "GREAM SENDAI U15",
    detail: "仙台市太白区を拠点とする男子U15の育成クラブです。判断・スペーシング・仲間との連係を大切にし、2027年の女子U15活動については準備を進めています。",
    note: "男子クラブの活動と、女子の新体制・募集開始は別です。会費、体験日、実際の受入条件は公式ページを優先します。",
    href: "/ja/gream-sendai", linkText: "GREAM仙台の活動・募集条件"
  },
  {
    id: "gream-okinawa", category: "クラブ・スクール", status: "活動中",
    title: "GREAM OKINAWA U15",
    detail: "既存のチーム活動情報と、今後の指導・安全管理体制の整備を分けて案内しています。新しい定期練習・受け入れ条件や指導体制は、正式に確定したものだけを公表します。",
    note: "新体制が調整中であることは、既存会員の活動が一律に中止されたことを意味しません。",
    href: "/ja/gream-okinawa", linkText: "GREAM沖縄の現状"
  },
  {
    id: "sendai-skill-school", category: "クラブ・スクール", status: "活動中",
    title: "仙台U15スキルアップスクール",
    detail: "クラブ所属の有無を問わず、ゲームの中で状況を見る・選ぶ・実行する・振り返る力を育てる継続スクールです。GREAMへの入団とは別の参加手続きです。",
    href: "/ja/sendai-school", linkText: "スクールの開催・参加条件"
  },
  {
    id: "homecourt", category: "会員・育成サービス", status: "活動中",
    title: "MY HOME COURT／無料RBA ID",
    detail: "育成記事、活動情報、参加記録や次の挑戦につながる会員の入口です。RBA IDの登録は無料で、継続会員プランや有料学習コンテンツへの申し込みとは別です。",
    href: "/ja/my-homecourt", linkText: "MY HOME COURT"
  },
  {
    id: "dhub", category: "会員・育成サービス", status: "活動中",
    title: "D-HUB COACH LAB",
    detail: "指導者が現場の練習設計、判断、選手との関わり方について継続的に学ぶための会員向けコンテンツです。一般公開の記事と会員限定の内容は区別して提供します。",
    href: "/ja/d-hub", linkText: "D-HUBの案内"
  },
  {
    id: "supporters", category: "会員・育成サービス", status: "活動中",
    title: "RBAを継続的に応援する仕組み",
    detail: "RBAの育成環境を支える応援メンバー制度を案内しています。一般の参加費・協賛や、月額学習サービスとは別の申込条件です。",
    note: "寄付や応援会費の名称だけで、税制上の寄付金控除が認められるとは限りません。",
    href: "/ja/supporters", linkText: "応援メンバーの案内"
  },
  {
    id: "rba-united", category: "国際交流・新規企画", status: "活動中",
    title: "RBA UNITED",
    detail: "所属クラブを移籍せず、国内外の試合・交流・遠征へ挑戦するためのプロジェクトです。継続して所属するGREAMなどのクラブとは役割が異なります。",
    href: "/ja/united", linkText: "RBA UNITEDとは"
  },
  {
    id: "guam-exchange-2027", category: "国際交流・新規企画", status: "準備・協議中", when: "2027年1月5〜7日を候補として協議",
    title: "グアムチームとの関西・神戸エリアでのU14交流",
    detail: "RBA UNITED U14を含む合同練習・交流試合などを検討しています。訪日側の渡航予定、対戦チーム、会場、参加費、運営責任の条件は協議中です。",
    note: "本ページは大会開催・申込受付・参加確約を発表するものではありません。正式募集が決まった場合に別途案内します。",
    href: "/ja/international", linkText: "国際交流事業"
  },
  {
    id: "asia-network", category: "国際交流・新規企画", status: "準備・協議中",
    title: "日本・アジアの育成ネットワーク",
    detail: "台湾・マレーシアなどでの実施実績を土台に、韓国・グアム・その他の地域との新しい育成・指導者交流を協議しています。個別の参加チーム、開催日、契約成立は企画ごとに確認します。",
    href: "/ja/international", linkText: "海外交流のご相談"
  },
  {
    id: "growth-awards", category: "国際交流・新規企画", status: "準備・協議中",
    title: "RBA GROWTH AWARDS",
    detail: "勝敗や得点ではなく、クリニック後の挑戦・工夫・学びを称える企画です。用品メーカーや地域事業者との小規模な協力方法を相談しています。",
    note: "応募・受賞・景品・協賛先は、制度と条件が正式に整ったものだけを公開します。",
    href: "/ja/partners", linkText: "企業・地域との連携"
  },
  {
    id: "nonprofit", category: "協賛・団体運営", status: "方針・規約",
    title: "RBAの非営利目的と参加費",
    detail: "参加費・会費・協賛金等は育成活動に必要な財源として受け取り、会則に基づき剰余金を構成員に分配しません。指導者・運営者への適正な報酬や費用の支払いとは区別します。",
    note: "団体の非営利目的は、法人格の取得、税の優遇、公の施設の利用区分を自動的に認めるものではありません。改訂会則案は未施行です。",
    href: "/ja/about/governance", linkText: "団体概要・現行会則と改訂草案"
  },
  {
    id: "partner-programme", category: "協賛・団体運営", status: "活動中",
    title: "地域・企業の協賛と共同企画",
    detail: "育成年代の参加機会、指導者育成、安全対策、国内外交流を支えるパートナーを募集しています。過去の協賛実績、現在の契約、協議中の企業は別々に管理します。",
    note: "打診をした企業を協賛決定企業として表示せず、子どもの参加者名簿を協賛の対価として提供しません。",
    href: "/ja/partners", linkText: "協賛・パートナーのご案内"
  },
] as const satisfies readonly PublicRbaItem[];

export const rbaStatusCategories = [
  "開催・講習", "クラブ・スクール", "会員・育成サービス", "国際交流・新規企画", "協賛・団体運営"
] as const satisfies readonly PublicRbaItem["category"][];
