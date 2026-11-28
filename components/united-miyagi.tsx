import styles from "./united-miyagi.module.css";

export const miyagiPath = "/ja/events/shizugawa-united-2027";
const shizugawaApply = miyagiPath+"/payment?programme=shizugawa";
const rizehopeApply = miyagiPath+"/payment?programme=rizehope";

export function MiyagiUnitedEntry({now=new Date()}:{now?:Date}={}) {
  if (now >= new Date("2027-02-27T00:00:00+09:00")) return null;
  return <aside className={styles.entry}>
    <div><p className={styles.kicker}>RBA UNITED / MIYAGI 2027</p>
      <h2>志津川育成合宿・RIZEHOPE JAPAN</h2>
      <p>2月6〜7日 志津川 · 2月27〜28日 柴田町（開催計画）</p>
      <a className={styles.button} href={miyagiPath}>対象学年・費用・受付状況を見る →</a>
    </div>
  </aside>;
}

export function MiyagiUnitedProgramme() {
  return <div className={styles.page}>
    <header className={styles.hero}>
      <p className={styles.kicker}>RBA UNITED｜2027年2月・宮城</p>
      <h1>仲間と学び、<br/>国際試合へ。</h1>
      <p>今の所属チームを続けながら、一人から参加できる育成・交流プログラム。</p>
      <a className={styles.button} href="#join">参加企画を選ぶ ↓</a>
      <p className={styles.status}>開催条件調整中・現時点の支払い不要</p>
    </header>
    <section className={styles.section} aria-labelledby="pathway-title">
      <h2 id="pathway-title">2月の挑戦</h2>
      <article id="shizugawa" className={styles.step}>
        <div className={styles.shizu} role="img" aria-label="過去の志津川合宿の体育館写真"/>
        <div className={styles.content}><p className={styles.kicker}>2/6（土）〜7（日）｜希望日</p><h3>志津川育成合宿</h3>
          <p>小4〜中3の男女・1泊2日。仲間を知り、状況判断やチームでの動きを学び、次の試合への個人課題を決めます。</p>
          <p><strong>募集定員30名｜早期29,800円・通常33,000円（税込）</strong></p>
          <p>早期価格は12月6日（日）23:59まで。宿泊・4食・指導・施設利用・運営費込み。交通費・日曜夕食は別途です。</p>
          <p className={styles.notice}>志津川自然の家に研修日程を再提出済み。施設の受入と外部体育館・実技日程は調整中です。決済をご案内する場合も仮予約となり、最終確定前の辞退・条件不同意・主催者都合の中止は全額返金します。</p>
          <a className={styles.button} href={shizugawaApply}>志津川｜申込・決済 →</a>
        </div>
      </article>
      <div className={styles.bridge}><strong>合宿で決めた課題 → 日常練習 → 国際試合</strong><p>MY HOME COURTで練習を振り返り、参加条件とチーム編成を確認して次の企画へ。</p><a href="/ja/my-homecourt">MY HOME COURTを見る →</a></div>
      <article id="rizehope" className={styles.step}>
        <div className={styles.shibata} role="img" aria-label="柴田町・船岡城址公園からの風景（春の地域写真）"/>
        <div className={styles.content}><p className={styles.kicker}>2/27（土）〜28（日）｜開催予定</p><h3>RIZEHOPE JAPAN 2027</h3>
          <p>宮城県柴田町のU12国際交流。東北の小学6年生向けにUNITED個人参加を計画しています。海外の選手との試合で学んだことを実践する機会です。</p>
          <p><strong>個人参加定員12名｜早期22,000円・通常24,800円（税込）</strong></p>
          <p>早期価格は12月6日（日）23:59まで。志津川への参加は出場条件ではありません。</p>
          <p className={styles.notice}>チーム編成と競技条件は正式案内後に確認します。</p>
          <a className={styles.button} href={rizehopeApply}>RIZEHOPE｜申込・決済 →</a>
          <p className={styles.credit}>地域写真：<a href="https://commons.wikimedia.org/wiki/File:Funaoka_view.jpg">Kumamushi / Wikimedia Commons</a> · <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>（春の風景・トリミング表示）</p>
        </div>
      </article>
      <aside className={styles.bridge}><h3>中学生・高校生にも、次の国際交流を。</h3><p>U15・U18向けの別企画を検討しています。日程・会場・対象カテゴリーは決定後にご案内します。</p></aside>
    </section>
    <section id="join" className={styles.section}><h2>保護者の方へ｜参加の流れ</h2>
      <ol className={styles.flow}><li>参加したい企画を選ぶ（両方でも、単独でも可）</li><li>受付開始後、保護者が正式申込フォームに必要事項を入力</li><li>参加条件・料金を確認し、そのまま決済</li></ol>
      <p>RBAの会員登録・ログインは不要です。支払済みの方は再決済不要です。</p>
      <div className={styles.actions}><a className={styles.button} href={shizugawaApply}>志津川（小4〜中3）</a><a className={styles.button} href={rizehopeApply}>RIZEHOPE（小学6年生）</a></div>
      <p>ご質問は <a href="mailto:riot.training.base@gmail.com">RBAへメール</a>でご相談ください。</p>
    </section>
  </div>;
}
