import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import { OkinawaClinicEntry } from "@/components/okinawa-clinic-entry";
import { OKINAWA_CLINIC as clinic } from "@/lib/clinics/okinawa";
import styles from "@/components/okinawa-clinic.module.css";

export const metadata:Metadata={title:"11/14 RBA沖縄クリニック｜小学4年〜中学3年・3,300円",description:"2026年11月14日（土）16:00〜19:00、RBA沖縄クリニック。沖縄県南部で、バスケを思いきり楽しむ3時間。小学4年〜中学3年、定員50名、参加費3,300円（税込）。会場は申込者へ個別案内。先行受付から決済・参加確認まで公式ページで。",alternates:{canonical:`https://riotbasketballacademy.com${clinic.path}`}};
export default function Page(){return <SiteFrame locale="ja"><div className={styles.page}>
  <section className={styles.hero}><div><p className={styles.eyebrow}>RIOT BASKETBALL ACADEMY / OKINAWA</p><h1>沖縄でまた、<br/>一緒にバスケしよう。</h1><p className={styles.date}>{clinic.date}<br/>{clinic.time}</p><p className={styles.lead}>「もっと上手くなりたい」<br/>その気持ちを、コートで思いきり。<br/>身体の使い方からシュート、ゲームまで。新しい発見を、いつものプレーにつなげる3時間。</p><a className={styles.button} href="#entry">先行受付はこちら ↓</a></div><aside className={styles.ticket}><p className={styles.eyebrow} style={{color:"#587344"}}>RBA 沖縄クリニック</p><dl><dt>対象</dt><dd>小学4年〜中学3年生</dd><dt>定員</dt><dd>50名</dd><dt>会場</dt><dd>沖縄県南部<br/><small>申込者へ個別にご案内</small></dd><dt>日時</dt><dd>11月14日（土）<br/>16:00〜19:00</dd></dl><div className={styles.price}>¥3,300 <small>税込／選手1名</small></div><p className={styles.fine}>会場の予約確定後に決済受付を開始します。先行受付だけでは参加確定・課金は発生しません。</p></aside></section>
  <section className={styles.section}><h2>いつものプレーに、新しい発見を。</h2><div className={styles.grid}>{[["01","身体とボールの基本","止まる・方向を変える・バランスを保つ。ボールを扱う動きと一緒に、プレーの土台を整えます。"],["02","シュートとフィニッシュ","近い距離から動作を確認し、パスを受けて打つ・ゴールへ向かう場面へつなげます。"],["03","見て、選んで、プレーする","少人数のゲームで、味方と守備を見ながら判断。学んだことを実際のプレーで試します。"]].map(([n,t,b])=><article className={styles.card} key={n}><span className={styles.number}>{n}</span><h3>{t}</h3><p>{b}</p></article>)}</div><p className={styles.fine}>練習内容・組分け・時間配分は、参加人数、学年、経験、当日の状態に合わせて調整します。休憩・水分補給を取りながら進めます。</p><p><strong>久しぶりの方も、初めての方も。沖縄のコートで待っています。</strong></p></section>
  <section className={styles.section}><h2>申込から当日まで、3つのステップ。</h2><div className={styles.grid}>{[["01","選手情報を登録","保護者のRBA IDでログインし、選手1名ずつ氏名・学年・緊急連絡先を登録します。"],["02","会場確定後にお支払い","会場の予約確定後、このページに決済ボタンが表示されます。参加費は1名3,300円（税込）。お支払いの確認後に参加確定です。"],["03","会場案内を確認して参加","会場の詳細はRBAから個別にご案内します。申込時のメールアドレスとMY HOME COURTのお知らせをご確認ください。"]].map(([n,t,b])=><article className={styles.card} key={n}><span className={styles.number}>STEP {n}</span><h3>{t}</h3><p>{b}</p></article>)}</div></section>
  <section className={styles.section} id="entry"><h2>お申し込み</h2><OkinawaClinicEntry/></section>
  <section className={styles.section}><h2>参加前にご確認ください。</h2>
    <details className={styles.details} open><summary>会場について</summary><p>会場名・所在地・入館方法は申込者へ直接お知らせします。会場の予約確定前は先行受付のみとし、参加費は請求しません。正式案内をご確認のうえ、お支払いへお進みください。現在の受付状況は、上の申込欄でご確認いただけます。</p></details>
    <details className={styles.details}><summary>持ち物・当日の流れ</summary><p>体育館用シューズ、運動できる服装、飲み物、タオルをお持ちください。ボールの持参要否、集合時間、駐車・送迎については会場案内と併せてお知らせします。開催時間は16:00〜19:00です。</p></details>
    <details className={styles.details} open><summary>キャンセル・返金</summary><p>RBAの共通規定に基づき、11月6日までのキャンセルは100％返金、11月7〜10日は50％返金、11月11日〜当日・無断欠席は原則返金なしとなります（日本時間・ご連絡の受信日を基準）。RBA都合で中止する場合は、対象参加費の全額返金または振替をご案内します。ご連絡は、申込時のメールアドレスと受付番号を添えて、下記窓口へお願いします。</p></details>
    <details className={styles.details}><summary>定員・キャンセル待ち</summary><p>定員は50名です。申込受付数が定員に達した場合は、キャンセル待ちとして受け付けます。キャンセル待ちの方には決済をお願いしません。先行受付は参加確定ではなく、会場確定後の正式案内・支払確認をもって参加確定となります。</p></details>
    <details className={styles.details}><summary>個人情報・写真・安全について</summary><p>選手・保護者の情報は、受付管理、決済確認、会場案内、緊急連絡のために使用します。参加者一覧は一般公開しません。写真・動画の公式掲載は任意の同意とし、不同意でも参加できます。健康面で配慮が必要な場合は、一般フォームへ詳細を入力せず、事前にRBAへ直接ご相談ください。</p></details>
    <p><a href="mailto:riot.training.base@gmail.com?subject=11%2F14%E6%B2%96%E7%B8%84%E3%82%AF%E3%83%AA%E3%83%8B%E3%83%83%E3%82%AF">お問い合わせ：riot.training.base@gmail.com</a></p><p className={styles.fine}>主催：Riot Basketball Academy（RBA）</p>
  </section>
</div></SiteFrame>;}
