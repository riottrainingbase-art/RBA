import { JournalArticle, journalMetadata } from "@/components/journal-article";

export const metadata=journalMetadata(
  "Why small-sided games matter in youth basketball | RBA Journal",
  "Why 1-on-1, 2-on-2, 3-on-3 and 4-on-4 are central tools in RBA youth development.",
  "why-small-sided-games-matter"
);

export default function Page(){return <JournalArticle
  number="11"
  title="Why small-sided games matter."
  standfirst="Small-sided games are not a break from skill development. They are one of the clearest ways to connect technique, perception, decision-making and competition."
  reading="5 MIN READ"
  asideTitle="MORE RELEVANT REPETITIONS"
  asideText="Fewer players can mean more touches, more decisions and more responsibility on every possession."
  ctaTitle="Train the skill inside the game."
  ctaBody="RBA clinics and camps use small-sided games to help players recognise when and why a skill becomes useful."
  sections={[
    {heading:"More involvement per player",paragraphs:["In five-on-five, a young player can spend long stretches without touching the ball or making a meaningful decision. Smaller games increase involvement.","More involvement does not automatically mean better learning, but it gives coaches more opportunities to observe and players more opportunities to act."]},
    {heading:"The reads become easier to see",paragraphs:["Removing some players reduces the amount of information without removing the essential basketball problem. A two-on-two can make help defence, spacing and timing easier to notice.","This allows the coach to simplify the picture while keeping the decision real."]},
    {heading:"Skills gain context",paragraphs:["A crossover in isolation is different from a crossover used because a defender takes away the first lane. A pass becomes meaningful when a teammate's movement and a defender's position create the window.","Small-sided games let technical work return quickly to the environment where it has to function."]},
    {heading:"Competition can stay purposeful",paragraphs:["Score, time, space and rules can create pressure without turning every exercise into a full game. Coaches can adjust constraints to emphasise a development theme.","The objective is not to make practice complicated. It is to create enough realism that players must see, decide and adapt."]}
  ]}
/>}
