-- RBA FIRST DROP: delivery-by date is separate from warehouse dispatch-by.
-- Order fulfillment SLA applies to delivery at the customer's Japanese address.
alter table public.rba_essentials_orders
  add column if not exists deliver_by date;
alter table public.rba_essentials_orders
  add constraint rba_essentials_delivery_after_dispatch check(
    deliver_by is null or deliver_by >= dispatch_by
  );
comment on column public.rba_essentials_orders.deliver_by is
 'Firm buyer-visible delivery-by date; sale must be rejected if later than one month from paid order date.';
