import { ArrowRight, MessageCircle, Plane, ShieldCheck, Users } from "lucide-react";
import { Locale, localePath, SiteFrame } from "./site-frame";
import { tr, worldPoints } from "./network-data";
import { isTaipeiClinicUpcoming, taipeiClinicCopy, taipeiClinicPartner, taipeiClinicPath } from "./taipei-clinic-data";
import "./international-first-steps.css";

const firstSteps = {
 ja: {
   lead: "Riot Basketball Academy（RBA）の海外プログラム。クリニックの日程確認や、チーム・学校の交流企画の相談ができます。",
   team: "チーム・学校のご相談",
   teamBody: "合同練習、交流試合、指導者研修など。日程が未定でもご相談いただけます。",
   regions: "地域別の活動",
   penang: "マレーシア・ペナン",
   penangBody: "ペナンで選手向けクリニックと指導者向けの活動を実施しました。次のチーム企画や指導者研修についてご相談いただけます。",
   penangLink: "マレーシアでの企画を相談する",
 },
 en: {
   lead: "International programmes from Riot Basketball Academy (RBA). Find clinic dates or plan an exchange for your team or school.",
   team: "Team & school enquiries",
   teamBody: "Ask about joint practices, friendly games or coach development, even if your dates are flexible.",
   regions: "Programmes by region",
   penang: "Penang, Malaysia",
   penangBody: "RBA has held player clinics and coach development activities in Penang. Contact us to discuss a future team programme or coach workshop.",
   penangLink: "Ask about a programme in Malaysia",
 },
 "zh-tw": {
   lead: "Riot Basketball Academy（RBA）的國際籃球活動。查看訓練營日期，或洽詢球隊與學校交流。",
   team: "球隊與學校合作洽詢",
   teamBody: "可洽詢聯合訓練、交流賽或教練研習，日期未定也歡迎聯絡。",
   regions: "各地活動",
   penang: "馬來西亞・檳城",
   penangBody: "RBA 曾在檳城舉辦球員訓練及教練研習。歡迎洽詢後續的球隊培訓或教練活動。",
   penangLink: "洽詢馬來西亞活動",
 },
 ko: {
   lead: "Riot Basketball Academy(RBA)의 국제 농구 프로그램입니다. 클리닉 일정을 확인하거나 팀·학교 교류를 문의할 수 있습니다.",
   team: "팀·학교 프로그램 문의",
   teamBody: "합동 훈련, 친선 경기, 코치 교육을 문의하세요. 일정이 미정이어도 상담할 수 있습니다.",
   regions: "지역별 활동",
   penang: "말레이시아 페낭",
   penangBody: "RBA는 페낭에서 선수 클리닉과 코치 교육 활동을 진행했습니다. 다음 팀 프로그램이나 코치 워크숍을 문의할 수 있습니다.",
   penangLink: "말레이시아 프로그램 문의",
 },
} as const;

const copy={
 ja:{status:"現在の国際ネットワーク",statusBody:"確認済みの連携と、準備・調整中の連携を、現在の進捗に合わせて掲載しています。",partner:"連携先",discussion:"協議中",ways:"一緒につくれること",cards:[["FRIENDLY GAME","年代・競技レベル・学びたいことを合わせた交流試合。"],["DEVELOPMENT CAMP","選手育成と指導者の学びを組み合わせたキャンプ。"],["COACH EXCHANGE","練習見学、オンライン講習、現場での対話。"],["TOURNAMENT","参加条件と運営体制を確認した大会・交流企画。"]],process:"相談から実施まで",steps:[["01","目的を共有","団体名、年代、人数、希望時期、学びたいことをお知らせください。"],["02","実現方法を整理","対戦相手、会場、指導者、通訳、安全管理、移動など、実施に必要な条件を確認します。"],["03","役割と費用を確認","実施範囲、役割分担、費用、申込条件を書面で確認します。"],["04","実施と振り返り","活動後に得られたことを振り返り、次の交流につなげます。"]],contact:"海外連携を相談する",contactBody:"英語・日本語・繁体字中国語・韓国語でご相談いただけます。",mail:"お問い合わせへ",whatsapp:"WhatsAppで相談"},
 en:{status:"Current international network",statusBody:"Confirmed relationships and discussions are shown separately.",partner:"Partner",discussion:"In discussion",ways:"What we can build together",cards:[["FRIENDLY GAME","Match age, level and learning purpose."],["DEVELOPMENT CAMP","Combine player development and coach learning."],["COACH EXCHANGE","Observation, online learning and court dialogue."],["TOURNAMENT","Events with clear eligibility and operating roles."]],process:"From enquiry to delivery",steps:[["01","Share the purpose","Tell us the organisation, ages, group size, timing and learning goal."],["02","Shape a realistic plan","Clarify opponents, court, coaches, language, safety and travel conditions."],["03","Confirm roles and cost","Document responsibilities, scope, fees and entry terms."],["04","Deliver and review","Review the experience and agree the next step."]],contact:"Discuss an international programme",contactBody:"Enquiries are welcome in English, Japanese, Traditional Chinese and Korean.",mail:"Open enquiry",whatsapp:"WhatsApp"},
 "zh-tw":{status:"目前國際網絡",statusBody:"已確認合作與洽談中關係分開標示。",partner:"合作夥伴",discussion:"洽談中",ways:"可共同規劃",cards:[["FRIENDLY GAME","配合年齡、程度與學習目的的交流賽。"],["DEVELOPMENT CAMP","結合球員培育與教練學習。"],["COACH EXCHANGE","觀摩、線上課程與場上交流。"],["TOURNAMENT","確認資格與運營角色的賽事企劃。"]],process:"從洽詢到執行",steps:[["01","分享目的","提供單位、年齡、人數、時間與學習目標。"],["02","整理可行方案","確認對手、場地、教練、語言、安全及移動條件。"],["03","確認分工與費用","以書面確認責任、範圍、費用及參加條件。"],["04","執行與回顧","活動後整理成果與下一步。"]],contact:"洽詢國際合作",contactBody:"可使用英語、日語、繁體中文與韓語聯絡。",mail:"前往洽詢",whatsapp:"WhatsApp洽詢"},
 ko:{status:"현재 국제 네트워크",statusBody:"확인된 협력과 협의 중 관계를 구분해 표시합니다.",partner:"파트너",discussion:"협의 중",ways:"함께 만들 수 있는 것",cards:[["FRIENDLY GAME","연령, 수준과 학습 목적을 맞춘 교류 경기."],["DEVELOPMENT CAMP","선수 성장과 코치 학습을 결합한 캠프."],["COACH EXCHANGE","훈련 관찰, 온라인 학습과 코트 대화."],["TOURNAMENT","참가 조건과 운영 역할이 명확한 대회." ]],process:"문의부터 실행까지",steps:[["01","목적 공유","단체, 연령, 인원, 시기와 학습 목표를 알려 주세요."],["02","실행안 정리","상대, 코트, 코치, 언어, 안전과 이동 조건을 확인합니다."],["03","역할과 비용 확인","책임, 범위, 비용과 참가 조건을 문서로 확인합니다."],["04","실행 및 리뷰","활동 후 성과와 다음 단계를 정리합니다."]],contact:"국제 교류 상담",contactBody:"영어, 일본어, 번체 중국어와 한국어로 문의할 수 있습니다.",mail:"문의하기",whatsapp:"WhatsApp"}
} as const;

export function InternationalPlatform({locale}:{locale:Locale}){
 const c=copy[locale];
 const entry=firstSteps[locale];
 const clinic=taipeiClinicCopy[locale];
 const message=encodeURIComponent(locale==="ja"?"RBAの海外連携について相談したいです。団体名、対象年代、希望時期、交流目的をお送りします。":"Hello RBA, I would like to discuss a Japan–Asia basketball programme.");
 return <SiteFrame locale={locale} languagePage="international"><div className="international-platform">
  <section className="international-hero international-first-steps section-pad">
    <p className="section-index inverse">RIOT BASKETBALL ACADEMY</p>
    <h1>RBA International</h1>
    <p>{entry.lead}</p>
    <div className="international-entry-actions">
      {isTaipeiClinicUpcoming() && <div>
        <a className="button button-light" href={taipeiClinicPath(locale)}>{clinic.details}<ArrowRight aria-hidden="true"/></a>
        <p>{clinic.dates} · {clinic.status}</p>
      </div>}
      <div>
        <a className="button button-dark international-team-action" href="#international-contact">{entry.team}<ArrowRight aria-hidden="true"/></a>
        <p>{entry.teamBody}</p>
      </div>
    </div>
  </section>
  <section className="international-region-entry section-pad" aria-labelledby="international-regions">
    <h2 id="international-regions">{entry.regions}</h2>
    <div className="international-region-grid">
      <article>
        <h3>{clinic.place}</h3>
        <p>{taipeiClinicPartner}</p>
        <a href={localePath(locale,"taiwan")}>{({ja:"台湾の活動を見る",en:"Explore Taiwan programmes","zh-tw":"查看台灣活動",ko:"대만 활동 보기"})[locale]} →</a>
      </article>
      <article>
        <h3>{entry.penang}</h3>
        <p>{entry.penangBody}</p>
        <a href="#international-contact">{entry.penangLink} →</a>
      </article>
    </div>
  </section>
  <section className="section-pad" style={{background:"#111518",color:"#f9f9f9",borderTop:"1px solid #3f474c"}} aria-labelledby="japan-experience-hub">
    <div style={{maxWidth:1110,margin:"0 auto"}}>
      <p className="section-index inverse">RBA JAPAN EXPERIENCE / NEW</p>
      <h2 id="japan-experience-hub" style={{fontSize:"clamp(32px,5vw,58px)",lineHeight:1.1,maxWidth:800,margin:"16px 0"}}>{({ja:"世界から、日本のバスケットボールへ。",en:"Bring your basketball team to Japan.","zh-tw":"帶著球隊，一起來日本。",ko:"일본으로 팀의 농구 여행을 시작해 보세요."})[locale]}</h2>
      <p style={{maxWidth:810,color:"#cdd4d7",fontSize:16,lineHeight:1.8}}>{({ja:"短期キャンプ、交流試合、指導者研修、日本文化・教育交流。海外からの団体と、旅行・宿泊・交通・企業協賛のパートナーに分けた相談窓口をご用意しました。",en:"Basketball camps, friendly games, coach learning, culture and education. Separate enquiry paths for visiting teams and qualified service or sponsor partners.","zh-tw":"籃球營、交流賽、教練研習與文化體驗。赴日團體與企業合作使用不同的洽詢管道。",ko:"농구 캠프, 교류 경기, 코치 교육, 문화·교육 체험을 목적에 맞게 기획합니다."})[locale]}</p>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:24}}>
        <a className="button button-light" href={locale==="ja"?"/ja/international/japan-experience":locale==="zh-tw"?"/zh-tw/international/japan-experience":"/international/japan-experience"}>{({ja:"訪日プログラム・無料相談",en:"Plan a Japan team visit","zh-tw":"赴日球隊諮詢",ko:"팀 방문 상담"})[locale]} <ArrowRight size={18}/></a>
        <a className="button button-dark" style={{border:"1px solid #aeb6ba"}} href={locale==="ja"?"/ja/international/partner-with-us":locale==="zh-tw"?"/zh-tw/international/partner-with-us":"/international/partner-with-us"}>{({ja:"旅行会社・企業協賛の方",en:"Travel suppliers & sponsors","zh-tw":"旅行業者與企業贊助",ko:"여행업체 및 후원사"})[locale]} <ArrowRight size={18}/></a>
      </div>
    </div>
  </section>
  <section className="section-pad" aria-labelledby="japan-visit-start" style={{background:"#fff",color:"#10233f"}}>
    <div style={{maxWidth:1080,margin:"0 auto"}}>
      <p className="section-index">JAPAN BASKETBALL VISITS / START HERE</p>
      <h2 id="japan-visit-start" style={{fontSize:"clamp(26px,4vw,40px)",lineHeight:1.3,margin:"0 0 12px"}}>{({ja:"日本に来たい。その気持ちから相談できます。",en:"Your basketball visit to Japan starts with a conversation.","zh-tw":"想來日本打籃球？從聊聊你的想法開始。",ko:"일본에서 농구하고 싶다면, 먼저 이야기해 주세요."})[locale]}</h2>
      <p style={{maxWidth:760,lineHeight:1.9}}>{({ja:"交流試合、育成キャンプ、指導者研修、学校・文化交流。まだ日程や予算が決まっていなくても大丈夫です。実現できる内容を一緒に整理します。",en:"Friendly games, development camps, coach learning, school and cultural exchange. You don't need confirmed dates or a budget to ask. We'll explore realistic options together.","zh-tw":"交流賽、培訓營、教練研習、學校與文化交流。日期或預算還沒決定也可以先洽詢。","ko":"친선 경기, 육성 캠프, 코치 교육, 학교·문화 교류. 일정과 예산이 미정이어도 먼저 상담할 수 있습니다."})[locale]}</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:12,margin:"24px 0"}}>
        {[
          ["01",({ja:"希望を伝える",en:"Tell us your idea","zh-tw":"分享想法",ko:"희망 사항 공유"})[locale]],
          ["02",({ja:"一緒に企画する",en:"Plan together","zh-tw":"一起規劃",ko:"함께 기획"})[locale]],
          ["03",({ja:"条件と費用を確認",en:"Confirm scope and costs","zh-tw":"確認條件與費用",ko:"조건·비용 확인"})[locale]]
        ].map(([number,title])=><div key={number} style={{border:"1px solid #d8dfe7",padding:18}}><strong style={{display:"block",fontSize:12,marginBottom:7}}>{number}</strong><span style={{fontWeight:700}}>{title}</span></div>)}
      </div>
      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        <a className="button button-dark" href={`https://wa.me/818032483703?text=${encodeURIComponent(({ja:"日本でのバスケットボール交流を相談したいです。団体名・国／地域：　希望内容：　希望時期：　人数：",en:"Hello RBA! We would like to explore a basketball visit to Japan. Organisation / country:  Interested activities:  Preferred timing:  Approximate group size: ", "zh-tw":"您好！我們想詢問赴日籃球交流。單位／國家：　希望活動：　時間：　人數：",ko:"안녕하세요. 일본 농구 교류를 상담하고 싶습니다. 단체/국가:  희망 활동:  시기:  인원: "})[locale])}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/>{({ja:"WhatsAppで無料相談",en:"Ask on WhatsApp — free","zh-tw":"WhatsApp 免費洽詢",ko:"WhatsApp 무료 상담"})[locale]}</a>
        <a className="button button-light" href={localePath(locale,"contact")}>{({ja:"メールで相談",en:"Contact by email","zh-tw":"電子郵件洽詢",ko:"이메일 문의"})[locale]} <ArrowRight size={16}/></a>
      </div>
      <p style={{fontSize:12,marginTop:16,color:"#536174",lineHeight:1.8}}>{({ja:"相談は無料です。対戦相手、会場、宿泊、移動、通訳などは確約ではなく、条件を確認したうえで個別にご提案します。",en:"Enquiries are free. Opponents, venues, accommodation, transport and interpreters are subject to availability and written confirmation.","zh-tw":"洽詢免費。比賽對手、場地、住宿與交通等均須確認後才能安排。",ko:"상담은 무료입니다. 상대 팀, 시설, 숙박, 이동 등은 확인 후 제안합니다."})[locale]}</p>
    </div>
  </section>
  <section className="international-network section-pad"><div className="section-head"><div><p className="section-index">JAPAN × ASIA</p><h2>{c.status}</h2></div><p>{c.statusBody}</p></div><div className="international-network-grid">{worldPoints.map(point=><article key={point.id}><span>{point.status==="partner"?c.partner:tr(point.statusLabel||[c.discussion,c.discussion,c.discussion,c.discussion],locale)}</span><h3>{tr(point.name,locale)}</h3><p>{tr(point.detail,locale)}</p></article>)}</div></section>
  <section className="international-programmes section-pad"><p className="section-index inverse">PROGRAMME DESIGN</p><h2>{c.ways}</h2><div>{c.cards.map(([title,body])=><article key={title}><Plane/><h3>{title}</h3><p>{body}</p></article>)}</div></section>
  <section className="international-process section-pad"><div><p className="section-index">SAFE / CLEAR / PURPOSEFUL</p><h2>{c.process}</h2><ShieldCheck/></div><ol>{c.steps.map(([no,title,body])=><li key={no}><span>{no}</span><div><strong>{title}</strong><p>{body}</p></div></li>)}</ol></section>
  <section className="international-contact section-pad" id="international-contact"><div><p className="section-index inverse">CONTACT RBA</p><h2>{c.contact}</h2><p>{c.contactBody}</p></div><div><a className="button button-light" href={localePath(locale,"contact")}><Users/>{c.mail}<ArrowRight/></a><a className="button button-light" href={`https://wa.me/818032483703?text=${message}`} target="_blank" rel="noreferrer"><MessageCircle/>{c.whatsapp}</a></div></section>
 </div></SiteFrame>;
}
