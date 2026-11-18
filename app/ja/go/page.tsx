/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import styles from "./go.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "RBA公式リンク｜クリニック・商品購入・D-HUB",
  description: "Riot Basketball Academy公式リンク。全国クリニック、オンライン講習、RBA ESSENTIALSの購入、D-HUB COACH LAB、国際キャンプをわかりやすく案内。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/go" },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "Riot Basketball Academy",
    title: "RBA｜参加する、学ぶ、手に取る。",
    description: "最新クリニック・キャンプ・D-HUB・RBA ESSENTIALSの公式受付をひとつに。",
    url: "https://riotbasketballacademy.com/ja/go",
    images: [{ url: "https://cdn.shopify.com/s/files/1/0841/4098/2529/files/rba-essentials-white-tee-official-design-reference-20261116.jpg?v=1794837114", alt: "RBA ESSENTIALSの商品デザイン画像" }],
  },
};

const events = [
  {
    key: "torsten",
    date: "11.25 WED",
    until: "2026-11-25",
    title: "TORSTEN LOIBL｜ONLINE CLINIC Vol.2",
    description: "シュート技術・育成・判断をつなぐ90分。LIVE 3,300円／録画 4,400円（税込）。",
    href: "https://riotbasketballacademy.com/ja/events/torsten-loibl-online-clinic",
    action: "講習の内容と申込方法",
    status: "受付ページ",
  },
  {
    key: "kagoshima",
    date: "11.29 SUN",
    until: "2026-11-29",
    title: "BASTET × RBA｜鹿児島クリニック",
    description: "午前・午後の各部3,000円／通し4,000円（税込）。参加する時間を選んでお申込み。",
    href: "https://riotbasketballacademy.com/ja/events/kagoshima-clinic-2026-11-29",
    action: "開催内容・参加申込",
    status: "受付ページ",
  },
  {
    key: "okinawa",
    date: "12.22—24",
    until: "2026-12-24",
    title: "OKINAWA｜国際ユースキャンプ",
    description: "7〜18歳。施設・宿泊・送迎の最終条件は公式ページで確認。未確定事項があるため、まず参加条件をご確認ください。",
    href: "https://riotbasketballacademy.com/ja/events/okinawa-international-camp-2026",
    action: "参加条件・相談案内",
    status: "条件調整中",
  },
] as const;

const products = [
  {
    key: "white-tee",
    name: "RBA ESSENTIAL TEE",
    variant: "WHITE",
    price: "¥4,900",
    picture: "https://cdn.shopify.com/s/files/1/0841/4098/2529/files/rba-essentials-white-tee-official-design-reference-20261116.jpg?v=1794837114",
    alt: "RBA ESSENTIAL TEE、白Tシャツのデザイン参考画像。モデルなし。",
    href: "https://buy.stripe.com/9B6fZj423fY09eRboz7EQ1O",
    action: "サイズを選んで購入",
  },
  {
    key: "black-set",
    name: "RBA ESSENTIAL SETUP",
    variant: "BLACK",
    price: "¥19,800",
    picture: "https://cdn.shopify.com/s/files/1/0841/4098/2529/files/rba-essentials-black-hoodie-setup-official-design-reference-20261116.jpg?v=1794837122",
    alt: "RBA ESSENTIAL SETUP、黒フーディとワイドパンツのデザイン参考画像。モデルなし。",
    href: "https://buy.stripe.com/bJe4gB1TVh241Mp3W77EQ1P",
    action: "上下のサイズを選んで購入",
  },
] as const;

export default function RBAGo() {
  const todayJST = new Intl.DateTimeFormat("en-CA", {timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit"}).format(new Date());
  const upcomingEvents = events.filter(x => x.until >= todayJST);
  return <SiteFrame locale="ja"><main className={styles.page}>
    <div className={styles.container}>
      <header className={styles.hero}>
        <p className={styles.micro}>RIOT BASKETBALL ACADEMY / OFFICIAL LINKS</p>
        <h1>RBA<span>.</span></h1>
        <p className={styles.headline}>参加する。学ぶ。<br/>次の一歩へ。</p>
        <p className={styles.heroBody}>クリニックも、育成の学びも、公式ウェアも。<br/>申込・購入先をRBAの公式窓口にまとめました。</p>
        <a className={styles.quick} href="#essentials">公式ウェアを購入する <span aria-hidden="true">↘</span></a>
      </header>
      <section className={styles.section} aria-labelledby="events-title">
        <div className={styles.sectionHeading}><p className={styles.micro}>01 / TRAIN & LEARN</p><h2 id="events-title">最新のクリニック・キャンプ</h2></div>
        {upcomingEvents.length>0?<div className={styles.events}>
          {upcomingEvents.map(event => <article className={styles.event} key={event.key}>
            <div className={styles.eventDate}>{event.date}</div>
            <div className={styles.eventBody}><div className={styles.eventMeta}>{event.status}</div><h3>{event.title}</h3><p>{event.description}</p></div>
            <a href={event.href} className={styles.eventLink} data-growth-id={"go-event-"+event.key}>{event.action} <span aria-hidden="true">↗</span></a>
          </article>)}
        </div>:<p className={styles.empty}>最新の日程はRBA公式カレンダーからご確認ください。</p>}
        <a className={styles.secondary} href="https://riotbasketballacademy.com/ja/start">その他の講習・全国開催を探す <span aria-hidden="true">↗</span></a>
      </section>
      <section className={styles.section} id="essentials" aria-labelledby="apparel-title">
        <div className={styles.sectionHeading}><p className={styles.micro}>02 / OFFICIAL APPAREL</p><h2 id="apparel-title">RBA ESSENTIALS</h2><p className={styles.note}>FIRST DROP 限定｜日本国内送料無料｜全額前払い｜ご注文から1か月以内のお届け</p></div>
        <div className={styles.products}>
          {products.map(item=><article key={item.key} className={styles.product}>
            <img src={item.picture} alt={item.alt} loading="lazy"/>
            <div className={styles.productBody}><div className={styles.productName}>{item.name} / {item.variant}</div><p className={styles.price}>{item.price} <small>税込／国内送料0円</small></p><a href={item.href} data-growth-id={"go-apparel-"+item.key} className={styles.buy}>{item.action} <span aria-hidden="true">↗</span></a></div>
          </article>)}
        </div>
        <p className={styles.disclaimer}>商品写真は完成品の実物ではなくデザイン参考画像です。Stripeでサイズ・住所を確認しお支払いください。手書き加工は通常商品の決済対象外です。同一商品を複数枚購入する場合、サイズが異なれば注文を分けてください。</p>
        <a className={styles.secondary} href="/ja/essentials/shop">商品・返品条件を詳しく見る <span aria-hidden="true">↗</span></a>
      </section>
      <section className={styles.section} aria-labelledby="member-title">
        <div className={styles.sectionHeading}><p className={styles.micro}>03 / KEEP LEARNING</p><h2 id="member-title">D-HUB COACH LAB</h2><p className={styles.body}>答えを買う場所ではなく、選手を見る力と練習設計を磨く場所。月額3,300円（税込）の指導者向けプログラム。</p></div>
        <a className={styles.darkLink} href="https://riotbasketballacademy.com/ja/d-hub/coaches" data-growth-id="go-dhub">D-HUBを詳しく見る・会員登録 <span aria-hidden="true">↗</span></a>
      </section>
      <footer className={styles.footer}>
        <a href="https://riotbasketballacademy.com/ja/start">RBAのすべての活動</a>
        <a href="mailto:riot.training.base@gmail.com">お問い合わせ</a>
        <p>公式販売者：Riot Basketball Academy／西尾優人。先行販売の国内送料は無料です。各申込ページで正式な契約条件をご確認ください。</p>
        <p>© RIOT BASKETBALL ACADEMY.</p>
      </footer>
    </div>
  </main></SiteFrame>;
}
