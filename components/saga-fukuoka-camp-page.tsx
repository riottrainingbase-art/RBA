import { ArrowRight, CalendarDays, CheckCircle2, Clock3, MapPin, WalletCards } from "lucide-react";
import { Locale, localePath, SiteFrame } from "./site-frame";

const registrationUrl="https://docs.google.com/forms/d/e/1FAIpQLSfTiiqA9Ak6xpzmrhSIN34HHjGOsDcNBLlTws0cYF9bCqyO9w/viewform?usp=send_form";

const paymentLinks={
  full:"https://book.stripe.com/fZu7sN2XZ9zC9eRakv7EQ0e",
  day1:"https://book.stripe.com/4gM28t56727agHj50b7EQ0E",
  day2:"https://book.stripe.com/5kQbJ36abdPScr3eAL7EQ0F",
  day1am:"https://book.stripe.com/14AaEZ7ef1369eRakv7EQ0G",
  day1pm:"https://book.stripe.com/00w00l56727afDf8cn7EQ0H",
  day2am:"https://book.stripe.com/14AfZj2XZbHKaiV78j7EQ0I",
  day2pm:"https://book.stripe.com/6oU14p2XZ3be0Il78j7EQ0J",
} as const;

const copy={
  ja:{
    title:"佐賀 × 福岡 2DAYS DEVELOPMENT CAMP",
    lead:"2日間の通し参加だけでなく、日帰り・1セッションから参加できます。技術を反復するだけでなく、周りを見て判断し、ゲームの中で使うところまで練習します。",
    date:"2026年10月3日（土）– 4日（日）",place:"佐賀・福岡（大川）",target:"U8・U10・U12・U15",
    form:"まず共通申込フォームへ",pay:"決済へ進む",how:"申込は2ステップ",howBody:"①共通フォームを送信　②下の参加プランから該当するStripe決済を完了。決済完了で申込確定です。",
    fullNote:"2日間のクリニック、宿泊、BBQ、朝食、2日目昼食を含むフルプラン。",
    dayNote:"日帰り参加。宿泊は含みません。",sessionNote:"指定セッションのみ参加。宿泊は含みません。",
    schedule:"セッション内容",plans:"参加プランを選ぶ",back:"Development Campへ戻る",
    note:"当日の進行、参加人数、選手の状態等により、練習内容・順序・時間配分を調整する場合があります。"
  },
  en:{
    title:"Saga × Fukuoka 2-Day Development Camp",
    lead:"Join for the full two days, one day only, or a single session. The focus is not just learning moves, but seeing, thinking and choosing in game situations.",
    date:"3–4 October 2026",place:"Saga & Okawa, Fukuoka",target:"U8 / U10 / U12 / U15",
    form:"Open the common registration form",pay:"Continue to payment",how:"Registration has two steps",howBody:"1) Submit the common form. 2) Complete Stripe payment for the plan you choose below. Registration is confirmed after payment.",
    fullNote:"Full plan including both training days, accommodation, BBQ, breakfast and Day 2 lunch.",
    dayNote:"Day-only participation. Accommodation is not included.",sessionNote:"Single-session participation. Accommodation is not included.",
    schedule:"Session schedule",plans:"Choose your plan",back:"Back to Development Camp",
    note:"Content, order and timing may be adjusted based on attendance and player condition."
  },
  "zh-tw":{
    title:"佐賀 × 福岡 2DAYS DEVELOPMENT CAMP",
    lead:"可選兩日全程、單日往返或單一訓練時段。重點不只是學會動作，而是在比賽中培養觀察、思考與選擇。",
    date:"2026年10月3日–4日",place:"佐賀・福岡（大川）",target:"U8・U10・U12・U15",
    form:"前往共用報名表",pay:"前往付款",how:"報名分兩步",howBody:"①提交共用報名表　②完成下方所選方案的Stripe付款。付款完成即確認報名。",
    fullNote:"包含兩日訓練、住宿、BBQ、早餐及第2日午餐。",dayNote:"單日參加，不含住宿。",sessionNote:"僅參加指定時段，不含住宿。",
    schedule:"時段內容",plans:"選擇參加方案",back:"返回 Development Camp",
    note:"活動內容、順序及時間可能依參加人數與球員狀況調整。"
  },
  ko:{
    title:"사가 × 후쿠오카 2DAYS DEVELOPMENT CAMP",
    lead:"2일 전체, 당일 참가, 또는 1개 세션만 선택할 수 있습니다. 기술 암기보다 게임 안에서 보고, 생각하고, 선택하는 힘을 연결합니다.",
    date:"2026년 10월 3일–4일",place:"사가・후쿠오카 오카와",target:"U8・U10・U12・U15",
    form:"공통 신청 폼 열기",pay:"결제하기",how:"신청은 2단계",howBody:"① 공통 신청 폼 제출　② 아래에서 선택한 플랜의 Stripe 결제 완료. 결제 완료 시 신청이 확정됩니다.",
    fullNote:"2일 훈련, 숙박, BBQ, 아침식사, 2일차 점심 포함.",dayNote:"당일 참가. 숙박은 포함되지 않습니다.",sessionNote:"지정 세션만 참가. 숙박은 포함되지 않습니다.",
    schedule:"세션 일정",plans:"참가 플랜 선택",back:"Development Camp로 돌아가기",
    note:"참가 인원과 선수 상태에 따라 내용, 순서, 시간은 조정될 수 있습니다."
  }
} as const;

const planData=[
  {key:"full",label:["FULL 2 DAYS","2日間フル参加","兩日全程","2일 전체"],price:"¥16,500",time:"10/3 9:00 → 10/4 17:00",kind:"full"},
  {key:"day1",label:["DAY 1 / DAY TRIP","10/3 日帰り","10/3 單日","10/3 당일"],price:"¥7,700",time:"10/3 9:00–16:00",kind:"day"},
  {key:"day2",label:["DAY 2 / DAY TRIP","10/4 日帰り","10/4 單日","10/4 당일"],price:"¥7,700",time:"10/4 9:00–17:00",kind:"day"},
  {key:"day1am",label:["DAY 1 AM","10/3 AM","10/3 上午","10/3 오전"],price:"¥4,400",time:"9:00–11:30",kind:"session"},
  {key:"day1pm",label:["DAY 1 PM","10/3 PM","10/3 下午","10/3 오후"],price:"¥4,400",time:"13:00–16:00",kind:"session"},
  {key:"day2am",label:["DAY 2 AM","10/4 AM","10/4 上午","10/4 오전"],price:"¥4,400",time:"9:00–11:30",kind:"session"},
  {key:"day2pm",label:["DAY 2 PM","10/4 PM","10/4 下午","10/4 오후"],price:"¥4,400",time:"13:00–17:00",kind:"session"},
] as const;

const sessions=[
  ["10/3 AM","Fundamentals","Footwork / Ball Handling / Passing / Finishing / Shooting","9:00–11:30"],
  ["10/3 PM","Game Development","1on1 / 2on2 / 3on3 / Spacing & Decision Making / Competition / Feedback","13:00–16:00"],
  ["10/4 AM","Skill & Competition","Skill Review / Shooting / 1on1 / 2on2 / 3on3","9:00–11:30"],
  ["10/4 PM","Game Transfer / Final","3x3 / Advantage Games / 5on5 GAME / Awards / Feedback","13:00–17:00"],
] as const;

function labelIndex(locale:Locale){return locale==="en"?0:locale==="ja"?1:locale==="zh-tw"?2:3;}

export function SagaFukuokaCampPage({locale}:{locale:Locale}){
  const c=copy[locale];
  const li=labelIndex(locale);
  return <SiteFrame locale={locale} languagePage="camp">
    <section className="network-hero section-pad">
      <a className="back-link" href={localePath(locale,"camp")}>← {c.back}</a>
      <p className="section-index inverse">RBA / DEVELOPMENT CAMP / SAGA × FUKUOKA</p>
      <CalendarDays/>
      <h1>{c.title}</h1>
      <strong>{c.date}</strong>
      <p>{c.lead}</p>
      <div className="my-homecourt-hero-actions">
        <a className="button button-light" href="#plans">{c.plans}<ArrowRight/></a>
        <a className="button button-dark" href={registrationUrl} target="_blank" rel="noreferrer">{c.form}<ArrowRight/></a>
      </div>
    </section>

    <section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">CAMP INFO</p><h2>{c.date}</h2></div><p>{c.lead}</p></div>
      <div className="homecourt-preview-grid">
        <article><CalendarDays/><span>DATE</span><h3>{c.date}</h3></article>
        <article><MapPin/><span>AREA</span><h3>{c.place}</h3></article>
        <article><CheckCircle2/><span>PLAYER</span><h3>{c.target}</h3></article>
        <article><WalletCards/><span>FROM</span><h3>¥4,400</h3><p>{locale==="ja"?"1セッションから参加可能":locale==="en"?"Single-session entry available":locale==="zh-tw"?"可單節參加":"1세션부터 참가 가능"}</p></article>
      </div>
    </section>

    <section className="homecourt-plan-separation section-pad">
      <div className="homecourt-plan-intro"><p className="section-index">HOW TO JOIN</p><h2>{c.how}</h2><p>{c.howBody}</p></div>
      <div className="homecourt-plan-grid">
        <article className="homecourt-plan-card"><span>STEP 01</span><h3>{c.form}</h3><p>{locale==="ja"?"選手・保護者情報などを共通フォームから送信してください。":locale==="en"?"Submit player and guardian information through the common form.":locale==="zh-tw"?"先透過共用表單提交球員與家長資料。":"공통 폼에서 선수·보호자 정보를 제출해 주세요."}</p><a className="button button-light" href={registrationUrl} target="_blank" rel="noreferrer">{c.form}<ArrowRight/></a></article>
        <article className="homecourt-plan-card"><span>STEP 02</span><h3>{c.plans}</h3><p>{locale==="ja"?"参加する日程・セッションを選び、対応する決済リンクからお支払いください。":locale==="en"?"Choose your dates or sessions and use the matching payment link.":locale==="zh-tw"?"選擇參加日期／時段並使用對應付款連結。":"참가 일정·세션을 선택하고 해당 결제 링크로 결제해 주세요."}</p><a className="button button-dark" href="#plans">{c.plans}<ArrowRight/></a></article>
      </div>
    </section>

    <section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">PROGRAM</p><h2>{c.schedule}</h2></div><p>{locale==="ja"?"DAY 1は基本を確認しながらゲームへ進みます。DAY 2は前日に取り組んだことを、より試合に近い状況で試します。":locale==="en"?"Day 1 builds the foundation and connects it to games. Day 2 transfers the learning into more game-like situations.":locale==="zh-tw"?"第1日建立基礎並連到比賽，第2日把學習轉移到更接近實戰的情境。":"DAY 1은 기초에서 게임으로, DAY 2는 배운 내용을 실전 상황으로 전이합니다."}</p></div>
      <div className="homecourt-preview-grid">{sessions.map(([d,t,b,time])=><article key={d}><Clock3/><span>{d}</span><h3>{t}</h3><strong>{time}</strong><p>{b}</p></article>)}</div>
    </section>

    <section className="homecourt-plan-separation section-pad" id="plans">
      <div className="homecourt-plan-intro"><p className="section-index">ENTRY OPTIONS</p><h2>{c.plans}</h2><p>{locale==="ja"?"2日間の参加が難しい場合は、1日または1セッションから参加できます。":locale==="en"?"If the full camp is difficult, join for one day or even one session.":locale==="zh-tw"?"若無法參加全程，也可從單日或單節開始。":"전체 참가가 어렵다면 하루 또는 한 세션부터 참가할 수 있습니다."}</p></div>
      <div className="homecourt-plan-grid">{planData.map(p=><article className="homecourt-plan-card" key={p.key}><span>{p.time}</span><h3>{p.label[li]}</h3><strong>{p.price}</strong><p>{p.kind==="full"?c.fullNote:p.kind==="day"?c.dayNote:c.sessionNote}</p><a className="button button-dark" href={paymentLinks[p.key]} target="_blank" rel="noreferrer">{c.pay}<ArrowRight/></a></article>)}</div>
    </section>

    <section className="network-release section-pad">
      <CheckCircle2/>
      <div><p className="section-index">DEVELOPMENT FIRST</p><h2>{locale==="ja"?"練習したことを、ゲームで使ってみる。":locale==="en"?"Turn “I can do it” into “I can use it.”":locale==="zh-tw"?"把「做得到」變成「用得上」。":"‘할 수 있다’를 ‘쓸 수 있다’로."}</h2><p>{c.note}</p></div>
      <a className="button button-member" href={registrationUrl} target="_blank" rel="noreferrer">{c.form}<ArrowRight/></a>
    </section>
  </SiteFrame>;
}
