import {ArrowRight,ArrowUpRight,CheckCircle2,Globe2,HeartPulse,ShieldCheck,Users2} from "lucide-react";
import type {Locale} from "./site-frame";
import {localePath} from "./site-frame";

const c={
 ja:{
  kicker:"CORPORATE PARTNERSHIP / BASKETBALL",
  title:"子どもたちの「次の挑戦」を、企業と一緒につくる。",
  lead:"RBAは、全国のバスケットボールクリニック、キャンプ、指導者教育、国際交流と、MY HOME COURTをつなぐ育成プラットフォームです。企業のご支援を、ロゴ掲出だけでなく、実際の育成機会へ変えていきます。",
  metrics:[["3,000+","2025年半ば以降の延べ参加者"],["25","国内活動地域"],["4","対応言語"]],
  section:"WHY RBA",sectionTitle:"広告枠ではなく、バスケットボールの育成環境を支える。",
  values:[["PLAY","プレーする機会","地域や所属だけで挑戦の機会が決まらないよう、外のコートへつなぎます。"],["LEARN","学ぶ機会","選手だけでなく、指導者・保護者にも現代バスケットボールの学びを届けます。"],["PREPARE","身体を準備する","S&C、回復、栄養、怪我予防まで含め、長く競技を続ける土台をつくります。"],["CONNECT","次のコートへ","日本各地とアジアをつなぎ、異なるプレースタイルや価値観に触れる機会をつくります。"]],
  platform:"MY HOME COURT",platformTitle:"イベントで終わらせず、日常の成長へ。",
  platformBody:"練習・試合・大会の予定、カウントダウン、大会準備、参加履歴、Basketball Passport、次の育成機会を一つのHOMEへ。スポンサー企業は個人データにアクセスするのではなく、この育成環境を支えるパートナーとして関わります。",
  categories:[["SPORTS / APPAREL","ボール・ウェア・用具・大会準備"],["HEALTH / MEDICAL","怪我予防・安全・コンディショニング"],["FOOD / NUTRITION","補食・栄養教育・キャンプ"],["TRAVEL / MOBILITY","遠征・移動安全・国内外交流"],["IT / DIGITAL","MY HOME COURT・運営基盤"],["LOCAL BUSINESS","地域クリニック・参加機会"]],
  pilot:"START WITH ONE PROJECT",pilotTitle:"まずは、1つの企画から。",pilotBody:"最初から年間契約を前提にしません。支援したい地域・テーマ・企画を一つ決め、使途と成果が見える形で実施したうえで、次の連携を双方で判断します。",
  included:["公式サイトのパートナー掲載","対象企画での社名・ロゴ掲出または連携","SNS・JOURNAL等での活動紹介","実施後の簡易インパクトレポート"],
  safety:"RBAが守ること",safetyItems:["未成年者への直接営業は行いません","健康・体調などの個人データをスポンサーへ提供しません","広告と育成コンテンツを明確に分けます","肖像・コメントの利用は同意を前提とします"],
  cta:"育成環境を、一緒につくるパートナーへ。",ctaBody:"企業・地域が大切にしている価値と、RBAの育成活動が重なる場所から始めます。ロゴ掲出だけで終わらない連携をご相談ください。",primary:"協賛について相談する",secondary:"MY HOME COURTを見る"
 },
 en:{
  kicker:"CORPORATE PARTNERSHIP / BASKETBALL",title:"Build the next opportunity for young players—together.",lead:"RBA connects youth basketball clinics, camps, coach education, international exchange and MY HOME COURT. Corporate support becomes real development opportunities, not just logo placement.",
  metrics:[["3,000+","participant visits"],["25","locations in Japan"],["4","languages"]],
  section:"WHY RBA",sectionTitle:"Support a basketball development environment—not an ad slot.",
  values:[["PLAY","Opportunities to play","Create access to new courts, opponents and experiences."],["LEARN","Opportunities to learn","Support players, coaches and parents with better learning."],["PREPARE","Prepare the body","Connect S&C, recovery, nutrition and injury prevention."],["CONNECT","Reach the next court","Link local Japanese basketball with wider Asian opportunities."]],
  platform:"MY HOME COURT",platformTitle:"Turn events into daily development.",platformBody:"Schedules, countdowns, preparation, participation history, Basketball Passport and next opportunities live in one HOME. Partners support the environment without receiving private player data.",
  categories:[["SPORTS / APPAREL","Equipment, apparel and event preparation"],["HEALTH / MEDICAL","Safety, injury prevention and conditioning"],["FOOD / NUTRITION","Nutrition education and camps"],["TRAVEL / MOBILITY","Travel and exchange"],["IT / DIGITAL","MY HOME COURT and operations"],["LOCAL BUSINESS","Local clinics and access"]],
  pilot:"FIRST PARTNER PILOT",pilotTitle:"Start with 90 days from JPY 50,000.",pilotBody:"No annual commitment is required first. Run one basketball initiative together, review use and impact, then decide whether to continue.",
  included:["Partner listing on the official site","Brand presence or activation in one agreed programme","RBA story/content introduction","Short impact report after delivery"],
  safety:"What RBA protects",safetyItems:["No direct marketing to minors","No sponsor access to private health or condition data","Clear separation between sponsorship and development content","Consent-first use of youth images and comments"],
  cta:"We are looking for our next partner.",ctaBody:"Start with the value your organisation wants to support. We will shape one realistic basketball project around it.",primary:"Discuss partnership",secondary:"View MY HOME COURT"
 },
 "zh-tw":{
  kicker:"CORPORATE PARTNERSHIP / BASKETBALL",title:"一起為孩子創造下一次挑戰。",lead:"RBA連結日本各地的籃球訓練營、教練教育、國際交流與MY HOME COURT，讓企業支持轉化為真正的培育機會。",
  metrics:[["3,000+","累計參與人次"],["25","日本活動地區"],["4","語言"]],
  section:"WHY RBA",sectionTitle:"支持籃球培育環境，而不只是廣告版位。",
  values:[["PLAY","比賽與挑戰","讓孩子接觸不同球場與對手。"],["LEARN","學習","支持球員、教練與家長的學習。"],["PREPARE","身體準備","連結體能、恢復、營養與傷害預防。"],["CONNECT","下一個球場","連結日本各地與亞洲交流。"]],
  platform:"MY HOME COURT",platformTitle:"讓活動回到日常成長。",platformBody:"行程、倒數、準備、參與紀錄、Basketball Passport與下一個機會集中在一個HOME。企業支持環境，不會取得個人健康資料。",
  categories:[["SPORTS / APPAREL","器材、服裝、比賽準備"],["HEALTH / MEDICAL","安全與傷害預防"],["FOOD / NUTRITION","營養教育與訓練營"],["TRAVEL / MOBILITY","遠征與交流"],["IT / DIGITAL","MY HOME COURT"],["LOCAL BUSINESS","地方訓練與參與機會"]],
  pilot:"FIRST PARTNER PILOT",pilotTitle:"先從90天、5萬日圓起。",pilotBody:"不要求一開始就簽年度合約。先一起完成一個籃球企劃，再根據成果決定是否繼續。",
  included:["官網合作夥伴頁面","指定活動的品牌露出或合作","RBA內容介紹","活動後簡易成果報告"],
  safety:"RBA的原則",safetyItems:["不直接向未成年者行銷","不向贊助商提供個人健康資料","明確區分贊助與培育內容","兒少影像與留言以同意為前提"],
  cta:"我們正在尋找下一位合作夥伴。",ctaBody:"先從貴公司重視的價值開始，再共同設計一個可實行的籃球企劃。",primary:"洽談合作",secondary:"查看MY HOME COURT"
 },
 ko:{
  kicker:"CORPORATE PARTNERSHIP / BASKETBALL",title:"아이들의 다음 도전을 기업과 함께 만듭니다.",lead:"RBA는 전국 농구 클리닉, 캠프, 코치 교육, 국제 교류와 MY HOME COURT를 연결합니다. 기업 지원을 로고 노출이 아니라 실제 육성 기회로 바꿉니다.",
  metrics:[["3,000+","누적 참가"],["25","일본 활동 지역"],["4","언어"]],
  section:"WHY RBA",sectionTitle:"광고 공간이 아니라 농구 육성 환경을 지원합니다.",
  values:[["PLAY","플레이 기회","다른 코트와 상대를 경험할 기회를 만듭니다."],["LEARN","배움","선수·코치·보호자의 학습을 지원합니다."],["PREPARE","몸 준비","S&C, 회복, 영양, 부상 예방을 연결합니다."],["CONNECT","다음 코트","일본 지역과 아시아 교류를 연결합니다."]],
  platform:"MY HOME COURT",platformTitle:"이벤트를 일상의 성장으로.",platformBody:"일정, 카운트다운, 준비, 참가 기록, Basketball Passport와 다음 기회를 하나의 HOME으로 연결합니다. 파트너는 개인 건강 데이터 없이 육성 환경을 지원합니다.",
  categories:[["SPORTS / APPAREL","장비·의류·대회 준비"],["HEALTH / MEDICAL","안전·부상 예방"],["FOOD / NUTRITION","영양 교육·캠프"],["TRAVEL / MOBILITY","원정·교류"],["IT / DIGITAL","MY HOME COURT"],["LOCAL BUSINESS","지역 클리닉·참가 기회"]],
  pilot:"FIRST PARTNER PILOT",pilotTitle:"90일·5만 엔부터 시작합니다.",pilotBody:"처음부터 연간 계약을 요구하지 않습니다. 하나의 농구 프로젝트를 함께 실행하고 결과를 확인한 뒤 지속 여부를 결정합니다.",
  included:["공식 사이트 파트너 표기","대상 프로그램의 브랜드 표기 또는 연계","SNS·JOURNAL 소개","실행 후 간단한 임팩트 리포트"],
  safety:"RBA가 지키는 것",safetyItems:["미성년자 대상 직접 영업 없음","개인 건강·컨디션 데이터 제공 없음","스폰서십과 육성 콘텐츠 명확히 구분","아동 이미지·코멘트는 동의 우선"],
  cta:"다음 파트너를 찾고 있습니다.",ctaBody:"기업이 중요하게 생각하는 가치부터 시작해 하나의 현실적인 농구 프로젝트로 설계합니다.",primary:"파트너십 상담",secondary:"MY HOME COURT 보기"
 }
} as const;

const icons=[Users2,HeartPulse,ShieldCheck,Globe2];

export function SponsorPartnerPage({locale}:{locale:Locale}){
 const x=c[locale]; const prefix=locale==="en"?"":"/"+locale;
 const subject=encodeURIComponent("RBA Corporate Partnership");
 const body=encodeURIComponent(locale==="ja"?"RBAの協賛・パートナーシップについて相談したいです。":"I would like to discuss an RBA partnership.");
 const mail="mailto:riot.training.base@gmail.com?subject="+subject+"&body="+body;
 return <main className="sponsor-page">
  <section className="sponsor-hero section-pad"><div><p className="section-index">{x.kicker}</p><h1>{x.title}</h1><p>{x.lead}</p><div className="sponsor-hero-actions"><a className="button button-orange" href={mail}>{x.primary}<ArrowRight size={17}/></a><a className="button button-dark" href={prefix+"/my-homecourt"}>{x.secondary}<ArrowUpRight size={17}/></a></div></div><div className="sponsor-ball" aria-hidden="true"><span/><i/><b/></div></section>
  <section className="khm-partner" aria-labelledby="khm-partner-title"><style>{`.khm-partner{background:#f3f0e8;color:#222;padding:64px clamp(24px,6vw,88px)}.khm-partner-inner{max-width:1180px;margin:auto}.khm-partner-kicker{font-size:11px;letter-spacing:.15em;color:#715e36}.khm-partner h2{font-size:clamp(24px,3vw,38px);line-height:1.5;margin:12px 0 30px}.khm-partner-card{display:grid;grid-template-columns:190px 1fr;gap:40px;align-items:center;border-top:1px solid #c9bfab;border-bottom:1px solid #c9bfab;padding:30px 0}.khm-partner-mark{display:flex;align-items:center;justify-content:center;background:#e9e2d4;min-height:210px}.khm-partner-crop{display:block;width:130px;height:156px;overflow:hidden;position:relative;mix-blend-mode:multiply}.khm-partner-crop img{position:absolute;width:499.2px!important;height:665.6px!important;max-width:none!important;left:-58.5px;top:-210.17px;mix-blend-mode:multiply}.khm-partner h3{font-size:26px;line-height:1.5;margin:0 0 12px}.khm-partner-copy{font-size:14px;line-height:1.9;max-width:750px}.khm-partner-location{font-size:12px;color:#625e54;margin:15px 0}.khm-partner-link{display:inline-flex;align-items:center;justify-content:space-between;gap:35px;padding:13px 0;border-bottom:1px solid #85734b;color:#222;min-height:48px;font-size:14px}.khm-partner-link:focus-visible{outline:3px solid #85734b;outline-offset:5px}.khm-partner-link:hover{color:#755b22}@media(max-width:640px){.khm-partner{padding:42px 24px}.khm-partner-card{grid-template-columns:1fr;gap:24px}.khm-partner-mark{min-height:190px}.khm-partner h3{font-size:24px}.khm-partner-link{width:100%}}`}</style><div className="khm-partner-inner"><p className="khm-partner-kicker">RBA SPONSORS &amp; PARTNERS</p><h2 id="khm-partner-title">{locale==="ja"?"スポンサー・パートナーのご紹介":"Meet our sponsors & partners"}</h2><article className="khm-partner-card"><div className="khm-partner-mark"><span className="khm-partner-crop"><img src="https://khm-ecrin.com/assets/khm-brand-source.jpeg" alt="écrin：宝石箱を抱えるゴリラのロゴ" loading="lazy" width="1152" height="1536"/></span></div><div><h3>合同会社KHM</h3><p className="khm-partner-copy">{locale==="ja"?"「想いをつなぎ、未来を運ぶ。」合同会社KHMは、就労継続支援B型事業所écrin、お食事処écrin、軽貨物運送事業を運営しています。":"KHM operates écrin, a Type B continuous employment support service, écrin restaurant, and a light freight delivery business in Japan."}</p><p className="khm-partner-location">{locale==="ja"?"所在地：兵庫県神戸市垂水区舞子坂4-8-12-4":"Kobe, Hyogo, Japan"}</p><a className="khm-partner-link" href="https://khm-ecrin.com/" target="_blank" rel="noopener noreferrer">{locale==="ja"?"KHMの公式ホームページを見る":"Visit the KHM website (Japanese)"}<span aria-hidden="true">↗</span></a></div></article></div></section>
  <section className="sponsor-metrics section-pad">{x.metrics.map(([v,l])=><article key={l}><strong>{v}</strong><span>{l}</span></article>)}</section>
  <section className="sponsor-why section-pad"><p className="section-index">{x.section}</p><h2>{x.sectionTitle}</h2><div className="sponsor-value-grid">{x.values.map(([tag,title,desc],i)=>{const Icon=icons[i];return <article key={tag}><Icon/><span>{tag}</span><h3>{title}</h3><p>{desc}</p></article>})}</div></section>
  <section className="sponsor-platform section-pad"><div><p className="section-index inverse">{x.platform}</p><h2>{x.platformTitle}</h2><p>{x.platformBody}</p><a href={prefix+"/my-homecourt"}>{x.secondary}<ArrowRight size={16}/></a></div><div className="sponsor-platform-flow"><span>GAME</span><b>→</b><span>PREP</span><b>→</b><span>PLAY</span><b>→</b><span>REFLECT</span><b>→</b><span>NEXT</span></div></section>
  <section className="sponsor-categories section-pad"><p className="section-index">PARTNERSHIP FIT</p><h2>BASKETBALL × BUSINESS</h2><div>{x.categories.map(([tag,desc])=><article key={tag}><span>{tag}</span><p>{desc}</p></article>)}</div></section>
  <section className="sponsor-pilot section-pad"><div className="sponsor-pilot-main"><p className="section-index inverse">{x.pilot}</p><h2>{x.pilotTitle}</h2><p>{x.pilotBody}</p><a className="button button-orange" href={mail}>{x.primary}<ArrowRight size={17}/></a></div><div className="sponsor-pilot-list">{x.included.map(item=><p key={item}><CheckCircle2/>{item}</p>)}</div></section>
  <section className="sponsor-safety section-pad"><ShieldCheck/><div><p className="section-index">{x.safety}</p>{x.safetyItems.map(item=><p key={item}>{item}</p>)}</div></section>
  <section className="sponsor-final section-pad"><p className="section-index">PARTNER WITH RBA</p><h2>{x.cta}</h2><p>{x.ctaBody}</p><div><a className="button button-orange" href={mail}>{x.primary}<ArrowRight size={17}/></a><a className="button button-dark" href={localePath(locale,"contact")}>CONTACT RBA<ArrowUpRight size={17}/></a></div></section>
 </main>;
}
