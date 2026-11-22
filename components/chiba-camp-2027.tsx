import Image from "next/image";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";

type Lang = "ja" | "en";
const registrationJa = "https://form.jotform.com/263252863924059";
const registrationEn = "https://form.jotform.com/263253268053052";
const cancellation = "https://riotbasketballacademy.com/ja/cancellation";
const plans = [
  { id: "two", dateJa: "3月27日（土）＋28日（日）", dateEn: "Mar 27 & 28", priceJa: "24,200", priceUsd: "219", hrefJa: "https://book.stripe.com/8x27sN0PRdPSbmZ78j7EQ21", hrefUsd: "https://book.stripe.com/14AdRb5676nqfDfakv7EQ27" },
  { id: "sat", dateJa: "3月27日（土）のみ", dateEn: "Mar 27 only", priceJa: "14,300", priceUsd: "129", hrefJa: "https://book.stripe.com/eVq00laqr5jm62F2S37EQ22", hrefUsd: "https://book.stripe.com/14A8wR1TVcLO62F50b7EQ28" },
  { id: "sun", dateJa: "3月28日（日）のみ", dateEn: "Mar 28 only", priceJa: "14,300", priceUsd: "129", hrefJa: "https://book.stripe.com/aFaaEZ6ab8vy4YBgIT7EQ23", hrefUsd: "https://book.stripe.com/9B6eVf7ef3be0Il8cn7EQ29" },
] as const;

export function ChibaCamp2027({ locale }: { locale: Lang }) {
  const ja = locale === "ja";
  return <SiteFrame locale={locale}><main className="bg-[#f5f3ed] text-[#111]">
    <section className="bg-[#ff6b00] px-5 py-10 text-black sm:py-16" aria-labelledby="camp-title">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-4 border-black pb-5">
          <div className="flex items-center gap-3"><Image src="/rba-logo-original.jpg" width={60} height={72} alt="Riot Basketball Academy official logo" className="h-[72px] w-[60px] object-contain"/><span className="text-sm font-black tracking-widest">RIOT BASKETBALL<br/>ACADEMY</span></div>
          <div className="text-right text-xs font-black uppercase tracking-[.12em]">RBA × HBC WOLVES<br/>CHIBA / KANZAKI / 2027</div>
        </div>
        <p className="mt-9 text-sm font-black tracking-[.24em]">{ja ? "千葉・神崎／育成キャンプ 2027" : "CHIBA DEVELOPMENT CAMP 2027"}</p>
        <h1 id="camp-title" className="mt-5 text-[clamp(3rem,9vw,7.7rem)] font-black leading-[1] tracking-[-.08em]">{ja ? <>練習を、<br/>試合の力へ。</> : <>FROM PRACTICE<br/>TO THE GAME.</>}</h1>
        <p className="mt-7 max-w-3xl text-xl font-black leading-relaxed sm:text-3xl">{ja ? "見て、選んで、プレーする。自分で判断する2日間。" : "Read. Decide. Play. Two days of basketball development."}</p>
        <div className="mt-8 border-y-4 border-black py-5">
          <p className="text-[clamp(2.2rem,6.2vw,5.7rem)] font-black leading-none">2027.03.27 — 03.28</p>
          <p className="mt-3 text-base font-bold sm:text-xl">{ja ? "千葉県神崎町｜U12・U15｜男女・海外選手も歓迎" : "Kanzaki, Chiba, Japan | U12 / U15 | Boys & Girls | International players welcome"}</p>
        </div>
        <p className="mt-5 text-sm font-semibold">{ja ? "会場の正式な所在地・集合詳細は、申込・入金確認済みの保護者へ個別にお送りします。" : "Exact venue address and meeting information will be emailed privately after application and payment verification."}</p>
        <a className="mt-8 inline-flex min-h-16 items-center bg-black px-8 py-4 text-lg font-black text-white hover:bg-[#242424]" href="#registration">{ja ? "申込・決済へ進む ↗" : "REGISTER & PAY ↗"}</a>
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-5 py-12 sm:py-16" aria-labelledby="features">
      <p className="text-xs font-black tracking-[.23em] text-[#be4a00]">WHY THIS CAMP / THE GAME IS THE CLASSROOM</p>
      <h2 id="features" className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">{ja ? "試合で使える判断を、育てる。" : "Develop decisions that matter in games."}</h2>
      <div className="mt-8 grid gap-3 md:grid-cols-3">
        {[
          ["01 / READ", ja ? "相手と味方を見る" : "Read the game", ja ? "相手、味方、空いている場所。プレー前に何を見ていたかを考えます。" : "Recognize defenders, teammates and usable space before you act."],
          ["02 / DECIDE", ja ? "自分で選ぶ" : "Make decisions", ja ? "1対1・2対2・3対3。決められた答えではなく状況から選びます。" : "Use 1v1, 2v2 and 3v3 to discover options rather than repeat a fixed answer."],
          ["03 / PLAY", ja ? "ゲームにつなげる" : "Transfer to 5v5", ja ? "実践・振り返りを通して、5対5で使える力へ。" : "Apply and reflect on your decisions in game situations."],
        ].map(([num,title,body])=><article className="border-t-4 border-black bg-white p-6" key={num}><p className="text-xs font-black tracking-widest text-[#ca4f00]">{num}</p><h3 className="mt-5 text-2xl font-black">{title}</h3><p className="mt-3 text-base leading-7">{body}</p></article>)}
      </div>
      <div className="mt-8 border-l-4 border-[#ff6b00] bg-white p-6">
        <strong className="block text-xl">{ja ? "成田空港から参加を検討する海外選手・ご家族へ" : "Travelling from overseas via Narita Airport?"}</strong>
        <p className="mt-2 leading-7">{ja ? "日本の選手と同じコートで学べます。航空券、宿泊、送迎はキャンプ参加費に含まれません。ご自身で手配のうえ、未成年者は保護者または適切な引率者の同伴・安全管理をお願いします。" : "Train alongside players in Japan. Flights, accommodation, meals and airport transfers are not included. Parents or responsible guardians must arrange travel, supervision and safeguarding for minors."}</p>
      </div>
    </section>

    <section id="registration" className="bg-[#111] px-5 py-14 text-white sm:py-20" aria-labelledby="register-title">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-black tracking-[.2em] text-[#ff9b5c]">STEP 01 / APPLICATION</p>
        <h2 id="register-title" className="mt-3 text-[clamp(2rem,5vw,4rem)] font-black">{ja ? "まず、保護者が申し込む。" : "First, submit the guardian application."}</h2>
        <p className="mt-5 max-w-3xl text-base leading-8">{ja ? "選手1名につき申込1件。参加プラン・選手氏名・保護者メールを登録してください。申込フォームとStripe決済は同じメールアドレスを使います。" : "One application per player. Enter your selected plan, player details and guardian email. Use the same guardian email at Stripe Checkout."}</p>
        <a href={ja ? registrationJa : registrationEn} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-16 items-center bg-[#ff6b00] px-8 py-4 text-lg font-black text-black hover:bg-[#ff9146]">{ja ? "保護者用申込フォームを開く ↗" : "OPEN APPLICATION FORM ↗"}</a>
        <p className="mt-3 text-sm text-white/75">{ja ? "フォーム送信だけでは参加確定になりません。続けて下のSTEP 02で決済してください。" : "Use the International Player Registration form, not the domestic JPY application. Submission alone does not confirm a place. Continue to STEP 02 and pay once in USD for the matching plan."}</p>
      </div>
    </section>

    <section id="payment" className="mx-auto max-w-6xl scroll-mt-8 px-5 py-14 sm:py-20" aria-labelledby="payment-title">
      <p className="text-xs font-black tracking-[.2em] text-[#be4a00]">STEP 02 / SECURE PAYMENT</p>
      <h2 id="payment-title" className="mt-3 text-[clamp(2rem,5vw,4rem)] font-black">{ja ? "申込プランを選んで、事前決済。" : "Pay for the plan you applied for."}</h2>
      <p className="mt-4 max-w-3xl leading-8">{ja ? "必ずSTEP 01で申込を済ませてから、そのフォームで選んだプランを1つだけ決済してください。日本円・税込。カード等のお支払いはStripeの安全な決済画面で処理されます。" : "Complete STEP 01 first, then pay once for the exact plan on your application. All international prices are fixed in US dollars (USD) and include tax in the stated price. Pay for the plan you chose on the international guardian form; Stripe securely processes payment."}</p>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {plans.map((p)=><article key={p.id} className="flex flex-col border-2 border-black bg-white p-6">
          <p className="text-xs font-black tracking-[.12em] text-[#c35206]">{p.id === "two" ? "2 DAYS / FULL CAMP" : "ONE DAY / DAY PASS"}</p>
          <h3 className="mt-4 text-xl font-black">{ja ? p.dateJa : p.dateEn}</h3>
          <p className="my-7 text-4xl font-black tracking-tight">{ja ? "¥" : "$"}{ja ? p.priceJa : p.priceUsd}<span className="ml-2 text-xs font-bold text-[#666]">{ja ? "税込／1名" : "USD / per player, fixed total"}</span></p>
          <a href={ja ? p.hrefJa : p.hrefUsd} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex min-h-14 items-center justify-center bg-[#ff6b00] px-5 py-3 text-center text-base font-black hover:bg-[#ff9146]">{ja ? "このプランをStripeで決済 ↗" : "PAY THIS PLAN WITH STRIPE ↗"}</a>
        </article>)}
      </div>
      <div className="mt-8 border-l-4 border-black bg-white p-6">
        <h3 className="text-lg font-black">{ja ? "二重決済を防ぐためのお願い" : "Avoid duplicate payments"}</h3>
        <p className="mt-3 leading-7">{ja ? "お子さま1名につきフォーム1件・決済1回です。決済の途中で画面を閉じた場合は、二度目の支払い前にStripeの領収メールをご確認ください。会場の詳細は支払完了画面に表示しません。" : "Submit one form and make one payment per player. If you closed Checkout, check your Stripe receipt email before paying again. The exact venue address will not appear on the payment page."}</p>
      </div>
      <p className="mt-6 text-sm leading-7">{ja ? "キャンセル・返金の条件は必ず決済前にご確認ください。" : "Before paying, please read the RBA refund and cancellation policy. The current official policy is in Japanese; contact RBA by email for an English explanation."} <a className="font-black underline" href={cancellation} target="_blank" rel="noopener noreferrer">{ja ? "公式キャンセル・返金規定 ↗" : "RBA Cancellation & Refund Policy ↗"}</a></p>
      <p className="mt-2 text-sm leading-7">{ja ? "宿泊・食事・交通・送迎は参加費に含まれません。宿泊施設や旅行会社とご自身で別途契約・精算してください。" : "The US-dollar fee is for basketball camp instruction only. Flights, hotel stays, meals, airport transfers, local transportation, visas and personal travel or health insurance are NOT included; please book and pay for them separately."}</p>
    </section>

    <section className="bg-[#ff6b00] px-5 py-12 text-black" aria-labelledby="final-step">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-black tracking-[.2em]">STEP 03 / RBA VERIFICATION</p>
        <h2 id="final-step" className="mt-3 text-3xl font-black sm:text-5xl">{ja ? "入金確認後に、会場を個別案内。" : "Venue details are emailed after verification."}</h2>
        <p className="mt-4 max-w-3xl text-base font-bold leading-8">{ja ? "RBAが申込情報とStripe決済を照合し、保護者メール宛に参加確定・集合時間・会場詳細をお送りします。海外からの参加、宿泊に関する質問もお問い合わせください。" : "RBA matches the international guardian application to the selected USD Stripe payment (same guardian email, player name and dates), then emails participation confirmation, meeting instructions and the private venue address. English-language administrative questions may be sent to the RBA contact email; on-court interpretation and airport transfers are not included."}</p>
        <p className="mt-6 text-sm font-black">Email: <a className="underline" href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a>　|　Instagram: @riot.basketball.academy</p>
        <div className="mt-9 border-t-2 border-black pt-5 text-xs font-bold"><Link href={ja?"/ja/camp":"/camp"}>{ja ? "RBA DEVELOPMENT CAMPへ戻る ↗" : "Back to RBA Development Camp ↗"}</Link>　|　<Link href={ja?"/events/chiba-development-camp-2027":"/ja/events/chiba-development-camp-2027"}>{ja ? "English ↗" : "日本語 ↗"}</Link></div>
      </div>
    </section>
  </main></SiteFrame>;
}
