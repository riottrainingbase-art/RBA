import { Fragment } from "react";
import { ChevronDown } from "lucide-react";

const sources = {
  teamRankings: "https://www.bleague.jp/club_detail/?TeamID=702&tab=2",
  teamStats: "https://www.bleague.jp/club_detail/?TeamID=702",
  seasonReview: "https://www.levanga.com/news/detail/id=22241",
  coachProfile: "https://www.levanga.com/news/detail/id=18743",
  asiaFinal: "https://www.fiba.basketball/en/news/asia-u18-2016-news-iran-return-to-top-of-asia-beat-japan-for-u18-title-korea-grab-third-place",
  worldCup: "https://www.japanbasketball.jp/wp-content/uploads/2017_report.pdf",
  czechCoach: "https://cz.basketball/domaci-nad-sily-lvu-u18/a17698",
  czechResults: "https://www.fiba.basketball/en/events/fiba-u18-eurobasket-2024-division-b/teams/czechia",
  tominagaCollege: "https://huskers.com/sports/mens-basketball/roster/player/keisei-tominaga",
  tominagaLeague: "https://www.bleague.jp/en/roster_detail/?PlayerID=19755",
  nishidaNational: "https://www.fiba.basketball/en/players/222082-yudai-nishida",
  nishidaLeague: "https://www.bleague.jp/roster_detail/?PlayerID=30403",
} as const;

type CoachQuestion = {
  question: string;
  answer: string;
  references: ReadonlyArray<readonly [keyof typeof sources, string]>;
};

const coachQuestions = {
  ja: [
    {
      question: "レバンガ北海道はシュートが強いチームですか？",
      answer: "2026年11月9日更新のB.PREMIER公式成績では、平均96.5得点でリーグ1位、フィールドゴール成功率49.2％で2位、フリースロー成功率79.0％で3位です。3ポイント成功率は33.1％で13位でした。得点力の高さと、3ポイントの順位は分けて見るとチームの特徴がわかります。",
      references: [["teamRankings", "Bリーグ公式・クラブ成績"]],
    },
    {
      question: "今季のシュート成績を具体的に教えてください。",
      answer: "2026–27シーズンの開幕14試合（9勝5敗）では、フィールドゴール483／981本（49.2％）、2ポイント373／649本（57.5％）、3ポイント110／332本（33.1％）、フリースロー275／348本（79.0％）。比較として、2025–26シーズンのB1レギュラーシーズン60試合では3ポイント成功率36.5％でした。",
      references: [["teamStats", "Bリーグ公式・シーズン別集計"]],
    },
    {
      question: "ロイブルHCの下でレバンガ北海道はBリーグ優勝を経験しましたか？",
      answer: "レバンガ北海道でのBリーグ優勝はありません。復帰初年度の2025–26シーズンは37勝23敗で、クラブ史上最高勝率と12連勝を記録し、チャンピオンシップ進出に迫りました。ロイブルHCの国内リーグ優勝は、トヨタ自動車アルバルクを率いた2006–07シーズンのJBLスーパーリーグです。",
      references: [["teamStats", "Bリーグ公式成績"], ["seasonReview", "レバンガ北海道・シーズン総括"], ["coachProfile", "クラブ公式・講師経歴"]],
    },
    {
      question: "ロイブルHCはシューター育成の専門家ですか？ 育成年代の代表での実績は？",
      answer: "ロイブルHCは育成年代の選手育成、代表チームの指揮、指導者教育に携わってきました。男子日本代表では2016年FIBA U18アジア選手権準優勝、2017年FIBA U19ワールドカップ10位。男子チェコ代表は2024年FIBA U18欧州選手権ディビジョンBで8位でした。大会順位はチーム全体の結果です。本講習ではシュート技術を、試合の判断・スペーシング・練習設計と結びつけて扱います。",
      references: [["asiaFinal", "FIBA・U18アジア選手権"], ["worldCup", "JBA・2017年度報告"], ["czechCoach", "チェコ協会・当時の指揮"], ["czechResults", "FIBA・チェコ代表成績"]],
    },
    {
      question: "指導した選手で、シニアでも活躍している例はありますか？",
      answer: "現在レバンガ北海道で指導する富永啓生選手は、ネブラスカ大学時代に2024年の全米大学男子3ポイントコンテストで優勝し、今季は開幕14試合で平均24.6得点。2016年の男子U18日本代表で指導した西田優大選手はシニア日本代表にも進み、今季のシーホース三河では最初の12試合で3ポイント成功率38.9％を記録しました。",
      references: [["tominagaCollege", "ネブラスカ大学・富永選手"], ["tominagaLeague", "Bリーグ・富永選手"], ["nishidaNational", "FIBA・西田選手"], ["nishidaLeague", "Bリーグ・西田選手"]],
    },
  ],
  en: [
    {
      question: "How good is Levanga Hokkaido at shooting?",
      answer: "In the official B.PREMIER update on 9 November 2026, Levanga ranked first in scoring (96.5 points per game), second in field-goal percentage (49.2%) and third in free-throw percentage (79.0%). The team ranked 13th in three-point percentage (33.1%).",
      references: [["teamRankings", "B.LEAGUE club rankings"]],
    },
    {
      question: "What are Levanga’s shooting numbers this season?",
      answer: "Through its first 14 games (9–5) of 2026–27, Levanga shot 483/981 from the field (49.2%), 373/649 on twos (57.5%), 110/332 on threes (33.1%) and 275/348 at the line (79.0%). For comparison, the club shot 36.5% from three across the 60-game 2025–26 B1 regular season.",
      references: [["teamStats", "B.LEAGUE team totals by season"]],
    },
    {
      question: "Has Levanga won a B.LEAGUE title under Coach Loibl?",
      answer: "Levanga has yet to win a B.LEAGUE title under Loibl. In his first season back, 2025–26, the team went 37–23, set a club-best winning percentage, won 12 straight and finished just short of the postseason. Loibl won the 2006–07 JBL Super League title with Toyota Alvark.",
      references: [["teamStats", "B.LEAGUE team record"], ["seasonReview", "Levanga’s season review"], ["coachProfile", "Official coaching biography"]],
    },
    {
      question: "Does Loibl specialise in shooter development? How did his youth national teams perform?",
      answer: "Loibl has worked across player development, national-team coaching and coach education. His Japan men’s teams won silver at the 2016 FIBA Asia U18 Championship and finished 10th at the 2017 FIBA U19 World Cup. Czechia finished eighth at the 2024 FIBA U18 EuroBasket Division B under Loibl. Those results reflect overall team performance. The clinic focuses on how shooting technique connects with decisions, spacing and practice design.",
      references: [["asiaFinal", "FIBA Asia U18 final"], ["worldCup", "JBA annual report"], ["czechCoach", "Czech federation report"], ["czechResults", "FIBA Czechia results"]],
    },
    {
      question: "Which players has Loibl coached who have succeeded at senior level?",
      answer: "Keisei Tominaga now plays for Loibl at Levanga. He won the 2024 college men’s three-point contest while at Nebraska and averaged 24.6 points through Levanga’s first 14 games this season. Yudai Nishida played for Loibl’s Japan U18 team in 2016 and later represented senior Japan. He shot 38.9% from three through his first 12 B.PREMIER games this season for SeaHorses Mikawa.",
      references: [["tominagaCollege", "Nebraska’s Tominaga profile"], ["tominagaLeague", "Tominaga’s B.LEAGUE stats"], ["nishidaNational", "Nishida’s FIBA record"], ["nishidaLeague", "Nishida’s B.LEAGUE stats"]],
    },
  ],
} satisfies Record<"ja" | "en", readonly CoachQuestion[]>;

export function TorstenCoachQuestions({ locale }: { locale: keyof typeof coachQuestions }) {
  return coachQuestions[locale].map(({ question, answer, references }) => (
    <details key={question}>
      <summary>{question}{locale === "ja" && <ChevronDown size={17} aria-hidden="true" />}</summary>
      <p>
        {answer}<br />
        {references.map(([source, label], index) => (
          <Fragment key={source}>
            {index > 0 && " · "}
            <a className="underline" href={sources[source]}>{label}</a>
          </Fragment>
        ))}
      </p>
    </details>
  ));
}
