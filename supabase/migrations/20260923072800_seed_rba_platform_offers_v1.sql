
do $$
declare
  v_creator uuid;
  v_entity uuid;
begin
  select id into v_creator from auth.users where email='riot.training.base@gmail.com' limit 1;
  if v_creator is null then raise exception 'RBA creator user not found'; end if;

  insert into public.platform_entities(
    entity_type,name,slug,country,region,timezone,default_currency,description,website_url,status,verification_status,created_by
  ) values (
    'organizer','Riot Basketball Academy','riot-basketball-academy','JP',null,'Asia/Tokyo','JPY',
    'Youth Basketball Development Platform from Japan.','https://riotbasketballacademy.com',
    'active','verified',v_creator
  )
  on conflict (slug) do update set
    name=excluded.name, website_url=excluded.website_url, status='active', verification_status='verified', updated_at=now()
  returning id into v_entity;

  insert into public.service_offers(provider_entity_id,offer_type,title,slug,summary,availability_status,publication_status,currency,unit_amount,pricing_mode,external_application_url,starts_at,ends_at,capacity,metadata,created_by)
  values
  (v_entity,'clinic','RBA KAWASAKI CLINIC | 2026-09-27','kawasaki-2026-09-27','Application first. Participation fee is confirmed before payment.','request_required','published','JPY',null,'quote','/apply?offer=kawasaki-2026-09-27','2026-09-27T00:00:00+09:00','2026-09-27T23:59:59+09:00',null,
    jsonb_build_object('event','kawasaki_clinic_2026_09_27','plan','clinic_fee_pending','checkout_policy','manual_after_application','application_kind','youth','allowed_age_groups',jsonb_build_array('U12','U15'),'source_event_slug','rba-kawasaki-clinic-2026-09-27'),v_creator),
  (v_entity,'event','SAGA × FUKUOKA 2DAYS DEVELOPMENT CAMP','saga-fukuoka-2026','Application and review required before payment.','request_required','published','JPY',16500,'fixed','/apply?offer=saga-fukuoka-2026','2026-10-04T00:00:00+09:00','2026-10-05T23:59:59+09:00',null,
    jsonb_build_object('event','saga_fukuoka_2days_2026','plan','camp_fee','stripe_price_id','price_1UHWhORXDnnSs6XNQremcSBF','checkout_policy','manual_after_application','application_kind','youth','includes_accommodation_or_transport',true,'allowed_age_groups',jsonb_build_array('U8','U10','U12','U15'),'source_event_slug','saga-fukuoka-2days-2026'),v_creator),
  (v_entity,'clinic','YAMAGATA 1DAY DEVELOPMENT CLINIC','yamagata-1day-2026','Application first, then secure Stripe checkout.','confirmed','published','JPY',6600,'fixed','/apply?offer=yamagata-1day-2026','2026-10-24T00:00:00+09:00','2026-10-24T23:59:59+09:00',null,
    jsonb_build_object('event','yamagata_1day_2026','plan','clinic_fee','stripe_price_id','price_1UHWhNRXDnnSs6XNbpljBoO4','checkout_policy','instant_after_application','application_kind','youth','allowed_age_groups',jsonb_build_array('U10','U12','U15'),'source_event_slug','yamagata-1day-2026'),v_creator),
  (v_entity,'event','SHIZUGAWA DEVELOPMENT CAMP 2026','shizugawa-2026','Application and review required before payment.','request_required','published','JPY',25000,'fixed','/apply?offer=shizugawa-2026','2026-11-07T00:00:00+09:00','2026-11-08T23:59:59+09:00',null,
    jsonb_build_object('event','shizugawa_camp_2026','plan','camp_fee','stripe_price_id','price_1UHWhORXDnnSs6XNCRyHN0Bn','checkout_policy','manual_after_application','application_kind','youth','allowed_age_groups',jsonb_build_array('U10','U12','U15'),'allowed_school_grades',jsonb_build_array('jp_g3','jp_g4','jp_g5','jp_g6','jhs1','jhs2','jhs3'),'source_event_slug','shizugawa-development-camp-2026'),v_creator),
  (v_entity,'event','KOBE CAMP | HALF DAY + FRIDAY','kobe-half-friday-2026','Day-only KOBE Development Camp plan.','confirmed','published','JPY',9900,'fixed','/apply?offer=kobe-half-friday-2026','2026-11-20T00:00:00+09:00','2026-11-23T23:59:59+09:00',null,
    jsonb_build_object('event','kobe_camp_2026','plan','half_day_plus_friday','stripe_price_id','price_1UHWhPRXDnnSs6XNvzTQoJQL','checkout_policy','instant_after_application','application_kind','youth','attendance_selection_required',true,'allowed_age_groups',jsonb_build_array('U12','U15'),'allowed_school_grades',jsonb_build_array('jp_g5','jp_g6','jhs1','jhs2','jhs3'),'source_event_slug','kobe-development-camp-2026'),v_creator),
  (v_entity,'event','KOBE CAMP | 1 DAY + FRIDAY','kobe-one-friday-2026','Day-only KOBE Development Camp plan.','confirmed','published','JPY',14300,'fixed','/apply?offer=kobe-one-friday-2026','2026-11-20T00:00:00+09:00','2026-11-23T23:59:59+09:00',null,
    jsonb_build_object('event','kobe_camp_2026','plan','one_day_plus_friday','stripe_price_id','price_1UHWhQRXDnnSs6XNJVoPqblr','checkout_policy','instant_after_application','application_kind','youth','attendance_selection_required',true,'allowed_age_groups',jsonb_build_array('U12','U15'),'allowed_school_grades',jsonb_build_array('jp_g5','jp_g6','jhs1','jhs2','jhs3'),'source_event_slug','kobe-development-camp-2026'),v_creator),
  (v_entity,'event','KOBE CAMP | 2 DAYS + FRIDAY','kobe-two-friday-2026','Day-only KOBE Development Camp plan.','confirmed','published','JPY',23100,'fixed','/apply?offer=kobe-two-friday-2026','2026-11-20T00:00:00+09:00','2026-11-23T23:59:59+09:00',null,
    jsonb_build_object('event','kobe_camp_2026','plan','two_days_plus_friday','stripe_price_id','price_1UHWhRRXDnnSs6XNi210VUhV','checkout_policy','instant_after_application','application_kind','youth','attendance_selection_required',true,'allowed_age_groups',jsonb_build_array('U12','U15'),'allowed_school_grades',jsonb_build_array('jp_g5','jp_g6','jhs1','jhs2','jhs3'),'source_event_slug','kobe-development-camp-2026'),v_creator),
  (v_entity,'event','KOBE CAMP | 3 DAYS + FRIDAY','kobe-three-friday-2026','Day-only KOBE Development Camp plan.','confirmed','published','JPY',30800,'fixed','/apply?offer=kobe-three-friday-2026','2026-11-20T00:00:00+09:00','2026-11-23T23:59:59+09:00',null,
    jsonb_build_object('event','kobe_camp_2026','plan','three_days_plus_friday','stripe_price_id','price_1UHWhRRXDnnSs6XNGQQzeolt','checkout_policy','instant_after_application','application_kind','youth','allowed_age_groups',jsonb_build_array('U12','U15'),'allowed_school_grades',jsonb_build_array('jp_g5','jp_g6','jhs1','jhs2','jhs3'),'source_event_slug','kobe-development-camp-2026'),v_creator),
  (v_entity,'event','KOBE CAMP | 2D1N + FRIDAY','kobe-2d1n-friday-2026','Accommodation-inclusive plan. Review required before payment.','request_required','published','JPY',36300,'fixed','/apply?offer=kobe-2d1n-friday-2026','2026-11-20T00:00:00+09:00','2026-11-23T23:59:59+09:00',null,
    jsonb_build_object('event','kobe_camp_2026','plan','two_days_one_night_plus_friday','stripe_price_id','price_1UHWhSRXDnnSs6XNLimQT4qN','checkout_policy','manual_after_application','application_kind','youth','includes_accommodation_or_transport',true,'allowed_age_groups',jsonb_build_array('U12','U15'),'allowed_school_grades',jsonb_build_array('jp_g5','jp_g6','jhs1','jhs2','jhs3'),'source_event_slug','kobe-development-camp-2026'),v_creator),
  (v_entity,'event','KOBE CAMP | FULL CAMP + FRIDAY','kobe-full-friday-2026','Accommodation-inclusive plan. Review required before payment.','request_required','published','JPY',56100,'fixed','/apply?offer=kobe-full-friday-2026','2026-11-20T00:00:00+09:00','2026-11-23T23:59:59+09:00',null,
    jsonb_build_object('event','kobe_camp_2026','plan','full_camp_plus_friday','stripe_price_id','price_1UHWhTRXDnnSs6XN7aMER4Hl','checkout_policy','manual_after_application','application_kind','youth','includes_accommodation_or_transport',true,'allowed_age_groups',jsonb_build_array('U12','U15'),'allowed_school_grades',jsonb_build_array('jp_g5','jp_g6','jhs1','jhs2','jhs3'),'source_event_slug','kobe-development-camp-2026'),v_creator),
  (v_entity,'event','Torsten Loibl Online Clinic Vol.2 | LIVE','torsten-live-vol2','Live online clinic.','confirmed','published','JPY',3300,'fixed','/apply?offer=torsten-live-vol2','2026-11-25T20:00:00+09:00','2026-11-25T21:30:00+09:00',null,
    jsonb_build_object('event','torsten_loibl_online_clinic_vol2','plan','live','stripe_price_id','price_1UHWgvRXDnnSs6XN92GX8aYS','checkout_policy','instant_after_application','application_kind','general','source_event_slug','torsten-loibl-online-clinic-vol-2'),v_creator),
  (v_entity,'event','Torsten Loibl Online Clinic Vol.2 | 30-Day On-Demand','torsten-ondemand-vol2','30-day on-demand access.','confirmed','published','JPY',4400,'fixed','/apply?offer=torsten-ondemand-vol2','2026-11-25T00:00:00+09:00',null,null,
    jsonb_build_object('event','torsten_loibl_online_clinic_vol2','plan','ondemand_30days','stripe_price_id','price_1UHWhLRXDnnSs6XN6ufciiP6','checkout_policy','instant_after_application','application_kind','general','source_event_slug','torsten-loibl-online-clinic-vol-2'),v_creator),
  (v_entity,'clinic','RBA Team Training | 3 Hours','team-training-3h','Team training. Scope/date/venue confirmed before private checkout.','request_required','published','JPY',33000,'fixed','/contact','2026-09-23T00:00:00+09:00',null,null,
    jsonb_build_object('event','team_training','plan','3h','stripe_price_id','price_1UIg4ORXDnnSs6XNekQSEXYA','checkout_policy','inquiry_only','application_kind','team'),v_creator),
  (v_entity,'clinic','RBA Team Training | Half Day','team-training-halfday','Team training. Scope/date/venue confirmed before private checkout.','request_required','published','JPY',55000,'fixed','/contact','2026-09-23T00:00:00+09:00',null,null,
    jsonb_build_object('event','team_training','plan','halfday','stripe_price_id','price_1UIg4YRXDnnSs6XN64LgUXdd','checkout_policy','inquiry_only','application_kind','team'),v_creator),
  (v_entity,'clinic','RBA Team Training | Full Day','team-training-fullday','Team training. Scope/date/venue confirmed before private checkout.','request_required','published','JPY',88000,'fixed','/contact','2026-09-23T00:00:00+09:00',null,null,
    jsonb_build_object('event','team_training','plan','fullday','stripe_price_id','price_1UIg4iRXDnnSs6XNNCVtZv2H','checkout_policy','inquiry_only','application_kind','team'),v_creator)
  on conflict (slug) do update set
    provider_entity_id=excluded.provider_entity_id,
    offer_type=excluded.offer_type,
    title=excluded.title,
    summary=excluded.summary,
    availability_status=excluded.availability_status,
    publication_status=excluded.publication_status,
    currency=excluded.currency,
    unit_amount=excluded.unit_amount,
    pricing_mode=excluded.pricing_mode,
    external_application_url=excluded.external_application_url,
    starts_at=excluded.starts_at,
    ends_at=excluded.ends_at,
    capacity=excluded.capacity,
    metadata=excluded.metadata,
    created_by=excluded.created_by,
    updated_at=now();
end $$;

