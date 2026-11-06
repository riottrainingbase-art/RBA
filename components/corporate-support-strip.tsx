import type { Locale } from "./site-frame";
import styles from "./corporate-support-strip.module.css";

/**
 * RBA corporate-support evidence register.
 * Keep this component permanently on homepages rather than within rotating promotions.
 * The signed 2026 Nakagami sponsorship expired on 2026-08-31.
 * Do not label it current until a renewed contract is verified.
 * Never add companies contacted for sponsorship but not contracted.
 */
const corporateSupport = [
  {
    key: "nakagami-2026",
    name: "有限会社 中神工務店",
    englishName: "NAKAGAMI & CO.",
    website: "https://www.nakagami-co.com/",
    period: "2026.03–08",
    status: "past" as const,
  },
];

const words = {
  ja: {
    kicker: "CORPORATE SUPPORT / 企業協賛",
    headline: "育成活動を支えてくださった企業",
    history: "2026年 協賛実績",
    partner: "企業協賛・連携について",
    companyPrefix: "協賛実績：",
    companySuffix: "（2026年3〜8月）",
  },
  en: {
    kicker: "CORPORATE SUPPORT",
    headline: "Companies that have supported our development work",
    history: "2026 sponsorship record",
    partner: "Corporate sponsorship & partnerships",
    companyPrefix: "Previous sponsor: ",
    companySuffix: " (Mar–Aug 2026)",
  },
  "zh-tw": {
    kicker: "CORPORATE SUPPORT / 企業支持",
    headline: "曾支持青少年培育活動的企業",
    history: "2026 年贊助紀錄",
    partner: "企業合作與贊助",
    companyPrefix: "過往贊助：",
    companySuffix: "（2026 年 3–8 月）",
  },
  ko: {
    kicker: "CORPORATE SUPPORT / 기업 후원",
    headline: "육성 활동을 지원해 주신 기업",
    history: "2026년 후원 실적",
    partner: "기업 후원 및 협력",
    companyPrefix: "이전 후원사: ",
    companySuffix: " (2026년 3–8월)",
  },
} as const;

/** A permanent first-screen sponsor record, accurate to the signed contract. */
export function CorporateSupportStrip({ locale }: { locale: Locale }) {
  const t = words[locale];
  const partnerPath = locale === "en" ? "/partners" : locale === "ja" ? "/ja/partners" : "/" + locale + "/partners";
  return (
    <section className={styles.strip} aria-label={t.kicker} data-corporate-support="persistent-home">
      <div className={styles.content}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>{t.kicker}</span>
          <strong>{t.headline}</strong>
          <span className={styles.category}>{t.history}</span>
        </div>
        <div className={styles.records}>
          {corporateSupport.map((company) => (
            <a
              key={company.key}
              className={styles.company}
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.companyPrefix + company.name + t.companySuffix}
            >
              <span className={styles.wordmark}>{company.englishName}</span>
              <span className={styles.legalName}>{company.name}</span>
              <span className={styles.period}>{company.period} / {t.history}</span>
            </a>
          ))}
        </div>
        <a className={styles.cta} href={partnerPath}>
          {t.partner}<span aria-hidden="true"> ↗</span>
        </a>
      </div>
    </section>
  );
}
