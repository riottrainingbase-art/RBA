import type { Metadata } from "next";
import { ArrowRight, BookOpenText, CalendarDays, CheckCircle2, ChevronRight, Globe2, HeartHandshake, MapPin, ShieldCheck, Users } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import styles from "./page.module.css";

const interestForm = "https://form.jotform.com/263217942684061";
const programmesUrl = "/ja/opportunities";
export const metadata: Metadata = {
  title: "全国開催・無料先行案内｜MY HOME COURT｜Riot Basketball Academy",
  description: "RBAのクリニック、Development Camp、指導者講習、国際交流。全国47都道府県から開催希望と無料先行案内を受付中。参加確約・開催確約・決済を伴わない無料登録です。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/my-homecourt/nationwide" },
};

const programmes = [
  { name: "選手・保護者", title: "今いる地域から、次の挑戦へ。", body: "スキルクリニック、Development Camp、RBA UNITED・国際交流など、興味のある育成機会や対象年代を教えてください。", icon: Users },
  { name: "指導者・学校", title: "学びを、地域に広げる。", body: "育成年代の練習設計、判断、発達や傷害予防など。講習やチーム指導の希望を全国から受け付けます。", icon: BookOpenText },
  { name: "地域主催・施設・協賛", title: "あなたの街で、開催する。", body: "体育館、運営スタッフ、主催、協賛などの協力も歓迎します。開催時期や地域、実施条件を相談できます。", icon: HeartHandshake },
] as const;

const steps = [
  { label: "01", title: "無料で先行案内に登録", body: "成人の連絡先、希望地域、対象年代、関心のあるプログラムを登録。未成年の選手は保護者が登録してください。" },
  { label: "02", title: "地域・年代ごとの希望を整理", body: "いただいた希望をもとに企画・会場・指導体制・安全条件を検討。登録があっても開催は確約されません。" },
  { label: "03", title: "開催が決まった企画から正式案内", body: "日時、会場、費用、対象、参加定員と申込方法が確定した企画のみ、別途正式募集でお知らせします。" },
  { label: "04", title: "内容を確認して正式申込", body: "参加したい企画を選んで正式にお申し込みください。必要な費用や決済はこの無料先行登録では発生しません。" },
] as const;

const faq = [
  { q: "どの地域から登録できますか？", a: "日本全国47都道府県から登録できます。地域による受付制限はありません。開催を希望する地域が複数ある場合は、自由記入欄でお知らせください。" },
  { q: "先行登録には人数の上限がありますか？", a: "先行案内の希望登録には人数制限を設けていません。一方、実際に開催するクリニックやキャンプでは、会場収容人数・指導体制・安全管理に合わせて参加定員を設ける場合があります。" },
  { q: "登録すれば自分の地域で開催されますか？", a: "開催をお約束するものではありません。全国各地での開催を目指していますが、日時・会場・主催者・指導体制を確認できた企画からご案内します。" },
  { q: "選手として参加するには選抜や選考が必要ですか？", a: "通常のクリニック・キャンプの先行案内登録に選考はありません。年齢・対象条件や定員は各企画の正式募集でお知らせします。特定の国際大会・チーム編成には別途参加条件がある場合があります。" },
  { q: "今すぐ参加費が必要ですか？", a: "いいえ。無料の先行登録で、予約・正式申込・前金・決済は発生しません。正式な募集が始まった場合も、内容と費用を確認してからお申し込みいただけます。" },
] as const;

export default function NationwideHomecourtPage() {
  return <SiteFrame locale="ja" languagePage="my-homecourt">
    <main className={styles.page} id="main">
      <header className={styles.hero}>
        <div className={styles.wrap}>
          <div className={styles.topline}><a href="/ja/my-homecourt" className={styles.back}>← MY HOME COURT</a><span>RIOT BASKETBALL ACADEMY / NATIONAL NETWORK</span></div>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.kicker}>全国47都道府県から受付中 / FREE EARLY ENTRY</p>
              <h1>あなたの街に、<br /><em>次のコートを。</em></h1>
              <p className={styles.lead}>RBAは、全国各地でのクリニック・キャンプ・指導者講習・国際交流の機会を広げていきます。まずは、希望する地域や活動を教えてください。</p>
              <div className={styles.actions}>
                <a className={styles.primary} href={interestForm} target="_blank" rel="noopener noreferrer">無料で先行案内に登録 <ArrowRight aria-hidden="true" size={19}/></a>
                <a className={styles.outline} href={programmesUrl}>現在の開催情報を見る <ChevronRight aria-hidden="true" size={19}/></a>
              </div>
              <p className={styles.smallNote}><ShieldCheck aria-hidden="true" size={18}/>登録無料・希望受付人数の上限なし。開催・参加・予約・決済は確約されません。</p>
            </div>
            <div className={styles.heroPanel} aria-label="受付概要">
              <div className={styles.heroPanelLabel}>ONE COUNTRY. MORE COURTS.</div>
              <strong>47</strong>
              <p>都道府県から<br />無料先行受付</p>
              <div className={styles.heroPanelDivider}/>
              <span>全国どこからでも、開催希望を届けられる。</span>
              <small>※47都道府県すべての開催決定を意味しません。</small>
            </div>
          </div>
        </div>
      </header>

      <section className={styles.section} aria-labelledby="for-whom">
        <div className={styles.wrap}>
          <div className={styles.sectionHead}><p className={styles.eyebrow}>WHO IT'S FOR</p><h2 id="for-whom">参加したい人も。<br />開催したい人も。</h2><p>所属クラブを変える必要はありません。選手・保護者・指導者・地域の皆さん、それぞれの立場からご登録いただけます。</p></div>
          <div className={styles.cards}>{programmes.map(({ name,title,body,icon: Icon })=><article key={name} className={styles.card}><Icon size={30} strokeWidth={1.8} aria-hidden="true"/><span>{name}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
        </div>
      </section>

      <section className={styles.darkSection} aria-labelledby="how-it-works">
        <div className={styles.wrap}>
          <div className={styles.sectionHead}><p className={styles.eyebrow}>HOW IT WORKS</p><h2 id="how-it-works">希望を届ける。<br />開催につなげる。</h2><p>先行案内と正式な参加申込は、明確に分けています。</p></div>
          <ol className={styles.steps}>{steps.map(step=><li key={step.label}><span className={styles.stepNo}>{step.label}</span><div><h3>{step.title}</h3><p>{step.body}</p></div><CheckCircle2 aria-hidden="true" size={22}/></li>)}</ol>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="where">
        <div className={styles.wrap}>
          <div className={styles.twoCol}>
            <div><p className={styles.eyebrow}>JAPAN-WIDE, NOT ALL CONFIRMED</p><h2 id="where">開催希望は全国から。<br />開催確定は一つずつ。</h2><p className={styles.body}>このページは全国での開催を目指すための先行案内・希望受付です。すべての都道府県で日程が確定しているわけではありません。開催が決まった企画は、対象年代・会場・時間・参加費・申込条件を改めて案内します。</p></div>
            <div className={styles.detailPanel}>
              <div><Globe2 aria-hidden="true"/><strong>地域制限なし</strong><span>47都道府県から希望を受付</span></div>
              <div><Users aria-hidden="true"/><strong>希望登録は人数無制限</strong><span>実開催の定員とは別に管理</span></div>
              <div><CalendarDays aria-hidden="true"/><strong>確定した情報だけ正式募集</strong><span>日時・会場・費用・安全条件を明示</span></div>
              <div><MapPin aria-hidden="true"/><strong>地域の協力者も歓迎</strong><span>体育館・チーム・運営・協賛の相談</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.faqSection} aria-labelledby="faq-heading"><div className={styles.wrap}>
        <p className={styles.eyebrow}>FAQ</p><h2 id="faq-heading">登録前に確認したいこと。</h2>
        <div className={styles.faqList}>{faq.map(({q,a})=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
      </div></section>

      <section className={styles.bottom} aria-labelledby="join-heading"><div className={styles.wrap}>
        <div className={styles.bottomGrid}><div><p className={styles.eyebrow}>START FROM YOUR HOME COURT</p><h2 id="join-heading">次の育成機会を、<br />あなたの地域から。</h2><p>希望の地域や活動を、無料で登録してください。全国の声を集めながら、一つずつ実現につなげていきます。</p></div>
        <div className={styles.bottomActions}><a href={interestForm} target="_blank" rel="noopener noreferrer" className={styles.primary}>全国開催・無料先行案内へ <ArrowRight aria-hidden="true"/></a><a href="/ja/policies">個人情報の取り扱いを見る <ChevronRight aria-hidden="true" size={17}/></a><small>未成年の選手については保護者が登録してください。先行受付には参加確約・決済はありません。</small></div></div>
      </div></section>
    </main>
  </SiteFrame>;
}
