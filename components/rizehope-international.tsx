import Image from "next/image";
import { ArrowRight, CalendarDays, CheckCircle2, Globe2, ImagePlus, MapPin, ShieldCheck, Users, Wallet } from "lucide-react";
import { SiteFrame } from "./site-frame";
import { approvedRizehopeGallery, isRizehopePaymentOpen, rizehopeProject } from "@/lib/rizehope-2027";
import styles from "./rizehope-international.module.css";

type Language = "ja" | "en";
const copy = {
  ja: {
    back:"← 海外交流トップへ",
    eyebrow:"RIZEHOPE JAPAN 2027 / U12 INTERNATIONAL EXCHANGE",
    hero:"その一歩を、世界と。",
    lead:"日本と海外のU12チームが、同じコートで学び、競い、つながる2日間。RBAが海外チームの招待・受入調整の窓口を担います。",
    date:"開催日",venue:"会場",fact1:"施設の2日間予約は完了",fact2:"大会・チーム入場演出の許可は取得済み",
    gate:"現在は無料の先行参加意向受付です。出場枠・相手チーム・参加費・試合数・主催名義の最終確定を意味しません。",
    paths:"参加・協力したい方へ",pathsIntro:"あなたの立場に合った窓口から。3つの登録フォームは別々に管理しています。",
    cards:[
      {eyebrow:"INTERNATIONAL / CLUBS",title:"海外U12チーム",body:"海外のクラブ・アカデミー・学校チーム。人数や渡航計画が未確定でも、英語で参加意向を送れます。",cta:"海外チーム用・英語フォーム"},
      {eyebrow:"JAPAN / TEAMS",title:"国内U12チーム",body:"国内チーム責任者向けの参加意向受付。試合方式・参加費・正式な出場条件は確定後にご案内します。",cta:"国内チーム用・日本語フォーム"},
      {eyebrow:"RBA UNITED / PLAYERS",title:"RBA UNITED｜個人",body:"全国から希望者を集め、人数・コーチ・安全な運営体制が揃った場合に限り編成を検討します。所属チームは継続できます。",cta:"保護者による無料先行登録"},
    ],
    purpose:"試合だけで終わらない国際交流",purposeLead:"異なる言葉・プレースタイル・判断を学び合う。主役は、子どもたちです。",
    values:[
      {heading:"育成",body:"ゲームの中で見る・選ぶ・実行する。試合経験を長期的な成長につなげます。"},
      {heading:"国際交流",body:"海外チームの参加を調整中。決定済みのチーム名や参加国数としては公表していません。"},
      {heading:"地域連携",body:"地元の宿泊・移動・飲食・企業・自治体との協働を広げ、宮城に交流を根付かせます。"},
    ],
    status:"準備状況を正確にお知らせします",
    fixed:"確認済み",planned:"条件調整中",
    fixedList:["2027年2月27日（土）・28日（日）","柴田町総合体育館を両日予約済み","大会・チーム入場演出の許可を取得済み","RBAが海外チーム窓口・英語連絡を担当"],
    pendingList:["参加チーム・大会の最終主催表記","実際の試合日程、出場資格とコート割当","チーム参加費・RBA UNITEDの料金・返金条件","宿泊・貸切バスの見積、旅程・当日運営"],
    travel:"海外チームの訪日サポート",travelLead:"RBAは大会に向けた連絡・交流調整を担当します。旅費・宿泊・輸送を無料提供するという意味ではありません。",
    travelCards:[
      {title:"到着・アクセス",body:"仙台空港／仙台駅からの移動ルート、集合場所、移動時間帯をチームごとに確認します。"},
      {title:"宿泊・貸切バス",body:"近隣ホテル・運行会社の見積条件を収集中。費用負担・契約主体・取消条件は後日明示します。"},
      {title:"保険・未成年者保護",body:"保護者同意、引率責任者、救護、緊急連絡と必要な入国条件を正式案内で確認します。"},
    ],
    sponsor:"地域パートナー・協賛のご相談",sponsorLead:"宿泊、交通、飲料・食事、医療、備品、企業協賛、観光・自治体との協働。RBAが海外アテンドを担当し、地元の皆さまと受入体制をつくります。",
    sponsorAction:"協賛・地域連携をメールで相談",sponsorFoot:"協賛・自治体後援・共催は、申請・契約が成立するまでは未決定です。",
    faq:"よくある質問",
    faqs:[
      ["海外チームはもう決まっていますか？","海外チームを招聘中です。国・チーム名・人数は受入条件と正式な承諾が確認できてから掲載します。"],
      ["参加費と送迎・宿泊費は？","チーム参加費・RBA UNITED参加費・送迎・宿泊はまだ正式確定していません。無料フォームに登録しても請求や予約は発生しません。"],
      ["会場と演出は確定していますか？","2月27・28日の柴田町総合体育館の予約と大会・チーム入場演出の許可は取得済みです。利用時間・コート配置・機材仕様など運営詳細は調整中です。"],
      ["何試合できますか？","対戦数、競技時間、男女区分、生年月日要件、レフェリー・TO体制は正式規定で公表します。現段階で最低試合数は確約しません。"],
      ["RBA UNITEDに申し込むと出場できますか？","いいえ。保護者の無料先行登録は編成可能性の確認です。人数・指導者・安全体制と正式出場条件を満たした場合のみご案内します。"],
      ["海外チームの航空券や宿泊を手配してもらえますか？","訪日についての調整・情報提供はRBAが担当しますが、航空券・宿泊・貸切バスの有償契約は各事業者や必要な許可を持つ手配事業者と条件を確認します。"],
      ["撮影した写真を掲載しますか？","過去イベントの実写資料は掲載権限や未成年者の同意を確認したものだけを後日追加します。この大会の実施写真として他イベントを表示しません。"],
    ],
    media:"公式写真・活動レポート",mediaIntro:"過去の開催写真や交流レポートは、確認済みの素材から後日追加します。実施前の大会に参加実績があるような写真は掲載しません。",
    noPhotos:"写真は後日掲載予定です。撮影・肖像利用の確認を経て更新します。",
    payment:"参加費・決済について",paymentIntro:"現在は無料の意向登録のみです。料金・対象・支払方法・キャンセル条件を主催者が決定した後、別途正式募集の決済ページを公開します。",
    paymentPending:"現在、決済の受付は行っていません。",
    paymentReady:"正式募集と決済のご案内",
    paymentLink:"内容と料金を確認して進む",
    footer:"お問い合わせ：Riot Basketball Academy / 海外チーム受入窓口",
  },
  en: {
    back:"← International exchange",
    eyebrow:"RIZEHOPE JAPAN 2027 / U12 INTERNATIONAL EXCHANGE",
    hero:"Different teams. One court.",
    lead:"A two-day international youth basketball exchange in Miyagi, Japan. RBA coordinates the overseas-team enquiries, invitations and local information.",
    date:"Dates",venue:"Venue",fact1:"Venue reserved for both dates",fact2:"Event and team-entrance presentation permits obtained",
    gate:"Free expressions of interest are open. Submitting a form is not a confirmed team place, payment, finalized organizer agreement or guarantee of overseas opponents.",
    paths:"Choose your entry route",pathsIntro:"Each audience has a separate form. Free interest is not formal tournament registration.",
    cards:[
      {eyebrow:"INTERNATIONAL / CLUBS",title:"Overseas U12 teams",body:"Clubs, academies and school teams planning a Japan visit. Tell us your estimated group size and travel interests in English.",cta:"Overseas teams — free EOI"},
      {eyebrow:"JAPAN / TEAMS",title:"Japan-based U12 teams",body:"A Japanese-language form for coaches and team representatives. Final eligibility, fees and format will follow.",cta:"Japan teams — Japanese form"},
      {eyebrow:"RBA UNITED / PLAYERS",title:"RBA UNITED — individual interest",body:"A proposed temporary team of players from across Japan. Formation depends on eligible numbers, coaches and safe operations; current clubs may be retained.",cta:"RBA UNITED — guardian form (JA)"},
    ],
    purpose:"More than a weekend of games",purposeLead:"Players learn to read the game, adapt to different styles and build connections across borders.",
    values:[
      {heading:"Development",body:"See, decide, execute and reflect in real game settings, with long-term growth in mind."},
      {heading:"International exchange",body:"Overseas invitations are under discussion. We do not claim confirmed visiting clubs or countries yet."},
      {heading:"Local partnership",body:"We are connecting hotels, transport operators, local businesses and public-sector contacts in Miyagi."},
    ],
    status:"What has been confirmed",fixed:"Confirmed",planned:"Still being finalized",
    fixedList:["Feb 27 (Sat)–28 (Sun), 2027","Shibata Town Gymnasium is reserved for both dates","Event and team entrance presentation permissions obtained","RBA handles overseas team enquiry coordination"],
    pendingList:["Final organizer credits and participating clubs","Game schedules, age eligibility and usable court allocation","Team fees, RBA UNITED fees and refund terms","Accommodation, coach/bus contracts and arrival itineraries"],
    travel:"Practical support for visiting teams",travelLead:"RBA coordinates information and communication. Flights, lodging or buses are not automatically included or provided free of charge.",
    travelCards:[
      {title:"Arrival and access",body:"We will confirm routes and arrival plans from Sendai Airport or Sendai Station with each visiting team."},
      {title:"Hotels and group buses",body:"Quotes are being requested from nearby providers. Costs, contracting parties and cancellation conditions will be confirmed separately."},
      {title:"Minors and safeguarding",body:"Final instructions will cover guardian consent, responsible adults, emergency contacts, medical response and any immigration requirements."},
    ],
    sponsor:"Partners and community support",sponsorLead:"We welcome discussions with local hotels, bus operators, food and beverage providers, medical partners, businesses and relevant public bodies. RBA leads overseas-team coordination.",
    sponsorAction:"Email RBA about partnership",sponsorFoot:"Sponsorship, government endorsement or co-hosting is not claimed before a separate agreement is reached.",
    faq:"Frequently asked questions",
    faqs:[
      ["Which overseas teams are confirmed?","Invitations are being coordinated. We will publish clubs, regions and numbers only after acceptance is confirmed."],
      ["How much does participation cost?","Team and player fees, lodging and transfer costs have not been finalized. The free EOI is not a payment request or booking."],
      ["Is the venue confirmed?","The gymnasium is reserved for Feb 27–28 and the event/entrance-show permissions have been obtained. Session hours, court allocation and equipment plans are still being finalized."],
      ["How many games are guaranteed?","Game count, periods, divisions, eligibility, officials and final rules will be published later. No minimum game count is guaranteed yet."],
      ["Does RBA UNITED guarantee a place?","No. The guardian EOI only measures interest. A team will be considered if numbers, coaching, safeguarding and participation conditions permit."],
      ["Can RBA arrange hotel and flights?","RBA can support communication and options; flights, accommodation and bus contracts must be finalized with the relevant provider or appropriately licensed travel operator."],
      ["Can we share photographs?","Only genuine activity photos with publication rights and, where relevant, permission for images of minors will be added later. Images of other events will never be presented as this event."],
    ],
    media:"Photos and activity reports",mediaIntro:"Approved photographs from earlier activities may be added here later. We will clearly identify the event shown and avoid implying this event has already taken place.",
    noPhotos:"Photos coming later, after media and consent checks.",
    payment:"Fees and checkout",paymentIntro:"Currently only free interest registration is open. Formal application, prices, payment and refund terms will be published after organizer confirmation.",
    paymentPending:"Payments are not open yet.",
    paymentReady:"Formal registration and payment",
    paymentLink:"Review confirmed price and terms",
    footer:"Contact: Riot Basketball Academy / Overseas team coordination",
  }
} as const;

const entryLinks=[rizehopeProject.outreach.overseasTeam,rizehopeProject.outreach.japanTeam,rizehopeProject.outreach.unitedPlayer] as const;

export function RizehopeInternationalPage({lang}:{lang:Language}){
  const c=copy[lang];
  const photos=approvedRizehopeGallery();
  const paymentUrl=isRizehopePaymentOpen() ? rizehopeProject.payments.verifiedCheckoutUrl : null;
  const partnerSubject=encodeURIComponent("RIZEHOPE JAPAN 2027 | U12 International Exchange – partnership enquiry");
  return <SiteFrame locale={lang} languagePage="international">
    <main className={styles.page} lang={lang}>
      <header className={styles.hero}>
        <div className={styles.wrap}>
          <a className={styles.back} href={lang==="ja"?"/ja/international":"/international"}>{c.back}</a>
          <div className={styles.brand}><Image src="/rba-logo-original.jpg" width={44} height={62} alt="RBA official logo" priority/><span>RBA INTERNATIONAL / MIYAGI · JAPAN</span></div>
          <p className={styles.eyebrow}>{c.eyebrow}</p>
          <h1>RIZEHOPE<br/><span>JAPAN 2027</span></h1>
          <p className={styles.headline}>{c.hero}</p>
          <p className={styles.lead}>{c.lead}</p>
          <div className={styles.dateRow}><div><CalendarDays aria-hidden="true"/><span><small>{c.date}</small><strong>{lang==="ja"?rizehopeProject.dateJa:rizehopeProject.dateEn}</strong></span></div><div><MapPin aria-hidden="true"/><span><small>{c.venue}</small><strong>{lang==="ja"?rizehopeProject.venue.ja:rizehopeProject.venue.en}</strong></span></div></div>
          <div className={styles.heroSignals}><span><CheckCircle2 size={16} aria-hidden="true"/>{c.fact1}</span><span><CheckCircle2 size={16} aria-hidden="true"/>{c.fact2}</span></div>
          <a className={styles.heroAction} href="#rizehope-entry">{lang==="ja"?"3つの先行受付を見る":"Choose a free interest form"} <ArrowRight size={18}/></a>
        </div>
      </header>

      <div className={styles.wrap}><p className={styles.disclaimer} role="note"><ShieldCheck size={21} aria-hidden="true"/>{c.gate}</p></div>

      <section className={styles.section} id="rizehope-entry" aria-labelledby="rizehope-entry-title"><div className={styles.wrap}>
        <p className={styles.kicker}>THREE ROUTES / FREE EXPRESSION OF INTEREST</p>
        <h2 id="rizehope-entry-title">{c.paths}</h2><p className={styles.sectionLead}>{c.pathsIntro}</p>
        <div className={styles.cards}>{c.cards.map((card,i)=><article className={styles.card} key={card.eyebrow}><span className={styles.cardEyebrow}>{card.eyebrow}</span><h3>{card.title}</h3><p>{card.body}</p><a href={entryLinks[i]} target="_blank" rel="noopener noreferrer">{card.cta} <ArrowRight size={16} aria-hidden="true"/></a></article>)}</div>
      </div></section>

      <section className={styles.dark} aria-labelledby="rizehope-purpose-title"><div className={styles.wrap}>
        <p className={styles.kicker}>WHY THIS EXCHANGE</p><h2 id="rizehope-purpose-title">{c.purpose}</h2><p className={styles.sectionLead}>{c.purposeLead}</p>
        <div className={styles.values}>{c.values.map((item,i)=><article key={item.heading}><span>0{i+1}</span><h3>{item.heading}</h3><p>{item.body}</p></article>)}</div>
      </div></section>

      <section className={styles.section} aria-labelledby="rizehope-status-title"><div className={styles.wrap}>
        <p className={styles.kicker}>STATUS / CONFIRMED VS IN DISCUSSION</p><h2 id="rizehope-status-title">{c.status}</h2>
        <div className={styles.statusGrid}><article><h3><CheckCircle2 size={22} aria-hidden="true"/>{c.fixed}</h3><ul>{c.fixedList.map(s=><li key={s}>{s}</li>)}</ul></article><article><h3><ShieldCheck size={22} aria-hidden="true"/>{c.planned}</h3><ul>{c.pendingList.map(s=><li key={s}>{s}</li>)}</ul></article></div>
        <p className={styles.location}><MapPin size={16} aria-hidden="true"/>{lang==="ja"?rizehopeProject.venue.addressJa:rizehopeProject.venue.addressEn} <a href={rizehopeProject.venue.map} target="_blank" rel="noopener noreferrer">{lang==="ja"?"会場地図":"View map"} ↗</a></p>
      </div></section>

      <section className={styles.soft} aria-labelledby="rizehope-travel-title"><div className={styles.wrap}>
        <p className={styles.kicker}>OVERSEAS TEAM SUPPORT</p><h2 id="rizehope-travel-title">{c.travel}</h2><p className={styles.sectionLead}>{c.travelLead}</p>
        <div className={styles.travelGrid}>{c.travelCards.map(x=><article key={x.title}><Globe2 size={25} aria-hidden="true"/><h3>{x.title}</h3><p>{x.body}</p></article>)}</div>
      </div></section>

      <section className={styles.section} aria-labelledby="rizehope-faq-title"><div className={styles.wrap}>
        <p className={styles.kicker}>FAQ / BEFORE APPLYING</p><h2 id="rizehope-faq-title">{c.faq}</h2>
        <div className={styles.faq}>{c.faqs.map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      </div></section>

      <section className={styles.soft} aria-labelledby="rizehope-photos-title"><div className={styles.wrap}>
        <p className={styles.kicker}>MEDIA / ARCHIVE</p><h2 id="rizehope-photos-title">{c.media}</h2><p className={styles.sectionLead}>{c.mediaIntro}</p>
        {photos.length>0?<div className={styles.gallery}>{photos.map(photo=><figure key={photo.src}><Image src={photo.src} width={800} height={550} alt={lang==="ja"?photo.altJa:photo.altEn} sizes="(max-width: 760px) 100vw, 33vw"/><figcaption>{lang==="ja"?photo.captionJa:photo.captionEn}<small>{photo.credit}</small></figcaption></figure>)}</div>:<div className={styles.emptyPhotos}><ImagePlus size={34} aria-hidden="true"/><span>{c.noPhotos}</span></div>}
      </div></section>

      <section className={styles.section} aria-labelledby="rizehope-payments-title"><div className={styles.wrap}>
        <div className={styles.payment}><div><p className={styles.kicker}>PAYMENT / FUTURE FORMAL REGISTRATION</p><h2 id="rizehope-payments-title">{c.payment}</h2><p>{c.paymentIntro}</p></div>
        {paymentUrl?<a className={styles.payLink} href={paymentUrl} target="_blank" rel="noopener noreferrer"><Wallet size={20} aria-hidden="true"/>{c.paymentLink}<ArrowRight size={17}/></a>:<p className={styles.noPayment}><Wallet size={19} aria-hidden="true"/>{c.paymentPending}</p>}</div>
      </div></section>

      <section className={styles.partner} aria-labelledby="rizehope-partners-title"><div className={styles.wrap}>
        <div className={styles.partnerInner}><div><p className={styles.kicker}>COMMUNITY / SPONSORS / LOCAL AUTHORITIES</p><h2 id="rizehope-partners-title">{c.sponsor}</h2><p>{c.sponsorLead}</p><small>{c.sponsorFoot}</small></div>
        <a href={`mailto:${rizehopeProject.outreach.contactEmail}?subject=${partnerSubject}`}>{c.sponsorAction}<ArrowRight size={17} aria-hidden="true"/></a></div>
      </div></section>
      <footer className={styles.end}><div className={styles.wrap}><Users size={18} aria-hidden="true"/> {c.footer} <a href={`mailto:${rizehopeProject.outreach.contactEmail}`}>{rizehopeProject.outreach.contactEmail}</a></div></footer>
    </main>
  </SiteFrame>;
}

const teaserCopy={
  ja:{label:"新着プロジェクト / 宮城県・柴田町",title:"RIZEHOPE JAPAN 2027",description:"2月27・28日、会場予約・入場演出許可取得済み。海外U12チーム、国内チーム、RBA UNITEDの無料先行受付を開始。RBAは海外チームの受入・国際交流を担当します。",action:"プロジェクト詳細・無料先行受付"},
  en:{label:"FEATURED PROJECT / SHIBATA, MIYAGI",title:"RIZEHOPE JAPAN 2027",description:"Feb 27–28, 2027. Venue and team-entrance presentation permissions secured. Free expressions of interest for overseas and Japanese U12 teams; RBA coordinates international team enquiries.",action:"Event details and free team interest"},
  "zh-tw":{label:"國際交流新企劃 / 宮城縣柴田町",title:"RIZEHOPE JAPAN 2027",description:"2027年2月27日至28日U12國際交流賽，場館已預訂、入場表演許可已取得。海外球隊可先填寫免費意向表。詳細資料提供英文版。",action:"查看英文介紹與免費意向登記 (EN)"},
  ko:{label:"국제교류 새 프로젝트 / 미야기현 시바타",title:"RIZEHOPE JAPAN 2027",description:"2027년 2월 27~28일 U12 국제 교류 경기. 체육관 예약 및 팀 입장 행사 허가 완료. 해외 팀을 위한 무료 참가 의향 접수. 상세 설명은 영어로 제공됩니다.",action:"영문 안내 및 무료 관심 등록 (EN)"},
} as const;

/** Featured project entry inside every RBA International landing page. */
export function RizehopeInternationalTeaser({locale}:{locale:"ja"|"en"|"zh-tw"|"ko"}){
  const c=teaserCopy[locale];
  const href=locale==="ja"?"/ja/international/rizehope-japan-2027":"/international/rizehope-japan-2027";
  return <section className={styles.teaser} aria-labelledby="rizehope-international-feature-title"><div className={styles.teaserInner}>
    <div><span className={styles.teaserLabel}>{c.label}</span><h2 id="rizehope-international-feature-title">{c.title}</h2>
    <p>{c.description}</p><div className={styles.teaserStatus}><span><CheckCircle2 size={16} aria-hidden="true"/> VENUE RESERVED</span><span><CheckCircle2 size={16} aria-hidden="true"/> ENTRANCE SHOW PERMITTED</span></div></div>
    <a href={href}>{c.action}<ArrowRight size={17} aria-hidden="true"/></a>
  </div></section>;
}
