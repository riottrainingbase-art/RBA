export const coachTopics = [
  { id: "movement", title: "Movement & balance", question: "How can players run, stop and receive with control?" },
  { id: "fast-break", title: "Fast breaks", question: "How can we recognise and use an advantage earlier?" },
  { id: "shooting", title: "Shooting & finishing", question: "How can players find and finish good shots?" },
  { id: "practice", title: "Practice design", question: "How can a simple drill connect to the game?" },
  { id: "development", title: "Youth development", question: "How can we plan around growth, fatigue and recovery?" },
  { id: "coaching", title: "Player-centred coaching", question: "How can we help players notice and decide?" },
] as const;
export type CoachTopic = typeof coachTopics[number]["id"];
export type CoachGroup = "penang" | "kuala-lumpur" | "malaysia";
export function coachGroup(value?: string): CoachGroup {
  return value === "penang" || value === "kuala-lumpur" ? value : "malaysia";
}
export function coachLibraryPath(group: CoachGroup = "malaysia") {
  return `/my-homecourt/app/coach-library?group=${group}`;
}
export function coachLoginPath(group: CoachGroup = "malaysia") {
  return `/my-homecourt/login?next=${encodeURIComponent(coachLibraryPath(group))}&role=coach&source=malaysia-${group}`;
}
export const coachResources: { id: string; title: string; publisher: string; kind: string; access: string; description: string; href: string; topics: CoachTopic[] }[] = [
  { id: "wabc-manual", title: "WABC coaching manuals", publisher: "FIBA / WABC", kind: "Official manuals", access: "English documents on the publisher’s website", description: "Start with Start Coaching or the Coaches Manual. Use the contents to find fundamentals, shooting, passing and team play.", href: "https://about.fiba.basketball/en/wabc-documents", topics: ["movement", "fast-break", "shooting", "practice", "coaching"] },
  { id: "wabc-videos", title: "WABC Coaching Development Project", publisher: "FIBA / WABC", kind: "Coaching videos", access: "Videos on the publisher’s website", description: "Watch teaching points and on-court demonstrations, then select one idea to observe in your own practice.", href: "https://about.fiba.basketball/en/wabc-coaching-development-project", topics: ["shooting", "practice", "coaching"] },
  { id: "ioc-development", title: "Youth athletic development", publisher: "Bergeron et al. · IOC consensus · BJSM, 2015", kind: "Research / consensus", access: "English abstract on PubMed; full text availability depends on the publisher", description: "A starting reference for an age-appropriate development approach. Read it alongside the demands of school, club and competition.", href: "https://pubmed.ncbi.nlm.nih.gov/26084524/", topics: ["movement", "development"] },
  { id: "small-sided", title: "Why small-sided games matter", publisher: "RBA JOURNAL", kind: "RBA article", access: "Free English article", description: "Connect practice design with opportunities for players to see, decide and act in a game.", href: "/journal/why-small-sided-games-matter", topics: ["fast-break", "practice", "coaching"] },
  { id: "see-decide", title: "See. Decide. Connect. Adapt.", publisher: "RBA JOURNAL", kind: "RBA article", access: "Free English article", description: "A shared vocabulary for observing what a player notices and how a decision fits the situation.", href: "/journal/see-decide-connect-adapt", topics: ["fast-break", "shooting", "coaching"] },
  { id: "coach-questions", title: "Coaches don’t give every answer", publisher: "RBA JOURNAL", kind: "RBA article", access: "Free English article", description: "Reflect on when to explain, when to ask and when to give players room to solve a problem.", href: "/journal/coaches-dont-give-every-answer", topics: ["practice", "coaching"] },
  { id: "next-practice", title: "From a clinic to the next practice", publisher: "RBA JOURNAL", kind: "RBA article", access: "Free English article", description: "Bring one useful idea back to your team and review what happened before adding more.", href: "/journal/clinic-to-next-practice", topics: ["movement", "practice", "development"] },
];
// Original RBA coaching prompts, not quotations or validated treatment protocols.
export const coachPracticeNotes: { topic: CoachTopic; title: string; task: string; observe: string; question: string }[] = [
  { topic: "movement", title: "Run → receive → stop → finish", task: "In pairs, pass to a moving teammate, receive under control and finish close to the basket. Begin at a manageable pace; swap roles and sides.", observe: "Can the receiver look ahead, control the stop and keep a legal pivot? Increase pace only while control remains.", question: "What helped you arrive balanced?" },
  { topic: "fast-break", title: "2 attackers, 1 defender", task: "Use a clear attacking area and one basket. Start 2v1, finish the possession, clear the court and rotate all three roles. Let the defender choose whom to stop.", observe: "Does the ball carrier look ahead? Does the teammate give a wide passing option? Judge the decision as well as the finish.", question: "When did the pass or the path to the basket become available?" },
  { topic: "shooting", title: "Close first. Add a decision next.", task: "Begin at a distance where each player can shoot with balance. Practise both sides near the basket, then add a live defender in 1v1 or 2v1 when ready.", observe: "Keep the distance, side and number of attempts consistent when comparing sessions. Avoid forcing range before control.", question: "What did you see before you chose your shot?" },
  { topic: "practice", title: "One problem. One change.", task: "Choose one game problem, such as finding an open teammate. Play 2v2 or 3v3, change one constraint, then return to normal play.", observe: "Does the behaviour still appear after you remove the constraint? If not, simplify the situation or explanation.", question: "Which change helped you find an option?" },
  { topic: "development", title: "Plan the whole week", task: "Before planning, ask about school sport, other team sessions, travel and matches. Adjust today’s work to the players present.", observe: "Look for unusual fatigue, pain or a loss of movement control. Stop painful activity and follow the team’s health support process.", question: "How are you feeling compared with your usual self?" },
  { topic: "coaching", title: "Ask, then give room to play", task: "Watch a short passage of play. Ask one concrete question about what the player saw, then let the next passage run before speaking again.", observe: "Are players making their own choices? Keep feedback short enough that they can try an idea immediately.", question: "What other option could you try next time?" },
];
