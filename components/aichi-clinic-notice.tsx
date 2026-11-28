import { aichiClinic, isAichiClinicUpcoming } from "@/lib/aichi-clinic-2027";
export function AichiClinicNotice(){
 if(!isAichiClinicUpcoming())return null;
 return <article className="border border-neutral-300 bg-white p-5 text-neutral-900">
  <p className="text-xs font-black tracking-widest">2027.02.23 / AICHI</p>
  <h2 className="mt-2 text-xl font-black">{aichiClinic.title}</h2>
  <p className="mt-2 text-sm">2月23日（火・祝）9:00〜17:00｜愛知県豊田市（会場は後日案内）｜早割あり・事前決済制</p>
  <p className="mt-2 text-sm font-bold">早割：半日6,600円／終日11,000円（税込）｜1/31まで</p>
  <a className="mt-4 inline-block font-bold underline underline-offset-4" href={aichiClinic.path}>開催詳細・受付状況を見る →</a>
 </article>;
}
