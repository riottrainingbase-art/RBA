import type { Metadata } from "next";
import Image from "next/image";
import { SiteFrame } from "@/components/site-frame";
import styles from "./business.module.css";

export const metadata: Metadata = {
  title: "法人向け運動研修・地域イベント企画｜RBA／RTB",
  description: "仙台のRiot Training Base／Riot Basketball Academyによる法人向け60分運動研修、親子・地域イベント、企業研修事業者との共同提供。参考料金・安全条件・無料の見積相談をご案内。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/business" },
  openGraph: {
    title: "RBA FOR BUSINESS｜企業の研修・地域イベントを、実行できる企画に。",
    description: "社員向け運動研修66,000円（税込）・親子イベント88,000円（税込）から。相談・初回見積は無料。詳細条件は個別見積で確定。",
    url: "https://riotbasketballacademy.com/ja/business",
    siteName: "Riot Basketball Academy",
    type: "website"
  }
};

const enquiryUrl = "https://form.jotform.com/263206290699061";

const offers = [
  {
    number: "01",
    label: "CORPORATE WELLNESS",
    name: "社員向け運動研修",
    subtitle: "職場の運動習慣を、実践から。",
    price: "66,000円",
    suffix: "税込／初回試行の参考価格",
    scope: "仙台市内・60分・20名程度まで",
    intro: "会議室などで取り入れられる無理のない身体活動を、実技を中心に組み立てます。デスクワーク・立ち仕事など職種に応じた動作の工夫を扱います。",
    items: ["事前ヒアリング（業務・人数・会場）", "立位・座位の動作と安全説明", "職場で再現しやすい短時間の運動", "実施後の匿名・集計レベルの簡易報告"],
    note: "会場は原則企業側でご用意ください。仙台市外、人数超過、補助スタッフ・特別機材は別途見積。",
  },
  {
    number: "02",
    label: "FAMILY & COMMUNITY",
    name: "親子・地域イベント",
    subtitle: "参加者が、見て、考えて、動く。",
    price: "88,000円〜",
    suffix: "税込／2時間枠の参考価格",
    scope: "商業施設・住宅展示場・地域イベント等",
    intro: "バスケットボールの要素を活用した、競技経験がなくても参加しやすい運動体験。ゴールを使わない内容から会場条件に合わせて設計します。",
    items: ["年齢・床面・屋内外・利用規則の確認", "少人数の運動・反応・ボール操作体験", "親子参加・ローテーション形式の運営", "実施人数と運営上の学びを集計して報告"],
    note: "人数、スタッフ、保険、移動、施設利用の条件によって金額・実施可否は変わります。",
  }
] as const;

const process = [
  ["01", "ご相談", "企業の目的、予定人数、実施地域、希望時期を伺います。"],
  ["02", "内容と安全条件の確認", "会場、身体活動の範囲、スタッフ、責任分担、必要な配慮を整理します。"],
  ["03", "正式見積・書面合意", "料金、実施内容、支払・中止条件を確認してから契約・日程を決定します。"],
  ["04", "実施・報告", "事前合意したプログラムを実施し、個人情報を含まない簡易報告をお渡しします。"],
] as const;

export default function BusinessServicesPage() {
  return (
    <SiteFrame locale="ja">
      <main lang="ja" className={styles.page}>
        <div className={styles.shell}>
          <nav aria-label="パンくずリスト" className={styles.breadcrumb}><a href="/ja/">RBA HOME</a><span aria-hidden="true">/</span><span>FOR BUSINESS</span></nav>
          <section className={styles.hero} aria-labelledby="business-title">
            <div className={styles.heroHeader}>
              <div className={styles.logoLine}>
                <Image src="/rba-logo-original.jpg" alt="Riot Basketball Academy 公式ロゴ" width={47} height={62} priority />
                <span>RIOT BASKETBALL ACADEMY<br />RIOT TRAINING BASE</span>
              </div>
              <span className={styles.heroIndex}>SERVICE / 2026</span>
            </div>
            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>RBA / RTB FOR BUSINESS</p>
              <h1 id="business-title">協賛だけではない。<br /><em>企業と仕事をする。</em></h1>
              <p className={styles.lead}>職場の健康づくり、親子イベント、法人研修の共同提供。<br />RBA／RTBの運動指導を、企業が発注できる具体的なサービスに。</p>
              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href={enquiryUrl} target="_blank" rel="noopener noreferrer" data-growth-id="business-lead-top">無料で企画・見積相談する<span aria-hidden="true"> ↗</span></a>
                <a className={styles.linkButton} href="#services">サービスと料金を見る <span aria-hidden="true">↓</span></a>
              </div>
              <p className={styles.micro}>※ご相談・初回見積は無料です。フォーム送信時点では予約・発注・決済は発生しません。</p>
            </div>
            <div className={styles.heroFooter}><span>DESIGN · MOVE · CONNECT</span><span>BASED IN SENDAI, JAPAN</span></div>
          </section>

          <section className={styles.introduction} aria-labelledby="why-business">
            <span className={styles.sectionIndex}>OUR APPROACH / 01</span>
            <div>
              <h2 id="why-business">運動の「知識」を、<br />実施できるプログラムに。</h2>
              <p>忙しい職場や地域のイベントでは、参加しやすさと運営の安全性が欠かせません。目的と会場に合わせた内容を事前に設計し、参加者の意思と体調を尊重して実施します。子どもの育成活動への協賛とは異なる、<strong>有償の研修・企画受託サービス</strong>です。</p>
            </div>
          </section>

          <section className={styles.servicesSection} id="services" aria-labelledby="service-title">
            <div className={styles.sectionTitle}>
              <p className={styles.sectionIndex}>SERVICES / 02</p>
              <h2 id="service-title">企業が発注できる、<br />2つのプログラム。</h2>
              <p>以下は2026年11月時点の初回試行用参考プラン。内容・金額は正式な見積・契約で決定します。</p>
            </div>
            <div className={styles.cards}>
              {offers.map(offer => (
                <article key={offer.number} className={styles.card}>
                  <div className={styles.cardTop}><span>{offer.number}</span><span>{offer.label}</span></div>
                  <h3>{offer.name}</h3>
                  <p className={styles.cardSubtitle}>{offer.subtitle}</p>
                  <div className={styles.priceBlock}><span className={styles.scope}>{offer.scope}</span><strong>{offer.price}</strong><small>{offer.suffix}</small></div>
                  <p className={styles.cardIntro}>{offer.intro}</p>
                  <ul className={styles.cardItems}>{offer.items.map(item=><li key={item}>{item}</li>)}</ul>
                  <p className={styles.cardNote}>{offer.note}</p>
                  <a href={enquiryUrl} target="_blank" rel="noopener noreferrer" data-growth-id={"business-inquiry-" + offer.number}>このプログラムを相談する <span aria-hidden="true">↗</span></a>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.collaboration} aria-labelledby="collaboration-title">
            <p className={styles.sectionIndex}>FOR TRAINING & BENEFITS PROVIDERS / 03</p>
            <div className={styles.collaborationGrid}>
              <div>
                <h2 id="collaboration-title">福利厚生・企業研修事業者の皆さまへ。</h2>
                <p>企業向け制度・研修の販売や企画を行う事業者と、運動実技の提供を担うRBA／RTBで、業務を分担する共同企画もご相談いただけます。</p>
              </div>
              <div className={styles.collabBox}>
                <strong>有償の共同提供・業務委託</strong>
                <p>販売・集客、実技指導、保険、安全責任、費用配分、個人情報の取り扱いは、両者で書面確認した範囲に限ります。独占提携や相手企業からの発注を保証するものではありません。</p>
                <a href={enquiryUrl} target="_blank" rel="noopener noreferrer" data-growth-id="business-partner-enquiry">共同企画の相談をする ↗</a>
              </div>
            </div>
          </section>

          <section className={styles.processSection} aria-labelledby="business-process-title">
            <p className={styles.sectionIndex}>HOW WE WORK / 04</p>
            <h2 id="business-process-title">相談から実施まで、<br />条件を一つずつ明確に。</h2>
            <ol className={styles.processGrid}>{process.map(([n,title,detail])=><li key={n}><span>{n}</span><h3>{title}</h3><p>{detail}</p></li>)}</ol>
          </section>

          <section className={styles.policySection} aria-labelledby="policy-title">
            <p className={styles.sectionIndex}>SAFETY & TRANSPARENCY / 05</p>
            <h2 id="policy-title">約束できることと、<br />約束しないこと。</h2>
            <div className={styles.policyGrid}>
              <p><strong>安全と参加者の尊重</strong><br />身体状態に応じて強度を軽減・中止します。未成年者の参加は必要な保護者同意と安全管理・見守りを前提とします。</p>
              <p><strong>医学的効果を保証しない</strong><br />診断、治療、リハビリの代替、疾病や労災予防の効果保証は行いません。医療的対応が必要な場合は適切な専門職へご相談ください。</p>
              <p><strong>個人情報は最小限</strong><br />相談時に従業員の病歴、未成年者の氏名、家庭の連絡先などを集めません。実施後の報告は原則匿名・集計レベルです。</p>
              <p><strong>協賛・広告とは別契約</strong><br />本ページは有償サービスの案内です。企業広告や育成事業への協賛は<a href="/ja/partners/brief">別の案内</a>で条件をご確認ください。</p>
              <p><strong>契約と請求条件を先に確認</strong><br />実際の契約主体・請求名義、適格請求書への対応可否、料金に含む費用、支払時期、中止時の取扱いは正式見積・書面契約で明示します。</p>
            </div>
          </section>

          <section className={styles.contactSection} aria-labelledby="contact-title">
            <div><p className={styles.sectionIndex}>LET'S WORK TOGETHER / 06</p><h2 id="contact-title">企業の課題から、<br />一緒に考えます。</h2><p>ご相談時点で日時や会場が未定でも構いません。実施できる内容・責任分担・見積条件を確認したうえでご提案します。</p></div>
            <div className={styles.contactActions}>
              <a className={styles.primaryButton} href={enquiryUrl} target="_blank" rel="noopener noreferrer" data-growth-id="business-lead-bottom">法人向けの無料相談フォーム <span aria-hidden="true">↗</span></a>
              <a className={styles.contactEmail} href="mailto:riot.training.base@gmail.com?subject=RBA%EF%BC%8FRTB%E6%B3%95%E4%BA%BA%E5%90%91%E3%81%91%E6%9C%89%E6%96%99%E7%A0%94%E4%BF%AE%E7%9B%B8%E8%AB%87">メールで問い合わせる ↗</a>
              <p>送信だけで予約・契約・決済にはなりません。回答先はRBA／RTB運営窓口です。</p>
            </div>
          </section>
          <footer className={styles.footerLinks}><a href="/ja/">RBA HOME</a><a href="/ja/clinic-request">バスケットボールクリニック開催相談</a><a href="/ja/partners/brief">企業広告・協賛について</a><a href="/ja/policies">プライバシー・規約</a></footer>
        </div>
      </main>
    </SiteFrame>
  );
}
