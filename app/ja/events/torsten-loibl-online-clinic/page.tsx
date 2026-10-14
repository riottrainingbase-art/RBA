import { pageMetadata } from "@/components/page-metadata";
import "./torsten-campaign.css";
import { TorstenCoachCampaignJa } from "@/components/torsten-coach-campaign-ja";

const originalMetadata = pageMetadata("ja", "events/torsten-loibl-online-clinic");
const campaignTitle = "練習では入る。試合では打てない。｜トーステン・ロイブル指導者講習 11/25";
export const metadata = { ...originalMetadata, title: campaignTitle, openGraph: { ...originalMetadata.openGraph, title: campaignTitle }, twitter: { ...originalMetadata.twitter, title: campaignTitle } };
export default function Page() { return <TorstenCoachCampaignJa />; }
