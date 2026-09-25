import { MyHomecourt } from "@/components/my-homecourt";
import { homecourtRoleMetadata } from "@/components/page-metadata";
export const metadata=homecourtRoleMetadata("zh-tw","families");
export default function Page(){return <MyHomecourt locale="zh-tw" role="families"/>}
