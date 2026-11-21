import {ArrowRight,ShieldCheck} from "lucide-react";
import {SiteFrame} from "./site-frame";
import styles from "./japan-experience.module.css";

const quick="https://form.jotform.com/263221936704052";
const detailed="https://form.jotform.com/263218488425060";
const offers=[
 {id:"01",title:"海外チームの訪日育成交流",audience:"海外U12〜U18クラブ・学校・アカデミー",body:"日本でのRBA指導、合同練習、少人数ゲーム、指導者の振り返りを設計します。相手チームとの試合は体育館・協会手続き・安全体制の確認後に検討します。",deliverable:"事前診断、練習設計、指導・実施、事後フィードバック"},
 {id:"02",title:"海外アカデミー育成支援",audience:"アカデミー運営者・育成責任者",body:"認知・判断・実行を中心に、年齢に合った練習課題や指導者の育成体系を一緒につくります。成果や資格認定は保証しません。",deliverable:"現状診断、練習レビュー、オンライン面談、次の実践課題"},
 {id:"03",title:"海外向け指導者研修・講習",audience:"クラブ、学校、指導者グループ",body:"試合での判断、スペーシング、ゲームを通した学習、長期育成と傷害予防についてオンラインまたは対面で学びます。",deliverable:"テーマ別講習、映像レビュー、指導者との振り返り"}
] as const;

export function GlobalServicesLandingJa(){
 return <SiteFrame locale="ja" languagePage="international"><main className={styles.page} lang="ja">
  <section className={styles.hero}>
   <a className={styles.breadcrumb} href="/ja/international">← RBA海外連携</a>
   <a className={styles.breadcrumb} href="/international/services" hrefLang="en">English →</a>
   <span className={styles.kicker}>RBA GLOBAL SERVICES / JAPAN × ASIA</span>
   <h1>世界の育成を、日本のコートから。</h1>
   <p>海外から日本へ来るチーム、海外の育成アカデミー、学びたい指導者をつなぐ。RBAが指導・企画・学習の役割を担い、実現できる条件から組み立てます。</p>
   <div className={styles.actions}><a className={styles.primary} href={quick} target="_blank" rel="noopener noreferrer">無料で事業相談を始める <ArrowRight size={17}/></a><a className={styles.secondary} href="#services">サービス一覧を見る</a></div>
   <p className={styles.note}>初回相談は無料。予約・契約・決済は発生しません。最初のフォームは成人の団体担当者向けです。</p>
  </section>
  <section className={styles.section} id="services">
   <div className={styles.sectionHead}><span className={styles.kicker}>01 / BUSINESS SERVICES</span><h2>提供できる3つの専門サービス</h2><p>体験だけで終わらせず、その後の練習に持ち帰れる学びを設計します。</p></div>
   <div className={styles.cards}>{offers.map(o=><article className={styles.card} key={o.id}><span className={styles.cardNo}>{o.id}</span><h3>{o.title}</h3><p>{o.body}</p><p><strong>対象：</strong>{o.audience}</p><p><strong>成果物：</strong>{o.deliverable}</p></article>)}</div>
  </section>
  <section className={styles.section+" "+styles.light}>
   <div className={styles.sectionHead}><span className={styles.kicker}>02 / EXPERIENCE</span><h2>実際の活動を基にしています。</h2><p>RBAの全国クリニック、台湾SPARTANSとの交流、2026年10月16〜18日のマレーシア・ペナンでの育成・指導者研修実績を基盤にしています。実績は将来の会場・対戦相手・開催日を保証するものではありません。</p></div>
   <p className={styles.note}>関連：<a href="/ja/international/japan-experience">海外チームの訪日プログラム</a> ｜ <a href="/ja/international/rizehope-japan-2027">RIZEHOPE JAPAN 2027（別企画）</a></p>
  </section>
  <section className={styles.section+" "+styles.dark}>
   <div className={styles.sectionHead}><span className={styles.kicker}>03 / FROM ENQUIRY TO DELIVERY</span><h2>相談・調査・正式見積・契約の順に。</h2></div>
   <div className={styles.stepList}>
    <div className={styles.step}><b>01 / 無料相談</b><h3>団体の希望を確認</h3><p>担当者、年代、国、人数、時期、学びたいことをお聞きします。初回は選手の氏名・パスポート・健康情報を収集しません。</p></div>
    <div className={styles.step}><b>02 / 条件調査</b><h3>実現性と安全を確認</h3><p>実施条件が合う場合、<a href={detailed} target="_blank" rel="noopener noreferrer">詳細の無料相談票</a>で会場・指導・言語・保険・申請手続を整理します。</p></div>
    <div className={styles.step}><b>03 / 書面見積</b><h3>費用と役割を分離</h3><p>RBAの指導・企画費用と、会場・通訳・他社の旅行サービス等を分けて明示します。契約主体、税・取消条件は個別に合意します。</p></div>
    <div className={styles.step}><b>04 / 契約後実施</b><h3>合意してから請求・実施</h3><p>正式な書面承諾後、案件ごとの請求書と支払方法をご案内します。フォーム送信だけでは課金しません。</p></div>
   </div>
   <div className={styles.notice}><ShieldCheck size={18}/><span><strong>国際試合・旅行・未成年者保護：</strong>JBA登録チームの国際交流試合では所定の事前申請・承認が必要になる場合があります。航空券・ホテル・貸切バス等の旅行サービスは適切な登録業者が担当する契約形態を確認します。保護者同意・引率・救護・保険・撮影許諾を実施前に確認します。<a href="https://www.japanbasketball.jp/jba/kitei/" target="_blank" rel="noopener noreferrer">JBAの規程・申請案内</a></span></div>
  </section>
  <section className={styles.cta}><div><span className={styles.kicker}>RBA GLOBAL / GET IN TOUCH</span><h2>次の育成交流を、具体的な企画に。</h2><p>仙台・宮城｜riot.training.base@gmail.com</p></div><div><a href={quick} target="_blank" rel="noopener noreferrer">無料相談フォーム ↗</a><p className={styles.note}>成人の団体責任者向け・自動決済なし</p></div></section>
 </main></SiteFrame>;
}
