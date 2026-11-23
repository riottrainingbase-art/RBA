import Image from "next/image";
import { SiteFrame } from "@/components/site-frame";
import styles from "./international-coach-interest.module.css";

type Locale = "ja" | "en";
const formUrl = "https://form.jotform.com/263243162276051";

const content = {
  ja: {
    overline: "RBA / INTERNATIONAL COACH EDUCATION",
    title: "次のオンライン講習で、何を学びたいですか。",
    lead: "日本の指導者だけでなく、海外の指導者とも一緒に学べる講習を検討しています。内容や時間帯を決める前に、まずは皆さんの声を聞かせてください。",
    noticeTitle: "まだ募集開始ではありません",
    notice: "講師、開催日、料金、開催形式は決まっていません。今は無料の希望調査です。回答しても参加枠は確保されず、支払いや契約は発生しません。",
    button: "希望を伝える（無料・約2分）",
    whatTitle: "こんなことを伺います",
    what: ["どの国・地域で指導しているか", "どんなテーマを学びたいか", "参加しやすい時間帯と希望言語"],
    topicsTitle: "検討しているテーマの例",
    topics: ["練習した技術を、試合での判断につなげる", "味方との距離やボールを持たない動きをどう教えるか", "育成年代に合った練習とゲームの組み立て方"],
    topicsNote: "テーマは候補です。講師や講義内容を確約するものではありません。",
    contact: "今後のご案内は、受信を希望された成人の方にのみお送りします。不要になったらいつでも配信を停止できます。",
    nextTitle: "選手の国際交流を探している方へ",
    next: "RBA UNITEDは、講習会とは別の育成交流プログラムです。こちらも企画ごとに参加条件を確認してください。",
    unitedText: "RBA UNITEDについて",
    homeText: "無料のMY HOME COURTも見る",
    policyText: "プライバシー・利用方針",
    englishText: "Read in English",
    footer: "Riot Basketball Academy | 仙台から、日本各地と海外の指導者へ",
  },
  en: {
    overline: "RBA / INTERNATIONAL COACH EDUCATION",
    title: "What would you like to learn in our next online clinic?",
    lead: "We're exploring an online coaching session that brings together people working with young basketball players in Japan and overseas. Before setting the format, we'd like to hear what would actually help you in your coaching.",
    noticeTitle: "This is not a confirmed event",
    notice: "The speaker, date, fee and format have not been decided. This is a free, non-binding interest form. It does not reserve a place, involve payment or confirm a booking.",
    button: "Tell us what you need (free, about 2 minutes)",
    whatTitle: "We'll ask about",
    what: ["Where you coach", "The coaching questions you're working on", "Your preferred time and language"],
    topicsTitle: "A few topics we're considering",
    topics: ["Helping skills transfer from practice to games", "Teaching spacing, off-ball movement and better decisions", "Planning age-appropriate practices for young players"],
    topicsNote: "These are ideas, not a confirmed programme or a promise about the speaker.",
    contact: "We'll only send optional programme updates if you choose to receive them. You can opt out at any time.",
    nextTitle: "Looking for international playing opportunities?",
    next: "RBA UNITED is a separate programme for player exchanges and short-term team experiences. Each opportunity has its own eligibility and conditions.",
    unitedText: "Explore RBA UNITED",
    homeText: "Explore free MY HOME COURT",
    policyText: "Privacy and policies",
    englishText: "日本語で読む",
    footer: "Riot Basketball Academy | Connecting coaches from Japan and beyond",
  },
} as const;

export function InternationalCoachInterest({locale}: {locale: Locale}) {
  const t = content[locale];
  const isJa = locale === "ja";
  return <SiteFrame locale={locale}>
    <main className={styles.page} lang={locale}>
      <div className={styles.shell}>
        <header className={styles.hero}>
          <div className={styles.head}>
            <a href={isJa ? "/ja" : "/"} aria-label="Riot Basketball Academy">
              <Image src="/rba-logo-original.jpg" width={58} height={74} alt="Riot Basketball Academy official logo" className={styles.logo} />
            </a>
            <a className={styles.lang} href={isJa ? "/international-coach-education" : "/ja/international-coach-education"}>{t.englishText}</a>
          </div>
          <p className={styles.overline}>{t.overline}</p>
          <h1>{t.title}</h1>
          <p className={styles.lead}>{t.lead}</p>
          <a className={styles.primary} href={formUrl} target="_blank" rel="noopener noreferrer">{t.button}<span aria-hidden="true"> ↗</span></a>
          <p className={styles.caption}>{t.contact}</p>
        </header>

        <section className={styles.status} aria-labelledby="status-heading">
          <h2 id="status-heading">{t.noticeTitle}</h2>
          <p>{t.notice}</p>
        </section>

        <div className={styles.columns}>
          <section aria-labelledby="questions-heading">
            <h2 id="questions-heading">{t.whatTitle}</h2>
            <ul>{t.what.map(v => <li key={v}>{v}</li>)}</ul>
          </section>
          <section aria-labelledby="topics-heading">
            <h2 id="topics-heading">{t.topicsTitle}</h2>
            <ul>{t.topics.map(v => <li key={v}>{v}</li>)}</ul>
            <p className={styles.caption}>{t.topicsNote}</p>
          </section>
        </div>

        <section className={styles.more} aria-labelledby="united-heading">
          <h2 id="united-heading">{t.nextTitle}</h2>
          <p>{t.next}</p>
          <div className={styles.actions}>
            <a href={isJa ? "/ja/united" : "/united"}>{t.unitedText} →</a>
            <a href={isJa ? "/ja/my-homecourt" : "/my-homecourt"}>{t.homeText} →</a>
          </div>
        </section>

        <footer className={styles.footer}>
          <span>{t.footer}</span>
          <a href={isJa ? "/ja/policies" : "/policies"}>{t.policyText}</a>
        </footer>
      </div>
    </main>
  </SiteFrame>;
}
