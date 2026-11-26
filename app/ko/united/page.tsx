import { pageMetadata } from "@/components/page-metadata";
import { UnitedPage } from "@/components/platform-business-pages";
export const metadata=pageMetadata("ko","united");
export const dynamic="force-dynamic";
export default function Page(){return <UnitedPage locale="ko"/>;}
