import Link from "next/link";
import Image from "next/image";
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
    title:"日本と台湾で、子どもたちのバスケットボールをもっと面白く。",lead:"台湾のチームや指導者と一緒に、練習や試合の経験を広げていきます。日本での交流も、その一つです。",
    choose:"まずは、ここから",subtitle:"選手・保護者の方も、指導者やチーム関係者の方も。知りたいことに合わせてご覧ください。",
    parent:"選手・保護者",coach:"指導者",club:"クラブ・学校",
    parentBody:"日本でのキャンプや交流試合、RBA UNITEDの活動をご案内します。",
    coachBody:"3x3や判断を伴う練習、指導者向けの講習についてご相談いただけます。",
    clubBody:"チームでのクリニック、交流試合、指導者講習の開催についてご相談ください。",
    evidence:"台湾で行った活動",evidenceBody:"2026年にSPARTANS Academyと台湾で交流活動を行いました。現地での様子は、SPARTANSの公式サイトとRBAの投稿からご覧いただけます。",
    future:"次回の開催について",futureBody:"次回の日程や参加費は、まだ決まっていません。決まり次第お知らせします。現在、参加申込やお支払いは受け付けていません。",
    roles:"RBAの活動について",global:"RBA GLOBAL",united:"RBA UNITED",connect:"RBA CONNECT",
    globalBody:"海外のクラブや学校と、クリニックや育成プログラムを企画します。",unitedBody:"選手がチームとして大会や遠征に参加する活動です。",connectBody:"交流が終わった後も、選手や指導者が情報を共有できる場を目指しています。",
    form:"台湾での活動について相談する",formBody:"チームの年代や人数、希望する時期、やってみたいことをお聞かせください。お問い合わせは無料です。送信だけで予約や契約が成立することはありません。",
    current:"現在のRBA活動を見る",team:"日本との交流について相談する",safety:"開催が決まった活動については、保護者の同意、引率体制、保険、キャンセル時の対応などを事前にご案内します。",language:"言語"
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
    title:"讓台灣和日本的孩子，有更多一起打球的機會。",lead:"從球隊訓練、教練交流到赴日參訪，我們希望讓每一次交流都能帶回真正用得上的經驗。",
    choose:"看看有哪些合作方式",subtitle:"不論您是家長、教練，還是球隊負責人，都可以從這裡找到適合的資訊。",
    parent:"球員與家長",coach:"教練",club:"球隊與學校",
    parentBody:"了解赴日訓練營、交流賽，以及RBA UNITED的活動。",coachBody:"想了解3x3、比賽中的判斷，或安排教練研習，都歡迎和我們聊聊。",clubBody:"如果想替球隊安排訓練營、友誼賽或教練課程，可以提出需求。",
    evidence:"我們在台灣的活動",evidenceBody:"2026年，RBA與SPARTANS Academy在台灣一起進行青少年籃球交流。您可以透過雙方的官方資訊，看看當時的活動情況。",
    future:"接下來的活動",futureBody:"下一次活動的日期、費用和報名方式還沒確定。確認後會再公布，目前不開放報名或付款。",
    roles:"RBA有哪些活動？",global:"RBA GLOBAL",united:"RBA UNITED",connect:"RBA CONNECT",
    globalBody:"和海外球隊、學校一起規劃訓練營及教練交流。",unitedBody:"讓球員組隊參加比賽、訓練營及海外交流。",connectBody:"希望交流結束後，球員和教練還能繼續分享、互相學習。",
    form:"想安排活動？歡迎聯絡我們",formBody:"請告訴我們球員年齡、人數、希望的時間，以及想安排的內容。填寫表單不收費，也不代表已完成預約。",
    current:"查看RBA近期活動",team:"詢問台日球隊交流",safety:"活動確定舉辦後，我們會事先說明家長同意、帶隊安排、保險及取消規定。",language:"語言"
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
  ja: {title:"台湾でのクリニックと指導者講習",intro:"まずはチームの年代や人数、普段の練習で困っていることを伺います。そのうえで、現場で試せる内容を一緒に考えます。",items:[["01","チーム向けクリニック","U12・U15を中心に、基本技術やスペーシング、3x3などを実際のプレーを通して練習します。"],["02","指導者ワークショップ","普段の練習の組み立て方、選手への声かけ、出場機会、練習量と休養について一緒に考えます。"],["03","継続育成サポート","チームの状況に合わせて、現場指導や練習計画の相談、実施後の振り返りを組み合わせます。"]],button:"開催について問い合わせる",note:"参加人数、指導時間、会場、移動、通訳の有無を確認してお見積もりします。お問い合わせの段階では、開催日や料金は確定しません。",memberTitle:"オンラインで学べる内容も準備しています",memberBody:"台湾の選手や指導者が使いやすい繁体字の教材を検討しています。内容・料金・開始日はまだ決まっていません。現在、会費の請求は行っていません。",memberButton:"興味がある方はこちら"},
  "zh-tw": {title:"台灣球隊訓練與教練研習",intro:"每支球隊的情況都不同。我們會先了解球員年齡、人數、平常遇到的問題，再一起討論適合的訓練內容。",items:[["01","球隊專屬訓練","以U12、U15為主，透過基本動作、3x3和實際攻防，練習觀察、判斷與空間運用。"],["02","教練研習","一起討論練習怎麼安排、如何觀察球員、怎麼提問，以及上場機會和休息時間。"],["03","球隊長期合作","如果希望持續合作，也可以安排定期討論、現場指導與訓練後的回顧。"]],button:"詢問訓練安排",note:"我們會依人數、課程時間、場地、交通和翻譯需求提供報價。送出表單不代表已預約，日期和費用都需要另外確認。",memberTitle:"線上學習內容準備中",memberBody:"我們正在整理適合台灣球員和教練使用的繁體中文教材。內容、收費方式和推出時間都還在討論，目前不會收取會員費。",memberButton:"有興趣可以先告訴我們"},
  en: {title:"Taiwan team clinics & coach education",intro:"We begin with each team's actual needs: age group, group size, learning goals and timing. The goal is to leave useful practice methods behind, not just deliver a one-off session.",items:[["01","Team clinics","U12/U15 fundamentals, decision-making, spacing and 3x3 adapted to the group."],["02","Coach workshops","Practice design, observation, questioning, playing opportunities, load and recovery."],["03","Ongoing development","Optional needs assessment, on-court teaching, practice planning and review."]],button:"Enquire about a Taiwan clinic",note:"Fees are quoted after checking participants, hours, venue, travel and interpretation. An enquiry is free and is not a confirmed booking.",memberTitle:"Digital membership is in development",memberBody:"We are exploring practical Traditional Chinese resources and coach learning. Pricing, deliverables and launch date remain unconfirmed. No subscription payments are taken.",memberButton:"Register interest in membership"},
  ko: {title:"대만 팀 클리닉과 코치 교육",intro:"팀의 연령, 인원, 과제와 희망 일정을 먼저 확인하고 현장에 남는 학습을 설계합니다.",items:[["01","팀 클리닉","U12/U15 기본기, 판단, 공간 활용, 3x3."],["02","코치 워크숍","훈련 설계, 관찰과 질문, 모든 선수의 학습 기회, 회복."],["03","지속적 육성 지원","현황 파악, 현장 지도, 훈련 계획과 회고를 필요에 따라 구성합니다."]],button:"대만 클리닉 문의",note:"참가 인원, 시간, 장소, 이동과 통역에 따라 개별 견적. 문의는 무료이며 예약 확정이 아닙니다.",memberTitle:"디지털 회원 서비스 준비 중",memberBody:"번체 중국어 자료와 코치 학습을 검토 중입니다. 요금과 제공 내용은 미확정이며 결제는 받지 않습니다.",memberButton:"회원 서비스 관심 등록"}
};
export function TaiwanOfficial({locale}:{locale:Locale}) {
  const c=text[locale];
  const services=serviceCopy[locale];
  const options = [{key:"ja",label:"日本語"},{key:"zh-tw",label:"繁體中文"},{key:"en",label:"English"},{key:"ko",label:"한국어"}] as const;
  return <SiteFrame locale={locale} languagePage="taiwan">
    <div className="rba-taiwan">
      <section className="rba-taiwan-hero">
        <div className="rba-taiwan-inner">
          <div className="rba-taiwan-top"><p>RBA × SPARTANS / JAPAN × TAIWAN</p><nav aria-label={c.language}>{options.map(x=><Link key={x.key} href={path(x.key)} aria-current={locale===x.key?"page":undefined}>{x.label}</Link>)}</nav></div>
          <div className="rba-taiwan-partner"><Image src="/rba-logo-original.jpg" alt="Riot Basketball Academy official logo" width={56} height={78} className="rba-taiwan-brand-mark"/><div className="rba-taiwan-partner-wordmark"><span>RIOT BASKETBALL ACADEMY</span><span className="rba-taiwan-times">×</span><span>SPARTANS</span></div></div><h1>{c.title}</h1><p className="rba-taiwan-lead">{c.lead}</p><p className="rba-taiwan-credit">IN COLLABORATION WITH ELTON & THE SPARTANS TEAM IN TAIWAN</p>
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
        <p className="rba-taiwan-label">03 / SPARTANS × RBA · 2026</p><h2>{c.evidence}</h2><p className="rba-taiwan-intro">{c.evidenceBody}</p>
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
