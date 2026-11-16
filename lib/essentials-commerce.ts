/**
 * RBA ESSENTIALS presale configuration is exclusively server-side.
 * Every required commercial fact must be approved explicitly before payments
 * can be opened. No defaults for prices, tax, merchant or delivery dates.
 */
export const RBA_ESSENTIALS_STRIPE_ACCOUNT = "acct_1UGdxZRXDnnSs6XN";
const isApproved = (v: string | undefined) => v === "true";
const yen = (v: string | undefined) => {
  if (!v || !/^[1-9][0-9]{2,7}$/.test(v)) return null;
  const n = Number(v);
  return Number.isSafeInteger(n) && n > 0 ? n : null;
};
const nonnegativeYen = (v: string | undefined) => {
  if (v === "0") return 0;
  return yen(v);
};
const safeDate = (s: string | undefined) => {
  if (!s || !/^20\d{2}-\d{2}-\d{2}$/.test(s) || Number.isNaN(Date.parse(s+"T00:00:00+09:00"))) return null;
  // Do not take money after the published dispatch deadline.
  return s;
};
const notice = (v: string | undefined) =>
  !!v && v.trim().length >= 15 && v.length <= 1200 && !/[<>]/.test(v);

export type EssentialsPresaleConfig = {
  ready: boolean;
  unitPrices: { tee: number | null; setup: number | null };
  shippingJPY: number | null;
  dispatchDeadline: string | null;
  orderDeadline: string | null;
  termsVersion: string | null;
  merchant: { name: string; address: string; phone: string; email: string };
  cancellation: string;
  returns: string;
  note: string;
};

export function getEssentialsPresaleConfig(): EssentialsPresaleConfig {
  const p = process.env;
  const unitPrices = {
    tee: yen(p.RBA_ESSENTIALS_TEE_PRICE_JPY),
    setup: yen(p.RBA_ESSENTIALS_SETUP_PRICE_JPY),
  };
  const shippingJPY = nonnegativeYen(p.RBA_ESSENTIALS_JAPAN_SHIPPING_JPY);
  const dispatchDeadline = safeDate(p.RBA_ESSENTIALS_DISPATCH_BY);
  const orderDeadline = safeDate(p.RBA_ESSENTIALS_ORDER_BY);
  const merchant = {
    name: p.RBA_ESSENTIALS_SELLER_NAME?.trim() || "",
    address: p.RBA_ESSENTIALS_SELLER_ADDRESS?.trim() || "",
    phone: p.RBA_ESSENTIALS_SELLER_PHONE?.trim() || "",
    email: p.RBA_ESSENTIALS_SELLER_EMAIL?.trim() || "",
  };
  const cancellation = p.RBA_ESSENTIALS_CANCELLATION_TERMS?.trim() || "";
  const returns = p.RBA_ESSENTIALS_RETURN_TERMS?.trim() || "";
  const note = p.RBA_ESSENTIALS_PRESALE_NOTE?.trim() || "";
  const termsVersion = p.RBA_ESSENTIALS_TERMS_VERSION?.trim() || null;
  const todayJST = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  const ready = [
    "RBA_ESSENTIALS_PREORDER_ENABLED",
    "RBA_ESSENTIALS_MANUFACTURING_CONFIRMED",
    "RBA_ESSENTIALS_RISA_FULFILLMENT_AGREEMENT_APPROVED",
    "RBA_ESSENTIALS_SAMPLES_APPROVED",
    "RBA_ESSENTIALS_PHOTOS_APPROVED",
    "RBA_ESSENTIALS_SIZE_CHART_APPROVED",
    "RBA_ESSENTIALS_LOGO_RIGHTS_APPROVED",
    "RBA_ESSENTIALS_PRICING_APPROVED",
    "RBA_ESSENTIALS_TAX_APPROVED",
    "RBA_ESSENTIALS_SHIPPING_APPROVED",
    "RBA_ESSENTIALS_RETURNS_APPROVED",
    "RBA_ESSENTIALS_SELLER_DISCLOSURE_APPROVED",
    "RBA_ESSENTIALS_STRIPE_ACCOUNT_APPROVED",
    "RBA_ESSENTIALS_ORDER_OPERATIONS_READY",
    "RBA_ESSENTIALS_LEDGER_MIGRATED",
    "RBA_ESSENTIALS_WEBHOOK_READY",
    "RBA_ESSENTIALS_CONFIRMATION_NOTICE_READY",
    "RBA_ESSENTIALS_ONE_MONTH_LEAD_TIME_APPROVED"
  ].every(k => isApproved(p[k])) &&
    !!p.STRIPE_SECRET_KEY &&
    p.RBA_ESSENTIALS_TAX_BEHAVIOR === "inclusive" &&
    !!unitPrices.tee && !!unitPrices.setup && shippingJPY !== null &&
    !!dispatchDeadline && !!orderDeadline && orderDeadline <= dispatchDeadline &&
    orderDeadline >= todayJST && dispatchDeadline > todayJST &&
    !!termsVersion && /^[a-zA-Z0-9_-]{5,60}$/.test(termsVersion) &&
    merchant.name.length > 1 && merchant.address.length > 8 &&
    /^[0-9+()\- ]{8,24}$/.test(merchant.phone) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(merchant.email) &&
    notice(cancellation) && notice(returns) && notice(note);
  return { ready, unitPrices, shippingJPY, dispatchDeadline, orderDeadline, termsVersion, merchant, cancellation, returns, note };
}
