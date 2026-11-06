import { SendaiSponsorFilm } from "@/components/sendai-sponsor-film";
import type { Metadata } from "next";
import Image from "next/image";
import { SiteFrame } from "@/components/site-frame";
import { sendaiPlans, sendaiUniformOptions } from "@/lib/gream-sendai-partners";
import styles from "./partners.module.css";

export const metadata: Metadata = {
  title: "仙台市太白区の企業・お店へ｜GREAM仙台 地域スポンサー募集",
  description: "太白区のU15バスケットボールクラブGREAM仙台。月3,300円からの広告協賛、公式サイト・SNS・店頭掲示、主催者承認後のユニフォーム広告。掲載内容・期間・実績報告を明確にした地域パートナー募集です。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/gream-sendai/partners" },
};
const enquiry = "mailto:riot.training.base@gmail.com?subject=" + encodeURIComponent("GREAM仙台｜太白区の広告協賛について") + "&body=" + encodeURIComponent("企業・店舗名：\n所在地：\n担当者名：\n返信先：\n希望：まちのお店／地域企業／ユニフォーム／掲示協力\n広告で伝えたいこと：\n");
const faqs = [
  ["広告宣伝費として処理できますか？", "社名・ロゴ・事業紹介を一般公開する広告サービスとして、契約書、通常の請求書・領収書、掲載URL、実施報告を発行します。会計処理や損金算入は実際の提供内容と各社の事情で決まるため、経理担当者・税理士にご確認ください。経費計上や節税額を一律に保証する契約ではありません。"],
  ["インボイスは発行できますか？", "RBAは現在インボイス未登録のため、適格請求書は発行できません。通常の請求書・領収書を発行します。法人税上の広告費の扱いと、消費税の仕入税額控除は別の論点です。契約前に経理担当者へお伝えください。"],
  ["ユニフォームはすべての大会で着用できますか？", "大会ごとに事前申請・承認が必要です。掲載位置・寸法・業種はJBA規則と大会要項に従います。ウォームアップウェアも大会側の確認対象となる場合があります。出場・試合数・放送露出は保証しません。"],
  ["広告枠が承認されなかった場合は？", "ユニフォーム追加料金は、主催者承認と製作仕様の合意後に確定・請求します。契約後に提供不能となった場合、書面で合意した代替掲載または未提供分の精算を行います。基本広告料とユニフォーム料は分けて明記します。"],
  ["お店にポスターを置くだけでも参加できますか？", "歓迎します。掲示だけの無料協力と、有料の広告パートナー契約を分けています。掲示協力店の紹介は、店名・場所・公開範囲に同意いただいてから掲載します。購入や紹介のノルマはありません。"],
] as const;

export default function SendaiPartnersPage() {
  return <SiteFrame locale="ja"><main id="main-content" className={styles.page}>
    <section className={styles.hero}><div>
      <Image src="/rba-logo-original.jpg" alt="Riot Basketball Academy 公式ロゴ" width={40} height={56} />
      <p className={styles.eyebrow}>GREAM SENDAI / COMMUNITY PARTNERS</p>
      <h1>太白区のまちで、<br />子どもたちの挑戦を支える。</h1>
      <p>いつものお店に、GREAMのポスターがある。地域の企業の名前を、選手たちが知っている。そんな顔の見える関係を、仙台市太白区から育てたいと考えています。</p>
      <p>GREAM仙台は2026年に発足した男子U15バスケットボールクラブです。長町・富沢・八木山・茂庭台などの企業やお店と、日々の練習と学びを支える地域パートナーを募集しています。</p>
      <div className={styles.actions}><a href="#plans">協賛メニューを見る ↓</a><a href={enquiry} data-growth-id="sendai-partner-enquiry">広告協賛を相談する →</a><a href="/downloads/gream-sendai/partnership-proposal.pdf">提案書PDFを開く ↓</a></div>
    </div></section>
    <SendaiSponsorFilm />
    <section className={styles.section} id="plans"><h2>地域のお店も、企業も。<br />続けられる形から。</h2>
      <p>下記は新規広告協賛の募集価格です。金額は税込。12か月契約を基本とし、開始日・媒体・提供回数を確認書で合意してから開始します。月額表示は12か月分割払いの場合です。自動更新はしません。</p>
      <div className={styles.grid}>{sendaiPlans.map(p => <article key={p.name} className={styles.card}><h3>{p.name}</h3><p className={styles.price}>月 {p.monthly}</p><p>年額 {p.annual}</p><p>{p.description}</p><p className={styles.small}>共通：日本語トップページ上部の地域パートナー欄、GREAM仙台の企業・店舗紹介、月次の共同紹介、四半期の実績報告。ロゴ等の公開許諾確認後に掲載します。</p></article>)}</div>
      <p className={styles.notice}>届く人数を大きく見せるより、誰に、何を、いつ伝えたかを残します。RBA全体の閲覧数をGREAM仙台の広告到達数として扱いません。</p>
    </section>
    <section className={styles.section} id="uniform"><h2>公式ユニフォームにも、地域の名前を。</h2><p>地域企業パートナーへの追加オプションです。主催者承認・製作確認後に開始します。基本広告料の年132,000円に、下記の追加料金がかかります。初回のロゴ入稿調整・通常印刷費を含みます。新規ウェアの購入、追加製作、特殊加工は別途見積りです。</p>
      <div className={styles.tableWrap}><table className={styles.table}><caption>公式ユニフォーム広告の募集枠・年間追加料金（税込）</caption><thead><tr><th scope="col">掲載場所</th><th scope="col">追加料金</th><th scope="col">募集枠</th><th scope="col">規則上の上限</th></tr></thead><tbody>{sendaiUniformOptions.map(o => <tr key={o.place}><th scope="row">{o.place}</th><td>{o.price}</td><td>{o.capacity}</td><td>{o.limit}</td></tr>)}</tbody></table></div>
      <p className={styles.small}>例：地域企業＋パンツは年198,000円、地域企業＋背面は年264,000円、地域企業＋前面は年396,000円。シャツ背面２社は１つの広告範囲内を分割。番号とロゴ・広告は5cm以上離し、全選手で位置・寸法・デザインを統一します。</p>
      <p>JBA公式掲載のユニフォーム規則（2025年10月6日改定）を確認しています。濃色・淡色それぞれの前後図、企業名・業種・実寸・契約期間を準備し、出場する大会ごとに主催者（主管者）へ申請します。承認前の印刷・着用は行いません。</p>
      <p className={styles.notice}>大会日程やロゴが未確定の段階では、枠の相談まで受け付けます。大会承認済み・協賛決定という表示は、確認が済んでから行います。</p>
    </section>
    <section className={styles.section}><h2>「応援している」が、まちで見えるように。</h2><div className={styles.grid}>
      <article className={styles.card}><h3>お店に一枚</h3><p>許可をいただいたお店に、応援ポスターを掲示。QRからクラブ紹介と参加相談へつながります。掲示協力は無料です。</p><a href="/downloads/gream-sendai/community-poster.pdf">店頭用ポスターPDF →</a></article>
      <article className={styles.card}><h3>まちの仕事を紹介</h3><p>どんな仕事で地域を支えている会社なのか。企業・お店の紹介を、広告であることを明示して公式サイトやSNSに掲載します。</p></article>
      <article className={styles.card}><h3>活動をきちんと報告</h3><p>四半期ごとに掲載画面、投稿URL、集計できる閲覧・クリック数、実施内容をお届けします。取得できない数字を推定で埋めません。</p></article>
    </div><p>地域清掃、公開練習、企業との交流企画も相談できます。日程・会場許可・引率体制を確認し、実施が決まった企画からご案内します。</p></section>
    <section className={styles.section}><h2>契約と経理に必要なものを、先に。</h2><ol className={styles.steps}><li>企業名・目的・掲載媒体・予算を確認し、見積書と広告掲載内容確認書をお送りします。</li><li>開始・終了日、ロゴ使用、投稿回数、追加費用、変更・精算条件を書面で合意します。</li><li>入稿・入金・公開許諾を確認後、原則14営業日以内に基本広告を掲載。開始画面とURLをご案内します。</li><li>通常の請求書・領収書を発行し、四半期終了後15日以内に実績報告を提出します。</li></ol><p>ユニフォーム料は別明細にします。会場の掲示許可や広告掲出料が必要な場合は、事前に確認・見積りします。基本プランに会場掲示の無条件保証は含みません。</p><p className={styles.small}>契約主体：Riot Basketball Academy 代表 西尾優人。RBAは現在、適格請求書発行事業者ではありません。既存のRBA月額企業広告とは別契約で、自動的に切り替わりません。</p></section>
    <section className={styles.section}><h2>よくあるご質問</h2>{faqs.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}<p>子どもの名簿提供、未成年者への直接営業、スポンサー都合の出場選考は行いません。企業広告への選手写真の二次利用は、通常の活動撮影同意と分けて確認します。</p></section>
    <section className={`${styles.section} ${styles.sources}`}><h2>確認した公式資料</h2><ul><li><a href="https://www.japanbasketball.jp/jba/kitei/" target="_blank" rel="noopener noreferrer">JBA 各種規程・ユニフォーム広告申請書</a></li><li><a href="https://japanbasketball.jp/wp-content/uploads/JBA-Uniform_20251006.pdf" target="_blank" rel="noopener noreferrer">JBA ユニフォーム規則（2025年10月6日改定）</a></li><li><a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/hojin/5260.htm" target="_blank" rel="noopener noreferrer">国税庁：交際費等と広告宣伝費との区分</a></li></ul><p className={styles.small}>確認日：2026年11月7日。大会の個別承認は取得前です。</p><div className={styles.actions}><a href={enquiry}>太白区の広告協賛を相談する →</a><a href="/ja/gream-sendai">GREAM仙台の活動を見る →</a></div></section>
  </main></SiteFrame>;
}