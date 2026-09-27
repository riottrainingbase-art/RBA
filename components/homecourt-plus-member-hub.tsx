"use client";

import {ArrowRight, BookOpen, CalendarDays, FileText, Sparkles, Target} from "lucide-react";
import type {Locale} from "./site-frame";
import {HomecourtPlusPulse} from "./homecourt-plus-pulse";
import {HomecourtWeeklyLoop} from "./homecourt-weekly-loop";
import {HomecourtMonthlyReview} from "./homecourt-monthly-review";

export function HomecourtPlusMemberHub({
  userId,locale,role,learningCount
}:{userId:string;locale:Locale;role:string;learningCount:number}){
  const prefix=locale==="en"?"":`/${locale}`;
  const ja=locale==="ja";
  return <section className="homecourt-plus-member">
    <section className="plus-member-hero">
      <div>
        <p>HOMECOURT PLUS / THIS WEEK</p>
        <h1>{ja?"今週、一つ決めて始める。":"Choose one thing for this week."}</h1>
        <span>{ja?"読むことを増やすより、今の自分に必要なことを一つ選んで、実際に試してみます。":"Choose one useful focus, try it, and review what happened."}</span>
      </div>
      <Sparkles/>
    </section>

    <section className="plus-member-start">
      <a href="#weekly-loop"><Target/><span>01 / DECIDE</span><strong>{ja?"今週のテーマを決める":"Set this week's focus"}</strong><p>{ja?"選手・保護者・指導者、それぞれの立場で一つだけ。":"One focus for your role."}</p><ArrowRight/></a>
      <a href={`${prefix}/my-homecourt/app/learn`}><BookOpen/><span>02 / LEARN</span><strong>{ja?`実践ガイド ${learningCount}本`:`${learningCount} practical guides`}</strong><p>{ja?"今のテーマに近いものを一つ読む。":"Read one guide that matches your focus."}</p><ArrowRight/></a>
      <a href={`${prefix}/my-homecourt/app/calendar`}><CalendarDays/><span>03 / PREP</span><strong>{ja?"次の予定から逆算する":"Prepare for what is next"}</strong><p>{ja?"試合・大会・遠征とコンディションを一緒に見る。":"Connect schedule, preparation and condition."}</p><ArrowRight/></a>
      <a href={`${prefix}/my-homecourt/app/report`}><FileText/><span>04 / REVIEW</span><strong>{ja?"記録を1枚で振り返る":"Review your development"}</strong><p>{ja?"週・月・参加履歴をまとめて確認する。":"See weekly, monthly and participation records together."}</p><ArrowRight/></a>
    </section>

    <HomecourtPlusPulse userId={userId} locale={locale} role={role}/>
    <div id="weekly-loop"><HomecourtWeeklyLoop userId={userId} locale={locale} role={role}/></div>
    <HomecourtMonthlyReview userId={userId} locale={locale} role={role}/>

    <section className="plus-member-next">
      <div><span>{ja?"迷ったら":"NEXT"}</span><strong>{ja?"今週は一つだけで十分です。":"One focus is enough for this week."}</strong><p>{ja?"記事を全部読む必要も、毎日記録する必要もありません。次の練習で一つ試して、週末に振り返ってください。":"You do not need to use every feature every day."}</p></div>
      <div>
        <a href={`${prefix}/my-homecourt/app/learn`}>{ja?"実践ガイドを開く":"Open learning"}<ArrowRight/></a>
        <a href={`${prefix}/my-homecourt/app/report`}>{ja?"DEVELOPMENT REPORT":"Development report"}<ArrowRight/></a>
      </div>
    </section>
  </section>;
}
