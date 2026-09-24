import { JournalArticle, journalMetadata } from "@/components/journal-article";

export const metadata=journalMetadata(
  "A basketball clinic should change the next practice | RBA Journal",
  "How players can turn a one-day basketball clinic into something useful in their normal training environment.",
  "clinic-to-next-practice"
);

export default function Page(){return <JournalArticle
  number="08"
  title="A clinic should change the next practice."
  standfirst="A clinic can be exciting and still disappear by Monday. The real value begins when a player takes one idea back to their normal court and tests it again."
  reading="4 MIN READ"
  asideTitle="DO NOT COLLECT MOVES"
  asideText="The goal after a clinic is not to remember everything. It is to carry one useful idea into the next real situation."
  ctaTitle="Take one thing home."
  ctaBody="RBA clinics are designed to connect learning with decisions, reflection and the next opportunity to practise."
  sections={[
    {heading:"Choose one idea, not ten",paragraphs:["A full clinic may include footwork, finishing, passing, shooting, small-sided games and competition. Trying to retain every detail usually leads to retaining very little.","Before leaving, choose one idea that felt useful, difficult or different."]},
    {heading:"Connect the idea to a situation",paragraphs:["Instead of writing 'work on finishing', identify the situation: finishing when the help defender arrives early, or finishing after changing pace.","Situations make it easier to recognise the learning again in normal practice."]},
    {heading:"Test it quickly",paragraphs:["The next team practice is not a final exam. It is a chance to look for the situation and attempt the new solution.","Even one unsuccessful attempt can provide more useful information than waiting until the skill feels perfect."]},
    {heading:"Reflect before adding more",paragraphs:["After trying it, ask what changed. Did you see the defender earlier? Was the timing different? What still felt difficult?","This turns a one-day clinic into a small development cycle rather than another event collected on a calendar."]}
  ]}
/>}
