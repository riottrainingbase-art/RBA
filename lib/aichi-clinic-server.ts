import "server-only";
import {miyagiAccount,miyagiAdmin,miyagiOrigin,miyagiStripe} from "./miyagi-united-server";
// Reuse only the already scoped Stripe account and Supabase administrative clients.
export const aichiAccount=miyagiAccount;
export const aichiAdmin=miyagiAdmin;
export const aichiOrigin=miyagiOrigin;
export const aichiStripe=miyagiStripe;
