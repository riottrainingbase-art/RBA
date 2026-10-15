export type ResearchEntry = {
 slug:string; number:string; topic:string; title:string; author:string; year:string; kind:string; citation:string; url:string;
 question:string; summary:string[]; findings:string[]; limits:string[]; practice:string[]; check:string[]; next:string;
};
export const researchEntries:ResearchEntry[]=[
{
slug:"youth-athlete-development",number:"01",topic:"発達・長期育成",title:"子どもの成長を、年齢だけで決めない",author:"Bergeron ほか",year:"2015",kind:"IOC専門家合意声明",
citation:"Bergeron, M. F., et al. (2015). International Olympic Committee consensus statement on youth athletic development. British Journal of Sports Medicine, 49(13), 843–851. DOI: 10.1136/bjsports-2015-094962",
url:"https://doi.org/10.1136/bjsports-2015-094962",
question:"同じ学年の選手に、同じ練習と同じ負荷を与えてよいのか。",
summary:["この声明は、若年選手の健康、持続可能な競技参加、発達の個人差を考慮した育成の原則を示しています。","特定のバスケットボール練習を比較した実験ではなく、幅広い研究と専門家の検討に基づく提言です。"],
findings:["成長・成熟の個人差を踏まえ、健康と継続的な参加を重視する。","競技成績だけでなく、楽しさや幅広い参加機会も育成環境の一部として考える。"],
limits:["U8・U10・U12・U15ごとの唯一の練習順序を示した研究ではありません。","特定のドリルが別のドリルより優れていることを直接証明したものではありません。"],
practice:["同じU12でも、競技歴や身体の成長に応じて課題の難しさを調整する。","練習後に技術面だけでなく、参加意欲、疲労、痛みの有無を確かめる。"],
check:["選手の発達や経験の違いを、練習内容に反映できているか。","早く成長した選手だけに重要な役割が集中していないか。"],
next:"development"
},
{
slug:"youth-physical-development",number:"02",topic:"S&C・成熟",title:"成長期の身体づくりを、暦年齢だけで考えない",author:"Lloyd & Oliver",year:"2012",kind:"理論モデルの提案",
citation:"Lloyd, R. S., & Oliver, J. L. (2012). The youth physical development model: A new approach to long-term athletic development. Strength and Conditioning Journal, 34(3), 61–72. DOI: 10.1519/SSC.0b013e31825760ea",
url:"https://doi.org/10.1519/SSC.0b013e31825760ea",
question:"成長期の選手に、いつ、どのような身体的な課題を用意するべきか。",
summary:["若年アスリートの身体能力を長期的に育てるためのモデルを提示した論文です。暦年齢だけで練習方法を分類することの限界を論じています。","指導モデルを示した資料であり、すべての年齢層で特定メニューの効果を比較した介入研究ではありません。"],
findings:["身体能力の発達を、年齢だけでなく成熟や個人差も踏まえて考える枠組みを提示した。","筋力や基本的な動作の習得を、長期的な育成の中に位置づけている。"],
limits:["モデルに記載された発達時期が、すべての子どもに当てはまるわけではありません。","論文を根拠に、個別の負荷量や競技復帰の可否を決めることはできません。"],
practice:["ジャンプ、着地、停止、方向転換などの動作を観察し、無理のない課題から始める。","トレーニング量は競技練習や学校活動も含めて調整する。"],
check:["技術の上達だけでなく、動作の安定性を確認しているか。","成長や疲労の変化に合わせて負荷を見直しているか。"],
next:"physical"
},
{
slug:"constraints-led-coaching",number:"03",topic:"判断・練習設計",title:"判断する力を育てるために、練習の条件を変える",author:"Renshaw ほか",year:"2019",kind:"指導理論書",
citation:"Renshaw, I., Davids, K., Newcombe, D., & Roberts, W. (2019). The Constraints-Led Approach: Principles for Sports Coaching and Practice Design. Routledge. DOI: 10.4324/9781315102351",
url:"https://doi.org/10.4324/9781315102351",
question:"選手に答えを教えるだけでなく、自分で選べる場面をどうつくるか。",
summary:["選手、課題、環境の条件を調整して、選手が状況に応じて動きを学ぶための理論書です。","ゴルフ、陸上、ホッケーなどの実践例を含みますが、バスケットボールの2対1を検証した特定の介入研究ではありません。"],
findings:["練習の条件を工夫して、選手が情報を捉え、行動を選ぶ場面をつくる考え方を説明している。","指導者がすべての動きを指示するのではなく、学びが生まれる環境を設計する視点を示す。"],
limits:["理論書を引用するだけでは、特定のドリルの効果を証明できません。","すべての状況で説明や技術練習が不要になるという意味ではありません。"],
practice:["2対1で守備者の開始位置を変え、パスとドライブの選択がどう変わるか観察する。","一度に人数、時間、スペースをすべて変えず、狙いに合わせて条件を選ぶ。"],
check:["練習中に選手自身が選択する必要があるか。","課題を変えたことで、観察したい行動が実際に増えたか。"],
next:"decision"
},
{
slug:"game-performance-assessment",number:"04",topic:"成長評価",title:"シュートの成否と、判断の良し悪しを分けて見る",author:"Oslin, Mitchell & Griffin",year:"1998",kind:"評価方法の開発・初期検証",
citation:"Oslin, J. L., Mitchell, S. A., & Griffin, L. L. (1998). The Game Performance Assessment Instrument (GPAI): Development and Preliminary Validation. Journal of Teaching in Physical Education, 17(2), 231–243. DOI: 10.1123/jtpe.17.2.231",
url:"https://doi.org/10.1123/jtpe.17.2.231",
question:"得点や勝敗以外に、ゲーム中の成長をどう確かめるか。",
summary:["GPAIは、試合中の判断、技術の実行、サポートなどを区別して捉えるための評価方法です。","原著では、学校体育の授業を含む複数のゲーム類型で妥当性と信頼性の初期検証が行われています。"],
findings:["プレーの成否だけでなく、意思決定やサポートなどの行動を評価する枠組みを提示した。","評価項目を明確に定義し、観察者が何を数えるかをそろえる重要性を示している。"],
limits:["RBA独自の簡易観察表が、そのままGPAIの正式尺度になるわけではありません。","短時間の観察結果だけで、選手の能力全体を決めつけることはできません。"],
practice:["2対1の判断とパスの成功を別々に記録する。","指導者同士で『適切な判断』の具体例を共有し、評価のばらつきを確かめる。"],
check:["失敗したプレーにも、適切な判断が含まれていなかったか。","次の練習を決めるための記録になっているか。"],
next:"assessment"
},
{
slug:"small-sided-games-evidence",number:"05",topic:"少人数ゲーム",title:"少人数ゲームの研究から、何が分かるのか",author:"Clemente ほか",year:"2021",kind:"系統的レビュー・メタ分析",
citation:"Clemente, F. M., et al. (2021). Effects of Small-Sided Game Interventions on the Technical Execution and Tactical Behaviors of Young and Youth Team Sports Players: A Systematic Review and Meta-Analysis. Frontiers in Psychology, 12, 667041. DOI: 10.3389/fpsyg.2021.667041",
url:"https://doi.org/10.3389/fpsyg.2021.667041",
question:"2対2や3対3を行えば、判断力も必ず伸びるのか。",
summary:["若年チームスポーツ選手の少人数ゲームを用いた介入研究を整理した系統的レビューとメタ分析です。","803件の検索結果から6研究が採択され、技術実行への効果が検討されました。"],
findings:["対照群と比較した技術実行には小〜中程度の改善が報告された（効果量0.59、95%信頼区間0.29〜0.89）。","採択された6研究に、戦術行動を評価した研究は含まれていませんでした。"],
limits:["このレビューだけで『少人数ゲームで戦術判断が改善する』とは言えません。","研究対象の競技や条件が異なるため、バスケットボールの全ての年代に同じ効果があるとは限りません。"],
practice:["3対3を導入する際は、参加回数や技術の成功だけでなく、狙った判断が生まれたかを別に観察する。","守備の人数やスペースを調整し、選手が同じ答えを繰り返すだけの練習にならないようにする。"],
check:["何を改善したいのか、観察項目が決まっているか。","技術の実行と戦術判断を混同していないか。"],
next:"decision"
},
{
slug:"training-load-and-injury",number:"06",topic:"負荷・傷害予防",title:"練習量を増やす前に、選手の負担を把握する",author:"Soligard ほか",year:"2016",kind:"IOC専門家合意声明",
citation:"Soligard, T., et al. (2016). How much is too much? (Part 1) International Olympic Committee consensus statement on load in sport and risk of injury. British Journal of Sports Medicine, 50(17), 1030–1041. DOI: 10.1136/bjsports-2016-096581",
url:"https://doi.org/10.1136/bjsports-2016-096581",
question:"練習や試合の負荷を、時間だけで管理してよいのか。",
summary:["スポーツにおける負荷と傷害リスクの関係を整理したIOCの合意声明です。練習や試合の量だけでなく、急激な変化、試合日程の過密さ、心理的負担、移動なども扱います。","エリートスポーツを含む幅広い研究と専門家の推奨をまとめたもので、U12バスケットボールの最適な練習時間を示したものではありません。"],
findings:["練習・試合負荷の管理不良は、傷害リスクを考えるうえで重要な問題である。","競技負荷に加えて、健康状態や疲労、心理的負担などの観察を提案している。"],
limits:["特定の数値を超えると必ず傷害が起きる、という単純な閾値は示していません。","一般的な合意声明を、個別の医療判断や復帰許可の代わりにはできません。"],
practice:["週ごとの練習時間、試合数、他団体での活動、疲労感、痛みを継続して確認する。","急に試合が増える週は、練習内容や休息の取り方を見直す。"],
check:["他チームや学校での活動も把握しているか。","痛みを訴えやすい雰囲気をつくっているか。"],
next:"physical"
},
{
slug:"practice-and-play",number:"07",topic:"遊び・競技経験",title:"遊びと練習は、育成の中でどう関わるか",author:"Côté, Baker & Abernethy",year:"2007",kind:"学術書の章・研究の整理",
citation:"Côté, J., Baker, J., & Abernethy, B. (2007). Practice and Play in the Development of Sport Expertise. In Handbook of Sport Psychology (3rd ed.). Wiley. DOI: 10.1002/9781118270011.ch8",
url:"https://doi.org/10.1002/9781118270011.ch8",
question:"決められた反復練習と、自分で工夫する遊びはどう組み合わせればよいのか。",
summary:["スポーツの専門的な技能の発達において、練習と遊びが果たす役割を整理した学術書の章です。","初期のスポーツ経験、自由度のある活動、専門化などを考えるための研究上の枠組みを紹介しています。"],
findings:["技能の発達を、形式的な練習だけでなく遊びや多様なスポーツ経験との関係から捉える。","早期の活動経験を考える際に、楽しさや自主的な関わりも重要な論点になる。"],
limits:["この章だけで、特定の年齢から専門化すべきかどうかを一律に決めることはできません。","バスケットボールの最適な練習時間や試合数を直接検証した資料ではありません。"],
practice:["低学年ではルールを少し変えたゲームや、自分で解決方法を探す活動を取り入れる。","学年が上がっても、選手が選択し工夫できる時間を残す。"],
check:["選手が自分から挑戦する機会があるか。","練習の目的を保ちながら、自由に試せる時間を用意しているか。"],
next:"development"
}
];
export const researchBySlug=(slug:string)=>researchEntries.find(entry=>entry.slug===slug);
