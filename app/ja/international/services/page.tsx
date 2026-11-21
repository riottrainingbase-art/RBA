import type {Metadata} from "next";
import {GlobalServicesLandingJa} from "@/components/global-services-landing-ja";
export const metadata:Metadata={
 title:"RBA GLOBAL SERVICES｜海外チーム受入・アカデミー支援・指導者教育",
 description:"日本での海外チーム育成プログラム、海外アカデミーの技術支援、指導者研修。RBAの国際事業を団体向けにご案内。無料相談後、実現可能性と安全を確認し、正式見積を作成します。",
 alternates:{canonical:"https://riotbasketballacademy.com/ja/international/services",languages:{en:"https://riotbasketballacademy.com/international/services",ja:"https://riotbasketballacademy.com/ja/international/services","x-default":"https://riotbasketballacademy.com/international/services"}},
 openGraph:{title:"RBA GLOBAL SERVICES｜日本と海外をつなぐ育成事業",description:"海外チームの日本受入・指導者研修・アカデミー支援。契約前の無料相談受付。",url:"https://riotbasketballacademy.com/ja/international/services",siteName:"Riot Basketball Academy",type:"website"}
};
export default function Page(){return <GlobalServicesLandingJa/>;}
