import { ArrowRight, BookOpen, Compass, CreditCard, History, Sparkles } from "lucide-react";

export function HomecourtConversionSection(){
  return <section className="homecourt-product-preview section-pad">
    <div className="section-head">
      <div><p className="section-index">HOMECOURT PLUS / MONTHLY ¥3,300</p><h2>一度のクリニックを、<br/>参加して終わりにしない。</h2></div>
      <p>MY HOME COURTは無料で使える会員ページです。HOMECOURT PLUSでは、会員向けガイド、週ごとのテーマ、月ごとの振り返りなどを追加で使えます。</p>
    </div>
    <div className="homecourt-preview-grid">
      <article><History/><span>01</span><h3>記録する</h3><p>参加履歴や振り返り、気づき、次に試したいことをBasketball Passportに残します。</p></article>
      <article><BookOpen/><span>02</span><h3>学ぶ</h3><p>PLAYER・PARENT・COACHそれぞれの立場から、今読みたいテーマを選びます。</p></article>
      <article><Sparkles/><span>03</span><h3>試す</h3><p>読んで終わらせず、次の練習や試合、家庭での関わりの中で一つ試します。</p></article>
      <article><Compass/><span>04</span><h3>次を選ぶ</h3><p>年代・地域・目的から、参加できるクリニック、キャンプ、交流を探します。</p></article>
    </div>
    <div className="homecourt-plan-grid">
      <article className="homecourt-plan-card homecourt-plan-free">
        <div className="homecourt-plan-card-head"><span>RBA ID</span><strong>¥0</strong></div>
        <h3>まずはRBA IDから始める。</h3>
        <p>活動を探す、JOURNALを読む、自分に合う入口を見つける。RBA IDの登録だけで料金が発生することはありません。</p>
        <a className="button button-light" href="/ja/my-homecourt/login">RBA IDをつくる<ArrowRight size={16}/></a>
      </article>
      <article className="homecourt-plan-card homecourt-plan-paid">
        <div className="homecourt-plan-card-head"><span>HOMECOURT PLUS</span><strong>¥3,300 / 月</strong></div>
        <h3>読んだことを、毎週の練習や振り返りに使う。</h3>
        <p>RBA DEVELOPMENT LIBRARYから一つ読み、WEEKLY DEVELOPMENTで試すことを決め、MONTHLY REVIEWで振り返ります。</p>
        <a className="button button-member" href="/ja/homecourt-plus"><CreditCard size={16}/>HOMECOURT PLUSを見る<ArrowRight size={16}/></a>
      </article>
    </div>
    <p className="homecourt-editorial-note">今のチームを辞める必要はありません。所属先を変えるためではなく、今いる環境を大切にしながら、チーム外の記事や活動も利用できるサービスです。</p>
  </section>;
}
