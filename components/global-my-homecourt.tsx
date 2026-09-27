import { ArrowRight, BookOpen, Check, Compass, Globe2, History, House, LockKeyhole, ShieldCheck, Users } from "lucide-react";
import { SiteFrame } from "./site-frame";

type GlobalLocale="en"|"zh-tw"|"ko";

const copy:Record<GlobalLocale,{
  title:string;lead:string;start:string;plus:string;
  simple:string;simpleBody:string;
  discover:string;discoverBody:string;experience:string;experienceBody:string;timeline:string;timelineBody:string;next:string;nextBody:string;
  roles:string;player:string;playerBody:string;parent:string;parentBody:string;coach:string;coachBody:string;
  record:string;recordBody:string;private:string;privateBody:string;portable:string;portableBody:string;confirmed:string;confirmedBody:string;
  freeTitle:string;freeBody:string;paidTitle:string;paidBody:string;
  world:string;worldBody:string;safety:string;safetyBody:string;final:string;finalBody:string;
}> = {
 en:{
  title:"Your basketball journey, beyond one team.",lead:"Discover opportunities, take part, keep your own development history and move to the next experience. MY HOME COURT adds options around the team you already have—it does not replace it.",
  start:"Start free",plus:"See HOMECOURT PLUS",
  simple:"One simple loop.",simpleBody:"You do not need to learn a long list of product names. Discover, experience, keep the journey, then choose what comes next.",
  discover:"Discover",discoverBody:"Find teams, clinics, camps and exchange opportunities across Japan and beyond.",experience:"Experience",experienceBody:"Check dates, eligibility, cost and confirmed status before you join.",timeline:"Timeline",timelineBody:"Keep clinics, camps, trials and exchange as your own development history.",next:"Next",nextBody:"Use your context and goals to find the next available opportunities.",
  roles:"Choose only the route you need.",player:"PLAYER",playerBody:"More courts, experiences and development opportunities.",parent:"PARENT",parentBody:"Clearer information for decisions, safety, cost and your child's journey.",coach:"COACH",coachBody:"Coach learning, practice design and TEAM HOME.",
  record:"Development Timeline",recordBody:"Keep experiences rather than a public performance score.",private:"Private by default",privateBody:"Detailed youth history, media and personal information are not public profiles.",portable:"Portable",portableBody:"Your history remains yours when teams or countries change.",confirmed:"Confirmed experience",confirmedBody:"Issuer-confirmed participation is shown separately from self-entered records.",
  freeTitle:"Free account",freeBody:"Discover, read open Journal content, save opportunities and keep your development timeline.",paidTitle:"HOMECOURT PLUS",paidBody:"Add weekly planning, preparation, condition trends and monthly review when you want more structure.",
  world:"LOCAL → JAPAN → ASIA → WORLD",worldBody:"HOMECOURT is being designed for exchange across Japan, Taiwan, Korea, Malaysia and other regions without turning international experience into a one-off trip.",safety:"Safety is infrastructure.",safetyBody:"No unrestricted adult-to-minor messaging. Guardian roles, media consent, visibility and participation records are handled separately.",final:"Start with one next opportunity.",finalBody:"Explore first. You can add detail later."
 },
 "zh-tw":{
  title:"把自己的籃球經驗，連到球隊之外。",lead:"探索機會、實際參與、留下自己的培育紀錄，再走向下一個環境。MY HOME COURT不是取代現在的球隊，而是在現有環境之外增加選擇。",
  start:"免費開始",plus:"查看HOMECOURT PLUS",
  simple:"一個簡單循環。",simpleBody:"不用記住很多產品名稱。探索、參與、留下經驗，再選擇下一步。",
  discover:"探索",discoverBody:"尋找日本各地與海外的球隊、訓練營、營隊與交流機會。",experience:"參與",experienceBody:"參加前確認日期、資格、費用與確認狀態。",timeline:"紀錄",timelineBody:"把訓練營、試訓、營隊與國際交流留下來。",next:"下一步",nextBody:"依自己的年代、地區、目標與經驗找到下一個可參加機會。",
  roles:"只使用適合自己的入口。",player:"PLAYER / 球員",playerBody:"看見更多球場、經驗與成長機會。",parent:"PARENT / 家長",parentBody:"整理安全、費用、環境與孩子的成長紀錄。",coach:"COACH / 教練",coachBody:"教練學習、訓練設計與TEAM HOME。",
  record:"Development Timeline",recordBody:"留下經驗，而不是建立公開能力排名。",private:"預設不公開",privateBody:"兒少的詳細活動、影像與個資不作為公開個人頁面。",portable:"可持續帶走",portableBody:"更換球隊或國家，自己的紀錄仍然屬於自己。",confirmed:"已確認經驗",confirmedBody:"主辦方確認的參與紀錄會與自行輸入的紀錄分開顯示。",
  freeTitle:"免費帳戶",freeBody:"探索、閱讀公開JOURNAL、收藏活動並留下Development Timeline。",paidTitle:"HOMECOURT PLUS",paidBody:"需要更多整理時，再加入每週計畫、準備、狀態趨勢與月度回顧。",
  world:"LOCAL → JAPAN → ASIA → WORLD",worldBody:"HOMECOURT從一開始就考慮日本、台灣、韓國、馬來西亞等跨國交流，讓海外經驗不只是一次性的遠征。",safety:"安全也是平台的一部分。",safetyBody:"不設計未成年者與陌生成人的無限制私訊。家長權限、影像同意、公開範圍與參與紀錄分開管理。",final:"先找到下一個機會。",finalBody:"先探索即可，其他設定之後再補。"
 },
 ko:{
  title:"나의 농구 경험을 팀 밖의 세계까지 연결합니다.",lead:"기회를 찾고, 실제로 참가하고, 자신의 성장 기록을 남긴 뒤 다음 환경으로 갑니다. MY HOME COURT는 현재 팀을 대체하지 않고 선택지를 더합니다.",
  start:"무료로 시작",plus:"HOMECOURT PLUS 보기",
  simple:"하나의 단순한 흐름.",simpleBody:"많은 제품 이름을 외울 필요가 없습니다. 찾고, 경험하고, 남기고, 다음을 선택합니다.",
  discover:"찾기",discoverBody:"일본 전국과 해외의 팀, 클리닉, 캠프와 교류 기회를 찾습니다.",experience:"경험",experienceBody:"일정, 대상, 비용과 확인 상태를 보고 참가합니다.",timeline:"기록",timelineBody:"클리닉, 캠프, 트라이아웃과 국제 교류를 자신의 성장 이력으로 남깁니다.",next:"다음",nextBody:"연령, 지역, 목표와 경험을 바탕으로 다음 참가 기회를 찾습니다.",
  roles:"필요한 입구만 사용합니다.",player:"PLAYER / 선수",playerBody:"더 많은 코트, 경험과 성장 기회.",parent:"PARENT / 보호자",parentBody:"안전, 비용, 환경과 아이의 성장 기록을 더 명확하게.",coach:"COACH / 코치",coachBody:"코치 학습, 훈련 설계와 TEAM HOME.",
  record:"Development Timeline",recordBody:"공개 능력 점수가 아니라 실제 경험을 남깁니다.",private:"기본은 비공개",privateBody:"유소년의 상세 활동, 미디어와 개인정보는 공개 프로필로 만들지 않습니다.",portable:"계속 이어지는 기록",portableBody:"팀이나 국가가 바뀌어도 자신의 기록은 자신에게 남습니다.",confirmed:"확인된 경험",confirmedBody:"주최자가 확인한 참가 기록은 직접 입력한 기록과 구분됩니다.",
  freeTitle:"무료 계정",freeBody:"기회를 찾고 공개 JOURNAL을 읽고 저장하며 Development Timeline을 남길 수 있습니다.",paidTitle:"HOMECOURT PLUS",paidBody:"더 체계적으로 쓰고 싶을 때 주간 계획, 준비, 컨디션 추이와 월간 리뷰를 추가합니다.",
  world:"LOCAL → JAPAN → ASIA → WORLD",worldBody:"HOMECOURT는 일본, 대만, 한국, 말레이시아 등 국가 간 교류를 처음부터 고려해 설계합니다.",safety:"안전도 인프라입니다.",safetyBody:"미성년자와 모르는 성인의 무제한 DM을 만들지 않습니다. 보호자 권한, 미디어 동의, 공개 범위와 참가 기록을 나누어 관리합니다.",final:"다음 기회 하나부터 시작하세요.",finalBody:"먼저 찾아보고, 세부 설정은 나중에 추가해도 됩니다."
 }
};

export function GlobalMyHomecourt({locale}:{locale:GlobalLocale}){
 const c=copy[locale],prefix=locale==="en"?"":"/"+locale;
 return <SiteFrame locale={locale} languagePage="my-homecourt">
  <section className="my-homecourt-hero section-pad"><div className="my-homecourt-hero-copy"><p className="section-index inverse">MY HOME COURT</p><h1>{c.title}</h1><p>{c.lead}</p><div className="my-homecourt-hero-actions"><a className="button button-member" href={prefix+"/my-homecourt/login"}><House size={17}/>{c.start}<ArrowRight size={16}/></a><a className="button button-light" href={locale==="en"?"/homecourt-plus":prefix+"/homecourt-plus"}>{c.plus}<ArrowRight size={16}/></a></div></div><div className="my-homecourt-hero-mark" aria-hidden="true"><span>MY</span><strong>HOME<br/>COURT</strong><small>DISCOVER / EXPERIENCE / TIMELINE / NEXT</small></div></section>

  <section className="homecourt-product-preview section-pad"><div className="section-head"><div><p className="section-index">ONE SIMPLE LOOP</p><h2>{c.simple}</h2></div><p>{c.simpleBody}</p></div><div className="homecourt-preview-grid">
   <article><Compass/><span>01</span><h3>{c.discover}</h3><p>{c.discoverBody}</p><a className="text-link" href={prefix+"/homecourt/explore"}>HOMECOURT<ArrowRight size={16}/></a></article>
   <article><Users/><span>02</span><h3>{c.experience}</h3><p>{c.experienceBody}</p><a className="text-link" href={prefix+"/opportunities"}>OPPORTUNITIES<ArrowRight size={16}/></a></article>
   <article><History/><span>03</span><h3>{c.timeline}</h3><p>{c.timelineBody}</p></article>
   <article><Globe2/><span>04</span><h3>{c.next}</h3><p>{c.nextBody}</p><a className="text-link" href={prefix+"/homecourt/match"}>MATCH<ArrowRight size={16}/></a></article>
  </div></section>

  <section className="hosting-roles section-pad"><div className="section-head"><div><p className="section-index inverse">PLAYER / PARENT / COACH</p><h2>{c.roles}</h2></div></div><div className="role-grid">
   <article><Users/><h3>{c.player}</h3><p>{c.playerBody}</p><a className="text-link light-link" href={prefix+"/my-homecourt/players"}>PLAYER<ArrowRight size={16}/></a></article>
   <article><ShieldCheck/><h3>{c.parent}</h3><p>{c.parentBody}</p><a className="text-link light-link" href={prefix+"/my-homecourt/families"}>PARENT<ArrowRight size={16}/></a></article>
   <article><BookOpen/><h3>{c.coach}</h3><p>{c.coachBody}</p><a className="text-link light-link" href={prefix+"/my-homecourt/coaches"}>COACH<ArrowRight size={16}/></a></article>
  </div></section>

  <section className="homecourt-product-preview section-pad"><div className="section-head"><div><p className="section-index">DEVELOPMENT TIMELINE</p><h2>{c.record}</h2></div><p>{c.recordBody}</p></div><div className="homecourt-preview-grid">
   <article><LockKeyhole/><span>PRIVATE</span><h3>{c.private}</h3><p>{c.privateBody}</p></article>
   <article><ArrowRight/><span>PORTABLE</span><h3>{c.portable}</h3><p>{c.portableBody}</p></article>
   <article><Check/><span>CONFIRMED</span><h3>{c.confirmed}</h3><p>{c.confirmedBody}</p></article>
  </div></section>

  <section className="homecourt-plan-separation section-pad"><div className="homecourt-plan-grid">
   <article className="homecourt-plan-card homecourt-plan-free"><div className="homecourt-plan-card-head"><span>FREE</span><strong>¥0</strong></div><h3>{c.freeTitle}</h3><p>{c.freeBody}</p><a className="button button-light" href={prefix+"/my-homecourt/login"}>{c.start}<ArrowRight size={16}/></a></article>
   <article className="homecourt-plan-card homecourt-plan-paid"><div className="homecourt-plan-card-head"><span>HOMECOURT PLUS</span><strong>¥3,300</strong></div><h3>{c.paidTitle}</h3><p>{c.paidBody}</p><a className="button button-member" href={locale==="en"?"/homecourt-plus":prefix+"/homecourt-plus"}>{c.plus}<ArrowRight size={16}/></a></article>
  </div></section>

  <section className="asia-desk-home section-pad"><div><p className="section-index inverse">{c.world}</p><h2>{c.world}</h2></div><div><p>{c.worldBody}</p><a className="text-link light-link" href={prefix+"/international"}>INTERNATIONAL<ArrowRight size={16}/></a></div></section>
  <section className="homecourt-safety section-pad"><ShieldCheck size={38}/><div><h2>{c.safety}</h2><p>{c.safetyBody}</p><a className="text-link" href={prefix+"/policies"}>POLICY / SAFETY<ArrowRight size={16}/></a></div></section>
  <section className="closing-cta section-pad"><p className="eyebrow">START</p><h2>{c.final}</h2><p>{c.finalBody}</p><div className="closing-actions"><a className="button button-orange" href={prefix+"/my-homecourt/login"}>{c.start}<ArrowRight size={17}/></a><a className="button button-dark" href={prefix+"/homecourt/explore"}>HOMECOURT<ArrowRight size={17}/></a></div></section>
 </SiteFrame>;
}
