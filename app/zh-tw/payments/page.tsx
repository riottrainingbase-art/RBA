import { pageMetadata } from "@/components/page-metadata";
import { LocalizedPayments } from "@/components/localized-payments";
export const metadata=pageMetadata("zh-tw","payments");
export default function Page(){return <LocalizedPayments locale="zh-tw"/>}