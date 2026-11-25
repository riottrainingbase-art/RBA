"use client";

import Link from "next/link";
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
  const hubCopy={
    ja:{title:"今週、一つ決めて始める。",lead:"育成ライブラリと実践テーマを使い、今週試すことを一つ選びます。",decide:"今週のテーマを決める",decideBody:"選手・保護者・指導者、それぞれの立場で一つだけ。",prep:"次の予定から逆算する",prepBody:"試合・大会・遠征とコンディションを一緒に見る。",review:"記録を1枚で振り返る",reviewBody:"週・月・参加履歴をまとめて確認する。",next:"迷ったら",one:"今週は一つだけで十分です。",oneBody:"次の練習で一つ試して、週末に振り返ってください。",report:"育成レポート"},
    en:{title:"Choose one thing for this week.",lead:"Choose one useful focus from the library or weekly practice, try it, and review what happened.",decide:"Set this week's focus",decideBody:"One focus for your role.",prep:"Prepare for what is next",prepBody:"Connect schedule, preparation and condition.",review:"Review your development",reviewBody:"See weekly, monthly and participation records together.",next:"NEXT",one:"One focus is enough for this week.",oneBody:"Try one thing at your next practice and reflect at the end of the week.",report:"Development report"},
    "zh-tw":{title:"本週，選一個主題開始。",lead:"從培育教材或每週實踐主題選一件事，實際嘗試後再回顧。",decide:"設定本週主題",decideBody:"依球員、家長或教練的角色選一個重點。",prep:"為下一個行程做準備",prepBody:"一起確認比賽、遠征準備與身體狀態。",review:"回顧成長紀錄",reviewBody:"整合每週、每月與參加活動的紀錄。",next:"下一步",one:"本週專注一件事就好。",oneBody:"下次練習試一件事，週末再回顧。",report:"成長報告"},
    ko:{title:"이번 주에는 한 가지부터 시작하세요.",lead:"학습 자료나 주간 실천 주제에서 한 가지를 선택해 시도하고 돌아보세요.",decide:"이번 주 주제 정하기",decideBody:"선수·보호자·코치의 역할에 맞춰 한 가지를 선택하세요.",prep:"다음 일정을 준비하기",prepBody:"경기, 원정 준비, 컨디션을 함께 확인하세요.",review:"성장 기록 돌아보기",reviewBody:"주간·월간·참가 기록을 함께 확인하세요.",next:"다음 단계",one:"이번 주에는 한 가지면 충분합니다.",oneBody:"다음 훈련에서 한 가지를 시도하고 주말에 돌아보세요.",report:"성장 리포트"},
  }[locale];
  const libraryLabel={ja:"育成ライブラリを開く",en:"Open Japanese-language library","zh-tw":"開啟日文教材庫",ko:"일본어 학습 자료 열기"}[locale];
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
        <h1>{hubCopy.title}</h1>
        <span>{hubCopy.lead}</span>
      </div>
      <Sparkles/>
    </section>

    <section className="plus-member-start">
      <a href="#weekly-loop"><Target/><span>01 / DECIDE</span><strong>{hubCopy.decide}</strong><p>{hubCopy.decideBody}</p><ArrowRight/></a>
      <Link prefetch={false} href="/ja/my-homecourt/app/learn"><BookOpen/><span>02 / LEARN</span><strong>{ja?`DEVELOPMENT LIBRARY ${learningCount}本`:`${learningCount} library guides (Japanese)`}</strong><p>{ja?"実践ガイド・深掘り解説・保存版教材から、今のテーマに近いものを一つ選ぶ。":libraryLabel}</p><ArrowRight/></Link>
      <a href={`${prefix}/my-homecourt/app/calendar`}><CalendarDays/><span>03 / PREP</span><strong>{hubCopy.prep}</strong><p>{hubCopy.prepBody}</p><ArrowRight/></a>
      <a href={`${prefix}/my-homecourt/app/report`}><FileText/><span>04 / REVIEW</span><strong>{hubCopy.review}</strong><p>{hubCopy.reviewBody}</p><ArrowRight/></a>
    </section>

    <div id="weekly-loop"><HomecourtWeeklyLoop userId={userId} locale={locale} role={role}/></div>
    <HomecourtPlusPulse userId={userId} locale={locale} role={role}/>

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

    <HomecourtMonthlyReview userId={userId} locale={locale} role={role}/>

    <section className="plus-member-next">
      <div><span>{hubCopy.next}</span><strong>{hubCopy.one}</strong><p>{hubCopy.oneBody}</p></div>
      <div>
        <Link prefetch={false} href="/ja/my-homecourt/app/learn">{libraryLabel}<ArrowRight/></Link>
        <a href={`${prefix}/my-homecourt/app/report`}>{hubCopy.report}<ArrowRight/></a>
      </div>
    </section>
  </section>;
}
