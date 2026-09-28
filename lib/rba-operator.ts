import "server-only";
import { createClient } from "@/lib/supabase/server";

export async function isRbaOperator(userId:string){
  const db=await createClient();
  const {data:entity}=await db.from("platform_entities")
    .select("id,created_by")
    .eq("slug","riot-basketball-academy")
    .eq("status","active")
    .maybeSingle();

  if(!entity)return false;
  if(entity.created_by===userId)return true;

  const {data:membership}=await db.from("entity_memberships")
    .select("id")
    .eq("entity_id",entity.id)
    .eq("user_id",userId)
    .eq("status","active")
    .in("member_role",["owner","admin"])
    .limit(1)
    .maybeSingle();

  return Boolean(membership);
}
