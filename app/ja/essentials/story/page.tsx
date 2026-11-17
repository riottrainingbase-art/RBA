/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import { ESSENTIALS_HERO_IMAGE, ESSENTIALS_SETUP_IMAGE } from "@/lib/rba-essentials";
import styles from "../essentials.module.css";

export const metadata: Metadata = {
  title: "OUR STORY | RBA STORE",
  description: "仙台から全国へ。バスケットボールの育成に向き合ってきたRiot Basketball Academyが、コートの外でも伝えたいこと。RBAの公式ウェアに込めた背景と思想。",
  alternates: { canonical: "/ja/essentials/story" },
  openGraph: {
    title: "More than apparel. | RBA STORE",
    description: "勝利だけを残さない。子どもたちに、次の選択肢を。RBAが服に込める育成の哲学。",
    url: "/ja/essentials/story",
    images: [{ url: ESSENTIALS_HERO_IMAGE, alt: "RBA STORE 公式Tシャツのデザインイメージ" }],
    type: "website",
    locale: "ja_JP",
  },
};

const chapters = [
  {
    number: "I",
    label: "THE ROOTS / GERMANY",
    title: "勝ち負けの、その先を見る。",
    body: "ドイツでのバスケットボールと身体づくりの経験は、目の前の結果だけでは選手の成長を測れないという視点につながっています。技術、判断、身体、そして時間。育成には、一つひとつを丁寧に積み重ねる環境が必要です。",
  },
  {
    number: "II",
    label: "THE BASE / SENDAI",
    title: "まず、育つ場所をつくる。",
    body: "仙台を拠点に、Riot Training BaseとRiot Basketball Academyは、子どもたちが自分で考え、挑戦し、バスケットボールを続けられる環境づくりに取り組んできました。誰かの評価だけで、選手の可能性を決めないために。",
  },
  {
    number: "III",
    label: "THE JOURNEY / BEYOND BORDERS",
    title: "出会える世界を、広げていく。",
    body: "北海道から沖縄まで。さらに国や文化を越えた交流へ。どこで生まれ、どのチームに所属するかだけで、学びの選択肢が限られないように。コートの外にある出会いも、選手の成長につながると考えています。",
  },
] as const;

export default function EssentialsStoryPage() {
  return (
    <SiteFrame locale="ja">
      <div className={styles.page}>
        <nav className={styles.storyNav} aria-label="RBA STORE 内のナビゲーション">
          <Link href="/ja/store">← RBA STORE</Link>
          <span>RBA STORE / OUR STORY</span>
          <Link href="/ja/essentials/tee">SHOP THE EDIT</Link>
        </nav>

        <header className={styles.storyOpening}>
          <div className={styles.storyOpeningTop}>
            <p className={styles.chapter}>AN IDEA BORN ON THE COURT / 001</p>
            <p className={styles.storyOpeningAside}>THE HISTORY IS NOT A DATE.<br />IT IS WHAT WE KEEP CHOOSING TO DO.</p>
          </div>
          <h1 className={styles.storyTitle}>More than<br /><em>apparel.</em></h1>
          <div className={styles.storyOpeningBottom}>
            <p>服を作るために、<br />バスケットボールを始めたわけじゃない。</p>
            <span>SCROLL TO EXPLORE ↓</span>
          </div>
        </header>

        <section className={styles.storyImageBand} aria-label="RBA STORE デザインイメージ">
          <figure><img src={ESSENTIALS_HERO_IMAGE} alt="白いRBA WHITE TEEのデザイン参考画像。モデル着用写真ではありません。" /><figcaption>01 / THE WHITE TEE</figcaption></figure>
          <figure><img src={ESSENTIALS_SETUP_IMAGE} alt="黒いRBA BLACK SETUPのデザイン参考画像。モデル着用写真ではありません。" /><figcaption>02 / THE BLACK SETUP</figcaption></figure>
        </section>

        <section className={styles.storyLetter} aria-labelledby="story-letter-title">
          <p className={styles.chapter}>A LETTER FROM RBA</p>
          <div>
            <h2 id="story-letter-title">バスケットボールが、<br />好きだからこそ。</h2>
            <p>勝つことは大切です。でも、勝つことだけが、育成のすべてではありません。</p>
            <p>試合に出られない子。失敗する機会さえ与えられない子。頑張り続けるうちに、心や身体が追いつかなくなる子。大人が用意する環境によって、子どもたちの可能性が狭まる場面を、見過ごしたくない。</p>
            <p>だからRBAは、スキルだけでなく、判断する力、身体づくり、挑戦する機会、そして世界と出会うきっかけを大切にしています。</p>
            <p className={styles.storyLetterEnd}>服はその活動の主役ではありません。<br />それでも、私たちが大切にする姿勢を日常に持ち帰る、一つの形にはなれる。</p>
          </div>
        </section>

        <section className={styles.storyChapters} aria-labelledby="story-chapters-title">
          <div className={styles.storySectionHeading}>
            <p className={styles.chapter}>THE CONTEXT / OUR JOURNEY</p>
            <h2 id="story-chapters-title">From the court.<br /><em>To everywhere.</em></h2>
          </div>
          {chapters.map((chapter) => (
            <article className={styles.storyChapter} key={chapter.number}>
              <span className={styles.storyRoman}>{chapter.number}</span>
              <div><p className={styles.chapter}>{chapter.label}</p><h3>{chapter.title}</h3></div>
              <p>{chapter.body}</p>
            </article>
          ))}
          <p className={styles.storyArchiveNote}>RBAの活動内容や運営方針については、団体概要をご覧ください。<Link href="/ja/about">RBAの活動について ↗</Link></p>
        </section>

        <section className={styles.storyDeclaration} aria-labelledby="story-declaration-title">
          <p className={styles.chapter}>THE REASON WE MAKE / RBA ESSENTIALS</p>
          <h2 id="story-declaration-title">Wear the<br /><em>mission.</em></h2>
          <div className={styles.storyDeclarationBottom}>
            <p>派手なロゴより、静かな意思。<br />流行より、日々手に取れること。<br />競技のためだけでなく、日常のためにも。</p>
            <div><h3>この服に、何を残すか。</h3><p>RBA STOREは、RBAの育成理念をコートの外へ届けるためのアパレルラインです。販売利益は製造費・作家報酬・運営経費などを差し引いたうえで、育成活動に充てる方針です。購入の有無が、指導や選考、参加機会に影響することはありません。</p></div>
          </div>
        </section>

        <section className={styles.storyLast} aria-labelledby="story-last-title">
          <p className={styles.chapter}>FIRST DROP / AN INTRODUCTION</p>
          <h2 id="story-last-title">Start with<br />the essentials.</h2>
          <p>白いTシャツと、黒いセットアップ。まずは2つだけ。完成品の品質・生地・納期を確かめてから届けます。掲載画像は実物写真ではなくデザイン参考画像です。</p>
          <div className={styles.storyLastLinks}>
            <Link className={styles.darkButton} href="/ja/store">THE COLLECTION <span aria-hidden="true">↗</span></Link>
            <Link className={styles.textLink} href="/ja/essentials/legal">販売条件を見る <span aria-hidden="true">↗</span></Link>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
