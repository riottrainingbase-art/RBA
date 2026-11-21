-- Applied/verified on Supabase HOMECOURT production in migration 20261121113401.
-- RBA STORE Checkout and Stripe webhook use garment-specific size lists:
-- TEE S/M/L/XL; HOODIE S/M/L/XL/XXL; PANTS M/L/XL.
-- Prior database constraints rejected paid XXL orders and incorrectly allowed pants S.
-- Zero existing apparel orders verified before the change; other schema objects unchanged.
BEGIN;
ALTER TABLE public.rba_essentials_orders
  DROP CONSTRAINT IF EXISTS rba_essentials_orders_hoodie_size_check;
ALTER TABLE public.rba_essentials_orders
  ADD CONSTRAINT rba_essentials_orders_hoodie_size_check
  CHECK (hoodie_size IN ('S','M','L','XL','XXL'));
ALTER TABLE public.rba_essentials_orders
  DROP CONSTRAINT IF EXISTS rba_essentials_orders_pants_size_check;
ALTER TABLE public.rba_essentials_orders
  ADD CONSTRAINT rba_essentials_orders_pants_size_check
  CHECK (pants_size IN ('M','L','XL'));
COMMIT;
