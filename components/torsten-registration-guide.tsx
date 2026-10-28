import { ArrowUpRight, ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { torstenRegistrationUrl } from "./programme-data";
import { clinicFaqs, clinicFormats, clinicHelpUrl, clinicSharePath } from "@/lib/torsten-clinic";
import styles from "./torsten-conversion.module.css";

export function TorstenRegistrationGuide() {
  return <section className={`section-pad ${styles.guide}`} id="participation" aria-labelledby="participation-title">
    <p className="section-index">参加方法を選ぶ</p>
    <h2 id="participation-title">水曜の練習と重なっても、<br/>学ぶ時間を選べます。</h2>
    <p>2026年11月25日（水）20:00〜21:30。英語講義・日本語逐次通訳付きのオンライン講習です。</p>
    <div className={styles.formats}>{clinicFormats.map(format => <article key={format.id} className={styles.format}>
      <span className={styles.tag}>{format.id === "live" ? "当日、Zoomで受講" : "開催後、自分の時間に"}</span>
      <h3>{format.name}</h3><p className={styles.price}>{format.price}<small>（税込・1名）</small></p>
      <p><strong>{format.when}</strong></p><p>{format.benefit}</p>
      <a className="button button-orange" href={torstenRegistrationUrl} target="_blank" rel="noreferrer">{format.name}の申込フォームへ<ArrowUpRight size={17}/></a>
      <small>フォーム内で「{format.choice}」を選んでください。</small>
    </article>)}</div>
    <div className={styles.steps}>
      <h3><CheckCircle2 size={22}/>フォーム送信後、お支払いで申込完了。</h3>
      <ol><li><strong>参加形式を選んで入力</strong><span>既存のGoogleフォームで氏名・メールアドレスなどを入力します。</span></li>
      <li><strong>送信後の確認画面から決済へ</strong><span>選んだ参加形式の決済リンクに進みます。</span></li>
      <li><strong>お支払いを完了</strong><span>フォーム送信だけでは、申込は確定しません。</span></li></ol>
      <p>送信後の画面を閉じた方は、重複して申し込まず、RBAへご連絡ください。</p>
      <div className={styles.links}><a href={clinicHelpUrl("申込・お支払い手続きの相談")}><Mail size={17}/>申込・支払いについて相談する</a><a href={clinicHelpUrl("銀行振込の相談")}>銀行振込を相談する<ArrowRight size={17}/></a></div>
    </div>
    <div className={styles.faq}><h3>参加前によくある質問</h3>{clinicFaqs.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
    <div className={styles.team}><div><h3>同じ現場の指導者にも、この学びを。</h3><p>チーム内で転送できる、対象別の短い案内文を用意しました。</p></div><a className="button button-dark" href={clinicSharePath}>紹介文を選んでコピー<ArrowRight size={17}/></a></div>
  </section>;
}
