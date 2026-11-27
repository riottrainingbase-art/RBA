import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import {
  rbaPublicInformation, rbaPublicInformationReviewedAt, rbaStatusCategories,
} from "@/lib/rba-public-status";
import styles from "./updates.module.css";

export const metadata: Metadata = {
  title: "RBA最新情報｜開催予定・GREAM・国際交流・会員サービス",
  description: "Riot Basketball Academyの開催予定、地域クラブ、国際交流、MY HOME COURT、D-HUB、協賛、非営利運営を、開催予定・活動中・協議中に分けて確認できます。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/updates" },
  openGraph: {
    title: "RBA最新情報｜確定したこと、これから決めること",
    description: "開催日程、会員サービス、クラブ、国際交流、団体運営の公式情報を整理。最新の参加条件は各個別ページをご確認ください。",
    url: "https://riotbasketballacademy.com/ja/updates",
    type: "website",
    siteName: "Riot Basketball Academy",
  },
};

export default function RbaUpdatesPage() {
  return <SiteFrame locale="ja">
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.kicker}>RBA / INFORMATION DESK</p>
        <h1>確定したこと。<br/>これから決めること。</h1>
        <p className={styles.heroLead}>活動が全国・アジアへ広がるほど、情報の正確さが重要になります。募集・運営・協議の状況を分けてお伝えします。</p>
        <p className={styles.checked}>最終確認日：{rbaPublicInformationReviewedAt} ／ 公開用の情報整理</p>
      </header>
      <div className={styles.wrap}>
        <nav aria-label="最新情報の分類" className={styles.nav}>
          {rbaStatusCategories.map((category,index)=><a href={"#information-"+index} key={category}>{category} <span aria-hidden="true">↗</span></a>)}
        </nav>
        <div className={styles.notice} role="note">
          <h2>このページの読み方</h2>
          <p>「開催予定」は日程が案内されている活動、「活動中」は既に運用しているサービス、「準備・協議中」は相手先との調整や新規企画の段階を示します。申込受付・決済完了・会場利用許可・協賛契約の成立を自動的に意味するものではありません。</p>
          <p>新しいお申し込みの前には、必ず各プログラムの公式ページにある料金・参加条件・キャンセル規定をご確認ください。既にお申し込み・お支払い済みの方は、同じ内容を再決済しないでください。</p>
        </div>
        {rbaStatusCategories.map((category,index)=><section className={styles.section} id={"information-"+index} key={category} aria-labelledby={"information-title-"+index}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>{String(index+1).padStart(2,"0")} / INFORMATION</span>
            <h2 id={"information-title-"+index}>{category}</h2>
          </div>
          <div className={styles.grid}>
            {rbaPublicInformation.filter(item=>item.category===category).map(item=><article className={styles.entry} key={item.id}>
              <div className={styles.meta}><span className={styles.status}>{item.status}</span>{item.when&&<span className={styles.date}>{item.when}</span>}</div>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              {item.note&&<p className={styles.entryNote}>{item.note}</p>}
              {item.href&&<a className={styles.link} href={item.href}>{item.linkText??"詳しく見る"} <span aria-hidden="true">↗</span></a>}
            </article>)}
          </div>
        </section>)}
        <div className={styles.end}>
          <h2>公式情報の確認先</h2>
          <p>育成方針や団体会則の説明と、個々のイベント参加契約は別です。返金・食物アレルギー・送迎・緊急時の連絡など、各家庭に関わる情報は個別にご案内します。</p>
          <div className={styles.links}><a href="/ja/opportunities">開催予定・参加方法を見る ↗</a><a href="/ja/about/governance">団体概要・会則を見る ↗</a><a href="/ja/contact">お問い合わせ ↗</a></div>
          <p className={styles.fineprint}>このページは確認日時点の公表可能な情報です。出欠、入金、契約、健康情報などの個別記録を掲載していません。各公式ページの更新が新しい場合は、その個別の案内を優先してください。</p>
        </div>
      </div>
    </div>
  </SiteFrame>;
}
