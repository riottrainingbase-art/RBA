import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: { absolute: "RBA沖縄｜育成年代バスケットボール 現地コーチ募集" },
  description:
    "Riot Basketball Academy（RBA）は、沖縄で育成年代の選手と向き合う現地コーチを募集しています。現場指導に集中できるよう、本部が募集・決済・会員管理・ブランド管理を担当します。",
  keywords: [
    "沖縄 バスケットボール コーチ 募集",
    "沖縄 バスケ 指導者",
    "沖縄 ミニバス コーチ",
    "沖縄 U12 バスケ",
    "沖縄 U15 バスケ",
    "バスケットボール 指導 求人 沖縄",
    "Riot Basketball Academy",
    "RBA 沖縄",
  ],
  alternates: { canonical: "https://riotbasketballacademy.com/ja/okinawa-coach" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "RBA沖縄｜現地コーチ募集",
    description:
      "勝敗だけではなく、選手の長期的な成長を大切にする育成環境を、沖縄で一緒につくる現地コーチを募集します。",
    url: "https://riotbasketballacademy.com/ja/okinawa-coach",
    siteName: "Riot Basketball Academy",
    locale: "ja_JP",
    type: "website",
    images: ["https://riotbasketballacademy.com/rba-court-hero.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "RBA沖縄｜現地コーチ募集",
    description: "沖縄で、育成年代の選手と向き合う現地コーチを募集しています。",
    images: ["https://riotbasketballacademy.com/rba-court-hero.png"],
  },
};

const roleCards = [
  {
    icon: UserRoundCheck,
    tag: "ON COURT",
    title: "現場指導を担当",
    body:
      "育成年代のトレーニング、Small-Sided Game、ゲーム形式の学習、当日の進行を担当します。内容はRBAの育成方針を土台に、本部と共有しながら組み立てます。",
  },
  {
    icon: UsersRound,
    tag: "PLAYER / FAMILY",
    title: "選手・保護者への現場対応",
    body:
      "活動前後の案内、当日の確認、選手の様子や現場で起きたことの共有を行います。重要な契約・返金・料金判断は本部が担当します。",
  },
  {
    icon: MapPin,
    tag: "LOCAL",
    title: "沖縄の現場をつなぐ",
    body:
      "会場や地域事情について、本部へ必要な情報を共有します。個人判断で契約や金銭条件を確定する役割ではありません。",
  },
  {
    icon: HeartHandshake,
    tag: "TEAM RBA",
    title: "本部と連携して育てる",
    body:
      "一人に運営全体を背負わせません。現場の気づき、課題、参加状況を共有し、本部と一緒に改善します。",
  },
];

const hqResponsibilities = [
  "募集・広報の基本方針",
  "申込・決済・会員管理",
  "料金設定・返金判断",
  "契約・会計・売上管理",
  "個人情報・公式データ管理",
  "ブランド・公式SNS・公式窓口",
  "重大事項の最終判断",
  "県外・海外企画との接続",
];

const localResponsibilities = [
  "トレーニングの実施",
  "当日の受付・準備・撤収",
  "選手の安全確認",
  "保護者への現場案内",
  "活動後の簡潔な報告",
  "事故・トラブルの即時共有",
  "本部と合意した範囲での地域連絡",
  "RBA育成方針に沿った現場改善",
];

const boundaries = [
  "参加費、月謝、返金額を独自に決めない",
  "RBA名義で契約・協賛・発注を独自に行わない",
  "売上・決済アカウントを個人管理しない",
  "会員情報を私物端末へ恒常的に保存・持ち出ししない",
  "選手・保護者の情報を個人活動や別事業へ利用しない",
  "RBAのロゴ・名称・SNSを個人判断で別用途に使わない",
  "未成年選手との連絡を私的な1対1のやり取りに依存しない",
  "写真・動画は本部の方針と同意範囲に沿って扱う",
];

const requirements = [
  "子どもの育成を短期的な勝敗だけで評価しない方",
  "選手・保護者・関係者へ誠実に対応できる方",
  "報告・連絡・相談を継続できる方",
  "RBAの育成方針を学び、現場で試し、改善できる方",
  "沖縄県内で継続して活動できる方",
  "活動日程について事前に調整できる方",
  "安全管理、個人情報、未成年者への配慮を守れる方",
];

const welcome = [
  "育成年代のバスケットボール指導経験",
  "JBA公認コーチライセンス",
  "選手・保護者対応の経験",
  "救命・応急手当に関する知識や受講経験",
  "クラブ、スクール、学校、地域活動などの現場経験",
  "英語など国際交流に生かせる経験",
];

const selection = [
  ["01", "応募", "プロフィール、指導経験、現在の活動、対応可能な曜日・時間帯、応募理由を送ってください。"],
  ["02", "オンライン面談", "RBAの考え方、沖縄でつくりたい環境、これまでの経験、稼働条件を確認します。"],
  ["03", "現場確認", "必要に応じてオンコートでの関わり方を確認します。技術の派手さだけでなく、説明、観察、対話、安全管理を見ます。"],
  ["04", "条件確定", "担当範囲、報酬、交通費、契約期間、活動頻度、連絡方法、権限範囲を開始前に書面で確定します。"],
  ["05", "試行運用", "開始時は月2〜4回程度を目安に、会場と参加状況を見ながら無理のない頻度でスタートします。"],
  ["06", "継続判断", "選手・保護者・コーチ・本部の状況を確認し、双方合意のうえで活動頻度や役割を調整します。"],
];

const faq = [
  [
    "フルタイムの募集ですか？",
    "現時点ではフルタイム前提ではありません。まずは月2〜4回程度を目安に、現在の仕事や指導活動と両立できる形から相談します。",
  ],
  [
    "報酬はいくらですか？",
    "担当範囲、経験、1回あたりの拘束時間、活動頻度などを確認したうえで個別に提示します。開始前に書面で確定し、金額や業務範囲が曖昧なまま活動を始めることはしません。",
  ],
  [
    "業務委託ですか？",
    "契約形態は実際の働き方と担当範囲に合わせて整理します。業務委託とする場合も、業務内容・権限・報酬・契約期間を事前に書面化します。",
  ],
  [
    "指導ライセンスは必須ですか？",
    "必須条件として一律には設けませんが、JBA公認コーチライセンスや育成年代での指導経験は歓迎します。肩書きだけでなく、考え方、人柄、学び続ける姿勢を重視します。",
  ],
  [
    "自分のチームを持っていても応募できますか？",
    "現在の活動との両立が可能で、利益相反や選手勧誘などの問題が起きない形を確認できれば相談可能です。所属選手の移籍勧誘を目的とした活動にはしません。",
  ],
  [
    "仙台から毎回来るのですか？",
    "日常の活動は沖縄の現地コーチを中心に運営し、RBA本部や県外コーチは年に数回の特別クリニックや研修などで関わる形を想定しています。",
  ],
];

export default function OkinawaCoachPage() {
  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(([name, text]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text },
    })),
  };

  return (
    <SiteFrame locale="ja">
      <main className="saga-hub">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
        />

        <section className="inner-hero section-pad">
          <a className="back-link" href="/ja">← RBA</a>
          <p className="section-index">RBA OKINAWA / LOCAL COACH RECRUITMENT</p>
          <h1>
            沖縄で、<br />
            「育てる現場」を一緒につくる。
          </h1>
          <p>
            Riot Basketball Academyは、沖縄で育成年代の選手と向き合う現地コーチを募集します。
            一人に運営全体を背負わせるのではなく、現場指導は沖縄、本部は募集・決済・会員管理・契約・ブランド管理を担当します。
          </p>
          <div className="closing-actions">
            <a className="button button-orange" href="#apply">
              応募条件を見る <ArrowRight size={17} />
            </a>
            <a className="button button-dark" href="/ja/contact">
              応募・相談する <ArrowRight size={17} />
            </a>
          </div>
        </section>

        <section className="access-promise section-pad">
          <p className="section-index">WHY OKINAWA</p>
          <div>
            <h2>毎回県外から人を呼ぶのではなく、沖縄に日常の育成環境を残す。</h2>
            <p>
              日常のトレーニングは現地コーチが中心。RBA本部や県外コーチは、年に数回の特別クリニック、研修、交流機会で関わる。
              交通費や運営負担を抑えながら、継続できる形をつくります。
            </p>
          </div>
        </section>

        <section className="homecourt-product-preview section-pad">
          <div className="section-head">
            <div>
              <p className="section-index">YOUR ROLE</p>
              <h2>お願いしたいのは、まず「現場」。</h2>
            </div>
            <p>経営、会計、決済、契約まで現地コーチへ丸投げする運営にはしません。</p>
          </div>
          <div className="homecourt-preview-grid">
            {roleCards.map(({ icon: Icon, tag, title, body }) => (
              <article key={tag}>
                <Icon size={28} />
                <span>{tag}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="access-promise section-pad">
          <p className="section-index">RESPONSIBILITY</p>
          <div>
            <h2>本部と沖縄現場の責任を分ける。</h2>
            <p>
              「誰が決めるのか」が曖昧なまま始めません。活動開始前に、担当範囲と権限を契約書・業務確認書等で明確にします。
            </p>
          </div>
        </section>

        <section className="access-grid section-pad">
          <article>
            <ShieldCheck size={28} />
            <span>RBA HQ</span>
            <h2>本部が持つ責任</h2>
            {hqResponsibilities.map((item) => (
              <p key={item}>・{item}</p>
            ))}
          </article>
          <article>
            <UserRoundCheck size={28} />
            <span>OKINAWA COACH</span>
            <h2>現地コーチが持つ責任</h2>
            {localResponsibilities.map((item) => (
              <p key={item}>・{item}</p>
            ))}
          </article>
        </section>

        <section className="statement section-pad">
          <p className="section-index">BOUNDARIES</p>
          <div>
            <h2>
              信頼する。<br />
              だから、線引きも明確にする。
            </h2>
            <p>
              子ども、保護者、コーチ、本部の全員を守るため、金銭・個人情報・ブランド・未成年者との連絡には明確なルールを置きます。
            </p>
            {boundaries.map((item) => (
              <p key={item}>
                <CheckCircle2 size={15} aria-hidden="true" /> {item}
              </p>
            ))}
          </div>
        </section>

        <section id="apply" className="homecourt-product-preview section-pad">
          <div className="section-head">
            <div>
              <p className="section-index">WHO WE ARE LOOKING FOR</p>
              <h2>肩書きより、育成への向き合い方。</h2>
            </div>
            <p>
              「強いチームにいた」「有名な選手だった」だけでは決めません。子どもを観察し、対話し、学び続けられる人を探しています。
            </p>
          </div>
          <div className="access-grid">
            <article>
              <BadgeCheck size={28} />
              <span>REQUIRED</span>
              <h2>大切にする条件</h2>
              {requirements.map((item) => (
                <p key={item}>・{item}</p>
              ))}
            </article>
            <article>
              <HeartHandshake size={28} />
              <span>WELCOME</span>
              <h2>あると生かせる経験</h2>
              {welcome.map((item) => (
                <p key={item}>・{item}</p>
              ))}
              <p>
                ※歓迎条件は、すべてを満たす必要はありません。
              </p>
            </article>
          </div>
        </section>

        <section className="access-promise section-pad">
          <p className="section-index">WORKING CONDITIONS</p>
          <div>
            <h2>条件を曖昧なまま始めない。</h2>
            <p>
              開始時は月2〜4回程度を目安に、会場・参加状況・現在の仕事との両立を見ながら調整します。
              報酬、交通費、追加業務、契約期間、連絡方法は開始前に書面で確定します。
            </p>
          </div>
        </section>

        <section className="access-grid section-pad">
          <article>
            <CalendarDays size={28} />
            <span>FREQUENCY</span>
            <h2>活動頻度</h2>
            <p>開始時は月2〜4回程度を目安に協議。継続状況を見ながら増減します。</p>
          </article>
          <article>
            <MapPin size={28} />
            <span>LOCATION</span>
            <h2>活動場所</h2>
            <p>沖縄県内。会場は開催計画と参加者の地域を踏まえ、本部と協議して決定します。</p>
          </article>
          <article>
            <HeartHandshake size={28} />
            <span>COMPENSATION</span>
            <h2>報酬</h2>
            <p>
              経験、担当範囲、拘束時間、活動頻度等を確認して個別提示。イベント等の追加業務は事前に別途協議します。
            </p>
          </article>
          <article>
            <ShieldCheck size={28} />
            <span>CONTRACT</span>
            <h2>契約</h2>
            <p>
              実際の働き方に合う契約形態を整理し、担当業務・権限・報酬・期間を開始前に書面化します。
            </p>
          </article>
        </section>

        <section className="homecourt-product-preview section-pad">
          <div className="section-head">
            <div>
              <p className="section-index">SELECTION FLOW</p>
              <h2>まず話して、合うかを確認する。</h2>
            </div>
            <p>応募したからすぐ現場を任せるのではなく、考え方と役割をすり合わせてから始めます。</p>
          </div>
          <div className="homecourt-preview-grid">
            {selection.map(([index, title, body]) => (
              <article key={index}>
                <span>{index}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="statement section-pad">
          <p className="section-index">WHAT TO SEND</p>
          <div>
            <h2>応募時に教えてほしいこと。</h2>
            <p>長い履歴書から始めなくて構いません。まず以下を送ってください。</p>
            <p>・お名前／年代</p>
            <p>・現在のお仕事、主な活動</p>
            <p>・バスケットボールの競技・指導経験</p>
            <p>・保有ライセンス、資格等</p>
            <p>・沖縄県内で活動できる地域</p>
            <p>・対応可能な曜日、時間帯</p>
            <p>・RBA沖縄に興味を持った理由</p>
            <p>・子どもの育成で大切にしていること</p>
            <p>・SNSや公開プロフィールがあればURL</p>
            <a className="text-link" href="/ja/contact">
              応募・相談する <ArrowRight size={16} />
            </a>
          </div>
        </section>

        <section className="homecourt-product-preview section-pad">
          <div className="section-head">
            <div>
              <p className="section-index">FAQ</p>
              <h2>応募前によくある質問。</h2>
            </div>
          </div>
          <div className="access-grid">
            {faq.map(([question, answer]) => (
              <article key={question}>
                <span>Q</span>
                <h2>{question}</h2>
                <p>{answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="closing-cta section-pad">
          <p className="eyebrow">BUILD RBA OKINAWA</p>
          <h2>
            沖縄に、継続して学べる<br />
            育成の選択肢を。
          </h2>
          <p>
            いきなり大きく始める必要はありません。まず月2〜4回から。
            選手、保護者、現地コーチ、本部が無理なく続けられる形を一緒につくります。
          </p>
          <div className="closing-actions">
            <a className="button button-orange" href="/ja/contact">
              応募・相談する <ArrowRight size={17} />
            </a>
            <a className="button button-dark" href="/ja/work-with-rba">
              RBAとの活動を見る <ArrowRight size={17} />
            </a>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
