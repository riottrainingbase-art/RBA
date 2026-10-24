import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, ClipboardList, MessageSquare, Search, ShieldCheck, Users, Video, Repeat2 } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import { VisitTrainingObservation } from "@/components/visit-training-observation";

export const metadata: Metadata = {
  title: "RBA TEAM TAKEOVER / VISIT TRAINING｜チーム練習をRBAが担当",
  description: "RBAが普段の体育館へ伺い、90〜120分のチーム練習を丸ごと担当。練習設計、オンコート指導、ゲーム観察、指導者フィードバックまで行うTEAM TAKEOVER / VISIT TRAININGです。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/team-visit-clinic" },
  openGraph: {
    title: "RBA VISIT TRAINING｜普段の練習に、RBAが行きます。",
    description: "単発の技術指導ではなく、チームの普段の環境を見ながら、必要な育成テーマを一緒に整理して実施します。",
    url: "https://riotbasketballacademy.com/ja/team-visit-clinic",
    siteName: "Riot Basketball Academy",
    locale: "ja_JP",
    type: "website",
    images: ["/rba-court-hero.png"],
  },
};

const themes = [
  ["SEE / DECIDE", "相手・味方・スペースを見て、プレー前から判断する習慣を育てます。"],
  ["1on1 / ADVANTAGE", "抜くことだけでなく、優位性をつくり、使い、次のプレーへつなげます。"],
  ["SPACING / OFF-BALL", "ボールを持っていない時間の立ち位置、角度、カット、リロケートを整理します。"],
  ["FINISHING / SHOOTING", "ゲーム状況から、どのフィニッシュやシュートを選ぶかまで扱います。"],
  ["DEFENCE / TRANSITION", "1on1、クローズアウト、ヘルプ、切り替えを判断とセットで学びます。"],
  ["SMALL-SIDED GAMES", "2on2・3on3・4on4を使い、技術と判断をゲームの中で結びます。"],
] as const;

const formats = [
  {
    tag:"TEAM CLINIC",
    title:"選手向けクリニック",
    body:"普段の練習に伺い、事前に共有いただいた課題に合わせて90〜120分を目安にプログラムを組みます。",
    items:["対象年代・人数に合わせた内容設計","オンコート指導","終了後の簡単な振り返り"],
  },
  {
    tag:"TEAM DEVELOPMENT",
    title:"チーム育成サポート",
    body:"選手への指導に加えて、練習の見え方や課題を指導者と共有します。『何を教えるか』だけでなく、『どう練習を設計するか』まで整理します。",
    items:["選手向けクリニック","指導者フィードバック","練習設計・次の課題整理"],
  },
  {
    tag:"CONTINUOUS SUPPORT",
    title:"継続訪問",
    body:"一度のクリニックで終わらず、同じテーマを継続して確認したいチーム向けです。実施間隔や内容はチーム状況に合わせて相談します。",
    items:["定期的なオンコート指導","前回からの変化確認","継続テーマの更新"],
  },
] as const;

export default function Page(){
  return <SiteFrame locale="ja">
    <section className="inner-hero section-pad">
      <a className="back-link" href="/ja">← RBA</a>
      <p className="section-index">RBA TEAM TAKEOVER / VISIT TRAINING</p>
      <h1>いつもの練習を、<br/>一度RBAに任せてください。</h1>
      <p>TEAM TAKEOVERは、単発の「技術クリニック」ではありません。RBAが普段の体育館へ伺い、90〜120分の通常練習を一度丸ごと担当します。事前にチームの課題を確認し、当日の選手の反応を見ながら内容を調整。終了後は、希望に応じて指導者へ次の練習につながるフィードバックまで行います。</p>
      <div className="closing-actions">
        <a className="button button-orange" href="/ja/clinic-request#request-form">まず無料で開催相談する<ArrowRight size={17}/></a>
        <a className="button button-dark" href="#programme">内容を見る<ArrowRight size={17}/></a>
      </div>
    </section>

    <section className="statement section-pad">
      <p className="section-index">WHY VISIT TRAINING</p>
      <div>
        <h2>単発の技術指導ではなく、<br/>普段の環境から考える。</h2>
        <p>同じ年代でも、必要な課題はチームごとに違います。ボールを持つ技術より先にスペーシングが必要なチームもあれば、1on1の判断やオフボールの動きを整理した方がよいチームもあります。事前に状況を聞き、必要に応じて普段の練習も見ながら内容を決めます。</p>
      </div>
    </section>

    <VisitTrainingObservation/>

    <section className="homecourt-product-preview section-pad" id="programme">
      <div className="section-head">
        <div><p className="section-index">WHAT WE CAN WORK ON</p><h2>チームの課題に合わせて、テーマを組みます。</h2></div>
        <p>すべてを一度に詰め込むのではなく、対象年代と現在地に合わせて優先順位を決めます。</p>
      </div>
      <div className="homecourt-preview-grid">
        {themes.map(([title,body],i)=><article key={title}><span>{String(i+1).padStart(2,"0")}</span><h3>{title}</h3><p>{body}</p></article>)}
      </div>
    </section>

    <section className="access-promise section-pad">
      <p className="section-index">NOT A ONE-SIZE-FITS-ALL CLINIC</p>
      <div>
        <h2>「このメニューをやります」から始めません。</h2>
        <p>最初に、対象年代、普段の練習、試合で困っていること、指導者が感じている課題を確認します。そのうえで、当日の内容と目的を共有してから実施します。</p>
      </div>
    </section>

    <section className="access-grid section-pad">
      <article><Search/><span>01</span><h2>事前ヒアリング</h2><p>年代、人数、活動状況、現在の課題、希望テーマを確認します。</p></article>
      <article><ClipboardList/><span>02</span><h2>内容を設計</h2><p>扱うテーマ、練習の流れ、ゲーム形式、振り返りまで事前に整理します。</p></article>
      <article><Users/><span>03</span><h2>チームの体育館で実施</h2><p>普段の環境を生かしながら、選手が自分で見て判断する時間を増やします。</p></article>
      <article><MessageSquare/><span>04</span><h2>実施後に共有</h2><p>必要に応じて、指導者へ見えた課題や今後の練習テーマをフィードバックします。</p></article>
    </section>

    <section className="homecourt-product-preview section-pad">
      <div className="section-head">
        <div><p className="section-index">PROGRAMME OPTIONS</p><h2>必要な範囲に合わせて選べます。</h2></div>
        <p>固定の商品を押し込むのではなく、チームの目的に合わせて実施範囲を調整します。</p>
      </div>
      <div className="homecourt-preview-grid">
        {formats.map((item)=><article key={item.tag}>
          <span>{item.tag}</span>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
          <ul>{item.items.map(x=><li key={x}>{x}</li>)}</ul>
        </article>)}
      </div>
    </section>

    <section className="hosting-roles section-pad">
      <div className="section-head"><div><p className="section-index inverse">FOR COACHES</p><h2>選手だけでなく、チームの学びにつなげます。</h2></div></div>
      <div className="role-grid">
        <article><Users aria-hidden="true"/><h3>選手へ</h3><ul><li>技術をゲームで使う</li><li>見る・判断する習慣をつくる</li><li>役割やポジションに固定されない経験を増やす</li></ul></article>
        <article><Repeat2 aria-hidden="true"/><h3>指導者へ</h3><ul><li>練習で何を見るかを共有する</li><li>問いかけや制約条件の使い方を整理する</li><li>次の練習へ持ち帰れるテーマを残す</li></ul></article>
      </div>
    </section>

    <section className="statement section-pad">
      <p className="section-index">OUR POSITION</p>
      <div>
        <h2>チームから選手を集めるための活動ではありません。</h2>
        <p>RBA VISIT TRAININGは、所属変更や選手勧誘を目的としたものではありません。今いるチームの活動を大切にしながら、普段とは違う視点を一つ加え、選手と指導者の学びをチームへ持ち帰るためのプログラムです。</p>
      </div>
    </section>

    <section className="hosting-ready section-pad">
      <div><p className="section-index">BEFORE YOU CONTACT US</p><h2>まずは、この5つだけ教えてください。</h2></div>
      <ul>
        {["チーム名・開催地域","対象年代とおおよその人数","希望日または時期","今、チームで感じている課題","選手に持ち帰ってほしいこと"].map((item,i)=><li key={item}><span>{String(i+1).padStart(2,"0")}</span><strong>{item}</strong><CheckCircle2/></li>)}
      </ul>
    </section>

    <section className="hosting-price section-pad">
      <div className="hosting-price-head">
        <p className="section-index inverse">TEAM TAKEOVER / FREE ENQUIRY FIRST</p>
        <h2>料金も日程も、まず相談してから決めます。</h2>
        <p>
          チーム訪問の料金は、開催地域、指導時間、コーチ数、交通・宿泊、施設の利用条件から個別にお見積りします。
          最初から決済する必要はありません。開催条件と総額を事前に書面で確認し、双方が合意してから進めます。
        </p>
        <div className="free-estimate"><span>開催相談・初回見積</span><strong>¥0</strong></div>
      </div>
      <div className="price-formula">
        <div className="price-total"><ShieldCheck/><span>ご相談 → 見積・条件合意 → 必要な決済</span></div>
        <div className="price-item"><span className="price-plus">1</span><ClipboardList/><div><strong>成人の主催者から開催相談</strong><p>開催地域・対象年代・人数・希望日・現在のチーム課題を伺います。</p></div></div>
        <div className="price-item"><span className="price-plus">2</span><MessageSquare/><div><strong>内容と正式見積をご案内</strong><p>指導内容、交通・宿泊、施設費、集金主体、キャンセル・返金条件まで書面で整理します。</p></div></div>
        <div className="price-item"><span className="price-plus">3</span><Users/><div><strong>条件に合意して開催を確定</strong><p>主催責任者・会場・日程・必要な支払いを確認してから募集・実施します。</p></div></div>
        <p className="price-note">予約金などが必要な案件では、開催条件を書面で確定した後に個別の決済案内を行います。公開ページの送信だけでは予約や支払いは発生しません。</p>
        <div className="closing-actions">
          <a className="button button-orange" href="/ja/clinic-request#request-form">無料でチーム訪問を相談する<ArrowRight size={17}/></a>
          <a className="button button-dark" href="/ja/national-clinic-tour">全国の開催モデルを見る<ArrowRight size={17}/></a>
        </div>
      </div>
    </section>

    <section className="closing-cta section-pad">
      <p className="eyebrow">RBA TEAM TAKEOVER / VISIT TRAINING</p>
      <h2>クリニックではなく、<br/>チームの“いつもの練習”を変える。</h2>
      <p>一度の派手なイベントではなく、普段の練習で何を見るか、どう判断させるか、どんなゲームを使うかまで一緒に扱います。まず開催地域とチームの課題を伺い、内容と費用を整理します。初回開催が合えば、3か月後の再訪問や継続シリーズもご相談できます。</p>
      <div className="closing-actions">
        <a className="button button-orange" href="/ja/clinic-request">訪問トレーニングを相談する<ArrowRight size={17}/></a>
        <a className="button button-dark" href="mailto:riot.training.base@gmail.com?subject=RBA%20TEAM%20VISIT%20CLINIC%E7%9B%B8%E8%AB%87">メールで相談する<ArrowRight size={17}/></a>
      </div>
    </section>
  </SiteFrame>;
}
