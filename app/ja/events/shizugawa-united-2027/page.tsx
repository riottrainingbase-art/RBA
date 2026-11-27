import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import styles from "../shizugawa-development-camp-2026/page.module.css";

export const metadata: Metadata = {
  title: "RBA UNITED 志津川育成合宿｜2027年2月・企画案内",
  description: "小4〜中3の男女を対象に、個人で集まる1泊2日の育成合宿を計画しています。宮城・南三陸の開催希望日、研修内容、参加費の案内状況。",
  alternates: { canonical: "/ja/events/shizugawa-united-2027" },
};

export default function Page() {
  return <SiteFrame locale="ja"><div className={styles.page}>
    <section className={styles.hero}>
      <a className={styles.back} href="/ja/united">← RBA UNITED</a>
      <p className={styles.eyebrow}>宮城・南三陸｜企画の事前案内</p>
      <h1>RBA UNITED<br/>志津川育成合宿</h1>
      <p className={styles.heroLead}>初めて会う仲間と、2日間だけのチームをつくる。</p>
      <p>開催希望日　2027年2月6日（土）〜7日（日）<br/>宮城県志津川自然の家が日程を調整中です。</p>
      <a className={styles.primary} href="#family">参加を検討中の方へ ↓</a>
    </section>
    <section className={styles.section}><h2>昨日合わなかったパスを、<br/>今日もう一度。</h2>
      <p className={styles.intro}>味方がドリブルを止めたとき、どこに動けばもう一度パスを受けられるか。GREAM SENDAIの選手と、ほかのチームから一人で来た選手が班を組み、コートで試します。</p>
      <div className={styles.days}><article><h3>1日目｜仲間を知る</h3><p>年代・体格・経験を見ながら2対2、3対3へ。夜は仲間とプレーを一つ振り返り、翌日に試すことを決めます。</p></article>
      <article><h3>2日目｜同じ仲間と再挑戦</h3><p>交流ゲームで昨日の課題に挑戦。最後に、所属チームで続けたい練習を一人ずつ書いて持ち帰ります。</p></article></div>
    </section>
    <section id="family" className={styles.overview}><h2>ご家庭へのご案内</h2><dl className={styles.facts}>
      <div><dt>対象予定</dt><dd>小学4年生〜中学3年生の男女。所属を問わず個人で参加できる企画です。</dd></div>
      <div><dt>宿泊・運営</dt><dd>1泊2日、初日昼・夕と2日目朝・昼の4食を予定。西尾優人とアシスタント1名での引率を計画しています。現地集合・現地解散を予定しています。定員、部屋割り、集合解散の時刻は受入条件が決まり次第ご案内します。</dd></div>
      <div><dt>費用・ウェア</dt><dd>参加費、含まれる費用、取消条件は正式募集時に掲載します。専用ウェアは希望購入を検討中です。</dd></div>
      <div><dt>月末の交流</dt><dd>2月27・28日に柴田町で計画しているRIZEHOPEはU12の別企画です。志津川だけの参加も可能な計画です。月末の交流への参加を希望する場合は、別途お申し込みください。</dd></div>
      </dl><a className={styles.primary} href="/ja/events/shizugawa-united-2027/payment">参加意向を伝える・お支払いの受付状況 →</a>
    </section>
  </div></SiteFrame>;
}
