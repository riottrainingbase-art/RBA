import { JournalArticle, journalMetadata } from "@/components/journal-article";

export const metadata=journalMetadata(
  "See, decide, connect, adapt | RBA Journal",
  "The four ideas RBA uses to connect skill development with the decisions players make in real games.",
  "see-decide-connect-adapt"
);

export default function Page(){return <JournalArticle
  number="12"
  title="See. Decide. Connect. Adapt."
  standfirst="RBA does not treat skill as a collection of moves. We organise development around what players see, what they decide, how they connect with teammates and how they adapt when the picture changes."
  reading="5 MIN READ"
  asideTitle="RBA DEVELOPMENT LANGUAGE"
  asideText="A useful skill is not only something a player can perform. It is something they can select and execute at the right moment."
  ctaTitle="Want to experience the RBA approach?"
  ctaBody="Explore current clinics, camps and development opportunities, then choose the environment that matches the player's age and next challenge."
  sections={[
    {heading:"See before acting",paragraphs:["A player cannot make a useful decision without information. We want players to notice defenders, teammates, space, timing and the changing shape of the floor—not only the ball.","This is why many RBA activities begin with perception. The technical action still matters, but it sits inside a situation the player has to read."]},
    {heading:"Decide instead of waiting for the answer",paragraphs:["Youth players need repeated chances to choose. If every possession is solved from the sideline, the player can become good at following instructions without becoming better at reading the game.","Coaching can guide attention, create constraints and ask questions while still leaving the final decision with the player."]},
    {heading:"Connect with other players",paragraphs:["Basketball is not a sequence of isolated one-on-one actions. Spacing, timing, passing, cutting and communication create advantages together.","We therefore move quickly from individual work into two-player and small-sided situations where a skill has to connect to someone else."]},
    {heading:"Adapt when the first solution disappears",paragraphs:["Real games do not repeat perfectly. A defender changes coverage, a teammate moves early, a passing lane closes. Players need more than one rehearsed answer.","Adaptability grows when practice contains variation, decisions and consequences. The goal is not chaos. It is learning to solve the next version of the problem."]}
  ]}
/>}
