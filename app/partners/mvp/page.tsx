import type { Metadata } from "next";
import Link from "next/link";
import { PartnerHeader } from "@/components/mvp/partner-header";
import { mvpLoginPath } from "@/lib/mvp-partner";
import styles from "@/components/mvp/partner.module.css";
export const metadata: Metadata = { title: "MVP Coaches’ Room | RBA × MVP", description: "Read coaching resources, ask RBA questions and share practice ideas with MVP coaches. Sign in with your free RBA ID.", robots: { index: false, follow: false } };
export default function Page() {
  return <main className={styles.shell}><div className={styles.wrap}><PartnerHeader />
    <section className={styles.hero}><p className={styles.eyebrow}>RBA × MVP · EXCLUSIVELY FOR OUR PARTNER COACHES</p><h1>MVP Coaches’ Room</h1><p className={styles.lead}>Read coaching resources. Ask RBA a question.<br />Share practice ideas with your MVP coaching team.</p><Link className={styles.primary} href={mvpLoginPath}>Sign in / Create your free RBA ID →</Link><p className={styles.muted}>New and existing members use the same button. No password or payment needed.</p></section>
    <section className={styles.section} aria-labelledby="inside-title"><h2 id="inside-title">What can I do here?</h2><div className={styles.benefits}>
      <article className={styles.card}><span className={styles.number}>01</span><h3>Read & learn</h3><p>Find English coaching resources and simple practice ideas for your next session.</p></article>
      <article className={styles.card}><span className={styles.number}>02</span><h3>Ask & reply</h3><p>Post a coaching question. RBA and approved MVP coaches can reply on the same page.</p></article>
      <article className={styles.card}><span className={styles.number}>03</span><h3>Share & improve</h3><p>Tell the team what you tried, what happened and what you would change next time.</p></article>
    </div></section>
    <section className={styles.section} aria-labelledby="start-title"><h2 id="start-title">First time? Follow these 3 steps.</h2><ol className={styles.joinSteps}>
      <li><strong>Sign in by email</strong><p>Use the button above, enter your own email and open the latest RBA sign-in email. COACH is already selected.</p></li>
      <li><strong>Request MVP access</strong><p>You return to the MVP room. Enter your name and submit your request. Wong or Masato will review it.</p></li>
      <li><strong>Come back after approval</strong><p>Open this page again and sign in. Choose <strong>Ask & discuss</strong> to post, or <strong>Read & learn</strong> for resources.</p></li>
    </ol><p className={styles.muted}>Already approved? Sign in to go straight to your coach room.</p></section>
    <section className={styles.help} aria-labelledby="help-title"><h2 id="help-title">Need help?</h2>
      <details><summary>I cannot find the sign-in email.</summary><p>Check spam or junk. If you request another link, use the newest email. Open the link in Safari or Chrome rather than inside WhatsApp.</p></details>
      <details><summary>My page says “Waiting for approval”.</summary><p>Your RBA ID is ready, but MVP access has not been approved yet. Ask Wong or Masato to check your request, then press “Check approval” in the room.</p></details>
      <details><summary>Who can see my questions?</summary><p>Only approved MVP and RBA coaches can read the discussion board. Your coaching name and posts are visible to this group. Keep player details anonymous.</p></details>
      <p><a href="mailto:riot.training.base@gmail.com?subject=MVP%20coach%20access">Email Masato for help ↗</a></p>
    </section>
    <footer className={styles.footer}><p><strong>MVP Basketball Academy · Malaysia × Riot Basketball Academy · Japan</strong></p><p>Working together on player development, coach education, practice planning and Japan–Malaysia exchange.</p><p>This coach room is free. Workshops, visits and other projects are agreed separately.</p><Link href="/policies">Terms & privacy</Link></footer>
  </div></main>;
}
