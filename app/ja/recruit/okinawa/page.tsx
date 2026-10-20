import type { Metadata } from "next";

const address = "riot.training.base@gmail.com";
const subject = "RBA沖縄｜指導者・運営スタッフ候補へのお問い合わせ";
const body = "Riot Basketball Academy ご担当者様\n\n沖縄エリアの指導者・運営スタッフ候補について、事前面談を希望します。\n\n希望する役割：\n活動可能地域：\n活動可能な曜日・時間帯：\n指導・運営経験（概要）：\n\nよろしくお願いいたします。";
const emailHref = `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const metadata: Metadata = {
  title: "沖縄エリア｜指導者・運営スタッフ候補の事前面談 | Riot Basketball Academy",
  description: "RBA沖縄エリアのU12・U15指導者、指導補助、現地運営スタッフ候補との事前面談受付。活動・契約条件は個別協議。採用・担当確約ではありません。",
  robots: { index: false, follow: false },
};

const positions = [
  { name: "U12・U15 指導者候補", description: "選手の発達に応じた練習設計、ゲーム中の判断、試合での学習機会づくり" },
  { name: "アシスタントコーチ候補", description: "指導補助、活動記録、選手の安全確認、コーチ間の情報共有" },
  { name: "現地運営スタッフ候補", description: "会場調整、連絡体制、記録・報告、安全管理、経費の手続支援" },
];

export default function OkinawaCoachInterestPage() {
  return <main className="min-h-screen bg-[#0b0d10] text-white">
    <div className="mx-auto max-w-3xl px-5 py-12 md:py-20">
      <p className="text-xs font-bold tracking-[.2em] text-neutral-400">RIOT BASKETBALL ACADEMY / OKINAWA</p>
      <h1 className="mt-6 text-4xl font-black leading-tight md:text-5xl">沖縄で、育成をともにつくる。</h1>
      <p className="mt-6 text-lg leading-8 text-neutral-300">RBAでは沖縄エリアでの活動体制の充実に向け、バスケットボール指導者・指導補助・運営スタッフ候補との事前面談を検討しています。</p>
      <div className="mt-7 rounded-lg border border-neutral-600 p-5 text-sm leading-7 text-neutral-200">
        <strong>現在は候補者との事前相談段階です。</strong> 募集枠・雇用形態・報酬・担当回数・活動会場・採用時期は未確定で、個別に協議します。応募・面談は採用や既存チームの担当を約束するものではありません。
      </div>
      <section className="mt-12"><h2 className="text-2xl font-bold">相談したい役割</h2><div className="mt-5 grid gap-4">{positions.map(p=><article key={p.name} className="rounded-lg border border-neutral-700 p-5"><h3 className="text-lg font-bold">{p.name}</h3><p className="mt-2 leading-7 text-neutral-300">{p.description}</p></article>)}</div></section>
      <section className="mt-12"><h2 className="text-2xl font-bold">大切にする考え方</h2><ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-neutral-300"><li>威圧や暴言に頼らず、選手の主体性と安全を尊重する</li><li>U12・U15の発達差に配慮し、学習・プレー機会を確保する</li><li>判断・スペーシング・ゲーム状況を意識した練習を考える</li><li>活動計画・実施記録・連絡・経費管理を誠実に行う</li><li>子どもの保護、個人情報、適切な境界を大切にする</li></ul></section>
      <section className="mt-12 rounded-xl bg-white p-7 text-black"><h2 className="text-2xl font-bold">まずは事前面談から</h2><p className="mt-3 leading-7">沖縄県南部を中心に活動可能な方を想定しています。学生・若手・経験者を問わず、役割に応じてお話を伺います。活動日・報酬・契約形態は条件が整理でき次第、事前に説明します。</p><p className="mt-3 text-sm">最初の連絡では、氏名・希望する役割・活動可能地域と時間・経験概要だけをお知らせください。選手名簿や未成年者の個人情報、勤務先の機密情報は送らないでください。</p><a className="mt-6 inline-block rounded-md bg-black px-6 py-3 font-bold text-white" href={emailHref}>メールで事前面談を相談する →</a><p className="mt-3 text-sm">連絡先：{address}</p></section>
      <p className="mt-8 text-sm leading-7 text-neutral-400">本ページは将来の人材候補との接点づくりを目的とし、特定の現任指導者の交代・契約終了を告知するものではありません。</p>
    </div>
  </main>;
}
