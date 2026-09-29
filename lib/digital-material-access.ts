import "server-only";
import { createClient } from "@/lib/supabase/server";

export const U12_MATERIAL_SLUG = "u12-fundamentals";
export const U12_OFFER_OPTION = "u12-fundamentals";
export const U12_OFFER_SLUG = "rba-coaching-guide-u12-fundamentals";

export async function getDigitalMaterial(slug: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, material: null, hasAccess: false };
  }

  const { data: material, error } = await supabase
    .from("digital_materials")
    .select("id,slug,title,subtitle,summary,content,publication_status,service_offer_id")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    return { user, material: null, hasAccess: false };
  }

  return { user, material, hasAccess: Boolean(material) };
}
