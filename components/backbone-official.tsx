import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import "./backbone-street.css";

const application="https://form.jotform.com/262818373047058";
const principles=[
 ["01","試合で試す","クリニックで学んだことを、その日の3x3で使ってみます。"],
 ["02","自分で判断する","ボールを持つ前に見て、味方や相手の動きに合わせて選びます。"],
 ["03","一人ひとりに経験を","経験や技術の違いに配慮し、プレーする機会を大切にします。"]
];
const hostRequirements=[
 ["会場と安全","体育館の利用許可、コートの安全、準備時間と代替案を確認します。"],
 ["現地スタッフ","責任者、受付、審判、試合進行、緊急時の担当を決めます。"],
 ["保護者への案内","参加同意、保険、けがへの対応、写真・動画の使用を確認します。"],
 ["開催要項","対象年代、定員、参加費、競技ルール、キャンセル条件を明記します。"],
 ["費用と役割分担","会場費、運営費、担当業務、精算方法を事前に書面で確認します。"]
];

export function BackboneOfficial(){
 return <SiteFrame locale="ja">
  <div className="bb-street">
   <div className="bb-wrap"><div className="bb-topline"><span>RBA PRESENTS / BACKBONE 3×3</span><strong>THE GAME IS THE CLASSROOM.</strong></div></div>
   <section className="bb-hero" aria-labelledby="bb-title">
    <div className="bb-wrap">
     <p className="bb-eyebrow">STREET CULTURE. REAL DEVELOPMENT. / EST. IN JAPAN</p>
     <h1 className="bb-title" id="bb-title">BACK<span>BONE.</span></h1>
     <p className="bb-eyebrow">BASKETBALL / CLINIC / 3×3 / COMMUNITY</p>
     <h2>練習したことを、<br/>試合で試そう。</h2>
     <p className="bb-lead">BACKBONEは、RBAが地域のチームや指導者と一緒に開催する育成プログラム。クリニックで学び、3x3で試し、次の練習につなげます。所属チームを変える必要はありません。</p>
     <div className="bb-actions"><Link className="bb-action" href="/backbone/chiba">次の開催を見る ↗</Link><a className="bb-action bb-action--outline" href="#host">地域で開催する ↘</a></div>
    </div>
   </section>
   <div className="bb-ticker"><div className="bb-wrap"><span>PLAY THE GAME.</span><span>READ THE FLOOR.</span><span>GIVE EVERYONE A CHANCE.</span></div></div>
   <section className="bb-section" id="about"><div className="bb-wrap">
    <p className="bb-eyebrow">01 / THE PHILOSOPHY</p><h2>ただ集まって、<br/>試合をするだけじゃない。</h2>
    <p className="bb-section-intro">勝ち負けだけで終わらせず、見て、判断して、挑戦する。BACKBONEは、プレーの中から学べる機会を増やします。</p>
    <div className="bb-principles">{principles.map(([n,title,body])=><article key={n}><span className="bb-num">{n}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
    <p className="bb-small" style={{marginTop:22}}>対象年代や試合の進め方は、会場の人数・経験・安全面に応じて調整します。</p>
   </div></section>
   <section className="bb-section bb-paper" id="programme"><div className="bb-wrap">
    <p className="bb-eyebrow">02 / THE FORMAT</p><h2>LEARN IT.<br/>PLAY IT.</h2>
    <p className="bb-section-intro">クリニックと3x3を一日で。覚えたことを、すぐコートで試します。</p>
    <div className="bb-steps">
     <article className="bb-step"><b>01 / LEARN</b><h3>クリニック</h3><p>基本技術、スペーシング、相手を見て判断する練習などを、参加者の年代に合わせて行います。</p></article>
     <article className="bb-step"><b>02 / PLAY</b><h3>3x3ゲーム</h3><p>学んだことを実際のプレーで試します。チーム編成、試合時間、ルールは各開催要項をご確認ください。</p></article>
    </div>
   </div></section>
   <section className="bb-section" id="chapters"><div className="bb-wrap">
    <p className="bb-eyebrow">03 / NEXT CHAPTER</p><h2>YOUR CITY.<br/>YOUR COURT.</h2>
    <p className="bb-section-intro">全国の地域と一緒に、子どもたちがプレーできる場をつくります。次の開催予定はこちら。</p>
    <div className="bb-chapter">
     <article className="bb-chapter-main"><p className="bb-eyebrow">CHAPTER / ROUND 3</p><h3 className="bb-chapter-name">CHIBA.</h3><p>2026.10.25 SUN / 千葉県神崎町</p><div className="bb-chapter-meta"><span>09:00—16:00</span><span>小1〜中3</span><span>¥6,600 / 1名・税込</span></div><p className="bb-small">午前：育成クリニック／午後：3x3ゲーム。個人参加歓迎。対象は小学1年生〜中学3年生です。</p></article>
     <aside className="bb-chapter-side"><div><p className="bb-eyebrow" style={{color:"#32251a"}}>NEXT UP / 2026</p><strong>OCT<br/>25.</strong><p>開催要項で会場・参加条件・募集状況をご確認ください。</p></div><Link className="bb-action" href="/backbone/chiba">CHIBA 詳細・申込 ↗</Link></aside>
    </div>
    <p className="bb-small" style={{marginTop:20}}>ほかの地域の開催予定は <Link href="/ja/opportunities" style={{textDecoration:"underline",textUnderlineOffset:4}}>RBAの活動一覧</Link> をご覧ください。参加費は開催ごとに異なります。</p>
   </div></section>
   <section className="bb-section" id="host"><div className="bb-wrap">
    <p className="bb-eyebrow">04 / BUILD A CHAPTER</p><h2>次は、あなたの街で。</h2>
    <p className="bb-section-intro">体育館や地域の運営を担う方と、BACKBONEの開催を相談しています。まずは開催したい地域や時期を教えてください。</p>
    <div className="bb-organizer-list">{hostRequirements.map(([title,body])=><article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
    <div className="bb-host-cta"><p>開催条件、役割分担、必要な費用は個別に確認します。フォームの送信だけで開催や契約が確定することはありません。</p><a className="bb-action" href={application} target="_blank" rel="noopener noreferrer">開催について問い合わせる ↗</a><p className="bb-small">※地域の主催・共催を希望する方向けです。選手の参加申込ではありません。</p></div>
   </div></section>
   <section className="bb-section bb-social"><div className="bb-wrap">
    <p className="bb-eyebrow">ON THE COURT / BACKBONE</p><h2>THE NEXT PLAY<br/>STARTS HERE.</h2>
    <p className="bb-section-intro">各地域の活動はBACKBONE公式Instagramでも紹介しています。実際の写真や映像は、掲載許可を確認できたものをご覧ください。</p>
    <div className="bb-actions"><a className="bb-action" href="https://www.instagram.com/backbone3x3/" target="_blank" rel="noopener noreferrer">BACKBONE Instagram ↗</a><Link className="bb-action bb-action--outline" href="/ja">RBA公式サイト ↗</Link></div>
   </div></section>
  </div>
 </SiteFrame>;
}
