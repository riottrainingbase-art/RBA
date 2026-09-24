import { pageMetadata } from "@/components/page-metadata";
export const metadata = pageMetadata("ja","clinic-request");
import { ClinicRequest } from "@/components/clinic-request";
export default function Page(){return <ClinicRequest locale="ja"/>}