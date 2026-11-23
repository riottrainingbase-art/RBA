import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SiteFrame } from "@/components/site-frame";
import styles from "../../../member-toolkit.module.css";

export const dynamic="force-dynamic";
export const metadata:Metadata={
 title:"D-HUB COACH LAB｜メンバー限定・実践ワークシート",
 robots:{index:false,follow:false},
};

const sheets=[
 {number:"01",title:"練習前の観察シート",subtitle:"まず「教える内容」ではなく「何が起きているか」を見る。",
 rows:[
 ["課題の場面","ゲーム中、誰が／どの位置で／どの選択をした？"],
 ["選手が見られる情報","ボール、味方、守備者、空間、時間のうち何が見えている？"],
 ["選べる代替案","成功・失敗の結果だけでなく、選択肢は何種類あった？"],
 ["観察できる証拠","ボールを受ける前の視線、移動、タイミング、パスコースなど"],
 ["次の練習で試すこと","最小限のルールや人数変更を1つだけ選ぶ"],
 ]},
 {number:"02",title:"Small-Sided Game設計シート",subtitle:"制約をかける理由と、制約を外した後の変化まで確認。",
 rows:[
 ["ゲームの目的","例：優位性のある味方を見つけ、パスかドライブかを判断する"],
 ["開始条件","例：3対3、半面。経験・人数に合わせて調整"],
 ["1つだけ変更する条件","例：得点前にオフボールの動きが起きる課題を設定する"],
 ["確認すること","ボール保持者以外が状況を見て動けたか"],
 ["制約を外したゲーム","通常の3対3に戻して判断が残ったか観察する"],
 ["うまくいかなかった場合","簡単にする／人数を減らす／視野を増やす、のどれが妥当か"],
 ]},
 {number:"03",title:"1週間の練習設計",subtitle:"活動量を増やす前に、回復と学校生活を含めて考える。",
 rows:[
 ["今週の育成テーマ","言葉で1行。例：守備の変化を見て攻撃を選ぶ"],
 ["活動予定","練習・試合・学校活動の予定と移動負担を確認する"],
 ["主なゲーム課題","今週は何を観察し、何を判断する機会を増やすか"],
 ["負荷と休息","実施時間・休息・疲労感の変化を観察。痛みの申告を軽視しない"],
 ["次週への調整","継続すべきこと1つ、減らすこと1つ"],
 ]},
 {number:"04",title:"指導後のレビューと保護者への共有",subtitle:"勝敗ではなく、学習プロセスが伝わる説明へ。",
 rows:[
 ["今日試したこと","例：受ける前に守備者と味方を見る"],
 ["できた観察事実","例：以前よりパス前に逆サイドを見る場面が増えた"],
 ["次回の問い","例：数的優位が消えたとき何を優先する？"],
 ["選手への伝え方","次に試せる具体的な選択肢を示す。人格評価はしない"],
 ["保護者への伝え方","機会・学習内容・安全管理を共有。出場時間で価値を測らない"],
 ]},
] as const;

export default async function CoachToolkit(){
 const s=await createClient();
 const {data:{user}}=await s.auth.getUser();
 if(!user)redirect("/ja/my-homecourt/login?next=%2Fja%2Fd-hub%2Fcoaches%2Fmember%2Ftoolkit");
 const {data:access}=await s.rpc("has_dhub_coach_access");
 if(!access)return <SiteFrame locale="ja"><main className={styles.locked}><h1>D-HUB COACH LAB会員専用です。</h1><p>決済済みでアクセスできない方は、申込時のメールアドレスとRBA IDを確認してください。重複して申し込む前に利用照合をご依頼ください。</p><a href="/ja/d-hub/access-request?program=coach_lab">会員権限を照合する →</a></main></SiteFrame>;
 return <SiteFrame locale="ja"><main className={styles.page}>
  <div className={styles.wrap}>
  <header className={styles.hero}>
    <a className={styles.back} href="/ja/d-hub/coaches/member">← COACH LAB会員ページへ</a>
    <p className={styles.kicker}>RBA / D-HUB COACH LAB / MEMBER TOOLS</p>
    <h1>読むだけで終わらない。<br/>現場で使う4つのシート。</h1>
    <p>48週カリキュラムの内容を、自分の練習に置き換えるためのオリジナル実践ツールです。印刷や個人の指導準備に利用できます。</p>
    <p className={styles.notice}>個人の指導メモ用です。RBAサイトには入力・保存しません。選手の氏名・健康情報・写真・動画を、このページや一般の問い合わせフォームへ送信しないでください。</p>
  </header>
  <div className={styles.sheets}>{sheets.map(sheet=><section key={sheet.number} className={styles.sheet}>
    <div className={styles.top}><span>{sheet.number} / PRACTICAL SHEET</span><strong>D-HUB MEMBER ONLY</strong></div>
    <h2>{sheet.title}</h2><p>{sheet.subtitle}</p>
    <table><tbody>{sheet.rows.map(([label,prompt])=><tr key={label}>
      <th scope="row">{label}</th><td><p>{prompt}</p><div className={styles.writingSpace} aria-hidden="true"/></td>
    </tr>)}</tbody></table>
  </section>)}</div>
  <div className={styles.end}><h2>次の実践へ。</h2><p>1度にすべて変える必要はありません。「観察した事実」と「次に試す1つ」を残し、次回の実践と比較しましょう。</p><a href="/ja/d-hub/coaches/member">48週レッスンへ戻る →</a><small>著作・企画：Riot Basketball Academy。会員本人の学習・指導準備用。第三者への再販売・素材としての二次配布はできません。</small></div>
  </div>
 </main></SiteFrame>;
}
