alter table public.rba_advertisers add column ad_units integer not null default 0 check (ad_units between 0 and 999999);
comment on column public.rba_advertisers.ad_units is 'Verified paid monthly advertising units. 0 = legacy contract, excluded from new rotating placement. Updated by existing authorized editors only.';
