export const worldYouthJournalPath = "/ja/journal/world-youth-basketball";

type Feature = {
  slug: string;
  topic: string;
  title: string;
  description: string;
  sections: { heading: string; body: string }[];
  sources: { label: string; href: string }[];
  next: { label: string; description: string; href: string };
};

const torstenEvent = "/ja/events/torsten-loibl-online-clinic";

export const worldYouthFeatures: Feature[] = [
  {
    slug: "taiwan-hbl",
    topic: "台湾の高校バスケ",
    title: "台湾の高校バスケ「HBL」とは？ 男女の日程と、試合の見方",
    description: "同じチームを2試合追って、誰がボールを運び、途中出場の選手にどんな役割が渡るかを見てみよう。",
    sections: [
      {
        heading: "男女の日程はどこで見る？",
        body: "HBL（高中籃球聯賽）は台湾の高校バスケットボール大会です。公式サイトには競技規程、日程・結果、チームや選手の統計があります。2026年11月10日に115学年度甲級の男女予選日程が公表されました。下の公式日程から学校を一つ選び、試合後の記録と合わせて追ってみてください。",
      },
      {
        heading: "得点表に出ない役割を観察する",
        body: "相手が前から守る場面を3回見て、最初のパスを受けた選手、ハーフラインを越えた選手、助けに動いた選手を記録します。途中出場した選手は、ボール運びや守備のカバーを任されたか。2試合を比べるときは、対戦相手と点差も記録しておくと役割が変わった背景を考えやすくなります。",
      },
      {
        heading: "日本との比較は、大会と年代をそろえる",
        body: "台湾の能仁家商は2025年に日本のB.LEAGUE U16 CHALLENGE CUPに参加しました。これは交流大会での一例です。台湾と日本の育成を比較するときは、学校とクラブのどちらが参加する大会か、年齢、登録ルール、年間の試合機会をそろえて確認します。公開資料から分かる大会制度と、各チームの実際の起用にはそれぞれ確認が必要です。",
      },
      {
        heading: "次の練習で試す",
        body: "4対4のボール運びを行い、毎回違う選手が最初のパスを受けます。ボール保持者が詰まったとき、味方がパスを受けられる位置に動き直せたかを記録します。保護者なら試合後に「今日はどんな役割を任された？」と聞くところから始められます。",
      },
    ],
    sources: [
      { label: "HBL公式", href: "https://hbl.xceedsports.app/" },
      { label: "HBL 女子予選日程", href: "https://hbl.xceedsports.app/item/1763" },
      { label: "HBL 男子予選日程", href: "https://hbl.xceedsports.app/item/1762" },
      { label: "能仁家商U16の取材記事｜B.LEAGUE", href: "https://www.bleague.jp/media_news/detail/id=535542" },
      { label: "JBA リーグ戦・育成センター", href: "https://u18.japanbasketball.jp/development/" },
    ],
    next: {
      label: "海外交流の実践編をnoteで読む",
      description: "合同練習90分の構成例と、遠征前後の振り返りをまとめた既刊の実践編です。単品1,200円（税込）。",
      href: "https://note.com/rba_official/n/nae7e55e4dec5",
    },
  },
  {
    slug: "shooting-before-the-catch",
    topic: "コーチング｜シュート",
    title: "シュートが入らない。フォームを直す前に、どこを見る？",
    description: "キャッチ前の準備、守備との距離、打つかつなぐか。シュートが生まれるまでを観察する。",
    sections: [
      {
        heading: "まず、外した場所と状況を分ける",
        body: "同じ位置で、守備なしのキャッチ&シュートと、守備が寄ってくる場面を観察します。両方で同じ動きが難しいなら足やボールの準備に着目。守備が来るときだけ急ぐなら、受ける前に守備を見られたか、パスのタイミングや受ける場所にも目を向けます。少数の試投で原因を決めつけず、選手本人にも見えていたものを聞きます。",
      },
      {
        heading: "3対3で、打つ前の判断を練習する",
        body: "外の選手にパスが出る形から始め、守備が寄る距離は固定しません。空いていれば打つ、間に合いそうなら隣へつなぐ、走り込む守備を見てドライブする。指導者は成功数とあわせて、守備を見たうえで選択できた回数を記録します。",
      },
      {
        heading: "次の1本で変えることは一つ",
        body: "「受ける前に守備を一度見る」など、観察できる課題を一つ選びます。次の数本で行動が変わったかを確認し、変化が乏しければ守備の開始位置を遠くするなど、課題の難度を調整します。ここで紹介した練習例はRBAの提案です。",
      },
    ],
    sources: [
      { label: "JBA U12カテゴリー指導ガイドライン", href: "https://u12.japanbasketball.jp/U12Guidelines" },
      { label: "Torsten Loibl オンライン講習 Vol.2 公式案内", href: torstenEvent },
    ],
    next: {
      label: "Torsten講習の詳細を見る",
      description: "シューターの育成と活用を扱う、2026年11月25日のオンライン講習です。視聴・受付状況は公式案内で確認できます。",
      href: torstenEvent,
    },
  },
  {
    slug: "playing-time-and-roles",
    topic: "コーチング｜チーム運営",
    title: "全員出場を、全員の経験に変えるには？",
    description: "出場時間、コートで任せた役割、次に経験させたい仕事をセットで振り返る。",
    sections: [
      {
        heading: "出場の予定を、試合前に共有する",
        body: "大会ごとの交代・出場ルールを確認し、選手ごとに出場させる時間帯と経験してほしい役割をコーチ間で共有します。接戦やファウルトラブルで予定を変えたときに、次の時間帯で機会を確保できるよう担当者を決めておきます。",
      },
      {
        heading: "出場した選手が何を判断したかを見る",
        body: "出場したか、時間はどのくらいか、何を任せたかを別々に記録します。たとえば、ボールを前に運ぶ、守備の最初のカバーを伝える、リバウンドから最初のパスを出す。1試合に一つ、経験を渡したい仕事を決めておくと観察が具体的になります。",
      },
      {
        heading: "次の練習と次の試合に戻す",
        body: "コーチ同士で、予定通りに経験できた選手と、次回に機会を作りたい選手を確認します。公式戦の運用は大会規則に従い、練習試合や3対3でも役割を経験する場を作ります。ここで紹介した記録と振り返りはRBAの運用提案です。",
      },
    ],
    sources: [
      { label: "JBA U12カテゴリー指導ガイドライン", href: "https://u12.japanbasketball.jp/U12Guidelines" },
      { label: "JBA U15 リーグ戦・育成センター", href: "https://u15.japanbasketball.jp/development/" },
    ],
    next: {
      label: "チームでの訪問指導・研修を相談する",
      description: "普段の練習やゲームを観察し、チームの課題に合わせたオンコート指導とフィードバックを行います。",
      href: "/ja/team-visit-clinic",
    },
  },
];
