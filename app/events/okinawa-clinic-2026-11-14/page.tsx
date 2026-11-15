import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import styles from "@/components/okinawa-clinic.module.css";

const japanesePage = "/ja/events/okinawa-clinic-2026-11-14";

export const metadata: Metadata = {
  title: "Completed | RBA Okinawa Youth Basketball Clinic, 14 November 2026",
  description: "Archive of RBA's completed Okinawa youth basketball clinic on 14 November 2026. Registration is closed. Read the event record and find future opportunities.",
  alternates: {
    canonical: "https://riotbasketballacademy.com/events/okinawa-clinic-2026-11-14",
    languages: {
      en: "https://riotbasketballacademy.com/events/okinawa-clinic-2026-11-14",
      ja: "https://riotbasketballacademy.com/ja/events/okinawa-clinic-2026-11-14"
    }
  }
};

export default function OkinawaClinicEnglishPage() {
  return <SiteFrame locale="en"><main className={styles.page} lang="en">
    <section className={styles.hero}>
      <div>
        <p className={styles.eyebrow}>RIOT BASKETBALL ACADEMY / OKINAWA / EVENT ARCHIVE</p>
        <h1>Thank you, Okinawa.<br />The clinic has concluded.</h1>
        <p className={styles.date}>Saturday, 14 November 2026<br />4:00–7:00 PM Japan time</p>
        <p className={styles.lead}>Our 14 November 2026 youth basketball clinic has taken place. Thank you to the players, families and local community. Registration for this event is now closed. We hope the experiences from the court will continue to support each player&apos;s learning.</p>
        <a className={styles.button} href="/opportunities">Explore future programmes →</a>
        <p style={{ fontSize: 14, marginTop: 18 }}><a href={japanesePage} style={{ color: "inherit", textDecoration: "underline" }}>Japanese event archive →</a></p>
      </div>
      <aside className={styles.ticket}>
        <p className={styles.eyebrow}>COMPLETED EVENT / 14 NOV 2026</p>
        <dl>
          <dt>Age groups</dt><dd>Japanese elementary Grade 4 through junior high Grade 3</dd>
          <dt>Venue</dt><dd>Irabu Elementary School, Tomigusuku City, Okinawa</dd>
          <dt>Date</dt><dd>14 November 2026, 4:00–7:00 PM JST</dd>
          <dt>Original fee</dt><dd>JPY 3,300 per player, tax included</dd>
        </dl>
        <p className={styles.fine}>Historical event information only. There is no new registration or payment for this completed clinic.</p>
      </aside>
    </section>

    <section className={styles.section}>
      <h2>Learning beyond the event.</h2>
      <div className={styles.grid}>
        <article className={styles.card}><span className={styles.number}>01 / MOVEMENT</span><h3>Stopping, turning and balance</h3><p>Physical foundations for reacting to pressure and keeping control of the ball.</p></article>
        <article className={styles.card}><span className={styles.number}>02 / SHOOTING</span><h3>Finishing in context</h3><p>Connecting shooting and finishing to defenders, teammates and available space.</p></article>
        <article className={styles.card}><span className={styles.number}>03 / DECISIONS</span><h3>See, choose, play</h3><p>Testing choices through small-sided basketball and reflecting on what to try next.</p></article>
      </div>
      <p className={styles.fine}>These are the event&apos;s announced learning themes, not a claim that every activity was completed exactly as described.</p>
      <p><a href="/ja/after-clinic">Post-clinic reflection resource (Japanese) →</a></p>
    </section>

    <section className={styles.section}>
      <h2>Questions about the past event?</h2>
      <p>For matters concerning your existing registration, payment, attendance or personal information, please contact RBA directly. If you have already paid, do not pay again.</p>
      <p><a href="mailto:riot.training.base@gmail.com?subject=Completed%20Okinawa%20Clinic%2014%20Nov%202026">Contact the RBA organiser →</a></p>
      <p className={styles.fine}>This event was independently organised by Riot Basketball Academy. It was not sponsored, endorsed or operated by Kadena Air Base, MCCS, USO, DoDEA, the U.S. military, or a basketball federation.</p>
    </section>
  </main></SiteFrame>;
}
