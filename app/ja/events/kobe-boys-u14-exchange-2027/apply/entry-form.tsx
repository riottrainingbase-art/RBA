"use client";

import { useState, type FormEvent } from "react";

const plans = [
  { id: "individual_jan6", label: "個人｜1月6日のみ", total: 8800, deposit: 4400 },
  { id: "individual_jan7", label: "個人｜1月7日のみ", total: 8800, deposit: 4400 },
  { id: "individual_both", label: "個人｜1月6日＋7日", total: 15400, deposit: 7700 },
  { id: "team_jan6", label: "チーム｜1月6日のみ", total: 77000, deposit: 38500 },
  { id: "team_jan7", label: "チーム｜1月7日のみ", total: 77000, deposit: 38500 },
  { id: "team_both", label: "チーム｜1月6日＋7日", total: 143000, deposit: 71500 },
  { id: "selected", label: "RBA UNITED JAPAN選抜希望", total: 100000, deposit: 50000 },
] as const;
type Plan = typeof plans[number]["id"];
const yen = (n: number) => n.toLocaleString("ja-JP") + "円";
const field = "mt-2 w-full rounded-md border border-black/30 bg-white px-4 py-3 text-base outline-none focus:border-[#e66317] focus:ring-2 focus:ring-[#e66317]/20";
const label = "block text-sm font-bold";
const checks = "mt-1 h-5 w-5 shrink-0 accent-[#e66317]";
export default function EntryForm({ initialPlan, initialEmail = "", initialName = "" }: { initialPlan?: Plan; initialEmail?: string; initialName?: string }) {
  const [selected, setSelected] = useState<Plan>(initialPlan || "individual_jan6");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const current = plans.find(x => x.id === selected)!;
  const isTeam = selected.startsWith("team_");
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const form = new FormData(event.currentTarget);
    const value = (key: string) => String(form.get(key) || "").trim();
    const payload = {
      plan_key: selected,
      contact_name: value("contact_name"),
      contact_email: value("contact_email"),
      contact_phone: value("contact_phone"),
      participant_or_team: value("participant_or_team"),
      affiliation: value("affiliation"),
      age_jan2027: isTeam ? null : value("age_jan2027"),
      expected_player_count: isTeam ? value("expected_player_count") : null,
      adult_supervisor_count: isTeam ? value("adult_supervisor_count") : null,
      note: value("note"),
      guardian_authorized: form.get("guardian_authorized") === "yes",
      provisional_terms_accepted: form.get("provisional_terms_accepted") === "yes",
      privacy_accepted: form.get("privacy_accepted") === "yes",
      photo_marketing_consent: form.get("photo_marketing_consent") === "yes",
      website: value("website"),
    };
    setSending(true);
    setError("");
    try {
      const response = await fetch("/api/commerce/kobe-u14-deposit-intake", {
        method: "POST", headers: { "Content-Type": "application/json" }, cache: "no-store", body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.message || "お申込みの処理が完了しませんでした。");
      if (data.deposit_jpy !== current.deposit || typeof data.checkout_url !== "string" || !data.checkout_url.startsWith("https://buy.stripe.com/")) {
        throw new Error("請求金額を確認できません。決済せずRBAへお問い合わせください。");
      }
      window.location.assign(data.checkout_url);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "送信できませんでした。RBAへお問い合わせください。");
      setSending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-9 space-y-8 border-2 border-black bg-white px-5 py-8 shadow-[8px_8px_0_#171717] sm:px-9">
      <div><p className="text-xs font-black tracking-[.24em] text-[#da5c18]">REGISTRATION / CHECKOUT</p><h2 className="mt-3 text-3xl font-black">お申込み・前金決済</h2><p className="mt-3 text-sm leading-8">保護者またはチームの成人代表者が入力してください。カード番号はこの画面では収集せず、登録完了後にStripeの公式決済画面へ移動します。</p></div>
      <fieldset>
        <legend className="text-lg font-black">01. 参加プラン <span className="text-[#cc4800]">必須</span></legend>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {plans.map(p => <label key={p.id} className={"flex cursor-pointer gap-3 rounded border-2 p-4 " + (selected === p.id ? "border-black bg-[#fff0e3]" : "border-black/15")}>
            <input className="mt-1 h-5 w-5 shrink-0 accent-black" type="radio" name="plan_key" value={p.id} checked={selected === p.id} onChange={() => setSelected(p.id)} />
            <span className="min-w-0"><span className="block text-sm font-bold">{p.label}</span><span className="mt-1 block text-xs">税込総額 {yen(p.total)}</span><strong className="mt-1 block text-xl">申込時 {yen(p.deposit)}</strong></span>
          </label>)}
        </div>
        <div className="mt-5 border-l-4 border-[#f36f17] bg-[#fff9f2] px-5 py-4" aria-live="polite">
          <p className="font-black">お支払い予定の確認</p>
          <p className="mt-2 text-2xl font-black">{yen(current.deposit)} <span className="text-sm font-medium">（前金50％）</span></p>
          <p className="mt-2 text-sm">税込総額 {yen(current.total)} ／ 後日残金 {yen(current.total - current.deposit)}</p>
          <p className="mt-3 text-xs leading-6">選抜希望の場合、選考で選ばれなければ前金を全額返金します。チーム料金を選ぶ場合、チーム内の選手への個人料金の二重加算はありません。</p>
        </div>
      </fieldset>
      <fieldset className="space-y-5">
        <legend className="mb-4 text-lg font-black">02. 保護者・代表者の情報</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={label}>保護者／成人代表者氏名 <span className="text-[#cc4800]">*</span><input className={field} required name="contact_name" defaultValue={initialName} autoComplete="name" maxLength={100} placeholder="例：山田 花子" /></label>
          <label className={label}>メールアドレス <span className="text-[#cc4800]">*</span><input className={field} type="email" required name="contact_email" defaultValue={initialEmail} autoComplete="email" maxLength={200} placeholder="example@example.com" /></label>
          <label className={label}>連絡先電話番号 <span className="text-[#cc4800]">*</span><input className={field} required type="tel" name="contact_phone" autoComplete="tel" maxLength={18} placeholder="09012345678" /></label>
          <label className={label}>{isTeam ? "チーム名" : "選手氏名"} <span className="text-[#cc4800]">*</span><input className={field} required name="participant_or_team" maxLength={120} placeholder={isTeam ? "チーム正式名称" : "選手氏名"} /></label>
        </div>
        <label className={label}>所属クラブ・学校など（任意）<input className={field} name="affiliation" maxLength={120} /></label>
        {isTeam ? <div className="grid gap-5 sm:grid-cols-2">
          <label className={label}>予定選手数 <span className="text-[#cc4800]">*</span><input className={field} required type="number" name="expected_player_count" min={1} max={50} placeholder="10" /></label>
          <label className={label}>成人引率者数 <span className="text-[#cc4800]">*</span><input className={field} required type="number" name="adult_supervisor_count" min={1} max={30} placeholder="2" /></label>
        </div> : <label className={label}>2027年1月時点の年齢 <span className="text-[#cc4800]">*</span><input className={field} required type="number" name="age_jan2027" min={7} max={19} placeholder="13" /><span className="mt-2 block text-xs font-normal leading-6">男子U14の正式な生年月日基準は後日公表します。申込時点で参加資格の確定は行いません。</span></label>}
        <label className={label}>参加目的・相談事項（任意）<textarea className={field} rows={3} name="note" maxLength={800} placeholder="健康情報・アレルギー・旅券番号など、先行受付に不要な情報は記載しないでください。" /></label>
        <div aria-hidden="true" className="absolute -left-[10000px]"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      </fieldset>
      <fieldset className="space-y-4">
        <legend className="text-lg font-black">03. お支払い条件・同意</legend>
        <div className="rounded border border-black/20 bg-[#f7f5f1] px-5 py-4 text-sm leading-7">
          <strong>正式参加・対戦・出場時間を保証する申込ではありません。</strong>
          <p className="mt-2">会場・日時・年齢条件・選抜・宿泊や移動等の提供範囲がまだ確定していない有料仮申込です。前金は税込総額の50％に充当します。主催者都合による開催不能・会場確保不能、選抜不合格、正式条件への不同意、正式条件提示前の申込撤回は前金を全額返金します。</p>
          <p className="mt-2">正式条件を承諾した後の取消条件は、改めて書面で説明し同意を取得します。日本側の宿泊・交通・食事・保険等を無償提供する約束はありません。</p>
        </div>
        <label className="flex items-start gap-3 text-sm font-bold leading-7"><input className={checks} type="checkbox" name="guardian_authorized" value="yes" required /><span>私は未成年選手の保護者またはチームの権限ある成人代表者であり、仮申込に同意します。 <span className="text-[#cc4800]">*</span></span></label>
        <label className="flex items-start gap-3 text-sm font-bold leading-7"><input className={checks} type="checkbox" name="provisional_terms_accepted" value="yes" required /><span>選択プランの総額・今回の前金額・残金、および参加未確約と全額返金条件を理解し、仮申込します。 <span className="text-[#cc4800]">*</span></span></label>
        <label className="flex items-start gap-3 text-sm font-bold leading-7"><input className={checks} type="checkbox" name="privacy_accepted" value="yes" required /><span>申込管理・安全連絡・支払照合のため必要な個人情報を利用することに同意します。 <span className="text-[#cc4800]">*</span></span></label>
        <label className="flex items-start gap-3 text-sm leading-7"><input className={checks} type="checkbox" name="photo_marketing_consent" value="yes" /><span>写真・動画の広報利用に同意する（任意・未選択の場合は同意しません）。</span></label>
      </fieldset>
      <div className="border-t border-black/20 pt-6">
        <p className="text-sm font-bold">お支払い金額：<span className="text-2xl font-black">{yen(current.deposit)}</span></p>
        <p className="mt-2 text-xs leading-6">ボタンを押すと受付番号が作成され、金額・メールアドレスを固定したStripe公式ページへ移動します。カード決済が成功するまでは前金受領になりません。</p>
        {error && <p className="mt-4 border border-red-700 bg-red-50 p-4 text-sm text-red-900" role="alert">{error}　<a className="underline" href="mailto:riot.training.base@gmail.com">RBAに問い合わせる</a></p>}
        <button className="mt-5 min-h-16 w-full rounded bg-[#f36b16] px-6 py-4 text-lg font-black text-black disabled:cursor-not-allowed disabled:opacity-50" type="submit" disabled={sending}>{sending ? "申込番号を登録しています…" : "申込を登録して前金をStripeで支払う →"}</button>
        <p className="mt-3 text-center text-xs">決済サービス：Stripe ｜ 実際のお支払いはStripe画面で確定します</p>
      </div>
    </form>
  );
}
