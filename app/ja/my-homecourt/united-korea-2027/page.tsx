import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "RBA UNITED JAPAN 韓国・仁川 2027｜選考エントリー募集要項（無料）",
  description: "韓国・仁川 IYIBS 2027に向けたRBA UNITED JAPANの無料選考エントリー募集要項。男女U12/U15/U17の生年月日条件、3泊4日の旅程、航空券別費用案と安全管理、未確定条件を説明。参加契約と決済は未開始。",
  robots: { index: false, follow: false },
};

const interestForm = "https://form.jotform.com/263207310187047";
const inclusions = [
  { title: "大会参加・現地運営", detail: "PLAYGROUNDの現地パッケージ見積に含まれる大会参加・現地コーディネート" },
  { title: "ホテル・食事・送迎", detail: "1月28日チェックイン〜31日チェックアウトの3泊4日を予定。基本3つ星ホテル・2名1室、朝昼夕食、空港・ホテル・大会会場間の送迎を含む仮見積。具体的なホテル・ルームリストは未確定" },
  { title: "RBA UNITEDのチーム編成", detail: "所属クラブを変えず、全国から選考して大会に向けてチームを編成する計画" },
  { title: "事前指導と振り返り", detail: "大会に向けたオンライン指導、育成テーマの共有、帰国後フィードバックを計画中" },
  { title: "引率・安全管理", detail: "RBA側の成人引率者2名体制を予算案に計上。体制・役割分担・保険内容は未確定" },
  { title: "チームウェア", detail: "選手用ウェアの予算を計上。仕様と提供範囲は正式募集時に確定" },
] as const;

const exclusions = [
  "日本～韓国間の往復航空券（出発地により変動）",
  "自宅から日本国内の空港までの交通費・前後泊",
  "パスポート取得・更新、渡航手続きに必要な費用",
  "日本国内での追加の海外旅行保険加入費用（主催側から別途加入が必須と案内されています）",
  "個人的な買い物、通信、指定外の飲食",
  "最終見積に含まれない追加日程・自由行動の費用",
] as const;

const process = [
  { step: "01", title: "無料の選考エントリー", detail: "保護者が選手の生年月日・希望カテゴリー・所属クラブ等を送信。正式な選考への応募受付であり、遠征参加確定・旅行予約・支払義務は生じません。" },
  { step: "02", title: "資格と実施可否を確認", detail: "PLAYGROUNDのU12/U15/U17生年月日基準に照合し、例外申請、最終チームカテゴリー、参加選手数と大会への正式エントリー可否を確認します。" },
  { step: "03", title: "選考方針の提示", detail: "審査方法・担当者・安全管理体制・保護者同意の手続きを説明します。先着確約はしません。" },
  { step: "04", title: "総費用と返金規定の提示", detail: "旅行業者と契約主体・航空券・ホテル・保険・キャンセル条件を整理した正式な費用を提示します。" },
  { step: "05", title: "保護者同意・正式申込", detail: "年齢資格、選考、実施条件、旅行契約主体、取消・返金条件を確認し、保護者が書面で同意した後に正式申込へ進みます。" },
  { step: "06", title: "前金50％・残金50％（正式募集後のみ）", detail: "正式契約に基づき、承認された適法な徴収主体から個別に支払案内を行う予定です。前金・残金の期日は契約書面で明記し、入金前には返金条件を提示します。現在の無料登録では支払いは発生しません。" },
] as const;

const faq = [
  { q: "今の所属チームを辞める必要はありますか？", a: "ありません。各クラブでの活動を続けながら、期間限定の選抜チームで国際経験を得る構想です。" },
  { q: "対象年齢は？U14はありますか？", a: "大会側の正式な募集枠は男女U12・U15・U17で、U14という独立したカテゴリーはありません。U12は2014年7月〜2015年12月生まれ、U15は2011年7月〜2012年12月生まれ、U17は2009年7月〜2010年12月生まれが基本です。日本の2026年度中学3年生のU15出場は主催者が柔軟に対応するとの案内ですが、個別確認が必要です。" },
  { q: "違うクラブの選手でチームを組めますか？", a: "可能です。大会で使用するチーム名は一つに統一します。1チームあたり選手10〜15名が大会側の目安ですが、RBAの最終選考人数・カテゴリーはまだ確定していません。" },
  { q: "保険とアレルギーの対応は？", a: "PLAYGROUNDは日本国内で独自の海外旅行保険への加入を必須としています。韓国の主催者側保険は外国籍選手への適用条件が未確認です。食物アレルギーは大会2週間前までの相談が必要で、完全除去は保証されていません。詳細な健康情報は無料応募フォームでは収集しません。" },
  { q: "238,000円で必ず参加できますか？", a: "いいえ。先行238,000円・通常248,000円は現時点の予算検討価格で、契約金額でもお支払いのお願いでもありません。人数・為替・宿泊・保険・旅行業者の契約条件によって変わります。" },
  { q: "航空券込みの総額ですか？", a: "いいえ。韓国への往復航空券や日本国内移動は別途必要です。正式募集時には、航空券別の参加費と、航空券等を含めた想定家庭負担を併記します。" },
  { q: "前金制ですか？いつ支払いますか？", a: "正式募集では参加費の50％を前金、残り50％を後日支払う方式を検討しています。先行案は119,000円ずつ、通常案は124,000円ずつです。どちらも税込想定・航空券別の検討価格で、請求額や納付日ではありません。契約・選考・保護者同意・返金条件がそろうまでは請求しません。" },
  { q: "キャンセルや怪我・渡航中止の扱いは？", a: "参加者・主催者・天候・渡航制限などの事由別に、返金範囲と手数料を主催者・旅行業者と確認中です。合意前に支払を求めません。" },
] as const;

export default function KoreaUnitedInterestPage() {
  return (
    <SiteFrame locale="ja" languagePage="my-homecourt">
      <main className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.heroTop}>
            <a href="/ja/my-homecourt" className={styles.back}>← MY HOME COURT</a>
            <span className={styles.status}>FREE SELECTION ENTRY / 遠征契約・決済前</span>
          </div>
          <div className={styles.brand}>RIOT BASKETBALL ACADEMY <strong>RBA</strong></div>
          <p className={styles.overline}>INTERNATIONAL BASKETBALL · INCHEON 2027</p>
          <h1>RBA UNITED<br />JAPAN <span>× KOREA</span></h1>
          <p className={styles.heroDate}>IYIBS 2027 ／ 2027年1月28日〜31日・3泊4日</p>
          <p className={styles.heroLead}>所属はそのまま。挑戦する舞台を、世界へ。</p>
          <p className={styles.heroText}>日本全国の選手を対象に、韓国・仁川での国際大会参加を目指すRBA UNITED JAPAN。<strong>男女U12・U15・U17の無料選考エントリー</strong>を受け付けます。保護者による応募は、選考合格・大会出場・渡航や予約の確約ではありません。</p>
          <div className={styles.actions}>
            <a href={interestForm} target="_blank" rel="noopener noreferrer" className={styles.primary}>無料で選考エントリーする ↗</a>
            <a href="#price" className={styles.secondary}>費用案を見る ↓</a>
          </div>
          <p className={styles.safety}>※大会日程と基本生年月日条件は主催者から提示済み。RBAが実際に派遣するカテゴリー、選考人数、最終費用、旅行契約・保険・取消条件は未確定です。正式な有料参加募集と決済は開始していません。</p>
        </header>


        <section className={styles.section} id="eligibility">
          <p className={styles.kicker}>00 / PLAYGROUND ELIGIBILITY</p>
          <h2>大会の出場資格と、RBAの募集要項。</h2>
          <p className={styles.intro}><strong>大会主催者PLAYGROUND CORPORATIONの回答に基づく基本資格</strong>です。男女ともにU12・U15・U17が対象。U14の独立カテゴリーは設けられていません。今回のRBA UNITED JAPANが出場するカテゴリーは、応募状況と主催者確認を踏まえて決定します。</p>
          <div className={styles.checks}>
            <div><strong>U12｜男女</strong><span>2014年7月〜2015年12月生まれ</span></div>
            <div><strong>U15｜男女</strong><span>2011年7月〜2012年12月生まれ。2026年度の日本の中学3年生は例外的な対応の余地がありますが、主催者へ個別確認が必要です</span></div>
            <div><strong>U17｜男女</strong><span>2009年7月〜2010年12月生まれ</span></div>
            <div><strong>チーム編成</strong><span>所属クラブが異なる選手の合同編成が可能。大会登録のチーム名は一つに統一。選手10〜15名が基本の目安（最終人数・出場可否は未確定）</span></div>
          </div>
          <p className={styles.notice}>応募できるのは、保護者が入力する<strong>無料の選考エントリー</strong>です。募集人数を満たしただけで大会出場は決まりません。参加資格・選考方法・適法な旅行契約・取消条件・保護者書面同意を確認してから、正式参加の可否を個別案内します。参加契約や前金請求はこの段階では発生しません。</p>
          <div className={styles.actions}><a className={styles.primary} href={interestForm} target="_blank" rel="noopener noreferrer">募集条件を理解して無料エントリー ↗</a></div>
        </section>
        <section className={styles.section} id="price">
          <p className={styles.kicker}>01 / PROPOSED TOTAL PRICE</p>
          <h2>現地パッケージも、RBAの指導・運営も。<br />まとめて見通せる費用設計。</h2>
          <p className={styles.intro}>PLAYGROUNDの大会・ホテル・食事・送迎の現地サービスに、RBAによる選手選考、事前指導、引率、安全管理、振り返りなどの育成・運営サービスを加えた<strong>航空券別の総参加費案</strong>です。</p>
          <div className={styles.priceGrid}>
            <article className={styles.priceCard}>
              <span>先行参加費案 / 検討中</span>
              <strong>¥238,000</strong>
              <small>選手1名・税込想定／航空券別</small>
              <div className={styles.deposit}><span>前金50％（予定）</span><b>¥119,000</b><span>残金50％（予定）</span><b>¥119,000</b></div>
            </article>
            <article className={styles.priceCard}>
              <span>通常参加費案 / 検討中</span>
              <strong>¥248,000</strong>
              <small>選手1名・税込想定／航空券別</small>
              <div className={styles.deposit}><span>前金50％（予定）</span><b>¥124,000</b><span>残金50％（予定）</span><b>¥124,000</b></div>
            </article>
          </div>
          <p className={styles.notice}>この金額および50％前金・50％残金の配分は<strong>正式決定前の提案です</strong>。2026年11月18日付PLAYGROUND仮見積と、RBA側の必要経費・運営対価に基づく検討案であり、<strong>正式な募集価格ではありません</strong>。仮見積の有効期限は11月29日。人数・為替・宿泊条件・契約主体・引率者数が変われば価格を見直します。前金の支払時期と取消・返金規定は、正式な募集要項・契約書面で通知します。</p>
          <p className={styles.note}><strong>現在は無料の参加意向・選考エントリーのみ。</strong> 選考前の入金、仮押さえのための前金、保護者への請求、Stripe決済の開放は行いません。成人引率・旅程・旅行業者の契約条件・保護者の書面同意が整い、正式参加が成立した後に限り、合意済みの支払方法をご案内します。</p>
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
            <div><strong>日程と泊数</strong><span>主催者が記載を訂正済み。2027年1月28日チェックイン、31日チェックアウト・帰国予定の3泊4日。詳細フライトと競技行程は未確定。</span></div>
            <div><strong>募集カテゴリー</strong><span>男女U12・U15・U17の基本生年月日基準は主催者提示済み。U14はありません。RBAが出場するカテゴリー、選手人数、個別の特例出場と最終名簿は未確定。</span></div>
            <div><strong>安全管理と返金</strong><span>現地試合中はPLAYGROUND、宿泊・移動中はRBA引率側が管理。日本国内での独自海外旅行保険への加入が必須です。成人引率者数、参加家庭への返金条項は未合意。</span></div>
            <div><strong>旅行契約の主体</strong><span>現地宿泊・移動の契約および代金収受は、登録旅行業者との適切な役割分担を確認後に確定。</span></div>
          </div>
        </section>

        <section className={styles.darkSection}>
          <p className={styles.kicker}>05 / HOW TO JOIN</p>
          <h2>無料選考エントリーから正式参加まで。</h2>
          <div className={styles.steps}>{process.map(item => <article key={item.step}><strong>{item.step}</strong><div><h3>{item.title}</h3><p>{item.detail}</p></div></article>)}</div>
          <div className={styles.actions}><a href={interestForm} target="_blank" rel="noopener noreferrer" className={styles.primary}>無料の選考エントリーへ ↗</a></div>
          <p className={styles.safety}>登録は保護者が行ってください。応募自体は正式な選考希望の受付です。選考結果・大会参加契約・支払いは別手続きで、まだ開始していません。</p>
        </section>

        <section className={styles.section}>
          <p className={styles.kicker}>06 / QUESTIONS FROM FAMILIES</p>
          <h2>保護者の皆さまへ。</h2>
          <div className={styles.faq}>{faq.map(item => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div>
          <p className={styles.notice}>これは募集要項の情報提供および無料の選考エントリー受付です。RBA・PLAYGROUND・旅行事業者の間で正式条件が確定し、保護者へ書面で説明・同意確認が完了するまで、契約・予約・請求・前金徴収・決済を行いません。</p>
          <div className={styles.bottom}>
            <strong>RBA UNITED JAPAN</strong>
            <p>所属チームでの日常を大切にしながら、違う環境で学ぶ機会を。</p>
            <a href={interestForm} target="_blank" rel="noopener noreferrer" className={styles.primary}>無料で選考エントリー ↗</a>
            <a href="/ja/my-homecourt" className={styles.back}>MY HOME COURTに戻る</a>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
