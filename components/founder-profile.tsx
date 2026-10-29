import "./founder-profile.css";
import Image from "next/image";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Locale, localePath, SiteFrame } from "./site-frame";

const copy = {
 en: {
  label:"THE FOUNDER",name:"Masato Nishio",native:"西尾 優人",role:"Founder & Director · Riot Basketball Academy",headline:"The player comes first.\nThe horizon stays open.",
  bio:"Based in Sendai, Japan, Masato Nishio brings player development, physical preparation and coach learning into one continuous practice. Through Riot Basketball Academy, he works with coaches and local organisers across Japan and Asia to create learning grounded in the realities of the court.",
  belief:"His conviction is simple: development begins by seeing the individual. Learning to read the game, make a choice and reflect on the result builds a foundation that lasts beyond a single performance.",
  missionLabel:"OUR MISSION",mission:"A next opportunity to grow,\nfor every young player.",missionBody:"Help each player understand, decide and act with purpose. Connect basketball learning, physical preparation and coach education to build environments where long-term growth can take root.",
  visionLabel:"OUR VISION",vision:"A leading platform.\nA wider world of opportunity.",visionBody:"Build one of Japan’s leading youth basketball development platforms. A future in which where a child lives does not limit what they can learn, with lasting relationships between Japan and Asia that help players and coaches grow together.",
  contactTitle:"A shared purpose is where we begin.",contactBody:"Clinics, coach learning, Japan–Asia exchange or a new partnership. Tell us who you work with and what you hope to make possible.",cta:"Contact Masato on WhatsApp",note:"Your message opens in WhatsApp. Review it before sending.",message:"Hello Masato, I read your profile on the RBA website. I would like to discuss a clinic, coach learning, Japan–Asia exchange or partnership. Organisation / location: \nWhat we hope to do: ",more:"Meet the founder",alt:"Masato Nishio giving basketball instruction on court",caption:"MASATO NISHIO / ON COURT"
 },
 ja:{
  label:"創設者について",name:"西尾 優人",native:"MASATO NISHIO",role:"Riot Basketball Academy 創設者・代表",headline:"一人の可能性に、\n世界への視野を。",
  bio:"仙台を拠点に、選手育成、身体づくり、指導者の学びを一つにつなぐ。Riot Basketball Academyを通じて、日本各地とアジアの指導者・地域主催者と協働し、コートの現実から育成の機会をつくっています。 MVPアカデミーおよびSPARTANSアカデミーのテクニカルアドバイザーも務めています。",
  belief:"大切にしているのは、一人ひとりを見つめること。ゲームを読み、自分で判断し、実行し、振り返る。その積み重ねが、一度の結果にとどまらない成長の土台になると考えています。",
  missionLabel:"ミッション",mission:"すべての子どもに、\n次の成長機会を。",missionBody:"一人ひとりが理解し、判断し、意図を持って行動できる力を育む。バスケットボール、身体づくり、指導者教育をつなぎ、長期的な成長が根づく環境をつくります。",
  visionLabel:"ビジョン",vision:"日本最大級の\n育成プラットフォームへ。",visionBody:"住む場所によって、子どもの学びの可能性が限られない未来へ。日本最大級の育成年代バスケットボール・プラットフォームを目指します。日本とアジアの間に継続的な関係を育て、選手と指導者が知識を分かち合い、共に成長できる環境を目指します。",
  contactTitle:"共に実現したいことから、話そう。",contactBody:"クリニック、指導者の学び、日本とアジアの交流、パートナーシップ。活動する地域や対象、実現したいことをお聞かせください。",cta:"西尾優人にWhatsAppで相談",note:"WhatsAppが開きます。内容を確認してから送信できます。",message:"西尾さん、RBAのプロフィールを拝見しました。クリニック・指導者の学び・国際交流・連携について相談したいです。\n団体名・地域：\n実現したいこと：",more:"創設者の紹介を読む",alt:"コートでバスケットボールの指導をする西尾優人",caption:"西尾優人 / 指導の現場から"
 },
 "zh-tw":{
  label:"創辦人介紹",name:"西尾 優人",native:"MASATO NISHIO",role:"Riot Basketball Academy 創辦人・代表",headline:"看見每一份潛能，\n開啟世界的視野。",
  bio:"以日本仙台為據點，西尾優人將球員培育、身體訓練與教練學習連結起來。透過Riot Basketball Academy，他與日本各地及亞洲的教練和在地主辦單位合作，從球場的真實需求出發，創造學習機會。",
  belief:"他的信念是看見每一位球員。學會閱讀比賽、自主判斷、付諸行動並反思，才能建立超越單次表現、持續成長的基礎。",
  missionLabel:"我們的使命",mission:"讓每一個孩子，\n都有下一個成長機會。",missionBody:"讓每位球員具備理解、判斷與有意識行動的能力。連結籃球學習、身體訓練與教練教育，建立能讓長期成長扎根的環境。",
  visionLabel:"我們的願景",vision:"打造日本具代表性的\n青少年籃球育成平台。",visionBody:"邁向孩子的學習機會不受居住地限制的未來。在日本與亞洲之間建立持續的關係，讓球員與教練分享知識、共同成長。",
  contactTitle:"從共同想實現的目標開始。",contactBody:"訓練營、教練學習、日本與亞洲交流或合作提案。請告訴我們您的地區、服務對象與希望實現的目標。",cta:"透過WhatsApp聯絡西尾優人",note:"將開啟WhatsApp，您可確認內容後再傳送。",message:"西尾先生您好，我在RBA網站閱讀了您的介紹，想詢問訓練營、教練學習、日本與亞洲交流或合作。\n單位與地區：\n希望實現的目標：",more:"認識創辦人",alt:"西尾優人在球場上指導籃球",caption:"西尾優人 / 球場現場"
 },
 ko:{
  label:"설립자 소개",name:"Masato Nishio",native:"西尾 優人 · 니시오 마사토",role:"Riot Basketball Academy 설립자·대표",headline:"한 사람의 가능성에,\n세계를 향한 시야를.",
  bio:"일본 센다이를 거점으로 활동하는 니시오 마사토는 선수 육성, 신체 훈련과 코치의 배움을 연결합니다. Riot Basketball Academy를 통해 일본 각지와 아시아의 지도자 및 지역 주최자와 협력하며 코트의 실제 요구에 기반한 배움의 기회를 만듭니다.",
  belief:"그의 신념은 선수 한 사람 한 사람을 바라보는 것입니다. 경기를 읽고, 스스로 판단하고, 실행하고, 돌아보는 경험이 한 번의 성과를 넘어 지속적인 성장의 토대가 된다고 믿습니다.",
  missionLabel:"우리의 미션",mission:"모든 아이에게\n다음 성장 기회를.",missionBody:"각 선수가 이해하고 판단하며 의도를 가지고 행동하는 힘을 기릅니다. 농구 학습, 신체 훈련과 코치 교육을 연결해 장기적인 성장이 뿌리내릴 환경을 만듭니다.",
  visionLabel:"우리의 비전",vision:"일본을 대표하는\n유소년 농구 성장 플랫폼으로.",visionBody:"사는 곳이 아이의 배움의 기회를 제한하지 않는 미래를 향합니다. 일본과 아시아 사이에 지속적인 관계를 구축해 선수와 지도자가 지식을 나누고 함께 성장하는 환경을 지향합니다.",
  contactTitle:"함께 이루고 싶은 일에서 시작합니다.",contactBody:"클리닉, 코치 교육, 일본–아시아 교류 또는 파트너십. 활동 지역과 대상, 실현하고 싶은 목표를 알려 주세요.",cta:"WhatsApp으로 마사토에게 문의",note:"WhatsApp이 열립니다. 내용을 확인한 후 전송할 수 있습니다.",message:"마사토님 안녕하세요. RBA 웹사이트에서 소개를 읽고 클리닉, 코치 교육, 일본–아시아 교류 또는 협력에 대해 문의드립니다.\n단체명·지역:\n실현하고 싶은 목표:",more:"설립자 알아보기",alt:"코트에서 농구를 지도하는 니시오 마사토",caption:"MASATO NISHIO / 코트 현장에서"
 }
} as const;

export function FounderProfile({locale,full=false}:{locale:Locale;full?:boolean}) {
 const c=copy[locale];
 const whatsapp=`https://wa.me/818032483703?text=${encodeURIComponent(c.message)}`;
 const Heading=full?"h1":"h2";
 return <section className={`founder-profile${full?" founder-profile-full":""}`} id="founder" aria-labelledby="founder-name">
  <div className="founder-intro">
   <figure className="founder-portrait"><Image src="/media/founder/masato-nishio-on-court.webp" sizes="(max-width: 760px) 90vw, 42vw" alt={c.alt} width="874" height="860" loading={full?"eager":"lazy"}/><figcaption>{c.caption}</figcaption></figure>
   <div className="founder-copy"><p className="founder-eyebrow">RIOT BASKETBALL ACADEMY / {c.label}</p><Heading id="founder-name">{c.name}</Heading><p className="founder-native">{c.native}</p><p className="founder-role">{c.role}</p><h3 className="founder-belief">{c.headline}</h3><p>{c.bio}</p>{locale==="ja"&&<p><a href="https://mvpbasketballacademy.com.my/" target="_blank" rel="noopener noreferrer">MVP Basketball Academy（マレーシア）↗</a>　／　<a href="https://www.spartans.com.tw/ja/about-spartans" target="_blank" rel="noopener noreferrer">SPARTANS Basketball Academy（台湾）↗</a></p>}{full&&<p>{c.belief}</p>}<div className="founder-actions"><a className="founder-contact" href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/>{c.cta}<ArrowUpRight size={17}/></a>{!full&&<a className="founder-more" href={`${localePath(locale,"about")}#founder`}>{c.more}<ArrowUpRight size={16}/></a>}</div></div>
  </div>
  <div className="founder-principles"><article><p className="founder-eyebrow">01 / MISSION · {c.missionLabel}</p><h3>{c.mission}</h3><p>{c.missionBody}</p></article><article><p className="founder-eyebrow">02 / VISION · {c.visionLabel}</p><h3>{c.vision}</h3><p>{c.visionBody}</p></article></div>
  {full&&<div className="founder-invitation"><p className="founder-eyebrow">LET’S BEGIN A CONVERSATION</p><h2>{c.contactTitle}</h2><p>{c.contactBody}</p><a className="founder-contact" href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/>{c.cta}<ArrowUpRight size={17}/></a><small>{c.note}</small><a className="founder-email" href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a></div>}
 </section>;
}

export function FounderAboutPage({locale}:{locale:Locale}) { return <SiteFrame locale={locale} languagePage="about"><FounderProfile locale={locale} full/></SiteFrame>; }
