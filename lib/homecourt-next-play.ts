export type NextPlayRole = "player" | "parent" | "coach";

export type NextPlayPlan = {
  id: string;
  role: NextPlayRole;
  concern: string;
  short: string;
  resultTitle: string;
  insight: string;
  steps: readonly [string, string, string];
  observe: string;
  doNot: string;
  reflection: string;
  articleSlug: string;
  safety?: string;
};

export const nextPlayRoleLabels: Record<NextPlayRole, string> = {
  player: "選手",
  parent: "保護者",
  coach: "指導者",
};

export const nextPlayPlans: readonly NextPlayPlan[] = [
  {
    id:"player-offball",role:"player",
    concern:"5対5になると、何をしたらいいか分からない",
    short:"ボールがない時の動き",
    resultTitle:"ボールがない5秒を、自分のプレーに変える。",
    insight:"まず「動くこと」だけを正解にしない。味方・相手・ゴールの関係を見て、動くか残るかを選ぶ。",
    steps:["2対2で味方がボールを持ったら、守備者とパスコースを見る。",
      "自分とボール保持者の間に守備が入ったら、パスが通る位置へ一歩動いてみる。",
      "次の練習で「動いた方が良かった場面」と「残った方が良かった場面」を1つずつ探す。"],
    observe:"自分がボールを触らなくても、味方の選択肢を増やせたか。",
    doNot:"正しい立ち位置を一つだけ暗記する必要はありません。",
    reflection:"その時、味方と守備者はどこにいた？",
    articleSlug:"player-disappears-in-five-on-five",
  },
  {
    id:"player-fear",role:"player",
    concern:"失敗が怖くて、試合で挑戦できない",
    short:"失敗と自信",
    resultTitle:"自信を待つより、安全な場で一つ試す。",
    insight:"結果より、本人が選べた行動を小さく増やしていく。無理に大胆なプレーを強制しない。",
    steps:["練習の前に、挑戦してみたいことを1つだけ決める。",
      "失敗しても続けられる練習や少人数ゲームで、自分で選んで一度試す。",
      "終わったら、成功・失敗と分けて「選べたこと」を言葉にする。"],
    observe:"試す前に周囲を見て、本人が選んで動けたか。",
    doNot:"シュートを外した理由を何度も責めたり、勇気がないと決めつけたりしない。",
    reflection:"次に同じ場面が来たら、何を試してみたい？",
    articleSlug:"player-after-two-mistakes",
  },
  {
    id:"player-practice-game",role:"player",
    concern:"練習ではできるのに、試合でできない",
    short:"練習を試合につなげる",
    resultTitle:"ドリルを繰り返す前に、相手のいる場面で試す。",
    insight:"練習の動きと試合の判断は同じではありません。守備がいる状況で「いつ使うか」を学ぶ。",
    steps:["ドリルでできる動きを1つ選び、どんな試合の場面で必要か考える。",
      "1対1や2対2で守備者をつけ、使う・使わないの両方を選べるようにする。",
      "次のゲームでは、成功回数より守備を見て使い分けた場面を振り返る。"],
    observe:"相手の動きによって、別の選択肢に切り替えられたか。",
    doNot:"試合で使えない理由を「練習不足」だけで片づけない。",
    reflection:"使えた場面と使わなかった場面はどう違った？",
    articleSlug:"player-first-five-minutes",
  },
  {
    id:"player-bench",role:"player",
    concern:"試合に出る時間が少なく、何をすればいいか分からない",
    short:"出場機会が少ない",
    resultTitle:"出場時間の価値を認めながら、次の一歩もつくる。",
    insight:"プレー機会の不足は、本人の努力だけで解決できる問題とは限りません。大人が機会を整える責任もあります。",
    steps:["まず「出られなくてどう感じたか」を自分の言葉で整理する。言葉にならなくてもよい。",
      "ベンチで、同じポジションの選手がどんな場面で動いたかを一つ観察する。",
      "コーチに聞くなら「次はどんな場面で試したらいいですか？」など具体的な一つを相談する。"],
    observe:"次に試せる具体的な機会があるか。無理に『ベンチも勉強』だけで済ませない。",
    doNot:"出られないことを本人の人格や努力不足と決めつけない。",
    reflection:"次にコートで試してみたいことは何？",
    articleSlug:"player-bench-time-is-not-empty-time",
  },
  {
    id:"parent-playtime",role:"parent",
    concern:"うちの子だけ試合に出られない",
    short:"出場時間・補欠",
    resultTitle:"「なぜ出ないの？」を「どんな経験を増やせる？」に変える。",
    insight:"出場機会は育成に直結します。保護者だけで答えを決めず、本人の気持ちと指導環境を分けて考えます。",
    steps:["お子さまに「今日はどう感じた？」と聞き、話したくなければ無理に聞き出さない。",
      "出場時間だけでなく、練習中に試せる機会、フィードバック、役割の固定を記録する。",
      "指導者へ確認する場合は「今後どんな機会や目標を設けられますか？」と事実を基に尋ねる。"],
    observe:"本人の楽しさ・成長の機会が継続してあるか。",
    doNot:"本人に代わって怒りをぶつけたり、出場時間だけで本人の価値を決めたりしない。",
    reflection:"お子さま自身は、どんな時間を増やしたいと感じている？",
    articleSlug:"parents-support-not-coach",
  },
  {
    id:"parent-sideline",role:"parent",
    concern:"試合後、どんな声をかけてよいか分からない",
    short:"試合後の声かけ",
    resultTitle:"試合後の5分を、もう一つの反省会にしない。",
    insight:"子どもが話したいことと、保護者が伝えたいことは違う場合があります。",
    steps:["帰り道は、まず水分・食事・休息など必要なことを整える。",
      "子どもが話したい時だけ「今日どうだった？」と一つ聞く。",
      "助言を求められた時は、本人の考えを先に聞いてから短く返す。"],
    observe:"大人が説明する時間より、本人が話す余白を確保できたか。",
    doNot:"試合直後に失敗プレーの一覧を読み上げない。",
    reflection:"今日、子どもが自分から話したかったのは何？",
    articleSlug:"game-day-car-conversation",
  },
  {
    id:"parent-coach",role:"parent",
    concern:"指導者の怒鳴り声や威圧が気になる",
    short:"安心・安全な環境",
    resultTitle:"勝敗より先に、安心してプレーできる環境を守る。",
    insight:"威圧や暴言を『強くなるために必要』と容認しません。事実と本人への影響を整理し、相談先を選ぶ。",
    steps:["本人の安全を優先し、つらさや不安を否定せずに聞く。深刻な危険がある場には無理に戻さない。",
      "起きた日時・発言・行動を、推測や個人の評価と分けて記録する。",
      "クラブの責任者・関係団体の相談窓口など、利害関係の少ない相手へ相談する。必要なら専門機関へ。"],
    observe:"子どもが不安を言えるか。相談後に安全が改善したか。",
    doNot:"被害を子ども本人の我慢不足にしたり、無断で本人の情報を公開したりしない。",
    reflection:"お子さまは安心して参加できている？",
    articleSlug:"when-coach-does-not-fit-child",
    safety:"差し迫った危険や暴力がある場合は、個別の練習課題より安全確保を優先してください。RBAは法的判断・診断を行う窓口ではありません。",
  },
  {
    id:"parent-load",role:"parent",
    concern:"練習や試合が多すぎないか心配",
    short:"練習量・疲労・休養",
    resultTitle:"追加練習より先に、一週間の総負荷を見る。",
    insight:"クラブ・学校・自主練を足した予定が必要です。休息は能力不足の証明ではありません。",
    steps:["直近7日間の練習、試合、移動、睡眠と休息日を一度並べる。",
      "お子さまの疲れ・痛み・気持ちを聞き、練習量を決める大人と情報を共有する。",
      "回復が追いつかない時は予定を調整し、痛みがある場合は適切な医療・専門家へ相談する。"],
    observe:"活動の数だけでなく、睡眠、疲労、痛み、本人の意欲の変化。",
    doNot:"強い痛みを単純に『成長痛』として続行しない。",
    reflection:"休みを含めた一週間になっている？",
    articleSlug:"child-wants-to-quit-basketball",
    safety:"痛みやしびれなどがある場合は運動を続けてよいと自己判断せず、専門家へ相談してください。",
  },
  {
    id:"coach-transfer",role:"coach",
    concern:"ドリルではできるが試合で使えない",
    short:"技術を試合へ",
    resultTitle:"ドリルの最後に、判断が必要なゲームを置く。",
    insight:"反復練習だけで試合への転移は保証できません。目的の判断が出る課題を設計する。",
    steps:["選手に使ってほしい一つのプレーを具体化する。",
      "2対2・3対3など守備者がいる練習に置き換え、条件を一つだけ調整する。",
      "ゲーム中に見えた判断を観察し、次の練習で制約を調整する。"],
    observe:"練習した動きを再現できたかではなく、いつ使うかを判断できたか。",
    doNot:"ドリルだけ増やして『ゲームで使わない選手が悪い』としない。",
    reflection:"選手が見て選んだ瞬間はどこだった？",
    articleSlug:"scrimmage-needs-a-learning-goal",
  },
  {
    id:"coach-quiet",role:"coach",
    concern:"選手が自分で判断しない・指示待ちになる",
    short:"主体性・判断",
    resultTitle:"コーチの答えを減らし、選手が選ぶ回数を増やす。",
    insight:"声かけの回数を増やすより、選択肢が生まれる練習条件と振り返りをつくる。",
    steps:["ゲームを止める前に、同じ判断が起きる場面を2〜3回観察する。",
      "必要に応じて「今、何が見えた？」と一問だけ聞く。",
      "次のプレーをすぐ試させ、選手の選び方が変わったかを見る。"],
    observe:"コーチの発言時間ではなく、選手の判断・試行の回数。",
    doNot:"質問攻めにしたり、すべてのプレーに正解を与えたりしない。",
    reflection:"止めずに任せた時、何が変わった？",
    articleSlug:"coach-observe-before-correct",
  },
  {
    id:"coach-wait",role:"coach",
    concern:"並ぶ時間が長く、全員が十分に動けない",
    short:"経験量・少人数練習",
    resultTitle:"一人ひとりのプレー回数を、練習の成果にする。",
    insight:"長い待機列は試す回数を減らします。体格差や安全を確認しつつ場を分けます。",
    steps:["一人の選手が5分間でプレーしている時間を観察する。",
      "安全な範囲で少人数グループや複数のコートに分ける。",
      "同じ選手のプレー時間と判断回数がどう変わったか比べる。"],
    observe:"全員に挑戦機会があるか。経験が一部選手に偏っていないか。",
    doNot:"練習を厳しく見せるために長い列を作らない。",
    reflection:"選手が実際に動いた時間を増やせた？",
    articleSlug:"practice-lines-reduce-learning-time",
  },
  {
    id:"coach-role",role:"coach",
    concern:"特定の選手だけに役割・出番が偏る",
    short:"役割固定・育成機会",
    resultTitle:"現在の戦力ではなく、育成の機会を設計する。",
    insight:"身長や今の実力だけで将来の役割を決めない。さまざまな判断経験を計画的に分配する。",
    steps:["一週間のゲームで、誰がどんな役割を経験したか記録する。",
      "安全な練習内で、異なるポジションや対人の判断を試す時間を設ける。",
      "結果より、経験した場面の種類と本人の気づきを振り返る。"],
    observe:"出場機会、役割、判断の経験が特定の選手に集中していないか。",
    doNot:"小学生時代の体格・得点だけで将来性を断定しない。",
    reflection:"来週、誰にどんな新しい経験を渡せる？",
    articleSlug:"stop-practice-less-often",
  },
];

export function isNextPlayRole(value: string): value is NextPlayRole {
  return value === "player" || value === "parent" || value === "coach";
}
export function nextPlayForRole(role: NextPlayRole) {
  return nextPlayPlans.filter(item => item.role === role);
}
export function getNextPlay(role: NextPlayRole, id: string): NextPlayPlan {
  return nextPlayPlans.find(item => item.role === role && item.id === id) || nextPlayForRole(role)[0];
}
