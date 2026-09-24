import { pageMetadata } from "@/components/page-metadata";
export const metadata = pageMetadata("ko","schedule");
import { LocalizedSchedule } from "@/components/localized-schedule";
export default function Page(){return <LocalizedSchedule locale="ko"/>}