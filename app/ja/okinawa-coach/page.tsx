import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Globe2,
  GraduationCap,
  HeartHandshake,
  MapPin,
  UsersRound,
} from "lucide-react";
import { SiteFrame } from "@/components/site-frame";

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
      "U12・U15年代を中心に、スキルだけでなく、見る・考える・選ぶ・実行する力を育てます。RBAの考え方を共有しながら、現場に合う内容を一緒につくります。",
  },
  {
    icon: UsersRound,
    tag: "COMMUNICATION",
    title: "選手との対話・保護者との連携",
    body:
      "一方的に教えるのではなく、選手の反応を見ながら問いかけ、考える時間をつくります。活動前後の案内や現場でのコミュニケーションも大切な役割です。",
  },
  {
    icon: MapPin,
    tag: "LOCAL",
    title: "沖縄で続く活動をつくる",
    body:
      "単発のクリニックで終わらず、地域に合った頻度や会場を考えながら、無理なく続けられる育成機会を本部と一緒に育てていきます。",
  },
];

const rbaSupport = [
  {
    icon: HeartHandshake,
    tag: "SUPPORT",
    title: "運営は本部がサポート",
    body:
      "募集、申込、決済、会員管理、料金設定、契約などの運営面はRBA本部が担当します。コーチが現場の指導に集中しやすい形をつくります。",
  },
  {
    icon: GraduationCap,
    tag: "LEARNING",
    title: "コーチ自身も学び続ける",
    body:
      "D-HUBやRBAのコーチネットワーク、オンライン講習などを通じて、指導者自身も新しい考え方や実践を学べます。",
  },
  {
    icon: Globe2,
    tag: "NETWORK",
    title: "県外・海外ともつながる",
    body:
      "RBAが全国・海外でつくっているクリニック、キャンプ、交流機会ともつながります。沖縄の選手に新しい経験を届けることも目指します。",
  },
];

const requirements = [
  "子どもの成長を、目の前の勝敗だけで判断しない方",
  "選手をよく見て、対話しながら指導できる方",
  "RBAの育成方針を学び、現場で試し、振り返れる方",
  "選手・保護者・関係者に誠実に対応できる方",
  "沖縄県内で継続して活動できる方",
];

const welcome = [
  "育成年代の指導経験",
  "JBA公認コーチライセンス",
  "学校・クラブ・スクール・地域活動などでの指導経験",
  "S&C、トレーナー、理学療法など身体づくりに関する経験",
  "英語など、国際交流に生かせる経験",
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
    "仙台から毎回来るのですか？",
    "日常の活動は沖縄の現地コーチを中心に進め、RBA本部や県外コーチは特別クリニック、研修、交流企画などで関わる形を想定しています。",
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
          <a className="back-link" href="/ja">
            ← RBA
          </a>
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
            <a className="button button-orange" href="#apply">
              募集内容を見る <ArrowRight size={17} />
            </a>
            <a className="button button-dark" href="/ja/contact">
              まず話を聞いてみる <ArrowRight size={17} />
            </a>
          </div>
        </section>

        <section className="access-promise section-pad">
          <p className="section-index">WHY OKINAWA</p>
          <div>
            <h2>単発ではなく、沖縄に「続く育成環境」をつくりたい。</h2>
            <p>
              RBAは、県外からコーチが来た日だけ学べる場所ではなく、
              沖縄の子どもたちが日常の中で継続して学べる環境をつくりたいと考えています。
              現地コーチが中心となり、RBA本部や県外・海外のコーチが特別な機会でつながる。
              そんな形を一緒につくっていきます。
            </p>
          </div>
        </section>

        <section className="homecourt-product-preview section-pad">
          <div className="section-head">
            <div>
              <p className="section-index">YOUR ROLE</p>
              <h2>お願いしたいのは、子どもたちと向き合うこと。</h2>
            </div>
            <p>
              指導だけを一方的にお願いするのではなく、RBAの育成方針を共有しながら、沖縄の現場に合う形を一緒に考えます。
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
              <p className="section-index">RBA SUPPORT</p>
              <h2>一人で抱え込まない仕組みにする。</h2>
            </div>
            <p>
              現場のコーチが指導に集中できるように、運営や学びの部分はRBA本部が支えます。
            </p>
          </div>
          <div className="homecourt-preview-grid">
            {rbaSupport.map(({ icon: Icon, tag, title, body }) => (
              <article key={tag}>
                <Icon size={28} />
                <span>{tag}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="apply" className="access-promise section-pad">
          <p className="section-index">WORKING STYLE</p>
          <div>
            <h2>まずは月2〜4回程度から。</h2>
            <p>
              最初から大きなスクール運営を任せる想定ではありません。
              会場、参加人数、現在のお仕事との両立を見ながら、小さく始めて継続できる形をつくります。
            </p>
          </div>
        </section>

        <section className="access-grid section-pad">
          <article>
            <CalendarDays size={28} />
            <span>FREQUENCY</span>
            <h2>活動頻度</h2>
            <p>月2〜4回程度から相談。活動状況を見ながら調整します。</p>
          </article>
          <article>
            <MapPin size={28} />
            <span>LOCATION</span>
            <h2>活動場所</h2>
            <p>沖縄県内。会場やエリアは参加者の状況を見ながら決めていきます。</p>
          </article>
          <article>
            <HeartHandshake size={28} />
            <span>COMPENSATION</span>
            <h2>報酬</h2>
            <p>経験、担当内容、活動時間、頻度を確認したうえで、開始前にお伝えします。</p>
          </article>
          <article>
            <BadgeCheck size={28} />
            <span>LICENSE</span>
            <h2>資格</h2>
            <p>JBA公認コーチライセンス歓迎。必須ではありません。</p>
          </article>
        </section>

        <section className="homecourt-product-preview section-pad">
          <div className="section-head">
            <div>
              <p className="section-index">WHO WE ARE LOOKING FOR</p>
              <h2>肩書きより、子どもとの向き合い方を大切にします。</h2>
            </div>
            <p>
              「強いチームを率いていた」「有名な選手だった」ことだけで判断しません。
              子どもを観察し、問いかけ、一緒に学べる方と活動したいと考えています。
            </p>
          </div>
          <div className="access-grid">
            <article>
              <GraduationCap size={28} />
              <span>IMPORTANT</span>
              <h2>大切にすること</h2>
              {requirements.map((item) => (
                <p key={item}>・{item}</p>
              ))}
            </article>
            <article>
              <HeartHandshake size={28} />
              <span>WELCOME</span>
              <h2>生かせる経験</h2>
              {welcome.map((item) => (
                <p key={item}>・{item}</p>
              ))}
              <p>※すべてを満たす必要はありません。</p>
            </article>
          </div>
        </section>

        <section className="statement section-pad">
          <p className="section-index">HOW TO START</p>
          <div>
            <h2>まずは、一度話しましょう。</h2>
            <p>
              応募時点で長い履歴書は必要ありません。
              現在の活動、これまでの指導経験、対応できそうな曜日や時間帯、
              RBA沖縄に興味を持った理由を簡単に教えてください。
            </p>
            <p>
              お話ししたうえで、お互いに合いそうであれば、
              活動内容・報酬・頻度・契約条件を確認してスタートします。
            </p>
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
          <p className="eyebrow">RBA OKINAWA</p>
          <h2>
            沖縄に、
            <br />
            新しい育成の選択肢を。
          </h2>
          <p>
            まずは月2〜4回から。
            子どもたちにも、コーチにも、無理なく続く環境を一緒につくっていきたいと考えています。
          </p>
          <div className="closing-actions">
            <a className="button button-orange" href="/ja/contact">
              応募・相談する <ArrowRight size={17} />
            </a>
            <a className="button button-dark" href="/ja/coaches">
              RBAの指導者向け活動を見る <ArrowRight size={17} />
            </a>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
