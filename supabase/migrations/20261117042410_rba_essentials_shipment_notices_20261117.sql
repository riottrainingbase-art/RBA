-- Applied to HOMECOURT ctngdzzorhzpdxswahzl on 2026-11-17 (server-assigned version 20261117042410)
-- No new buyer personal data columns; status and timestamps only.
ALTER TABLE public.rba_essentials_orders
 ADD COLUMN IF NOT EXISTS shipment_notice_status text NOT NULL DEFAULT 'not_ready',
 ADD COLUMN IF NOT EXISTS shipment_notice_sent_at timestamptz;

DO $$
BEGIN
 IF NOT EXISTS (
  SELECT 1 FROM pg_constraint WHERE conname='rba_essentials_orders_shipment_notice_status_check'
   AND conrelid='public.rba_essentials_orders'::regclass
 ) THEN
  ALTER TABLE public.rba_essentials_orders
   ADD CONSTRAINT rba_essentials_orders_shipment_notice_status_check
   CHECK (shipment_notice_status = ANY(ARRAY['not_ready','pending','sent','failed']::text[]));
 END IF;
 IF NOT EXISTS (
  SELECT 1 FROM pg_constraint WHERE conname='rba_essentials_orders_shipment_notice_sent_at_check'
   AND conrelid='public.rba_essentials_orders'::regclass
 ) THEN
  ALTER TABLE public.rba_essentials_orders
   ADD CONSTRAINT rba_essentials_orders_shipment_notice_sent_at_check
   CHECK (shipment_notice_status <> 'sent' OR shipment_notice_sent_at IS NOT NULL);
 END IF;
END $$;

CREATE OR REPLACE FUNCTION public.rba_essentials_queue_shipment_notice()
RETURNS trigger LANGUAGE plpgsql SECURITY INVOKER SET search_path=public
AS $$
BEGIN
 IF NEW.stage='shipped' AND OLD.stage IS DISTINCT FROM NEW.stage THEN
   UPDATE public.rba_essentials_orders
      SET shipment_notice_status='pending'
    WHERE order_id=NEW.order_id AND payment_status='paid'
      AND shipment_notice_status='not_ready';
 END IF;
 RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS rba_essentials_shipment_notice_trg ON public.rba_essentials_fulfillment_tasks;
CREATE TRIGGER rba_essentials_shipment_notice_trg
 AFTER UPDATE OF stage ON public.rba_essentials_fulfillment_tasks
 FOR EACH ROW WHEN (OLD.stage IS DISTINCT FROM NEW.stage)
 EXECUTE FUNCTION public.rba_essentials_queue_shipment_notice();

REVOKE ALL ON FUNCTION public.rba_essentials_queue_shipment_notice() FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.rba_essentials_queue_shipment_notice() TO service_role;
