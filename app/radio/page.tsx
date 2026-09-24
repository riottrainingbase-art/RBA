import type { Metadata } from "next";
import { ArrowRight, Mic2 } from "lucide-react";
import { InnerPage } from "@/components/inner-page";

export const metadata: Metadata = { title: "RBA Radio", description: "RBA conversations and field reflections on youth basketball development, coaching and physical preparation.", alternates:{canonical:"/radio"} };

const desk = [
  ["EP. 01", "What player-centred actually changes", "FIELD REFLECTION"],
  ["EP. 02", "Stop. See. Choose. Why language shapes practice", "COACHING DESIGN"],
  ["EP. 03", "Training is science—not punishment", "S&C DESK"],
  ["EP. 04", "Beyond basketball tourism", "ASIA EXCHANGE"],
  ["EP. 05", "A coach conversation: designing for the future game", "COACH DIALOGUE"],
  ["EP. 06", "What the road teaches us about Japan", "FIELD NOTES"],
];

export default function RadioPage() {
  return <InnerPage index="04" kicker="RBA RADIO" title={<>Listen to the work<br />behind the work.</>} intro="A developing audio series for coaches and development leaders: concise field reflections, longer coach conversations and evidence-aware S&C discussions." next={{ label: "Start a conversation", href: "/contact" }}>
    <section className="radio-status section-pad"><Mic2 size={32} /><div><p>PRODUCTION STATUS</p><h2>The desk is being built.</h2><span>No episodes are presented as published until recording permission, edit review and link QA are complete.</span></div></section>
    <section className="episode-desk section-pad">{desk.map(([ep, title, type]) => <article key={ep}><div><span>{ep}</span><p>{type}</p></div><h2>{title}</h2><span className="episode-state">IN DEVELOPMENT</span></article>)}</section>
    <section className="guest-call section-pad"><div><p className="section-index inverse">COACH CONVERSATIONS</p><h2>Bring one idea<br />worth examining.</h2></div><div><p>We are interested in thoughtful conversations with coaches working in youth development across Asia. No promotional script. No “secret method.” One real question, explored with context.</p><a className="button button-light" href="/contact?topic=radio">Propose a conversation <ArrowRight size={17} /></a></div></section>
  </InnerPage>;
}