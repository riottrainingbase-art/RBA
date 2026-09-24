import { JournalArticle, journalMetadata } from "@/components/journal-article";

export const metadata=journalMetadata(
  "Playing time and youth development | RBA Journal",
  "Why playing time is not the only measure of development, but meaningful game experience still matters.",
  "playing-time-and-development"
);

export default function Page(){return <JournalArticle
  number="09"
  title="Playing time is not everything. Experience still matters."
  standfirst="Youth development is more complex than counting minutes. But players also need real opportunities to make decisions, fail, adjust and test what they have practised."
  reading="5 MIN READ"
  asideTitle="PRACTICE NEEDS A PLACE TO LAND"
  asideText="If learning never reaches a real game situation, some of the most important parts of basketball remain untested."
  ctaTitle="Create development opportunities, not promises."
  ctaBody="RBA programmes use small-sided games, competition and varied roles to increase the number of meaningful decisions young players can experience."
  sections={[
    {heading:"Minutes alone do not tell the whole story",paragraphs:["Two players can play the same number of minutes and have very different experiences. Role, responsibility, opponent, game context and feedback all matter.","This is why development should not be reduced to a single number."]},
    {heading:"But game experience has unique value",paragraphs:["Games expose timing, pressure, uncertainty and consequences in a way that isolated practice cannot fully reproduce. Players learn what they notice when tired, what they choose under pressure and how quickly they recover from a mistake.","Those experiences are part of development, not a reward that only begins after development is complete."]},
    {heading:"A pathway should be understandable",paragraphs:["Not every player will have the same role at the same time. The important question is whether the player can understand what they are working toward and where the next opportunity may come from.","Vague messages such as 'get better first' are less useful than specific expectations and opportunities to test improvement."]},
    {heading:"Development environments can create more chances",paragraphs:["Small-sided games, second units, mixed roles, development games and targeted competition can all increase meaningful participation without pretending every setting has identical objectives.","The design question is simple: how often does each player get to make basketball decisions that matter?"]}
  ]}
/>}
