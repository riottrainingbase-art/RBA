import { MyHomecourt } from "@/components/my-homecourt";
import { homecourtRoleMetadata } from "@/components/page-metadata";
export const metadata=homecourtRoleMetadata("zh-tw","coaches");
export default function Page(){return <MyHomecourt locale="zh-tw" role="coaches"/>}
