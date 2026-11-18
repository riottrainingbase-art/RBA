import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import s from "./guide.module.css";

export const metadata: Metadata = {
  title: "MY HOME COURT｜RBA IDの始め方・初期設定ガイド",
  description: "無料・パスワード不要のRBA IDを10枚で解説。選手・保護者・指導者のための公式使い方ガイドです。",
  alternates: { canonical: "/ja/my-homecourt/guide" },
};

const slides = [
 ["使い方解説。","MY HOME COURT|RBA IDの始め方","10枚でわかる","登録→ログイン→初期設定まで","無料・パスワード不要|選手／保護者／指導者 すべて対応","まずは全体像を確認","RBA ID 使い方ガイド"],
 ["まずはここ。","RBA IDは|無料で使える","パスワード不要","最初に知ってほしい3つ","① 登録・ログインは無料|② メールのリンクで入る|③ 有料登録はあとでもOK","先に基本だけ押さえる","使い方ガイド"],
 ["STEP 1","ログイン|ページを開く","公式ページへ","最初にやること","Safari／Chromeで開く|RBA公式サイトから進む|「RBA IDで始める」を確認","入口まで行けばOK","まずは公式サイトへ"],
 ["STEP 2","立場を|選ぶ","3つから選択","あなたの立場","選手|保護者|指導者|保護者は自分のメールで登録","ここを間違えない","立場に合わせて設定"],
 ["STEP 3","メール|入力","登録したアドレス","入力のポイント","登録したメールを入力|空白・打ち間違いに注意|「メールで続ける」を押す","送信できたら次へ","入力ミスに注意"],
 ["STEP 4","届いた|メールを開く","ログインリンクをタップ","ここでやること","届いたメールを開く|最新のリンクを1回タップ|迷惑メールも確認する","開けたらログイン完了","古いリンクは使わない"],
 ["STEP 5","初期設定を|完了する","最後の確認","初期設定で見ること","表示名・立場・活動地域|利用規約とプライバシー|「MY HOME COURTを始める」","ここまでできればOK","規約を読んで設定完了"],
 ["ログイン後","何が|できる？","立場ごとの使い方","ログイン後の見方","選手：経験・活動を確認|保護者：予定・履歴を確認|指導者：学習・D-HUBを確認","必要な情報を確認","RBA IDひとつでOK"],
 ["困ったら①","メールが|届かない","確認ポイント","まずはここをチェック","迷惑メールを確認|入力アドレスを確認|少し待って再送する","焦らず一つずつ確認","再送で解決することも"],
 ["困ったら②","開けない時は|こうする","最後の対処法","それでも進めない時","Safari／Chromeでやり直す|最新のリンクを使う|止まった画面をRBAへ相談","わからなければ相談","一歩ずつ始めよう"],
] as const;

const details = [
 ["公式ページを開く","SafariやChromeで「https://riotbasketballacademy.com/ja/my-homecourt/login」を開きます。「RBA IDで始める」と表示されるページが入口です。"],
 ["立場を選ぶ","「選手」「保護者」「指導者」のいずれかを選びます。保護者の方は、ご自身のメールアドレスで「保護者」を選択してください。未成年の方は保護者と一緒に進めてください。"],
 ["メールを入力する","以前RBA IDを作成した際のメールアドレスを入力し、「メールで続ける」を押します。パスワードは不要です。"],
 ["届いたリンクを開く","件名「[RBA] MY HOME COURTへのログイン」のメールを確認してください。できればログインを始めた同じ端末・ブラウザーで、最新のメールのリンクを一度だけ開きます。ログイン用リンクは他人に転送しないでください。"],
 ["初期設定を確認する","初回は「表示名」（必須）、「あなたの立場」を確認し、「活動地域（都道府県）」を必要に応じて選択します。「生まれ年」は選手本人のみ任意で入力できます。保護者アカウントにお子さまの生まれ年を入力しないでください。"],
 ["同意して設定を完了する","利用規約とプライバシーポリシーを読み、同意できる場合のみチェックします。活動案内メールの受信希望は別の任意チェックです。「MY HOME COURTを始める」を押すと初期設定が保存されます。"],
] as const;

export default function MyHomecourtGuide() {
 return <SiteFrame locale="ja" languagePage="my-homecourt">
  <div className={s.page} lang="ja">
   <header className={s.intro}>
    <p className={s.overline}>RBA / OFFICIAL HOW-TO</p>
    <h1>MY HOME COURT<br/>はじめての使い方。</h1>
    <p>選手・保護者・指導者向け。無料RBA IDのログインから初期設定まで、10枚のオレンジのガイドで一つずつ説明します。</p>
    <nav className={s.actions} aria-label="初期設定の入口">
     <Link className={s.primary} href="/ja/my-homecourt/login">無料RBA IDを始める →</Link>
     <a className={s.secondary} href="#posters">使い方を10枚で見る ↓</a>
    </nav>
    <small>無料・パスワード不要。初期設定のためにカード登録や有料加入は必要ありません。</small>
   </header>
   <section id="posters" className={s.gallery} aria-labelledby="posters-title">
    <div className={s.sectionHead}><p className={s.overline}>SWIPE / 01—10</p><h2 id="posters-title">10枚でわかる、最初の一歩。</h2><p>横にスワイプして順にご覧ください。下の番号から好きなページに進めます。</p></div>
    <ol className={s.slider} aria-label="MY HOME COURT・10枚の使い方ガイド" aria-roledescription="横スクロール式の10枚ガイド" tabIndex={0}>
     {slides.map((a,i)=><li key={i} id={`guide-${i+1}`} className={s.slide}>
      <article className={s.poster} aria-label={`${i+1}枚目・${a[0]}`}>
       <div className={s.mark} aria-hidden="true"><Image src="/rba-logo-original.jpg" alt="" width={120} height={142} sizes="(max-width:700px) 60px,110px"/></div>
       <div className={s.posterTop}><strong className={s.kicker}>{a[0]}</strong><h3>{a[1].split("|").map((line,j)=><span key={j}>{line}</span>)}</h3></div>
       <p className={s.emphasis}>{a[2]}</p>
       <div className={s.posterWhite}><h4 className={a[3].length>12?s.longTitle:undefined}>{a[3]}</h4><ul>{a[4].split("|").map(line=><li key={line}>{line}</li>)}</ul><strong className={s.posterBanner}>{a[5]}</strong><div className={s.posterFoot}><span>{a[6]}</span><span>{i+1}/10</span></div></div>
      </article>
      <div className={s.prevNext}>{i>0?<a href={`#guide-${i}`}>← 前へ</a>:<span/>}<strong>{i+1} / 10</strong>{i<9?<a href={`#guide-${i+2}`}>次へ →</a>:<a href="#detailed">操作手順を読む ↓</a>}</div>
     </li>)}
    </ol>
    <nav className={s.numbers} aria-label="スライドを選ぶ">{slides.map((_,i)=><a href={`#guide-${i+1}`} aria-label={`${i+1}枚目を表示`} key={i}>{i+1}</a>)}</nav>
   </section>
   <section id="detailed" className={s.steps}>
    <div className={s.sectionHead}><p className={s.overline}>STEP BY STEP</p><h2>画面で迷わないための詳しい手順。</h2><p>実際のログイン画面と初期設定フォームの入力項目に合わせて解説しています。</p></div>
    <ol className={s.stepList}>{details.map(([title,body],i)=><li key={i}><strong>{String(i+1).padStart(2,"0")}</strong><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol>
    <p className={s.notice}><strong>初期設定は無料です。</strong> HOMECOURT PLUS（月額3,300円）は任意の有料サービス。無料RBA IDの設定に購入や決済は必要ありません。</p>
   </section>
   <section className={s.help}>
    <p className={s.overline}>HELP / TROUBLESHOOTING</p><h2>ログインで困ったら。</h2>
    <div className={s.helpGrid}>
     <article><h3>メールが届かない</h3><p>アドレス、迷惑メール・プロモーションを確認し、少し時間をおいて新しいリンクを送ってください。</p></article>
     <article><h3>メールのリンクが開けない</h3><p>古いリンクではなく最新のメールを使い、Safari／Chromeでログイン画面からやり直してください。</p></article>
     <article><h3>初期設定で止まる</h3><p>選んだ立場・止まった項目・エラー文をRBAへ相談してください。ログインリンクやお子さまの詳細な個人情報は送らないでください。</p></article>
    </div>
    <nav className={s.actions} aria-label="サポート">
     <Link className={s.primary} href="/ja/my-homecourt/login">ログインページへ →</Link>
     <Link className={s.secondary} href="/ja/contact">RBAに相談する →</Link>
    </nav>
   </section>
  </div>
 </SiteFrame>;
}
