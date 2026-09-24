/** Only known member destinations can receive a completed authentication flow. */
export function memberAuthDestination(value: string | null): string {
  const fallback = "/ja/my-homecourt/app";
  if (!value) return fallback;
  return /^\/(?:(?:ja|ko|zh-tw)\/)?my-homecourt\/app(?:\/(?:calendar|team|notifications|my|admin))?$/.test(value)
    ? value : fallback;
}
