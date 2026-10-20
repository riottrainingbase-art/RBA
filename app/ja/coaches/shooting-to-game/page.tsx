import type { Metadata } from "next";

const lp = "https://riotbasketballacademy.com/ja/events/torsten-loibl-online-clinic";
const check = "https://riotbasketballacademy.com/ja/coach/shooting-check";
const share = "https://riotbasketballacademy.com/ja/events/torsten-loibl-online-clinic/share";

export const metadata: Metadata = {
  title: "シュート練習が試合につながらない5つの理由｜RBA指導者向け無料特集",
  description: "練習では入るのに試合で打てない。U12・U15・U18・女子・3x3の指導者へ、技術、判断、スペーシング、練習設計を見直すRBA独自の無料特集。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/coaches/shooting-to-game" },
  openGraph: { title: "練習では入る。試合では打てない。｜RBA COACH EDUCATION", description: "シュート練習が試合につながらない5つの理由と、現場で使える問い。", type: "article", url: "https://riotbasketballacademy.com/ja/coaches/shooting-to-game" },
};

const reasons = [
  { title: "成功率だけを見て、打つ前の判断を見ていない", body: "練習で何本入ったかに加えて、選手がいつリングを見て、守備の位置をどう認識し、打つ・運ぶ・パスをどう選んだかを振り返る。", ask: "今の10本で、良い判断から生まれたシュートは何本あったか？" },
  { title: "キャッチ前の準備が練習から抜けている", body: "オフボールでの位置取り、視野、足の準備、パスを受けるタイミングは、シュート動作の前から始まる。", ask: "ボールが来る前に、選手は何を見ていたか？" },
  { title: "守備や時間の制約がない", body: "フォームや反復練習は大切。ただし試合では守備、時間、味方との関係が変化する。反復とゲーム状況の練習を意図的につなげたい。", ask: "その練習には、選手が選び直す余地があるか？" },
  { title: "スペーシングとショット選択を切り離している", body: "高確率のシュート機会は、個人技術だけでなく味方の配置、ドライブへの反応、パスコース、アドバンテージによっても変わる。", ask: "良いシュートを生んだのは誰のどんな動きだったか？" },
  { title: "待ち時間が長く、学習機会に差がある", body: "リング数や人数が限られていても、少人数の課題設定や役割交代で観察・判断・実行の回数を確保できる。", ask: "今日、全員が十分に判断してプレーできたか？" },
];

const audiences = [
  ["U12", "フォームの形だけに偏らず、キャッチ前の準備と打つ・運ぶ・パスの選択を観察する。"],
  ["U15", "技術練習とゲーム状況をつなぐ条件設定を見直す。"],
  ["U18", "スペーシング、守備の対応、ショットの質をセットで考える。"],
  ["女子育成", "一人ひとりの習熟度と環境に合わせ、技術と判断の学習機会を設計する。"],
  ["3x3", "少人数でのスペース、切り替え、短い判断時間を踏まえてショット機会を考える。"],
];

export default function ShootingToGamePage() {
  return <main className="min-h-screen bg-[#0b0d10] text-white">
    <div className="mx-auto max-w-4xl px-5 py-12 md:py-20">
      <p className="text-xs font-semibold tracking-[.24em] text-neutral-400">RIOT BASKETBALL ACADEMY / COACH EDUCATION</p>
      <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight md:text-6xl">練習では入る。<br/>試合では打てない。</h1>
      <p className="mt-6 text-lg leading-8 text-neutral-300">シュート練習が試合につながらない5つの理由。技術を否定するのではなく、技術・判断・練習環境をつなぎ直すための無料特集です。</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a className="rounded-md bg-white px-5 py-3 font-bold text-black" href={check}>無料・2分の練習チェック →</a>
        <a className="rounded-md border border-neutral-500 px-5 py-3 font-bold" href={lp}>11/25オンライン講習を見る →</a>
      </div>
      <p className="mt-5 text-sm text-neutral-400">本記事はRBA独自制作の指導者向け資料です。Torsten Loibl氏の監修記事・講義教材ではありません。</p>
      <section className="mt-16" aria-labelledby="reasons"><h2 id="reasons" className="text-2xl font-bold">練習を見直す5つの視点</h2>
        <div className="mt-6 grid gap-4">{reasons.map((r,i)=><article key={r.title} className="rounded-lg border border-neutral-700 bg-neutral-900/60 p-6"><p className="text-sm font-bold text-neutral-400">0{i+1}</p><h3 className="mt-2 text-xl font-bold">{r.title}</h3><p className="mt-3 leading-7 text-neutral-300">{r.body}</p><p className="mt-4 border-l-2 border-white pl-4 font-medium">現場への問い：{r.ask}</p></article>)}</div>
      </section>
      <section className="mt-16"><h2 className="text-2xl font-bold">カテゴリー別に考える</h2><div className="mt-5 grid gap-3 md:grid-cols-2">{audiences.map(([name,body])=><div key={name} className="rounded-lg border border-neutral-700 p-5"><h3 className="font-bold">{name}</h3><p className="mt-2 leading-7 text-neutral-300">{body}</p></div>)}</div></section>
      <section className="mt-16 rounded-xl bg-white p-7 text-black md:p-10"><p className="text-xs font-bold tracking-widest">ONLINE CLINIC VOL.2 / 2026.11.25</p><h2 className="mt-3 text-3xl font-black">次の練習を考える90分。</h2><p className="mt-4 leading-7">Torsten Loibl氏と、シューターの技術、ゲーム中の判断、練習設計、スペーシングを考えます。2016年男子U18日本代表アジア準優勝、2019年3x3女子U23日本代表世界一へのディレクターコーチとしての貢献などの経験を持つ指導者です。</p><p className="mt-4 font-semibold">11月25日（水）20:00–21:30 JST / Zoom / 英語講義・日本語逐次通訳</p><p className="mt-2">LIVE 3,300円（税込）／録画配信開始後30日間 4,400円（税込）</p><p className="mt-2 text-sm text-neutral-600">主催：Riot Basketball Academy。講師の過去・現在の所属団体の主催・後援を示すものではありません。特定のドリルや個別回答は保証しません。</p><a className="mt-6 inline-block rounded-md bg-black px-6 py-3 font-bold text-white" href={lp}>公式概要・唯一の申込導線へ →</a></section>
      <section className="mt-10 flex flex-wrap gap-5 text-sm"><a className="underline underline-offset-4" href={share}>公式紹介文を確認する</a><a className="underline underline-offset-4" href={check}>無料チェックに進む</a><a className="underline underline-offset-4" href="/ja/coaches">指導者向けページへ戻る</a></section>
      <p className="mt-12 border-t border-neutral-700 pt-6 text-xs leading-6 text-neutral-400">この記事は一般的な指導設計の視点を整理するもので、特定の方法の効果を保証するものではありません。講習への参加は任意です。フォーム送信後、選択したプランの決済完了をもって申込確定となります。</p>
    </div>
  </main>;
}
