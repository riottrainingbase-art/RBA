import { OkinawaCampPartner } from "./okinawa-camp-partner";
import {ArrowRight,ArrowUpRight,CheckCircle2,Globe2,HeartPulse,ShieldCheck,Users2} from "lucide-react";
import type {Locale} from "./site-frame";
import sponsorOfferStyles from "./sponsor-recruitment-offers.module.css";
import { SponsorProgrammeClarity } from "./sponsor-programme-clarity";
import { MvpPublicPartner } from "./mvp-public-partner";
import {localePath} from "./site-frame";

const c={
 ja:{
  kicker:"CORPORATE PARTNERSHIP / BASKETBALL",
  title:"子どもたちの「次の挑戦」を、企業と一緒につくる。",
  lead:"RBAは、全国のバスケットボールクリニック、キャンプ、指導者教育、国際交流と、MY HOME COURTをつなぐ育成プラットフォームです。企業のご支援を、ロゴ掲出だけでなく、実際の育成機会へ変えていきます。",
  metrics:[["3,000+","延べ参加者"],["25","国内活動地域"],["4","対応言語"]],
  section:"WHY RBA",sectionTitle:"広告枠ではなく、バスケットボールの育成環境を支える。",
  values:[["PLAY","プレーする機会","地域や所属だけで挑戦の機会が決まらないよう、外のコートへつなぎます。"],["LEARN","学ぶ機会","選手だけでなく、指導者・保護者にも現代バスケットボールの学びを届けます。"],["PREPARE","身体を準備する","S&C、回復、栄養、怪我予防まで含め、長く競技を続ける土台をつくります。"],["CONNECT","次のコートへ","日本各地とアジアをつなぎ、異なるプレースタイルや価値観に触れる機会をつくります。"]],
  platform:"MY HOME COURT",platformTitle:"イベントで終わらせず、日常の成長へ。",
  platformBody:"練習・試合・大会の予定、カウントダウン、大会準備、参加履歴、Basketball Passport、次の育成機会を一つのHOMEへ。スポンサー企業は個人データにアクセスするのではなく、この育成環境を支えるパートナーとして関わります。",
  categories:[["SPORTS / APPAREL","ボール・ウェア・用具・大会準備"],["HEALTH / MEDICAL","怪我予防・安全・コンディショニング"],["FOOD / NUTRITION","補食・栄養教育・キャンプ"],["TRAVEL / MOBILITY","遠征・移動安全・国内外交流"],["IT / DIGITAL","MY HOME COURT・運営基盤"],["LOCAL BUSINESS","地域クリニック・参加機会"]],
  pilot:"FIRST PARTNER PILOT",pilotTitle:"まずは90日・5万円からの企画提案。",pilotBody:"企画協賛の参考案です。無条件の提供価格や活動実施を確約するものではありません。対象企画、必要費用、企業名・ロゴの掲出媒体と期間、実施後の報告内容を見積・契約で決め、継続は双方で判断します。月額企業広告とは別の制度です。",
  included:["公式サイトのパートナー掲載","対象企画での社名・ロゴ掲出または連携","SNS・JOURNAL等での活動紹介","実施後の簡易インパクトレポート"],
  safety:"RBAが守ること",safetyItems:["未成年者への直接営業は行いません","健康・体調などの個人データをスポンサーへ提供しません","広告と育成コンテンツを明確に分けます","肖像・コメントの利用は同意を前提とします"],
  cta:"次の育成機会を、一緒につくる。",ctaBody:"企業が大切にしている価値と、RBAの育成活動が重なる場所を先に決めます。まず一つの企画からご相談ください。",primary:"協賛について相談する",secondary:"MY HOME COURTを見る"
 },
 en:{
  kicker:"CORPORATE PARTNERSHIP / BASKETBALL",title:"Build the next opportunity for young players—together.",lead:"RBA connects youth basketball clinics, camps, coach education, international exchange and MY HOME COURT. Corporate support becomes real development opportunities, not just logo placement.",
  metrics:[["3,000+","participant visits"],["25","locations in Japan"],["4","languages"]],
  section:"WHY RBA",sectionTitle:"Support a basketball development environment—not an ad slot.",
  values:[["PLAY","Opportunities to play","Create access to new courts, opponents and experiences."],["LEARN","Opportunities to learn","Support players, coaches and parents with better learning."],["PREPARE","Prepare the body","Connect S&C, recovery, nutrition and injury prevention."],["CONNECT","Reach the next court","Link local Japanese basketball with wider Asian opportunities."]],
  platform:"MY HOME COURT",platformTitle:"Turn events into daily development.",platformBody:"Schedules, countdowns, preparation, participation history, Basketball Passport and next opportunities live in one HOME. Partners support the environment without receiving private player data.",
  categories:[["SPORTS / APPAREL","Equipment, apparel and event preparation"],["HEALTH / MEDICAL","Safety, injury prevention and conditioning"],["FOOD / NUTRITION","Nutrition education and camps"],["TRAVEL / MOBILITY","Travel and exchange"],["IT / DIGITAL","MY HOME COURT and operations"],["LOCAL BUSINESS","Local clinics and access"]],
  pilot:"FIRST PARTNER PILOT",pilotTitle:"Start with 90 days from JPY 50,000.",pilotBody:"Illustrative project proposal only, not a fixed offer or confirmed event. Scope, cost, recognition and reporting are agreed in writing before any commitment.",
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
  pilot:"FIRST PARTNER PILOT",pilotTitle:"先從90天、5萬日圓起。",pilotBody:"此為活動合作參考方案，非固定報價或已確認活動。合作範圍、費用、品牌呈現與成果報告須先以書面確認。",
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
  pilot:"FIRST PARTNER PILOT",pilotTitle:"90일·5만 엔부터 시작합니다.",pilotBody:"참고용 프로젝트 제안이며 확정 가격이나 개최 확정이 아닙니다. 범위, 비용, 브랜드 표기, 결과 보고는 서면으로 합의합니다.",
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
 const sponsorEnquiry = locale === "ja" ? "https://form.jotform.com/263089038431054" : "https://form.jotform.com/262592604093055";
 const externalEnquiry = {target:"_blank" as const,rel:"noopener noreferrer"};
 return <main className="sponsor-page">
  <section className="sponsor-hero section-pad"><div><p className="section-index">{x.kicker}</p><h1>{x.title}</h1><p>{x.lead}</p><div className="sponsor-hero-actions"><a className="button button-orange" href={sponsorEnquiry} {...externalEnquiry}>{x.primary}<ArrowRight size={17}/></a><a className="button button-dark" href={locale==="ja"?"/ja/work-with-rba":prefix+"/my-homecourt"} data-growth-id={locale==="ja"?"partner-network-business":"partner-homecourt"}>{locale==="ja"?"地域・アジアの共同事業":x.secondary}<ArrowUpRight size={17}/></a></div></div><div className="sponsor-ball" aria-hidden="true"><span/><i/><b/></div></section>
  <section className={sponsorOfferStyles.section} id="asia-partnership" aria-labelledby="asia-partnership-title">
    <div className={sponsorOfferStyles.inner}>
      <div className={sponsorOfferStyles.heading}><p className={sponsorOfferStyles.eyebrow}>RBA UNITED ASIA / 2027 · PARTNERSHIP PROSPECTUS</p>
        <h2 id="asia-partnership-title">{({ja:"子どもの可能性を、国境で止めない。",en:"Opportunity should not stop at a border.","zh-tw":"不讓國界限制孩子的可能性。",ko:"아이들의 가능성을 국경으로 제한하지 않습니다."})[locale]}</h2>
        <p lang="en">Different Teams. Different Countries. One Future.</p>
        <p>{({ja:"RBAは非営利の青少年育成活動です。RBA UNITEDは所属チームを変えず、企画ごとに個人で国内外の交流へ参加できる仕組み。台湾・マレーシア・フィリピンと日本を結ぶ双方向の育成機会を構想しています。企業や財団には、広告ではなく、子どもの安全・学び・参加機会を共に支えるパートナーとしての参画をお願いします。",en:"RBA is a non-profit-purpose youth development initiative. RBA UNITED enables individual participation in domestic and international exchanges without leaving a home team. Our 2027 vision connects Japan with Taiwan, Malaysia and the Philippines in both directions. We invite businesses and foundations to support safe access, learning and participation—not marketing to children.","zh-tw":"RBA 是以非營利為目的的青少年培育活動。RBA UNITED 讓球員無需更換原屬球隊，即可以個人身分參與國內外交流。我們希望在2027年建立日本與台灣、馬來西亞、菲律賓的雙向培育機會，邀請企業與基金會共同支持兒少安全、學習與參與，而非向兒少行銷。",ko:"RBA는 비영리 목적의 유소년 육성 활동입니다. RBA UNITED는 소속팀을 유지하며 국내외 교류에 개인으로 참가하는 방식입니다. 2027년에는 일본과 대만·말레이시아·필리핀의 양방향 육성 기회를 구상합니다. 기업과 재단에 아동 대상 마케팅이 아닌 안전한 참가, 배움과 기회를 지원하는 협력을 제안합니다."})[locale]}</p>
      </div>
      <div className={sponsorOfferStyles.grid}>
        {([
          ["ACCESS",({ja:"参加機会を広げる",en:"Fund access","zh-tw":"拓展參與機會",ko:"참가 기회 지원"})[locale],({ja:"対象企画の参加費補助、会場費、必要用具。経済的な負担を減らす具体的な支援。",en:"Support verified programme fees, court hire and essential equipment to reduce barriers.","zh-tw":"支持已確認活動的參加費補助、場地與必要器材，降低參與門檻。",ko:"확정된 프로그램 참가비, 시설과 필수 장비 지원으로 장벽을 낮춥니다."})[locale]],
          ["EXCHANGE",({ja:"アジアの交流を支える",en:"Enable exchange","zh-tw":"支持亞洲交流",ko:"아시아 교류 지원"})[locale],({ja:"現地受入・通訳・安全な交流運営を支援。旅行手配は必要な登録・正式契約に従います。",en:"Support hosting, interpreting and safe exchange operations. Regulated travel arrangements require qualified partners and formal contracts.","zh-tw":"支持接待、口譯與安全交流，受規範的旅遊安排須由合格合作方依正式合約辦理。",ko:"현지 수용, 통역과 안전한 교류 운영을 지원합니다. 규제 대상 여행 업무는 자격 있는 파트너와 정식 계약이 필요합니다."})[locale]],
          ["LEARNING",({ja:"継続的な育成を支える",en:"Support ongoing learning","zh-tw":"支持持續學習",ko:"지속적인 성장 지원"})[locale],({ja:"MY HOME COURTと指導者教育の継続、子どもの記録を守りながら学びを次へつなぎます。",en:"Support MY HOME COURT and coach education while protecting private youth records.","zh-tw":"支持 MY HOME COURT 與教練教育，並保護兒少的私人紀錄。",ko:"MY HOME COURT와 코치 교육을 지원하며 아동의 개인 기록을 보호합니다."})[locale]]
        ] as const).map(([tag,title,body])=><article key={tag} className={sponsorOfferStyles.card}><span className={sponsorOfferStyles.plan}>{tag}</span><h3>{title}</h3><p>{body}</p></article>)}
      </div>
      <div className={sponsorOfferStyles.heading}><h3>{({ja:"支援の使途と成果を明確に",en:"Clear use of support and accountable outcomes","zh-tw":"明確用途與負責任的成果報告",ko:"지원 용도와 성과를 명확하게"})[locale]}</h3><p>{({ja:"企業ごとに、対象活動・予算・支援範囲・実施期間・許諾された社名掲出・報告項目を合意します。実施後は参加機会数、実施内容、支援金の使途、学びの振り返りを可能な範囲で匿名集計して報告。協賛・物品・専門協力を歓迎します。",en:"Agree on the activity, budget, support scope, duration, approved recognition and reporting in writing. After delivery, report aggregate participation, activities, use of funds and learning reflections where available. Financial, in-kind and expert support are welcome.","zh-tw":"以書面確認活動、預算、支持範圍、期間、授權品牌呈現及報告項目。活動後在可行範圍內提供匿名統計的參與機會、執行內容、資金用途與學習回饋。歡迎資金、物資及專業協力。",ko:"활동, 예산, 지원 범위, 기간, 승인된 기업 표기와 보고 항목을 서면으로 합의합니다. 활동 후 참가 기회, 진행 내용, 자금 사용과 학습 회고를 가능한 범위에서 익명 집계해 보고합니다. 현금·현물·전문 협력을 환영합니다."})[locale]}</p></div>
      <div className="sponsor-hero-actions"><a className="button button-orange" href={sponsorEnquiry} {...externalEnquiry} data-growth-id="asia-partner-enquiry">{({ja:"アジア育成協賛を無料相談",en:"Discuss an Asia development partnership","zh-tw":"免費洽詢亞洲培育合作",ko:"아시아 육성 협력 무료 상담"})[locale]}<ArrowRight size={17}/></a><a className="button button-dark" href={localePath(locale,"united")+"#united-asia"}>RBA UNITED ASIA<ArrowUpRight size={17}/></a><a className="button button-light" href={mail}>{({ja:"メールで相談",en:"Email RBA","zh-tw":"電郵洽詢",ko:"이메일 문의"})[locale]}<ArrowRight size={17}/></a></div>
      <p className={sponsorOfferStyles.disclosure}>{({ja:"構想段階の国・企画を確定開催と表示しません。相談は無料で、契約・請求は発生しません。協賛の税務上の取扱い・広告効果は保証せず、子どもの名簿・健康データは提供しません。",en:"Proposed destinations are not confirmed events. Enquiries are free and create no contract or charge. Tax treatment and advertising results are not guaranteed. Private youth data is never shared with sponsors.","zh-tw":"構想中的地區及活動並非已確認。洽詢免費，不成立合約或產生費用。不保證稅務待遇或廣告效果，不向贊助商提供兒少私人資料。",ko:"구상 중인 지역과 활동은 확정된 일정이 아닙니다. 상담은 무료이며 계약·청구가 발생하지 않습니다. 세무상 처리나 광고 효과를 보장하지 않으며 아동의 개인정보를 제공하지 않습니다."})[locale]}</p>
    </div>
  </section>
  {locale === "ja" && <section className={sponsorOfferStyles.section} id="sponsor-options" aria-labelledby="sponsor-options-title">
    <div className={sponsorOfferStyles.inner}>
      <div className={sponsorOfferStyles.heading}>
        <p className={sponsorOfferStyles.eyebrow}>RBA / CORPORATE SPONSORS WANTED</p>
        <h2 id="sponsor-options-title">企業スポンサー・協賛パートナーを募集しています。</h2>
        <p>毎月の広告掲載から、地域クリニック・キャンプ、指導者教育、全国・海外での育成交流まで。企業のご希望に沿う支援方法を一緒に考えます。契約・掲載条件や活動実績の報告は、方法ごとに整理してご案内します。</p>
      </div>
      <div className={sponsorOfferStyles.grid}>
        <article className={sponsorOfferStyles.card + " " + sponsorOfferStyles.cardPrimary}>
          <span className={sponsorOfferStyles.plan}>01 / MONTHLY ADVERTISING</span>
          <h3>企業広告パートナー</h3>
          <p className={sponsorOfferStyles.price}>月額10,000円＋税</p>
          <p>1社1口、税込11,000円／月。公式サイト内の応援ページでの企業紹介・許諾済みロゴ・リンク、活動レポートへの掲載を基本とする定型プランです。トップページ掲出は個別契約の対象です。掲載開始・更新・解約条件は専用ページをご確認ください。</p>
          <a className={sponsorOfferStyles.link} href="/ja/support#apply" data-growth-id="sponsor-monthly-plan">企業広告の詳細・申込を見る →</a>
        </article>
        <article className={sponsorOfferStyles.card}>
          <span className={sponsorOfferStyles.plan}>02 / PROJECT PARTNERSHIP</span>
          <h3>クリニック・キャンプ協賛</h3>
          <p className={sponsorOfferStyles.price}>企画ごとにご相談</p>
          <p>会場、備品、指導者、移動、参加費補助など、具体的な活動への協力です。90日パイロット案も含め、金額・期間・企業名掲出・成果報告の条件は個別に協議します。</p>
          <a className={sponsorOfferStyles.link + " " + sponsorOfferStyles.linkAlt} href="https://form.jotform.com/263089038431054" target="_blank" rel="noopener noreferrer" data-growth-id="sponsor-project-enquiry">無料で協賛相談をする ↗</a>
        </article>
        <article className={sponsorOfferStyles.card}>
          <span className={sponsorOfferStyles.plan}>03 / DEVELOPMENT PARTNERSHIP</span>
          <h3>全国育成・海外交流連携</h3>
          <p className={sponsorOfferStyles.price}>年間・共同企画</p>
          <p>全国育成ツアー、指導者教育、アジアの育成年代との交流、物品・専門的な知識の提供など。目的・使途・実施報告・費用は個別に設計します。</p>
          <a className={sponsorOfferStyles.link + " " + sponsorOfferStyles.linkAlt} href="/ja/national-tour" data-growth-id="sponsor-national-tour">全国育成ツアーの協賛企画 →</a>
        </article>
      </div>
      <p className={sponsorOfferStyles.disclosure}>無料の相談フォーム送信だけでは契約・掲載・請求は確定しません。企業名・ロゴは許諾や掲載条件の確認後に公開します。未成年者の名簿や健康情報はスポンサーへ提供しません。広告効果や税務上の取扱いを保証するものではありません。<a href="/ja/support#accounting">掲載内容・経理資料・利用条件</a>をご確認ください。</p>
    </div>
  </section>}
  {locale === "ja" && <SponsorProgrammeClarity />}
  <section className="khm-partner" aria-labelledby="khm-partner-title"><style>{`.khm-partner{background:#f3f0e8;color:#222;padding:64px clamp(24px,6vw,88px)}.khm-partner-inner{max-width:1180px;margin:auto}.khm-partner-kicker{font-size:11px;letter-spacing:.15em;color:#715e36}.khm-partner h2{font-size:clamp(24px,3vw,38px);line-height:1.5;margin:12px 0 30px}.khm-partner-card{display:grid;grid-template-columns:190px 1fr;gap:40px;align-items:center;border-top:1px solid #c9bfab;border-bottom:1px solid #c9bfab;padding:30px 0}.khm-partner-mark{display:flex;align-items:center;justify-content:center;background:#e9e2d4;min-height:210px}.khm-partner-crop{display:block;width:130px;height:156px;overflow:hidden;position:relative;mix-blend-mode:multiply}.khm-partner-crop img{position:absolute;width:499.2px!important;height:665.6px!important;max-width:none!important;left:-58.5px;top:-210.17px;mix-blend-mode:multiply}.khm-partner h3{font-size:26px;line-height:1.5;margin:0 0 12px}.khm-partner-copy{font-size:14px;line-height:1.9;max-width:750px}.khm-partner-location{font-size:12px;color:#625e54;margin:15px 0}.khm-partner-link{display:inline-flex;align-items:center;justify-content:space-between;gap:35px;padding:13px 0;border-bottom:1px solid #85734b;color:#222;min-height:48px;font-size:14px}.khm-partner-link:focus-visible{outline:3px solid #85734b;outline-offset:5px}.khm-partner-link:hover{color:#755b22}@media(max-width:640px){.khm-partner{padding:42px 24px}.khm-partner-card{grid-template-columns:1fr;gap:24px}.khm-partner-mark{min-height:190px}.khm-partner h3{font-size:24px}.khm-partner-link{width:100%}}`}</style><div className="khm-partner-inner"><p className="khm-partner-kicker">RBA SPONSORS &amp; PARTNERS</p><h2 id="khm-partner-title">{locale==="ja"?"スポンサー・パートナーのご紹介":"Meet our sponsors & partners"}</h2><article className="khm-partner-card"><div className="khm-partner-mark"><span className="khm-partner-crop"><img src="https://khm-ecrin.com/assets/khm-brand-source.jpeg" alt="écrin：宝石箱を抱えるゴリラのロゴ" loading="lazy" width="1152" height="1536"/></span></div><div><h3>合同会社KHM</h3><p className="khm-partner-copy">{locale==="ja"?"「想いをつなぎ、未来を運ぶ。」合同会社KHMは、就労継続支援B型事業所écrin、お食事処écrin、軽貨物運送事業を運営しています。":"KHM operates écrin, a Type B continuous employment support service, écrin restaurant, and a light freight delivery business in Japan."}</p><p className="khm-partner-location">{locale==="ja"?"所在地：兵庫県神戸市垂水区舞子坂4-8-12-4":"Kobe, Hyogo, Japan"}</p><a className="khm-partner-link" href="https://khm-ecrin.com/" target="_blank" rel="noopener noreferrer">{locale==="ja"?"KHMの公式ホームページを見る":"Visit the KHM website (Japanese)"}<span aria-hidden="true">↗</span></a></div></article></div></section>
  {locale === "ja" && (
    <section className={sponsorOfferStyles.section} id="flatbell" aria-labelledby="flatbell-title">
      <div className={sponsorOfferStyles.inner}>
        <article className={sponsorOfferStyles.card}>
          <span className={sponsorOfferStyles.plan}>車両利用に関する連携</span>
          <h2 id="flatbell-title">株式会社FlatBell</h2>
          <img src="https://flatbell.jp/images/logo.jpg" alt="FlatBell公式ロゴ" width={240} loading="lazy" style={{ maxWidth: "100%", height: "auto", display: "block", margin: "0.75rem 0" }} />
          <p>仙台を拠点に軽貨物配送や軽バンリースを手がける株式会社FlatBellに、RBAのスクールやクリニックで使用する用具の運搬に車両が必要な際、日程に応じて相談させていただきます。</p>
          <a className={sponsorOfferStyles.link} href="https://flatbell.jp/" target="_blank" rel="noopener noreferrer">株式会社FlatBell 公式サイト ↗</a>
        </article>
      </div>
    </section>
  )}
  <MvpPublicPartner locale={locale}/>
  <OkinawaCampPartner locale={locale}/>
  <section className="sponsor-metrics section-pad">{x.metrics.map(([v,l])=><article key={l}><strong>{v}</strong><span>{l}</span></article>)}</section>
  <section className="sponsor-why section-pad"><p className="section-index">{x.section}</p><h2>{x.sectionTitle}</h2><div className="sponsor-value-grid">{x.values.map(([tag,title,desc],i)=>{const Icon=icons[i];return <article key={tag}><Icon/><span>{tag}</span><h3>{title}</h3><p>{desc}</p></article>})}</div></section>
  <section className="sponsor-platform section-pad"><div><p className="section-index inverse">{x.platform}</p><h2>{x.platformTitle}</h2><p>{x.platformBody}</p><a href={prefix+"/my-homecourt"}>{x.secondary}<ArrowRight size={16}/></a></div><div className="sponsor-platform-flow"><span>GAME</span><b>→</b><span>PREP</span><b>→</b><span>PLAY</span><b>→</b><span>REFLECT</span><b>→</b><span>NEXT</span></div></section>
  <section className="sponsor-categories section-pad"><p className="section-index">PARTNERSHIP FIT</p><h2>BASKETBALL × BUSINESS</h2><div>{x.categories.map(([tag,desc])=><article key={tag}><span>{tag}</span><p>{desc}</p></article>)}</div></section>
  <section className="sponsor-pilot section-pad"><div className="sponsor-pilot-main"><p className="section-index inverse">{x.pilot}</p><h2>{x.pilotTitle}</h2><p>{x.pilotBody}</p><a className="button button-orange" href={sponsorEnquiry} {...externalEnquiry}>{x.primary}<ArrowRight size={17}/></a></div><div className="sponsor-pilot-list">{x.included.map(item=><p key={item}><CheckCircle2/>{item}</p>)}</div></section>
  <section className="sponsor-safety section-pad"><ShieldCheck/><div><p className="section-index">{x.safety}</p>{x.safetyItems.map(item=><p key={item}>{item}</p>)}</div></section>
  <section className="sponsor-final section-pad"><p className="section-index">PARTNER WITH RBA</p><h2>{x.cta}</h2><p>{x.ctaBody}</p><div><a className="button button-orange" href={sponsorEnquiry} {...externalEnquiry}>{x.primary}<ArrowRight size={17}/></a>{locale==="ja"&&<a className="button button-dark" href="/ja/family-basketball">企業・団体の親子企画を見る<ArrowRight size={17}/></a>}<a className="button button-dark" href={localePath(locale,"contact")}>CONTACT RBA<ArrowUpRight size={17}/></a></div></section>
 </main>;
}
