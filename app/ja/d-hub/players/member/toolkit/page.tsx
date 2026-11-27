import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SiteFrame } from "@/components/site-frame";
import styles from "../../../member-toolkit.module.css";

export const dynamic="force-dynamic";
export const metadata:Metadata={
 title:"D-HUB PLAYERS｜メンバー限定・ゲームの振り返りワークシート",
 robots:{index:false,follow:false},
};

const sheets=[
 {number:"01",title:"試合の1場面を振り返る",subtitle:"得点や勝敗ではなく、何を見て、何を選んだかを整理。",
 rows:[
 ["どんな場面だった？","例：コートの右側で味方からパスを受けたとき"],
 ["何が見えていた？","守備者、味方、スペース、残り時間のうち何を見た？"],
 ["そのとき何を選んだ？","パス、ドライブ、シュート、動き直しなど"],
 ["別の選択肢はあった？","次回同じ場面になったら何を試す？"],
 ["次の練習で試すこと","1つだけ書こう。技術と判断を一緒に考える"],
 ]},
 {number:"02",title:"ボールを持っていないとき",subtitle:"良いプレーはボールを持っているときだけではない。",
 rows:[
 ["守備者の位置","自分の前か、パスコース上か、助けに来ているか"],
 ["味方との距離","味方のプレーを助けるための場所を作れた？"],
 ["動くタイミング","パスを出したあと、ボールが動いたあとにどう動いた？"],
 ["チームへの貢献","得点以外に、味方が選択できる状況を作れた？"],
 ["次のゲームでの目標","例：パスを出したら、味方と守備の位置を見て動き直す"],
 ]},
 {number:"03",title:"1週間の学びと休息",subtitle:"練習を増やすことだけが成長ではない。",
 rows:[
 ["今週試したいこと","ゲームでの判断をひとつだけ言葉にする"],
 ["練習後に気づいたこと","上手くいった場面と、迷った場面を1つずつ"],
 ["身体と休息","疲れや痛みがあるときは、無理に続けず信頼できる大人へ伝える"],
 ["学ぶきっかけ","コーチや仲間からどんなヒントをもらった？"],
 ["来週に残すこと","次の練習で試せる、小さな一歩を決める"],
 ]},
] as const;

export default async function PlayersToolkit(){
 const s=await createClient();
 const {data:{user}}=await s.auth.getUser();
 if(!user)redirect("/ja/my-homecourt/login?next=%2Fja%2Fd-hub%2Fplayers%2Fmember%2Ftoolkit");
 const {data:access}=await s.rpc("has_dhub_player_access");
 if(!access)return <SiteFrame locale="ja"><main className={styles.locked}><h1>D-HUB PLAYERS会員専用です。</h1><p>既にPLAYERS会員、または対象となるGREAM選手の方は、新しく決済する前にアクセス権を確認してください。</p><a href="/ja/d-hub/access-request?program=players">会員権限を照合する →</a></main></SiteFrame>;
 return <SiteFrame locale="ja"><main className={styles.page}><div className={styles.wrap}>
   <header className={styles.hero}>
    <a className={styles.back} href="/ja/d-hub/players/member">← PLAYERS会員ページへ</a>
    <p className={styles.kicker}>RBA / D-HUB PLAYERS / MEMBER TOOLS</p>
    <h1>上達を、<br/>自分の言葉で残す。</h1>
    <p>ゲームの見え方、仲間との関わり、次に選びたいプレーを考える3つのワークシート。印刷して、本人が自分で考えるための学習資料です。</p>
    <p className={styles.notice}>このページに回答を入力する必要はありません。子どもの氏名・動画・病歴などの個人情報は収集しません。保護者・指導者は、本人の考えを尊重して一緒に確認してください。</p>
   </header>
   <div className={styles.sheets}>{sheets.map(sheet=><section key={sheet.number} className={styles.sheet}>
    <div className={styles.top}><span>{sheet.number} / PLAYER REFLECTION</span><strong>D-HUB MEMBER ONLY</strong></div>
    <h2>{sheet.title}</h2><p>{sheet.subtitle}</p>
    <table><tbody>{sheet.rows.map(([label,prompt])=><tr key={label}>
      <th scope="row">{label}</th><td><p>{prompt}</p><div className={styles.writingSpace} aria-hidden="true"/></td>
    </tr>)}</tbody></table>
   </section>)}</div>
   <div className={styles.end}><h2>次に試すことは、ひとつでいい。</h2><p>コーチや保護者の評価のためではなく、自分が学んでいることを見つけるために使ってください。</p><a href="/ja/d-hub/players/member">PLAYERSのレッスンへ戻る →</a><small>著作・企画：Riot Basketball Academy。会員本人の学習・私的な印刷利用向けです。再販売・二次配布はできません。</small></div>
 </div></main></SiteFrame>;
}
