import { ArrowRight, BookOpenCheck, ClipboardCheck, Globe2, ShieldCheck } from "lucide-react";
import { SiteFrame } from "./site-frame";
import styles from "./japan-experience.module.css";

const quickFit = "https://form.jotform.com/263221936704052";
const detailedIntake = "https://form.jotform.com/263218488425060";

const services = [
  {
    code: "01 / JAPAN",
    name: "JAPAN TEAM DEVELOPMENT",
    summary: "Bring your youth basketball team to Japan for purposeful RBA-led training. Friendly games with Japanese teams and joint sessions may be explored only after host and venue confirmation.",
    format: "Japan-based half-day or multi-session coaching programme",
    outputs: "Needs review, age-appropriate on-court plan, RBA coaching, post-session reflection",
    buyer: "Visiting academies, schools, clubs and international youth groups",
    caveat: "Opponents, courts, staffing and dates must be confirmed separately. Flights, accommodation and regulated travel arrangements are not sold or guaranteed by RBA."
  },
  {
    code: "02 / YOUR ACADEMY",
    name: "ACADEMY DEVELOPMENT ADVISORY",
    summary: "Support your own coaches in building an age-appropriate development environment—not just adding more isolated drills.",
    format: "Programme review, remote coaching pilot or local-hosted clinic",
    outputs: "Needs assessment, practice-design feedback, coach dialogue, agreed next actions",
    buyer: "Academy owners, school sports directors and club technical leads",
    caveat: "In-person overseas visits depend on travel, local safeguarding and language resources. No federation accreditation or performance outcome is promised."
  },
  {
    code: "03 / ONLINE",
    name: "GLOBAL COACH EDUCATION",
    summary: "Work on decisions, spacing, representative learning tasks, practice design, youth workload and how coaches evaluate a session.",
    format: "Private online coach workshop, video-review session or longer mentoring",
    outputs: "Agreed workshop, practical tasks and follow-up reflection; recordings only with consent",
    buyer: "Club coaches, coaching departments and youth sport educators",
    caveat: "Sessions, capacity, delivery language, video rights and fees are individually agreed. This is not a FIBA-endorsed qualification."
  }
] as const;

export function GlobalServicesLanding() {
  return (
    <SiteFrame locale="en" languagePage="international">
      <main className={styles.page}>
        <section className={styles.hero}>
          <a className={styles.breadcrumb} href="/international">← RBA INTERNATIONAL</a>
          <span className={styles.kicker}>RIOT BASKETBALL ACADEMY / GLOBAL SERVICES</span>
          <h1>BETTER BASKETBALL. REAL CONNECTIONS.</h1>
          <p>Japan-based youth development, international team exchange and coach education. A practical partner for academies and organisations that want learning—not a generic sports tour.</p>
          <div className={styles.actions}>
            <a className={styles.primary} href={quickFit} target="_blank" rel="noopener noreferrer">Start free 90-second fit check <ArrowRight size={17}/></a>
            <a className={styles.secondary} href="#programmes">Explore three services</a>
          </div>
          <p style={{fontSize:13,marginTop:4}}>FREE FIRST ENQUIRY · NO BOOKING · NO PAYMENT · NO CHILDREN'S PERSONAL DETAILS</p>
        </section>

        <section className={styles.section} id="programmes">
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>01 / THREE WAYS TO WORK WITH RBA</span>
            <h2>Choose the problem you want to solve.</h2>
            <p>Start with your organisation's needs, ages, timetable and learning goals. We only propose what we can check and safely deliver.</p>
          </div>
          <div className={styles.cards}>
            {services.map(service=><article className={styles.card} key={service.code}>
              <span className={styles.cardNo}>{service.code}</span>
              <h3>{service.name}</h3>
              <p>{service.summary}</p>
              <p style={{marginTop:18}}><strong>FORMAT</strong><br/>{service.format}</p>
              <p style={{marginTop:12}}><strong>DELIVERABLE</strong><br/>{service.outputs}</p>
              <p style={{marginTop:12}}><strong>FOR</strong><br/>{service.buyer}</p>
              <p style={{marginTop:12,fontSize:12}}><strong>CONDITIONS</strong><br/>{service.caveat}</p>
            </article>)}
          </div>
        </section>

        <section className={`${styles.section} ${styles.light}`}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>02 / EXPERIENCE, NOT EMPTY CLAIMS</span>
            <h2>Grounded in real courts.</h2>
            <p>RBA has documented local Japanese youth development activity, Japan–Taiwan programmes involving SPARTANS, and seven clinics including coach education in Penang, Malaysia (16–18 October 2026). Future services are designed individually; those records do not guarantee new dates or hosts.</p>
          </div>
          <div className={styles.cards}>
            <article className={styles.card}><span className={styles.cardNo}>JAPAN</span><h3>On-court development</h3><p>Sessions designed for the age, game context and decisions players face—not a list of flashy moves.</p></article>
            <article className={styles.card}><span className={styles.cardNo}>TAIWAN</span><h3>Cross-border learning</h3><p>Japan–Taiwan basketball exchange has already been part of RBA's work with partner organisations.</p></article>
            <article className={styles.card}><span className={styles.cardNo}>MALAYSIA</span><h3>Coach education in practice</h3><p>Penang clinics demonstrate RBA's ability to work with an overseas local host. New delivery remains subject to availability.</p></article>
          </div>
          <p className={styles.note}>Read the <a href="/taiwan" style={{textDecoration:"underline"}}>Japan–Taiwan programme record</a> and <a href="/international/japan-experience" style={{textDecoration:"underline"}}>Japan visit overview</a>.</p>
        </section>

        <section className={`${styles.section} ${styles.dark}`}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>03 / FROM ENQUIRY TO AGREEMENT</span>
            <h2>One clear next step at a time.</h2>
          </div>
          <div className={styles.stepList}>
            <div className={styles.step}><b>01 / FREE</b><h3>Start with 90 seconds.</h3><p>Share an adult contact, organisation, country and service interest. No player details, budget or travel plans are required at this first stage.</p></div>
            <div className={styles.step}><b>02 / REVIEW</b><h3>Check feasibility.</h3><p>We reply when the request fits. Interested organisations may then complete a <a href={detailedIntake} target="_blank" rel="noopener noreferrer" style={{textDecoration:"underline"}}>detailed programme brief</a>; RBA checks dates, staffing, safeguarding, language and host capacity.</p></div>
            <div className={styles.step}><b>03 / WRITTEN QUOTE</b><h3>Agree the actual service.</h3><p>A tailored proposal states scope, deliverables, provider roles, tax treatment, price, payment schedule and cancellation terms.</p></div>
            <div className={styles.step}><b>04 / CONFIRMED</b><h3>Pay only after agreement.</h3><p>Only after written acceptance and required checks will RBA send an individual invoice/payment instruction and coordinate delivery.</p></div>
          </div>
          <div className={styles.notice}><ShieldCheck size={18}/><strong>TRAVEL, INTERNATIONAL MATCH & YOUTH SAFETY:</strong> RBA provides basketball instruction and lawful coordination, not an unlicensed package tour. Flights, accommodation, buses and regulated travel arrangements must be contracted through appropriately registered providers when required. Opponents, facilities, visas, travel and school placements are never guaranteed. Supervising adults, consent, insurance, language and emergency contacts must be agreed before confirming any youth activity. For Japan international matches involving JBA-registered teams, the JBA requires advance permission through the applicable prefectural association; the published guidance sets a one-month-ahead submission deadline. The responsible host must verify the current rules and match category before any games are announced. <a href="https://www.japanbasketball.jp/jba/kitei/" target="_blank" rel="noopener noreferrer" style={{textDecoration:"underline"}}>JBA procedures</a>.</div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>04 / COMMERCIAL MODEL</span>
            <h2>Clear scope before any invoice.</h2>
            <p>Our services are quoted for each organisation and project, depending on programme length, group size, coaching scope, staffing, delivery language, location and local costs. The initial inquiry is free and does not hold a date. RBA does not take travel payments through this service form.</p>
          </div>
          <div className={styles.cards}>
            <article className={styles.card}><ClipboardCheck/><h3>Specific deliverables</h3><p>You'll know which coaching sessions, design work, review or advisory meetings you are paying for.</p></article>
            <article className={styles.card}><BookOpenCheck/><h3>Development first</h3><p>Age-appropriate learning and practical coach feedback are built into the proposal whenever appropriate.</p></article>
            <article className={styles.card}><Globe2/><h3>Cross-border clarity</h3><p>Separate the RBA instructional agreement from any licensed travel provider's obligations and invoices.</p></article>
          </div>
        </section>

        <section className={styles.cta}>
          <div>
            <span className={styles.kicker}>RBA GLOBAL / START HERE</span>
            <h2>Tell us what your academy needs.</h2>
            <p>One free enquiry covers team exchanges, international clinics, curriculum advisory and coach education. Adult professional contacts only. Riot Basketball Academy · Sendai, Japan · riot.training.base@gmail.com</p>
          </div>
          <div><a href={quickFit} target="_blank" rel="noopener noreferrer">Start free fit check ↗</a><p className={styles.note}>Ready with more details? <a href={detailedIntake} target="_blank" rel="noopener noreferrer" style={{display:"inline",width:"auto",padding:0,border:0,background:"none",color:"inherit",textDecoration:"underline",fontWeight:750}}>Open the detailed free proposal request</a>.</p><p className={styles.note}>No booking, payment, invoice or agreement is created by either form. Avoid non-refundable travel arrangements until confirmed by responsible suppliers.</p></div>
        </section>
      </main>
    </SiteFrame>
  );
}
