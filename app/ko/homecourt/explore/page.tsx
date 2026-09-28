import type { Metadata } from "next";
import { GlobalHomecourtExplore } from "@/components/homecourt-global-network";
import { SiteFrame } from "@/components/site-frame";
export const metadata:Metadata={title:"HOMECOURT EXPLORE | RBA",description:"유료 순위가 아닌 확인 가능한 정보로 유소년 농구 성장 환경을 찾습니다.",alternates:{canonical:"/ko/homecourt/explore"}};
export default function Page(){return <SiteFrame locale="ko" languagePage="homecourt/explore"><GlobalHomecourtExplore locale="ko"/></SiteFrame>;}
