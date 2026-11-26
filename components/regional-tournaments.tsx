import tournaments from "@/data/regional-tournaments.json";

export function RegionalTournaments({ region, settingsHref }: { region: string | null; settingsHref: string }) {
  const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Tokyo" }).format(new Date());
  const entries = tournaments.filter(event => event.region === region && event.end >= today)
    .sort((left, right) => left.start.localeCompare(right.start) || left.title.localeCompare(right.title));
  return <section className="member-section" aria-label="地域の大会">
    <h2>{region ? region + "の大会" : "地域の大会"}</h2>
    {entries.length > 0 ? <ul>{entries.map(event => <li key={event.region + event.start + event.title}>
      <strong>{event.title}</strong><br />{event.start.slice(0,4)}年{event.dates} · {event.city} · {event.venue}<br />
      <a href={event.source} target="_blank" rel="noreferrer">主催者の開催情報を見る</a>
    </li>)}</ul> : <p>{region ? "この地域で掲載済みの今後の大会はありません。" : "活動地域を登録すると、掲載中の大会を確認できます。"}</p>}
    <a href={settingsHref}>活動地域を変更する</a>
  </section>;
}
