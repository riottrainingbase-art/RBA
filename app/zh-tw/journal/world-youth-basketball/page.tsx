import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GrowthClickTracking } from "@/components/growth-click-tracking";
import { TaiwanShareActions } from "@/components/taiwan-share-actions";
import { SiteFrame } from "@/components/site-frame";

const path = "/zh-tw/journal/world-youth-basketball";
const clinic = "/zh-tw/events/torsten-loibl-online-clinic#taiwan-registration";

export const metadata: Metadata = {
  title: "世界青少年籃球｜台灣教練專欄 | RBA JOURNAL",
  description: "從台灣 HBL 看球員的角色與決策，並把觀察帶回球隊訓練。查看台灣時間與 Torsten Loibl 教練講座的國際報名方式。",
  alternates: {
    canonical: path,
    languages: { ja: "/ja/journal/world-youth-basketball/taiwan-hbl", "zh-Hant-TW": path },
  },
  openGraph: { title: "看 HBL，別只看誰得分｜RBA JOURNAL", description: "兩場比賽、三次後場推進，以及一個能帶回球隊的 4 對 4 練習。", locale: "zh_TW", type: "article", url: path },
};

export default function TaiwanCoachingJournal() {
  return (
    <SiteFrame locale="zh-tw" languagePage="journal">
      <GrowthClickTracking />
      <article className="journal-article journal-cms-article">
        <header className="article-hero section-pad">
          <Link className="back-link" href="/zh-tw/journal">← RBA JOURNAL</Link>
          <Link className="back-link" href="/ja/journal/world-youth-basketball/taiwan-hbl" hrefLang="ja" lang="ja">日本語で読む</Link>
          <p className="section-index">世界青少年籃球｜台灣教練專欄</p>
          <h1>看 HBL，別只看誰得分</h1>
          <div className="article-hero-summary">
            <p>同一所學校看兩場。記下誰負責推進、誰在壓迫下接應，以及替補上場後被交付什麼任務。</p>
          </div>
        </header>
        <div className="article-body section-pad">
          <aside className="article-side-note">
            <nav aria-label="文章目錄">
              <a href="#watch">怎麼看比賽</a>
              <a href="#practice">帶回球隊練習</a>
              <a href="#clinic">教練進修</a>
            </nav>
          </aside>
          <div>
            <section id="watch">
              <h2>先記下三次後場推進</h2>
              <p>選一支 HBL 球隊，男女組都可以。對手在後場施壓時，記下第一個接球的人、把球帶過半場的人，以及隊友往哪裡移動接應。第二場比賽沿用同一份記錄，再比對比分和對手的防守方式。這些觀察只反映你看的場次。</p>
              <ul>
                <li><a href="https://hbl.xceedsports.app/item/1763">115 學年度甲級女子組預賽賽程</a></li>
                <li><a href="https://hbl.xceedsports.app/item/1762">115 學年度甲級男子組預賽賽程</a></li>
              </ul>
            </section>
            <section id="practice">
              <h2>4 對 4，輪換第一接球者</h2>
              <p>從底線發球開始，每回合指定不同球員接第一傳。遇到壓迫，觀察另外三人能不能移動到傳球路線上。每組打三個回合，暫停時只問一件事：「持球者被堵住時，你在哪裡可以接球？」下一組再看看球員能不能自己找到新的位置。</p>
            </section>
            <section aria-labelledby="taiwan-journal-share">
              <h2 id="taiwan-journal-share">分享給教練和家長</h2>
              <TaiwanShareActions
                path={path}
                message="看 HBL，別只看誰得分。RBA 整理了三個後場推進觀察重點，以及一個讓球員輪流接應、推進的 4 對 4 練習。"
                trackingId="journal-taiwan-hbl-line-share"
              />
            </section>
            <section id="clinic">
              <h2>下一步，從推進練到創造出手機會</h2>
              <p>Torsten Loibl 線上教練講座會談投籃技術、空間運用與比賽決策。11 月 25 日台灣時間 19:00–20:30。直播、30 天錄影各 US$29，分開購買。英語授課，搭配日語逐步口譯。</p>
              <Link className="button button-dark" href={clinic} data-growth-id="journal-taiwan-coaches-clinic">
                查看課程與購買方式 <ArrowRight size={17} />
              </Link>
            </section>
          </div>
        </div>
      </article>
    </SiteFrame>
  );
}
