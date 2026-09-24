import "server-only";
export type MemberArticle = { slug: string; role: "player" | "parent" | "coach"; title: string; summary: string };
// Public-safe catalogue only. Bodies and exercises belong in the private database.
export const memberArticles: MemberArticle[] = [
  {
    "slug": "film-review-one-play",
    "role": "player",
    "title": "プレー動画は、一つの場面から見直そう",
    "summary": "成功か失敗かだけで終わらせず、そのとき見えていたものを振り返る。"
  },
  {
    "slug": "clinic-to-next-practice",
    "role": "player",
    "title": "クリニックで学んだことを、いつもの練習へ",
    "summary": "覚えた動きを増やすより、使ってみたい場面を一つ決める。"
  },
  {
    "slug": "after-game-conversation",
    "role": "parent",
    "title": "試合の帰り道、最初に何を話そう",
    "summary": "振り返る前に、子どもが今、話したいかどうかを確かめる。"
  },
  {
    "slug": "choose-next-opportunity",
    "role": "parent",
    "title": "次のクリニックを、子どもと一緒に選ぶ",
    "summary": "有名かどうかだけでなく、今の関心と参加条件から考える。"
  },
  {
    "slug": "one-question-practice-design",
    "role": "coach",
    "title": "練習メニューの前に、見る場面を一つ決める",
    "summary": "何をさせるかに加えて、何を観察するかを決めておく。"
  },
  {
    "slug": "clinic-learning-to-coaching",
    "role": "coach",
    "title": "講習の学びを、次の一回の練習に変える",
    "summary": "メモを増やすだけで終わらせず、自分の現場で試す問いを残す。"
  }
];
