import styles from "./gream-annual-plan.module.css";

type Event = {
  when: string;
  name: string;
  status: "参加候補" | "出場枠獲得時" | "開催・招待時";
};

const plans = {
  sendai: {
    name: "GREAM SENDAI",
    registration: "2027年度はJBAのチーム・選手登録を進める予定です。登録区分と大会ごとの参加資格・期限を確認して申し込みます。",
    summary: "公式戦と交流戦を合わせて年間20〜28試合を目標にしています。対戦機会の計画値で、試合数は参加条件や大会方式によって変わります。",
    sources: [
      { label: "宮城県バスケットボール協会", href: "https://miyagi.japanbasketball.jp/" },
      { label: "宮城県U15部会・MDL", href: "https://sites.google.com/view/mdl-u15/u15%E9%83%A8%E4%BC%9A%E8%AB%B8%E9%80%A3%E7%B5%A1" },
    ],
    events: [
      { when: "4〜5月頃", name: "宮城県U15育成リーグ（MDL-U15）第1期", status: "参加候補" },
      { when: "6〜8月頃", name: "宮城県U15バスケットボールクラブカップ", status: "開催・招待時" },
      { when: "8月頃", name: "U15東北ブロッククラブリーグ", status: "出場枠獲得時" },
      { when: "9月頃", name: "宮城県U14リーグ（MDL-U14）", status: "参加候補" },
      { when: "10〜11月頃", name: "宮城県U15選手権（Jr.ウインターカップ県予選）", status: "参加候補" },
      { when: "翌年1月頃", name: "Jr.ウインターカップ 全国U15選手権", status: "出場枠獲得時" },
      { when: "翌年2月頃", name: "宮城県U15育成リーグ（MDL-U15）第2期", status: "開催・招待時" },
      { when: "翌年2月頃", name: "89ERS Youth Friendly Games", status: "開催・招待時" },
      { when: "翌年2〜3月頃", name: "宮城県U14選手権", status: "開催・招待時" },
    ],
  },
  akita: {
    name: "DSM GREAM AKITA",
    registration: "年度ごとのJBA登録と、大会ごとの年齢・登録区分・参加資格を確認します。U14とU15の出場枠は主催者の要項に沿って調整します。",
    summary: "県リーグと県選手権を軸に、東北大会や県外チームとの対戦機会を検討しています。",
    sources: [
      { label: "秋田県バスケットボール協会 U15", href: "https://akita.pba-japanbasketball.jp/u15/" },
      { label: "秋田県協会 年間日程", href: "https://akita.pba-japanbasketball.jp/schedule/" },
    ],
    events: [
      { when: "7月頃", name: "秋田県U15クラブ選手権（東北ブロック大会の県予選）", status: "開催・招待時" },
      { when: "8月頃", name: "U15東北ブロッククラブリーグ", status: "出場枠獲得時" },
      { when: "9月頃〜年度後半", name: "秋田県U15リーグ", status: "参加候補" },
      { when: "10月頃〜年度後半", name: "秋田県U14県・ブロックリーグ", status: "参加候補" },
      { when: "10〜11月頃", name: "秋田県U15選手権（Jr.ウインターカップ県予選）", status: "参加候補" },
      { when: "翌年1月頃", name: "Jr.ウインターカップ 全国U15選手権", status: "出場枠獲得時" },
    ],
  },
} satisfies Record<string, {
  name: string;
  registration: string;
  summary: string;
  sources: { label: string; href: string }[];
  events: Event[];
}>;

const camps = [
  { season: "ゴールデンウィーク", timing: "4月末〜5月上旬", focus: "新年度のチーム交流。個人技術と少人数ゲームからスタート。" },
  { season: "夏休み", timing: "7〜8月", focus: "合同練習、ゲーム、プレーの振り返り。" },
  { season: "冬休み", timing: "12月末〜翌年1月", focus: "試合で見えた課題を整理し、次のプレーを試す。" },
  { season: "春休み", timing: "翌年3月・追加候補", focus: "年度の振り返りと進級に向けた交流。日程が合えば実施。" },
];

export function GreamAnnualPlan({ team }: { team: keyof typeof plans }) {
  const plan = plans[team];
  return (
    <section id="annual-plan-2027" aria-labelledby="annual-plan-2027-heading" className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>2027–28 SEASON / {plan.name}</p>
        <h2 id="annual-plan-2027-heading">2027年度の年間活動計画</h2>
        <p className={styles.lead}>2027年4月〜2028年3月の計画案です。各大会の開催時期は過年度を参考にした目安で、2027年度の日程・出場枠・参加費は主催者発表とチームの申込状況に合わせて更新します。</p>
        <p>{plan.registration} {plan.summary}</p>

        <h3>年間の参加大会・交流戦</h3>
        <ul className={styles.events}>
          {plan.events.map((event) => (
            <li key={event.name}>
              <span>{event.when}</span>
              <strong>{event.name}</strong>
              <small>{event.status}</small>
            </li>
          ))}
          <li>
            <span>通年</span>
            <strong>地域の招待大会・県内外の交流戦</strong>
            <small>相手・会場を調整</small>
          </li>
        </ul>
        <p className={styles.links}>
          {plan.sources.map(({ label, href }) => <a key={href} href={href}>{label} ↗</a>)}
        </p>

        <h3>GREAM合同キャンプは、長期休みに年3〜4回</h3>
        <p>GREAM SENDAIとDSM GREAM AKITAを中心に、普段は別の地域で練習する選手が同じコートに立つ機会を計画しています。学校の休みと公式戦の日程を見ながら、会場・宿泊・参加対象を決めます。</p>
        <ul className={styles.camps}>
          {camps.map(({ season, timing, focus }) => (
            <li key={season}>
              <span>{timing}</span>
              <strong>{season}</strong>
              <p>{focus}</p>
            </li>
          ))}
        </ul>
        <p><a href="#shizugawa-camp-2026">前回の志津川合同キャンプを見る ↓</a></p>

        <h3>海外遠征・国際交流</h3>
        <p>海外チームとの交流試合や合同練習を候補に、参加希望者向けの遠征を検討しています。渡航先、時期、対象、帯同体制、保険、費用を確認したうえで、募集前にご案内します。</p>

        <div id="travel-budget-2027" className={styles.budget}>
          <p className={styles.eyebrow}>TRAVEL BUDGET / PER PLAYER</p>
          <h3>年間遠征費の目安（選手1人）</h3>
          <p>国内の大会・交流と合同キャンプに参加する場合の家計向け試算です。参加回数、移動方法、宿泊条件で変わります。</p>
          <dl>
            <div><dt>日帰りの大会・交流</dt><dd>4〜6回 × 3,000〜6,000円</dd></div>
            <div><dt>GREAM合同キャンプ</dt><dd>3〜4回 × 20,000〜25,000円</dd></div>
            <div><dt>キャンプと別の国内宿泊遠征</dt><dd>0〜2回 × 15,000〜25,000円</dd></div>
            <div><dt>国内合計（年間の試算）</dt><dd><strong>約7.2万〜18.6万円</strong></dd></div>
            <div><dt>海外遠征（任意・別枠）</dt><dd><strong>1回あたり約12万〜25万円</strong></dd></div>
          </dl>
          <p>海外の試算は、アジア近距離の航空券4〜10万円、宿泊・現地移動4〜8万円、活動費3〜6万円、保険・諸費用約1万円を想定しています。国内・海外ともに月会費、用具代、保護者の帯同費は別です。</p>
          <p className={styles.note}>上記は両チームで使う予算モデルで、会費や請求額ではありません。集合地、交通・宿泊・食事などの内訳と支払額は企画ごとにお知らせします。国内宿泊の参考として、2026年の志津川キャンプは1泊25,000円でした。</p>
        </div>
      </div>
    </section>
  );
}
