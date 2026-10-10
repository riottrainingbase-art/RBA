import "./taiwan-exchange.css";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ClipboardCheck, Globe2, ShieldCheck, Users } from "lucide-react";
import { ContactForm } from "./contact-form";
import { Locale, SiteFrame, localePath } from "./site-frame";

type Text = { eyebrow:string;title:string;lead:string;notice:string;historyTitle:string;history:string;historyNote:string;workTitle:string;workIntro:string;programs:readonly [string,string][];whoTitle:string;whoText:string;howTitle:string;steps:readonly [string,string][];safetyTitle:string;safety:string;inquiryTitle:string;inquiryLead:string;statusLabel:string;contact:string;back:string; };
const copy:Record<Locale,Text>={
 ja:{
  eyebrow:"RBA INTERNATIONAL / JAPAN × TAIWAN",
  title:"台湾と日本のコートを、日常的につなぐ。",
  lead:"一度きりの遠征で終わらせない。交流試合、選手の学び、指導者の対話を、両国の育成現場で続けるための窓口です。",
  notice:"2027年以降の企画は協議・準備段階です。現在、募集・料金・開催日は確定していません。",
  historyTitle:"交流を重ね、次の機会へ。",history:"2026年、沖縄での合同キャンプと台湾での女子ユース交流を通じて、現場同士の関係を深めてきました。",
  historyNote:"過去の交流実績と、今後の共同事業に関する合意は別のものです。新企画の正式決定は今後の案内をご確認ください。",
  workTitle:"交流の目的は、経験を増やすこと。",workIntro:"勝敗や選抜だけでなく、違う文化・言葉・プレースタイルの中で、自分で見て、考え、判断する経験を重視します。",
  programs:[["FRIENDLY GAMES","年代・レベル・出場機会を事前にすり合わせた交流試合。"],["DEVELOPMENT CAMP","練習、ゲーム、振り返りを組み合わせた育成キャンプ。"],["COACH EXCHANGE","指導者同士の練習見学、対話、オンライン学習。"],["S&C EDUCATION","発育発達、負荷管理、回復と傷害リスク低減に関する教育。"]],
  whoTitle:"クラブ・指導者・主催者の方へ",whoText:"日本または台湾での交流を検討している団体から、目的・対象年代・人数・希望時期をお聞きします。個別選手の移籍や引き抜きの窓口ではありません。",
  howTitle:"実施までの4つの確認",steps:[["01","交流の目的、年代、参加人数を共有"],["02","対戦・会場・指導・引率の体制を確認"],["03","費用・責任・キャンセル条件を書面化"],["04","実施後に振り返り、継続の可否を判断"]],
  safetyTitle:"子どもの安全と運営を最優先に。",safety:"引率・緊急時対応・保険・肖像利用・保護者同意を確認します。航空券や宿泊の手配を含む場合は、適法な旅行手配体制を別途整えます。現地での有料指導は必要な法令確認を行います。",
  inquiryTitle:"次の交流を、一緒に考える。",inquiryLead:"団体名、担当者、対象年代、人数、希望時期、交流目的をお知らせください。お問い合わせは無料で、予約や支払いは発生しません。",
  statusLabel:"PROGRAMME STATUS / PLANNING",contact:"団体として相談する",back:"国際交流の全体を見る"
 },
 en:{
  eyebrow:"RBA INTERNATIONAL / JAPAN × TAIWAN",
  title:"Keep Japan and Taiwan connected through basketball.",
  lead:"Beyond one-off tours: purposeful games, player learning and coach dialogue that can continue across both countries.",
  notice:"Future programmes are under discussion. No dates, fees or registrations have been confirmed.",
  historyTitle:"Real exchanges, a longer-term vision.",history:"In 2026, a joint camp in Okinawa and a girls' youth exchange in Taiwan helped build working relationships between development environments.",
  historyNote:"Past activities do not constitute a signed agreement for future commercial programmes.",
  workTitle:"More experience. Better decisions.",workIntro:"Our priority is to give young players opportunities to observe, decide and learn in a different playing and cultural environment—not simply to select winners.",
  programs:[["FRIENDLY GAMES","Age-appropriate games with expectations for level and participation agreed in advance."],["DEVELOPMENT CAMP","Training, game experience and reflection in one learning programme."],["COACH EXCHANGE","Observation, dialogue and online learning for coaches."],["S&C EDUCATION","Coach education on physical preparation, load, recovery and reducing injury risk."]],
  whoTitle:"For academies, clubs and organisers",whoText:"Tell us your learning purpose, age groups, expected numbers and preferred dates. This is not a player transfer or recruitment service.",
  howTitle:"Four steps before delivery",steps:[["01","Share purpose, ages and group size"],["02","Confirm games, venues, coaching and safeguarding"],["03","Document costs, roles and cancellation terms"],["04","Deliver, review and decide whether to continue"]],
  safetyTitle:"Safeguarding comes first.",safety:"We clarify supervision, emergency response, insurance, image consent and parental permission. Travel booking and paid coaching are subject to the applicable legal and operational requirements.",
  inquiryTitle:"Start a practical conversation.",inquiryLead:"Share your organisation, adult contact, age group, group size, timing and learning goals. An enquiry does not create a booking or charge.",
  statusLabel:"PROGRAMME STATUS / PLANNING",contact:"Enquire as an organisation",back:"View international programmes"
 },
 "zh-tw":{
  eyebrow:"RBA INTERNATIONAL / JAPAN × TAIWAN",
  title:"讓日本與台灣的籃球交流持續發生。",
  lead:"不只是一次性的海外交流。我們希望透過比賽、球員學習與教練對話，建立長期的培育連結。",
  notice:"未來活動仍在洽談與規劃中。日期、費用及報名方式尚未確定。",
  historyTitle:"從實際交流出發。",history:"2026年，透過沖繩共同訓練營及台灣女子青少年交流，雙方培育現場建立了實際的連結。",
  historyNote:"過往活動不代表未來商業合作已簽約或確定。",
  workTitle:"不只是比賽，更是學習。",workIntro:"重視孩子在不同文化、語言及球風中觀察、判斷、嘗試與反思的機會，而不只是勝負與選拔。",
  programs:[["FRIENDLY GAMES","事先確認年齡、程度與上場機會的交流賽。"],["DEVELOPMENT CAMP","結合訓練、比賽與回顧的培育營。"],["COACH EXCHANGE","教練觀摩、交流對話及線上學習。"],["S&C EDUCATION","關於體能準備、負荷管理、恢復及降低運動傷害風險的教練教育。"]],
  whoTitle:"歡迎球隊、Academy及主辦單位洽詢",whoText:"請提供交流目的、年齡、人數與希望日期。本服務不涉及個別球員轉隊招募。",
  howTitle:"正式舉辦前的四個步驟",steps:[["01","確認目的、年齡與人數"],["02","確認比賽、場地、教練及照護安排"],["03","以書面確認費用、分工與取消條件"],["04","執行、檢討並評估後續合作"]],
  safetyTitle:"兒少安全是第一優先。",safety:"事前確認隨隊照護、緊急應變、保險、肖像同意及家長許可。旅行安排與有償教學須符合相關法規。",
  inquiryTitle:"一起討論下一次交流。",inquiryLead:"請提供單位、成年聯絡人、年齡、人數、希望時期及學習目標。洽詢不等於報名，也不會產生費用。",
  statusLabel:"PROGRAMME STATUS / PLANNING",contact:"以團體名義洽詢",back:"查看國際交流"
 },
 ko:{
  eyebrow:"RBA INTERNATIONAL / JAPAN × TAIWAN",
  title:"일본과 대만의 코트를 지속적으로 연결합니다.",
  lead:"일회성 원정을 넘어 경기, 선수 학습, 코치 간 대화를 지속 가능한 교류로 발전시키고자 합니다.",
  notice:"향후 프로그램은 논의·준비 단계이며 일정, 비용 및 모집은 확정되지 않았습니다.",
  historyTitle:"현장에서 시작한 교류.",history:"2026년 오키나와 공동 캠프와 대만 여자 유소년 교류를 통해 현장 간 관계를 쌓았습니다.",
  historyNote:"과거 활동이 향후 상업적 공동사업 계약 체결을 의미하지는 않습니다.",
  workTitle:"경기 결과를 넘어 경험으로.",workIntro:"다른 문화와 경기 환경에서 관찰하고 판단하며 배우는 기회를 중시합니다.",
  programs:[["FRIENDLY GAMES","연령, 수준, 출전 기회를 사전에 협의한 교류 경기."],["DEVELOPMENT CAMP","훈련, 경기, 성찰을 결합한 육성 캠프."],["COACH EXCHANGE","코치 간 관찰, 대화, 온라인 학습."],["S&C EDUCATION","체력 준비, 부하 관리, 회복 및 부상 위험 감소에 관한 교육."]],
  whoTitle:"아카데미·클럽·주최자에게",whoText:"목적, 연령, 인원 및 희망 시기를 알려 주세요. 선수 이적·영입을 위한 서비스는 아닙니다.",
  howTitle:"진행 전 네 단계",steps:[["01","목적, 연령, 인원 확인"],["02","경기, 장소, 지도 및 안전 체계 확인"],["03","비용, 역할, 취소 조건 문서화"],["04","실행 후 검토 및 후속 협력 판단"]],
  safetyTitle:"아동 안전을 최우선으로.",safety:"인솔, 긴급 대응, 보험, 초상권 동의 및 보호자 허가를 확인합니다. 여행 예약과 유상 지도는 관련 법적 요건을 확인합니다.",
  inquiryTitle:"다음 교류를 함께 논의합니다.",inquiryLead:"단체명, 성인 담당자, 대상 연령, 인원, 시기, 학습 목적을 알려 주세요. 문의만으로 예약이나 결제는 발생하지 않습니다.",
  statusLabel:"PROGRAMME STATUS / PLANNING",contact:"단체 문의",back:"국제 교류 보기"
 }
};

export function TaiwanExchangePage({locale}:{locale:Locale}){
 const c=copy[locale];
 return <SiteFrame locale={locale}>
  <div className="taiwan-exchange">
   <section className="taiwan-hero section-pad">
    <p className="section-index inverse">{c.eyebrow}</p>
    <h1>{c.title}</h1>
    <p className="taiwan-lead">{c.lead}</p>
    <div className="taiwan-status"><ClipboardCheck aria-hidden="true" size={20}/><span><strong>{c.statusLabel}</strong>{c.notice}</span></div>
    <div className="taiwan-actions"><a className="button button-light" href="#taiwan-enquiry">{c.contact}<ArrowRight size={18}/></a><Link className="text-link light-link" href={localePath(locale,"international")}>{c.back}<ArrowUpRight size={16}/></Link></div>
   </section>
   <section className="taiwan-story section-pad">
    <p className="section-index">2026 / FIELD RECORD</p><h2>{c.historyTitle}</h2><p className="taiwan-wide">{c.history}</p><p className="taiwan-footnote">{c.historyNote}</p>
   </section>
   <section className="taiwan-programmes section-pad">
    <p className="section-index inverse">DEVELOPMENT BEFORE TOURISM</p><h2>{c.workTitle}</h2><p className="taiwan-wide">{c.workIntro}</p>
    <div className="taiwan-grid">{c.programs.map(([title,description],i)=><article key={title}><span>{String(i+1).padStart(2,"0")}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
   </section>
   <section className="taiwan-operations section-pad">
    <div><Users aria-hidden="true" size={30}/><h2>{c.whoTitle}</h2><p>{c.whoText}</p></div>
    <div><Globe2 aria-hidden="true" size={30}/><h2>{c.howTitle}</h2><ol>{c.steps.map(([no,label])=><li key={no}><b>{no}</b><span>{label}</span></li>)}</ol></div>
   </section>
   <section className="taiwan-safety section-pad"><ShieldCheck aria-hidden="true" size={36}/><div><h2>{c.safetyTitle}</h2><p>{c.safety}</p></div></section>
   <section className="taiwan-enquiry section-pad" id="taiwan-enquiry"><p className="section-index">JAPAN × TAIWAN / CONTACT</p><h2>{c.inquiryTitle}</h2><p>{c.inquiryLead}</p><ContactForm locale={locale}/></section>
  </div>
 </SiteFrame>;
}
