import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import { GrowthClickTracking } from "@/components/growth-click-tracking";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "24時間受付｜学び・月額会員・企業広告 | Riot Basketball Academy",
  description: "RBAの月額指導者学習、MY HOME COURT、note応援メンバー、企業広告、全国クリニックの公式申込先をまとめました。24時間、自分の都合に合わせて確認できます。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/24h" },
  openGraph: {
    title: "RBA｜いつでも、必要な学びや活動へ。",
    description: "指導者の学び、MY HOME COURT、応援メンバー、全国の育成活動。公式の条件と申込先をご案内。",
    url: "https://riotbasketballacademy.com/ja/24h",
    images: [{ url: "https://riotbasketballacademy.com/rba-logo-original.jpg", alt: "Riot Basketball Academy公式ロゴ" }],
    type: "website",
  },
};

const offers = [
  {
    slug: "u12-guide",
    category: "FOR COACHES / ONE-TIME",
    title: "U12の練習を、試合につながるものへ。",
    name: "RBA COACHING GUIDE Vol.1",
    description: "90分の練習例、4週間の取り組み方、観察チェックリストを収録。ゲームの中で選手が何を見て、どう選ぶかを考えるための指導教材です。",
    price: "3,300円（税込）・買い切り",
    action: "教材を確認して購入する",
    href: "/ja/materials/u12-fundamentals",
    note: "月額課金への自動加入はありません。RBA IDでログインしてお申し込みください。決済情報を照合した購入者が閲覧できます。購入済みなら再決済不要です。",
    external: false,
  },
  {
    slug: "coach",
    category: "FOR COACHES / MONTHLY",
    title: "毎週の指導を、少しずつ良くする。",
    name: "D-HUB COACH LAB",
    description: "練習の組み立て方や選手の判断を、学んで、試して、振り返る。指導者のための継続学習です。",
    price: "月額3,300円（税込）",
    action: "内容と入会方法を見る",
    href: "/ja/d-hub/coaches",
    note: "利用条件と決済方法を確認してからお申し込みください。既存会員は再契約不要です。",
    external: false,
  },
  {
    slug: "homecourt",
    category: "FOR PLAYERS & FAMILIES / OPTIONAL MONTHLY",
    title: "学んだことを、次の練習で使う。",
    name: "MY HOME COURT / PLUS",
    description: "まずは無料のRBA IDから。必要な方は月額プランで学習・振り返りを続けられます。",
    price: "無料RBA ID／PLUSは月額3,300円（税込）",
    action: "無料登録とプランの違いを見る",
    href: "/ja/my-homecourt",
    note: "有料プランは任意です。すでに登録済みなら、同じアカウントからログインしてください。",
    external: false,
  },
  {
    slug: "note",
    category: "SUPPORT & LEARNING / MONTHLY",
    title: "育成の記事を読み、活動を支える。",
    name: "RBA note メンバーシップ",
    description: "子どもたちの育成について継続して考える記事や、RBAの活動を応援する月額プランです。",
    price: "月額500円・1,000円のプランを案内",
    action: "noteでプランと特典を確認",
    href: "https://note.com/rba_official/membership/join",
    note: "入会・決済・記事の提供・更新・退会はnote上の最新条件をご確認ください。",
    external: true,
  },
  {
    slug: "business",
    category: "FOR COMPANIES / MONTHLY",
    title: "地域の育成を、企業として応援する。",
    name: "RBA企業広告パートナー",
    description: "RBA公式サイトと月次活動レポートへの広告掲載を通じて、育成活動を支えていただくプランです。",
    price: "月額11,000円（税込）／1社1口",
    action: "掲載条件・申込を確認",
    href: "/ja/support",
    note: "お支払いはオンラインで受付。掲載素材の確認・許諾・公開は別途ご案内します。即時の広告掲載ではありません。",
    external: false,
  },
] as const;

const other = [
  {
    title: "全国のクリニック・キャンプ",
    description: "日程・対象・参加費を確認し、開催条件が整っている活動からお申し込みください。",
    href: "/ja/opportunities",
    action: "現在の募集情報を見る",
  },
  {
    title: "第3回・海外向け指導者講習（無料希望登録）",
    description: "次の国際オンライン講習に向けた希望調査です。講師・開催日・料金はまだ未定で、参加予約や決済はありません。",
    href: "https://form.jotform.com/263243162276051",
    action: "希望する内容を伝える",
  },
] as const;

export default function Rba24HourPage() {
  return (
    <SiteFrame locale="ja">
      <GrowthClickTracking />
      <main id="main-content" lang="ja" className={styles.page}>
        <div className={styles.shell}>
          <header className={styles.hero}>
            <div className={styles.brand}>
              <Link href="/ja" aria-label="Riot Basketball Academy公式サイトへ戻る">
                <Image src="/rba-logo-original.jpg" width={64} height={84} alt="RBA公式ロゴ" priority className={styles.logo} />
              </Link>
              <span>RIOT BASKETBALL ACADEMY</span>
            </div>
            <p className={styles.kicker}>RBA / LEARN · JOIN · SUPPORT</p>
            <h1>必要な学びや活動へ。<br />自分のタイミングで。</h1>
            <p>RBAの講習、会員サービス、全国の育成活動、企業向けの応援プランをまとめました。自分に合ったものを選び、各公式ページで条件を確認してください。</p>
            <div className={styles.heroActions}>
              <a href="https://form.jotform.com/262542128767059" target="_blank" rel="noopener noreferrer" data-growth-id="24h-free-coach-audit" className={styles.mainCta}>無料でU12の指導を振り返る ↗</a>
              <a href="#services" className={styles.mainCta}>商品・サービスを見る <span aria-hidden="true">↓</span></a>
            </div>
            <p className={styles.heroCaution}>すでに申込・入金済みの方は二重のお支払いをしないでください。</p>
          </header>

          <section className={styles.section} id="services" aria-labelledby="services-title">
            <div className={styles.sectionHeading}>
              <p className={styles.sectionEyebrow}>MEMBERSHIP / LEARNING / SUPPORT</p>
              <h2 id="services-title">今から確認できる4つのサービス</h2>
              <p>無理にすべてを利用する必要はありません。今の課題に近いものをひとつ選んでください。</p>
            </div>
            <div className={styles.grid}>
              {offers.map(offer => (
                <article className={styles.offer} key={offer.slug}>
                  <p className={styles.category}>{offer.category}</p>
                  <h3>{offer.title}</h3>
                  <p className={styles.program}>{offer.name}</p>
                  <p className={styles.description}>{offer.description}</p>
                  <p className={styles.price}>{offer.price}</p>
                  <a
                    className={styles.action}
                    data-growth-id={`24h-${offer.slug}`}
                    href={offer.href}
                    target={offer.external ? "_blank" : undefined}
                    rel={offer.external ? "noopener noreferrer" : undefined}
                  >
                    {offer.action} <span aria-hidden="true">→</span>
                  </a>
                  <p className={styles.note}>{offer.note}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.section} aria-labelledby="other-title">
            <div className={styles.sectionHeading}>
              <p className={styles.sectionEyebrow}>OPPORTUNITIES</p>
              <h2 id="other-title">次の育成機会を探す</h2>
            </div>
            <div className={styles.otherGrid}>
              {other.map(item => <article key={item.href} className={styles.otherCard}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a href={item.href} data-growth-id={item.href.includes("jotform") ? "24h-vol3-interest" : "24h-opportunities"}>{item.action} →</a>
              </article>)}
            </div>
          </section>

          <section className={styles.steps} aria-labelledby="steps-title">
            <p className={styles.sectionEyebrow}>HOW IT WORKS</p>
            <h2 id="steps-title">申込みから、その後のご案内まで。</h2>
            <ol>
              <li><strong>内容と条件を読む</strong><span>会費、解約条件、参加対象、提供時期は各プランの公式ページをご確認ください。</span></li>
              <li><strong>申込・決済する</strong><span>購入手続きはStripe・note・各公式申込先で行います。ここではカード情報を集めません。</span></li>
              <li><strong>必要な案内を受け取る</strong><span>決済事業者の確認画面・メールを保管してください。会員アクセスやイベント参加など、主催者確認が必要なものは別途ご連絡します。</span></li>
            </ol>
            <p className={styles.note}>受付・決済は24時間可能な商品がありますが、すべてのサービスが決済直後に自動提供されるわけではありません。</p>
          </section>

          <section className={styles.help} aria-label="お問い合わせ">
            <h2>申込みのことで迷ったら</h2>
            <p>料金、参加資格、すでに支払った場合のお手続きなど、分からないことがあればご連絡ください。</p>
            <div className={styles.helpActions}>
              <a href="https://form.jotform.com/263243557140049" target="_blank" rel="noopener noreferrer" data-growth-id="24h-paid-access-help">支払済み・アクセスできない方はこちら →</a>
              <a href="https://form.jotform.com/263243206556051" target="_blank" rel="noopener noreferrer" data-growth-id="24h-advertiser-intake">契約済み企業はこちら：掲載情報・ロゴ許諾を登録 →</a>
              <a href="mailto:riot.training.base@gmail.com?subject=RBA%20%E7%94%B3%E8%BE%BC%E3%81%BF%E3%83%BB%E6%B1%BA%E6%B8%88%E3%81%AE%E7%9B%B8%E8%AB%87">RBAにメールする →</a>
            </div>
          </section>

          <footer className={styles.footer}>
            <span>© Riot Basketball Academy</span>
            <Link href="/ja/policies">プライバシー・安全方針</Link>
            <Link href="/ja/after-application">申込み後のご案内</Link>
            <span>料金・募集状況・ご利用条件は遷移先の公式表示を優先します。</span>
          </footer>
        </div>
      </main>
    </SiteFrame>
  );
}
