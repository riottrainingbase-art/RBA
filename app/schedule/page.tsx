import { pageMetadata } from "@/components/page-metadata";
export const metadata = pageMetadata("en","schedule");
import { LocalizedSchedule } from "@/components/localized-schedule";
export default function Page(){return <LocalizedSchedule locale="en"/>}
