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
    title:"日本と台湾で、子どもたちのバスケットボールをもっと面白く。",lead:"台湾のチームや指導者と力を合わせ、子どもたちがさまざまな練習や試合を経験できる機会をつくります。日本での交流も、その一つです。",
    choose:"まずは、ここから",subtitle:"選手・保護者の皆さまも、指導者やチーム関係者の皆さまも。目的に合わせてご覧ください。",
    parent:"選手・保護者",coach:"指導者",club:"クラブ・学校",
    parentBody:"日本でのキャンプや交流試合、RBA UNITEDについてご紹介します。",
    coachBody:"3x3や、選手の判断力を育てる練習、指導者講習についてご相談いただけます。",
    clubBody:"チーム向けクリニックや交流試合、指導者講習の開催についてご相談いただけます。",
    evidence:"台湾で行った活動",evidenceBody:"2026年にSPARTANS Academyと台湾で交流活動を行いました。現地での様子は、SPARTANSの公式サイトとRBAの投稿からご覧いただけます。",
    future:"次回の開催について",futureBody:"次回の開催日程や参加費は未定です。詳細が決まり次第ご案内します。現在、参加申込やお支払いは受け付けていません。",
    roles:"RBAの活動について",global:"RBA GLOBAL",united:"RBA UNITED",connect:"RBA CONNECT",
    globalBody:"海外のクラブや学校と協力し、クリニックや育成プログラムを企画します。",unitedBody:"選手がチームとして大会や遠征に参加する活動です。",connectBody:"交流が終わってからも、選手や指導者が学び合い、つながり続けられる場を目指しています。",
    form:"台湾での活動について相談する",formBody:"対象となる選手の年代や人数、ご希望の時期、実施したい内容をお聞かせください。お問い合わせは無料です。フォームの送信だけで予約や契約が確定することはありません。",
    current:"現在のRBA活動を見る",team:"日本との交流について相談する",safety:"開催が決まった活動については、保護者の同意、引率体制、保険、キャンセル時の対応などを事前にお知らせします。",language:"言語"
  },
  en:{
    title:"More ways to play and learn, in Taiwan and Japan.",lead:"We work with teams and coaches in Taiwan on practical training, and help explore opportunities to play and learn in Japan.",
    choose:"Where would you like to start?",subtitle:"Whether you're a parent, coach or club organiser, here's how to get in touch or find out more.",
    parent:"Players & families",coach:"Coaches",club:"Clubs & schools",
    parentBody:"Learn about camps, friendly games in Japan and RBA UNITED.",coachBody:"Ask about 3x3, decision-making in games and workshops for coaches.",clubBody:"Talk to us about hosting a clinic, friendly games or a coach workshop.",
    evidence:"What we've done in Taiwan",evidenceBody:"RBA and SPARTANS Academy worked together on youth basketball activities in Taiwan in 2026. You can see more through the partners' official channels.",
    future:"What's coming next",futureBody:"We haven't confirmed dates, fees or registration for the next event. We'll share details once they're ready. Bookings and payments are not open.",
    roles:"How RBA's programmes work",global:"RBA GLOBAL",united:"RBA UNITED",connect:"RBA CONNECT",
    globalBody:"We plan clinics and coach exchanges with clubs and schools overseas.",unitedBody:"Players take part in tournaments, camps and exchanges as a team.",connectBody:"We want players and coaches to stay in touch and keep learning after an exchange.",
    form:"Talk to us about a programme",formBody:"Tell us the players' ages, group size, preferred dates and what you'd like to do. There's no charge to enquire, and sending the form does not confirm a booking.",
    current:"Explore RBA programmes",team:"Ask about team exchanges",safety:"For confirmed events, we'll explain guardian consent, supervision, insurance and cancellation arrangements in advance.",language:"Language"
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
    title:"대만과 일본에서 함께 농구를 배우고 즐길 기회를 넓힙니다.",lead:"대만의 팀과 지도자들이 함께 훈련하고, 일본에서 교류할 기회도 차근차근 만들어 가겠습니다.",
    choose:"어떤 활동을 찾고 계신가요?",subtitle:"선수와 보호자, 지도자, 팀 관계자 모두 필요한 정보를 확인할 수 있습니다.",
    parent:"선수와 보호자",coach:"코치",club:"클럽과 학교",
    parentBody:"일본 캠프, 교류 경기, RBA UNITED 활동을 소개합니다.",coachBody:"3x3, 경기 중 판단을 기르는 훈련, 지도자 강습에 대해 문의할 수 있습니다.",clubBody:"팀 클리닉, 친선 경기, 지도자 강습 개최를 상담해 주세요.",
    evidence:"대만에서 진행한 활동",evidenceBody:"2026년 RBA는 SPARTANS Academy와 대만에서 유소년 농구 교류를 진행했습니다. 당시 활동은 양측 공식 채널에서 확인할 수 있습니다.",
    future:"다음 활동 안내",futureBody:"다음 일정과 참가비는 아직 정해지지 않았습니다. 확정되면 안내하겠습니다. 현재는 신청이나 결제를 받지 않습니다.",
    roles:"RBA에서는 어떤 활동을 하나요?",global:"RBA GLOBAL",united:"RBA UNITED",connect:"RBA CONNECT",
    globalBody:"해외 팀 및 학교와 클리닉과 지도자 교류를 기획합니다.",unitedBody:"선수들이 팀을 이루어 대회와 캠프, 해외 교류에 참여합니다.",connectBody:"교류가 끝난 뒤에도 선수와 지도자가 소통하며 배울 수 있도록 돕고자 합니다.",
    form:"프로그램에 대해 문의하기",formBody:"선수 연령, 인원, 희망 시기와 원하는 내용을 알려 주세요. 문의는 무료이며, 제출만으로 예약이 확정되지는 않습니다.",
    current:"RBA 활동 보기",team:"팀 교류 문의",safety:"행사가 확정되면 보호자 동의, 인솔, 보험 및 취소 규정을 미리 안내합니다.",language:"언어"
  }
};

const eltonProfile: Record<Locale, { eyebrow:string; role:string; heading:string; description:string; note:string; }> = {
  ja: {
    eyebrow:"TAIWAN PARTNER / PROFILE",
    role:"台湾のパートナー",
    heading:"Elton Chen",
    description:"Elton Chenは、台湾でRBAとともに育成年代のバスケットボール交流を進めているパートナーです。以前はNBA Taiwanに勤務していました。これまでの経験を次の世代につなげたいという思いのもと、子どもたちが学び、挑戦できる機会や、指導者同士が学び合える場を一緒につくろうとしています。",
    note:"※ これはElton個人の経歴です。NBAやNBA TaiwanがRBAを公認・協賛しているという意味ではありません。"
  },
  "zh-tw": {
    eyebrow:"TAIWAN PARTNER / 人物介紹",
    role:"台灣在地合作夥伴",
    heading:"Elton Chen",
    description:"Elton Chen 是 RBA 在台灣推動青少年籃球交流的合作夥伴。他曾任職於 NBA Taiwan，目前持續參與台灣籃球相關活動。我們希望一起創造更多孩子學習籃球、教練持續成長的機會。",
    note:"曾任職於 NBA Taiwan 為個人工作經歷，不代表 NBA 或 NBA Taiwan 對 RBA 的認可、贊助或官方合作。"
  },
  en: {
    eyebrow:"TAIWAN PARTNER / PROFILE",
    role:"Taiwan-based collaboration partner",
    heading:"Elton Chen",
    description:"Elton Chen works with RBA on youth basketball exchange and development opportunities in Taiwan. He previously worked at NBA Taiwan and remains active in Taiwan's basketball community. Together, we are exploring ways for young players to learn and for coaches to keep developing.",
    note:"Elton's previous employment at NBA Taiwan does not imply endorsement, sponsorship or an official affiliation between NBA or NBA Taiwan and RBA."
  },
  ko: {
    eyebrow:"TAIWAN PARTNER / PROFILE",
    role:"대만 현지 협력 파트너",
    heading:"Elton Chen",
    description:"Elton Chen은 대만에서 유소년 농구 교류와 육성 기회를 마련하기 위해 RBA와 협력하고 있습니다. 과거 NBA Taiwan에서 근무한 경력이 있으며 현재도 대만 농구 현장에서 활동하고 있습니다. 아이들의 배움과 지도자의 성장을 함께 지원하고자 합니다.",
    note:"NBA Taiwan에서의 이전 근무 경력은 NBA 또는 NBA Taiwan이 RBA를 공식 후원하거나 승인한다는 뜻이 아닙니다."
  }
};

const serviceCopy: Record<Locale,{title:string;intro:string;items:[string,string,string][];button:string;note:string;memberTitle:string;memberBody:string;memberButton:string}> = {
  ja: {title:"台湾でのクリニックと指導者講習",intro:"選手の年代や人数、普段の練習で感じている課題を伺い、チームに合った内容を一緒に考えます。",items:[["01","チーム向けクリニック","U12・U15を中心に、基本技術やスペーシング、3x3などを実際のプレーを通して練習します。"],["02","指導者ワークショップ","練習の組み立て方や選手への声かけ、出場機会のつくり方、練習量と休養のバランスについて一緒に考えます。"],["03","継続育成サポート","チームの状況に合わせて、現場指導や練習計画の相談、実施後の振り返りを組み合わせます。"]],button:"開催について問い合わせる",note:"参加人数、指導時間、会場、移動や通訳の必要性を確認したうえで、お見積もりをご案内します。お問い合わせの段階では、開催日や料金は確定しません。",memberTitle:"オンラインで学べる内容も準備しています",memberBody:"台湾の選手や指導者が使いやすい繁体字中国語の教材を検討しています。内容や料金、開始時期は未定です。現在、会費はいただいていません。",memberButton:"興味がある方はこちら"},
  "zh-tw": {title:"台灣球隊訓練與教練研習",intro:"每支球隊的情況都不同。我們會先了解球員年齡、人數、平常遇到的問題，再一起討論適合的訓練內容。",items:[["01","球隊專屬訓練","以U12、U15為主，透過基本動作、3x3和實際攻防，練習觀察、判斷與空間運用。"],["02","教練研習","一起討論練習怎麼安排、如何觀察球員、怎麼提問，以及上場機會和休息時間。"],["03","球隊長期合作","如果希望持續合作，也可以安排定期討論、現場指導與訓練後的回顧。"]],button:"詢問訓練安排",note:"我們會依人數、課程時間、場地、交通和翻譯需求提供報價。送出表單不代表已預約，日期和費用都需要另外確認。",memberTitle:"線上學習內容準備中",memberBody:"我們正在整理適合台灣球員和教練使用的繁體中文教材。內容、收費方式和推出時間都還在討論，目前不會收取會員費。",memberButton:"有興趣可以先告訴我們"},
  en: {title:"Clinics and coach workshops in Taiwan",intro:"Every team is different. We'll ask about your players, training schedule and the things you'd like to improve before suggesting a session.",items:[["01","Team clinics","For U12 and U15 teams: fundamentals, spacing, 3x3 and making decisions in live play."],["02","Coach workshops","Let's look at how you plan sessions, ask questions, give players opportunities and balance training with rest."],["03","Ongoing development","Depending on your needs, we can discuss on-court sessions, practice plans and follow-up reviews."]],button:"Ask about hosting a session",note:"We'll provide a quote after checking group size, session length, venue, travel and interpretation needs. An enquiry doesn't reserve a date.",memberTitle:"Online learning resources are in the works",memberBody:"We're working on Traditional Chinese resources for players and coaches. Content, pricing and timing are still being discussed. We're not charging membership fees.",memberButton:"Tell us if you're interested"},
  ko: {title:"대만 팀 클리닉과 지도자 강습",intro:"팀마다 상황이 다릅니다. 선수들의 연령과 인원, 평소 훈련에서 어려운 점을 먼저 듣고 내용을 함께 정합니다.",items:[["01","팀 클리닉","U12·U15 선수들이 기본기, 공간 활용, 3x3과 실제 경기 상황에서의 판단을 연습합니다."],["02","코치 워크숍","훈련 구성, 선수 관찰과 질문, 출전 기회, 훈련량과 휴식을 함께 살펴봅니다."],["03","지속적 육성 지원","필요에 따라 현장 지도, 훈련 계획 상담, 수업 후 피드백을 함께 진행합니다."]],button:"클리닉 개최 문의",note:"참가 인원, 수업 시간, 장소, 이동과 통역 여부를 확인한 뒤 견적을 안내합니다. 문의만으로 날짜가 확정되지는 않습니다.",memberTitle:"온라인 학습 자료를 준비하고 있습니다",memberBody:"대만 선수와 지도자가 활용할 수 있는 번체 중국어 자료를 준비하고 있습니다. 내용, 요금, 시작일은 아직 정해지지 않았으며 회비를 받지 않습니다.",memberButton:"관심이 있다면 알려 주세요"}
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
          <div className="rba-taiwan-partner"><Image src="/rba-logo-original.jpg" alt="Riot Basketball Academy official logo" width={56} height={78} className="rba-taiwan-brand-mark"/><div className="rba-taiwan-partner-wordmark"><span>RIOT BASKETBALL ACADEMY</span><span className="rba-taiwan-times">×</span><span>SPARTANS</span></div></div><h1>{c.title}</h1><p className="rba-taiwan-lead">{c.lead}</p><p className="rba-taiwan-credit">WITH ELTON & SPARTANS ACADEMY, TAIWAN</p>
          <a className="rba-taiwan-btn" href="#taiwan-choose">{c.choose} ↓</a>
        </div>
      </section>
      <section className="rba-taiwan-section" id="taiwan-choose"><div className="rba-taiwan-inner">
        <p className="rba-taiwan-label">01 / START HERE</p><h2>{c.choose}</h2><p className="rba-taiwan-intro">{c.subtitle}</p>
        <div className="rba-taiwan-cards">
          {([[c.parent,c.parentBody],[c.coach,c.coachBody],[c.club,c.clubBody]] as const).map(([heading,body],i)=><article key={heading}><span>0{i+1}</span><h3>{heading}</h3><p>{body}</p><a href={i===0?locale==="ja"?"/ja/united":locale==="en"?"/united":`/${locale}/united`:"#taiwan-contact"}>{i===0?c.current:c.form} ↗</a></article>)}
        </div>
      </div></section>
      <section className="rba-taiwan-section rba-taiwan-muted" id="taiwan-principles"><div className="rba-taiwan-inner">
        <p className="rba-taiwan-label">RBA TAIWAN / OUR VISION</p>
        <h2>{({
          ja:"バスケットボールを通じて、子どもたちの可能性を広げる。",
          "zh-tw":"讓每個孩子，都能透過籃球找到更多成長的可能。",
          en:"More opportunities for every young player to learn and grow.",
          ko:"모든 아이가 농구를 통해 배우고 성장할 기회를 넓힙니다."
        })[locale]}</h2>
        <p className="rba-taiwan-intro">{({
          ja:"勝つことを目指しながら、一人ひとりが考え、挑戦し、成長できる環境も大切にしたい。RBAは台湾のチームや指導者の経験を尊重し、子どもたちの新しい学びの機会を一緒につくっていきます。",
          "zh-tw":"追求勝利的同時，也希望每個孩子都能思考、嘗試並持續成長。RBA尊重台灣球隊與教練的經驗，期待一起創造更多學習與參與的機會。",
          en:"Winning matters, but so does giving every child the chance to think, try and improve. RBA respects the work of local teams and coaches and hopes to create more learning opportunities together.",
          ko:"승리를 추구하는 동시에 모든 선수가 스스로 생각하고 도전하며 성장할 기회를 소중히 여깁니다. RBA는 대만 현장의 경험을 존중하며 함께 배움의 기회를 만들고자 합니다."
        })[locale]}</p>
        <div className="rba-taiwan-cards">
          {({
            ja:[
              ["自分で考える","指導者が答えを伝えるだけでなく、選手自身が見て、考えて、選ぶ時間を大切にします。"],
              ["挑戦する機会を増やす","経験の差だけで可能性を決めつけず、試合や練習で挑戦できる場を広げます。"],
              ["安心してプレーできる","子どもの安全と心身の成長に配慮し、失敗を恐れず取り組める環境を目指します。"],
              ["コーチも学び続ける","選手への声かけや練習の組み立て方を振り返り、指導者同士でも学び合います。"],
              ["台湾の現場を尊重する","学校やクラブが積み重ねてきた経験に学び、地域の実情に合う方法を一緒に考えます。"],
              ["交流を次につなげる","単発のイベントで終わらず、選手や指導者が継続して交流できる関係を目指します。"]
            ],
            "zh-tw":[
              ["自己觀察與判斷","不只是由教練給出答案，也讓球員有機會觀察、思考並做出選擇。"],
              ["增加參與與嘗試的機會","不因目前程度就限制孩子的可能性，盡力創造更多練習與比賽經驗。"],
              ["安心學習與挑戰","重視兒少安全與身心發展，讓孩子不怕犯錯，願意持續嘗試。"],
              ["教練也持續成長","透過反思提問方式與課程設計，讓教練彼此學習、共同進步。"],
              ["尊重台灣在地經驗","重視學校與俱樂部長期累積的做法，一起找出適合不同社群的方式。"],
              ["讓交流持續下去","不讓交流停留在單次活動，讓球員與教練有機會保持聯繫與學習。"]
            ],
            en:[
              ["Think and decide","Give players the time to observe, think and make choices instead of receiving every answer."],
              ["A chance to take part","Create more meaningful playing and practice experiences, regardless of current level."],
              ["A safe place to try","Respect each child's development and well-being, and make room to learn from mistakes."],
              ["Coaches keep learning","Reflect on questions, feedback and session design together with other coaches."],
              ["Respect local experience","Listen to Taiwanese schools and clubs and find approaches that suit local communities."],
              ["Stay connected","Build relationships that continue beyond a one-off clinic or exchange."]
            ],
            ko:[
              ["스스로 생각하고 선택하기","정답만 전달하기보다 선수가 관찰하고 판단할 기회를 만듭니다."],
              ["참여와 도전 기회 늘리기","현재 실력만으로 가능성을 제한하지 않고 경험의 폭을 넓힙니다."],
              ["안전하게 도전하기","발달 단계와 안전을 존중하고 실수에서 배울 수 있는 환경을 지향합니다."],
              ["지도자도 계속 배우기","질문 방식과 훈련 설계를 서로 돌아보며 함께 성장합니다."],
              ["현지의 경험 존중하기","대만 학교와 클럽의 경험에 귀 기울이고 지역에 맞는 방법을 모색합니다."],
              ["한 번의 교류로 끝내지 않기","클리닉 이후에도 선수와 지도자가 배움을 이어 갈 관계를 만듭니다."]
            ]
          })[locale].map(([heading,body],i)=><article key={heading}><span>{String(i+1).padStart(2,"0")}</span><h3>{heading}</h3><p>{body}</p></article>)}
        </div>
        <p className="rba-taiwan-small">{({
          ja:"育成の考え方は、すべてのチームに同じ指導法を求めるものではありません。現場の声を聞きながら、実践を通じて学んでいきます。",
          "zh-tw":"這些理念不代表要求所有球隊採用同一種教法。我們會持續傾聽現場的聲音，從實踐中學習。",
          en:"These principles are not a demand that every team uses the same methods. We aim to listen and learn through practice.",
          ko:"모든 팀에 똑같은 지도법을 요구하는 것이 아니라 현장의 이야기를 듣고 실천하며 배우겠습니다."
        })[locale]}</p>
        <div className="rba-taiwan-links">
          <a href="#taiwan-clinics">{({ja:"活動内容を見る","zh-tw":"了解活動內容",en:"Explore programmes",ko:"프로그램 보기"})[locale]} ↗</a>
          <a href="#taiwan-contact">{({ja:"開催・協業について相談する","zh-tw":"洽詢合作",en:"Talk about working together",ko:"개최 및 협력 문의"})[locale]} ↗</a>
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
        <article className="rba-taiwan-profile" id="taiwan-partner-elton" aria-labelledby="taiwan-elton-name">
          <div className="rba-taiwan-profile-heading">
            <p className="rba-taiwan-label">{eltonProfile[locale].eyebrow}</p>
            <h3 id="taiwan-elton-name">{eltonProfile[locale].heading}</h3>
            <p className="rba-taiwan-profile-role">{eltonProfile[locale].role}</p>
            <p className="rba-taiwan-profile-career">{({ja:"NBA Taiwan｜勤務経験","zh-tw":"曾任職於 NBA Taiwan",en:"Previously employed by NBA Taiwan",ko:"NBA Taiwan 근무 경력"})[locale]}</p>
          </div>
          <div className="rba-taiwan-profile-content">
            <p>{eltonProfile[locale].description}</p>
            <p className="rba-taiwan-profile-disclaimer">{eltonProfile[locale].note}</p>
          </div>
        </article>
      </div></section>
      <section className="rba-taiwan-section rba-taiwan-muted"><div className="rba-taiwan-inner">
        <p className="rba-taiwan-label">04 / PROGRAMME STATUS</p><h2>{c.future}</h2><p className="rba-taiwan-intro">{c.futureBody}</p><p>{c.safety}</p>
        <Link className="rba-taiwan-outline" href={exchangePath(locale)}>{c.team} ↗</Link>
      </div></section>
      <section className="rba-taiwan-section rba-taiwan-muted" id="taiwan-coach-interest"><div className="rba-taiwan-inner">
        <p className="rba-taiwan-label">TAIPEI / COACH DEVELOPMENT</p>
        <h2>{({ja:"台湾で、バスケットボールの指導に興味がある方へ","zh-tw":"在台北，想學習籃球教學嗎？",en:"Interested in learning to coach basketball in Taipei?",ko:"타이베이에서 농구 지도에 관심이 있으신가요?"})[locale]}</h2>
        <p className="rba-taiwan-intro">{({ja:"台北・新北を中心に、子どもたちへのバスケットボール指導に興味がある方を探しています。日本人留学生、日本語を話せる台湾の方、バスケ経験者の皆さんも歓迎します。まだ企画を検討している段階で、正式な求人ではありません。","zh-tw":"RBA正在蒐集對台北、新北青少年籃球教練培育有興趣者的意向。歡迎年滿18歲的日本留學生、會說日文的台灣朋友及籃球愛好者登記。目前仍在規劃中，並非正式徵才。",en:"RBA is collecting expressions of interest from adults in Taipei and New Taipei who may want to learn youth basketball coaching. This is an early-stage idea, not a job offer or recruitment for a confirmed role.",ko:"RBA는 타이베이·신베이에서 유소년 농구 지도를 배우는 데 관심 있는 성인의 의견을 듣고 있습니다. 현재 기획 검토 단계이며 확정된 채용 공고가 아닙니다."})[locale]}</p>
        <Link className="rba-taiwan-outline" href="/ja/taiwan/coach-interest">{({ja:"コーチ育成の企画を見る", "zh-tw":"查看意向登記說明", en:"View the interest registration",ko:"관심 등록 안내 보기"})[locale]} ↗</Link>
      </div></section>
      <section className="rba-taiwan-section rba-taiwan-muted" id="taiwan-sponsors"><div className="rba-taiwan-inner">
        <p className="rba-taiwan-label">SENDAI × TAIWAN / CORPORATE PARTNERSHIP</p>
        <h2>{({
          ja:"仙台から台湾へ。育成を支える企業パートナーを募集しています。",
          "zh-tw":"從仙台到台灣，邀請企業一起支持青少年籃球。",
          en:"From Sendai to Taiwan. Explore youth basketball partnerships.",
          ko:"센다이에서 대만까지, 유소년 농구를 함께 지원할 기업을 찾습니다."
        })[locale]}</h2>
        <p className="rba-taiwan-intro">{({
          ja:"子どもたちの参加機会、指導者の学び、日台交流を支える企業連携を検討しています。仙台・宮城の企業様も、台湾の企業様も歓迎します。まずは目的や可能な支援についてご相談ください。2027年の事業内容・日程・予算は現在調整中です。",
          "zh-tw":"歡迎仙台、宮城與台灣企業，一起討論青少年參與機會、教練學習及台日交流的支持方式。2027年的日期、預算及合作內容仍在規劃中。",
          en:"We invite companies in Miyagi, Taiwan and beyond to explore support for youth access, coach education and Japan–Taiwan exchange. Future programmes remain subject to confirmation.",
          ko:"미야기와 대만의 기업이 청소년 참가 기회, 지도자 교육, 국제 교류를 지원할 수 있는 협력 방식을 함께 논의하고자 합니다."
        })[locale]}</p>
        <Link className="rba-taiwan-outline" href={locale==="en"?"/taiwan/sponsors":"/"+locale+"/taiwan/sponsors"}>{({
          ja:"企業協賛・連携のご案内を見る",
          "zh-tw":"了解企業贊助與合作",
          en:"Explore corporate partnerships",
          ko:"기업 협찬 안내 보기"
        })[locale]} ↗</Link>
      </div></section>
      <section className="rba-taiwan-section" id="taiwan-contact"><div className="rba-taiwan-inner">
        <p className="rba-taiwan-label">05 / CONTACT</p><h2>{c.form}</h2><p className="rba-taiwan-intro">{c.formBody}</p>
        <a className="rba-taiwan-btn" href={`${formUrl}?utm_source=rba_website&utm_medium=organic&utm_campaign=taiwan_2026_launch&utm_content=${locale}`} target="_blank" rel="noopener noreferrer">{c.form} ↗</a>
        <p className="rba-taiwan-small"><Link href={locale==="en"?"/":`/${locale}`}>{c.current} ↗</Link></p>
      </div></section>
    </div>
  </SiteFrame>;
}
