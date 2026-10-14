import type {Metadata} from "next";
import {SiteFrame} from "@/components/site-frame";
import {torstenRegistrationUrl} from "@/components/programme-data";
import {TorstenSharingToolkit} from "@/components/torsten-sharing-toolkit";

export const metadata:Metadata={
 title:"指導者向け紹介素材｜11/25 Torsten Loibl Online Clinic｜RBA",
 description:"指導者・クラブ・勉強会・媒体が11月25日のトーステン・ロイブル氏オンライン講習を正確に紹介するための開催情報・短文・無料教材。公式素材です。",
 alternates:{canonical:"/ja/events/torsten-loibl-online-clinic/share"},
 robots:{index:true,follow:true},
};
export default function Page(){return <SiteFrame locale="ja" languagePage="events/torsten-loibl-online-clinic"><TorstenSharingToolkit registrationUrl={torstenRegistrationUrl}/></SiteFrame>}
