import { ArrowRight, ArrowUpRight, CheckCircle2, ChevronDown, Clock3, Video } from "lucide-react";
import { SiteFrame } from "./site-frame";
import { GrowthClickTracking } from "./growth-click-tracking";
import { torstenRegistrationUrl } from "./programme-data";
import { clinicHelpUrl, clinicSharePath } from "@/lib/torsten-clinic";
import styles from "./torsten-japan-landing.module.css";

const credentials = [
  { big: "B.PREMIER", title: "レバンガ北海道", detail: "2026–27シーズン ヘッドコーチ" },
  { big: "FIBA WABC", title: "Level 3 Coach Instructor", detail: "2026年10月22日・RPLによる認定" },
  { big: "WABC", title: "Executive Committee", detail: "世界バスケットボールコーチ協会の委員" },
  { big: "WORLD CHAMPION", title: "女子U23 3x3・2019", detail: "世界一達成時のディレクターコーチ" },
] as const;

const faqs = [
  ["英語が分からなくても参加できますか？", "はい。英語講義に日本語の逐次通訳が付きます。"],
  ["当日参加できない場合は？", "録画視聴（4,400円）を選択できます。開催後の配信開始から30日間ご覧いただけます。"],
  ["LIVEに録画は含まれますか？", "LIVEと録画は別の申込プランです。両方をご希望の場合は事前にRBAへお問い合わせください。"],
  ["フォームを送れば申込完了ですか？", "いいえ。国内申込はフォーム送信後の確認画面に表示されるSquare決済の案内に従ってお支払いください。決済完了後に申込確定となります。"],
] as const;

function RegisterLink({ label, id, className }: { label: string; id: string; className?: string }) {
  return <a data-growth-id={id} className={className || styles.register} href={torstenRegistrationUrl} target="_blank" rel="noopener noreferrer">
    {label}<ArrowUpRight size={21} strokeWidth={2.4} aria-hidden="true" />
  </a>;
}

export function TorstenJapanLanding() {
  const schema = {
    "@context": "https://schema.org", "@type": "Event",
    name: "Torsten Loibl Online Clinic Vol.2｜現代バスケットボールにおけるシューターの育成と活用",
    startDate: "2026-11-25T20:00:00+09:00", endDate: "2026-11-25T21:30:00+09:00",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: { "@type": "VirtualLocation", url: "https://riotbasketballacademy.com/ja/events/torsten-loibl-online-clinic" },
    organizer: { "@type": "Organization", name: "Riot Basketball Academy", url: "https://riotbasketballacademy.com" },
    performer: { "@type": "Person", name: "Torsten Loibl" },
    offers: [
      { "@type": "Offer", price: 3300, priceCurrency: "JPY", name: "LIVE", url: torstenRegistrationUrl },
      { "@type": "Offer", price: 4400, priceCurrency: "JPY", name: "録画視聴30日", url: torstenRegistrationUrl },
    ],
  };

  return <SiteFrame locale="ja" languagePage="events/torsten-loibl-online-clinic">
    <div className={styles.page} lang="ja">
      <GrowthClickTracking />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className={styles.shell}>
        <section className={styles.hero} aria-labelledby="torsten-title">
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>NOV 25, 2026 · RBA ONLINE CLINIC VOL.2</p>
            <h1 id="torsten-title"><span className={styles.heroLabel}>B.PREMIER現役ヘッドコーチから学ぶ。</span><span className={styles.name}>TORSTEN<br />LOIBL</span></h1>
            <p className={styles.heroProof}>B.PREMIER HC <span>FIBA WABC LEVEL 3</span> <span>2019 WORLD CHAMPION</span></p>
            <p className={styles.subheading}>シュートを「打つ技術」から、<br/>「試合で生み出す力」へ。</p>
            <p className={styles.lead}>2026-27 B.PREMIER・レバンガ北海道を率いる現役HC。世代別日本代表の指導経験も踏まえ、シュート技術・スペーシング・判断・練習設計を考える90分。</p>
            <RegisterLink label="LIVE・録画を選んで申し込む" id="torsten-simple-hero" />
            <p className={styles.micro}>国内申込はGoogleフォームで参加形式を選択。送信後の確認画面にあるSquare決済の案内からお支払いください。 本講習はRBA独立主催です。Bリーグ・レバンガ北海道・JBAによる主催、公認、後援ではありません。</p>
          </div>
          <aside className={styles.info} aria-label="開催日時と参加料金">
            <p className={styles.infoLabel}>LIVE / ZOOM</p>
            <div className={styles.bigDate}>11.25 <span>WED</span></div>
            <p className={styles.time}><Clock3 size={18} aria-hidden="true" />20:00–21:30（日本時間）</p>
            <p className={styles.time}><Video size={18} aria-hidden="true" />Zoom・英語講義＋日本語逐次通訳</p>
            <div className={styles.prices}>
              <div><span>LIVE参加</span><strong>¥3,300</strong></div>
              <div><span>録画30日間</span><strong>¥4,400</strong></div>
            </div>
            <p className={styles.infoFoot}>税込・1名／別プラン。録画は開催後、公開から30日間。</p>
          </aside>
        </section>

        <section className={styles.achievements} aria-labelledby="torsten-career">
          <p className={styles.sectionKicker}>THE COACH / 実績</p>
          <h2 id="torsten-career">現役プロHC。日本代表。世界一。</h2>
          <div className={styles.credentialGrid}>
            {credentials.map(item=><article key={item.big}>
              <span>{item.big}</span><h3>{item.title}</h3><p>{item.detail}</p>
            </article>)}
          </div>
          <p className={styles.shortCareer}>男子U16・U18・U19日本代表ヘッドコーチ、東京2020の3x3日本代表ディレクターコーチ、日独の年間最優秀コーチ賞などの経歴も持ちます。</p>
        </section>

        <section className={styles.about} aria-labelledby="torsten-learn">
          <div>
            <p className={styles.sectionKicker}>90 MINUTES / 講習内容</p>
            <h2 id="torsten-learn">この90分で学ぶこと。</h2>
          </div>
          <ol className={styles.learning}>
            <li><strong>01</strong><span>現代のシューターに必要な技術</span></li>
            <li><strong>02</strong><span>練習から試合の判断につなげる設計</span></li>
            <li><strong>03</strong><span>良いシュートを生むスペーシングと戦術</span></li>
          </ol>
        </section>

        <section className={styles.about} aria-labelledby="torsten-editorial-coverage">
          <div>
            <p className={styles.sectionKicker}>MEDIA / 掲載記事</p>
            <h2 id="torsten-editorial-coverage">講習が専門メディアで紹介されました。</h2>
          </div>
          <div>
            <p>バスケットボール専門メディア「610 — sixten JOURNAL」が、11月25日開催のRBAオンライン講習について紹介記事を公開しています。技術・練習設計・試合での判断をつなぐ学びを知る、もう一つの参考情報としてご覧いただけます。</p>
            <a className={styles.footerLink} href="https://sixten.jp/journal/815-torsten-loibl-online-clinic.html" target="_blank" rel="noopener noreferrer">11月4日公開の紹介記事を読む <ArrowUpRight size={16} aria-hidden="true" /></a>
            <p className={styles.help}>編集記事としての掲載であり、媒体による講習の後援・推薦や資格認定を意味しません。参加条件と申込はRBA公式の案内をご確認ください。</p>
          </div>
        </section>

        <section className={styles.booking} aria-labelledby="torsten-booking">
          <div className={styles.bookingHead}>
            <p className={styles.sectionKicker}>REGISTRATION / お申し込み</p>
            <h2 id="torsten-booking">参加方法は2つ。申込先は1つ。</h2>
            <p>同じGoogleフォームで、LIVE・録画のどちらか1つを選べます。</p>
          </div>
          <div className={styles.choices}>
            <div><span>11月25日・Zoom</span><h3>LIVE参加</h3><strong>3,300円</strong></div>
            <div><span>開催後・視聴30日間</span><h3>録画視聴</h3><strong>4,400円</strong></div>
          </div>
          <RegisterLink label="申込フォームを開く" id="torsten-simple-book" />
          <p className={styles.bookingNote}><CheckCircle2 size={18} aria-hidden="true" />Googleフォーム入力 → 送信後の確認画面でSquare決済 → お支払い完了で申込確定</p>
          <p className={styles.help}>日本国内は税込円建て・Square決済でのお支払いです。<a href="/events/torsten-loibl-online-clinic#register">海外向けUSD申込はこちら</a>。支払方法でお困りの方は<a href={clinicHelpUrl("申込・お支払い手続きの相談")}>RBAにご相談ください</a>。</p>
        </section>

        <section className={styles.faq} aria-labelledby="torsten-faq">
          <h2 id="torsten-faq">よくある質問</h2>
          {faqs.map(([question, answer])=><details key={question}><summary>{question}<ChevronDown size={17} aria-hidden="true" /></summary><p>{answer}</p></details>)}
        </section>
        <footer className={styles.bottom}>
          <p>本講習はRiot Basketball Academyの独立主催です。講師の所属・認定・過去の実績は経歴情報であり、FIBA、WABC、所属クラブ等が本講習を公認・後援するものではありません。</p>
          <p>経歴の参考：<a href="https://www.levanga.com/news/detail/id=22241" target="_blank" rel="noopener noreferrer">レバンガ北海道公式</a> ／ <a href="https://about.fiba.basketball/en/organization/recognized-organizations/world-association-of-basketball-coaches/executive-committee" target="_blank" rel="noopener noreferrer">FIBA WABC委員名簿</a>。Level 3 Coach Instructor Statusは2026年10月22日付のWABC会長書簡によるRPL認定。</p>
          <a href={clinicSharePath} className={styles.footerLink}>講習の紹介文を共有する <ArrowRight size={16} aria-hidden="true" /></a>
        </footer>
      </div>
      <div className={styles.mobileBar}><span><b>11/25（水）20:00</b><small>LIVE 3,300円／録画 4,400円</small></span><RegisterLink label="申し込む" id="torsten-simple-mobile" className={styles.mobileButton}/></div>
    </div>
  </SiteFrame>;
}
