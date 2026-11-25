type Focus = { theme: string; action: string; evidence: string; slug: string };

const focuses: Record<"player" | "parent" | "coach", Focus[]> = {
  player: [
    {theme:"受ける前に見る",action:"次の練習でパスを受ける直前に守備と空いている場所を確認する。",evidence:"受ける前に見て、次の行動を選べた場面を一つ思い出す。",slug:"scan-before-receive"},
    {theme:"パスの後も関わる",action:"パスを出した後、味方が使えるスペースを探して動く。",evidence:"味方が次のプレーを選びやすくなった場面を振り返る。",slug:"play-after-pass"},
    {theme:"守備を見てドライブする",action:"ドライブ前に守備の距離と足の向きを観察し、進む方向を選ぶ。",evidence:"守備に応じて選択を変えた場面を一つ記録する。",slug:"drive-read-defender"},
    {theme:"ミスの次のプレー",action:"シュートを外した後もすぐ切り替え、次の攻守に参加する。",evidence:"ミスの後に自分で切り替えられた場面を見つける。",slug:"missed-shot-next-play"},
  ],
  parent: [
    {theme:"試合後の会話",action:"帰り道で本人が話したいか確認し、話す場合は何が楽しかったか聞く。",evidence:"本人が自分の言葉で話せたか、話さない選択も尊重できたか。",slug:"after-game-conversation"},
    {theme:"出場機会を整理する",action:"出場時間だけでなく本人の経験や希望を聞き、事実を整理する。",evidence:"本人の希望と大人の推測を分けて説明できる。",slug:"when-playing-time-is-low"},
    {theme:"応援の距離感",action:"観戦中は技術指示を控え、本人が判断する時間を見守る。",evidence:"指示せずに応援できた場面を振り返る。",slug:"sideline-parent-coaching"},
    {theme:"次の機会を一緒に選ぶ",action:"本人が興味を持つ活動を一つ探し、本人の意思と日程を確認する。",evidence:"参加するかどうかを本人と話し合えた。",slug:"choose-next-opportunity"},
  ],
  coach: [
    {theme:"観察から練習を設計する",action:"次の少人数ゲームで観察したい判断を一つ選び、選手が試す時間を確保する。",evidence:"選手が自分で選択した場面を具体的に一つ記録する。",slug:"one-question-practice-design"},
    {theme:"制約を一つ変える",action:"少人数ゲームの広さやルールを一つだけ変更し、選手の選択の変化を見る。",evidence:"変更前後のプレーの違いを一つ言語化できる。",slug:"coach-one-constraint-at-a-time"},
    {theme:"交代と出場機会",action:"練習ゲームで全員の出場機会と学習目標を事前に確認する。",evidence:"出場した選手それぞれに試す機会があったか振り返る。",slug:"coach-playing-time-review"},
    {theme:"映像から次の練習へ",action:"一つの映像場面を選び、選手が何を見たか聞いて次回の練習に反映する。",evidence:"映像から次の練習で試す課題を一つ決める。",slug:"coach-video-one-clip"},
  ],
};

export function weeklyFocus(role: string, monday: string): Focus {
  const choices = focuses[role === "coach" || role === "admin" ? "coach" : role === "parent" ? "parent" : "player"];
  const weeks = Math.floor((Date.parse(monday + "T00:00:00Z") - Date.UTC(2026,10,23)) / 604800000);
  return choices[((weeks % choices.length) + choices.length) % choices.length];
}
