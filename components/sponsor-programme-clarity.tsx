import styles from "./sponsor-programme-clarity.module.css";

const steps = [
  ["01 / CONSULT", "内容を相談", "支援したい地域や育成年代、予算感を伺います。無料相談だけで契約・請求は発生しません。"],
  ["02 / PROPOSAL", "企画と見積を整理", "企画協賛の場合、活動範囲、協賛額、掲載媒体、期間、報告方法と中止時の対応を確認します。"],
  ["03 / AGREEMENT", "正式な契約・お支払い", "合意した条件に従って契約と決済を実施。企業名・ロゴの掲出は許諾を確認してから行います。"],
  ["04 / REPORT", "実施と報告", "実施した内容と掲載状況を記録し、契約に基づく報告資料を企業の担当者へご提供します。"],
] as const;

const faqs = [
  ["月額11,000円の企業広告に、トップページのロゴ掲載も含まれますか？", "いいえ。定型の月額企業広告の基本掲載先は、RBA公式サイト内の『応援ページ』と月次活動レポートです。トップページへの掲載、特定イベント・ウェアへの掲出等は、対象範囲・期間を定めた個別スポンサー契約でご相談ください。"],
  ["初回相談・資料請求は無料ですか？", "はい。企業向け相談フォームの送信自体に料金は発生しません。企業広告の申込は別の決済ページで、ご自身で条件を確認のうえ行うものです。"],
  ["協賛額や期間は選べますか？", "定型の企業広告は1社につき月額1口10,000円＋税です。地域・全国・国際交流への企画協賛は内容ごとの見積・契約で決めます。『90日・5万円から』は企画連携の提案例で、どの活動も無条件に実施できる料金保証ではありません。"],
  ["協賛企業は選手・保護者の情報を受け取れますか？", "いいえ。選手・保護者の名簿、連絡先、健康情報を特典として提供しません。活動写真等の二次利用も必要な許諾と契約の範囲内に限定します。"],
  ["協賛による広告・売上への効果は保証されますか？", "広告表示回数、ブランド認知度の変化、採用・売上などの成果は保証しません。実施・掲出の事実と、契約で合意した範囲の活動報告を行います。"],
  ["請求書・領収書やインボイスは発行できますか？", "通常の請求書・領収書、掲載内容確認資料を用意します。RBAは現時点で適格請求書発行事業者ではないため、インボイスは発行できません。経理上の扱いは、取引内容と各社の税理士等の判断によります。"],
] as const;

export function SponsorProgrammeClarity() {
  return <section className={styles.section} id="sponsorship-process" aria-labelledby="sponsor-process-title">
    <div className={styles.inner}>
      <p className={styles.eyebrow}>HOW SPONSORSHIP WORKS / お申し込みから活動報告まで</p>
      <h2 className={styles.heading} id="sponsor-process-title">企業が説明できる協賛に。</h2>
      <p className={styles.lead}>ご支援の目的と、企業にお返しする内容を曖昧にしません。掲載位置、契約期間、支援が対象とする活動、報告方法を合意してから進めます。</p>
      <div className={styles.steps}>
        {steps.map(([n,title,copy])=><article className={styles.step} key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}
      </div>
      <div className={styles.comparison} aria-label="広告掲載と企画協賛の違い">
        <article className={styles.plan}><h3>月額の企業広告</h3><p>月額11,000円（税込）。RBA公式サイトの応援ページ、月次活動レポートなど、定型の広告掲載特典を提供します。掲載開始・更新・解約は既存の利用条件に従います。</p></article>
        <article className={styles.plan}><h3>トップページ・個別企画への協賛</h3><p>対象活動、掲載箇所、媒体、協賛期間、費用、ロゴ利用と活動報告を個別に合意します。月額広告から自動的にトップページ掲載へ切り替わる制度ではありません。</p></article>
      </div>
      <p className={styles.eyebrow}>FREQUENTLY ASKED QUESTIONS / よくあるご質問</p>
      <div className={styles.faqs}>
        {faqs.map(([question,answer])=><details className={styles.faq} key={question}><summary>{question}</summary><p>{answer}</p></details>)}
      </div>
      <div className={styles.actions}>
        <a className={styles.action} href="https://form.jotform.com/263089038431054" rel="noopener noreferrer" target="_blank" data-growth-id="sponsors-process-free-enquiry">企業スポンサーの無料相談 ↗</a>
        <a className={styles.action+" "+styles.actionAlt} href="/ja/support/terms">月額企業広告の利用条件 →</a>
      </div>
      <p className={styles.footnote}>ご相談内容に応じ、必要な範囲で契約書・見積書・掲載確認資料・活動報告の形式を定めます。過去の協賛企業については、契約時期と掲出権限を確認のうえ、現行スポンサーと区別して表示します。</p>
    </div>
  </section>;
}
