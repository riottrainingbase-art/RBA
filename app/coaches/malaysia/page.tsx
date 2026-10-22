import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { coachGroup, coachLoginPath, coachTopics } from "@/lib/coach-learning";
import styles from "@/components/coach-learning.module.css";

export const metadata: Metadata = {
  title: "Malaysia Coach Learning | RBA ID",
  description: "For coaches in Penang and Kuala Lumpur: create a free RBA ID, choose your topic and take one idea back to practice.",
  alternates: { canonical: "/coaches/malaysia" },
  openGraph: { title: "Keep learning after the clinic | RBA Malaysia", description: "Free RBA ID. English coaching resources. One idea for your next practice.", url: "/coaches/malaysia" },
};
export default async function Page({ searchParams }: { searchParams: Promise<{ group?: string }> }) {
  const group = coachGroup((await searchParams).group);
  if (group === "kuala-lumpur") redirect("/partners/mvp");
  const place = group === "penang" ? "Penang" : "Penang & Kuala Lumpur";
  return <main className={styles.shell}><div className={styles.wrap}>
    <header className={styles.top}><Link className={styles.brand} href="/"><Image src="/rba-logo-original.jpg" alt="RBA" width={35} height={49} /><span>RIOT BASKETBALL<br />ACADEMY</span></Link><Link href="/coaches">For coaches ↗</Link></header>
    <section className={styles.hero}><p className={styles.eyebrow}>MALAYSIA / COACH LEARNING / {place}</p><h1>Keep learning.<br />Bring it to your next practice.</h1><p className={styles.lead}>Thank you to the coaches who joined our work in Malaysia. This is your direct route to English coaching resources, practical ideas and the original references behind them.</p><a className={styles.cta} href={coachLoginPath(group)}>Create your free RBA ID / Sign in →</a><p className={styles.subtle}>Free access to this starter collection. No payment or team invite code is required. Existing members use the same email address.</p></section>
    <div className={styles.steps}>
      <article className={styles.step}><span className={styles.number}>01 / JOIN</span><h2>Use your own email</h2><p>Choose COACH and request a sign-in link. Open the latest email in your usual browser. The same form creates a new RBA ID or signs you in.</p></article>
      <article className={styles.step}><span className={styles.number}>02 / CHOOSE</span><h2>Find what you need</h2><p>After sign-in, you return directly to the coach library. Choose a topic, search the resources and save what you want to revisit.</p></article>
      <article className={styles.step}><span className={styles.number}>03 / APPLY</span><h2>Try one idea</h2><p>Read a resource, choose one simple coaching task and observe what changes. Tell RBA which topics you would like us to develop next.</p></article>
    </div>
    <section className={styles.section}><p className={styles.eyebrow}>WHAT YOU CAN FIND</p><h2>Start with your coaching question.</h2><div className={styles.grid}>{coachTopics.map(topic => <article className={styles.card} key={topic.id}><h3>{topic.title}</h3><p>{topic.question}</p></article>)}</div></section>
    <section className={styles.notice}><strong>What is included?</strong><p>RBA’s free English articles and original practice prompts, links to official FIBA/WABC resources, and a youth-development research reference. External resources open on their publishers’ websites; full-text availability is labelled. This starter collection does not enrol you in a paid programme.</p><p>Need help with sign-in? Check spam/junk, request one new link and use the latest email. If you are opening this from WhatsApp, use “Open in browser” first. <a href="mailto:riot.training.base@gmail.com?subject=Malaysia%20coach%20library%20access">Email RBA for help</a>.</p></section>
    <footer className={styles.footer}><p>Riot Basketball Academy · Masato Nishio</p><p><Link href="/policies">Terms & privacy</Link> · <Link href="/journal/coaches">Read the public coach journal</Link></p></footer>
  </div></main>;
}
