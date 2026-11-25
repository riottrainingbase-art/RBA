type Focus = { theme: string; action: string; evidence: string; slug: string };
type FocusRole = "player" | "parent" | "coach";
type FocusLocale = "ja" | "en" | "zh-tw" | "ko";
type Translation = readonly [theme: string, action: string, evidence: string];

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

// RBA's own short practice prompts, not translations of the protected library articles.
const translations: Record<Exclude<FocusLocale,"ja">, Record<FocusRole, readonly Translation[]>> = {
  en: {
    player: [
      ["Look before receiving", "Before receiving a pass at your next practice, check the defenders and available space.", "Recall one time you looked early and chose your next action."],
      ["Stay involved after passing", "After passing, move to find space your teammate can use.", "Recall a moment when your movement helped a teammate make their next decision."],
      ["Read the defender before driving", "Observe the defender's distance and foot orientation before choosing where to drive.", "Record one moment when you changed your choice in response to the defender."],
      ["The next play after a mistake", "After a missed shot, reset and participate in the next offensive or defensive play.", "Find one moment when you reset on your own after a mistake."],
    ],
    parent: [
      ["Talk after the game", "On the way home, ask whether your child wants to talk. If they do, ask what they enjoyed.", "Did they speak in their own words, and did you respect their choice not to talk?"],
      ["Understand playing opportunities", "Ask about your child's experiences and wishes as well as playing time. Sort out the facts.", "Explain the child's wishes separately from adult assumptions."],
      ["Support from the sideline", "During the game, hold back technical instructions and give your child time to make decisions.", "Recall one moment when you encouraged without giving instructions."],
      ["Choose the next opportunity together", "Find one activity that interests your child and check their wishes and schedule.", "Discuss together whether they want to participate."],
    ],
    coach: [
      ["Design practice from observation", "In the next small-sided game, choose one decision to observe and give players time to try it.", "Record one specific moment when a player made their own decision."],
      ["Change one constraint", "Change just one rule or the space in a small-sided game and observe how decisions change.", "Describe one difference in play before and after the change."],
      ["Substitutions and playing opportunities", "Before a practice game, check that every player has an opportunity and a learning goal.", "Reflect on whether each player had a chance to try their goal."],
      ["From video to next practice", "Pick one clip, ask players what they saw, and incorporate it into the next practice.", "Choose one task to try at the next practice based on the clip."],
    ],
  },
  "zh-tw": {
    player: [
      ["接球前先觀察", "下次練習接球之前，先確認防守位置與空檔。", "回想一次在接球前觀察並選擇下一步的情況。"],
      ["傳球後繼續參與", "傳球後移動，尋找隊友可以利用的空間。", "回想一次自己的移動讓隊友更容易做出下一個決定的情況。"],
      ["觀察防守再切入", "切入前觀察防守者的距離與腳步方向，再決定前進方向。", "記錄一次依據防守狀況改變選擇的情況。"],
      ["失誤後的下一個回合", "投籃未進後立即調整心態，投入下一個攻守回合。", "找出一次失誤後能自行調整的情況。"],
    ],
    parent: [
      ["賽後的對話", "回家途中先詢問孩子是否想聊天；如果願意，問他覺得什麼有趣。", "孩子是否能用自己的話表達？不想聊的選擇是否受到尊重？"],
      ["了解上場機會", "除了上場時間，也詢問孩子的經驗與意願，整理實際情況。", "能區分孩子的意願與成人的推測。"],
      ["場邊支持的方式", "觀賽時少給技術指示，讓孩子有時間自行判斷。", "回想一次沒有給指示也能為孩子加油的情況。"],
      ["一起選擇下一個機會", "找一個孩子有興趣的活動，確認他的意願與時間。", "能與孩子討論是否想參加。"],
    ],
    coach: [
      ["從觀察設計練習", "在下一次少人數對抗中選擇一個要觀察的決策，保留球員嘗試的時間。", "具體記錄一次球員自主做出選擇的情況。"],
      ["一次改變一個限制", "少人數對抗中只改變一項規則或場地空間，觀察球員選擇的改變。", "用自己的話說明改變前後的一個差異。"],
      ["輪替與上場機會", "練習賽前確認每位球員的上場機會與學習目標。", "回顧每位球員是否都有機會嘗試自己的目標。"],
      ["由影片連結下一次練習", "選一段影片，詢問球員看見了什麼，並用於下一次練習。", "根據影片決定下一次練習要嘗試的一個課題。"],
    ],
  },
  ko: {
    player: [
      ["공을 받기 전에 보기", "다음 훈련에서 패스를 받기 전에 수비수와 빈 공간을 확인한다.", "공을 받기 전에 보고 다음 행동을 선택한 장면 하나를 떠올린다."],
      ["패스 후에도 참여하기", "패스를 한 뒤 동료가 활용할 수 있는 공간을 찾아 움직인다.", "자신의 움직임으로 동료의 다음 선택이 쉬워진 장면을 돌아본다."],
      ["수비를 읽고 돌파하기", "돌파 전에 수비수와의 거리와 발 방향을 살피고 진행 방향을 정한다.", "수비에 따라 선택을 바꾼 장면 하나를 기록한다."],
      ["실수 후 다음 플레이", "슛이 빗나간 뒤에도 빠르게 마음을 정리하고 다음 공격이나 수비에 참여한다.", "실수 후 스스로 전환할 수 있었던 장면을 찾는다."],
    ],
    parent: [
      ["경기 후 대화", "귀갓길에 아이가 이야기하고 싶은지 먼저 확인하고, 원한다면 무엇이 즐거웠는지 묻는다.", "아이의 말로 표현할 기회와 이야기하지 않을 선택을 존중했는지 돌아본다."],
      ["출전 기회 이해하기", "출전 시간뿐 아니라 아이의 경험과 희망을 듣고 사실을 정리한다.", "아이의 희망과 어른의 추측을 구분해서 설명할 수 있다."],
      ["응원의 거리 조절", "관전 중 기술 지시를 줄이고 아이가 스스로 판단할 시간을 지켜본다.", "지시 없이 응원할 수 있었던 장면을 떠올린다."],
      ["다음 기회를 함께 선택하기", "아이가 관심 있는 활동을 하나 찾아 의사와 일정을 확인한다.", "참가 여부를 아이와 함께 이야기했다."],
    ],
    coach: [
      ["관찰로 훈련 설계하기", "다음 소인수 게임에서 관찰할 판단 하나를 선택하고 선수에게 시도할 시간을 준다.", "선수가 스스로 선택한 장면 하나를 구체적으로 기록한다."],
      ["제약 하나 바꾸기", "소인수 게임에서 공간이나 규칙을 하나만 바꾸고 선수들의 선택을 관찰한다.", "변경 전후 플레이의 차이 하나를 말로 설명한다."],
      ["교체와 출전 기회", "연습 경기 전에 모든 선수의 출전 기회와 학습 목표를 확인한다.", "각 선수가 자신의 목표를 시도할 기회가 있었는지 돌아본다."],
      ["영상에서 다음 훈련으로", "영상 장면 하나를 선택해 선수가 무엇을 보았는지 묻고 다음 훈련에 반영한다.", "영상에서 다음 훈련에 시도할 과제 하나를 정한다."],
    ],
  },
};

export function weeklyFocus(role: string, monday: string, locale: FocusLocale = "ja"): Focus {
  const focusRole = role === "coach" || role === "admin" ? "coach" : role === "parent" ? "parent" : "player";
  const choices = focuses[focusRole];
  const weeks = Math.floor((Date.parse(monday + "T00:00:00Z") - Date.UTC(2026,10,23)) / 604800000);
  const index = Number.isFinite(weeks) ? ((weeks % choices.length) + choices.length) % choices.length : 0;
  const original = choices[index];
  if (locale === "ja") return original;
  const [theme,action,evidence] = translations[locale][focusRole][index];
  return {theme,action,evidence,slug:original.slug};
}
