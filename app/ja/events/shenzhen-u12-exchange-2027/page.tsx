import type { Metadata } from "next";
import { ShenzhenU12ExchangePage } from "@/components/shenzhen-u12-exchange-page";

export const metadata: Metadata = {
  title: "RBA UNITED関東 × 深圳U12｜2027年2月 国際育成交流・無料意向登録",
  description: "中国・深圳Ciroo Basketball Academy男子U12の来日交流を計画中。2027年2月11日千葉県神崎町での交流を第一候補に、保護者・国内クラブ・成人スタッフの無料意向を受け付けます。日時・会場・試合・参加枠・費用は未確定。",
  alternates: { canonical: "/ja/events/shenzhen-u12-exchange-2027", languages: { "ja": "/ja/events/shenzhen-u12-exchange-2027", "en": "/events/shenzhen-u12-exchange-2027", "x-default": "/events/shenzhen-u12-exchange-2027" } },
  openGraph: { title: "世界と出会う。自分で判断する。｜RBA × SHENZHEN U12", description: "関東U12国際交流の無料意向登録。2月11日神崎中学校体育館の利用可能情報あり・正式な施設利用と参加は未確定。", url: "/ja/events/shenzhen-u12-exchange-2027", siteName: "Riot Basketball Academy", type: "website", images: ["/rba-logo-original.jpg"] },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <ShenzhenU12ExchangePage locale="ja" />;
}
