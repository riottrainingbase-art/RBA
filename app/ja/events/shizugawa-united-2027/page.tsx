import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import { MiyagiUnitedProgramme } from "@/components/united-miyagi";

export const metadata: Metadata = {
  title: "RBA UNITED｜志津川育成合宿からRIZEHOPEへ",
  description: "宮城の育成合宿とU12国際交流。個人参加意向を無料受付中。開催条件は調整中です。",
  alternates: { canonical: "/ja/events/shizugawa-united-2027" },
};

export default function Page() {
  return <SiteFrame locale="ja"><MiyagiUnitedProgramme/></SiteFrame>;
}
