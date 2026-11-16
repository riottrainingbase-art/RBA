import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const form = "https://form.jotform.com/263187713938065?utm_source=rba_site&utm_medium=event_page&utm_campaign=kobe_boys_u14_2027_en";
const japanese = "https://form.jotform.com/263188088558069?utm_source=rba_site&utm_medium=event_page&utm_campaign=kobe_boys_u14_2027_en";

export const metadata: Metadata = {
  title: "Kobe 2027 Boys U14 International Basketball Exchange — Overseas Team Interest | RBA",
  description: "Boys U14 international youth basketball exchange being planned in Kobe, Japan, Jan 5-10, 2027. Guam arrival Jan 5 and departure Jan 10; games and joint practices targeted Jan 6-7, with potential additional exchanges Jan 8-9. Teams may register non-binding interest. No payment or venue confirmation yet.",
  alternates: { canonical: "/events/kobe-boys-u14-exchange-2027", languages: { "en": "/events/kobe-boys-u14-exchange-2027", "ja-JP": "/ja/events/kobe-boys-u14-exchange-2027" } },
  openGraph: { title: "Kobe 2027 | Boys U14 International Basketball Exchange | RBA", description: "Expressions of interest: international boys U14 teams; January 6-7 games targeted, January 8-9 additional exchanges possible. Venue and terms subject to confirmation.", url: "/events/kobe-boys-u14-exchange-2027", images: ["/rba-logo-original.jpg"] },
};

const programme = [
  ["5 JAN / TUE", "Guam Arrival / Japan Team Practice", "Guam arrives at Kansai International Airport at 10:05. Transfer and rest take priority. A Japan-only RBA UNITED Boys U14 practice in Kobe is proposed that afternoon, led by head coach Masato Nishio; venue, times and possible costs are unconfirmed. No competitive game is scheduled for Guam on arrival day."],
  ["6 JAN / WED", "Friendly Games & Joint Practice", "Proposed boys U14 games and development sessions with clubs in Japan; subject to gym and opponent confirmation."],
  ["7 JAN / THU", "Exchange Programme", "Proposed continuation. Local Japanese schools resume classes on this day, so match times need to respect the school schedule."],
  ["8–9 JAN / FRI–SAT", "Optional Additional Exchanges", "Possible extra games, cultural exchange or joint practice, especially Saturday January 9. These dates are not yet confirmed or priced."],
  ["10 JAN / SUN", "Guam Team Departure", "The Guam group's scheduled flight home from Kansai; no tournament games will be planned on this day."],
];

export default function KobeInternationalU14() {
  return <main className="min-h-screen bg-[#f6f1e9] text-black">
    <div className="border-b border-black/20 bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
      <Link href="/" className="flex items-center gap-3"><Image src="/rba-logo-original.jpg" alt="RBA official emblem" width={48} height={60} className="h-14 w-12 object-contain"/><span className="text-xs font-black leading-5">RIOT BASKETBALL<br/>ACADEMY</span></Link><a href="/ja/events/kobe-boys-u14-exchange-2027" className="text-sm font-black underline underline-offset-4">日本語 / JAPANESE</a>
    </div></div>
    <header className="bg-[#ff6709] px-5 py-16 sm:px-8 sm:py-24"><div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap gap-3 text-xs font-black"><span className="border-2 border-black px-3 py-2">BOYS U14 ONLY</span><span className="border-2 border-black px-3 py-2">NON-BINDING TEAM INTEREST</span></div>
      <p className="mt-8 text-sm font-black tracking-[.2em]">JAPAN × GUAM + ASIA / KOBE 2027</p>
      <h1 className="mt-5 max-w-5xl text-[clamp(2.5rem,8vw,7rem)] font-black leading-[1.04] tracking-[-.065em]">Different countries.<br/>One court.</h1>
      <p className="mt-7 border-t-[6px] border-black pt-6 text-[clamp(1.9rem,5vw,4.5rem)] font-black leading-tight">RBA INTERNATIONAL<br/>BOYS U14 EXCHANGE</p>
      <p className="mt-6 text-3xl font-black">JANUARY 5–10, 2027 · KOBE / KANSAI</p>
      <p className="mt-5 max-w-3xl text-base font-semibold leading-8">Youth teams learn from unfamiliar opponents and coaches through friendly games, shared practice and cultural exchange. The Japanese RBA UNITED Boys U14 squad will be coached by RBA founder Masato Nishio, with a provisional Japan-only preparation session on January 5. We are inviting overseas clubs to explore a first international boys U14 exchange in the Kobe area.</p>
      <div className="mt-6 max-w-3xl border-l-4 border-black bg-[#fff3e5] p-5 text-sm font-bold leading-7"><strong>Planning status:</strong> Guam has informed RBA that air tickets for travel to Kansai are booked. Competition venue, opponents, other overseas teams, confirmed fees, DOB cutoff and game times are still being arranged. This enquiry is free and does not reserve a team place, charge a fee, or guarantee that the event will proceed.</div>
      <a href={form} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-14 items-center bg-black px-7 py-4 font-black text-white">EXPRESS BOYS U14 TEAM INTEREST ↗</a>
    </div></header>
    <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8"><p className="text-xs font-black tracking-[.2em] text-[#d85200]">WHY JOIN</p><h2 className="mt-4 text-3xl font-black sm:text-5xl">More than a tournament.</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{[
      ["Friendly Games", "Play different styles of basketball, with meaningful learning opportunities rather than only pursuing results."],
      ["Joint Training", "Share ideas and develop decision-making, spacing, defensive reads and game sense."],
      ["Cultural & Coach Exchange", "Build connections between young players and coaches across the Asia-Pacific region."]
    ].map(([t,b])=><article key={t} className="border border-black/20 bg-white p-6"><h3 className="text-xl font-black">{t}</h3><p className="mt-4 text-sm leading-7">{b}</p></article>)}</div></section>
    <section className="bg-black px-5 py-14 text-white sm:px-8"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-black sm:text-5xl">Provisional Schedule</h2><div className="mt-8 grid gap-3 md:grid-cols-2">{programme.map(([d,t,b])=><article className="border border-white/30 p-6" key={d}><p className="text-sm font-black text-[#ff9b60]">{d}</p><h3 className="mt-3 text-xl font-black">{t}</h3><p className="mt-3 text-sm leading-7 text-neutral-300">{b}</p></article>)}</div></div></section>
    <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8"><h2 className="text-3xl font-black sm:text-5xl">Who should enquire?</h2><p className="mt-5 max-w-4xl leading-8">Coaches or team managers who can bring a <strong>boys U14</strong> youth team to Kobe. Share your team&apos;s country or region, approximate number of players (a team of 10–15 is a useful starting point), adult chaperones, possible travel dates and preferences for friendly games or joint training. Official age eligibility by date of birth will be published when partner teams agree on a fair rule.</p>
      <div className="mt-7 border-2 border-black bg-white p-6"><h3 className="text-xl font-black">Travel & costs</h3><p className="mt-4 text-sm leading-8">International flights, accommodation, meals, local transport, supervision and any event fees must be agreed in writing. RBA is seeking options but has not offered free lodging, funded airfares, or complimentary ground transport. Please do not make non-refundable reservations based solely on this page. Existing Guam reservations are unaffected by these enquiries.</p></div>
      <div className="mt-8 flex flex-wrap gap-4"><a href={form} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center bg-[#ff6709] px-7 py-4 font-black">OVERSEAS BOYS U14 TEAM FORM ↗</a><a href={japanese} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center border-2 border-black px-7 py-4 font-black">JAPAN / DOMESTIC PLAYER FORM ↗</a></div>
    </section>
    <section className="bg-[#eee3d7] px-5 py-12 sm:px-8"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-black">Important notes</h2><div className="mt-6 space-y-4 text-sm leading-8"><p><strong>Venue:</strong> Kobe/Kansai area under discussion. A local university gym has been identified as a candidate but has not been booked or approved.</p><p><strong>Participating regions:</strong> Japan and Guam form the working basis. Additional countries have been invited for exploratory discussions; no additional overseas team is confirmed.</p><p><strong>Safeguarding:</strong> Every international and Japanese youth delegation must have adequate adult supervision. Insurance, medical contacts, photography permissions, and game-load limits are part of the final participation conditions.</p><p><strong>Fees:</strong> No fee is collected with the expression-of-interest form. Final conditions, cancellation policy and any payment arrangements will be circulated before a binding registration.</p></div></div></section>
    <footer className="bg-black px-5 py-12 text-white sm:px-8"><div className="mx-auto max-w-6xl"><p className="text-sm font-black tracking-[.2em] text-[#ff9856]">RIOT BASKETBALL ACADEMY</p><p className="mt-5 text-2xl font-black">Help us build the next meaningful exchange.</p><a href={form} target="_blank" rel="noopener noreferrer" className="mt-7 inline-block bg-[#ff6709] px-7 py-4 font-black text-black">SEND TEAM INTEREST ↗</a><p className="mt-5 text-sm text-neutral-300">Planning organisation: Riot Basketball Academy (Japan). No university co-hosting, confirmed venue or overseas team endorsements are claimed.</p><a href="mailto:riot.training.base@gmail.com" className="mt-3 inline-block text-sm underline">riot.training.base@gmail.com</a></div></footer>
  </main>;
}
