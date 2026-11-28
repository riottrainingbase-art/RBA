import { aichiClinic as event } from "@/lib/aichi-clinic-2027";
export function AichiClinicFees(){
 return <section className="my-6 border border-neutral-300 bg-white p-5 text-neutral-900" aria-labelledby="aichi-fees">
  <h2 id="aichi-fees" className="text-xl font-black">参加費（税込・1名）</h2>
  <p className="mt-2 font-bold">早割は{event.earlyDeadlineLabel}まで</p>
  <table className="mt-4 w-full text-left"><thead><tr className="border-b border-neutral-400"><th scope="col" className="py-2">参加区分</th><th scope="col">早割</th><th scope="col">通常</th></tr></thead><tbody>{([["午前／午後のみ","half"],["終日","full"]] as const).map(([label,plan])=><tr className="border-b border-neutral-300" key={plan}><th scope="row" className="py-3">{label}</th><td className="font-black">{event.fees[plan].early.toLocaleString("ja-JP")}円</td><td>{event.fees[plan].regular.toLocaleString("ja-JP")}円</td></tr>)}</tbody></table>
  <p className="mt-3 text-sm">事前決済制。2月1日以降は通常料金です。受付開始前は支払不要です。</p>
 </section>;
}
