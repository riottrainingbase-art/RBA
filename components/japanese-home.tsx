import { ArrowRight, ArrowUpRight, CalendarDays, ClipboardList, Globe2, House, MapPin, Users } from "lucide-react";
import { SiteFrame } from "./site-frame";
import { openProgrammes } from "./programme-data";
import { tr } from "./network-data";

export function JapaneseHome(){
  const upcoming=openProgrammes().slice(0,4);
  return <SiteFrame locale="ja">
    <section className="hero-grid">
      <div className="hero-copy">
        <p className="eyebrow">RIOT BASKETBALL ACADEMY · JAPAN</p>
        <h1><span>子どもの未来から、</span><span>育成を考える。</span></h1>
        <p className="hero-lede">所属や地域だけで、育成の選択肢を決めなくていい。RBAは、選手・保護者・指導者・チームを、国内外の育成機会と継続的な学びへつなぐバスケットボール・プラットフォームです。</p>
        <div className="hero-actions">
          <a className="button button-light" href="/ja/homecourt/explore">育成環境を探す<ArrowRight size={17}/></a>
          <a className="button button-member" href="/ja/my-homecourt"><House size={17}/>MY HOME COURT<ArrowRight size={17}/></a>
          <a className="text-link light-link" href="/ja/team-development">チームでRBAを使う<ArrowRight size={16}/></a>
        </div>
        <div className="hero-proof">
          <div><strong>3,000+</strong><span>2025年半ば〜2026年9月の延べ参加者</span></div>
          <div><strong>25</strong><span>国内の活動地域</span></div>
          <div><strong>JP × ASIA</strong><span>国内外の育成交流へ</span></div>
        </div>
      </div>
      <div className="hero-image" role="img" aria-label="RBAの育成年代バスケットボール活動"><div className="image-note">探す。参加する。経験が残る。次へつながる。</div></div>
    </section>

    <section className="paid-programmes section-pad" aria-labelledby="jp-upcoming-title">
      <div className="section-head"><div><p className="section-index">NEXT OPPORTUNITIES</p><h2 id="jp-upcoming-title">今、参加できる育成機会。</h2></div><p>直近の募集だけを表示しています。年代・地域・目的から探す場合はHOMECOURTへ。</p></div>
      <div className="paid-programme-grid">{upcoming.map(programme=><article key={programme.id}>
        <time>{tr(programme.date,"ja")}</time><h3>{tr(programme.title,"ja")}</h3>
        <p className="programme-place"><MapPin size={16}/>{tr(programme.place,"ja")}</p>
        <p className="programme-audience"><strong>対象</strong>{tr(programme.audience,"ja")}</p>
        <p className="programme-price">{tr(programme.price,"ja")}</p>
        <a className="programme-link" href={programme.detailPath?"/ja/"+programme.detailPath:programme.applicationUrl} target={programme.detailPath?undefined:"_blank"} rel={programme.detailPath?undefined:"noreferrer"}>詳細・申込<ArrowRight size={16}/></a>
      </article>)}</div>
      <div className="programme-links"><a className="button button-orange" href="/ja/opportunities">RBAの募集中活動を見る<ArrowRight size={17}/></a><a className="text-link" href="/ja/homecourt/explore">HOMECOURTで広く探す<ArrowRight size={16}/></a></div>
    </section>

    <section className="homecourt-home-feature section-pad">
      <div className="homecourt-home-mark"><span>HOME</span><strong>COURT</strong></div>
      <div className="homecourt-home-copy"><p className="section-index">HOMECOURT / DEVELOPMENT NETWORK</p><h2>検索サイトではなく、育成の流れをつなぐ。</h2>
        <p>チームや活動を探すだけで終わらず、実際に参加した経験をMY HOME COURTへ残し、次に参加できる機会へつなげます。JBA加盟・競技者登録・公式大会の手続きを代替するものではありません。</p>
        <div className="homecourt-home-roles"><span><Users size={15}/>EXPLORE</span><span><CalendarDays size={15}/>EXPERIENCE</span><span><ClipboardList size={15}/>TIMELINE</span><span><Globe2 size={15}/>MATCH</span></div>
        <div className="homecourt-home-actions"><a className="button button-dark" href="/ja/homecourt/explore">育成環境を探す<ArrowRight size={17}/></a><a className="text-link" href="/ja/my-homecourt">自分のHOMEを開く<ArrowRight size={16}/></a><a className="text-link" href="/ja/homecourt/match">国際MATCHを見る<ArrowRight size={16}/></a></div>
      </div>
    </section>

    <section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">FOR TEAMS</p><h2>チームクリニックを、90日の育成へ。</h2></div><p>RBAが来て終わりではなく、事前把握、現場観察、REPORT、12週間の実践、D30・D60・D90の確認までTEAM HOMEにつなげます。</p></div>
      <div className="homecourt-preview-grid">
        <article><span>01 / TEAM CLINIC</span><h3>現場を見る</h3><p>普段の体育館で、何を見ているか、誰が判断しているか、練習が試合につながっているかを観察します。</p><a className="text-link" href="/ja/team-visit-clinic">VISIT TRAINING<ArrowRight size={16}/></a></article>
        <article><span>02 / REPORT</span><h3>チームの現象を言葉にする</h3><p>選手個人を点数化せず、チームの強み、優先課題、次に見るポイントをRBA TEAM DEVELOPMENT REPORTとして残します。</p></article>
        <article><span>03 / 90 DAYS</span><h3>12週間で定着を見る</h3><p>D1–30 FOUNDATION、D31–60 TRANSFER、D61–90 AUTONOMYの3フェーズで実践します。</p><a className="text-link" href="/ja/team-development">TEAM DEVELOPMENT<ArrowRight size={16}/></a></article>
        <article><span>04 / PARTNER</span><h3>継続的につなぐ</h3><p>再訪問、D-HUB、国内外の交流まで、チームの育成履歴として積み上げます。</p><a className="text-link" href="/ja/my-homecourt/app/team-development">TEAM HOMEで使う<ArrowRight size={16}/></a></article>
      </div>
    </section>

    <section className="hosting-roles section-pad">
      <div className="section-head"><div><p className="section-index inverse">COACH DEVELOPMENT</p><h2>指導者の学びを、現場へ戻す。</h2></div></div>
      <div className="role-grid">
        <article><ClipboardList/><h3>D-HUB</h3><ul><li>年間48回の継続学習</li><li>練習設計・観察・問い</li><li>現場で試して振り返る</li></ul><a className="text-link light-link" href="/ja/d-hub">D-HUBを見る<ArrowRight size={16}/></a></article>
        <article><Globe2/><h3>WORLD LEARNING</h3><ul><li>Torsten Loibl Online Clinic</li><li>海外指導者との対話</li><li>JOURNALの一次資料・研究</li></ul><a className="text-link light-link" href="/ja/journal/coaches">指導者向けJOURNAL<ArrowRight size={16}/></a></article>
      </div>
    </section>

    <section className="asia-desk-home section-pad">
      <div><p className="section-index inverse">JAPAN × ASIA</p><h2>海外交流を、<br/>偶然だけにしない。</h2></div>
      <div><p>台湾、韓国、マレーシアなど、実際の育成年代チーム・アカデミーとの関係を、交流試合、共同練習、キャンプ、指導者交流へつなげます。実施済み・協議中・将来構想は分けて表示します。</p><div className="desk-languages"><span>日本語</span><span>ENGLISH</span><span>繁體中文</span><span>한국어</span></div><div className="closing-actions"><a className="button button-light" href="/ja/international">国際交流を見る<ArrowRight size={17}/></a><a className="text-link light-link" href="/ja/homecourt/match">HOMECOURT MATCH<ArrowRight size={16}/></a></div></div>
    </section>

    <section className="field-footprint section-pad">
      <div><p className="section-index inverse">TRUST / FIELD</p><h2>現場と、確認できる事実から。</h2><p>RBAは、開催実績、現在募集中の活動、協議中の国際連携、将来構想を混同しません。未成年者の安全、写真・映像同意、価格・キャンセル条件、個人情報の最小化を公開運用の前提にしています。</p><a className="text-link light-link" href="/ja/policies">安全・参加規約を見る<ArrowRight size={16}/></a></div>
      <div className="footprint-numbers"><div><strong>FIELD</strong><span>実際のクリニック・キャンプ・チーム支援</span></div><div><strong>TRUST</strong><span>確認状況と情報源を区別</span></div><div><strong>NEXT</strong><span>経験を次の育成機会へ</span></div></div>
    </section>

    <section className="closing-cta section-pad"><p className="eyebrow">START HERE</p><h2>今いる場所から、<br/>次の一歩をつくる。</h2><p>個人で探す。チームでRBAを呼ぶ。指導者として学ぶ。海外とつながる。必要な入口だけを選べます。</p><div className="closing-actions"><a className="button button-orange" href="/ja/homecourt/explore">育成機会を探す<ArrowRight size={17}/></a><a className="button button-dark" href="/ja/team-development">チーム向けを見る<ArrowRight size={17}/></a><a className="text-link" href="/ja/contact">RBAに相談する<ArrowUpRight size={16}/></a></div></section>
  </SiteFrame>;
}
