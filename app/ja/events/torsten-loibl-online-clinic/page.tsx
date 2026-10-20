import { pageMetadata } from "@/components/page-metadata";
import "./torsten-campaign.css";
import { TorstenCoachCampaignJa } from "@/components/torsten-coach-campaign-ja";

const originalMetadata = pageMetadata("ja", "events/torsten-loibl-online-clinic");
const campaignTitle = "世界一に貢献した指導者と学ぶ｜トーステン・ロイブル講習 11/25";
const campaignDescription = "2019年3x3女子U23日本代表の世界一にディレクターコーチとして貢献。日本代表U18アジア準優勝・国内2冠を経験したトーステン・ロイブル氏と、シュート技術・判断・練習設計を学ぶ90分。11/25 20:00 Zoom、日本語逐次通訳。LIVE税込3,300円／30日録画税込4,400円。";
export const metadata = { ...originalMetadata, title: campaignTitle, description: campaignDescription, openGraph: { ...originalMetadata.openGraph, title: campaignTitle, description: campaignDescription }, twitter: { ...originalMetadata.twitter, title: campaignTitle, description: campaignDescription } };
export default function Page() { return <TorstenCoachCampaignJa />; }
