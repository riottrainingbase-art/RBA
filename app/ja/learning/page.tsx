import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, BookOpenText, CheckCircle2, CircleHelp, ClipboardCheck, HeartHandshake, LibraryBig, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import { GrowthClickTracking } from "@/components/growth-click-tracking";

export const metadata: Metadata = {
  title: "RBAの学びとサポート｜単品教材・継続学習・企業協賛",
  description: "Riot Basketball Academyのオンライン学習を目的別に比較。U12指導教材は1回3,300円、HOMECOURT PLUS・D-HUB COACH LABはそれぞれ月額3,300円。無料の指導者記事、note、企業協賛、チーム・組織向け相談を案内します。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/learning" },
  openGraph: {
    title: "RBA｜練習のない日にも、次の学びを。",
    description: "無料の記事から単品教材、継続学習まで。自分の目的に合う学びだけを選べます。",
    url: "https://riotbasketballacademy.com/ja/learning",
    siteName: "Riot Basketball Academy",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-logo-original.jpg" }]
  },
};

const freeArticles = "/ja/journal/coaches";
const guide = "/ja/materials/u12-fundamentals";
const plus = "/ja/homecourt-plus";
const dhub = "/ja/d-hub/coaches";
const note = "https://note.com/rba_official/membership/join";
const nationalAdvertising = "/ja/support#apply";
const corporateEnquiry = "https://form.jotform.com/263213962901051";

const products = [
  {
    id: "guide",
    kicker: "BUY ONCE / U12 COACHING",
    title: "U12指導教材｜Vol.1",
    price: "3,300円",
    suffix: "税込・1回購入",
    description: "U12で教える順番を、技術の型だけでなく「見る・判断する・実行する」から整理。90分の練習テンプレート、4週間の実装例、チェックリストを収録しています。",
    who: "U12の練習を組み立てる指導者に",
    includes: ["10章の育成教材", "90分練習例・4週間の実装", "購入済みのRBA IDで再閲覧"],
    link: guide,
    cta: "教材の内容を見て購入する",
    note: "月額契約ではありません。既存のRBA IDと決済確認によって閲覧権限を付与します。FIBA/WABC公認教材ではありません。",
    metric: "学習時間に縛られない単品購入",
  },
  {
    id: "plus",
    kicker: "MEMBERSHIP / LEARN & RECORD",
    title: "HOMECOURT PLUS",
    price: "3,300円",
    suffix: "税込・毎月",
    description: "選手・保護者・指導者が、実践ガイドを読み、今週取り組む課題、体調や試合の準備、振り返りを記録できる月額サービスです。",
    who: "家庭や現場で、継続して振り返りたい方に",
    includes: ["DEVELOPMENT LIBRARY", "週次・月次の育成ツール", "既存RBA IDでの契約管理"],
    link: plus,
    cta: "PLUSの内容と解約条件を見る",
    note: "月額自動更新。Stripeの契約画面で金額・開始日・解約条件を確認します。D-HUBとは別契約です。",
    metric: "情報・記録を一か所に",
  },
  {
    id: "dhub",
    kicker: "MEMBERSHIP / ADULT COACHES",
    title: "D-HUB COACH LAB",
    price: "3,300円",
    suffix: "税込・毎月",
    description: "U8〜U15の指導者向け。学ぶ→現場で試す→反応を見る→振り返る、という継続的な指導学習を、テーマに沿って進めます。",
    who: "練習設計と指導の振り返りを続ける成人指導者に",
    includes: ["指導者向けの学習テーマ", "毎週の実践課題", "メンバー用の記事・記録"],
    link: dhub,
    cta: "COACH LABの参加条件を見る",
    note: "既存のSquare月額購読を利用します。すでにD-HUBを継続決済している方は再度申し込まないでください。入会後の権限付与には確認が必要です。",
    metric: "正解の暗記ではなく、現場の学び",
  }
] as const;

const otherWays = [
  {
    id: "note",
    title: "noteで考える",
    price: "月500円・1,000円のプラン",
    text: "保護者・指導者向けの記事や育成の考え方を、少額から応援できる方法です。提供内容はnoteの各プラン詳細と加入画面を優先してください。",
    href: note,
    cta: "noteのプランを確認",
    small: "noteで別途申し込む契約です。RBAの他の有料プランに自動加入することはありません。",
  },
  {
    id: "sponsor",
    title: "企業として継続して支える",
    price: "月11,000円（税込）",
    text: "RBAの全国企業広告。公式応援ページ・月次レポートへの定型広告です。会社名・ロゴ等は許諾後に掲載します。",
    href: nationalAdvertising,
    cta: "企業広告の料金・決済条件を見る",
    small: "1社1口・毎月自動更新。特定大会の冠協賛、トップページやウェアへの広告は含まれません。",
  },
  {
    id: "team",
    title: "チーム・法人向けに相談する",
    price: "内容に応じた個別見積",
    text: "指導者教育の導入、学校・チーム単位の学習、教材利用、共同企画など。利用人数と目的に合わせて、役割と費用を整理します。",
    href: corporateEnquiry,
    cta: "組織・チーム向けの無料相談",
    small: "既存の法人向け相談フォームです。教材の複数人ライセンスを自動販売・自動許諾するものではありません。",
  },
] as const;

const faqs = [
  ["どれから始めればよいですか？", "初めての方は無料の指導者JOURNALから。U12の練習設計を整理したいなら単品教材、日常の記録まで続けたいならHOMECOURT PLUS、指導者として毎週実践する仕組みが必要ならD-HUB COACH LABがおすすめです。"],
  ["3,300円のサービスは全部同じものですか？", "いいえ。U12指導教材は1回限りの購入です。HOMECOURT PLUSとD-HUB COACH LABは別々の月額サービスです。どちらかに加入しただけで他方が自動的に付いてくるわけではありません。"],
  ["登録だけで有料会員になりますか？", "いいえ。無料のRBA ID作成や無料相談から自動的に課金されることはありません。各サービスの内容、金額、自動更新、提供期間、キャンセル・解約方法を確認してからお申し込みください。"],
  ["以前からD-HUBを購読しています。もう一度購入が必要ですか？", "既存のSquare月額D-HUB購読を継続している方は、追加決済をしないで既存のアクセスを確認してください。二重に申し込んだ場合も自動で解消するとは限りません。"],
  ["教材を購入したらすぐ読めますか？", "U12の単品教材は、RBA IDでログイン後、既存の安全な決済経路で購入すると閲覧権限が反映される仕組みです。反映が遅い場合は追加購入せず、同じRBA IDで再読み込みし、必要ならお問い合わせください。"],
  ["資格更新や公認コーチ研修に使えますか？", "RBA独自の育成教材・講習・サービスです。JBA・FIBA等の公認講習やコーチ資格更新ポイントの対象として案内していません。"],
  ["子どもの情報がスポンサーに共有されますか？", "いいえ。企業広告や協賛の対価として、未成年者の氏名・連絡先・健康情報を第三者へ提供することはありません。"],
] as const;

export default function RbaLearningRevenueHub() {
  return <SiteFrame locale="ja">
    <GrowthClickTracking />
    <main lang="ja" className="min-h-screen bg-[#f7f7f4] text-[#17252c]">
      <section className="bg-[#132128] px-5 py-12 text-white sm:py-20">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="現在のページ" className="mb-7 text-sm">
            <a href="/ja" className="text-white/70 underline underline-offset-4">RBAホーム</a><span className="mx-2 text-white/60">/</span><span>学びとサポート</span>
          </nav>
          <div className="mb-7 flex items-center gap-4">
            <Image src="/rba-logo-original.jpg" alt="Riot Basketball Academy 公式ロゴ" width={51} height={80} className="h-20 w-auto rounded-md bg-white p-1" />
            <div><p className="text-xs font-bold tracking-[.16em] text-[#ffb785]">RBA DEVELOPMENT / LEARNING</p><p className="mt-2 text-sm text-white/80">選手・保護者・指導者・企業の皆さまへ</p></div>
          </div>
          <h1 className="max-w-5xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">コートの外でも、<br/><span className="text-[#ffac70]">学びを次の練習へ。</span></h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">無料の記事から単品教材、毎週の学習、企業による継続的な応援まで。いま必要なものを、自分の目的に合わせて選べます。どのサービスも、ご本人の確認なしに別の有料プランへ自動加入することはありません。</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#choose" data-growth-id="rba-learning-hero-compare" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#ff963d] px-5 py-3 font-black text-[#142128]">学び方と料金を比較する <ArrowRight size={17} aria-hidden="true"/></a>
            <a href={freeArticles} data-growth-id="rba-learning-hero-free" className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/55 px-5 py-3 font-bold text-white">まず無料で読む <ArrowRight size={17} aria-hidden="true"/></a>
          </div>
        </div>
      </section>
      <section className="border-b border-[#d6deda] bg-white px-5 py-9" aria-label="学び方の方針">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-3">
          <div className="flex gap-3"><BookOpenText className="mt-1 shrink-0 text-[#b35c29]" aria-hidden="true"/><div><h2 className="font-black">無料で学ぶ入口</h2><p className="mt-2 text-sm leading-7 text-[#53656a]">指導者JOURNALで問いと考え方を整理。</p></div></div>
          <div className="flex gap-3"><ClipboardCheck className="mt-1 shrink-0 text-[#b35c29]" aria-hidden="true"/><div><h2 className="font-black">必要な内容だけ購入</h2><p className="mt-2 text-sm leading-7 text-[#53656a]">単品教材は毎月の課金になりません。</p></div></div>
          <div className="flex gap-3"><ShieldCheck className="mt-1 shrink-0 text-[#b35c29]" aria-hidden="true"/><div><h2 className="font-black">継続するなら内容を確認</h2><p className="mt-2 text-sm leading-7 text-[#53656a]">月額契約は料金・解約条件まで説明します。</p></div></div>
        </div>
      </section>
      <section id="choose" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-14 sm:py-20">
        <p className="text-xs font-black tracking-[.14em] text-[#a15427]">WAYS TO LEARN / 3つの有料学習</p>
        <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">自分の目的に合う学びを選ぶ。</h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-[#506067]">どれも税込3,300円ですが、購入方法と内容は異なります。必要のない重複契約が起きないよう、一度買い切りの教材と月額サービスを分けて表示しています。</p>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {products.map(p=><article key={p.id} id={p.id} className="flex scroll-mt-24 flex-col rounded-2xl border border-[#d3dcd7] bg-white p-6 shadow-sm sm:p-7">
            <p className="text-xs font-black tracking-widest text-[#ae5928]">{p.kicker}</p>
            <h3 className="mt-3 text-2xl font-black">{p.title}</h3>
            <p className="mt-5 flex flex-wrap items-baseline gap-2"><strong className="text-3xl font-black">{p.price}</strong><span className="text-sm text-[#526268]">{p.suffix}</span></p>
            <p className="mt-4 text-sm leading-8">{p.description}</p>
            <p className="mt-4 border-l-4 border-[#d78748] bg-[#fff6ed] px-4 py-3 text-sm font-bold leading-7">{p.who}</p>
            <ul className="mt-4 space-y-3">{p.includes.map(item=><li key={item} className="flex items-start gap-2 text-sm leading-7"><CheckCircle2 size={17} className="mt-1 shrink-0 text-[#327b69]" aria-hidden="true"/>{item}</li>)}</ul>
            <div className="mt-auto pt-7">
              <a href={p.link} data-growth-id={`rba-learning-${p.id}-detail`} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#162830] px-4 py-3 text-center text-sm font-black text-white">{p.cta}<ArrowRight size={17} aria-hidden="true"/></a>
            </div>
            <p className="mt-4 text-xs leading-7 text-[#5c6970]">{p.note}</p>
          </article>)}
        </div>
        <p className="mt-6 text-sm leading-7 text-[#526268]"><strong>ご注意：</strong>HOMECOURT PLUSとD-HUB COACH LABは別の会員制度です。既存会員は新しく支払う前に契約状況を確認してください。</p>
      </section>
      <section className="bg-[#eaf0ed] px-5 py-14 sm:py-20" aria-labelledby="free-title">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black tracking-widest text-[#a15427]">START FREE / BEFORE BUYING</p>
          <h2 id="free-title" className="mt-3 text-3xl font-black sm:text-4xl">まずは、ひとつ読んで試す。</h2>
          <p className="mt-4 max-w-4xl leading-8">いきなり有料のサービスを選ぶ必要はありません。育成の原則や練習設計を無料の記事で確認し、自分のチームで試してみてください。継続した学習が必要になったときに、単品教材や月額会員を検討できます。</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={freeArticles} data-growth-id="rba-learning-free-journal" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#162830] px-5 py-3 font-bold text-white">無料の指導者JOURNALを読む <ArrowRight size={16} aria-hidden="true"/></a>
            <a href="/ja/after-clinic" data-growth-id="rba-learning-free-reflection" className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-[#384f50] px-5 py-3 font-bold text-[#14262d]">無料の振り返りを使う <ArrowRight size={16} aria-hidden="true"/></a>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-14 sm:py-20" aria-labelledby="other-title">
        <p className="text-xs font-black tracking-widest text-[#a15427]">OTHER WAYS TO SUPPORT / INDIVIDUAL & BUSINESS</p>
        <h2 id="other-title" className="mt-3 text-3xl font-black sm:text-4xl">個人・チーム・企業、それぞれの関わり方。</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {otherWays.map(p=><article key={p.id} className="flex flex-col rounded-2xl border border-[#d0d9d5] bg-white p-6">
            <p className="text-xs font-black tracking-[.13em] text-[#a15427]">{p.id==="note"?"INDIVIDUAL":p.id==="sponsor"?"CORPORATE ADS":"ORGANISATION"}</p>
            <h3 className="mt-3 text-xl font-black">{p.title}</h3>
            <p className="mt-3 text-lg font-black">{p.price}</p>
            <p className="mt-3 text-sm leading-8">{p.text}</p>
            <a href={p.href} target={p.href.startsWith("https:")?"_blank":undefined} rel={p.href.startsWith("https:")?"noopener noreferrer":undefined} data-growth-id={`rba-learning-${p.id}-out`} className="mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#162830] px-4 py-3 text-sm font-black">{p.cta}<ArrowUpRight size={16} aria-hidden="true"/></a>
            <p className="mt-3 text-xs leading-6 text-[#5b686e]">{p.small}</p>
          </article>)}
        </div>
      </section>
      <section className="bg-white px-5 py-14 sm:py-20" aria-labelledby="faq-title">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3"><CircleHelp className="text-[#a15427]" aria-hidden="true"/><h2 id="faq-title" className="text-3xl font-black sm:text-4xl">よくあるご質問</h2></div>
          <div className="mt-7 space-y-3">{faqs.map(([q,a])=><details key={q} className="rounded-xl border border-[#d0d9d5] p-5">
            <summary className="cursor-pointer font-bold leading-7">{q}</summary><p className="mt-3 max-w-4xl text-sm leading-8 text-[#526267]">{a}</p>
          </details>)}</div>
        </div>
      </section>
      <section className="bg-[#132128] px-5 py-12 text-white sm:py-16" aria-labelledby="bottom-title">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3"><LibraryBig className="text-[#ffb37b]" aria-hidden="true"/><h2 id="bottom-title" className="text-3xl font-black sm:text-4xl">今日の学びを、次の練習へ。</h2></div>
          <p className="mt-5 max-w-4xl leading-8 text-white/80">RBAは、一人ひとりが自分のチームや地域にいながら学べる環境を育てています。どのサービスが合うか分からなければ、まず無料の記事から確認してください。</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={freeArticles} data-growth-id="rba-learning-bottom-free" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#ff963d] px-5 py-3 font-black text-[#142128]">まず無料で学ぶ<ArrowRight size={17} aria-hidden="true"/></a>
            <a href={guide} data-growth-id="rba-learning-bottom-guide" className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/55 px-5 py-3 font-bold text-white">U12教材を確認する<ArrowRight size={17} aria-hidden="true"/></a>
          </div>
          <p className="mt-6 text-xs leading-7 text-white/65"><UsersRound size={16} className="mr-2 inline-block align-text-bottom" aria-hidden="true"/>JBA・FIBA等の公認指導者養成講習、資格更新ポイントを約束するものではありません。決済額・更新・解約条件は各公式プランの最終確認画面をご確認ください。</p>
          <p className="mt-3 text-sm text-white/80"><Sparkles size={16} className="mr-2 inline-block align-text-bottom" aria-hidden="true"/><a href="/ja/policies" className="underline underline-offset-4">利用規約・個人情報・キャンセルのご案内</a>　／　<a href="mailto:riot.training.base@gmail.com" className="underline underline-offset-4">お問い合わせ</a></p>
        </div>
      </section>
    </main>
  </SiteFrame>;
}
