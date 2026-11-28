import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import { effectiveBylaws, proposedBylaws, sourceDetails, type GovernanceChapter } from "@/components/rba-governance-content";
import styles from "./governance.module.css";

export const metadata: Metadata = {
  title: "団体概要・現行会則・規約改訂案｜Riot Basketball Academy",
  description: "RBAの非営利目的の活動原則と、2026年7月7日施行の現行会則全文、ガバナンスを強化する未施行の会則・定款相当規約案を公開。参加費と非営利性、運営責任、利益相反、会計の考え方を明示します。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/about/governance", languages: { en: "https://riotbasketballacademy.com/about/governance", ja: "https://riotbasketballacademy.com/ja/about/governance", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/about/governance", ko: "https://riotbasketballacademy.com/ko/about/governance" } },
  openGraph: { title: "団体概要・会則｜Riot Basketball Academy", description: "非営利目的の運営方針・現行会則・規約改訂案を原文と草案を区別して公開。", url: "https://riotbasketballacademy.com/ja/about/governance", type: "website" },
};

function Articles({ chapters }: { chapters: readonly GovernanceChapter[] }) {
  return <div className={styles.chapters}>{chapters.map((chapter, i) =>
    <section className={styles.chapter} key={chapter.section} aria-labelledby={"chapter-" + i + "-" + (chapters===effectiveBylaws?"active":"proposal")}>
      <h3 id={"chapter-" + i + "-" + (chapters===effectiveBylaws?"active":"proposal")}>{chapter.section}</h3>
      {chapter.items.map(article => <article className={styles.article} key={article.title}>
        <h4>{article.title}</h4>
        {article.text.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </article>)}
    </section>)}</div>;
}

export default function GovernancePage() {
  return <SiteFrame locale="ja" languagePage="about/governance">
    <div className={styles.page}>
      <header className={styles.hero}>
        <a className={styles.back} href="/ja/about">← RBAについて</a>
        <p className={styles.kicker}>ORGANISATION / GOVERNANCE / TRANSPARENCY</p>
        <h1>団体概要・会則</h1>
        <p className={styles.lead}>育成の機会を続けるために、活動の目的と、お金・意思決定・責任のルールを明らかにします。</p>
        <div className={styles.heroMeta}><span>Riot Basketball Academy</span><span>拠点：宮城県仙台市</span><span>代表：西尾 優人</span></div>
      </header>

      <div className={styles.body}>
        <nav className={styles.index} aria-label="団体概要ページの目次">
          <a href="#overview">01　運営の基本</a>
          <a href="#effective">02　現行会則全文</a>
          <a href="#draft">03　改訂会則・定款相当草案</a>
          <a href="#legal-notes">04　法的位置付けと確認事項</a>
        </nav>

        <section className={styles.section} id="overview" aria-labelledby="overview-heading">
          <p className={styles.sectionNo}>01 / PURPOSE</p>
          <h2 id="overview-heading">非営利目的の育成活動。</h2>
          <p>RBAは、バスケットボールを通じた子どもの健全育成、指導者・保護者の学び、地域スポーツ、国内外の交流を目的として活動します。活動を持続可能にするため、参加費・会費・協賛金・寄付金・事業収入を受け取ります。</p>
          <p><strong>非営利目的は無償を意味しません。</strong>実際の指導・安全管理・運営に必要な適正な報酬や費用を支出した後の剰余金は、構成員に分配せず次の育成活動へ活用することを、現行会則で定めています。</p>
          <div className={styles.principles}>
            <div><span>01 / PARTICIPATION</span><strong>参加費は活動財源</strong><p>指導、会場、保険、安全対策などを支えるための料金です。</p></div>
            <div><span>02 / NON-DISTRIBUTION</span><strong>剰余金は分配しない</strong><p>残額を構成員の配当とせず、育成目的へ再投資します。</p></div>
            <div><span>03 / ACCOUNTABILITY</span><strong>対価と責任を明確に</strong><p>参加条件、費用負担、契約主体、施設の利用条件を区別します。</p></div>
          </div>
          <p className={styles.note}>非営利を目的とするという団体方針と、特定の税制上の資格、公共施設の利用可否、団体の法人格の有無は別の判断です。各取引・施設について必要な法的確認を行います。</p>
        </section>

        <section className={styles.section} id="effective" aria-labelledby="effective-heading">
          <div className={styles.sectionTop}>
            <div><p className={styles.sectionNo}>02 / CURRENT RULES</p><h2 id="effective-heading">現行の正式会則</h2></div>
            <span className={styles.effectiveBadge}>2026年7月7日施行</span>
          </div>
          <p>ここに掲載するのは、保存されている「{sourceDetails.title}」に基づく現行条文の全文です。新しい規約案と混同しないよう、施行日を明示します。</p>
          <p className={styles.source}>原典：{sourceDetails.source} ／ 理念「世界基準の育成環境を、すべての子どもたちへ。」</p>
          <details className={styles.disclosure} open>
            <summary>現行会則・全17条を読む <span>11章</span></summary>
            <div className={styles.disclosureBody}>
              <Articles chapters={effectiveBylaws} />
              <p className={styles.enactment}>附則　本会則は2026年7月7日より施行する。</p>
            </div>
          </details>
        </section>

        <section className={styles.section} id="draft" aria-labelledby="draft-heading">
          <div className={styles.sectionTop}>
            <div><p className={styles.sectionNo}>03 / PROPOSED GOVERNANCE</p><h2 id="draft-heading">会則改訂案・定款相当規約案</h2></div>
            <span className={styles.draftBadge}>草案・未施行</span>
          </div>
          <p>以下は、非営利性と運営責任を明確にするために作成した<strong>29条の改訂草案</strong>です。正会員の定義、総会・議決、代表者、謝金・利益相反、事業別会計、子どもの安全、施設の利用条件、解散時の残余財産まで具体化しています。</p>
          <p className={styles.warning}><strong>重要：</strong>この草案は現行会則の改正を決議・施行したものではありません。将来法人化する際には、選択する法人制度に応じた定款を別途作成し、必要な認証・登記等を行います。「定款相当」は内容の参考となる規約案を意味し、登記済み定款ではありません。</p>
          <details className={styles.disclosure}>
            <summary>改訂会則・定款相当草案の全29条を読む <span>6章</span></summary>
            <div className={styles.disclosureBody}>
              <Articles chapters={proposedBylaws} />
              <p className={styles.enactment}>附則（案）　本改訂案の施行日及び経過措置は、必要な構成員・役職者の確認と所定の承認手続きを経て別途決定する。</p>
            </div>
          </details>
        </section>

        <section className={styles.section} id="legal-notes" aria-labelledby="legal-heading">
          <p className={styles.sectionNo}>04 / LEGAL POSITION & NEXT STEPS</p>
          <h2 id="legal-heading">法的位置付けと確認事項</h2>
          <p>現行会則があることと、法人登記・非営利型法人該当性・公益認定等が成立していることは同義ではありません。現時点で法的主体、議決権を持つ構成員の確定、会計と契約名義の区分、監査体制については、公開できる確証を得ていないため、未確認事項として扱います。</p>
          <div className={styles.checks}>
            <p><strong>構成員・機関</strong>　正会員名簿、意思決定記録、代表・監査担当者の正式な選任と権限</p>
            <p><strong>資金・契約</strong>　RBAと他の事業主体の収支区分、資産管理、寄付と広告対価の区別、適正報酬</p>
            <p><strong>施設・遠征</strong>　各施設の予約名義・目的・許可、輸送・宿泊の手配主体と安全責任</p>
            <p><strong>法制度</strong>　法人格の選択、税務上の取扱い、必要な認証・登記、制度ごとの定款要件</p>
          </div>
          <h3 className={styles.sourceHeading}>確認に用いた主な公的情報</h3>
          <ul className={styles.sources}>
            <li><a href="https://www.pref.okinawa.jp/kurashikankyo/katsudo/1004889/1004905.html" target="_blank" rel="noopener noreferrer">沖縄県｜NPO法人設立に関するQ&amp;A（非営利と有償事業） ↗</a></li>
            <li><a href="https://www.cao.go.jp/others/koeki_npo/koeki_npo_seido.html" target="_blank" rel="noopener noreferrer">内閣府｜公益法人制度とNPO法人制度の比較 ↗</a></li>
            <li><a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/hojin/5100_besshi.htm" target="_blank" rel="noopener noreferrer">国税庁｜非営利型法人の要件 ↗</a></li>
            <li><a href="https://www1.g-reiki.net/city.tatsuno/reiki_honbun/r397RG00000680.html" target="_blank" rel="noopener noreferrer">たつの市｜体育施設条例 ↗</a></li>
          </ul>
          <p className={styles.note}>本ページは団体の活動原則・規約の公開と検討状況の説明です。法的資格や税の優遇を主張するものではありません。個別の施設利用許可、契約、法人化については管理者・専門家の確認を優先します。</p>
          <a className={styles.contact} href="mailto:riot.training.base@gmail.com?subject=RBA%E5%9B%A3%E4%BD%93%E4%BC%9A%E5%89%87%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E7%85%A7%E4%BC%9A">団体会則について問い合わせる ↗</a>
        </section>
        <section><h2>運営・情報公開基準</h2><p>最終改定日：2026年11月28日。料金・日程・条件を公開前に照合し、未確定事項を明示します。未成年者の安全、保護者同意、決済・返金の記録、関係者への報告を運営の基本とします。</p><p><a href="/ja/legal">特定商取引法に基づく表記</a>　<a href="/ja/privacy">プライバシーポリシー</a></p></section><div className={styles.bottomNav}><a href="/ja/about">← 団体紹介へ戻る</a><a href="/ja/policies">参加規約・安全方針を見る →</a></div>
      </div>
    </div>
  </SiteFrame>;
}
