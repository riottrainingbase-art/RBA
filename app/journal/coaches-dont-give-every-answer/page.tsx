import { JournalArticle, journalMetadata } from "@/components/journal-article";

export const metadata=journalMetadata(
  "Coaches do not need to give every answer | RBA Journal",
  "How youth coaches can guide attention and learning without solving every basketball decision from the sideline.",
  "coaches-dont-give-every-answer"
);

export default function Page(){return <JournalArticle
  number="06"
  title="Coaches do not need to give every answer."
  standfirst="Instruction has a place. But if the coach solves every possession, players may become dependent on information that will not be available when the game changes."
  reading="5 MIN READ"
  asideTitle="COACH THE ATTENTION"
  asideText="A useful question can direct a player's eyes without taking the decision away from them."
  ctaTitle="Design situations players have to solve."
  ctaBody="RBA coach education connects practice design, observation, decision-making and reflection."
  sections={[
    {heading:"Instruction is not the enemy",paragraphs:["Players need explanations, demonstrations and clear boundaries. The issue is not whether a coach should ever tell a player what to do.","The question is how much information is needed now, and what the player should learn to recognise independently."]},
    {heading:"Ask questions that point to information",paragraphs:["Questions such as 'Where was the help defender?' or 'What changed after the screen?' direct attention toward the game.","A useful question is specific enough to guide learning but open enough that the player still has to think."]},
    {heading:"Practice design can teach without a speech",paragraphs:["Court size, numbers, scoring rules, time limits and starting positions can change what players need to notice.","Well-designed constraints create repeated opportunities to experience a problem rather than only hearing about it."]},
    {heading:"Observe what transfers",paragraphs:["A drill can look clean because the answer is known. Transfer becomes clearer when the picture changes and the player still selects an effective solution.","Coaches should therefore observe not only whether a movement was performed correctly, but whether the player recognised when it was useful."]}
  ]}
/>}
