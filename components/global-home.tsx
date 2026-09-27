import { ArrowRight, BookOpen, CalendarDays, ClipboardList, Globe2, House, MapPin, Users } from "lucide-react";
import { SiteFrame, type Locale } from "./site-frame";
import { openProgrammes } from "./programme-data";
import { tr } from "./network-data";

type GlobalLocale="en"|"zh-tw"|"ko";

const copy:Record<GlobalLocale,{
  hero:string;lead:string;explore:string;team:string;proof1:string;proof2:string;
  next:string;nextLead:string;all:string;
  network:string;networkTitle:string;networkBody:string;
  teams:string;teamsTitle:string;teamsBody:string;
  coach:string;coachTitle:string;coachBody:string;
  asia:string;asiaTitle:string;asiaBody:string;international:string;
  trust:string;trustTitle:string;trustBody:string;
  startTitle:string;startBody:string;
}> = {
  en:{
    hero:"Built in the gym. Connected beyond it.",
    lead:"RBA connects young players, families, coaches and teams with development opportunities across Japan and Asia—without replacing the team they already belong to.",
    explore:"Explore development",team:"For teams",proof1:"participant visits since mid-2025",proof2:"locations across Japan",
    next:"Next opportunities",nextLead:"A short list of currently open RBA programmes. Use HOMECOURT to explore more environments.",all:"View all RBA programmes",
    network:"HOMECOURT / DEVELOPMENT NETWORK",networkTitle:"Find. Experience. Keep the journey. Move next.",networkBody:"HOMECOURT is designed around real development experiences—not rankings. Explore environments and opportunities, then keep your own history in MY HOME COURT.",
    teams:"FOR TEAMS",teamsTitle:"Turn one clinic into a 90-day development cycle.",teamsBody:"RBA can connect observation, a team report, twelve weeks of practice and D30 / D60 / D90 reviews through TEAM DEVELOPMENT.",
    coach:"COACH DEVELOPMENT",coachTitle:"Learning should return to practice.",coachBody:"D-HUB, RBA JOURNAL and international coach learning connect ideas to real practice design and reflection.",
    asia:"JAPAN × ASIA",asiaTitle:"Make international exchange easier to create.",asiaBody:"We are building routes for youth teams in Japan, Taiwan, Korea, Malaysia and other regions to connect through purposeful games, practices and coach exchange.",international:"International exchange",
    trust:"TRUST / FIELD",trustTitle:"Scale the network without blurring what is confirmed.",trustBody:"RBA separates delivered work, current opportunities, relationships in discussion and future plans. Child safety, consent and data minimisation remain part of the infrastructure.",
    startTitle:"Start from the court you have now.",startBody:"Explore an opportunity, open MY HOME COURT, or bring RBA into your team."
  },
  "zh-tw":{
    hero:"扎根球場，連結更大的世界。",
    lead:"RBA連結球員、家長、教練與球隊，從日本各地走向亞洲的培育機會，同時尊重球員現在所屬的球隊與環境。",
    explore:"探索培育機會",team:"球隊專區",proof1:"2025年中以來累計參與人次",proof2:"日本國內活動地區",
    next:"近期機會",nextLead:"只顯示目前可參加的RBA活動。想探索更多培育環境，可使用HOMECOURT。",all:"查看全部RBA活動",
    network:"HOMECOURT / DEVELOPMENT NETWORK",networkTitle:"探索、參與、留下經驗，再走向下一步。",networkBody:"HOMECOURT不是球員排名平台。從培育環境與活動開始，實際參與後，把自己的經驗留在MY HOME COURT。",
    teams:"FOR TEAMS",teamsTitle:"把一次訓練營，延伸成90天的球隊培育。",teamsBody:"RBA把現場觀察、TEAM REPORT、12週實踐，以及D30 / D60 / D90回顧連成TEAM DEVELOPMENT。",
    coach:"COACH DEVELOPMENT",coachTitle:"學習，最後要回到球場。",coachBody:"透過D-HUB、RBA JOURNAL與國際教練交流，把新的觀點帶回訓練設計與現場反思。",
    asia:"JAPAN × ASIA",asiaTitle:"讓國際交流不只靠偶然。",asiaBody:"RBA正在建立日本、台灣、韓國、馬來西亞等地的青少年球隊交流路徑，連結友誼賽、共同訓練與教練交流。",international:"查看國際交流",
    trust:"TRUST / FIELD",trustTitle:"擴大之前，先把確認狀態與安全做清楚。",trustBody:"已實施、目前招募、協議中與未來構想會分開顯示。兒少安全、同意與資料最小化是平台的一部分。",
    startTitle:"從現在的球場，走向下一步。",startBody:"探索一個機會、開啟MY HOME COURT，或邀請RBA進入球隊。"
  },
  ko:{
    hero:"코트에서 시작해, 더 넓은 세계와 연결합니다.",
    lead:"RBA는 선수, 보호자, 코치와 팀을 일본 전역과 아시아의 성장 기회에 연결합니다. 현재 소속팀과 환경을 존중하면서 선택지를 넓힙니다.",
    explore:"성장 기회 찾기",team:"팀을 위한 RBA",proof1:"2025년 중반 이후 누적 참가",proof2:"일본 국내 활동 지역",
    next:"다음 기회",nextLead:"현재 참가 가능한 RBA 프로그램만 간단히 보여줍니다. 더 넓은 환경은 HOMECOURT에서 찾을 수 있습니다.",all:"RBA 프로그램 전체 보기",
    network:"HOMECOURT / DEVELOPMENT NETWORK",networkTitle:"찾고, 경험하고, 남기고, 다음으로.",networkBody:"HOMECOURT는 선수 순위 플랫폼이 아닙니다. 성장 환경과 기회를 찾고 실제 경험을 MY HOME COURT에 이어 갑니다.",
    teams:"FOR TEAMS",teamsTitle:"한 번의 클리닉을 90일의 팀 성장으로.",teamsBody:"현장 관찰, TEAM REPORT, 12주 실천, D30 / D60 / D90 리뷰를 TEAM DEVELOPMENT로 연결합니다.",
    coach:"COACH DEVELOPMENT",coachTitle:"배움은 다시 코트로 돌아와야 합니다.",coachBody:"D-HUB, RBA JOURNAL과 국제 코치 학습을 훈련 설계와 현장 성찰로 연결합니다.",
    asia:"JAPAN × ASIA",asiaTitle:"국제 교류를 우연에만 맡기지 않습니다.",asiaBody:"일본, 대만, 한국, 말레이시아 등 유소년 팀이 친선 경기, 공동 훈련과 코치 교류로 연결될 수 있는 경로를 만들고 있습니다.",international:"국제 교류 보기",
    trust:"TRUST / FIELD",trustTitle:"규모를 넓히기 전에 확인 상태와 안전을 명확하게.",trustBody:"실행된 활동, 현재 모집, 협의 중 관계, 미래 구상을 구분합니다. 아동 보호, 동의와 최소한의 데이터 수집을 기본으로 합니다.",
    startTitle:"지금 있는 코트에서 다음 단계로.",startBody:"하나의 기회를 찾고, MY HOME COURT를 열거나, 팀에 RBA를 초대하세요."
  }
};

export function GlobalHome({locale}:{locale:GlobalLocale}){
  const c=copy[locale], prefix=locale==="en"?"":"/"+locale;
  const upcoming=openProgrammes().slice(0,4);
  return <SiteFrame locale={locale}>
    <section className="hero-grid">
      <div className="hero-copy"><p className="eyebrow">RIOT BASKETBALL ACADEMY · JAPAN</p><h1><span>{c.hero}</span></h1><p className="hero-lede">{c.lead}</p>
        <div className="hero-actions"><a className="button button-light" href={prefix+"/homecourt/explore"}>{c.explore}<ArrowRight size={17}/></a><a className="button button-member" href={prefix+"/my-homecourt"}><House size={17}/>MY HOME COURT<ArrowRight size={17}/></a><a className="text-link light-link" href={prefix+"/team"}>{c.team}<ArrowRight size={16}/></a></div>
        <div className="hero-proof"><div><strong>3,000+</strong><span>{c.proof1}</span></div><div><strong>25</strong><span>{c.proof2}</span></div><div><strong>JP × ASIA</strong><span>YOUTH BASKETBALL DEVELOPMENT</span></div></div>
      </div>
      <div className="hero-image" role="img" aria-label="RBA youth basketball development"><div className="image-note">DISCOVER / EXPERIENCE / TIMELINE / NEXT</div></div>
    </section>

    <section className="paid-programmes section-pad"><div className="section-head"><div><p className="section-index">NEXT OPPORTUNITIES</p><h2>{c.next}</h2></div><p>{c.nextLead}</p></div>
      <div className="paid-programme-grid">{upcoming.map(programme=><article key={programme.id}><time>{tr(programme.date,locale)}</time><h3>{tr(programme.title,locale)}</h3><p className="programme-place"><MapPin size={16}/>{tr(programme.place,locale)}</p><p className="programme-audience"><strong>TARGET</strong>{tr(programme.audience,locale)}</p><p className="programme-price">{tr(programme.price,locale)}</p><a className="programme-link" href={programme.detailPath?prefix+"/"+programme.detailPath:programme.applicationUrl} target={programme.detailPath?undefined:"_blank"} rel={programme.detailPath?undefined:"noreferrer"}>{c.all}<ArrowRight size={16}/></a></article>)}</div>
      <div className="programme-links"><a className="button button-orange" href={prefix+"/opportunities"}>{c.all}<ArrowRight size={17}/></a><a className="text-link" href={prefix+"/homecourt/explore"}>HOMECOURT<ArrowRight size={16}/></a></div>
    </section>

    <section className="homecourt-home-feature section-pad"><div className="homecourt-home-mark"><span>HOME</span><strong>COURT</strong></div><div className="homecourt-home-copy"><p className="section-index">{c.network}</p><h2>{c.networkTitle}</h2><p>{c.networkBody}</p><div className="homecourt-home-roles"><span><Users size={15}/>EXPLORE</span><span><CalendarDays size={15}/>EXPERIENCE</span><span><ClipboardList size={15}/>TIMELINE</span><span><Globe2 size={15}/>MATCH</span></div><div className="homecourt-home-actions"><a className="button button-dark" href={prefix+"/homecourt/explore"}>{c.explore}<ArrowRight size={17}/></a><a className="text-link" href={prefix+"/my-homecourt"}>MY HOME COURT<ArrowRight size={16}/></a></div></div></section>

    <section className="homecourt-product-preview section-pad"><div className="section-head"><div><p className="section-index">{c.teams}</p><h2>{c.teamsTitle}</h2></div><p>{c.teamsBody}</p></div><div className="homecourt-preview-grid"><article><span>01 / OBSERVE</span><h3>TEAM CLINIC</h3><p>See the team in its normal environment.</p></article><article><span>02 / REPORT</span><h3>TEAM REPORT</h3><p>Keep team-level strengths and priorities without ranking individual children.</p></article><article><span>03 / 90 DAYS</span><h3>FOUNDATION → TRANSFER → AUTONOMY</h3><p>D30 / D60 / D90 review points turn one visit into a longer learning cycle.</p></article><article><span>04 / NEXT</span><h3>TEAM HOME</h3><p>Connect follow-up, coach learning and future exchange.</p><a className="text-link" href={prefix+"/team"}>{c.team}<ArrowRight size={16}/></a></article></div></section>

    <section className="hosting-roles section-pad"><div className="section-head"><div><p className="section-index inverse">{c.coach}</p><h2>{c.coachTitle}</h2></div><p>{c.coachBody}</p></div><div className="role-grid"><article><BookOpen/><h3>D-HUB</h3><ul><li>WEEKLY LEARNING</li><li>PRACTICE DESIGN</li><li>REFLECTION</li></ul><a className="text-link light-link" href={prefix+"/d-hub"}>D-HUB<ArrowRight size={16}/></a></article><article><Globe2/><h3>WORLD LEARNING</h3><ul><li>COACH EXCHANGE</li><li>RBA JOURNAL</li><li>LIVE LEARNING</li></ul><a className="text-link light-link" href={prefix+"/journal"}>JOURNAL<ArrowRight size={16}/></a></article></div></section>

    <section className="asia-desk-home section-pad"><div><p className="section-index inverse">{c.asia}</p><h2>{c.asiaTitle}</h2></div><div><p>{c.asiaBody}</p><div className="closing-actions"><a className="button button-light" href={prefix+"/international"}>{c.international}<ArrowRight size={17}/></a><a className="text-link light-link" href={prefix+"/homecourt/match"}>HOMECOURT MATCH<ArrowRight size={16}/></a></div></div></section>

    <section className="field-footprint section-pad"><div><p className="section-index inverse">{c.trust}</p><h2>{c.trustTitle}</h2><p>{c.trustBody}</p><a className="text-link light-link" href={prefix+"/policies"}>POLICY / SAFETY<ArrowRight size={16}/></a></div><div className="footprint-numbers"><div><strong>FIELD</strong><span>REAL PROGRAMMES</span></div><div><strong>TRUST</strong><span>CONFIRMED STATUS</span></div><div><strong>NEXT</strong><span>DEVELOPMENT CONNECTIONS</span></div></div></section>

    <section className="closing-cta section-pad"><p className="eyebrow">START HERE</p><h2>{c.startTitle}</h2><p>{c.startBody}</p><div className="closing-actions"><a className="button button-orange" href={prefix+"/homecourt/explore"}>{c.explore}<ArrowRight size={17}/></a><a className="button button-dark" href={prefix+"/my-homecourt"}>MY HOME COURT<ArrowRight size={17}/></a></div></section>
  </SiteFrame>;
}
