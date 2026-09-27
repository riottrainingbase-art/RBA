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
  },
  {
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
  },
  {
    "slug": "scan-before-receive",
    "role": "player",
    "title": "ボールを受ける前に、一度見る",
    "summary": "受けてから考えるのではなく、受ける前に選択肢を準備する。",
    "category": "判断・認知",
    "tags": [
      "スキャン",
      "認知",
      "パス"
    ]
  },
  {
    "slug": "drive-read-defender",
    "role": "player",
    "title": "ドライブは速さより、守る相手を読む",
    "summary": "抜くことだけを目的にせず、守備の反応から次を選ぶ。",
    "category": "1on1",
    "tags": [
      "ドライブ",
      "1on1",
      "判断"
    ]
  },
  {
    "slug": "shoot-ready-before-catch",
    "role": "player",
    "title": "シュートはキャッチする前から始まっている",
    "summary": "ボールを受けた瞬間に打てる準備を、足と視線から整える。",
    "category": "シュート",
    "tags": [
      "シュート",
      "キャッチ",
      "準備"
    ]
  },
  {
    "slug": "missed-shot-next-play",
    "role": "player",
    "title": "シュートを外した次の1秒を変える",
    "summary": "外れた結果ではなく、次の守備やリバウンドへの反応を習慣にする。",
    "category": "試合・メンタル",
    "tags": [
      "ミス",
      "切り替え",
      "シュート"
    ]
  },
  {
    "slug": "pass-to-advantage",
    "role": "player",
    "title": "パスは『空いている人』ではなく『次が有利になる場所』へ",
    "summary": "味方の位置だけでなく、次のプレーが続くパスを考える。",
    "category": "判断・認知",
    "tags": [
      "パス",
      "判断",
      "スペーシング"
    ]
  },
  {
    "slug": "offball-create-space",
    "role": "player",
    "title": "ボールを持っていない時に、スペースをつくる",
    "summary": "近づくだけでなく、味方が使える場所を広げる動きを覚える。",
    "category": "オフボール",
    "tags": [
      "オフボール",
      "スペーシング",
      "カット"
    ]
  },
  {
    "slug": "cut-with-purpose",
    "role": "player",
    "title": "カットは『動くため』ではなく、守備を動かすために",
    "summary": "走る場所とタイミングに目的を持たせる。",
    "category": "オフボール",
    "tags": [
      "カット",
      "オフボール",
      "タイミング"
    ]
  },
  {
    "slug": "closeout-defense",
    "role": "player",
    "title": "クローズアウトは、止めるより選択肢を減らす",
    "summary": "シュートとドライブの両方を完璧に守ろうとせず、優先順位を持つ。",
    "category": "ディフェンス",
    "tags": [
      "クローズアウト",
      "守備",
      "1on1"
    ]
  },
  {
    "slug": "help-defense-then-recover",
    "role": "player",
    "title": "ヘルプディフェンスの後、元の相手へ戻るまで",
    "summary": "助けるだけで終わらず、次のパスまで予測して守る。",
    "category": "ディフェンス",
    "tags": [
      "ヘルプ",
      "ローテーション",
      "守備"
    ]
  },
  {
    "slug": "rebound-first-contact",
    "role": "player",
    "title": "リバウンドはジャンプ力より、先に相手へ触れる",
    "summary": "ボールを見るだけでなく、相手との位置を先に取る。",
    "category": "ディフェンス",
    "tags": [
      "リバウンド",
      "ボックスアウト",
      "守備"
    ]
  },
  {
    "slug": "turnover-reset",
    "role": "player",
    "title": "ターンオーバーの後に、すぐ守備へ戻る",
    "summary": "ミスの反省をその場で始めず、次の1プレーを守る。",
    "category": "試合・メンタル",
    "tags": [
      "ターンオーバー",
      "切り替え",
      "メンタル"
    ]
  },
  {
    "slug": "pressure-free-throw",
    "role": "player",
    "title": "緊張するフリースローで、同じ準備に戻る",
    "summary": "結果を考えすぎず、自分で決めたルーティンへ意識を戻す。",
    "category": "試合・メンタル",
    "tags": [
      "フリースロー",
      "緊張",
      "ルーティン"
    ]
  },
  {
    "slug": "bench-stay-ready",
    "role": "player",
    "title": "ベンチにいる時間も、次の出場準備に変える",
    "summary": "出番を待つだけでなく、試合の流れと自分の役割を観察する。",
    "category": "試合・メンタル",
    "tags": [
      "ベンチ",
      "出場",
      "準備"
    ]
  },
  {
    "slug": "ask-coach-one-question",
    "role": "player",
    "title": "コーチに聞くなら、質問を一つにする",
    "summary": "『どうすれば上手くなれますか』を、次に試せる質問へ変える。",
    "category": "チーム・コミュニケーション",
    "tags": [
      "質問",
      "コーチ",
      "成長"
    ]
  },
  {
    "slug": "communicate-on-court",
    "role": "player",
    "title": "声を出すなら、味方が使える情報を伝える",
    "summary": "大声の量ではなく、プレーを助ける短い情報を増やす。",
    "category": "チーム・コミュニケーション",
    "tags": [
      "声",
      "コミュニケーション",
      "チーム"
    ]
  },
  {
    "slug": "practice-one-focus",
    "role": "player",
    "title": "練習前に『今日一つ』を決める",
    "summary": "全部を上手くしようとせず、その日の観察ポイントを一つ持つ。",
    "category": "練習・振り返り",
    "tags": [
      "練習",
      "目標",
      "振り返り"
    ]
  },
  {
    "slug": "film-three-columns",
    "role": "player",
    "title": "試合動画を『事実・判断・次』の3列で見る",
    "summary": "自分を責める反省ではなく、次の練習に使える振り返りへ変える。",
    "category": "練習・振り返り",
    "tags": [
      "動画",
      "分析",
      "振り返り"
    ]
  },
  {
    "slug": "small-sided-read",
    "role": "player",
    "title": "3x3や少人数ゲームで、読むものを一つ決める",
    "summary": "自由にプレーする中でも、観察する相手やスペースを決める。",
    "category": "判断・認知",
    "tags": [
      "3x3",
      "少人数",
      "判断"
    ]
  },
  {
    "slug": "change-pace-not-only-speed",
    "role": "player",
    "title": "速さだけで抜かず、スピードを変える",
    "summary": "同じ速さで走り続けず、遅い→速いの変化で守備をずらす。",
    "category": "1on1",
    "tags": [
      "チェンジオブペース",
      "ドライブ",
      "1on1"
    ]
  },
  {
    "slug": "finish-through-contact",
    "role": "player",
    "title": "ゴール下は、接触を避けるだけでなくバランスを保つ",
    "summary": "相手がいる前提で、最後の一歩と身体の向きを整える。",
    "category": "1on1",
    "tags": [
      "フィニッシュ",
      "接触",
      "レイアップ"
    ]
  },
  {
    "slug": "shot-selection",
    "role": "player",
    "title": "良いシュートを、自分で選べるようにする",
    "summary": "入るかどうかだけでなく、時間・距離・守備・チーム状況を見る。",
    "category": "シュート",
    "tags": [
      "ショットセレクション",
      "判断",
      "シュート"
    ]
  },
  {
    "slug": "shooting-slump",
    "role": "player",
    "title": "シュートが入らない時、全部を変えない",
    "summary": "一時的な不調でフォーム全体を作り直さず、確認項目を小さくする。",
    "category": "シュート",
    "tags": [
      "スランプ",
      "シュート",
      "フォーム"
    ]
  },
  {
    "slug": "warmup-purpose",
    "role": "player",
    "title": "ウォームアップを『汗をかく時間』だけにしない",
    "summary": "身体と判断を試合速度へ近づける準備にする。",
    "category": "身体・コンディショニング",
    "tags": [
      "ウォームアップ",
      "試合準備",
      "身体"
    ]
  },
  {
    "slug": "recovery-day",
    "role": "player",
    "title": "休む日を、成長が止まる日だと思わない",
    "summary": "練習しない時間も、次の練習の質を作る一部として考える。",
    "category": "身体・コンディショニング",
    "tags": [
      "休養",
      "回復",
      "コンディショニング"
    ]
  },
  {
    "slug": "sleep-before-game",
    "role": "player",
    "title": "試合前日は、特別なことより普段の睡眠へ",
    "summary": "直前に練習を増やすより、いつものリズムを守る。",
    "category": "身体・コンディショニング",
    "tags": [
      "睡眠",
      "試合前",
      "回復"
    ]
  },
  {
    "slug": "eat-drink-around-practice",
    "role": "player",
    "title": "練習前後の食事と水分を、毎回の準備にする",
    "summary": "特別な補助食品より、普段の食事・水分・タイミングを整える。",
    "category": "身体・コンディショニング",
    "tags": [
      "食事",
      "水分",
      "練習"
    ]
  },
  {
    "slug": "defend-without-reaching",
    "role": "player",
    "title": "手を出す前に、足で相手の進路へ入る",
    "summary": "スティールだけを狙わず、相手の行きたい場所を狭くする。",
    "category": "ディフェンス",
    "tags": [
      "1on1守備",
      "フットワーク",
      "スティール"
    ]
  },
  {
    "slug": "transition-run-lanes",
    "role": "player",
    "title": "速攻は、ボールより先にスペースへ走る",
    "summary": "全員がボールへ集まらず、幅と深さを使って攻める。",
    "category": "オフボール",
    "tags": [
      "速攻",
      "トランジション",
      "スペーシング"
    ]
  },
  {
    "slug": "screen-use-read",
    "role": "player",
    "title": "スクリーンは、使う前に守備の位置を見る",
    "summary": "形通りに回るだけでなく、守り方に応じて進路を変える。",
    "category": "判断・認知",
    "tags": [
      "スクリーン",
      "ピック",
      "判断"
    ]
  },
  {
    "slug": "play-after-pass",
    "role": "player",
    "title": "パスを出した後の3秒をプレーする",
    "summary": "ボールを手放した瞬間に休まず、次のスペースへ関わる。",
    "category": "オフボール",
    "tags": [
      "パス後",
      "カット",
      "スペーシング"
    ]
  },
  {
    "slug": "handle-pressure-trap",
    "role": "player",
    "title": "ダブルチームされた時、ドリブルを増やしすぎない",
    "summary": "囲まれる前に出口を見つけ、味方とスペースを使う。",
    "category": "判断・認知",
    "tags": [
      "ダブルチーム",
      "プレッシャー",
      "パス"
    ]
  },
  {
    "slug": "end-game-awareness",
    "role": "player",
    "title": "残り時間と得点差を、プレーの情報にする",
    "summary": "普段と同じ技術でも、終盤は時間とスコアで選択を変える。",
    "category": "試合・メンタル",
    "tags": [
      "終盤",
      "時計",
      "得点差"
    ]
  },
  {
    "slug": "role-on-new-team",
    "role": "player",
    "title": "新しいチームで、最初から自分の役割を決めすぎない",
    "summary": "以前の評価やポジションを持ち込まず、まず環境を観察する。",
    "category": "チーム・コミュニケーション",
    "tags": [
      "移籍",
      "新チーム",
      "役割"
    ]
  },
  {
    "slug": "confidence-from-evidence",
    "role": "player",
    "title": "自信は『自分はできる』と言い聞かせるだけで作らない",
    "summary": "できた経験と準備の証拠を集めて、自分の言葉にする。",
    "category": "試合・メンタル",
    "tags": [
      "自信",
      "準備",
      "メンタル"
    ]
  },
  {
    "slug": "goal-setting-process",
    "role": "player",
    "title": "目標は結果だけでなく、毎週できる行動にする",
    "summary": "大会結果や得点目標を、日々の練習で確認できる行動へ落とす。",
    "category": "練習・振り返り",
    "tags": [
      "目標",
      "計画",
      "成長"
    ]
  },
  {
    "slug": "practice-after-bad-game",
    "role": "player",
    "title": "悪い試合の翌日に、練習を増やしすぎない",
    "summary": "悔しさで量を増やす前に、原因と回復を整理する。",
    "category": "練習・振り返り",
    "tags": [
      "負け",
      "自主練",
      "回復"
    ]
  },
  {
    "slug": "learn-from-better-player",
    "role": "player",
    "title": "上手い選手を見る時、真似するポイントを一つにする",
    "summary": "『すごい』で終わらず、準備・視線・タイミングを観察する。",
    "category": "練習・振り返り",
    "tags": [
      "観察",
      "映像",
      "学習"
    ]
  },
  {
    "slug": "double-team-development-question",
    "role": "parent",
    "title": "点差が開いても、最後までダブルチーム。それは何を育てているのか。",
    "summary": "目の前の点差ではなく、1on1・ヘルプ・ローテーションという将来につながる守備経験から試合を見る。",
    "category": "指導者との対話",
    "tags": ["ダブルチーム","マンツーマン","育成","守備","練習試合"]
  }
];
