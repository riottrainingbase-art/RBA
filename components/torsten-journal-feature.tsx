import Link from "next/link";
import { connection } from "next/server";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Locale } from "@/components/site-frame";

const topics = [
  [
    "シュートフォームを教えるだけで、シューターは育つのか？",
    "フォームを身につけることは大切です。しかし、試合では毎回同じ場所で、同じ姿勢から打てるわけではありません。パスの受け方、足の運び、守備との距離まで含めて練習を考えましょう。",
    "無理なく打てる距離でフォームを確認したら、3対2へ。打つ、パスする、ドライブする。それぞれの選択に理由があったかを振り返ります。"
  ],
  [
    "練習では入るのに、試合では入らないのはなぜ？",
    "守備のいない状態で繰り返すシュートと、試合の中で打つシュートでは、選手に求められることが違います。練習で身につけた技術が試合で使えているかを見ましょう。",
    "2対1でディフェンスの立ち位置を変え、パスを受ける前の準備と、受けた後の判断を観察します。"
  ],
  [
    "ミニバスで大切にしたいシュートの基本",
    "身体の発達や技術の習得状況に合わせて、無理なく打てる距離から始めます。練習では適切なボールやリングを使い、全員が自分で考えてシュートに挑戦できる機会をつくります。",
    "2対1では役割を交代し、全員がパスを出す、動いて受ける、シュートを打つ経験を積めるようにします。"
  ],
  [
    "100本打つことと、100本分上達することは違う。",
    "本数は練習量の目安ですが、本数だけで上達は判断できません。何を身につける練習なのか、難易度は適切か、疲れて動きが崩れていないかを考えます。",
    "短時間の反復練習から、パスの方向や守備の位置を変えた練習へ。選手に何が難しくなったかを聞いてみましょう。"
  ],
  [
    "良いシュートは、ボールを持っていない選手から生まれる。",
    "スペーシングとは、ただ決められた位置に立つことではありません。味方との間隔を取り、守備の動きに応じてパスを受けられる場所を探すことが、良いシュート機会につながります。",
    "3対3で、ボールを持っていない選手がどこへ動けばパスを受けやすくなるかを考えます。"
  ],
  [
    "シュートを打つ前に、選手は何を見ているのか？",
    "リングだけでなく、守備の位置や味方の動き、自分が打てる状態かどうかを見て判断します。ベンチから答えを伝え続けるのではなく、選手自身が状況を捉える機会をつくります。",
    "1対1でディフェンスの寄り方や距離を変え、すぐに打つのか、ドライブで攻めるのかを選手に委ねます。"
  ],
  [
    "シューターを活かすのは、チーム全体の動き。",
    "パスやカット、ドライブによって守備を動かし、チームで良いシュート機会をつくります。育成年代では特定の選手だけをシューターに固定せず、さまざまな役割を経験させたいところです。",
    "3対3でドライブからのパスと、その後の動き直しを試します。空いた味方を見つけられたかを確認しましょう。"
  ],
  [
    "海外の練習を真似する前に、その目的を知る。",
    "優れた練習を見つけても、その形だけを取り入れる必要はありません。何を身につけるための練習なのか、目の前の選手に合っているのか、試合のどんな場面につながるのかを考えます。",
    "練習メニューごとに目的を一つ決め、試合でどんなプレーが増えれば成果といえるかを整理します。"
  ],
  [
    "トーステン・ロイブル氏の講習から何を学ぶのか？",
    "今回の講習では、シュート技術、練習の組み立て方、試合でシューターを活かす戦術を扱います。個人技術とチームプレーをつなげる視点から、日々の指導を見直す機会です。",
    "自分のチームの課題を一つ整理し、講習で得たヒントを練習にどう取り入れるか考えてみましょう。"
  ],
  [
    "子どもに成長を求めるなら、指導者も学び続けたい。",
    "新しい知識を子どもに押し付けるのではなく、より良い学習環境をつくるために指導者は学びます。選手の反応や変化を見ながら、練習を少しずつ改善していきましょう。",
    "次の練習で一つだけ変えてみる。選手一人ひとりが考え、プレーする機会を持てたかを振り返ります。"
  ]
] as const;

const copy = {
 ja:{"label":"指導者のための特集","title":"シュートを教えるだけでなく、シューターを育てる。","intro":"良いシュートは、フォームだけでは生まれません。何を見て、いつ打つのか。味方とどう協力してシュート機会をつくるのか。技術と判断、チームプレーをつなぐ指導を、トーステン・ロイブル氏のオンライン講習を機に考えます。","live":"ライブ参加 3,300円（税込）","record":"録画視聴（配信開始から30日間）4,400円（税込）","date":"2026年11月25日（水）20:00〜21:30（日本時間）／Zoom開催・日本語逐次通訳付き","cta":"講習の詳細・お申し込み","after":"録画視聴のご案内を確認する","closed":"講習のご案内","payment":"国内のお申し込みはGoogleフォームで参加方法を選択し、送信後の案内に沿ってSquareでお支払いください。ライブ参加と録画視聴は別のお申し込みです。","disclaimer":"本講習はRBAが独自に企画・主催するものです。講師の所属団体による公認・後援を示すものではありません。以下の解説・練習例はRBA独自の提案であり、講師本人の発言や講習内容を再現したものではありません。","guide":"明日の指導を変える10の視点","practice":"次の練習で試すこと","media":"メディア掲載情報","mediaText":"バスケットボール専門メディア「610 BASKETBALL JOURNAL」で本講習が紹介されました。"},
 en:{label:"COACH EDUCATION / SPECIAL EDITION",title:"Are we teaching shots, or developing shooters?",intro:"Connect technique, perception, decision-making and spacing. Explore how youth coaches can build practices that help players use skills in games.",live:"LIVE",record:"30-day recording option",date:"25 November 2026 · 20:00–21:30 JST · Zoom",cta:"Clinic details and registration (USD)",after:"Check recording information",closed:"Clinic and future learning opportunities",payment:"International registration uses the official English USD payment page. Live and recording are separate options.",disclaimer:"Independently organised by RBA; no endorsement by the instructor’s affiliated organisations is implied. The practice ideas below are RBA’s editorial suggestions, not a transcript of the clinic.",guide:"Three questions for your next practice",practice:"Try on court",media:"Independent media coverage",mediaText:"Featured by 610 BASKETBALL JOURNAL (Japanese)."},
 "zh-tw":{label:"COACH EDUCATION / SPECIAL EDITION",title:"你在教投籃，還是在培養射手？",intro:"結合技術、觀察、判斷與空間配置，思考如何讓青少年球員在比賽中運用訓練成果。",live:"線上直播",record:"30天錄影觀看方案",date:"2026年11月25日 20:00–21:30 日本時間（台灣19:00–20:30）／Zoom",cta:"課程詳情與報名（美元）",after:"查看錄影觀看資訊",closed:"課程及後續學習資訊",payment:"海外報名使用官方英文頁面的美元付款方式。直播與錄影為不同報名方案。",disclaimer:"本活動由RBA獨立主辦，不代表講師所屬組織認證或贊助。以下為RBA的訓練建議，並非課程逐字內容。",guide:"從三個問題重新思考訓練",practice:"球場實踐",media:"外部媒體報導",mediaText:"610 BASKETBALL JOURNAL（日文）已介紹本活動。"},
 ko:{label:"COACH EDUCATION / SPECIAL EDITION",title:"슛을 가르치는가, 슈터를 육성하는가?",intro:"기술, 인지, 판단, 공간 활용을 연결해 유소년 선수들이 경기에서 기술을 활용할 수 있는 훈련을 고민합니다.",live:"실시간 강의",record:"30일 녹화 시청 옵션",date:"2026년 11월 25일 20:00–21:30 일본·한국 시간 / Zoom",cta:"강의 상세 및 신청(USD)",after:"녹화 시청 안내 확인",closed:"강의 및 향후 교육 안내",payment:"해외 신청은 공식 영어 페이지의 USD 결제 방식입니다. 실시간 강의와 녹화는 별도 신청입니다.",disclaimer:"RBA의 독립 주최 행사로 강사의 소속 기관 인증이나 후원을 의미하지 않습니다. 아래는 RBA의 훈련 제안이며 강의 녹취록이 아닙니다.",guide:"다음 훈련을 위한 세 가지 질문",practice:"코트에서 적용하기",media:"외부 매체 소개",mediaText:"610 BASKETBALL JOURNAL(일본어)에 소개되었습니다."}
} as const;
const internationalTopics={
 en:[["Does technique transfer to games?","Stable mechanics matter, but game situations change.","Progress from comfortable shots to a 2v1 with a defender."],["What does the shooter see?","Distance, teammates and defenders influence the decision.","Vary closeout distance and allow a shot, drive or pass."],["How does spacing create shots?","Off-ball movement and passing angles can create opportunities.","Use 3v3 to observe who creates and uses open space."]],
 "zh-tw":[["技術能否轉移到比賽？","穩定的投籃技術很重要，但比賽情境會變化。","從舒適距離投籃進展至有防守者的2對1。"],["射手看到了什麼？","距離、隊友與防守者都會影響判斷。","改變防守距離，讓球員選擇投籃、突破或傳球。"],["空間如何創造機會？","無球移動與傳球角度能創造進攻機會。","透過3對3觀察誰創造並使用空間。"]],
 ko:[["기술이 경기로 이어지는가?","안정적인 슛 기술은 중요하지만 경기 상황은 달라집니다.","편안한 거리에서 시작해 수비가 있는 2대1로 진행합니다."],["슈터는 무엇을 보는가?","거리, 동료, 수비수의 위치가 판단에 영향을 줍니다.","수비 접근 거리를 바꿔 슛, 돌파, 패스를 선택하게 합니다."],["공간은 어떻게 기회를 만드는가?","오프볼 움직임과 패스 각도가 기회를 만들 수 있습니다.","3대3에서 공간을 만들고 활용하는 선수를 관찰합니다."]]
} as const;
const editorial = {
 ja:{"title":"根拠を知り、現場で活かす。","evidence":"WABC（世界バスケットボールコーチ協会）のミニバス指導者向けマニュアルでは、年齢や技術レベルに合った活動、無理のない距離からのシュート、ゲームを取り入れた指導が提案されています。2025年の系統的レビューでは、少人数ゲームの人数やルールなどによって、技術を使う機会や運動負荷が変わることが報告されています。","interpretation":"RBAでは、個人技術の練習に守備や味方との関係を少しずつ加え、選手が状況に応じて技術を使えるように練習を組み立てます。全員が同じ本数をこなしたかだけでなく、一人ひとりに考え、判断し、プレーする機会があったかを大切にします。","limits":"少人数ゲームなら必ず上達するというわけではありません。反復練習にも役割があります。選手の年齢や経験、身体の発達、疲労の状態に合わせて練習方法を選び、試合の中で技術を使えているかを確かめる必要があります。","session":"小4〜中3｜30分の練習例","sessionNote":"RBAが提案するファンダメンタルの練習例です。ウォーミングアップを済ませた後に行い、学年や習熟度、人数に応じて調整してください。","stages":[["6分｜シュートの基本と準備","近い距離から、パスを受けてバランス良くシュート。小学生は無理なく届く距離を、中学生は移動しながら受ける場面も取り入れます。","無理にボールを押し出していないか。安定した姿勢で打てているか。"],["8分｜2対1で判断する","守備の位置を変え、打つ・パスする・ドライブする選択を経験します。必要に応じて攻撃側の使えるスペースを広げたり、守備が戻ってくる場面を加えたりします。","守備の位置に応じて選択できているか。全員が判断する機会を持てているか。"],["12分｜3対3で試合につなげる","攻守を交代しながら全員がプレーします。ボールを持っていない選手の動きにも目を向け、必要に応じてコートの広さや制限時間を調整します。","パスを受ける位置、動き直し、シュートの選択、プレー機会の偏り。"],["4分｜選手と振り返る","「何が見えた？」「ほかにどんな選択ができた？」と問いかけ、次に試したいプレーを選手と一緒に考えます。","成功・失敗だけでなく、判断の理由と全員の経験を確認します。"]],"sources":"参考資料・原典","more":"残りの7つの視点を読む","skip":"記事一覧に進む"},
 en:{title:"From evidence to your next session",evidence:"The WABC mini-basketball manual recommends age- and skill-appropriate activities, comfortable shooting distances and game-based teaching. A 2025 systematic review found that small-sided formats change technical involvement and exercise demands.",interpretation:"RBA proposes progressively introducing defenders and teammates while observing every player’s opportunities and decisions.",limits:"No single format guarantees better shooting in games. Adapt tasks to ability, experience and fatigue, and evaluate transfer in actual play.",session:"30-minute practice example",sessionNote:"An RBA example, not a prescribed clinic drill. Adapt duration and difficulty.",stages:[["6 min | Preparation","Comfortable shots with balanced catches.","Balance and readiness."],["8 min | 2v1","Choose to shoot, pass or drive.","Decisions relative to the defender."],["12 min | 3v3","Create space, rotate roles and involve everyone.","Spacing, opportunities and participation."],["4 min | Review","Ask what players noticed and what they will try next.","Reasons for decisions."]],sources:"References and further reading",more:"Read the remaining topics",skip:"Browse all Journal articles"},
 "zh-tw":{title:"從證據走向下一次訓練",evidence:"WABC迷你籃球手冊建議依年齡與能力設計活動、使用合適投籃距離與遊戲式教學。2025年系統性回顧指出，小場地比賽形式會影響技術參與及運動負荷。",interpretation:"RBA建議逐步加入防守與隊友，觀察每位球員的學習機會及判斷。",limits:"任何單一形式都不能保證比賽投籃進步。應依能力、經驗與疲勞調整，並觀察實際比賽表現。",session:"30分鐘訓練範例",sessionNote:"RBA的示例，非講師指定課表。請調整時間及難度。",stages:[["6分鐘｜準備","近距離接球與平衡投籃。","平衡與準備。"],["8分鐘｜2對1","依防守選擇投籃、傳球或突破。","判斷是否符合情境。"],["12分鐘｜3對3","創造空間、輪替角色並讓每人參與。","空間、機會與參與。"],["4分鐘｜回顧","詢問球員看見什麼、下次要嘗試什麼。","判斷的理由。"]],sources:"參考資料與延伸閱讀",more:"閱讀其餘主題",skip:"瀏覽所有文章"},
 ko:{title:"근거에서 다음 훈련으로",evidence:"WABC 미니농구 매뉴얼은 연령과 기술 수준에 맞는 활동, 적절한 슛 거리와 게임 기반 교육을 제안합니다. 2025년 체계적 문헌고찰에서는 소규모 게임 형식에 따라 기술 참여와 운동 부하가 달라졌습니다.",interpretation:"RBA는 수비수와 동료를 단계적으로 추가하고 모든 선수의 학습 기회와 판단을 관찰할 것을 제안합니다.",limits:"어떤 단일 형식도 경기 슛 성공을 보장하지 않습니다. 능력, 경험, 피로에 맞게 조정하고 실제 경기 행동을 확인해야 합니다.",session:"30분 훈련 예시",sessionNote:"RBA의 예시이며 강사의 지정 훈련이 아닙니다. 시간과 난이도를 조절하세요.",stages:[["6분 | 준비","편안한 거리에서 균형 잡힌 캐치와 슛.","균형과 준비."],["8분 | 2대1","수비에 따라 슛, 패스, 돌파 선택.","상황에 맞는 판단."],["12분 | 3대3","공간을 만들고 역할을 바꾸며 모두 참여.","공간, 기회, 참여."],["4분 | 돌아보기","무엇을 보았고 다음에 무엇을 시도할지 질문.","판단의 이유."]],sources:"참고 자료 및 추가 읽기",more:"나머지 주제 읽기",skip:"전체 저널 글 보기"}
} as const;
const sources=[
 ["WABC Coaching Courses / Mini Basketball Coaches Manual","FIBA / WABC","https://about.fiba.basketball/en/wabc-documents"],
 ["Can different small-sided game formats impact physiological, physical, technical, and tactical demands in basketball players?","Li et al. · Biology of Sport · 2025 · doi:10.5114/biolsport.2025.147012","https://pubmed.ncbi.nlm.nih.gov/40656990/"]
] as const;
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
 const c=copy[locale],e=editorial[locale],before=now<start,recordPeriod=now>=end;
 const href=(locale==="ja"?"/ja/events/torsten-loibl-online-clinic":"/events/torsten-loibl-online-clinic")+"?utm_source=rba_journal&utm_medium=internal&utm_campaign=torsten_vol2&utm_content="+locale+"_feature";
 const guides=locale==="ja"?topics:internationalTopics[locale];
 const registrationLabel=before?c.cta:recordPeriod?c.after:c.closed;
 return <section className="journal-cms-index section-pad" id="torsten-shooting-special" aria-labelledby="torsten-special-heading">
  <div className="journal-clinic-bridge">
   <div className="journal-clinic-copy"><p className="section-index inverse">{c.label}</p><h2 id="torsten-special-heading">{c.title}</h2><p>{c.intro}</p><p>{c.date}</p><div className="journal-clinic-facts">{before?<span>{c.live}</span>:null}{before?<span>{c.record}</span>:null}</div></div>
   <div className="journal-clinic-actions"><strong>TORSTEN LOIBL<br/><em>ONLINE CLINIC VOL.2</em></strong><Link className="button button-member" href={href}>{registrationLabel}<ArrowRight size={17}/></Link><small>{before?c.payment:null}</small><a className="text-link" href="#all-articles">{e.skip}<ArrowRight size={15}/></a></div>
  </div>
  <div className="section-head"><div><p className="section-index">{locale==="ja"?"RBAの練習提案":"RBA / PRACTICE DESIGN"}</p><h2>{c.guide}</h2></div><p>{c.disclaimer}</p></div>
  <div className="journal-coach-tool-grid">{guides.slice(0,3).map(([title,body,practice],index)=><article key={title}><div className="journal-coach-tool-head"><span>{String(index+1).padStart(2,"0")} / {locale==="ja"?"練習のヒント":"COACH TOOL"}</span><h3>{title}</h3><p>{body}</p></div><div><strong>{c.practice}</strong><p>{practice}</p></div></article>)}</div>
  {guides.length>3?<details className="journal-evidence-compact"><summary><strong>{e.more}</strong></summary><div className="journal-coach-tool-grid">{guides.slice(3).map(([title,body,practice],index)=><article key={title}><div className="journal-coach-tool-head"><span>{String(index+4).padStart(2,"0")} / {locale==="ja"?"練習のヒント":"COACH TOOL"}</span><h3>{title}</h3><p>{body}</p></div><div><strong>{c.practice}</strong><p>{practice}</p></div></article>)}</div></details>:null}
  <div className="section-head"><div><p className="section-index">{locale==="ja"?"根拠と現場への応用":"EVIDENCE / RBA EDITORIAL"}</p><h2>{e.title}</h2></div></div>
  <div className="journal-evidence-grid"><article><span>{locale==="ja"?"研究・公式資料":"EVIDENCE"}</span><p>{e.evidence}</p></article><article><span>{locale==="ja"?"RBAの考え方":"RBA INTERPRETATION"}</span><p>{e.interpretation}</p></article><article><span>{locale==="ja"?"断定できないこと":"LIMITATIONS"}</span><p>{e.limits}</p></article></div>
  <details className="journal-evidence-compact"><summary><strong>{e.session}</strong></summary><p>{e.sessionNote}</p><div className="journal-coach-tool-grid">{e.stages.map(([title,setup,observe])=><article key={title}><div className="journal-coach-tool-head"><h3>{title}</h3><p>{setup}</p></div><div><strong>{locale==="ja"?"指導者が見るポイント":"OBSERVE"}</strong><p>{observe}</p></div></article>)}</div></details>
  <div className="section-head"><div><p className="section-index">{locale==="ja"?"参考資料":"SOURCES"}</p><h2>{e.sources}</h2></div></div>
  <div className="journal-source-list">{sources.map(([title,source,url],index)=><a key={url} href={url} target="_blank" rel="noreferrer"><span>{String(index+1).padStart(2,"0")}</span><div><strong>{title}</strong><small>{source}</small></div><ArrowUpRight size={17}/></a>)}</div>
  <div className="homecourt-launch-actions"><Link className="button button-dark" href={href}>{registrationLabel}<ArrowRight size={17}/></Link></div>
  <div className="section-head"><div><p className="section-index">{locale==="ja"?"メディア紹介":"MEDIA COVERAGE"}</p><h2>{c.media}</h2></div><p>{c.mediaText}</p></div>
  <div className="journal-source-list"><a href="https://sixten.jp/journal/815-torsten-loibl-online-clinic.html" target="_blank" rel="noreferrer"><span>01</span><div><strong>610 BASKETBALL JOURNAL</strong><small>日本語 / Japanese</small></div><ArrowUpRight size={17}/></a></div>
 </section>;
}
