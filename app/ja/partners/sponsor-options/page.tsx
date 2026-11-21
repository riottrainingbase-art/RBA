import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  HeartHandshake,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "RBA スポンサー・協賛募集｜地域・全国・国際交流の支援方法と料金",
  description:
    "Riot Basketball Academyのスポンサー募集。仙台の地域広告月3,300円から、全国企業広告月11,000円、NEXT COURT TOUR・RIZEHOPEへの企画協賛、物品・移動の現物協力まで。違いと契約条件を確認し、無料でご相談いただけます。",
  alternates: {
    canonical: "https://riotbasketballacademy.com/ja/partners/sponsor-options",
  },
  openGraph: {
    title: "RBA スポンサー・協賛｜子どもの挑戦を、地域と企業で支える",
    description: "支援する地域・活動から選べる5つの入口。相談無料、契約・料金は事前に明確化。",
    url: "https://riotbasketballacademy.com/ja/partners/sponsor-options",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-logo-original.jpg" }],
  },
};

const companyForm = "https://form.jotform.com/263089038431054";
const rizehopeForm = "https://form.jotform.com/263222129730046";

const options = [
  {
    id: "sendai",
    number: "01",
    label: "仙台・太白区のお店や企業へ",
    title: "GREAM仙台の地域広告",
    price: "月3,300円（税込）から",
    priceNote:
      "まちのお店：年39,600円。地域企業：年132,000円（月11,000円相当）。いずれも12か月契約を基本とし、月額表示は12回分割の場合です。自動更新はありません。",
    body:
      "仙台市太白区で活動するU15クラブを、身近なお店や地域企業の皆さまと支える広告協賛です。地域の企業紹介と、掲載内容に応じた活動報告を組み合わせます。",
    suitable: "仙台に店舗や事業所があり、地域の子どもたちを継続的に応援したい企業",
    action: "地域広告の内容・料金を確認",
    url: "/ja/gream-sendai/partners",
    isPlanned: false,
  },
  {
    id: "national",
    number: "02",
    label: "日本全国の企業へ",
    title: "RBA全国企業広告",
    price: "月11,000円（税込）",
    priceNote:
      "1社につき1口。RBA公式応援ページと月次活動レポートへの定型広告です。毎月自動更新のため、申込前に期間・掲載内容・解約条件をご確認ください。",
    body:
      "全国の育成活動を応援しながら、企業名・公式サイト・許諾済みロゴ等を紹介する月額広告です。トップページ上部や個別イベント、ユニフォームへの掲出は含みません。",
    suitable: "広告の内容と毎月の費用が明確な、継続型の応援方法を探している企業",
    action: "利用条件を確認して申し込む",
    url: "/ja/support#apply",
    isPlanned: false,
  },
  {
    id: "tour",
    number: "03",
    label: "全国での育成機会を増やしたい企業へ",
    title: "NEXT COURT TOUR 2027",
    price: "3万円からの協賛案",
    priceNote:
      "地域応援3万円から／開催協賛10万円／地域協賛30万円／年間協賛60万円。いずれも提案金額で、対象期間・税区分・提供内容は個別契約で確定します。",
    body:
      "地域での育成クリニック、指導者との学び、開催後の振り返りを支える企画です。参加費の負担を抑える仕組みも検討しています。2027年の開催日・会場・補助枠は計画段階です。",
    suitable: "教育・健康・地域振興など、継続性のある地域貢献を具体的な活動につなげたい企業",
    action: "全国育成ツアーの企画を見る",
    url: "/ja/national-tour",
    isPlanned: true,
  },
  {
    id: "rizehope",
    number: "04",
    label: "仙南地域・国際交流に関心のある企業へ",
    title: "RIZEHOPE JAPAN 2027",
    price: "5万〜30万円の協賛案",
    priceNote:
      "サポーター5万円／地域パートナー10万円／公式パートナー15万円／冠パートナー30万円。税区分、掲出場所、提供内容は書面で確認する交渉案です。",
    body:
      "2027年2月27・28日に柴田町総合体育館で準備しているU12国際育成交流です。会場は両日予約済み。海外チームの正式参加、競技運営と安全体制などは調整中です。",
    suitable: "子どもの国際交流、仙南での地域連携、安全な大会運営を応援したい企業",
    action: "RIZEHOPEの協賛を無料相談",
    url: rizehopeForm,
    isPlanned: true,
  },
  {
    id: "inkind",
    number: "05",
    label: "企業の得意分野で支えたい方へ",
    title: "現物・サービス提供による協力",
    price: "内容を伺って個別相談",
    priceNote:
      "飲料・安全な補食・用品・印刷・会場・交通・宿泊・救護など。提供条件、数量、評価額、アレルギー対応や契約・責任の範囲を確認してから決めます。",
    body:
      "現金協賛以外にも、子どもたちの活動を支える方法があります。たとえば、移動に必要な車両や地域での製作・運営協力などです。先に一方的な無償提供をお願いすることはありません。",
    suitable: "自社の製品・設備・サービスを、安全に役立てられる活動を探している企業",
    action: "現物・サービス協力を相談",
    url: companyForm,
    isPlanned: true,
  },
] as const;

const steps = [
  ["01", "まず、ご希望を伺います", "支援したい地域、活動、予算感などを、企業の担当者様からお知らせいただきます。ご相談・資料請求は無料です。"],
  ["02", "見積と内容を具体化します", "対象企画、支援金の使途、社名・ロゴの掲載先、期間、報告方法、税区分、中止時の精算を整理します。"],
  ["03", "書面で合意してから進めます", "個別企画は契約とご請求を、月額広告は既存の利用条件とお支払い画面を、それぞれ事前にご確認いただきます。"],
  ["04", "実施・掲載後に報告します", "開催・掲出した事実と、確認できる範囲の成果をご報告します。広告による販売数・閲覧者数・採用効果は保証しません。"],
] as const;

const faqs = [
  ["問い合わせると、すぐに料金が発生しますか？",
    "いいえ。企業協賛フォームへのお問い合わせと資料請求は無料です。全国月額企業広告だけは、別の専用申込ページで、ご自身で利用条件を確認して決済する商品です。フォーム送信だけで契約や課金は成立しません。"],
  ["月額3,300円と11,000円の違いは何ですか？",
    "仙台の月額3,300円はGREAM仙台の地域広告を12か月契約で分割した場合の金額です。一方、全国の月額11,000円はRBAの定型企業広告で、毎月自動更新します。掲載先・期間・解約方法が異なり、自動的な切替えは行いません。"],
  ["全国月額広告には、トップページやユニフォームへのロゴ掲出も含まれますか？",
    "いいえ。定型の月額広告はRBA公式サイト内の応援ページと月次活動レポートが基本です。トップページ上部、特定イベント、ユニフォームへの掲出は、許可や掲載条件を確認したうえで別途契約する内容です。"],
  ["協賛金は広告宣伝費として処理できますか？",
    "広告掲載や物品支援など、契約内容によって経理・税務上の扱いは異なります。RBAの現行案内では適格請求書発行事業者として登録しておらず、適格請求書を発行できない旨を表示しています。通常の請求書・領収書はご案内できます。具体的な処理は貴社の税理士等へご確認ください。"],
  ["協賛企業へ、子どもや保護者の情報は渡されますか？",
    "いいえ。選手・保護者の名簿や連絡先、健康情報を企業への特典として提供しません。活動写真・映像・コメントの使用も、必要な同意と契約の範囲でのみ行います。"],
  ["大会やツアーが中止・変更された場合はどうなりますか？",
    "個別企画への協賛では、中止・延期時の代替対応、未実施分の精算・返金などを契約前に書面で決めます。未確定のイベントを開催決定や協賛確定として扱うことはありません。"],
] as const;

export default function SponsorOptionsPage() {
  return <SiteFrame locale="ja">
    <main lang="ja" className="min-h-screen bg-[#f7f7f4] text-[#142027]">
      <section className="bg-[#132128] px-5 py-12 text-white sm:py-20">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="現在のページ" className="mb-8 flex flex-wrap gap-2 text-sm text-white/75">
            <a href="/ja" className="underline underline-offset-4">RBA</a><span>/</span>
            <a href="/ja/sponsor" className="underline underline-offset-4">企業・地域パートナー</a><span>/</span>
            <strong className="text-white">協賛の選び方</strong>
          </nav>
          <div className="mb-8 flex items-center gap-4">
            <Image src="/rba-logo-original.jpg" alt="Riot Basketball Academy 公式ロゴ" width={55} height={76} className="h-[76px] w-auto rounded-md bg-white p-1" />
            <div>
              <p className="text-xs font-black tracking-[.18em] text-[#ffb880]">RIOT BASKETBALL ACADEMY</p>
              <p className="mt-1 text-sm text-white/80">企業スポンサー・協賛・地域パートナー</p>
            </div>
          </div>
          <h1 className="max-w-5xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
            子どもたちの挑戦を、<br /><span className="text-[#ffaf71]">企業と一緒に支える。</span>
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-8 text-white/85 sm:text-lg">
            地域の小さなお店から、全国で活動する企業まで。RBAは、子どもたちの育成、指導者の学び、国内外の交流を支えるパートナーを募集しています。ご希望の活動とご予算に合わせて、無理のない協力方法をご相談ください。
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#plans" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#ff943e] px-5 py-3 font-black text-[#142027]">協賛の方法・料金を見る <ArrowRight size={17} aria-hidden="true"/></a>
            <a href={companyForm} target="_blank" rel="noopener noreferrer" data-growth-id="sponsor-options-hero-inquiry" className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/70 px-5 py-3 font-bold text-white">まず無料で相談する <ArrowUpRight size={17} aria-hidden="true"/></a>
          </div>
          <p className="mt-4 text-sm leading-7 text-white/70">無料相談は契約・申込み・課金ではありません。個別企画の協賛内容は書面で確定します。</p>
        </div>
      </section>
      <section className="border-b border-[#d7dcd9] bg-white px-5 py-9" aria-label="協賛で大切にしていること">
        <div className="mx-auto grid max-w-6xl gap-7 sm:grid-cols-3">
          <div className="flex gap-3"><HeartHandshake className="mt-1 shrink-0 text-[#ba6024]" aria-hidden="true"/><div><h2 className="font-black">育成の機会を増やす</h2><p className="mt-2 text-sm leading-7 text-[#566269]">活動を広げるための協力先・使途を明確にします。</p></div></div>
          <div className="flex gap-3"><FileText className="mt-1 shrink-0 text-[#ba6024]" aria-hidden="true"/><div><h2 className="font-black">企業への説明を大切に</h2><p className="mt-2 text-sm leading-7 text-[#566269]">契約条件、掲載内容、報告の方法を先に示します。</p></div></div>
          <div className="flex gap-3"><ShieldCheck className="mt-1 shrink-0 text-[#ba6024]" aria-hidden="true"/><div><h2 className="font-black">子どもの安全を守る</h2><p className="mt-2 text-sm leading-7 text-[#566269]">個人情報や肖像権を広告の対価にはしません。</p></div></div>
        </div>
      </section>
      <section id="plans" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-14 sm:py-20" aria-labelledby="plans-title">
        <p className="text-xs font-black tracking-widest text-[#9e5727]">WAYS TO SUPPORT / 目的に合わせた5つの入口</p>
        <h2 id="plans-title" className="mt-3 text-3xl font-black sm:text-4xl">どの形で応援したいですか。</h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[#566269]">金額だけでなく、支援する地域や活動、契約期間を比較してください。まずは相談だけでも構いません。</p>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {options.map(o=><article key={o.id} id={o.id} className="flex scroll-mt-20 flex-col rounded-2xl border border-[#d6ddda] bg-white p-6 shadow-sm sm:p-8">
            <p className="text-xs font-black tracking-widest text-[#ad5b29]">{o.number} / {o.label}</p>
            <h3 className="mt-3 text-2xl font-black">{o.title}</h3>
            <p className="mt-4 text-2xl font-black text-[#16252e]">{o.price}</p>
            <p className="mt-3 rounded-lg bg-[#f3f5f4] p-4 text-sm leading-7 text-[#435159]">{o.priceNote}</p>
            <p className="mt-4 text-sm leading-8">{o.body}</p>
            <p className="mt-3 text-sm leading-7 text-[#58666a]"><strong>おすすめの企業：</strong>{o.suitable}</p>
            <div className="mt-auto pt-6">
              <a href={o.url} target={o.url.startsWith("https:")?"_blank":undefined} rel={o.url.startsWith("https:")?"noopener noreferrer":undefined}
                data-growth-id={`sponsor-options-${o.id}-detail`}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#14262d] px-5 py-3 text-center text-sm font-black text-white sm:w-auto">
                {o.action} <ArrowRight size={17} aria-hidden="true"/>
              </a>
            </div>
            {o.isPlanned?<p className="mt-3 text-xs leading-6 text-[#69757a]">記載額は協議用の案です。このページからの申込み・お支払いは発生しません。</p>:null}
          </article>)}
          <article className="flex flex-col justify-center rounded-2xl border border-[#c9813b] bg-[#fff0e2] p-6 sm:p-8">
            <p className="text-xs font-black tracking-widest text-[#9a5128]">MULTI-PROGRAMME / B2B</p>
            <h3 className="mt-3 text-2xl font-black">複数の活動をまとめて支えたい企業へ</h3>
            <p className="mt-4 text-sm leading-8">全国の育成活動、指導者研修、海外交流など、企業の目的に合う内容を組み合わせてご提案します。協賛額、掲載場所、支援する期間は、既存の商品から自動的に決まるものではありません。</p>
            <a href={companyForm} target="_blank" rel="noopener noreferrer" data-growth-id="sponsor-options-multi-inquiry" className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#14262d] px-5 py-3 text-sm font-black">複数企画の協賛を無料相談 <ArrowUpRight size={17} aria-hidden="true"/></a>
          </article>
        </div>
        <p className="mt-7 text-sm leading-7 text-[#526269]">※国内チームの参加費や個人向けメンバー会費は、ここにある企業広告・協賛とは別の契約です。月額広告以外の金額は、原則として個別見積・書面合意前の提案額です。</p>
      </section>
      <section className="bg-[#eaf0ed] px-5 py-14 sm:py-20" aria-labelledby="how-title">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black tracking-widest text-[#8c4b28]">HOW IT WORKS / ご相談から活動報告まで</p>
          <h2 id="how-title" className="mt-3 text-3xl font-black sm:text-4xl">企業の担当者様にも、説明しやすい形で。</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {steps.map(([num,title,description])=><li key={num} className="rounded-xl border border-[#d4dbd7] bg-white p-5">
              <span className="text-3xl font-black text-[#ac5b2b]">{num}</span><h3 className="mt-2 font-black">{title}</h3><p className="mt-3 text-sm leading-7 text-[#4e5b5d]">{description}</p>
            </li>)}
          </ol>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/ja/partners/brief" className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-[#425254] px-5 py-3 text-sm font-bold">企業向けの説明資料を見る <FileText size={17} aria-hidden="true"/></a>
            <a href={companyForm} target="_blank" rel="noopener noreferrer" data-growth-id="sponsor-options-process-inquiry" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#14262d] px-5 py-3 text-sm font-bold text-white">見積・相談を依頼する <ArrowUpRight size={17} aria-hidden="true"/></a>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-14 sm:py-20" aria-labelledby="faq-title">
        <div className="flex items-center gap-3"><ClipboardCheck className="text-[#9e5727]" aria-hidden="true"/><h2 id="faq-title" className="text-3xl font-black sm:text-4xl">よくあるご質問</h2></div>
        <div className="mt-7 space-y-3">{faqs.map(([q,a])=><details key={q} className="group rounded-xl border border-[#d0d8d4] bg-white p-5">
          <summary className="cursor-pointer font-bold leading-7 marker:text-[#b16a36]">{q}</summary>
          <p className="mt-3 max-w-4xl text-sm leading-8 text-[#4e5b5e]">{a}</p>
        </details>)}</div>
      </section>
      <section className="bg-[#14252d] px-5 py-12 text-white sm:py-16" aria-labelledby="consult-title">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black tracking-widest text-[#ffb780]">START WITH A CONVERSATION</p>
          <h2 id="consult-title" className="mt-3 text-3xl font-black sm:text-4xl">まずは、どんな活動を支えたいかをお聞かせください。</h2>
          <p className="mt-5 max-w-4xl text-base leading-8 text-white/80">支援する地域やご予算が決まっていなくても大丈夫です。企業・団体の成人ご担当者様から、相談フォームでご希望をお知らせください。選手や保護者の個人情報は入力不要です。</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={companyForm} target="_blank" rel="noopener noreferrer" data-growth-id="sponsor-options-footer-inquiry" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-[#ff983e] px-6 py-4 font-black text-[#142027]">協賛・広告の無料相談フォーム <ArrowUpRight size={18} aria-hidden="true"/></a>
            <a href="mailto:riot.training.base@gmail.com?subject=RBA%E4%BC%81%E6%A5%AD%E5%8D%94%E8%B3%9B%E3%81%AE%E3%81%94%E7%9B%B8%E8%AB%87" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-lg border border-white/50 px-6 py-4 font-bold text-white">メールで相談する <ArrowRight size={18} aria-hidden="true"/></a>
          </div>
          <div className="mt-8 flex items-start gap-3 text-sm leading-7 text-white/65"><MapPin size={18} className="mt-1 shrink-0" aria-hidden="true"/><p>Riot Basketball Academy（RBA）／仙台を拠点に全国・国際交流事業を展開。お申し込み条件、契約主体、協賛先の掲出許諾は案件ごとに確認します。</p></div>
          <div className="mt-5 flex items-start gap-3 text-sm leading-7 text-white/65"><CheckCircle2 size={18} className="mt-1 shrink-0" aria-hidden="true"/><p>ご相談だけで契約・決済は発生しません。協賛先の確定や事業への後援、広告の到達効果を保証するものではありません。</p></div>
        </div>
      </section>
    </main>
  </SiteFrame>;
}
