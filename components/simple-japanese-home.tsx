import Image from "next/image";
import { SendaiCommunity } from "./sendai-community";
import { GrowthClickTracking } from "./growth-click-tracking";
import { SiteFrame, localePath } from "./site-frame";
import { isProgrammeActive, programmes } from "./programme-data";
import { tr } from "./network-data";
import styles from "./simple-japanese-home.module.css";
import { NoteBridge } from "./note-bridge";
import { CorporateSupportStrip } from "./corporate-support-strip";
import { isTaipeiClinicUpcoming, taipeiClinicCopy, taipeiClinicPath } from "./taipei-clinic-data";

const learning = [
  ["育成記事を探す", "RBA JOURNAL｜テーマから無料の記事を探せます。", "/ja/journal"],
  ["指導者の学び", "D-HUB｜日々の指導と練習設計を深める。", "/ja/d-hub"],
  ["MY HOME COURT", "RBA IDで活動と学びをひとつに。", "/ja/my-homecourt"],
  ["身体づくり", "成長期のトレーニングと回復を学ぶ。", "/ja/development"],
] as const;
export async function SimpleJapaneseHome() {
  const active = programmes
    .filter(p => isProgrammeActive(p))
    .sort((a, b) => Number(Boolean(a.ongoing)) - Number(Boolean(b.ongoing)) || a.startDate.localeCompare(b.startDate))
    .slice(0, 4);
  return <div className={styles.page} lang="ja"><SiteFrame locale="ja" compact>
    <div className={styles.container}>
      <GrowthClickTracking />

      <section className={styles.hero} aria-labelledby="rba-home-title">
        <div>
          <p className={styles.label}>RIOT BASKETBALL ACADEMY / 仙台・太白区</p>
          <h1 id="rba-home-title"><span>今のチームの外にも、</span><span>育つチャンスを。</span></h1>
          <p className={styles.intro}>仙台市太白区から、全国・アジアへ。<br/>RBAは、選手・保護者・指導者と、継続する学びと挑戦をつくる育成プラットフォームです。</p>
          <nav className={styles.actions} aria-label="最優先の案内"><a className={styles.primary} data-growth-id="home-hero-events" href="#home-programmes">クリニック・キャンプの開催案内 →</a><a className={styles.secondary} data-growth-id="home-hero-supporter" href="#home-supporter">月500円でRBAを応援 →</a><a className={styles.secondary} data-growth-id="home-hero-school-trial" href="/ja/sendai-school">仙台スクールの体験相談 →</a></nav>
        </div>
      </section>

      <section className={styles.nextStep} id="home-supporter" aria-labelledby="home-supporter-title">
        <div className={styles.nextStepIntro}>
          <p className={styles.label}>RBA応援会員</p>
          <h2 id="home-supporter-title">月500円で、子どもたちのバスケットボールを応援。</h2>
          <p>RBAの全クリニックに合わせて会員交流会を開きます。当日の練習や子どもたちの育成について、西尾優人と直接話せる時間です。</p>
        </div>
        <div>
          <a className={styles.primary} data-growth-id="home-supporter-note-join" href="https://note.com/rba_official/membership/join">月500円のプランを見る →</a>
          <p className={styles.note}>公式noteのプラン一覧で「応援メンバー（月500円）」をお選びください。</p>
        </div>
        <a className={styles.textLink} data-growth-id="home-supporter-details" href="/ja/supporters">会員交流会・特典を見る →</a>
      </section>

      <section className={styles.section} id="home-programmes" aria-labelledby="home-programme-title">
        <div className={styles.heading}><div><p className={styles.label}>参加する</p><h2 id="home-programme-title">募集中のクリニック・キャンプ</h2></div><a className={styles.textLink} href="/ja/opportunities">すべての開催予定を見る →</a></div>
        <div className={styles.programmes}>{active.map(p => {const href=p.japaneseInfoPath || (p.detailPath ? localePath("ja", p.detailPath) : p.applicationUrl);const external=/^https?:\/\//.test(href);return <article key={p.id}>
          <p className={styles.date}>{tr(p.date, "ja")}</p><h3>{tr(p.title, "ja")}</h3>
          <p className={styles.place}>{tr(p.place, "ja")}</p>
          <dl><div><dt>対象</dt><dd>{tr(p.audience, "ja")}</dd></div><div><dt>費用</dt><dd>{tr(p.price, "ja")}</dd></div></dl>
          <p className={styles.entryNote}>{tr(p.payment,"ja")}</p>
          <a data-growth-id={`home-programme-${p.id}`} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>詳細・申込へ →</a>
        </article>})}</div>
        {active.length === 0 ? <p className={styles.note}>次回の募集は活動一覧でお知らせします。</p> : <p className={styles.note}>会場・持ち物・支払い方法・申込確定の条件は、各活動の公式案内をご確認ください。</p>}
      </section>

      <div id="home-partners" className={styles.sponsorAnchor} aria-label="協賛・パートナー">
        <CorporateSupportStrip locale="ja" />
      </div>

      <section className={styles.nextStep} aria-labelledby="home-next-step">
        <div className={styles.nextStepIntro}>
          <p className={styles.label}>FIRST TIME HERE?</p>
          <h2 id="home-next-step">はじめてRBAを知った方へ。</h2>
          <p>RBAは全国の育成クリニック、指導者教育、国際交流を行っています。まずは目的に合った入口をお選びください。</p>
        </div>
        <nav className={styles.nextStepLinks} aria-label="はじめての方の目的別案内">
          <a data-growth-id="home-next-events" href="#home-programmes"><span aria-hidden="true">01</span><strong>選手・保護者の方</strong><span aria-hidden="true">↗</span></a>
          <a data-growth-id="home-next-school" href="/ja/sendai-school"><span aria-hidden="true">02</span><strong>スクールを探す方</strong><span aria-hidden="true">↗</span></a>
          <a data-growth-id="home-next-coach" href="/ja/team-development"><span aria-hidden="true">03</span><strong>指導者・チームの方</strong><span aria-hidden="true">↗</span></a>
          <a data-growth-id="home-next-business" href="/ja/clinic-request"><span aria-hidden="true">04</span><strong>地域の主催者の方</strong><span aria-hidden="true">↗</span></a>
        </nav>
      </section>

      <section className={styles.ageHub} aria-labelledby="home-age-categories">
        <p className={styles.label}>AGE GROUPS / DEVELOPMENT PATHWAY</p>
        <h2 id="home-age-categories">U12・U15・GREAMを、目的で選ぶ。</h2>
        <p className={styles.ageIntro}>小学生の学び、中学生年代の学び、継続して活動するU15チーム。目的と所属形態が違うプログラムを、混同せずにご案内します。</p>
        <nav className={styles.ageGrid} aria-label="年代・U15育成チームから選ぶ">
          <a className={styles.ageCard} href="/ja/u12" data-growth-id="home-u12-category">
            <span className={styles.ageEyebrow}>01 / ELEMENTARY</span>
            <strong>U12</strong>
            <span className={styles.ageDescription}>小学生向けスクール・クリニック・キャンプ</span>
            <span className={styles.ageAction}>U12の活動を見る →</span>
          </a>
          <a className={styles.ageCard} href="/ja/u15" data-growth-id="home-u15-category">
            <span className={styles.ageEyebrow}>02 / JUNIOR HIGH</span>
            <strong>U15</strong>
            <span className={styles.ageDescription}>育成チームと、所属を変えずに学ぶスクール</span>
            <span className={styles.ageAction}>U15の活動を見る →</span>
          </a>
          <a className={styles.ageCard} href="/ja/gream" data-growth-id="home-gream-regions">
            <span className={styles.ageEyebrow}>03 / U15 TEAM PROJECT</span>
            <strong>GREAM</strong>
            <span className={styles.ageDescription}>仙台・沖縄・秋田のU15育成チーム・地域連携</span>
            <span className={styles.ageAction}>各地域のチームを見る →</span>
          </a>
        </nav>
        <p className={styles.note}>企業・お店・個人の皆さまへ：<a href="/ja/gream/support" data-growth-id="home-gream-support">GREAMの育成を応援する →</a></p>
      </section>
      <SendaiCommunity />

      <section className={styles.schoolSpotlight} aria-labelledby="home-sendai-school">
        <div className={styles.schoolSpotlightIntro}>
          <p className={styles.label}>RBA SENDAI SCHOOL / U12 &amp; U15</p>
          <h2 id="home-sendai-school">チームはそのまま、試合で使える力を。</h2>
          <p>仙台市太白区のU12・U15バスケットボールスクール。小学生から中学生まで、見る・判断する・実行する力を少人数のゲームで育てます。所属チームを変える必要はありません。</p>
          <div className={styles.schoolFacts}><span>U12｜金曜18:00〜19:30（調整中）</span><span>U15｜木曜18:00〜19:30（月3回）</span></div>
          <small>相談は無料。体験日・実際の体験費用・受入可否はRBAからご案内します。</small>
        </div>
        <div className={styles.schoolSpotlightActions}>
          <a href="/ja/sendai-school" data-growth-id="home-school-spotlight">スクールの詳細・無料体験相談 →</a>
          <a href="/ja/gream-sendai" data-growth-id="home-school-to-club">GREAM仙台 U15クラブを見る →</a>
        </div>
      </section>

      <section className={styles.hostCallout} aria-labelledby="home-host-cta-title">
        <div className={styles.hostContent}>
          <p className={styles.hostKicker}>FOR TEAMS &amp; LOCAL ORGANISERS</p>
          <h2 id="home-host-cta-title">あなたの地域に、<span>RBAを。</span></h2>
          <p className={styles.hostDescription}>地域のチーム・指導者・主催者と、子どもたちが学べる機会をつくります。</p>
          <ul className={styles.hostFormats} aria-label="開催モデル">
            <li>チーム訪問</li>
            <li>地域合同クリニック</li>
            <li>3回の継続開催</li>
          </ul>
        </div>
        <div className={styles.hostActions}>
          <a className={styles.hostPrimary} data-growth-id="home-regional-host-cta" href="/ja/clinic-request"><span>無料で開催相談する</span><span aria-hidden="true">↗</span></a>
          <p>ご相談と初回見積もりは無料。会場・内容・費用は事前に確認し、双方の合意後に正式決定します。</p>
        </div>
      </section>

      {isTaipeiClinicUpcoming() && <section className={styles.regional} aria-labelledby="home-taipei-clinic">
        <div><p className={styles.label}>RBA × SPARTANS Academy / {taipeiClinicCopy.ja.dates}</p>
          <h2 id="home-taipei-clinic">{taipeiClinicCopy.ja.title}</h2><p>{taipeiClinicCopy.ja.pending}</p></div>
        <div className={styles.regionalActions}><a href={taipeiClinicPath("ja")}>{taipeiClinicCopy.ja.details} →</a></div>
      </section>}

      <section className={styles.parentCommunity} aria-labelledby="home-parent-community-title">
        <Image src="/images/parents-openchat-banner.webp" alt="" width={1672} height={941} loading="lazy" />
        <div className={styles.parentCommunityBody}>
          <p className={styles.parentCommunityLabel}>保護者向け LINEオープンチャット</p>
          <h2 id="home-parent-community-title">子どものバスケ、<br/>ひとりで悩まなくていい。</h2>
          <p>声のかけ方、見守り方、育つ環境の選び方。全国の保護者と一緒に考えませんか？</p>
          <a href="https://line.me/ti/g2/8GsWD4iOnyOuoNj60_s24ljg_--cQ7IFMjfDLw?utm_source=invitation&amp;utm_medium=link_copy&amp;utm_campaign=default" target="_blank" rel="noopener noreferrer" data-growth-id="home-parent-openchat">保護者の部屋に参加する ↗</a>
          <p className={styles.parentCommunityNote}>「育成を考える保護者の部屋」のLINE参加画面が開きます。</p>
        </div>
      </section>

      <section className={styles.regional} aria-labelledby="gream-okinawa-public">
        <div>
          <p className={styles.label}>GREAM OKINAWA / DEVELOPMENT & PARTNERS</p>
          <h2 id="gream-okinawa-public">沖縄に、学びが続くコートを。</h2>
          <p>
            現在の会員・保護者の皆さまには活動ごとの連絡先をご案内しています。
            RBAは、今後の育成活動に向けて現地コーチ・会場・安全管理の体制を整備中です。
            新しい定期活動は条件を確認できた段階でご案内します。指導者・S&amp;C・施設協力の相談は受付中です。
          </p>
        </div>
        <div className={styles.regionalActions}>
          <a href="/ja/okinawa" data-growth-id="home-gream-okinawa-programme">沖縄の活動・会員案内を見る →</a>
          <a href="/ja/okinawa-coach" data-growth-id="home-gream-okinawa-coaches">沖縄のコーチ・協力者募集 →</a>
        </div>
      </section>

      <section className={styles.section} id="home-learning" aria-labelledby="home-learning-title">
        <div className={styles.heading}><div><p className={styles.label}>学ぶ・読む</p><h2 id="home-learning-title">育成を学ぶ</h2></div></div>
        <NoteBridge variant="home" />
        <div className={styles.learning}>{learning.map(([title, body, href]) => <a href={href} key={href}><h3>{title}<span aria-hidden="true">↗</span></h3><p>{body}</p></a>)}</div>
      </section>

      <nav className={styles.aboutLinks} aria-label="RBAについて"><a className={styles.textLink} href="/ja/about">RBAについて →</a><a className={styles.textLink} href="/ja/approach">育成方針 →</a><a className={styles.textLink} href="/ja/regions">活動地域 →</a><a className={styles.textLink} href="/ja/after-clinic">参加後の振り返り →</a><a className={styles.textLink} href="/ja/share">開催情報をシェア →</a></nav>
    </div>
  </SiteFrame></div>;
}
