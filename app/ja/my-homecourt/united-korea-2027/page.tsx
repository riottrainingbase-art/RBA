import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "RBA UNITED JAPAN｜韓国・仁川 2027｜無料の参加意向登録",
  description: "韓国・仁川IYIBS 2027のRBA UNITED JAPAN参加意向・選考希望の事前登録。参加・渡航・料金は確定前。無料で登録できます。",
  robots: { index: false, follow: false },
};

const interestForm = "https://form.jotform.com/263207310187047";

export default function KoreaUnitedInterestPage() {
  return (
    <SiteFrame locale="ja" languagePage="my-homecourt">
      <section className="network-hero network-hero-united section-pad">
        <a className="back-link" href="/ja/my-homecourt">← MY HOME COURT</a>
        <p className="section-index inverse">RBA UNITED JAPAN / KOREA 2027</p>
        <h1>所属チームを越えて、世界のコートへ。</h1>
        <strong>韓国・仁川 IYIBS 2027｜無料の参加意向登録</strong>
        <p>全国の選手が所属クラブを変えずに集まる、期間限定のRBA UNITED JAPAN。今は参加意思と選考希望を確認する準備段階です。大会への出場や選考結果を保証する受付ではありません。</p>
        <div className="my-homecourt-hero-actions">
          <a className="button button-light" href={interestForm} target="_blank" rel="noopener noreferrer">無料で参加意向を登録する →</a>
          <a className="button button-dark" href="/ja/united">RBA UNITEDについて</a>
        </div>
        <p>※お支払いはありません。未成年の選手については、保護者の方が登録してください。</p>
      </section>

      <section className="homecourt-product-preview section-pad">
        <div className="section-head"><div><p className="section-index">PROGRAMME STATUS / DISCUSSION</p><h2>分かっていること・まだ決まっていないこと。</h2></div></div>
        <div className="homecourt-preview-grid">
          <article><span>01 / EVENT</span><h3>IYIBS 2027</h3><p>2027年1月28〜31日を大会側の提示期間として調整中。渡航日・宿泊日数・正式な旅程は確認中です。</p></article>
          <article><span>02 / TEAM</span><h3>RBA UNITED JAPAN</h3><p>日本全国から選考する個人参加型のチームを計画。既存の所属クラブを辞める必要はありません。</p></article>
          <article><span>03 / ELIGIBILITY</span><h3>年齢・選考は確認中</h3><p>対象カテゴリー、生年月日の基準、登録可能人数、保護者同意と安全管理の条件は正式決定後に案内します。</p></article>
          <article><span>04 / COST</span><h3>総額・返金条件は未確定</h3><p>現地大会・宿泊・食事・送迎の仮見積がありますが、航空券は別途です。RBA独自の選考・事前指導・引率等の運営費、保険、為替、取消条件を確認後に総額をお知らせします。</p></article>
        </div>
        <div className="homecourt-private-note">
          <div><strong>これは無料の事前意向確認です。</strong><p>参加確約・契約・選考合格・座席や客室の確保ではありません。料金の請求やStripe決済、前金の徴収は開始していません。最終条件を確認し、保護者の書面同意を得る前に費用を請求することはありません。</p></div>
        </div>
        <div className="my-homecourt-hero-actions" style={{marginTop:"1.5rem"}}>
          <a className="button button-member" href={interestForm} target="_blank" rel="noopener noreferrer">無料の参加意向登録へ →</a>
          <a className="button button-light" href="/ja/my-homecourt">MY HOME COURTに戻る</a>
        </div>
      </section>
    </SiteFrame>
  );
}
