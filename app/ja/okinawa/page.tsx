import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import { GrowthClickTracking } from "@/components/growth-click-tracking";
import styles from "./page.module.css";

const FORM_URL = "https://form.jotform.com/262765305419057";
const EMAIL = "riot.training.base@gmail.com";
const FAMILY_EMAIL = "mailto:riot.training.base@gmail.com?subject=RBA%E6%B2%96%E7%B8%84%EF%BD%9C%E4%BC%9A%E5%93%A1%E3%83%BB%E4%BF%9D%E8%AD%B7%E8%80%85%E3%81%AE%E3%81%94%E7%9B%B8%E8%AB%87";
const FUTURE_EMAIL = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("GREAM OKINAWA｜新規参加・体験のご相談");
const PARTNER_EMAIL = "mailto:riot.training.base@gmail.com?subject=RBA%E6%B2%96%E7%B8%84%EF%BD%9C%E6%8C%87%E5%B0%8E%E3%83%BB%E4%BC%9A%E5%A0%B4%E3%83%BB%E5%9C%B0%E5%9F%9F%E5%8D%94%E5%8A%9B%E3%81%AE%E3%81%94%E7%9B%B8%E8%AB%87";

export const metadata: Metadata = {
  title: { absolute: "GREAM OKINAWA｜育成活動・会員案内・コーチ募集｜RBA" },
  description:
    "GREAM OKINAWAの育成方針、現在の活動の確認方法、今後の活動準備、コーチ・S&C・会場協力の相談窓口。新しい定期活動は会場・指導体制・参加条件が整ってからご案内します。",
  alternates: {
    canonical: "https://riotbasketballacademy.com/ja/okinawa",
    languages: {
      ja: "https://riotbasketballacademy.com/ja/okinawa",
      en: "https://riotbasketballacademy.com/okinawa",
      "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/okinawa",
      ko: "https://riotbasketballacademy.com/ko/okinawa",
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "GREAM OKINAWA｜沖縄に、学びが続くコートを。",
    description: "現在参加中のご家庭、これから参加を考える方、指導者・地域の協力者へ。活動ごとの確定条件と公式の相談先を案内します。",
    url: "https://riotbasketballacademy.com/ja/okinawa",
    siteName: "Riot Basketball Academy",
    type: "website",
    locale: "ja_JP",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
};

const currentStatus = [
  {
    eyebrow: "CURRENT MEMBERS",
    title: "参加中のご家庭",
    state: "個別のご案内を優先",
    description:
      "練習・大会など、現在参加している活動の予定や変更は、対象の会員・保護者に公式の連絡経路でご案内します。ウェブサイトに載っていない個別事項は本部へご相談ください。",
    href: "#members",
    link: "連絡・確認方法を見る",
  },
  {
    eyebrow: "REGULAR PROGRAMME",
    title: "新しい定期活動",
    state: "体制・条件を確認中",
    description:
      "指導者、体育館、安全管理、対象年代、活動日、料金の条件が揃った段階で正式にご案内します。このページからの相談だけで入会や参加が確定することはありません。",
    href: "#future",
    link: "募集開始までの流れ",
  },
  {
    eyebrow: "CLINICS / CAMPS",
    title: "単発クリニック・キャンプ",
    state: "各イベントごとに案内",
    description:
      "日程・会場・対象・参加費・申込条件は個別のイベントページが基準です。継続プログラムの準備状況とは別に確認できます。",
    href: "#activities",
    link: "開催情報を探す",
  },
] as const;

const standards = [
  {
    number: "01",
    label: "PLAYER FIRST",
    title: "選手が学び続けられること",
    body: "所属や経験にかかわらず、プレーを見て、判断し、試し、振り返る機会を大切にします。短期の勝敗だけで選手の可能性を決めません。",
  },
  {
    number: "02",
    label: "SAFE & RESPONSIBLE",
    title: "安全と責任を曖昧にしない",
    body: "活動前に指導・安全管理の担当、施設の利用条件、緊急連絡方法を確認します。安全を確保できない活動を無理に実施しません。",
  },
  {
    number: "03",
    label: "CLEAR COMMUNICATION",
    title: "大切な変更は保護者にも",
    body: "練習の変更・中止など、参加に直接関わる情報は対象のご家庭へ知らせます。確認中のことを決定事項のようには案内しません。",
  },
  {
    number: "04",
    label: "LOCAL × RBA",
    title: "沖縄の日常と、外への挑戦",
    body: "現地の指導者・地域の方と継続する育成の場を整え、RBAの県外・海外での学びや交流にもつなげていきます。",
  },
] as const;

const futureSteps = [
  ["01", "指導者と安全管理", "担当範囲、指導資格、本人の受諾、緊急時の対応を確認します。"],
  ["02", "会場・活動日程", "利用許可、日時、会場規約、交通・費用を確認します。"],
  ["03", "対象・会費・参加条件", "年齢、参加方法、料金、申込規約や変更・返金の条件を示します。"],
  ["04", "正式に募集を案内", "条件が整った活動から、対象の方に募集・体験の案内を公開します。"],
] as const;

const questions = [
  [
    "今参加している練習や大会はどう確認しますか？",
    "各活動についてすでに案内されている連絡経路で確認してください。変更・中止など必要な情報は、対象のご家庭に個別にお知らせします。確認できない場合はRBA本部へ活動名・日付を添えてご相談ください。",
  ],
  [
    "新しいGREAM沖縄の定期活動に申し込めますか？",
    "今後の活動は指導者・会場・安全管理・料金などの条件が整ったものから正式案内します。相談は可能ですが、相談だけで入会・体験日・大会参加・決済は確定しません。",
  ],
  [
    "会費・振替・返金について質問できますか？",
    "はい。対象の活動、月、日付、確認したい内容を本部へお知らせください。申込時の規約、実際の活動提供、支払記録を照合したうえで個別にご案内します。未確定の返金条件を一律に約束することはありません。",
  ],
  [
    "沖縄でコーチやトレーナーとして関われますか？",
    "育成年代の指導、アシスタント、S&C・身体づくりの補助について相談を受け付けています。役割、報酬、支払日、交通費、資格・安全条件は稼働前に個別に確認します。",
  ],
  [
    "体育館や地域の活動に協力できますか？",
    "ぜひご相談ください。希望地域、使用可能な曜日・時間、施設規約、協力できる内容をお聞かせください。利用許可や費用を確認するまで開催を確約しません。",
  ],
] as const;

export default function OkinawaPage() {
  return (
    <SiteFrame locale="ja" languagePage="okinawa">
      <GrowthClickTracking />
      <main className={styles.page} id="main-content">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Riot Basketball Academy", item: "https://riotbasketballacademy.com/ja/" },
            { "@type": "ListItem", position: 2, name: "GREAM OKINAWA", item: "https://riotbasketballacademy.com/ja/okinawa" },
          ],
        }) }} />
        <section className={styles.hero}>
          <div className={styles.inner}>
            <p className={styles.eyebrow}>RIOT BASKETBALL ACADEMY / GREAM OKINAWA</p>
            <h1>沖縄に、<br /><span>学びが続くコートを。</span></h1>
            <p className={styles.heroLead}>
              子どもたちの毎日に、安心して挑戦できるバスケットボールの場所を。
              RBAは沖縄での育成活動を大切にしながら、指導者・会場・安全管理の体制を整えています。
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primary} href="#members" data-growth-id="okinawa-ja-current-family">参加中のご家庭へ <span aria-hidden="true">→</span></Link>
              <Link className={styles.secondary} href="#future" data-growth-id="okinawa-ja-future-family">これから参加したい方へ <span aria-hidden="true">→</span></Link>
              <Link className={styles.secondary} href="#join" data-growth-id="okinawa-ja-partner">指導・会場で協力する <span aria-hidden="true">→</span></Link>
            </div>
            <p className={styles.heroFoot}>既存の活動に関する個別の案内と、新しい定期活動の準備は区別してお知らせします。</p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="status-heading">
          <div className={styles.inner}>
            <p className={styles.eyebrow}>HOW TO FIND THE RIGHT INFORMATION</p>
            <div className={styles.heading}>
              <h2 id="status-heading">今、知りたいことから選べます。</h2>
              <p>確定したことだけを、必要な方へ。新しい活動の準備状況と、今参加している活動の連絡は別々に扱います。</p>
            </div>
            <div className={styles.statusGrid}>
              {currentStatus.map((item) => (
                <article key={item.eyebrow} className={styles.statusCard}>
                  <p className={styles.mini}>{item.eyebrow}</p>
                  <h3>{item.title}</h3>
                  <p className={styles.state}>{item.state}</p>
                  <p>{item.description}</p>
                  <Link href={item.href} className={styles.textLink}>{item.link} <span aria-hidden="true">→</span></Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.darkSection} id="members">
          <div className={styles.inner}>
            <p className={styles.eyebrow}>CURRENT MEMBERS / FAMILIES</p>
            <div className={styles.split}>
              <div>
                <h2>今の活動を、<br />安心して確認できるように。</h2>
                <p>練習日・大会・集合・担当の変更など、参加に関わる連絡は、対象の会員・保護者へお知らせします。通常の現場連絡は、すでにご案内されている連絡先を引き続きご利用ください。</p>
              </div>
              <div className={styles.darkPanel}>
                <h3>RBA本部への個別相談</h3>
                <p>会費、申込、実施状況、連絡内容の確認は本部で受け付けます。活動名・対象月・開催日・ご相談の要点をお知らせください。</p>
                <a className={styles.lightButton} href={FAMILY_EMAIL} data-growth-id="okinawa-ja-member-email">会員・保護者の相談メール <span aria-hidden="true">→</span></a>
                <p className={styles.email}>{EMAIL}</p>
                <p className={styles.small}>初回のご相談に、子どもの病歴、口座・カード情報、身分証やグループの会話画像を添付する必要はありません。</p>
              </div>
            </div>
            <p className={styles.emergency}>事故や急病など緊急の際は、メール返信を待たず、現場の救護・緊急通報・保護者への速やかな連絡を優先してください。</p>
          </div>
        </section>

        <section className={styles.section} id="standards" aria-labelledby="principles-heading">
          <div className={styles.inner}>
            <p className={styles.eyebrow}>OUR DEVELOPMENT STANDARD</p>
            <div className={styles.heading}>
              <h2 id="principles-heading">沖縄でも変わらない、4つの約束。</h2>
              <p>練習の質と、子どもたちが安心して挑戦できる環境。その両方を、日々の活動の基準にします。</p>
            </div>
            <div className={styles.standardGrid}>
              {standards.map((item) => (
                <article className={styles.standard} key={item.number}>
                  <span className={styles.number}>{item.number}</span>
                  <p className={styles.mini}>{item.label}</p>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.softSection} id="future" aria-labelledby="future-heading">
          <div className={styles.inner}>
            <p className={styles.eyebrow}>FOR FUTURE PLAYERS & FAMILIES</p>
            <div className={styles.heading}>
              <h2 id="future-heading">新しい定期活動は、準備が整ってから。</h2>
              <p>会場や指導担当が未確定のまま募集を始めるのではなく、必要な条件を確認できた活動からご案内します。</p>
            </div>
            <ol className={styles.stepGrid}>
              {futureSteps.map(([number, title, body]) => (
                <li className={styles.step} key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </li>
              ))}
            </ol>
            <div className={styles.futureActions}>
              <a className={styles.darkButton} href={FUTURE_EMAIL} data-growth-id="okinawa-ja-future-email">新しい活動の参加希望を相談する（無料） <span aria-hidden="true">→</span></a>
              <p>希望する地域や対象学年を教えていただければ、確認できた活動の案内方法をご説明します。新しい定期活動への申込や体験・入団を確約するものではありません。</p>
            </div>
            <p className={styles.disclaimer}>現在の会員の活動が一律に休止しているという案内ではありません。新規・継続の各活動の確定情報は、活動ごとの公式連絡先でご確認ください。</p>
          </div>
        </section>

        <section className={styles.section} id="activities" aria-labelledby="activity-heading">
          <div className={styles.inner}>
            <p className={styles.eyebrow}>CLINICS & CAMPS</p>
            <div className={styles.heading}>
              <h2 id="activity-heading">単発の学び・国際キャンプはこちら。</h2>
              <p>新しい定期活動の募集とは別の企画です。実施条件や申込先は、各イベントページに記載された案内をご確認ください。</p>
            </div>
            <div className={styles.eventGrid}>
              <article>
                <p className={styles.mini}>NOVEMBER 2026</p>
                <h3>沖縄バスケットボールクリニック</h3>
                <p>11月14日予定。対象・会場の案内方法・参加費・申込条件を個別ページでご確認ください。</p>
                <Link href="/ja/events/okinawa-clinic-2026-11-14" className={styles.textLink} data-growth-id="okinawa-ja-clinic-detail">クリニックの詳細 <span aria-hidden="true">→</span></Link>
              </article>
              <article>
                <p className={styles.mini}>DECEMBER 2026</p>
                <h3>沖縄国際ユースキャンプ</h3>
                <p>12月22〜24日予定。宿泊・参加形態や費用・参加条件はキャンプの公式ページでご案内します。</p>
                <Link href="/ja/events/okinawa-international-camp-2026" className={styles.textLink} data-growth-id="okinawa-ja-camp-detail">国際キャンプの詳細 <span aria-hidden="true">→</span></Link>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.joinSection} id="join" aria-labelledby="join-heading">
          <div className={styles.inner}>
            <p className={styles.eyebrow}>BUILD THE NEXT COURT TOGETHER</p>
            <div className={styles.heading}>
              <h2 id="join-heading">沖縄の育成を、一緒につくる。</h2>
              <p>コーチ、トレーナー、会場、地域の協力者。それぞれの立場から、無理のない関わり方をご相談ください。</p>
            </div>
            <div className={styles.joinGrid}>
              <article>
                <p className={styles.mini}>COACH / ASSISTANT</p>
                <h3>現地コーチ・指導補助</h3>
                <p>U12・U15年代を中心に、育成年代の指導やアシスタントとして関わる方を探しています。定期活動の頻度・場所は調整中です。</p>
                <Link href="/ja/okinawa-coach" className={styles.textLink} data-growth-id="okinawa-ja-coach-details">募集内容・条件を見る <span aria-hidden="true">→</span></Link>
                <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className={styles.mutedLink} data-growth-id="okinawa-ja-coach-form">応募・相談フォーム（無料） ↗</a>
              </article>
              <article>
                <p className={styles.mini}>S&C / SAFETY SUPPORT</p>
                <h3>身体づくり・安全管理の補助</h3>
                <p>S&C、身体づくり、コンディショニング等の経験を生かした協力も相談できます。担当業務と資格・安全責任の範囲を確認して決定します。</p>
                <Link href="/ja/okinawa-coach" className={styles.textLink}>関わり方を確認する <span aria-hidden="true">→</span></Link>
              </article>
              <article>
                <p className={styles.mini}>VENUE / LOCAL PARTNER</p>
                <h3>体育館・地域連携・企業協力</h3>
                <p>糸満・豊見城・八重瀬周辺などの会場、地域での開催・安全な運営環境づくりについて相談を受け付けています。</p>
                <a className={styles.textLink} href={PARTNER_EMAIL} data-growth-id="okinawa-ja-venue-email">協力内容をメールで相談 <span aria-hidden="true">→</span></a>
              </article>
            </div>
            <p className={styles.disclaimer}>フォームやメールでの相談は、採用・契約・参加・施設予約を意味しません。業務をお願いする場合は、内容・報酬・支払日・交通費・安全条件を事前に示し、合意のうえ進めます。</p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="faq-heading">
          <div className={styles.inner}>
            <p className={styles.eyebrow}>FREQUENTLY ASKED QUESTIONS</p>
            <div className={styles.heading}><h2 id="faq-heading">よくあるご質問。</h2></div>
            <div className={styles.faqGrid}>
              {questions.map(([question, answer]) => (
                <article key={question} className={styles.faqItem}>
                  <h3>{question}</h3>
                  <p>{answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.footerCta}>
          <div className={styles.inner}>
            <p className={styles.eyebrow}>RIOT BASKETBALL ACADEMY</p>
            <h2>大切なのは、<br />活動を続けるための土台。</h2>
            <p>今の活動の確認も、これからの参加や協力の相談も。分からないことがあれば、まず本部へお問い合わせください。</p>
            <div className={styles.heroActions}>
              <a className={styles.primary} href={FAMILY_EMAIL} data-growth-id="okinawa-ja-footer-email">RBA沖縄の相談窓口 <span aria-hidden="true">→</span></a>
              <Link className={styles.secondary} href="/ja/policies">参加規約・安全方針 <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
