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
        <a className="button button-orange" href="https://book.stripe.com/fZu14p2XZ7ru2QtdwH7EQ0x">TEAM TAKEOVERを予約する<ArrowRight size={17}/></a>
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
        <p className="section-index inverse">TEAM TAKEOVER / RESERVATION</p>
        <h2>まずは予約金33,000円で、開催調整をスタートできます。</h2>
        <p>予約金は最終料金の一部に充当します。90〜120分のチーム練習、事前ヒアリング、当日のオンコート指導、希望に応じた指導者フィードバックを基本に、開催地域・交通費・宿泊の有無・追加サポートを確認して残額をご案内します。</p>
        <div className="free-estimate"><span>TEAM TAKEOVER 予約金</span><strong>¥33,000（税込）</strong></div>
      </div>
      <div className="price-formula">
        <div className="price-total"><ShieldCheck/><span>決済後に専用フォームへ移動</span></div>
        <div className="price-item"><span className="price-plus">1</span><Users/><div><strong>予約金を決済</strong><p>Stripeで33,000円をお支払いください。</p></div></div>
        <div className="price-item"><span className="price-plus">2</span><ClipboardList/><div><strong>チーム情報を送信</strong><p>決済後の専用フォームで、希望日・地域・年代・現在の課題を共有してください。</p></div></div>
        <div className="price-item"><span className="price-plus">3</span><MessageSquare/><div><strong>日程・内容・残額を確定</strong><p>RBAで確認後、実施内容と費用を整理してご連絡します。</p></div></div>
        <p className="price-note">交通費・宿泊費等が必要な場合は別途見積となります。日程はフォーム送信後に確定します。通常の開催相談・見積りから始めたい場合は、従来どおり相談フォームも利用できます。</p>
        <div className="closing-actions">
          <a className="button button-orange" href="https://book.stripe.com/fZu14p2XZ7ru2QtdwH7EQ0x">予約金33,000円で申し込む<ArrowRight size={17}/></a>
          <a className="button button-dark" href="/ja/clinic-request">まず相談する<ArrowRight size={17}/></a>
        </div>
      </div>
    </section>

    <section className="closing-cta section-pad">
      <p className="eyebrow">RBA TEAM TAKEOVER / VISIT TRAINING</p>
      <h2>クリニックではなく、<br/>チームの“いつもの練習”を変える。</h2>
      <p>一度の派手なイベントではなく、普段の練習で何を見るか、どう判断させるか、どんなゲームを使うかまで一緒に扱います。すぐ日程調整へ進みたい場合は予約金から、まず話を聞きたい場合は相談から選べます。</p>
      <div className="closing-actions">
        <a className="button button-orange" href="/ja/clinic-request">訪問トレーニングを相談する<ArrowRight size={17}/></a>
        <a className="button button-dark" href="mailto:riot.training.base@gmail.com?subject=RBA%20TEAM%20VISIT%20CLINIC%E7%9B%B8%E8%AB%87">メールで相談する<ArrowRight size={17}/></a>
      </div>
    </section>
  </SiteFrame>;
}
