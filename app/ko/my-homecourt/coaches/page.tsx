import { MyHomecourt } from "@/components/my-homecourt";
import { homecourtRoleMetadata } from "@/components/page-metadata";
export const metadata=homecourtRoleMetadata("ko","coaches");
export default function Page(){return <MyHomecourt locale="ko" role="coaches"/>}
