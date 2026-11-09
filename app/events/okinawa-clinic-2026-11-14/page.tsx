import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import styles from "@/components/okinawa-clinic.module.css";

const englishForm = "https://form.jotform.com/263071750683055";
const japanesePage = "/ja/events/okinawa-clinic-2026-11-14";

export const metadata: Metadata = {
  title: "Okinawa Youth Basketball Clinic | November 14, 2026 | RBA",
  description: "English information and no-payment pre-registration for RBA&apos;s independent youth basketball clinic in southern Okinawa on Nov 14, 2026. JPY 3,300 per player; venue approved at Irabu Elementary School in Tomigusuku City; arrival and parking details shared privately; no payment via English enquiry.",
  alternates: {
    canonical: "https://riotbasketballacademy.com/events/okinawa-clinic-2026-11-14",
    languages: { en: "https://riotbasketballacademy.com/events/okinawa-clinic-2026-11-14", ja: "https://riotbasketballacademy.com/ja/events/okinawa-clinic-2026-11-14" }
  },
};

export default function OkinawaClinicEnglishPage() {
  return <SiteFrame locale="en"><div className={styles.page} lang="en">
    <section className={styles.hero}>
      <div>
        <p className={styles.eyebrow}>RIOT BASKETBALL ACADEMY / OKINAWA</p>
        <h1>Learn it.<br />Use it in the game.</h1>
        <p className={styles.date}>Saturday, November 14, 2026<br />4:00–7:00 PM JST</p>
        <p className={styles.lead}>Three hours of basketball development for young players. Work on stopping, turning, balance, shooting, finishing and choosing the right play against a defender. Independent participation is welcome.</p>
        <a className={styles.button} href={englishForm} target="_blank" rel="noopener noreferrer">English pre-registration enquiry →</a>
        <p style={{fontSize:14,marginTop:18}}>No payment is collected at this stage. This form does not reserve a confirmed place.</p>
      </div>
      <aside className={styles.ticket}>
        <p className={styles.eyebrow} style={{color:"#587344"}}>RBA OKINAWA CLINIC</p>
        <dl>
          <dt>Eligible</dt><dd>Japanese elementary Grade 4 through junior high Grade 3<br/><small>Roughly U.S. school grades 4–9; RBA confirms eligibility individually</small></dd>
          <dt>Players</dt><dd>Boys and girls</dd>
          <dt>Capacity</dt><dd>50 announced; current availability not confirmed</dd>
          <dt>Venue</dt><dd>Irabu Elementary School, Tomigusuku City<br/><small>Arrival, drop-off and parking instructions are provided privately</small></dd>
          <dt>When</dt><dd>November 14 (Sat)<br/>4:00–7:00 PM Japan time</dd>
        </dl>
        <div className={styles.price}>¥3,300 <small>per player, tax included</small></div>
        <p className={styles.fine}>This is the advertised participation fee, not a payment request. The venue has been approved for use. Arrival and parking instructions are shared privately. Payment is not collected through this enquiry.</p>
      </aside>
    </section>

    <section className={styles.section}>
      <h2>Build decisions, not just drills.</h2>
      <div className={styles.grid}>
        <article className={styles.card}><span className={styles.number}>01 / MOVEMENT</span><h3>Stop, turn and balance</h3><p>Find a better base for playing against pressure while controlling your body and the ball.</p></article>
        <article className={styles.card}><span className={styles.number}>02 / SCORING</span><h3>Shooting and finishing</h3><p>Connect the skill of shooting and finishing to the defender, space and game situation.</p></article>
        <article className={styles.card}><span className={styles.number}>03 / GAME IQ</span><h3>See, choose and play</h3><p>Practice your decisions in 1-on-1, 2-on-2 and other small-sided games.</p></article>
      </div>
      <p className={styles.fine}>Exercises and groups may be adjusted based on age, experience, participants and safety considerations.</p>
    </section>

    <section className={styles.section} id="english-enquiry">
      <h2>English pre-registration in three simple steps</h2>
      <div className={styles.grid}>
        <article className={styles.card}><span className={styles.number}>STEP 1</span><h3>Send an enquiry</h3><p>A parent or legal guardian enters the enquiry in English. No credit card, military ID or child&apos;s full date of birth is needed.</p></article>
        <article className={styles.card}><span className={styles.number}>STEP 2</span><h3>Receive the confirmed arrangements</h3><p>RBA contacts the guardian privately with the confirmed venue arrangements, participation conditions and payment procedure. An enquiry alone does not secure a seat.</p></article>
        <article className={styles.card}><span className={styles.number}>STEP 3</span><h3>Confirm your place</h3><p>Follow RBA&apos;s final instructions and any applicable payment and consent steps. Do not pay or make non-refundable travel plans based only on preliminary information.</p></article>
      </div>
      <div className={styles.form} style={{marginTop:24}}>
        <h3>English enquiry form</h3>
        <p>This off-base activity is independently run by Riot Basketball Academy. It is <strong>not sponsored, endorsed, or run by Kadena Air Base, MCCS, USO, DoDEA, the U.S. military, or any basketball association.</strong> No base access is offered or required by RBA.</p>
        <p><a className={styles.button} href={englishForm} target="_blank" rel="noopener noreferrer">Open English pre-registration form ↗</a></p>
        <p className={styles.fine}>For the existing Japanese RBA ID registration, please use <a href={japanesePage}>the Japanese registration page</a>. These are separate enquiry routes; RBA will reconcile any duplicates manually. Please do not register the same athlete repeatedly.</p>
      </div>
    </section>

    <section className={styles.section}>
      <h2>For families</h2>
      <details className={styles.details} open><summary>Where exactly is the clinic?</summary><p>The clinic will take place at Irabu Elementary School in Tomigusuku City, Okinawa. RBA has confirmed formal permission to use the venue. Exact arrival location, building access, drop-off arrangements and parking rules are shared privately with participating families; do not assume parking is available until instructions are provided.</p></details>
      <details className={styles.details}><summary>Does the enquiry reserve a place or charge me?</summary><p>No. The English form records your interest and contact details. It does not collect money or issue a confirmed reservation. RBA will contact you with the private venue arrangements and final participation and payment instructions.</p></details>
      <details className={styles.details}><summary>What do I bring?</summary><p>Plan for indoor basketball shoes, sports clothing, water and a towel. Final arrival and drop-off details, and whether to bring a basketball, will be provided by RBA.</p></details>
      <details className={styles.details}><summary>Cancellation, refunds, photos and privacy</summary><p>Review <a href={japanesePage}>the currently published event conditions</a> and <a href="/policies">RBA&apos;s policies</a> before payment. Ask RBA for an English explanation of any terms you do not understand. Media consent is optional. Do not include medical records or military identification in the enquiry form.</p></details>
      <p>Questions: <a href="mailto:riot.training.base@gmail.com?subject=Nov%2014%20Okinawa%20Clinic%20English%20Enquiry">riot.training.base@gmail.com</a></p>
      <p className={styles.fine}>Organizer: Riot Basketball Academy (RBA), Japan.</p>
    </section>
  </div></SiteFrame>;
}
