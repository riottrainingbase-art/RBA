import { ArrowRight, BookOpen, Check, Compass, Globe2, History, House, LockKeyhole, ShieldCheck, Users } from "lucide-react";
import { SiteFrame } from "./site-frame";

export function JapaneseMyHomecourt(){
  return <SiteFrame locale="ja" languagePage="my-homecourt">
    <section className="my-homecourt-hero section-pad">
      <div className="my-homecourt-hero-copy">
        <p className="section-index inverse">MY HOME COURT</p>
        <h1>自分のバスケットボールを、<br/>所属の外までつなぐ。</h1>
        <p>活動を探す。参加する。経験を残す。学ぶ。そして次の機会へ。MY HOME COURTは、チームを辞めるための場所ではなく、今いる環境を大切にしながら選択肢を広げる自分専用の育成ホームです。</p>
        <div className="my-homecourt-hero-actions">
          <a className="button button-member" href="/ja/my-homecourt/login?source=my-homecourt"><House size={17}/>無料で始める<ArrowRight size={16}/></a>
          <a className="button button-light" href="/ja/homecourt-plus">HOMECOURT PLUSを見る<ArrowRight size={16}/></a>
        </div>
      </div>
      <div className="my-homecourt-hero-mark" aria-hidden="true"><span>MY</span><strong>HOME<br/>COURT</strong><small>DISCOVER / EXPERIENCE / TIMELINE / NEXT</small></div>
    </section>

    <section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">ONE SIMPLE LOOP</p><h2>4つだけ覚えれば使えます。</h2></div><p>機能名を覚える必要はありません。次の育成機会を見つけ、実際に参加し、自分の経験として残し、次へ進む。その循環が中心です。</p></div>
      <div className="homecourt-preview-grid">
        <article><Compass/><span>01 / DISCOVER</span><h3>探す</h3><p>全国・海外のチーム、クリニック、キャンプ、交流機会を条件から探します。</p><a className="text-link" href="/ja/homecourt/explore">HOMECOURTで探す<ArrowRight size={16}/></a></article>
        <article><Users/><span>02 / EXPERIENCE</span><h3>参加する</h3><p>対象、費用、日程、確認状況を見て、自分に合う活動へ進みます。</p><a className="text-link" href="/ja/opportunities">募集中の活動を見る<ArrowRight size={16}/></a></article>
        <article><History/><span>03 / TIMELINE</span><h3>経験を残す</h3><p>クリニック、キャンプ、チーム体験、海外交流などを、自分のDevelopment Timelineへ残します。</p><a className="text-link" href="/ja/my-homecourt/app/timeline">TIMELINEを見る<ArrowRight size={16}/></a></article>
        <article><Globe2/><span>04 / NEXT</span><h3>次へつなぐ</h3><p>年代、地域、目的、これまでの経験から、次に参加できる選択肢を見つけます。</p><a className="text-link" href="/ja/homecourt/match">国際MATCHを見る<ArrowRight size={16}/></a></article>
      </div>
    </section>

    <section className="hosting-roles section-pad">
      <div className="section-head"><div><p className="section-index inverse">PLAYER / PARENT / COACH</p><h2>立場に合う入口だけ使う。</h2></div></div>
      <div className="role-grid">
        <article><Users/><h3>PLAYER / 選手</h3><ul><li>参加できる活動を探す</li><li>経験と振り返りを残す</li><li>国内外の新しい環境を見る</li></ul><a className="text-link light-link" href="/ja/my-homecourt/players">選手向けを見る<ArrowRight size={16}/></a></article>
        <article><ShieldCheck/><h3>PARENT / 保護者</h3><ul><li>費用・安全・条件を確認する</li><li>子どもの経験を整理する</li><li>チーム選びの判断材料を増やす</li></ul><a className="text-link light-link" href="/ja/my-homecourt/families">保護者向けを見る<ArrowRight size={16}/></a></article>
        <article><BookOpen/><h3>COACH / 指導者</h3><ul><li>D-HUBで継続して学ぶ</li><li>TEAM HOMEで練習を設計する</li><li>TEAM DEVELOPMENTへつなぐ</li></ul><a className="text-link light-link" href="/ja/my-homecourt/coaches">指導者向けを見る<ArrowRight size={16}/></a></article>
      </div>
    </section>

    <section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">DEVELOPMENT TIMELINE</p><h2>プロフィールではなく、経験の積み重ね。</h2></div><p>上手さを公開点数にするのではなく、「どこで、誰と、何を経験したか」を自分の履歴として残します。主催者等が確認した記録は、自己入力と区別して表示します。</p></div>
      <div className="homecourt-preview-grid">
        <article><History/><span>SELF</span><h3>自分で記録</h3><p>過去の参加や学び、次に試したいことを自分で残せます。</p></article>
        <article><Check/><span>CONFIRMED</span><h3>参加確認</h3><p>RBAや主催者が参加事実を確認した経験は、確認のある記録として残せます。</p></article>
        <article><LockKeyhole/><span>PRIVATE BY DEFAULT</span><h3>非公開を基本に</h3><p>未成年者の詳細な活動履歴、写真・動画、個人情報を公開プロフィールとして扱いません。</p></article>
        <article><ArrowRight/><span>PORTABLE</span><h3>チームが変わっても残る</h3><p>所属先だけに依存せず、本人・家庭の育成履歴として継続できます。</p></article>
      </div>
    </section>

    <section className="asia-desk-home section-pad">
      <div><p className="section-index inverse">LOCAL → JAPAN → ASIA → WORLD</p><h2>世界を、特別な一回で終わらせない。</h2></div>
      <div><p>国内の育成機会だけでなく、台湾・韓国・マレーシアなどとの交流も同じHOMECOURT上で扱える構造へ広げています。確定済み、協議中、将来構想を区別し、参加できる状態になったものだけを機会として扱います。</p><div className="closing-actions"><a className="button button-light" href="/ja/international">国際交流を見る<ArrowRight size={16}/></a><a className="text-link light-link" href="/ja/homecourt/match">HOMECOURT MATCH<ArrowRight size={16}/></a></div></div>
    </section>

    <section className="homecourt-plan-separation section-pad">
      <div className="homecourt-plan-intro"><p className="section-index">FREE / PLUS</p><h2>基本機能は無料。継続的に整理したい人だけPLUSへ。</h2><p>無料版を意図的に弱くしません。探す、公開情報を読む、経験を記録するところまでは無料アカウントで使えます。</p></div>
      <div className="homecourt-plan-grid">
        <article className="homecourt-plan-card homecourt-plan-free"><div className="homecourt-plan-card-head"><span>FREE</span><strong>¥0</strong></div><h3>知る・探す・記録する</h3><ul><li><Check size={17}/>育成機会を探す</li><li><Check size={17}/>JOURNALを読む</li><li><Check size={17}/>Development Timelineを残す</li><li><Check size={17}/>気になる活動を保存する</li></ul><a className="button button-light" href="/ja/my-homecourt/login?source=free">無料で始める<ArrowRight size={16}/></a></article>
        <article className="homecourt-plan-card homecourt-plan-paid"><div className="homecourt-plan-card-head"><span>HOMECOURT PLUS</span><strong>¥3,300</strong><small>月額・税込</small></div><h3>整理する・実践する・振り返る</h3><ul><li><Check size={17}/>WEEKLY DEVELOPMENT</li><li><Check size={17}/>SMART PREP</li><li><Check size={17}/>CONDITION TREND</li><li><Check size={17}/>MONTHLY REVIEW</li></ul><a className="button button-member" href="/ja/homecourt-plus">PLUSの内容を見る<ArrowRight size={16}/></a></article>
      </div>
    </section>

    <section className="homecourt-safety section-pad">
      <ShieldCheck size={38}/><div><h2>安全とデータの主導権を、最初から。</h2><p>未成年者と成人が無制限に直接つながる設計にはしません。写真・動画同意、保護者権限、公開範囲、参加記録を分けて扱い、必要以上の個人情報を集めません。</p><a className="text-link" href="/ja/policies">安全・参加規約を確認<ArrowRight size={16}/></a></div>
    </section>

    <section className="closing-cta section-pad">
      <p className="eyebrow">START</p><h2>まずは、次の機会を一つ見つける。</h2><p>細かい設定から始める必要はありません。探す、保存する、参加した経験を残す。その3つから使えます。</p>
      <div className="closing-actions"><a className="button button-orange" href="/ja/my-homecourt/login?source=start">無料で始める<ArrowRight size={17}/></a><a className="button button-dark" href="/ja/homecourt/explore">育成環境を探す<ArrowRight size={17}/></a></div>
    </section>
  </SiteFrame>;
}
