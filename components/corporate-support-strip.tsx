// [preview] corporate support permanent homepage release checkpoint 2026-11-06.
import Image from "next/image";
import { mayPublishProductSupport, support361Japan } from "@/lib/brand-partner-361";
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
    website: "https://nakagamiandco.com/",
    instagram: "https://www.instagram.com/ourplace_official/",
    period: "2026.03–08",
    status: "past" as const,
  },
];

const words = {
  ja: {
    kicker: "PARTNERS / 協賛・パートナー",
    headline: "企業スポンサー募集中。育成の未来を、ともに。",
    history: "2026年 協賛実績",
    partner: "協賛メニューと掲載条件を見る",
    companyPrefix: "協賛実績：",
    companySuffix: "（2026年3〜8月）",
    websiteLabel: "中神工務店 公式サイト",
    instagramLabel: "OURPLACE 公式Instagram",
    linkGroupLabel: "中神工務店・OURPLACE へのリンク",
    productSupport: "育成活動の商品サポート",
    productNote: "用品提供による活動協力。金銭協賛・独占スポンサーを意味しません。",
  },
  en: {
    kicker: "CORPORATE SUPPORT",
    headline: "Corporate partners welcome — support youth basketball.",
    history: "2026 sponsorship record",
    partner: "Explore sponsorship options",
    companyPrefix: "Previous sponsor: ",
    companySuffix: " (Mar–Aug 2026)",
    websiteLabel: "Nakagami official website",
    instagramLabel: "OURPLACE official Instagram",
    linkGroupLabel: "Nakagami and OURPLACE links",
    productSupport: "Product support for youth development",
    productNote: "Product collaboration; not a financial or exclusive sponsorship.",
  },
  "zh-tw": {
    kicker: "CORPORATE SUPPORT / 企業支持",
    headline: "誠邀企業共同支持青少年籃球",
    history: "2026 年贊助紀錄",
    partner: "了解贊助及合作方式",
    companyPrefix: "過往贊助：",
    companySuffix: "（2026 年 3–8 月）",
    websiteLabel: "中神工務店官方網站",
    instagramLabel: "OURPLACE 官方 Instagram",
    linkGroupLabel: "中神工務店與 OURPLACE 連結",
    productSupport: "青少年培育用品支持",
    productNote: "用品合作，不代表金錢贊助或獨家合作。",
  },
  ko: {
    kicker: "CORPORATE SUPPORT / 기업 후원",
    headline: "유소년 농구를 함께 지원할 기업 후원사 모집",
    history: "2026년 후원 실적",
    partner: "후원 및 협력 안내",
    companyPrefix: "이전 후원사: ",
    companySuffix: " (2026년 3–8월)",
    websiteLabel: "나카가미 공식 웹사이트",
    instagramLabel: "OURPLACE 공식 Instagram",
    linkGroupLabel: "나카가미 및 OURPLACE 링크",
    productSupport: "유소년 육성 용품 지원",
    productNote: "물품 협력이며 금전·독점 후원을 의미하지 않습니다.",
  },
} as const;

/** A permanent first-screen sponsor record, accurate to the signed contract. */
export function CorporateSupportStrip({ locale }: { locale: Locale }) {
  const t = words[locale];
  const partnerPath = locale === "en" ? "/partners" : locale === "ja" ? "/ja/partners" : "/" + locale + "/partners";
  const isJapanese = locale === "ja";
  const approved361 = mayPublishProductSupport(support361Japan);
  return (
    <section className={styles.strip} aria-label={t.kicker} data-corporate-support="persistent-home">
      <div className={styles.content}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>{t.kicker}</span>
          <strong>{t.headline}</strong>
          <span className={styles.category}>{t.history}</span>
        </div>
        <div className={styles.records}>
          {approved361 && support361Japan.officialLogoPath && (
            <a
              className={styles.productSupport}
              href={support361Japan.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={support361Japan.brandName + " — " + t.productSupport}
              data-support-type="product"
            >
              <span className={styles.productLogoPlate}>
                <Image src={support361Japan.officialLogoPath} alt="361° 正式ロゴ" width={150} height={64} />
              </span>
              <span className={styles.productText}>
                <strong>{t.productSupport}</strong>
                <small>{t.productNote}</small>
              </span>
            </a>
          )}
          {corporateSupport.map((company) => (
            <article
              key={company.key}
              className={styles.companyRecord}
              data-sponsor-key={company.key}
              data-sponsor-status={company.status}
            >
              <div className={styles.companyBrand}>
                <span className={styles.wordmark}>{company.englishName}</span>
                <strong className={styles.legalName}>{company.name}</strong>
                <span className={styles.period}>{company.period} / {t.history}</span>
              </div>
              <nav className={styles.companyLinks} aria-label={t.linkGroupLabel}>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.websiteLabel}
                  data-growth-id="home-nakagami-official-site"
                >
                  <span>{t.websiteLabel}</span><span aria-hidden="true">↗</span>
                </a>
                <a
                  href={company.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.instagramLabel}
                  data-growth-id="home-ourplace-instagram"
                >
                  <span>{t.instagramLabel}</span><span aria-hidden="true">↗</span>
                </a>
              </nav>
            </article>
          ))}
        </div>
        <div className={styles.actions}>
          {isJapanese ? (
            <>
              <a className={styles.primaryCta} href="/ja/support#apply" data-growth-id="home-corporate-advertising">
                企業広告 月額11,000円（税込）<span aria-hidden="true"> ↗</span>
              </a>
              <a className={styles.secondaryCta} href="https://form.jotform.com/263089038431054" target="_blank" rel="noopener noreferrer" data-growth-id="home-corporate-sponsor-enquiry">
                企画協賛を無料相談<span aria-hidden="true"> ↗</span>
              </a>
            </>
          ) : (
            <a className={styles.primaryCta} href={partnerPath}>
              {t.partner}<span aria-hidden="true"> ↗</span>
            </a>
          )}
          {isJapanese && (
            <a className={styles.details} href={partnerPath}>
              協賛メニュー・掲載条件を見る<span aria-hidden="true"> →</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
