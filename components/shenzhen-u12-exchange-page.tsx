import Image from "next/image";

type Locale = "ja" | "en";
const links = {
  parents: "https://form.jotform.com/263237260217048?utm_source=rba_site&utm_medium=shenzhen_u12_page&utm_campaign=kanto_exchange_2027",
  teams: "https://form.jotform.com/263217708013047?utm_source=rba_site&utm_medium=shenzhen_u12_page&utm_campaign=kanto_exchange_2027",
  crew: "https://form.jotform.com/263227860681058?utm_source=rba_site&utm_medium=shenzhen_u12_page&utm_campaign=kanto_exchange_2027",
};

const translations = {
  ja: {
    flag: "無料・参加意向の事前登録｜開催条件確認中",
    section: "JAPAN × SHENZHEN / INTERNATIONAL YOUTH EXCHANGE",
    title: "世界と出会う。\n自分で判断する。",
    lead: "2027年2月、中国・深圳のCiroo Basketball Academy 男子U12チームと、日本の育成年代選手による交流試合・合同練習を企画しています。RBA UNITEDは、現在の所属チームを変えずに参加を検討できる期間限定のチーム構想です。",
    notice: "重要：交流試合・RBA UNITEDの編成・参加枠・会場の正式許可・JBA申請承認・料金は未確定です。現在は希望を確認する無料登録のみです。選考、参加契約、予約、決済は発生しません。",
    heading: "企画の現状",
    facts: [
      ["海外側", "深圳・Ciroo Basketball Academy／11〜12歳の男子選手約10名（先方からの予定情報）"],
      ["来日", "2027年2月10日頃から関東に約7日間の予定。正確な往復便・滞在地は確認中"],
      ["2月11日（木・祝）", "千葉県・神崎中学校体育館13:00〜17:00が利用可能との連絡あり。正式な利用許可は未取得"],
      ["日本側", "HBC Wolvesおよび過去のRBA関東参加者を中心に、合同チームを検討。招集済みの選手はまだいません"],
    ],
    routes: "参加希望に合わせて3つの窓口",
    parent: "保護者・個人選手",
    parentBody: "男子U12の試合・合同練習について、保護者の方から日程の希望を無料登録。過去のRBA参加者も今回の意思をあらためて確認します。",
    parentButton: "保護者の無料意向登録",
    team: "国内U12チーム・指導者",
    teamBody: "地域クラブ単位での対戦や会場協力、選手交流を検討する責任者向け。フォームの記入で正式参加や会場提供が確定することはありません。",
    teamButton: "チーム側の事前相談",
    staff: "成人の指導・運営協力者",
    staffBody: "関東の指導者、審判、TO、通訳、安全・運営サポートに関心のある18歳以上の方向け。採用・報酬・参加日は未確定です。",
    staffButton: "運営協力の無料登録",
    daysTitle: "7日間の行程イメージ",
    days: [
      ["2/10 WED", "到着・休養", "正式な到着便・ホテルは確認中。来日当日の公式試合は設定しません。"],
      ["2/11 THU / HOLIDAY", "千葉・神崎／交流候補", "13〜17時の施設利用可能情報あり。HBC＋RBA UNITED候補との試合・合同練習を構想。正式許可・出場は未確定。"],
      ["2/12 FRI", "夕方の合同練習候補", "学校のある平日のため、選手の学業・帰宅時間と施設事情を優先。"],
      ["2/13 SAT", "千葉方面／追加試合候補", "代表の山形クリニック日程と競合する可能性。成人の現地責任者が確保できる場合のみ検討。"],
      ["2/14 SUN", "関東方面／追加試合候補", "代表の山形クリニック日程と競合する可能性。会場・国内チームは未確定。"],
      ["2/15 MON", "休養・文化交流候補", "過度な連戦を避け、交流と回復を優先します。"],
      ["2/16 TUE", "帰国・移動の仮置き", "先方の実際の帰国日は未確認です。"],
    ],
    unitedTitle: "RBA UNITEDとは？",
    unitedBody: "普段は異なるクラブに所属する選手が、対象企画の間だけ一緒に学ぶ仕組みです。現在の所属チームを離れる必要はありません。参加資格・出場機会・現場責任者・費用は正式な条件が整った段階でご案内します。",
    checksTitle: "正式開催までに確認すること",
    checks: ["海外チームの正確な渡航・引率・競技条件", "施設の用途に適合した正式利用許可", "JBAなど必要な国際交流試合の申請・承認", "国内選手の年齢資格、本人意思と保護者の同意", "成人指導者、審判・TO、緊急対応と保険", "費用・支払範囲・中止返金条件の正式な提示"],
    note: "これは事前の関心・協力希望を確認するページです。最終開催日、会場、指導者、料金、募集人数は正式確定前であり、参加・出場・運営協力を約束するものではありません。",
    contact: "お問い合わせ",
    footer: "育成年代の判断・協働・相互理解を中心に、子どもの学びが残る交流をつくります。",
    jp: "日本語",en:"ENGLISH",
  },
  en: {
    flag: "FREE EXPRESSION OF INTEREST / NOT A CONFIRMED EVENT",
    section: "JAPAN × SHENZHEN / INTERNATIONAL YOUTH EXCHANGE",
    title: "New teammates.\nNew ways to learn.",
    lead: "Riot Basketball Academy is exploring friendly games and joint training in Japan in February 2027 with the visiting U12 boys from Shenzhen's Ciroo Basketball Academy. RBA UNITED would bring together interested local players for this specific programme without requiring them to leave their home clubs.",
    notice: "Important: Games, RBA UNITED team selection, confirmed venues, JBA approval, places and fees are NOT confirmed. These forms collect free, non-binding interest only. They do not create a booking, selection, contract or payment.",
    heading: "Current planning status",
    facts: [
      ["Visiting group", "Ciroo Basketball Academy, Shenzhen / approximately 10 boys aged 11–12 (as advised, subject to verification)"],
      ["Visit window", "Around February 10, 2027 for roughly seven days in the Kanto area. Actual flights and accommodation remain unconfirmed"],
      ["February 11 (Thu, holiday)", "Kozaki Junior High School gym, Chiba: a possible 1–5 pm window was reported. Formal permission has NOT been granted"],
      ["Japanese players", "An exploratory combined group involving HBC Wolves and former RBA participants. No individual player is selected or confirmed"],
    ],
    routes: "Three ways to express interest",
    parent: "Parents / individual players",
    parentBody: "Parents of interested U12 boys can indicate their availability and preferred type of exchange. This is not a team-selection application or a confirmed booking.",
    parentButton: "Free parent interest form (Japanese)",
    team: "Japanese U12 clubs / coaches",
    teamBody: "Club adults can discuss friendly games, joint training and possible venue support. Submission does not guarantee a match or commit the club.",
    teamButton: "Team / club enquiry (Japanese)",
    staff: "Adult coaching and operations support",
    staffBody: "For adults 18+ interested in coaching, officiating, score-table support, interpreting or event safety. Roles, dates and compensation are not confirmed.",
    staffButton: "Adult volunteer / support interest (Japanese)",
    daysTitle: "Provisional visit outline",
    days: [
      ["FEB 10 / WED", "Arrival and recovery", "Flights, hotel and ground arrangements are not yet confirmed. No game on arrival day."],
      ["FEB 11 / THU, HOLIDAY", "Kozaki, Chiba / proposed exchange", "A possible 1–5 pm gym window, subject to school permission. Exploring a game and joint learning with HBC / RBA UNITED candidates."],
      ["FEB 12 / FRI", "Possible evening practice", "School commitments and transport home for Japanese players take priority."],
      ["FEB 13 / SAT", "Additional game — possible", "May conflict with RBA's Yamagata clinic. A formally assigned local adult organiser would be required."],
      ["FEB 14 / SUN", "Additional game — possible", "May conflict with RBA's Yamagata clinic. Venue and opponents are not confirmed."],
      ["FEB 15 / MON", "Recovery / cultural exchange", "Avoid excessive games and prioritise rest and learning."],
      ["FEB 16 / TUE", "Departure — unconfirmed", "The team's exact departure date and flight are still unknown."],
    ],
    unitedTitle: "What is RBA UNITED?",
    unitedBody: "RBA UNITED is a short-term programme in which players from different home clubs can learn together. Players do not need to transfer. Eligibility, safeguarding, coaches, playing opportunities and fees must be confirmed before any invitation.",
    checksTitle: "What must be verified first?",
    checks: ["Exact travel details, chaperones, age and game requirements", "Written permission for each gym and its permitted use", "Required JBA and local association approvals", "Age eligibility and explicit player/guardian consent", "Responsible adults, officials, scorekeepers, insurance and emergencies", "Written scope of services, fees and cancellation terms"],
    note: "This page is a preliminary enquiry. No game, coach, venue, roster or fee is guaranteed. RBA will share a confirmed programme only after approvals and written agreement.",
    contact: "Contact RBA",
    footer: "Making youth basketball exchange a place for learning, decision-making, teamwork and mutual respect.",
    jp: "日本語", en: "ENGLISH",
  },
} as const;

export function ShenzhenU12ExchangePage({ locale }: { locale: Locale }) {
  const c = translations[locale];
  const jpUrl = "/ja/events/shenzhen-u12-exchange-2027";
  const enUrl = "/events/shenzhen-u12-exchange-2027";
  return (
    <main className="min-h-screen bg-[#f7f4ed] text-[#141b23]">
      <header className="border-b border-[#171f29]/15 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4 md:px-8">
          <a href={locale === "ja" ? "/ja" : "/"} className="flex items-center gap-3" aria-label="Riot Basketball Academy home">
            <Image src="/rba-logo-original.jpg" alt="RBA official logo" width={50} height={58} className="h-14 w-12 object-contain" />
            <span className="text-xs font-black leading-snug tracking-widest">RIOT BASKETBALL<br />ACADEMY</span>
          </a>
          <nav className="flex flex-wrap gap-4 text-sm font-bold" aria-label="Programme navigation">
            <a href={locale === "ja" ? "/ja/international" : "/international"} className="underline underline-offset-4">RBA INTERNATIONAL</a>
            <a href={locale === "ja" ? "/ja/united" : "/united"} className="underline underline-offset-4">RBA UNITED</a>
            <a href={locale === "ja" ? enUrl : jpUrl} className="underline underline-offset-4" lang={locale === "ja" ? "en" : "ja"}>{locale === "ja" ? c.en : c.jp}</a>
          </nav>
        </div>
      </header>
      <section className="bg-[#101923] px-5 py-16 text-white sm:py-24 md:px-8">
        <div className="mx-auto max-w-6xl">
          <span className="inline-flex border border-[#ffb37b] px-3 py-2 text-xs font-black tracking-widest text-[#ffb37b]">{c.flag}</span>
          <p className="mt-8 text-xs font-black tracking-[.26em] text-[#ff9a59]">{c.section}</p>
          <h1 className="mt-5 whitespace-pre-line text-[clamp(2.9rem,8vw,6.4rem)] font-black leading-[1.07] tracking-[-.05em]">{c.title}</h1>
          <p className="mt-6 text-2xl font-black tracking-tight text-[#ff9a59]">RBA UNITED KANTO × SHENZHEN U12 / FEB 2027</p>
          <p className="mt-6 max-w-4xl text-base leading-9 text-white/90 sm:text-lg">{c.lead}</p>
          <div className="mt-8 border-l-4 border-[#ff8a45] bg-white/10 p-5 text-sm font-bold leading-7">{c.notice}</div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8" aria-labelledby="status-heading">
        <p className="text-xs font-black tracking-[.24em] text-[#bd5620]">PROJECT STATUS / PRELIMINARY</p>
        <h2 id="status-heading" className="mt-3 text-3xl font-black sm:text-4xl">{c.heading}</h2>
        <dl className="mt-7 grid gap-4 md:grid-cols-2">
          {c.facts.map(([heading, value]) => (
            <div key={heading} className="border border-[#192432]/20 bg-white p-6">
              <dt className="text-sm font-black text-[#c45828]">{heading}</dt>
              <dd className="mt-3 text-sm leading-8">{value}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="bg-[#e9e5db] px-5 py-14 md:px-8" aria-labelledby="interest-heading">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black tracking-[.24em] text-[#bd5620]">FREE / NO PAYMENT / NO GUARANTEE</p>
          <h2 id="interest-heading" className="mt-3 text-3xl font-black sm:text-4xl">{c.routes}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {([
              [c.parent, c.parentBody, c.parentButton, links.parents],
              [c.team, c.teamBody, c.teamButton, links.teams],
              [c.staff, c.staffBody, c.staffButton, links.crew],
            ] as const).map(([name, body, button, url]) => (
              <article key={name} className="flex flex-col border-2 border-[#13212f] bg-white p-6">
                <h3 className="text-xl font-black">{name}</h3>
                <p className="mt-4 flex-1 text-sm leading-8">{body}</p>
                <a href={url} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-12 items-center justify-center bg-[#142432] px-5 py-3 text-center text-sm font-black text-white transition-colors hover:bg-[#b84e1e]">{button} ↗</a>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8" aria-labelledby="schedule-heading">
        <p className="text-xs font-black tracking-[.24em] text-[#bd5620]">PROVISIONAL ONLY</p>
        <h2 id="schedule-heading" className="mt-3 text-3xl font-black sm:text-4xl">{c.daysTitle}</h2>
        <div className="mt-7 grid gap-3 md:grid-cols-2">{c.days.map(([day, name, body]) => <article key={day} className="border border-[#152334]/20 bg-white p-5">
          <p className="text-xs font-black tracking-widest text-[#ad4b1e]">{day}</p>
          <h3 className="mt-3 text-lg font-black">{name}</h3>
          <p className="mt-3 text-sm leading-7">{body}</p>
        </article>)}</div>
      </section>
      <section className="bg-[#111a24] px-5 py-14 text-white md:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div><p className="text-xs font-black tracking-[.24em] text-[#ff9a59]">RBA UNITED</p><h2 className="mt-4 text-3xl font-black">{c.unitedTitle}</h2><p className="mt-5 text-sm leading-9 text-white/85">{c.unitedBody}</p></div>
          <div><p className="text-xs font-black tracking-[.24em] text-[#ff9a59]">GO / NO-GO CHECKS</p><h2 className="mt-4 text-3xl font-black">{c.checksTitle}</h2><ul className="mt-5 space-y-3 text-sm leading-7">{c.checks.map(x => <li key={x} className="border-l-2 border-[#ff8a45] pl-4">{x}</li>)}</ul></div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        <div className="border-l-4 border-[#df6b2e] bg-white p-6 text-sm leading-8">{c.note}</div>
        <p className="mt-8 text-sm leading-7">{c.footer}</p>
        <div className="mt-5 flex flex-wrap gap-5 text-sm font-bold">
          <a href="mailto:riot.training.base@gmail.com" className="underline underline-offset-4">{c.contact}: riot.training.base@gmail.com</a>
          <a href={locale === "ja" ? "/ja/policies" : "/policies"} className="underline underline-offset-4">Privacy / Terms</a>
        </div>
      </section>
    </main>
  );
}
