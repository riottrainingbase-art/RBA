import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "RBA UNITED JAPAN 韓国・仁川 2027｜費用案・無料事前登録",
  description: "RBA UNITED JAPANで韓国・仁川IYIBS 2027に挑戦。PLAYGROUNDの現地パッケージとRBAの選考・指導・引率運営を含む料金案、対象条件、無料事前登録を案内します。正式募集・決済は未開始。",
  robots: { index: false, follow: false },
};

const interestForm = "https://form.jotform.com/263207310187047";
const inclusions = [
  { title: "大会参加・現地運営", detail: "PLAYGROUNDの現地パッケージ見積に含まれる大会参加・現地コーディネート" },
  { title: "ホテル・食事・送迎", detail: "3つ星ホテル、食事、空港と大会会場の現地送迎を予定。実際の宿泊泊数・送迎日は確認中" },
  { title: "RBA UNITEDのチーム編成", detail: "所属クラブを変えず、全国から選考して大会に向けてチームを編成する計画" },
  { title: "事前指導と振り返り", detail: "大会に向けたオンライン指導、育成テーマの共有、帰国後フィードバックを計画中" },
  { title: "引率・安全管理", detail: "RBA側の成人引率者2名体制を予算案に計上。体制・役割分担・保険内容は未確定" },
  { title: "チームウェア", detail: "選手用ウェアの予算を計上。仕様と提供範囲は正式募集時に確定" },
] as const;

const exclusions = [
  "日本～韓国間の往復航空券（出発地により変動）",
  "自宅から日本国内の空港までの交通費・前後泊",
  "パスポート取得・更新、渡航手続きに必要な費用",
  "個人的な買い物、通信、指定外の飲食",
  "最終見積に含まれない追加日程・自由行動の費用",
] as const;

const process = [
  { step: "01", title: "無料の参加意向登録", detail: "保護者が選手の基本情報と参加意向を送信。出場確定・予約・支払義務は生じません。" },
  { step: "02", title: "出場条件と人数の確認", detail: "大会主催者からカテゴリー・生年月日基準・選手数・旅程を文書で確認します。" },
  { step: "03", title: "選考方針の提示", detail: "審査方法・担当者・安全管理体制・保護者同意の手続きを説明します。先着確約はしません。" },
  { step: "04", title: "総費用と返金規定の提示", detail: "旅行業者と契約主体・航空券・ホテル・保険・キャンセル条件を整理した正式な費用を提示します。" },
  { step: "05", title: "書面同意・正式申込", detail: "保護者が条件を確認・書面同意した後に限り、正式申込と決済方法をご案内します。" },
] as const;

const faq = [
  { q: "今の所属チームを辞める必要はありますか？", a: "ありません。各クラブでの活動を続けながら、期間限定の選抜チームで国際経験を得る構想です。" },
  { q: "対象年齢は確定していますか？", a: "大会側は男女U12・U15・U17の枠を案内していますが、今回の選抜チームで使えるカテゴリー、各選手の生年月日条件、登録人数は最終確認中です。" },
  { q: "238,000円で必ず参加できますか？", a: "いいえ。先行238,000円・通常248,000円は現時点の予算検討価格で、契約金額でもお支払いのお願いでもありません。人数・為替・宿泊・保険・旅行業者の契約条件によって変わります。" },
  { q: "航空券込みの総額ですか？", a: "いいえ。韓国への往復航空券や日本国内移動は別途必要です。正式募集時には、航空券別の参加費と、航空券等を含めた想定家庭負担を併記します。" },
  { q: "現在、前金を支払う必要はありますか？", a: "ありません。正式契約・前金・Stripe決済はすべて未開始です。無料登録後に請求されることもありません。" },
  { q: "キャンセルや怪我・渡航中止の扱いは？", a: "参加者・主催者・天候・渡航制限などの事由別に、返金範囲と手数料を主催者・旅行業者と確認中です。合意前に支払を求めません。" },
] as const;

export default function KoreaUnitedInterestPage() {
  return (
    <SiteFrame locale="ja" languagePage="my-homecourt">
      <main className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.heroTop}>
            <a href="/ja/my-homecourt" className={styles.back}>← MY HOME COURT</a>
            <span className={styles.status}>FREE INTEREST ONLY / 契約・決済前</span>
          </div>
          <div className={styles.brand}>RIOT BASKETBALL ACADEMY <strong>RBA</strong></div>
          <p className={styles.overline}>INTERNATIONAL BASKETBALL · INCHEON 2027</p>
          <h1>RBA UNITED<br />JAPAN <span>× KOREA</span></h1>
          <p className={styles.heroDate}>IYIBS 2027 ／ 1月28〜31日〈大会側の案内〉</p>
          <p className={styles.heroLead}>所属はそのまま。挑戦する舞台を、世界へ。</p>
          <p className={styles.heroText}>日本全国の選手を対象に、韓国・仁川での国際大会参加を目指す選抜チームを計画しています。現在受け付けているのは、保護者による<strong>無料の参加意向登録</strong>のみです。</p>
          <div className={styles.actions}>
            <a href={interestForm} target="_blank" rel="noopener noreferrer" className={styles.primary}>無料で参加意向を登録する ↗</a>
            <a href="#price" className={styles.secondary}>費用案を見る ↓</a>
          </div>
          <p className={styles.safety}>※日程・カテゴリー・チーム編成・参加費・出場権はまだ確定していません。出場を保証する登録ではありません。</p>
        </header>

        <section className={styles.section} id="price">
          <p className={styles.kicker}>01 / PROPOSED TOTAL PRICE</p>
          <h2>現地パッケージも、RBAの指導・運営も。<br />まとめて見通せる費用設計。</h2>
          <p className={styles.intro}>PLAYGROUNDの大会・ホテル・食事・送迎の現地サービスに、RBAによる選手選考、事前指導、引率、安全管理、振り返りなどの育成・運営サービスを加えた<strong>航空券別の総参加費案</strong>です。</p>
          <div className={styles.priceGrid}>
            <article className={styles.priceCard}>
              <span>先行参加費案 / 検討中</span>
              <strong>¥238,000</strong>
              <small>選手1名・税込想定／航空券別</small>
            </article>
            <article className={styles.priceCard}>
              <span>通常参加費案 / 検討中</span>
              <strong>¥248,000</strong>
              <small>選手1名・税込想定／航空券別</small>
            </article>
          </div>
          <p className={styles.notice}>この金額は<strong>正式な募集価格ではありません</strong>。2026年11月18日付PLAYGROUND仮見積と、RBA側の必要経費・運営対価に基づく検討案です。仮見積の有効期限は11月29日。人数・為替・宿泊条件・契約主体・引率者数が変われば価格を見直します。</p>
          <p className={styles.note}>過去のRBA JOURNALに記載した「STANDARD先行228,000円／通常238,000円」「STARTER」の料金は以前の試算です。現在はホテル宿泊を前提とした最新条件を検証中で、旧料金の適用やSTARTERの提供を確約するものではありません。</p>
        </section>

        <section className={styles.darkSection}>
          <p className={styles.kicker}>02 / PROGRAMME VALUE</p>
          <h2>大会に出るだけで終わらない。</h2>
          <p>指導・選考・安全管理・振り返りまでを一つの育成プログラムとして設計します。次の項目は<strong>提供予定の構成案</strong>であり、正式契約時に提供範囲を確定します。</p>
          <div className={styles.benefits}>
            {inclusions.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.detail}</p></article>)}
          </div>
        </section>

        <section className={styles.section}>
          <p className={styles.kicker}>03 / EXCLUDED COSTS</p>
          <h2>別途必要になる費用も明確に。</h2>
          <ul className={styles.exclusions}>{exclusions.map(item => <li key={item}>{item}</li>)}</ul>
          <p className={styles.notice}>日本国内の出発地と航空会社が決まらない段階で、家庭ごとの最終総負担額を確定できません。正式募集では「航空券別の参加費」と「渡航関連費を含めた総負担の目安」を分けて案内します。</p>
        </section>

        <section className={styles.section}>
          <p className={styles.kicker}>04 / CURRENT VERIFICATION</p>
          <h2>正式募集の前に、確認すべきこと。</h2>
          <div className={styles.checks}>
            <div><strong>日程と泊数</strong><span>仮見積の1月28〜31日表記と「4泊5日」表記に相違があります。宿泊日と移動日を確認中。</span></div>
            <div><strong>年齢・登録資格</strong><span>U12・U15・U17の生年月日基準、カテゴリー、チーム人数・選考条件を確認中。</span></div>
            <div><strong>安全管理と返金</strong><span>成人引率者数、緊急対応、保険、怪我や渡航中止時の取消・返金条件を調整中。</span></div>
            <div><strong>旅行契約の主体</strong><span>現地宿泊・移動の契約および代金収受は、登録旅行業者との適切な役割分担を確認後に確定。</span></div>
          </div>
        </section>

        <section className={styles.darkSection}>
          <p className={styles.kicker}>05 / HOW TO JOIN</p>
          <h2>無料登録から正式申込まで。</h2>
          <div className={styles.steps}>{process.map(item => <article key={item.step}><strong>{item.step}</strong><div><h3>{item.title}</h3><p>{item.detail}</p></div></article>)}</div>
          <div className={styles.actions}><a href={interestForm} target="_blank" rel="noopener noreferrer" className={styles.primary}>無料の参加意向登録へ ↗</a></div>
          <p className={styles.safety}>登録は保護者が行ってください。選考結果の通知・正式契約・支払いは、このフォームとは別の手続きです。</p>
        </section>

        <section className={styles.section}>
          <p className={styles.kicker}>06 / QUESTIONS FROM FAMILIES</p>
          <h2>保護者の皆さまへ。</h2>
          <div className={styles.faq}>{faq.map(item => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div>
          <p className={styles.notice}>これは情報提供および無料の参加意向受付です。RBA・PLAYGROUND・旅行事業者の間で正式条件が確定し、保護者へ書面で説明・同意確認が完了するまで、契約・予約・請求・前金徴収・決済を行いません。</p>
          <div className={styles.bottom}>
            <strong>RBA UNITED JAPAN</strong>
            <p>所属チームでの日常を大切にしながら、違う環境で学ぶ機会を。</p>
            <a href={interestForm} target="_blank" rel="noopener noreferrer" className={styles.primary}>参加意向を無料で登録 ↗</a>
            <a href="/ja/my-homecourt" className={styles.back}>MY HOME COURTに戻る</a>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
