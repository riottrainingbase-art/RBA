import Link from "next/link";
import Image from "next/image";
import { SiteFrame, type Locale } from "./site-frame";
import "./taiwan-official.css";

const contactForm = "https://form.jotform.com/262860709125055";
const langPath:Record<Locale,string> = {
 ja:"/ja/taiwan/sponsors",
 "zh-tw":"/zh-tw/taiwan/sponsors",
 en:"/taiwan/sponsors",
 ko:"/ko/taiwan/sponsors",
};
const copy:Record<Locale,{
title:string;lead:string;note:string;whyTitle:string;whyIntro:string;waysTitle:string;waysIntro:string;
recordTitle:string;recordBody:string;futureTitle:string;futureBody:string;valueTitle:string;valueIntro:string;
processTitle:string;sendaiTitle:string;sendaiBody:string;careTitle:string;careBody:string;
cta:string;ctaIntro:string;back:string;disclaimer:string;
outcomes:[string,string][];formats:[string,string][];values:[string,string][];steps:string[];
}>={
 ja:{
  title:"仙台から台湾へ。子どもたちの学びを、企業と一緒に支えたい。",
  lead:"Riot Basketball Academy（RBA）は、日本と台湾の子どもたちが、所属や地域を越えて学び合える環境を目指しています。単発の遠征ではなく、選手・指導者の学びが次につながる活動を、企業の皆さまと一緒につくりたいと考えています。",
  note:"2027年の開催日、会場、参加人数、費用、現地での協力体制は、まだ確定していません。現段階では協賛・連携の可能性についてご相談を受け付けています。",
  whyTitle:"企業の支援を、子どもたちの経験へ。",
  whyIntro:"私たちが求めているのは、単なるロゴの掲出ではありません。誰がどのような学びを得られたかを振り返り、次の機会につなげる支援です。",
  waysTitle:"協賛・連携の形は、一緒に考えます。",
  waysIntro:"金銭協賛だけでなく、会場・用具・移動・通訳など、それぞれの企業が持つ強みを生かせる形をご相談ください。内容と予算は個別にお見積もりします。",
  recordTitle:"これまでの活動",
  recordBody:"2026年には、沖縄と台湾で日台の育成年代の交流に取り組みました。10月にはSPARTANS Academyの協力のもと台湾でクリニックを開催し、現地の育成関係者とも今後の交流について話し合っています。",
  futureTitle:"これから検討していること",
  futureBody:"2027年に向け、日台の合同練習や交流試合、コーチ研修、子どもたちの参加機会を広げる取り組みを検討しています。正式な実施・募集が決まった活動は、別途ご案内します。",
  valueTitle:"企業の皆さまにお返しできること",
  valueIntro:"活動内容に合わせて、双方で確認した協賛契約に基づき実施します。参加人数や広告効果を保証するものではありません。",
  processTitle:"ご相談から活動報告まで",
  sendaiTitle:"仙台・宮城の企業の皆さまへ",
  sendaiBody:"RBAの活動は仙台から始まっています。台湾との経済・文化交流も進む宮城から、今度は育成年代のスポーツ交流を支える形を考えています。台湾に拠点がなくても、子どもたちの成長、指導者の学び、国際交流に関心のある企業様であればご相談いただけます。",
  careTitle:"子どもの安全と協賛の透明性",
  careBody:"協賛内容や協賛金の使途、活動範囲、返礼・広報条件は実施前に書面で確認します。子どもの写真・映像や個人情報は保護者等の同意を前提とし、協賛企業に名簿を提供することはありません。寄附金控除や台湾での税制上の優遇は約束していません。",
  cta:"協賛・企業連携について相談する",
  ctaIntro:"まずは、企業として関心のあるテーマをお聞かせください。お問い合わせは無料です。送信しただけで協賛契約や支払いは発生しません。",
  back:"RBA台湾の活動を見る",
  disclaimer:"RBA主催の協賛募集です。NBAやその他の団体による公認・協賛を意味するものではありません。現地パートナーが本募集の契約当事者になるとは限りません。",
  outcomes:[
   ["参加の機会","参加費や用具など、家庭の負担を軽くし、より多くの子どもが学べる機会を目指します。"],
   ["コーチの学び","練習づくり、判断力を引き出す指導、安全管理を学ぶ機会を支えます。"],
   ["日台交流","合同練習、交流試合、オンラインでの交流を通じて、継続的なつながりを育てます。"],
  ],
  formats:[
   ["プロジェクト協賛","対象の活動・用途・予算を決め、1回の活動から支援できる方法です。"],
   ["参加支援・用具支援","参加費の軽減、練習用具、会場、移動・宿泊や通訳など、必要な資源を提供する方法です。"],
   ["指導者育成パートナー","指導者研修や教材制作など、地域の育成環境を継続して支える協働です。"],
  ],
  values:[
   ["使途を明確に","支援がどの活動に使われたかを、合意した範囲でお伝えします。"],
   ["成果を振り返る","実施後は活動記録や、同意を得た範囲の写真・集計結果などを報告します。"],
   ["企業の目的に合わせる","地域貢献、人材育成、国際交流、現物支援など、企業ごとの目的に沿って設計します。"],
  ],
  steps:["お問い合わせ","活動内容・支援目的の確認","対象・予算・役割・広報範囲を書面で合意","条件が整った活動を実施","活動結果・支援の使途をご報告"]
 },
 "zh-tw":{
  title:"從仙台到台灣，一起支持孩子透過籃球成長。",
  lead:"Riot Basketball Academy（RBA）希望讓日本與台灣的孩子跨越地區和球隊界線，一起學習與交流。我們想和企業夥伴合作，打造不只一次性的交流，而是能持續培育球員與教練的機會。",
  note:"2027年的活動日期、場地、人數、預算與在地合作分工仍待確認。目前開放企業提出合作意向，並非已確定的贊助活動。",
  whyTitle:"讓企業的支持，成為孩子們的學習機會。",
  whyIntro:"我們重視的不只是品牌露出，而是如何創造實際的參與經驗，以及活動後的學習與改善。",
  waysTitle:"可以依企業需求討論合作方式。",
  waysIntro:"除經費支持外，也歡迎討論場地、器材、交通、翻譯及其他實物支援。合作內容與預算需個別確認。",
  recordTitle:"已進行的交流",
  recordBody:"2026年，RBA在沖繩及台灣參與青少年籃球交流；10月在SPARTANS Academy協助下於台灣舉辦訓練課，並和當地相關人士討論未來合作方向。",
  futureTitle:"持續評估的計畫",
  futureBody:"我們正在評估2027年共同訓練、友誼賽、教練研習，以及讓更多孩子參與的可行方案。正式日期與條件確認後才會開放報名。",
  valueTitle:"企業合作的回饋方式",
  valueIntro:"實際回饋內容應依雙方書面協議確認，不保證固定曝光量或參與人數。",
  processTitle:"從洽詢到成果回報",
  sendaiTitle:"歡迎仙台、宮城以及台灣的企業",
  sendaiBody:"RBA起步於日本仙台，希望運用宮城與台灣既有的交流基礎，讓更多青少年透過籃球互相認識。企業不一定需要在台灣設有據點，也可以提出合作想法。",
  careTitle:"兒少安全與透明合作",
  careBody:"所有合作均須事先確認用途、責任、預算與品牌使用。兒少影像和個資須有適當同意，不提供個別球員名冊。我們不保證捐款抵稅或任何特定稅務優惠。",
  cta:"洽詢企業贊助與合作",
  ctaIntro:"歡迎先分享您想支持的方向。填寫不收費，也不代表已簽約或付款。",
  back:"返回RBA台灣",
  disclaimer:"本頁由RBA提出合作邀請，不代表NBA或其他組織官方背書；在地夥伴是否成為契約當事方仍須確認。",
  outcomes:[["增加參與機會","降低家庭因費用或器材產生的障礙，讓更多孩子有機會學習。"],["培育教練","支持教學設計、決策能力與安全管理相關的研習。"],["台日交流","透過共同訓練、友誼賽與線上交流，建立長期聯繫。"]],
  formats:[["專案合作","針對單次活動確認用途、預算與雙方責任。"],["實物及參與補助","提供場地、器材、交通、翻譯，或降低參與負擔。"],["教練培育夥伴","持續支持教練研習與教材製作。"]],
  values:[["清楚交代用途","在約定範圍內說明資源如何使用。"],["活動後回報","提供活動摘要及經同意的影像或統計結果。"],["符合企業需求","依地方參與、人才培育、國際交流等目標討論。"]],
  steps:["提出合作洽詢","確認活動需求與目標","書面約定範圍、預算、角色與宣傳權利","條件確認後執行","回報活動成果"]
 },
 en:{
  title:"From Sendai to Taiwan. Supporting the next generation through basketball.",
  lead:"Riot Basketball Academy connects young players and coaches in Japan and Taiwan through real learning experiences. We invite companies to explore practical support for access, coach education and sustained youth exchange.",
  note:"No 2027 dates, venues, attendance, fees or final local roles are confirmed. Enquiries are exploratory and do not constitute a sponsorship agreement.",
  whyTitle:"Turn corporate support into meaningful opportunities.",
  whyIntro:"We value access, learning and measurable delivery over logo placement alone.",
  waysTitle:"Partnerships shaped around the right needs.",
  waysIntro:"We can discuss programme-specific funding, equipment, venues, travel logistics, translation and other in-kind support.",
  recordTitle:"What has happened",
  recordBody:"In 2026, RBA supported youth basketball exchange in Okinawa and Taiwan, including an October Taiwan clinic with SPARTANS Academy and discussions with local development organisations.",
  futureTitle:"What we're exploring",
  futureBody:"We are exploring future joint training, friendly games, coach workshops and access support. Events will only be announced once arrangements are confirmed.",
  valueTitle:"What partners can receive",
  valueIntro:"Every deliverable is subject to a written agreement. We cannot promise reach or participant numbers in advance.",
  processTitle:"From enquiry to impact report",
  sendaiTitle:"An opportunity for companies in Sendai, Miyagi and Taiwan",
  sendaiBody:"RBA began in Sendai. We welcome companies interested in youth growth, sport and cross-border exchange, whether or not they have a Taiwan office.",
  careTitle:"Safeguarding and accountability",
  careBody:"Budgets, responsibilities and promotional rights must be agreed in writing. Youth photos and personal data require appropriate consent, and no participant roster is given to partners. No tax-deductible donation status is promised.",
  cta:"Discuss corporate partnership",
  ctaIntro:"Tell us which part of youth development you may be interested in supporting. An enquiry is free and creates no payment or sponsorship obligation.",
  back:"Explore RBA Taiwan",
  disclaimer:"This is an RBA partnership invitation, not an NBA-endorsed initiative. Roles of other partners remain subject to agreement.",
  outcomes:[["More access","Help reduce costs or equipment barriers to meaningful participation."],["Coach learning","Support coaching workshops and youth safeguarding education."],["Japan–Taiwan exchange","Develop sustainable joint training, friendly games and online learning."]],
  formats:[["Project sponsor","Support a scoped pilot once outcomes, budget and responsibilities are agreed."],["In-kind and access support","Provide venues, equipment, interpretation, travel services or participation assistance."],["Coach education partner","Explore ongoing workshops and learning resources for youth coaches."]],
  values:[["Clear use of funds","We report agreed use of funds and resources."],["Practical reporting","Receive a delivery summary and consent-cleared or aggregated results."],["Fit with your priorities","We shape activity around shared objectives, not a fixed package."]],
  steps:["Enquiry","Discuss needs and priorities","Confirm scope, budget and media rights in writing","Deliver agreed activities","Report results"]
 },
 ko:{
  title:"센다이에서 대만까지, 농구를 통해 아이들의 성장을 지원합니다.",
  lead:"Riot Basketball Academy는 일본과 대만의 선수 및 지도자가 함께 배우는 기회를 만들고자 합니다. 기업과 함께 참가 기회 확대, 지도자 교육, 지속적인 교류를 논의하고 있습니다.",
  note:"2027년 일정, 장소, 인원, 비용 및 현지 분담은 아직 확정되지 않았습니다. 현재는 협찬 및 협력 가능성을 상담하는 단계입니다.",
  whyTitle:"기업의 지원을 아이들의 경험으로 연결합니다.",
  whyIntro:"단순한 로고 노출보다 의미 있는 참여 기회와 지속적인 학습을 중요하게 생각합니다.",
  waysTitle:"기업의 강점을 살린 협력",
  waysIntro:"프로그램 지원금, 장소, 장비, 이동, 통역 등 다양한 형태를 함께 검토합니다.",
  recordTitle:"그동안의 활동",
  recordBody:"2026년 RBA는 오키나와와 대만에서 유소년 농구 교류를 진행했습니다. 10월에는 SPARTANS Academy의 협력으로 대만 클리닉을 운영했습니다.",
  futureTitle:"앞으로 검토하는 활동",
  futureBody:"2027년 합동훈련, 친선경기, 지도자 워크숍, 참여 지원 등을 검토 중이며 일정과 조건은 미확정입니다.",
  valueTitle:"파트너에게 제공할 수 있는 가치",
  valueIntro:"실제 활동과 홍보 권리는 서면 합의를 통해 정하며, 인원 및 노출 효과를 보장하지 않습니다.",
  processTitle:"문의부터 결과 보고까지",
  sendaiTitle:"센다이·미야기·대만의 기업을 환영합니다",
  sendaiBody:"RBA는 센다이에서 시작했습니다. 대만 내 사업장이 없어도 유소년 육성과 국제 교류에 관심이 있다면 상담할 수 있습니다.",
  careTitle:"아동 보호와 투명한 운영",
  careBody:"지원금 사용, 책임, 홍보 범위를 사전에 서면으로 정합니다. 아동 사진과 개인정보에는 적절한 동의가 필요하며 명단을 제공하지 않습니다. 세제 혜택을 보장하지 않습니다.",
  cta:"기업 협찬·협력 문의",
  ctaIntro:"관심 있는 분야를 알려 주세요. 문의는 무료이며 계약이나 결제가 발생하지 않습니다.",
  back:"RBA 대만 활동 보기",
  disclaimer:"본 모집은 RBA가 진행하며 NBA 등 타 기관의 공식 후원이나 승인을 의미하지 않습니다.",
  outcomes:[["참여 기회","비용과 장비의 장벽을 줄일 방법을 검토합니다."],["지도자 교육","훈련 설계와 안전 교육을 지원합니다."],["일본·대만 교류","합동훈련과 교류 경기를 통해 연결을 확대합니다."]],
  formats:[["프로젝트 협찬","범위와 예산을 정한 소규모 활동부터 시작합니다."],["현물 및 참가 지원","장소, 장비, 이동, 통역 등을 지원합니다."],["지도자 교육 파트너","워크숍과 학습 자료를 지속적으로 지원합니다."]],
  values:[["사용 목적 공유","합의한 사용 내역을 보고합니다."],["결과 보고","동의된 범위에서 활동 결과를 공유합니다."],["목표에 맞는 협력","기업의 사회적 가치 목표에 맞게 설계합니다."]],
  steps:["문의","목표 확인","범위·예산·홍보 권리 서면 합의","활동 실시","성과 보고"]
 }
};

export function TaiwanSponsorship({locale}:{locale:Locale}) {
 const c=copy[locale];
 const labels=[{k:"ja" as const,n:"日本語"},{k:"zh-tw" as const,n:"繁體中文"},{k:"en" as const,n:"English"},{k:"ko" as const,n:"한국어"}];
 return <SiteFrame locale={locale} languagePage="taiwan">
 <div className="rba-taiwan">
  <section className="rba-taiwan-hero"><div className="rba-taiwan-inner">
   <div className="rba-taiwan-top"><p>RBA / JAPAN × TAIWAN</p><nav aria-label="Languages">{labels.map(l=><Link key={l.k} href={langPath[l.k]} aria-current={locale===l.k?"page":undefined}>{l.n}</Link>)}</nav></div>
   <div className="rba-taiwan-partner"><Image src="/rba-logo-original.jpg" alt="Riot Basketball Academy" width={56} height={78} className="rba-taiwan-brand-mark"/><div className="rba-taiwan-partner-wordmark"><span>RIOT BASKETBALL ACADEMY</span><span className="rba-taiwan-times">×</span><span>PARTNERSHIP</span></div></div>
   <h1>{c.title}</h1><p className="rba-taiwan-lead">{c.lead}</p>
   <p className="rba-taiwan-credit">CORPORATE PARTNERSHIP / 2027 PROJECTS UNDER DISCUSSION</p>
   <a className="rba-taiwan-btn" href="#contact-partnership">{c.cta} ↗</a>
   <p style={{marginTop:22,fontSize:13,lineHeight:1.9,color:"#d5e9dc",maxWidth:790}}>{c.note}</p>
  </div></section>
  <section className="rba-taiwan-section"><div className="rba-taiwan-inner">
   <p className="rba-taiwan-label">01 / PURPOSE</p><h2>{c.whyTitle}</h2><p className="rba-taiwan-intro">{c.whyIntro}</p>
   <div className="rba-taiwan-cards">{c.outcomes.map(([h,b],i)=><article key={h}><span>{String(i+1).padStart(2,"0")}</span><h3>{h}</h3><p>{b}</p></article>)}</div>
  </div></section>
  <section className="rba-taiwan-section rba-taiwan-muted"><div className="rba-taiwan-inner">
   <p className="rba-taiwan-label">02 / PARTNERSHIP OPTIONS</p><h2>{c.waysTitle}</h2><p className="rba-taiwan-intro">{c.waysIntro}</p>
   <div className="rba-taiwan-cards">{c.formats.map(([h,b],i)=><article key={h}><span>{String(i+1).padStart(2,"0")}</span><h3>{h}</h3><p>{b}</p></article>)}</div>
  </div></section>
  <section className="rba-taiwan-section"><div className="rba-taiwan-inner">
   <p className="rba-taiwan-label">03 / EXPERIENCE & NEXT STEPS</p>
   <div className="rba-taiwan-roles">
    <article><strong>{c.recordTitle}</strong><p>{c.recordBody}</p></article>
    <article><strong>{c.futureTitle}</strong><p>{c.futureBody}</p></article>
    <article><strong>RBA × SPARTANS · 2026</strong><p><a href="https://www.spartans.tw/en/" target="_blank" rel="noopener noreferrer">SPARTANS OFFICIAL ↗</a></p><p><Link href={locale==="en"?"/taiwan":"/"+locale+"/taiwan"}>{c.back} ↗</Link></p></article>
   </div>
  </div></section>
  <section className="rba-taiwan-section rba-taiwan-muted"><div className="rba-taiwan-inner">
   <p className="rba-taiwan-label">04 / SHARED VALUE</p><h2>{c.valueTitle}</h2><p className="rba-taiwan-intro">{c.valueIntro}</p>
   <div className="rba-taiwan-cards">{c.values.map(([h,b],i)=><article key={h}><span>{String(i+1).padStart(2,"0")}</span><h3>{h}</h3><p>{b}</p></article>)}</div>
  </div></section>
  <section className="rba-taiwan-section"><div className="rba-taiwan-inner">
   <p className="rba-taiwan-label">05 / PROCESS</p><h2>{c.processTitle}</h2>
   <div className="rba-taiwan-roles">{c.steps.map((step,i)=><article key={step}><strong>{String(i+1).padStart(2,"0")}</strong><p>{step}</p></article>)}</div>
  </div></section>
  <section className="rba-taiwan-section rba-taiwan-muted"><div className="rba-taiwan-inner">
   <p className="rba-taiwan-label">06 / SENDAI × TAIWAN</p><h2>{c.sendaiTitle}</h2><p className="rba-taiwan-intro">{c.sendaiBody}</p>
  </div></section>
  <section className="rba-taiwan-section"><div className="rba-taiwan-inner">
   <p className="rba-taiwan-label">07 / SAFEGUARDING</p><h2>{c.careTitle}</h2><p className="rba-taiwan-intro">{c.careBody}</p>
   <p className="rba-taiwan-small">{c.disclaimer}</p>
  </div></section>
  <section className="rba-taiwan-section rba-taiwan-muted" id="contact-partnership"><div className="rba-taiwan-inner">
   <p className="rba-taiwan-label">08 / CONTACT</p><h2>{c.cta}</h2><p className="rba-taiwan-intro">{c.ctaIntro}</p>
   <a className="rba-taiwan-btn" href={contactForm} target="_blank" rel="noopener noreferrer">{c.cta} ↗</a>
   <p className="rba-taiwan-small"><a href="mailto:riot.training.base@gmail.com?subject=RBA%20Taiwan%20Partnership">riot.training.base@gmail.com</a></p>
   <p className="rba-taiwan-small"><Link href={locale==="en"?"/taiwan":"/"+locale+"/taiwan"}>{c.back} ↗</Link></p>
  </div></section>
 </div></SiteFrame>;
}
