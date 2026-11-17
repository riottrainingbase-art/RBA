/**
 * RBA ESSENTIALS presale configuration is exclusively server-side.
 * Every required commercial fact must be approved explicitly before payments
 * can be opened. No defaults for prices, tax, merchant or delivery dates.
 */
import { essentials } from "./rba-essentials";
import { getEssentialsNoticeConfig } from "./essentials-notice-config";
export const RBA_ESSENTIALS_STRIPE_ACCOUNT = "acct_1UGdxZRXDnnSs6XN";
/** Image assets may be concept renders approved for advertising. Real samples and final specifications are validated independently of the image format. */
/** Neither size details nor garment features may still describe unverified samples. */
export const essentialsHaveFinalSpecifications = essentials.every(item => !/検討中|候補|サンプル確認後|未確定/.test(item.sizeNote+" "+item.details.join(" ")));
/**
 * Owner-approved FIRST DROP retail prices, inclusive of Japanese consumption tax
 * as described by the merchant. Production margin/tax registration remains a release gate.
 */
export const FIRST_DROP_TEE_JPY = 4900;
export const FIRST_DROP_SETUP_JPY = 19800;
export const FIRST_DROP_JAPAN_SHIPPING_JPY = 0;
export const FIRST_DROP_SHIPPING_LABEL = "先行販売限定・日本国内送料無料";
const isApproved = (v: string | undefined) => v === "true";
const yen = (v: string | undefined) => {
  if (!v || !/^[1-9][0-9]{2,7}$/.test(v)) return null;
  const n = Number(v);
  return Number.isSafeInteger(n) && n > 0 ? n : null;
};
const safeDate = (s: string | undefined) => {
  if (!s || !/^20\d{2}-\d{2}-\d{2}$/.test(s) || Number.isNaN(Date.parse(s+"T00:00:00+09:00"))) return null;
  // Do not take money after the published dispatch deadline.
  return s;
};
const notice = (v: string | undefined) =>
  !!v && v.trim().length >= 15 && v.length <= 1200 && !/[<>]/.test(v);

/** End of the same day next calendar month, with end-of-month clamping. */
export function oneMonthFromJstDate(date: string): string | null {
  if (!/^20\d{2}-\d{2}-\d{2}$/.test(date)) return null;
  const [year, month, day] = date.split("-").map(Number);
  const actual = new Date(Date.UTC(year, month - 1, day));
  if (actual.getUTCFullYear() !== year || actual.getUTCMonth() !== month - 1 || actual.getUTCDate() !== day) return null;
  const targetYear = month === 12 ? year + 1 : year;
  const targetMonth = month === 12 ? 1 : month + 1;
  const lastDay = new Date(Date.UTC(targetYear, targetMonth, 0)).getUTCDate();
  return [targetYear, String(targetMonth).padStart(2, "0"), String(Math.min(day, lastDay)).padStart(2, "0")].join("-");
}

export type EssentialsPresaleConfig = {
  ready: boolean;
  unitPrices: { tee: number | null; setup: number | null };
  shippingJPY: number | null;
  handwrittenJPY: number | null;
  handwrittenAvailable: boolean;
  handwrittenTerms: string;
  handwrittenMessage: string;
  dispatchDeadline: string | null;
  deliveryDeadline: string | null;
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
    tee: FIRST_DROP_TEE_JPY,
    setup: FIRST_DROP_SETUP_JPY,
  };
  // Shipping is waived for this FIRST DROP only, not all future collections.
  const shippingJPY = FIRST_DROP_JAPAN_SHIPPING_JPY;
  const priceOverrideIsValid = (!p.RBA_ESSENTIALS_TEE_PRICE_JPY || yen(p.RBA_ESSENTIALS_TEE_PRICE_JPY) === FIRST_DROP_TEE_JPY) &&
    (!p.RBA_ESSENTIALS_SETUP_PRICE_JPY || yen(p.RBA_ESSENTIALS_SETUP_PRICE_JPY) === FIRST_DROP_SETUP_JPY);
  const shippingOverrideIsValid = !p.RBA_ESSENTIALS_JAPAN_SHIPPING_JPY || p.RBA_ESSENTIALS_JAPAN_SHIPPING_JPY === "0";
  // Candidate +5,500 yen from market research: not a valid customer price
  // until written maker compensation, garment wash QA and owner approval.
  const handwrittenJPY = yen(p.RBA_ESSENTIALS_HANDWRITTEN_PRICE_JPY);
  const handwrittenTerms = p.RBA_ESSENTIALS_HANDWRITTEN_RETURN_TERMS?.trim() || "";
  const dispatchDeadline = safeDate(p.RBA_ESSENTIALS_DISPATCH_BY);
  const deliveryDeadline = safeDate(p.RBA_ESSENTIALS_DELIVER_BY);
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
    "RBA_ESSENTIALS_RISA_FULFILLMENT_ACCESS_VERIFIED",
    "RBA_ESSENTIALS_RISA_ORDER_HANDOFF_VERIFIED",
    "RBA_ESSENTIALS_SAMPLES_APPROVED",
    "RBA_ESSENTIALS_PHOTOS_APPROVED",
    "RBA_ESSENTIALS_PUBLIC_LISTING_APPROVED",
    "RBA_ESSENTIALS_SIZE_CHART_APPROVED",
    "RBA_ESSENTIALS_LOGO_RIGHTS_APPROVED",
    "RBA_ESSENTIALS_PRICING_APPROVED",
    "RBA_ESSENTIALS_TAX_APPROVED",
    "RBA_ESSENTIALS_SHIPPING_APPROVED",
    "RBA_ESSENTIALS_RETURNS_APPROVED",
    "RBA_ESSENTIALS_SELLER_DISCLOSURE_APPROVED",
    "RBA_ESSENTIALS_STRIPE_ACCOUNT_APPROVED",
    "RBA_ESSENTIALS_STRIPE_PUBLIC_BRANDING_VERIFIED",
    "RBA_ESSENTIALS_ORDER_OPERATIONS_READY",
    "RBA_ESSENTIALS_LEDGER_MIGRATED",
    "RBA_ESSENTIALS_WEBHOOK_READY",
    "RBA_ESSENTIALS_CONFIRMATION_NOTICE_READY",
    "RBA_ESSENTIALS_ONE_MONTH_LEAD_TIME_APPROVED"
  ].every(k => isApproved(p[k])) &&
    !!p.STRIPE_SECRET_KEY &&
    p.RBA_ESSENTIALS_TAX_BEHAVIOR === "inclusive" &&
    essentialsHaveFinalSpecifications && getEssentialsNoticeConfig().configured &&
    priceOverrideIsValid && shippingOverrideIsValid &&
    !!unitPrices.tee && !!unitPrices.setup && shippingJPY === 0 &&
    !!dispatchDeadline && !!deliveryDeadline && !!orderDeadline && orderDeadline <= dispatchDeadline && dispatchDeadline <= deliveryDeadline &&
    orderDeadline >= todayJST && dispatchDeadline > todayJST &&
    deliveryDeadline <= (oneMonthFromJstDate(todayJST) ?? "") &&
    !!termsVersion && /^[a-zA-Z0-9_-]{5,60}$/.test(termsVersion) &&
    merchant.name.length > 1 && merchant.address.length > 8 &&
    /^[0-9+()\- ]{8,24}$/.test(merchant.phone) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(merchant.email) &&
    notice(cancellation) && notice(returns) && notice(note);
  const handwrittenMessage = p.RBA_ESSENTIALS_HANDWRITTEN_MESSAGE?.normalize("NFC").trim() ?? "";
  const messageLength = Array.from(handwrittenMessage).length;
  const validHandwrittenMessage = messageLength > 0 && messageLength <= 20 && !/[\r\n\t<>]/.test(handwrittenMessage);
  const handwrittenAvailable = validHandwrittenMessage && ready && handwrittenJPY !== null && notice(handwrittenTerms) &&
    [
      "RBA_ESSENTIALS_HANDWRITTEN_PRICE_APPROVED",
      "RBA_ESSENTIALS_HANDWRITTEN_ARTIST_RIGHTS_APPROVED",
      "RBA_ESSENTIALS_HANDWRITTEN_SAMPLES_APPROVED",
      "RBA_ESSENTIALS_HANDWRITTEN_WASH_TEST_APPROVED",
      "RBA_ESSENTIALS_HANDWRITTEN_RETURNS_APPROVED",
      "RBA_ESSENTIALS_HANDWRITTEN_DELIVERY_APPROVED"
    ].every(k => isApproved(p[k]));
  return { ready, unitPrices, shippingJPY, handwrittenJPY, handwrittenAvailable, handwrittenTerms, handwrittenMessage, dispatchDeadline, deliveryDeadline, orderDeadline, termsVersion, merchant, cancellation, returns, note };
}
