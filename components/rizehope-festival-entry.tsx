import Image from "next/image";

type Locale = "ja" | "en";

const forms = {
  domestic: "https://form.jotform.com/263223566035050",
  overseas: "https://form.jotform.com/263221234159047",
  united: "https://form.jotform.com/263243952545057",
  partners: "https://form.jotform.com/263222129730046",
} as const;

const copy = {
  ja: {
    eyebrow: "RBA INTERNATIONAL EXCHANGE / MIYAGI, JAPAN",
    title: "RIZEHOPE JAPAN 2027",
    descriptionTitle: "国際U12バスケットボール育成フェスティバル",
    lead: "勝敗だけで終わらない。違うチーム、違う文化、同じコート。子どもたちがプレーし、考え、つながる2日間を目指します。",
    date: "2027年2月27日（土）・28日（日）",
    venue: "柴田町総合体育館（宮城県柴田町）",
    capacity: "国内・海外・RBA UNITED合計で最大10チームを計画",
    status: "会場は地元運営側の確認により両日予約済みです。正式な主催者名義、出場資格、対戦方式・試合数、救護・審判体制などは調整中です。",
    routesTitle: "参加の入口は3つ。条件も手続きも別です。",
    routes: [
      {
        k: "01 / JAPAN CLUB TEAM",
        title: "国内U12クラブ",
        tag: "正式申込・前金制",
        details: "2日間1チーム66,000円（税込）。成人のチーム責任者が申込後、前金33,000円を決済。資格と全体枠の審査後、正式承認と残金33,000円の案内を個別に行います。",
        caution: "前金だけでは出場確約になりません。不承認・満枠・主催都合中止・最終条件に不同意等の場合は規定により前金を返金します。二重決済しないでください。",
        action: "国内クラブの申込へ",
        href: forms.domestic,
      },
      {
        k: "02 / INTERNATIONAL U12 CLUB",
        title: "海外U12クラブ",
        tag: "無料の参加意向登録",
        details: "成人のチーム代表者から国・地域、概算人数、引率体制、渡航検討日をお知らせください。海外参加費・航空券・宿泊・送迎はまだ正式見積・契約前です。",
        caution: "登録は出場・宿泊・交通・渡航の予約ではありません。旅行に関わる契約は適切な事業者と別途確認します。",
        action: "海外クラブの無料意向登録",
        href: forms.overseas,
      },
      {
        k: "03 / RBA UNITED",
        title: "RBA UNITED｜個人選手",
        tag: "東北の小学6年生向け無料意向登録",
        details: "所属チームを変えずに、新しい仲間と国際交流へ挑戦する機会を検討しています。保護者から無料で参加希望をお知らせください。",
        caution: "人数・選考・引率・保護者同意・料金・出場は未確定です。登録によって選手選考や参加が確約されるものではありません。",
        action: "保護者から無料で希望登録",
        href: forms.united,
      },
    ],
    programmeTitle: "PLAY. LEARN. CONNECT.",
    programme: [
      ["PLAY", "異なるプレースタイルの相手と、ゲームの中で見る・選ぶ・実行する。"],
      ["LEARN", "試合を振り返り、指導者と選手が気づきを次の練習に持ち帰る。"],
      ["CONNECT", "地域・言語を越えた交流。希望する地域関係者と安全な文化体験をつくる。"],
    ],
    agendaTitle: "想定プログラム（正式な試合日程ではありません）",
    agenda: [
      ["2/26（金）", "海外チーム到着・宿泊（渡航・移動は未手配）"],
      ["2/27（土）", "歓迎・育成を意識した交流試合・指導者交流"],
      ["2/28（日）", "交流試合・選手同士の交流・クロージング"],
      ["3/1（月）", "希望する海外団体の出発日（手配未確定）"],
    ],
    partnersTitle: "地域・企業の皆さまとともに",
    partnersBody: "大会は、地元の子どもたちと世界の出会いを、地域の宿泊・飲食・交通・文化や仕事につなぐ実践の場でもあります。協賛、物品提供、受入・地域連携は個別に相談します。自治体の後援や特定企業の協賛が確定したという表示ではありません。",
    partnersAction: "企業協賛・地域連携の無料相談",
    safetyTitle: "参加前に確認すること",
    safety: "U12の年齢基準、男女区分、登録人数、競技規則、適切な休息、審判・救護・保険、引率責任、保護者同意、キャンセル条件を正式要項で確認します。無料意向登録では児童の旅券画像や詳細な医療情報、カード番号は求めません。",
    footer: "Riot Basketball Academy は国際チームとの連絡・育成プログラムを調整しています。公認大会・自治体後援・海外チーム参加確約を示すものではありません。",
    inquiry: "ご連絡：riot.training.base@gmail.com",
  },
  en: {
    eyebrow: "RBA INTERNATIONAL EXCHANGE / MIYAGI, JAPAN",
    title: "RIZEHOPE JAPAN 2027",
    descriptionTitle: "International U12 Basketball Festival",
    lead: "Different teams. One shared court. Two days to play, learn and connect across basketball cultures.",
    date: "27–28 February 2027 (Sat–Sun)",
    venue: "Shibata Town Gymnasium, Miyagi Prefecture, Japan",
    capacity: "Planning cap: 10 teams in total, including domestic, overseas and RBA UNITED teams",
    status: "The local organising team reports that the gymnasium is reserved for both dates. The formal organiser, eligibility, fixtures, number of games, refereeing and safeguarding provisions are still being finalised.",
    routesTitle: "Three separate ways to express interest or apply",
    routes: [
      {
        k: "01 / JAPAN CLUB TEAM",
        title: "Domestic U12 club",
        tag: "Application and deposit",
        details: "Japanese club entry: JPY 66,000 (tax included) for two days. An adult team official applies first, then pays JPY 33,000 as a deposit. Eligibility and capacity are reviewed before written acceptance and a later balance request.",
        caution: "A deposit does not guarantee acceptance. Refund conditions are stated on the domestic application form. Do not pay twice.",
        action: "Domestic team application (Japanese)",
        href: forms.domestic,
      },
      {
        k: "02 / INTERNATIONAL U12 CLUB",
        title: "Overseas U12 club",
        tag: "FREE, non-binding team interest",
        details: "An adult club leader can share the country, indicative player/adult numbers and possible travel dates. Overseas entry fees, flights, hotels and local transport are not yet confirmed.",
        caution: "Submitting the form is not a competition place, travel booking, hotel reservation or payment commitment. Travel contracts will be arranged separately by appropriate providers.",
        action: "Free international team interest",
        href: forms.overseas,
      },
      {
        k: "03 / RBA UNITED",
        title: "RBA UNITED individual player",
        tag: "Free interest / Tohoku sixth-graders",
        details: "For eligible families in Japan considering a temporary team without leaving their regular club. A parent or guardian submits the expression of interest.",
        caution: "Selection, eligibility, supervision, price and a competition place remain subject to further confirmation.",
        action: "Guardian interest form (Japanese)",
        href: forms.united,
      },
    ],
    programmeTitle: "PLAY. LEARN. CONNECT.",
    programme: [
      ["PLAY", "Meet unfamiliar basketball styles and make better decisions in live games."],
      ["LEARN", "Reflect with coaches and players and bring new ideas into future practice."],
      ["CONNECT", "Build friendships with fellow players and local communities across languages."],
    ],
    agendaTitle: "Illustrative programme — not a confirmed fixture schedule",
    agenda: [
      ["Fri 26 Feb", "International arrivals (travel and lodging not booked)"],
      ["Sat 27 Feb", "Welcome, developmental games and coach exchange"],
      ["Sun 28 Feb", "Friendly games, shared experiences and closing"],
      ["Mon 1 Mar", "Possible departure day (travel not booked)"],
    ],
    partnersTitle: "Community and business partners",
    partnersBody: "We hope that a youth basketball exchange can also support local accommodation, food, transport, education and cultural experiences in Miyagi. Sponsorship and local participation are subject to separate agreements. No municipal endorsement is implied.",
    partnersAction: "Partnership enquiry",
    safetyTitle: "Safe participation comes first",
    safety: "Final rules will specify age eligibility, divisions, roster limits, appropriate rest, officiating, emergency response, insurance, supervision, guardian consent and cancellation terms. The initial free-interest form does not request children's passport scans, detailed medical records or payment-card information.",
    footer: "Riot Basketball Academy coordinates youth development and international-team communications. This page does not claim FIBA/JBA sanction, municipal endorsement or any confirmed overseas team.",
    inquiry: "Contact: riot.training.base@gmail.com",
  },
} as const;

export function RizehopeFestivalEntry({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <main className="min-h-screen bg-[#f5f3ee] text-[#17202b]" lang={locale}>
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-9">
        <header className="flex items-center gap-4 border-b border-[#d5d4cf] pb-5">
          <a href={locale === "ja" ? "/ja/" : "/"} aria-label="Riot Basketball Academy home">
            <Image src="/rba-logo-original.jpg" alt="Riot Basketball Academy official logo" width={57} height={68} className="h-[68px] w-[57px] object-contain" />
          </a>
          <div>
            <p className="text-[11px] font-black tracking-[.2em]">RIOT BASKETBALL ACADEMY</p>
            <p className="text-[11px] text-[#55606a]">PLAY. LEARN. CONNECT.</p>
          </div>
          <div className="ml-auto flex gap-3 text-xs font-bold">
            <a href="/ja/international/rizehope-japan-2027" lang="ja">日本語</a>
            <a href="/international/rizehope-japan-2027" lang="en">EN</a>
          </div>
        </header>

        <section className="py-12 sm:py-16">
          <p className="text-xs font-bold tracking-[.16em] text-[#a65128]">{t.eyebrow}</p>
          <h1 className="mt-4 text-5xl font-black tracking-[-.045em] sm:text-7xl">{t.title}</h1>
          <h2 className="mt-4 text-xl font-black sm:text-3xl">{t.descriptionTitle}</h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#424e59] sm:text-lg">{t.lead}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[t.date, t.venue, t.capacity].map((x,i)=><div key={i} className="border border-[#d5d4cf] bg-white px-5 py-5 text-sm font-bold leading-7">{x}</div>)}
          </div>
          <p className="mt-5 max-w-4xl border-l-4 border-[#a65128] pl-4 text-sm leading-7">{t.status}</p>
        </section>

        <section className="py-7" aria-labelledby="rizehope-routes">
          <h2 id="rizehope-routes" className="mb-6 text-2xl font-black sm:text-3xl">{t.routesTitle}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {t.routes.map((route,i)=><article key={route.k} className="flex h-full flex-col border border-[#c9c7c0] bg-white p-6">
              <p className="text-[11px] font-bold tracking-[.15em] text-[#8b5037]">{route.k}</p>
              <h3 className="mt-3 text-xl font-black">{route.title}</h3>
              <p className="mt-2 text-sm font-bold text-[#a65128]">{route.tag}</p>
              <p className="mt-5 text-sm leading-7">{route.details}</p>
              <p className="mt-4 text-xs leading-6 text-[#55606a]">{route.caution}</p>
              <a href={route.href} target="_blank" rel="noopener noreferrer" data-growth-id={`rizehope-festival-route-${i+1}`} className="mt-auto block bg-[#122944] px-4 py-4 text-center text-sm font-bold text-white">{route.action}</a>
            </article>)}
          </div>
        </section>

        <section className="mt-12 border-t border-[#d5d4cf] pt-10">
          <h2 className="text-2xl font-black">{t.programmeTitle}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {t.programme.map(x=><div key={x[0]} className="bg-[#e9e8e2] p-5">
              <h3 className="text-lg font-black tracking-[.1em]">{x[0]}</h3><p className="mt-2 text-sm leading-7">{x[1]}</p>
            </div>)}
          </div>
        </section>

        <section className="mt-12 border-t border-[#d5d4cf] pt-10">
          <h2 className="text-2xl font-black">{t.agendaTitle}</h2>
          <div className="mt-5 space-y-2">
            {t.agenda.map(x=><div key={x[0]} className="grid grid-cols-[110px_1fr] gap-4 border-b border-[#d5d4cf] py-3 text-sm leading-7 sm:grid-cols-[180px_1fr]"><strong>{x[0]}</strong><span>{x[1]}</span></div>)}
          </div>
        </section>

        <section className="mt-12 grid gap-8 border-t border-[#d5d4cf] pt-10 md:grid-cols-2">
          <div><h2 className="text-2xl font-black">{t.partnersTitle}</h2><p className="mt-4 text-sm leading-7">{t.partnersBody}</p>
            <a href={forms.partners} target="_blank" rel="noopener noreferrer" data-growth-id="rizehope-festival-partners" className="mt-5 inline-block border border-[#122944] px-5 py-3 text-sm font-bold">{t.partnersAction}</a>
          </div>
          <div><h2 className="text-2xl font-black">{t.safetyTitle}</h2><p className="mt-4 text-sm leading-7">{t.safety}</p></div>
        </section>

        <footer className="mt-14 border-t border-[#d5d4cf] py-6 text-xs leading-6 text-[#55606a]">
          <p>{t.footer}</p><p className="mt-3">{t.inquiry}</p>
          <p className="mt-2">© 2026 Riot Basketball Academy | <a href={locale==="ja"?"/ja/policies":"/en/policies"} className="underline">Privacy &amp; safety</a></p>
        </footer>
      </div>
    </main>
  );
}
