import Link from "next/link";
import { connection } from "next/server";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Locale } from "@/components/site-frame";

const topics = [
  ["フォームだけでシューターは育つのか？","フォームの安定は大切ですが、試合では受球、足の準備、守備者との距離、時間制約も変わります。まず無理なく打てる距離で技術を確認し、次にパスと守備を加えます。","3対2で、打つ・パスする・ドライブする選択を認め、成功数だけでなく選択の理由を振り返る。"],
  ["練習では入るのに、試合で入らない理由","同じ場所からの反復と、移動や守備を伴うシュートは要求が異なります。練習の成果は、試合に近い状況でも観察しましょう。","2対1で守備者の位置を変え、受球時の準備と判断を観察する。"],
  ["U12で教えたいシュートの原理原則","成長段階や力に合った距離・ボール・リングを用い、無理に遠くから打たせないこと。自分で状況を見て挑戦できる機会を全員に用意します。","短い距離から始め、全員がパス、移動、シュートを経験できる2対1にする。"],
  ["100本の練習を100本分の学びにする","反復回数は練習量の一指標ですが、学習そのものではありません。目的、難易度、疲労、振り返りの質も考えます。","同じシュートを短く反復した後、受球位置や守備を変え、何が変化したか話し合う。"],
  ["シューターを育てるスペーシング","味方と距離を保ち、パスコースを確保し、守備の位置に応じて動くことがシュート機会につながります。固定位置を暗記するだけでなく理由を理解します。","3対3で、ボールを持たない選手がパスを受けられる角度を探す。"],
  ["シュートの前に何を見ているか","打つかどうかは守備者、リング、味方、自分のバランスなどに左右されます。指導者が毎回答えを叫ぶより、自分で認識する機会を用意します。","クローズアウトの距離を変えた1対1で、打つ・攻める判断を観察する。"],
  ["シューターを活かすチーム戦術","一人の得点力だけに頼らず、パス、カット、ドライブから守備の変化を生み出します。役割の早期固定ではなく、複数の選手に経験を配分します。","3対3でドライブ後のパスと再配置を試し、空いた選手にボールが届いたか確認する。"],
  ["世界の育成から考える練習設計","海外のドリルをそのままコピーするのではなく、練習目的と対象年齢、選手の経験、試合へのつながりを理解することが重要です。","練習の各メニューに目的を一つ書き、試合で観察できる行動と結びつける。"],
  ["Torsten Loiblから何を学ぶか","今回のRBA主催講習は、シュート技術、練習設計、ゲーム戦略の接続をテーマとしています。技術を試合で活かすという視点から、自分の指導を見直す機会です。","自チームの練習から一つ課題を選び、講習後に変更する点と評価方法を考える。"],
  ["子どもを育てるなら、大人も学び続ける","指導者の学びは、子どもに新しい技術を押し付けるためではなく、より良い環境を作るためにあります。練習を観察し、選手の反応から改善します。","次の練習で一つだけ変更し、全員の参加機会と判断の質を振り返る。"],
] as const;

const copy = {
 ja:{label:"COACH EDUCATION / SPECIAL EDITION",title:"シュートを教えるのか。シューターを育てるのか。",intro:"技術、認識、判断、スペーシングをつなぐ。RBAの指導者教育特集です。練習でできることを試合でも使えるように、明日からの練習設計を考えます。",live:"LIVE 3,300円（税込）",record:"録画30日間 4,400円（税込）",date:"2026年11月25日（水）20:00–21:30 JST / Zoom・日本語逐次通訳",cta:"講習詳細・申込み",after:"録画視聴の案内を確認",closed:"講習・今後の学びの案内",payment:"国内：Googleフォームから参加形式を選択し、Squareで決済。LIVEと録画は別申込です。",disclaimer:"RBA独立主催。講師の所属団体の公認・後援を示すものではありません。以下はRBAの練習提案であり、講師の発言や講義内容の逐語的な再現ではありません。",guide:"10の問いから練習を見直す",practice:"現場で試す",media:"外部メディア掲載",mediaText:"610 BASKETBALL JOURNALで紹介されました。"},
 en:{label:"COACH EDUCATION / SPECIAL EDITION",title:"Are we teaching shots, or developing shooters?",intro:"Connect technique, perception, decision-making and spacing. Explore how youth coaches can build practices that help players use skills in games.",live:"LIVE",record:"30-day recording option",date:"25 November 2026 · 20:00–21:30 JST · Zoom",cta:"Clinic details and registration (USD)",after:"Check recording information",closed:"Clinic and future learning opportunities",payment:"International registration uses the official English USD payment page. Live and recording are separate options.",disclaimer:"Independently organised by RBA; no endorsement by the instructor’s affiliated organisations is implied. The practice ideas below are RBA’s editorial suggestions, not a transcript of the clinic.",guide:"Three questions for your next practice",practice:"Try on court",media:"Independent media coverage",mediaText:"Featured by 610 BASKETBALL JOURNAL (Japanese)."},
 "zh-tw":{label:"COACH EDUCATION / SPECIAL EDITION",title:"你在教投籃，還是在培養射手？",intro:"結合技術、觀察、判斷與空間配置，思考如何讓青少年球員在比賽中運用訓練成果。",live:"線上直播",record:"30天錄影觀看方案",date:"2026年11月25日 20:00–21:30 日本時間（台灣19:00–20:30）／Zoom",cta:"課程詳情與報名（美元）",after:"查看錄影觀看資訊",closed:"課程及後續學習資訊",payment:"海外報名使用官方英文頁面的美元付款方式。直播與錄影為不同報名方案。",disclaimer:"本活動由RBA獨立主辦，不代表講師所屬組織認證或贊助。以下為RBA的訓練建議，並非課程逐字內容。",guide:"從三個問題重新思考訓練",practice:"球場實踐",media:"外部媒體報導",mediaText:"610 BASKETBALL JOURNAL（日文）已介紹本活動。"},
 ko:{label:"COACH EDUCATION / SPECIAL EDITION",title:"슛을 가르치는가, 슈터를 육성하는가?",intro:"기술, 인지, 판단, 공간 활용을 연결해 유소년 선수들이 경기에서 기술을 활용할 수 있는 훈련을 고민합니다.",live:"실시간 강의",record:"30일 녹화 시청 옵션",date:"2026년 11월 25일 20:00–21:30 일본·한국 시간 / Zoom",cta:"강의 상세 및 신청(USD)",after:"녹화 시청 안내 확인",closed:"강의 및 향후 교육 안내",payment:"해외 신청은 공식 영어 페이지의 USD 결제 방식입니다. 실시간 강의와 녹화는 별도 신청입니다.",disclaimer:"RBA의 독립 주최 행사로 강사의 소속 기관 인증이나 후원을 의미하지 않습니다. 아래는 RBA의 훈련 제안이며 강의 녹취록이 아닙니다.",guide:"다음 훈련을 위한 세 가지 질문",practice:"코트에서 적용하기",media:"외부 매체 소개",mediaText:"610 BASKETBALL JOURNAL(일본어)에 소개되었습니다."}
} as const;
const internationalTopics={
 en:[["Does technique transfer to games?","Stable mechanics matter, but game situations change.","Progress from comfortable shots to a 2v1 with a defender."],["What does the shooter see?","Distance, teammates and defenders influence the decision.","Vary closeout distance and allow a shot, drive or pass."],["How does spacing create shots?","Off-ball movement and passing angles can create opportunities.","Use 3v3 to observe who creates and uses open space."]],
 "zh-tw":[["技術能否轉移到比賽？","穩定的投籃技術很重要，但比賽情境會變化。","從舒適距離投籃進展至有防守者的2對1。"],["射手看到了什麼？","距離、隊友與防守者都會影響判斷。","改變防守距離，讓球員選擇投籃、突破或傳球。"],["空間如何創造機會？","無球移動與傳球角度能創造進攻機會。","透過3對3觀察誰創造並使用空間。"]],
 ko:[["기술이 경기로 이어지는가?","안정적인 슛 기술은 중요하지만 경기 상황은 달라집니다.","편안한 거리에서 시작해 수비가 있는 2대1로 진행합니다."],["슈터는 무엇을 보는가?","거리, 동료, 수비수의 위치가 판단에 영향을 줍니다.","수비 접근 거리를 바꿔 슛, 돌파, 패스를 선택하게 합니다."],["공간은 어떻게 기회를 만드는가?","오프볼 움직임과 패스 각도가 기회를 만들 수 있습니다.","3대3에서 공간을 만들고 활용하는 선수를 관찰합니다."]]
} as const;
const start=Date.parse("2026-11-25T20:00:00+09:00");
const end=Date.parse("2026-11-25T21:30:00+09:00");
// This is a request-time Server Component, not a client render. Opt out of
// prerendering before reading the clock so an old LIVE offer is never cached.
async function requestTime(): Promise<number> {
 await connection();
 return Date.now();
}
export async function TorstenJournalFeature({locale}:{locale:Locale}){
 const now=await requestTime();
 const c=copy[locale],before=now<start,recordPeriod=now>=end;
 const href=(locale==="ja"?"/ja/events/torsten-loibl-online-clinic":"/events/torsten-loibl-online-clinic")+"?utm_source=rba_journal&utm_medium=internal&utm_campaign=torsten_vol2&utm_content="+locale+"_feature";
 const guides=locale==="ja"?topics:internationalTopics[locale];
 const registrationLabel=before?c.cta:recordPeriod?c.after:c.closed;
 return <section className="journal-cms-index section-pad" id="torsten-shooting-special" aria-labelledby="torsten-special-heading">
  <div className="journal-clinic-bridge">
   <div className="journal-clinic-copy"><p className="section-index inverse">{c.label}</p><h2 id="torsten-special-heading">{c.title}</h2><p>{c.intro}</p><p>{c.date}</p><div className="journal-clinic-facts">{before?<span>{c.live}</span>:null}{before?<span>{c.record}</span>:null}</div></div>
   <div className="journal-clinic-actions"><strong>TORSTEN LOIBL<br/><em>ONLINE CLINIC VOL.2</em></strong><Link className="button button-member" href={href}>{registrationLabel}<ArrowRight size={17}/></Link><small>{before?c.payment:null}</small></div>
  </div>
  <div className="section-head"><div><p className="section-index">RBA / PRACTICE DESIGN</p><h2>{c.guide}</h2></div><p>{c.disclaimer}</p></div>
  <div className="journal-coach-tool-grid">{guides.map(([title,body,practice],index)=><article key={title}><div className="journal-coach-tool-head"><span>{String(index+1).padStart(2,"0")} / COACH TOOL</span><h3>{title}</h3><p>{body}</p></div><div><strong>{c.practice}</strong><p>{practice}</p></div></article>)}</div>
  <div className="homecourt-launch-actions"><Link className="button button-dark" href={href}>{registrationLabel}<ArrowRight size={17}/></Link></div>
  <div className="section-head"><div><p className="section-index">MEDIA COVERAGE</p><h2>{c.media}</h2></div><p>{c.mediaText}</p></div>
  <div className="journal-source-list"><a href="https://sixten.jp/journal/815-torsten-loibl-online-clinic.html" target="_blank" rel="noreferrer"><span>01</span><div><strong>610 BASKETBALL JOURNAL</strong><small>日本語 / Japanese</small></div><ArrowUpRight size={17}/></a></div>
 </section>;
}
