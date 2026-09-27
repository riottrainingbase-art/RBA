export type JournalLearningPathKey=
  |"players"|"parents"|"coaches"|"u12"|"u15"|"3x3"|"sc"|"girls"|"international"|"team-choice";

export type JournalLearningPath={
  key:JournalLearningPathKey;
  index:string;
  eyebrow:string;
  title:string;
  shortTitle:string;
  description:string;
  forWhom:string;
  homeHref:string;
  homeLabel:string;
  steps:{slug:string;label:string;focus:string}[];
  reflection:string[];
};

export const journalLearningPaths:JournalLearningPath[]=[
  {
    key:"players",index:"01",eyebrow:"PLAYER",
    title:"自分の試合を、自分で振り返れるようになる。",
    shortTitle:"選手自身で振り返る",
    description:"試合中に何を見るか、ミスのあとどう戻るか、ベンチで何をするか。選手本人が読める順番です。",
    forWhom:"選手",
    homeHref:"/ja/my-homecourt/players",homeLabel:"選手向けMY HOME COURT",
    steps:[
      {slug:"player-first-five-minutes",label:"まずここから",focus:"試合の入りで、結果より先に何を見るか。"},
      {slug:"player-bench-time-is-not-empty-time",label:"コートの外でも",focus:"ベンチ時間を次の出番の準備に変える。"},
      {slug:"player-after-two-mistakes",label:"ミスが続いたら",focus:"失敗を引きずらず、次の1プレーへ戻る。"},
      {slug:"player-disappears-in-five-on-five",label:"5on5で困ったら",focus:"ボールがない時間の位置とタイミングを見る。"},
      {slug:"player-watch-your-own-video",label:"試合後に",focus:"動画を失敗探しではなく、次の課題に使う。"},
      {slug:"player-how-to-ask-coach",label:"次の一歩",focus:"分からないことを具体的にコーチへ聞く。"}
    ],
    reflection:["今日、自分で気づけたことは何か。","次の練習で一つだけ変えるなら何か。","コーチに聞きたいことはあるか。"]
  },
  {
    key:"parents",index:"02",eyebrow:"PARENT",
    title:"保護者として、どこまで関わるかを考える。",
    shortTitle:"保護者の関わり方",
    description:"応援したい気持ちが強いほど、距離感は難しくなります。家庭でできることと、コーチへ任せることを整理します。",
    forWhom:"保護者",
    homeHref:"/ja/my-homecourt/families",homeLabel:"保護者向けMY HOME COURT",
    steps:[
      {slug:"parents-support-not-coach",label:"最初に",focus:"保護者の役割と、コーチの役割を分ける。"},
      {slug:"game-day-car-conversation",label:"試合の帰り道",focus:"車の中を毎回反省会にしない。"},
      {slug:"asking-coach-is-not-complaining",label:"分からない時",focus:"クレームではなく、状況を理解するために聞く。"},
      {slug:"when-coach-does-not-fit-child",label:"合わないと感じたら",focus:"我慢か退団かの二択にする前に、何が合わないか分ける。"},
      {slug:"child-wants-to-quit-basketball",label:"辞めたいと言われたら",focus:"競技そのものか、今の環境かを分ける。"},
      {slug:"how-to-choose-youth-team",label:"次の環境を考えるなら",focus:"強さだけでなく、その子が毎週どんな経験をするかを見る。"}
    ],
    reflection:["本人がいま困っていることは何か。","家庭で手を出しすぎている部分はないか。","コーチへ確認した方がいいことは何か。"]
  },
  {
    key:"coaches",index:"03",eyebrow:"COACH",
    title:"教えすぎず、学べる練習をつくる。",
    shortTitle:"指導と練習設計",
    description:"説明を増やす前に、選手が見て、考えて、試せる時間をどう残すか。指導者向けの基礎ルートです。",
    forWhom:"指導者",
    homeHref:"/ja/my-homecourt/coaches",homeLabel:"指導者向けMY HOME COURT",
    steps:[
      {slug:"coach-observe-before-correct",label:"まず観察する",focus:"一度のミスで答えを決めない。"},
      {slug:"stop-practice-less-often",label:"止めすぎない",focus:"全部をその場で直さず、プレーの流れを残す。"},
      {slug:"questions-are-not-always-better",label:"問いかけを使う",focus:"質問と直接指導を使い分ける。"},
      {slug:"practice-lines-reduce-learning-time",label:"活動量を見る",focus:"90分のうち、1人が実際に動く時間を考える。"},
      {slug:"scrimmage-needs-a-learning-goal",label:"ゲームへ戻す",focus:"練習試合を、学んだことを試す時間にする。"},
      {slug:"coach-video-ask-before-tell",label:"振り返る",focus:"映像で先に正解を言わず、選手の見え方を確認する。"}
    ],
    reflection:["今日の練習で、選手が自分で判断した時間はどれくらいあったか。","止めなくてもよかった場面はなかったか。","次回、一つだけ変えるなら何か。"]
  },
  {
    key:"u12",index:"04",eyebrow:"U12",
    title:"U12で、今勝つことと育てることを分けて考える。",
    shortTitle:"U12の育成",
    description:"ミニバスで結果を求めることと、将来使える力を残すことは同じではありません。U12で特に考えたい6本です。",
    forWhom:"U12選手・保護者・指導者",
    homeHref:"/ja/my-homecourt",homeLabel:"MY HOME COURT",
    steps:[
      {slug:"u12-win-is-not-the-future",label:"入口",focus:"小学生の勝敗と将来を同じものにしない。"},
      {slug:"protect-the-unfinished",label:"未完成を残す",focus:"U12で完成させすぎない意味を考える。"},
      {slug:"playing-time-is-experience",label:"経験を配る",focus:"出場時間を育成機会として見る。"},
      {slug:"why-man-to-man-first",label:"守備の土台",focus:"マンツーマンを通して何を学ばせるか。"},
      {slug:"screens-before-reading",label:"戦術の前に",focus:"スクリーンより先に見る・判断する力を確認する。"},
      {slug:"dont-fix-positions-too-early",label:"役割を固定しない",focus:"今の体格だけで将来の役割を決めない。"}
    ],
    reflection:["今の勝ち方で、どんな経験が増えているか。","逆に減っている経験はないか。","数年後にも残したい力は何か。"]
  },
  {
    key:"u15",index:"05",eyebrow:"U15",
    title:"U15の進路と環境を、制度から整理する。",
    shortTitle:"U15進路・登録",
    description:"部活、クラブ、Bユース。雰囲気だけでなく、登録・大会・生活・出場機会まで含めて考えます。",
    forWhom:"中学生・保護者",
    homeHref:"/ja/my-homecourt/families",homeLabel:"保護者向けMY HOME COURT",
    steps:[
      {slug:"u15-school-or-club-2026",label:"全体を整理",focus:"部活とクラブを、活動と登録に分けて考える。"},
      {slug:"u15-registration-before-joining",label:"登録を確認",focus:"入会前にJBA登録先と大会参加を確認する。"},
      {slug:"b-youth-vs-u15-club-2026",label:"環境を比べる",focus:"BユースとU15クラブを上下ではなく違いで見る。"},
      {slug:"u15-team-comparison-checklist",label:"候補を比較",focus:"戦績以外の条件を同じ基準で比べる。"},
      {slug:"u15-transfer-rules-2026",label:"移籍を考える",focus:"年度途中の移籍と大会要件を確認する。"},
      {slug:"u15-club-and-school-practice",label:"生活まで見る",focus:"部活・クラブ・スクールを足した総負荷を考える。"}
    ],
    reflection:["本人が3年間で一番経験したいことは何か。","登録・大会の条件は確認できているか。","通学・睡眠・学業まで含めて続けられるか。"]
  },
  {
    key:"3x3",index:"06",eyebrow:"3X3",
    title:"3x3を、判断を育てる場として使う。",
    shortTitle:"3x3と判断",
    description:"人数が少ないからこそ、全員が攻守に関わります。イベントとしてではなく、育成にどう使うかを順番に読みます。",
    forWhom:"選手・指導者",
    homeHref:"/ja/my-homecourt/coaches",homeLabel:"指導者向けMY HOME COURT",
    steps:[
      {slug:"why-3x3-helps-development",label:"まず意味を知る",focus:"3x3でなぜ判断回数が増えるのか。"},
      {slug:"small-sided-games",label:"少人数で学ぶ",focus:"少人数ゲームを練習にどう使うか。"},
      {slug:"decision-making-needs-problems",label:"判断を作る",focus:"説明より、解くべき問題を練習に置く。"},
      {slug:"three-on-three-is-not-small-five-on-five",label:"3x3らしく使う",focus:"5on5の役割固定をそのまま持ち込まない。"},
      {slug:"coach-3x3-substitution-player-led",label:"ゲームを任せる",focus:"交代も選手の判断経験にする。"},
      {slug:"turnover-next-three-seconds",label:"攻守をつなぐ",focus:"ターンオーバー直後の判断まで見る。"}
    ],
    reflection:["3人全員が攻守に関われているか。","コーチが答えを出しすぎていないか。","5on5へ持ち帰れる学びは何か。"]
  },
  {
    key:"sc",index:"07",eyebrow:"S&C",
    title:"S&Cを、罰や根性と分けて考える。",
    shortTitle:"S&C・負荷・安全",
    description:"体力づくりは、ただ走らせることではありません。成長期の身体とバスケットの負荷をどう見るか、基礎から整理します。",
    forWhom:"指導者・保護者",
    homeHref:"/ja/my-homecourt/coaches",homeLabel:"指導者向けMY HOME COURT",
    steps:[
      {slug:"warmup-is-part-of-coaching",label:"アップから",focus:"ウォームアップを本練習と切り離さない。"},
      {slug:"strength-training-for-kids",label:"筋力を考える",focus:"小学生の筋力トレーニングを年齢だけで否定しない。"},
      {slug:"plyometrics-youth-basketball",label:"ジャンプを扱う",focus:"量ではなく、着地と質を見る。"},
      {slug:"training-load-is-not-one-number",label:"負荷をみる",focus:"練習時間だけで負荷を決めない。"},
      {slug:"punishment-running-is-not-conditioning",label:"罰走と分ける",focus:"コンディショニングの目的を明確にする。"},
      {slug:"coach-growth-spurt-adjust-load",label:"成長期をみる",focus:"急な成長期に全員同じ負荷をかけない。"}
    ],
    reflection:["このトレーニングは何を良くしたいのか。","バスケット練習を含めた総負荷はどうか。","痛みや疲労を言える環境になっているか。"]
  },
  {
    key:"girls",index:"08",eyebrow:"GIRLS / HEALTH",
    title:"女子選手の身体づくりと安全を、特別扱いしすぎず丁寧に考える。",
    shortTitle:"女子選手・身体づくり",
    description:"女子だから弱くする、ではありません。筋力、膝の健康、成長、痛み、復帰を根拠と一緒に整理します。",
    forWhom:"女子選手・保護者・指導者",
    homeHref:"/ja/my-homecourt",homeLabel:"MY HOME COURT",
    steps:[
      {slug:"girls-strength-and-knee-health",label:"筋力から",focus:"女子選手から筋力トレーニングを遠ざけない。"},
      {slug:"acl-prevention-is-a-program",label:"予防を考える",focus:"ACL予防を単発メニューにしない。"},
      {slug:"knee-pain-is-not-just-growing-pain",label:"痛みを軽く見ない",focus:"膝痛を全部『成長痛』で終わらせない。"},
      {slug:"coach-create-pain-reporting-culture",label:"言える環境を作る",focus:"痛みを隠さず伝えられるチームにする。"},
      {slug:"return-to-play-is-a-process",label:"復帰を急がない",focus:"大会日程ではなく段階で戻る。"},
      {slug:"coach-role-return-to-play",label:"役割を分ける",focus:"復帰判断をコーチだけで抱えない。"}
    ],
    reflection:["痛みを我慢することが評価されていないか。","筋力・着地・負荷を日常的に見ているか。","復帰判断を誰と共有するか決まっているか。"]
  },
  {
    key:"international",index:"09",eyebrow:"INTERNATIONAL",
    title:"海外から、ドリルではなく考え方を持ち帰る。",
    shortTitle:"海外・国際交流",
    description:"海外へ行くこと自体を目的にせず、何を見るか、どう持ち帰るか。RBAが国際交流で大切にしている順番です。",
    forWhom:"選手・保護者・指導者",
    homeHref:"/ja/international",homeLabel:"RBA INTERNATIONAL",
    steps:[
      {slug:"japan-vs-world-development",label:"違いを知る",focus:"日本と海外を単純な優劣で比べない。"},
      {slug:"dont-copy-europe-to-japan",label:"コピーしない",focus:"制度も文化も違う前提で考える。"},
      {slug:"what-to-observe-abroad",label:"何を見るか",focus:"ドリルより、練習環境とコーチの介入を見る。"},
      {slug:"bring-principles-home-not-drills",label:"持ち帰る",focus:"形ではなく原則を自分の現場へ戻す。"},
      {slug:"overseas-trip-is-not-status",label:"遠征後を見る",focus:"『行ったこと』を肩書にしない。"},
      {slug:"international-exchange-not-only-for-elite",label:"広げる",focus:"海外交流を強豪だけの経験にしない。"}
    ],
    reflection:["海外で何を見るのか言葉にできているか。","帰国後に一つ変えるなら何か。","日本の環境に合わせて使える部分はどこか。"]
  },
  {
    key:"team-choice",index:"10",eyebrow:"TEAM CHOICE",
    title:"チーム選びで、戦績以外を見る。",
    shortTitle:"チーム選び・移籍",
    description:"強い、近い、有名。どれも大切な情報ですが、それだけでは毎日の育成環境は分かりません。入会前から移籍まで順番に整理します。",
    forWhom:"保護者・選手",
    homeHref:"/ja/my-homecourt/families",homeLabel:"保護者向けMY HOME COURT",
    steps:[
      {slug:"trial-session-what-to-watch",label:"体験会で",focus:"上手い選手のプレー以外に何を見るか。"},
      {slug:"questions-before-joining-team",label:"入会前に聞く",focus:"コーチへ確認していいことを整理する。"},
      {slug:"team-rules-before-payment",label:"規約を見る",focus:"入会金を払う前に確認する。"},
      {slug:"team-costs-look-at-annual-total",label:"費用を見る",focus:"月謝ではなく年間総額で比べる。"},
      {slug:"strong-school-myth",label:"強さを見直す",focus:"強豪へ行けば自動的に伸びるわけではない。"},
      {slug:"when-to-change-teams",label:"移籍を考える",focus:"環境を変えることを『逃げ』だけで片づけない。"}
    ],
    reflection:["本人が毎週どんな経験をする環境か。","出場機会・指導・生活・費用を同じ基準で比べたか。","この環境を選ぶ理由を本人も説明できるか。"]
  }
];

export const journalLearningPathMap=Object.fromEntries(
  journalLearningPaths.map(path=>[path.key,path])
) as Record<JournalLearningPathKey,JournalLearningPath>;

export function getJournalLearningPath(key:string){
  return journalLearningPaths.find(path=>path.key===key)??null;
}
