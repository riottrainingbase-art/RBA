import { TorstenRecordingOffer } from "./torsten-recording-offer";
import { ArrowRight, ArrowUpRight, CheckCircle2, ChevronDown, Clock3, Video } from "lucide-react";
import { SiteFrame } from "./site-frame";
import { GrowthClickTracking } from "./growth-click-tracking";
import { clinicHelpUrl } from "@/lib/torsten-clinic";
import styles from "./torsten-japan-landing.module.css";

const credentials = [
  { big: "B.PREMIER", title: "レバンガ北海道", detail: "2026–27シーズン ヘッドコーチ" },
  { big: "FIBA WABC", title: "Level 3 Coach Instructor", detail: "2026年10月22日・RPLによる認定" },
  { big: "WABC", title: "Executive Committee", detail: "世界バスケットボールコーチ協会の委員" },
  { big: "WORLD CHAMPION", title: "女子U23 3x3・2019", detail: "世界一達成時のディレクターコーチ" },
] as const;

const faqs = [
  ["英語が分からなくても参加できますか？", "はい。英語講義に日本語の逐次通訳が付きます。"],
  ["これから録画を視聴したい場合は？", "LIVEは終了しました。録画購入希望を受け付けています。残り視聴期間と再生方法を確認のうえRBAから支払いをご案内します。"],
  ["LIVEに録画は含まれますか？", "LIVEと録画は別の申込プランです。両方をご希望の場合は事前にRBAへお問い合わせください。"],
  ["支払済みですが録画が見られません。", "再購入せず、購入時のメールアドレスでRBAにお問い合わせください。決済と視聴対象を個別に確認します。"],
] as const;

function RegisterLink({ label, id, className }: { label: string; id: string; className?: string }) {
  return <a data-growth-id={id} className={className || styles.register} href={clinicHelpUrl("Vol.2 録画の新規受付・視聴期間の確認")}>
    {label}<ArrowUpRight size={21} strokeWidth={2.4} aria-hidden="true" />
  </a>;
}

export function TorstenJapanLanding() {
  const schema = {
    "@context": "https://schema.org", "@type": "Event",
    name: "Torsten Loibl Online Clinic Vol.2｜現代バスケットボールにおけるシューターの育成と活用",
    startDate: "2026-11-25T20:00:00+09:00", endDate: "2026-11-25T21:30:00+09:00",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    location: { "@type": "VirtualLocation", url: "https://riotbasketballacademy.com/ja/events/torsten-loibl-online-clinic" },
    organizer: { "@type": "Organization", name: "Riot Basketball Academy", url: "https://riotbasketballacademy.com" },
    performer: { "@type": "Person", name: "Torsten Loibl" },
  };

  return <SiteFrame locale="ja" languagePage="events/torsten-loibl-online-clinic">
    <div className={styles.page} lang="ja">
      <GrowthClickTracking />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className={styles.shell}>
        <section className={styles.hero} aria-labelledby="torsten-title">
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>NOV 25, 2026 · RBA ONLINE CLINIC VOL.2</p>
            <h1 id="torsten-title"><span className={styles.heroLabel}>世界の現場で指導してきたコーチに学ぶ。</span><span className={styles.name}>TORSTEN<br />LOIBL</span></h1>
            <p className={styles.heroProof}>B.PREMIER HC <span>FIBA WABC LEVEL 3</span> <span>2019 WORLD CHAMPION</span></p>
            <p className={styles.subheading}>シュートを「打つ技術」から、<br/>「試合で生み出す力」へ。</p>
            <p className={styles.lead}>育成年代の日本代表からプロまで。シュート技術・練習設計・スペーシング・判断をつなぐ90分。</p>
            <RegisterLink label="録画購入を申し込む" id="torsten-simple-hero" />
            <p className={styles.micro}>11月25日のLIVEは終了しました。録画購入希望を受付中。視聴期限と再生方法をご案内してから決済します。お支払い済みの方は再決済不要です。</p>
          </div>
          <aside className={styles.info} aria-label="開催日時と参加料金">
            <p className={styles.infoLabel}>LIVE終了 / 録画のご案内</p>
            <div className={styles.bigDate}>11.25 <span>WED</span></div>
            <p className={styles.time}><Clock3 size={18} aria-hidden="true" />20:00–21:30（日本時間）</p>
            <p className={styles.time}><Video size={18} aria-hidden="true" />Zoom・英語講義＋日本語逐次通訳</p>
            <div className={styles.prices}>
              <div><span>LIVE参加</span><strong>受付終了</strong></div>
              <div><span>録画30日間</span><strong>¥4,400</strong></div>
            </div>
            <p className={styles.infoFoot}>録画の従来料金は税込4,400円。公開から30日間の条件で、新規受付と残り期間は要確認。</p>
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

        <section className={styles.about} aria-labelledby="torsten-u12-coaching">
          <div>
            <p className={styles.sectionKicker}>U12 / COACHING OBSERVATION</p>
            <h2 id="torsten-u12-coaching">ミニバスの練習で、<br/>何を見ていますか？</h2>
            <p className={styles.help}>RBAが普段の育成現場を考えるための3つの問いです。講師の発言や本講習の配布教材を引用したものではありません。</p>
          </div>
          <ol className={styles.learning}>
            <li><strong>01</strong><span>ボールを受ける前に、守備者や味方の位置を見ているか。</span></li>
            <li><strong>02</strong><span>相手が寄ったとき、打つ・パスする・動き直す判断を選べるか。</span></li>
            <li><strong>03</strong><span>シュートドリルのあと、小さなゲームでも状況に応じて使えるか。</span></li>
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
            <h2 id="torsten-booking">録画のご案内と購入後のサポート</h2>
            <p>LIVE受付は終了しています。録画をご希望の方は、視聴可能期間を確認してからお申し込みください。</p>
          </div>
          <div className={styles.choices}>
            <div><span>11月25日開催済み</span><h3>LIVE参加</h3><strong>受付終了</strong></div>
            <div><span>開催後・視聴30日間</span><h3>録画視聴</h3><strong>4,400円</strong></div>
          </div>
          <RegisterLink label="録画購入の申し込み" id="torsten-simple-book" />
          <p className={styles.bookingNote}><CheckCircle2 size={18} aria-hidden="true" />購入済みの方は再決済不要です。RBAが個別に視聴対象を確認します。</p>
          <p className={styles.help}><a href="https://form.jotform.com/263243557140049">決済済み・アクセスできない方の無料照合依頼</a> ／ <a href={clinicHelpUrl("Vol.2 録画の再生・案内について")}>録画の再生・案内について問い合わせる</a>。メール内ブラウザで再生できないときはSafariまたはChromeで直接開いてみてください。解消しない場合は端末、ブラウザ、エラー表示をお知らせください。カード番号やパスワードは不要です。</p>
        </section>

        <section className={styles.faq} aria-labelledby="torsten-faq">
          <h2 id="torsten-faq">よくある質問</h2>
          {faqs.map(([question, answer])=><details key={question}><summary>{question}<ChevronDown size={17} aria-hidden="true" /></summary><p>{answer}</p></details>)}
        </section>
        <footer className={styles.bottom}>
          <p>本講習はRiot Basketball Academyの独立主催です。講師の所属・認定・過去の実績は経歴情報であり、FIBA、WABC、所属クラブ等が本講習を公認・後援するものではありません。</p>
          <p>経歴の参考：<a href="https://www.levanga.com/news/detail/id=22241" target="_blank" rel="noopener noreferrer">レバンガ北海道公式</a> ／ <a href="https://about.fiba.basketball/en/organization/recognized-organizations/world-association-of-basketball-coaches/executive-committee" target="_blank" rel="noopener noreferrer">FIBA WABC委員名簿</a>。Level 3 Coach Instructor Statusは2026年10月22日付のWABC会長書簡によるRPL認定。</p>
          <a href="https://www.jotform.com/app/263243514100442" className={styles.footerLink}>RBAのその他の学び・参加窓口 <ArrowRight size={16} aria-hidden="true" /></a>
        </footer>
      </div>
      <TorstenRecordingOffer locale="ja"/>
      <div className={styles.mobileBar}><span><b>LIVE受付終了</b><small>録画購入受付中・公開から30日間</small></span><RegisterLink label="購入申込" id="torsten-simple-mobile" className={styles.mobileButton}/></div>
    </div>
  </SiteFrame>;
}
