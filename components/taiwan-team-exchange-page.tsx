import Link from "next/link";
import { ArrowRight, ClipboardList, ShieldCheck, Users, MapPin } from "lucide-react";
import { SiteFrame, type Locale } from "./site-frame";
import { ContactForm } from "./contact-form";
import "./taiwan-exchange.css";

const words:Record<Locale,{
 eyebrow:string;title:string;intro:string;notice:string;fromJapan:string;fromJapanDesc:string;fromTaiwan:string;fromTaiwanDesc:string;features:readonly string[];scope:string;stepsTitle:string;steps:readonly string[];askTitle:string;ask:string;disclaimer:string;back:string;cta:string;
}>={
 ja:{
 eyebrow:"RBA INTERNATIONAL / TEAM EXCHANGE",title:"台湾遠征も、日本遠征も。",intro:"チームごとの目的に合わせ、現地チームとの交流試合、合同練習、クリニック、指導者交流の企画・調整についてご相談いただけます。",
 notice:"これは団体向けの開催相談窓口です。旅行商品・確定済みツアーの募集ではありません。開催日、費用、受入先、実施可否は個別協議で決定します。",
 fromJapan:"日本のチーム → 台湾へ",fromJapanDesc:"台湾での交流試合、合同練習、現地アカデミーとの交流を検討する日本のチーム向け。",
 fromTaiwan:"台湾のチーム → 日本へ",fromTaiwanDesc:"日本での交流試合、クリニック、育成キャンプ、指導者交流を検討する台湾のチーム向け。",
 features:["年代・競技レベルに合う交流内容を相談","交流試合・合同練習・指導者講習を組み合わせて企画","出場機会、安全管理、保護者対応を事前に確認"],
 scope:"RBAが相談できるのはバスケットボールの交流企画・指導・現地関係者との調整です。航空券・宿泊・移動等の旅行手配を伴う場合は、必要な登録・許可を有する旅行事業者と役割を分け、旅行代金をRBAが無資格で募集・受領することはありません。",
 stepsTitle:"相談から実施まで",steps:["団体名、出発地、対象年代、人数、希望時期を共有","交流の目的と対戦・練習内容をすり合わせる","現地受入先・安全・保険・費用・責任分担を確認","書面で条件を確定してから募集・実施を判断"],
 askTitle:"まずはチームの希望をお聞かせください。",ask:"フォームの「お問い合わせ内容」には「日本から台湾へ」または「台湾から日本へ」と記載してください。成人の代表者からご相談ください。お問い合わせは無料です。",
 disclaimer:"未成年者の氏名・健康情報・非公開写真は送らないでください。お問い合わせは予約・契約・支払いを意味しません。",
 back:"台湾交流トップへ",cta:"交流を相談する"
 },
 en:{
 eyebrow:"RBA INTERNATIONAL / TEAM EXCHANGE",title:"Team exchange, both ways.",intro:"Discuss basketball-focused exchanges between Japan and Taiwan: friendly games, joint practices, clinics and coach learning tailored to your team.",
 notice:"Enquiry only, not a confirmed tour or travel package. Dates, costs, hosts and availability remain subject to agreement.",
 fromJapan:"Japan teams → Taiwan",fromJapanDesc:"Discuss games, joint practices and local academy exchange opportunities in Taiwan.",
 fromTaiwan:"Taiwan teams → Japan",fromTaiwanDesc:"Discuss games, clinics, development camps and coach exchanges in Japan.",
 features:["Plan age-appropriate, level-matched basketball experiences","Combine games, practice and coach education","Clarify playing opportunity, safeguarding and parent communications"],
 scope:"RBA can discuss basketball programming, coaching and introductions. Where flights, accommodation or transport arrangements require licensed travel services, these must be handled by an appropriately authorized travel provider. RBA does not offer an unlicensed travel package or collect travel-package payments.",
 stepsTitle:"How an exchange is developed",steps:["Share your organisation, origin, ages, numbers and preferred timing","Agree learning goals and possible games or practices","Verify hosts, safeguarding, insurance, costs and responsibilities","Document terms before confirming or promoting an event"],
 askTitle:"Tell us what your team hopes to experience.",ask:"In the enquiry topic/message, write 'Japan to Taiwan' or 'Taiwan to Japan'. Adult team representatives only. Enquiries are free.",
 disclaimer:"Do not submit children's names, health data or private photos. An enquiry is not a booking, contract or payment.",
 back:"Back to Taiwan exchange",cta:"Discuss an exchange"
 },
 "zh-tw":{
 eyebrow:"RBA INTERNATIONAL / 台日球隊交流",title:"台灣來日本，日本去台灣。",intro:"RBA 可與學校、球隊及籃球學院討論台日青少年籃球交流的企劃與協調，包括友誼賽、共同訓練、籃球訓練營與教練交流。",
 notice:"本頁為團體合作意向洽詢，不是已確定行程的報名或套裝旅遊商品。日期、費用、接待球隊及是否成行，均須另行確認。",
 fromJapan:"日本球隊 → 台灣",fromJapanDesc:"為日本球隊討論在台灣進行交流賽、共同訓練及在地籃球學院交流。",
 fromTaiwan:"台灣球隊 → 日本",fromTaiwanDesc:"為台灣球隊討論在日本進行交流賽、籃球訓練營、青少年培育活動與教練交流。",
 features:["依年齡、程度與學習目標討論合適的交流內容","可結合友誼賽、共同訓練與教練研習","事前確認上場機會、兒少安全與家長溝通"],
 scope:"RBA提供的是籃球交流活動的企劃、教學及相關單位協調。若涉及機票、住宿、交通等依法需由旅行業者辦理的服務，將與具備適當資格的旅行業者分工。RBA不提供未經許可的套裝旅遊，也不收取旅行套裝費用。",
 stepsTitle:"從洽詢到交流",steps:["提供單位、出發地、年齡、人數與希望時期","討論學習目標、交流賽及共同訓練內容","確認接待單位、安全、保險、費用與責任分工","以書面確認條件後，再決定是否正式舉辦"],
 askTitle:"告訴我們，您希望孩子們獲得什麼經驗？",ask:"請在表單的查詢主題或訊息中註明「台灣赴日本」或「日本赴台灣」。請由成年教練、家長代表或主辦單位聯絡。洽詢免費。",
 disclaimer:"請勿提供未成年球員的姓名、醫療資料或私人照片。洽詢不代表報名、簽約或付款。",
 back:"返回台日交流首頁",cta:"洽詢球隊交流"
 },
 ko:{
 eyebrow:"RBA INTERNATIONAL / TEAM EXCHANGE",title:"대만에서 일본으로, 일본에서 대만으로.",intro:"팀의 목적에 맞춘 교류 경기, 공동 훈련, 클리닉 및 코치 교육을 상담할 수 있습니다.",
 notice:"단체 상담 창구이며 확정된 여행 상품이나 모집이 아닙니다. 일정, 비용, 상대 팀과 개최 여부는 추후 협의합니다.",
 fromJapan:"일본 팀 → 대만",fromJapanDesc:"대만 현지 팀과의 교류 경기, 공동 훈련, 아카데미 방문을 논의합니다.",
 fromTaiwan:"대만 팀 → 일본",fromTaiwanDesc:"일본에서의 교류 경기, 육성 캠프, 클리닉 및 코치 교류를 논의합니다.",
 features:["연령과 수준에 맞는 교류 계획","경기, 훈련 및 코치 교육을 결합","출전 기회, 안전 및 보호자 안내를 사전 확인"],
 scope:"RBA는 농구 교류 기획과 지도 및 관계자 조정을 상담합니다. 항공·숙박·교통 등 여행업 허가가 필요한 업무는 적법한 여행사업자가 담당합니다. RBA는 무허가 여행상품을 판매하거나 여행대금을 수령하지 않습니다.",
 stepsTitle:"진행 절차",steps:["단체, 출발지, 연령, 인원, 희망 시기 공유","교류 목적과 경기·훈련 내용 협의","현지 협력, 안전, 보험, 비용, 책임 확인","서면으로 조건을 확정한 후 개최 결정"],
 askTitle:"원하는 교류 경험을 알려 주세요.",ask:"문의에 'Japan to Taiwan' 또는 'Taiwan to Japan'을 적어 주세요. 성인 담당자만 문의할 수 있으며 상담은 무료입니다.",
 disclaimer:"미성년자의 이름, 건강정보, 비공개 사진은 제출하지 마세요. 문의는 예약이나 결제가 아닙니다.",
 back:"대만 교류 페이지",cta:"교류 상담"
 }
};
const experience:Record<Locale,{eyebrow:string;title:string;lead:string;proofTitle:string;proof:string;ideasTitle:string;ideas:readonly [string,string][];sampleTitle:string;sampleNotice:string;sample:readonly [string,string][];closing:string}>={
 ja:{
 eyebrow:"MORE THAN A TOUR / REAL DEVELOPMENT",title:"海外に行くだけでは、終わらせない。",lead:"知らない相手とプレーする。違う言葉で伝える。自分で判断する。その経験を、子どもたちの次の成長につなげたい。",
 proofTitle:"台湾での交流実績 × SPARTANS Academy",proof:"2026年10月、RBAは台湾でEltonや現地のアシスタントコーチとともにクリニックを開催しました。SPARTANS Academyとの実際の交流は、次の企画を考えるうえでの出発点です。ただし、今後の受入れ・共同開催が確約されているわけではありません。",
 ideasTitle:"こんな体験を、一緒につくりたい。",ideas:[["LOCAL BASKETBALL","現地の同年代と交流試合。勝敗だけでなく、違うプレースタイルに触れる。"],["TRAIN TOGETHER","合同練習や育成クリニック。言葉が違っても、コートで一緒に学ぶ。"],["COACH TO COACH","日本と台湾の指導者が練習を見て、育成について対話する。"],["BEYOND THE COURT","試合後の振り返りや文化交流も含めて、選手自身が経験を言葉にする。"]],
 sampleTitle:"2日間のバスケットボール交流モデル",sampleNotice:"以下は企画イメージです。実施内容・対戦相手・日程は一切確定していません。",
 sample:[["DAY 01","現地チームとの合同練習 → 交流試合 → 選手・コーチの振り返り"],["DAY 02","育成クリニック → 交流ゲーム → 学んだことを共有"]],
 closing:"RBAは、相手チームの受入れや参加者の出場機会、安全管理を確認したうえで、目的に合う交流を一緒に設計します。"
 },
 en:{
 eyebrow:"MORE THAN A TOUR / REAL DEVELOPMENT",title:"Go beyond a trip. Come back with new perspectives.",lead:"Play against unfamiliar opponents. Communicate across languages. Make decisions for yourself. Turn the experience into lasting learning.",
 proofTitle:"Real Taiwan clinic experience with SPARTANS Academy",proof:"In October 2026, RBA held a clinic in Taiwan with Elton and local assistant coaches. This exchange with SPARTANS Academy is a starting point for exploring future activities, not a guarantee of a future hosted event or co-organised programme.",
 ideasTitle:"What could your team experience?",ideas:[["LOCAL BASKETBALL","Play age-appropriate friendly games and discover different styles."],["TRAIN TOGETHER","Learn alongside local players in joint practices or clinics."],["COACH TO COACH","Exchange ideas about practice design and long-term development."],["BEYOND THE COURT","Reflect, communicate and learn across cultures."]],
 sampleTitle:"Illustrative two-day basketball exchange",sampleNotice:"Concept only. No dates, host teams, opponents or activities have been confirmed.",
 sample:[["DAY 01","Joint practice → friendly game → player and coach reflection"],["DAY 02","Development clinic → exchange games → shared learning"]],
 closing:"RBA designs basketball experiences with teams after checking host availability, playing opportunities, safeguarding and responsibilities."
 },
 "zh-tw":{
 eyebrow:"不只是海外比賽 / 真正的成長",title:"不只是出國打球，而是帶回新的眼界。",lead:"和不熟悉的對手交手、跨越語言一起練習、學會自己做決定。讓每一次交流，都成為孩子成長的一部分。",
 proofTitle:"與 SPARTANS Academy 的真實台灣交流",proof:"2026年10月，RBA與Elton及台灣在地助教一起舉辦青少年籃球訓練活動。這次與SPARTANS Academy的交流，是未來規劃的起點；並不代表未來活動、接待或共同主辦已獲保證。",
 ideasTitle:"希望和你的球隊一起創造的體驗",ideas:[["LOCAL BASKETBALL","與同齡的在地球員進行友誼賽，體驗不同球風。"],["TRAIN TOGETHER","透過共同訓練與培育課程，一起觀察、嘗試與學習。"],["COACH TO COACH","讓台日教練交流練習設計與長期培育的想法。"],["BEYOND THE COURT","透過賽後回顧與文化交流，讓孩子說出自己的收穫。"]],
 sampleTitle:"兩天籃球交流的企劃示例",sampleNotice:"以下僅為構想範例，日期、對戰球隊、接待單位與活動內容均尚未確定。",
 sample:[["DAY 01","共同訓練 → 交流友誼賽 → 球員與教練回顧"],["DAY 02","籃球培育課程 → 交流比賽 → 分享學習成果"]],
 closing:"RBA會先確認接待單位、上場機會、兒少安全與責任分工，再與各隊共同設計交流內容。"
 },
 ko:{
 eyebrow:"MORE THAN A TOUR / REAL DEVELOPMENT",title:"해외 경기 그 이상의 배움.",lead:"새로운 상대와 경기하고, 다른 언어로 소통하며, 스스로 판단하는 경험을 성장으로 연결합니다.",
 proofTitle:"SPARTANS Academy와의 실제 대만 교류",proof:"2026년 10월 RBA는 Elton 및 현지 보조 코치들과 대만에서 유소년 클리닉을 진행했습니다. 이는 향후 교류의 출발점이며, 미래 공동 개최나 현지 수용을 보장하지 않습니다.",
 ideasTitle:"함께 만들고 싶은 경험",ideas:[["LOCAL BASKETBALL","현지 동년배 선수들과 다양한 스타일의 교류 경기."],["TRAIN TOGETHER","공동 훈련과 클리닉을 통한 배움."],["COACH TO COACH","일본과 대만 코치 간 육성 방법에 관한 대화."],["BEYOND THE COURT","경기 후 돌아보기와 문화 교류."]],
 sampleTitle:"2일 교류 프로그램 예시",sampleNotice:"구상 예시이며 일정, 상대 팀 및 개최 내용은 확정되지 않았습니다.",
 sample:[["DAY 01","공동 훈련 → 교류 경기 → 선수·코치 회고"],["DAY 02","육성 클리닉 → 교류 경기 → 학습 공유"]],
 closing:"RBA는 현지 수용, 출전 기회, 안전과 책임 분담을 확인한 후 팀과 함께 프로그램을 설계합니다."
 }
};

export function TaiwanTeamExchangePage({locale}:{locale:Locale}){
 const c=words[locale];
 const e=experience[locale];
 const back=locale==="en"?"/taiwan":`/${locale}/taiwan`;
 return <SiteFrame locale={locale} languagePage="taiwan">
  <div className="taiwan-exchange">
   <section className="taiwan-hero section-pad taiwan-team-hero">
    <p className="section-index inverse">{c.eyebrow}</p>
    <h1>{c.title}</h1><p className="taiwan-lead">{c.intro}</p>
    <p className="taiwan-team-notice">{c.notice}</p>
    <div className="taiwan-actions"><a href="#team-exchange-enquiry" className="button button-light">{c.cta}<ArrowRight size={18}/></a><Link href={back} className="text-link light-link">{c.back}</Link></div>
   </section>
   <section className="taiwan-team-directions section-pad">
    <p className="section-index">TWO DIRECTIONS / ONE CONNECTION</p>
    <div className="taiwan-team-grid">
     <article><MapPin aria-hidden="true"/><span>01 / JAPAN → TAIWAN</span><h2>{c.fromJapan}</h2><p>{c.fromJapanDesc}</p><a href="#team-exchange-enquiry">{c.cta} <ArrowRight size={16}/></a></article>
     <article><MapPin aria-hidden="true"/><span>02 / TAIWAN → JAPAN</span><h2>{c.fromTaiwan}</h2><p>{c.fromTaiwanDesc}</p><a href="#team-exchange-enquiry">{c.cta} <ArrowRight size={16}/></a></article>
    </div>
    <ul className="taiwan-team-benefits">{c.features.map(item=><li key={item}><Users size={19} aria-hidden="true"/>{item}</li>)}</ul>
   </section>
   <section className="taiwan-experience section-pad">
    <p className="section-index">{e.eyebrow}</p>
    <h2>{e.title}</h2><p className="taiwan-wide">{e.lead}</p>
    <div className="taiwan-partner-proof"><span>2026 / TAIWAN CLINIC</span><h3>{e.proofTitle}</h3><p>{e.proof}</p></div>
    <h3 className="taiwan-experience-heading">{e.ideasTitle}</h3>
    <div className="taiwan-experience-grid">{e.ideas.map(([heading,body],i)=><article key={heading}><span>{String(i+1).padStart(2,"0")} / {heading}</span><p>{body}</p></article>)}</div>
    <div className="taiwan-sample"><h3>{e.sampleTitle}</h3><p className="taiwan-footnote">{e.sampleNotice}</p><div>{e.sample.map(([day,activity])=><div className="taiwan-sample-day" key={day}><b>{day}</b><p>{activity}</p></div>)}</div></div>
    <p className="taiwan-footnote">{e.closing}</p>
    <a href="#team-exchange-enquiry" className="button button-dark">{c.cta}<ArrowRight size={18}/></a>
   </section>
   <section className="taiwan-operations section-pad"><div><ClipboardList aria-hidden="true" size={32}/><h2>{c.stepsTitle}</h2><ol>{c.steps.map((step,i)=><li key={step}><b>{String(i+1).padStart(2,"0")}</b><span>{step}</span></li>)}</ol></div><div><ShieldCheck aria-hidden="true" size={32}/><h2>SAFETY / RESPONSIBILITY</h2><p>{c.scope}</p></div></section>
   <section className="taiwan-enquiry section-pad" id="team-exchange-enquiry"><p className="section-index">TEAM EXCHANGE / ENQUIRY</p><h2>{c.askTitle}</h2><p>{c.ask}</p><p className="taiwan-footnote">{c.disclaimer}</p><ContactForm locale={locale} campaign="taiwan_2026_launch"/></section>
  </div>
 </SiteFrame>;
}
