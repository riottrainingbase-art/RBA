import { pageMetadata } from "@/components/page-metadata";
import { GlobalMyHomecourt } from "@/components/global-my-homecourt";

export const metadata=pageMetadata("zh-tw","my-homecourt");

export default function Page(){
  return <GlobalMyHomecourt locale="zh-tw"/>;
}
