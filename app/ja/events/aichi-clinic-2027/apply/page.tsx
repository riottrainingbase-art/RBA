import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import { aichiClinic as event } from "@/lib/aichi-clinic-2027";
export const metadata:Metadata={title:"愛知クリニック｜参加申込のご案内",robots:{index:false,follow:true}};
export default function Page(){
 return <SiteFrame locale="ja"><main className="mx-auto max-w-3xl px-5 py-12"><a href={event.path}>← 開催詳細</a><h1 className="mt-5 text-3xl font-black">参加申込</h1><p className="mt-3 font-bold">{event.dateLabel} {event.time}</p><p className="mt-6 border-l-4 border-orange-600 bg-neutral-100 p-5">受付準備中です。会場・対象学年・定員・参加費の正式確定後に受付を開始します。早割あり。会場は後日案内、参加費は事前決済制です。現在は申込送信・参加枠の予約はできません。</p><h2 className="mt-8 text-xl font-black">受付開始後の流れ</h2><ol className="mt-4 list-decimal space-y-2 pl-6"><li>保護者が選手情報と連絡先を登録する。</li><li>参加条件・キャンセル条件・早期割引の適用条件を確認する。</li><li>フォームからStripeで事前決済する（早割期間は対象料金を適用）。</li><li>申込・決済の照合後、参加確定の案内を受け取る。</li></ol><p className="mt-8"><a className="underline" href="/ja/contact">お問い合わせ</a></p></main></SiteFrame>;
}
