import { ArrowRight, ArrowUpRight, CalendarDays, Check, CreditCard, GraduationCap, HeartHandshake, House, MapPin, ShieldCheck } from "lucide-react";
import { Locale, SiteFrame, localePath } from "./site-frame";

export type AudienceKind="players"|"families"|"coaches"|"home-court";
type Text4=[string,string,string,string];
const ix:Record<Locale,number>={en:0,ja:1,"zh-tw":2,ko:3};
const t=(text:Text4,locale:Locale)=>text[ix[locale]];

const common={
 schedule:["Current programmes","募集中のプログラム","近期活動","모집 중 프로그램"] as Text4,
 contact:["Ask RBA","RBAへ相談する","洽詢RBA","RBA에 문의"] as Text4,
 policies:["Participation & safety policies","参加規約・安全方針","參加與安全政策","참가·안전 정책"] as Text4,
 home:["MY HOME COURT","MY HOME COURT","MY HOME COURT","MY HOME COURT"] as Text4,
  notFinal:["Free registration is open. RBA HOMECOURT is an optional JPY 3,300 monthly plan; the Stripe checkout details take priority.","RBA IDから、活動や学びへの一歩を。気になるプログラムの日程や参加条件を確認して、自分に合う挑戦を見つけましょう。","免費會員登錄已開放。RBA HOMECOURT為可選的每月3,300日圓方案，以Stripe頁面為準。","무료 회원 등록이 열려 있습니다. RBA HOMECOURT는 선택형 월 3,300엔 플랜이며 Stripe 화면이 우선합니다."] as Text4,
};

const pages:Record<AudienceKind,{
 kicker:Text4; title:Text4; lead:Text4; statement:Text4;
 sections:{icon:"calendar"|"shield"|"learn"|"home"|"map"|"pay";title:Text4;body:Text4;items:Text4[]}[];
  actions:{label:Text4;href:"schedule"|"contact"|"policies"|"home-court"|"players"|"families"|"coaches"|"events/torsten-loibl-online-clinic"|"clinic-request"|"my-homecourt/login";external?:string}[];
 homeCourt?:"member"|"partner";
}>={
 players:{
  kicker:["FOR PLAYERS","選手の方へ","給球員","선수를 위해"],
  title:["Find the court that moves you forward.","次の成長につながるコートを見つけよう。","找到讓自己進步的下一個球場。","나를 앞으로 이끄는 다음 코트로."],
  lead:["RBA connects weekly learning, clinics, camps, 3x3 and international experiences. Choose by age, place and the challenge you need now.","毎週のスクールから、全国クリニック、宿泊キャンプ、3x3、海外交流まで。年代・地域・今の課題から、自分に合う次の機会を選べます。","從每週課程、全國訓練營、住宿營、3x3到海外交流，依年齡、地區與現在的課題選擇。","주간 스쿨부터 전국 클리닉, 숙박 캠프, 3x3, 해외 교류까지 연령과 지역, 현재 과제에 맞춰 선택할 수 있습니다."],
  statement:["See. Choose. Execute. Reflect.","見る。選ぶ。実行する。そして、振り返る。","觀察、選擇、執行、回顧。","보고, 선택하고, 실행하고, 돌아봅니다."],
  sections:[
   {icon:"calendar",title:["Join now","現在参加できる活動","目前可參加","현재 참가 가능"],body:["Check every open clinic, camp and online programme in one calendar.","募集中のクリニック、キャンプ、育成プログラムを一覧で確認できます。","一次查看所有開放報名的活動。","모집 중인 클리닉과 캠프를 한눈에 확인합니다."],items:[["Age group, date and location","対象年代・日程・会場","年齡、日期與地點","대상·일정·장소"],["Fee and payment route","参加費・決済方法","費用與付款方式","참가비·결제 방식"],["Direct official application","公式フォームから直接申し込む","直接進入官方表單","공식 신청서로 바로 이동"]]},
   {icon:"learn",title:["Regular development","継続して学ぶ","持續培育","지속적인 성장"],body:["The Sendai U12 school runs Saturdays, 16:30–18:00, at the former Sanezawa Elementary School for Grades 4–6.","仙台U12スクールは、旧実沢小学校で毎週土曜16:30〜18:00に開催しています。対象は小学4〜6年生、月額6,600円です。","仙台U12課程每週六16:30–18:00於舊實澤小學舉行，對象為小學4–6年級。","센다이 U12 스쿨은 옛 사네자와 초등학교에서 매주 토요일 16:30~18:00 진행됩니다."],items:[["Perception and decision-making","状況を見る力・判断する力・ゲームを理解する力","認知與判斷","인지·판단"],["Coordination and physical literacy","コーディネーションと身体づくり","協調與身體素養","코디네이션과 신체 발달"],["Learning connected to the game","試合につながる学び","與比賽連結的學習","경기로 이어지는 배움"]]},
   {icon:"home",title:["Another home court","もうひとつのホームコート","另一個主場","또 하나의 홈 코트"],body:["RBA HOMECOURT is the monthly membership for players and families who want a continuing connection to RBA beyond one event.","MY HOME COURTは、一度きりの参加で終わらず、RBAの活動や次の学びにつなげるための場所です。","RBA HOMECOURT讓球員與家庭持續參與RBA。","RBA HOMECOURT는 선수와 가족이 RBA와 지속적으로 연결되는 오픈형 멤버십입니다."],items:[["Regional HOMECOURT SESSION","地域のHOMECOURT SESSION","地區SESSION","지역 SESSION"],["Clinics, camps and new member content","クリニック・キャンプと会員向けコンテンツ","活動與會員內容","클리닉·캠프와 회원 콘텐츠"],["A clear next step from MY HOME COURT","MY HOME COURTから次の活動へ","從MY HOME COURT前往下一活動","MY HOME COURT에서 다음 활동으로"]]},
  ],
  actions:[{label:common.schedule,href:"schedule"},{label:common.home,href:"home-court"},{label:common.contact,href:"contact"}],homeCourt:"member"
 },
 families:{
  kicker:["FOR FAMILIES","保護者の方へ","給家長","보호자를 위해"],
  title:["Know the details before you decide.","納得して選べるように、必要な情報を分かりやすく。","在決定前確認所有必要資訊。","결정하기 전에 필요한 정보를 명확하게."],
  lead:["RBA makes the age group, fee, payment route, safety expectations and cancellation terms visible before participation.","対象年代、参加費、費用に含まれるもの、決済方法、安全面、キャンセル条件を確認してから申し込めるように整理しています。" ,"報名前確認年齡、費用、付款、安全與取消規定。","신청 전에 대상 연령, 비용, 결제, 안전과 취소 조건을 확인할 수 있습니다."],
  statement:["A clear process protects children and families.","分かりやすい手続きが、子どもとご家族の安心につながります。","清楚的流程保護孩子與家庭。","명확한 절차가 아이와 가족을 보호합니다."],
  sections:[
   {icon:"pay",title:["Application and payment","申込・決済","報名與付款","신청·결제"],body:["Submitting a form does not always confirm a place. Follow the payment link shown after submission or the message sent by RBA.","フォーム送信だけでは申込が確定しない企画があります。送信後の確認画面、またはRBAから届く案内に従って決済してください。","提交表單後依確認畫面或RBA通知完成付款。","폼 제출 후 확인 화면 또는 RBA 안내에 따라 결제합니다."],items:[["Check what the fee includes","費用に含まれるものを確認","確認費用包含內容","비용 포함 항목 확인"],["Use only the official payment link","公式案内の決済リンクを使用","只使用官方付款連結","공식 결제 링크 사용"],["Keep the confirmation message","受付完了の案内を保管","保存確認通知","확정 안내 보관"]]},
   {icon:"shield",title:["Safety and consent","安全・同意","安全與同意","안전·동의"],body:["Health, allergy, emergency contact and media consent information is collected only when needed for the programme.","健康状態、アレルギー、緊急連絡先、写真・映像の同意は、各企画の運営に必要な範囲で取り扱います。","健康、過敏、緊急聯絡與影像同意只在必要範圍使用。","건강, 알레르기, 긴급 연락처와 촬영 동의는 필요한 범위에서만 사용합니다."],items:[["Parent or responsible-adult consent","保護者または責任者の同意","家長或負責成人同意","보호자 동의"],["Event-specific cancellation terms","企画ごとのキャンセル条件","各活動取消規定","프로그램별 취소 규정"],["Ask before payment when unclear","不明点は決済前に確認","不清楚時付款前詢問","불명확하면 결제 전 문의"]]},
   {icon:"home",title:["A place to return to","子どもの成長を支える、もうひとつの居場所","適合孩子的另一個歸屬","아이에게 맞는 또 하나의 공간"],body:["RBA HOMECOURT connects one-time participation with continuing opportunities through a clear family route in MY HOME COURT.","MY HOME COURTでは、一度きりの参加で終わらず、次の活動や学びへつなげていきます。今後の予定、申込・決済、参加規約、保護者向けのお知らせもまとめて確認できます。","RBA HOMECOURT把單次參加連結至持續活動與紀錄。","RBA HOMECOURT는 일회성 참가를 지속적인 활동과 기록으로 연결합니다."],items:[["Programme and eligibility information","活動内容・対象年代の確認","活動與對象資訊","프로그램·대상 확인"],["Official registration and payment routes","公式の申込・決済ページ","官方報名與付款","공식 신청·결제"],["Policies, safety and support","参加規約・安全方針・相談窓口","規則、安全與支援","규정·안전·지원"]]},
  ],
  actions:[{label:common.policies,href:"policies"},{label:common.schedule,href:"schedule"},{label:common.home,href:"home-court"},{label:common.contact,href:"contact"}],homeCourt:"member"
 },
 coaches:{
  kicker:["FOR COACHES","コーチ・指導者の方へ","給教練","코치·지도자를 위해"],
  title:["Learn. Host. Build a home court.","学ぶ。RBAを呼ぶ。地域にホームコートをつくる。","學習、邀請，建立地區主場。","배우고, 초대하고, 지역의 홈 코트를 만듭니다."],
  lead:["Choose the route that fits your role: learn through coach education, invite RBA to your team, or become a HOME COURT PARTNER in your region.","指導者講習で学ぶ。チームや地域でRBAのプログラムを開催する。HOME COURT PARTNERとして地域の育成環境をつくる。今の目的に合うところから始められます。","透過教練教育學習、邀請RBA或成為地區夥伴。","코치 교육, RBA 초청, HOME COURT PARTNER 중 역할에 맞는 길을 선택합니다."],
  statement:["Better environments begin with better questions.","より良い育成環境は、より良い問いから始まる。","更好的培育環境始於更好的問題。","더 나은 육성 환경은 더 나은 질문에서 시작됩니다."],
  sections:[
   {icon:"learn",title:["LEARN","学ぶ","學習","배우기"],body:["Connect international coaching, practice design, player development and evidence-informed S&C to daily work.","海外指導者からの学び、練習設計、選手育成、S&Cの考え方を、日々の現場へつなげます。","把國際教練、訓練設計與S&C帶回日常。","국제 코칭, 훈련 설계와 S&C를 현장에 연결합니다."],items:[["Torsten Loibl online clinic","トーステン・ロイブル氏オンライン講習","Torsten Loibl線上講座","Torsten Loibl 온라인 강의"],["Open RBA coach community","RBA指導者オープンコミュニティ","RBA開放教練社群","RBA 오픈 코치 커뮤니티"],["RBA development articles","RBAの育成記事","RBA培育文章","RBA 육성 콘텐츠"]]},
   {icon:"calendar",title:["HOST","RBAを呼ぶ","邀請","초청"],body:["Request an RBA clinic, camp, S&C session or coach dialogue for your team or region.","チームや地域で、RBAのクリニック、キャンプ、S&C、指導者向け講習を開催できます。","為球隊或地區邀請RBA活動。","팀과 지역에 RBA 프로그램을 초청할 수 있습니다."],items:[["Share player ages, group size and development goal","対象年代・人数・育成課題を共有","提供年齡、人數與目標","대상·인원·육성 과제 공유"],["Receive a proposed format and estimate","実施内容と見積もりを確認","確認方案與報價","운영안과 견적 확인"],["Confirm venue, staffing and terms","会場・運営体制・条件を確定","確認場地、團隊與條件","장소·운영·조건 확정"]]},
   {icon:"home",title:["PARTNER","地域のパートナーになる","成為地區夥伴","지역 파트너"],body:["HOME COURT PARTNER is the consultation route for coaches and organisations who want to create another reliable court for local children with RBA standards and support.","HOME COURT PARTNERは、地域の子どもたちに「もうひとつのホームコート」をつくりたい指導者・団体のための連携相談窓口です。RBAの育成基準と運営サポートを、地域の実情に合わせて取り入れます。","與RBA共同為地區孩子建立另一個主場。","RBA와 함께 지역 아이들을 위한 또 하나의 홈 코트를 만듭니다."],items:[["Local sessions under shared standards","共通の育成基準に基づく地域セッション","共同標準的地區SESSION","공통 기준의 지역 SESSION"],["Pathway to national clinics and camps","全国のクリニック・キャンプにつながる機会","連結全國活動","전국 프로그램 연계"],["Clear roles, safeguarding and operation","役割・安全管理・運営方法を事前に明確化","明確角色、安全與營運","역할·안전·운영 명확화"]]},
  ],
  actions:[{label:["Torsten clinic","トーステン講習を見る","Torsten講座","Torsten 강의"] as Text4,href:"events/torsten-loibl-online-clinic"},{label:["Request a clinic","クリニック開催を相談","洽詢舉辦活動","클리닉 개최 문의"] as Text4,href:"clinic-request"},{label:common.home,href:"home-court"},{label:common.contact,href:"contact"}],homeCourt:"partner"
 },
 "home-court":{
  kicker:["MY HOME COURT","MY HOME COURT","MY HOME COURT","MY HOME COURT"],
  title:["Another home court.","もうひとつ、ホームコートを。","再多一個主場。","또 하나의 홈 코트를."],
  lead:["An open membership concept connecting local sessions, RBA clinics and camps, activity history and regional partners in one continuing development environment.","地域での活動、全国のクリニックやキャンプ、参加履歴、学びを一つにつなぎ、継続して成長を振り返れる場所です。","把地區SESSION、全國活動、參加紀錄與合作夥伴連成持續的培育環境。","지역 SESSION, 전국 프로그램, 참가 기록과 파트너를 하나의 지속적인 육성 환경으로 연결합니다."],
  statement:["Not another team. Another place to belong and grow.","新しいチームを増やすのではなく、戻ってこられる育成の場所を増やす。","不是增加一支隊伍，而是增加可回歸、可成長的地方。","새 팀이 아니라, 돌아와 성장할 수 있는 공간을 늘립니다."],
  sections:[
   {icon:"home",title:["FREE MEMBER → RBA HOMECOURT","次の挑戦へ、MY HOME COURTから","免費會員 → RBA HOMECOURT","무료 회원 → RBA HOMECOURT"],body:["Start free for role-based information and community access. Upgrade to the optional monthly plan only when it fits.","もっとプレーしたい、子どもの挑戦を支えたい、指導を深めたい。それぞれの思いに合う活動や学び、仲間との出会いを探せます。","先免費加入，需要持續福利時再升級。","무료로 시작하고 지속 혜택이 필요할 때만 업그레이드합니다."],items:[["Free member registration","RBA IDを登録","免費會員登錄","무료 회원 등록"],["Optional RBA HOMECOURT — JPY 3,300/month","クリニック・学び・地域を越えた交流","可選RBA HOMECOURT・每月3,300日圓","선택형 RBA HOMECOURT·월 3,300엔"],["PLAYER / PARENT / COACH routes","PLAYER／PARENT／COACHの3つの入口","PLAYER／PARENT／COACH三入口","PLAYER／PARENT／COACH 경로"]]},
   {icon:"map",title:["HOME COURT PARTNER","HOME COURT PARTNER","HOME COURT PARTNER","HOME COURT PARTNER"],body:["For coaches and organisations. Build a reliable local development environment with shared standards and an agreed operating structure.","指導者・団体向けの地域連携制度です。RBAと育成基準を共有し、役割、安全管理、運営条件を明確にした活動拠点を地域につくります。","面向教練與組織的地區合作路徑。","코치와 단체를 위한 지역 파트너 경로입니다."],items:[["Shared development standards","共通の育成基準","共同培育標準","공통 육성 기준"],["Connection to national RBA programmes","全国のRBAプログラムとの連携","連結全國RBA活動","전국 RBA 프로그램 연계"],["Regional identity, not franchise uniformity","地域の特色を生かした連携","尊重地區特色","지역성을 살리는 협력"]]},
   {icon:"learn",title:["MY HOME COURT","MY HOME COURT","MY HOME COURT","MY HOME COURT"],body:["The member space connects an RBA ID to the next event, booking, participation history and family information.","RBA IDでログインすると、今日の予定、TEAM HOME、カレンダー、お知らせ、利用状況を一つの画面で確認できます。","提供RBA ID、預約、紀錄與家庭資訊。","RBA ID, 예약, 참가 기록과 가족 정보를 연결합니다."],items:[["PLAYER / PARENT / COACH profile","PLAYER／PARENT／COACHに合わせた表示","依角色顯示","역할별 프로필"],["Parent and sibling linkage","招待コードを使った安全なチーム参加","親子與兄弟連結","가족 연동"],["Participation proof and limited photos","本人と、閲覧権限を持つ関係者だけが情報を確認","參加證明與限定照片","참가 증명·권한 사진"]]},
  ],
  actions:[{label:["For players","選手向けページへ","球員頁面","선수 페이지"] as Text4,href:"players"},{label:["For families","保護者向けページへ","家長頁面","보호자 페이지"] as Text4,href:"families"},{label:["For coaches","コーチ・指導者向けページへ","教練頁面","코치 페이지"] as Text4,href:"coaches"},{label:["Register free","RBA IDで始める","免費會員登錄","무료 회원 등록"] as Text4,href:"my-homecourt/login"}]
 }
};

const iconMap={calendar:CalendarDays,shield:ShieldCheck,learn:GraduationCap,home:House,map:MapPin,pay:CreditCard};
function audiencePath(locale:Locale,href:string){
 if(["players","families","coaches","home-court","my-homecourt/login"].includes(href)) return `${locale==="en"?"":`/${locale}`}/${href}`;
 return localePath(locale,href as Parameters<typeof localePath>[1]);
}

export function AudiencePage({locale,kind}:{locale:Locale;kind:AudienceKind}){
 const p=pages[kind];
 return <div lang={locale==="zh-tw"?"zh-Hant-TW":locale}><SiteFrame locale={locale} languagePage={kind}>
  <section className={`audience-hero audience-hero-${kind} section-pad`}><a className="back-link" href={localePath(locale)}>← RBA</a><p className="section-index inverse">{t(p.kicker,locale)}</p><h1>{t(p.title,locale)}</h1><p>{t(p.lead,locale)}</p><strong>{t(p.statement,locale)}</strong></section>
  <section className="audience-detail-grid section-pad">{p.sections.map((section,index)=>{const Icon=iconMap[section.icon];return <article key={t(section.title,locale)}><div className="audience-detail-number">0{index+1}</div><Icon size={30}/><h2>{t(section.title,locale)}</h2><p>{t(section.body,locale)}</p><ul>{section.items.map(item=><li key={t(item,locale)}><Check size={15}/>{t(item,locale)}</li>)}</ul></article>})}</section>
  {p.homeCourt&&<section className="homecourt-bridge section-pad"><div><p className="section-index inverse">{p.homeCourt==="member"?"MY HOME COURT":"HOME COURT PARTNER"}</p><h2>{t(common.home,locale)}</h2><p>{t(common.notFinal,locale)}</p></div><a className="button button-light" href={audiencePath(locale,"home-court")}>{t(common.home,locale)}<ArrowRight size={17}/></a></section>}
  {kind==="home-court"&&<section className="homecourt-status section-pad"><HeartHandshake size={34}/><div><p className="section-index">{t(["CURRENT STATUS","現在の受付状況","目前狀態","현재 상태"],locale)}</p><h2>{t(["Registration is open","次の一歩を、ここから","會員登錄開放中","회원 등록 중"],locale)}</h2><p>{t(common.notFinal,locale)}</p><p>{t(["RBA HOMECOURT connects programmes, participation records and role-based learning. Coaches can also continue to the 48-session D-HUB programme.","MY HOME COURTは、活動、参加記録、立場に合う学びを一つにつなぐ場所です。指導者はD-HUBの継続学習にも進めます。","RBA HOMECOURT整合活動、參與紀錄與角色學習；教練也能繼續參與每年48次的D-HUB。","RBA HOMECOURT는 활동, 참가 기록과 역할별 학습을 연결합니다. 코치는 연간 48회 D-HUB도 이용할 수 있습니다."],locale)}</p></div></section>}
  <section className="audience-page-actions section-pad"><p className="section-index">{t(["NEXT STEP","次に進む","下一步","다음 단계"],locale)}</p><div>{p.actions.map(action=><a key={t(action.label,locale)} href={action.external||audiencePath(locale,action.href)} target={action.external?"_blank":undefined} rel={action.external?"noreferrer":undefined}><span>{t(action.label,locale)}</span><ArrowUpRight size={19}/></a>)}</div></section>
 </SiteFrame></div>;
}
