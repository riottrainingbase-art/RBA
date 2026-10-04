import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Globe2,
  GraduationCap,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { SiteFrame } from "@/components/site-frame";

const APPLY_URL = "https://form.jotform.com/262765305419057";

export const metadata: Metadata = {
  title: { absolute: "RBA沖縄｜育成年代バスケットボール コーチ募集" },
  description:
    "Riot Basketball Academy（RBA）は、沖縄で育成年代の選手に継続して学べる環境をつくるため、現地で指導に関わっていただけるコーチを募集しています。まずは月2〜4回程度から相談できます。",
  keywords: [
    "沖縄 バスケットボール コーチ 募集",
    "沖縄 バスケ 指導者",
    "沖縄 ミニバス コーチ",
    "沖縄 U12 バスケ",
    "沖縄 U15 バスケ",
    "バスケットボール 指導 沖縄",
    "Riot Basketball Academy",
    "RBA 沖縄",
  ],
  alternates: { canonical: "https://riotbasketballacademy.com/ja/okinawa-coach" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "RBA沖縄｜コーチ募集",
    description:
      "沖縄で、子どもたちの育成に一緒に関わってくれるコーチを募集しています。まずは月2〜4回程度から。",
    url: "https://riotbasketballacademy.com/ja/okinawa-coach",
    siteName: "Riot Basketball Academy",
    locale: "ja_JP",
    type: "website",
    images: ["https://riotbasketballacademy.com/rba-court-hero.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "RBA沖縄｜コーチ募集",
    description:
      "沖縄で、子どもたちの育成に一緒に関わってくれるコーチを募集しています。",
    images: ["https://riotbasketballacademy.com/rba-court-hero.png"],
  },
};

const roleCards = [
  {
    icon: GraduationCap,
    tag: "COACHING",
    title: "育成年代のトレーニング",
    body:
      "U12・U15年代を中心に、技術だけでなく、見る・考える・選ぶ・実行する力を育てます。RBAの考え方を共有しながら、沖縄の現場に合う内容を一緒につくります。",
  },
  {
    icon: UsersRound,
    tag: "COMMUNICATION",
    title: "選手との対話",
    body:
      "一方的に答えを与えるのではなく、選手の反応を見ながら問いかけ、試し、振り返る時間をつくります。保護者との現場でのコミュニケーションも大切にします。",
  },
  {
    icon: MapPin,
    tag: "LOCAL",
    title: "沖縄で続く活動をつくる",
    body:
      "単発のクリニックだけではなく、地域に合った頻度や会場を考えながら、子どもたちが継続して学べる機会を育てていきます。",
  },
];

const involvementCards = [
  {
    tag: "REGULAR COACH",
    title: "定期セッションを担当する",
    body:
      "月2〜4回程度の育成セッションを中心に、継続して選手を見る関わり方です。毎回すべてを一人で担う前提ではなく、活動規模に合わせて体制をつくります。",
  },
  {
    tag: "ASSIST / CLINIC",
    title: "アシスタント・単発から関わる",
    body:
      "まずは特別クリニックやイベントのサポートから関わることも可能です。現在の仕事やチーム活動がある方も、無理のない頻度から相談できます。",
  },
  {
    tag: "S&C / SUPPORT",
    title: "身体づくりの専門性を生かす",
    body:
      "S&C、トレーナー、理学療法などの経験がある方は、身体づくりやコンディショニングの面から関わる形も相談できます。",
  },
];

const supportCards = [
  {
    icon: HeartHandshake,
    tag: "OPERATIONS",
    title: "運営はRBA本部が支える",
    body:
      "募集、申込、決済、会員管理、料金設定などの運営面は本部が担当します。現地コーチが、できるだけ指導と選手に向き合う時間へ集中できる形にします。",
  },
  {
    icon: GraduationCap,
    tag: "COACH DEVELOPMENT",
    title: "コーチ自身も学び続ける",
    body:
      "RBAの指導方針や教材を共有し、必要に応じてD-HUB、指導者講習、コーチネットワークなどの学習機会にもつなげます。",
  },
  {
    icon: Globe2,
    tag: "JAPAN × ASIA",
    title: "県外・海外ともつながる",
    body:
      "RBAが全国やアジアで行うクリニック、キャンプ、交流企画と、内容や条件が合う場合に連携する機会をつくります。沖縄の選手とコーチが地域の外にも学びを広げられる形を目指します。",
  },
];

const values = [
  "目の前の勝敗だけで、子どもの可能性を決めつけない",
  "教え込むだけではなく、選手が考える時間をつくる",
  "できた・できないだけでなく、挑戦の過程を見る",
  "自分の指導を振り返り、学び続ける",
  "選手・保護者・ほかの指導者に誠実である",
];

const welcome = [
  "育成年代のバスケットボール指導経験",
  "JBA公認コーチライセンス",
  "学校・クラブ・スクール・地域活動などでの指導経験",
  "S&C、トレーナー、理学療法など身体づくりに関する経験",
  "英語など、国際交流に生かせる経験",
];

const flow = [
  ["01", "フォームから連絡", "正式応募だけでなく「まず話を聞きたい」でも大丈夫です。2〜3分程度のフォームから送ってください。"],
  ["02", "オンラインで話す", "これまでの経験、現在の活動、沖縄でどんな関わり方ができそうかをお互いに確認します。"],
  ["03", "必要に応じて現場で確認", "指導経験がある方は、必要に応じて実際のオンコートでの関わり方も確認します。派手な技術より、観察・対話・安全への配慮を見ます。"],
  ["04", "条件を確認してスタート", "役割、頻度、報酬、交通費、契約条件などを確認し、双方が納得したうえで始めます。"],
];

const faq = [
  [
    "フルタイムの募集ですか？",
    "いいえ。まずは月2〜4回程度を目安に、現在のお仕事やチームでの活動と両立できる形から相談できます。",
  ],
  [
    "報酬はありますか？",
    "はい。経験、担当内容、活動時間、頻度などを確認したうえで事前にお伝えします。交通費や追加業務がある場合も、開始前に確認します。",
  ],
  [
    "指導ライセンスは必要ですか？",
    "必須ではありません。JBA公認コーチライセンスや指導経験は歓迎しますが、肩書きだけでなく、育成への考え方や人柄を重視します。",
  ],
  [
    "今、自分のチームを指導していても応募できますか？",
    "可能です。現在の活動を尊重しながら、無理なく両立できる形を相談します。",
  ],
  [
    "競技歴が長くないと難しいですか？",
    "競技歴だけで判断しません。子どもをよく見て学び続けられること、RBAの考え方を理解しようとする姿勢を大切にします。",
  ],
  [
    "仙台から毎回来るのですか？",
    "日常の活動は沖縄の現地コーチを中心に進め、RBA本部や県外コーチは特別クリニック、研修、交流企画などで関わる形を想定しています。",
  ],
  [
    "まだ応募するか決めていません。",
    "問題ありません。「少し興味がある」「話だけ聞いてみたい」という段階でもフォームから相談できます。",
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

  const jobJson = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: "育成年代バスケットボール コーチ（沖縄）",
    description:
      "沖縄で育成年代の選手に継続して学べる環境をつくるRiot Basketball Academyの現地コーチ募集です。まずは月2〜4回程度から相談できます。",
    datePosted: "2026-10-05",
    directApply: true,
    hiringOrganization: {
      "@type": "Organization",
      name: "Riot Basketball Academy",
      sameAs: "https://riotbasketballacademy.com",
      logo: "https://riotbasketballacademy.com/rba-logo-original.jpg",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressRegion: "沖縄県",
        addressCountry: "JP",
      },
    },
    qualifications:
      "JBA公認コーチライセンスや育成年代での指導経験は歓迎しますが、必須ではありません。",
    responsibilities:
      "育成年代のトレーニング、選手との対話、保護者との現場コミュニケーション、RBA本部との活動共有。",
    url: "https://riotbasketballacademy.com/ja/okinawa-coach",
  };

  return (
    <SiteFrame locale="ja">
      <div className="saga-hub">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobJson) }} />

        <section className="inner-hero section-pad">
          <a className="back-link" href="/ja">← RBA</a>
          <p className="section-index">RBA OKINAWA / COACH RECRUITMENT</p>
          <h1>
            沖縄で、
            <br />
            子どもたちの育成に関わる。
          </h1>
          <p>
            Riot Basketball Academyでは、沖縄で継続的な育成活動をつくっていくため、
            現地で指導に関わっていただけるコーチを探しています。
            まずは月2〜4回程度から。現在のお仕事やチームでの活動と両立しながら関わることも可能です。
          </p>
          <div className="closing-actions">
            <a className="button button-orange" href={APPLY_URL} target="_blank" rel="noreferrer">
              応募・相談フォーム（約3分） <ArrowRight size={17} />
            </a>
            <a className="button button-dark" href="#details">
              募集内容を見る <ArrowRight size={17} />
            </a>
          </div>
          <p>正式応募でなくても、「まず話を聞きたい」という段階で大丈夫です。</p>
        </section>

        <section className="access-promise section-pad">
          <p className="section-index">WHY OKINAWA</p>
          <div>
            <h2>県外から誰かが来た日だけではなく、沖縄に「日常の育成環境」を。</h2>
            <p>
              RBAがつくりたいのは、一度きりの特別イベントだけではありません。
              沖縄の子どもたちが、普段の生活の中で継続して学び、試し、成長できる場所です。
              日常は現地コーチが中心になり、RBA本部や県外・海外のコーチが特別な機会でつながる。
              その循環を沖縄でつくりたいと考えています。
            </p>
          </div>
        </section>

        <section className="homecourt-product-preview section-pad">
          <div className="section-head">
            <div>
              <p className="section-index">WHAT YOU WILL DO</p>
              <h2>お願いしたいのは、子どもたちと向き合うこと。</h2>
            </div>
            <p>
              決められたメニューをただ回す役割ではありません。
              RBAの育成方針を共有し、沖縄の選手を見ながら、現場に合う学び方を一緒につくります。
            </p>
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

        <section className="homecourt-product-preview section-pad">
          <div className="section-head">
            <div>
              <p className="section-index">WHAT RBA BRINGS</p>
              <h2>コーチ一人に、全部を背負わせない。</h2>
            </div>
            <p>
              RBA本部は運営を支えるだけでなく、指導者の学びや全国・海外との接点もつくります。
              「沖縄の現場」と「RBAのネットワーク」をつなぐ形です。
            </p>
          </div>
          <div className="homecourt-preview-grid">
            {supportCards.map(({ icon: Icon, tag, title, body }) => (
              <article key={tag}>
                <Icon size={28} />
                <span>{tag}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="homecourt-product-preview section-pad">
          <div className="section-head">
            <div>
              <p className="section-index">WAYS TO JOIN</p>
              <h2>関わり方は、一つに決めなくて大丈夫です。</h2>
            </div>
            <p>
              定期的に担当する形だけでなく、アシスタントや単発クリニック、身体づくりのサポートなど、
              経験や現在の生活に合う関わり方から始められます。
            </p>
          </div>
          <div className="homecourt-preview-grid">
            {involvementCards.map(({ tag, title, body }) => (
              <article key={tag}>
                <span>{tag}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="access-promise section-pad">
          <p className="section-index">NOT A NEW CLUB TEAM</p>
          <div>
            <h2>所属チームを変えてもらうための活動ではありません。</h2>
            <p>
              RBA沖縄は、新しいクラブチームをつくって選手を囲い込むことを目的にしていません。
              子どもたちが今いるチームや学校での活動を大切にしながら、
              もう一つ学べる場所を地域につくることを目指します。
            </p>
          </div>
        </section>

        <section id="details" className="access-promise section-pad">
          <p className="section-index">WORKING STYLE</p>
          <div>
            <h2>小さく始めて、続けられる形をつくる。</h2>
            <p>
              最初から大きなスクール運営を任せる想定ではありません。
              まずは月2〜4回程度を目安に、会場、参加人数、現在のお仕事との両立を見ながら始めます。
              活動を続ける中で、必要に応じて頻度や役割を調整していきます。
            </p>
          </div>
        </section>

        <section className="access-grid section-pad">
          <article>
            <CalendarDays size={28} />
            <span>FREQUENCY</span>
            <h2>活動頻度</h2>
            <p>月2〜4回程度から相談。現在の仕事やチーム活動との両立も可能です。</p>
          </article>
          <article>
            <MapPin size={28} />
            <span>LOCATION</span>
            <h2>活動場所</h2>
            <p>沖縄県内。会場やエリアは、参加者の状況や活動内容を見ながら決めていきます。</p>
          </article>
          <article>
            <HeartHandshake size={28} />
            <span>COMPENSATION</span>
            <h2>報酬</h2>
            <p>経験、担当内容、活動時間、頻度を確認し、活動開始前に条件をお伝えします。</p>
          </article>
          <article>
            <BadgeCheck size={28} />
            <span>LICENSE</span>
            <h2>資格</h2>
            <p>JBA公認コーチライセンス歓迎。必須ではありません。経験だけでなく、育成への姿勢を重視します。</p>
          </article>
        </section>

        <section className="statement section-pad">
          <p className="section-index">RBA COACHING VALUES</p>
          <div>
            <h2>
              「何を知っているか」だけでなく、
              <br />
              「どう子どもを見るか」。
            </h2>
            <p>
              RBAでは、指導者の肩書きや過去の競技実績だけで判断しません。
              育成年代のコーチとして大切にしたい考え方があります。
            </p>
            {values.map((item) => (
              <p key={item}>
                <Sparkles size={15} aria-hidden="true" /> {item}
              </p>
            ))}
          </div>
        </section>

        <section className="access-promise section-pad">
          <p className="section-index">CHILD SAFEGUARDING</p>
          <div>
            <h2>子どもの安全と尊重を、指導より先に。</h2>
            <p>
              RBAでは、選手との適切な距離、保護者への透明な連絡、写真・動画や個人情報の扱い、
              ケガや事故が起きたときの共有を大切にします。
              威圧や恐怖で選手を動かすのではなく、安全に挑戦できる環境をつくることを共通の前提にします。
            </p>
          </div>
        </section>

        <section className="homecourt-product-preview section-pad">
          <div className="section-head">
            <div>
              <p className="section-index">EXPERIENCE</p>
              <h2>こんな経験があれば、生かせます。</h2>
            </div>
            <p>
              すべてを満たす必要はありません。指導経験が浅い方でも、学ぶ姿勢があり、育成年代に丁寧に向き合える方は相談してください。
            </p>
          </div>
          <div className="access-grid">
            <article>
              <GraduationCap size={28} />
              <span>WELCOME</span>
              <h2>歓迎する経験</h2>
              {welcome.map((item) => (
                <p key={item}>・{item}</p>
              ))}
            </article>
            <article>
              <MessageCircle size={28} />
              <span>FIRST CONTACT</span>
              <h2>まだ迷っていても大丈夫です</h2>
              <p>
                「正式に応募するかは決めていない」「どんな活動になるのか聞きたい」という段階でも構いません。
                フォームで「まず話を聞きたい」を選んでください。
              </p>
              <a className="text-link" href={APPLY_URL} target="_blank" rel="noreferrer">
                応募・相談フォームを開く <ArrowRight size={16} />
              </a>
            </article>
          </div>
        </section>

        <section className="homecourt-product-preview section-pad">
          <div className="section-head">
            <div>
              <p className="section-index">HOW IT STARTS</p>
              <h2>応募して、すぐ任せるわけではありません。</h2>
            </div>
            <p>
              お互いの考え方や現在の活動を確認してから、無理のない形で始めます。
            </p>
          </div>
          <div className="homecourt-preview-grid">
            {flow.map(([index, title, body]) => (
              <article key={index}>
                <span>{index}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="access-promise section-pad">
          <p className="section-index">OPERATIONS</p>
          <div>
            <h2>現場と運営の役割は、始める前に確認します。</h2>
            <p>
              募集・申込・決済・会員管理などの運営はRBA本部が担当します。
              現地コーチには、合意した範囲で指導と現場対応をお願いします。
              報酬、交通費、活動頻度、担当範囲、連絡方法などは、実際の役割に合わせて開始前に確認します。
            </p>
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
          <p className="eyebrow">RBA OKINAWA</p>
          <h2>
            沖縄に、
            <br />
            新しい育成の選択肢を。
          </h2>
          <p>
            いきなり大きく始める必要はありません。
            まずは一度話して、お互いに合う形を探しましょう。
          </p>
          <div className="closing-actions">
            <a className="button button-orange" href={APPLY_URL} target="_blank" rel="noreferrer">
              応募・相談フォーム <ArrowRight size={17} />
            </a>
            <a className="button button-dark" href="/ja/coaches">
              RBAの指導者向け活動を見る <ArrowRight size={17} />
            </a>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
