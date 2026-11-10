import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import { TorstenGlobalShareKit } from "@/components/torsten-global-share-kit";

const eventPath = "/events/torsten-loibl-online-clinic";
const sharePath = `${eventPath}/share`;

export const metadata: Metadata = {
  title: "Share Torsten Loibl Online Clinic Vol.2 worldwide | RBA",
  description: "Share accurate English, Spanish, Portuguese, French, German, Traditional Chinese or Korean information for the 25 November 2026 online coaching clinic. LIVE or 30-day recording US$29 each, booked separately.",
  alternates: { canonical: `https://riotbasketballacademy.com${sharePath}` },
  openGraph: {
    title: "Torsten Loibl Vol.2 · International coach-education share kit",
    description: "25 November, 11:00 UTC. Seven share-ready languages. English lecture with Japanese interpretation. USD29 live or USD29 recording, separate purchases.",
    url: `https://riotbasketballacademy.com${sharePath}`,
    locale: "en_US",
    type: "website",
  },
};

const regions = [
  ["Japan / Korea", "20:00–21:30 · JST / KST"],
  ["Taiwan / Hong Kong / Singapore", "19:00–20:30 · UTC+8"],
  ["Central Europe", "12:00–13:30 · CET"],
  ["UK / West Africa (GMT)", "11:00–12:30 · UTC"],
  ["Eastern USA / Colombia", "06:00–07:30 · EST / COT"],
  ["Argentina / Brazil (Brasília)", "08:00–09:30 · ART / BRT"],
] as const;

export default function GlobalTorstenSharePage() {
  return <SiteFrame locale="en" languagePage="events/torsten-loibl-online-clinic">
    <main lang="en" style={{ background: "#fff", color: "#111" }}>
      <section className="section-pad" style={{ paddingTop: 74, paddingBottom: 50, background: "#f6f5f2" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <a className="back-link" href={eventPath}>← Official international clinic details</a>
          <p style={{ marginTop: 28, fontWeight: 800, letterSpacing: ".12em", fontSize: 13 }}>RBA · GLOBAL COACH EDUCATION · 25 NOVEMBER 2026</p>
          <h1 style={{ marginTop: 14, marginBottom: 20, maxWidth: 850, lineHeight: 1.08, fontSize: "clamp(36px, 6vw, 76px)", letterSpacing: "-.045em" }}>Help a coach find a better question.</h1>
          <p style={{ maxWidth: 770, fontSize: "clamp(17px, 2.1vw, 21px)", lineHeight: 1.75 }}>Share verified information about the independent Torsten Loibl Online Clinic Vol.2. Choose from seven languages. Every message leads to the same official international USD registration page.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 26 }}>
            <a className="button button-dark" href={eventPath}>Clinic details and USD checkout</a>
            <a className="button button-dark" href="#share-copy">Get share-ready text</a>
          </div>
        </div>
      </section>
      <section className="section-pad" style={{ paddingTop: 50, paddingBottom: 44 }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <p style={{ fontSize: 13, fontWeight: 800, letterSpacing: ".12em" }}>EVENT FACTS · ONE CLINIC, TWO DISTINCT OPTIONS</p>
          <h2 style={{ marginTop: 12, fontSize: "clamp(28px, 4vw, 44px)" }}>An easy, accurate introduction.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 16, marginTop: 22 }}>
            <article style={{ border: "1px solid #c5c5c5", borderRadius: 12, padding: 22 }}>
              <p style={{ fontSize: 13, fontWeight: 700, margin: 0 }}>LIVE · ZOOM</p>
              <p style={{ fontSize: 38, fontWeight: 800, margin: "8px 0" }}>US$29</p>
              <p style={{ lineHeight: 1.6 }}>25 Nov · 11:00–12:30 UTC. Live access only; recording is not included.</p>
            </article>
            <article style={{ border: "1px solid #c5c5c5", borderRadius: 12, padding: 22 }}>
              <p style={{ fontSize: 13, fontWeight: 700, margin: 0 }}>RECORDING · SEPARATE PURCHASE</p>
              <p style={{ fontSize: 38, fontWeight: 800, margin: "8px 0" }}>US$29</p>
              <p style={{ lineHeight: 1.6 }}>30 days from release after the live event. No live admission.</p>
            </article>
          </div>
          <p style={{ lineHeight: 1.8, marginTop: 20 }}>Focus: game-ready shooting technique, spacing, off-ball actions and decision-making. Delivered in English with Japanese consecutive interpretation. No other interpretation or subtitles are promised. Organised independently by Riot Basketball Academy; it does not grant FIBA/JBA credits and is not a club or federation endorsement.</p>
        </div>
      </section>
      <section className="section-pad" style={{ paddingTop: 40, paddingBottom: 50, background: "#f6f5f2" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(25px, 3.2vw, 39px)" }}>Time zones for Wednesday, 25 November</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(245px,1fr))", gap: 12, marginTop: 20 }}>
            {regions.map(([name,time]) => <div key={name} style={{ borderBottom: "1px solid #aaa", padding: "12px 0" }}><strong style={{ display: "block" }}>{name}</strong><span>{time}</span></div>)}
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.7, marginTop: 20 }}>All times refer to the same live Zoom session. If the time is inconvenient, choose the separate recording option on the official page.</p>
        </div>
      </section>
      <section className="section-pad" id="share-copy" style={{ paddingTop: 56, paddingBottom: 66 }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <p style={{ fontSize: 13, fontWeight: 800, letterSpacing: ".12em" }}>SHARE ONLY WHERE WELCOME</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", marginBottom: 18 }}>One message, seven languages.</h2>
          <p style={{ lineHeight: 1.75, marginBottom: 24 }}>Coaches, editors and partner organisations may voluntarily share these factual descriptions. Please respect each community&apos;s editorial rules and opt-in choices. No automated messages, bulk mailing or data collection are performed here.</p>
          <TorstenGlobalShareKit />
          <p style={{ marginTop: 28, paddingTop: 22, borderTop: "1px solid #ccc", lineHeight: 1.75 }}>This share kit is prepared by RBA, not by the speaker&apos;s professional club, FIBA, WABC or a federation. A shared message is not a booking or a payment. Official registration and the only international USD checkout are on <a href={eventPath} style={{ textDecoration: "underline" }}>the clinic page</a>. Japan-based applicants can use <a href="/ja/events/torsten-loibl-online-clinic" style={{ textDecoration: "underline" }}>the separate JPY/Square registration page</a>.</p>
        </div>
      </section>
    </main>
  </SiteFrame>;
}
