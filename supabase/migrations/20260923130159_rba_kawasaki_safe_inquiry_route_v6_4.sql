
insert into public.payment_routes(
  service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,active,
  requires_authenticated_user,requires_guardian_for_minor,metadata,created_at,updated_at
)
select
  s.id,'manual',null,'https://riotbasketballacademy.com/ja/contact','inquiry_only',true,
  true,true,
  jsonb_build_object('reason','fee_pending','safe_launch',true,'source','prelaunch_audit'),
  now(),now()
from public.service_offers s
where s.slug='kawasaki-2026-09-27'
on conflict(service_offer_id) do update set
  provider='manual',
  provider_payment_link_id=null,
  payment_url='https://riotbasketballacademy.com/ja/contact',
  checkout_policy='inquiry_only',
  active=true,
  metadata=coalesce(public.payment_routes.metadata,'{}'::jsonb) || '{"reason":"fee_pending","safe_launch":true,"source":"prelaunch_audit"}'::jsonb,
  updated_at=now();

