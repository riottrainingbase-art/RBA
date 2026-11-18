import "./founder-profile.css";
import Image from "next/image";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Locale, localePath, SiteFrame } from "./site-frame";

const copy = {
 en: {
  label:"THE FOUNDER",name:"Masato Nishio",native:"西尾 優人",role:"Founder & Director · Riot Basketball Academy",headline:"The player comes first.\nThe horizon stays open.",
  bio:"Masato Nishio is a Sendai-based basketball and strength & conditioning coach and an NSCA-CPT. He represented Tohoku in competition and participated in Japan’s National Sports Festival, then gained S&C coaching experience in Germany before returning to Japan. He leads Riot Training Base and founded Riot Basketball Academy to connect game understanding, age-appropriate physical preparation and coach education across Japan and Asia.",
  belief:"His conviction is simple: development begins by seeing the individual. Learning to read the game, make a choice and reflect on the result builds a foundation that lasts beyond a single performance.",
  missionLabel:"OUR MISSION",mission:"A next opportunity to grow,\nfor every young player.",missionBody:"Help each player understand, decide and act with purpose. Connect basketball learning, physical preparation and coach education to build environments where long-term growth can take root.",
  visionLabel:"OUR VISION",vision:"A leading platform.\nA wider world of opportunity.",visionBody:"Build one of Japan’s leading youth basketball development platforms where a child’s home region does not limit what they can learn. Sustain relationships between Japan and Asia that help players and coaches grow together.",
  journeyLabel:"MY BACKGROUND",journeyTitle:"Experience shaped on both sides of the court.",journeyIntro:"From competing as a player to coaching and physical preparation in Germany and Japan, my focus has remained on what young athletes need to keep developing.",
  credentials:["NSCA Certified Personal Trainer (NSCA-CPT)","Tohoku selection and National Sports Festival playing experience","Strength & conditioning coaching experience in Germany","Director, Riot Training Base / Founder, Riot Basketball Academy"],
  principlesLabel:"THE WORK BEHIND THE WORDS",principlesTitle:"Four commitments to youth development.",
  principles:[{title:"Decisions before drills",body:"Build perception, choices and action through meaningful games and constraints, rather than memorising movements alone."},{title:"Growth before short-term results",body:"Plan training for age and development stage, allowing every player meaningful opportunities to learn."},{title:"Health and readiness",body:"Integrate strength, movement, fatigue management, recovery and injury prevention into the basketball environment."},{title:"Learning for coaches and families",body:"Question familiar routines, share evidence with care and create environments where children can speak and try."}],
  nextAction:"Explore our development philosophy",nextLink:"See current opportunities",
  contactTitle:"A shared purpose is where we begin.",contactBody:"Clinics, coach learning, Japan–Asia exchange or a new partnership. Tell us who you work with and what you hope to make possible.",cta:"Contact Masato on WhatsApp",note:"Your message opens in WhatsApp. Review it before sending.",message:"Hello Masato, I read your profile on the RBA website. I would like to discuss a clinic, coach learning, Japan–Asia exchange or partnership. Organisation / location: \nWhat we hope to do: ",more:"Meet the founder",alt:"Masato Nishio giving basketball instruction on court",caption:"MASATO NISHIO / ON COURT"
 },
 ja:{
  label:"創設者について",name:"西尾 優人",native:"MASATO NISHIO",role:"Riot Basketball Academy 創設者・代表",headline:"一人の可能性に、\n世界への視野を。",
  bio:"仙台を拠点に活動するバスケットボール指導者・S&Cコーチ。NSCA-CPT。選手として東北選抜・国体を経験し、ドイツでS&C指導に携わった後、国内のクラブ指導の現場を経てRiot Training Baseを運営、Riot Basketball Academyを創設しました。今も日本各地やアジアの現場とつながり、ゲームの理解、年齢に応じた身体づくり、指導者教育を一つにつなぐ活動を続けています。",
  belief:"子どもの可能性を、勝敗や早い段階の選手評価だけで決めたくありません。試合の中で状況を読み、自分で判断し、実行して振り返ること。成長段階に応じた身体づくりと休息を大切にすること。指導者自身も学び続けること。そのすべてが、一度の結果に終わらない育成の土台になると考えています。",
  missionLabel:"ミッション",mission:"すべての子どもに、\n次の成長機会を。",missionBody:"一人ひとりが理解し、判断し、意図を持って行動できる力を育む。バスケットボール、身体づくり、指導者教育をつなぎ、長期的な成長が根づく環境をつくります。",
  visionLabel:"ビジョン",vision:"日本最大級の\n育成プラットフォームへ。",visionBody:"住む場所によって、子どもの学びの可能性が限られない未来へ。日本最大級の育成年代バスケットボール・プラットフォームを目指します。日本とアジアの間に継続的な関係を育て、選手と指導者が知識を分かち合い、共に成長できる環境を目指します。",
  journeyLabel:"MY BACKGROUND / 経歴",journeyTitle:"経験を並べるためではなく、現場を変えるために。",journeyIntro:"私は、選手として競技を経験し、ドイツで身体づくりと指導を学び、帰国後もクラブの現場で試行錯誤を続けてきました。そこで強く感じたのは、子どもの可能性が、所属先やその時点の勝敗だけで判断されてしまうことへの違和感です。",
  credentials:["NSCA-CPT（NSCA認定パーソナルトレーナー）","選手として東北選抜・国体を経験","ドイツでのストレングス＆コンディショニング指導経験","Riot Training Base代表／Riot Basketball Academy創設者"],
  principlesLabel:"COACHING PRINCIPLES / 指導の軸",principlesTitle:"育成で、私が譲らないこと。",
  principles:[{title:"ドリルの再現より、試合での判断",body:"技術だけを切り離さず、状況を認知し、選び、実行する力をゲームの中で育てます。"},{title:"目先の勝敗より、長期的な成長",body:"出場機会、発育段階、練習量を考え、一人ひとりが学べる環境を設計します。"},{title:"身体の準備と、休息も育成の一部",body:"S&C、基本動作、負荷管理、けがの予防を、競技力の話と切り離しません。"},{title:"指導者と保護者も学び続ける",body:"慣習や経験則を無条件に正解とせず、科学的根拠と子どもの実際の姿に照らして考えます。"}],
  nextAction:"RBAの育成方針を読む",nextLink:"開催予定・参加の入口を見る",
  contactTitle:"共に実現したいことから、話そう。",contactBody:"クリニック、指導者の学び、日本とアジアの交流、パートナーシップ。活動する地域や対象、実現したいことをお聞かせください。",cta:"西尾優人にWhatsAppで相談",note:"WhatsAppが開きます。内容を確認してから送信できます。",message:"西尾さん、RBAのプロフィールを拝見しました。クリニック・指導者の学び・国際交流・連携について相談したいです。\n団体名・地域：\n実現したいこと：",more:"創設者の紹介を読む",alt:"コートでバスケットボールの指導をする西尾優人",caption:"西尾優人 / 指導の現場から"
 },
 "zh-tw":{
  label:"創辦人介紹",name:"西尾 優人",native:"MASATO NISHIO",role:"Riot Basketball Academy 創辦人・代表",headline:"看見每一份潛能，\n開啟世界的視野。",
  bio:"以日本仙台為據點，西尾優人將球員培育、身體訓練與教練學習連結起來。透過Riot Basketball Academy，他與日本各地及亞洲的教練和在地主辦單位合作，從球場的真實需求出發，創造學習機會。",
  belief:"他的信念是看見每一位球員。學會閱讀比賽、自主判斷、付諸行動並反思，才能建立超越單次表現、持續成長的基礎。",
  missionLabel:"我們的使命",mission:"讓每一個孩子，\n都有下一個成長機會。",missionBody:"讓每位球員具備理解、判斷與有意識行動的能力。連結籃球學習、身體訓練與教練教育，建立能讓長期成長扎根的環境。",
  visionLabel:"我們的願景",vision:"打造日本具代表性的\n青少年籃球育成平台。",visionBody:"邁向孩子的學習機會不受居住地限制的未來。在日本與亞洲之間建立持續的關係，讓球員與教練分享知識、共同成長。",
  journeyLabel:"經歷與背景",journeyTitle:"從球場經驗出發，重新思考培育環境。",journeyIntro:"西尾優人擁有NSCA-CPT資格，曾入選東北代表並參與日本國民體育大會，亦有在德國從事體能訓練指導的經驗。他致力於讓年輕球員有持續成長的機會。",
  credentials:["NSCA-CPT 認證私人教練","東北代表、國民體育大會選手經歷","德國體能訓練指導經驗","Riot Training Base 代表／RBA 創辦人"],
  principlesLabel:"培育原則",principlesTitle:"不只追求眼前的勝負。",
  principles:[{title:"培養比賽判斷能力",body:"在有意義的比賽情境中，學習閱讀局勢、做出選擇及行動。"},{title:"尊重長期發展",body:"重視每個孩子的發育階段與學習機會。"},{title:"身體準備與恢復",body:"整合體能訓練、負荷管理、休息及傷害預防。"},{title:"教練與家長持續學習",body:"以合理證據與實際需求，反思習以為常的做法。"}],
  nextAction:"了解培育理念",nextLink:"查看活動機會",
  contactTitle:"從共同想實現的目標開始。",contactBody:"訓練營、教練學習、日本與亞洲交流或合作提案。請告訴我們您的地區、服務對象與希望實現的目標。",cta:"透過WhatsApp聯絡西尾優人",note:"將開啟WhatsApp，您可確認內容後再傳送。",message:"西尾先生您好，我在RBA網站閱讀了您的介紹，想詢問訓練營、教練學習、日本與亞洲交流或合作。\n單位與地區：\n希望實現的目標：",more:"認識創辦人",alt:"西尾優人在球場上指導籃球",caption:"西尾優人 / 球場現場"
 },
 ko:{
  label:"설립자 소개",name:"Masato Nishio",native:"西尾 優人 · 니시오 마사토",role:"Riot Basketball Academy 설립자·대표",headline:"한 사람의 가능성에,\n세계를 향한 시야를.",
  bio:"일본 센다이를 거점으로 활동하는 니시오 마사토는 선수 육성, 신체 훈련과 코치의 배움을 연결합니다. Riot Basketball Academy를 통해 일본 각지와 아시아의 지도자 및 지역 주최자와 협력하며 코트의 실제 요구에 기반한 배움의 기회를 만듭니다.",
  belief:"그의 신념은 선수 한 사람 한 사람을 바라보는 것입니다. 경기를 읽고, 스스로 판단하고, 실행하고, 돌아보는 경험이 한 번의 성과를 넘어 지속적인 성장의 토대가 된다고 믿습니다.",
  missionLabel:"우리의 미션",mission:"모든 아이에게\n다음 성장 기회를.",missionBody:"각 선수가 이해하고 판단하며 의도를 가지고 행동하는 힘을 기릅니다. 농구 학습, 신체 훈련과 코치 교육을 연결해 장기적인 성장이 뿌리내릴 환경을 만듭니다.",
  visionLabel:"우리의 비전",vision:"일본을 대표하는\n유소년 농구 성장 플랫폼으로.",visionBody:"사는 곳이 아이의 배움의 기회를 제한하지 않는 미래를 향합니다. 일본과 아시아 사이에 지속적인 관계를 구축해 선수와 지도자가 지식을 나누고 함께 성장하는 환경을 지향합니다.",
  journeyLabel:"지도자 경력",journeyTitle:"코트의 경험을 더 나은 육성 환경으로.",journeyIntro:"니시오 마사토는 NSCA-CPT 자격을 보유하고 있으며, 도호쿠 선발·국민체육대회 선수 경험과 독일에서의 S&C 지도 경험을 바탕으로 장기적인 선수 육성에 힘쓰고 있습니다.",
  credentials:["NSCA-CPT 인증 퍼스널 트레이너","도호쿠 선발·일본 국민체육대회 선수 경험","독일에서의 S&C 지도 경험","Riot Training Base 대표 / RBA 설립자"],
  principlesLabel:"육성 원칙",principlesTitle:"당장의 결과보다 중요한 것.",
  principles:[{title:"경기 속 판단",body:"상황을 읽고 스스로 선택하며 실행하는 능력을 기릅니다."},{title:"장기적인 성장",body:"발달 단계와 충분한 배움의 기회를 함께 고려합니다."},{title:"신체 준비와 회복",body:"컨디셔닝, 운동량 관리, 휴식 및 부상 예방을 연결합니다."},{title:"지도자와 보호자의 학습",body:"관습을 그대로 따르기보다 근거와 아이들의 상황을 바탕으로 함께 고민합니다."}],
  nextAction:"RBA의 육성 철학",nextLink:"활동 일정 살펴보기",
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
   <div className="founder-copy"><p className="founder-eyebrow">RIOT BASKETBALL ACADEMY / {c.label}</p><Heading id="founder-name">{c.name}</Heading><p className="founder-native">{c.native}</p><p className="founder-role">{c.role}</p><h3 className="founder-belief">{c.headline}</h3><p>{c.bio}</p>{full&&<p>{c.belief}</p>}<div className="founder-actions"><a className="founder-contact" href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/>{c.cta}<ArrowUpRight size={17}/></a>{!full&&<a className="founder-more" href={`${localePath(locale,"about")}#founder`}>{c.more}<ArrowUpRight size={16}/></a>}</div></div>
  </div>
  <div className="founder-principles"><article><p className="founder-eyebrow">01 / MISSION · {c.missionLabel}</p><h3>{c.mission}</h3><p>{c.missionBody}</p></article><article><p className="founder-eyebrow">02 / VISION · {c.visionLabel}</p><h3>{c.vision}</h3><p>{c.visionBody}</p></article></div>
  {full&&<div className="founder-depth" aria-labelledby="founder-depth-title">
    <div className="founder-depth-intro">
      <p className="founder-eyebrow">{c.journeyLabel}</p>
      <h2 id="founder-depth-title">{c.journeyTitle}</h2>
      <p>{c.journeyIntro}</p>
      <ul className="founder-credentials" aria-label={c.journeyLabel}>{c.credentials.map(item=><li key={item}>{item}</li>)}</ul>
    </div>
    <div className="founder-practice">
      <p className="founder-eyebrow">{c.principlesLabel}</p>
      <h2>{c.principlesTitle}</h2>
      <div className="founder-practice-grid">{c.principles.map((item,index)=><article key={item.title}><span>{String(index+1).padStart(2,"0")}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
      <nav className="founder-next-links" aria-label={c.principlesLabel}>
        <a href={localePath(locale,"approach")}>{c.nextAction}<ArrowUpRight size={17} aria-hidden="true"/></a>
        <a href={localePath(locale,"opportunities")}>{c.nextLink}<ArrowUpRight size={17} aria-hidden="true"/></a>
      </nav>
    </div>
  </div>}
  {full&&<div className="founder-invitation"><p className="founder-eyebrow">LET’S BEGIN A CONVERSATION</p><h2>{c.contactTitle}</h2><p>{c.contactBody}</p><a className="founder-contact" href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/>{c.cta}<ArrowUpRight size={17}/></a><small>{c.note}</small><a className="founder-email" href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a></div>}
 </section>;
}

export function FounderAboutPage({locale}:{locale:Locale}) { return <SiteFrame locale={locale} languagePage="about"><FounderProfile locale={locale} full/></SiteFrame>; }
