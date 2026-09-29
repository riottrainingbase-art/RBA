import type { Metadata } from "next";
import { BookOpen, CheckCircle2, ExternalLink, Printer } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "RBA COACHING GUIDE Vol.1｜購入者ページ",
  robots: { index: false, follow: false },
};

const sections = [
  ["01", "U12育成の目的を決め直す", [
    "U12の練習を目の前の試合で勝つためだけに最適化すると、運ぶ子、打つ子、リバウンドだけする子のように役割が固定され、経験が偏りやすくなります。",
    "RBAでは、若い選手に多くの参加機会を与え、身体能力・技術・ゲーム理解を伸ばすというFIBA/WABCの育成原則を、「将来の選択肢を減らさない育成」と捉えます。",
  ]],
  ["02", "発達段階を無視しない", [
    "同じ12歳でも、競技経験・身体発達・理解度は違います。年齢は目安であり、実際の課題は一人ひとりの現在地に合わせて調整します。",
    "成功率が極端に低ければ距離や速度を下げる。簡単すぎれば守備者、時間制限、非利き手などを追加する。難しいことを早く教えるより、適切な難易度で成功と失敗を繰り返せる環境を優先します。",
  ]],
  ["03", "「基礎」を技の型だけにしない", [
    "Fundamentalsは、フォームだけではありません。止まる・走る・跳ぶ・方向転換・バランス、ボール操作、認知、判断、タイミング、スペーシングまでを基礎として扱います。",
    "「できる技」を増やすだけでなく、「いつ使うか」を学ぶ。ここまで含めて基礎です。",
  ]],
  ["04", "Game-Based Teaching", [
    "Game-Based Teachingは、技術を教えない方法でも、自由にゲームをさせるだけの方法でもありません。ゲームに近い課題を置き、そこで必要になる技術や判断を意味のある文脈の中で学ばせます。",
    "基本サイクルは PLAY → OBSERVE → ASK → MODIFY → PLAY AGAIN。最小限のルールでまずプレーし、観察し、短く問い、人数・スペース・ルールを調整して再びプレーします。",
  ]],
  ["05", "3x3・4x4を育成装置として使う", [
    "少人数ゲームは、一人ひとりがボールに関わる回数を増やし、コート上のスペースを広げます。5x5では隠れられる選手も、3x3や4x4では攻守の問題を自分で解く必要があります。",
    "制約は1ゲーム1テーマ程度にします。例：パス後に同じ場所へ残らない、ペイントアタック後の得点を高く評価する、全員が一度触ってから得点可能、など。",
  ]],
  ["06", "スペースと動きを先に学ばせる", [
    "若い選手はボールを受けたい気持ちからボールへ寄りやすく、味方のドライブコースやパスコースを消してしまいます。",
    "U12では、味方がドライブできる空間を残す、パス後に立ち止まらない、守備の位置を見てカット・リプレイス・ステイを選ぶ、という3原則を繰り返します。",
  ]],
  ["07", "技術をゲーム文脈につなげる", [
    "無防備の反復は動作理解に役立ちます。ただし、FORM → READ → PLAYの3段階で守備・時間・スペースを追加し、ゲームで使える状態へつなげます。",
    "評価も、入った・外れた、だけではなく、キャッチ前に見たか、適切な選択だったか、次のプレーで修正したかを含めます。",
  ]],
  ["08", "問いかけで判断を育てる", [
    "問いは短く、次のプレーですぐ試せるものにします。「今、誰が見えていた？」「一番空いていた方向は？」「パスした後、何ができる？」など。",
    "毎プレー止めて解説すると自己修正の時間を奪います。必要なら個別に短く伝え、ゲーム全体はできるだけ動かし続けます。",
  ]],
  ["09", "練習を設計する", [
    "今日、選手に何を発見してほしいかを1文で決める。最後に行うゲームを決める。そのゲームに必要な技術を逆算する。技術練習にも判断要素を1つ足す。説明時間を削り、プレー回数を増やす。",
    "90分の目安は Movement 10分 / Skill+Read 15分 / 1x1・2x2 20分 / 3x3・4x4 25分 / Game 15分 / Reflection 5分。",
  ]],
  ["10", "RBA式 90分U12セッション", [
    "テーマ：ドライブで優位を作り、味方とスペースを共有する。",
    "0-8分 Mirror movement + ball / 8-18分 Partner pass & move / 18-30分 1x1 advantage start / 30-45分 2x2 drive or pass / 45-65分 3x3 pass-cut-replace / 65-82分 free game / 82-88分 shooting game / 88-90分 reflection。",
  ]],
  ["11", "よくある失敗と修正", [
    "説明が長い → まずプレーさせて後から補足。列が長い → 2〜4人単位に分ける。技術が孤立 → 守備・選択肢を追加。上手い子中心 → 少人数ゲーム＋条件調整。",
    "判断に迷ったら「この練習は、全員に何回の判断機会を与えているか？」を数えてください。",
  ]],
  ["12", "コーチ用チェックリスト", [
    "練習前：テーマを1文で言える／最後のゲームにつながる／全員のプレー回数がある／難易度を上下できる／安全確認。",
    "練習中：説明よりプレーが長い／一部選手だけが支配していない／失敗を止めすぎない／答えを言う前に質問する。",
    "練習後：選手自身が振り返った／テーマがゲーム内で現れた／次回に残す課題を1つ決めた。",
  ]],
] as const;

export default function Page() {
  return <SiteFrame locale="ja">
    <section className="inner-hero section-pad">
      <p className="section-index">PURCHASER ACCESS / RBA COACHING GUIDE VOL.1</p>
      <h1>U12で、<br/>本当に教えるべきこと。</h1>
      <p>ご購入ありがとうございます。このページは購入者向けのデジタル教材です。必要な章から読み、次回の練習を一つだけ組み替えてみてください。</p>
      <div className="closing-actions">
        <a className="button button-dark" href="#guide">教材を読む<CheckCircle2 size={17}/></a>
        <a className="button button-orange" href="#worksheet">ワークシートへ<CheckCircle2 size={17}/></a>
      </div>
    </section>

    <section className="access-promise section-pad">
      <p className="section-index">IMPORTANT</p>
      <div>
        <h2>FIBA / WABC公式翻訳ではありません。</h2>
        <p>本教材は、FIBA / WABCが無料公開している育成資料を参照し、RBAが独自に要約・解釈して日本のU12指導現場向けに再構成した教材です。公式原文の代替ではありません。</p>
      </div>
    </section>

    <section className="homecourt-product-preview section-pad" id="guide">
      <div className="section-head">
        <div><p className="section-index">GUIDE</p><h2>12のテーマ</h2></div>
        <p>一度に全部変える必要はありません。今のチームで一番必要な章から使ってください。</p>
      </div>
      <div className="homecourt-preview-grid">
        {sections.map(([n,title,paras])=><article key={n}>
          <span>{n}</span>
          <h3>{title}</h3>
          {paras.map(p=><p key={p}>{p}</p>)}
        </article>)}
      </div>
    </section>

    <section className="hosting-ready section-pad" id="worksheet">
      <div><p className="section-index">BONUS WORKSHEET</p><h2>次回練習を組み直す6つの質問</h2></div>
      <ul>
        {[
          ["01","今日、選手に何を発見してほしい？"],
          ["02","最後にどんなゲームをする？"],
          ["03","そのゲームで必要になる技術は？"],
          ["04","学習を起こすために何を1つ変える？"],
          ["05","選手へ何を聞く？"],
          ["06","簡単にする方法／難しくする方法は？"],
        ].map(([n,t])=><li key={n}><span>{n}</span><div><strong>{t}</strong><p>紙やノートに1〜2行で書いてから練習を始めてください。</p></div><CheckCircle2/></li>)}
      </ul>
    </section>

    <section className="statement section-pad">
      <p className="section-index">OFFICIAL SOURCES</p>
      <div>
        <h2>必ず公式資料にも戻る。</h2>
        <p>RBAは、公式資料を読まずにこの教材だけを「正解」として使うことを推奨しません。FIBA / WABCの原資料を確認し、自分の現場で試し、振り返ることを前提にしています。</p>
        <div className="closing-actions">
          <a className="text-link" href="https://about.fiba.basketball/en/wabc-documents" target="_blank" rel="noreferrer"><BookOpen size={16}/>WABC Coaching Documents<ExternalLink size={14}/></a>
          <a className="text-link" href="https://assets.fiba.basketball/image/upload/documents-corporate-wabc-coaching-manual-mini-basketball-eng.pdf" target="_blank" rel="noreferrer"><BookOpen size={16}/>Mini-Basketball Coaches Manual<ExternalLink size={14}/></a>
        </div>
      </div>
    </section>

    <section className="closing-cta section-pad">
      <p className="eyebrow">USE / COPYRIGHT</p>
      <h2>購入者本人の学習と、<br/>指導準備のために。</h2>
      <p>教材そのものの無断転載、再配布、公開共有、転売は禁止します。必要に応じてブラウザの印刷機能から個人用PDFとして保存できます。</p>
      <div className="closing-actions">
        <span className="button button-dark"><Printer size={17}/>ブラウザの印刷からPDF保存</span>
      </div>
    </section>
  </SiteFrame>;
}
