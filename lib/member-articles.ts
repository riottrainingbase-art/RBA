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
];
