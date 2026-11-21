/**
 * RBA STORE / COLLECTION 001 manufacturer-reference size options.
 * These are not approved finished-garment measurements. Paid checkout remains
 * fail-closed until samples, sizing and production capacity are approved.
 * The same allowed options are used by the UI, payment endpoint, and webhook.
 */
export const ESSENTIALS_TEE_SIZES = ["S", "M", "L", "XL"] as const;
export const ESSENTIALS_HOODIE_SIZES = ["S", "M", "L", "XL", "XXL"] as const;
export const ESSENTIALS_PANTS_SIZES = ["M", "L", "XL"] as const;
export type EssentialsGarment = "tee" | "hoodie" | "pants";
const sizesByGarment: Record<EssentialsGarment, readonly string[]> = {
  tee: ESSENTIALS_TEE_SIZES,
  hoodie: ESSENTIALS_HOODIE_SIZES,
  pants: ESSENTIALS_PANTS_SIZES,
};
export function essentialsSizeIsAllowed(garment: EssentialsGarment, size: unknown): size is string {
  return typeof size === "string" && sizesByGarment[garment].includes(size);
}
