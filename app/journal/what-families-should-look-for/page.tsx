import { JournalArticle, journalMetadata } from "@/components/journal-article";

export const metadata=journalMetadata(
  "What families should look for in a youth basketball environment | RBA Journal",
  "A practical public guide to evaluating a youth basketball team, club, clinic or development environment.",
  "what-families-should-look-for"
);

export default function Page(){return <JournalArticle
  number="10"
  title="What should families look for in a development environment?"
  standfirst="Results and reputation are easy to see. The daily environment is harder to evaluate—and often matters more for a young player's long-term relationship with the game."
  reading="6 MIN READ"
  asideTitle="LOOK BEYOND THE SCOREBOARD"
  asideText="A strong youth environment should help a player learn, participate, ask questions, make mistakes and understand what comes next."
  ctaTitle="Choose the environment, not only the name."
  ctaBody="Before joining any programme, families can observe the actual practice, ask clear questions and compare what is promised with what players experience."
  sections={[
    {heading:"Listen to how adults respond to mistakes",paragraphs:["Mistakes are unavoidable in development. Watch what happens immediately after one. Does the player receive information they can use, or only embarrassment and fear?","A demanding environment can still be respectful. High standards and personal dignity are not opposites."]},
    {heading:"Ask how players get game experience",paragraphs:["Equal minutes in every game are not the only possible model. But families should understand how a programme thinks about participation, roles and opportunities to apply learning.","If a player is currently outside the main rotation, there should still be a visible path for learning and meaningful experience."]},
    {heading:"Notice whether questions are welcome",paragraphs:["Young players gradually need to understand their own game. An environment where they can ask what to improve, why a task matters or what they saw on a possession can support that process.","The same applies to families. Clear channels for practical questions reduce confusion and unnecessary conflict."]},
    {heading:"Check the invisible costs",paragraphs:["The monthly fee is only one part of participation. Travel, equipment, volunteer duties, weekend commitments and family logistics all affect whether an environment is sustainable.","A good fit is not simply the most prestigious option. It is an environment the player and family can realistically continue."]}
  ]}
/>}
