import {programmes} from "./programme-data";
export type Event={slug:string;area:string;title:string;date:string;venue:string;audience:string;fee:string;status:"planning"|"open"|"past";intro:string;focus:string[];note:string;url?:string};
export const events:Event[]=[
{slug:"iwate-kitakami-2026",area:"IWATE",title:"岩手・北上クリニック",date:"2026年12月19日・20日を中心に調整中",venue:"北上市周辺／未確定",audience:"U12・U15男女（予定）",fee:"未確定",status:"planning",intro:"練習でできることを、試合で使えるように。岩手県全域の選手に向けた地域クリニックを準備しています。",focus:["技術を実戦へ","相手を見て判断","1対1・2対2・3対3"],note:"日程・会場・料金・定員は未確定です。正式募集・決済は開始していません。"},
{slug:"yamagata-vol2-2027",area:"YAMAGATA",title:"山形クリニック Vol.2",date:"2027年1〜3月を中心に調整中",venue:"山形県内／未確定",audience:"U12・U15男女（予定）",fee:"未確定",status:"planning",intro:"10月の山形開催で生まれた学びを、次のプレーへ。年代・経験別の時間設定とゲーム形式を充実させます。",focus:["前回の学びを継続","年代別の指導","実戦で試す"],note:"前回の参加後アンケート10件は全て満足以上でした。全参加者の評価ではありません。次回の開催日は未確定です。"},
{slug:"hyogo-tatsuno-2026",area:"HYOGO",title:"兵庫・たつの育成キャンプ",date:"2026年11月21〜23日",venue:"兵庫県たつの市／詳細要確認",audience:"育成年代／参加条件は要確認",fee:"参加形態により異なります",status:"planning",intro:"宿泊だけではなく、日帰り・短時間での参加方法も検討できる育成キャンプ。",focus:["参加方法を選ぶ","技術と判断","ゲームで試す"],note:"会場・定員・料金・申込導線の最新情報を確認するまで、このページでは決済を案内しません。"},
{slug:"okinawa-camp-2026",area:"OKINAWA",title:"沖縄国際ユースキャンプ",date:"2026年12月22〜24日予定",venue:"沖縄県内／最終調整中",audience:"ユース選手／参加条件要確認",fee:"居住地・参加形態により異なります",status:"planning",intro:"国境を越えた学びを日常の成長へ。交流と育成をつなぐ国際プログラム。",focus:["国際交流","技術と判断","安心できる参加条件"],note:"会場・宿泊・スタッフ体制は最終調整中です。県民限定の決済リンクは県外参加者に適用されません。",url:"https://riotbasketballacademy.com/ja/events/okinawa-international-camp-2026/apply"},
{slug:"yamagata-20261024",area:"YAMAGATA",title:"山形クリニック｜開催記録",date:"2026年10月24日",venue:"ZAOたいらぐら／山形県上山市",audience:"育成年代の選手",fee:"受付終了",status:"past",intro:"技術を覚えるだけでなく、試し、考える時間を大切にした山形開催。",focus:["プッシュドリブル","ワンハンドパス","ゲームでの判断"],note:"参加後アンケート10件で「とても満足」9件、「満足」1件。回答者10件の結果です。"}
];
const programmePages:Event[]=programmes.filter(p=>p.id!=="torsten" && p.id!=="okinawa-december-camp" && p.id!=="yamagata").map(p=>({
 slug:"programme-"+p.id,area:p.region.toUpperCase(),title:p.title[1],date:p.date[1],venue:p.place[1],
 audience:p.audience[1],fee:p.price[1],
 status:(p.registrationClosed || (p.endDate||p.startDate)<"2026-10-27")?"past":p.id==="okinawa-nov14"?"planning":"open",
 intro:"Riot Basketball Academyの公式プログラム。対象・開催内容・参加方法を確認し、自分に合った学びの機会を選んでください。",
 focus:["技術を学ぶ","判断して実行","次のプレーへ"],
 note:"開催内容・募集状況・会場・料金・取消条件は、必ず既存の公式案内と照合してください。申込と決済、参加確定は別の段階です。",
 url:p.japaneseInfoPath||p.applicationUrl
}));
export const allClinicPages=[...events,...programmePages];
export const findEvent=(slug:string)=>allClinicPages.find(e=>e.slug===slug);