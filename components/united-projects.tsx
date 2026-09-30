import { openUnitedProjects, unitedEntryUrl, unitedFee, unitedLineUrl, type UnitedProject } from "@/lib/united-projects";
import styles from "./united-projects.module.css";

function Actions({project,details=false}:{project:UnitedProject;details?:boolean}) {
  return <div className={styles.actions}>
    {details?<a href={`/ja/journal/${project.slug}`}>{project.place}の詳細を見る</a>:null}
    <a className={styles.primary} href={unitedEntryUrl}>先行エントリーへ</a>
    <a href={unitedLineUrl}>LINEで費用・参加を相談</a>
    <a href="/ja/contact">問い合わせで相談</a>
  </div>;
}
function Guidance() {
  return <><p className={styles.note}>先行エントリーは参加意向の登録です。送信時点で参加確定・決済はありません。人数・カテゴリー成立・最終条件を確認後、正式申込をご案内します。</p>
    <p className={styles.note}>複数名参加・費用面は個別相談可。参加費の割引についても、人数や条件に応じて可能な範囲でご相談に乗ります。LINE・問い合わせでは「企画名・年代・参加人数・相談内容」をお知らせください。</p>
    <p className={styles.note}>所属チームでの活動を大切にしながら参加する期間限定の企画です。日程を保護者・所属先と相談し、得た経験を普段のチームへ持ち帰ってください。</p></>;
}
export function UnitedProjects({compact=false}:{compact?:boolean}) {
  const projects=openUnitedProjects();
  return <section className={`section-pad ${styles.section}`} id="united-open" aria-label="現在募集中のRBA UNITED">
    <p className="section-index">RBA UNITED / 先行エントリー受付中</p>
    <h2>現在募集中のRBA UNITED</h2>
    <p>日程と対象を比べて、気になる企画の詳細へ。参加資格や費用で迷う場合は、エントリー前でもご相談いただけます。</p>
    <div className={styles.grid}>{projects.map(project=><article className={styles.card} key={project.slug}>
      <span className={styles.badge}>先行エントリー受付中</span><h3>{project.title}</h3><p>{project.tournament}</p>
      <dl><div><dt>日程</dt><dd>{project.date}</dd></div><div><dt>対象</dt><dd>{project.audience}</dd></div><div><dt>場所</dt><dd>{project.place}</dd></div>
      <div><dt>費用</dt><dd>{unitedFee}</dd></div><div><dt>残枠</dt><dd>{project.availability===null?"残枠は個別にご案内します。先行エントリーで枠は確約されません。":`残り${project.availability}名（最終確認はRBAへ）`}</dd></div></dl>
      <p>{project.summary}</p><Actions project={project} details/>
    </article>)}</div>
    {!projects.length?<p>現在、先行エントリー受付中の企画はありません。次の企画についてはお問い合わせください。</p>:null}
    {compact?<div className={styles.actions}><a href="/ja/united#united-open">RBA UNITEDの企画を比較・相談する</a></div>:null}
    <Guidance/>
  </section>;
}
export function UnitedArticleCTA({slug}:{slug:string}) {
  const project=openUnitedProjects().find(item=>item.slug===slug);
  if(!project)return null;
  return <section className={`section-pad ${styles.section}`} aria-label={`${project.title}への参加・相談`}>
    <p className="section-index">{project.title} / 先行エントリー</p><h2>参加を考えている方へ</h2><p>{unitedFee}</p><Actions project={project}/><Guidance/>
    <div className={styles.actions}><a href="/ja/united#united-open">韓国・マレーシアの企画を比較する</a></div>
  </section>;
}
