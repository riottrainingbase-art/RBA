import Link from "next/link";
import {ArrowRight, BookOpen, CalendarDays, Check, ClipboardCheck, Clock3, FileText, HeartPulse, History, ShieldCheck, Sparkles, Target, Users} from "lucide-react";
import {SiteFrame} from "@/components/site-frame";
import {memberArticles} from "@/lib/member-articles";

export function HomecourtPlusPage(){
  const counts={
    total:memberArticles.length,
    player:memberArticles.filter(item=>item.role==="player").length,
    parent:memberArticles.filter(item=>item.role==="parent").length,
    coach:memberArticles.filter(item=>item.role==="coach").length,
  };
  return <SiteFrame locale="ja" languagePage="my-homecourt">
    <main className="hc-plus-page">
      <section className="hc-plus-hero section-pad">
        <p className="section-index inverse">MY HOME COURT / PLUS</p>
        <h1>学んだことを、<br/>その週のバスケで使う。</h1>
        <p>HOMECOURT PLUSは、記事を増やすための有料会員ではありません。今週やることを一つ決めて、試して、振り返って、次を決める。その流れを続けるための場所です。</p>
        <div className="hc-plus-price"><strong>¥3,300</strong><span>/ 月</span><small>税込・月額</small></div>
        <div className="hc-plus-actions">
          <a className="button button-member" href="/ja/my-homecourt/app/plus">HOMECOURT PLUSを始める <ArrowRight size={17}/></a>
          <a className="button button-light" href="#difference">無料版との違いを見る <ArrowRight size={17}/></a>
        </div>
        <p className="hc-plus-small">今のチームに所属したまま使えます。決済にはRBA IDでのログインが必要です。</p>
      </section>

      <section className="hc-plus-method section-pad">
        <div className="section-head"><div><p className="section-index">WEEKLY LOOP</p><h2>毎週やることは、4つだけ。</h2></div><p>全部の機能を使う必要はありません。一週間に一つテーマを持ち、必要なところだけ使います。</p></div>
        <div className="hc-plus-method-grid">
          <article><span>01</span><Target/><h3>決める</h3><p>今週、試したいことを一つ決めます。</p></article>
          <article><span>02</span><BookOpen/><h3>学ぶ</h3><p>必要な実践ガイドを一つ読みます。</p></article>
          <article><span>03</span><ClipboardCheck/><h3>試す</h3><p>練習や試合で実際にやってみます。</p></article>
          <article><span>04</span><History/><h3>振り返る</h3><p>できたことと次に変えることを残します。</p></article>
        </div>
      </section>

      <section className="hc-plus-library section-pad">
        <div className="section-head"><div><p className="section-index">MEMBER LEARNING</p><h2>{counts.total}本の実践ガイド。</h2></div><p>無料JOURNALで考え方や根拠を知り、PLUSでは「次に何をするか」まで落とし込みます。</p></div>
        <div className="hc-plus-library-metrics">
          <article><strong>{counts.player}</strong><span>選手向け</span><p>試合の判断、1on1、シュート、守備、振り返り、コンディション。</p></article>
          <article><strong>{counts.parent}</strong><span>保護者向け</span><p>出場時間、移籍、進路、練習量、指導者との対話、家庭での関わり。</p></article>
          <article><strong>{counts.coach}</strong><span>指導者向け</span><p>練習設計、試合運営、フィードバック、保護者面談、S&C・安全。</p></article>
        </div>
      </section>

      <section className="hc-plus-tools section-pad">
        <div className="section-head"><div><p className="section-index">PLUS TOOLS</p><h2>読むだけで終わらないための機能。</h2></div><p>実際に今のMY HOME COURTで使える機能だけを載せています。</p></div>
        <div className="hc-plus-tool-grid">
          <article><Target/><span>WEEKLY DEVELOPMENT</span><h3>今週のテーマ</h3><p>テーマ、実際にやること、できたと判断する目印まで一つにまとめます。</p></article>
          <article><HeartPulse/><span>CONDITION</span><h3>7日間のコンディション</h3><p>エネルギー、疲労、睡眠、痛みの記録を一週間単位で見返せます。</p></article>
          <article><CalendarDays/><span>SMART PREP</span><h3>大会・遠征の準備</h3><p>予定から逆算して、持ち物、移動、回復、準備項目を整理できます。</p></article>
          <article><BookOpen/><span>LEARN</span><h3>会員向け実践ガイド</h3><p>読む → 一つ試す → 振り返る、までを記事の中で進められます。</p></article>
          <article><History/><span>MONTHLY REVIEW</span><h3>1か月を振り返る</h3><p>今月の変化、続けたいこと、次の一歩を月ごとに残します。</p></article>
          <article><FileText/><span>DEVELOPMENT REPORT</span><h3>成長記録を1枚にする</h3><p>週次テーマ、月次レビュー、参加履歴をまとめ、印刷・PDF保存できます。</p></article>
        </div>
        <p className="hc-plus-health"><ShieldCheck size={17}/>コンディション記録は医療診断や能力評価ではありません。痛みや症状がある場合は、医療専門職の判断を優先してください。</p>
      </section>

      <section className="hc-plus-roles section-pad">
        <div className="section-head"><div><p className="section-index">PLAYER / PARENT / COACH</p><h2>立場によって、使い方が変わります。</h2></div></div>
        <div className="hc-plus-role-grid">
          <article><Users/><span>PLAYER</span><h3>選手</h3><p>次の試合で試すことを決める。動画を一場面だけ振り返る。体調と予定も一緒に見る。</p><strong>例：キャッチ前に見る → 試す → 動画で確認 → 次のテーマへ</strong></article>
          <article><Users/><span>PARENT</span><h3>保護者</h3><p>出場時間や進路に迷った時、感情だけで結論を出さず、状況を整理して次に聞くことを決める。</p><strong>例：記事を読む → 家庭で整理 → コーチへ確認 → 月末に振り返る</strong></article>
          <article><Users/><span>COACH</span><h3>指導者</h3><p>練習前に観察項目を一つ決め、現場で見て、試合後に次の修正を残す。</p><strong>例：テーマ設定 → 練習設計 → 観察 → 映像・試合後レビュー</strong></article>
        </div>
      </section>

      <section className="hc-plus-first-month section-pad">
        <div className="section-head"><div><p className="section-index">FIRST MONTH</p><h2>最初の1か月は、これだけで十分です。</h2></div></div>
        <div className="hc-plus-month-grid">
          <article><span>WEEK 01</span><h3>一つ決める</h3><p>今週のテーマを一つ設定します。最初から完璧な目標でなくて構いません。</p></article>
          <article><span>WEEK 02</span><h3>一つ読む</h3><p>今のテーマに近い会員ガイドを一つ選び、実際に試します。</p></article>
          <article><span>WEEK 03</span><h3>予定と状態を見る</h3><p>次の試合や遠征から逆算し、準備とコンディションを確認します。</p></article>
          <article><span>WEEK 04</span><h3>1か月を振り返る</h3><p>変わったこと、まだ難しいこと、次に続けることを月次レビューに残します。</p></article>
        </div>
      </section>

      <section className="hc-plus-compare section-pad" id="difference">
        <div className="section-head"><div><p className="section-index">FREE / PLUS</p><h2>無料版との違い。</h2></div><p>無料版を小さくするのではなく、続けて使う部分をPLUSにしています。</p></div>
        <div className="hc-plus-compare-grid">
          <article>
            <span>RBA ID / ¥0</span><h3>無料で使う</h3>
            <ul><li><Check/>JOURNALを読む</li><li><Check/>活動を探す</li><li><Check/>参加履歴を残す</li><li><Check/>気になる活動を保存する</li><li><Check/>自分に合う入口を探す</li></ul>
            <Link className="button button-light" href="/ja/my-homecourt">無料版を見る <ArrowRight size={16}/></Link>
          </article>
          <article className="is-plus">
            <span>HOMECOURT PLUS / ¥3,300</span><h3>毎週使う</h3>
            <ul><li><Check/>会員向け実践ガイド {counts.total}本</li><li><Check/>WEEKLY DEVELOPMENT</li><li><Check/>7日間のコンディション推移</li><li><Check/>SMART PREP / 大会・遠征準備</li><li><Check/>MONTHLY REVIEW</li><li><Check/>DEVELOPMENT REPORT / PDF</li></ul>
            <a className="button button-member" href="/ja/my-homecourt/app/plus">PLUSを始める <ArrowRight size={16}/></a>
          </article>
        </div>
      </section>

      <section className="hc-plus-terms section-pad">
        <div><Clock3/><span>MONTHLY</span><strong>月額3,300円</strong><p>月額制です。契約内容・カード変更・解約手続きはStripeの会員ページから行えます。</p></div>
        <div><ShieldCheck/><span>CANCEL</span><strong>解約後も利用期間までは使えます</strong><p>月途中で解約した場合の日割り返金はありません。反映に少し時間がかかる場合があります。</p></div>
        <div><Sparkles/><span>RBA ID</span><strong>現在の所属はそのまま</strong><p>チームを辞めたり、RBA所属になる必要はありません。外の学びを追加するための場所です。</p></div>
      </section>

      <section className="hc-plus-final section-pad">
        <p className="section-index inverse">START HOMECOURT PLUS</p>
        <h2>毎週、一つだけ。</h2>
        <p>全部をやる必要はありません。今の自分に必要なものを一つ選び、次の練習へ持っていく。その繰り返しに使ってください。</p>
        <a className="button button-light" href="/ja/my-homecourt/app/plus">月額3,300円で始める <ArrowRight size={17}/></a>
      </section>
    </main>
  </SiteFrame>;
}
