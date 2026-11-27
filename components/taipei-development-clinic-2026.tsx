import Image from "next/image";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import { TaipeiClinicInquiryForm } from "@/components/taipei-clinic-2026-inquiry";

type Lang = "ja"|"en"|"zh-tw";
const sessionData = [
 { date:"2026-12-11",day:"11",weekday:["金","FRI","五"],hour:"18:30–20:00",area:["天母","Tianmu","天母"],map:"https://maps.app.goo.gl/w3bASjVYfQydDGJUA?g_st=ic",regular:8 },
 { date:"2026-12-12",day:"12",weekday:["土","SAT","六"],hour:"16:00–18:00",area:["内湖","Neihu","內湖"],map:"https://maps.app.goo.gl/weaVAQf3qdHuh4KM8?g_st=ic",regular:0 },
 { date:"2026-12-13",day:"13",weekday:["日","SUN","日"],hour:"14:00–16:00",area:["林口","Linkou","林口"],map:"https://maps.app.goo.gl/t8X2yJrcNz5MEhbW7?g_st=ic",regular:16 }
] as const;
const c = {
 ja:{
  title:"台北育成クリニック 2026",subtitle:"3日間・3会場。見て、選んで、ゲームで試す。",
  zone:"2026年12月11日（金）〜13日（日）｜すべて台湾時間（UTC+8）",
  status:"3会場とも予約済み",statusText:"SPARTANSから体育館予約完了の連絡がありました。追加参加の空き枠・特別参加費・申込方法は最終調整中です。",
  timetable:"日程と会場",regular:"SPARTANSの通常クラスに追加参加できる枠を調整中",special:"土曜の単発クリニック。会場予約済み、募集条件調整中。",
  existing:"通常クラスの生徒は約",students:"名。追加枠の人数はSPARTANSが確定します。",
  maps:"地図を見る / Google Maps ↗",
  learning:"2日間・3日間ではなく、各回で学べる内容を大切に",learningLead:"以下はRBAの指導テーマ案です。正式な内容と対象年齢はSPARTANSが確認した後に案内します。",
  pillars:[["見る","相手・味方・スペースを見る"],["選ぶ","状況に応じた1対1・2対2・3対3"],["試す","少人数ゲームの中で判断する"]],
  start:"参加相談と申込の流れ",intro:"お問い合わせ、参加枠の確認、正式申込、決済案内はSPARTANSが担当します。RBAから料金を請求することはありません。",
  first:"① SPARTANSに参加希望日を相談",second:"② SPARTANSが空き枠・対象・料金を確認",third:"③ 専用申込・決済案内が届いたら手続き",
  payment:"12月の特別クリニック専用決済リンクは確認待ち",paymentNote:"SPARTANSの通常レッスン料金 NT$1,150 を今回の料金とみなして支払わないでください。SPARTANSの正式な支払案内後に決済してください。",
  generalPayment:"SPARTANSの通常レッスン支払方法（今回の決済には使用しない） ↗",
  contact:"お問い合わせはSPARTANSへ",line:"SPARTANS公式LINE（@spartans） ↗",
  notice:"会場予約が完了していても、追加募集枠と支払受付が確定したわけではありません。既存生徒数はおおよその人数です。",
  back:"RBA台湾ページへ戻る",label:"日本語",before:"保護者同意・対象年齢・持ち物・返金条件は、SPARTANSの正式な案内をご確認ください。"
 },
 en:{
  title:"Taipei Development Clinics 2026",subtitle:"Three sessions. Three venues. Read the game and make decisions.",
  zone:"December 11 (Fri) – 13 (Sun), 2026 | Taiwan local time (UTC+8)",
  status:"All three venues booked",statusText:"SPARTANS has confirmed gym bookings. Additional places, event-specific fees and registration details are still being finalised.",
  timetable:"Sessions and venues",regular:"Extra one-time places alongside a regular SPARTANS class",special:"Additional Saturday one-time session; venue booked, terms pending.",
  existing:"Approximately ",students:" regular students. SPARTANS will confirm the number of extra places.",
  maps:"OPEN GOOGLE MAPS ↗",
  learning:"Game-connected learning in every session",learningLead:"These are RBA's proposed coaching themes. Session content and age eligibility await SPARTANS' final confirmation.",
  pillars:[["Read","See defenders, teammates and space"],["Decide","Explore options in 1v1, 2v2 and 3v3"],["Apply","Make decisions in small-sided games"]],
  start:"How to enquire and register",intro:"SPARTANS is the sole point of contact for availability, registration, payment and family enquiries. RBA will not collect session fees.",
  first:"01. Enquire with SPARTANS about your preferred date",second:"02. SPARTANS confirms spaces, ages and the fee",third:"03. Complete the event-specific registration and payment when instructed",
  payment:"December special clinic payment link pending",paymentNote:"The standard SPARTANS NT$1,150 single-class rate is NOT confirmed for this special RBA clinic. Do not use the regular-class checkout before SPARTANS instructs you.",
  generalPayment:"SPARTANS standard-class payment info (NOT this event checkout) ↗",
  contact:"Enquiries: SPARTANS only",line:"OFFICIAL SPARTANS LINE (@spartans) ↗",
  notice:"A reserved gym does not guarantee extra places or open checkout. Existing class participant counts are approximate.",
  back:"Back to RBA Taiwan",label:"English",before:"Please confirm guardian consent, eligible ages, items to bring, safeguarding and refund terms with SPARTANS."
 },
 "zh-tw":{
  title:"台北青少年籃球培育課程 2026",subtitle:"三天、三個場館。觀察、判斷、在比賽中應用。",
  zone:"2026 年 12 月 11 日（五）至 13 日（日）｜台灣時間 UTC+8",
  status:"三個場館均已預訂",statusText:"SPARTANS 已確認場地預訂。額外名額、活動專屬費用與報名資訊尚待最終確認。",
  timetable:"日期、時間與場地",regular:"SPARTANS 常態班開放額外單次參加名額",special:"週六單次特別訓練，場館已預訂，報名條件確認中。",
  existing:"常態班學員約 ",students:" 人。SPARTANS 將確認額外可參加名額。",
  maps:"開啟 Google 地圖 ↗",
  learning:"每一場都重視比賽中的學習",learningLead:"以下為 RBA 提議的訓練主題，正式內容與適用年齡待 SPARTANS 確認。",
  pillars:[["觀察","看見防守、隊友與空間"],["判斷","在 1 對 1、2 對 2、3 對 3 中選擇"],["應用","在小組比賽中嘗試不同選擇"]],
  start:"洽詢、報名與付款流程",intro:"額外名額、正式報名與費用支付均由 SPARTANS 負責。RBA 不收取本次課程費用。",
  first:"① 向 SPARTANS 洽詢希望參加的場次",second:"② 由 SPARTANS 確認名額、年齡與費用",third:"③ 收到活動專用報名及付款資訊後再辦理",
  payment:"12 月特別課程專用付款連結確認中",paymentNote:"SPARTANS 一般單次課程 NT$1,150，並非本次特別課程的已確認價格。請勿在收到正式付款通知前使用一般課程的結帳連結。",
  generalPayment:"SPARTANS 一般課程付款資訊（非本活動入口） ↗",
  contact:"活動洽詢請聯絡 SPARTANS",line:"SPARTANS 官方 LINE（@spartans） ↗",
  notice:"場地已預訂不代表額外名額或付款已開放。常態班人數為估計值。",
  back:"返回 RBA 台灣總覽",label:"繁體中文",before:"家長同意、年齡條件、裝備、安全與退費政策，請向 SPARTANS 確認。"
 }
} as const;
const localeRoutes=[
 {locale:"ja",href:"/ja/events/taipei-development-clinic-2026",name:"日本語"},
 {locale:"zh-tw",href:"/zh-tw/events/taipei-development-clinic-2026",name:"繁體中文"},
 {locale:"en",href:"/events/taipei-development-clinic-2026",name:"English"}
] as const;
const line="https://hbl.tw/line?utm_source=spartans_site&utm_medium=web&utm_content=contact";
const SPARTANS_EMAIL="hi@spartans.com.tw";
export function TaipeiClinic2026({locale}:{locale:Lang}) {
 const t=c[locale], langIndex=locale==="ja"?0:locale==="en"?1:2;
 return <SiteFrame locale={locale}><main className="bg-[#f7f4ee] text-[#182e2b]">
  <header className="bg-white px-5 py-5"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
    <div className="flex items-center gap-3"><Image src="/rba-logo-original.jpg" width={52} height={70} alt="Riot Basketball Academy official logo" className="h-[62px] w-[48px] object-contain"/><span className="text-sm font-black leading-5">RIOT BASKETBALL ACADEMY<br/>× SPARTANS TAIPEI</span></div>
    <nav aria-label="Languages" className="flex flex-wrap gap-2">{localeRoutes.map(a=><Link key={a.locale} href={a.href} aria-current={a.locale===locale?"page":undefined} className={"rounded-lg border px-3 py-2 text-xs font-bold "+(a.locale===locale?"bg-[#28584d] text-white":"bg-white text-[#28584d]")}>{a.name}</Link>)}</nav>
  </div></header>

  <section className="bg-[#dfe9e3] px-5 py-14 sm:py-20"><div className="mx-auto max-w-6xl">
    <p className="text-xs font-black tracking-[.17em] text-[#4c705f]">JAPAN × TAIWAN / RBA × SPARTANS</p>
    <h1 className="mt-3 text-[clamp(2.3rem,5.2vw,4.8rem)] font-black leading-[1.14]">{t.title}</h1>
    <p className="mt-4 max-w-3xl text-lg font-semibold leading-8 sm:text-2xl">{t.subtitle}</p>
    <p className="mt-5 border-l-4 border-[#b68b4b] bg-white px-5 py-4 text-base font-black">{t.zone}</p>
    <div className="mt-6 flex flex-wrap gap-3"><a href="#sessions" className="inline-flex min-h-12 items-center rounded-lg bg-[#28584d] px-5 py-3 text-sm font-bold text-white">{t.timetable} ↓</a><a href="#contact" className="inline-flex min-h-12 items-center rounded-lg border-2 border-[#28584d] bg-white px-5 py-3 text-sm font-bold">{t.contact} ↓</a></div>
  </div></section>

  <section id="sessions" className="scroll-mt-5 px-5 py-14 sm:py-20"><div className="mx-auto max-w-6xl">
    <p className="text-xs font-black tracking-[.15em] text-[#987147]">DECEMBER 11–13, 2026 / TAIPEI</p><h2 className="mt-3 text-3xl font-black sm:text-4xl">{t.timetable}</h2>
    <div className="mt-6 rounded-xl border-l-4 border-[#28584d] bg-[#e4f0e8] p-5"><h3 className="text-lg font-black">{t.status}</h3><p className="mt-2 text-sm leading-7">{t.statusText}</p></div>
    <div className="mt-6 grid gap-4 lg:grid-cols-3">{sessionData.map(s=><article key={s.date} className="flex flex-col rounded-xl border border-[#ccd9d0] bg-white p-6">
      <p className="text-xs font-black tracking-widest text-[#8a683f]">2026 / DEC {s.day} / {s.weekday[langIndex]}</p>
      <div className="mt-3 flex items-end gap-4"><strong className="text-6xl font-black text-[#28584d]">{s.day}</strong><div><h3 className="text-2xl font-black">{s.area[langIndex]}</h3><p className="text-lg font-bold tabular-nums">{s.hour}</p></div></div>
      <p className="mt-4 min-h-[50px] flex-1 text-sm font-medium leading-7">{s.regular? t.regular:t.special}</p>
      {s.regular ? <p className="mt-1 text-xs leading-6 text-[#516059]">{t.existing}{s.regular}{t.students}</p> : null}
      <a href={s.map} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-12 items-center justify-center rounded-lg border-2 border-[#28584d] px-4 py-3 text-sm font-bold text-[#28584d]">{t.maps}</a>
    </article>)}</div>
    <p className="mt-5 text-xs leading-6 text-[#566861]">{t.notice}</p>
  </div></section>

  <section className="bg-[#fffefa] px-5 py-14"><div className="mx-auto max-w-6xl">
    <h2 className="text-3xl font-black">{t.learning}</h2><p className="mt-3 max-w-3xl text-sm leading-7">{t.learningLead}</p>
    <div className="mt-6 grid gap-3 md:grid-cols-3">{t.pillars.map((p,i)=><article key={p[0]} className="border-t-4 border-[#bd9b62] bg-[#f7f4ee] p-5"><span className="text-xs font-black text-[#957047]">0{i+1}</span><h3 className="mt-3 text-xl font-black">{p[0]}</h3><p className="mt-2 text-sm leading-7">{p[1]}</p></article>)}</div>
  </div></section>

  <section id="registration" className="scroll-mt-5 px-5 py-14"><div className="mx-auto max-w-6xl">
    <h2 className="text-3xl font-black">{t.start}</h2><p className="mt-3 max-w-3xl text-sm leading-7">{t.intro}</p>
    <div className="mt-6 grid gap-4 md:grid-cols-3">{[t.first,t.second,t.third].map((item,i)=><div key={i} className="rounded-xl border border-[#cdd9d1] bg-white p-6"><p className="text-xs font-black text-[#9d7744]">STEP 0{i+1}</p><p className="mt-3 text-base font-bold leading-7">{item}</p></div>)}</div>
    <div className="mt-6 rounded-xl border-l-4 border-[#af854c] bg-[#f2e8d8] p-6">
      <strong className="text-lg">{t.payment}</strong><p className="mt-2 text-sm leading-7">{t.paymentNote}</p>
      <a href="https://www.spartans.tw/en/payment" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex text-sm font-bold text-[#28584d] underline">{t.generalPayment}</a>
    </div>
  </div></section>

  <section id="contact" className="scroll-mt-5 bg-[#dce9e3] px-5 py-14 sm:py-20"><div className="mx-auto max-w-6xl">
    <h2 className="text-3xl font-black">{t.contact}</h2><div className="mt-6 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
     <TaipeiClinicInquiryForm locale={locale}/>
     <aside className="rounded-xl bg-white p-6"><h3 className="text-xl font-black">SPARTANS / Taipei Sports Academy</h3>
      <a href={line} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-12 rounded-lg bg-[#28584d] px-5 py-3 text-sm font-bold text-white">{t.line}</a>
      <p className="mt-4"><a href={"mailto:"+SPARTANS_EMAIL} className="text-sm font-bold text-[#28584d] underline">{SPARTANS_EMAIL}</a></p>
      <a href="https://www.spartans.com.tw/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex text-sm font-bold text-[#28584d] underline">SPARTANS OFFICIAL SITE ↗</a>
      <p className="mt-5 border-t border-[#d7e1db] pt-4 text-sm leading-7">{t.before}</p>
     </aside></div>
     <p className="mt-7 text-sm font-bold"><Link href={locale==="en"?"/taiwan":"/"+locale+"/taiwan"} className="text-[#28584d] underline">{t.back} ↗</Link></p>
  </div></section>
 </main></SiteFrame>;
}
