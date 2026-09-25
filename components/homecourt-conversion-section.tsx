/* eslint-disable @next/next/no-html-link-for-pages -- checkout is a server redirect endpoint and must never be prefetched. */
import { ArrowRight, BookOpen, Compass, CreditCard, History, Sparkles } from "lucide-react";

export function HomecourtConversionSection(){
  return <section className="homecourt-product-preview section-pad">
    <div className="section-head">
      <div><p className="section-index">HOMECOURT / MONTHLY ¥3,300</p><h2>一度のクリニックを、<br/>次の成長につなげる。</h2></div>
      <p>HOMECOURTは、記事を読むだけのサービスではありません。経験を記録し、学び、次に試すことを決め、日々の練習や新しい挑戦につなげるための育成環境です。</p>
    </div>
    <div className="homecourt-preview-grid">
      <article><History/><span>01</span><h3>記録する</h3><p>参加履歴や振り返り、気づき、次に試したいことをBasketball Passportに残します。</p></article>
      <article><BookOpen/><span>02</span><h3>学ぶ</h3><p>PLAYER・PARENT・COACHそれぞれの立場から、今必要な育成テーマを選びます。</p></article>
      <article><Sparkles/><span>03</span><h3>試す</h3><p>読んで終わらせず、次の練習や試合、家庭での関わりの中で一つ試します。</p></article>
      <article><Compass/><span>04</span><h3>次を選ぶ</h3><p>年代・地域・目的から、次に参加できるクリニック、キャンプ、交流へつなげます。</p></article>
    </div>
    <div className="homecourt-plan-grid">
      <article className="homecourt-plan-card homecourt-plan-free">
        <div className="homecourt-plan-card-head"><span>RBA ID</span><strong>¥0</strong></div>
        <h3>まずはRBA IDから始める。</h3>
        <p>活動を探す、JOURNALを読む、自分に合う入口を見つける。RBA IDの登録だけで料金が発生することはありません。</p>
        <a className="button button-light" href="/ja/my-homecourt/login">RBA IDをつくる<ArrowRight size={16}/></a>
      </article>
      <article className="homecourt-plan-card homecourt-plan-paid">
        <div className="homecourt-plan-card-head"><span>MY HOME COURT</span><strong>¥3,300 / 月</strong></div>
        <h3>学びを、日々の成長につなげる。</h3>
        <p>学ぶ、試す、振り返る、次を決める。その流れを日々のバスケットボールに取り入れます。</p>
        <a className="button button-member" href="/api/commerce/checkout/homecourt-monthly?locale=ja"><CreditCard size={16}/>月額HOMECOURTを始める<ArrowRight size={16}/></a>
      </article>
    </div>
    <p className="homecourt-editorial-note">今のチームを辞める必要はありません。所属先を変えるためではなく、今いる環境を大切にしながら、外にも学びや挑戦の選択肢を持つためのサービスです。</p>
  </section>;
}
