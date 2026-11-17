-- RBA ESSENTIALS conditional direct handwriting: paid metadata is not public.
-- The handwritten option is separately approved and remains off by default.
alter table public.rba_essentials_orders
  add column if not exists handwritten boolean not null default false,
  add column if not exists handwritten_target text,
  add column if not exists handwritten_message text,
  add column if not exists handwritten_addon_jpy integer not null default 0;
alter table public.rba_essentials_orders
  add constraint rba_essentials_handwritten_order_integrity
  check (
    (not handwritten and handwritten_target is null and handwritten_message is null and handwritten_addon_jpy=0)
    or
    (handwritten and handwritten_target in ('tee','setup')
      and handwritten_message is not null and char_length(handwritten_message) between 1 and 20
      and handwritten_message !~ '[[:cntrl:]<>]'
      and handwritten_addon_jpy between 1000 and 200000
      and (
        (handwritten_target='tee' and tee_quantity=1)
        or (handwritten_target='setup' and setup_quantity=1)
      ))
  );
comment on column public.rba_essentials_orders.handwritten_message is
  'Private short exact customer-supplied text for one garment only; never expose to public or analytics.';
