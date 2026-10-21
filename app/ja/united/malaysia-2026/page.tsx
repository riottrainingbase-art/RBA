import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import { MvpUnitedRecruitment } from "@/components/mvp-united-recruitment";
export const metadata:Metadata={title:"RBA UNITED｜12月マレーシア国際大会・男女U11/U13/U15/U17募集",description:"全国のクリニックで出会った仲間と海外へ。MILO MVPIBC 2026の参加意向を無料受付。男女全4カテゴリー、費用・日程の相談も可能です。",alternates:{canonical:"https://riotbasketballacademy.com/ja/united/malaysia-2026"}};
export default function Page(){return <SiteFrame locale="ja" languagePage="united"><MvpUnitedRecruitment/></SiteFrame>;}
