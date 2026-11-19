import { SiteFrame } from "@/components/site-frame";
import { DAY_PASS_LABELS, dayPassInviteValid, dayPassPaymentsEnabled, findDayPassInvite } from "@/lib/okinawa-day-pass-payment";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "沖縄国際ユースキャンプ｜1日・2日間・放課後 参加費全額前払い",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default async function PaymentPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  const row = typeof token === "string" && /^[a-f0-9]{64}$/.test(token)
    ? await findDayPassInvite(token) : null;
  const canPay = dayPassPaymentsEnabled() && row && dayPassInviteValid(row)
    && (row.status === "approved" || row.status === "checkout_open");

  return <SiteFrame locale="ja">
    <main style={{maxWidth:680,margin:"0 auto",padding:"40px 24px 90px"}}>
      <p style={{fontSize:12,fontWeight:700,letterSpacing:"0.14em"}}>RBA / OKINAWA INTERNATIONAL YOUTH CAMP 2026</p>
      <h1 style={{fontSize:"clamp(26px,5vw,42px)",lineHeight:1.35,margin:"20px 0"}}>1日・2日間・放課後の参加費<br/>全額前払い</h1>
      <p>正式に受入条件を確認できた保護者・成人本人向けの決済画面です。会場での現金払い・後払いには対応していません。</p>
      <ol style={{lineHeight:1.85,display:"grid",gap:7,paddingLeft:24,margin:"26px 0"}}>
        <li>保護者からの無料参加希望と選手情報を受け付け</li>
        <li>RBAが施設の利用時間・参加定員・保護者引渡し・税込料金を審査</li>
        <li>正式条件に同意いただいた方にだけ個別の決済URLを発行</li>
        <li>Stripeで参加費を全額事前決済し、RBAが入金と参加情報を照合</li>
      </ol>
      {row?.status === "paid" ? (
        <section style={{border:"1px solid #a9cfad",padding:24,margin:"24px 0",background:"#f5fbf6"}}>
          <h2 style={{fontSize:21}}>このお申込みは入金確認済みです</h2>
          <p><strong>同じ参加費をもう一度決済しないでください。</strong>正式な集合場所や保護者の引渡しはRBAの個別案内をご確認ください。</p>
        </section>
      ) : canPay && row && typeof token === "string" ? <>
        <section style={{border:"1px solid #aaa",padding:24,margin:"24px 0"}}>
          <p style={{fontWeight:700}}>参加プラン：{DAY_PASS_LABELS[row.plan_code as keyof typeof DAY_PASS_LABELS]}</p>
          <p>受付番号：{row.application_ref}</p>
          <p style={{fontSize:30,fontWeight:800}}>全額 {(row.amount_jpy).toLocaleString("ja-JP")}円 <small style={{fontSize:13}}>税込</small></p>
          <p style={{fontSize:13}}>宿泊・食事・送迎なし。登録された保護者のメールアドレスで決済してください。複数名分を1回で払うリンクではありません。</p>
        </section>
        <form method="post" action="/api/camps/okinawa-2026/day-pass/payment" style={{display:"grid",gap:14}}>
          <input type="hidden" name="token" value={token}/>
          <label style={{display:"flex",gap:10,alignItems:"flex-start"}}>
            <input type="checkbox" required name="adult_consent" value="yes"/>
            <span>私は保護者または18歳以上の本人です。RBAから個別に案内されたプラン・人数・集合条件を確認しました。</span>
          </label>
          <label style={{display:"flex",gap:10,alignItems:"flex-start"}}>
            <input type="checkbox" required name="terms_accepted" value="yes"/>
            <span>参加費の全額前払い、<a href="/ja/cancellation">取消・返金条件</a>、実施日・参加内容を確認し、支払うことに同意します。</span>
          </label>
          <button type="submit" style={{padding:"16px",background:"#151515",color:"white",fontWeight:700,cursor:"pointer"}}>全額をStripeで事前決済する →</button>
        </form>
        <p style={{fontSize:13}}>決済後はカードの請求履歴とRBAからの確定メールをご確認ください。決済画面を閉じたり通信が切れた場合、再度支払わずにRBAへお問い合わせください。</p>
      </> : <section style={{border:"1px solid #aaa",padding:24,margin:"24px 0"}}>
        <h2 style={{fontSize:21}}>こちらの枠は、まだ決済できません</h2>
        <p>1日・2日間・放課後の受付は、体育館の正式利用時間・定員・スタッフ配置・料金・保護者確認が整った方にだけ個別案内します。案内がない場合は以下の無料相談フォームからご希望をお知らせください。既にお支払い済みの場合は、再決済をせずRBAにご確認ください。</p>
        <p style={{fontSize:13}}>ご案内済みのURLが期限切れの場合も、自動で新しい決済を開始しません。RBAが前回の入金を確認してから必要な手続きをご案内します。</p>
      </section>}
      <p><a href="https://form.jotform.com/263217090103041">1日・2日間・放課後参加の希望登録（無料） →</a></p>
      <p><a href="/ja/events/okinawa-international-camp-2026/apply">既存3日間・宿泊の正式申込へ →</a></p>
      <p style={{fontSize:13}}>お問い合わせ：riot.training.base@gmail.com</p>
    </main>
  </SiteFrame>;
}
