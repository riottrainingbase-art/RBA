import type { Metadata } from "next";
import { RizehopeEventLanding } from "@/components/rizehope-event-landing";
export const metadata: Metadata = {
  title:"RIZEHOPE JAPAN 2027｜宮城・U12国際育成交流｜成田・仙台空港送迎案",
  description:"2027年2月27・28日、柴田町総合体育館。国内・海外チームの無料意向登録、成田・仙台空港送迎6案、企業協賛相談。旅行手配・費用は未確定。",
  alternates:{canonical:"https://riotbasketballacademy.com/ja/international/rizehope-japan-2027",languages:{en:"https://riotbasketballacademy.com/international/rizehope-japan-2027",ja:"https://riotbasketballacademy.com/ja/international/rizehope-japan-2027","x-default":"https://riotbasketballacademy.com/international/rizehope-japan-2027"}},
  openGraph:{title:"RIZEHOPE JAPAN 2027｜U12国際育成交流",description:"国内外U12チームの無料参加意向と空港送迎・協賛の相談",images:[{url:"/rba-logo-original.jpg"}]}
};
export default function Page(){return <RizehopeEventLanding locale="ja"/>;}
