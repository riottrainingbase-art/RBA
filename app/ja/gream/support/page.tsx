import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import styles from "../gream.module.css";

const sponsorForm = "https://form.jotform.com/263089038431054";
const personalMembership = "https://note.com/rba_official/membership/join";
const canonical = "https://riotbasketballacademy.com/ja/gream/support";

export const metadata: Metadata = {
  title: "GREAM SUPPORT｜秋田・仙台・全国の応援方法｜RBA",
  description: "GREAM U15の育成環境を支える。秋田・仙台の地域企業広告、RBA全国企業広告、個人の継続応援を一つの入口からご案内します。地域の相談は無料。",
  alternates: { canonical },
  openGraph: { title: "GREAM SUPPORT｜地域で育つ。その挑戦を、一緒に。", description: "地域を選び、支援方法を選ぶ。U15育成環境の地域協賛と全国企業広告の窓口。", url: canonical, siteName: "Riot Basketball Academy", type: "website" },
};

export default function GreamSupport() {
  return <SiteFrame locale="ja">
    <div className={styles.shell}>
      <div className={styles.wrap}>
        <nav className={styles.crumbs} aria-label="現在のページ"><a href="/ja">RBA</a><span aria-hidden="true">/</span><a href="/ja/gream">GREAM U15</a><span aria-hidden="true">/</span><strong>SUPPORT</strong></nav>
        <header className={styles.supportIntro}>
          <p className={styles.eyebrow} style={{color:"#806c51"}}>GREAM / DEVELOPMENT PARTNERS</p>
          <h1>地域で育つ。<span>その挑戦を、一緒に。</span></h1>
          <p className={styles.sectionLead}>GREAMの活動を支える入口を一つにしました。地域のお店、全国の企業、個人の方。希望する応援方法を選ぶだけで、既存の公式申込・相談先へ進めます。</p>
          <nav className={styles.choiceGrid} aria-label="応援する方法を選択">
            <a className={styles.choice} href="#local" data-growth-id="gream-support-choice-local"><span>01 / LOCAL</span><strong>地域のGREAMを応援</strong><em>秋田・仙台の企業やお店 →</em></a>
            <a className={styles.choice} href="#national" data-growth-id="gream-support-choice-national"><span>02 / RBA NATIONAL</span><strong>全国の育成を応援</strong><em>月額企業広告 →</em></a>
            <a className={styles.choice} href="#personal" data-growth-id="gream-support-choice-personal"><span>03 / INDIVIDUAL</span><strong>個人で応援</strong><em>noteメンバーシップ →</em></a>
          </nav>
        </header>
      </div>
      <section className={styles.section} id="local" aria-labelledby="gream-local-title">
        <div className={styles.wrap}>
          <p className={styles.sectionTag}>01 / SUPPORT YOUR LOCAL TEAM</p>
          <h2 id="gream-local-title">地域のお店・企業として応援</h2>
          <p className={styles.sectionLead}>まずは「どの地域を支援したいか」をお知らせください。相談は無料。広告掲載の媒体・期間・金額を確認した後で、契約とお支払いをご案内します。</p>
          <div className={styles.optionGrid}>
            <article className={styles.option}>
              <p className={styles.sectionTag}>AKITA / DSM GREAM</p>
              <h3>秋田｜大仙・仙北・美郷</h3>
              <p>男子U15の育成活動を支える協力先を募集します。運営主体と広告契約・金額を確認中のため、秋田は無料相談から。仙台の料金を自動適用しません。</p>
              <a href={sponsorForm} target="_blank" rel="noopener noreferrer" className={styles.linkButton} data-growth-id="gream-support-akita-inquiry">秋田の協賛を無料相談する ↗</a>
              <p className={styles.note}>既存のRBA企業相談フォームが開きます。「希望する地域・活動」に「秋田 DSM GREAM」と記入してください。送信だけで契約や支払いは発生しません。</p>
            </article>
            <article className={styles.option}>
              <p className={styles.sectionTag}>SENDAI / TAIHAKU</p>
              <h3>仙台｜まちのお店・地域企業</h3>
              <div className={styles.price}>月3,300円から</div>
              <p>既存の仙台広告協賛は、まちのお店が税込年39,600円（12か月分割の場合は月3,300円）、地域企業が税込年132,000円（月11,000円相当）。期間・掲載内容を事前に合意します。</p>
              <a className={styles.linkButton} href="/ja/gream-sendai/partners#plans" data-growth-id="gream-support-sendai-plans">仙台の協賛料金・条件を見る →</a>
              <p className={styles.note}>ユニフォーム広告は別契約・規則と大会承認が必要です。基本プランには含まれません。</p>
            </article>
          </div>
          <p className={styles.help}>沖縄は現地の新体制整備中です。指導者・会場・企業の協力相談は<a href={sponsorForm} target="_blank" rel="noopener noreferrer"> RBA企業相談窓口 ↗</a>で受け付けます。新しい定期活動や有料協賛枠が確定したという案内ではありません。</p>
        </div>
      </section>
      <section className={`${styles.section} ${styles.lightSection}`} id="national" aria-labelledby="gream-national-title">
        <div className={styles.wrap}>
          <p className={styles.sectionTag}>02 / NATIONAL BUSINESS ADVERTISING</p>
          <h2 id="gream-national-title">RBA全国の育成を、企業広告で支える。</h2>
          <p className={styles.sectionLead}>RBA全体の公式企業広告は、すでにオンライン申込に対応しています。GREAMの特定地域への配分を約束する商品とは区別しています。</p>
          <div className={styles.optionGrid}>
            <article className={styles.option}>
              <p className={styles.sectionTag}>RBA CORPORATE SUPPORT</p>
              <h3>全国企業広告</h3>
              <div className={styles.price}>税込11,000円 / 月</div>
              <p>1社1口・毎月自動更新。既存のRBA応援ページと月次活動レポートに、許諾済み社名・ロゴ・URLなどを掲載します。トップページ・GREAM個別ウェア広告は含まれません。</p>
              <a className={styles.linkButton} href="/ja/support" data-growth-id="gream-support-rba-advertising">料金・利用条件を確認して申し込む →</a>
              <p className={styles.note}>既存Stripe決済へ進む前に、掲載先と自動更新の条件をご確認ください。</p>
            </article>
            <article className={styles.option}>
              <p className={styles.sectionTag}>NATIONAL GREAM PROJECT</p>
              <h3>全国GREAMの企画協賛</h3>
              <p>複数地域を支える企業向けの共同企画です。対象となる地域、広告の掲載場所と回数、活動費への配分、レポート内容を相談し、個別に契約します。</p>
              <a className={styles.linkButton} href={sponsorForm} target="_blank" rel="noopener noreferrer" data-growth-id="gream-support-national-inquiry">全国企画の協賛を無料相談する ↗</a>
              <p className={styles.note}>全国の地域指定配分や協賛額は未確定です。フォーム送信だけで契約・課金は発生しません。</p>
            </article>
          </div>
        </div>
      </section>
      <section className={styles.section} id="personal" aria-labelledby="gream-personal-title">
        <div className={styles.wrap}>
          <p className={styles.sectionTag}>03 / INDIVIDUAL SUPPORT</p>
          <h2 id="gream-personal-title">一人ひとりの応援も、次の機会に。</h2>
          <p className={styles.sectionLead}>個人の方には、既存のRBA公式noteメンバーシップをご案内しています。月500円・1,000円のコースから選べます。特定のGREAMチームへの指定寄付ではありません。</p>
          <div className={styles.actions} style={{marginTop:26}}>
            <a className={styles.linkButton} href={personalMembership} target="_blank" rel="noopener noreferrer" data-growth-id="gream-support-note">個人の応援メンバーになる ↗</a>
          </div>
        </div>
      </section>
      <section className={`${styles.section} ${styles.lightSection}`} aria-labelledby="gream-accountability">
        <div className={styles.wrap}>
          <p className={styles.sectionTag}>CLEAR AGREEMENT / REAL IMPACT</p>
          <h2 id="gream-accountability">支援の内容を、見えるように。</h2>
          <div className={styles.steps}>
            <div className={styles.step}><span>01</span><strong>希望を確認</strong><p>地域と協力方法、広告で紹介したい内容を伺います。</p></div>
            <div className={styles.step}><span>02</span><strong>契約・掲載</strong><p>料金・掲載媒体・期間と権利を確認し、合意と入金後に実施します。</p></div>
            <div className={styles.step}><span>03</span><strong>活動を報告</strong><p>実際に掲載したURLや実施内容を、確認できた範囲で報告します。</p></div>
          </div>
          <p className={styles.help}>RBAは現在、適格請求書発行事業者ではありません。通常の請求書・領収書に対応し、広告宣伝費などの税務上の扱いは各社の経理担当者等にご確認ください。選手の個人情報をスポンサーへ渡さず、写真・ロゴの利用は別途許諾を確認します。</p>
          <details className={styles.faq}><summary>支援すると、必ず指定地域にお金が届きますか？</summary><p>既存のRBA全国企業広告とnoteは地域指定商品ではありません。地域への用途・配分を約束する場合は、個別のGREAM企画協賛契約で使途と報告方法を明記します。秋田の現場側との契約形態は確認中です。</p></details>
          <details className={styles.faq}><summary>ユニフォーム広告も申し込めますか？</summary><p>地域企業向けの追加オプションとして相談できますが、JBA規則や大会ごとの広告申請・承認、製作条件の確認が必要です。通常広告の申込だけでは確定しません。</p></details>
          <details className={styles.faq}><summary>無料相談だけで請求されますか？</summary><p>いいえ。地域・全国企画の無料相談は、送信だけで契約・請求・公開は発生しません。月額のRBA企業広告とnoteは、それぞれの既存サービスの申込・決済条件に従います。</p></details>
          <div className={styles.actions} style={{marginTop:25}}>
            <a className={styles.linkButton} href="/ja/gream" data-growth-id="gream-support-back-teams">GREAMの3地域を見る →</a>
            <a className={styles.linkButton} href="/ja/partners" data-growth-id="gream-support-corporate">RBAの企業向け案内 →</a>
          </div>
        </div>
      </section>
    </div>
  </SiteFrame>;
}
