import { pageMetadata } from "@/components/page-metadata";
export const metadata = pageMetadata("en","clinic-request");
import { ClinicRequest } from "@/components/clinic-request";
export default function Page(){return <ClinicRequest locale="en"/>}