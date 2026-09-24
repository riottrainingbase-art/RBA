import { JournalArticle, journalMetadata } from "@/components/journal-article";

export const metadata=journalMetadata(
  "International basketball exchange should widen choices | RBA Journal",
  "Why RBA treats international basketball exchange as a development opportunity rather than a status symbol.",
  "international-exchange-widen-choices"
);

export default function Page(){return <JournalArticle
  number="07"
  title="International exchange should widen choices."
  standfirst="Going overseas is not automatically development. The value comes from what a player sees, who they meet, what assumptions are challenged and what they bring back."
  reading="5 MIN READ"
  asideTitle="TRAVEL IS NOT THE OUTCOME"
  asideText="A passport stamp does not make a player better. A useful exchange creates new information, relationships and questions."
  ctaTitle="Build a development reason before a travel plan."
  ctaBody="RBA works with partners in Asia to create exchanges where the basketball purpose comes before the itinerary."
  sections={[
    {heading:"Different environments reveal different assumptions",paragraphs:["Players often think their normal training environment is simply 'how basketball works'. Meeting different coaches, teammates and styles can show them that many solutions exist.","The objective is not to decide which country is best. It is to widen the player's reference points."]},
    {heading:"Competition is only one part",paragraphs:["An international visit can include practice, small-sided games, conversations with local players, observation and cultural experience. A meaningful programme does not need to maximise the number of games.","More activity is not always more learning. Space to reflect matters."]},
    {heading:"Families need clarity before travel",paragraphs:["Supervision, accommodation, insurance, transport, communication, costs and the role of each organisation should be clear before anyone books travel.","Good international work depends on operational trust as much as basketball content."]},
    {heading:"The return home matters",paragraphs:["A useful exchange should leave a next question: what did the player notice, what changed, and what will they try differently?","Without a second step, even an impressive trip can become only a memory."]}
  ]}
/>}
