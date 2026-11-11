import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MapPin, Handshake, Globe2, ShieldCheck } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import { GrowthClickTracking } from "@/components/growth-click-tracking";
import styles from "./work-with-rba.module.css";

export const metadata: Metadata = {
  title: "RBA NETWORK｜地域開催・企業協賛・国際交流の共同事業",
  description: "地域の指導者・企業・海外アカデミーと実際の育成機会をつくるRBAの共同事業。連携モデル・役割分担・相談窓口をまとめました。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/work-with-rba" },
};

const models = [
  {
    id: "local", number: "01", label: "REGIONAL HOST", title: "地域で育成の機会をつくる", icon: MapPin,
    lead: "地域のクラブ・指導者・会場と協力し、単発開催から継続できる活動へ。",
    partner: "会場の確保、現地集客、当日の運営、保護者との連絡",
    rba: "企画の共同設計、公式案内、指導者との連携、活動後の振り返り",
    note: "RBA代表が毎回現地で指導することは前提にしません。指導者・保険・安全体制は案件ごとに確認します。",
    href: "/ja/clinic-request", action: "地域開催を相談する",
  },
  {
    id: "corporate", number: "02", label: "CORPORATE PARTNERS", title: "企業と育成環境を支える", icon: Handshake,
    lead: "協賛金・広告・備品・移動など、企業の支援を具体的な活動へ。",
    partner: "支援の目的と範囲、掲載素材の提供、掲載内容の確認",
    rba: "活動との接続、合意した媒体での企業紹介、実施結果の事実報告",
    note: "月額企業広告と企画協賛は別契約。媒体・期間・対価・実施条件は書面で決めます。",
    href: "/ja/partners", action: "企業協賛について見る",
  },
  {
    id: "global", number: "03", label: "JAPAN × ASIA", title: "日本とアジアの交流をつくる", icon: Globe2,
    lead: "海外のアカデミーや主催者と、クリニック・指導者交流・交流試合を共同企画。",
    partner: "現地会場、参加者対応、現地スタッフ、安全管理",
    rba: "日本側との企画調整、育成テーマの設計、指導者・クラブとの接続",
    note: "旅行・宿泊等の手配は別途適法な運営体制で対応。未確定の移動や開催は約束しません。",
    href: "/ja/contact", action: "海外共同企画を相談する",
  },
] as const;

const steps = [
  ["01", "相談", "地域・対象年代・目的・担当者を共有"],
  ["02", "役割分担", "会場・集客・指導・保険・決済を整理"],
  ["03", "書面合意", "費用・権利・中止条件・責任者を確定"],
  ["04", "小さく実施", "1企画で検証し、継続は双方で判断"],
] as const;

export default function WorkWithRbaPage() {
  return <SiteFrame locale="ja">
    <GrowthClickTracking/>
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="network-title">
        <div className={styles.wrap}>
          <Link href="/ja" className={styles.back}>← RBAトップ</Link>
          <p className={styles.kicker}>RBA NETWORK / REAL COURTS. REAL CONNECTIONS.</p>
          <h1 id="network-title">ひとつの地域から、<br/>次のコートへ。</h1>
          <p className={styles.lead}>RBAが増やしたいのは、教材や加盟店ではありません。地域の指導者・企業・海外アカデミーとともに、子どもたちが実際に学び、挑戦できる機会です。</p>
          <nav className={styles.heroLinks} aria-label="連携モデルとお問い合わせ">
            <a href="#network-models" className={styles.primary} data-growth-id="network-show-models">連携モデルを見る <ArrowUpRight size={16}/></a>
            <Link href="/ja/contact" className={styles.secondary} data-growth-id="network-contact-top">まず相談する</Link>
          </nav>
        </div>
      </section>

      <section className={styles.section} id="network-models" aria-labelledby="network-model-title">
        <div className={styles.wrap}>
          <p className={styles.kicker}>THREE WAYS TO WORK TOGETHER</p>
          <h2 id="network-model-title">連携の形は、3つだけ。</h2>
          <p className={styles.sectionIntro}>地域の仕事をRBAがすべて引き受けるのではなく、それぞれが得意な役割を担います。</p>
          <div className={styles.grid}>
            {models.map(({id,number,label,title,icon:Icon,lead,partner,rba,note,href,action})=>
              <article className={styles.card} id={"network-"+id} key={id}>
                <div className={styles.cardTop}><span>{number} / {label}</span><Icon size={24} aria-hidden="true"/></div>
                <h3>{title}</h3><p>{lead}</p>
                <dl className={styles.roles}>
                  <div><dt>現地・企業側</dt><dd>{partner}</dd></div>
                  <div><dt>RBA側</dt><dd>{rba}</dd></div>
                </dl>
                <p className={styles.note}>{note}</p>
                <Link href={href} className={styles.cardLink} data-growth-id={"network-"+id+"-enquiry"}>{action} <ArrowUpRight size={16}/></Link>
              </article>
            )}
          </div>
          <p className={styles.disclaimer}>掲載は相談可能な共同事業モデルです。加盟・開催・収益配分・スポンサー契約が成立したことを意味しません。費用と責任範囲は案件ごとに事前合意します。</p>
        </div>
      </section>

      <section className={styles.stepsSection} aria-labelledby="network-steps-title">
        <div className={styles.wrap}>
          <p className={styles.kicker}>SMALL FIRST, THEN SCALE</p>
          <h2 id="network-steps-title">最初は、1企画から。</h2>
          <ol className={styles.steps}>{steps.map(([number,title,description])=>
            <li key={number}><span>{number}</span><strong>{title}</strong><p>{description}</p></li>
          )}</ol>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="network-safety-title">
        <div className={styles.wrap}>
          <div className={styles.safety}>
            <div><p className={styles.kicker}>NON-NEGOTIABLE</p><h2 id="network-safety-title">広げる前に、守ること。</h2><p>ブランドだけを貸して、子どもの安全や現地の運営を任せきりにはしません。</p></div>
            <ul>
              <li><ShieldCheck size={20} aria-hidden="true"/>指導者の適格性・安全体制・緊急対応を事前確認</li>
              <li><ShieldCheck size={20} aria-hidden="true"/>会場条件・保険・費用・中止と返金のルールを文書化</li>
              <li><ShieldCheck size={20} aria-hidden="true"/>子どもの写真・健康情報・個人情報を必要以上に共有しない</li>
              <li><ShieldCheck size={20} aria-hidden="true"/>広告と協賛を明示し、育成の判断から切り離す</li>
              <li><ShieldCheck size={20} aria-hidden="true"/>競技団体の規程・現地法令・施設条件に従う</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.bottom} aria-labelledby="network-final-title">
        <div className={styles.wrap}>
          <p className={styles.kicker}>BUILD THE NEXT OPPORTUNITY</p>
          <h2 id="network-final-title">子どもたちの次の機会を、<br/>一緒につくる。</h2>
          <p>地域の主催者・企業・海外アカデミーの方へ。目的に合った既存の公式窓口からご相談ください。</p>
          <nav className={styles.bottomLinks} aria-label="共同事業別の相談窓口">
            <Link href="/ja/clinic-request" data-growth-id="network-bottom-local">地域開催を相談 <ArrowUpRight size={16}/></Link>
            <Link href="/ja/partners" data-growth-id="network-bottom-corporate">企業協賛を相談 <ArrowUpRight size={16}/></Link>
            <Link href="/ja/contact" data-growth-id="network-bottom-global">海外連携を相談 <ArrowUpRight size={16}/></Link>
          </nav>
        </div>
      </section>
    </div>
  </SiteFrame>;
}
