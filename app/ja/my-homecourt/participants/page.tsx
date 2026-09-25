import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import styles from "./participants.module.css";
export const metadata: Metadata = {
 title: "クリニック参加者の方へ | MY HOME COURT",
 description: "参加したクリニック、今のプレー、次の目標。RBAでの経験を、自分の成長ノートに残しましょう。",
 alternates: {canonical: "/ja/my-homecourt/participants"},
 openGraph: {title: "あの日の経験を、次の一歩へ。", description: "RBAのクリニック参加者へ。MY HOME COURTで記録を始めましょう。", url: "/ja/my-homecourt/participants", locale: "ja_JP", images: ["/rba-logo-original.jpg"]},
};
export default function ParticipantsPage(){return <main className={styles.page} lang="ja">
 <header className={styles.header}><Link href="/ja" aria-label="RBA公式サイト"><Image src="/rba-logo-original.jpg" alt="Riot Basketball Academy" width={203} height={284}/><span>RBA<br/><small>MY HOME COURT</small></span></Link><Link href="/ja/my-homecourt/app/start">ログイン</Link></header>
 <section className={styles.hero}><p className={styles.eyebrow}>クリニックに参加してくださった皆さまへ</p><h1>あの日の経験を、<br/>次の一歩へ。</h1><p>参加したクリニック。できるようになったプレー。これからの目標。自分だけの成長ノートに残しましょう。</p><Link className={styles.primary} href="/ja/my-homecourt/app/start">自分・子どもの記録を始める →</Link><p className={styles.note}>RBA IDで登録・ログインできます。未成年の方は保護者と一緒に始めてください。</p></section>
 <section className={styles.section}><h2>最初は、一つずつ。</h2><ol className={styles.steps}>
 <li><span>01 / 過去</span><h3>参加した経験を残す</h3><p>クリニック名、参加した月、覚えていること。日付は月単位でも記録できます。</p></li>
 <li><span>02 / 現在</span><h3>今の自分を見つける</h3><p>できるようになったことと、取り組みたい課題を一つずつ。写真や短いプレー動画も残せます。</p></li>
 <li><span>03 / 未来</span><h3>次に試すことを決める</h3><p>次の練習で何を試すか。見返す日を決めて、少し先の自分と比べましょう。</p></li>
 </ol></section>
 <section className={styles.section}><h2>自分に合う使い方で。</h2><div className={styles.roles}><article><h3>選手</h3><p>自分のプレーと気づきを残す。</p></article><article><h3>保護者</h3><p>お子さまごとに記録を分けて残す。</p></article><article><h3>指導者</h3><p>講習で学んだことを、次の指導へ。</p><Link href="/ja/d-hub">D-HUBを見る →</Link></article></div></section>
 <section className={styles.section}><h2>安心して記録するために</h2><details><summary>以前の参加記録はどうなりますか？</summary><p>まずはご自身で記録できます。自己記録とRBAの出席確認済み記録は区別されます。公式記録の照合は、参加時期と会場を添えて<Link href="/ja/contact">RBAへご相談ください。</Link></p></details><details><summary>写真や動画は公開されますか？</summary><p>成長記録はアカウント内で管理し、他の会員には公開しません。他の選手が写る場合は、本人・保護者の許可を確認してください。</p></details><details><summary>子どもの記録も残せますか？</summary><p>保護者のアカウントで、お子さまをそれぞれ登録できます。子ども本人の別アカウントには自動連携されません。</p></details><details><summary>月額メンバーシップとの違いは？</summary><p>このページから登録しても月額契約は始まりません。会員限定の記事は、別途メンバーシップへのお申し込みが必要です。</p></details></section>
 <footer className={styles.section}><h2>まず、一つの経験から。</h2><Link className={styles.primary} href="/ja/my-homecourt/app/start">MY HOME COURTを始める →</Link><nav className={styles.links}><Link href="/ja/opportunities">次の活動を探す</Link><Link href="/ja/my-homecourt/app/learn">学びのライブラリ</Link><Link href="/ja/contact">お問い合わせ</Link><Link href="/ja/policies">参加規約・安全方針</Link></nav></footer>
 </main>}
