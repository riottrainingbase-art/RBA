import Image from "next/image";
import {getSupportPhotos} from "@/lib/support-photos";
import { FounderProfile } from "./founder-profile";
import { GrowthClickTracking } from "./growth-click-tracking";
import { OkinawaDecemberCampCallout } from "./okinawa-december-camp-callout";
import { SiteFrame, localePath } from "./site-frame";
import { isProgrammeActive, programmes } from "./programme-data";
import { tr } from "./network-data";
import styles from "./simple-japanese-home.module.css";

const learning = [
  ["育成記事", "チーム選び、出場機会、練習の悩みから。", "/ja/journal"],
  ["MY HOME COURT", "RBA IDは無料。活動と学びを自分のページに。", "/ja/my-homecourt"],
  ["S&C・身体づくり", "成長期のトレーニング、負荷と回復を学ぶ。", "/ja/development"],
  ["海外交流", "日本とアジアのキャンプ・チーム交流を相談。", "/ja/international"],
  ["RBA公式ウェア", "コートへ、その先へ。スポーツTシャツを発売準備中。", "/ja/store"],
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
          <nav className={styles.actions} aria-label="目的から選ぶ"><a className={styles.primary} href="#home-programmes">活動を探す →</a><a className={styles.secondary} href="/ja/after-clinic" data-growth-id="home-return">参加した方へ →</a><a className={styles.secondary} href="/ja/development-projects" data-growth-id="home-development-project">次の挑戦を一緒につくる →</a></nav>
        </div>
      </section>



      <section className={styles.support} aria-labelledby="home-support-title">
        {supportHero?<Image src={supportHero.src} alt={supportHero.alt} width={supportHero.width} height={supportHero.height} unoptimized loading="lazy"/>:null}
        <div><p className={styles.label}>RBA SUPPORTERS｜月500円から</p><h2 id="home-support-title">この笑顔を、<br/>一度きりにしない。</h2><p>チームを辞めても、バスケを辞めなくていい未来を。子どもたちの挑戦と、学び続ける環境を一緒に支えてください。</p><div className={styles.actions}><a className={styles.primary} href="/ja/support">活動写真・応援プランを見る →</a><a className={styles.secondary} href="https://note.com/rba_official/membership/join">月500円から仲間になる ↗</a></div><p className={styles.note}>個人はnoteで月500円・1,000円。企業広告は月額1口・1万円＋税で受け付けています。</p></div>
      </section>
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

      <section className={styles.regional} aria-labelledby="miyako-oct31-feature">
        <div>
          <p className={styles.label}>10月31日（土）｜岩手・宮古｜RBA × BiiLDact</p>
          <h2 id="miyako-oct31-feature">宮古で、バスケが変わる。</h2>
          <p>千徳地区体育館 10:00〜17:00（受付9:30）。小学5年〜中学3年・定員30名。技術を試合の判断につなげる1DAY CLINIC。参加費・条件は現地主催者の公式フォームをご確認ください。</p>
        </div>
        <div className={styles.regionalActions}>
          <a href="/events/miyako-20261031" data-growth-id="home-miyako-20261031">開催詳細・公式申込フォームへ →</a>
        </div>
      </section>

      <section className={styles.section} id="home-programmes" aria-labelledby="home-programme-title">
        <div className={styles.heading}><div><p className={styles.label}>参加する</p><h2 id="home-programme-title">募集中の活動</h2></div><a className={styles.textLink} href="/ja/opportunities">すべての活動を見る →</a></div>
        <div className={styles.programmes}>{active.map(p => {const href=p.japaneseInfoPath || (p.detailPath ? localePath("ja", p.detailPath) : p.applicationUrl);const external=/^https?:\/\//.test(href);return <article key={p.id}>
          <p className={styles.date}>{tr(p.date, "ja")}</p><h3>{tr(p.title, "ja")}</h3>
          <p className={styles.place}>{tr(p.place, "ja")}</p>
          <dl><div><dt>対象</dt><dd>{tr(p.audience, "ja")}</dd></div><div><dt>費用</dt><dd>{tr(p.price, "ja")}</dd></div></dl>
          <p className={styles.entryNote}>{tr(p.payment,"ja")}</p>
          <a data-growth-id={`home-programme-${p.id}`} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>内容・参加条件を確認 →</a>
        </article>})}</div>
        {active.length === 0 ? <p className={styles.note}>次回の募集は活動一覧でお知らせします。</p> : <p className={styles.note}>会場・持ち物・支払い方法・申込確定の条件は、各活動の公式案内をご確認ください。</p>}
      </section>

      <section className={styles.regional} aria-labelledby="sendai-u12-moniwadai">
        <div><p className={styles.label}>仙台 U12 / 茂庭台小学校</p><h2 id="sendai-u12-moniwadai">小学生の学びを、茂庭台から。</h2><p>仙台市太白区・茂庭台小学校でのU12スクール。小学5年生も対象です。原則金曜18:00〜19:30（月3回を基本）。入会金10,000円・月額7,700円。具体的な開催日・体験条件は確認中です。</p></div>
        <div className={styles.regionalActions}><a href="/ja/u12-school">スクールの詳細・体験相談 →</a></div>
      </section>

      <section className={styles.regional} aria-labelledby="kagoshima-clinic-home">
        <div><p className={styles.label}>BASTET × RBA / 2026.11.29（日）</p><h2 id="kagoshima-clinic-home">鹿児島で、一緒にバスケ。</h2><p>錦江湾高校体育館。小・中・高校生（男女）対象。午前9:30〜12:00／午後13:00〜15:30。通し4,000円・1部のみ3,000円。</p></div>
        <div className={styles.regionalActions}><a href="/ja/events/kagoshima-clinic-2026-11-29">詳細・メール／DMで申し込む →</a></div>
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
        <div className={styles.heading}><div><p className={styles.label}>学ぶ・つながる</p><h2 id="home-learning-title">学びと交流</h2></div></div>
        <div className={styles.learning}>{learning.map(([title, body, href]) => <a href={href} key={href}><h3>{title}<span aria-hidden="true">↗</span></h3><p>{body}</p></a>)}</div>
      </section>

      <nav className={styles.aboutLinks} aria-label="RBAについて"><a className={styles.textLink} href="/ja/about">RBAについて →</a><a className={styles.textLink} href="/ja/approach">育成方針 →</a><a className={styles.textLink} href="/ja/regions">活動実績 →</a></nav>
    </div>
  </SiteFrame></div>;
}
