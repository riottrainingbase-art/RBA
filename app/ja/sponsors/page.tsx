import type { Metadata } from "next";
import Image from "next/image";
import { AdvertiserList } from "@/components/advertising/advertiser-list";
import { SiteFrame } from "@/components/site-frame";
import { getAdvertisers } from "@/lib/advertisers";
import { publishedSponsorRecords } from "@/lib/public-sponsors";
import styles from "./sponsors.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "RBA公式｜企業スポンサー・協賛・広告パートナー一覧",
  description: "Riot Basketball Academyの企業協賛実績、地域連携、契約・入金・掲載許諾を確認した月額広告を、区分を分けてご紹介します。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/sponsors" },
  robots: { index: true, follow: true },
};

export default async function SponsorDirectory() {
  const advertisers = await getAdvertisers();
  const approved = publishedSponsorRecords();
  const existing = approved.filter(p => p.category === "existing_profile");
  const past = approved.filter(p => p.category === "completed_sponsorship");

  return (
    <SiteFrame locale="ja">
      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.wrap}>
            <a href="/ja" className={styles.back}>← RBAトップへ</a>
            <div className={styles.identity}>
              <Image src="/rba-logo-original.jpg" width={46} height={64} alt="Riot Basketball Academy 公式ロゴ"/>
              <span>RIOT BASKETBALL ACADEMY / CORPORATE PARTNERS</span>
            </div>
            <h1>応援を、<br/>正しく見える形に。</h1>
            <p className={styles.lead}>企業のご支援は、契約ごとに形が違います。企画協賛・地域連携・月額企業広告・過去の協賛実績を混同せず、確認できた内容だけを掲載します。</p>
            <div className={styles.actions}>
              <a href="#current-advertisers" className={styles.primary}>企業広告の掲載先を見る →</a>
              <a href="/ja/partners" className={styles.secondary}>企業として協賛を相談する →</a>
            </div>
          </div>
        </section>

        <section className={styles.sectionMuted} aria-labelledby="sponsor-menu-heading"><div className={styles.wrap}><span className={styles.kicker}>PARTNERSHIP / OPTIONS</span><h2 id="sponsor-menu-heading">支援方法を選ぶ</h2><div className={styles.grid}><article className={styles.card}><h3>月額企業広告</h3><p><strong>11,000円／月（税込）</strong></p><p>公式サイトへの掲載。掲載条件・入金・許諾・公開承認を確認します。既存の広告契約は変更しません。</p><a href="/ja/support">内容・申込条件へ →</a></article><article className={styles.card}><h3>企画・地域協賛</h3><p>開催地域、期間、対象事業、掲出・成果報告の内容を個別にご提案します。見積・契約前に課金はありません。</p><a href="/ja/partners">協賛の相談へ →</a></article><article className={styles.card}><h3>資金使途・活動報告</h3><p>契約ごとに目的、使途、提供内容を確認し、検証できた実績を報告します。</p><a href="/ja/impact">RBA IMPACTを見る →</a></article></div></div></section>
        <nav className={styles.tabRow} aria-label="企業パートナー掲載区分">
          <a href="#existing-partners">地域連携</a>
          <a href="#current-advertisers">現在の企業広告</a>
          <a href="#history">過去の協賛実績</a>
          <a href="#policy">掲載方針</a>
        </nav>

        <section id="existing-partners" className={styles.section}>
          <div className={styles.wrap}>
            <span className={styles.kicker}>COMMUNITY PARTNERS / 01</span>
            <h2>既存の公式掲載・地域連携</h2>
            <p className={styles.sectionLead}>RBAの既存ページでご紹介している企業です。紹介されている事実と、現在の有償協賛契約・支払状況は別の情報です。</p>
            <div className={styles.grid}>
              {existing.map(p => (
                <article className={styles.card} key={p.id}>
                  <p className={styles.classification}>{p.categoryLabel}</p>
                  <h3>{p.legalName}</h3>
                  <p>{p.description}</p>
                  <p className={styles.period}>{p.scope} / {p.periodLabel}</p>
                  <div className={styles.cardLinks}>
                    <a href={p.publicWebsite} target="_blank" rel="noopener noreferrer">企業公式サイト ↗</a>
                    <a href="/ja/sponsor">既存の紹介ページ →</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="current-advertisers" className={styles.sectionMuted}>
          <div className={styles.wrap}>
            <span className={styles.kicker}>PAID ADVERTISING / 02</span>
            <h2>現在の企業広告パートナー</h2>
            <p className={styles.sectionLead}>RBAの月額企業広告（11,000円・税込）は、入金、企業の掲載許諾、公開承認、掲載期限を照合したもののみ紹介します。企画協賛やGREAM仙台の別契約とは区別します。</p>
            <div className={styles.advertisingList}>
              <AdvertiserList advertisers={advertisers} />
            </div>
            <div className={styles.actions}>
              <a href="/ja/support" className={styles.primary}>企業広告の内容・掲載条件を見る →</a>
              <a href="/ja/support/terms" className={styles.secondary}>広告利用規約を見る →</a>
            </div>
            <p className={styles.small}>申込済みやロゴ登録済みでも、RBAの最終掲載確認が済むまでは表示されません。支払い済みの方へ再決済をお願いするものではありません。</p>
          </div>
        </section>

        <section id="history" className={styles.section}>
          <div className={styles.wrap}>
            <span className={styles.kicker}>SPONSORSHIP HISTORY / 03</span>
            <h2>これまでの企業協賛</h2>
            <p className={styles.sectionLead}>期間を終了した協賛は、現在のスポンサーと誤認されないよう、独立して記録します。</p>
            <div className={styles.grid}>
              {past.map(p => (
                <article className={styles.card} key={p.id}>
                  <p className={styles.classification}>{p.categoryLabel}</p>
                  <h3>{p.legalName}</h3>
                  <p>{p.description}</p>
                  <p className={styles.period}>{p.periodLabel}</p>
                  <a href={p.publicWebsite} target="_blank" rel="noopener noreferrer" className={styles.textLink}>企業公式サイト ↗</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="policy" className={styles.policy}>
          <div className={styles.wrap}>
            <span className={styles.kicker}>PUBLICATION PRINCIPLES / 04</span>
            <h2>社名・ロゴの掲載は、必ず確認してから。</h2>
            <div className={styles.steps}>
              <div><span>01</span><h3>関係を確認</h3><p>営業中・協議中・契約済み・提供済み・終了を区別。</p></div>
              <div><span>02</span><h3>権利と入金を確認</h3><p>掲載許諾、期間、社名表記、ロゴ素材、必要な決済照合を実施。</p></div>
              <div><span>03</span><h3>公開と報告</h3><p>合意した媒体だけに掲載し、支援の使途と実施状況を報告。</p></div>
            </div>
            <p className={styles.small}>営業先・未契約企業・協議中ブランド、未承諾のロゴ、子どもの個人情報、協賛額・決済履歴・担当者の連絡先は公開しません。用品・食品等の提供実績は、継続的な金銭協賛と混同しません。</p>
            <div className={styles.actions}>
              <a href="/ja/sponsor" className={styles.secondary}>企画協賛について知る →</a>
              <a href="/ja/gream-sendai/partners" className={styles.secondary}>GREAM仙台の地域協賛を見る →</a>
            </div>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
