import { SiteFrame } from "@/components/site-frame";
import { torstenRegistrationUrl } from "@/components/programme-data";

const reportUrl = "https://note.com/rba_official/n/n9abeca015166";
const speakerUrl = "https://note.com/rba_official/n/n0c539ddd5041";
const worksheetUrl = "/resources/shooting-observation.pdf";

const concerns = [
  { n: "01", title: "練習では入るのに、試合で打てない", body: "ボールを受ける前に何を見て、どう準備するのか。シュート技術とゲームの判断を切り離さずに考えたい。" },
  { n: "02", title: "シューティング練習が5対5につながらない", body: "反復練習を増やすだけでなく、守備・スペーシング・アドバンテージを含む練習をどう組み立てるか。" },
  { n: "03", title: "育成年代でどこまで教えるべきか迷う", body: "U12・U15の発達段階や環境の違いを踏まえ、選手の判断を奪わないコーチングを探りたい。" },
];
const themes = [
  { n: "TECHNIQUE", title: "シューターをどう育てるか", body: "現代のシューターに求める技術と、育成年代での習得をどのように考えるか。" },
  { n: "PRACTICE", title: "練習をどう設計するか", body: "シュートの技術練習を、判断と状況を伴う学習に結び付ける考え方。" },
  { n: "GAME", title: "良いシュートをどう生むか", body: "スペーシング、アドバンテージ、ボール・オフボールの動きとシュート機会の関係。" },
];
function Apply({ children, secondary = false }: { children: React.ReactNode; secondary?: boolean }) {
  return <a className={secondary ? "tc-btn tc-btn--ghost" : "tc-btn"} href={torstenRegistrationUrl} target="_blank" rel="noopener noreferrer">{children}<span aria-hidden="true">↗</span></a>;
}

export function TorstenCoachCampaignJa() {
  return <SiteFrame locale="ja" languagePage="events/torsten-loibl-online-clinic">
    <div className="tc-landing">
      <section className="tc-hero">
        <div className="tc-container">
          <div className="tc-kicker"><span className="tc-pulse" />RBA COACH EDUCATION / ONLINE CLINIC VOL.2</div>
          <p className="tc-date">2026.11.25 WED · 20:00—21:30 JST · ZOOM</p>
          <h1>練習では入る。<br/><em>試合では打てない。</em></h1>
          <p className="tc-lead">その原因を、シュートフォームだけに求めていないか。</p>
          <p className="tc-hero-description">世界の育成・代表・プロの指導現場を経験したトーステン・ロイブル氏と考える90分。<strong>技術、判断、練習設計、スペーシングをつなぎ、試合で良いシュートを生み出す育成</strong>を学びます。</p>
          <div className="tc-actions"><Apply>講習に申し込む</Apply><a className="tc-text-link" href="/ja/coach/shooting-check">無料・2分のシュート練習チェック ↗</a><a className="tc-text-link" href="#learn">講習内容を見る ↓</a></div>
          <p className="tc-hero-note">主催：Riot Basketball Academy ／ 英語講義・日本語逐次通訳 ／ 指導者資格不要</p>
          <div className="tc-facts"><div><span>LIVE</span><strong>¥3,300</strong><small>税込・当日参加</small></div><div><span>ON-DEMAND</span><strong>¥4,400</strong><small>税込・30日間視聴</small></div><div><span>DATE</span><strong>11/25</strong><small>水曜 20:00–21:30</small></div></div>
        </div>
      </section>

      <section className="tc-section tc-problems" aria-labelledby="tc-problem-title">
        <div className="tc-container">
          <p className="tc-eyebrow">THE QUESTIONS COACHES ARE ASKING</p>
          <h2 id="tc-problem-title">指導現場の、<br/>具体的な疑問から始める。</h2>
          <p className="tc-section-intro">すでに届いた申込者の質問にも、試合でのシュート、練習設計、育成年代の指導についての悩みが表れています。</p>
          <div className="tc-grid">{concerns.map(v => <article className="tc-problem" key={v.n}><span>{v.n}</span><h3>{v.title}</h3><p>{v.body}</p></article>)}</div>
        </div>
      </section>

      <section className="tc-section tc-learn" id="learn" aria-labelledby="tc-learn-title">
        <div className="tc-container">
          <p className="tc-eyebrow">THE MODERN BASKETBALL GAME OF SHOOTERS</p>
          <h2 id="tc-learn-title">シュートを<br/><em>技術だけで終わらせない。</em></h2>
          <p className="tc-section-intro">今回の講習テーマは「現代バスケットボールにおけるシューターの育成と活用」。主に次の3つを扱います。</p>
          <div className="tc-steps">{themes.map(v => <article key={v.n}><span>{v.n}</span><h3>{v.title}</h3><p>{v.body}</p></article>)}</div>
          <p className="tc-small">※講義の具体例や質疑応答の扱いは、講師の進行と当日の内容によります。特定のドリルの実演・個別回答を保証するものではありません。</p>
        </div>
      </section>

      <section className="tc-section tc-speaker" aria-labelledby="tc-speaker-title">
        <div className="tc-container tc-speaker-layout">
          <div><p className="tc-eyebrow">SPEAKER</p><h2 id="tc-speaker-title">TORSTEN<br/>LOIBL</h2><p className="tc-speaker-role">トーステン・ロイブル</p><p className="tc-speaker-role">日本の育成年代代表・3x3などで指導</p></div>
          <div><p>国内のプロクラブだけでなく、日本のU16・U18・U19世代、3x3日本代表に関わる指導経験を持つコーチです。2019年のFIBA 3x3 U23ワールドカップ女子日本代表優勝時にはディレクターコーチを務めました。</p><p>この機会を、単に有名なコーチの話を聞く場ではなく、<strong>次の練習を見直すための学び</strong>にしたいと考えています。</p><div className="tc-mini-links"><a href={reportUrl} target="_blank" rel="noopener noreferrer">前回の開催レポート ↗</a><a href={speakerUrl} target="_blank" rel="noopener noreferrer">講師紹介 ↗</a></div></div>
        </div>
      </section>

      <section className="tc-section tc-pricing" id="register" aria-labelledby="tc-register-title">
        <div className="tc-container">
          <p className="tc-eyebrow">CHOOSE HOW TO LEARN</p>
          <h2 id="tc-register-title">全国どこからでも。<br/>自分の予定に合わせて。</h2>
          <div className="tc-plan-grid">
            <article className="tc-plan"><div className="tc-plan-top"><span>01 / LIVE</span><strong>11月25日（水）</strong></div><h3>ライブ受講</h3><div className="tc-amount">¥3,300 <small>税込</small></div><p>20:00〜21:30（日本時間）。Zoomでリアルタイムに受講する形式です。</p><Apply>ライブを選んで申し込む</Apply></article>
            <article className="tc-plan"><div className="tc-plan-top"><span>02 / ON-DEMAND</span><strong>開催後30日間</strong></div><h3>オンデマンド受講</h3><div className="tc-amount">¥4,400 <small>税込</small></div><p>当日参加できない方向け。配信開始後、30日間繰り返し視聴できます。</p><Apply>録画を選んで申し込む</Apply></article>
          </div>
          <div className="tc-how"><h3>お申し込みは3ステップ</h3><ol><li><strong>フォームを送信</strong><span>参加形式と連絡先などを入力します。</span></li><li><strong>支払いを完了</strong><span>フォーム送信後の確認画面にある、選択したプランの決済リンクからお支払いください。</span></li><li><strong>参加案内を確認</strong><span>決済完了後の案内をご確認ください。フォーム送信だけでは申込確定になりません。</span></li></ol><p>カード決済が難しい場合は、フォーム送信後に <a href="mailto:riot.training.base@gmail.com?subject=Torsten%2011%2F25%20%E9%8A%80%E8%A1%8C%E6%8C%AF%E8%BE%BC%E7%9B%B8%E8%AB%87">銀行振込についてメールでご相談ください</a>。</p></div>
        </div>
      </section>

      <section className="tc-section tc-resource">
        <div className="tc-container tc-resource-grid"><div><p className="tc-eyebrow">FREE PRACTICE TOOL / BY RBA</p><h2>まず、2分で練習を見直す。<br/>次に、10回の攻撃を観察する。</h2><p>シュートの成否だけでなく、打つ前の判断や準備を記録するA4の無料ワークシートです。申し込みや会員登録は不要です。</p><p className="tc-small">本資料はRBA独自制作であり、トーステン氏の監修資料や本講義の配布教材ではありません。</p></div><div className="tc-resource-action"><a className="tc-btn" href="/ja/coach/shooting-check">無料・5問チェックを試す ↗</a><a className="tc-btn tc-btn--ghost" href={worksheetUrl}>観察ワークシートを入手する ↗</a><a className="tc-text-link" href="https://form.jotform.com/262858264882068" target="_blank" rel="noopener noreferrer">今後の無料教材の配信登録（任意） ↗</a></div></div>
      </section>

      <section className="tc-section tc-faq" aria-labelledby="tc-faq-title">
        <div className="tc-container"><p className="tc-eyebrow">FAQ</p><h2 id="tc-faq-title">参加前に確認したいこと。</h2><details><summary>指導者資格がなくても参加できますか？</summary><p>はい。ミニバス、U15、高校、大学、地域クラブ、スクール等の指導者・スタッフのほか、選手、保護者、コーチを志す方も参加できます。</p></details><details><summary>英語が得意ではありません。</summary><p>英語の講義には日本語逐次通訳が入ります。</p></details><details><summary>11月25日の夜は練習があり、参加できません。</summary><p>30日間のオンデマンド受講（4,400円）をお選びください。</p></details><details><summary>フォームを送信すれば申込完了ですか？</summary><p>いいえ。フォームで参加形式を選び、確認画面で対応する参加費をお支払いいただいた後に申込確定となります。</p></details><details><summary>JBAコーチライセンスの更新ポイントは付与されますか？</summary><p>本講習をJBA公認のリフレッシュ研修としてご案内していません。ポイント付与を目的とする場合は、JBA・TeamJBAの公式情報をご確認ください。</p></details></div>
      </section>

      <section className="tc-ending"><div className="tc-container"><p className="tc-eyebrow">NEXT PRACTICE STARTS HERE</p><h2>世界の視点を、<br/>あなたのコートへ。</h2><p>一度学んで終わりではなく、目の前の選手と日々の練習にどう生かすか。そのための90分です。</p><Apply>11月25日の講習に申し込む</Apply><div className="tc-last-links"><a href={reportUrl} target="_blank" rel="noopener noreferrer">前回レポート</a><a href="/ja/coaches">RBAの指導者向け活動</a><a href="/ja/policies">参加規約・プライバシー</a></div><p className="tc-small">主催・運営：Riot Basketball Academy。講師個人の指導経験を紹介しています。</p></div></section>
      <div className="tc-sticky"><span><strong>11/25（水）20:00</strong><small>LIVE ¥3,300 ／ 録画 ¥4,400</small></span><a href={torstenRegistrationUrl} target="_blank" rel="noopener noreferrer">申し込む ↗</a></div>
    </div>
  </SiteFrame>;
}
