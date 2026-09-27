import "server-only";
export type MemberArticle = {
  slug: string;
  role: "player" | "parent" | "coach";
  title: string;
  summary: string;
  category?: string;
  tags?: string[];
};
// Public-safe catalogue only. Bodies and exercises belong in the private database.
export const memberArticles: MemberArticle[] = [
  {
    "slug": "film-review-one-play",
    "role": "player",
    "title": "プレー動画は、一つの場面から見直そう",
    "summary": "成功か失敗かだけで終わらせず、そのとき見えていたものを振り返る。"
  },
  {
    "slug": "clinic-to-next-practice",
    "role": "player",
    "title": "クリニックで学んだことを、いつもの練習へ",
    "summary": "覚えた動きを増やすより、使ってみたい場面を一つ決める。"
  },
  {
    "slug": "after-game-conversation",
    "role": "parent",
    "title": "試合の帰り道、最初に何を話そう",
    "summary": "振り返る前に、子どもが今、話したいかどうかを確かめる。",
    "category": "親子コミュニケーション",
    "tags": [
      "試合後",
      "会話",
      "振り返り"
    ]
  },
  {
    "slug": "choose-next-opportunity",
    "role": "parent",
    "title": "次のクリニックを、子どもと一緒に選ぶ",
    "summary": "有名かどうかだけでなく、今の関心と参加条件から考える。",
    "category": "進路・選択",
    "tags": [
      "クリニック",
      "機会選び",
      "申込"
    ]
  },
  {
    "slug": "one-question-practice-design",
    "role": "coach",
    "title": "練習メニューの前に、見る場面を一つ決める",
    "summary": "何をさせるかに加えて、何を観察するかを決めておく。"
  },
  {
    "slug": "clinic-learning-to-coaching",
    "role": "coach",
    "title": "講習の学びを、次の一回の練習に変える",
    "summary": "メモを増やすだけで終わらせず、自分の現場で試す問いを残す。"
  },
  {
    "slug": "when-playing-time-is-low",
    "role": "parent",
    "title": "試合に出られない時、保護者が最初に整理したいこと",
    "summary": "出場時間だけで結論を急がず、本人の経験と環境を分けて確認する。",
    "category": "出場・役割",
    "tags": [
      "出場時間",
      "役割",
      "試合"
    ]
  },
  {
    "slug": "thinking-about-transfer",
    "role": "parent",
    "title": "移籍を考え始めた時、感情だけで決めないために",
    "summary": "今の問題、新しい環境への期待、本人の意思を一度分けて整理する。",
    "category": "移籍・環境",
    "tags": [
      "移籍",
      "退部",
      "環境選び"
    ]
  },
  {
    "slug": "talking-with-coach",
    "role": "parent",
    "title": "指導者に相談する前に、何を伝えるか整理する",
    "summary": "評価のぶつけ合いではなく、子どもの状況を確認する対話にする。",
    "category": "指導者との対話",
    "tags": [
      "面談",
      "相談",
      "指導者"
    ]
  },
  {
    "slug": "harsh-words-and-safety",
    "role": "parent",
    "title": "暴言や威圧的な指導が気になった時に、整理したいこと",
    "summary": "競技上の厳しさと、安心して参加できる環境の問題を混同しない。",
    "category": "安全・安心",
    "tags": [
      "暴言",
      "威圧",
      "安全"
    ]
  },
  {
    "slug": "stop-comparing-players",
    "role": "parent",
    "title": "他の子と比べたくなった時に、見直したい視点",
    "summary": "順位ではなく、その子自身の変化と挑戦を追う。",
    "category": "親子コミュニケーション",
    "tags": [
      "比較",
      "成長",
      "声かけ"
    ]
  },
  {
    "slug": "sideline-parent-coaching",
    "role": "parent",
    "title": "試合中、保護者席から指示を出したくなった時に",
    "summary": "応援とコーチングを分け、選手が自分で判断する余白を守る。",
    "category": "親子コミュニケーション",
    "tags": [
      "応援",
      "試合",
      "声かけ"
    ]
  },
  {
    "slug": "travel-without-playing",
    "role": "parent",
    "title": "遠征に帯同したのに出場機会が少なかった時",
    "summary": "費用と時間を含め、遠征の目的と本人が得た経験を具体的に確認する。",
    "category": "遠征・費用",
    "tags": [
      "遠征",
      "出場機会",
      "費用"
    ]
  },
  {
    "slug": "how-to-choose-a-club",
    "role": "parent",
    "title": "クラブやスクールを選ぶ時、勝敗以外に見たいこと",
    "summary": "理念より実際の練習と関わり方を見て、本人に合う環境を選ぶ。",
    "category": "チーム選び",
    "tags": [
      "クラブ",
      "スクール",
      "体験"
    ]
  },
  {
    "slug": "too-much-practice",
    "role": "parent",
    "title": "練習量が多いと感じた時、回数だけで判断しないために",
    "summary": "時間だけでなく、強度、休養、学校生活、本人の状態を合わせて見る。",
    "category": "練習・休養",
    "tags": [
      "練習量",
      "休養",
      "疲労"
    ]
  },
  {
    "slug": "when-child-wants-to-quit",
    "role": "parent",
    "title": "『もう辞めたい』と言われた時、すぐ結論を出さない",
    "summary": "競技そのものを辞めたいのか、今の環境から離れたいのかを分けて聞く。",
    "category": "移籍・環境",
    "tags": [
      "辞めたい",
      "退部",
      "継続"
    ]
  },
  {
    "slug": "position-and-role-change",
    "role": "parent",
    "title": "ポジションが変わった時、評価が下がったと決めつけない",
    "summary": "役割変更の理由と、本人が学べることを具体的に見る。",
    "category": "出場・役割",
    "tags": [
      "ポジション",
      "役割",
      "起用"
    ]
  },
  {
    "slug": "captain-role-pressure",
    "role": "parent",
    "title": "キャプテンになった子どもに、背負わせすぎない",
    "summary": "役職と人格を結びつけず、チーム内の一つの役割として支える。",
    "category": "出場・役割",
    "tags": [
      "キャプテン",
      "責任",
      "リーダー"
    ]
  },
  {
    "slug": "tryout-decision",
    "role": "parent",
    "title": "トライアウトを受けるか迷った時に考えること",
    "summary": "合否だけでなく、挑戦の目的とその後の選択肢を確認する。",
    "category": "チーム選び",
    "tags": [
      "トライアウト",
      "挑戦",
      "選考"
    ]
  },
  {
    "slug": "parent-coach-boundaries",
    "role": "parent",
    "title": "保護者コーチとの距離感に迷った時",
    "summary": "家庭とチームの役割が重なる時ほど、ルールと相談経路を確認する。",
    "category": "指導者との対話",
    "tags": [
      "保護者コーチ",
      "公平性",
      "相談"
    ]
  },
  {
    "slug": "after-a-big-mistake",
    "role": "parent",
    "title": "大きなミスをした後、保護者ができること",
    "summary": "ミスの意味を急いで決めず、次のプレーへ戻る力を支える。",
    "category": "親子コミュニケーション",
    "tags": [
      "ミス",
      "失敗",
      "試合後"
    ]
  },
  {
    "slug": "after-a-tough-loss",
    "role": "parent",
    "title": "大敗した日の帰り道に、何を残すか",
    "summary": "点差だけで一日を評価せず、本人が感じた課題と経験を見る。",
    "category": "親子コミュニケーション",
    "tags": [
      "負け",
      "試合",
      "振り返り"
    ]
  },
  {
    "slug": "sleep-and-recovery",
    "role": "parent",
    "title": "練習を増やす前に、睡眠と回復を見る",
    "summary": "予定を増やすより先に、毎日の回復が確保できているか確認する。",
    "category": "練習・休養",
    "tags": [
      "睡眠",
      "回復",
      "生活"
    ]
  },
  {
    "slug": "pain-and-practice",
    "role": "parent",
    "title": "『少し痛い』と言った時、我慢を前提にしない",
    "summary": "競技への意欲と痛みの判断を分け、必要な確認につなげる。",
    "category": "安全・安心",
    "tags": [
      "痛み",
      "怪我",
      "休養"
    ]
  },
  {
    "slug": "club-and-school-balance",
    "role": "parent",
    "title": "クラブと部活を両立する時に、先に確認したいこと",
    "summary": "活動量とルール、本人の優先順位を整理して無理のない形を探す。",
    "category": "進路・選択",
    "tags": [
      "クラブ",
      "部活",
      "両立"
    ]
  },
  {
    "slug": "choosing-high-school",
    "role": "parent",
    "title": "高校選びを、バスケの強さだけで決めない",
    "summary": "競技環境、学校生活、進路、本人の価値観を同じ表で考える。",
    "category": "進路・選択",
    "tags": [
      "高校",
      "進路",
      "推薦"
    ]
  },
  {
    "slug": "sports-recommendation",
    "role": "parent",
    "title": "スポーツ推薦の話が出た時、確認したいこと",
    "summary": "期待だけで進めず、条件と学校生活、本人の意思を具体的に確認する。",
    "category": "進路・選択",
    "tags": [
      "推薦",
      "高校",
      "条件"
    ]
  },
  {
    "slug": "extra-clinics",
    "role": "parent",
    "title": "クリニックやスクールを増やしすぎないために",
    "summary": "参加数より、今の課題と持ち帰った学びがつながっているかを見る。",
    "category": "練習・休養",
    "tags": [
      "クリニック",
      "スクール",
      "予定"
    ]
  },
  {
    "slug": "individual-training",
    "role": "parent",
    "title": "個人練習を『量』だけで評価しない",
    "summary": "何本やったかより、何を確かめたかを振り返る。",
    "category": "練習・休養",
    "tags": [
      "自主練",
      "個人練習",
      "反復"
    ]
  },
  {
    "slug": "watching-game-film-parent",
    "role": "parent",
    "title": "親子で試合動画を見る時、反省会にしない",
    "summary": "映像を答え合わせではなく、本人の見え方を知る材料にする。",
    "category": "親子コミュニケーション",
    "tags": [
      "動画",
      "振り返り",
      "親子"
    ]
  },
  {
    "slug": "social-media-and-privacy",
    "role": "parent",
    "title": "写真・動画・SNS投稿について、家庭でも確認しておく",
    "summary": "思い出と発信の便利さだけでなく、本人の意思と公開範囲を見る。",
    "category": "安全・安心",
    "tags": [
      "SNS",
      "写真",
      "動画"
    ]
  },
  {
    "slug": "basketball-costs",
    "role": "parent",
    "title": "バスケにかかる費用を、家庭で見える化する",
    "summary": "月謝だけでなく遠征・用具・移動まで含め、無理のない継続を考える。",
    "category": "遠征・費用",
    "tags": [
      "費用",
      "月謝",
      "遠征"
    ]
  },
  {
    "slug": "parent-duty-burden",
    "role": "parent",
    "title": "当番や保護者負担が重い時、我慢だけで解決しない",
    "summary": "チーム文化として当然とせず、役割と必要性を具体的に確認する。",
    "category": "チーム選び",
    "tags": [
      "当番",
      "保護者負担",
      "運営"
    ]
  },
  {
    "slug": "siblings-and-schedules",
    "role": "parent",
    "title": "きょうだいの予定が重なる家庭で、罪悪感を減らす",
    "summary": "全てに同行することを目標にせず、家庭全体で続けられる形を作る。",
    "category": "遠征・費用",
    "tags": [
      "きょうだい",
      "送迎",
      "家庭"
    ]
  },
  {
    "slug": "motivation-slump",
    "role": "parent",
    "title": "やる気が落ちたように見える時、すぐに叱らない",
    "summary": "疲れ、環境、目標の変化など背景を聞き、理由を一つに決めない。",
    "category": "親子コミュニケーション",
    "tags": [
      "やる気",
      "モチベーション",
      "疲労"
    ]
  },
  {
    "slug": "parent-anxiety",
    "role": "parent",
    "title": "保護者自身が不安になった時、子どもの課題と分ける",
    "summary": "大人の焦りをそのまま子どもの目標にしない。",
    "category": "親子コミュニケーション",
    "tags": [
      "不安",
      "焦り",
      "保護者"
    ]
  },
  {
    "slug": "early-specialization",
    "role": "parent",
    "title": "一つの競技に絞るか迷った時に",
    "summary": "周囲の速度ではなく、本人の興味と生活、長期的な継続を考える。",
    "category": "進路・選択",
    "tags": [
      "専門化",
      "複数競技",
      "U12"
    ]
  },
  {
    "slug": "communication-after-benching",
    "role": "parent",
    "title": "交代直後に落ち込んでいる子へ、何を言うか",
    "summary": "その場で原因分析をせず、次のプレーへ戻る余白を残す。",
    "category": "出場・役割",
    "tags": [
      "交代",
      "ベンチ",
      "声かけ"
    ]
  }
  ,{
    "slug": "sports-club-structural-problems",
    "role": "parent",
    "title": "「スポ少だから仕方ない」で終わらせない。育成年代スポーツの構造的な問題",
    "summary": "指導者個人の問題だけでなく、権限集中、保護者負担、勝利至上主義、出場機会、安全、移籍、ガバナンスまで全体像を整理する。",
    "category": "安全・安心",
    "tags": [
      "スポ少",
      "ガバナンス",
      "保護者"
    ]
  }
,
  {
    "slug": "ask-coach-one-question",
    "role": "player",
    "title": "コーチに質問するなら、一つの場面から",
    "summary": "『もっと上手くなるには？』ではなく、困った一場面を具体的に聞く。",
    "category": "振り返り・質問",
    "tags": [
      "質問",
      "コーチ",
      "振り返り"
    ]
  },
  {
    "slug": "bench-stay-ready",
    "role": "player",
    "title": "ベンチにいる時も、次の出番は始まっている",
    "summary": "相手と味方を見ながら、呼ばれた時の最初の役割を準備する。",
    "category": "試合・役割",
    "tags": [
      "ベンチ",
      "出場",
      "準備"
    ]
  },
  {
    "slug": "change-pace-not-only-speed",
    "role": "player",
    "title": "速さだけで抜こうとしない。緩急を使う",
    "summary": "ずっと速く動くのではなく、守備の反応を見て速度を変える。",
    "category": "1on1・ドライブ",
    "tags": [
      "1on1",
      "緩急",
      "ドライブ"
    ]
  },
  {
    "slug": "closeout-defense",
    "role": "player",
    "title": "クローズアウトは、最後まで全力で走らない",
    "summary": "近づく速さを途中で変え、シュートとドライブの両方へ備える。",
    "category": "守備",
    "tags": [
      "クローズアウト",
      "守備",
      "間合い"
    ]
  },
  {
    "slug": "communicate-on-court",
    "role": "player",
    "title": "コートの声を、『頑張れ』から情報に変える",
    "summary": "短く、早く、味方が次の判断に使える言葉を増やす。",
    "category": "チームプレー",
    "tags": [
      "声",
      "コミュニケーション",
      "守備"
    ]
  },
  {
    "slug": "confidence-from-evidence",
    "role": "player",
    "title": "自信がない日は、『できた証拠』へ戻る",
    "summary": "気分だけで自信を作ろうとせず、準備してきた具体的な事実を見る。",
    "category": "メンタル・準備",
    "tags": [
      "自信",
      "試合前",
      "準備"
    ]
  },
  {
    "slug": "cut-with-purpose",
    "role": "player",
    "title": "カットは、走ればいいわけではない",
    "summary": "誰のスペースを作るのかまで考えて動く。",
    "category": "オフボール",
    "tags": [
      "カット",
      "スペース",
      "オフボール"
    ]
  },
  {
    "slug": "defend-without-reaching",
    "role": "player",
    "title": "守備で手を出しすぎる前に、足で残る",
    "summary": "スティールを狙い続けず、まず相手の進路を守る。",
    "category": "守備",
    "tags": [
      "1on1守備",
      "スティール",
      "間合い"
    ]
  },
  {
    "slug": "double-team-development-question",
    "role": "coach",
    "title": "ダブルチームを使う前に、何を育てたいか考える",
    "summary": "点を止める方法だけでなく、1on1・ヘルプ・ローテーションの経験をどう残すか。",
    "category": "ゲームコーチング",
    "tags": [
      "ダブルチーム",
      "マンツーマン",
      "育成"
    ]
  },
  {
    "slug": "drive-read-defender",
    "role": "player",
    "title": "ドライブは、最初から最後まで決めない",
    "summary": "一人目と二人目の守備を見て、途中で選択を変える。",
    "category": "1on1・判断",
    "tags": [
      "ドライブ",
      "判断",
      "ヘルプ"
    ]
  },
  {
    "slug": "eat-drink-around-practice",
    "role": "player",
    "title": "練習前後の食事と水分を、直前に慌てない",
    "summary": "普段の生活の中で、空腹と脱水を避ける準備をする。",
    "category": "コンディション",
    "tags": [
      "食事",
      "水分",
      "体調"
    ]
  },
  {
    "slug": "end-game-awareness",
    "role": "player",
    "title": "終盤は、時計と点差を見る習慣を持つ",
    "summary": "ベンチの指示だけに頼らず、残り時間と必要な得点を自分で確認する。",
    "category": "ゲーム理解",
    "tags": [
      "終盤",
      "時計",
      "点差"
    ]
  },
  {
    "slug": "film-three-columns",
    "role": "player",
    "title": "試合動画は『事実・判断・次』の3列で見る",
    "summary": "評価から始めず、その時見えていたものと次の行動を整理する。",
    "category": "振り返り・映像",
    "tags": [
      "動画",
      "振り返り",
      "判断"
    ]
  },
  {
    "slug": "finish-through-contact",
    "role": "player",
    "title": "接触があるフィニッシュで、最後の一歩を急がない",
    "summary": "身体を流さず、ボールを守りながらリングへ向かう。",
    "category": "シュート・フィニッシュ",
    "tags": [
      "フィニッシュ",
      "接触",
      "レイアップ"
    ]
  },
  {
    "slug": "goal-setting-process",
    "role": "player",
    "title": "目標は、結果と今週の行動を分ける",
    "summary": "スタメンや得点だけでなく、自分で実行できる一歩へ変える。",
    "category": "目標・振り返り",
    "tags": [
      "目標",
      "行動",
      "振り返り"
    ]
  },
  {
    "slug": "handle-pressure-trap",
    "role": "player",
    "title": "プレッシャーで囲まれる前に、二人目を見る",
    "summary": "ダブルチームが完成する前に、空いた場所と味方を見つける。",
    "category": "ボール運び・判断",
    "tags": [
      "プレッシャー",
      "ダブルチーム",
      "パス"
    ]
  },
  {
    "slug": "help-defense-then-recover",
    "role": "player",
    "title": "ヘルプは、出たあとに戻るところまで",
    "summary": "助ける距離と、その次のローテーションまで一つの守備として考える。",
    "category": "守備",
    "tags": [
      "ヘルプ",
      "ローテーション",
      "守備"
    ]
  },
  {
    "slug": "learn-from-better-player",
    "role": "player",
    "title": "上手い選手を見るなら、技だけ真似しない",
    "summary": "準備、見る場所、動き出すタイミングまで観察する。",
    "category": "学び方",
    "tags": [
      "観察",
      "上手い選手",
      "学習"
    ]
  },
  {
    "slug": "missed-shot-next-play",
    "role": "player",
    "title": "シュートを外したあと、プレーを止めない",
    "summary": "外れた結果より先に、リバウンドか守備へ戻る。",
    "category": "試合・切り替え",
    "tags": [
      "シュートミス",
      "切り替え",
      "守備"
    ]
  },
  {
    "slug": "offball-create-space",
    "role": "player",
    "title": "ボールがない時に、味方のスペースを作る",
    "summary": "動くことだけでなく、動かない方がいい場面も考える。",
    "category": "オフボール",
    "tags": [
      "スペース",
      "オフボール",
      "5on5"
    ]
  },
  {
    "slug": "pass-to-advantage",
    "role": "player",
    "title": "パスは、味方が次にプレーしやすい場所へ",
    "summary": "届けばいいではなく、受け手の次の選択まで助ける。",
    "category": "パス・判断",
    "tags": [
      "パス",
      "優位性",
      "判断"
    ]
  },
  {
    "slug": "play-after-pass",
    "role": "player",
    "title": "パスを出したあと、次の仕事をする",
    "summary": "カット、リロケート、スクリーン。パスをプレーの終わりにしない。",
    "category": "オフボール",
    "tags": [
      "パス後",
      "カット",
      "スペース"
    ]
  },
  {
    "slug": "practice-after-bad-game",
    "role": "player",
    "title": "悪かった試合の翌日に、練習量だけ増やさない",
    "summary": "悔しさと原因を分け、必要なら回復を先にする。",
    "category": "振り返り・回復",
    "tags": [
      "試合後",
      "自主練",
      "回復"
    ]
  },
  {
    "slug": "practice-one-focus",
    "role": "player",
    "title": "一回の練習で、意識することは一つでもいい",
    "summary": "曖昧な目標を、小さく確認できる行動へ変える。",
    "category": "練習・目標",
    "tags": [
      "練習",
      "目標",
      "集中"
    ]
  },
  {
    "slug": "pressure-free-throw",
    "role": "player",
    "title": "プレッシャーのかかるフリースローほど、普段の準備へ戻る",
    "summary": "緊張を消そうとせず、短いルーティンで次の一本へ入る。",
    "category": "シュート・メンタル",
    "tags": [
      "フリースロー",
      "緊張",
      "ルーティン"
    ]
  },
  {
    "slug": "rebound-first-contact",
    "role": "player",
    "title": "リバウンドは、ボールより先に相手を見る",
    "summary": "シュートが上がった瞬間に位置を取り、取った後までを一つのプレーにする。",
    "category": "リバウンド",
    "tags": [
      "リバウンド",
      "ボックスアウト",
      "守備"
    ]
  },
  {
    "slug": "recovery-day",
    "role": "player",
    "title": "休養日を、『練習がないから自主練する日』にしない",
    "summary": "疲れが残る時は、休むことも次の練習の準備として考える。",
    "category": "コンディション",
    "tags": [
      "休養",
      "疲労",
      "回復"
    ]
  },
  {
    "slug": "role-on-new-team",
    "role": "player",
    "title": "新しいチームで、前と同じ役割を求めすぎない",
    "summary": "比較より先に、今のチームでできることと分からないことを整理する。",
    "category": "チーム・役割",
    "tags": [
      "新チーム",
      "役割",
      "移籍"
    ]
  },
  {
    "slug": "scan-before-receive",
    "role": "player",
    "title": "ボールを受ける前に、一度だけ周りを見る",
    "summary": "全部を見るのではなく、見る場所を一つ決めてキャッチ後の判断を早くする。",
    "category": "見る・判断",
    "tags": [
      "スキャン",
      "キャッチ",
      "判断"
    ]
  },
  {
    "slug": "screen-use-read",
    "role": "player",
    "title": "スクリーンは、使う前に守備を見る",
    "summary": "決められた方向へ行くのではなく、守備の位置と二人目の反応を読む。",
    "category": "スクリーン・判断",
    "tags": [
      "スクリーン",
      "ピック",
      "判断"
    ]
  },
  {
    "slug": "shoot-ready-before-catch",
    "role": "player",
    "title": "キャッチしてからではなく、受ける前にシュート準備を始める",
    "summary": "リングと守備を先に見て、打つ・打たないを早く選ぶ。",
    "category": "シュート",
    "tags": [
      "キャッチ&シュート",
      "準備",
      "判断"
    ]
  },
  {
    "slug": "shooting-slump",
    "role": "player",
    "title": "シュートが入らない時ほど、修正を増やしすぎない",
    "summary": "外れるたびに全部を変えず、一つの確認点へ戻る。",
    "category": "シュート",
    "tags": [
      "シュート",
      "スランプ",
      "フォーム"
    ]
  },
  {
    "slug": "shot-selection",
    "role": "player",
    "title": "良いシュートかどうかを、入った・外れたで決めない",
    "summary": "準備、守備との距離、普段の練習範囲から選択を振り返る。",
    "category": "シュート・判断",
    "tags": [
      "シュートセレクション",
      "判断",
      "試合"
    ]
  },
  {
    "slug": "sleep-before-game",
    "role": "player",
    "title": "試合前日は、練習を足すより睡眠を整える",
    "summary": "集合時間から逆算し、直前に新しいことを増やさない。",
    "category": "コンディション",
    "tags": [
      "睡眠",
      "試合前",
      "準備"
    ]
  },
  {
    "slug": "small-sided-read",
    "role": "player",
    "title": "3x3で、見るものを一つ決める",
    "summary": "情報が多い少人数ゲームほど、観察する対象を絞って判断する。",
    "category": "3x3・判断",
    "tags": [
      "3x3",
      "判断",
      "少人数ゲーム"
    ]
  },
  {
    "slug": "transition-run-lanes",
    "role": "player",
    "title": "速攻で、ボールへ近づきすぎない",
    "summary": "幅と深さを作り、速攻が止まったら次の攻撃へつなぐ。",
    "category": "トランジション",
    "tags": [
      "速攻",
      "レーン",
      "スペーシング"
    ]
  },
  {
    "slug": "turnover-reset",
    "role": "player",
    "title": "ターンオーバーのあと、最初の3歩を守備へ",
    "summary": "ミスの反省より先に、数的不利を止める。",
    "category": "試合・切り替え",
    "tags": [
      "ターンオーバー",
      "切り替え",
      "守備"
    ]
  },
  {
    "slug": "warmup-purpose",
    "role": "player",
    "title": "ウォームアップで、身体だけでなく最初の役割も準備する",
    "summary": "強度を上げながら、ボールと試合の判断へ近づける。",
    "category": "コンディション",
    "tags": [
      "ウォームアップ",
      "試合前",
      "準備"
    ]
  }
];
