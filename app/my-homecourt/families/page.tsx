import { MyHomecourt } from "@/components/my-homecourt";
import { homecourtRoleMetadata } from "@/components/page-metadata";
export const metadata=homecourtRoleMetadata("en","families");
export default function Page(){return <MyHomecourt locale="en" role="families"/>}
