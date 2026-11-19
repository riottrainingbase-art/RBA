import type { Metadata } from "next";
import Link from "next/link";
import { GrowthClickTracking } from "@/components/growth-click-tracking";
import { SiteFrame } from "@/components/site-frame";
import styles from "./development-check.module.css";

const joinUrl = "https://note.com/rba_official/membership/join";

export const metadata: Metadata = {
  title: "子どもの「学べる環境」7日間チェック｜RBA無料実践ガイド",
  description: "出場機会、練習設計、判断、疲労、声かけを7日間で見直す無料チェック。保護者・指導者向けRBA実践ガイド。月500円からの応援は任意です。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/development-check" },
  openGraph: {
    title: "子どもの「学べる環境」7日間チェック｜RBA",
    description: "技術を教える前に、子どもが何を経験できているか。保護者と指導者のための無料7日間ガイド。",
    url: "https://riotbasketballacademy.com/ja/development-check",
    type: "article",
    locale: "ja_JP",
  },
};

const days = [
  {
    day: "01",
    label: "機会",
    headline: "全員に、プレーする時間があるか。",
    why: "練習参加の回数が同じでも、意思決定を伴うプレー経験が偏ることがあります。",
    watch: "10分だけ観察。待機・説明・ゲーム形式の時間を分け、誰がどれだけ相手を見てプレーしたかを確認。",
    change: "長い列を短くし、少人数ゲームを増やす。人数や安全条件に合わせてコートの使い方を調整。",
    question: "昨日より多くの子が、実際に選ぶ機会を得たか？",
  },
  {
    day: "02",
    label: "見る",
    headline: "ボールの前に、相手と味方を見ているか。",
    why: "ドリブルやシュートの成功率だけでは、ゲームで必要な情報を読めているかは分かりません。",
    watch: "3対3で5場面を観察。キャッチ前に守備・味方の位置を確認できたかを記録。",
    change: "守備の位置や味方のスタート位置を変え、同じ技術に複数の選択肢が生まれるようにする。",
    question: "選手に何が見えたかを、本人の言葉で確かめたか？",
  },
  {
    day: "03",
    label: "選ぶ",
    headline: "「正解」をコーチが先に言いすぎていないか。",
    why: "説明は必要ですが、すべての場面で答えを先に伝えると、選手が試行錯誤する機会が減ります。",
    watch: "指導中の問いと指示の割合を記録し、どんなタイミングで選手の判断を止めたか確認。",
    change: "状況が安全なら一度プレーさせ、「何を見た？」「ほかに何ができた？」と短く振り返る。",
    question: "選手が自分で選び直した場面はあったか？",
  },
  {
    day: "04",
    label: "役割",
    headline: "役割が、経験の固定になっていないか。",
    why: "得点・リバウンド・守備の役割は有用ですが、育成年代で一部の選手をずっと同じ仕事に限定すると学びが狭まります。",
    watch: "普段ボールに関わりにくい選手が、攻める・守る・判断する機会を得られているか確認。",
    change: "役割や組み合わせを一部変える。競争をなくすのではなく、次の挑戦を用意する。",
    question: "今週、その子が初めて試せたことは何か？",
  },
  {
    day: "05",
    label: "負荷",
    headline: "頑張ることと、休むことを両立できるか。",
    why: "練習時間だけでなく、試合、移動、学校生活、痛みや疲労も育成環境に影響します。",
    watch: "本人の疲れ・睡眠・痛み・意欲の変化を把握。医療情報は必要最小限で適切に管理。",
    change: "疲労や痛みのある選手に無理な反復をさせない。症状がある場合は適切な医療専門職へ相談。",
    question: "休む選択が不利益にならない環境か？",
  },
  {
    day: "06",
    label: "会話",
    headline: "試合後に、結果より経験を尋ねられるか。",
    why: "得点や勝敗だけを問うと、子どもが試したことや感じたことが見えなくなります。",
    watch: "大人の試合後の声かけを観察。本人が話したいかどうかも尊重する。",
    change: "「何を試した？」「次にどうしたい？」を一つだけ尋ねる。話したくない日は聞かない。",
    question: "子どもは安心して『分からない』と言えるか？",
  },
  {
    day: "07",
    label: "改善",
    headline: "来週の環境を、一つ変えられるか。",
    why: "振り返りが感想で終わると、学習機会の改善につながりません。",
    watch: "6日分の記録から「もっと経験が必要な場面」を1つ選び、同じ条件での比較可能な指標を決める。",
    change: "練習の人数・時間・守備条件・声かけのうち1つだけ変え、翌週に再度観察する。",
    question: "大人の評価だけでなく、選手の経験は変わったか？",
  },
] as const;

export default function DevelopmentCheckPage() {
  return (
    <SiteFrame locale="ja">
      <GrowthClickTracking />
      <main className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.container}>
            <Link className={styles.back} href="/ja/journal">← RBA JOURNALへ戻る</Link>
            <p className={styles.kicker}>RIOT BASKETBALL ACADEMY / FREE PRACTICE GUIDE</p>
            <h1>子どもの「学べる環境」を、<br />7日間で見直す。</h1>
            <p className={styles.intro}>「もっと練習させれば変わる」の前に。保護者と指導者が、勝敗や技術の上達だけでなく、<strong>子どもがどんな経験をしているか</strong>を確かめるための無料ガイドです。</p>
            <div className={styles.heroActions}>
              <a className={styles.primary} href="#seven-days">7日間のチェックを読む ↓</a>
              <Link className={styles.secondary} href="/ja/supporters" data-growth-id="development-check-supporters">RBAを月500円から応援する →</Link>
            </div>
            <p className={styles.small}>このガイドは無料です。メンバーシップ加入は不要です。回答・選手情報の送信や登録も求めません。</p>
          </div>
        </header>
        <section className={styles.section} aria-labelledby="guide-howto">
          <div className={styles.container}>
            <p className={styles.kicker}>HOW TO USE</p>
            <h2 id="guide-howto">1日5〜10分。いきなり全部を変えない。</h2>
            <p className={styles.lead}>それぞれのテーマで「観察→小さな変更→次の問い」を1セットにしました。指導者は練習場面で、保護者は子どもの様子やチームとの対話で使ってください。見られない項目は無理に記録しなくて構いません。</p>
            <div className={styles.howto}>
              <div><span>01</span><strong>観察する</strong><p>結果だけでなく状況を見る</p></div>
              <div><span>02</span><strong>条件を一つ変える</strong><p>答えの押し付けを避ける</p></div>
              <div><span>03</span><strong>比較する</strong><p>子どもの経験の変化を確かめる</p></div>
            </div>
          </div>
        </section>
        <section className={styles.sectionAlt} id="seven-days" aria-labelledby="guide-seven-days">
          <div className={styles.container}>
            <p className={styles.kicker}>SEVEN DAYS</p>
            <h2 id="guide-seven-days">7日間の育成環境チェック</h2>
            <div className={styles.dayList}>
              {days.map((item) => (
                <article className={styles.day} key={item.day}>
                  <div className={styles.daySide}><span>DAY</span><strong>{item.day}</strong><small>{item.label}</small></div>
                  <div className={styles.dayBody}>
                    <h3>{item.headline}</h3>
                    <p>{item.why}</p>
                    <dl>
                      <div><dt>観察</dt><dd>{item.watch}</dd></div>
                      <div><dt>小さな変更</dt><dd>{item.change}</dd></div>
                      <div><dt>自分への問い</dt><dd>{item.question}</dd></div>
                    </dl>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className={styles.section} aria-labelledby="guide-next">
          <div className={styles.container}>
            <p className={styles.kicker}>WHAT COMES NEXT</p>
            <h2 id="guide-next">無料の学びは、これからも続けます。</h2>
            <p className={styles.lead}>この7日間の観察だけで、育成が完成するわけではありません。RBAでは無料のJOURNALで問題提起や現場の考えを伝え、より深い実践記事を公式noteで届けています。</p>
            <div className={styles.planGrid}>
              <article>
                <span>FREE</span><h3>まず無料で学ぶ</h3>
                <p>出場機会、練習量、声かけ、判断。公開している育成記事を読む。</p>
                <Link href="/ja/journal" data-growth-id="development-check-journal">無料JOURNALを読む →</Link>
              </article>
              <article>
                <span>MONTHLY / ¥500</span><h3>育成を応援する</h3>
                <p>RBAの活動を月500円から応援。活動・使途・次の計画について月1回の報告があるプラン。</p>
                <a href={joinUrl} target="_blank" rel="noopener noreferrer" data-growth-id="development-check-note-500">月500円のプランを確認 ↗</a>
              </article>
              <article>
                <span>MONTHLY / ¥1,000</span><h3>学びながら応援する</h3>
                <p>活動の応援に加えて、育成・見守り方の深掘り記事を月2本読むプラン。</p>
                <a href={joinUrl} target="_blank" rel="noopener noreferrer" data-growth-id="development-check-note-1000">月1,000円のプランを確認 ↗</a>
              </article>
            </div>
            <p className={styles.disclaimer}>月500円・1,000円はいずれもnote上の任意の月額契約です。請求・更新・退会・提供特典は公式noteの最新案内を優先してください。すでに加入している方は二重課金を避けるため現在のプランを先にご確認ください。キャンプ・クリニック、D-HUB、MY HOME COURTとは別です。</p>
          </div>
        </section>
        <footer className={styles.footer}>
          <div className={styles.container}>
            <p>RBAの育成・指導に関する一般的な提案です。特定の選手への評価や医療上の診断・指示ではありません。記録に子どもの氏名や健康情報を含める場合は、管理・同意・保管に十分注意してください。</p>
            <p>© Riot Basketball Academy</p>
          </div>
        </footer>
      </main>
    </SiteFrame>
  );
}
