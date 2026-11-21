"use server";

import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { sendEssentialsBuyerAcceptance } from "@/lib/essentials-buyer-notices";
import { sendEssentialsShipmentNotice } from "@/lib/essentials-shipment-notices";

export async function sendPendingEssentialsNotice(form:FormData):Promise<never>{
 const auth=await createClient();
 const {data:{user},error}=await auth.auth.getUser();
 if(error||!user)notFound();
 const role=await auth.from("profiles").select("role").eq("id",user.id).maybeSingle();
 if(role.error||role.data?.role!=="admin")notFound();
 const id=form.get("order_id");
 if(typeof id!=="string"||!/^[a-f0-9]{8}-[a-f0-9-]{28}$/i.test(id))
   redirect("/ja/essentials/manage?notice=invalid");
 const result=await sendEssentialsBuyerAcceptance(id);
 revalidatePath("/ja/essentials/manage");
 const status=result.outcome==="sent"?"sent":result.outcome==="already_processed"?"processed":"needs_review";
 redirect("/ja/essentials/manage?notice="+status);
}


export async function sendPendingEssentialsShipmentNotice(form:FormData):Promise<never>{
 const auth=await createClient();
 const {data:{user},error}=await auth.auth.getUser();
 if(error||!user)notFound();
 const role=await auth.from("profiles").select("role").eq("id",user.id).maybeSingle();
 if(role.error||role.data?.role!=="admin")notFound();
 const id=form.get("order_id");
 if(typeof id!=="string"||!/^[a-f0-9]{8}-[a-f0-9-]{28}$/i.test(id))
   redirect("/ja/essentials/manage?notice=invalid");
 const result=await sendEssentialsShipmentNotice(id);
 revalidatePath("/ja/essentials/manage");
 const status=result.outcome==="sent"?"shipment_sent":result.outcome==="already_processed"?"processed":"needs_review";
 redirect("/ja/essentials/manage?notice="+status);
}
