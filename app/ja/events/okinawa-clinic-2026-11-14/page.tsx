import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import { OkinawaClinicEntry } from "@/components/okinawa-clinic-entry";
import { OKINAWA_CLINIC as clinic } from "@/lib/clinics/okinawa";
import styles from "@/components/okinawa-clinic.module.css";

export const metadata:Metadata={title:"11/14 RBA沖縄クリニック｜小学4年〜中学3年・3,300円",description:"2026年11月14日（土）16:00〜19:00、RBA沖縄クリニック。沖縄県南部で、バスケを思いきり楽しむ3時間。小学4年〜中学3年、定員50名、参加費3,300円（税込）。会場は伊良波小学校（豊見城市）、利用承認済み。集合・駐車場の詳細は申込者へ個別案内。決済状況は公式ページで確認。",alternates:{canonical:`https://riotbasketballacademy.com${clinic.path}`}};
export default function Page(){return <SiteFrame locale="ja"><div className={styles.page}>
  <section className={styles.hero}><div><p className={styles.eyebrow}>RIOT BASKETBALL ACADEMY / OKINAWA</p><h1>沖縄でまた、<br/>一緒にバスケしよう。</h1><p className={styles.date}>{clinic.date}<br/>{clinic.time}</p><p className={styles.lead}>「もっと上手くなりたい」<br/>その気持ちを、コートで思いきり。<br/>身体の使い方からシュート、ゲームまで。新しい発見を、いつものプレーにつなげる3時間。</p><a className={styles.button} href="#entry">申込・受付状況を確認 ↓</a><p style={{marginTop:16,fontSize:15}}><a href="/events/okinawa-clinic-2026-11-14" style={{color:"inherit",textDecoration:"underline",fontWeight:800}}>English information / English pre-registration →</a></p></div><aside className={styles.ticket}><p className={styles.eyebrow} style={{color:"#587344"}}>RBA 沖縄クリニック</p><dl><dt>対象</dt><dd>小学4年〜中学3年生</dd><dt>定員</dt><dd>50名</dd><dt>会場</dt><dd>伊良波小学校（豊見城市）<br/><small>〒901-0232 豊見城市字伊良波300番地／通常の出入りは正門</small><br/><small>駐車区画・集合は申込者へ個別案内</small></dd><dt>日時</dt><dd>11月14日（土）<br/>16:00〜19:00</dd></dl><div className={styles.price}>¥3,300 <small>税込／選手1名</small></div><p className={styles.fine}>伊良波小学校の正式利用は承認済みです。集合・駐車場等は申込者へ個別案内します。決済開始は申込欄でご確認ください。先行受付だけでは参加確定・課金は発生しません。</p></aside></section>
  <section className={styles.section}><h2>いつものプレーに、新しい発見を。</h2><div className={styles.grid}>{[["01","身体とボールの基本","止まる・方向を変える・バランスを保つ。ボールを扱う動きと一緒に、プレーの土台を整えます。"],["02","シュートとフィニッシュ","近い距離から動作を確認し、パスを受けて打つ・ゴールへ向かう場面へつなげます。"],["03","見て、選んで、プレーする","少人数のゲームで、味方と守備を見ながら判断。学んだことを実際のプレーで試します。"]].map(([n,t,b])=><article className={styles.card} key={n}><span className={styles.number}>{n}</span><h3>{t}</h3><p>{b}</p></article>)}</div><p className={styles.fine}>練習内容・組分け・時間配分は、参加人数、学年、経験、当日の状態に合わせて調整します。休憩・水分補給を取りながら進めます。</p><p><strong>久しぶりの方も、初めての方も。沖縄のコートで待っています。</strong></p></section>
  <section className={styles.section} aria-labelledby="okinawa-supporter-heading">
    <h2 id="okinawa-supporter-heading">地域の皆さまとのつながり</h2>
    <article className={styles.card} style={{maxWidth:820}}>
      <p className={styles.eyebrow}>LOCAL COMMUNITY SUPPORT / OKINAWA</p>
      <div style={{display:"flex",alignItems:"center",gap:18,flexWrap:"wrap",marginBottom:16}}><img src="/rba-logo-original.jpg" alt="Riot Basketball Academy 公式ロゴ" width="80" height="80" style={{objectFit:"contain",borderRadius:8}}/><h3 style={{margin:0}}>株式会社サン食品 様</h3></div>
      <p>沖縄そばの麺50食分とお出汁について、物品協賛のお申し出をいただいています。子どもたちの育成活動に関心を寄せていただき、心より感謝申し上げます。</p>
      <p><a href="https://sun-foods.net/" target="_blank" rel="noopener noreferrer" style={{fontWeight:800,textDecoration:"underline"}}>株式会社サン食品 公式サイト</a></p>
      <p className={styles.fine}>※協賛品の受取・保管・当日の提供方法は調整中です。参加者への食品提供を確約するものではありません。サン食品様のロゴ原本については確認後に追加します。</p>
    </article>
  </section>
  <section className={styles.section}><h2>申込から当日まで、3つのステップ。</h2><div className={styles.grid}>{[["01","選手情報を登録","保護者のRBA IDでログインし、選手1名ずつ氏名・学年・緊急連絡先を登録します。"],["02","決済受付開始後にお支払い","RBAが決済受付を開始すると、このページに決済ボタンが表示されます。参加費は1名3,300円（税込）。お支払いの確認後に参加確定です。"],["03","会場案内を確認して参加","会場は伊良波小学校です。集合時間・入館方法・駐車場の案内は申込時のメールアドレスとMY HOME COURTのお知らせをご確認ください。"]].map(([n,t,b])=><article className={styles.card} key={n}><span className={styles.number}>STEP {n}</span><h3>{t}</h3><p>{b}</p></article>)}</div></section>
  <section className={styles.section} id="entry"><h2>お申し込み</h2><div className={styles.card} style={{marginBottom:24}} lang="en"><h3>English pre-registration for international families</h3><p>English-language enquiries are available for Okinawa-resident families, including U.S. military-connected families. The venue is secured, but this enquiry does not collect payment or guarantee a place. Location details are shared privately with applicants.</p><p><a className={styles.button} href="/events/okinawa-clinic-2026-11-14">Read English details and enquire →</a></p></div><OkinawaClinicEntry/></section>
  <section className={styles.section}><h2>参加前にご確認ください。</h2>
    <details className={styles.details} open><summary>会場について</summary><p>会場は伊良波小学校（〒901-0232 沖縄県豊見城市字伊良波300番地）で正式利用承認済みです。市の学校体育施設の注意事項により、通常の入退場は正門をご利用ください。裏門は大型物品の搬出入専用で、一般参加者の通行には使用できません。路上の迷惑駐車もお控えください。駐車できる具体的な区画・集合方法は施設の利用条件を確認のうえ申込者へ個別にご案内します。受付・決済状況は上の申込欄をご確認ください。</p></details>
    <details className={styles.details}><summary>持ち物・当日の流れ</summary><p>体育館用シューズ、運動できる服装、飲み物、タオルをお持ちください。ボールの持参要否、集合時間、駐車・送迎については会場案内と併せてお知らせします。開催時間は16:00〜19:00です。</p></details>
    <details className={styles.details} open><summary>キャンセル・返金</summary><p>RBAの共通規定に基づき、11月6日までのキャンセルは100％返金、11月7〜10日は50％返金、11月11日〜当日・無断欠席は原則返金なしとなります（日本時間・ご連絡の受信日を基準）。RBA都合で中止する場合は、対象参加費の全額返金または振替をご案内します。ご連絡は、申込時のメールアドレスと受付番号を添えて、下記窓口へお願いします。</p></details>
    <details className={styles.details}><summary>定員・キャンセル待ち</summary><p>定員は50名です。申込受付数が定員に達した場合は、キャンセル待ちとして受け付けます。キャンセル待ちの方には決済をお願いしません。先行受付のみでは参加・決済は確定しません。正式な参加可否と決済状況はRBAの個別案内・受付記録でご確認ください。</p></details>
    <details className={styles.details}><summary>個人情報・写真・安全について</summary><p>選手・保護者の情報は、受付管理、決済確認、会場案内、緊急連絡のために使用します。参加者一覧は一般公開しません。写真・動画の公式掲載は任意の同意とし、不同意でも参加できます。健康面で配慮が必要な場合は、一般フォームへ詳細を入力せず、事前にRBAへ直接ご相談ください。</p></details>
    <p><a href="mailto:riot.training.base@gmail.com?subject=11%2F14%E6%B2%96%E7%B8%84%E3%82%AF%E3%83%AA%E3%83%8B%E3%83%83%E3%82%AF">お問い合わせ：riot.training.base@gmail.com</a></p><p className={styles.fine}>主催：Riot Basketball Academy（RBA）</p>
  </section>
</div></SiteFrame>;}
