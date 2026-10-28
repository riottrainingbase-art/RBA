"use client";

import { OKINAWA_DOMESTIC_APPLICATION_URL } from "@/lib/okinawa-camp-registration";

import { useEffect, useState } from "react";
import { OKINAWA_CAMP_LOGISTICS_COPY } from "@/lib/okinawa-camp-logistics";
import type { CampChoice, campQuote } from "@/lib/okinawa-camp-pricing";
import { CAMP_CONTACT, CAMP_JAPAN_CONTACT, CAMP_OKINAWA_CONTACT, OKINAWA_RESIDENT_PRICES } from "@/lib/okinawa-camp-pricing";
import styles from "./okinawa-camp-checkout.module.css";

type Quote = Omit<ReturnType<typeof campQuote>, "checkoutUrl">;
export function OkinawaCampCheckout() {
  const [housing, setHousing] = useState(true);
  const [players, setPlayers] = useState<1 | 2 | 3>(1);
  const [residence, setResidence] = useState<CampChoice["residence"] | "">("");
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const [registrationCompleted, setRegistrationCompleted] = useState(false);
  const [conditionsAccepted, setConditionsAccepted] = useState(false);

  useEffect(() => {
    if (!residence) return;
    const controller = new AbortController();
    const timer = setTimeout(() => { controller.abort(); setLoading(false); setError("料金の確認に時間がかかっています。再読み込みするか、メールでお問い合わせください。"); }, 15000);
    const q = new URLSearchParams({ housing: String(housing), players: String(players), residence });
    fetch(`/api/camps/okinawa-2026/checkout?${q}`, { cache: "no-store", signal: controller.signal })
      .then(async r => { if (!r.ok) throw new Error(); return r.json() as Promise<Quote>; })
      .then((data: Quote) => { if (!controller.signal.aborted) setQuote(data); })
      .catch(() => { if (!controller.signal.aborted) setError("料金を読み込めませんでした。再読み込みするか、メールでお問い合わせください。"); })
      .finally(() => { clearTimeout(timer); if (!controller.signal.aborted) setLoading(false); });
    return () => { clearTimeout(timer); controller.abort(); };
  }, [housing, players, residence, retry]);

  const contact = residence === "okinawa" ? CAMP_OKINAWA_CONTACT : residence === "other" ? CAMP_CONTACT : CAMP_JAPAN_CONTACT;

  function resetQuote(willLoad: boolean) {
    setQuote(null); setLoading(willLoad); setRegistrationCompleted(false); setConditionsAccepted(false); setError("");
  }

  async function checkout() {
    if (busy || !quote || quote.state !== "payable" || !registrationCompleted || !conditionsAccepted) return;
    setBusy(true); setError("");
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch("/api/camps/okinawa-2026/checkout", {
        method: "POST", headers: { "Content-Type": "application/json" }, signal: controller.signal,
        body: JSON.stringify({ housing, players, residence, registrationCompleted, conditionsAccepted, expectedTotal: quote.total, expectedRateKey: quote.rateKey }),
      });
      const data = await response.json() as { error?: string; quote?: Quote; checkoutUrl?: string };
      if (response.status === 409 && data.error === "price_changed" && data.quote) {
        setQuote(data.quote); setConditionsAccepted(false);
        setError("料金の適用期間が切り替わりました。新しい金額をご確認のうえ、確認欄にチェックしてください。"); return;
      }
      if (!response.ok || typeof data.checkoutUrl !== "string" || !data.checkoutUrl.startsWith("https://book.stripe.com/")) {
        if (data.error === "closed") { setQuote({ ...quote, state: "closed", perPlayer: null, total: null }); setError("オンライン決済の受付を終了しました。メールでお問い合わせください。"); return; }
        throw new Error();
      }
      window.location.assign(data.checkoutUrl);
    } catch {
      setError("決済画面を開けませんでした。この操作だけで請求されることはありません。通信状況をご確認のうえ再度お試しください。");
    } finally { clearTimeout(timer); setBusy(false); }
  }

  return <div className={styles.flow}><section className={styles.step}><h2>{OKINAWA_CAMP_LOGISTICS_COPY.ja.status}</h2><p>{OKINAWA_CAMP_LOGISTICS_COPY.ja.summary}</p><p>{OKINAWA_CAMP_LOGISTICS_COPY.ja.departure}</p></section>
    <section className={styles.step} aria-labelledby="choose-plan"><p className={styles.stepNumber}>01 / 参加窓口・プランを選ぶ</p><h2 id="choose-plan">参加方法を選んでください</h2>
      <div className={styles.fields}>
        <label>参加窓口<select value={residence} onChange={e => { resetQuote(Boolean(e.target.value)); setResidence(e.target.value as CampChoice["residence"] | ""); }}><option value="">選択してください</option><option value="okinawa">沖縄県民割引（日本円・RBA受付）</option><option value="japan">沖縄県外から国内参加（RBA受付）</option><option value="other">海外から参加（海外参加者向け料金）</option></select></label>
        <label>宿泊<select value={String(housing)} onChange={e => { resetQuote(Boolean(residence)); setHousing(e.target.value === "true"); }}><option value="true">宿泊・食事付き（2泊）</option><option value="false">宿泊なし（通い）</option></select></label>
        <label>参加人数<select value={players} onChange={e => { resetQuote(Boolean(residence)); setPlayers(Number(e.target.value) as 1 | 2 | 3); }}><option value="1">1名</option><option value="2">2名</option><option value="3">3名以上</option></select></label>
      </div>
      <div aria-live="polite" aria-atomic="true">
        {loading && <p role="status">現在の料金を確認しています…</p>}
        {quote?.state === "payable" && <div className={styles.quote}><p>{housing ? "宿泊・食事付き" : "宿泊なし"} · {players}名 · {quote.early ? "早割20％" : "通常期間"}{players === 2 ? " ＋ 2名割10％" : ""}</p><p className={styles.total}>合計 <strong>{quote.total}</strong> 米ドル</p><p>1名あたり {quote.perPlayer}米ドル × {players}名。日本円換算額はカード会社の為替・手数料により異なります。</p>{quote.early && <p>早割は10月31日23:59（台湾時間）まで。日本時間は11月1日0:59までです。割引は20％引き後に10％引きを適用します。</p>}</div>}
        {quote?.state === "local_review" && residence === "okinawa" && <div className={styles.notice}><h3>沖縄県民割引 / 日本円固定料金</h3><p>{housing ? "宿泊2泊3日" : "通い3日間"}：1名 <strong>{(quote.perPlayer ?? OKINAWA_RESIDENT_PRICES[housing ? "housing" : "day"]).toLocaleString("ja-JP")}円（税込）</strong></p>{quote.total !== null ? <p className={styles.total}>{players}名の合計 <strong>{quote.total.toLocaleString("ja-JP")}</strong> 円（税込）</p> : <p>3名以上は正確な人数をお知らせください。1名あたりの県民料金は変わりません。</p>}<p>{housing ? "宿泊・所定の食事・リネン・保険・宿泊中の見守りを含みます。" : "指導・交流プログラム・保険を含みます。食事・宿泊は含みません。"}交通費・送迎は別途です。海外向け早割・複数名割引との併用はありません。</p><p>申込メールに、選手・保護者の情報と希望プランをご記入ください。選手1名につき1回ずつお申し込みいただき、RBAからの参加条件・日本円でのお支払い方法の案内をお待ちください。</p><a className={styles.primary} href={OKINAWA_DOMESTIC_APPLICATION_URL}>県民割引でメール申込 ↗</a><p><a href="/ja/events/okinawa-international-camp-2026#okinawa-resident-discount">料金に含む内容・適用条件を見る →</a></p><p className={styles.note}>宿泊先は確保済みです。体育館の利用時間・追加スタッフは調整中です。申込メールの送信だけで参加確定・お支払いとはなりません。海外向け米ドル決済は使用しないでください。</p></div>}
        {quote?.state === "local_review" && residence !== "okinawa" && <div className={styles.notice}><h3>日本国内の参加はRBAで受け付けます</h3><p>申込メールに、選手・保護者の情報と希望プランをご記入ください。沖縄県内在住の方は、参加窓口で「沖縄県民割引」を選んでください。</p><p>県外から参加する方の料金・割引条件は、申込内容を確認したうえで個別にご案内します。海外参加者向けの米ドル料金でお支払いになる前にご相談ください。</p><a className={styles.primary} href={OKINAWA_DOMESTIC_APPLICATION_URL}>メールで申し込む ↗</a><p><a href="https://www.instagram.com/riot.basketball.academy/" target="_blank" rel="noopener noreferrer">メールが開かない場合はRBA公式InstagramからDM ↗</a></p><p className={styles.note}>riot.training.base@gmail.com<br/>申込メールの送信だけで参加確定・お支払いとはなりません。すでに申込・支払い済みの方は、重複せずRBAへご連絡ください。</p></div>}
        {quote?.state === "group_review" && <div className={styles.notice}><h3>3名以上はグループでご相談ください</h3><p>公式フォームは1回2名までです。参加者全員の申込と料金をまとめて確認します。1名用のリンクで人数分をお支払いになる前にお問い合わせください。</p><a className={styles.primary} href={contact}>グループ参加を相談する ↗</a></div>}
        {quote?.state === "closed" && <div className={styles.notice}><h3>オンライン決済の受付は終了しました</h3><p>開催開始後の参加・料金のご相談は、主催者へお問い合わせください。</p><a href={contact}>メールで問い合わせる ↗</a></div>}
      </div>
    </section>

    {quote?.state === "payable" && <>
      <section className={styles.step} aria-labelledby="register-first"><p className={styles.stepNumber}>02 / 海外参加者向けフォームで申し込む</p><h2 id="register-first">保護者・選手情報を登録する</h2><p>選択した宿泊区分・人数で公式フォームを開きます。登録後、このページへ戻ってください。すでに同じ内容で申し込んだ方は、重複登録せず次へ進めます。</p>
        <a className={styles.primary} href={quote.registrationUrl || undefined} target="_blank" rel="noopener noreferrer">公式申込フォームを別タブで開く ↗</a>
        <p className={styles.note}>公式フォームは海外参加者向けのSPARTANS側サイトです。日本国内の参加者は「日本国内から参加（RBA受付）」を選んでください。この画面から申込完了を自動確認する機能はありません。宿泊・人数を変更したときは、申込内容も一致しているかご確認ください。</p>
      </section>
      <section className={styles.step} aria-labelledby="pay-next"><p className={styles.stepNumber}>03 / 内容を確認して決済</p><h2 id="pay-next">合計 {quote.total}米ドルのお支払いへ</h2>
        <ul><li>宿泊付きは2泊・食事付き。航空券は別途です。</li><li>宿泊なしの食事、送迎の時間・条件・費用は、支払い前にお問い合わせください。</li><li>糸満青少年の家での宿泊先は確保済みです。体育館の利用時間・集合解散・追加スタッフ等は調整中です。お支払いは仮予約で、参加の最終確定ではありません。</li><li>RBA都合による中止・会場確保不可、最終確定前の辞退、最終条件に同意できない場合は、既存の仮予約条件に従い全額返金します。</li></ul>
        <label className={styles.check}><input type="checkbox" checked={registrationCompleted} onChange={e => setRegistrationCompleted(e.target.checked)}/>公式フォームで、同じ宿泊区分・人数・参加者の申込を済ませました。</label>
        <label className={styles.check}><input type="checkbox" checked={conditionsAccepted} onChange={e => setConditionsAccepted(e.target.checked)}/>金額・含まれる内容・調整中の事項・仮予約と返金条件を確認しました。</label>
        <button className={styles.primary} type="button" disabled={busy || !registrationCompleted || !conditionsAccepted} onClick={checkout}>{busy ? "決済画面を開いています…" : `${quote.total}米ドルの決済画面へ進む →`}</button>
        <p className={styles.note}>Stripeで申込時と同じメール・参加者全員の名前・申込日を入力してください。登録情報と入金は主催者が照合します。カード番号をこのページやメールで送る必要はありません。</p>
      </section>
      <section className={styles.step}><h2>お支払い後について</h2><p>決済画面の受付表示だけで、参加確定とはなりません。主催者からの案内をお待ちください。カードの利用履歴やStripeの通知がある場合は、再度決済せず、申込メールと参加者名を添えてお問い合わせください。</p><a href={contact}>支払い・申込について問い合わせる ↗</a></section>
    </>}
    {error && <div className={styles.error} role="alert"><p>{error}</p>{!quote && <button type="button" onClick={() => { resetQuote(Boolean(residence)); setRetry(n => n + 1); }}>料金を再読み込みする</button>}<a href={contact}>メールで問い合わせる ↗</a></div>}
    <noscript><p>日本国内からの参加は<a href={CAMP_JAPAN_CONTACT}>RBAへお問い合わせください</a>。海外からの参加は<a href="https://okinawa.camp/register">海外参加者向けフォーム</a>をご利用ください。</p></noscript>
  </div>;
}
