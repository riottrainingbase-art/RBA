import type { Metadata } from "next";
import { InnerPage } from "@/components/inner-page";


export const metadata: Metadata = { title: "Japan Field Notes", description: "Field observations from RBA youth basketball clinics, camps and development work across Japan.", alternates:{canonical:"/field-notes"} };


const notes = [
  { no: "001", place: "DECISION-MAKING", format: "U12 DEVELOPMENT CAMP", title: "A move is not a decision", standfirst: "Design practice around recognising the moment an advantage appears, rather than repeating actions alone.", learn: ["Preserve defender information", "Reward useful reads, not only makes", "Let spacing create the question"] },
  { no: "002", place: "CAMP DESIGN", format: "OVERNIGHT DEVELOPMENT CAMP", title: "The hours between practices matter", standfirst: "Shared routines, recovery and responsibility are part of development—not logistics outside it.", learn: ["Make recovery visible", "Give players real responsibilities", "Observe behaviour beyond drills"] },
  { no: "003", place: "PRACTICE DESIGN", format: "COACHING PRINCIPLES", title: "Different regions, repeating problems", standfirst: "When an early solution replaces reading, redesign the practice so that perception cannot be skipped.", learn: ["Separate habit from understanding", "Ask what information players used", "Adapt the constraint before adding instruction"] },
  { no: "004", place: "GROUP SESSIONS", format: "SESSION ORGANISATION", title: "Scale changes the design problem", standfirst: "In a large group, clarity, court flow and staff roles become part of the learning environment.", learn: ["Design movement before content", "Reduce waiting and verbal overload", "Debrief the operating system"] },
];


export default function FieldNotesPage() {
  return <InnerPage index="02" kicker="JAPAN FIELD NOTES" title={<>The court is<br />our research desk.</>} intro="Practical coaching principles from RBA. These summaries discuss programme design; they are not reports of specific events." next={{ label: "Explore collaboration", href: "/work-with-rba" }}>
    <section className="field-ledger section-pad">
      {notes.map(note => <article key={note.no} className="ledger-entry"><div className="ledger-no">{note.no}</div><div className="ledger-body"><p className="note-tag">{note.place} · {note.format}</p><h2>{note.title}</h2><p className="standfirst">{note.standfirst}</p><div className="learning-list"><p>WHAT WE CARRY FORWARD</p>{note.learn.map(item => <span key={item}>{item}</span>)}</div></div></article>)}
    </section>
    <section className="editorial-method section-pad"><div><p className="section-index inverse">THE EDITORIAL METHOD</p><h2>One practice.<br />Seven useful outputs.</h2></div><ol><li>Field note</li><li>60-second film</li><li>Photo sequence</li><li>Audio reflection</li><li>Three coaching insights</li><li>Email dispatch</li><li>Partner case study</li></ol></section>
  </InnerPage>;
}
