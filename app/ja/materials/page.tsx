import type { Metadata } from "next";
import { ArrowRight, BookOpen, CheckCircle2, LockKeyhole } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import { getDigitalMaterial, U12_MATERIAL_SLUG, U12_OFFER_OPTION } from "@/lib/digital-material-access";

export const metadata: Metadata = {
  title: "RBA COACHING MATERIALS｜指導者向け教材",
  description: "Riot Basketball Academyが、日本の育成年代の現場で使える形に整理した指導者向けデジタル教材。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/materials" },
};

export default async function Page() {
  const { hasAccess } = await getDigitalMaterial(U12_MATERIAL_SLUG);

  return <SiteFrame locale="ja">
    <section className="inner-hero section-pad">
      <p className="section-index">RBA COACHING MATERIALS</p>
      <h1>知識を読むだけでなく、<br/>次の練習で使える形へ。</h1>
      <p>RBAが国内外の公開資料、現場での指導経験、練習設計の考え方を整理し、日本の育成年代で実践しやすい形にしたデジタル教材です。</p>
    </section>

    <section className="homecourt-product-preview section-pad">
      <div className="section-head">
        <div>
          <p className="section-index">VOL.1 / U12 DEVELOPMENT</p>
          <h2>U12で本当に教えるべきこと</h2>
        </div>
        <p>FIBA/WABCの公開コーチング資料を参照しながら、発達段階、Game-Based Teaching、Fundamentals、3x3・4x4、練習設計までをRBAの視点で再構成しました。</p>
      </div>

      <div className="homecourt-preview-grid">
        <article>
          <BookOpen aria-hidden="true"/>
          <span>RBA COACHING GUIDE Vol.1</span>
          <h3>基礎・判断・ゲームを、分けて考えない。</h3>
          <p>「何を教えるか」だけではなく、「何を見て、どう判断し、どうゲームへつなぐか」を整理します。</p>
          <ul>
            <li>発達段階とスキルレベル</li>
            <li>Game-Based Teaching</li>
            <li>身体操作とFundamentals</li>
            <li>3x3・4x4の使い方</li>
            <li>RBAオリジナル90分練習テンプレート</li>
            <li>4週間の実装プラン・評価チェックリスト</li>
          </ul>
        </article>
        <article>
          {hasAccess ? <CheckCircle2 aria-hidden="true"/> : <LockKeyhole aria-hidden="true"/>}
          <span>{hasAccess ? "PURCHASED" : "ONE-TIME PURCHASE"}</span>
          <h3>{hasAccess ? "購入済みです" : "3,300円（税込）"}</h3>
          <p>{hasAccess ? "RBA IDでいつでも教材を読み返せます。" : "月額課金ではありません。RBA IDでログインして購入すると、購入後すぐに教材ページへアクセスできます。"}</p>
          <div className="closing-actions">
            <a className="button button-orange" href={hasAccess ? "/ja/materials/u12-fundamentals" : `/api/commerce/checkout/${U12_OFFER_OPTION}?locale=ja`}>
              {hasAccess ? "教材を読む" : "購入して読む"}<ArrowRight size={17}/>
            </a>
          </div>
        </article>
      </div>
    </section>

    <section className="access-promise section-pad">
      <p className="section-index">SOURCE / POSITION</p>
      <div>
        <h2>公式資料の「翻訳販売」ではありません。</h2>
        <p>本教材は、FIBA/WABCが無料公開しているコーチング資料を参照し、Riot Basketball Academyが日本のU12現場向けに独自に解説・再構成したものです。FIBA/WABCの公式翻訳・公式教材ではなく、FIBA/WABCによる承認・推奨を意味するものでもありません。</p>
      </div>
    </section>
  </SiteFrame>;
}
