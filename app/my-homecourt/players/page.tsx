import { MyHomecourt } from "@/components/my-homecourt";
import { homecourtRoleMetadata } from "@/components/page-metadata";
export const metadata=homecourtRoleMetadata("en","players");
export default function Page(){return <MyHomecourt locale="en" role="players"/>}
