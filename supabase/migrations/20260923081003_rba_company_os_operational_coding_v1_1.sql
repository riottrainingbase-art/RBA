
-- RBA Company OS v1.1: operational coding, classification and governance register

create or replace function public.rba_make_event_code()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  d text;
begin
  if new.event_code is null or btrim(new.event_code) = '' then
    d := to_char(coalesce(new.starts_at, now()), 'YYYYMMDD');
    new.event_code := 'RBA-EVT-' || d || '-' || upper(substr(replace(new.id::text,'-',''),1,6));
  end if;
  return new;
end;
$$;

drop trigger if exists trg_rba_make_event_code on public.events;
create trigger trg_rba_make_event_code
before insert or update of starts_at, event_code on public.events
for each row execute function public.rba_make_event_code();

create or replace function public.rba_make_offer_code()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.offer_code is null or btrim(new.offer_code) = '' then
    new.offer_code := 'RBA-OFR-' || upper(substr(replace(new.id::text,'-',''),1,8));
  end if;
  return new;
end;
$$;

drop trigger if exists trg_rba_make_offer_code on public.service_offers;
create trigger trg_rba_make_offer_code
before insert or update of offer_code on public.service_offers
for each row execute function public.rba_make_offer_code();

update public.events
set event_code = 'RBA-EVT-' || to_char(coalesce(starts_at, created_at), 'YYYYMMDD') || '-' || upper(substr(replace(id::text,'-',''),1,6))
where event_code is null;

update public.service_offers
set offer_code = 'RBA-OFR-' || upper(substr(replace(id::text,'-',''),1,8))
where offer_code is null;

-- Operational business-unit ownership for existing records.
update public.events e
set business_unit_id = bu.id
from public.business_units bu
where e.business_unit_id is null
  and (
    (e.slug='yaima-cup-2026' and bu.code='UNITED')
    or (e.event_type='clinic' and bu.code='ACADEMY')
    or (e.event_type='camp' and bu.code='EVENTS')
    or (e.event_type='homecourt_session' and bu.code='HOMECOURT')
    or (e.event_type='coach_education' and bu.code='ACADEMY')
    or (e.event_type='international' and e.slug<>'yaima-cup-2026' and bu.code='GLOBAL')
  );

update public.service_offers s
set business_unit_id = bu.id
from public.business_units bu
where s.business_unit_id is null
  and (
    (s.slug like 'team-training-%' and bu.code='ACADEMY')
    or (s.slug like 'torsten-%' and bu.code='ACADEMY')
    or (s.offer_type='clinic' and bu.code='ACADEMY')
    or (s.slug in ('saga-fukuoka-2026','shizugawa-2026')
        and bu.code='EVENTS')
    or (s.slug like 'kobe-%-2026' and bu.code='EVENTS')
  );

-- Seed financial control rows so every existing event has a close process.
insert into public.event_financials (event_id, business_unit_id)
select e.id, e.business_unit_id
from public.events e
on conflict (event_id) do nothing;

-- Governance register: these are control records, not substitute legal advice.
insert into public.governance_documents
(document_key, version, locale, title, status, owner_role)
values
 ('terms_of_service','0.1','ja','RBA 利用規約','draft','Legal / Operations'),
 ('privacy_policy','0.1','ja','RBA プライバシーポリシー','draft','Privacy / Operations'),
 ('event_participation_terms','0.1','ja','イベント参加規約','draft','Events'),
 ('refund_policy','0.1','ja','キャンセル・返金規定','draft','Finance / Operations'),
 ('media_consent_policy','0.1','ja','写真・動画・肖像利用方針','draft','Safeguarding'),
 ('safeguarding_policy','0.1','ja','子どもの安全・セーフガーディング方針','draft','Safeguarding'),
 ('incident_response_policy','0.1','ja','事故・インシデント対応規程','draft','Safeguarding'),
 ('international_travel_terms','0.1','ja','海外遠征・国際交流参加規約','draft','Global'),
 ('coach_code_of_conduct','0.1','ja','コーチ行動規範','draft','Academy'),
 ('partner_sponsor_policy','0.1','ja','スポンサー・パートナー取引方針','draft','Partnerships'),
 ('data_retention_policy','0.1','ja','データ保存・削除方針','draft','Privacy / Technology')
on conflict (document_key,version,locale) do nothing;

alter view public.management_event_pnl set (security_invoker = true);
alter view public.management_monthly_kpis set (security_invoker = true);

