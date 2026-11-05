import Image from "next/image";
import {getSupportPhotos} from "@/lib/support-photos";
import { FounderProfile } from "./founder-profile";
import { GrowthClickTracking } from "./growth-click-tracking";
import { NovemberCampaign } from "./november-campaign";
import { OkinawaDecemberCampCallout } from "./okinawa-december-camp-callout";
import { SiteFrame, localePath } from "./site-frame";
import { isProgrammeActive, programmes } from "./programme-data";
import { tr } from "./network-data";
import styles from "./simple-japanese-home.module.css";
import { NoteBridge } from "./note-bridge";

const learning = [
  ["育成記事を探す", "RBA JOURNAL｜テーマから無料の記事を探せます。", "/ja/journal"],
  ["指導者の学び", "D-HUB｜日々の指導と練習設計を深める。", "/ja/d-hub"],
  ["MY HOME COURT", "RBA IDで活動と学びをひとつに。", "/ja/my-homecourt"],
  ["身体づくり", "成長期のトレーニングと回復を学ぶ。", "/ja/development"],
] as const;

export async function SimpleJapaneseHome() {
  const supportHero=(await getSupportPhotos())[0];
  const active = programmes.filter(p => isProgrammeActive(p)).sort((a, b) => Number(Boolean(a.ongoing)) - Number(Boolean(b.ongoing)) || a.startDate.localeCompare(b.startDate)).slice(0,6);
  return <div className={styles.page} lang="ja"><SiteFrame locale="ja" compact>
    <div className={styles.container}>
      <GrowthClickTracking />
      <section className={styles.hero} aria-labelledby="rba-home-title">
        <div>
          <p className={styles.label}>RIOT BASKETBALL ACADEMY</p>
          <h1 id="rba-home-title"><span>今のチームの外にも、</span><span>育つチャンスを。</span></h1>
          <p className={styles.intro}>全国のクリニック、指導者の学び、海外との交流。<br/>RBAは、選手・保護者・指導者と、継続する学びと挑戦をつくる育成プラットフォームです。</p>
          <nav className={styles.actions} aria-label="目的から選ぶ"><a className={styles.primary} data-growth-id="home-start-hub" href="/ja/start">参加・体験・相談から選ぶ →</a><a className={styles.secondary} href="#home-programmes">募集中の活動を見る →</a><a className={styles.secondary} href="/ja/clinic-request">地域での開催相談 →</a></nav>
        </div>
      </section>




      <NovemberCampaign />

      <section className={styles.regional} aria-labelledby="gream-sendai-u15-recruit">
        <div><p className={styles.label}>GREAM SENDAI / U15 BOYS CLUB</p><h2 id="gream-sendai-u15-recruit">仙台・太白区で、一緒にバスケを楽しもう。</h2><p>2026年にスタートしたU15男子クラブ。現在は中学2・3年生の在籍なし。経験を問わず一緒に楽しみ、成長する仲間を募集中です。練習会場・曜日は確認後にご案内。無料の参加相談から始められます。</p></div>
        <div className={styles.regionalActions}><a href="/ja/gream-sendai" data-growth-id="home-gream-sendai-u15-intake">GREAM仙台の活動・料金・入団相談 →</a></div>
      </section>


      <section className={styles.nextStep} aria-labelledby="home-next-step">
        <div className={styles.nextStepIntro}>
          <p className={styles.label}>FIND YOUR NEXT STEP</p>
          <h2 id="home-next-step">あなたに合う入口から。</h2>
          <p>参加する・見学する・指導を呼ぶ・一緒に企画する。料金や条件を確認し、公式の申込先へ進めます。</p>
        </div>
        <nav className={styles.nextStepLinks} aria-label="目的別の申込・相談窓口">
          <a data-growth-id="home-next-events" href="#home-programmes"><span>01</span>クリニック・キャンプ<span aria-hidden="true">→</span></a>
          <a data-growth-id="home-next-school" href="/ja/start#regular"><span>02</span>仙台スクール・RTB体験<span aria-hidden="true">→</span></a>
          <a data-growth-id="home-next-coach" href="/ja/start#coaches"><span>03</span>指導者・チームの学び<span aria-hidden="true">→</span></a>
          <a data-growth-id="home-next-business" href="/ja/start#partners"><span>04</span>地域開催・企業・海外<span aria-hidden="true">→</span></a>
        </nav>
      </section>

      <section className={styles.section} id="home-programmes" aria-labelledby="home-programme-title">
        <div className={styles.heading}><div><p className={styles.label}>参加する</p><h2 id="home-programme-title">募集中のクリニック・キャンプ</h2></div><a className={styles.textLink} href="/ja/opportunities">日程・地域から探す →</a></div>
        <div className={styles.programmes}>{active.map(p => {const href=p.japaneseInfoPath || (p.detailPath ? localePath("ja", p.detailPath) : p.applicationUrl);const external=/^https?:\/\//.test(href);return <article key={p.id}>
          <p className={styles.date}>{tr(p.date, "ja")}</p><h3>{tr(p.title, "ja")}</h3>
          <p className={styles.place}>{tr(p.place, "ja")}</p>
          <dl><div><dt>対象</dt><dd>{tr(p.audience, "ja")}</dd></div><div><dt>費用</dt><dd>{tr(p.price, "ja")}</dd></div></dl>
          <p className={styles.entryNote}>{tr(p.payment,"ja")}</p>
          <a data-growth-id={`home-programme-${p.id}`} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>詳細・申込へ →</a>
        </article>})}</div>
        {active.length === 0 ? <p className={styles.note}>次回の募集は活動一覧でお知らせします。</p> : <p className={styles.note}>会場・持ち物・支払い方法・申込確定の条件は、各活動の公式案内をご確認ください。</p>}
      </section>

      <section className={styles.regional} aria-labelledby="home-share-kit">
        <div><p className={styles.label}>保護者・指導者の皆さまへ</p><h2 id="home-share-kit">この機会を、必要な人に。</h2><p>沖縄・たつの・鹿児島・Torsten講習など。ご家庭やチームで使える紹介文を、活動別・相手別に選んでコピーできます。共有は任意です。</p></div>
        <div className={styles.regionalActions}><a data-growth-id="home-promotion-share" href="/ja/share">紹介文を選んで共有する →</a></div>
      </section>

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

      <section className={styles.regional} aria-labelledby="fukuoka-launch-title"><div><p className={styles.label}>RBA FUKUOKA / 福岡・佐賀</p><h2 id="fukuoka-launch-title">福岡、始動。アジアとつながる育成の入口へ。</h2><p>国際ユースキャンプ、国際試合、継続する育成を海外のオーガナイザーと企画。福岡・佐賀で一緒に活動する仲間を募集しています。</p></div><div className={styles.regionalActions}><a href="/ja/fukuoka">RBA福岡・協力の相談 →</a><a href="/ja/saga">RBA佐賀の活動 →</a></div></section>
      <section className={styles.support} aria-labelledby="home-support-title">
        {supportHero?<Image src={supportHero.src} alt={supportHero.alt} width={supportHero.width} height={supportHero.height} unoptimized loading="lazy"/>:null}
        <div><p className={styles.label}>RBA SUPPORTERS｜月500円から</p><h2 id="home-support-title">この笑顔を、<br/>一度きりにしない。</h2><p>チームを辞めても、バスケを辞めなくていい未来を。子どもたちの挑戦と、学び続ける環境を一緒に支えてください。</p><div className={styles.actions}><a className={styles.primary} href="/ja/support">応援の方法を見る →</a></div><p className={styles.note}>個人はnoteで月500円・1,000円。企業広告は月額1口・1万円＋税で受け付けています。</p></div>
      </section>
      <section className={styles.regional} aria-labelledby="next-court-tour-title"><div><p className={styles.label}>RBA NEXT COURT TOUR 2027 / 企業・地域パートナー募集</p><h2 id="next-court-tour-title">学びを届ける。その地域に、次の一歩を残す。</h2><p>選手のクリニック、地域指導者との学び、4週間のフォローをつなぐ全国育成企画。初年度目標、必要な費用、企業の応援方法を公開しています。</p></div><div className={styles.regionalActions}><a href="/ja/national-tour" data-growth-id="home-national-tour">全国ツアーの企画・企業協賛を見る →</a><a href="/downloads/RBA_NEXT_COURT_TOUR_2027_Proposal.pdf">企業向け提案書（PDF） ↗</a></div></section>
      <FounderProfile locale="ja"/>
      <section className={styles.section} aria-labelledby="home-purpose-title">
        <div className={styles.heading}><div><p className={styles.label}>あなたの目的から</p><h2 id="home-purpose-title">参加する。チームに呼ぶ。地域でつくる。</h2></div></div>
        <div className={styles.purposeGrid}>{[
          ["選手・保護者", "近くで参加したい", "募集中の活動を確認。近くに開催がなければ、希望地域を登録できます。", "/ja/opportunities", "日程・対象・費用を見る", "family"],
          ["チームの指導者", "普段の練習につなげたい", "チームの課題に合わせた訪問指導と、指導者への引き継ぎを相談できます。", "/ja/team-development", "チーム支援を見る", "team"],
          ["地域の主催者", "地元で開催したい", "チーム訪問・地域合同・継続開催。会場候補や時期から一緒に整理します。", "/ja/clinic-request", "開催の流れ・費用を見る", "host"],
          ["企業・協賛担当者", "子どもの挑戦を支えたい", "地域の育成機会への協賛や、企業・団体の親子企画を相談できます。", "/ja/partners", "連携・協賛の方法を見る", "partner"],
        ].map(([label,title,body,href,cta,id]) => <article key={id}><p className={styles.label}>{label}</p><h3>{title}</h3><p>{body}</p><a href={href} data-growth-id={`home-${id}`}>{cta} →</a></article>)}</div>
        <p className={styles.note}>お近くに開催がない方は、<a href="/ja/clinic-interest" data-growth-id="home-interest">無料の開催希望登録</a>へ。日程・会場・参加費をご案内してから、参加を決められます。</p>
      </section>



      <section className={styles.regional} aria-labelledby="gream-okinawa-public">
        <div>
          <p className={styles.label}>GREAM OKINAWA / DEVELOPMENT & LOCAL PARTNERS</p>
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

      <section className={styles.regional} aria-labelledby="sendai-school-trial">
        <div><p className={styles.label}>仙台スクール</p><h2 id="sendai-school-trial">所属を変えずに、学べる仙台スクール。</h2><p>U12・U15の定期スクール。GREAM仙台U15男子クラブとは別のプログラムで、体験相談を受け付けています。</p></div>
        <div className={styles.regionalActions}><a href="/ja/sendai-school" data-growth-id="home-sendai-school-trial">体験のご案内 →</a></div>
      </section>

      <section className={styles.regional} aria-labelledby="kagoshima-clinic-home">
        <div><p className={styles.label}>BASTET × RBA / 2026.11.29（日）</p><h2 id="kagoshima-clinic-home">鹿児島で、一緒にバスケ。</h2><p>錦江湾高校体育館。小・中・高校生（男女）対象。午前9:30〜12:00／午後13:00〜15:30。通し4,000円・1部のみ3,000円。</p></div>
        <div className={styles.regionalActions}><a href="/ja/events/kagoshima-clinic-2026-11-29">詳細・オンライン申込へ →</a></div>
      </section>

      <OkinawaDecemberCampCallout locale="ja" />

      <section className={styles.regional} aria-labelledby="regional-school-invitation">
        <div><p className={styles.label}>地域スクール</p><h2 id="regional-school-invitation">あなたの街にも、RBAを。</h2><p>参加希望・指導・運営・会場・協賛の相談を受け付けています。開催地域・日程・料金は未定。希望の送信・相談は無料です。</p></div>
        <div className={styles.regionalActions}><a href="/ja/regional-program#families">近くで参加したい →</a><a href="/ja/regional-program#partners">指導・運営に協力したい →</a></div>
      </section>

      <section className={styles.regional} aria-labelledby="home-continue-title">
        <div><p className={styles.label}>参加した日の学びを、次の練習へ</p><h2 id="home-continue-title">一つ試す。振り返る。また挑戦する。</h2><p>クリニックで気づいたことから、次の練習で試すことを一つ。保護者の声かけ例と振り返りメモを、登録なしで使えます。</p></div>
        <div className={styles.regionalActions}><a href="/ja/after-clinic" data-growth-id="home-followup">参加後の振り返り・次回の探し方 →</a></div>
      </section>

      <section className={styles.section} id="home-learning" aria-labelledby="home-learning-title">
        <div className={styles.heading}><div><p className={styles.label}>学ぶ・読む</p><h2 id="home-learning-title">育成を学ぶ</h2></div></div>
        <NoteBridge variant="home" />
        <div className={styles.learning}>{learning.map(([title, body, href]) => <a href={href} key={href}><h3>{title}<span aria-hidden="true">↗</span></h3><p>{body}</p></a>)}</div>
      </section>

      <nav className={styles.aboutLinks} aria-label="RBAについて"><a className={styles.textLink} href="/ja/about">RBAについて →</a><a className={styles.textLink} href="/ja/approach">育成方針 →</a><a className={styles.textLink} href="/ja/regions">活動実績 →</a></nav>
    </div>
  </SiteFrame></div>;
}
