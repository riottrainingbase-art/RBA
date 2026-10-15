// RBA JOURNAL: editorial topic index.
// One primary topic per article for predictable browsing. The existing
// category (article type) and audience are preserved independently.
export type TopicKey="philosophy"|"skills"|"practice"|"games"|"physical"|"family"|"rules"|"world"|"activities";
export type TopicArticle={title:string;standfirst:string;category:string;slug?:string};
export const JOURNAL_TOPICS=[
 {key:"philosophy",title:"育成理念・発達",description:"勝利と育成、発達の個人差、選手の主体性と成長"},
 {key:"skills",title:"技術・判断",description:"ドリブル、パス、シュート、1対1、状況判断"},
 {key:"practice",title:"練習設計・指導法",description:"メニューの組み立て方、問いかけ、評価と振り返り"},
 {key:"games",title:"試合・出場機会",description:"選手起用、試合経験、ゲーム中のコーチング"},
 {key:"physical",title:"身体づくり・安全",description:"S&C、負荷管理、傷害予防、休息と競技復帰"},
 {key:"family",title:"保護者・チーム選び",description:"家庭での関わり、クラブ選び、移籍と相談"},
 {key:"rules",title:"ルール・制度",description:"競技規則、登録、大会制度、育成の仕組み"},
 {key:"world",title:"海外育成・国際交流",description:"各国の育成制度、国際交流、海外での実践"},
 {key:"activities",title:"RBA活動・実践資料",description:"クリニック、キャンプ、活動記録、資料・書式"}
] as const satisfies ReadonlyArray<{key:TopicKey;title:string;description:string}>;
const patterns:Record<TopicKey,ReadonlyArray<{re:RegExp;weight:number}>>={
 philosophy:[
  {re:/育成理念|育成の目的|長期育成|育成環境|発達段階|成長の個人差|主体性|序列|早期専門化|才能|キャプテン|公平|育成とは|学習環境/,weight:11},
  {re:/成長|育成|将来|価値|文化|自信|関係性|選手の経験/,weight:2}
 ],
 skills:[
  {re:/オフボール|速攻|レーン|ターンオーバー|ボールを持っていない|1人抜いた|抜いたあと|抜いた後|抜くところ|ドリブル|シュート|パス|キャッチ|ピボット|フィニッシュ|ディフェンス|リバウンド|1on1|1対1|スペーシング|ヘルプ|スクリーン|ハンドオフ|ボール操作|トランジション|状況判断|スキャン|フットワーク|ショット|攻撃|守備|間合い/,weight:9},
  {re:/見る|認知|技術|技能|判断|動作|動き|選択/,weight:3}
 ],
 practice:[
  {re:/練習計画|年間計画|週間計画|練習設計|指導計画|ゲームベース|制約主導|フィードバック|振り返り|コーチング|コーチ教育|声かけ|問いかけ|指導者教育|練習メニュー|指導の質|指導方法/,weight:12},
  {re:/練習|コーチ|指導|メニュー|教え|質問|学習|メソッド/,weight:4}
 ],
 games:[
  {re:/出場時間|出場機会|起用|出番|ベンチ|交代|スタメン|大差|B戦|タイムアウト|大会出場|試合運営|ゲームコーチング|ローテーション/,weight:13},
  {re:/試合|ゲーム|勝利|勝敗|プレータイム|競争|選抜|大会/,weight:5}
 ],
 physical:[
  {re:/ACL|膝|腰|足首|オスグッド|脳震盪|怪我|ケガ|けがをした|けがから|けがの|傷害|障害|痛み|筋力|筋トレ|S&C|ストレングス|オーバーユース|オーバートレーニング|バーンアウト|休養|回復|負荷管理|熱中症|熱中症|コンディショニング|睡眠|成長期の身体|身体づくり|ラダー/,weight:14},
  {re:/疲労|健康|体力|負荷|安全|ウェイト|運動|ウォームアップ|復帰/,weight:6}
 ],
 family:[
  {re:/保護者|親の|親が|親子|家庭|チーム選び|入会|移籍|退団|辞め|子どもへの声|指導者への相談|コーチへ相談|応援席|会費|チームを変/,weight:14},
  {re:/相談|所属|役割|本人の言葉|居場所|支え方/,weight:3}
 ],
 rules:[
  {re:/競技規則|大会要項|大会規定|登録規定|登録制度|JBA|FIBA|WABC|ゾーン禁止|ルール改定|コーチライセンス|制度|都道府県監査|協会|スポ少|スポーツ少年団|審判|ミニバスのルール|マンツーマンのルール/,weight:12},
  {re:/ルール|規程|通達|登録|移籍手続|大会|県協会/,weight:4}
 ],
 world:[
  {re:/台湾|韓国|マレーシア|ドイツ|スペイン|フランス|フィンランド|ラトビア|セルビア|スロベニア|カナダ|アメリカ|オーストラリア|イギリス|イングランド|ベルギー|オランダ|ニュージーランド|海外|国際|世界|アジア|欧州|ヨーロッパ|留学|遠征/,weight:13},
  {re:/海外交流|海外育成|国際交流|世界比較|国外/,weight:11}
 ],
 activities:[
  {re:/出版|書籍|新刊|クリニック|キャンプ|CAMP|イベント|開催予定|活動報告|遠征レポート|参加レポート|スクール|講習会|無料書式|共通書式|配布|募集|スポンサー|協賛|公式資料|申込|振り返りシート|日程案内|活動記録/,weight:12},
  {re:/企画|体験会|交流会|オンライン|チーム活動|RBA UNITED|トライアル|発信/,weight:4}
 ]
};
const defaultByCategory:Record<string,TopicKey>={development:"philosophy",coaching:"practice",families:"family",international:"world",programme:"activities"};
// Title receives more weight than description. Broad hints must not override
// clear signals such as ACL, playing-time, or transfer.
export function getJournalTopic(article:TopicArticle):TopicKey{
 const title=(article.title||"").normalize("NFKC");
 const context=`${article.standfirst||""} ${article.slug||""}`.normalize("NFKC");
 const fallback=defaultByCategory[article.category]||"philosophy";
 const scores=Object.fromEntries(JOURNAL_TOPICS.map(t=>[t.key,t.key===fallback?8:0])) as Record<TopicKey,number>;
 for(const topic of JOURNAL_TOPICS){
  for(const {re,weight} of patterns[topic.key]){
   if(re.test(title))scores[topic.key]+=weight;
   else if(re.test(context))scores[topic.key]+=Math.max(1,Math.floor(weight/3));
  }
 }
 // Strong safety and direct family signals take precedence over generic phrasing.
 if(/ACL|脳震盪|オスグッド|オーバーユース|熱中症|膝の|怪我|ケガ|傷害|痛み|バーンアウト/.test(title))scores.physical+=15;
 if(/JBA|FIBA|登録制度|競技規則|コーチライセンス|都道府県|ゾーンディフェンス|スポーツ少年団|登録規定/.test(title))scores.rules+=10;
 if(/^(ドイツ|スペイン|フィンランド|フランス|ベルギー|カナダ|イングランド|スロベニア|ラトビア|ニュージーランド|アメリカ|世界)/.test(title))scores.world+=10;
 if(/出版|書籍|新刊/.test(title))scores.activities+=19;
 if(/保護者|親子|移籍|退団|チーム選び|入会/.test(title))scores.family+=10;
 if(/出場時間|出場機会|プレータイム|ベンチ|スタメン|選手起用/.test(title))scores.games+=12;
 if(/(日本|世界|海外|他国).*(制度|ルール|育成)/.test(title))scores.world+=4;
 return JOURNAL_TOPICS.reduce((best,topic)=>scores[topic.key]>scores[best]?topic.key:best,fallback);
}
export const getJournalTopicLabel=(key:TopicKey)=>JOURNAL_TOPICS.find(t=>t.key===key)?.title||"育成理念・発達";
