import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "男子U14神戸国際交流｜参加区分・お支払いのご案内｜RBA",
  description: "2027年1月6・7日予定のRBA UNITED男子U14神戸国際交流。個人・チーム参加の予定料金を確認。会場・条件の確定後、安全なStripe決済へ進む専用ページです。",
  robots: { index: false, follow: false },
};

const apply = "https://form.jotform.com/263188088558069";
const active = process.env.KOBE_U14_CHECKOUT_ENABLED === "true" && Boolean(process.env.STRIPE_SECRET_KEY);
const rates = [
  { label: "個人・1月6日のみ", value: "individual / jan6", amount: "8,800円" },
  { label: "個人・1月7日のみ", value: "individual / jan7", amount: "8,800円" },
  { label: "個人・1月6日＋7日", value: "individual / both", amount: "15,400円" },
  { label: "男子U14チーム・1月6日のみ", value: "team / jan6", amount: "77,000円" },
  { label: "男子U14チーム・1月7日のみ", value: "team / jan7", amount: "77,000円" },
  { label: "男子U14チーム・1月6日＋7日", value: "team / both", amount: "143,000円" },
] as const;

export default function KobeCheckoutPage() {
  return <main className="min-h-screen bg-[#f8f3ec] text-[#111]">
    <header className="border-b border-black/15 bg-white"><div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
      <Link href="/ja/events/kobe-boys-u14-exchange-2027" className="flex items-center gap-3"><Image src="/rba-logo-original.jpg" alt="RBA" width={44} height={54} className="h-12 w-11 object-contain"/><span className="text-xs font-black leading-5">RIOT BASKETBALL<br/>ACADEMY</span></Link>
      <Link href="/ja/events/kobe-boys-u14-exchange-2027" className="text-sm font-bold underline">大会案内に戻る</Link>
    </div></header>
    <section className="bg-[#ff6b13] px-5 py-12"><div className="mx-auto max-w-5xl">
      <p className="text-xs font-black tracking-[.2em]">RBA UNITED / BOYS U14 / KOBE 2027</p>
      <h1 className="mt-3 text-[clamp(2.3rem,6vw,5rem)] font-black leading-[1.1]">申込内容を確認し、<br/>安全な決済へ。</h1>
      <p className="mt-5 max-w-3xl text-base font-bold leading-8">2027年1月6・7日の男子U14国際交流（神戸・関西エリア）。個人参加とチーム参加は別料金です。1月5日はグアム到着日、1月8〜9日は追加交流の検討日であり、本料金の対象外です。</p>
      <p className="mt-5 max-w-3xl border-l-4 border-black bg-white/90 p-4 text-sm leading-7 font-bold">{active ? "Stripeの決済ページに進めます。決済前に参加登録の内容・日程・参加規約を再度ご確認ください。" : "現在は申込意向の受付段階です。会場使用許可、年齢資格、競技時間と返金条件が未確定のため、カード決済は開始していません。正式受付の条件を満たしてから有効化します。"}</p>
    </div></section>
    <section className="mx-auto max-w-5xl px-5 py-12">
      <div className="mb-8 border-2 border-black bg-white p-6"><p className="text-xs font-black tracking-wide text-[#cf5414]">RBA UNITED JAPAN 選抜プログラム</p><h2 className="mt-2 text-2xl font-black">選抜プログラムは一般参加とは別です。</h2><p className="mt-3 text-sm leading-8">男子U14選抜プログラムの参加費案は税込総額100,000円（前金50,000円・残金50,000円）です。正式な選考・施設利用許可・年齢基準・提供内容・個別取消返金条件・保護者同意が確定するまで前金決済を開始しません。一般の参加費を選抜枠に二重請求しません。</p><Link href="/ja/events/kobe-boys-u14-exchange-2027/united" className="mt-4 inline-flex min-h-12 items-center border border-black bg-[#f2691b] px-5 py-3 font-black">選抜プログラムの料金・支払い手順を確認 →</Link></div>
      <h2 className="text-3xl font-black">料金・参加区分</h2>
      <p className="mt-3 text-sm leading-7">現時点の予定料金（税込・交通、宿泊、食事は別）。最終参加条件の確定時に見直す場合があります。チーム料金は男子U14選手10〜15名・1チーム単位で、チーム内の選手に個人料金は重複加算しません。</p>
      <div className="mt-6 overflow-x-auto rounded-lg border border-black/20 bg-white"><table className="w-full min-w-[350px] text-left text-sm"><thead className="bg-black text-white"><tr><th className="p-4">プラン</th><th className="p-4 text-right">税込料金</th></tr></thead><tbody>{rates.map((rate)=><tr className="border-b border-black/10" key={rate.value}><td className="px-4 py-3 font-bold">{rate.label}</td><td className="px-4 py-3 text-right font-black">{rate.amount}</td></tr>)}</tbody></table></div>
      <div className="mt-7 border-l-4 border-[#f06d12] bg-white p-5"><p className="text-lg font-black">参加登録を先に完了してください</p><p className="mt-2 text-sm leading-7">まだ送信していない場合は、選手・保護者またはチーム代表者の参加意向フォームをご記入ください。登録時と決済時のメールアドレスを同じにすると、照合しやすくなります。</p><a className="mt-4 inline-flex min-h-12 items-center bg-black px-6 py-3 font-black text-white" href={apply} target="_blank" rel="noopener noreferrer">男子U14参加フォームを開く ↗</a></div>
      {active ? <form action="/api/commerce/kobe-u14-checkout" method="POST" className="mt-9 space-y-5 border-2 border-black bg-white p-5 sm:p-8">
        <div><h2 className="text-2xl font-black">Stripe決済へ進む</h2><p className="mt-2 text-sm">参加申込時と同一の代表者情報をご入力ください。参加条件に同意した場合にのみ決済を開始します。</p></div>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-bold">参加区分<span className="text-red-600"> *</span><select name="category" required defaultValue="" className="mt-2 w-full rounded border border-black/30 p-3"><option value="" disabled>選択してください</option><option value="individual">個人参加（男子U14）</option><option value="team">チーム参加（10〜15名）</option></select></label>
          <label className="text-sm font-bold">参加日<span className="text-red-600"> *</span><select name="days" required defaultValue="" className="mt-2 w-full rounded border border-black/30 p-3"><option value="" disabled>選択してください</option><option value="jan6">1月6日のみ</option><option value="jan7">1月7日のみ</option><option value="both">1月6日＋7日</option></select></label>
          <label className="text-sm font-bold">保護者／チーム代表者氏名<span className="text-red-600"> *</span><input required name="responsible_name" minLength={2} maxLength={100} className="mt-2 w-full rounded border border-black/30 p-3" placeholder="氏名" /></label>
          <label className="text-sm font-bold">申込時のメールアドレス<span className="text-red-600"> *</span><input required type="email" name="email" maxLength={200} className="mt-2 w-full rounded border border-black/30 p-3" placeholder="name@example.com"/></label>
          <label className="text-sm font-bold">選手氏名またはチーム名<span className="text-red-600"> *</span><input required name="entry_name" minLength={2} maxLength={100} className="mt-2 w-full rounded border border-black/30 p-3" placeholder="個人：選手名／団体：チーム名"/></label>
          <label className="text-sm font-bold">フォーム受付番号（分かる場合）<input name="application_ref" maxLength={64} className="mt-2 w-full rounded border border-black/30 p-3" placeholder="未取得の場合は空欄で可"/></label>
        </div>
        <label className="flex items-start gap-3 text-sm leading-7"><input type="checkbox" name="guardian_or_team_consent" value="yes" required className="mt-2"/>私は保護者またはチームの正式な申込代表者であり、男子U14の参加資格を確認する必要があること、現時点の大会条件を理解しています。</label>
        <label className="flex items-start gap-3 text-sm leading-7"><input type="checkbox" name="accepted_terms" value="yes" required className="mt-2"/>私が申込内容・料金を確認し、<a className="underline" href="/ja/policies" target="_blank" rel="noopener noreferrer">RBA参加規約と返金規定</a>に同意します。二重決済を避けるため、支払済みの場合は再度支払わないことを確認しました。</label>
        <button type="submit" className="min-h-14 w-full bg-[#ff6709] px-6 py-4 text-lg font-black text-black">料金を確認してStripe決済へ進む →</button>
        <p className="text-xs leading-6">金額は決済画面で最終確認してください。誤った参加区分を選んだ場合は決済せずRBAにご連絡ください。</p>
      </form> : <div className="mt-9 border border-black/20 bg-[#fff9ee] p-6"><h2 className="text-2xl font-black">決済は準備中です</h2><p className="mt-3 text-sm leading-8">現時点ではStripeへの請求は行いません。参加希望を送信いただいた方には、会場・年齢基準・日程・最終料金・取消条件を確定後、RBAから正式な決済案内をお送りします。</p></div>}
      <section className="mt-12"><h2 className="text-2xl font-black">お支払いに関する注意事項</h2><ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7"><li>競技会場は神戸・関西エリアで調整中です。神戸国際大学体育館の使用許可は未取得です。</li><li>1月7日は地元学校の始業日で、利用時間を調整しています。対象となる生年月日の基準も最終調整中です。</li><li>RBA側の理由で開催できなくなった場合の返金・代替条件は、正式な申込開始前に明示します。</li><li>参加者の保険適用、救護、監督責任および撮影同意についても、正式案内を優先してください。</li></ul></section>
    </section><footer className="bg-black px-5 py-10 text-white"><div className="mx-auto max-w-5xl text-sm"><p className="font-black">RIOT BASKETBALL ACADEMY</p><p className="mt-3">お問い合わせ：<a href="mailto:riot.training.base@gmail.com" className="underline">riot.training.base@gmail.com</a></p></div></footer>
  </main>;
}
