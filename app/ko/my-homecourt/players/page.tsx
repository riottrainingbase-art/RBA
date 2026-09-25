import { MyHomecourt } from "@/components/my-homecourt";
import { homecourtRoleMetadata } from "@/components/page-metadata";
export const metadata=homecourtRoleMetadata("ko","players");
export default function Page(){return <MyHomecourt locale="ko" role="players"/>}
