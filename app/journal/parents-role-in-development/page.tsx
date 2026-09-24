import { JournalArticle, journalMetadata } from "@/components/journal-article";

export const metadata=journalMetadata(
  "The parent's role in youth basketball development | RBA Journal",
  "A practical guide to supporting a young basketball player without turning every ride home into coaching.",
  "parents-role-in-development"
);

export default function Page(){return <JournalArticle
  number="05"
  title="Support the player. You do not have to coach every moment."
  standfirst="Parents influence the development environment enormously. That influence can be powerful without becoming technical instruction after every practice and game."
  reading="5 MIN READ"
  asideTitle="HOME SHOULD STILL FEEL LIKE HOME"
  asideText="A child can have a coach at practice and still need a parent who is simply a parent afterwards."
  ctaTitle="Help the next conversation, not the next possession."
  ctaBody="RBA's parent resources focus on questions, environment, communication and choices that families can actually use."
  sections={[
    {heading:"Start with the player's experience",paragraphs:["After a game, adults often see tactical mistakes immediately. The player may be processing disappointment, excitement, fatigue or something completely different.","Before analysing, ask whether they want to talk and what stood out to them."]},
    {heading:"Separate support from sideline coaching",paragraphs:["Constant instructions from the stands can add another information source to an already complex game. It can also conflict with the team environment.","Support can be loud and positive without telling the player which pass, shot or defensive action to choose."]},
    {heading:"Watch the environment",paragraphs:["Parents do not need to control tactics to care about safety, respect, communication, workload and whether the child can ask questions.","Those are legitimate parts of choosing and evaluating a development environment."]},
    {heading:"Keep basketball in proportion",paragraphs:["Sleep, school, friends, family life, other interests and recovery all affect a young athlete. More basketball is not always the answer to every problem.","A sustainable relationship with the game is itself a long-term development outcome."]}
  ]}
/>}
