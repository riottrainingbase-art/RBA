import Image from "next/image";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import { ChibaCamp2027Timetable } from "@/components/chiba-camp-2027-timetable";

type Lang = "ja" | "en";
const registrationJa = "https://form.jotform.com/263252863924059";
const registrationEn = "https://form.jotform.com/263253268053052";
const cancellation = "https://riotbasketballacademy.com/ja/cancellation";
const kozakiSource = "https://www.town.kozaki.chiba.jp/kanko_iju/";
const plans = [
  { id: "two", dateJa: "3月27日（土）・28日（日）", dateEn: "March 27 & 28", priceJa: "24,200", priceUsd: "219", hrefJa: "https://book.stripe.com/8x27sN0PRdPSbmZ78j7EQ21", hrefUsd: "https://book.stripe.com/14AdRb5676nqfDfakv7EQ27" },
  { id: "sat", dateJa: "3月27日（土）のみ", dateEn: "March 27 only", priceJa: "14,300", priceUsd: "129", hrefJa: "https://book.stripe.com/eVq00laqr5jm62F2S37EQ22", hrefUsd: "https://book.stripe.com/14A8wR1TVcLO62F50b7EQ28" },
  { id: "sun", dateJa: "3月28日（日）のみ", dateEn: "March 28 only", priceJa: "14,300", priceUsd: "129", hrefJa: "https://book.stripe.com/aFaaEZ6ab8vy4YBgIT7EQ23", hrefUsd: "https://book.stripe.com/9B6eVf7ef3be0Il8cn7EQ29" },
] as const;

const stories = [
  { id: "01", titleJa: "利根川と水運", titleEn: "The Tone River", textJa: "利根川の水運が、神崎町と江戸の人々を結んできました。", textEn: "The Tone River once connected Kozaki's local industries with Edo." },
  { id: "02", titleJa: "米・大豆・良質な水", titleEn: "Rice, soybeans and water", textJa: "豊かな土地の恵みが、酒・味噌・醤油などの醸造を支えました。", textEn: "Local crops and water supported the brewing of sake, miso and soy sauce." },
  { id: "03", titleJa: "発酵の里こうざき", titleEn: "A town of fermentation", textJa: "今も受け継がれる発酵食文化。神崎町が大切にしている土地の個性です。", textEn: "A fermentation-food tradition remains part of Kozaki's identity today." },
] as const;

const learning = [
  { num: "01 / SEE", titleJa: "相手と味方を見る", titleEn: "Notice", bodyJa: "プレーする前に、相手・仲間・使えるスペースを見つける。", bodyEn: "Recognise defenders, teammates and open space before acting." },
  { num: "02 / CHOOSE", titleJa: "自分で選ぶ", titleEn: "Decide", bodyJa: "1対1・2対2・3対3で、状況に合った選択を増やす。", bodyEn: "Use 1v1, 2v2 and 3v3 to explore realistic choices." },
  { num: "03 / APPLY", titleJa: "ゲームで試す", titleEn: "Apply", bodyJa: "うまくいった理由、次に試すことを振り返り、ゲームにつなげる。", bodyEn: "Try, reflect, then apply the learning in game situations." },
] as const;

const faqs = [
  { jaQ: "HBC Wolves以外の選手も参加できますか？", enQ: "Can players from other clubs join?", jaA: "はい。HBC Wolves以外の選手も個人で申し込めます。U12・U15の男女を対象にしています。", enA: "Yes. Boys and girls in U12/U15 from other clubs can register individually." },
  { jaQ: "1日だけの参加はできますか？", enQ: "Can my child attend for one day?", jaA: "できます。3月27日または28日のどちらかを選べます。両日とも、その日だけの参加者にも分かる導入を設けています。", enA: "Yes. Select March 27 or March 28. Each day's programme is designed to welcome first-time and day-only players." },
  { jaQ: "集合時刻と体育館の場所はどこで確認できますか？", enQ: "When will we receive the exact venue and meeting time?", jaA: "公開ページには学校名・詳細住所を載せていません。申込情報と入金をRBAで照合した後、保護者へ個別にご連絡します。9:15受付・16:15頃解散は現時点の予定です。", enA: "Exact school address and final meeting times are sent privately to guardians after RBA matches registration and payment. The 09:15–16:15 schedule is provisional." },
  { jaQ: "昼食や宿泊、送迎は参加費に含まれますか？", enQ: "Are meals, accommodation or transfers included?", jaA: "含まれません。昼食・飲料は各自でご準備ください。宿泊、航空券、交通、空港送迎などはご家庭で別途手配・精算してください。", enA: "No. Bring lunch and water. Accommodation, flights, local transport, airport transfers and personal insurance are not included." },
  { jaQ: "申込したら、その場で参加確定になりますか？", enQ: "Does registration alone confirm a place?", jaA: "いいえ。保護者が申込フォームを送信し、同じメールアドレスで該当プランを1回だけ決済してください。RBAによる照合後、参加確定の案内をお送りします。", enA: "No. Submit one guardian form per player, pay for the matching plan once using the same email, and wait for RBA's confirmation." },
  { jaQ: "持ち物とキャンセル規定を教えてください。", enQ: "What should players bring, and what about refunds?", jaA: "室内シューズ、運動着、飲料、昼食、タオルなどをご準備ください。キャンセル・返金条件は決済前に公式規定をご確認ください。", enA: "Bring indoor basketball shoes, sportswear, water, lunch and a towel. Please read the refund and cancellation policy before paying." },
] as const;

export function ChibaCamp2027({ locale }: { locale: Lang }) {
  const ja = locale === "ja";
  const registration = ja ? registrationJa : registrationEn;
  return (
    <SiteFrame locale={locale}>
      <main id="top" className="bg-[#f7f3eb] text-[#1b2925]">
        <nav aria-label={ja ? "ページ内メニュー" : "On-page navigation"} className="sticky top-0 z-30 border-b border-[#d8d0c0] bg-[#f7f3eb]/95 shadow-sm backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl items-center gap-5 overflow-x-auto px-5 py-3 text-[13px] font-bold whitespace-nowrap sm:gap-8 sm:text-sm">
            <a href="#top" className="shrink-0 text-[#27534c]">RBA / KOZAKI</a>
            <a href="#place" className="shrink-0 hover:underline">{ja ? "神崎町について" : "Kozaki"}</a>
            <a href="#learning" className="shrink-0 hover:underline">{ja ? "学ぶこと" : "Learning"}</a>
            <a href="#timetable" className="shrink-0 hover:underline">{ja ? "時間割" : "Schedule"}</a>
            <a href="#payment" className="shrink-0 hover:underline">{ja ? "料金" : "Prices"}</a>
            <a href="#registration" className="shrink-0 rounded-full bg-[#24554e] px-5 py-2.5 text-white hover:bg-[#173d38]">{ja ? "申込へ" : "Register"}</a>
          </div>
        </nav>

        <section id="overview" aria-labelledby="camp-title" className="relative overflow-hidden border-b border-[#d7cbb8] bg-[#f1eadc] px-5 py-10 sm:py-16 lg:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-9 lg:grid-cols-[1.2fr_.8fr] lg:gap-12">
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-4 border-b border-[#bfb3a2] pb-5">
                <Image src="/rba-logo-original.jpg" width={58} height={68} alt="Riot Basketball Academy logo" className="h-[64px] w-[54px] rounded-sm object-contain" />
                <div>
                  <p className="text-xs font-black tracking-[.2em] text-[#37665c]">RIOT BASKETBALL ACADEMY</p>
                  <p className="mt-1 text-sm font-bold">RBA × HBC WOLVES / CHIBA 2027</p>
                </div>
              </div>
              <p className="mt-8 text-[12px] font-black tracking-[.2em] text-[#7c5733]">{ja ? "千葉県 神崎町（こうざきまち）｜発酵の里こうざき" : "KOZAKI, CHIBA, JAPAN / THE TOWN OF FERMENTATION"}</p>
              <h1 id="camp-title" className="mt-4 max-w-[790px] text-[clamp(2.2rem,7.5vw,5rem)] font-black leading-[1.15] tracking-[-.045em] break-words">
                {ja ? <>神崎（こうざき）で、<span className="block text-[#28534b]">判断を育てる。</span></> : <>See the game.<span className="block text-[#28534b]">Make the choice.</span></>}
              </h1>
              <p className="mt-5 max-w-2xl text-lg font-bold leading-[1.75] sm:text-xl">
                {ja ? "練習を、試合の力へ。見て、選んで、仲間とつながる2日間。" : "Two days of basketball learning in Kozaki: notice, decide and connect with teammates."}
              </p>
              <div className="mt-8 border-y-2 border-[#24554e] py-5">
                <p className="text-[clamp(1.55rem,5vw,3.35rem)] font-black tracking-[-.03em] tabular-nums">2027.03.27 — 03.28</p>
                <p className="mt-3 text-sm font-semibold leading-7 sm:text-base">
                  {ja ? "土・日 ／ U12・U15 ／ 男女 ／ 他チーム所属選手も歓迎" : "Saturday & Sunday / U12 & U15 / Boys & girls / All clubs welcome"}
                </p>
                <p className="mt-1 text-sm leading-7">{ja ? "千葉県神崎町（こうざきまち）・会場詳細は申込／入金照合後に個別案内" : "Kozaki, Chiba. Exact venue shared privately after registration and payment verification."}</p>
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <a href="#registration" className="inline-flex min-h-14 items-center justify-center rounded-md bg-[#24554e] px-5 py-3 text-base font-bold text-white shadow-sm transition hover:bg-[#163c36] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24554e]">
                  {ja ? "参加申込はこちら →" : "Register →"}
                </a>
                <a href="#timetable" className="inline-flex min-h-14 items-center justify-center rounded-md border-2 border-[#24554e] px-5 py-3 text-base font-bold text-[#24554e] transition hover:bg-white">
                  {ja ? "時間割を見る ↓" : "Full schedule ↓"}
                </a>
                <a href="#payment" className="inline-flex min-h-14 items-center justify-center rounded-md border-2 border-[#ab8652] px-5 py-3 text-base font-bold text-[#624929] transition hover:bg-white">
                  {ja ? "参加費を見る ↓" : "Prices ↓"}
                </a>
              </div>
            </div>
            <div className="relative min-h-[220px] overflow-hidden rounded-[24px] border border-[#c5b79e] bg-[#264f4c] p-7 text-[#f7f0df] sm:min-h-[340px] lg:min-h-[440px] lg:p-10" aria-hidden="true">
              <svg viewBox="0 0 430 360" className="absolute inset-0 h-full w-full" fill="none" preserveAspectRatio="xMidYMid slice">
                <path d="M-35 58 C85 -4 142 133 265 67 S429 68 490 -8" stroke="#83a6a0" strokeWidth="2"/>
                <path d="M-50 96 C72 29 145 168 273 100 S432 98 488 28" stroke="#83a6a0" strokeWidth="2"/>
                <path d="M-50 134 C75 68 150 196 270 139 S440 139 488 70" stroke="#83a6a0" strokeWidth="2"/>
                <path d="M-50 172 C75 106 160 242 270 180 S445 175 488 108" stroke="#83a6a0" strokeWidth="2"/>
                <path d="M-50 210 C75 150 160 280 270 217 S435 212 488 151" stroke="#83a6a0" strokeWidth="2"/>
                <circle cx="330" cy="275" r="112" stroke="#d7ba83" strokeWidth="2"/>
                <circle cx="330" cy="275" r="83" stroke="#d7ba83" strokeWidth="1" strokeDasharray="7 11"/>
              </svg>
              <div className="relative z-10 flex h-full min-h-[210px] flex-col justify-between sm:min-h-[295px] lg:min-h-[365px]">
                <div className="text-[12px] font-bold tracking-[.22em] text-[#e9d4ae]">THE LAND / THE GAME</div>
                <div>
                  <div className="text-5xl font-black tracking-[-.06em] sm:text-7xl">KOZAKI<span className="ml-1 text-[#dfbf83]">.</span></div>
                  <div className="mt-4 max-w-[330px] text-sm font-medium leading-7 sm:text-base">{ja ? "利根川、豊かな土、発酵の文化。受け継がれてきた土地で、一つひとつの判断を学ぶ。" : "A place shaped by river, land and fermentation; a camp built around each player's next decision."}</div>
                  <p className="mt-7 border-t border-[#acc0b5]/60 pt-4 text-[11px] tracking-[.18em] text-[#e9d4ae]">TONE RIVER / RICE / FERMENTATION</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="place" className="scroll-mt-20 border-b border-[#d7cbb8] bg-[#fffdf7] px-5 py-14 sm:py-20" aria-labelledby="place-title">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-black tracking-[.2em] text-[#8b6839]">ABOUT KOZAKI / 発酵の里こうざき</p>
            <div className="mt-4 grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:gap-14">
              <h2 id="place-title" className="text-[clamp(1.9rem,4.8vw,3.5rem)] font-black leading-tight tracking-[-.03em]">{ja ? <>この町で、<span className="block text-[#24554e]">バスケを学ぶ。</span></> : <>A different place.<span className="block text-[#24554e]">A fresh perspective.</span></>}</h2>
              <div className="text-base leading-8">
                <p>{ja ? "神崎町（こうざきまち）は、利根川の水運と、米・大豆を活かした醸造文化が息づく町。酒や味噌、醤油などの発酵食文化を、今も大切に受け継いでいます。" : "Kozaki is a small town shaped by the Tone River and an enduring tradition of brewing and fermentation using rice, soybeans and local water."}</p>
                <p className="mt-3">{ja ? "慣れた練習環境を離れ、初めて出会う仲間とプレーする。子どもたちが新しい選択肢を見つける2日間を、ここでつくります。" : "Away from familiar routines, players meet new teammates and discover different options through game-based learning."}</p>
                <a href={kozakiSource} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center text-sm font-bold text-[#24554e] underline underline-offset-4">{ja ? "出典：神崎町役場 観光・移住情報 ↗" : "Source: Kozaki Town official visitor information ↗"}</a>
              </div>
            </div>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {stories.map(s=><article key={s.id} className="border-l-[3px] border-[#b89159] bg-[#f5f0e6] p-5 sm:p-6">
                <span className="text-xs font-black text-[#7d5f38]">{s.id} / KOZAKI</span>
                <h3 className="mt-3 text-xl font-black">{ja?s.titleJa:s.titleEn}</h3>
                <p className="mt-2 text-sm leading-7">{ja?s.textJa:s.textEn}</p>
              </article>)}
            </div>
            <p className="mt-5 text-xs leading-6 text-[#5b5e56]">{ja ? "※地域紹介は町の公式資料に基づきます。神崎町の主催・後援・協賛を示すものではありません。" : "Local history is based on Kozaki Town's public sources. This does not imply municipal sponsorship, endorsement or co-hosting."}</p>
          </div>
        </section>

        <section id="learning" className="scroll-mt-20 px-5 py-14 sm:py-20" aria-labelledby="learning-title">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-black tracking-[.2em] text-[#8b6839]">BASKETBALL DEVELOPMENT / THE GAME IS THE CLASSROOM</p>
            <h2 id="learning-title" className="mt-4 text-[clamp(1.9rem,4.6vw,3.5rem)] font-black leading-tight">{ja ? "練習を、試合の力へ。" : "From practice to the game."}</h2>
            <p className="mt-3 max-w-3xl text-base leading-8">{ja ? "説明を聞くだけで終わらず、まずプレーする。そこで気づいたことを、もう一度ゲームで試します。" : "Players first experience the game, notice the problem and try again in a new situation."}</p>
            <div className="mt-7 grid gap-3 md:grid-cols-3">
              {learning.map(item=><article className="border-t-[3px] border-[#28534b] bg-white p-6" key={item.num}>
                <p className="text-xs font-black tracking-[.15em] text-[#87633b]">{item.num}</p>
                <h3 className="mt-5 text-xl font-black">{ja?item.titleJa:item.titleEn}</h3>
                <p className="mt-3 text-sm leading-7">{ja?item.bodyJa:item.bodyEn}</p>
              </article>)}
            </div>
            <div className="mt-5 rounded-md border border-[#d9cebc] bg-[#f0e9dd] px-5 py-5">
              <h3 className="text-base font-black">{ja ? "成田空港から参加を検討している方へ" : "For families arriving through Narita Airport"}</h3>
              <p className="mt-2 text-sm leading-7">{ja ? "神崎町は成田から約20km圏にありますが、空港送迎や宿泊の手配はキャンプ参加費に含みません。移動・宿泊は保護者・引率者がご手配ください。" : "Kozaki is within roughly 20 km of the Narita area. Airport transfers, accommodation and travel arrangements are not included in the camp fee. Guardians should make their own arrangements."}</p>
            </div>
          </div>
        </section>

        <ChibaCamp2027Timetable locale={locale} />

        <section id="payment" aria-labelledby="payment-title" className="scroll-mt-20 border-t border-[#d7cbb8] bg-[#fffdf7] px-5 py-14 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-black tracking-[.2em] text-[#8b6839]">FEES / PAYMENT</p>
            <h2 id="payment-title" className="mt-3 text-[clamp(2rem,4.7vw,3.5rem)] font-black">{ja ? "参加費は、ここだけで確認。" : "Clear prices. Camp training only."}</h2>
            <p className="mt-3 max-w-3xl text-base leading-8">{ja ? "選手1名の料金です。まず保護者用フォームで参加日を選び、その後、同じプランをStripeで1回だけ決済してください。" : "Prices are per player. First select dates in the international guardian form, then make one payment for the matching Stripe plan."}</p>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {plans.map(p=><article key={p.id} className={"flex flex-col rounded-xl border-2 bg-[#f7f3eb] p-6 "+(p.id==="two"?"border-[#26554c] shadow-sm":"border-[#d5c9b4]")}>
                <p className="text-xs font-black tracking-[.13em] text-[#7a603f]">{p.id==="two"?"FULL CAMP / 2 DAYS":"DAY PASS / 1 DAY"}</p>
                <h3 className="mt-3 text-lg font-bold">{ja ? p.dateJa : p.dateEn}</h3>
                <p className="mt-4 text-[clamp(2.35rem,4vw,3.2rem)] font-black tracking-[-.04em] tabular-nums">{ja?"¥":"$"}{ja?p.priceJa:p.priceUsd}</p>
                <p className="mt-1 text-xs font-medium text-[#565e54]">{ja?"税込／選手1名":"USD fixed total / per player"}</p>
                <a href={ja ? p.hrefJa : p.hrefUsd} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-13 items-center justify-center rounded-md bg-[#24554e] px-5 py-3 text-center text-sm font-bold text-white hover:bg-[#163b36]">{ja ? "申込済みの方：この日程を決済 ↗" : "AFTER APPLYING: PAY THIS PLAN ↗"}</a>
              </article>)}
            </div>
            <div className="mt-7 grid gap-5 rounded-lg border border-[#d5c9b4] bg-[#f3eee4] p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-7">
              <div>
                <strong className="text-base font-black">{ja ? "参加費に含まれないもの" : "Not included in the camp fee"}</strong>
                <p className="mt-2 text-sm leading-7">{ja ? "昼食・飲料、宿泊、航空券、交通費、空港送迎、個人の旅行保険など。ご家庭で別途手配・精算してください。" : "Food and drinks, accommodation, airfares, local transport, airport transfers, visas and personal travel/medical insurance. Arrange and pay for these separately."}</p>
              </div>
              <a href="#registration" className="inline-flex min-h-12 items-center justify-center rounded-md border-2 border-[#24554e] px-5 py-3 text-sm font-bold text-[#24554e] hover:bg-white">{ja?"申込の流れを確認 ↓":"See how to apply ↓"}</a>
            </div>
          </div>
        </section>

        <section id="registration" aria-labelledby="register-title" className="scroll-mt-20 bg-[#264e48] px-5 py-14 text-white sm:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-black tracking-[.2em] text-[#f0d09c]">HOW TO JOIN / 3 STEPS</p>
            <h2 id="register-title" className="mt-3 text-[clamp(2rem,4.7vw,3.5rem)] font-black leading-tight">{ja ? "参加するまでの、3つの手順。" : "Three simple steps to join."}</h2>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              <article className="rounded-lg bg-[#f6f0e3] p-6 text-[#1c2925]">
                <span className="text-xs font-black tracking-[.13em] text-[#7f6037]">STEP 01 / APPLICATION</span>
                <h3 className="mt-4 text-xl font-black">{ja ? "保護者が申込" : "Guardian applies"}</h3>
                <p className="mt-2 text-sm leading-7">{ja ? "選手1名につきフォーム1件。参加日、選手情報、保護者の連絡先を入力します。" : "One form per player. Enter dates, player details and guardian contact information."}</p>
              </article>
              <article className="rounded-lg bg-[#f6f0e3] p-6 text-[#1c2925]">
                <span className="text-xs font-black tracking-[.13em] text-[#7f6037]">STEP 02 / PAYMENT</span>
                <h3 className="mt-4 text-xl font-black">{ja ? "同じ日程を決済" : "Pay for those dates"}</h3>
                <p className="mt-2 text-sm leading-7">{ja ? "フォーム送信後、選択した日程のStripeリンクで1回だけ決済。同じ保護者メールを使用します。" : "After submitting, use the matching Stripe link once and the same guardian email."}</p>
              </article>
              <article className="rounded-lg bg-[#f6f0e3] p-6 text-[#1c2925]">
                <span className="text-xs font-black tracking-[.13em] text-[#7f6037]">STEP 03 / CONFIRMATION</span>
                <h3 className="mt-4 text-xl font-black">{ja ? "RBAから個別案内" : "RBA confirms by email"}</h3>
                <p className="mt-2 text-sm leading-7">{ja ? "RBAが申込と入金を照合後、参加確定・会場詳細・集合について保護者にメールします。" : "RBA checks both records, then privately emails confirmation, venue details and arrival instructions."}</p>
              </article>
            </div>
            <div className="mt-8 rounded-xl border border-[#9bb6ad] bg-[#1c3e39] p-6 sm:p-8">
              <h3 className="text-xl font-black">{ja ? "STEP 01：申込フォームはこちら" : "STEP 01: Start with the guardian form"}</h3>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#f2f6f2]">{ja ? "日本国内向けの円建て参加申込フォームです。海外からUSDで参加する方は、英語ページに切り替えてください。" : "This is the international USD registration form. For domestic JPY registration, switch to the Japanese page."}</p>
              <a href={registration} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-14 w-full items-center justify-center rounded-md bg-[#f3d6a0] px-6 py-3 text-center text-base font-black text-[#283522] hover:bg-white sm:w-auto">{ja ? "保護者用申込フォームを開く ↗" : "OPEN INTERNATIONAL REGISTRATION ↗"}</a>
              <p className="mt-3 text-xs leading-6 text-[#e5e7e1]">{ja ? "フォーム送信だけ、または決済だけでは参加確定になりません。二重決済にご注意ください。" : "Submission or payment alone does not confirm attendance. Please avoid duplicate payments."}</p>
            </div>
          </div>
        </section>

        <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20 border-b border-[#d7cbb8] bg-[#fffdf7] px-5 py-14 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-black tracking-[.2em] text-[#8b6839]">INFORMATION / FAQ</p>
            <h2 id="faq-title" className="mt-3 text-[clamp(1.8rem,4.5vw,3.3rem)] font-black">{ja ? "参加前のよくある質問" : "Before you join"}</h2>
            <div className="mt-7 divide-y divide-[#d9cebc] border-y border-[#d9cebc]">
              {faqs.map((f,i)=><details key={i} className="group py-1">
                <summary className="flex cursor-pointer items-start justify-between gap-4 py-5 text-base font-bold leading-7 marker:hidden sm:text-lg">
                  <span>{ja?f.jaQ:f.enQ}</span><span aria-hidden="true" className="shrink-0 text-[#6c765f] transition group-open:rotate-45">＋</span>
                </summary>
                <p className="pb-5 pr-6 text-sm leading-8 text-[#444e47]">{ja?f.jaA:f.enA}</p>
              </details>)}
            </div>
            <p className="mt-6 text-sm leading-7">
              {ja ? "決済前に必ず" : "Please read the "}
              <a href={cancellation} target="_blank" rel="noopener noreferrer" className="font-bold text-[#24554e] underline underline-offset-4">{ja?"キャンセル・返金規定 ↗":"cancellation and refund terms ↗"}</a>
              {ja?"をご確認ください。":". The policy is currently in Japanese; contact RBA for an explanation in English."}
            </p>
          </div>
        </section>

        <footer className="bg-[#f1eadc] px-5 py-9">
          <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-xs font-black tracking-[.18em] text-[#826039]">RIOT BASKETBALL ACADEMY / KOZAKI 2027</p>
              <p className="mt-2 font-bold">{ja?"神崎（こうざき）育成キャンプ 2027":"CHIBA / KOZAKI DEVELOPMENT CAMP 2027"}</p>
              <a className="mt-2 inline-block text-sm font-medium text-[#24554e] underline" href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a>
            </div>
            <div className="flex flex-wrap items-center gap-5 text-sm font-bold">
              <Link href={ja?"/ja/camp":"/camp"} className="text-[#24554e] underline">{ja?"RBA CAMP一覧":"All RBA camps"}</Link>
              <Link href={ja?"/events/chiba-development-camp-2027":"/ja/events/chiba-development-camp-2027"} className="text-[#24554e] underline">{ja?"English":"日本語"}</Link>
              <a href="#top" className="text-[#24554e] underline">{ja?"ページの先頭へ":"Back to top"} ↑</a>
            </div>
          </div>
        </footer>
      </main>
    </SiteFrame>
  );
}
