import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "RBA UNITED｜企画一覧・無料エントリー｜MY HOME COURT",
  description:
    "所属チームを変えずに全国・世界へ。RBA UNITEDの神戸・グアムU14交流、韓国IYIBS 2027、深圳U12関東交流の対象・日程・費用案・募集段階を比べ、各企画の無料事前登録へ進めます。",
  alternates: { canonical: "/ja/my-homecourt/united" },
};

const programmes = [
  {
    code: "01 / JAPAN × GUAM",
    name: "神戸・関西｜男子U14 国際育成交流",
    target: "男子U14／国内の個人選手・チーム",
    date: "2027年1月6〜7日を中心に調整中",
    place: "兵庫県・神戸／関西エリア（体育館未確保）",
    detail:
      "グアムの男子U14チームの来日に合わせ、合同練習や国際交流試合を計画。グアム側の来日予定は1月5日、帰国予定は1月10日。1月5日の日本側練習と1月9日の追加交流は別途調整中です。",
    pricing: [
      "RBA UNITED選抜育成プログラム：選手1名100,000円（税込予定・提案額）。前金50,000円＋残金50,000円を想定。選考・正式条件への同意後にのみ請求。",
      "一般個人交流：1日8,800円／2日15,400円（参考案）。",
      "一般チーム交流：1日77,000円／2日143,000円（参考案）。チーム枠と個人枠の重複請求はしません。",
    ],
    notes:
      "選抜プログラムと一般交流は別の参加区分です。宿泊・移動・食事は上記参加費に含まれず、協賛提供も未確約。会場・競技時間・資格・保険・引率・最終料金・返金条件は未確定です。",
    form: "https://form.jotform.com/263188088558069",
    button: "神戸・グアム交流の無料意向登録へ",
    who: "国内の個人選手は保護者、チームは代表者から",
  },
  {
    code: "02 / KOREA",
    name: "韓国・仁川｜IYIBS 2027",
    target: "男女U12・U15・U17／選考エントリー",
    date: "2027年1月28〜31日（企画調整中）",
    place: "韓国・仁川",
    detail:
      "所属チームとは別のRBA UNITEDとして、大会と国際経験に挑戦する遠征構想です。対象カテゴリーと大会側の生年月日基準を確認したうえで選考します。無料応募の時点では大会登録・遠征契約は成立しません。",
    pricing: [
      "先行238,000円／通常248,000円（税込想定・参考案／選手1名）。正式販売価格ではありません。",
      "日本発着の航空券は別途。前金50％・残金50％は、正式契約と保護者同意後の支払方法案です。",
    ],
    notes:
      "航空券・旅行契約主体・引率と保険・最終提供内容・取消返金条件は確認中です。現在、前金や旅行代金は徴収しません。",
    form: "https://form.jotform.com/263207310187047",
    button: "韓国遠征の無料選考エントリーへ",
    who: "対象選手の保護者から",
  },
  {
    code: "03 / JAPAN × SHENZHEN",
    name: "関東｜深圳U12男子チームとの交流",
    target: "国内U12男子チームの指導者・代表者",
    date: "2027年2月10日来日予定／交流日は未定",
    place: "関東エリア（会場未確定）",
    detail:
      "深圳 Ciroo Basketball Academyの11〜12歳男子約10名が来日予定です。約7日間の滞在中に、日本のU12チームとの5対5交流試合や合同練習の可能性を調べています。",
    pricing: ["参加費・申込条件は未定。現在は指導者・チーム代表者による無料の事前意向登録のみ。"],
    notes:
      "対戦、合同練習、実施日、会場はいずれも確定していません。選手本人の詳細な個人情報はこの段階で収集しません。",
    form: "https://form.jotform.com/263217708013047",
    button: "関東U12交流の無料意向登録へ",
    who: "国内U12チームの指導者・代表者のみ",
  },
] as const;

const faqs = [
  ["「無料エントリー」で参加が決まりますか？", "いいえ。参加希望をお聞きするための受付です。出場・選考通過・参加枠・試合・会場・予約を保証するものではありません。"],
  ["前金はいつ払いますか？", "今は支払いません。神戸選抜プログラムの前金50,000円や韓国遠征の前金50％は、開催と提供条件・年齢資格・安全管理・返金規約の確認、個別の参加決定および保護者同意後にのみ案内する予定です。"],
  ["所属クラブを辞める必要はありますか？", "ありません。RBA UNITEDは、大会・遠征・国際交流ごとに結成する期間限定の取り組みです。既存の所属活動を大切にしたまま挑戦できます。"],
  ["個人とチーム、どちらからでも参加希望を出せますか？", "企画によって異なります。神戸は個人・チームの希望登録、韓国は選手の選考エントリー、深圳との関東交流は国内チーム指導者の意向登録です。上の「対象」を確かめてください。"],
] as const;

export default function UnitedHomecourtEntryPage() {
  return (
    <main className="min-h-screen bg-[#f7f6f2] text-[#171717]">
      <header className="border-b border-[#deded7] bg-white px-5 py-4 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <Link href="/ja/my-homecourt" className="font-black tracking-wide">RBA <span className="text-[#ad5027]">MY HOME COURT</span></Link>
          <Link href="/ja/united" className="text-sm font-bold underline underline-offset-4">RBA UNITEDとは？</Link>
        </div>
      </header>
      <section className="bg-[#191919] px-5 py-14 text-white sm:px-10 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black tracking-[0.24em] text-[#f5aa7d]">MY HOME COURT / RBA UNITED</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">
            所属はそのまま。<br />世界への一歩を、ここから。
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#ece5e1] sm:text-lg">
            RBA UNITEDは、ふだんの所属チームを離れずに国際交流や遠征に挑戦するためのプログラムです。
            自分に合う企画を選んで、まずは無料で参加希望を届けてください。
          </p>
          <div className="mt-7 flex flex-wrap gap-3 text-sm font-bold">
            <span className="border border-white/40 px-4 py-3">現在の受付：無料の事前登録</span>
            <span className="border border-white/40 px-4 py-3">参加確定・決済はまだ行いません</span>
          </div>
          <a href="#programmes" className="mt-8 inline-flex min-h-14 items-center justify-center rounded-lg bg-[#ffad79] px-7 py-4 text-base font-black text-[#171717] hover:bg-[#ffc49f]">
            企画を見て無料エントリーする ↓
          </a>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-10" aria-labelledby="steps">
        <h2 id="steps" className="text-2xl font-black sm:text-3xl">申込まで、3ステップ。</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["01", "企画を選ぶ", "年代・地域・日程・費用案・募集状況を比べます。"],
            ["02", "無料で希望登録", "企画ごとのフォームに進み、参加希望を伝えます。今は支払い不要です。"],
            ["03", "正式条件を確認", "会場・安全管理・費用・取消条件が確定した後、対象者に参加手続きを案内します。"],
          ].map(([num, title, body]) => (
            <article key={num} className="rounded-xl border border-[#dfdcd5] bg-white p-6">
              <span className="text-sm font-black text-[#b54d24]">{num}</span>
              <h3 className="mt-3 text-xl font-black">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#46423e]">{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="programmes" className="scroll-mt-6 bg-[#ece9e2] px-5 py-14 sm:px-10" aria-labelledby="programmes-title">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black tracking-[0.2em] text-[#a94824]">EXPLORE YOUR NEXT COURT</p>
          <h2 id="programmes-title" className="mt-2 text-3xl font-black sm:text-4xl">参加したい企画を選ぶ</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7">すべて事前意向受付の段階です。開催確定・試合出場確定・予約成立を意味しません。内容は2026年11月19日時点の確認情報と企画案です。</p>
          <div className="mt-8 grid gap-6">
            {programmes.map((item) => (
              <article key={item.code} className="overflow-hidden rounded-2xl border border-[#d0cdc6] bg-white shadow-sm">
                <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(270px,0.52fr)]">
                  <div>
                    <p className="text-xs font-black tracking-[0.18em] text-[#ac4a24]">{item.code}</p>
                    <h3 className="mt-3 text-2xl font-black leading-snug sm:text-3xl">{item.name}</h3>
                    <span className="mt-4 inline-flex rounded-full bg-[#fff0e2] px-3 py-2 text-xs font-black text-[#89401e]">無料の事前登録／開催条件調整中</span>
                    <dl className="mt-6 grid gap-3 text-sm leading-7">
                      <div><dt className="font-black">対象</dt><dd>{item.target}</dd></div>
                      <div><dt className="font-black">日程</dt><dd>{item.date}</dd></div>
                      <div><dt className="font-black">場所</dt><dd>{item.place}</dd></div>
                    </dl>
                    <p className="mt-5 text-sm leading-8 text-[#383531]">{item.detail}</p>
                  </div>
                  <div className="flex flex-col justify-between rounded-xl bg-[#f6f3ef] p-5">
                    <div>
                      <h4 className="text-lg font-black">参加費・支払いの目安</h4>
                      <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7">
                        {item.pricing.map((price) => <li key={price}>{price}</li>)}
                      </ul>
                      <p className="mt-4 border-t border-[#ddd7d0] pt-4 text-xs leading-6 text-[#5a534e]">{item.notes}</p>
                    </div>
                    <div className="mt-6">
                      <p className="mb-3 text-xs font-bold">登録者：{item.who}</p>
                      <a href={item.form} target="_blank" rel="noopener noreferrer" className="flex min-h-14 items-center justify-center rounded-lg bg-[#e36d37] px-4 py-4 text-center text-sm font-black text-white hover:bg-[#c8521e]">
                        {item.button} ↗
                      </a>
                      <p className="mt-2 text-center text-xs text-[#59534f]">外部の無料登録フォームが開きます。決済はありません。</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-5 py-14 sm:px-10" aria-labelledby="faq">
        <h2 id="faq" className="text-3xl font-black">よくある質問</h2>
        <div className="mt-6 space-y-3">
          {faqs.map(([question, answer]) => (
            <details key={question} className="group rounded-xl border border-[#d9d6d0] bg-white p-5">
              <summary className="cursor-pointer pr-4 text-base font-black">{question}</summary>
              <p className="mt-4 text-sm leading-8 text-[#4d4843]">{answer}</p>
            </details>
          ))}
        </div>
        <div className="mt-10 rounded-xl bg-[#252525] p-7 text-white">
          <h3 className="text-xl font-black">まずは、関心のある企画を選んでください。</h3>
          <p className="mt-3 text-sm leading-7 text-[#e7e0da]">無料の事前登録だけで、参加契約や支払い義務は生じません。正式な条件が整った段階で、参加するかどうか改めて判断できます。</p>
          <a href="#programmes" className="mt-5 inline-flex min-h-12 items-center rounded-lg bg-[#ffad79] px-5 py-3 font-black text-black">企画一覧に戻る ↑</a>
        </div>
        <p className="mt-8 text-center text-xs leading-6 text-[#67615b]">RBA UNITEDはDevelopment Campとは別の国際交流・大会・遠征企画です。募集条件、参加費と開催可否は企画ごとに更新します。</p>
      </section>
    </main>
  );
}
