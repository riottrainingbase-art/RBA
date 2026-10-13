-- Register D-HUB subscriptions in the governed RBA commerce layer.
with context as (
  select e.id as entity_id,e.created_by,bu.id as business_unit_id
  from public.platform_entities e
  join public.business_units bu on bu.code='DHUB'
  where e.slug='riot-basketball-academy'
  limit 1
),
coach_offer as (
  insert into public.service_offers(
    provider_entity_id,offer_type,title,slug,summary,availability_status,publication_status,
    currency,unit_amount,pricing_mode,external_application_url,external_payment_url,
    capacity,metadata,created_by,business_unit_id,revenue_recognition_mode
  )
  select
    entity_id,'subscription','D-HUB COACH LAB','dhub-coach-lab-monthly',
    '年間48回の継続学習と現場実践をつなぐ指導者向け月額メンバーシップ。',
    'confirmed','published','JPY',3300,'fixed','/ja/d-hub/coaches/member',null,null,
    jsonb_build_object(
      'program','rba_dhub',
      'dhub_program_type','coach_lab',
      'subscription_plan_key','dhub_coach_lab_monthly',
      'application_kind','general',
      'stripe_product_id','prod_VNy8AMOvMVgBKY',
      'stripe_price_id','price_1UNCBmRXDnnSs6XNPdIwPKDW'
    ),
    created_by,business_unit_id,'monthly'
  from context
  on conflict(slug) do update set
    title=excluded.title,summary=excluded.summary,availability_status=excluded.availability_status,
    publication_status=excluded.publication_status,currency=excluded.currency,unit_amount=excluded.unit_amount,
    pricing_mode=excluded.pricing_mode,external_application_url=excluded.external_application_url,
    metadata=excluded.metadata,business_unit_id=excluded.business_unit_id,
    revenue_recognition_mode=excluded.revenue_recognition_mode,updated_at=now()
  returning id
),
players_offer as (
  insert into public.service_offers(
    provider_entity_id,offer_type,title,slug,summary,availability_status,publication_status,
    currency,unit_amount,pricing_mode,external_application_url,external_payment_url,
    capacity,metadata,created_by,business_unit_id,revenue_recognition_mode
  )
  select
    entity_id,'subscription','D-HUB PLAYERS','dhub-players-monthly',
    'U10・U12・U15を中心に、練習・試合・振り返りをつなぐ選手向け月額メンバーシップ。',
    'confirmed','published','JPY',3300,'fixed','/ja/d-hub/players/member',null,null,
    jsonb_build_object(
      'program','rba_dhub',
      'dhub_program_type','players',
      'subscription_plan_key','dhub_players_monthly',
      'application_kind','youth',
      'allowed_age_groups',jsonb_build_array('U10','U12','U15'),
      'stripe_product_id','prod_VNy85qDvM2S344',
      'stripe_price_id','price_1UNCBvRXDnnSs6XN4ktl8Yp9'
    ),
    created_by,business_unit_id,'monthly'
  from context
  on conflict(slug) do update set
    title=excluded.title,summary=excluded.summary,availability_status=excluded.availability_status,
    publication_status=excluded.publication_status,currency=excluded.currency,unit_amount=excluded.unit_amount,
    pricing_mode=excluded.pricing_mode,external_application_url=excluded.external_application_url,
    metadata=excluded.metadata,business_unit_id=excluded.business_unit_id,
    revenue_recognition_mode=excluded.revenue_recognition_mode,updated_at=now()
  returning id
)
insert into public.payment_routes(
  service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,active,
  requires_authenticated_user,requires_guardian_for_minor,metadata
)
select id,'stripe','plink_1UNCCfRXDnnSs6XNEEiR3eWp',
       'https://buy.stripe.com/eVqbJ3eGHaDG76J64f7EQ0K','instant',true,true,false,
       '{"program":"rba_dhub","dhub_program_type":"coach_lab"}'::jsonb
from coach_offer
on conflict(service_offer_id) do update set
  provider=excluded.provider,provider_payment_link_id=excluded.provider_payment_link_id,
  payment_url=excluded.payment_url,checkout_policy=excluded.checkout_policy,active=true,
  requires_authenticated_user=true,requires_guardian_for_minor=false,
  metadata=excluded.metadata,updated_at=now();

insert into public.payment_routes(
  service_offer_id,provider,provider_payment_link_id,payment_url,checkout_policy,active,
  requires_authenticated_user,requires_guardian_for_minor,metadata
)
select s.id,'stripe','plink_1UNCCoRXDnnSs6XNYZv305Lg',
       'https://buy.stripe.com/bJe14pbuv3bedv70JV7EQ0L','instant_after_application',true,true,true,
       '{"program":"rba_dhub","dhub_program_type":"players"}'::jsonb
from public.service_offers s
where s.slug='dhub-players-monthly'
on conflict(service_offer_id) do update set
  provider=excluded.provider,provider_payment_link_id=excluded.provider_payment_link_id,
  payment_url=excluded.payment_url,checkout_policy=excluded.checkout_policy,active=true,
  requires_authenticated_user=true,requires_guardian_for_minor=true,
  metadata=excluded.metadata,updated_at=now();
