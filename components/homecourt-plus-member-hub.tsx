"use client";

import {ArrowRight, BookOpen, CalendarDays, FileText, Sparkles, Target, Users} from "lucide-react";
import type {Locale} from "./site-frame";
import {HomecourtPlusPulse} from "./homecourt-plus-pulse";
import {HomecourtWeeklyLoop} from "./homecourt-weekly-loop";
import {HomecourtMonthlyReview} from "./homecourt-monthly-review";

export function HomecourtPlusMemberHub({
  userId,locale,role,learningCount
}:{userId:string;locale:Locale;role:string;learningCount:number}){
  const prefix=locale==="en"?"":`/${locale}`;
  const ja=locale==="ja";
  const unitedCopy={
    ja:{title:"RBA UNITEDで、学びを実際のゲームへ。",lead:"所属チームを続けながら、大会・遠征・国際交流ごとに期間限定チームへ個人参加できます。参加条件、費用と募集状況は各企画で確認してください。",find:"参加できるUNITED企画を探す",prep:"大会・遠征の準備をする",record:"参加経験を記録する",review:"学びを次の練習へつなぐ"},
    en:{title:"Take your learning into games with RBA UNITED.",lead:"Join time-limited teams for tournaments, trips and international exchanges while keeping your home club. Check each programme's eligibility, fees and availability.",find:"Explore UNITED opportunities",prep:"Prepare for games and trips",record:"Record your experiences",review:"Bring learning back to practice"},
    "zh-tw":{title:"透過 RBA UNITED 將學習帶進比賽。",lead:"保留原球隊，以個人身份參加期間限定的大會、遠征與國際交流團隊。請確認各活動的資格、費用及報名狀態。",find:"探索 UNITED 活動",prep:"準備大會與遠征",record:"記錄參加經驗",review:"將學習帶回訓練"},
    ko:{title:"RBA UNITED를 통해 배움을 경기로 연결하세요.",lead:"소속팀을 유지하며 대회·원정·국제교류별 기간 한정 팀에 개인 참가할 수 있습니다. 각 프로그램의 자격, 비용 및 모집 상태를 확인하세요.",find:"UNITED 참가 기회 찾기",prep:"대회와 원정 준비",record:"참가 경험 기록",review:"배움을 다음 훈련으로"},
  }[locale];
  return <section className="homecourt-plus-member">
    <section className="plus-member-hero">
      <div>
        <p>HOMECOURT PLUS / DEVELOPMENT LIBRARY + THIS WEEK</p>
        <h1>{ja?"今週、一つ決めて始める。":"Choose one thing for this week."}</h1>
        <span>{ja?"DEVELOPMENT LIBRARY（育成ライブラリ）で必要な教科書や実践ガイドを探し、今週使うことを一つ選んで試します。":"Choose one useful focus, try it, and review what happened."}</span>
      </div>
      <Sparkles/>
    </section>

    <section className="plus-member-start">
      <a href="#weekly-loop"><Target/><span>01 / DECIDE</span><strong>{ja?"今週のテーマを決める":"Set this week's focus"}</strong><p>{ja?"選手・保護者・指導者、それぞれの立場で一つだけ。":"One focus for your role."}</p><ArrowRight/></a>
      <a href={`${prefix}/my-homecourt/app/learn`}><BookOpen/><span>02 / LEARN</span><strong>{ja?`DEVELOPMENT LIBRARY ${learningCount}本`:`${learningCount} library guides`}</strong><p>{ja?"実践ガイド・深掘り解説・保存版教材から、今のテーマに近いものを一つ選ぶ。":"Read one guide that matches your focus."}</p><ArrowRight/></a>
      <a href={`${prefix}/my-homecourt/app/calendar`}><CalendarDays/><span>03 / PREP</span><strong>{ja?"次の予定から逆算する":"Prepare for what is next"}</strong><p>{ja?"試合・大会・遠征とコンディションを一緒に見る。":"Connect schedule, preparation and condition."}</p><ArrowRight/></a>
      <a href={`${prefix}/my-homecourt/app/report`}><FileText/><span>04 / REVIEW</span><strong>{ja?"記録を1枚で振り返る":"Review your development"}</strong><p>{ja?"週・月・参加履歴をまとめて確認する。":"See weekly, monthly and participation records together."}</p><ArrowRight/></a>
    </section>

    <section className="member-section">
      <div className="member-section-head"><div><p>HOMECOURT PLUS × RBA UNITED</p><h2>{unitedCopy.title}</h2><p>{unitedCopy.lead}</p></div><Users/></div>
      <div className="plus-member-next">
        <div><span>CHALLENGE → LEARN → REFLECT</span><strong>{unitedCopy.find}</strong><p>{unitedCopy.review}</p></div>
        <div>
          <a href={`${prefix}/united`}>{unitedCopy.find}<ArrowRight/></a>
          <a href={`${prefix}/my-homecourt/app/calendar`}>{unitedCopy.prep}<ArrowRight/></a>
          <a href={ja?"/ja/my-homecourt/app/start":`${prefix}/my-homecourt/app`}>{unitedCopy.record}<ArrowRight/></a>
          <a href={`${prefix}/my-homecourt/app/report`}>{unitedCopy.review}<ArrowRight/></a>
        </div>
      </div>
    </section>

    <HomecourtPlusPulse userId={userId} locale={locale} role={role}/>
    <div id="weekly-loop"><HomecourtWeeklyLoop userId={userId} locale={locale} role={role}/></div>
    <HomecourtMonthlyReview userId={userId} locale={locale} role={role}/>

    <section className="plus-member-next">
      <div><span>{ja?"迷ったら":"NEXT"}</span><strong>{ja?"今週は一つだけで十分です。":"One focus is enough for this week."}</strong><p>{ja?"記事を全部読む必要も、毎日記録する必要もありません。次の練習で一つ試して、週末に振り返ってください。":"You do not need to use every feature every day."}</p></div>
      <div>
        <a href={`${prefix}/my-homecourt/app/learn`}>{ja?"育成ライブラリを開く":"Open learning"}<ArrowRight/></a>
        <a href={`${prefix}/my-homecourt/app/report`}>{ja?"DEVELOPMENT REPORT":"Development report"}<ArrowRight/></a>
      </div>
    </section>
  </section>;
}
