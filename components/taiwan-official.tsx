import Link from "next/link";
import { SiteFrame, type Locale } from "./site-frame";
import "./taiwan-official.css";

const locales: Locale[] = ["ja","zh-tw","en","ko"];
const path = (locale: Locale) => locale === "en" ? "/taiwan" : `/${locale}/taiwan`;
const exchangePath = (locale: Locale) => locale === "en" ? "/taiwan/exchange" : `/${locale}/taiwan/exchange`;
const formUrl = "https://form.jotform.com/262853181713054";
const text: Record<Locale, {
  title:string;lead:string;choose:string;subtitle:string;parent:string;coach:string;club:string;parentBody:string;coachBody:string;clubBody:string;
  evidence:string;evidenceBody:string;future:string;futureBody:string;roles:string;global:string;united:string;connect:string;
  globalBody:string;unitedBody:string;connectBody:string;form:string;formBody:string;current:string;team:string; safety:string; language:string;
}> = {
  ja:{
    title:"日本と台湾を、育成でつなぐ。",lead:"一度きりの遠征で終わらせない。選手の経験、指導者の学び、国を越えたつながりを育てます。",
    choose:"あなたに合う入口",subtitle:"RBAの活動は、選手・保護者・指導者・クラブの立場に合わせて参加できます。",
    parent:"選手・保護者",coach:"指導者",club:"クラブ・学校",
    parentBody:"日台の交流試合、育成キャンプ、RBA UNITEDのチーム活動について知る。",
    coachBody:"判断力を育てる練習、3x3、指導者講習、オンライン交流について相談する。",
    clubBody:"合同キャンプや交流試合、指導者教育の共同開催を相談する。",
    evidence:"台湾での活動実績",evidenceBody:"2026年、SPARTANS Academyとの日台育成交流を実施。現地団体の公式情報とRBAの活動動画から確認できます。",
    future:"今後の活動について",futureBody:"次回開催日・料金・募集開始日は未確定です。確定するまで申込・決済は受け付けません。",
    roles:"GLOBAL・UNITED・CONNECTの違い",global:"RBA GLOBAL",united:"RBA UNITED",connect:"RBA CONNECT",
    globalBody:"海外クラブや学校と育成事業をつくる仕組み。",unitedBody:"選手がチームとして大会や遠征に参加する仕組み。",connectBody:"交流後も選手や指導者がつながり、学び続ける仕組み。",
    form:"団体として相談する",formBody:"対象年代、人数、希望時期、交流目的をお知らせください。問い合わせは無料で、予約や契約にはなりません。",
    current:"現在のRBA活動を見る",team:"日台チーム交流の相談",safety:"子どもの安全・保護者同意・引率・保険・キャンセル条件は実施前に確認します。",language:"言語"
  },
  en:{
    title:"Connecting Japan and Taiwan through development.",lead:"More than a one-off tour. Meaningful experiences for players, learning for coaches and lasting connections.",
    choose:"Find your pathway",subtitle:"One RBA philosophy, with clear next steps for families, coaches and organizations.",
    parent:"Players & families",coach:"Coaches",club:"Clubs & schools",
    parentBody:"Explore team exchange, youth camps and RBA UNITED opportunities.",coachBody:"Discuss decision-making, small-sided games, 3x3 and coach education.",clubBody:"Discuss jointly hosted camps, friendly games and coach development.",
    evidence:"Documented activity in Taiwan",evidenceBody:"RBA and SPARTANS Academy conducted youth development exchange activities in 2026. Review the host's official information and RBA's on-court post.",
    future:"Future programme status",futureBody:"Future dates, fees and registration are not confirmed. No bookings or payments are accepted on this page.",
    roles:"GLOBAL, UNITED & CONNECT — the difference",global:"RBA GLOBAL",united:"RBA UNITED",connect:"RBA CONNECT",
    globalBody:"Builds development programmes with international clubs and schools.",unitedBody:"Creates team-based tournament and travel experiences.",connectBody:"Keeps relationships and learning going after an exchange.",
    form:"Enquire as an organization",formBody:"Share age groups, group size, timing and learning goals. Enquiries are free and do not create a booking or contract.",
    current:"Explore RBA programmes",team:"Discuss team exchange",safety:"Safeguarding, guardian consent, supervision, insurance and cancellation terms are confirmed before delivery.",language:"Language"
  },
  "zh-tw":{
    title:"用籃球培育，連結日本與台灣。",lead:"不只是一趟海外交流。讓球員累積經驗、教練持續學習，建立長期連結。",
    choose:"選擇適合您的參與方式",subtitle:"同一個RBA培育理念，提供球員、家長、教練與團體清楚的參與方式。",
    parent:"球員與家長",coach:"教練",club:"球隊與學校",
    parentBody:"了解台日交流賽、青少年培育營與RBA UNITED球隊活動。",coachBody:"洽詢判斷力培育、3x3、小組比賽與教練研習。",clubBody:"洽談共同主辦培育營、友誼賽與教練教育。",
    evidence:"台灣實際活動",evidenceBody:"2026年RBA與SPARTANS Academy進行青少年培育交流。可查看主辦方官方資訊及RBA的現場影片。",
    future:"未來活動狀態",futureBody:"下一次活動日期、費用與報名尚未確定。本頁不接受報名或付款。",
    roles:"GLOBAL、UNITED、CONNECT 的差異",global:"RBA GLOBAL",united:"RBA UNITED",connect:"RBA CONNECT",
    globalBody:"與海外球隊及學校共同建立培育計畫。",unitedBody:"讓球員以團隊形式參與比賽與海外交流。",connectBody:"讓交流後的學習與關係持續發展。",
    form:"以團體名義洽詢",formBody:"請提供年齡層、人數、希望時期與學習目標。洽詢免費，不代表預約或簽約。",
    current:"查看RBA活動",team:"洽詢台日球隊交流",safety:"正式活動前將確認兒少安全、家長同意、隨隊照護、保險與取消條件。",language:"語言"
  },
  ko:{
    title:"일본과 대만을 육성으로 연결합니다.",lead:"일회성 원정을 넘어 선수의 경험, 코치의 배움, 지속적인 교류를 만듭니다.",
    choose:"참여 방법 찾기",subtitle:"하나의 RBA 육성 철학 아래 선수, 보호자, 코치, 단체를 위한 명확한 안내.",
    parent:"선수와 보호자",coach:"코치",club:"클럽과 학교",
    parentBody:"교류 경기, 육성 캠프, RBA UNITED 팀 활동을 알아보세요.",coachBody:"의사결정, 3x3, 소규모 경기와 코치 교육을 상담하세요.",clubBody:"공동 캠프, 친선 경기, 코치 교육을 함께 논의합니다.",
    evidence:"대만 활동 기록",evidenceBody:"2026년 RBA와 SPARTANS Academy는 유소년 교류 활동을 진행했습니다. 주최 측 공식 정보와 RBA 현장 영상을 확인할 수 있습니다.",
    future:"향후 프로그램 안내",futureBody:"향후 일정, 비용, 모집은 미확정입니다. 이 페이지에서는 예약이나 결제를 받지 않습니다.",
    roles:"GLOBAL · UNITED · CONNECT의 차이",global:"RBA GLOBAL",united:"RBA UNITED",connect:"RBA CONNECT",
    globalBody:"해외 클럽 및 학교와 육성 프로그램을 만듭니다.",unitedBody:"선수에게 팀 단위의 대회 및 원정 경험을 제공합니다.",connectBody:"교류 후에도 관계와 배움을 이어 갑니다.",
    form:"단체 문의",formBody:"연령, 인원, 시기, 학습 목표를 알려 주세요. 문의는 무료이며 예약이나 계약이 아닙니다.",
    current:"RBA 활동 보기",team:"팀 교류 상담",safety:"아동 보호, 보호자 동의, 인솔, 보험 및 취소 조건을 행사 전에 확인합니다.",language:"언어"
  }
};

const serviceCopy: Record<Locale,{title:string;intro:string;items:[string,string,string][];button:string;note:string;memberTitle:string;memberBody:string;memberButton:string}> = {
  ja: {title:"台湾でのクリニック・指導者教育",intro:"現地チームからの相談を起点に、年代・人数・課題・日程を確認して個別に設計します。単発の指導で終わらず、練習に残る学びを大切にします。",items:[["01","チーム向けクリニック","U12・U15を中心に、判断、スペーシング、3x3、ファンダメンタルを現場で扱います。"],["02","指導者ワークショップ","練習設計、観察と問いかけ、全員の学習機会、負荷と回復をテーマにします。"],["03","継続育成サポート","現状のヒアリング、現場指導、練習計画、振り返りを必要に応じて組み合わせます。"]],button:"台湾での開催を相談する",note:"料金は人数、指導時間、会場、移動、通訳等を確認したうえで個別見積もり。お問い合わせは無料で、開催・予約・料金は確定しません。",memberTitle:"オンライン会員は準備中",memberBody:"繁体字で実践できる教材や指導者向け学習を検討中です。月額料金、提供内容、開始日は未確定で、現在は課金しません。",memberButton:"会員プログラムへの関心を伝える"},
  "zh-tw": {title:"台灣球隊培訓與教練教育",intro:"從台灣球隊的實際需求出發，先確認年齡、人數、訓練課題與時間，再設計適合的內容。重點不只是完成一場活動，而是讓學習方法留在日常訓練。",items:[["01","球隊專屬培訓","以U12、U15為主，結合判斷、空間運用、3x3與基本技術。"],["02","教練研習","練習設計、觀察與提問、每位球員的學習機會，以及負荷與恢復。"],["03","長期培育合作","依需求安排現況訪談、現場培訓、練習計畫與後續回顧。"]],button:"免費洽詢台灣培訓",note:"依人數、時數、場地、交通及翻譯等項目個別報價。提交諮詢不代表預約成功，日期與費用須書面確認。",memberTitle:"數位會員計畫尚在準備",memberBody:"正在規劃繁體中文的實踐教材與教練學習內容。月費、交付內容與開放日期尚未確定，目前不收取訂閱費。",memberButton:"登記會員計畫興趣"},
  en: {title:"Taiwan team clinics & coach education",intro:"We begin with each team's actual needs: age group, group size, learning goals and timing. The goal is to leave useful practice methods behind, not just deliver a one-off session.",items:[["01","Team clinics","U12/U15 fundamentals, decision-making, spacing and 3x3 adapted to the group."],["02","Coach workshops","Practice design, observation, questioning, playing opportunities, load and recovery."],["03","Ongoing development","Optional needs assessment, on-court teaching, practice planning and review."]],button:"Enquire about a Taiwan clinic",note:"Fees are quoted after checking participants, hours, venue, travel and interpretation. An enquiry is free and is not a confirmed booking.",memberTitle:"Digital membership is in development",memberBody:"We are exploring practical Traditional Chinese resources and coach learning. Pricing, deliverables and launch date remain unconfirmed. No subscription payments are taken.",memberButton:"Register interest in membership"},
  ko: {title:"대만 팀 클리닉과 코치 교육",intro:"팀의 연령, 인원, 과제와 희망 일정을 먼저 확인하고 현장에 남는 학습을 설계합니다.",items:[["01","팀 클리닉","U12/U15 기본기, 판단, 공간 활용, 3x3."],["02","코치 워크숍","훈련 설계, 관찰과 질문, 모든 선수의 학습 기회, 회복."],["03","지속적 육성 지원","현황 파악, 현장 지도, 훈련 계획과 회고를 필요에 따라 구성합니다."]],button:"대만 클리닉 문의",note:"참가 인원, 시간, 장소, 이동과 통역에 따라 개별 견적. 문의는 무료이며 예약 확정이 아닙니다.",memberTitle:"디지털 회원 서비스 준비 중",memberBody:"번체 중국어 자료와 코치 학습을 검토 중입니다. 요금과 제공 내용은 미확정이며 결제는 받지 않습니다.",memberButton:"회원 서비스 관심 등록"}
};
export function TaiwanOfficial({locale}:{locale:Locale}) {
  const c=text[locale];
  const services=serviceCopy[locale];
  const options = [{key:"ja",label:"日本語"},{key:"zh-tw",label:"繁體中文"},{key:"en",label:"English"},{key:"ko",label:"한국어"}] as const;
  return <SiteFrame locale={locale} languagePage="international">
    <div className="rba-taiwan">
      <section className="rba-taiwan-hero">
        <div className="rba-taiwan-inner">
          <div className="rba-taiwan-top"><p>RBA INTERNATIONAL / JAPAN × TAIWAN</p><nav aria-label={c.language}>{options.map(x=><Link key={x.key} href={path(x.key)} aria-current={locale===x.key?"page":undefined}>{x.label}</Link>)}</nav></div>
          <h1>{c.title}</h1><p className="rba-taiwan-lead">{c.lead}</p>
          <a className="rba-taiwan-btn" href="#taiwan-choose">{c.choose} ↓</a>
        </div>
      </section>
      <section className="rba-taiwan-section" id="taiwan-choose"><div className="rba-taiwan-inner">
        <p className="rba-taiwan-label">01 / START HERE</p><h2>{c.choose}</h2><p className="rba-taiwan-intro">{c.subtitle}</p>
        <div className="rba-taiwan-cards">
          {([[c.parent,c.parentBody],[c.coach,c.coachBody],[c.club,c.clubBody]] as const).map(([heading,body],i)=><article key={heading}><span>0{i+1}</span><h3>{heading}</h3><p>{body}</p><a href={i===0?locale==="ja"?"/ja/united":locale==="en"?"/united":`/${locale}/united`:"#taiwan-contact"}>{i===0?c.current:c.form} ↗</a></article>)}
        </div>
      </div></section>
      <section className="rba-taiwan-section" id="taiwan-clinics"><div className="rba-taiwan-inner">
        <p className="rba-taiwan-label">TAIWAN / TEAM & COACH SERVICES</p>
        <h2>{services.title}</h2><p className="rba-taiwan-intro">{services.intro}</p>
        <div className="rba-taiwan-cards">{services.items.map(([number,heading,body])=><article key={number}><span>{number}</span><h3>{heading}</h3><p>{body}</p><a href={`${formUrl}?utm_source=rba_official&utm_medium=site&utm_campaign=taiwan_clinic&utm_content=${locale}`} target="_blank" rel="noopener noreferrer">{services.button} ↗</a></article>)}</div>
        <p className="rba-taiwan-small">{services.note}</p>
      </div></section>
      <section className="rba-taiwan-section rba-taiwan-muted"><div className="rba-taiwan-inner">
        <p className="rba-taiwan-label">DIGITAL LEARNING / STATUS</p>
        <h2>{services.memberTitle}</h2><p className="rba-taiwan-intro">{services.memberBody}</p>
        <a className="rba-taiwan-outline" href={`${formUrl}?utm_source=rba_official&utm_medium=site&utm_campaign=taiwan_membership_interest&utm_content=${locale}`} target="_blank" rel="noopener noreferrer">{services.memberButton} ↗</a>
      </div></section>
      <section className="rba-taiwan-section rba-taiwan-muted"><div className="rba-taiwan-inner">
        <p className="rba-taiwan-label">02 / RBA DEVELOPMENT</p><h2>{c.roles}</h2>
        <div className="rba-taiwan-roles">
          {([[c.global,c.globalBody],[c.united,c.unitedBody],[c.connect,c.connectBody]] as const).map(([heading,body])=><article key={heading}><strong>{heading}</strong><p>{body}</p></article>)}
        </div>
      </div></section>
      <section className="rba-taiwan-section"><div className="rba-taiwan-inner">
        <p className="rba-taiwan-label">03 / FIELD RECORD · 2026</p><h2>{c.evidence}</h2><p className="rba-taiwan-intro">{c.evidenceBody}</p>
        <div className="rba-taiwan-links"><a href="https://www.spartans.tw/en/" target="_blank" rel="noopener noreferrer">SPARTANS OFFICIAL ↗</a><a href="https://www.instagram.com/p/DeW1uAEGI18/" target="_blank" rel="noopener noreferrer">RBA TAIWAN VIDEO ↗</a></div>
      </div></section>
      <section className="rba-taiwan-section rba-taiwan-muted"><div className="rba-taiwan-inner">
        <p className="rba-taiwan-label">04 / PROGRAMME STATUS</p><h2>{c.future}</h2><p className="rba-taiwan-intro">{c.futureBody}</p><p>{c.safety}</p>
        <Link className="rba-taiwan-outline" href={exchangePath(locale)}>{c.team} ↗</Link>
      </div></section>
      <section className="rba-taiwan-section" id="taiwan-contact"><div className="rba-taiwan-inner">
        <p className="rba-taiwan-label">05 / CONTACT</p><h2>{c.form}</h2><p className="rba-taiwan-intro">{c.formBody}</p>
        <a className="rba-taiwan-btn" href={`${formUrl}?utm_source=rba_website&utm_medium=organic&utm_campaign=taiwan_2026_launch&utm_content=${locale}`} target="_blank" rel="noopener noreferrer">JOTFORM ↗</a>
        <p className="rba-taiwan-small"><Link href={locale==="en"?"/":`/${locale}`}>{c.current} ↗</Link></p>
      </div></section>
    </div>
  </SiteFrame>;
}
