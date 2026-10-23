import { pageMetadata } from "@/components/page-metadata";
export const metadata = pageMetadata("ja","schedule");
export const dynamic = "force-dynamic";
import { LocalizedSchedule } from "@/components/localized-schedule";
export default function Page(){return <LocalizedSchedule locale="ja"/>}