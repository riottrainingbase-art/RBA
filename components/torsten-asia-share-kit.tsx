"use client";

import { useState } from "react";

const officialUrl = "https://riotbasketballacademy.com/events/torsten-loibl-online-clinic";
const base = "Riot Basketball Academy independently hosts Torsten Loibl ONLINE CLINIC Vol.2 on 25 November 2026. Learn how shooting practice connects with spacing, off-ball movement, reading defenders and decisions during games. English lecture with Japanese consecutive interpretation; no local-language interpretation. International LIVE US$29 and separately purchased 30-day recording US$29. This is not a B.LEAGUE, Levanga Hokkaido, FIBA or JBA-accredited or endorsed clinic. Official details and registration: " + officialUrl;
const notices = [
  { id: "philippines", label: "Philippines", time: "7:00–8:30 PM PHT", note: "Levanga Hokkaido played at the B.LEAGUE MANILA GAMES in September 2026. Its current Head Coach, Torsten Loibl, is now the speaker at a separate, independently hosted RBA coaching clinic." },
  { id: "taiwan", label: "Taiwan / Hong Kong", time: "7:00–8:30 PM UTC+8", note: "For basketball coaches who follow Japan's B.LEAGUE PREMIER: learn with Levanga Hokkaido's current Head Coach, Torsten Loibl." },
  { id: "korea", label: "South Korea", time: "8:00–9:30 PM KST", note: "An independent coach-education opportunity with the current Levanga Hokkaido Head Coach in Japan's B.LEAGUE PREMIER." },
  { id: "malaysia", label: "Malaysia / Singapore", time: "7:00–8:30 PM UTC+8", note: "Connect Japan's professional basketball practice ideas with questions in grassroots coaching, through this independent RBA event." },
  { id: "southeast-asia", label: "Indonesia (Jakarta) / Thailand / Vietnam", time: "6:00–7:30 PM UTC+7", note: "An independent online coaching session with the current B.LEAGUE PREMIER Head Coach of Levanga Hokkaido." },
  { id: "south-asia", label: "India / Gulf", time: "India 4:30–6:00 PM IST; UAE 3:00–4:30 PM GST", note: "Can’t make the live session during school or training? A separate recording-only option provides 30 days of personal viewing from release after the event." },
] as const;

export function TorstenAsiaShareKit() {
  const [selected, setSelected] = useState<(typeof notices)[number]["id"]>("philippines");
  const [status, setStatus] = useState("");
  const item = notices.find(entry => entry.id === selected) ?? notices[0];
  const text = `${item.note}\n\nDate and local time: Wednesday 25 November 2026, ${item.time}.\n\n${base}`;

  async function copy() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(text);
      setStatus("Copied. Review the wording and share only with adults who welcome coaching information.");
    } catch {
      setStatus("Automatic copy was not available. Select the text and copy it manually.");
    }
  }

  return <div className="tg-sharekit">
    <div className="tg-share-controls" role="group" aria-label="Choose a region">
      {notices.map(entry => <button key={entry.id} type="button" aria-pressed={entry.id === selected} onClick={() => {setSelected(entry.id); setStatus("");}}>{entry.label}</button>)}
    </div>
    <label htmlFor="tg-share-text">Optional introduction for adult coaches — English draft</label>
    <textarea id="tg-share-text" readOnly rows={10} value={text} onFocus={event => event.currentTarget.select()} />
    <div className="tg-share-action"><button type="button" className="tg-button" onClick={copy}>Copy this coach-education note</button><p role="status" aria-live="polite">{status || "Choose a region. Nothing is sent automatically."}</p></div>
    <p className="tg-fine">Use only when voluntarily sharing with an adult coaching contact who welcomes the information. Do not distribute to minors, team contact lists or unsubscribed recipients. These are RBA-created English drafts, not licensed messages from B.LEAGUE or its broadcasters.</p>
  </div>;
}
