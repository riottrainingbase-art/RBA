import { ArrowRight, BookOpen, Compass, CreditCard, History, Sparkles } from "lucide-react";

export function HomecourtConversionSection(){
  return <section className="homecourt-product-preview section-pad">
    <div className="section-head">
      <div><p className="section-index">HOMECOURT / MONTHLY ¥3,300</p><h2>一回のクリニックを、<br/>一回で終わらせない。</h2></div>
      <p>月額HOMECOURTは「記事を読むための課金」ではありません。経験を残し、学び、次に試すことを決め、所属の外にも挑戦先を持つための継続的な育成ホームです。</p>
    </div>
    <div className="homecourt-preview-grid">
      <article><History/><span>01</span><h3>残す</h3><p>参加履歴、振り返り、気づき、次に試したいことをBasketball Passportへ。</p></article>
      <article><BookOpen/><span>02</span><h3>学ぶ</h3><p>PLAYER・PARENT・COACHそれぞれの立場から、今必要な育成テーマを選びます。</p></article>
      <article><Sparkles/><span>03</span><h3>試す</h3><p>読んで終わらず、次の練習・試合・家庭で実際に一つ試します。</p></article>
      <article><Compass/><span>04</span><h3>次を選ぶ</h3><p>年代・地域・目的から、次に参加できるクリニック、キャンプ、交流へつなげます。</p></article>
    </div>
    <div className="homecourt-plan-grid">
      <article className="homecourt-plan-card homecourt-plan-free">
        <div className="homecourt-plan-card-head"><span>RBA ID</span><strong>¥0</strong></div>
        <h3>まず無料で触ってみる。</h3>
        <p>活動を探す、公開JOURNALを読む、自分に合う入口を見つける。登録だけで料金は発生しません。</p>
        <a className="button button-light" href="/ja/my-homecourt/login">無料でRBA IDをつくる<ArrowRight size={16}/></a>
      </article>
      <article className="homecourt-plan-card homecourt-plan-paid">
        <div className="homecourt-plan-card-head"><span>MY HOME COURT</span><strong>¥3,300 / 月</strong></div>
        <h3>毎週、育成を前に進める。</h3>
        <p>学ぶ→試す→振り返る→次を決める。そのサイクルを、自分のバスケットボールに持ち込みます。</p>
        <a className="button button-member" href="/api/commerce/checkout/homecourt-monthly?locale=ja"><CreditCard size={16}/>月額HOMECOURTを始める<ArrowRight size={16}/></a>
      </article>
    </div>
    <p className="homecourt-editorial-note">今のチームを辞める必要はありません。所属を変えるためではなく、所属の外にも学びと挑戦の選択肢を持つためのサービスです。</p>
  </section>;
}
