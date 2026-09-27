import type { Metadata } from "next";
import { GlobalHomecourtMatch } from "@/components/homecourt-global-network";
import { SiteFrame } from "@/components/site-frame";
export const metadata:Metadata={title:"HOMECOURT MATCH | RBA",description:"팀 대 팀으로 국제 유소년 농구 친선 경기, 공동 훈련과 성장 교류를 연결합니다.",alternates:{canonical:"/ko/homecourt/match"}};
export default function Page(){return <SiteFrame locale="ko" languagePage="homecourt/match"><GlobalHomecourtMatch locale="ko"/></SiteFrame>;}
