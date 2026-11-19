import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "にかほ市RBAクリニック｜地域主催者向けお支払い｜RBA",
  description: "2027年4月11日の地域主催者向けお支払い確認ページ。参加者向け決済ページではありません。",
  robots: { index: false, follow: false, noarchive: true },
};

const paymentLink = process.env.NIKAHO_2027_ORGANIZER_STRIPE_PAYMENT_LINK || "";
const paymentReady =
  process.env.NIKAHO_2027_ORGANIZER_CHECKOUT_ENABLED === "true" &&
  /^https:\/\/book\.stripe\.com\//.test(paymentLink);

export default function NikahoOrganizerPaymentPage() {
  return <SiteFrame locale="ja">
    <div className="min-h-[60vh] bg-[#f7f4ee] px-5 py-14 text-[#181818] sm:py-20">
      <div className="mx-auto max-w-3xl">
        <a href="/ja/events/nikaho-clinic-2027" className="text-sm font-bold underline">← 開催概要に戻る</a>
        <p className="mt-10 text-xs font-black tracking-[.2em] text-[#b5571e]">FOR THE LOCAL ORGANIZER / NOT FOR PLAYERS</p>
        <h1 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">地域主催者向け<br/>開催費のお支払い</h1>
        <p className="mt-5 text-sm leading-8">RBAにかほ市クリニック（2027年4月11日予定）の地域主催者向け確認窓口です。選手・保護者の参加料を支払うためのページではありません。</p>
        <div className="mt-8 border border-black/20 bg-white p-6">
          <h2 className="text-xl font-black">ご提案中の費用構成</h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div className="flex justify-between gap-4 border-b pb-3"><dt>クリニック指導料（税込）</dt><dd className="font-black">55,000円（ご提案額）</dd></div>
            <div className="flex justify-between gap-4 border-b pb-3"><dt>仙台からの交通費</dt><dd className="font-black">実費・別途精算予定</dd></div>
            <div className="flex justify-between gap-4 border-b pb-3"><dt>会場費・運営費</dt><dd className="font-black">地域主催者と別途確認</dd></div>
            <div className="flex justify-between gap-4"><dt>選手1人あたりの参加料</dt><dd className="font-black">地域ホスト側で調整</dd></div>
          </dl>
          <p className="mt-5 text-xs leading-7 text-neutral-600">主催者との金額合意、交通費の取扱い、会場利用許可、請求先、キャンセル・返金条件を確認するまで決済を解禁しません。費用の二重請求を避けるため、すでに支払済みの場合は再決済しないでください。</p>
        </div>
        {paymentReady ?
          <div className="mt-6 border-2 border-black bg-white p-6">
            <h2 className="text-xl font-black">Stripeでお支払い</h2>
            <p className="mt-3 text-sm leading-7">主催者ご担当者のみお進みください。決済前にStripe画面の金額と請求対象を必ずご確認ください。交通費はここでは徴収しません。</p>
            <a href={paymentLink} rel="noopener noreferrer nofollow" className="mt-5 inline-flex min-h-14 items-center bg-[#ff782b] px-7 py-4 text-base font-black text-black">主催者向けStripe決済へ進む ↗</a>
          </div> :
          <div className="mt-6 border-l-4 border-[#d46220] bg-[#fff9e8] p-6">
            <h2 className="text-xl font-black">現在、決済の受付は開始していません。</h2>
            <p className="mt-3 text-sm leading-8">正式な会場・契約条件・決済金額の確認が完了した後に、主催者へ個別に決済方法をご案内します。選手・保護者向けの先行案内登録は無料です。</p>
          </div>}
        <p className="mt-8 text-sm">お問い合わせ：<a className="underline" href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a></p>
      </div>
    </div>
  </SiteFrame>;
}
