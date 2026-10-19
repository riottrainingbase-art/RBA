import {ArrowRight,ArrowUpRight,CheckCircle2,Globe2,HeartPulse,ShieldCheck,Users2} from "lucide-react";
import type {Locale} from "./site-frame";
import {localePath} from "./site-frame";

const c={
 ja:{
  kicker:"CORPORATE PARTNERSHIP / BASKETBALL",
  title:"子どもたちの「次の挑戦」を、企業と一緒につくる。",
  lead:"RBAは、バスケットボールを通じて子どもたちの成長と挑戦の機会をつくる育成事業です。選手への指導、試合、身体づくり、指導者教育、国内外の交流をつなぎ、地域や所属先だけでは得られない学びを届けます。 企業・団体の皆様とは、指導費、会場、用具、移動、参加費支援など、対象と使途を決めて連携します。実施後に活動内容と支援の使途を報告します。",
  metrics:[["日本全国","各地の開催実績"],["日本 × アジア","選手・指導者の交流"],["4","対応言語"]],
  section:"WHY RBA",sectionTitle:"広告枠ではなく、バスケットボールの育成環境を支える。",
  values:[["PLAY","プレーする機会","地域や所属だけで挑戦の機会が決まらないよう、外のコートへつなぎます。"],["LEARN","学ぶ機会","選手だけでなく、指導者・保護者にも現代バスケットボールの学びを届けます。"],["PREPARE","身体を準備する","S&C、回復、栄養、怪我予防まで含め、長く競技を続ける土台をつくります。"],["CONNECT","次のコートへ","日本各地とアジアをつなぎ、異なるプレースタイルや価値観に触れる機会をつくります。"]],
  platform:"MY HOME COURT",platformTitle:"イベントで終わらせず、日常の成長へ。",
  platformBody:"練習・試合・大会の予定、カウントダウン、大会準備、参加履歴、Basketball Passport、次の育成機会を一つのHOMEへ。スポンサー企業は個人データにアクセスするのではなく、この育成環境を支えるパートナーとして関わります。",
  categories:[["SPORTS / APPAREL","ボール・ウェア・用具・大会準備"],["HEALTH / MEDICAL","怪我予防・安全・コンディショニング"],["FOOD / NUTRITION","補食・栄養教育・キャンプ"],["TRAVEL / MOBILITY","遠征・移動安全・国内外交流"],["IT / DIGITAL","MY HOME COURT・運営基盤"],["LOCAL BUSINESS","地域クリニック・参加機会"]],
  pilot:"START WITH ONE PROJECT",pilotTitle:"まずは、1つの企画から。",pilotBody:"最初から年間契約を前提にしません。支援したい地域・テーマ・企画を一つ決め、実施範囲・費用・報告内容を書面で確認します。実施後に使途と成果を報告し、次の連携を双方で判断します。",
  included:["公式サイトのパートナー掲載","対象企画での社名・ロゴ掲出または連携","SNS・JOURNAL等での活動紹介","実施後の簡易インパクトレポート"],
  safety:"RBAが守ること",safetyItems:["未成年者への直接営業は行いません","健康・体調などの個人データをスポンサーへ提供しません","広告と育成コンテンツを明確に分けます","肖像・コメントの利用は同意を前提とします"],
  cta:"育成環境を、一緒につくるパートナーへ。",ctaBody:"企業・地域が大切にしている価値と、RBAの育成活動が重なる場所から始めます。ロゴ掲出だけで終わらない連携をご相談ください。",primary:"協賛について相談する",secondary:"MY HOME COURTを見る"
 },
 en:{
  kicker:"CORPORATE PARTNERSHIP / BASKETBALL",title:"Build the next opportunity for young players—together.",lead:"RBA is a basketball development organisation creating opportunities for young people to grow and take on new challenges. We connect player coaching, games, physical preparation, coach education and international exchange, opening learning opportunities beyond a player’s home team or region. Corporate and community partners can support defined coaching costs, courts, equipment, travel or participation. We agree the purpose and report how support was used and what was delivered.",
  metrics:[["Across Japan","Programme delivery"],["Japan × Asia","Player and coach exchange"],["4","languages"]],
  section:"WHY RBA",sectionTitle:"Support a basketball development environment—not an ad slot.",
  values:[["PLAY","Opportunities to play","Create access to new courts, opponents and experiences."],["LEARN","Opportunities to learn","Support players, coaches and parents with better learning."],["PREPARE","Prepare the body","Connect S&C, recovery, nutrition and injury prevention."],["CONNECT","Reach the next court","Link local Japanese basketball with wider Asian opportunities."]],
  platform:"MY HOME COURT",platformTitle:"Turn events into daily development.",platformBody:"Schedules, countdowns, preparation, participation history, Basketball Passport and next opportunities live in one HOME. Partners support the environment without receiving private player data.",
  categories:[["SPORTS / APPAREL","Equipment, apparel and event preparation"],["HEALTH / MEDICAL","Safety, injury prevention and conditioning"],["FOOD / NUTRITION","Nutrition education and camps"],["TRAVEL / MOBILITY","Travel and exchange"],["IT / DIGITAL","MY HOME COURT and operations"],["LOCAL BUSINESS","Local clinics and access"]],
  pilot:"START WITH ONE PROJECT",pilotTitle:"Start with one agreed project.",pilotBody:"An annual contract is not required at the outset. We agree the purpose, scope, budget and reporting for one project in writing, review delivery, then decide together whether to continue.",
  included:["Partner listing on the official site","Brand presence or activation in one agreed programme","RBA story/content introduction","Short impact report after delivery"],
  safety:"What RBA protects",safetyItems:["No direct marketing to minors","No sponsor access to private health or condition data","Clear separation between sponsorship and development content","Consent-first use of youth images and comments"],
  cta:"We are looking for our next partner.",ctaBody:"Start with the value your organisation wants to support. We will shape one realistic basketball project around it.",primary:"Discuss partnership",secondary:"View MY HOME COURT"
 },
 "zh-tw":{
  kicker:"CORPORATE PARTNERSHIP / BASKETBALL",title:"一起為孩子創造下一次挑戰。",lead:"RBA透過籃球，為孩子創造成長與挑戰的機會。我們連結球員訓練、比賽、體能準備、教練教育及國際交流，提供超越原有球隊與所在地的學習經驗。 企業與團體可支持明確的教學費、場地、器材、交通或參加費。我們事先確認用途，並於活動後報告執行內容與支援的使用情況。",
  metrics:[["日本各地","活動實績"],["日本 × 亞洲","球員與教練交流"],["4","語言"]],
  section:"WHY RBA",sectionTitle:"支持籃球培育環境，而不只是廣告版位。",
  values:[["PLAY","比賽與挑戰","讓孩子接觸不同球場與對手。"],["LEARN","學習","支持球員、教練與家長的學習。"],["PREPARE","身體準備","連結體能、恢復、營養與傷害預防。"],["CONNECT","下一個球場","連結日本各地與亞洲交流。"]],
  platform:"MY HOME COURT",platformTitle:"讓活動回到日常成長。",platformBody:"行程、倒數、準備、參與紀錄、Basketball Passport與下一個機會集中在一個HOME。企業支持環境，不會取得個人健康資料。",
  categories:[["SPORTS / APPAREL","器材、服裝、比賽準備"],["HEALTH / MEDICAL","安全與傷害預防"],["FOOD / NUTRITION","營養教育與訓練營"],["TRAVEL / MOBILITY","遠征與交流"],["IT / DIGITAL","MY HOME COURT"],["LOCAL BUSINESS","地方訓練與參與機會"]],
  pilot:"FIRST PARTNER PILOT",pilotTitle:"先從一個共同確認的企劃開始。",pilotBody:"不要求一開始就簽年度合約。先一起完成一個籃球企劃，再根據成果決定是否繼續。",
  included:["官網合作夥伴頁面","指定活動的品牌露出或合作","RBA內容介紹","活動後簡易成果報告"],
  safety:"RBA的原則",safetyItems:["不直接向未成年者行銷","不向贊助商提供個人健康資料","明確區分贊助與培育內容","兒少影像與留言以同意為前提"],
  cta:"我們正在尋找下一位合作夥伴。",ctaBody:"先從貴公司重視的價值開始，再共同設計一個可實行的籃球企劃。",primary:"洽談合作",secondary:"查看MY HOME COURT"
 },
 ko:{
  kicker:"CORPORATE PARTNERSHIP / BASKETBALL",title:"아이들의 다음 도전을 기업과 함께 만듭니다.",lead:"RBA는 농구를 통해 아이들의 성장과 도전 기회를 만드는 육성 기관입니다. 선수 지도, 경기, 몸 준비, 지도자 교육과 국제 교류를 연결하여 소속 팀과 지역을 넘어 배울 기회를 제공합니다. 기업·단체와 지도비, 코트, 장비, 이동과 참가비 등 지원 목적을 정하고 협력합니다. 활동 후 실행 내용과 지원금 사용을 보고합니다.",
  metrics:[["일본 각지","프로그램 운영 경험"],["일본 × 아시아","선수·지도자 교류"],["4","언어"]],
  section:"WHY RBA",sectionTitle:"광고 공간이 아니라 농구 육성 환경을 지원합니다.",
  values:[["PLAY","플레이 기회","다른 코트와 상대를 경험할 기회를 만듭니다."],["LEARN","배움","선수·코치·보호자의 학습을 지원합니다."],["PREPARE","몸 준비","S&C, 회복, 영양, 부상 예방을 연결합니다."],["CONNECT","다음 코트","일본 지역과 아시아 교류를 연결합니다."]],
  platform:"MY HOME COURT",platformTitle:"이벤트를 일상의 성장으로.",platformBody:"일정, 카운트다운, 준비, 참가 기록, Basketball Passport와 다음 기회를 하나의 HOME으로 연결합니다. 파트너는 개인 건강 데이터 없이 육성 환경을 지원합니다.",
  categories:[["SPORTS / APPAREL","장비·의류·대회 준비"],["HEALTH / MEDICAL","안전·부상 예방"],["FOOD / NUTRITION","영양 교육·캠프"],["TRAVEL / MOBILITY","원정·교류"],["IT / DIGITAL","MY HOME COURT"],["LOCAL BUSINESS","지역 클리닉·참가 기회"]],
  pilot:"FIRST PARTNER PILOT",pilotTitle:"합의한 하나의 프로젝트부터 시작합니다.",pilotBody:"처음부터 연간 계약을 요구하지 않습니다. 하나의 농구 프로젝트를 함께 실행하고 결과를 확인한 뒤 지속 여부를 결정합니다.",
  included:["공식 사이트 파트너 표기","대상 프로그램의 브랜드 표기 또는 연계","SNS·JOURNAL 소개","실행 후 간단한 임팩트 리포트"],
  safety:"RBA가 지키는 것",safetyItems:["미성년자 대상 직접 영업 없음","개인 건강·컨디션 데이터 제공 없음","스폰서십과 육성 콘텐츠 명확히 구분","아동 이미지·코멘트는 동의 우선"],
  cta:"다음 파트너를 찾고 있습니다.",ctaBody:"기업이 중요하게 생각하는 가치부터 시작해 하나의 현실적인 농구 프로젝트로 설계합니다.",primary:"파트너십 상담",secondary:"MY HOME COURT 보기"
 }
} as const;

const spartanPartnerCopy={
 ja:{
  label:"TAIWAN / PRINCIPAL STRATEGIC PARTNER",
  title:"SPARTANS Academy（Spartan Academy）",
  description:"台湾・台北を拠点に、育成年代の選手へバスケットボール指導と学びの機会を提供するアカデミーです。実際のゲームを通じた判断力やチームワークも大切にしています。",
  partnership:"RBAが台湾における最重要戦略パートナーとして位置づける団体です。2026年9月に日台の国際育成交流パートナーシップを公表。沖縄での交流キャンプや台湾での選手交流を通じて協力してきました。今後も選手・指導者の継続的な交流と相互学習を進めていきます。",
  link:"SPARTANS公式サイトを見る",
  note:"育成交流・指導者交流・国際ネットワーク"
 },
 en:{
  label:"TAIWAN / PRINCIPAL STRATEGIC PARTNER",
  title:"SPARTANS Academy (Spartan Academy)",
  description:"A Taipei-based youth basketball academy developing decision-making, teamwork and confidence through game-based training and learning.",
  partnership:"RBA recognises SPARTANS as its principal strategic development partner in Taiwan. Our international development partnership was publicly announced in September 2026. After an exchange camp in Okinawa and player exchanges in Taiwan, we are building continued opportunities for players and coaches to learn from each other.",
  link:"Visit the SPARTANS website",
  note:"Youth exchange · Coach development · International network"
 },
 "zh-tw":{
  label:"台灣 / 核心戰略合作夥伴",
  title:"SPARTANS 美語籃球（Spartan Academy）",
  description:"以台北為基地的青少年籃球學院，重視實際比賽情境中的判斷、團隊合作及自信的培養。",
  partnership:"RBA將SPARTANS視為在台灣最重要的戰略培育合作夥伴。雙方於2026年9月公開宣布台日國際籃球培育交流合作，並透過沖繩交流營及台灣的球員交流持續合作。未來也希望持續推動球員與教練之間的互訪和相互學習。",
  link:"前往SPARTANS官方網站",
  note:"青少年交流・教練交流・國際合作網絡"
 },
 ko:{
  label:"대만 / 핵심 전략 파트너",
  title:"SPARTANS Academy (Spartan Academy)",
  description:"타이베이를 기반으로 실제 경기 상황에서의 판단력, 팀워크와 자신감을 중시하는 유소년 농구 아카데미입니다.",
  partnership:"RBA가 대만에서 가장 중요한 전략적 육성 파트너로 여기는 기관입니다. 양측은 2026년 9월 국제 육성 교류 파트너십을 발표했으며, 오키나와 교류 캠프와 대만 선수 교류를 통해 협력해 왔습니다. 앞으로 선수와 지도자의 지속적인 교류 및 상호 학습을 추진합니다.",
  link:"SPARTANS 공식 웹사이트",
  note:"유소년 교류 · 지도자 교류 · 국제 네트워크"
 }
} as const;

const empowerCopy={
 ja:{
  region:"TAIWAN / INTERNATIONAL DEVELOPMENT PARTNER",
  title:"EMPOWER 引爆籃球訓練",
  description:"台湾各地で子どもから若者までのバスケットボール育成、クラブ活動、キャンプ、指導者の学びに取り組む団体です。",
  partnership:"2026年10月、RBAとEMPOWERは育成分野でのパートナーシップに合意しました。日本と台湾の選手・指導者が学び合える関係を育てていきます。個別の共同企画・開催日程は、決まり次第お知らせします。",
  link:"EMPOWER公式サイトを見る"
 },
 en:{
  region:"TAIWAN / INTERNATIONAL DEVELOPMENT PARTNER",
  title:"EMPOWER Basketball Training",
  description:"A Taiwan-based basketball development organisation offering youth clubs, training programmes, camps and coach learning opportunities.",
  partnership:"RBA and EMPOWER agreed to work together as development partners in October 2026. We aim to build opportunities for players and coaches in Japan and Taiwan to learn from each other. Joint programmes and dates will be announced only when confirmed.",
  link:"Visit EMPOWER's official website"
 },
 "zh-tw":{
  region:"台灣 / 國際籃球培育夥伴",
  title:"EMPOWER 引爆籃球訓練",
  description:"EMPOWER在台灣推動青少年籃球俱樂部、訓練課程、特色營隊與教練學習，致力於培育球員與個人成長。",
  partnership:"2026年10月，RBA與EMPOWER確認建立籃球培育合作夥伴關係。希望逐步促進台日球員與教練的交流與學習；具體合作活動與日期將在確認後公告。",
  link:"前往EMPOWER官方網站"
 },
 ko:{
  region:"대만 / 국제 유소년 농구 육성 파트너",
  title:"EMPOWER 농구 트레이닝",
  description:"대만에서 청소년 농구 클럽, 트레이닝 프로그램, 캠프와 코치 교육을 운영하는 육성 단체입니다.",
  partnership:"RBA와 EMPOWER는 2026년 10월 유소년 농구 육성 파트너십에 합의했습니다. 일본과 대만의 선수와 지도자가 서로 배우는 교류를 지향하며, 구체적인 공동 프로그램과 일정은 확정 후 공지합니다.",
  link:"EMPOWER 공식 웹사이트"
 }
} as const;

const icons=[Users2,HeartPulse,ShieldCheck,Globe2];

export function SponsorPartnerPage({locale}:{locale:Locale}){
 const x=c[locale]; const prefix=locale==="en"?"":"/"+locale;
 return <main className="sponsor-page">
  <section className="sponsor-hero section-pad"><div><p className="section-index">{x.kicker}</p><h1>{x.title}</h1><p>{x.lead}</p><div className="sponsor-hero-actions"><a className="button button-orange" href={prefix+"/contact"}>{x.primary}<ArrowRight size={17}/></a><a className="button button-dark" href={prefix+"/my-homecourt"}>{x.secondary}<ArrowUpRight size={17}/></a></div></div><div className="sponsor-ball" aria-hidden="true"><span/><i/><b/></div></section>
  
  <section className="partner-roster" aria-labelledby="partner-roster-title">
   <style>{`
    .partner-roster{--pr-ink:#192329;--pr-paper:#f5f3ee;--pr-stroke:#d6d6d1;--pr-mid:#626963;background:var(--pr-paper);color:var(--pr-ink);padding:76px clamp(20px,5.5vw,88px) 80px}
    .partner-roster *{box-sizing:border-box}
    .partner-roster-inner{max-width:1160px;margin:0 auto}
    .partner-roster-heading{display:flex;justify-content:space-between;align-items:flex-end;gap:28px;padding-bottom:30px;border-bottom:1px solid #babdb7}
    .partner-roster-eyebrow{font-size:11px;letter-spacing:.18em;text-transform:uppercase;font-weight:800;color:#5d6b67;margin:0 0 14px}
    .partner-roster-heading h2{font-size:clamp(27px,3.5vw,45px);letter-spacing:-.03em;font-weight:750;line-height:1.2;margin:0 0 12px;max-width:790px;text-wrap:balance}
    .partner-roster-intro{font-size:14px;line-height:1.85;max-width:700px;color:#485354;margin:0}
    .partner-roster-rba{display:flex;align-items:center;gap:12px;flex-shrink:0;font-size:10px;line-height:1.55;letter-spacing:.09em;font-weight:800;color:#334449;min-width:190px;border-left:1px solid #cccfc8;padding-left:20px}
    .partner-roster-rba img{width:45px;height:64px;object-fit:contain;filter:grayscale(1)}
    .partner-roster-list{display:flex;flex-direction:column;gap:17px;margin:27px 0 0}
    .partner-roster-card{display:grid;grid-template-columns:minmax(180px,250px) minmax(0,1fr);gap:38px;align-items:center;background:#fff;border:1px solid var(--pr-stroke);padding:28px 32px}
    .partner-roster-card--principal{border:1px solid #9daba6;border-left:5px solid #243e34;background:#fcfdfa;padding:34px 34px 34px 31px}
    .partner-roster-logo{width:100%;max-width:240px;aspect-ratio:1/1;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:24px;background:#f1f3f1}
    .partner-roster-logo img{display:block;max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain}
    .partner-roster-logo--spartan{background:#17392f}
    .partner-roster-logo--spartan img{width:100%;height:100%;max-height:100%;object-fit:contain}
    .partner-roster-logo--empower{background:#ffe32b}
    .partner-roster-logo--empower img{max-width:100%;max-height:100%}
    .partner-roster-logo--khm{background:#e9e5db}
    .partner-roster-khm-crop{display:block;width:130px;height:156px;overflow:hidden;position:relative;mix-blend-mode:multiply}
    .partner-roster-khm-crop img{position:absolute;width:499.2px!important;height:665.6px!important;max-width:none!important;max-height:none!important;left:-58.5px;top:-210.17px;mix-blend-mode:multiply;object-fit:fill}
    .partner-roster-category{display:flex;align-items:center;gap:9px;flex-wrap:wrap;margin:0 0 12px;color:#475950;font-size:10px;font-weight:800;letter-spacing:.115em;text-transform:uppercase}
    .partner-roster-category i{display:inline-block;width:17px;height:1px;background:currentColor;flex-shrink:0}
    .partner-roster-card h3{font-size:clamp(21px,2.3vw,30px);letter-spacing:-.018em;line-height:1.35;margin:0 0 13px}
    .partner-roster-card p.partner-roster-description{font-size:14px;line-height:1.95;color:#475151;max-width:780px;margin:0 0 10px}
    .partner-roster-notes{font-size:12px;letter-spacing:.03em;line-height:1.5;color:#6c746b;margin:13px 0 0}
    .partner-roster-card a{font-size:13px;font-weight:750;display:inline-flex;gap:24px;align-items:center;border-bottom:1px solid #64786a;padding:10px 0 7px;text-decoration:none;color:#234436;margin:10px 0 0;min-height:44px}
    .partner-roster-card a:focus-visible{outline:3px solid #4b775e;outline-offset:5px}
    .partner-roster-card a:hover{color:#000;border-color:#000}
    .partner-roster-footer{border-top:1px solid #babdb7;margin-top:30px;padding-top:18px;display:flex;align-items:baseline;gap:16px;color:#5b625e;line-height:1.8;font-size:12px}
    .partner-roster-footer b{white-space:nowrap;letter-spacing:.1em;font-size:10px;color:#354b41}
    @media(max-width:800px){.partner-roster-card{grid-template-columns:190px 1fr;gap:22px;padding:22px}.partner-roster-card--principal{padding:24px}.partner-roster-rba{min-width:unset}}
    @media(max-width:640px){.partner-roster{padding:48px 20px 60px}.partner-roster-heading{display:block;padding-bottom:24px}.partner-roster-rba{margin-top:20px;padding:12px 0 0;border-left:0;border-top:1px solid #d8dad4}.partner-roster-rba img{width:34px;height:46px}.partner-roster-list{gap:12px;margin-top:22px}.partner-roster-card,.partner-roster-card--principal{grid-template-columns:1fr;gap:20px;padding:20px;border-left-width:1px}.partner-roster-card--principal{border-top:4px solid #243e34}.partner-roster-logo{width:100%;max-width:none;height:170px;aspect-ratio:auto;padding:14px}.partner-roster-logo img{height:100%;max-height:100%;width:auto}.partner-roster-category{font-size:10px;letter-spacing:.09em}.partner-roster-card h3{font-size:24px}.partner-roster-footer{display:block}.partner-roster-footer b{display:block;margin-bottom:8px}}
   `}</style>
   <div className="partner-roster-inner">
    <header className="partner-roster-heading">
     <div>
      <p className="partner-roster-eyebrow">RBA / OFFICIAL PARTNERS</p>
      <h2 id="partner-roster-title">{locale==="ja"?"国境を越えて、ともに育成を。":locale==="zh-tw"?"跨越國界，一起培育下一代。":locale==="ko"?"국경을 넘어 함께 성장하는 농구.":"Development built together, across borders."}</h2>
      <p className="partner-roster-intro">{locale==="ja"?"RBAと活動をともにする正式なパートナーをご紹介します。国際育成交流と企業による活動支援、それぞれの役割を分けて掲載しています。":locale==="zh-tw"?"介紹與RBA共同推動活動的正式夥伴。清楚區分國際籃球培育交流及企業支持的不同角色。":locale==="ko"?"RBA의 공식 협력 기관을 소개합니다. 국제 육성 교류와 기업 지원의 역할을 구분해 안내합니다.":"Meet the organisations working alongside RBA. International development collaboration and corporate support are shown as distinct partnerships."}</p>
     </div>
     <div className="partner-roster-rba"><img src="/rba-logo-original.jpg" width="45" height="64" alt="Riot Basketball Academy official crest"/><span>RIOT<br/>BASKETBALL<br/>ACADEMY</span></div>
    </header>
    <div className="partner-roster-list">
     <article className="partner-roster-card partner-roster-card--principal">
      <div className="partner-roster-logo partner-roster-logo--spartan">
       <img src="https://www.spartans.tw/lovable-uploads/4d8424e0-e76f-4947-8c1c-1923e67e3ca5.png" width="512" height="512" loading="eager" alt="SPARTANS Academy 公式ロゴ" />
      </div>
      <div>
       <p className="partner-roster-category"><i/> {spartanPartnerCopy[locale].label}</p>
       <h3>{spartanPartnerCopy[locale].title}</h3>
       <p className="partner-roster-description">{spartanPartnerCopy[locale].description}</p>
       <p className="partner-roster-description">{spartanPartnerCopy[locale].partnership}</p>
       <p className="partner-roster-notes">{spartanPartnerCopy[locale].note}</p>
       <a href="https://www.spartans.tw/" target="_blank" rel="noopener noreferrer">{spartanPartnerCopy[locale].link} <ArrowUpRight size={16} aria-hidden="true"/></a>
      </div>
     </article>
     <article className="partner-roster-card">
      <div className="partner-roster-logo partner-roster-logo--empower">
       <img src="https://www.empower.com.tw/0composition/frontpage/210323/images/svg/empower-logo-b.svg" width="420" height="210" loading="lazy" alt="EMPOWER 引爆籃球訓練 公式ロゴ" />
      </div>
      <div>
       <p className="partner-roster-category"><i/> {empowerCopy[locale].region}</p>
       <h3>{empowerCopy[locale].title}</h3>
       <p className="partner-roster-description">{empowerCopy[locale].description}</p>
       <p className="partner-roster-description">{empowerCopy[locale].partnership}</p>
       <a href="https://www.empower.com.tw/" target="_blank" rel="noopener noreferrer">{empowerCopy[locale].link} <ArrowUpRight size={16} aria-hidden="true"/></a>
      </div>
     </article>
     <article className="partner-roster-card">
      <div className="partner-roster-logo partner-roster-logo--khm">
       <span className="partner-roster-khm-crop"><img src="https://khm-ecrin.com/assets/khm-brand-source.jpeg" alt="合同会社KHM écrin ブランドマーク" width="1152" height="1536" loading="lazy"/></span>
      </div>
      <div>
       <p className="partner-roster-category"><i/> {locale==="ja"?"JAPAN / CORPORATE SUPPORT PARTNER":locale==="zh-tw"?"日本 / 企業支持夥伴":locale==="ko"?"일본 / 기업 지원 파트너":"JAPAN / CORPORATE SUPPORT PARTNER"}</p>
       <h3>{locale==="zh-tw"?"KHM 合同公司":locale==="ko"?"KHM 합동회사":"合同会社KHM"}</h3>
       <p className="partner-roster-description">{locale==="ja"?"「想いをつなぎ、未来を運ぶ。」就労継続支援B型事業所écrin、お食事処écrin、軽貨物運送事業を展開しています。":locale==="zh-tw"?"KHM在日本經營écrin就業支持、餐飲與輕型貨物運送服務。":locale==="ko"?"KHM은 일본에서 écrin 취업 지원, 식음료 서비스 및 소형 화물 운송 사업을 운영합니다.":"KHM operates écrin employment support, a restaurant and a light freight delivery business in Japan."}</p>
       <p className="partner-roster-notes">KOBE · JAPAN</p>
       <a href="https://khm-ecrin.com/" target="_blank" rel="noopener noreferrer">{locale==="ja"?"KHM公式サイトを見る":locale==="zh-tw"?"前往KHM官方網站":locale==="ko"?"KHM 공식 사이트":"Visit KHM's official website"} <ArrowUpRight size={16} aria-hidden="true"/></a>
      </div>
     </article>
    </div>
    <div className="partner-roster-footer"><b>OUR COMMITMENT</b><span>{locale==="ja"?"共同イベントや契約条件は、それぞれの団体との合意に基づいて決定し、確定後にお知らせします。":locale==="zh-tw"?"聯合活動與合作條件將依雙方確認後再正式公告。":locale==="ko"?"공동 프로그램과 세부 조건은 각 파트너와 합의한 후 확정 안내합니다.":"Joint programmes and commercial terms are announced only after they are mutually confirmed."}</span></div>
   </div>
  </section>
  <section className="sponsor-metrics section-pad">{x.metrics.map(([v,l])=><article key={l}><strong>{v}</strong><span>{l}</span></article>)}</section><section className="section-pad"><a className="text-link" href={prefix+"/our-work"}>{({ja:"日本・アジアの開催実績を見る",en:"See our work across Japan and Asia","zh-tw":"查看日本與亞洲的活動實績",ko:"일본·아시아 활동 실적 보기"})[locale]} ↗</a></section>
  <section className="sponsor-why section-pad"><p className="section-index">{x.section}</p><h2>{x.sectionTitle}</h2><div className="sponsor-value-grid">{x.values.map(([tag,title,desc],i)=>{const Icon=icons[i];return <article key={tag}><Icon/><span>{tag}</span><h3>{title}</h3><p>{desc}</p></article>})}</div></section>
  <section className="sponsor-platform section-pad"><div><p className="section-index inverse">{x.platform}</p><h2>{x.platformTitle}</h2><p>{x.platformBody}</p><a href={prefix+"/my-homecourt"}>{x.secondary}<ArrowRight size={16}/></a></div><div className="sponsor-platform-flow"><span>GAME</span><b>→</b><span>PREP</span><b>→</b><span>PLAY</span><b>→</b><span>REFLECT</span><b>→</b><span>NEXT</span></div></section>
  <section className="sponsor-categories section-pad"><p className="section-index">PARTNERSHIP FIT</p><h2>BASKETBALL × BUSINESS</h2><div>{x.categories.map(([tag,desc])=><article key={tag}><span>{tag}</span><p>{desc}</p></article>)}</div></section>
  <section className="sponsor-pilot section-pad"><div className="sponsor-pilot-main"><p className="section-index inverse">{x.pilot}</p><h2>{x.pilotTitle}</h2><p>{x.pilotBody}</p><a className="button button-orange" href={prefix+"/contact"}>{x.primary}<ArrowRight size={17}/></a></div><div className="sponsor-pilot-list">{x.included.map(item=><p key={item}><CheckCircle2/>{item}</p>)}</div></section>
  <section className="sponsor-safety section-pad"><ShieldCheck/><div><p className="section-index">{x.safety}</p>{x.safetyItems.map(item=><p key={item}>{item}</p>)}</div></section>
  <section className="sponsor-final section-pad"><p className="section-index">PARTNER WITH RBA</p><h2>{x.cta}</h2><p>{x.ctaBody}</p><div><a className="button button-orange" href={prefix+"/contact"}>{x.primary}<ArrowRight size={17}/></a><a className="button button-dark" href={localePath(locale,"contact")}>CONTACT RBA<ArrowUpRight size={17}/></a></div></section>
 </main>;
}
