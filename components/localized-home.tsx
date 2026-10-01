import { UnitedProjects } from "./united-projects";
import Link from "next/link";
import { ui } from "./ui-copy";
import { NetworkMaps } from "./network-maps";
import { ArrowRight, ArrowUpRight, House, MessageCircle, MoveDown, Users } from "lucide-react";
import { LanguagePage, Locale, SiteFrame, localePath } from "@/components/site-frame";
import { GrowthSections } from "@/components/growth-sections";
import { PaidProgrammes } from "@/components/paid-programmes";
import { GlobalMedia } from "@/components/global-media";
import { CoachEducationLoop } from "./coach-education-loop";
import { AudienceJourneys } from "@/components/audience-journeys";
import { torstenRegistrationUrl } from "@/components/programme-data";
import { PlatformQuickFinder } from "@/components/platform-quick-finder";

const copy={
  en:{
    title:["Built in the gym.","Connected across Asia."],lede:"RBA is a youth basketball development organisation from Sendai, Japan. We connect modern player development, evidence-informed physical preparation, coach learning and purposeful international exchange.",
    primary:"Find a programme",secondary:"Invite RBA",proof:[["3,000+","participants since mid-2025"],["25","activity locations across Japan"],["4 LANG","EN · 日本語 · 繁中 · 한국어"]],image:"The work continues after the whistle.",
    clinicLabel:"ONLINE COACH CLINIC · 25 NOV 2026",clinicTitle:"The modern basketball game of shooters.",clinicCopy:"A 90-minute Zoom clinic with Torsten Loibl on developing shooters, designing shooting programmes and creating high-percentage shots. English session with Japanese consecutive interpretation.",clinicDetail:"Clinic details",clinicApply:"Register for 25 November",clinicHero:"25 NOV · TORSTEN LOIBL ONLINE CLINIC",clinicAchievements:[["B.LEAGUE","Head Coach · Levanga Hokkaido"],["JAPAN","U16 · U18 · U19 development"],["3x3 JAPAN","National-team coaching"],["WORLD CHAMPION","2019 Women’s U23 · Director Coach"]],
    routesLabel:"START HERE",routesTitle:"One organisation. Six clear doors.",routesCopy:"Choose the route that matches what you need now.",routes:[["PLAYERS & FAMILIES","See clinics and current development opportunities","opportunities"],["DEVELOPMENT CAMP","Train, play, reflect and take growth back home","camp"],["RBA UNITED","Join tournaments, trips and exchanges as a time-limited team","united"],["COACHES","Learn through the Torsten Loibl clinic","events/torsten-loibl-online-clinic"],["ORGANISERS","Bring an RBA programme to your community","clinic-request"],["ASIA PARTNERS","Build a responsible connection with Japan","asia"]],
    position:"OUR POSITION",positionTitle:["Development is not selection.","Development is not winning early."],positionCopy:"Young players need environments that help them see, decide, execute and reflect. RBA designs age-appropriate learning around the game while treating strength and conditioning as science: load, recovery, sleep, nutrition and long-term health.",readApproach:"Read our approach",
    workLabel:"WHAT RBA CONNECTS",workTitle:"Four disciplines. One development environment.",work:[["01","PLAYER DEVELOPMENT","Perception, decisions, timing, spacing, fundamentals and playing with others."],["02","S&C","Evidence-informed physical preparation, load management and long-term health."],["03","COACH LEARNING","Questions, observation, practice design and international coach education."],["04","ASIA EXCHANGE","Purposeful academy, coach and player exchange—not basketball tourism."]],
    asiaLabel:ui("en","access"),asiaTitle:["A practical first contact","for basketball in Japan."],asiaCopy:"For academies, teams, coaches and families across Asia. Tell us who you are, the players' ages, timing and learning purpose. RBA will help make the realistic next step clear.",asiaCta:"Enter Japan Access",
    recordLabel:"FIELD RECORD",recordTitle:"Local context first.",recordCopy:"RBA has worked from Sendai to Kawasaki, Kobe, Saga and Okinawa. We do not copy one package everywhere. We listen, identify the real development question and shape the programme around the people and place.",about:"About RBA",
    contactLabel:"START WITH THE REAL QUESTION",contactTitle:["What does your environment","need next?"],contactCopy:"Clinics, camps, coach learning, Japan–Asia exchange, S&C dialogue and aligned partnerships.",contact:"Contact RBA",whatsapp:"Talk on WhatsApp"
  },
  ja:{
    title:["子どもの未来から、","育成を考える。"],lede:"今いるチームを大切にしながら、地域の外にも学びや挑戦の場を持つ。RBAは、全国の活動や海外交流、育成情報をつなぐプラットフォームです。",
    primary:"募集中の活動を見る",secondary:"RBAを地域に呼ぶ",proof:[["3,000+","2025年半ば以降の延べ参加者"],["25","国内25地域で活動"],["4言語","日本語・英語・繁体字中国語・韓国語"]],image:"次のコートが、ここから見つかる。",
    clinicLabel:"全国の指導者へ · 2026年11月25日",clinicTitle:"シューター育成を、90分で具体的に学ぶ。",clinicCopy:"トーステン・ロイブル氏から、シューターの育て方、練習の組み立て方、試合で良いシュートを生み出す考え方を学ぶ90分のオンライン講習です。日本語の逐次通訳があります。",clinicDetail:"講習内容と講師実績を見る",clinicApply:"11月25日の講習に申し込む",clinicHero:"11月25日｜トーステン・ロイブル オンライン講習",clinicAchievements:[["B.LEAGUE","レバンガ北海道 ヘッドコーチ"],["日本代表","U16・U18・U19日本代表を指導"],["3x3日本代表","ナショナルチームを指導"],["世界一","2019年女子U23ワールドカップ優勝時のディレクターコーチ"]],
    routesLabel:"目的から選ぶ",routesTitle:"今やりたいことから選ぶ。",routesCopy:"参加したい、学びたい、チームを良くしたい、海外と交流したい。目的に合う入口から進めます。",routes:[["選手・保護者","現在募集中のクリニックやキャンプを探す","opportunities"],["DEVELOPMENT CAMP","練習・ゲーム・振り返りを通して、自分の課題を見つける","camp"],["RBA UNITED","大会・遠征・国際交流に、期間限定チームで参加する","united"],["指導者","トーステン氏のオンライン講習で学ぶ","events/torsten-loibl-online-clinic"],["ミニバスチーム","普段の練習やチームづくりを、外部から支援する","minibasket-support"],["主催者・団体","地域やクラブでクリニックやキャンプを開催する","work-with-rba"],["海外アカデミー","日本での交流や合同練習を相談する","asia"]],
    position:"私たちの考え方",positionTitle:["勝つことと、","育てることは同じではない。"],positionCopy:"勝利を否定するのではなく、育成年代で何を身につけてほしいかを考えます。見る・選ぶ・実行する力と、長く競技を続けられる身体を育てます。",readApproach:"RBAの育成方針を読む",
    workLabel:"RBAが取り組むこと",workTitle:"記事を書くことだけでなく、実際の活動をつくる。",work:[["01","選手が判断する","状況を見る、選ぶ、実行する、振り返る。コーチの答えではなく、自分の判断を育てます。"],["02","身体を守りながら伸ばす","S&C、負荷管理、回復、睡眠、栄養まで含め、長く競技を続ける土台をつくります。"],["03","指導者が学び続ける","観察、問いかけ、練習設計、国内外の考え方に触れながら、普段の指導を見直せる場をつくります。"],["04","所属の外にも経験の場をつくる","地域や所属だけで選択肢が決まらないよう、全国の活動や海外交流に参加できる場を増やします。"]],
    asiaLabel:ui("ja","access"),asiaTitle:["日本でのバスケットボール交流を、","相談する。"],asiaCopy:"海外チーム・アカデミーとの交流、試合、キャンプ、指導者交流を相談できます。目的と年代に合わせて実現方法を整理します。",asiaCta:"海外連携を相談する",
    recordLabel:"活動実績",recordTitle:"地域ごとの違いを大切に、全国へ。",recordCopy:"仙台、川崎、神戸、佐賀、沖縄など各地で活動。地域の状況を聞き、子どもの長期的な成長を軸に内容を組み立てます。",about:"RBAについて",
    contactLabel:"チームや活動について相談する",contactTitle:["まだ形になっていない相談でも、","大丈夫です。"],contactCopy:"選手育成、チームの練習、S&C、指導者向け講習、海外交流など。何を頼めばよいか決まっていない段階でもご相談いただけます。",contact:"RBAに相談する",whatsapp:"WhatsAppで相談"
  },
  "zh-tw":{
    title:["扎根球場，","連結亞洲。"],lede:"RBA是以日本仙台為基地的青少年籃球培育機構。我們整合現代球員發展、科學化體能訓練、教練學習與有明確目的的國際交流。",
    primary:"查看活動日程",secondary:"邀請RBA",proof:[["3,000+","2025年中以來累計參與人次"],["25","日本全國活動地區"],["4語言","EN・日本語・繁中・한국어"]],image:"哨聲結束後，成長仍在繼續。",
    clinicLabel:"國際線上教練講座 · 2026年11月25日",clinicTitle:"現代籃球中的射手培養與運用",clinicCopy:"Torsten Loibl將在90分鐘Zoom講座中分享射手技術培養、投籃課程設計，以及如何在比賽中創造高命中率機會。英語授課並提供日文逐步口譯。",clinicDetail:"查看講座詳情",clinicApply:"報名11月25日講座",clinicHero:"11月25日 · TORSTEN LOIBL線上講座",clinicAchievements:[["B.LEAGUE","Levanga北海道總教練"],["日本代表","U16・U18・U19培育"],["3x3日本代表","國家隊執教經驗"],["世界冠軍","2019女子U23世界盃 Director Coach"]],
    routesLabel:"從這裡開始",routesTitle:"參加。培育。挑戰。合作。",routesCopy:"清楚區分 Development Camp 與 RBA UNITED，依目的選擇入口。",routes:[["球員與家庭","尋找目前開放的培育機會","opportunities"],["DEVELOPMENT CAMP","透過訓練、比賽與反思深化成長","camp"],["RBA UNITED","以期間限定團隊挑戰大會、遠征與交流","united"],["教練","參加Torsten Loibl線上教練講座","events/torsten-loibl-online-clinic"],["主辦單位","邀請RBA到您的城市或球隊","clinic-request"],["亞洲夥伴","與日本建立負責任的籃球交流","asia"]],
    position:"我們的立場",positionTitle:["培育不是選拔。","也不是提早求勝。"],positionCopy:"年輕球員需要學會觀察、選擇、執行與反思。RBA以比賽為核心設計符合年齡的學習，並以負荷、恢復、睡眠、營養與長期健康作為體能訓練基礎。",readApproach:"閱讀培育理念",
    workLabel:"RBA連結的領域",workTitle:"四個專業領域，一個完整培育環境。",work:[["01","球員發展","閱讀情境、決策、節奏、空間、基本功與團隊合作。"],["02","體能訓練","科學化體能準備、負荷管理、恢復與長期健康。"],["03","教練學習","提問、觀察、訓練設計，以及直接向國際教練學習。"],["04","亞洲交流","不是籃球觀光，而是圍繞共同培育課題的真實交流。"]],
    asiaLabel:ui("zh-tw","access"),asiaTitle:["連結日本籃球的，","第一個實務窗口。"],asiaCopy:"為亞洲的學院、球隊、教練與家庭服務。請告訴我們單位、球員年齡、希望時間與學習目標，RBA將協助整理可行的下一步。",asiaCta:"洽詢日本交流",
    recordLabel:"現場足跡",recordTitle:"先理解在地環境。",recordCopy:"RBA曾在仙台、川崎、神戶、佐賀與沖繩等不同地區工作。我們不複製固定方案，而是先理解現場，再從真正的培育問題設計活動。",about:"關於RBA",
    contactLabel:"從真正的問題開始",contactTitle:["您的環境，","下一步需要什麼？"],contactCopy:"訓練營、教練學習、日本交流、體能對話與合作夥伴關係。計畫尚未完整也可以先聯絡。",contact:"聯絡RBA",whatsapp:"WhatsApp洽詢"
  },
  ko:{
    title:["코트에서 성장하고,","아시아와 연결됩니다."],lede:"RBA는 일본 센다이를 기반으로 하는 유소년 농구 육성 기관입니다. 현대적인 선수 성장, 과학적 체력 훈련, 코치 교육과 목적 있는 국제 교류를 하나의 환경으로 연결합니다.",
    primary:"프로그램 일정 보기",secondary:"RBA 클리닉 요청",proof:[["3,000+","2025년 중반 이후 누적 참가자"],["25","일본 전역 활동 지역"],["4개 언어","EN · 日本語 · 繁中 · 한국어"]],image:"휘슬이 멈춘 뒤에도 성장은 계속됩니다.",
    clinicLabel:"국제 온라인 코치 클리닉 · 2026년 11월 25일",clinicTitle:"현대 농구에서 슈터를 육성하고 활용하는 방법",clinicCopy:"Torsten Loibl과 함께 슈터의 기술 육성, 슈팅 프로그램 설계, 경기에서 높은 확률의 슛을 만드는 전략을 배우는 90분 Zoom 세션입니다. 영어 진행 및 일본어 순차 통역이 제공됩니다.",clinicDetail:"클리닉 상세 보기",clinicApply:"11월 25일 신청",clinicHero:"11월 25일 · TORSTEN LOIBL 온라인 클리닉",clinicAchievements:[["B.LEAGUE","레반가 홋카이도 감독"],["일본 대표","U16・U18・U19 육성"],["3x3 일본 대표","국가대표 지도 경력"],["세계 챔피언","2019 여자 U23 월드컵 Director Coach"]],
    routesLabel:"여기에서 시작하세요",routesTitle:"참가하고. 성장하고. 도전하고. 연결합니다.",routesCopy:"Development Camp와 RBA UNITED를 구분하고 목적에 맞는 입구를 선택합니다.",routes:[["선수와 가족","현재 모집 중 성장 기회 찾기","opportunities"],["DEVELOPMENT CAMP","훈련·게임·회고를 통해 성장을 깊게 만들기","camp"],["RBA UNITED","기간 한정 팀으로 대회·원정·교류에 도전하기","united"],["코치","Torsten Loibl 온라인 클리닉에서 배우기","events/torsten-loibl-online-clinic"],["주최자와 단체","지역 또는 팀에 RBA 초대하기","clinic-request"],["아시아 파트너","일본과 책임 있는 농구 교류 만들기","asia"]],
    position:"우리의 관점",positionTitle:["성장은 선발이 아닙니다.","일찍 이기는 것도 아닙니다."],positionCopy:"어린 선수에게는 보고, 선택하고, 실행하고, 돌아보는 환경이 필요합니다. RBA는 게임 중심의 연령별 학습과 부하·회복·수면·영양·장기적 건강에 기반한 S&C를 설계합니다.",readApproach:"육성 철학 읽기",
    workLabel:"RBA가 연결하는 영역",workTitle:"네 가지 전문 영역. 하나의 성장 환경.",work:[["01","선수 육성","인지, 판단, 타이밍, 공간, 기본기와 동료와 함께 플레이하는 능력."],["02","S&C","과학적 체력 준비, 부하 관리, 회복과 장기적인 건강."],["03","코치 학습","질문, 관찰, 훈련 설계와 국제 코치에게 직접 배우는 기회."],["04","아시아 교류","농구 관광이 아닌, 공동 육성 과제를 중심으로 한 실제 교류."]],
    asiaLabel:ui("ko","access"),asiaTitle:["일본 농구와 연결되는","실질적인 첫 창구."],asiaCopy:"아시아의 아카데미, 팀, 지도자와 가족을 위한 창구입니다. 단체, 선수 연령, 희망 시기와 학습 목적을 알려 주시면 현실적인 다음 단계를 함께 정리합니다.",asiaCta:"일본 교류 상담",
    recordLabel:"현장 기록",recordTitle:"지역의 맥락에서 시작합니다.",recordCopy:"RBA는 센다이, 가와사키, 고베, 사가, 오키나와 등 서로 다른 환경에서 활동했습니다. 하나의 패키지를 반복하지 않고 현장의 실제 성장 과제를 바탕으로 프로그램을 설계합니다.",about:"RBA 소개",
    contactLabel:"진짜 질문에서 시작하세요",contactTitle:["당신의 환경에","다음으로 필요한 것은 무엇입니까?"],contactCopy:"클리닉, 캠프, 코치 교육, 일본–아시아 교류, S&C와 파트너십. 계획이 완성되지 않아도 상담할 수 있습니다.",contact:"RBA에 문의",whatsapp:"WhatsApp 상담"
  }
} as const;

const homecourtCopy={
  en:{label:"RBA HOMECOURT / FREE MEMBER ACCESS",title:"Start free from MY HOME COURT.",body:"Choose PLAYER, PARENT or COACH. Access programmes, communities and role-based content, then upgrade only when paid membership fits.",open:"Open MY HOME COURT",about:"Free & paid membership",roles:["PLAYER","PARENT","COACH"]},
  ja:{label:"RBA / MY HOME COURT",title:"参加したこと、学んだことを、自分の記録に残す。",body:"MY HOME COURTは、活動を探したり、育成記事を読んだり、参加履歴や振り返りをまとめたりできる自分専用のページです。RBA IDは無料。毎週のテーマや振り返りまで使いたい方には、月額3,300円のHOMECOURT PLUSがあります。",open:"無料でRBA IDをつくる",about:"HOMECOURT PLUSを見る",roles:["PLAYER／選手","PARENT／保護者","COACH／指導者"]},
  "zh-tw":{label:"RBA HOMECOURT / 會員專區",title:"會員請從MY HOME COURT開始。",body:"活動日程、報名、付款、規則與角色專屬內容，集中在同一個清楚入口。",open:"開啟會員專區",about:"了解RBA HOMECOURT",roles:["球員","家長","教練"]},
  ko:{label:"RBA HOMECOURT / 회원 페이지",title:"회원은 MY HOME COURT에서 시작하세요.",body:"일정, 신청, 결제, 규정과 역할별 콘텐츠를 하나의 명확한 입구에 모았습니다.",open:"회원 페이지 열기",about:"RBA HOMECOURT 안내",roles:["선수","보호자","코치"]},
} as const;

export function LocalizedHome({locale}:{locale:Locale}){
  const c=copy[locale];
  const hc=homecourtCopy[locale];
  const message=locale==="ja"?"RBAについて相談したいです。":locale==="zh-tw"?"您好RBA，我想詢問活動或日本交流。":locale==="ko"?"안녕하세요 RBA. 프로그램이나 일본 교류에 대해 문의하고 싶습니다.":"Hello RBA, I would like to discuss a programme or Japan–Asia exchange.";
  const whatsapp="https://wa.me/818032483703?text="+encodeURIComponent(message);
  const torstenFeature=<section className={`torsten-feature section-pad${locale==="ja"?" torsten-feature-ja":""}`}><div><p className="section-index inverse">{c.clinicLabel}</p><p className="torsten-name">TORSTEN<br/>LOIBL</p></div><div><p className="eyebrow">{ui(locale,"offer")}</p><h2>{c.clinicTitle}</h2><p>{c.clinicCopy}</p><div className="torsten-achievements">{c.clinicAchievements.map(([label,detail])=><div key={label}><strong>{label}</strong><span>{detail}</span></div>)}</div><div className="sponsor-actions"><a className="button button-light" href={localePath(locale,"events/torsten-loibl-online-clinic")}>{c.clinicDetail}<ArrowRight size={17}/></a><a className="text-link light-link" href={torstenRegistrationUrl} target="_blank" rel="noreferrer">{c.clinicApply}<ArrowUpRight size={16}/></a></div></div></section>;
  return <div lang={locale==="zh-tw"?"zh-Hant-TW":locale}><SiteFrame locale={locale}>
    <section className="hero-grid"><div className="hero-copy"><p className="eyebrow">RIOT BASKETBALL ACADEMY · JAPAN</p><h1><span>{c.title[0]}</span><span>{c.title[1]}</span></h1><p className="hero-lede">{c.lede}</p><PlatformQuickFinder locale={locale}/>{locale==="ja"&&<a className="hero-clinic-alert" href={localePath(locale,"events/torsten-loibl-online-clinic")}><span>NOW OPEN</span><strong>{c.clinicHero}</strong><ArrowRight size={18}/></a>}<div className="hero-actions">{locale==="ja"?<a className="button button-dark" href="/ja/united#united-open">韓国・マレーシア｜RBA UNITED募集中</a>:null}<a className="button button-light" href={localePath(locale,"opportunities")}>{c.primary}<ArrowRight size={17}/></a><a className="button button-member" href={locale==="en"?"/my-homecourt/login":`/${locale}/my-homecourt/login${locale==="ja"?"?source=homepage":""}`}><House size={17}/>{locale==="ja"?"RBA IDを無料でつくる":hc.open}<ArrowRight size={17}/></a><a className="text-link light-link" href={localePath(locale,"clinic-request")}>{c.secondary}<ArrowRight size={16}/></a></div><div className="hero-proof">{c.proof.map(([n,l])=><div key={n}><strong>{n}</strong><span>{l}</span></div>)}</div></div><div className="hero-image" role="img" aria-label={c.image}><div className="image-note">{c.image}</div><MoveDown className="scroll-mark" size={19}/></div></section>

    {locale==="ja"?<section className="rba-quick-entry section-pad">
      <div className="section-head">
        <div><p className="section-index">START HERE</p><h2>まずは、ここから。</h2></div>
        <p>知りたいことに近い入口から見てください。記事、活動、指導者向けの学び、参加機会の4つに分けています。</p>
      </div>
      <div className="rba-quick-entry-grid">
        <Link href="/ja/journal/rba-united-yaima-cup-2026"><span>01 / VOICES</span><h3>参加者の声から知る</h3><p>YAIMA CUPで選手・保護者に何が残ったのか。実際の声から活動の雰囲気を知れます。</p><strong>参加者の声を読む<ArrowRight size={16}/></strong></Link>
        <Link href="/ja/journal"><span>02 / JOURNAL</span><h3>育成記事から見る</h3><p>ミニバス、U15、出場時間、練習量、チーム選び。気になる悩みから読めます。</p><strong>気になる記事を探す<ArrowRight size={16}/></strong></Link>
        <Link href="/ja/d-hub/coaches"><span>03 / COACHES</span><h3>指導者向けの学びを見る</h3><p>D-HUB COACH LAB、実践記事、年間カリキュラム。現場で試せる形にしています。</p><strong>D-HUBを見る<ArrowRight size={16}/></strong></Link>
        <Link href="/ja/opportunities"><span>04 / JOIN</span><h3>今参加できる活動を見る</h3><p>クリニック、キャンプ、RBA UNITED、スクール。募集中のものだけ確認できます。</p><strong>募集中を見る<ArrowRight size={16}/></strong></Link>
      </div>
    </section>:null}

    <PaidProgrammes locale={locale}/>

    {locale==="ja"?<UnitedProjects compact/>:null}
    <section className="homecourt-home-feature section-pad"><div className="homecourt-home-mark"><span>MY</span><strong>HOME<br/>COURT</strong></div><div className="homecourt-home-copy"><p className="section-index">{hc.label}</p><h2>{hc.title}</h2><p>{hc.body}</p><div className="homecourt-home-roles">{hc.roles.map(role=><span key={role}><Users size={15}/>{role}</span>)}</div><div className="homecourt-home-actions"><a className="button button-dark" href={locale==="ja"?"/ja/my-homecourt/login?source=homepage-homecourt":localePath(locale,"my-homecourt")}><House size={17}/>{hc.open}<ArrowRight size={17}/></a><a className="text-link" href={localePath(locale,"home-court")}>{hc.about}<ArrowRight size={16}/></a></div></div></section>

    {locale==="ja"?<section className="statement section-pad"><p className="section-index">BEYOND YOUR TEAM</p><div><h2>今いるチームを大切にしながら、<br/>チームの外でも学べます。</h2><p>所属を変えなくても、違う指導者や仲間とプレーする機会を持てます。普段の活動を続けながら、別の環境も経験できます。</p><a className="text-link" href="/ja/opportunities">参加できる活動を探す<ArrowRight size={16}/></a></div></section>:null}
    <AudienceJourneys locale={locale}/>
    {locale==="ja"&&torstenFeature}
    {locale!=="ja"&&torstenFeature}
    <CoachEducationLoop locale={locale}/>

    <section className="locale-routes section-pad"><div className="section-head"><div><p className="section-index">{c.routesLabel}</p><h2>{c.routesTitle}</h2></div><p>{c.routesCopy}</p></div><div className="locale-route-grid">{c.routes.map(([tag,title,page])=><a href={localePath(locale,page as LanguagePage)} key={tag}><span>{tag}</span><h3>{title}</h3><ArrowUpRight size={22}/></a>)}</div></section>

    <section className="statement section-pad"><p className="section-index">{c.position}</p><div><h2>{c.positionTitle[0]}<br/>{c.positionTitle[1]}</h2><p>{c.positionCopy}</p><a className="text-link" href={localePath(locale,"approach")}>{c.readApproach}<ArrowRight size={16}/></a></div></section>

    <section className="rba-standards section-pad"><div className="section-head"><div><p className="section-index">{c.workLabel}</p><h2>{c.workTitle}</h2></div></div><div className="standards-grid">{c.work.map(([n,t,b])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{b}</p></article>)}</div></section>

    <section className="asia-desk-home section-pad"><div><p className="section-index inverse">{c.asiaLabel}</p><h2>{c.asiaTitle[0]}<br/>{c.asiaTitle[1]}</h2></div><div><p>{c.asiaCopy}</p><div className="desk-languages"><span>ENGLISH</span><span>日本語</span><span>繁體中文</span><span>한국어</span></div><a className="button button-light" href={localePath(locale,"asia")}>{c.asiaCta}<ArrowRight size={17}/></a></div></section>

    <section className="field-footprint section-pad"><div><p className="section-index inverse">{c.recordLabel}</p><h2>{c.recordTitle}</h2><p>{c.recordCopy}</p><a className="text-link light-link" href={localePath(locale,"about")}>{c.about}<ArrowRight size={16}/></a></div><div className="footprint-numbers"><div><strong>{locale==="ja"?"3,000+":"3,000+"}</strong><span>{ui(locale,"players")}</span></div><div><strong>25</strong><span>{({en:"ACTIVITY LOCATIONS",ja:"国内25地域で活動","zh-tw":"日本全國活動地區",ko:"일본 전역 활동 지역"})[locale]}</span></div><div><strong>JP × ASIA</strong><span>{ui(locale,"nextField")}</span></div></div></section>

    {locale==="ja"?<section className="homecourt-product-preview section-pad">
      <div className="section-head">
        <div><p className="section-index">NEW · SENDAI U15</p><h2>10月スタート。毎週木曜日、仙台で「ゲームで使える力」を育てる。</h2></div>
        <p>2026年10月開始のU15定期スクール。小学6年生も参加可。仙台市太白区、18:00〜19:30、原則月3回。入会金5,500円＋月額7,700円（税込）、定員25名です。</p>
      </div>
      <div className="homecourt-preview-grid">
        <article><span>01</span><h3>SEE</h3><p>相手・味方・スペースを見て、プレーする前から情報を集める。</p></article>
        <article><span>02</span><h3>DECIDE</h3><p>1on1、スペーシング、ヘルプの状況から自分で選択する。</p></article>
        <article><span>03</span><h3>ACT</h3><p>Small-Sided Gamesで判断と技術をゲームの中でつなぐ。</p></article>
        <article><span>04</span><h3>36 SESSIONS</h3><p>月3回・年間36回。単発ではなく一年を通して育成を積み上げる。</p></article>
      </div>
      <div className="homecourt-launch-actions"><a className="button button-dark" href="/ja/u15-skill-up">年間計画・申込を見る<ArrowRight size={17}/></a><a className="text-link" href="https://form.jotform.com/262678369675074" target="_blank" rel="noreferrer">申込フォームを直接開く<ArrowUpRight size={16}/></a></div>
    </section>:null}

    <GlobalMedia locale={locale}/>
    <NetworkMaps locale={locale}/>
    <GrowthSections locale={locale}/>
    {locale==="ja"?<section className="homecourt-product-preview section-pad">
      <div className="section-head">
        <div><p className="section-index">WORK WITH RBA</p><h2>RBAと一緒に、実際の活動をつくる。</h2></div>
        <p>クリニック、キャンプ、地域開催、海外交流、企業連携など、実際の活動を一緒につくります。</p>
      </div>
      <div className="homecourt-preview-grid">
        <article><span>01</span><h3>ミニバスの練習やチームづくりを見直す</h3><p>今いるチームを大切にしながら、練習設計、映像レビュー、指導者相談、訪問支援まで。まずチーム育成診断で、今の状況を整理します。</p><a className="text-link" href="/ja/minibasket-support">MINIBASKET SUPPORTを見る<ArrowRight size={16}/></a></article>
        <article><span>02</span><h3>継続拠点をつくる</h3><p>地域の指導者、会場、チームと連携し、一度きりではない活動の形をつくります。</p><a className="text-link" href="/ja/regional-host">REGIONAL HOSTを見る<ArrowRight size={16}/></a></article>
        <article><span>03</span><h3>海外とつなぐ</h3><p>交流試合、キャンプ、指導者交流などを、目的と年代に合わせて組み立てます。</p><a className="text-link" href="/ja/international">海外連携を見る<ArrowRight size={16}/></a></article>
        <article><span>04</span><h3>企業として支える</h3><p>協賛を地域開催、参加機会、安全な活動環境、国内外の交流へ具体的につなげます。</p><a className="text-link" href="/ja/partners">協賛・連携を見る<ArrowRight size={16}/></a></article>
      </div>
      <div className="homecourt-launch-actions"><a className="button button-dark" href="/ja/work-with-rba">RBAとの活動のつくり方を見る<ArrowRight size={17}/></a></div>
    </section>:null}
    <section className="closing-cta section-pad"><p className="eyebrow">{c.contactLabel}</p><h2>{c.contactTitle[0]}<br/>{c.contactTitle[1]}</h2><p>{c.contactCopy}</p><div className="closing-actions"><a className="button button-orange" href={localePath(locale,"contact")}>{c.contact}<ArrowRight size={17}/></a><a className="button button-dark" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={17}/>{c.whatsapp}</a></div></section>
  </SiteFrame></div>;
}
