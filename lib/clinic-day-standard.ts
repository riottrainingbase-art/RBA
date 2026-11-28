export type ClinicDayBlock={time:string;title:string;detail:string;kind:"learn"|"break"|"parent"|"orientation"|"review"};
export const aichiDaySchedule:readonly ClinicDayBlock[]=[
 {time:"9:00–9:20",title:"オリエンテーション・ウォームアップ",detail:"安全確認、今日の目標、年代別のグループ分け。",kind:"orientation"},
 {time:"9:20–10:20",title:"ファンダメンタル",detail:"フットワーク、ボール操作、パス・シュートをゲームにつなげる。",kind:"learn"},
 {time:"10:20–10:35",title:"休憩・水分補給",detail:"体調確認。必要に応じて休憩を延長。",kind:"break"},
 {time:"10:35–11:20",title:"1対1・2対1",detail:"間合い、相手を見る、選択を変える。",kind:"learn"},
 {time:"11:20–12:00",title:"少人数ゲーム",detail:"少人数で判断の機会を増やし、全員が試す。",kind:"learn"},
 {time:"12:00–13:30",title:"昼食・休息（90分）",detail:"選手は食事と回復を優先し、90分を確保。午後のみ参加者の受付時間は別途案内。",kind:"break"},
 {time:"12:15–12:40",title:"保護者向けエクササイズ解説（任意）",detail:"自宅で取り入れやすい動作、姿勢・バランス、着地やウォームアップの意図を説明・実演。見学のみでも可。選手の休憩を妨げない。",kind:"parent"},
 {time:"13:30–13:50",title:"午後の再ウォームアップ",detail:"体調と目標を再確認。午後参加者も段階的に合流。",kind:"orientation"},
 {time:"13:50–14:35",title:"3対2・3対3",detail:"スペーシング、サポート、優位性の判断。",kind:"learn"},
 {time:"14:35–14:50",title:"休憩・水分補給",detail:"休息と体調確認。",kind:"break"},
 {time:"14:50–15:35",title:"4対4・ゲームへの接続",detail:"技術と判断を実戦で使う。",kind:"learn"},
 {time:"15:35–15:50",title:"休憩",detail:"休息と振り返り。",kind:"break"},
 {time:"15:50–16:40",title:"実践ゲーム",detail:"全員に出場・判断・失敗から学ぶ機会を設計。",kind:"learn"},
 {time:"16:40–17:00",title:"クールダウン・振り返り",detail:"今日の学びと、次の練習で試すことを整理。",kind:"review"},
];
export const clinicDeliveryStandard={
 player:"年齢・経験・人数・会場に応じたウォームアップ、技術と判断、少人数ゲーム、十分な休息、振り返り",
 parent:"長めの休憩中に保護者向けの任意参加の解説を計画。自宅での動きづくり、ウォームアップ、睡眠・休息の考え方。選手は休憩を継続。",
 short:"短時間のクリニックは選手の休憩を削らず、終了前後の別枠または資料で保護者向け説明を提供。",
 safety:"痛みや体調不良がある場合は無理に実施せず、必要に応じて医療専門職へ相談。診断・治療の代替ではない。",
} as const;

export const nikahoDaySchedule:readonly ClinicDayBlock[]=[
 {time:"13:30–13:45",title:"オリエンテーション・ウォームアップ",detail:"年代別に安全確認と準備。",kind:"orientation"},
 {time:"13:45–14:35",title:"技術と判断",detail:"フットワーク、ボール操作、1対1を実践。",kind:"learn"},
 {time:"14:35–14:55",title:"長めの休憩・水分補給",detail:"選手は休息を優先。必要に応じ延長。",kind:"break"},
 {time:"14:40–14:55",title:"保護者向け動きづくり解説（任意・調整中）",detail:"選手の休息中に説明・実演。短時間のため資料での提供に変更する場合あり。",kind:"parent"},
 {time:"14:55–15:10",title:"再ウォームアップ",detail:"体調を確認して段階的に再開。",kind:"orientation"},
 {time:"15:10–16:10",title:"少人数ゲーム",detail:"技術を判断・ゲームにつなげる。",kind:"learn"},
 {time:"16:10–16:30",title:"振り返り・クールダウン",detail:"今日の学びと次回試すことを整理。",kind:"review"},
];
