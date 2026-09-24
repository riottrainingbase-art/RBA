const base = "https://riotbasketballacademy.com";
const entries = [
  { title: "Plan a Japan basketball exchange without turning it into sports tourism", link: "/journal/plan-a-japan-basketball-exchange", date: "2026-09-14", summary: "A practical, development-led starting point for Asian academies and teams interested in Japan." },
  { title: "What RBA can coordinate—and what must stay with your organisation", link: "/journal/what-rba-coordinates-in-japan", date: "2026-09-14", summary: "Clear responsibilities for overseas youth basketball programmes in Japan." },
  { title: "How to build a Japan–Asia relationship that lasts beyond one event", link: "/journal/building-a-real-asia-basketball-relationship", date: "2026-09-14", summary: "A relationship model built around one useful action, reflection and a credible next step." },
];
export function GET(){
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>RBA Journal — Japan to Asia</title><link>${base}/asia</link><description>Field notes and practical guidance from Riot Basketball Academy.</description>${entries.map(e=>`<item><title><![CDATA[${e.title}]]></title><link>${base}${e.link}</link><guid>${base}${e.link}</guid><pubDate>${new Date(e.date+"T00:00:00Z").toUTCString()}</pubDate><description><![CDATA[${e.summary}]]></description></item>`).join("")}</channel></rss>`;
  return new Response(xml,{headers:{"Content-Type":"application/rss+xml; charset=utf-8","Cache-Control":"public, max-age=300"}});
}
