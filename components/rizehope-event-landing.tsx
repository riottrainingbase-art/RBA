import Image from "next/image";
import { SiteFrame } from "./site-frame";

type Locale = "en" | "ja";
const en = {
  overline: "RBA / INTERNATIONAL U12 EXCHANGE / MIYAGI, JAPAN",
  tag: "EVENT IN PREPARATION · NON-BINDING ENQUIRIES",
  title: "RIZEHOPE JAPAN 2027",
  subtitle: "A development-first international U12 basketball exchange. Play, learn and connect.",
  intro: "27–28 February 2027 · Shibata Town General Gymnasium, Miyagi, Japan. The venue is booked for both days; overseas teams, eligibility, match format, officials, safeguarding and other operations remain under final review.",
  section1: "Choose the right way to join",
  domestic: "Domestic Japanese U12 teams",
  domesticDesc: "Two-day team fee: ¥66,000 incl. tax. Initial deposit ¥33,000 and remaining ¥33,000 after review. A deposit alone does not confirm entry. Travel, hotel and meals are separate; published refund safeguards apply.",
  international: "Overseas U12 teams",
  internationalDesc: "International team fees and eligibility are not final. Start with a free, non-binding expression of interest. No travel or entry payment is requested at this stage.",
  ctaDomestic: "Domestic team interest",
  ctaInternational: "Overseas team interest — FREE",
  transferTitle: "Airport arrival & group transfer options",
  transferNote: "Illustrative planning scenarios for teams arriving Friday 26 February, competing Saturday 27 and Sunday 28 February, and departing Monday 1 March. These are not bookable transport products. Final routes and costs depend on flights, hotel location, licensed travel operator, group size, luggage and written quotation.",
  options: [
    ["A · Sendai Airport — Private Coach", "SDJ → group hotel; hotel ⇄ gym on both event days; hotel → SDJ. Preferred for larger groups and substantial luggage."],
    ["B · Sendai Airport — Rail + Local Transfer", "SDJ Airport Access train → Natori / JR network; prearranged licensed local shuttle for hotel and venue. Only suitable with adequate adult supervision and luggage handling."],
    ["C · Narita Airport — Long-Distance Coach", "NRT → Miyagi hotel in one charter operation, with suitable breaks, driver-rest rules, group luggage space and winter contingency. Feasibility and price subject to operator confirmation."],
    ["D · Narita Airport — Rail + Shinkansen", "NRT → Tokyo / Ueno rail connection → Tohoku Shinkansen to Sendai or an appropriate station → group transfer to the hotel."],
    ["E · Mixed Airports", "Arrive via NRT and depart via SDJ, or vice versa, depending on actual international flights and travel-provider confirmation."],
    ["F · Airport Transfer Only", "Licensed operator handles airport legs; hotel ⇄ gym is planned separately. Contracts and responsibilities must be clearly split."]
  ],
  capacityTitle: "Group size and luggage matter",
  capacity: "A local bus supplier reports medium coaches with 27 seats and large coaches with 45 seats. With large suitcases, even a 16-person group may need a large coach; approximately 32 people may fit in one large coach; 48 may require two. No fleet, fare, pickup or hotel has been reserved.",
  sponsorTitle: "For sponsors and regional suppliers",
  sponsorDesc: "We welcome discussion of transparent support for youth access, safe officials and first aid, interpretation, venue operations, appropriate food and licensed transport. Any donation, sponsorship fee, logo rights or deliverable requires a separate written agreement. No minors' personal details or unapproved media rights will be shared.",
  ctaSponsors: "Discuss a sponsor or supplier partnership",
  notesTitle: "What is confirmed — and what is not",
  notes: "Venue booked for 27–28 February 2027. Up to 10 teams are proposed overall. Overseas teams, final competition rules, officials, timetable, transportation, accommodation, pricing and travel agency arrangements are not yet confirmed. A free enquiry is not a confirmed event place.",
  travelLaw: "RBA coordinates the sports programme. Travel/hotel contracts, where regulated by Japanese travel law, must be handled by appropriately registered operators. Please do not book non-refundable travel until eligibility and arrangements have been confirmed in writing.",
  contact: "RBA · Riot Basketball Academy · Sendai, Japan"
};
const ja = {
  overline: "RBA / 宮城・U12国際育成交流",
  tag: "開催準備中・参加意向登録は無料",
  title: "RIZEHOPE JAPAN 2027",
  subtitle: "宮城で、世界と出会う2日間。勝敗だけでなく、考え、学び、つながる。",
  intro: "2027年2月27日（土）・28日（日）／宮城県柴田町総合体育館。会場は両日予約済みです。海外参加チーム、正式な年齢区分、試合形式、審判、安全・救護体制は最終調整中です。",
  section1: "参加検討の入口を分けています",
  domestic: "国内U12チーム",
  domesticDesc: "2日間・1チーム66,000円（税込）。前金33,000円、承認後に残金33,000円。前金のみで参加確定にはなりません。交通・宿泊・食事は別途。参加不承認等の返金条件は募集資料をご確認ください。",
  international: "海外U12チーム",
  internationalDesc: "海外参加費と出場資格は未確定です。まずは無料の参加意向登録から。現段階では旅行・大会の支払いをお願いしません。",
  ctaDomestic: "国内チームの無料意向登録",
  ctaInternational: "海外チーム・無料意向登録（英語）",
  transferTitle: "成田・仙台空港からの送迎案",
  transferNote: "仮行程：2027年2月26日（金）到着、27・28日大会、3月1日（月）出発の3泊4日。航空便、人数、荷物、ホテル、登録旅行業者、書面見積の条件により確定します。予約済みの送迎ではありません。",
  options: [
    ["A · 仙台空港／大型貸切バス", "仙台空港→ホテル、2日間のホテル⇄体育館、ホテル→仙台空港。スーツケースの多い団体向けの第一候補。"],
    ["B · 仙台空港／鉄道＋現地送迎", "仙台空港アクセス線→名取駅など→JR、駅からホテル・体育館は正式な送迎事業者に依頼。成人引率と手荷物管理が必須。"],
    ["C · 成田空港／長距離直行バス", "成田空港→宮城県内ホテルを直接移動。乗務員の休息、積載量、冬季対応、回送・宿泊費を事前確認。"],
    ["D · 成田空港／鉄道・新幹線", "成田空港→東京方面→東北新幹線→仙台駅等→宮城県内ホテルへ専用送迎。団体指定席を検討。"],
    ["E · 成田・仙台の片道別空港", "入国は成田、出国は仙台（または逆）。航空便と旅行会社の手配条件次第。"],
    ["F · 空港送迎のみ別契約", "空港と宿泊先の移動のみ専門業者に依頼。大会2日間の移動は別途手配し、契約主体を明確化。"]
  ],
  capacityTitle: "人数別の車種は荷物で変わります",
  capacity: "仙台バスの回答では中型27席、大型45席。スーツケースを伴う16名でも大型1台を推奨。32名は大型1台、48名は大型2台が目安です。金額・車両・配車・宿泊施設は未確定です。",
  sponsorTitle: "企業・地域パートナーの皆さまへ",
  sponsorDesc: "安全な審判・救護、通訳、会場運営、適切な飲食、登録事業者による交通等を支える協賛を相談しています。協賛金額・社名やロゴの使用・成果報告は書面合意後に確定します。子どもの個人情報や写真使用権を無断提供しません。",
  ctaSponsors: "協賛・サービス連携を相談",
  notesTitle: "確定事項と調整中事項",
  notes: "会場は2027年2月27・28日の両日予約済み。国内・海外・RBA UNITEDを合わせ最大10チームを想定。海外参加チーム、競技ルール、審判、試合数、宿泊・移動・旅行費用は調整中。無料意向登録は参加確定ではありません。",
  travelLaw: "RBAは競技運営・交流調整を担当します。宿泊・交通等の旅行契約は必要な登録を備えた旅行事業者が担当する方針です。正式条件が書面で確定する前の払戻し不可の旅行予約はお控えください。",
  contact: "Riot Basketball Academy（RBA）／仙台"
};
const base: React.CSSProperties={margin:"0 auto",maxWidth:1050,padding:"32px 24px 64px",color:"#132024"};
const card: React.CSSProperties={border:"1px solid #ced6d4",borderRadius:16,padding:"22px",background:"#fff"};
const introStyle: React.CSSProperties={fontSize:17,lineHeight:1.8,maxWidth:820,margin:"18px 0 28px"};
export function RizehopeEventLanding({locale}:{locale:Locale}){
  const t=locale==="ja"?ja:en;
  return <SiteFrame locale={locale}><main style={{background:"#f7f7f4",minHeight:"100vh"}}>
    <div style={base}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:18,flexWrap:"wrap"}}>
        <a href={locale==="ja"?"/ja/international":"/international"}>← RBA INTERNATIONAL</a>
        <div style={{display:"flex",gap:16}}><a href="/international/rizehope-japan-2027">English</a><a href="/ja/international/rizehope-japan-2027">日本語</a></div>
      </div>
      <section style={{marginTop:30,padding:"36px 28px",borderRadius:20,color:"#fff",background:"#111c21"}}>
        <div style={{display:"flex",gap:22,alignItems:"center",flexWrap:"wrap"}}>
          <Image src="/rba-logo-original.jpg" alt="Official Riot Basketball Academy logo" width={84} height={144} style={{height:144,width:"auto",objectFit:"contain",background:"#fff",borderRadius:10,padding:4}}/>
          <div><p style={{color:"#f5a45c",fontSize:12,letterSpacing:1.4}}>{t.overline}</p><h1 style={{fontSize:"clamp(32px,5vw,58px)",lineHeight:1.1,margin:"8px 0 10px"}}>{t.title}</h1><p style={{fontSize:18,fontWeight:600}}>{t.subtitle}</p><p style={{fontSize:13,color:"#ffc48e"}}>{t.tag}</p></div>
        </div>
      </section>
      <p style={introStyle}>{t.intro}</p>
      <section><h2 style={{fontSize:27,marginBottom:18}}>{t.section1}</h2><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:16}}>
        <div style={card}><h3>{t.domestic}</h3><p style={{lineHeight:1.75}}>{t.domesticDesc}</p><a href="https://form.jotform.com/263220855042046" target="_blank" rel="noopener noreferrer">{t.ctaDomestic} ↗</a></div>
        <div style={card}><h3>{t.international}</h3><p style={{lineHeight:1.75}}>{t.internationalDesc}</p><a href="https://form.jotform.com/263221234159047" target="_blank" rel="noopener noreferrer">{t.ctaInternational} ↗</a></div>
      </div></section>
      <section style={{marginTop:46}}><h2 style={{fontSize:27}}>{t.transferTitle}</h2><p style={{lineHeight:1.75,maxWidth:900}}>{t.transferNote}</p><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:14}}>{t.options.map(([title,desc])=><article key={title} style={card}><h3 style={{fontSize:17,marginTop:0}}>{title}</h3><p style={{lineHeight:1.7}}>{desc}</p></article>)}</div><div style={{marginTop:14,padding:18,background:"#e7ecea",borderRadius:12}}><strong>{t.capacityTitle}</strong><p style={{marginBottom:0,lineHeight:1.7}}>{t.capacity}</p></div></section>
      <section style={{marginTop:46,...card}}><h2 style={{marginTop:0}}>{t.sponsorTitle}</h2><p style={{lineHeight:1.75}}>{t.sponsorDesc}</p><a href="/international/partner-with-us">{t.ctaSponsors} ↗</a></section>
      <section style={{marginTop:24,...card}}><h2 style={{marginTop:0}}>{t.notesTitle}</h2><p style={{lineHeight:1.75}}>{t.notes}</p><p style={{lineHeight:1.75}}>{t.travelLaw}</p></section>
      <footer style={{marginTop:25,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:14,fontSize:14}}><span>{t.contact}</span><a href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a></footer>
    </div>
  </main></SiteFrame>;
}
